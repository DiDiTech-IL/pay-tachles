// =============================================================================
// Tachles Pay - Main Entry Point
// Self-hostable, unopinionated payment management tool
// =============================================================================
//
// QUICK START (In-Memory Mode - No Setup Required):
// -------------------------------------------------
// import { Tachles, createMemoryConfig } from "tachles-pay";
//
// const config = createMemoryConfig("your-webhook-secret");
// const tachles = Tachles.create(config);
//
// // Create an app (payment provider integration)
// const app = await tachles.apps.create({
//   name: "My Store",
//   provider: "stripe",
//   apiKey: "generated-api-key",
//   webhookSecret: "provider-webhook-secret",
//   webhookUrl: "https://mystore.com/webhooks",
// });
//
// // Create a payment session
// const payup = await tachles.payups.create({
//   appId: app.id,
//   amount: 1999, // $19.99 in cents
//   currency: "USD",
//   customerEmail: "customer@example.com",
//   returnUrl: "https://mystore.com/success",
// });
//
// =============================================================================

// Configuration
export {
  ConfigService,
  ConfigServiceLive,
  createConfigLayer,
  loadConfigFromEnv,
  createMemoryConfig,
  createProductionConfig,
  resolveConfig,
  validateConfig,
  ConfigValidationError,
  type TachlesConfig,
  type ResolvedConfig,
  type LogLevel,
} from "./config";

// Domain types and errors
export * from "./domain";

// Services
export {
  // Database
  DatabaseProvider,
  PrismaProviderLive,
  MemoryDatabaseProviderLive,
  createDatabaseLayer,
  createPrismaProviderLayer,
  createMemoryDatabaseLayer,
  createMemoryDatabaseProvider,
  type DatabaseProviderType,
  type DatabaseConfig,
  
  // Storage
  StorageProvider,
  StorageError,
  createStorageLayer,
  createMemoryProvider,
  MemoryStorageProviderLive,
  createUpstashProvider,
  createUpstashStorageLayer,
  type StorageProviderType,
  type StorageConfig,
  type UpstashConfig,
  
  // Crypto
  CryptoService,
  CryptoLive,
  
  // KV (legacy)
  KVService,
  KVServiceLive,
  KVError,
  
  // DB Service (legacy - prefer DatabaseProvider)
  DbService,
  DbServiceLive,
  
  // Webhook
  WebhookSecurityService,
  WebhookSecurityServiceLive,
  WebhookHandlerService,
  WebhookHandlerServiceLive,
} from "./services";

// Types from services
export type {
  App,
  CreateAppInput,
  UpdateAppInput,
  Payup,
  CreatePayupInput,
  UpdatePayupInput,
  PayupFilter,
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilter,
  WebhookTemplate,
  UpsertWebhookTemplateInput,
  WebhookLog,
  CreateWebhookLogInput,
  WebhookLogFilter,
  WebhookPayloadData,
  WebhookDeliveryResult,
} from "./services";

// Runtime adapters
export {
  RuntimeService,
  RuntimeError,
  RuntimeServiceLive,
  NodeRuntimeLive,
  EdgeRuntimeLive,
  CloudflareRuntimeLive,
  DenoRuntimeLive,
  BunRuntimeLive,
  createRuntime,
  detectRuntime,
  type RuntimeType,
  type RuntimeInfo,
} from "./runtime";

// Workflows
export * from "./workflows";

// =============================================================================
// High-Level Client (Convenience Wrapper)
// =============================================================================

import { Effect, Layer } from "effect";
import type { TachlesConfig } from "./config";
import { resolveConfig, createConfigLayer } from "./config";
import { DatabaseProvider, createMemoryDatabaseLayer, PrismaProviderLive } from "./services/database";
import { MemoryStorageProviderLive, createUpstashStorageLayer } from "./services/storage";

export interface TachlesClient {
  // High-level operations (Effect-based, run internally)
  apps: {
    list: () => Promise<import("./services/database").App[]>;
    get: (id: string) => Promise<import("./services/database").App | null>;
    getByApiKey: (apiKey: string) => Promise<import("./services/database").App | null>;
    create: (data: import("./services/database").CreateAppInput) => Promise<import("./services/database").App>;
    update: (id: string, data: import("./services/database").UpdateAppInput) => Promise<import("./services/database").App>;
    delete: (id: string) => Promise<void>;
  };
  payups: {
    list: (filter?: import("./services/database").PayupFilter) => Promise<import("./services/database").Payup[]>;
    get: (id: string) => Promise<import("./services/database").Payup | null>;
    create: (data: import("./services/database").CreatePayupInput) => Promise<import("./services/database").Payup>;
    update: (id: string, data: import("./services/database").UpdatePayupInput) => Promise<import("./services/database").Payup>;
  };
  transactions: {
    list: (filter?: import("./services/database").TransactionFilter) => Promise<import("./services/database").Transaction[]>;
    get: (id: string) => Promise<import("./services/database").Transaction | null>;
    getByPayupId: (payupId: string) => Promise<import("./services/database").Transaction | null>;
  };
}

/**
 * Create a high-level Tachles client
 * This wraps the Effect-based services for simpler Promise-based usage
 */
export const createTachlesClient = (config: TachlesConfig): TachlesClient => {
  const resolved = resolveConfig(config);
  
  // Build the layer stack based on config
  const configLayer = createConfigLayer(config);
  
  // Database layer - use memory for non-prisma or when no URL
  const dbLayer = resolved.database.provider === "prisma" && resolved.database.url
    ? PrismaProviderLive  // Use the default Prisma layer that reads from env
    : createMemoryDatabaseLayer();
  
  // Storage layer
  const storageLayer = resolved.storage.provider === "memory"
    ? MemoryStorageProviderLive()
    : resolved.storage.provider === "upstash" && resolved.storage.url && resolved.storage.token
      ? createUpstashStorageLayer({ url: resolved.storage.url, token: resolved.storage.token, prefix: resolved.storage.prefix })
      : MemoryStorageProviderLive(); // Fallback to memory
  
  // Combine layers
  const mainLayer = Layer.mergeAll(configLayer, dbLayer, storageLayer);
  
  // Helper to run effects
  const runEffect = <A, E>(effect: Effect.Effect<A, E, DatabaseProvider>) =>
    Effect.runPromise(Effect.provide(effect, mainLayer));

  return {
    apps: {
      list: () => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.listApps();
      })),
      get: (id) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.getAppById(id);
      })),
      getByApiKey: (apiKey) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.getAppByApiKey(apiKey);
      })),
      create: (data) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.createApp(data);
      })),
      update: (id, data) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.updateApp(id, data);
      })),
      delete: (id) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.deleteApp(id);
      })),
    },
    payups: {
      list: (filter) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.listPayups(filter);
      })),
      get: (id) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.getPayup(id);
      })),
      create: (data) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.createPayup(data);
      })),
      update: (id, data) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.updatePayup(id, data);
      })),
    },
    transactions: {
      list: (filter) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.listTransactions(filter);
      })),
      get: (id) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.getTransaction(id);
      })),
      getByPayupId: (payupId) => runEffect(Effect.gen(function* () {
        const db = yield* DatabaseProvider;
        return yield* db.getTransactionByPayupId(payupId);
      })),
    },
  };
};

// Convenience namespace
export const Tachles = {
  create: createTachlesClient,
};
