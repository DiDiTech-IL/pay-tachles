import { Effect, Option } from "effect";
import { KVService, DbService, QueueService, CryptoService } from "../services";
import { KVError } from "../services/kv";
import {
  PayupNotFoundError,
  PayupAlreadyProcessedError,
  PaymentProcessingError,
  DbError,
  QueueError,
} from "../domain/errors";
import { QueueMessage, WebhookPayload } from "../domain/schema";
import { getPayupData, updatePayupStatus, type PayupData } from "./create-payup";

// =============================================================================
// Input/Output Types
// =============================================================================

interface FinalizePaymentInput {
  payupId: string;
}

interface FinalizePaymentOutput {
  success: boolean;
  transactionId?: string;
  status: "completed" | "failed";
}

// =============================================================================
// Mock Payment Processor
// =============================================================================

/**
 * Simulates payment processing.
 * In production, this would integrate with Stripe, PayPal, etc.
 */
const processPaymentWithProvider = (
  payupData: PayupData
): Effect.Effect<{ transactionId: string; externalId: string; success: boolean; fees?: number }, PaymentProcessingError> =>
  Effect.gen(function* () {
    // Simulate processing delay
    yield* Effect.sleep("100 millis");

    // Mock: 95% success rate
    const success = Math.random() > 0.05;

    if (!success) {
      return yield* Effect.fail(
        new PaymentProcessingError({
          payupId: payupData.payupId,
          reason: "Payment declined by provider",
        })
      );
    }

    // Generate mock transaction ID and external ID (from provider)
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const externalId = `pi_${Math.random().toString(36).slice(2, 20)}`; // Stripe-like ID

    // Simulate provider fees (2.9% + 30 cents)
    const fees = Math.round(payupData.amount * 0.029 + 30);

    return { transactionId, externalId, success: true, fees };
  });

// =============================================================================
// Workflow: Finalize Payment
// Called when a payup is confirmed (either via provider webhook or explicit finalization)
// Creates a permanent Transaction record linked to the Payup
// =============================================================================

export const finalizePayment = (
  input: FinalizePaymentInput
): Effect.Effect<
  FinalizePaymentOutput,
  | PayupNotFoundError
  | PayupAlreadyProcessedError
  | PaymentProcessingError
  | DbError
  | KVError
  | QueueError,
  KVService | DbService | QueueService | CryptoService
> =>
  Effect.gen(function* () {
    // 1. Get payup from Redis/KV
    const payupOption = yield* getPayupData(input.payupId);

    const payup = yield* Option.match(payupOption, {
      onNone: () =>
        Effect.fail(new PayupNotFoundError({ payupId: input.payupId })),
      onSome: (p) => Effect.succeed(p),
    });

    // 2. Check if already processed
    if (payup.status !== "pending") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({
          payupId: input.payupId,
          currentStatus: payup.status,
        })
      );
    }

    // 3. Update status to processing
    yield* updatePayupStatus(input.payupId, "processing");

    // 4. Process payment with provider
    const paymentResult = yield* Effect.catchAll(
      processPaymentWithProvider(payup),
      (error) =>
        Effect.gen(function* () {
          // On failure, update status and re-throw
          yield* updatePayupStatus(input.payupId, "failed");
          return yield* Effect.fail(error);
        })
    );

    // 5. Update payup status to completed
    yield* updatePayupStatus(input.payupId, "completed");

    const db = yield* DbService;

    // 6. Update the payup record in database
    yield* db.updatePayup(input.payupId, {
      status: "completed",
      completed_at: new Date(),
    });

    // 7. Create permanent Transaction record
    const netAmount = paymentResult.fees 
      ? payup.amount - paymentResult.fees 
      : payup.amount;

    const transaction = yield* db.createTransaction({
      app_id: payup.appId,
      payup_id: payup.payupId,
      external_id: paymentResult.externalId,
      amount: payup.amount,
      currency: payup.currency,
      status: "completed",
      customer_email: payup.customerEmail,
      customer_name: payup.customerName,
      customer_id: payup.customerId,
      description: payup.description,
      metadata: JSON.parse(JSON.stringify(payup.metadata)),
      fees: paymentResult.fees,
      net_amount: netAmount,
    });

    // 8. Get app for webhook details
    const app = yield* db.getAppById(payup.appId);

    // 9. Enqueue webhook if app has webhook URL
    if (app?.webhook_url) {
      const queue = yield* QueueService;

      const webhookPayload = new WebhookPayload({
        eventType: "transaction.completed",
        payupId: payup.payupId,
        transactionId: transaction.id,
        amount: payup.amount,
        currency: payup.currency as "USD" | "EUR" | "GBP" | "ILS",
        metadata: payup.metadata,
        timestamp: new Date(),
      });

      const queueMessage = new QueueMessage({
        webhookUrl: app.webhook_url,
        webhookSecret: app.webhook_secret,
        payload: webhookPayload,
        retryCount: 0,
      });

      yield* queue.enqueue(queueMessage);
    }

    return {
      success: true,
      transactionId: transaction.id,
      status: "completed" as const,
    };
  });

// =============================================================================
// Workflow: Cancel Payup
// =============================================================================

export const cancelPayment = (
  payupId: string
): Effect.Effect<
  void,
  PayupNotFoundError | PayupAlreadyProcessedError | DbError | KVError | QueueError,
  KVService | DbService | QueueService
> =>
  Effect.gen(function* () {
    // 1. Get payup from Redis/KV
    const payupOption = yield* getPayupData(payupId);

    const payup = yield* Option.match(payupOption, {
      onNone: () =>
        Effect.fail(new PayupNotFoundError({ payupId })),
      onSome: (p) => Effect.succeed(p),
    });

    // 2. Check if can be cancelled
    if (payup.status !== "pending") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({
          payupId,
          currentStatus: payup.status,
        })
      );
    }

    // 3. Update status to expired/cancelled
    yield* updatePayupStatus(payupId, "expired");

    // 4. Update database record
    const db = yield* DbService;
    yield* db.updatePayup(payupId, {
      status: "cancelled",
    });

    // 5. Get app for webhook
    const app = yield* db.getAppById(payup.appId);

    // 6. Enqueue cancellation webhook if app has webhook URL
    if (app?.webhook_url) {
      const queue = yield* QueueService;

      const webhookPayload = new WebhookPayload({
        eventType: "payup.expired",
        payupId: payup.payupId,
        amount: payup.amount,
        currency: payup.currency as "USD" | "EUR" | "GBP" | "ILS",
        metadata: payup.metadata,
        timestamp: new Date(),
      });

      const queueMessage = new QueueMessage({
        webhookUrl: app.webhook_url,
        webhookSecret: app.webhook_secret,
        payload: webhookPayload,
        retryCount: 0,
      });

      yield* queue.enqueue(queueMessage);
    }
  });
