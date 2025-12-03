// =============================================================================
// Tachles Pay - Services Module
// Unopinionated, self-hostable payment management tool
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
} from "../config";

// Core services
export { CryptoService, CryptoLive } from "./crypto";
export { KVService, KVServiceLive, KVError } from "./kv";
export { DbService, DbServiceLive } from "./db";
export type {
  App,
  CreateAppInput,
  UpdateAppInput,
  // Payup types (temporary payment intent)
  Payup,
  CreatePayupInput,
  UpdatePayupInput,
  PayupFilter,
  // Transaction types (finalized payment)
  Transaction,
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFilter,
  // Webhook types
  WebhookTemplate,
  UpsertWebhookTemplateInput,
  WebhookLog,
  CreateWebhookLogInput,
  WebhookLogFilter,
  // Legacy aliases
  Payment,
  CreatePaymentInput,
  UpdatePaymentInput,
  PaymentFilter,
} from "./db";

// Webhook services
export { WebhookSecurityService, WebhookSecurityServiceLive } from "./webhook-security";
export { WebhookHandlerService, WebhookHandlerServiceLive } from "./webhook-handler";
export type {
  WebhookPayloadData,
  WebhookDeliveryResult,
  TemplateFormat,
  CreateTemplateInput,
} from "./webhook-handler";

// Database Provider Facade (for swappable database implementations)
export {
  DatabaseProvider,
  PrismaProviderLive,
  MemoryDatabaseProviderLive,
  createDatabaseLayer,
  createPrismaProviderLayer,
  createMemoryDatabaseLayer,
  createMemoryDatabaseProvider,
} from "./database";
export type {
  DatabaseProviderType,
  DatabaseConfig,
  App as ProviderApp,
  Payup as ProviderPayup,
  Transaction as ProviderTransaction,
} from "./database";

// Storage Provider Facade (for swappable cache/KV implementations)
export {
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
} from "./storage";

// Queue services (legacy - consider using storage provider instead)
export { QueueService, makeCloudflareQueueLayer, makeHttpQueueLayer, QueueServiceMock, getQueuedMessages, clearQueue } from "./queue";
