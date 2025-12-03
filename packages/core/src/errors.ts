// =============================================================================
// Domain Errors - Tagged Union Pattern with Effect
// =============================================================================

import { Data } from "effect";

/**
 * Database operation error
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
 * Storage/Cache operation error
 */
export class StorageError extends Data.TaggedError("StorageError")<{
  readonly operation: string;
  readonly key?: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return this.key
      ? `Storage error during ${this.operation} for key: ${this.key}`
      : `Storage error during ${this.operation}`;
  }
}

/**
 * App not found (invalid API key)
 */
export class AppNotFoundError extends Data.TaggedError("AppNotFoundError")<{
  readonly apiKey?: string;
  readonly appId?: string;
}> {
  override get message(): string {
    if (this.apiKey) return `No application found for the provided API key`;
    if (this.appId) return `Application not found: ${this.appId}`;
    return `Application not found`;
  }
}

/**
 * Payup (payment intent) not found or expired
 */
export class PayupNotFoundError extends Data.TaggedError("PayupNotFoundError")<{
  readonly payupId: string;
}> {
  override get message(): string {
    return `Payment intent not found or expired: ${this.payupId}`;
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
    return `Payment ${this.payupId} has already been processed with status: ${this.currentStatus}`;
  }
}

/**
 * Webhook signature verification failed
 */
export class SignatureError extends Data.TaggedError("SignatureError")<{
  readonly reason: "missing" | "invalid" | "expired";
}> {
  override get message(): string {
    switch (this.reason) {
      case "missing": return "Missing signature header";
      case "invalid": return "Invalid signature";
      case "expired": return "Signature has expired";
    }
  }
}

/**
 * Input validation error
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
 * Configuration error
 */
export class ConfigError extends Data.TaggedError("ConfigError")<{
  readonly errors: string[];
}> {
  override get message(): string {
    return `Configuration error:\n${this.errors.map((e) => `  - ${e}`).join("\n")}`;
  }
}

/**
 * Runtime error (crypto, env, etc.)
 */
export class RuntimeError extends Data.TaggedError("RuntimeError")<{
  readonly operation: string;
  readonly cause?: unknown;
}> {
  override get message(): string {
    return `Runtime error during ${this.operation}`;
  }
}

/**
 * HTTP error for API responses
 */
export class HttpError extends Data.TaggedError("HttpError")<{
  readonly status: number;
  readonly code: string;
  readonly message: string;
}> {}

// =============================================================================
// Error Utilities
// =============================================================================

export type TachlesError =
  | DbError
  | StorageError
  | AppNotFoundError
  | PayupNotFoundError
  | PayupAlreadyProcessedError
  | SignatureError
  | ValidationError
  | ConfigError
  | RuntimeError
  | HttpError;

/**
 * Convert any error to an HTTP error response
 */
export const toHttpError = (error: TachlesError): HttpError => {
  switch (error._tag) {
    case "DbError":
      return new HttpError({ status: 500, code: "DATABASE_ERROR", message: "Internal database error" });
    case "StorageError":
      return new HttpError({ status: 500, code: "STORAGE_ERROR", message: "Internal storage error" });
    case "AppNotFoundError":
      return new HttpError({ status: 401, code: "UNAUTHORIZED", message: error.message });
    case "PayupNotFoundError":
      return new HttpError({ status: 404, code: "NOT_FOUND", message: error.message });
    case "PayupAlreadyProcessedError":
      return new HttpError({ status: 409, code: "CONFLICT", message: error.message });
    case "SignatureError":
      return new HttpError({ status: 401, code: "SIGNATURE_ERROR", message: error.message });
    case "ValidationError":
      return new HttpError({ status: 400, code: "VALIDATION_ERROR", message: error.message });
    case "ConfigError":
      return new HttpError({ status: 500, code: "CONFIG_ERROR", message: "Server configuration error" });
    case "RuntimeError":
      return new HttpError({ status: 500, code: "RUNTIME_ERROR", message: "Internal server error" });
    case "HttpError":
      return error;
  }
};
