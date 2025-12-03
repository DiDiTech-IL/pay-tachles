// =============================================================================
// In-Memory Storage Provider
// Perfect for testing, development, or single-instance deployments
// =============================================================================

import { Effect } from "effect";
import { StorageProvider, createStorageLayer } from "./provider";

interface CacheEntry<T> {
  value: T;
  expiresAt: number | null; // null = no expiry
}

// =============================================================================
// In-Memory Store Implementation
// =============================================================================

export const createMemoryProvider = (options?: { prefix?: string }): StorageProvider => {
  const prefix = options?.prefix ?? "";
  const store = new Map<string, CacheEntry<unknown>>();
  const hashStore = new Map<string, Map<string, unknown>>();
  const listStore = new Map<string, unknown[]>();

  const prefixKey = (key: string) => `${prefix}${key}`;

  // Clean expired entries
  const isExpired = (entry: CacheEntry<unknown>): boolean => {
    if (entry.expiresAt === null) return false;
    return Date.now() > entry.expiresAt;
  };

  const getEntry = <T>(key: string): CacheEntry<T> | null => {
    const entry = store.get(prefixKey(key)) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (isExpired(entry)) {
      store.delete(prefixKey(key));
      return null;
    }
    return entry;
  };

  return {
    get: <T>(key: string) =>
      Effect.sync(() => {
        const entry = getEntry<T>(key);
        return entry?.value ?? null;
      }),

    set: <T>(key: string, value: T, ttlSeconds?: number) =>
      Effect.sync(() => {
        const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
        store.set(prefixKey(key), { value, expiresAt });
      }),

    del: (key: string) =>
      Effect.sync(() => {
        store.delete(prefixKey(key));
        hashStore.delete(prefixKey(key));
        listStore.delete(prefixKey(key));
      }),

    exists: (key: string) =>
      Effect.sync(() => {
        const entry = getEntry(key);
        return entry !== null;
      }),

    incr: (key: string) =>
      Effect.sync(() => {
        const entry = getEntry<number>(key);
        const newValue = (entry?.value ?? 0) + 1;
        store.set(prefixKey(key), { 
          value: newValue, 
          expiresAt: entry?.expiresAt ?? null 
        });
        return newValue;
      }),

    setNX: <T>(key: string, value: T, ttlSeconds?: number) =>
      Effect.sync(() => {
        if (getEntry(key) !== null) return false;
        const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
        store.set(prefixKey(key), { value, expiresAt });
        return true;
      }),

    expire: (key: string, ttlSeconds: number) =>
      Effect.sync(() => {
        const entry = store.get(prefixKey(key));
        if (entry) {
          entry.expiresAt = Date.now() + ttlSeconds * 1000;
        }
      }),

    ttl: (key: string) =>
      Effect.sync(() => {
        const entry = store.get(prefixKey(key));
        if (!entry) return -2; // Key doesn't exist
        if (entry.expiresAt === null) return -1; // No expiry
        const remaining = Math.ceil((entry.expiresAt - Date.now()) / 1000);
        return remaining > 0 ? remaining : -2;
      }),

    hget: <T>(key: string, field: string) =>
      Effect.sync(() => {
        const hash = hashStore.get(prefixKey(key));
        if (!hash) return null;
        return (hash.get(field) as T) ?? null;
      }),

    hset: <T>(key: string, field: string, value: T) =>
      Effect.sync(() => {
        let hash = hashStore.get(prefixKey(key));
        if (!hash) {
          hash = new Map();
          hashStore.set(prefixKey(key), hash);
        }
        hash.set(field, value);
      }),

    hdel: (key: string, field: string) =>
      Effect.sync(() => {
        const hash = hashStore.get(prefixKey(key));
        if (hash) {
          hash.delete(field);
        }
      }),

    hgetall: <T>(key: string) =>
      Effect.sync(() => {
        const hash = hashStore.get(prefixKey(key));
        if (!hash || hash.size === 0) return null;
        const result: Record<string, T> = {};
        hash.forEach((value, field) => {
          result[field] = value as T;
        });
        return result;
      }),

    lpush: <T>(key: string, value: T) =>
      Effect.sync(() => {
        let list = listStore.get(prefixKey(key));
        if (!list) {
          list = [];
          listStore.set(prefixKey(key), list);
        }
        list.unshift(value);
        return list.length;
      }),

    rpop: <T>(key: string) =>
      Effect.sync(() => {
        const list = listStore.get(prefixKey(key));
        if (!list || list.length === 0) return null;
        return list.pop() as T;
      }),

    lrange: <T>(key: string, start: number, stop: number) =>
      Effect.sync(() => {
        const list = listStore.get(prefixKey(key));
        if (!list) return [];
        // Handle negative indices like Redis
        const len = list.length;
        const realStart = start < 0 ? Math.max(len + start, 0) : start;
        const realStop = stop < 0 ? len + stop + 1 : stop + 1;
        return list.slice(realStart, realStop) as T[];
      }),

    llen: (key: string) =>
      Effect.sync(() => {
        const list = listStore.get(prefixKey(key));
        return list?.length ?? 0;
      }),

    ping: () => Effect.succeed(true),

    close: () => Effect.sync(() => {
      store.clear();
      hashStore.clear();
      listStore.clear();
    }),
  };
};

// =============================================================================
// Layer
// =============================================================================

export const MemoryStorageProviderLive = (options?: { prefix?: string }) =>
  createStorageLayer(createMemoryProvider(options));
