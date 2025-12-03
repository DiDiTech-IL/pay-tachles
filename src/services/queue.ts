import { Context, Effect, Layer } from "effect";
import { QueueError } from "../domain/errors";
import type { QueueMessage } from "../domain/schema";

// =============================================================================
// Queue Service Definition
// =============================================================================

export interface QueueService {
  readonly enqueue: (message: QueueMessage) => Effect.Effect<void, QueueError>;
}

export const QueueService = Context.GenericTag<QueueService>("QueueService");

// =============================================================================
// Cloudflare Queue Binding Type
// =============================================================================

// This type represents the Cloudflare Queue binding available in Workers
interface CloudflareQueue {
  send(message: unknown): Promise<void>;
  sendBatch(messages: { body: unknown }[]): Promise<void>;
}

// =============================================================================
// Cloudflare Queue Live Implementation
// =============================================================================

/**
 * Creates a QueueService Layer that uses Cloudflare Queues.
 * This layer factory accepts the queue binding from the Cloudflare Worker environment.
 * 
 * Usage in Cloudflare Worker:
 * ```ts
 * const QueueLive = makeCloudflareQueueLayer(env.WEBHOOK_QUEUE);
 * ```
 */
export const makeCloudflareQueueLayer = (queue: CloudflareQueue) =>
  Layer.succeed(
    QueueService,
    {
      enqueue: (message: QueueMessage) =>
        Effect.tryPromise({
          try: async () => {
            await queue.send({
              webhookUrl: message.webhookUrl,
              webhookSecret: message.webhookSecret,
              payload: {
                eventType: message.payload.eventType,
                payupId: message.payload.payupId,
                transactionId: message.payload.transactionId,
                amount: message.payload.amount,
                currency: message.payload.currency,
                metadata: message.payload.metadata,
                timestamp: message.payload.timestamp.toISOString(),
              },
              retryCount: message.retryCount,
            });
          },
          catch: (cause) => new QueueError({ operation: "enqueue", cause }),
        }),
    }
  );

// =============================================================================
// HTTP-based Queue Implementation (for non-Worker environments)
// =============================================================================

/**
 * Creates a QueueService Layer that uses an HTTP endpoint to enqueue messages.
 * This is useful for local development or when running in a non-Worker environment.
 * 
 * The endpoint should accept POST requests with the queue message as JSON body.
 */
export const makeHttpQueueLayer = (queueEndpoint: string) =>
  Layer.succeed(
    QueueService,
    {
      enqueue: (message: QueueMessage) =>
        Effect.tryPromise({
          try: async () => {
            const response = await fetch(queueEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                webhookUrl: message.webhookUrl,
                webhookSecret: message.webhookSecret,
                payload: {
                  eventType: message.payload.eventType,
                  payupId: message.payload.payupId,
                  transactionId: message.payload.transactionId,
                  amount: message.payload.amount,
                  currency: message.payload.currency,
                  metadata: message.payload.metadata,
                  timestamp: message.payload.timestamp.toISOString(),
                },
                retryCount: message.retryCount,
              }),
            });

            if (!response.ok) {
              throw new Error(`Queue endpoint returned ${response.status}`);
            }
          },
          catch: (cause) => new QueueError({ operation: "enqueue", cause }),
        }),
    }
  );

// =============================================================================
// In-Memory Queue Implementation (for testing)
// =============================================================================

const inMemoryQueue: QueueMessage[] = [];

export const QueueServiceMock = Layer.succeed(
  QueueService,
  {
    enqueue: (message: QueueMessage) =>
      Effect.sync(() => {
        inMemoryQueue.push(message);
      }),
  }
);

// Helper for tests to access queued messages
export const getQueuedMessages = (): readonly QueueMessage[] => [...inMemoryQueue];
export const clearQueue = () => {
  inMemoryQueue.length = 0;
};
