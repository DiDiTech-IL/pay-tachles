// =============================================================================
// Domain Types - Provider Agnostic
// =============================================================================

// =============================================================================
// App (Payment Provider Integration)
// =============================================================================

export interface App {
  id: string;
  name: string;
  provider: string; // stripe, paypal, square, etc.
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  isActive: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

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

// =============================================================================
// Payup (Payment Intent / Checkout Session)
// =============================================================================

export type PayupStatus = "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";

export interface Payup {
  id: string;
  appId: string;
  amount: number; // In smallest currency unit (cents)
  currency: string;
  status: PayupStatus;
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
  status?: PayupStatus;
  providerData?: Record<string, unknown> | null;
  completedAt?: Date;
}

export interface PayupFilter {
  appId?: string;
  status?: PayupStatus;
  customerId?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// Transaction (Finalized Payment Record)
// =============================================================================

export type TransactionStatus = "completed" | "failed" | "refunded" | "disputed";

export interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null; // Provider's transaction ID
  amount: number;
  currency: string;
  status: TransactionStatus;
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

export interface CreateTransactionInput {
  appId: string;
  payupId: string;
  externalId?: string;
  amount: number;
  currency?: string;
  status: TransactionStatus;
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
  status?: TransactionStatus;
  failureReason?: string;
  providerData?: Record<string, unknown> | null;
  fees?: number;
  netAmount?: number;
}

export interface TransactionFilter {
  appId?: string;
  payupId?: string;
  status?: TransactionStatus;
  customerId?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// Webhook Types
// =============================================================================

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

export interface UpsertWebhookTemplateInput {
  appId: string;
  name: string;
  eventType: string;
  format: Record<string, unknown>;
  isDefault?: boolean;
  headers?: Record<string, string>;
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

export interface WebhookLogFilter {
  appId?: string;
  transactionId?: string;
  eventType?: string;
  direction?: "inbound" | "outbound";
  limit?: number;
  offset?: number;
}
