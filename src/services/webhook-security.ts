import { Effect, Context, Layer, pipe } from "effect";
import { ConfigService } from "@/config";
import { CryptoService } from "./crypto";
import { SignatureError } from "@/domain/errors";

// =============================================================================
// Webhook Security Service
// =============================================================================

export interface WebhookSecurityService {
  /**
   * Sign a webhook payload with timestamp
   */
  readonly signPayload: (payload: string) => Effect.Effect<{
    signature: string;
    timestamp: number;
  }>;

  /**
   * Verify an incoming webhook signature
   */
  readonly verifySignature: (
    payload: string,
    signature: string,
    timestamp: number
  ) => Effect.Effect<boolean, SignatureError>;

  /**
   * Create the full signature header value (t=timestamp,v1=signature)
   */
  readonly createSignatureHeader: (payload: string) => Effect.Effect<string>;

  /**
   * Parse and verify a signature header
   */
  readonly verifySignatureHeader: (
    payload: string,
    signatureHeader: string
  ) => Effect.Effect<boolean, SignatureError>;
}

export const WebhookSecurityService = Context.GenericTag<WebhookSecurityService>(
  "WebhookSecurityService"
);

// =============================================================================
// Implementation
// =============================================================================

export const WebhookSecurityServiceLive = Layer.effect(
  WebhookSecurityService,
  Effect.gen(function* () {
    const config = yield* ConfigService;
    const crypto = yield* CryptoService;

    const secret = config.getWebhookSecret();
    const toleranceSeconds = config.getWebhookTolerance();

    const signPayload = (payload: string) =>
      Effect.gen(function* () {
        const timestamp = Math.floor(Date.now() / 1000);
        const signedPayload = `${timestamp}.${payload}`;
        const signature = yield* crypto.hmacSign(secret, signedPayload);
        return { signature, timestamp };
      });

    const verifySignature = (
      payload: string,
      signature: string,
      timestamp: number
    ): Effect.Effect<boolean, SignatureError> =>
      Effect.gen(function* () {
        const now = Math.floor(Date.now() / 1000);

        // Check timestamp tolerance
        if (Math.abs(now - timestamp) > toleranceSeconds) {
          return yield* Effect.fail(new SignatureError({ reason: "expired" }));
        }

        const signedPayload = `${timestamp}.${payload}`;
        const isValid = yield* crypto.hmacVerify(secret, signedPayload, signature);

        if (!isValid) {
          return yield* Effect.fail(new SignatureError({ reason: "invalid" }));
        }

        return true;
      });

    const createSignatureHeader = (payload: string) =>
      pipe(
        signPayload(payload),
        Effect.map(({ signature, timestamp }) => `t=${timestamp},v1=${signature}`)
      );

    const parseSignatureHeader = (
      header: string
    ): { timestamp: number; signature: string } | null => {
      const parts = header.split(",");
      let timestamp: number | null = null;
      let signature: string | null = null;

      for (const part of parts) {
        const [key, value] = part.split("=");
        if (key === "t") {
          timestamp = parseInt(value, 10);
        } else if (key === "v1") {
          signature = value;
        }
      }

      if (timestamp === null || signature === null) {
        return null;
      }

      return { timestamp, signature };
    };

    const verifySignatureHeader = (
      payload: string,
      signatureHeader: string
    ): Effect.Effect<boolean, SignatureError> =>
      Effect.gen(function* () {
        const parsed = parseSignatureHeader(signatureHeader);

        if (!parsed) {
          return yield* Effect.fail(new SignatureError({ reason: "missing" }));
        }

        return yield* verifySignature(payload, parsed.signature, parsed.timestamp);
      });

    return WebhookSecurityService.of({
      signPayload,
      verifySignature,
      createSignatureHeader,
      verifySignatureHeader,
    });
  })
);
