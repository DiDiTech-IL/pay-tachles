/**
 * Cloudflare Worker: Webhook Dispatcher
 *
 * This worker consumes messages from a Cloudflare Queue and dispatches
 * webhook notifications to client applications with HMAC signatures.
 *
 * Queue Trigger: Automatically invoked when messages arrive in the queue.
 * Retry Logic: Throws error on failure to trigger Cloudflare's automatic retry.
 */

/// <reference types="@cloudflare/workers-types" />

// =============================================================================
// Types
// =============================================================================

interface WebhookPayload {
  eventType: "payment.completed" | "payment.failed" | "payment.cancelled";
  sessionId: string;
  transactionId?: string;
  amount: number;
  currency: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

interface QueueMessage {
  webhookUrl: string;
  webhookSecret: string;
  payload: WebhookPayload;
  retryCount: number;
}

interface Env {
  // Queue binding (configured in wrangler.toml)
  WEBHOOK_QUEUE: Queue<QueueMessage>;
}

// =============================================================================
// HMAC Signature Generation
// =============================================================================

async function generateSignature(
  secret: string,
  payload: string
): Promise<string> {
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
}

// =============================================================================
// Webhook Delivery
// =============================================================================

async function deliverWebhook(message: QueueMessage): Promise<void> {
  const payloadString = JSON.stringify(message.payload);
  const timestamp = Math.floor(Date.now() / 1000);

  // Create signature payload: timestamp.payload
  const signaturePayload = `${timestamp}.${payloadString}`;
  const signature = await generateSignature(
    message.webhookSecret,
    signaturePayload
  );

  // Deliver webhook
  const response = await fetch(message.webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-TachlesPay-Signature": `t=${timestamp},v1=${signature}`,
      "X-TachlesPay-Event": message.payload.eventType,
      "X-TachlesPay-Delivery-Id": crypto.randomUUID(),
      "User-Agent": "TachlesPay-Webhook/1.0",
    },
    body: payloadString,
  });

  // Check response status
  if (!response.ok) {
    const errorBody = await response
      .text()
      .catch(() => "Unable to read response");
    throw new Error(
      `Webhook delivery failed: ${response.status} ${response.statusText}. Body: ${errorBody}`
    );
  }

  console.log(
    `✅ Webhook delivered successfully to ${message.webhookUrl} for session ${message.payload.sessionId}`
  );
}

// =============================================================================
// Queue Consumer Handler
// =============================================================================

const worker: ExportedHandler<Env, QueueMessage> = {
  async queue(batch: MessageBatch<QueueMessage>): Promise<void> {
    console.log(`📨 Processing ${batch.messages.length} webhook(s)`);

    for (const msg of batch.messages) {
      const message = msg.body;

      try {
        // Validate message structure
        if (!message.webhookUrl || !message.webhookSecret || !message.payload) {
          console.error("❌ Invalid message structure:", message);
          msg.ack(); // Acknowledge to remove from queue - don't retry malformed messages
          continue;
        }

        // Check max retries (Cloudflare will also enforce its own limits)
        const maxRetries = 5;
        if (message.retryCount >= maxRetries) {
          console.error(
            `❌ Max retries (${maxRetries}) exceeded for session ${message.payload.sessionId}`
          );
          msg.ack(); // Give up after max retries
          continue;
        }

        // Attempt delivery
        await deliverWebhook(message);

        // Success - acknowledge message
        msg.ack();
      } catch (err) {
        console.error(
          `❌ Failed to deliver webhook for session ${message.payload?.sessionId}:`,
          err
        );

        // Retry the message - Cloudflare will use exponential backoff
        msg.retry({
          delaySeconds: Math.min(60 * Math.pow(2, message.retryCount), 3600), // Max 1 hour
        });
      }
    }
  },

  // Optional: HTTP handler for manual webhook triggering (for testing)
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "POST") {
      try {
        const body = (await request.json()) as QueueMessage;

        // Enqueue the message
        await env.WEBHOOK_QUEUE.send(body);

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Failed to enqueue message:", err);
        return new Response(
          JSON.stringify({ error: "Failed to enqueue message" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response("Tachles Pay Webhook Dispatcher", { status: 200 });
  },
};

export default worker;
