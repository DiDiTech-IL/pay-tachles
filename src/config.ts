import { Context, Layer, Effect } from "effect";
import type { DatabaseProviderType } from "./services/database/provider";
import type { StorageProviderType } from "./services/storage/provider";

// =============================================================================
// Tachles Pay - Configuration System
// Flexible configuration for any deployment environment
// =============================================================================

export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Main configuration interface for Tachles Pay
 * All options have sensible defaults for easy self-hosting
 */
export interface TachlesConfig {
  /**
   * Database configuration
   * Supports: "memory" (no setup), "prisma" (PostgreSQL/MySQL/SQLite)
   */
  database: {
    provider: DatabaseProviderType;
    url?: string; // Required for "prisma", optional for "memory"
    options?: Record<string, unknown>;
  };

  /**
   * Cache/KV storage configuration
   * Supports: "memory" (no setup), "upstash", "redis", "cloudflare"
   */
  storage: {
    provider: StorageProviderType;
    url?: string; // Required for redis/upstash
    token?: string; // Required for upstash
    prefix?: string; // Key prefix, defaults to "tachles:"
    options?: Record<string, unknown>;
  };

  /**
   * Webhook security configuration
   */
  webhook: {
    secret: string; // HMAC secret for signing/verifying webhooks
    toleranceSeconds?: number; // Timestamp tolerance, defaults to 300 (5 min)
  };

  /**
   * Server configuration
   */
  server?: {
    port?: number; // Default: 3000
    host?: string; // Default: "0.0.0.0"
    basePath?: string; // API base path, default: "/api"
  };

  /**
   * Security settings
   */
  security?: {
    apiKeyLength?: number; // Default: 32
    webhookSecretLength?: number; // Default: 32
    sessionTtlMinutes?: number; // Default: 30
  };

  /**
   * Logging configuration
   */
  logging?: {
    level?: LogLevel;
    format?: "json" | "pretty";
    includeTimestamp?: boolean;
  };

  // Legacy fields for backwards compatibility
  redis?: { url: string; prefix?: string };
  worker?: { url?: string };
  options?: { logLevel?: LogLevel };
}

// =============================================================================
// Configuration with Defaults
// =============================================================================

export interface ResolvedConfig {
  database: { provider: DatabaseProviderType; url: string; options: Record<string, unknown> };
  storage: { provider: StorageProviderType; url: string; token: string; prefix: string; options: Record<string, unknown> };
  webhook: { secret: string; toleranceSeconds: number };
  server: { port: number; host: string; basePath: string };
  security: { apiKeyLength: number; webhookSecretLength: number; sessionTtlMinutes: number };
  logging: { level: LogLevel; format: "json" | "pretty"; includeTimestamp: boolean };
}

const DEFAULT_CONFIG = {
  server: { port: 3000, host: "0.0.0.0", basePath: "/api" },
  security: { apiKeyLength: 32, webhookSecretLength: 32, sessionTtlMinutes: 30 },
  logging: { level: "info" as LogLevel, format: "json" as const, includeTimestamp: true },
};

export const resolveConfig = (config: TachlesConfig): ResolvedConfig => ({
  database: {
    provider: config.database.provider,
    url: config.database.url ?? "",
    options: config.database.options ?? {},
  },
  storage: {
    provider: config.storage.provider,
    url: config.storage.url ?? config.redis?.url ?? "",
    token: config.storage.token ?? "",
    prefix: config.storage.prefix ?? config.redis?.prefix ?? "tachles:",
    options: config.storage.options ?? {},
  },
  webhook: {
    secret: config.webhook.secret,
    toleranceSeconds: config.webhook.toleranceSeconds ?? 300,
  },
  server: { ...DEFAULT_CONFIG.server, ...config.server },
  security: { ...DEFAULT_CONFIG.security, ...config.security },
  logging: { ...DEFAULT_CONFIG.logging, ...config.logging, level: config.logging?.level ?? config.options?.logLevel ?? "info" },
});

// =============================================================================
// Configuration Service Interface
// =============================================================================

export interface ConfigService {
  readonly config: ResolvedConfig;
  readonly get: <K extends keyof ResolvedConfig>(key: K) => ResolvedConfig[K];
  // Legacy accessors for backwards compatibility
  readonly getConfig: () => TachlesConfig;
  readonly getDatabaseUrl: () => string;
  readonly getRedisUrl: () => string;
  readonly getRedisPrefix: () => string;
  readonly getWebhookSecret: () => string;
  readonly getWebhookTolerance: () => number;
  readonly getWorkerUrl: () => string | undefined;
}

export const ConfigService = Context.GenericTag<ConfigService>("ConfigService");

// =============================================================================
// Configuration Builders
// =============================================================================

/**
 * Create a minimal in-memory configuration (no external dependencies)
 * Perfect for development, testing, or single-instance deployments
 */
export const createMemoryConfig = (webhookSecret: string): TachlesConfig => ({
  database: { provider: "memory" },
  storage: { provider: "memory" },
  webhook: { secret: webhookSecret },
});

/**
 * Create a production-ready configuration with Prisma + Upstash
 */
export const createProductionConfig = (options: {
  databaseUrl: string;
  upstashUrl: string;
  upstashToken: string;
  webhookSecret: string;
}): TachlesConfig => ({
  database: { provider: "prisma", url: options.databaseUrl },
  storage: { provider: "upstash", url: options.upstashUrl, token: options.upstashToken },
  webhook: { secret: options.webhookSecret },
  logging: { level: "warn", format: "json" },
});

// =============================================================================
// Load Config from Environment
// =============================================================================

export const loadConfigFromEnv = (env: Record<string, string | undefined> = process.env): TachlesConfig => {
  // Database configuration - default to memory for easy development
  const databaseProvider = (env.TACHLES_DATABASE_PROVIDER ?? env.DATABASE_PROVIDER ?? "memory") as DatabaseProviderType;
  const databaseUrl = env.TACHLES_DATABASE_URL ?? env.DATABASE_URL ?? env.TACHLES_PAY_PRISMA_DATABASE_URL;

  // Storage configuration - default to memory for easy development
  const storageProvider = (env.TACHLES_STORAGE_PROVIDER ?? env.STORAGE_PROVIDER ?? "memory") as StorageProviderType;
  const storageUrl = env.TACHLES_REDIS_URL ?? env.REDIS_URL ?? env.UPSTASH_REDIS_REST_URL ?? env.TACHLES_PAY_KV_REST_API_URL;
  const storageToken = env.TACHLES_REDIS_TOKEN ?? env.UPSTASH_REDIS_REST_TOKEN ?? env.TACHLES_PAY_KV_REST_API_TOKEN;

  // Webhook secret
  const webhookSecret = env.TACHLES_WEBHOOK_SECRET ?? env.WEBHOOK_SECRET ?? `dev-${Date.now()}`;

  return {
    database: { provider: databaseProvider, url: databaseUrl },
    storage: { provider: storageProvider, url: storageUrl, token: storageToken, prefix: env.TACHLES_REDIS_PREFIX ?? "tachles:" },
    webhook: { secret: webhookSecret, toleranceSeconds: env.TACHLES_WEBHOOK_TOLERANCE ? parseInt(env.TACHLES_WEBHOOK_TOLERANCE, 10) : 300 },
    server: { port: env.PORT ? parseInt(env.PORT, 10) : 3000, host: env.HOST ?? "0.0.0.0", basePath: env.TACHLES_BASE_PATH ?? "/api" },
    logging: { level: (env.TACHLES_LOG_LEVEL ?? env.LOG_LEVEL ?? "info") as LogLevel, format: "json", includeTimestamp: true },
    worker: { url: env.TACHLES_WORKER_URL },
  };
};

// =============================================================================
// Create Config Layer
// =============================================================================

const createConfigService = (config: TachlesConfig): ConfigService => {
  const resolved = resolveConfig(config);
  return {
    config: resolved,
    get: (key) => resolved[key],
    // Legacy accessors
    getConfig: () => config,
    getDatabaseUrl: () => resolved.database.url,
    getRedisUrl: () => resolved.storage.url,
    getRedisPrefix: () => resolved.storage.prefix,
    getWebhookSecret: () => resolved.webhook.secret,
    getWebhookTolerance: () => resolved.webhook.toleranceSeconds,
    getWorkerUrl: () => config.worker?.url,
  };
};

export const createConfigLayer = (config: TachlesConfig) =>
  Layer.succeed(ConfigService, ConfigService.of(createConfigService(config)));

export const ConfigServiceLive = Layer.sync(ConfigService, () =>
  ConfigService.of(createConfigService(loadConfigFromEnv()))
);

// =============================================================================
// Validation
// =============================================================================

export class ConfigValidationError {
  readonly _tag = "ConfigValidationError";
  constructor(readonly errors: string[]) {}
  get message(): string {
    return `Configuration validation failed:\n${this.errors.map((e) => `  - ${e}`).join("\n")}`;
  }
}

export const validateConfig = (config: TachlesConfig): Effect.Effect<TachlesConfig, ConfigValidationError> =>
  Effect.gen(function* () {
    const errors: string[] = [];

    if (config.database.provider === "prisma" && !config.database.url) {
      errors.push("Database URL is required when using Prisma provider");
    }
    if (config.storage.provider === "upstash" && (!config.storage.url || !config.storage.token)) {
      errors.push("Storage URL and token are required for Upstash");
    }
    if (config.storage.provider === "redis" && !config.storage.url) {
      errors.push("Storage URL is required for Redis");
    }
    if (!config.webhook.secret || config.webhook.secret.length < 8) {
      errors.push("Webhook secret must be at least 8 characters");
    }

    if (errors.length > 0) return yield* Effect.fail(new ConfigValidationError(errors));
    return config;
  });
