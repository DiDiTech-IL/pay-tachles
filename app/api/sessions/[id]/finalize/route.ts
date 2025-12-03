import { Effect, Exit, Layer, Cause, Chunk } from "effect";
import { NextRequest, NextResponse } from "next/server";
import { ConfigServiceLive, KVServiceLive, DbServiceLive, CryptoLive, QueueServiceMock } from "@/services";
import { finalizePayment } from "@/workflows";
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
// API Route Handler: POST /api/sessions/[id]/finalize
// Legacy endpoint - use /api/payups/[id]/finalize for new integrations
// =============================================================================

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: payupId } = await params;

  // Run the finalize workflow
  const program = finalizePayment({ payupId });

  const result = await Effect.runPromiseExit(
    program.pipe(Effect.provide(RuntimeLayer))
  );

  // Handle result
  return Exit.match(result, {
    onFailure: (cause) => {
      const failures = Cause.failures(cause);
      const error = Chunk.get(failures, 0);

      if (error._tag === "Some" && typeof error.value === "object" && error.value && "_tag" in error.value) {
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

      console.error("Unexpected error:", cause);
      return NextResponse.json(
        { error: "InternalServerError", message: "An unexpected error occurred" },
        { status: 500 }
      );
    },
    onSuccess: (output) => {
      return NextResponse.json(
        {
          success: output.success,
          transactionId: output.transactionId,
          status: output.status,
        },
        { status: 200 }
      );
    },
  });
}
