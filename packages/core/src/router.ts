// =============================================================================
// Tachles Core - HTTP Router
// A minimal, runtime-agnostic HTTP router
// =============================================================================

import { Effect, pipe } from "effect";
import type { HttpError, RuntimeError, TachlesError } from "./errors";
import { toHttpError } from "./errors";

// =============================================================================
// Types
// =============================================================================

export interface RouteParams {
  [key: string]: string;
}

export interface TachlesRequest {
  method: string;
  url: string;
  path: string;
  params: RouteParams;
  query: URLSearchParams;
  headers: Headers;
  body: () => Promise<unknown>;
  text: () => Promise<string>;
  raw: Request;
}

export interface TachlesResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

export type RouteHandler<R = never, E = never> = (
  req: TachlesRequest
) => Effect.Effect<TachlesResponse, E, R>;

interface Route<R, E> {
  method: string;
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler<R, E>;
}

// =============================================================================
// Response Helpers
// =============================================================================

export const json = <T>(data: T, status: number = 200): TachlesResponse => ({
  status,
  headers: { "Content-Type": "application/json" },
  body: data,
});

export const ok = <T>(data: T): TachlesResponse => json(data, 200);
export const created = <T>(data: T): TachlesResponse => json(data, 201);
export const noContent = (): TachlesResponse => ({ status: 204, headers: {}, body: null });
export const badRequest = (message: string): TachlesResponse =>
  json({ error: "Bad Request", message }, 400);
export const unauthorized = (message: string = "Unauthorized"): TachlesResponse =>
  json({ error: "Unauthorized", message }, 401);
export const forbidden = (message: string = "Forbidden"): TachlesResponse =>
  json({ error: "Forbidden", message }, 403);
export const notFound = (message: string = "Not Found"): TachlesResponse =>
  json({ error: "Not Found", message }, 404);
export const methodNotAllowed = (): TachlesResponse =>
  json({ error: "Method Not Allowed" }, 405);
export const internalError = (message: string = "Internal Server Error"): TachlesResponse =>
  json({ error: "Internal Server Error", message }, 500);

export const fromHttpError = (error: HttpError): TachlesResponse =>
  json({ error: error.message, code: error.code }, error.status);

// =============================================================================
// Route Pattern Parser
// =============================================================================

const parseRoutePattern = (pattern: string): { regex: RegExp; paramNames: string[] } => {
  const paramNames: string[] = [];
  const regexPattern = pattern
    .replace(/:([^/]+)/g, (_match, paramName) => {
      paramNames.push(paramName);
      return "([^/]+)";
    })
    .replace(/\//g, "\\/");

  return {
    regex: new RegExp(`^${regexPattern}$`),
    paramNames,
  };
};

// =============================================================================
// Router Class
// =============================================================================

export class Router<R = never, E = HttpError | RuntimeError> {
  private routes: Route<R, E>[] = [];
  private prefix: string = "";

  constructor(prefix: string = "") {
    this.prefix = prefix;
  }

  private addRoute(method: string, pattern: string, handler: RouteHandler<R, E>): this {
    const fullPattern = this.prefix + pattern;
    const { regex, paramNames } = parseRoutePattern(fullPattern);
    this.routes.push({ method, pattern: regex, paramNames, handler });
    return this;
  }

  get(pattern: string, handler: RouteHandler<R, E>): this {
    return this.addRoute("GET", pattern, handler);
  }

  post(pattern: string, handler: RouteHandler<R, E>): this {
    return this.addRoute("POST", pattern, handler);
  }

  put(pattern: string, handler: RouteHandler<R, E>): this {
    return this.addRoute("PUT", pattern, handler);
  }

  patch(pattern: string, handler: RouteHandler<R, E>): this {
    return this.addRoute("PATCH", pattern, handler);
  }

  delete(pattern: string, handler: RouteHandler<R, E>): this {
    return this.addRoute("DELETE", pattern, handler);
  }

  // Mount another router at a prefix
  use(prefix: string, router: Router<R, E>): this {
    for (const route of router.routes) {
      const newPattern = this.prefix + prefix + route.pattern.source.slice(1, -1);
      const { regex, paramNames } = parseRoutePattern(newPattern.replace(/\\/g, ""));
      this.routes.push({
        method: route.method,
        pattern: regex,
        paramNames: [...route.paramNames, ...paramNames],
        handler: route.handler,
      });
    }
    return this;
  }

  // Handle a request
  handle(request: Request): Effect.Effect<Response, never, R> {
    return Effect.gen(this, function* () {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method.toUpperCase();

      // Find matching route
      for (const route of this.routes) {
        if (route.method !== method && route.method !== "*") continue;

        const match = path.match(route.pattern);
        if (!match) continue;

        // Extract params
        const params: RouteParams = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });

        // Build request object
        const req: TachlesRequest = {
          method,
          url: request.url,
          path,
          params,
          query: url.searchParams,
          headers: request.headers,
          body: () => request.json(),
          text: () => request.text(),
          raw: request,
        };

        // Run handler
        const result = yield* pipe(
          route.handler(req),
          Effect.catchAll((error: unknown) => {
            // Try to convert known errors, otherwise return generic 500
            if (error && typeof error === "object" && "_tag" in error) {
              const httpError = toHttpError(error as TachlesError);
              return Effect.succeed(fromHttpError(httpError));
            }
            return Effect.succeed(internalError(String(error)));
          })
        );

        return this.toResponse(result);
      }

      // No route matched
      return this.toResponse(notFound(`Route not found: ${method} ${path}`));
    });
  }

  private toResponse(res: TachlesResponse): Response {
    const headers = new Headers(res.headers);

    if (res.status === 204 || res.body === null) {
      return new Response(null, { status: res.status, headers });
    }

    const body =
      typeof res.body === "string" ? res.body : JSON.stringify(res.body);

    return new Response(body, { status: res.status, headers });
  }
}

// =============================================================================
// Create Router Factory
// =============================================================================

export const createRouter = <R = never, E = HttpError | RuntimeError>(
  prefix: string = ""
): Router<R, E> => new Router<R, E>(prefix);
