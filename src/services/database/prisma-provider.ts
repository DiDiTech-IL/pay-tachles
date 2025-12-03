// =============================================================================
// Prisma Database Provider Implementation
// =============================================================================

import { Effect, Layer } from "effect";
import { PrismaClient, Prisma } from "@/lib/generated/prisma";
import { DbError } from "@/domain/errors";
import {
  DatabaseProvider,
  type App,
  type Payup,
  type Transaction,
  type WebhookTemplate,
  type WebhookLog,
} from "./provider";

// =============================================================================
// Type Helpers - Convert Record to Prisma InputJsonValue
// =============================================================================

// For optional JSON fields
const toJsonValue = (value: Record<string, unknown> | null | undefined): Prisma.InputJsonValue | undefined => {
  if (value === null || value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
};

// For nullable JSON fields that need to explicitly set null
const toNullableJsonValue = (value: Record<string, unknown> | null | undefined): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return Prisma.JsonNull;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
};

// For required JSON fields
const toRequiredJsonValue = (value: Record<string, unknown>): Prisma.InputJsonValue => {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
};

// =============================================================================
// Type Mappers - Convert between Prisma and Provider types
// =============================================================================

// Helper to safely parse JSON fields
const parseJson = <T>(value: unknown): T | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "object") return value as T;
  return null;
};

// Map Prisma App to Provider App
const mapApp = (prismaApp: {
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
}): App => ({
  id: prismaApp.id,
  name: prismaApp.name,
  provider: prismaApp.provider,
  apiKey: prismaApp.api_key,
  webhookSecret: prismaApp.webhook_secret,
  webhookUrl: prismaApp.webhook_url,
  isActive: prismaApp.is_active,
  metadata: parseJson<Record<string, unknown>>(prismaApp.metadata),
  createdAt: prismaApp.created_at,
  updatedAt: prismaApp.updated_at,
});

// Map Prisma Payup to Provider Payup
const mapPayup = (prismaPayup: {
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
}): Payup => ({
  id: prismaPayup.id,
  appId: prismaPayup.app_id,
  amount: prismaPayup.amount,
  currency: prismaPayup.currency,
  status: prismaPayup.status as Payup["status"],
  customerEmail: prismaPayup.customer_email,
  customerName: prismaPayup.customer_name,
  customerId: prismaPayup.customer_id,
  description: prismaPayup.description,
  returnUrl: prismaPayup.return_url,
  cancelUrl: prismaPayup.cancel_url,
  metadata: parseJson<Record<string, unknown>>(prismaPayup.metadata),
  providerData: parseJson<Record<string, unknown>>(prismaPayup.provider_data),
  createdAt: prismaPayup.created_at,
  updatedAt: prismaPayup.updated_at,
  expiresAt: prismaPayup.expires_at,
  completedAt: prismaPayup.completed_at,
});

// Map Prisma Transaction to Provider Transaction
const mapTransaction = (prismaTx: {
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
}): Transaction => ({
  id: prismaTx.id,
  appId: prismaTx.app_id,
  payupId: prismaTx.payup_id,
  externalId: prismaTx.external_id,
  amount: prismaTx.amount,
  currency: prismaTx.currency,
  status: prismaTx.status as Transaction["status"],
  customerEmail: prismaTx.customer_email,
  customerName: prismaTx.customer_name,
  customerId: prismaTx.customer_id,
  description: prismaTx.description,
  metadata: parseJson<Record<string, unknown>>(prismaTx.metadata),
  failureReason: prismaTx.failure_reason,
  providerData: parseJson<Record<string, unknown>>(prismaTx.provider_data),
  fees: prismaTx.fees,
  netAmount: prismaTx.net_amount,
  createdAt: prismaTx.created_at,
  updatedAt: prismaTx.updated_at,
});

// Map Prisma WebhookTemplate to Provider WebhookTemplate
const mapWebhookTemplate = (prismaTemplate: {
  id: string;
  app_id: string;
  name: string;
  event_type: string;
  format: unknown;
  is_default: boolean;
  headers: unknown;
  created_at: Date;
  updated_at: Date;
}): WebhookTemplate => ({
  id: prismaTemplate.id,
  appId: prismaTemplate.app_id,
  name: prismaTemplate.name,
  eventType: prismaTemplate.event_type,
  format: parseJson<Record<string, unknown>>(prismaTemplate.format) ?? {},
  isDefault: prismaTemplate.is_default,
  headers: parseJson<Record<string, string>>(prismaTemplate.headers),
  createdAt: prismaTemplate.created_at,
  updatedAt: prismaTemplate.updated_at,
});

// Map Prisma WebhookLog to Provider WebhookLog
const mapWebhookLog = (prismaLog: {
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
}): WebhookLog => ({
  id: prismaLog.id,
  appId: prismaLog.app_id,
  transactionId: prismaLog.transaction_id,
  eventType: prismaLog.event_type,
  direction: prismaLog.direction as WebhookLog["direction"],
  payload: parseJson<Record<string, unknown>>(prismaLog.payload) ?? {},
  headers: parseJson<Record<string, string>>(prismaLog.headers),
  statusCode: prismaLog.status_code,
  responseBody: prismaLog.response_body,
  errorMessage: prismaLog.error_message,
  retryCount: prismaLog.retry_count,
  nextRetryAt: prismaLog.next_retry_at,
  processedAt: prismaLog.processed_at,
  latencyMs: prismaLog.latency_ms,
});

// =============================================================================
// Prisma Provider Implementation
// =============================================================================

const createPrismaProvider = (prisma: PrismaClient): DatabaseProvider => ({
  // Connection
  connect: () =>
    Effect.tryPromise({
      try: () => prisma.$connect(),
      catch: (e) => new DbError({ operation: `connect: ${e}` }),
    }),

  disconnect: () =>
    Effect.tryPromise({
      try: () => prisma.$disconnect(),
      catch: (e) => new DbError({ operation: `disconnect: ${e}` }),
    }),

  isConnected: () => true, // Prisma manages connection pooling internally

  // App operations
  getAppByApiKey: (apiKey) =>
    Effect.tryPromise({
      try: async () => {
        const app = await prisma.app.findUnique({ where: { api_key: apiKey } });
        return app ? mapApp(app) : null;
      },
      catch: (e) => new DbError({ operation: `getAppByApiKey: ${e}` }),
    }),

  getAppById: (id) =>
    Effect.tryPromise({
      try: async () => {
        const app = await prisma.app.findUnique({ where: { id } });
        return app ? mapApp(app) : null;
      },
      catch: (e) => new DbError({ operation: `getAppById: ${e}` }),
    }),

  listApps: () =>
    Effect.tryPromise({
      try: async () => {
        const apps = await prisma.app.findMany({ orderBy: { created_at: "desc" } });
        return apps.map(mapApp);
      },
      catch: (e) => new DbError({ operation: `listApps: ${e}` }),
    }),

  createApp: (data) =>
    Effect.tryPromise({
      try: async () => {
        const app = await prisma.app.create({
          data: {
            name: data.name,
            provider: data.provider,
            api_key: data.apiKey,
            webhook_secret: data.webhookSecret,
            webhook_url: data.webhookUrl,
            metadata: toJsonValue(data.metadata),
          },
        });
        return mapApp(app);
      },
      catch: (e) => new DbError({ operation: `createApp: ${e}` }),
    }),

  updateApp: (id, data) =>
    Effect.tryPromise({
      try: async () => {
        const app = await prisma.app.update({
          where: { id },
          data: {
            name: data.name,
            webhook_url: data.webhookUrl,
            api_key: data.apiKey,
            webhook_secret: data.webhookSecret,
            is_active: data.isActive,
            metadata: toNullableJsonValue(data.metadata),
          },
        });
        return mapApp(app);
      },
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
      try: async () => {
        const payup = await prisma.payup.create({
          data: {
            app_id: data.appId,
            amount: data.amount,
            currency: data.currency ?? "USD",
            customer_email: data.customerEmail,
            customer_name: data.customerName,
            customer_id: data.customerId,
            description: data.description,
            return_url: data.returnUrl,
            cancel_url: data.cancelUrl,
            metadata: toJsonValue(data.metadata),
            expires_at: data.expiresAt,
          },
        });
        return mapPayup(payup);
      },
      catch: (e) => new DbError({ operation: `createPayup: ${e}` }),
    }),

  getPayup: (id) =>
    Effect.tryPromise({
      try: async () => {
        const payup = await prisma.payup.findUnique({ where: { id } });
        return payup ? mapPayup(payup) : null;
      },
      catch: (e) => new DbError({ operation: `getPayup: ${e}` }),
    }),

  updatePayup: (id, data) =>
    Effect.tryPromise({
      try: async () => {
        const payup = await prisma.payup.update({
          where: { id },
          data: {
            status: data.status,
            provider_data: toNullableJsonValue(data.providerData),
            completed_at: data.completedAt,
          },
        });
        return mapPayup(payup);
      },
      catch: (e) => new DbError({ operation: `updatePayup: ${e}` }),
    }),

  listPayups: (filter) =>
    Effect.tryPromise({
      try: async () => {
        const payups = await prisma.payup.findMany({
          where: {
            app_id: filter?.appId,
            status: filter?.status,
            customer_id: filter?.customerId,
          },
          orderBy: { created_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        });
        return payups.map(mapPayup);
      },
      catch: (e) => new DbError({ operation: `listPayups: ${e}` }),
    }),

  // Transaction operations
  createTransaction: (data) =>
    Effect.tryPromise({
      try: async () => {
        const tx = await prisma.transaction.create({
          data: {
            app_id: data.appId,
            payup_id: data.payupId,
            external_id: data.externalId,
            amount: data.amount,
            currency: data.currency ?? "USD",
            status: data.status,
            customer_email: data.customerEmail,
            customer_name: data.customerName,
            customer_id: data.customerId,
            description: data.description,
            metadata: toJsonValue(data.metadata),
            failure_reason: data.failureReason,
            provider_data: toJsonValue(data.providerData),
            fees: data.fees,
            net_amount: data.netAmount,
          },
        });
        return mapTransaction(tx);
      },
      catch: (e) => new DbError({ operation: `createTransaction: ${e}` }),
    }),

  getTransaction: (id) =>
    Effect.tryPromise({
      try: async () => {
        const tx = await prisma.transaction.findUnique({ where: { id } });
        return tx ? mapTransaction(tx) : null;
      },
      catch: (e) => new DbError({ operation: `getTransaction: ${e}` }),
    }),

  getTransactionByPayupId: (payupId) =>
    Effect.tryPromise({
      try: async () => {
        const tx = await prisma.transaction.findFirst({ where: { payup_id: payupId } });
        return tx ? mapTransaction(tx) : null;
      },
      catch: (e) => new DbError({ operation: `getTransactionByPayupId: ${e}` }),
    }),

  getTransactionByExternalId: (appId, externalId) =>
    Effect.tryPromise({
      try: async () => {
        const tx = await prisma.transaction.findFirst({
          where: { app_id: appId, external_id: externalId },
        });
        return tx ? mapTransaction(tx) : null;
      },
      catch: (e) => new DbError({ operation: `getTransactionByExternalId: ${e}` }),
    }),

  updateTransaction: (id, data) =>
    Effect.tryPromise({
      try: async () => {
        const tx = await prisma.transaction.update({
          where: { id },
          data: {
            external_id: data.externalId,
            status: data.status,
            failure_reason: data.failureReason,
            provider_data: toNullableJsonValue(data.providerData),
            fees: data.fees,
            net_amount: data.netAmount,
          },
        });
        return mapTransaction(tx);
      },
      catch: (e) => new DbError({ operation: `updateTransaction: ${e}` }),
    }),

  listTransactions: (filter) =>
    Effect.tryPromise({
      try: async () => {
        const txs = await prisma.transaction.findMany({
          where: {
            app_id: filter?.appId,
            payup_id: filter?.payupId,
            status: filter?.status,
            customer_id: filter?.customerId,
          },
          orderBy: { created_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        });
        return txs.map(mapTransaction);
      },
      catch: (e) => new DbError({ operation: `listTransactions: ${e}` }),
    }),

  // Webhook template operations
  listWebhookTemplates: (appId) =>
    Effect.tryPromise({
      try: async () => {
        const templates = await prisma.webhookTemplate.findMany({
          where: { app_id: appId },
          orderBy: { created_at: "desc" },
        });
        return templates.map(mapWebhookTemplate);
      },
      catch: (e) => new DbError({ operation: `listWebhookTemplates: ${e}` }),
    }),

  getWebhookTemplate: (id) =>
    Effect.tryPromise({
      try: async () => {
        const template = await prisma.webhookTemplate.findUnique({ where: { id } });
        return template ? mapWebhookTemplate(template) : null;
      },
      catch: (e) => new DbError({ operation: `getWebhookTemplate: ${e}` }),
    }),

  upsertWebhookTemplate: (data) =>
    Effect.tryPromise({
      try: async () => {
        // Find existing template by app_id and event_type
        const existing = await prisma.webhookTemplate.findFirst({
          where: { app_id: data.appId, event_type: data.eventType },
        });

        if (existing) {
          const template = await prisma.webhookTemplate.update({
            where: { id: existing.id },
            data: {
              name: data.name,
              format: toRequiredJsonValue(data.format),
              is_default: data.isDefault,
              headers: toJsonValue(data.headers),
            },
          });
          return mapWebhookTemplate(template);
        }

        const template = await prisma.webhookTemplate.create({
          data: {
            app_id: data.appId,
            name: data.name,
            event_type: data.eventType,
            format: toRequiredJsonValue(data.format),
            is_default: data.isDefault ?? false,
            headers: toJsonValue(data.headers),
          },
        });
        return mapWebhookTemplate(template);
      },
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
      try: async () => {
        const log = await prisma.webhookLog.create({
          data: {
            app_id: data.appId,
            transaction_id: data.transactionId,
            event_type: data.eventType,
            direction: data.direction,
            payload: toRequiredJsonValue(data.payload),
            headers: toJsonValue(data.headers),
            status_code: data.statusCode,
            response_body: data.responseBody,
            error_message: data.errorMessage,
            retry_count: data.retryCount ?? 0,
            next_retry_at: data.nextRetryAt,
            latency_ms: data.latencyMs,
          },
        });
        return mapWebhookLog(log);
      },
      catch: (e) => new DbError({ operation: `createWebhookLog: ${e}` }),
    }),

  listWebhookLogs: (filter) =>
    Effect.tryPromise({
      try: async () => {
        const logs = await prisma.webhookLog.findMany({
          where: {
            app_id: filter?.appId,
            transaction_id: filter?.transactionId,
            event_type: filter?.eventType,
            direction: filter?.direction,
          },
          orderBy: { processed_at: "desc" },
          take: filter?.limit ?? 100,
          skip: filter?.offset ?? 0,
        });
        return logs.map(mapWebhookLog);
      },
      catch: (e) => new DbError({ operation: `listWebhookLogs: ${e}` }),
    }),
});

// =============================================================================
// Singleton Prisma Client
// =============================================================================

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const getPrismaClient = (): PrismaClient => {
  if (!globalForPrisma.prisma) {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set - database operations will fail");
    }
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
};

// =============================================================================
// Export Prisma Provider Layer
// =============================================================================

export const PrismaProviderLive = Layer.sync(DatabaseProvider, () => {
  const prisma = getPrismaClient();
  return createPrismaProvider(prisma);
});

// Export factory for custom Prisma instances
export const createPrismaProviderLayer = (prisma: PrismaClient) =>
  Layer.succeed(DatabaseProvider, createPrismaProvider(prisma));
