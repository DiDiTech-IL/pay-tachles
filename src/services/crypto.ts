import { Context, Effect, Layer } from "effect";

// =============================================================================
// Crypto Service Definition
// =============================================================================

export interface CryptoService {
  readonly generateUUID: () => Effect.Effect<string>;
  
  readonly hmacSign: (
    secret: string,
    payload: string
  ) => Effect.Effect<string>;
  
  readonly hmacVerify: (
    secret: string,
    payload: string,
    signature: string
  ) => Effect.Effect<boolean>;
}

export const CryptoService = Context.GenericTag<CryptoService>("CryptoService");

// =============================================================================
// Node.js Crypto Implementation
// =============================================================================

export const CryptoLive = Layer.succeed(
  CryptoService,
  {
    generateUUID: () => Effect.sync(() => crypto.randomUUID()),

    hmacSign: (secret: string, payload: string) =>
      Effect.promise(async () => {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const payloadData = encoder.encode(payload);

        const key = await crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );

        const signature = await crypto.subtle.sign("HMAC", key, payloadData);
        const hashArray = Array.from(new Uint8Array(signature));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      }),

    hmacVerify: (secret: string, payload: string, signature: string) =>
      Effect.promise(async () => {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const payloadData = encoder.encode(payload);

        const key = await crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["verify"]
        );

        // Convert hex signature to ArrayBuffer
        const signatureBytes = new Uint8Array(
          signature.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
        );

        return await crypto.subtle.verify(
          "HMAC",
          key,
          signatureBytes,
          payloadData
        );
      }),
  }
);
