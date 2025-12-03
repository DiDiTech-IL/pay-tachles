import { Effect, Exit, Layer, Cause, Chunk, Option } from "effect";
import { NextRequest, NextResponse } from "next/server";
import { ConfigServiceLive, KVServiceLive } from "@/services";
import { getPayupData } from "@/workflows";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = KVServiceLive.pipe(
  Layer.provideMerge(ConfigServiceLive)
);

// =============================================================================
// API Route Handler: GET /api/sessions/[id]
// Legacy endpoint - use /api/payups/[id] for new integrations
// =============================================================================

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: payupId } = await params;

  const program = getPayupData(payupId);

  const result = await Effect.runPromiseExit(
    program.pipe(Effect.provide(RuntimeLayer))
  );

  return Exit.match(result, {
    onFailure: (cause) => {
      const failures = Cause.failures(cause);
      const error = Chunk.get(failures, 0);

      if (error._tag === "Some" && typeof error.value === "object" && "_tag" in error.value) {
        const kvError = error.value as { _tag: string; operation: string };
        return NextResponse.json(
          {
            error: kvError._tag,
            message: `KV error: ${kvError.operation}`,
          },
          { status: 500 }
        );
      }

      console.error("Unexpected error:", cause);
      return NextResponse.json(
        { error: "InternalServerError", message: "An unexpected error occurred" },
        { status: 500 }
      );
    },
    onSuccess: (payupOption) => {
      return Option.match(payupOption, {
        onNone: () =>
          NextResponse.json(
            { error: "PayupNotFound", message: "Payup not found or expired" },
            { status: 404 }
          ),
        onSome: (payup) =>
          NextResponse.json(
            {
              payupId: payup.payupId,
              amount: payup.amount,
              currency: payup.currency,
              status: payup.status,
              metadata: payup.metadata,
              expiresAt: payup.expiresAt,
            },
            { status: 200 }
          ),
      });
    },
  });
}
