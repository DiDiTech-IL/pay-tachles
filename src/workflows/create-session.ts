import { Effect, Option, Schema } from "effect";
import { KVService, DbService, CryptoService } from "../services";
import { KVError } from "../services/kv";
import {
  AppNotFoundError,
  ValidationError,
  DbError,
} from "../domain/errors";
import {
  CreateSessionRequest,
  type PaymentMetadata,
} from "../domain/schema";

// =============================================================================
// Constants
// =============================================================================

const SESSION_TTL_SECONDS = 60 * 60; // 1 hour
const SESSION_KEY_PREFIX = "session:";

// =============================================================================
// Input/Output Types
// =============================================================================

interface CreateSessionInput {
  apiKey: string;
  amount: number;
  currency: string;
  metadata?: Record<string, unknown>;
  customerEmail?: string;
  returnUrl?: string;
}

interface CreateSessionOutput {
  sessionId: string;
  paymentUrl: string;
  expiresAt: Date;
}

// =============================================================================
// Session Data Type (stored in Redis)
// =============================================================================

export interface SessionData {
  sessionId: string;
  appId: string;
  amount: number;
  currency: string;
  metadata: PaymentMetadata;
  status: string;
  customerEmail?: string;
  returnUrl?: string;
  createdAt: string;
  expiresAt: string;
}

// =============================================================================
// Workflow: Create Checkout Session
// =============================================================================

export const createCheckoutSession = (
  input: CreateSessionInput
): Effect.Effect<
  CreateSessionOutput,
  AppNotFoundError | ValidationError | DbError | KVError,
  KVService | DbService | CryptoService
> =>
  Effect.gen(function* () {
    // 1. Validate input via Schema
    const validatedInput = yield* Effect.tryPromise({
      try: () =>
        Schema.decodeUnknownPromise(CreateSessionRequest)({
          amount: input.amount,
          currency: input.currency,
          metadata: input.metadata,
          customerEmail: input.customerEmail,
          returnUrl: input.returnUrl,
        }),
      catch: (cause) =>
        new ValidationError({
          message: "Invalid session request",
          cause,
        }),
    });

    // 2. Look up app by API key
    const db = yield* DbService;
    const app = yield* db.getAppByApiKey(input.apiKey);

    if (!app) {
      return yield* Effect.fail(new AppNotFoundError({ apiKey: input.apiKey }));
    }

    // 3. Generate session ID
    const crypto = yield* CryptoService;
    const sessionId = yield* crypto.generateUUID();

    // 4. Calculate expiry
    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000);

    // 5. Build session data
    const sessionData: SessionData = {
      sessionId,
      appId: app.id,
      amount: validatedInput.amount as number,
      currency: validatedInput.currency,
      metadata: validatedInput.metadata,
      status: "pending",
      customerEmail: validatedInput.customerEmail,
      returnUrl: validatedInput.returnUrl,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    // 6. Store in Redis with TTL
    const kv = yield* KVService;
    yield* kv.set(`${SESSION_KEY_PREFIX}${sessionId}`, sessionData, SESSION_TTL_SECONDS);

    // 7. Build payment URL
    const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
    const paymentUrl = `${baseUrl}/checkout/${sessionId}`;

    return {
      sessionId,
      paymentUrl,
      expiresAt,
    };
  });

// =============================================================================
// Workflow: Get Session Data (for checkout page)
// =============================================================================

export const getSessionData = (
  sessionId: string
): Effect.Effect<Option.Option<SessionData>, KVError, KVService> =>
  Effect.gen(function* () {
    const kv = yield* KVService;
    const data = yield* kv.get<SessionData>(`${SESSION_KEY_PREFIX}${sessionId}`);
    return Option.fromNullable(data);
  });

// =============================================================================
// Helper: Update Session Status in Cache
// =============================================================================

export const updateSessionStatus = (
  sessionId: string,
  status: "processing" | "completed" | "failed"
): Effect.Effect<void, KVError, KVService> =>
  Effect.gen(function* () {
    const kv = yield* KVService;
    const existing = yield* kv.get<SessionData>(`${SESSION_KEY_PREFIX}${sessionId}`);
    
    if (existing) {
      yield* kv.set(
        `${SESSION_KEY_PREFIX}${sessionId}`,
        { ...existing, status },
        SESSION_TTL_SECONDS
      );
    }
  });
