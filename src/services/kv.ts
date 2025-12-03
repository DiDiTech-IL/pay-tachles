import { Effect, Context, Layer } from "effect";
import { Redis } from "@upstash/redis";
import { ConfigService } from "@/config";

// =============================================================================
// KV Store Errors
// =============================================================================

export class KVError {
  readonly _tag = "KVError";
  constructor(readonly operation: string, readonly cause?: unknown) {}
}

// =============================================================================
// KV Store Service Interface
// =============================================================================

export interface KVService {
  readonly get: <T>(key: string) => Effect.Effect<T | null, KVError>;
  readonly set: <T>(key: string, value: T, ttlSeconds?: number) => Effect.Effect<void, KVError>;
  readonly del: (key: string) => Effect.Effect<void, KVError>;
  readonly exists: (key: string) => Effect.Effect<boolean, KVError>;
  readonly incr: (key: string) => Effect.Effect<number, KVError>;
  readonly expire: (key: string, ttlSeconds: number) => Effect.Effect<void, KVError>;
  readonly setNX: <T>(key: string, value: T, ttlSeconds?: number) => Effect.Effect<boolean, KVError>;
  readonly hget: <T>(key: string, field: string) => Effect.Effect<T | null, KVError>;
  readonly hset: <T>(key: string, field: string, value: T) => Effect.Effect<void, KVError>;
  readonly hdel: (key: string, field: string) => Effect.Effect<void, KVError>;
  readonly hgetall: <T>(key: string) => Effect.Effect<Record<string, T> | null, KVError>;
  readonly lpush: <T>(key: string, value: T) => Effect.Effect<number, KVError>;
  readonly rpop: <T>(key: string) => Effect.Effect<T | null, KVError>;
  readonly lrange: <T>(key: string, start: number, stop: number) => Effect.Effect<T[], KVError>;
}

export const KVService = Context.GenericTag<KVService>("KVService");

// =============================================================================
// Prefixed Key Helper
// =============================================================================

const prefixKey = (prefix: string, key: string) => `${prefix}${key}`;

// =============================================================================
// Upstash Redis Implementation
// =============================================================================

const createRedisKV = (redis: Redis, prefix: string): KVService => ({
  get: <T>(key: string) =>
    Effect.tryPromise({
      try: () => redis.get<T>(prefixKey(prefix, key)),
      catch: (e) => new KVError(`get:${key}`, e),
    }),

  set: <T>(key: string, value: T, ttlSeconds?: number) =>
    Effect.tryPromise({
      try: async () => {
        if (ttlSeconds) {
          await redis.setex(prefixKey(prefix, key), ttlSeconds, value);
        } else {
          await redis.set(prefixKey(prefix, key), value);
        }
      },
      catch: (e) => new KVError(`set:${key}`, e),
    }),

  del: (key: string) =>
    Effect.tryPromise({
      try: async () => {
        await redis.del(prefixKey(prefix, key));
      },
      catch: (e) => new KVError(`del:${key}`, e),
    }),

  exists: (key: string) =>
    Effect.tryPromise({
      try: async () => {
        const result = await redis.exists(prefixKey(prefix, key));
        return result === 1;
      },
      catch: (e) => new KVError(`exists:${key}`, e),
    }),

  incr: (key: string) =>
    Effect.tryPromise({
      try: () => redis.incr(prefixKey(prefix, key)),
      catch: (e) => new KVError(`incr:${key}`, e),
    }),

  expire: (key: string, ttlSeconds: number) =>
    Effect.tryPromise({
      try: async () => {
        await redis.expire(prefixKey(prefix, key), ttlSeconds);
      },
      catch: (e) => new KVError(`expire:${key}`, e),
    }),

  setNX: <T>(key: string, value: T, ttlSeconds?: number) =>
    Effect.tryPromise({
      try: async () => {
        if (ttlSeconds) {
          const result = await redis.set(prefixKey(prefix, key), value, { nx: true, ex: ttlSeconds });
          return result === "OK";
        } else {
          const result = await redis.setnx(prefixKey(prefix, key), value);
          return result === 1;
        }
      },
      catch: (e) => new KVError(`setNX:${key}`, e),
    }),

  hget: <T>(key: string, field: string) =>
    Effect.tryPromise({
      try: () => redis.hget<T>(prefixKey(prefix, key), field),
      catch: (e) => new KVError(`hget:${key}:${field}`, e),
    }),

  hset: <T>(key: string, field: string, value: T) =>
    Effect.tryPromise({
      try: async () => {
        await redis.hset(prefixKey(prefix, key), { [field]: value });
      },
      catch: (e) => new KVError(`hset:${key}:${field}`, e),
    }),

  hdel: (key: string, field: string) =>
    Effect.tryPromise({
      try: async () => {
        await redis.hdel(prefixKey(prefix, key), field);
      },
      catch: (e) => new KVError(`hdel:${key}:${field}`, e),
    }),

  hgetall: <T>(key: string) =>
    Effect.tryPromise({
      try: () => redis.hgetall<Record<string, T>>(prefixKey(prefix, key)),
      catch: (e) => new KVError(`hgetall:${key}`, e),
    }),

  lpush: <T>(key: string, value: T) =>
    Effect.tryPromise({
      try: () => redis.lpush(prefixKey(prefix, key), value),
      catch: (e) => new KVError(`lpush:${key}`, e),
    }),

  rpop: <T>(key: string) =>
    Effect.tryPromise({
      try: () => redis.rpop<T>(prefixKey(prefix, key)),
      catch: (e) => new KVError(`rpop:${key}`, e),
    }),

  lrange: <T>(key: string, start: number, stop: number) =>
    Effect.tryPromise({
      try: () => redis.lrange<T>(prefixKey(prefix, key), start, stop),
      catch: (e) => new KVError(`lrange:${key}`, e),
    }),
});

// =============================================================================
// KV Service Layer (depends on ConfigService)
// =============================================================================

export const KVServiceLive = Layer.effect(
  KVService,
  Effect.gen(function* () {
    const config = yield* ConfigService;
    const prefix = config.getRedisPrefix();

    // Upstash Redis requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
    // from environment, or you can pass url + token directly
    const redis = Redis.fromEnv();

    return createRedisKV(redis, prefix);
  })
);
