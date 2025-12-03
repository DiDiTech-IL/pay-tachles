// =============================================================================
// Tachles Core - Node.js Adapter
// Provides Node.js-specific integrations
// =============================================================================

import { Effect } from "effect";
import {
  createInfraLayer,
  getCorsHeaders,
  jsonResponse,
  errorResponse,
  corsPreflightResponse,
  runWithInfra,
  type TachlesServerOptions,
  type InfraLayer,
} from "../server";
import { Database } from "../database/provider";
import { Storage } from "../storage/provider";
import type { DatabaseProvider } from "../database/provider";
import type { StorageProvider } from "../storage/provider";

// =============================================================================
// Types
// =============================================================================

export type RequestHandler<R = DatabaseProvider | StorageProvider> = (
  request: Request
) => Effect.Effect<Response, never, R>;

// =============================================================================
// Node.js HTTP Server
// =============================================================================

export interface StartServerOptions extends TachlesServerOptions {
  port?: number;
  hostname?: string;
  handler: RequestHandler;
}

/**
 * Start a standalone HTTP server using Node.js native http module
 *
 * @example
 * ```ts
 * import { Effect } from "effect";
 * import { startServer, Database } from "@tachles/core/adapters/node";
 *
 * const handler = (request: Request) =>
 *   Effect.gen(function* () {
 *     const db = yield* Database;
 *     const apps = yield* db.listApps();
 *     return new Response(JSON.stringify(apps));
 *   });
 *
 * startServer({ port: 3000, handler }).then(({ url }) => {
 *   console.log(`Server running at ${url}`);
 * });
 * ```
 */
export const startServer = async (
  options: StartServerOptions
): Promise<{ server: unknown; url: string; close: () => Promise<void> }> => {
  const { port = 3000, hostname = "localhost", handler, ...serverOptions } = options;

  const layer = createInfraLayer(serverOptions);

  // Dynamic import to avoid bundling issues
  const http = await import("http");

  return new Promise((resolve, reject) => {
    const nodeServer = http.createServer(async (req, res) => {
      try {
        // Convert Node.js request to Web Request
        const protocol = "http";
        const host = req.headers.host || `${hostname}:${port}`;
        const url = new URL(req.url || "/", `${protocol}://${host}`);

        // Read body if present
        let body: string | undefined;
        if (req.method !== "GET" && req.method !== "HEAD") {
          body = await new Promise<string>((resolve) => {
            let data = "";
            req.on("data", (chunk: Buffer | string) => (data += chunk));
            req.on("end", () => resolve(data));
          });
        }

        // Create Web Request
        const webRequest = new Request(url.toString(), {
          method: req.method,
          headers: Object.entries(req.headers).reduce((acc, [key, value]) => {
            if (value) acc[key] = Array.isArray(value) ? value.join(", ") : value;
            return acc;
          }, {} as Record<string, string>),
          body: body,
        });

        // Handle CORS
        const corsHeaders = getCorsHeaders(serverOptions.corsOrigin, req.headers.origin || null);
        if (req.method === "OPTIONS") {
          res.writeHead(204, corsHeaders);
          res.end();
          return;
        }

        // Run handler
        const webResponse = await runWithInfra(layer, handler(webRequest));

        // Convert Web Response to Node.js response
        res.statusCode = webResponse.status;
        Object.entries(corsHeaders).forEach(([key, value]) => {
          res.setHeader(key, value);
        });
        webResponse.headers.forEach((value: string, key: string) => {
          res.setHeader(key, value);
        });

        const responseBody = await webResponse.text();
        res.end(responseBody);
      } catch (error) {
        console.error("Request handling error:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });

    nodeServer.on("error", reject);

    nodeServer.listen(port, hostname, () => {
      const url = `http://${hostname}:${port}`;
      console.log(`🚀 Tachles server running at ${url}`);
      resolve({
        server: nodeServer,
        url,
        close: () =>
          new Promise<void>((resolve, reject) => {
            nodeServer.close((err: Error | undefined) => (err ? reject(err) : resolve()));
          }),
      });
    });
  });
};

// =============================================================================
// Re-exports
// =============================================================================

export {
  createInfraLayer,
  getCorsHeaders,
  jsonResponse,
  errorResponse,
  corsPreflightResponse,
  runWithInfra,
} from "../server";
export type { TachlesServerOptions, InfraLayer } from "../server";
export { Database, createDatabaseLayer } from "../database/provider";
export { Storage, createStorageLayer } from "../storage/provider";
export { createMemoryDatabase } from "../database/memory";
export { createMemoryStorage } from "../storage/memory";
export type { DatabaseProvider } from "../database/provider";
export type { StorageProvider } from "../storage/provider";
