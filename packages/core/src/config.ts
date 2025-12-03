// =============================================================================
// Configuration System
// =============================================================================

import { Effect, Context, Layer } from "effect";
import { ConfigError } from "./errors";

// =============================================================================
// Types
// =============================================================================

export type LogLevel = "debug" | "info" | "warn" | "error";
export type DatabaseProvider = "memory" | "custom";
export type StorageProvider = "memory" | "upstash" | "cloudflare-kv" | "custom";

export interface TachlesConfig {
  /**
   * Database provider configuration
   */
  database: {
    provider: DatabaseProvider;
  };

  /**
   * Cache/KV storage configuration
   */
  storage: {
    provider: StorageProvider;
    prefix?: string;
  };

  /**
   * Webhook security
   */
  webhook: {
    secret: string;
    toleranceSeconds?: number;
  };

  /**
   * Server settings (for standalone mode)
   */
  server?: {
    port?: number;
    host?: string;
    basePath?: string;
  };

  /**
   * Security settings
   */
  security?: {
    apiKeyLength?: number;
    sessionTtlMinutes?: number;
  };

  /**
   * Logging
   */
  logging?: {
    level?: LogLevel;
  };
}

export interface ResolvedConfig {
  database: { provider: DatabaseProvider };
  storage: { provider: StorageProvider; prefix: string };
  webhook: { secret: string; toleranceSeconds: number };
  server: { port: number; host: string; basePath: string };
  security: { apiKeyLength: number; sessionTtlMinutes: number };
  logging: { level: LogLevel };
}

// =============================================================================
// Defaults & Resolution
// =============================================================================

const DEFAULTS = {
  server: { port: 3000, host: "0.0.0.0", basePath: "/api" },
  security: { apiKeyLength: 32, sessionTtlMinutes: 30 },
  logging: { level: "info" as LogLevel },
  webhook: { toleranceSeconds: 300 },
  storage: { prefix: "tachles:" },
};

export const resolveConfig = (config: TachlesConfig): ResolvedConfig => ({
  database: { provider: config.database.provider },
  storage: {
    provider: config.storage.provider,
    prefix: config.storage.prefix ?? DEFAULTS.storage.prefix,
  },
  webhook: {
    secret: config.webhook.secret,
    toleranceSeconds: config.webhook.toleranceSeconds ?? DEFAULTS.webhook.toleranceSeconds,
  },
  server: { ...DEFAULTS.server, ...config.server },
  security: { ...DEFAULTS.security, ...config.security },
  logging: { ...DEFAULTS.logging, ...config.logging },
});

// =============================================================================
// Config Builders
// =============================================================================

/**
 * Create minimal in-memory config (zero external dependencies)
 */
export const createMemoryConfig = (webhookSecret: string): TachlesConfig => ({
  database: { provider: "memory" },
  storage: { provider: "memory" },
  webhook: { secret: webhookSecret },
});

/**
 * Create config for Cloudflare Workers with KV
 */
export const createCloudflareConfig = (webhookSecret: string): TachlesConfig => ({
  database: { provider: "memory" },
  storage: { provider: "cloudflare-kv" },
  webhook: { secret: webhookSecret },
});

/**
 * Create config for serverless with Upstash
 */
export const createUpstashConfig = (webhookSecret: string): TachlesConfig => ({
  database: { provider: "memory" },
  storage: { provider: "upstash" },
  webhook: { secret: webhookSecret },
});

// =============================================================================
// Config Service
// =============================================================================

export interface ConfigService {
  readonly config: ResolvedConfig;
  readonly get: <K extends keyof ResolvedConfig>(key: K) => ResolvedConfig[K];
}

export const ConfigService = Context.GenericTag<ConfigService>("@tachles/ConfigService");

export const createConfigLayer = (config: TachlesConfig) => {
  const resolved = resolveConfig(config);
  return Layer.succeed(
    ConfigService,
    ConfigService.of({
      config: resolved,
      get: (key) => resolved[key],
    })
  );
};

// =============================================================================
// Validation
// =============================================================================

export const validateConfig = (config: TachlesConfig): Effect.Effect<TachlesConfig, ConfigError> =>
  Effect.gen(function* () {
    const errors: string[] = [];

    if (!config.webhook.secret || config.webhook.secret.length < 8) {
      errors.push("Webhook secret must be at least 8 characters");
    }

    if (errors.length > 0) {
      return yield* Effect.fail(new ConfigError({ errors }));
    }

    return config;
  });
