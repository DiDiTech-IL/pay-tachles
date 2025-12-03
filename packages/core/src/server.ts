// =============================================================================
// Tachles Core - Server Utilities
// Helpers for building payment servers on any runtime
// =============================================================================

import { Effect, Layer } from "effect";
import { createDatabaseLayer, createMemoryDatabase } from "./database";
import { createStorageLayer, createMemoryStorage } from "./storage";
import type { DatabaseProvider } from "./database/provider";
import type { StorageProvider } from "./storage/provider";

// =============================================================================
// Server Options
// =============================================================================

export interface TachlesServerOptions {
  /** Custom database provider (optional - uses memory by default) */
  database?: DatabaseProvider;
  /** Custom storage provider (optional - uses memory by default) */
  storage?: StorageProvider;
  /** CORS origin (optional - allows all by default) */
  corsOrigin?: string | string[];
}

// =============================================================================
// Infrastructure Layer
// =============================================================================

/**
 * Create the infrastructure layer for running Effect programs.
 * This combines database and storage providers into a single layer.
 */
export const createInfraLayer = (options: TachlesServerOptions = {}) => {
  const database = options.database ?? createMemoryDatabase();
  const storage = options.storage ?? createMemoryStorage();

  return Layer.mergeAll(
    createDatabaseLayer(database),
    createStorageLayer(storage)
  );
};

// =============================================================================
// CORS Headers
// =============================================================================

export const getCorsHeaders = (
  origin: string | string[] | undefined,
  requestOrigin: string | null
): Record<string, string> => {
  const allowedOrigin = Array.isArray(origin)
    ? origin.includes(requestOrigin ?? "") ? requestOrigin! : origin[0]
    : origin ?? "*";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Webhook-Signature",
    "Access-Control-Max-Age": "86400",
  };
};

// =============================================================================
// Response Helpers
// =============================================================================

export const jsonResponse = <T>(data: T, status: number = 200, headers?: Record<string, string>): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

export const errorResponse = (message: string, status: number = 500, headers?: Record<string, string>): Response =>
  jsonResponse({ error: message }, status, headers);

export const corsPreflightResponse = (corsHeaders: Record<string, string>): Response =>
  new Response(null, { status: 204, headers: corsHeaders });

// =============================================================================
// Handler Types
// =============================================================================

export type InfraLayer = ReturnType<typeof createInfraLayer>;

export type FetchHandler = (request: Request) => Promise<Response>;

/**
 * Run an Effect program with the infrastructure layer
 */
export const runWithInfra = <A, E>(
  layer: InfraLayer,
  program: Effect.Effect<A, E, DatabaseProvider | StorageProvider>
): Promise<A> => {
  return Effect.runPromise(Effect.provide(program, layer));
};
