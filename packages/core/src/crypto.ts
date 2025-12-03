// =============================================================================
// Crypto Utilities (Cross-Runtime Compatible)
// =============================================================================

import { Effect } from "effect";
import { RuntimeError } from "./errors";

// =============================================================================
// Hex Encoding
// =============================================================================

const hexEncode = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

// =============================================================================
// UUID Generation
// =============================================================================

export const generateUUID = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// =============================================================================
// Random Bytes
// =============================================================================

export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return bytes;
};

// =============================================================================
// Generate API Key
// =============================================================================

export const generateApiKey = (length: number = 32): string => {
  const bytes = randomBytes(length);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
};

// =============================================================================
// HMAC SHA-256 (Web Crypto API - works everywhere)
// =============================================================================

export const hmacSHA256 = (key: string, data: string): Effect.Effect<string, RuntimeError> =>
  Effect.tryPromise({
    try: async () => {
      const encoder = new TextEncoder();
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(key),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
      return hexEncode(signature);
    },
    catch: (e) => new RuntimeError({ operation: "hmacSHA256", cause: e }),
  });

// =============================================================================
// SHA-256 Hash
// =============================================================================

export const hashSHA256 = (data: string): Effect.Effect<string, RuntimeError> =>
  Effect.tryPromise({
    try: async () => {
      const encoder = new TextEncoder();
      const hash = await crypto.subtle.digest("SHA-256", encoder.encode(data));
      return hexEncode(hash);
    },
    catch: (e) => new RuntimeError({ operation: "hashSHA256", cause: e }),
  });

// =============================================================================
// Timing-Safe Comparison
// =============================================================================

export const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

// =============================================================================
// Webhook Signature
// =============================================================================

export interface WebhookSignature {
  timestamp: number;
  signature: string;
}

export const createWebhookSignature = (
  payload: string,
  secret: string,
  timestamp: number = Date.now()
): Effect.Effect<WebhookSignature, RuntimeError> =>
  Effect.gen(function* () {
    const signedPayload = `${timestamp}.${payload}`;
    const signature = yield* hmacSHA256(secret, signedPayload);
    return { timestamp, signature };
  });

export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  timestamp: number,
  secret: string,
  toleranceSeconds: number = 300
): Effect.Effect<boolean, RuntimeError> =>
  Effect.gen(function* () {
    // Check timestamp tolerance
    const now = Date.now();
    const age = Math.abs(now - timestamp) / 1000;
    if (age > toleranceSeconds) {
      return false;
    }

    // Verify signature
    const signedPayload = `${timestamp}.${payload}`;
    const expectedSignature = yield* hmacSHA256(secret, signedPayload);
    return timingSafeEqual(signature, expectedSignature);
  });
