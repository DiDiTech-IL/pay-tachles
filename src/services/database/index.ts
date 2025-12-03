// =============================================================================
// Database Module - Facade for Multiple Database Providers
// =============================================================================
//
// Tachles Pay supports multiple database backends. Choose one based on your needs:
//
// 1. In-Memory (for testing/dev/single-instance):
//    import { DatabaseProvider, MemoryDatabaseProviderLive } from "@/services/database";
//    Effect.runPromise(program.pipe(Effect.provide(MemoryDatabaseProviderLive)));
//
// 2. Prisma (PostgreSQL/MySQL/SQLite - recommended for production):
//    import { DatabaseProvider, PrismaProviderLive } from "@/services/database";
//    Effect.runPromise(program.pipe(Effect.provide(PrismaProviderLive)));
//
// 3. Custom provider:
//    import { DatabaseProvider, createDatabaseLayer, type DatabaseProvider as DbProvider } from "@/services/database";
//    const myProvider: DbProvider = { ... };
//    const MyProviderLive = createDatabaseLayer(myProvider);
//
// =============================================================================

// Core types and interface
export {
  DatabaseProvider,
  createDatabaseLayer,
  type App,
  type Payup,
  type Transaction,
  type WebhookTemplate,
  type WebhookLog,
  type CreateAppInput,
  type UpdateAppInput,
  type CreatePayupInput,
  type UpdatePayupInput,
  type PayupFilter,
  type CreateTransactionInput,
  type UpdateTransactionInput,
  type TransactionFilter,
  type CreateWebhookLogInput,
  type WebhookLogFilter,
  type UpsertWebhookTemplateInput,
  type DatabaseProviderType,
  type DatabaseConfig,
} from "./provider";

// Provider implementations
export { PrismaProviderLive, createPrismaProviderLayer } from "./prisma-provider";
export { 
  MemoryDatabaseProviderLive, 
  createMemoryDatabaseLayer,
  createMemoryDatabaseProvider 
} from "./memory-provider";
