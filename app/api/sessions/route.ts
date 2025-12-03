import { Effect, Exit, Layer, Cause, Chunk } from "effect";
import { NextRequest, NextResponse } from "next/server";
import { ConfigServiceLive, KVServiceLive, DbServiceLive, CryptoLive, QueueServiceMock } from "@/services";
import { createPayup } from "@/workflows";
import { getHttpStatusCode, type DomainError } from "@/domain/errors";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = Layer.mergeAll(
  DbServiceLive,
  CryptoLive,
  QueueServiceMock
).pipe(
  Layer.provideMerge(KVServiceLive),
  Layer.provideMerge(ConfigServiceLive)
);

// =============================================================================
// API Route Handler: POST /api/sessions
// Legacy endpoint - use /api/payups for new integrations
// =============================================================================

export async function POST(request: NextRequest) {
  // 1. Extract API Key from Authorization header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }
  const apiKey = authHeader.slice(7);

  // 2. Parse request body
  let body: {
    amount?: number;
    currency?: string;
    metadata?: Record<string, unknown>;
    customerEmail?: string;
    customerName?: string;
    customerId?: string;
    description?: string;
    returnUrl?: string;
    cancelUrl?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // 3. Build and run the workflow
  const program = createPayup({
    apiKey,
    amount: body.amount ?? 0,
    currency: body.currency ?? "USD",
    metadata: body.metadata,
    customerEmail: body.customerEmail,
    customerName: body.customerName,
    customerId: body.customerId,
    description: body.description,
    returnUrl: body.returnUrl,
    cancelUrl: body.cancelUrl,
  });

  const result = await Effect.runPromiseExit(
    program.pipe(Effect.provide(RuntimeLayer))
  );

  // 4. Handle result
  return Exit.match(result, {
    onFailure: (cause) => {
      // Extract the error from the cause
      const failures = Cause.failures(cause);
      const error = Chunk.get(failures, 0);

      if (error._tag === "Some" && typeof error.value === "object" && "_tag" in error.value) {
        const domainError = error.value as DomainError;
        const statusCode = getHttpStatusCode(domainError);
        return NextResponse.json(
          {
            error: domainError._tag,
            message: domainError.message,
          },
          { status: statusCode }
        );
      }

      // Generic error fallback
      console.error("Unexpected error:", cause);
      return NextResponse.json(
        { error: "InternalServerError", message: "An unexpected error occurred" },
        { status: 500 }
      );
    },
    onSuccess: (output) => {
      return NextResponse.json(
        {
          payupId: output.payupId,
          paymentUrl: output.paymentUrl,
          expiresAt: output.expiresAt.toISOString(),
        },
        { status: 201 }
      );
    },
  });
}
