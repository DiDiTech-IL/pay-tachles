import { Effect, Context, Layer } from "effect";
import type { Prisma } from "@/lib/generated/prisma";
import { DbService, type App, type WebhookTemplate } from "./db";
import { CryptoService } from "./crypto";
import {
  type WebhookEventType,
  type PaymentMetadata,
  type FailureReason,
} from "@/domain/schema";
import { WebhookDeliveryError, TemplateNotFoundError, DbError } from "@/domain/errors";

// =============================================================================
// Webhook Handler Service Interface
// =============================================================================

export interface WebhookHandlerService {
  /**
   * Format a webhook payload using a template
   */
  readonly formatPayload: (
    appId: string,
    eventType: WebhookEventType,
    data: WebhookPayloadData
  ) => Effect.Effect<Record<string, unknown>, TemplateNotFoundError | DbError>;

  /**
   * Deliver a webhook to the app's configured endpoint
   */
  readonly deliverWebhook: (
    app: App,
    eventType: WebhookEventType,
    payload: Record<string, unknown>
  ) => Effect.Effect<WebhookDeliveryResult, WebhookDeliveryError>;

  /**
   * Process and deliver a transaction event
   */
  readonly processEvent: (
    appId: string,
    eventType: WebhookEventType,
    data: WebhookPayloadData
  ) => Effect.Effect<WebhookDeliveryResult, WebhookDeliveryError | TemplateNotFoundError | DbError>;

  /**
   * Get available templates for an app
   */
  readonly getTemplates: (appId: string) => Effect.Effect<WebhookTemplate[], DbError>;

  /**
   * Create or update a webhook template
   */
  readonly upsertTemplate: (
    appId: string,
    template: CreateTemplateInput
  ) => Effect.Effect<WebhookTemplate, DbError>;
}

export const WebhookHandlerService = Context.GenericTag<WebhookHandlerService>("WebhookHandlerService");

// =============================================================================
// Types
// =============================================================================

export interface WebhookPayloadData {
  payupId: string;
  transactionId?: string;
  externalId?: string;
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "ILS";
  status?: string;
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  metadata: PaymentMetadata;
  failureReason?: FailureReason;
  failureMessage?: string;
  fees?: number;
  netAmount?: number;
  refundedAmount?: number;
  originalAmount?: number;
  reason?: string;
  cancelledBy?: "user" | "merchant" | "system" | "timeout";
}

export interface WebhookDeliveryResult {
  success: boolean;
  statusCode?: number;
  responseBody?: string;
  latencyMs: number;
  error?: string;
}

// Format stored in the JSON `format` field
export interface TemplateFormat {
  type: "default" | "minimal" | "stripe" | "custom";
  customTemplate?: string;
}

export interface CreateTemplateInput {
  name: string;
  eventType: WebhookEventType;
  format: "default" | "minimal" | "stripe" | "custom";
  isDefault?: boolean;
  template?: string; // Custom template when format is "custom"
  headers?: Record<string, string>;
}

// =============================================================================
// Template Presets
// =============================================================================

const TEMPLATE_PRESETS: Record<string, (data: WebhookPayloadData, eventType: string) => Record<string, unknown>> = {
  // Default: Full payload with all available fields
  default: (data, eventType) => ({
    eventType,
    payupId: data.payupId,
    transactionId: data.transactionId,
    externalId: data.externalId,
    amount: data.amount,
    currency: data.currency,
    customerEmail: data.customerEmail,
    customerName: data.customerName,
    customerId: data.customerId,
    metadata: data.metadata,
    fees: data.fees,
    netAmount: data.netAmount,
    failureReason: data.failureReason,
    failureMessage: data.failureMessage,
    timestamp: new Date().toISOString(),
  }),

  // Minimal: Only essential fields
  minimal: (data, eventType) => ({
    event: eventType,
    id: data.payupId,
    txn: data.transactionId,
    amount: data.amount,
    status: eventType.split(".")[1], // "completed", "failed", etc.
    ts: Date.now(),
  }),

  // Stripe-like format for easy migration
  stripe: (data, eventType) => ({
    id: `evt_${Date.now()}`,
    object: "event",
    type: eventType.replace(".", "_"), // transaction.completed → transaction_completed
    data: {
      object: {
        id: data.transactionId || data.payupId,
        object: "payment_intent",
        amount: data.amount,
        currency: data.currency.toLowerCase(),
        status: eventType.includes("completed") ? "succeeded" : eventType.includes("failed") ? "failed" : "canceled",
        customer: data.customerId,
        receipt_email: data.customerEmail,
        metadata: data.metadata,
        charges: {
          data: [{
            id: data.externalId,
            amount: data.amount,
            amount_captured: data.amount,
            balance_transaction: data.fees ? {
              fee: data.fees,
              net: data.netAmount,
            } : undefined,
          }],
        },
      },
    },
    created: Math.floor(Date.now() / 1000),
    livemode: true,
  }),
};

// =============================================================================
// Custom Template Parser
// =============================================================================

function parseCustomTemplate(
  template: string,
  data: WebhookPayloadData,
  eventType: string
): Record<string, unknown> {
  // Replace placeholders like {{payupId}}, {{metadata.orderId}}, {{amount}}
  let result = template;

  const context: Record<string, unknown> = {
    ...data,
    eventType,
    timestamp: new Date().toISOString(),
    timestampUnix: Date.now(),
  };

  // Handle nested paths like {{metadata.orderId}}
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  result = result.replace(placeholderRegex, (_, path) => {
    const parts = path.trim().split(".");
    let value: unknown = context;
    
    for (const part of parts) {
      if (value && typeof value === "object" && part in value) {
        value = (value as Record<string, unknown>)[part];
      } else {
        value = undefined;
        break;
      }
    }
    
    if (value === undefined || value === null) {
      return "null";
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
  });

  try {
    return JSON.parse(result);
  } catch {
    // If parsing fails, return as a wrapped object
    return { raw: result, parseError: true };
  }
}

// =============================================================================
// Service Implementation
// =============================================================================

const makeWebhookHandlerService = Effect.gen(function* () {
  const db = yield* DbService;
  const crypto = yield* CryptoService;

  // In-memory template cache (in production, use Redis)
  const templateCache = new Map<string, WebhookTemplate[]>();

  const getTemplates = (appId: string): Effect.Effect<WebhookTemplate[], DbError> =>
    Effect.gen(function* () {
      // Check cache first
      const cached = templateCache.get(appId);
      if (cached) {
        return cached;
      }

      // Fetch from database
      const templates = yield* db.listWebhookTemplates(appId);
      templateCache.set(appId, templates);
      return templates;
    });

  // Helper to parse format field from database
  const parseTemplateFormat = (format: unknown): TemplateFormat => {
    if (typeof format === "string") {
      // Simple string format type
      return { type: format as TemplateFormat["type"] };
    }
    if (typeof format === "object" && format !== null) {
      const f = format as Record<string, unknown>;
      return {
        type: (f.type as TemplateFormat["type"]) ?? "default",
        customTemplate: f.customTemplate as string | undefined,
      };
    }
    return { type: "default" };
  };

  const formatPayload = (
    appId: string,
    eventType: WebhookEventType,
    data: WebhookPayloadData
  ): Effect.Effect<Record<string, unknown>, TemplateNotFoundError | DbError> =>
    Effect.gen(function* () {
      // Try to find a custom template for this event type
      const templates = yield* getTemplates(appId);
      const template = templates.find(
        (t) => t.event_type === eventType && t.is_default
      ) || templates.find((t) => t.event_type === eventType);

      if (template) {
        const templateFormat = parseTemplateFormat(template.format);
        
        if (templateFormat.type === "custom" && templateFormat.customTemplate) {
          return parseCustomTemplate(templateFormat.customTemplate, data, eventType);
        }
        const preset = TEMPLATE_PRESETS[templateFormat.type];
        if (preset) {
          return preset(data, eventType);
        }
      }

      // Fall back to default format
      return TEMPLATE_PRESETS.default(data, eventType);
    });

  const deliverWebhook = (
    app: App,
    eventType: WebhookEventType,
    payload: Record<string, unknown>
  ): Effect.Effect<WebhookDeliveryResult, WebhookDeliveryError> =>
    Effect.gen(function* () {
      const startTime = Date.now();

      // Generate signature for webhook verification
      const payloadString = JSON.stringify(payload);
      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `${timestamp}.${payloadString}`;
      const signature = yield* crypto.hmacSign(app.webhook_secret, signaturePayload);

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-Tachles-Signature": `t=${timestamp},v1=${signature}`,
        "X-Tachles-Event": eventType,
        "X-Tachles-Delivery": yield* crypto.generateUUID(),
      };

      const response = yield* Effect.tryPromise({
        try: () =>
          fetch(app.webhook_url, {
            method: "POST",
            headers,
            body: payloadString,
            signal: AbortSignal.timeout(30000), // 30s timeout
          }),
        catch: (error) =>
          new WebhookDeliveryError({
            webhookUrl: app.webhook_url,
            reason: `Network error: ${error instanceof Error ? error.message : "Unknown error"}`,
          }),
      });

      const latencyMs = Date.now() - startTime;
      const responseBody = yield* Effect.tryPromise({
        try: () => response.text(),
        catch: () => new WebhookDeliveryError({
          webhookUrl: app.webhook_url,
          reason: "Failed to read response body",
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          responseBody,
          latencyMs,
          error: `HTTP ${response.status}: ${responseBody.slice(0, 200)}`,
        };
      }

      return {
        success: true,
        statusCode: response.status,
        responseBody,
        latencyMs,
      };
    });

  const processEvent = (
    appId: string,
    eventType: WebhookEventType,
    data: WebhookPayloadData
  ): Effect.Effect<WebhookDeliveryResult, WebhookDeliveryError | TemplateNotFoundError | DbError> =>
    Effect.gen(function* () {
      // Get the app
      const app = yield* db.getAppById(appId);
      if (!app) {
        return yield* Effect.fail(
          new WebhookDeliveryError({
            webhookUrl: "unknown",
            reason: `App not found: ${appId}`,
          })
        );
      }

      // Format the payload
      const payload = yield* formatPayload(appId, eventType, data);

      // Deliver the webhook
      const result = yield* deliverWebhook(app, eventType, payload);

      // Log the webhook delivery
      yield* db.createWebhookLog({
        app_id: appId,
        transaction_id: data.transactionId,
        event_type: eventType,
        direction: "outbound",
        payload: JSON.parse(JSON.stringify(payload)),
        status_code: result.statusCode,
        response_body: result.responseBody,
        error_message: result.error,
        latency_ms: result.latencyMs,
      });

      return result;
    });

  const upsertTemplate = (
    appId: string,
    input: CreateTemplateInput
  ): Effect.Effect<WebhookTemplate, DbError> =>
    Effect.gen(function* () {
      // Build the format JSON object - cast to Prisma InputJsonValue
      const formatObj = input.template
        ? { type: input.format, customTemplate: input.template }
        : { type: input.format };

      const template = yield* db.upsertWebhookTemplate({
        app_id: appId,
        name: input.name,
        event_type: input.eventType,
        format: formatObj as unknown as Prisma.InputJsonValue,
        is_default: input.isDefault ?? false,
        headers: input.headers as unknown as Prisma.InputJsonValue,
      });

      // Invalidate cache
      templateCache.delete(appId);

      return template;
    });

  return {
    formatPayload,
    deliverWebhook,
    processEvent,
    getTemplates,
    upsertTemplate,
  } satisfies WebhookHandlerService;
});

export const WebhookHandlerServiceLive = Layer.effect(
  WebhookHandlerService,
  makeWebhookHandlerService
);
