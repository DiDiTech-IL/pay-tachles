// =============================================================================
// Database Provider Facade
// Allows users to swap database implementations (Prisma, Drizzle, raw SQL, etc.)
// =============================================================================

import { Effect, Context, Layer } from "effect";
import { DbError } from "@/domain/errors";

// =============================================================================
// Core Types - Provider Agnostic
// =============================================================================

export interface App {
  id: string;
  name: string;
  provider: string;
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  isActive: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payup {
  id: string;
  appId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  returnUrl: string | null;
  cancelUrl: string | null;
  metadata: Record<string, unknown> | null;
  providerData: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  completedAt: Date | null;
}

export interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: "completed" | "failed" | "refunded" | "disputed";
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  failureReason: string | null;
  providerData: Record<string, unknown> | null;
  fees: number | null;
  netAmount: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookTemplate {
  id: string;
  appId: string;
  name: string;
  eventType: string;
  format: Record<string, unknown>;
  isDefault: boolean;
  headers: Record<string, string> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookLog {
  id: string;
  appId: string;
  transactionId: string | null;
  eventType: string;
  direction: "inbound" | "outbound";
  payload: Record<string, unknown>;
  headers: Record<string, string> | null;
  statusCode: number | null;
  responseBody: string | null;
  errorMessage: string | null;
  retryCount: number;
  nextRetryAt: Date | null;
  processedAt: Date;
  latencyMs: number | null;
}

// =============================================================================
// Input Types
// =============================================================================

export interface CreateAppInput {
  name: string;
  provider: string;
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAppInput {
  name?: string;
  webhookUrl?: string;
  apiKey?: string;
  webhookSecret?: string;
  isActive?: boolean;
  metadata?: Record<string, unknown> | null;
}

export interface CreatePayupInput {
  appId: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, unknown>;
  expiresAt: Date;
}

export interface UpdatePayupInput {
  status?: Payup["status"];
  providerData?: Record<string, unknown> | null;
  completedAt?: Date;
}

export interface CreateTransactionInput {
  appId: string;
  payupId: string;
  externalId?: string;
  amount: number;
  currency?: string;
  status: Transaction["status"];
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  failureReason?: string;
  providerData?: Record<string, unknown>;
  fees?: number;
  netAmount?: number;
}

export interface UpdateTransactionInput {
  externalId?: string;
  status?: Transaction["status"];
  failureReason?: string;
  providerData?: Record<string, unknown> | null;
  fees?: number;
  netAmount?: number;
}

export interface CreateWebhookLogInput {
  appId: string;
  transactionId?: string;
  eventType: string;
  direction: "inbound" | "outbound";
  payload: Record<string, unknown>;
  headers?: Record<string, string>;
  statusCode?: number;
  responseBody?: string;
  errorMessage?: string;
  retryCount?: number;
  nextRetryAt?: Date;
  latencyMs?: number;
}

export interface UpsertWebhookTemplateInput {
  appId: string;
  name: string;
  eventType: string;
  format: Record<string, unknown>;
  isDefault?: boolean;
  headers?: Record<string, string>;
}

// =============================================================================
// Filter Types
// =============================================================================

export interface PayupFilter {
  appId?: string;
  status?: Payup["status"];
  customerId?: string;
  limit?: number;
  offset?: number;
}

export interface TransactionFilter {
  appId?: string;
  payupId?: string;
  status?: Transaction["status"];
  customerId?: string;
  limit?: number;
  offset?: number;
}

export interface WebhookLogFilter {
  appId?: string;
  transactionId?: string;
  eventType?: string;
  direction?: "inbound" | "outbound";
  limit?: number;
  offset?: number;
}

// =============================================================================
// Database Provider Interface
// This is what users implement for custom database providers
// =============================================================================

export interface DatabaseProvider {
  // Connection
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
// Database Provider Context
// =============================================================================

export const DatabaseProvider = Context.GenericTag<DatabaseProvider>("DatabaseProvider");

// =============================================================================
// Factory function to create a Layer from any provider implementation
// =============================================================================

export const createDatabaseLayer = (provider: DatabaseProvider): Layer.Layer<DatabaseProvider> =>
  Layer.succeed(DatabaseProvider, provider);

// =============================================================================
// Export a type for the provider config
// =============================================================================

export type DatabaseProviderType = "memory" | "prisma" | "drizzle" | "custom";

export interface DatabaseConfig {
  provider: DatabaseProviderType;
  connectionUrl?: string;
  options?: Record<string, unknown>;
}
