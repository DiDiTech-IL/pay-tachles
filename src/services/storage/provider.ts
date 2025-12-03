// =============================================================================
// Storage Provider Facade
// Abstract interface for key-value storage (Redis, Upstash, Cloudflare KV, Memory)
// =============================================================================

import { Effect, Context, Layer } from "effect";

// =============================================================================
// Storage Error
// =============================================================================

export class StorageError {
  readonly _tag = "StorageError";
  constructor(
    readonly operation: string,
    readonly key?: string,
    readonly cause?: unknown
  ) {}

  get message(): string {
    return this.key
      ? `Storage error during ${this.operation} for key: ${this.key}`
      : `Storage error during ${this.operation}`;
  }
}

// =============================================================================
// Storage Provider Interface
// Minimal interface that any KV store must implement
// =============================================================================

export interface StorageProvider {
  // Basic operations
  readonly get: <T>(key: string) => Effect.Effect<T | null, StorageError>;
  readonly set: <T>(key: string, value: T, ttlSeconds?: number) => Effect.Effect<void, StorageError>;
  readonly del: (key: string) => Effect.Effect<void, StorageError>;
  readonly exists: (key: string) => Effect.Effect<boolean, StorageError>;

  // Atomic operations
  readonly incr: (key: string) => Effect.Effect<number, StorageError>;
  readonly setNX: <T>(key: string, value: T, ttlSeconds?: number) => Effect.Effect<boolean, StorageError>;

  // TTL operations
  readonly expire: (key: string, ttlSeconds: number) => Effect.Effect<void, StorageError>;
  readonly ttl: (key: string) => Effect.Effect<number, StorageError>;

  // Hash operations (for structured data)
  readonly hget: <T>(key: string, field: string) => Effect.Effect<T | null, StorageError>;
  readonly hset: <T>(key: string, field: string, value: T) => Effect.Effect<void, StorageError>;
  readonly hdel: (key: string, field: string) => Effect.Effect<void, StorageError>;
  readonly hgetall: <T>(key: string) => Effect.Effect<Record<string, T> | null, StorageError>;

  // List operations (for queues)
  readonly lpush: <T>(key: string, value: T) => Effect.Effect<number, StorageError>;
  readonly rpop: <T>(key: string) => Effect.Effect<T | null, StorageError>;
  readonly lrange: <T>(key: string, start: number, stop: number) => Effect.Effect<T[], StorageError>;
  readonly llen: (key: string) => Effect.Effect<number, StorageError>;

  // Utility
  readonly ping: () => Effect.Effect<boolean, StorageError>;
  readonly close: () => Effect.Effect<void, StorageError>;
}

// =============================================================================
// Storage Provider Context
// =============================================================================

export const StorageProvider = Context.GenericTag<StorageProvider>("StorageProvider");

// =============================================================================
// Factory function to create a Layer from any provider implementation
// =============================================================================

export const createStorageLayer = (provider: StorageProvider): Layer.Layer<StorageProvider> =>
  Layer.succeed(StorageProvider, provider);

// =============================================================================
// Provider Types
// =============================================================================

export type StorageProviderType = 
  | "memory"      // In-memory (for testing/dev)
  | "upstash"     // Upstash Redis (serverless)
  | "redis"       // Standard Redis
  | "cloudflare"  // Cloudflare KV
  | "custom";     // Custom implementation

export interface StorageConfig {
  provider: StorageProviderType;
  url?: string;
  prefix?: string;
  options?: Record<string, unknown>;
}
