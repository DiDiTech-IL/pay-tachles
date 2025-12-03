// =============================================================================
// Upstash Redis Storage Provider
// Serverless-friendly Redis for edge deployments
// =============================================================================

import { Effect } from "effect";
import { Redis } from "@upstash/redis";
import { StorageProvider, StorageError, createStorageLayer } from "./provider";

// =============================================================================
// Upstash Provider Configuration
// =============================================================================

export interface UpstashConfig {
  url: string;
  token: string;
  prefix?: string;
}

// =============================================================================
// Upstash Provider Implementation
// =============================================================================

export const createUpstashProvider = (config: UpstashConfig): StorageProvider => {
  const redis = new Redis({
    url: config.url,
    token: config.token,
  });
  const prefix = config.prefix ?? "";

  const prefixKey = (key: string) => `${prefix}${key}`;

  return {
    get: <T>(key: string) =>
      Effect.tryPromise({
        try: () => redis.get<T>(prefixKey(key)),
        catch: (e) => new StorageError("get", key, e),
      }),

    set: <T>(key: string, value: T, ttlSeconds?: number) =>
      Effect.tryPromise({
        try: async () => {
          if (ttlSeconds) {
            await redis.setex(prefixKey(key), ttlSeconds, value);
          } else {
            await redis.set(prefixKey(key), value);
          }
        },
        catch: (e) => new StorageError("set", key, e),
      }),

    del: (key: string) =>
      Effect.tryPromise({
        try: async () => {
          await redis.del(prefixKey(key));
        },
        catch: (e) => new StorageError("del", key, e),
      }),

    exists: (key: string) =>
      Effect.tryPromise({
        try: async () => {
          const result = await redis.exists(prefixKey(key));
          return result === 1;
        },
        catch: (e) => new StorageError("exists", key, e),
      }),

    incr: (key: string) =>
      Effect.tryPromise({
        try: () => redis.incr(prefixKey(key)),
        catch: (e) => new StorageError("incr", key, e),
      }),

    setNX: <T>(key: string, value: T, ttlSeconds?: number) =>
      Effect.tryPromise({
        try: async () => {
          if (ttlSeconds) {
            const result = await redis.set(prefixKey(key), value, { nx: true, ex: ttlSeconds });
            return result === "OK";
          }
          const result = await redis.setnx(prefixKey(key), value);
          return result === 1;
        },
        catch: (e) => new StorageError("setNX", key, e),
      }),

    expire: (key: string, ttlSeconds: number) =>
      Effect.tryPromise({
        try: async () => {
          await redis.expire(prefixKey(key), ttlSeconds);
        },
        catch: (e) => new StorageError("expire", key, e),
      }),

    ttl: (key: string) =>
      Effect.tryPromise({
        try: () => redis.ttl(prefixKey(key)),
        catch: (e) => new StorageError("ttl", key, e),
      }),

    hget: <T>(key: string, field: string) =>
      Effect.tryPromise({
        try: () => redis.hget<T>(prefixKey(key), field),
        catch: (e) => new StorageError("hget", key, e),
      }),

    hset: <T>(key: string, field: string, value: T) =>
      Effect.tryPromise({
        try: async () => {
          await redis.hset(prefixKey(key), { [field]: value });
        },
        catch: (e) => new StorageError("hset", key, e),
      }),

    hdel: (key: string, field: string) =>
      Effect.tryPromise({
        try: async () => {
          await redis.hdel(prefixKey(key), field);
        },
        catch: (e) => new StorageError("hdel", key, e),
      }),

    hgetall: <T>(key: string) =>
      Effect.tryPromise({
        try: async () => {
          const result = await redis.hgetall<Record<string, T>>(prefixKey(key));
          if (!result || Object.keys(result).length === 0) return null;
          return result;
        },
        catch: (e) => new StorageError("hgetall", key, e),
      }),

    lpush: <T>(key: string, value: T) =>
      Effect.tryPromise({
        try: () => redis.lpush(prefixKey(key), value),
        catch: (e) => new StorageError("lpush", key, e),
      }),

    rpop: <T>(key: string) =>
      Effect.tryPromise({
        try: () => redis.rpop<T>(prefixKey(key)),
        catch: (e) => new StorageError("rpop", key, e),
      }),

    lrange: <T>(key: string, start: number, stop: number) =>
      Effect.tryPromise({
        try: () => redis.lrange<T>(prefixKey(key), start, stop),
        catch: (e) => new StorageError("lrange", key, e),
      }),

    llen: (key: string) =>
      Effect.tryPromise({
        try: () => redis.llen(prefixKey(key)),
        catch: (e) => new StorageError("llen", key, e),
      }),

    ping: () =>
      Effect.tryPromise({
        try: async () => {
          const result = await redis.ping();
          return result === "PONG";
        },
        catch: (e) => new StorageError("ping", undefined, e),
      }),

    close: () => Effect.succeed(undefined), // Upstash doesn't need explicit close
  };
};

// =============================================================================
// Layer Factory
// =============================================================================

export const createUpstashStorageLayer = (config: UpstashConfig) =>
  createStorageLayer(createUpstashProvider(config));
