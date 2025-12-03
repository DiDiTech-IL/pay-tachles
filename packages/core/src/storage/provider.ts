// =============================================================================
// Storage Provider Interface (KV/Cache)
// =============================================================================

import { Effect, Context, Layer } from "effect";
import { StorageError } from "../errors";

// =============================================================================
// Storage Provider Interface
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

  // TTL
  readonly expire: (key: string, ttlSeconds: number) => Effect.Effect<void, StorageError>;
  readonly ttl: (key: string) => Effect.Effect<number, StorageError>;

  // Hash operations
  readonly hget: <T>(key: string, field: string) => Effect.Effect<T | null, StorageError>;
  readonly hset: <T>(key: string, field: string, value: T) => Effect.Effect<void, StorageError>;
  readonly hdel: (key: string, field: string) => Effect.Effect<void, StorageError>;
  readonly hgetall: <T>(key: string) => Effect.Effect<Record<string, T> | null, StorageError>;

  // List operations
  readonly lpush: <T>(key: string, value: T) => Effect.Effect<number, StorageError>;
  readonly rpop: <T>(key: string) => Effect.Effect<T | null, StorageError>;
  readonly lrange: <T>(key: string, start: number, stop: number) => Effect.Effect<T[], StorageError>;
  readonly llen: (key: string) => Effect.Effect<number, StorageError>;

  // Utility
  readonly ping: () => Effect.Effect<boolean, StorageError>;
  readonly close: () => Effect.Effect<void, StorageError>;
}

// =============================================================================
// Context & Layer
// =============================================================================

export const Storage = Context.GenericTag<StorageProvider>("@tachles/Storage");

export const createStorageLayer = (provider: StorageProvider): Layer.Layer<StorageProvider> =>
  Layer.succeed(Storage, provider);
