import { Effect, Option, Schema } from "effect";
import { KVService, DbService, CryptoService } from "../services";
import { KVError } from "../services/kv";
import {
  AppNotFoundError,
  ValidationError,
  DbError,
} from "../domain/errors";
import {
  CreatePayupRequest,
  type PaymentMetadata,
} from "../domain/schema";

// =============================================================================
// Constants
// =============================================================================

const PAYUP_TTL_SECONDS = 60 * 60; // 1 hour
const PAYUP_KEY_PREFIX = "payup:";

// =============================================================================
// Input/Output Types
// =============================================================================

export interface CreatePayupInput {
  apiKey: string;
  amount: number;
  currency: string;
  metadata?: Record<string, unknown>;
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface CreatePayupOutput {
  payupId: string;
  paymentUrl: string;
  expiresAt: Date;
}

// =============================================================================
// Payup Data Type (stored in Redis/KV for quick access)
// =============================================================================

export interface PayupData {
  payupId: string;
  appId: string;
  amount: number;
  currency: string;
  metadata: PaymentMetadata;
  status: string;
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
  createdAt: string;
  expiresAt: string;
}

// =============================================================================
// Workflow: Create Payup
// Creates a temporary payment intent with user identifiers.
// The payup waits for webhook confirmation before creating a transaction.
// =============================================================================

export const createPayup = (
  input: CreatePayupInput
): Effect.Effect<
  CreatePayupOutput,
  AppNotFoundError | ValidationError | DbError | KVError,
  KVService | DbService | CryptoService
> =>
  Effect.gen(function* () {
    // 1. Validate input via Schema
    const validatedInput = yield* Effect.tryPromise({
      try: () =>
        Schema.decodeUnknownPromise(CreatePayupRequest)({
          amount: input.amount,
          currency: input.currency,
          metadata: input.metadata,
          customerEmail: input.customerEmail,
          customerName: input.customerName,
          customerId: input.customerId,
          description: input.description,
          returnUrl: input.returnUrl,
          cancelUrl: input.cancelUrl,
        }),
      catch: (cause) =>
        new ValidationError({
          message: "Invalid payup request",
          cause,
        }),
    });

    // 2. Look up app by API key
    const db = yield* DbService;
    const app = yield* db.getAppByApiKey(input.apiKey);

    if (!app) {
      return yield* Effect.fail(new AppNotFoundError({ apiKey: input.apiKey }));
    }

    // 3. Generate payup ID with prefix for easy identification
    const crypto = yield* CryptoService;
    const uuid = yield* crypto.generateUUID();
    const payupId = `pyp_${uuid.replace(/-/g, "").slice(0, 24)}`;

    // 4. Calculate expiry
    const now = new Date();
    const expiresAt = new Date(now.getTime() + PAYUP_TTL_SECONDS * 1000);

    // 5. Build payup data
    const payupData: PayupData = {
      payupId,
      appId: app.id,
      amount: validatedInput.amount as number,
      currency: validatedInput.currency,
      metadata: validatedInput.metadata,
      status: "pending",
      customerEmail: validatedInput.customerEmail,
      customerName: validatedInput.customerName,
      customerId: validatedInput.customerId,
      description: validatedInput.description,
      returnUrl: validatedInput.returnUrl,
      cancelUrl: validatedInput.cancelUrl,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    // 6. Store in Redis/KV with TTL for quick access
    const kv = yield* KVService;
    yield* kv.set(`${PAYUP_KEY_PREFIX}${payupId}`, payupData, PAYUP_TTL_SECONDS);

    // 7. Also persist to database for durability
    yield* db.createPayup({
      app_id: app.id,
      amount: payupData.amount,
      currency: payupData.currency,
      customer_email: payupData.customerEmail,
      customer_name: payupData.customerName,
      customer_id: payupData.customerId,
      description: payupData.description,
      return_url: payupData.returnUrl,
      cancel_url: payupData.cancelUrl,
      metadata: JSON.parse(JSON.stringify(payupData.metadata)),
      expires_at: expiresAt,
    });

    // 8. Build payment URL
    const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
    const paymentUrl = `${baseUrl}/checkout/${payupId}`;

    return {
      payupId,
      paymentUrl,
      expiresAt,
    };
  });

// =============================================================================
// Workflow: Get Payup Data (for checkout page)
// =============================================================================

export const getPayupData = (
  payupId: string
): Effect.Effect<Option.Option<PayupData>, KVError, KVService> =>
  Effect.gen(function* () {
    const kv = yield* KVService;
    const data = yield* kv.get<PayupData>(`${PAYUP_KEY_PREFIX}${payupId}`);
    return Option.fromNullable(data);
  });

// =============================================================================
// Helper: Update Payup Status in Cache
// =============================================================================

export const updatePayupStatus = (
  payupId: string,
  status: "processing" | "completed" | "failed" | "expired"
): Effect.Effect<void, KVError, KVService> =>
  Effect.gen(function* () {
    const kv = yield* KVService;
    const existing = yield* kv.get<PayupData>(`${PAYUP_KEY_PREFIX}${payupId}`);
    
    if (existing) {
      yield* kv.set(
        `${PAYUP_KEY_PREFIX}${payupId}`,
        { ...existing, status },
        PAYUP_TTL_SECONDS
      );
    }
  });

// =============================================================================
// Legacy Exports (for backward compatibility)
// =============================================================================

export type SessionData = PayupData;
export const createCheckoutSession = createPayup;
export const getSessionData = getPayupData;
export const updateSessionStatus = updatePayupStatus;
