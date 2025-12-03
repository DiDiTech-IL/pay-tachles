"use server";

import { Effect, Exit, Layer, Cause, Chunk, Option } from "effect";
import { ConfigServiceLive, KVServiceLive, DbServiceLive, CryptoLive, QueueServiceMock } from "@/services";
import { finalizePayment, getPayupData } from "@/workflows";

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
// Server Action: Process Payment
// =============================================================================

export interface ProcessPaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
  returnUrl?: string;
}

export async function processPaymentAction(
  payupId: string
): Promise<ProcessPaymentResult> {
  // First, get payup data to retrieve returnUrl
  const payupProgram = getPayupData(payupId);
  const payupResult = await Effect.runPromiseExit(
    payupProgram.pipe(Effect.provide(RuntimeLayer))
  );

  let returnUrl: string | undefined;

  Exit.match(payupResult, {
    onFailure: () => {},
    onSuccess: (opt) => {
      Option.match(opt, {
        onNone: () => {},
        onSome: (payup) => {
          returnUrl = payup.returnUrl;
        },
      });
    },
  });

  // Now process the payment
  const program = finalizePayment({ payupId });

  const result = await Effect.runPromiseExit(
    program.pipe(Effect.provide(RuntimeLayer))
  );

  return Exit.match(result, {
    onFailure: (cause) => {
      const failures = Cause.failures(cause);
      const error = Chunk.get(failures, 0);

      if (error._tag === "Some" && typeof error.value === "object" && error.value && "_tag" in error.value) {
        const domainError = error.value as { _tag: string; message?: string };
        return {
          success: false,
          error: domainError.message ?? domainError._tag,
        };
      }

      return {
        success: false,
        error: "An unexpected error occurred",
      };
    },
    onSuccess: (output) => {
      return {
        success: output.success,
        transactionId: output.transactionId,
        returnUrl,
      };
    },
  });
}
