// =============================================================================
// In-Memory Database Provider
// Perfect for testing, development, or lightweight single-instance deployments
// No external database required!
// =============================================================================

import { Effect } from "effect";
import { DbError } from "@/domain/errors";
import {
  DatabaseProvider,
  createDatabaseLayer,
  type App,
  type Payup,
  type Transaction,
  type WebhookTemplate,
  type WebhookLog,
  type CreateAppInput,
  type UpdateAppInput,
  type CreatePayupInput,
  type UpdatePayupInput,
  type PayupFilter,
  type CreateTransactionInput,
  type UpdateTransactionInput,
  type TransactionFilter,
  type UpsertWebhookTemplateInput,
  type CreateWebhookLogInput,
  type WebhookLogFilter,
} from "./provider";

// =============================================================================
// UUID Generator (simple implementation for portability)
// =============================================================================

const generateId = (): string => {
  // Simple UUID v4-like generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// =============================================================================
// In-Memory Store
// =============================================================================

interface MemoryStore {
  apps: Map<string, App>;
  payups: Map<string, Payup>;
  transactions: Map<string, Transaction>;
  webhookTemplates: Map<string, WebhookTemplate>;
  webhookLogs: Map<string, WebhookLog>;
}

const createStore = (): MemoryStore => ({
  apps: new Map(),
  payups: new Map(),
  transactions: new Map(),
  webhookTemplates: new Map(),
  webhookLogs: new Map(),
});

// =============================================================================
// In-Memory Provider Implementation
// =============================================================================

export const createMemoryDatabaseProvider = (): DatabaseProvider => {
  const store = createStore();
  let connected = false;

  return {
    // Connection
    connect: () =>
      Effect.sync(() => {
        connected = true;
      }),

    disconnect: () =>
      Effect.sync(() => {
        connected = false;
      }),

    isConnected: () => connected,

    // ==========================================================================
    // App Operations
    // ==========================================================================

    getAppByApiKey: (apiKey: string) =>
      Effect.sync(() => {
        for (const app of store.apps.values()) {
          if (app.apiKey === apiKey) return app;
        }
        return null;
      }),

    getAppById: (id: string) =>
      Effect.sync(() => store.apps.get(id) ?? null),

    listApps: () =>
      Effect.sync(() => Array.from(store.apps.values())),

    createApp: (data: CreateAppInput) =>
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

    updateApp: (id: string, data: UpdateAppInput) =>
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

    deleteApp: (id: string) =>
      Effect.sync(() => {
        store.apps.delete(id);
        // Cascade delete related entities
        for (const [payupId, payup] of store.payups) {
          if (payup.appId === id) store.payups.delete(payupId);
        }
        for (const [txId, tx] of store.transactions) {
          if (tx.appId === id) store.transactions.delete(txId);
        }
        for (const [templateId, template] of store.webhookTemplates) {
          if (template.appId === id) store.webhookTemplates.delete(templateId);
        }
        for (const [logId, log] of store.webhookLogs) {
          if (log.appId === id) store.webhookLogs.delete(logId);
        }
      }),

    // ==========================================================================
    // Payup Operations
    // ==========================================================================

    createPayup: (data: CreatePayupInput) =>
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

    getPayup: (id: string) =>
      Effect.sync(() => store.payups.get(id) ?? null),

    updatePayup: (id: string, data: UpdatePayupInput) =>
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

    listPayups: (filter?: PayupFilter) =>
      Effect.sync(() => {
        let results = Array.from(store.payups.values());
        
        if (filter?.appId) {
          results = results.filter((p) => p.appId === filter.appId);
        }
        if (filter?.status) {
          results = results.filter((p) => p.status === filter.status);
        }
        if (filter?.customerId) {
          results = results.filter((p) => p.customerId === filter.customerId);
        }
        
        // Sort by createdAt descending
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),

    // ==========================================================================
    // Transaction Operations
    // ==========================================================================

    createTransaction: (data: CreateTransactionInput) =>
      Effect.sync(() => {
        const now = new Date();
        const transaction: Transaction = {
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
        store.transactions.set(transaction.id, transaction);
        return transaction;
      }),

    getTransaction: (id: string) =>
      Effect.sync(() => store.transactions.get(id) ?? null),

    getTransactionByPayupId: (payupId: string) =>
      Effect.sync(() => {
        for (const tx of store.transactions.values()) {
          if (tx.payupId === payupId) return tx;
        }
        return null;
      }),

    getTransactionByExternalId: (appId: string, externalId: string) =>
      Effect.sync(() => {
        for (const tx of store.transactions.values()) {
          if (tx.appId === appId && tx.externalId === externalId) return tx;
        }
        return null;
      }),

    updateTransaction: (id: string, data: UpdateTransactionInput) =>
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

    listTransactions: (filter?: TransactionFilter) =>
      Effect.sync(() => {
        let results = Array.from(store.transactions.values());
        
        if (filter?.appId) {
          results = results.filter((t) => t.appId === filter.appId);
        }
        if (filter?.payupId) {
          results = results.filter((t) => t.payupId === filter.payupId);
        }
        if (filter?.status) {
          results = results.filter((t) => t.status === filter.status);
        }
        if (filter?.customerId) {
          results = results.filter((t) => t.customerId === filter.customerId);
        }
        
        // Sort by createdAt descending
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),

    // ==========================================================================
    // Webhook Template Operations
    // ==========================================================================

    listWebhookTemplates: (appId: string) =>
      Effect.sync(() => {
        return Array.from(store.webhookTemplates.values()).filter(
          (t) => t.appId === appId
        );
      }),

    getWebhookTemplate: (id: string) =>
      Effect.sync(() => store.webhookTemplates.get(id) ?? null),

    upsertWebhookTemplate: (data: UpsertWebhookTemplateInput) =>
      Effect.sync(() => {
        // Find existing by appId + name + eventType
        let existing: WebhookTemplate | undefined;
        for (const template of store.webhookTemplates.values()) {
          if (
            template.appId === data.appId &&
            template.name === data.name &&
            template.eventType === data.eventType
          ) {
            existing = template;
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

    deleteWebhookTemplate: (id: string) =>
      Effect.sync(() => {
        store.webhookTemplates.delete(id);
      }),

    // ==========================================================================
    // Webhook Log Operations
    // ==========================================================================

    createWebhookLog: (data: CreateWebhookLogInput) =>
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

    listWebhookLogs: (filter?: WebhookLogFilter) =>
      Effect.sync(() => {
        let results = Array.from(store.webhookLogs.values());
        
        if (filter?.appId) {
          results = results.filter((l) => l.appId === filter.appId);
        }
        if (filter?.transactionId) {
          results = results.filter((l) => l.transactionId === filter.transactionId);
        }
        if (filter?.eventType) {
          results = results.filter((l) => l.eventType === filter.eventType);
        }
        if (filter?.direction) {
          results = results.filter((l) => l.direction === filter.direction);
        }
        
        // Sort by processedAt descending
        results.sort((a, b) => b.processedAt.getTime() - a.processedAt.getTime());
        
        const offset = filter?.offset ?? 0;
        const limit = filter?.limit ?? 100;
        return results.slice(offset, offset + limit);
      }),
  };
};

// =============================================================================
// Layer Factory
// =============================================================================

export const MemoryDatabaseProviderLive = createDatabaseLayer(createMemoryDatabaseProvider());

export const createMemoryDatabaseLayer = () =>
  createDatabaseLayer(createMemoryDatabaseProvider());
