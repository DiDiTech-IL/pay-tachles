// =============================================================================
// Tachles Core - Cloudflare Workers Adapter
// Uses request-scoped runtime pattern for Effect-TS
// Based on: https://dev.to/article-on-effect-ts-cloudflare-workers
// =============================================================================

import { Effect, Layer, ManagedRuntime } from "effect";
import { Database, createDatabaseLayer } from "../database/provider";
import { Storage, createStorageLayer } from "../storage/provider";
import { createMemoryDatabase } from "../database/memory";
import { createMemoryStorage } from "../storage/memory";
import type { DatabaseProvider } from "../database/provider";
import type { StorageProvider } from "../storage/provider";
import { StorageError } from "../errors";

// =============================================================================
// Cloudflare Types
// =============================================================================

export interface KVNamespace {
  get(key: string, options?: { type?: "text" | "json" | "arrayBuffer" | "stream" }): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string }>;
    cursor?: string;
    list_complete: boolean;
  }>;
}

export interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(sql: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
  raw<T = unknown[]>(options?: { columnNames?: boolean }): Promise<T[]>;
}

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta?: { changes?: number; last_row_id?: number };
}

interface D1ExecResult {
  count: number;
  duration: number;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

export interface CloudflareEnv {
  TACHLES_KV?: KVNamespace;
  TACHLES_DB?: D1Database;
  [key: string]: unknown;
}

// =============================================================================
// Cloudflare KV Storage Provider
// =============================================================================

export const createCloudflareKVStorage = (kv: KVNamespace): StorageProvider => ({
  get: <T>(key: string) =>
    Effect.tryPromise({
      try: async () => {
        const value = await kv.get(key);
        return value ? (JSON.parse(value) as T) : null;
      },
      catch: (e) => new StorageError({ operation: "get", key, cause: e }),
    }),

  set: <T>(key: string, value: T, ttlSeconds?: number) =>
    Effect.tryPromise({
      try: () => kv.put(key, JSON.stringify(value), ttlSeconds ? { expirationTtl: ttlSeconds } : undefined),
      catch: (e) => new StorageError({ operation: "set", key, cause: e }),
    }),

  del: (key: string) =>
    Effect.tryPromise({
      try: () => kv.delete(key),
      catch: (e) => new StorageError({ operation: "del", key, cause: e }),
    }),

  exists: (key: string) =>
    Effect.tryPromise({
      try: async () => (await kv.get(key)) !== null,
      catch: (e) => new StorageError({ operation: "exists", key, cause: e }),
    }),

  incr: (key: string) =>
    Effect.tryPromise({
      try: async () => {
        const current = await kv.get(key);
        const value = current ? parseInt(current, 10) + 1 : 1;
        await kv.put(key, value.toString());
        return value;
      },
      catch: (e) => new StorageError({ operation: "incr", key, cause: e }),
    }),

  setNX: <T>(key: string, value: T, ttlSeconds?: number) =>
    Effect.tryPromise({
      try: async () => {
        const existing = await kv.get(key);
        if (existing !== null) return false;
        await kv.put(key, JSON.stringify(value), ttlSeconds ? { expirationTtl: ttlSeconds } : undefined);
        return true;
      },
      catch: (e) => new StorageError({ operation: "setNX", key, cause: e }),
    }),

  expire: (_key: string, _ttlSeconds: number) =>
    Effect.succeed(undefined), // KV doesn't support modifying TTL after creation

  ttl: (_key: string) =>
    Effect.succeed(-1), // KV doesn't expose TTL

  hget: <T>(key: string, field: string) =>
    Effect.tryPromise({
      try: async () => {
        const value = await kv.get(`${key}:${field}`);
        return value ? (JSON.parse(value) as T) : null;
      },
      catch: (e) => new StorageError({ operation: "hget", key: `${key}:${field}`, cause: e }),
    }),

  hset: <T>(key: string, field: string, value: T) =>
    Effect.tryPromise({
      try: () => kv.put(`${key}:${field}`, JSON.stringify(value)),
      catch: (e) => new StorageError({ operation: "hset", key: `${key}:${field}`, cause: e }),
    }),

  hdel: (key: string, field: string) =>
    Effect.tryPromise({
      try: async () => {
        await kv.delete(`${key}:${field}`);
      },
      catch: (e) => new StorageError({ operation: "hdel", key: `${key}:${field}`, cause: e }),
    }),

  hgetall: <T>(key: string) =>
    Effect.tryPromise({
      try: async () => {
        const list = await kv.list({ prefix: `${key}:` });
        if (list.keys.length === 0) return null;
        const result: Record<string, T> = {};
        for (const { name } of list.keys) {
          const field = name.slice(key.length + 1);
          const value = await kv.get(name);
          if (value !== null) result[field] = JSON.parse(value) as T;
        }
        return result;
      },
      catch: (e) => new StorageError({ operation: "hgetall", key, cause: e }),
    }),

  lpush: <T>(key: string, value: T) =>
    Effect.tryPromise({
      try: async () => {
        const existing = await kv.get(key);
        const list = existing ? JSON.parse(existing) : [];
        list.unshift(value);
        await kv.put(key, JSON.stringify(list));
        return list.length;
      },
      catch: (e) => new StorageError({ operation: "lpush", key, cause: e }),
    }),

  rpop: <T>(key: string) =>
    Effect.tryPromise({
      try: async () => {
        const existing = await kv.get(key);
        if (!existing) return null;
        const list = JSON.parse(existing);
        const value = list.pop();
        await kv.put(key, JSON.stringify(list));
        return (value ?? null) as T | null;
      },
      catch: (e) => new StorageError({ operation: "rpop", key, cause: e }),
    }),

  lrange: <T>(key: string, start: number, stop: number) =>
    Effect.tryPromise({
      try: async () => {
        const existing = await kv.get(key);
        if (!existing) return [] as T[];
        const list = JSON.parse(existing);
        return list.slice(start, stop === -1 ? undefined : stop + 1) as T[];
      },
      catch: (e) => new StorageError({ operation: "lrange", key, cause: e }),
    }),

  llen: (key: string) =>
    Effect.tryPromise({
      try: async () => {
        const existing = await kv.get(key);
        if (!existing) return 0;
        return JSON.parse(existing).length;
      },
      catch: (e) => new StorageError({ operation: "llen", key, cause: e }),
    }),

  ping: () => Effect.succeed(true),
  close: () => Effect.succeed(undefined),
});

// =============================================================================
// Infrastructure Layer Factory (Request-Scoped)
// =============================================================================

export interface InfraOptions {
  /** Custom database provider factory */
  makeDatabase?: (env: CloudflareEnv) => DatabaseProvider;
  /** Custom storage provider factory */
  makeStorage?: (env: CloudflareEnv) => StorageProvider;
}

/**
 * Create infrastructure layer from Cloudflare env bindings.
 * This is called at request time when we have access to env.
 */
export const makeInfraLayer = (env: CloudflareEnv, options: InfraOptions = {}) => {
  // Create database provider
  const database = options.makeDatabase
    ? options.makeDatabase(env)
    : createMemoryDatabase();

  // Create storage provider - use KV if available, otherwise memory
  const storage = options.makeStorage
    ? options.makeStorage(env)
    : env.TACHLES_KV
      ? createCloudflareKVStorage(env.TACHLES_KV)
      : createMemoryStorage();

  return Layer.mergeAll(
    createDatabaseLayer(database),
    createStorageLayer(storage)
  );
};

// =============================================================================
// Request-Scoped Runtime Factory
// =============================================================================

type InfraLayer = ReturnType<typeof makeInfraLayer>;

export interface FetchRuntimeOptions extends InfraOptions {
  /** Custom layer factory that can add more services on top of infra */
  makeLiveLayer?: (params: { env: CloudflareEnv; infra: InfraLayer }) => Layer.Layer<never, never, never>;
}

/**
 * Create a request-scoped runtime wrapper for Effect programs.
 * 
 * This bridges the gap between:
 * - Cloudflare giving us env bindings at request time
 * - Effect-TS wanting Layers provided up-front
 * 
 * @example
 * ```ts
 * const runtime = makeFetchRuntime();
 * 
 * export default {
 *   fetch: runtime(
 *     Effect.gen(function* () {
 *       const db = yield* Database;
 *       const apps = yield* db.listApps();
 *       return new Response(JSON.stringify(apps));
 *     })
 *   )
 * };
 * ```
 */
export const makeFetchRuntime = <R = DatabaseProvider | StorageProvider, E = never>(
  options: FetchRuntimeOptions = {}
) => {
  const wrapHandler = <A, E2>(
    program: (request: Request, env: CloudflareEnv) => Effect.Effect<A, E2, R>
  ) => {
    return async (request: Request, env: CloudflareEnv, ctx: ExecutionContext): Promise<A> => {
      // Build infrastructure layer at request time
      const infra = makeInfraLayer(env, options);
      
      // Allow custom layer composition
      const live = options.makeLiveLayer
        ? options.makeLiveLayer({ env, infra })
        : infra;

      // Create a managed runtime for this request
      const runtime = ManagedRuntime.make(live as Layer.Layer<R>);

      try {
        // Run the program with the request-scoped runtime
        return await runtime.runPromise(program(request, env));
      } finally {
        // Cleanup (waitUntil for graceful shutdown)
        ctx.waitUntil(runtime.dispose());
      }
    };
  };

  return wrapHandler;
};

// =============================================================================
// Simple Fetch Handler (for basic use cases)
// =============================================================================

export interface SimpleHandlerOptions extends InfraOptions {
  /** CORS origin (optional - allows all by default) */
  corsOrigin?: string | string[];
}

/**
 * Create a simple Cloudflare Workers fetch handler.
 * 
 * @example
 * ```ts
 * import { createSimpleHandler } from "@tachles/core/adapters/cloudflare";
 * 
 * export default {
 *   fetch: createSimpleHandler({
 *     makeStorage: (env) => createCloudflareKVStorage(env.MY_KV)
 *   })
 * };
 * ```
 */
export const createSimpleHandler = (options: SimpleHandlerOptions = {}) => {
  const runtime = makeFetchRuntime(options);

  return runtime((request, env) =>
    Effect.gen(function* () {
      const url = new URL(request.url);
      const corsHeaders = getCorsHeaders(options.corsOrigin, request.headers.get("Origin"));

      // Handle CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      // Simple health check
      if (url.pathname === "/health" || url.pathname === "/api/health") {
        return new Response(
          JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Default 404
      return new Response(
        JSON.stringify({ error: "Not Found", path: url.pathname }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    })
  );
};

// =============================================================================
// CORS Helpers
// =============================================================================

const getCorsHeaders = (
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
// Re-exports
// =============================================================================

export { Database, createDatabaseLayer } from "../database/provider";
export { Storage, createStorageLayer } from "../storage/provider";
export { createMemoryDatabase } from "../database/memory";
export { createMemoryStorage } from "../storage/memory";
export type { DatabaseProvider } from "../database/provider";
export type { StorageProvider } from "../storage/provider";
