import { Effect, Context, Layer } from "effect";
import { PrismaClient, Prisma } from "@/lib/generated/prisma";
import { DbError } from "@/domain/errors";
import { prisma } from "../lib/prisma";

// =============================================================================
// Database Service
// =============================================================================

export interface DbService {
  readonly client: PrismaClient;

  // App operations
  readonly getAppByApiKey: (apiKey: string) => Effect.Effect<App | null, DbError>;
  readonly getAppById: (id: string) => Effect.Effect<App | null, DbError>;
  readonly listApps: () => Effect.Effect<App[], DbError>;
  readonly createApp: (data: CreateAppInput) => Effect.Effect<App, DbError>;
  readonly updateApp: (id: string, data: UpdateAppInput) => Effect.Effect<App, DbError>;
  readonly deleteApp: (id: string) => Effect.Effect<void, DbError>;

  // Payup operations (temporary payment intents)
  readonly createPayup: (data: CreatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly getPayup: (id: string) => Effect.Effect<Payup | null, DbError>;
  readonly updatePayup: (id: string, data: UpdatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly listPayups: (filter?: PayupFilter) => Effect.Effect<Payup[], DbError>;

  // Transaction operations (finalized payments)
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

  // Legacy aliases for backward compatibility
  readonly createPayment: (data: CreatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly getPayment: (id: string) => Effect.Effect<Payup | null, DbError>;
  readonly updatePayment: (id: string, data: UpdatePayupInput) => Effect.Effect<Payup, DbError>;
  readonly listPayments: (filter?: PayupFilter) => Effect.Effect<Payup[], DbError>;
  readonly getPaymentByExternalId: (appId: string, externalId: string) => Effect.Effect<Transaction | null, DbError>;
}

export const DbService = Context.GenericTag<DbService>("DbService");

// =============================================================================
// Types - App
// =============================================================================

export interface App {
  id: string;
  name: string;
  provider: string;
  api_key: string;
  webhook_secret: string;
  webhook_url: string;
  is_active: boolean;
  metadata: unknown;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAppInput {
  name: string;
  provider: string;
  api_key: string;
  webhook_secret: string;
  webhook_url: string;
  metadata?: Prisma.InputJsonValue;
}

export interface UpdateAppInput {
  name?: string;
  webhook_url?: string;
  is_active?: boolean;
  metadata?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
}

// =============================================================================
// Types - Payup (temporary payment intent)
// =============================================================================

export interface Payup {
  id: string;
  app_id: string;
  amount: number;
  currency: string;
  status: string;
  customer_email: string | null;
  customer_name: string | null;
  customer_id: string | null;
  description: string | null;
  return_url: string | null;
  cancel_url: string | null;
  metadata: unknown;
  provider_data: unknown;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
  completed_at: Date | null;
}

export interface CreatePayupInput {
  app_id: string;
  amount: number;
  currency?: string;
  customer_email?: string;
  customer_name?: string;
  customer_id?: string;
  description?: string;
  return_url?: string;
  cancel_url?: string;
  metadata?: Prisma.InputJsonValue;
  expires_at: Date;
}

export interface UpdatePayupInput {
  status?: string;
  provider_data?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
  completed_at?: Date;
}

export interface PayupFilter {
  app_id?: string;
  status?: string;
  customer_id?: string;
  limit?: number;
  offset?: number;
}

// Legacy aliases
export type Payment = Payup;
export type CreatePaymentInput = CreatePayupInput;
export type UpdatePaymentInput = UpdatePayupInput;
export type PaymentFilter = PayupFilter;

// =============================================================================
// Types - Transaction (finalized payment record)
// =============================================================================

export interface Transaction {
  id: string;
  app_id: string;
  payup_id: string;
  external_id: string | null;
  amount: number;
  currency: string;
  status: string;
  customer_email: string | null;
  customer_name: string | null;
  customer_id: string | null;
  description: string | null;
  metadata: unknown;
  failure_reason: string | null;
  provider_data: unknown;
  fees: number | null;
  net_amount: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTransactionInput {
  app_id: string;
  payup_id: string;
  external_id?: string;
  amount: number;
  currency?: string;
  status: string;
  customer_email?: string;
  customer_name?: string;
  customer_id?: string;
  description?: string;
  metadata?: Prisma.InputJsonValue;
  failure_reason?: string;
  provider_data?: Prisma.InputJsonValue;
  fees?: number;
  net_amount?: number;
}

export interface UpdateTransactionInput {
  external_id?: string;
  status?: string;
  failure_reason?: string;
  provider_data?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
  fees?: number;
  net_amount?: number;
}

export interface TransactionFilter {
  app_id?: string;
  payup_id?: string;
  status?: string;
  customer_id?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// Types - Webhook Template
// =============================================================================

export interface WebhookTemplate {
  id: string;
  app_id: string;
  name: string;
  event_type: string;
  format: unknown; // JSON value
  is_default: boolean;
  headers: unknown; // JSON value
  created_at: Date;
  updated_at: Date;
}

export interface UpsertWebhookTemplateInput {
  app_id: string;
  name: string;
  event_type: string;
  format: Prisma.InputJsonValue;
  is_default?: boolean;
  headers?: Prisma.InputJsonValue;
}

// =============================================================================
// Types - Webhook Log
// =============================================================================

export interface WebhookLog {
  id: string;
  app_id: string;
  transaction_id: string | null;
  event_type: string;
  direction: string;
  payload: unknown;
  headers: unknown;
  status_code: number | null;
  response_body: string | null;
  error_message: string | null;
  retry_count: number;
  next_retry_at: Date | null;
  processed_at: Date;
  latency_ms: number | null;
}

export interface CreateWebhookLogInput {
  app_id: string;
  transaction_id?: string;
  event_type: string;
  direction: "inbound" | "outbound";
  payload: Prisma.InputJsonValue;
  headers?: Prisma.InputJsonValue;
  status_code?: number;
  response_body?: string;
  error_message?: string;
  retry_count?: number;
  next_retry_at?: Date;
  latency_ms?: number;
}

export interface WebhookLogFilter {
  app_id?: string;
  transaction_id?: string;
  event_type?: string;
  direction?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// Implementation
// =============================================================================

const createDbService = (prisma: PrismaClient): DbService => ({
  client: prisma,

  // App operations
  getAppByApiKey: (apiKey) =>
    Effect.tryPromise({
      try: () => prisma.app.findUnique({ where: { api_key: apiKey } }),
      catch: (e) => new DbError({ operation: `getAppByApiKey: ${e}` }),
    }),

  getAppById: (id) =>
    Effect.tryPromise({
      try: () => prisma.app.findUnique({ where: { id } }),
      catch: (e) => new DbError({ operation: `getAppById: ${e}` }),
    }),

  listApps: () =>
    Effect.tryPromise({
      try: () => prisma.app.findMany({ orderBy: { created_at: "desc" } }),
      catch: (e) => new DbError({ operation: `listApps: ${e}` }),
    }),

  createApp: (data) =>
    Effect.tryPromise({
      try: () => prisma.app.create({ data }),
      catch: (e) => new DbError({ operation: `createApp: ${e}` }),
    }),

  updateApp: (id, data) =>
    Effect.tryPromise({
      try: () => prisma.app.update({ where: { id }, data }),
      catch: (e) => new DbError({ operation: `updateApp: ${e}` }),
    }),

  deleteApp: (id) =>
    Effect.tryPromise({
      try: async () => {
        await prisma.app.delete({ where: { id } });
      },
      catch: (e) => new DbError({ operation: `deleteApp: ${e}` }),
    }),

  // Payup operations
  createPayup: (data) =>
    Effect.tryPromise({
      try: () => prisma.payup.create({ data }),
      catch: (e) => new DbError({ operation: `createPayup: ${e}` }),
    }),

  getPayup: (id) =>
    Effect.tryPromise({
      try: () => prisma.payup.findUnique({ where: { id } }),
      catch: (e) => new DbError({ operation: `getPayup: ${e}` }),
    }),

  updatePayup: (id, data) =>
    Effect.tryPromise({
      try: () => prisma.payup.update({ where: { id }, data }),
      catch: (e) => new DbError({ operation: `updatePayup: ${e}` }),
    }),

  listPayups: (filter) =>
    Effect.tryPromise({
      try: () =>
        prisma.payup.findMany({
          where: {
            app_id: filter?.app_id,
            status: filter?.status,
            customer_id: filter?.customer_id,
          },
          orderBy: { created_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        }),
      catch: (e) => new DbError({ operation: `listPayups: ${e}` }),
    }),

  // Transaction operations
  createTransaction: (data) =>
    Effect.tryPromise({
      try: () => prisma.transaction.create({ data }),
      catch: (e) => new DbError({ operation: `createTransaction: ${e}` }),
    }),

  getTransaction: (id) =>
    Effect.tryPromise({
      try: () => prisma.transaction.findUnique({ where: { id } }),
      catch: (e) => new DbError({ operation: `getTransaction: ${e}` }),
    }),

  getTransactionByPayupId: (payupId) =>
    Effect.tryPromise({
      try: () => prisma.transaction.findUnique({ where: { payup_id: payupId } }),
      catch: (e) => new DbError({ operation: `getTransactionByPayupId: ${e}` }),
    }),

  getTransactionByExternalId: (appId, externalId) =>
    Effect.tryPromise({
      try: () =>
        prisma.transaction.findFirst({
          where: { app_id: appId, external_id: externalId },
        }),
      catch: (e) => new DbError({ operation: `getTransactionByExternalId: ${e}` }),
    }),

  updateTransaction: (id, data) =>
    Effect.tryPromise({
      try: () => prisma.transaction.update({ where: { id }, data }),
      catch: (e) => new DbError({ operation: `updateTransaction: ${e}` }),
    }),

  listTransactions: (filter) =>
    Effect.tryPromise({
      try: () =>
        prisma.transaction.findMany({
          where: {
            app_id: filter?.app_id,
            payup_id: filter?.payup_id,
            status: filter?.status,
            customer_id: filter?.customer_id,
          },
          orderBy: { created_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        }),
      catch: (e) => new DbError({ operation: `listTransactions: ${e}` }),
    }),

  // Webhook template operations
  listWebhookTemplates: (appId) =>
    Effect.tryPromise({
      try: () =>
        prisma.webhookTemplate.findMany({
          where: { app_id: appId },
          orderBy: { created_at: "desc" },
        }),
      catch: (e) => new DbError({ operation: `listWebhookTemplates: ${e}` }),
    }),

  getWebhookTemplate: (id) =>
    Effect.tryPromise({
      try: () => prisma.webhookTemplate.findUnique({ where: { id } }),
      catch: (e) => new DbError({ operation: `getWebhookTemplate: ${e}` }),
    }),

  upsertWebhookTemplate: (data) =>
    Effect.tryPromise({
      try: () =>
        prisma.webhookTemplate.upsert({
          where: {
            app_id_name_event_type: {
              app_id: data.app_id,
              name: data.name,
              event_type: data.event_type,
            },
          },
          create: {
            app_id: data.app_id,
            name: data.name,
            event_type: data.event_type,
            format: data.format,
            is_default: data.is_default ?? false,
            headers: data.headers,
          },
          update: {
            format: data.format,
            is_default: data.is_default ?? false,
            headers: data.headers,
          },
        }),
      catch: (e) => new DbError({ operation: `upsertWebhookTemplate: ${e}` }),
    }),

  deleteWebhookTemplate: (id) =>
    Effect.tryPromise({
      try: async () => {
        await prisma.webhookTemplate.delete({ where: { id } });
      },
      catch: (e) => new DbError({ operation: `deleteWebhookTemplate: ${e}` }),
    }),

  // Webhook log operations
  createWebhookLog: (data) =>
    Effect.tryPromise({
      try: () => prisma.webhookLog.create({ data }),
      catch: (e) => new DbError({ operation: `createWebhookLog: ${e}` }),
    }),

  listWebhookLogs: (filter) =>
    Effect.tryPromise({
      try: () =>
        prisma.webhookLog.findMany({
          where: {
            app_id: filter?.app_id,
            transaction_id: filter?.transaction_id,
            event_type: filter?.event_type,
            direction: filter?.direction,
          },
          orderBy: { processed_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        }),
      catch: (e) => new DbError({ operation: `listWebhookLogs: ${e}` }),
    }),

  // Legacy aliases for backward compatibility
  createPayment: (data) =>
    Effect.tryPromise({
      try: () => prisma.payup.create({ data }),
      catch: (e) => new DbError({ operation: `createPayment: ${e}` }),
    }),

  getPayment: (id) =>
    Effect.tryPromise({
      try: () => prisma.payup.findUnique({ where: { id } }),
      catch: (e) => new DbError({ operation: `getPayment: ${e}` }),
    }),

  updatePayment: (id, data) =>
    Effect.tryPromise({
      try: () => prisma.payup.update({ where: { id }, data }),
      catch: (e) => new DbError({ operation: `updatePayment: ${e}` }),
    }),

  listPayments: (filter) =>
    Effect.tryPromise({
      try: () =>
        prisma.payup.findMany({
          where: {
            app_id: filter?.app_id,
            status: filter?.status,
            customer_id: filter?.customer_id,
          },
          orderBy: { created_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        }),
      catch: (e) => new DbError({ operation: `listPayments: ${e}` }),
    }),

  getPaymentByExternalId: (appId, externalId) =>
    Effect.tryPromise({
      try: () =>
        prisma.transaction.findFirst({
          where: { app_id: appId, external_id: externalId },
        }),
      catch: (e) => new DbError({ operation: `getPaymentByExternalId: ${e}` }),
    }),
});

// =============================================================================
// Layer - Singleton Prisma Client
// =============================================================================


export const DbServiceLive = Layer.sync(DbService, () => {
  
  return createDbService(prisma);
});
