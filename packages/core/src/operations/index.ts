// =============================================================================
// Operations Module - High-Level Payment Workflows
// =============================================================================

import { Effect } from "effect";
import { Database, type DatabaseProvider } from "../database";
import { DbError, PayupNotFoundError, PayupAlreadyProcessedError, ValidationError } from "../errors";
import type { 
  Payup, 
  PayupStatus, 
  Transaction, 
  CreatePayupInput,
  CreateTransactionInput,
} from "../types";

// =============================================================================
// Types
// =============================================================================

export interface CreatePaymentOptions {
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
  expiresInMinutes?: number;
}

export interface CompletePaymentOptions {
  payupId: string;
  externalId?: string;
  providerData?: Record<string, unknown>;
  fees?: number;
  netAmount?: number;
}

export interface FailPaymentOptions {
  payupId: string;
  reason: string;
  providerData?: Record<string, unknown>;
}

export interface RefundPaymentOptions {
  transactionId: string;
  amount?: number; // Partial refund amount, full refund if not specified
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentResult {
  payup: Payup;
  transaction?: Transaction;
}

export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// =============================================================================
// Payment Creation Operations
// =============================================================================

/**
 * Create a new payment with sensible defaults
 * 
 * @example
 * ```typescript
 * const result = yield* createPayment({
 *   appId: "app_123",
 *   amount: 1999, // $19.99 in cents
 *   customerEmail: "customer@example.com",
 *   description: "Pro Plan Subscription",
 * });
 * ```
 */
export const createPayment = (
  options: CreatePaymentOptions
): Effect.Effect<Payup, DbError | ValidationError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    // Validate amount
    if (options.amount <= 0) {
      return yield* Effect.fail(
        new ValidationError({ message: "Amount must be greater than 0" })
      );
    }
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (options.expiresInMinutes ?? 30));
    
    const input: CreatePayupInput = {
      appId: options.appId,
      amount: options.amount,
      currency: options.currency ?? "USD",
      customerEmail: options.customerEmail,
      customerName: options.customerName,
      customerId: options.customerId,
      description: options.description,
      returnUrl: options.returnUrl,
      cancelUrl: options.cancelUrl,
      metadata: options.metadata,
      expiresAt,
    };
    
    return yield* db.createPayup(input);
  });

/**
 * Create multiple payments in batch
 */
export const createPaymentBatch = (
  payments: CreatePaymentOptions[]
): Effect.Effect<Payup[], DbError | ValidationError, DatabaseProvider> =>
  Effect.all(payments.map(createPayment), { concurrency: 5 });

// =============================================================================
// Payment Completion Operations
// =============================================================================

/**
 * Complete a payment and create a transaction record
 * 
 * @example
 * ```typescript
 * const result = yield* completePayment({
 *   payupId: "pay_123",
 *   externalId: "stripe_pi_xxx",
 *   providerData: { charge_id: "ch_xxx" },
 * });
 * ```
 */
export const completePayment = (
  options: CompletePaymentOptions
): Effect.Effect<PaymentResult, DbError | PayupNotFoundError | PayupAlreadyProcessedError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    // Get the payup
    const payup = yield* db.getPayup(options.payupId);
    if (!payup) {
      return yield* Effect.fail(
        new PayupNotFoundError({ payupId: options.payupId })
      );
    }
    
    // Check if already processed
    if (payup.status === "completed" || payup.status === "failed") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({ payupId: options.payupId, currentStatus: payup.status })
      );
    }
    
    // Update payup status
    const updatedPayup = yield* db.updatePayup(options.payupId, {
      status: "completed",
      providerData: options.providerData,
      completedAt: new Date(),
    });
    
    // Create transaction record
    const transactionInput: CreateTransactionInput = {
      appId: payup.appId,
      payupId: payup.id,
      externalId: options.externalId,
      amount: payup.amount,
      currency: payup.currency,
      status: "completed",
      customerEmail: payup.customerEmail ?? undefined,
      customerName: payup.customerName ?? undefined,
      customerId: payup.customerId ?? undefined,
      description: payup.description ?? undefined,
      metadata: payup.metadata ?? undefined,
      providerData: options.providerData,
      fees: options.fees,
      netAmount: options.netAmount ?? (options.fees ? payup.amount - options.fees : payup.amount),
    };
    
    const transaction = yield* db.createTransaction(transactionInput);
    
    return { payup: updatedPayup, transaction };
  });

/**
 * Mark a payment as failed
 */
export const failPayment = (
  options: FailPaymentOptions
): Effect.Effect<PaymentResult, DbError | PayupNotFoundError | PayupAlreadyProcessedError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const payup = yield* db.getPayup(options.payupId);
    if (!payup) {
      return yield* Effect.fail(
        new PayupNotFoundError({ payupId: options.payupId })
      );
    }
    
    if (payup.status === "completed" || payup.status === "failed") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({ payupId: options.payupId, currentStatus: payup.status })
      );
    }
    
    const updatedPayup = yield* db.updatePayup(options.payupId, {
      status: "failed",
      providerData: options.providerData,
    });
    
    // Create failed transaction record
    const transaction = yield* db.createTransaction({
      appId: payup.appId,
      payupId: payup.id,
      amount: payup.amount,
      currency: payup.currency,
      status: "failed",
      customerEmail: payup.customerEmail ?? undefined,
      customerName: payup.customerName ?? undefined,
      customerId: payup.customerId ?? undefined,
      failureReason: options.reason,
      providerData: options.providerData,
    });
    
    return { payup: updatedPayup, transaction };
  });

/**
 * Cancel a pending payment
 */
export const cancelPayment = (
  payupId: string,
  reason?: string
): Effect.Effect<Payup, DbError | PayupNotFoundError | PayupAlreadyProcessedError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const payup = yield* db.getPayup(payupId);
    if (!payup) {
      return yield* Effect.fail(new PayupNotFoundError({ payupId }));
    }
    
    if (payup.status !== "pending" && payup.status !== "processing") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({ payupId, currentStatus: payup.status })
      );
    }
    
    return yield* db.updatePayup(payupId, {
      status: "cancelled",
      providerData: reason ? { cancelReason: reason } : undefined,
    });
  });

// =============================================================================
// Payment Query Operations
// =============================================================================

/**
 * Get a payment with its associated transaction
 */
export const getPaymentWithTransaction = (
  payupId: string
): Effect.Effect<PaymentResult | null, DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const payup = yield* db.getPayup(payupId);
    if (!payup) return null;
    
    const transaction = yield* db.getTransactionByPayupId(payupId);
    
    return { payup, transaction: transaction ?? undefined };
  });

/**
 * Get all payments for a customer
 */
export const getCustomerPayments = (
  customerId: string,
  options?: { limit?: number; status?: PayupStatus }
): Effect.Effect<Payup[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    return yield* db.listPayups({
      customerId,
      status: options?.status,
      limit: options?.limit,
    });
  });

/**
 * Get recent payments
 */
export const getRecentPayments = (
  limit: number = 10,
  appId?: string
): Effect.Effect<Payup[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const payups = yield* db.listPayups({ appId, limit });
    return payups.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  });

// =============================================================================
// Status Transition Operations
// =============================================================================

/**
 * Transition a payment to processing status
 */
export const startProcessing = (
  payupId: string,
  providerData?: Record<string, unknown>
): Effect.Effect<Payup, DbError | PayupNotFoundError | PayupAlreadyProcessedError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const payup = yield* db.getPayup(payupId);
    if (!payup) {
      return yield* Effect.fail(new PayupNotFoundError({ payupId }));
    }
    
    if (payup.status !== "pending") {
      return yield* Effect.fail(
        new PayupAlreadyProcessedError({ payupId, currentStatus: payup.status })
      );
    }
    
    return yield* db.updatePayup(payupId, {
      status: "processing",
      providerData,
    });
  });

/**
 * Check and expire old pending payments
 */
export const expireOldPayments = (
  appId?: string
): Effect.Effect<Payup[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const payups = yield* db.listPayups({ appId, status: "pending" });
    const now = new Date();
    const expiredPayups: Payup[] = [];
    
    for (const payup of payups) {
      if (payup.expiresAt < now) {
        const expired = yield* db.updatePayup(payup.id, { status: "expired" });
        expiredPayups.push(expired);
      }
    }
    
    return expiredPayups;
  });

// =============================================================================
// Refund Operations
// =============================================================================

/**
 * Process a refund for a completed transaction
 */
export const refundPayment = (
  options: RefundPaymentOptions
): Effect.Effect<Transaction, DbError | ValidationError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    
    const transaction = yield* db.getTransaction(options.transactionId);
    if (!transaction) {
      return yield* Effect.fail(
        new ValidationError({ message: `Transaction not found: ${options.transactionId}` })
      );
    }
    
    if (transaction.status !== "completed") {
      return yield* Effect.fail(
        new ValidationError({ message: `Cannot refund transaction with status: ${transaction.status}` })
      );
    }
    
    const refundAmount = options.amount ?? transaction.amount;
    if (refundAmount > transaction.amount) {
      return yield* Effect.fail(
        new ValidationError({ message: "Refund amount cannot exceed transaction amount" })
      );
    }
    
    return yield* db.updateTransaction(options.transactionId, {
      status: "refunded",
      providerData: {
        ...transaction.providerData,
        refundAmount,
        refundReason: options.reason,
        refundedAt: new Date().toISOString(),
        ...options.metadata,
      },
    });
  });