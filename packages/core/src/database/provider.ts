// =============================================================================
// Database Provider Interface
// =============================================================================

import { Effect, Context, Layer } from "effect";
import { DbError } from "../errors";
import type {
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
} from "../types";

// =============================================================================
// Database Provider Interface
// =============================================================================

export interface DatabaseProvider {
  // Connection lifecycle
  readonly connect: () => Effect.Effect<void, DbError>;
  readonly disconnect: () => Effect.Effect<void, DbError>;
  readonly isConnected: () => boolean;

  // App operations
  readonly getAppByApiKey: (apiKey: string) => Effect.Effect<App | null, DbError>;
  readonly getAppById: (id: string) => Effect.Effect<App | null, DbError>;
  readonly listApps: () => Effect.Effect<App[], DbError>;
  readonly createApp: (data: CreateAppInput) => Effect.Effect<App, DbError>;
  readonly updateApp: (id: string, data: UpdateAppInput) => Effect.Effect<App, DbError>;
  readonly deleteApp: (id: string) => Effect.Effect<void, DbError>;

  // Payup operations
  readonly createPayup: (data: CreatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly getPayup: (id: string) => Effect.Effect<Payup | null, DbError>;
  readonly updatePayup: (id: string, data: UpdatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly listPayups: (filter?: PayupFilter) => Effect.Effect<Payup[], DbError>;

  // Transaction operations
  readonly createTransaction: (data: CreateTransactionInput) => Effect.Effect<Transaction, DbError>;
  readonly getTransaction: (id: string) => Effect.Effect<Transaction | null, DbError>;
  readonly getTransactionByPayupId: (payupId: string) => Effect.Effect<Transaction | null, DbError>;
  readonly getTransactionByExternalId: (appId: string, externalId: string) => Effect.Effect<Transaction | null, DbError>;
  readonly updateTransaction: (id: string, data: UpdateTransactionInput) => Effect.Effect<Transaction, DbError>;
  readonly listTransactions: (filter?: TransactionFilter) => Effect.Effect<Transaction[], DbError>;

  // Webhook template operations
  readonly listWebhookTemplates: (appId: string) => Effect.Effect<WebhookTemplate[], DbError>;
  readonly getWebhookTemplate: (id: string) => Effect.Effect<WebhookTemplate | null, DbError>;
  readonly upsertWebhookTemplate: (data: UpsertWebhookTemplateInput) => Effect.Effect<WebhookTemplate, DbError>;
  readonly deleteWebhookTemplate: (id: string) => Effect.Effect<void, DbError>;

  // Webhook log operations
  readonly createWebhookLog: (data: CreateWebhookLogInput) => Effect.Effect<WebhookLog, DbError>;
  readonly listWebhookLogs: (filter?: WebhookLogFilter) => Effect.Effect<WebhookLog[], DbError>;
}

// =============================================================================
// Context & Layer
// =============================================================================

export const Database = Context.GenericTag<DatabaseProvider>("@tachles/Database");

export const createDatabaseLayer = (provider: DatabaseProvider): Layer.Layer<DatabaseProvider> =>
  Layer.succeed(Database, provider);
