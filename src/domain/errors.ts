import { Data } from "effect";

// =============================================================================
// Base Error Types with Tagged Union Pattern
// =============================================================================

/**
 * Database-related errors (Prisma operations)
 */
export class DbError extends Data.TaggedError("DbError")<{
  readonly operation: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return `Database error during ${this.operation}`;
  }
}

/**
 * Redis/KV Store errors
 */
export class RedisError extends Data.TaggedError("RedisError")<{
  readonly operation: string;
  readonly key?: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return this.key
      ? `Redis error during ${this.operation} for key: ${this.key}`
      : `Redis error during ${this.operation}`;
  }
}

/**
 * Client application not found (invalid API key)
 */
export class AppNotFoundError extends Data.TaggedError("AppNotFoundError")<{
  readonly apiKey: string;
}> {
  override get message(): string {
    return `No application found for the provided API key`;
  }
}

/**
 * Payment session not found or expired
 */
export class SessionNotFoundError extends Data.TaggedError("SessionNotFoundError")<{
  readonly sessionId: string;
}> {
  override get message(): string {
    return `Payment session not found or expired: ${this.sessionId}`;
  }
}

/**
 * Session has already been processed
 */
export class SessionAlreadyProcessedError extends Data.TaggedError("SessionAlreadyProcessedError")<{
  readonly sessionId: string;
  readonly currentStatus: string;
}> {
  override get message(): string {
    return `Session ${this.sessionId} has already been processed with status: ${this.currentStatus}`;
  }
}

/**
 * HMAC signature verification failed
 */
export class SignatureError extends Data.TaggedError("SignatureError")<{
  readonly reason: "missing" | "invalid" | "expired";
}> {
  override get message(): string {
    switch (this.reason) {
      case "missing":
        return "Missing signature header";
      case "invalid":
        return "Invalid signature";
      case "expired":
        return "Signature has expired";
    }
  }
}

/**
 * Schema validation errors
 */
export class ValidationError extends Data.TaggedError("ValidationError")<{
  readonly field?: string;
  readonly message: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return this.field
      ? `Validation error on field '${this.field}': ${this.message}`
      : `Validation error: ${this.message}`;
  }
}

/**
 * Queue/messaging errors
 */
export class QueueError extends Data.TaggedError("QueueError")<{
  readonly operation: "enqueue" | "dequeue" | "ack";
  readonly cause?: unknown;
}> {
  override get message(): string {
    return `Queue error during ${this.operation}`;
  }
}

/**
 * Webhook delivery errors
 */
export class WebhookDeliveryError extends Data.TaggedError("WebhookDeliveryError")<{
  readonly webhookUrl: string;
  readonly statusCode?: number;
  readonly reason?: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    if (this.reason) {
      return `Webhook delivery failed to ${this.webhookUrl}: ${this.reason}`;
    }
    return this.statusCode
      ? `Webhook delivery failed to ${this.webhookUrl} with status ${this.statusCode}`
      : `Webhook delivery failed to ${this.webhookUrl}`;
  }
}

/**
 * Webhook template not found
 */
export class TemplateNotFoundError extends Data.TaggedError("TemplateNotFoundError")<{
  readonly appId: string;
  readonly templateId?: string;
  readonly eventType?: string;
}> {
  override get message(): string {
    if (this.templateId) {
      return `Webhook template not found: ${this.templateId}`;
    }
    return `No webhook template found for app ${this.appId} and event ${this.eventType}`;
  }
}

/**
 * Payup not found or expired
 */
export class PayupNotFoundError extends Data.TaggedError("PayupNotFoundError")<{
  readonly payupId: string;
}> {
  override get message(): string {
    return `Payup not found or expired: ${this.payupId}`;
  }
}

/**
 * Payup has already been processed
 */
export class PayupAlreadyProcessedError extends Data.TaggedError("PayupAlreadyProcessedError")<{
  readonly payupId: string;
  readonly currentStatus: string;
}> {
  override get message(): string {
    return `Payup ${this.payupId} has already been processed with status: ${this.currentStatus}`;
  }
}

/**
 * Payment processing errors
 */
export class PaymentProcessingError extends Data.TaggedError("PaymentProcessingError")<{
  readonly payupId: string;
  readonly reason: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return `Payment processing failed for payup ${this.payupId}: ${this.reason}`;
  }
}

/**
 * Rate limiting errors
 */
export class RateLimitError extends Data.TaggedError("RateLimitError")<{
  readonly resource: string;
  readonly retryAfterSeconds: number;
}> {
  override get message(): string {
    return `Rate limit exceeded for ${this.resource}. Retry after ${this.retryAfterSeconds} seconds`;
  }
}

/**
 * Configuration errors
 */
export class ConfigError extends Data.TaggedError("ConfigError")<{
  readonly key: string;
  readonly reason: "missing" | "invalid";
}> {
  override get message(): string {
    return this.reason === "missing"
      ? `Missing required configuration: ${this.key}`
      : `Invalid configuration value for: ${this.key}`;
  }
}

// =============================================================================
// Error Union Type for Pattern Matching
// =============================================================================

export type DomainError =
  | DbError
  | RedisError
  | AppNotFoundError
  | SessionNotFoundError
  | SessionAlreadyProcessedError
  | PayupNotFoundError
  | PayupAlreadyProcessedError
  | SignatureError
  | ValidationError
  | QueueError
  | WebhookDeliveryError
  | TemplateNotFoundError
  | PaymentProcessingError
  | RateLimitError
  | ConfigError;

// =============================================================================
// HTTP Status Code Mapping
// =============================================================================

export const getHttpStatusCode = (error: DomainError): number => {
  switch (error._tag) {
    case "AppNotFoundError":
      return 401;
    case "SignatureError":
      return 401;
    case "SessionNotFoundError":
    case "PayupNotFoundError":
    case "TemplateNotFoundError":
      return 404;
    case "ValidationError":
      return 400;
    case "SessionAlreadyProcessedError":
    case "PayupAlreadyProcessedError":
      return 409;
    case "RateLimitError":
      return 429;
    case "DbError":
    case "RedisError":
    case "QueueError":
    case "PaymentProcessingError":
    case "WebhookDeliveryError":
      return 500;
    case "ConfigError":
      return 500;
    default:
      return 500;
  }
};
