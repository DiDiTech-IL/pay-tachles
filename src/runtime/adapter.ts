// =============================================================================
// Runtime Adapters
// Abstract over different JavaScript runtimes (Node.js, Cloudflare Workers, Deno, Bun)
// =============================================================================

import { Effect, Context, Layer } from "effect";
import * as crypto from "crypto";
// =============================================================================
// Runtime Info
// =============================================================================

export type RuntimeType =
  | "node"
  | "cloudflare"
  | "deno"
  | "bun"
  | "edge"
  | "unknown";

export interface RuntimeInfo {
  readonly type: RuntimeType;
  readonly version: string;
  readonly isEdge: boolean;
  readonly supportsStreaming: boolean;
  readonly supportsCrypto: boolean;
}

// =============================================================================
// Runtime Service Interface
// =============================================================================

export interface RuntimeService {
  readonly info: RuntimeInfo;

  // Environment
  readonly env: (key: string) => string | undefined;
  readonly requireEnv: (key: string) => Effect.Effect<string, RuntimeError>;

  // Crypto (consistent across runtimes)
  readonly randomUUID: () => string;
  readonly randomBytes: (length: number) => Uint8Array;
  readonly hmacSHA256: (
    key: string,
    data: string
  ) => Effect.Effect<string, RuntimeError>;
  readonly hashSHA256: (data: string) => Effect.Effect<string, RuntimeError>;

  // Timing
  readonly now: () => number;
  readonly sleep: (ms: number) => Effect.Effect<void, never>;

  // Base64
  readonly base64Encode: (data: string | Uint8Array) => string;
  readonly base64Decode: (data: string) => Uint8Array;

  // Fetch (normalized across runtimes)
  readonly fetch: typeof globalThis.fetch;
}

export const RuntimeService =
  Context.GenericTag<RuntimeService>("RuntimeService");

// =============================================================================
// Runtime Error
// =============================================================================

export class RuntimeError {
  readonly _tag = "RuntimeError";
  constructor(readonly operation: string, readonly cause?: unknown) {}

  get message(): string {
    return `Runtime error during ${this.operation}: ${this.cause}`;
  }
}

// =============================================================================
// Runtime Detection
// =============================================================================

export const detectRuntime = (): RuntimeType => {
  // Cloudflare Workers
  if (
    typeof globalThis.caches !== "undefined" &&
    typeof (globalThis as unknown as { WebSocketPair?: unknown })
      .WebSocketPair !== "undefined"
  ) {
    return "cloudflare";
  }

  // Deno
  if (
    typeof (globalThis as unknown as { Deno?: unknown }).Deno !== "undefined"
  ) {
    return "deno";
  }

  // Bun
  if (typeof (globalThis as unknown as { Bun?: unknown }).Bun !== "undefined") {
    return "bun";
  }

  // Node.js
  if (typeof process !== "undefined" && process.versions?.node) {
    return "node";
  }

  // Edge runtime (Vercel, etc.)
  if (
    typeof (globalThis as unknown as { EdgeRuntime?: unknown }).EdgeRuntime !==
    "undefined"
  ) {
    return "edge";
  }

  return "unknown";
};

// =============================================================================
// Universal Crypto Helpers
// =============================================================================

const hexEncode = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// =============================================================================
// Node.js Runtime Implementation
// =============================================================================

export const createNodeRuntime = (): RuntimeService => {
  
  return {
    info: {
      type: "node",
      version: process.version,
      isEdge: false,
      supportsStreaming: true,
      supportsCrypto: true,
    },

    env: (key: string) => process.env[key],

    requireEnv: (key: string) =>
      Effect.sync(() => {
        const value = process.env[key];
        if (!value) {
          throw new RuntimeError(
            "requireEnv",
            `Missing environment variable: ${key}`
          );
        }
        return value;
      }),

    randomUUID: () => crypto.randomUUID(),

    randomBytes: (length: number) => {
      const bytes = crypto.randomBytes(length);
      return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    },

    hmacSHA256: (key: string, data: string) =>
      Effect.sync(() => {
        const hmac = crypto.createHmac("sha256", key);
        hmac.update(data);
        return hmac.digest("hex");
      }),

    hashSHA256: (data: string) =>
      Effect.sync(() => {
        const hash = crypto.createHash("sha256");
        hash.update(data);
        return hash.digest("hex");
      }),

    now: () => Date.now(),

    sleep: (ms: number) =>
      Effect.promise(() => new Promise((resolve) => setTimeout(resolve, ms))),

    base64Encode: (data: string | Uint8Array) => {
      if (typeof data === "string") {
        return Buffer.from(data).toString("base64");
      }
      return Buffer.from(data).toString("base64");
    },

    base64Decode: (data: string) => {
      const buffer = Buffer.from(data, "base64");
      return new Uint8Array(
        buffer.buffer,
        buffer.byteOffset,
        buffer.byteLength
      );
    },

    fetch: globalThis.fetch,
  };
};

// =============================================================================
// Web Crypto Runtime (Cloudflare Workers, Deno, Bun, Edge)
// =============================================================================

export const createWebCryptoRuntime = (
  type: RuntimeType = "edge"
): RuntimeService => {
  const encoder = new TextEncoder();

  const getVersion = (): string => {
    if (type === "deno") {
      return (
        (globalThis as unknown as { Deno?: { version?: { deno?: string } } })
          .Deno?.version?.deno ?? "unknown"
      );
    }
    if (type === "bun") {
      return (
        (globalThis as unknown as { Bun?: { version?: string } }).Bun
          ?.version ?? "unknown"
      );
    }
    return "unknown";
  };

  return {
    info: {
      type,
      version: getVersion(),
      isEdge: true,
      supportsStreaming: true,
      supportsCrypto: true,
    },

    env: (key: string) => {
      // Different runtimes access env differently
      if (type === "deno") {
        return (
          globalThis as unknown as {
            Deno?: { env?: { get: (k: string) => string | undefined } };
          }
        ).Deno?.env?.get(key);
      }
      if (type === "bun" || type === "node") {
        return process?.env?.[key];
      }
      // Cloudflare Workers - env is passed to handler, not global
      // This is a limitation - env should be passed explicitly
      return undefined;
    },

    requireEnv: (key: string) =>
      Effect.gen(function* () {
        let value: string | undefined;
        if (type === "deno") {
          value = (
            globalThis as unknown as {
              Deno?: { env?: { get: (k: string) => string | undefined } };
            }
          ).Deno?.env?.get(key);
        } else if (type === "bun" || type === "node") {
          value = process?.env?.[key];
        }
        if (!value) {
          return yield* Effect.fail(
            new RuntimeError(
              "requireEnv",
              `Missing environment variable: ${key}`
            )
          );
        }
        return value;
      }),

    randomUUID: () => crypto.randomUUID(),

    randomBytes: (length: number) => {
      const bytes = new Uint8Array(length);
      crypto.getRandomValues(bytes);
      return bytes;
    },

    hmacSHA256: (key: string, data: string) =>
      Effect.tryPromise({
        try: async () => {
          const keyData = encoder.encode(key);
          const cryptoKey = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
          );
          const signature = await crypto.subtle.sign(
            "HMAC",
            cryptoKey,
            encoder.encode(data)
          );
          return hexEncode(signature);
        },
        catch: (e) => new RuntimeError("hmacSHA256", e),
      }),

    hashSHA256: (data: string) =>
      Effect.tryPromise({
        try: async () => {
          const hash = await crypto.subtle.digest(
            "SHA-256",
            encoder.encode(data)
          );
          return hexEncode(hash);
        },
        catch: (e) => new RuntimeError("hashSHA256", e),
      }),

    now: () => Date.now(),

    sleep: (ms: number) =>
      Effect.promise(() => new Promise((resolve) => setTimeout(resolve, ms))),

    base64Encode: (data: string | Uint8Array) => {
      if (typeof data === "string") {
        return btoa(data);
      }
      // Convert Uint8Array to string then base64
      let binary = "";
      for (let i = 0; i < data.length; i++) {
        binary += String.fromCharCode(data[i]);
      }
      return btoa(binary);
    },

    base64Decode: (data: string) => {
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    },

    fetch: globalThis.fetch,
  };
};

// =============================================================================
// Auto-detect and create runtime
// =============================================================================

export const createRuntime = (): RuntimeService => {
  const type = detectRuntime();

  if (type === "node") {
    return createNodeRuntime();
  }

  return createWebCryptoRuntime(type);
};

// =============================================================================
// Layers
// =============================================================================

export const RuntimeServiceLive = Layer.sync(RuntimeService, () =>
  createRuntime()
);

export const NodeRuntimeLive = Layer.sync(RuntimeService, () =>
  createNodeRuntime()
);

export const EdgeRuntimeLive = Layer.sync(RuntimeService, () =>
  createWebCryptoRuntime("edge")
);

export const CloudflareRuntimeLive = Layer.sync(RuntimeService, () =>
  createWebCryptoRuntime("cloudflare")
);

export const DenoRuntimeLive = Layer.sync(RuntimeService, () =>
  createWebCryptoRuntime("deno")
);

export const BunRuntimeLive = Layer.sync(RuntimeService, () =>
  createWebCryptoRuntime("bun")
);
