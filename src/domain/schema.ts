import { Schema } from "effect";

// =============================================================================
// Enums & Literals
// =============================================================================

export const PayupStatus = Schema.Literal(
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
  "expired"
);
export type PayupStatus = typeof PayupStatus.Type;

export const TransactionStatus = Schema.Literal(
  "completed",
  "failed",
  "refunded",
  "disputed"
);
export type TransactionStatus = typeof TransactionStatus.Type;

// Legacy alias for backward compatibility
export const PaymentStatus = PayupStatus;
export type PaymentStatus = PayupStatus;

export const Currency = Schema.Literal("USD", "EUR", "GBP", "ILS");
export type Currency = typeof Currency.Type;

// =============================================================================
// Client Application Schema
// =============================================================================

export class ClientApp extends Schema.Class<ClientApp>("ClientApp")({
  id: Schema.String.pipe(Schema.brand("ClientAppId")),
  apiKey: Schema.String.pipe(Schema.brand("ApiKey")),
  webhookSecret: Schema.String.pipe(Schema.brand("WebhookSecret")),
  webhookUrl: Schema.String.pipe(Schema.filter((s) => {
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  })),
  name: Schema.String,
  createdAt: Schema.DateFromString,
  updatedAt: Schema.DateFromString,
}) {}

// =============================================================================
// Metadata Schema
// =============================================================================

export const PaymentMetadata = Schema.Record({
  key: Schema.String,
  value: Schema.Unknown,
});
export type PaymentMetadata = typeof PaymentMetadata.Type;

// =============================================================================
// Payup Schema - Temporary payment intent awaiting webhook confirmation
// A payup is created when forwarding a user to the payment page.
// It holds user identifiers until the provider webhook confirms payment.
// =============================================================================

export class Payup extends Schema.Class<Payup>("Payup")({
  payupId: Schema.String.pipe(Schema.brand("PayupId")),
  appId: Schema.String.pipe(Schema.brand("ClientAppId")),
  amount: Schema.Number.pipe(
    Schema.positive(),
    Schema.int(),
    Schema.brand("AmountInCents")
  ),
  currency: Currency,
  status: PayupStatus,
  customerEmail: Schema.optionalWith(Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)), { as: "Option" }),
  customerName: Schema.optionalWith(Schema.String, { as: "Option" }),
  customerId: Schema.optionalWith(Schema.String, { as: "Option" }), // External ID from user's system
  description: Schema.optionalWith(Schema.String, { as: "Option" }),
  returnUrl: Schema.optionalWith(Schema.String, { as: "Option" }),
  cancelUrl: Schema.optionalWith(Schema.String, { as: "Option" }),
  metadata: Schema.optionalWith(PaymentMetadata, { default: () => ({}) }),
  createdAt: Schema.DateFromString,
  expiresAt: Schema.DateFromString,
}) {}

// Legacy alias
export const PaymentSession = Payup;
export type PaymentSession = Payup;

// =============================================================================
// Transaction Schema - Permanent record created after webhook confirmation
// =============================================================================

export class Transaction extends Schema.Class<Transaction>("Transaction")({
  transactionId: Schema.String.pipe(Schema.brand("TransactionId")),
  payupId: Schema.String.pipe(Schema.brand("PayupId")),
  appId: Schema.String.pipe(Schema.brand("ClientAppId")),
  externalId: Schema.optionalWith(Schema.String, { as: "Option" }), // Provider's transaction ID
  amount: Schema.Number.pipe(Schema.positive(), Schema.int()),
  currency: Currency,
  status: TransactionStatus,
  customerEmail: Schema.optionalWith(Schema.String, { as: "Option" }),
  customerName: Schema.optionalWith(Schema.String, { as: "Option" }),
  customerId: Schema.optionalWith(Schema.String, { as: "Option" }),
  description: Schema.optionalWith(Schema.String, { as: "Option" }),
  metadata: Schema.optionalWith(PaymentMetadata, { default: () => ({}) }),
  failureReason: Schema.optionalWith(Schema.String, { as: "Option" }),
  fees: Schema.optionalWith(Schema.Number.pipe(Schema.int()), { as: "Option" }),
  netAmount: Schema.optionalWith(Schema.Number.pipe(Schema.int()), { as: "Option" }),
  createdAt: Schema.DateFromString,
}) {}

// =============================================================================
// API Request/Response Schemas
// =============================================================================

export class CreatePayupRequest extends Schema.Class<CreatePayupRequest>("CreatePayupRequest")({
  amount: Schema.Number.pipe(Schema.positive(), Schema.int()),
  currency: Currency,
  metadata: Schema.optionalWith(PaymentMetadata, { default: () => ({}) }),
  customerEmail: Schema.optional(Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))),
  customerName: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String), // Your system's user/customer ID
  description: Schema.optional(Schema.String),
  returnUrl: Schema.optional(Schema.String),
  cancelUrl: Schema.optional(Schema.String),
}) {}

// Legacy alias
export const CreateSessionRequest = CreatePayupRequest;
export type CreateSessionRequest = CreatePayupRequest;

export class CreatePayupResponse extends Schema.Class<CreatePayupResponse>("CreatePayupResponse")({
  payupId: Schema.String,
  paymentUrl: Schema.String,
  expiresAt: Schema.DateFromString,
}) {}

// Legacy alias
export const CreateSessionResponse = CreatePayupResponse;
export type CreateSessionResponse = CreatePayupResponse;

export class FinalizePayupRequest extends Schema.Class<FinalizePayupRequest>("FinalizePayupRequest")({
  payupId: Schema.String,
}) {}

// Legacy alias
export const FinalizePaymentRequest = FinalizePayupRequest;
export type FinalizePaymentRequest = FinalizePayupRequest;

export class FinalizePayupResponse extends Schema.Class<FinalizePayupResponse>("FinalizePayupResponse")({
  success: Schema.Boolean,
  transactionId: Schema.optional(Schema.String),
  status: TransactionStatus,
}) {}

// Legacy alias
export const FinalizePaymentResponse = FinalizePayupResponse;
export type FinalizePaymentResponse = FinalizePayupResponse;

// =============================================================================
// Webhook Event Types
// =============================================================================

export const WebhookEventType = Schema.Literal(
  // Payup lifecycle events
  "payup.created",
  "payup.processing",
  "payup.expired",
  // Transaction events (after webhook confirmation from provider)
  "transaction.completed",
  "transaction.failed",
  "transaction.refunded",
  "transaction.disputed"
);
export type WebhookEventType = typeof WebhookEventType.Type;

// =============================================================================
// Failure Reasons
// =============================================================================

export const FailureReason = Schema.Literal(
  "card_declined",
  "insufficient_funds",
  "expired_card",
  "invalid_card",
  "processing_error",
  "fraud_detected",
  "cancelled_by_user",
  "session_expired",
  "provider_error",
  "unknown"
);
export type FailureReason = typeof FailureReason.Type;

// =============================================================================
// Webhook Payload Schemas - Sent to user's webhook endpoint
// =============================================================================

/** Base webhook payload fields */
const WebhookPayloadBase = {
  eventType: WebhookEventType,
  payupId: Schema.String,
  amount: Schema.Number,
  currency: Currency,
  metadata: PaymentMetadata,
  timestamp: Schema.DateFromString,
};

export class WebhookPayload extends Schema.Class<WebhookPayload>("WebhookPayload")({
  ...WebhookPayloadBase,
  transactionId: Schema.optional(Schema.String),
}) {}

/**
 * Success webhook payload - sent when payment completes successfully
 * @example
 * {
 *   "eventType": "transaction.completed",
 *   "payupId": "pyp_abc123",
 *   "transactionId": "txn_xyz789",
 *   "externalId": "pi_stripe123",
 *   "amount": 1999,
 *   "currency": "USD",
 *   "fees": 58,
 *   "netAmount": 1941,
 *   "customerId": "cust_456",
 *   "metadata": { "orderId": "order_123" },
 *   "timestamp": "2025-11-26T12:00:00.000Z"
 * }
 */
export class WebhookSuccessPayload extends Schema.Class<WebhookSuccessPayload>("WebhookSuccessPayload")({
  eventType: Schema.Literal("transaction.completed"),
  payupId: Schema.String,
  transactionId: Schema.String,
  externalId: Schema.optional(Schema.String), // Provider's transaction ID
  amount: Schema.Number,
  currency: Currency,
  fees: Schema.optional(Schema.Number),
  netAmount: Schema.optional(Schema.Number),
  customerEmail: Schema.optional(Schema.String),
  customerName: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  metadata: PaymentMetadata,
  timestamp: Schema.DateFromString,
}) {}

/**
 * Failed webhook payload - sent when payment fails
 * @example
 * {
 *   "eventType": "transaction.failed",
 *   "payupId": "pyp_abc123",
 *   "amount": 1999,
 *   "currency": "USD",
 *   "customerId": "cust_456",
 *   "metadata": { "orderId": "order_123" },
 *   "failureReason": "card_declined",
 *   "failureMessage": "Your card was declined.",
 *   "timestamp": "2025-11-26T12:00:00.000Z"
 * }
 */
export class WebhookFailurePayload extends Schema.Class<WebhookFailurePayload>("WebhookFailurePayload")({
  eventType: Schema.Literal("transaction.failed"),
  payupId: Schema.String,
  amount: Schema.Number,
  currency: Currency,
  metadata: PaymentMetadata,
  failureReason: FailureReason,
  failureMessage: Schema.String,
  customerEmail: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  timestamp: Schema.DateFromString,
}) {}

/**
 * Refunded webhook payload
 */
export class WebhookRefundPayload extends Schema.Class<WebhookRefundPayload>("WebhookRefundPayload")({
  eventType: Schema.Literal("transaction.refunded"),
  payupId: Schema.String,
  transactionId: Schema.String,
  originalAmount: Schema.Number,
  refundedAmount: Schema.Number,
  currency: Currency,
  metadata: PaymentMetadata,
  reason: Schema.optional(Schema.String),
  timestamp: Schema.DateFromString,
}) {}

/**
 * Cancelled webhook payload - sent when payup is cancelled before completion
 */
export class WebhookCancelledPayload extends Schema.Class<WebhookCancelledPayload>("WebhookCancelledPayload")({
  eventType: Schema.Literal("payup.expired"),
  payupId: Schema.String,
  amount: Schema.Number,
  currency: Currency,
  metadata: PaymentMetadata,
  cancelledBy: Schema.Literal("user", "merchant", "system", "timeout"),
  timestamp: Schema.DateFromString,
}) {}

// =============================================================================
// Webhook Template Schema - For customizable webhook response formats
// Users can define presets or customize the format sent to their endpoint.
// =============================================================================

export const WebhookTemplateFormat = Schema.Literal(
  "default",    // Full payload with all fields
  "minimal",    // Only essential fields (payupId, transactionId, status, amount)
  "stripe",     // Stripe-like format for easy migration
  "custom"      // User-defined JSON template with placeholders
);
export type WebhookTemplateFormat = typeof WebhookTemplateFormat.Type;

export class WebhookTemplate extends Schema.Class<WebhookTemplate>("WebhookTemplate")({
  id: Schema.String,
  appId: Schema.String,
  name: Schema.String,
  eventType: WebhookEventType,
  format: WebhookTemplateFormat,
  isDefault: Schema.Boolean,
  // Custom template definition with placeholders like {{payupId}}, {{amount}}, {{metadata.orderId}}
  template: Schema.optionalWith(Schema.String, { as: "Option" }),
  // Custom headers to include in webhook request
  headers: Schema.optionalWith(Schema.Record({ key: Schema.String, value: Schema.String }), { as: "Option" }),
}) {}

// =============================================================================
// Inbound Webhook Event - From payment providers (Stripe, PayPal, etc.)
// =============================================================================

export const InboundWebhookEvent = Schema.Struct({
  provider: Schema.String, // stripe, paypal, square, etc.
  eventType: Schema.String, // Provider's event type (e.g., "payment_intent.succeeded")
  payupId: Schema.optional(Schema.String), // Mapped from provider's metadata
  externalId: Schema.optional(Schema.String), // Provider's transaction/payment ID
  amount: Schema.optional(Schema.Number),
  fees: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.String),
  customerEmail: Schema.optional(Schema.String),
  rawPayload: Schema.Unknown, // Full provider payload for logging
  signature: Schema.optional(Schema.String), // For webhook signature verification
});
export type InboundWebhookEvent = typeof InboundWebhookEvent.Type;

// =============================================================================
// Event Handler Configuration - Per-event customization
// =============================================================================

export const EventHandlerConfig = Schema.Struct({
  eventType: WebhookEventType,
  enabled: Schema.Boolean,
  templateId: Schema.optional(Schema.String), // Which template to use
  retryPolicy: Schema.optionalWith(Schema.Struct({
    maxRetries: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    backoffMs: Schema.Number.pipe(Schema.int(), Schema.positive()),
    backoffMultiplier: Schema.optionalWith(Schema.Number.pipe(Schema.positive()), { default: () => 2 }),
  }), { 
    default: () => ({ maxRetries: 3, backoffMs: 1000, backoffMultiplier: 2 }) 
  }),
  // Optional: transform the payload before sending
  transform: Schema.optional(Schema.String), // JavaScript expression or JSONata
});
export type EventHandlerConfig = typeof EventHandlerConfig.Type;

// =============================================================================
// Queue Message Schema (for Cloudflare Workers)
// =============================================================================

export class QueueMessage extends Schema.Class<QueueMessage>("QueueMessage")({
  webhookUrl: Schema.String,
  webhookSecret: Schema.String,
  payload: WebhookPayload,
  templateId: Schema.optional(Schema.String), // Which template to use for formatting
  retryCount: Schema.optionalWith(Schema.Number.pipe(Schema.int(), Schema.nonNegative()), { default: () => 0 }),
}) {}
