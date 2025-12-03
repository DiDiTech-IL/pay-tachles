// =============================================================================
// In-Memory Database Provider
// Zero dependencies, perfect for development, testing, or single-instance
// =============================================================================

import { Effect } from "effect";
import { DbError } from "../errors";
import { createDatabaseLayer, type DatabaseProvider } from "./provider";
import type {
  App,
  Payup,
  Transaction,
  WebhookTemplate,
  WebhookLog,
} from "../types";

// =============================================================================
// UUID Generator
// =============================================================================

const generateId = (): string =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

// =============================================================================
// In-Memory Store
// =============================================================================

interface Store {
  apps: Map<string, App>;
  payups: Map<string, Payup>;
  transactions: Map<string, Transaction>;
  webhookTemplates: Map<string, WebhookTemplate>;
  webhookLogs: Map<string, WebhookLog>;
}

// =============================================================================
// Memory Provider Implementation
// =============================================================================

export const createMemoryDatabase = (): DatabaseProvider => {
  const store: Store = {
    apps: new Map(),
    payups: new Map(),
    transactions: new Map(),
    webhookTemplates: new Map(),
    webhookLogs: new Map(),
  };
  let connected = false;

  return {
    connect: () => Effect.sync(() => { connected = true; }),
    disconnect: () => Effect.sync(() => { connected = false; }),
    isConnected: () => connected,

    // Apps
    getAppByApiKey: (apiKey) =>
      Effect.sync(() => {
        for (const app of store.apps.values()) {
          if (app.apiKey === apiKey) return app;
        }
        return null;
      }),

    getAppById: (id) => Effect.sync(() => store.apps.get(id) ?? null),

    listApps: () => Effect.sync(() => Array.from(store.apps.values())),

    createApp: (data) =>
      Effect.sync(() => {
        const now = new Date();
        const app: App = {
          id: generateId(),
          name: data.name,
          provider: data.provider,
          apiKey: data.apiKey,
          webhookSecret: data.webhookSecret,
          webhookUrl: data.webhookUrl,
          isActive: true,
          metadata: data.metadata ?? null,
          createdAt: now,
          updatedAt: now,
        };
        store.apps.set(app.id, app);
        return app;
      }),

    updateApp: (id, data) =>
      Effect.gen(function* () {
        const existing = store.apps.get(id);
        if (!existing) {
          return yield* Effect.fail(new DbError({ operation: "updateApp", cause: `App ${id} not found` }));
        }
        const updated: App = {
          ...existing,
          ...(data.name !== undefined && { name: data.name }),
          ...(data.webhookUrl !== undefined && { webhookUrl: data.webhookUrl }),
          ...(data.apiKey !== undefined && { apiKey: data.apiKey }),
          ...(data.webhookSecret !== undefined && { webhookSecret: data.webhookSecret }),
          ...(data.isActive !== undefined && { isActive: data.isActive }),
          ...(data.metadata !== undefined && { metadata: data.metadata }),
          updatedAt: new Date(),
        };
        store.apps.set(id, updated);
        return updated;
      }),

    deleteApp: (id) =>
      Effect.sync(() => {
        store.apps.delete(id);
        // Cascade
        for (const [k, v] of store.payups) if (v.appId === id) store.payups.delete(k);
        for (const [k, v] of store.transactions) if (v.appId === id) store.transactions.delete(k);
        for (const [k, v] of store.webhookTemplates) if (v.appId === id) store.webhookTemplates.delete(k);
        for (const [k, v] of store.webhookLogs) if (v.appId === id) store.webhookLogs.delete(k);
      }),

    // Payups
    createPayup: (data) =>
      Effect.sync(() => {
        const now = new Date();
        const payup: Payup = {
          id: generateId(),
          appId: data.appId,
          amount: data.amount,
          currency: data.currency ?? "USD",
          status: "pending",
          customerEmail: data.customerEmail ?? null,
          customerName: data.customerName ?? null,
          customerId: data.customerId ?? null,
          description: data.description ?? null,
          returnUrl: data.returnUrl ?? null,
          cancelUrl: data.cancelUrl ?? null,
          metadata: data.metadata ?? null,
          providerData: null,
          createdAt: now,
          updatedAt: now,
          expiresAt: data.expiresAt,
          completedAt: null,
        };
        store.payups.set(payup.id, payup);
        return payup;
      }),

    getPayup: (id) => Effect.sync(() => store.payups.get(id) ?? null),

    updatePayup: (id, data) =>
      Effect.gen(function* () {
        const existing = store.payups.get(id);
        if (!existing) {
          return yield* Effect.fail(new DbError({ operation: "updatePayup", cause: `Payup ${id} not found` }));
        }
        const updated: Payup = {
          ...existing,
          ...(data.status !== undefined && { status: data.status }),
          ...(data.providerData !== undefined && { providerData: data.providerData }),
          ...(data.completedAt !== undefined && { completedAt: data.completedAt }),
          updatedAt: new Date(),
        };
        store.payups.set(id, updated);
        return updated;
      }),

    listPayups: (filter) =>
      Effect.sync(() => {
        let results = Array.from(store.payups.values());
        if (filter?.appId) results = results.filter((p) => p.appId === filter.appId);
        if (filter?.status) results = results.filter((p) => p.status === filter.status);
        if (filter?.customerId) results = results.filter((p) => p.customerId === filter.customerId);
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),

    // Transactions
    createTransaction: (data) =>
      Effect.sync(() => {
        const now = new Date();
        const tx: Transaction = {
          id: generateId(),
          appId: data.appId,
          payupId: data.payupId,
          externalId: data.externalId ?? null,
          amount: data.amount,
          currency: data.currency ?? "USD",
          status: data.status,
          customerEmail: data.customerEmail ?? null,
          customerName: data.customerName ?? null,
          customerId: data.customerId ?? null,
          description: data.description ?? null,
          metadata: data.metadata ?? null,
          failureReason: data.failureReason ?? null,
          providerData: data.providerData ?? null,
          fees: data.fees ?? null,
          netAmount: data.netAmount ?? null,
          createdAt: now,
          updatedAt: now,
        };
        store.transactions.set(tx.id, tx);
        return tx;
      }),

    getTransaction: (id) => Effect.sync(() => store.transactions.get(id) ?? null),

    getTransactionByPayupId: (payupId) =>
      Effect.sync(() => {
        for (const tx of store.transactions.values()) {
          if (tx.payupId === payupId) return tx;
        }
        return null;
      }),

    getTransactionByExternalId: (appId, externalId) =>
      Effect.sync(() => {
        for (const tx of store.transactions.values()) {
          if (tx.appId === appId && tx.externalId === externalId) return tx;
        }
        return null;
      }),

    updateTransaction: (id, data) =>
      Effect.gen(function* () {
        const existing = store.transactions.get(id);
        if (!existing) {
          return yield* Effect.fail(new DbError({ operation: "updateTransaction", cause: `Transaction ${id} not found` }));
        }
        const updated: Transaction = {
          ...existing,
          ...(data.externalId !== undefined && { externalId: data.externalId }),
          ...(data.status !== undefined && { status: data.status }),
          ...(data.failureReason !== undefined && { failureReason: data.failureReason }),
          ...(data.providerData !== undefined && { providerData: data.providerData }),
          ...(data.fees !== undefined && { fees: data.fees }),
          ...(data.netAmount !== undefined && { netAmount: data.netAmount }),
          updatedAt: new Date(),
        };
        store.transactions.set(id, updated);
        return updated;
      }),

    listTransactions: (filter) =>
      Effect.sync(() => {
        let results = Array.from(store.transactions.values());
        if (filter?.appId) results = results.filter((t) => t.appId === filter.appId);
        if (filter?.payupId) results = results.filter((t) => t.payupId === filter.payupId);
        if (filter?.status) results = results.filter((t) => t.status === filter.status);
        if (filter?.customerId) results = results.filter((t) => t.customerId === filter.customerId);
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),

    // Webhook Templates
    listWebhookTemplates: (appId) =>
      Effect.sync(() => Array.from(store.webhookTemplates.values()).filter((t) => t.appId === appId)),

    getWebhookTemplate: (id) => Effect.sync(() => store.webhookTemplates.get(id) ?? null),

    upsertWebhookTemplate: (data) =>
      Effect.sync(() => {
        let existing: WebhookTemplate | undefined;
        for (const t of store.webhookTemplates.values()) {
          if (t.appId === data.appId && t.name === data.name && t.eventType === data.eventType) {
            existing = t;
            break;
          }
        }
        const now = new Date();
        if (existing) {
          const updated: WebhookTemplate = {
            ...existing,
            format: data.format,
            isDefault: data.isDefault ?? existing.isDefault,
            headers: data.headers ?? existing.headers,
            updatedAt: now,
          };
          store.webhookTemplates.set(existing.id, updated);
          return updated;
        }
        const template: WebhookTemplate = {
          id: generateId(),
          appId: data.appId,
          name: data.name,
          eventType: data.eventType,
          format: data.format,
          isDefault: data.isDefault ?? false,
          headers: data.headers ?? null,
          createdAt: now,
          updatedAt: now,
        };
        store.webhookTemplates.set(template.id, template);
        return template;
      }),

    deleteWebhookTemplate: (id) => Effect.sync(() => { store.webhookTemplates.delete(id); }),

    // Webhook Logs
    createWebhookLog: (data) =>
      Effect.sync(() => {
        const log: WebhookLog = {
          id: generateId(),
          appId: data.appId,
          transactionId: data.transactionId ?? null,
          eventType: data.eventType,
          direction: data.direction,
          payload: data.payload,
          headers: data.headers ?? null,
          statusCode: data.statusCode ?? null,
          responseBody: data.responseBody ?? null,
          errorMessage: data.errorMessage ?? null,
          retryCount: data.retryCount ?? 0,
          nextRetryAt: data.nextRetryAt ?? null,
          processedAt: new Date(),
          latencyMs: data.latencyMs ?? null,
        };
        store.webhookLogs.set(log.id, log);
        return log;
      }),

    listWebhookLogs: (filter) =>
      Effect.sync(() => {
        let results = Array.from(store.webhookLogs.values());
        if (filter?.appId) results = results.filter((l) => l.appId === filter.appId);
        if (filter?.transactionId) results = results.filter((l) => l.transactionId === filter.transactionId);
        if (filter?.eventType) results = results.filter((l) => l.eventType === filter.eventType);
        if (filter?.direction) results = results.filter((l) => l.direction === filter.direction);
        results.sort((a, b) => b.processedAt.getTime() - a.processedAt.getTime());
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),
  };
};

// =============================================================================
// Layer
// =============================================================================

export const MemoryDatabaseLive = createDatabaseLayer(createMemoryDatabase());

export { Database, createDatabaseLayer, type DatabaseProvider } from "./provider";
