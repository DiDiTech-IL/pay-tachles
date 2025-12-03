"use server";

import { Effect, Layer } from "effect";
import { DbService, DbServiceLive, CryptoService, CryptoLive } from "@/services";
import { Prisma } from "@/lib/generated/prisma";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = Layer.mergeAll(DbServiceLive, CryptoLive);

// =============================================================================
// Types
// =============================================================================

export interface App {
  id: string;
  name: string;
  provider: string;
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  isActive: boolean;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt?: string;
}

export interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: "completed" | "failed" | "refunded" | "disputed";
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  metadata: Record<string, unknown>;
  failureReason: string | null;
  fees: number | null;
  netAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppInput {
  name: string;
  provider: string;
  webhookUrl: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAppInput {
  name?: string;
  webhookUrl?: string;
  isActive?: boolean;
  metadata?: Record<string, unknown>;
}

export interface TransactionFilter {
  appId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// Action Result Types
// =============================================================================

type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// =============================================================================
// App Actions
// =============================================================================

export async function listApps(): Promise<ActionResult<App[]>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.listApps();
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to list apps" };
  }

  return {
    success: true,
    data: result.right.map((app) => ({
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    })),
  };
}

export async function getApp(id: string): Promise<ActionResult<App>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.getAppById(id);
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to get app" };
  }

  const app = result.right;
  if (!app) {
    return { success: false, error: "App not found" };
  }

  return {
    success: true,
    data: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  };
}

export async function createApp(input: CreateAppInput): Promise<ActionResult<App>> {
  if (!input.name || !input.provider || !input.webhookUrl) {
    return { success: false, error: "name, provider, and webhookUrl are required" };
  }

  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    const apiKey = yield* crypto.generateUUID();
    const webhookSecret = yield* crypto.generateUUID();

    return yield* db.createApp({
      name: input.name,
      provider: input.provider,
      api_key: `pk_${apiKey.replace(/-/g, "")}`,
      webhook_secret: `whsec_${webhookSecret.replace(/-/g, "")}`,
      webhook_url: input.webhookUrl,
      metadata: input.metadata as Prisma.InputJsonValue,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to create app" };
  }

  const app = result.right;
  return {
    success: true,
    data: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  };
}

export async function updateApp(id: string, input: UpdateAppInput): Promise<ActionResult<App>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.updateApp(id, {
      name: input.name,
      webhook_url: input.webhookUrl,
      is_active: input.isActive,
      metadata: input.metadata as Prisma.InputJsonValue,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to update app" };
  }

  const app = result.right;
  return {
    success: true,
    data: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  };
}

export async function deleteApp(id: string): Promise<ActionResult<void>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    yield* db.deleteApp(id);
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to delete app" };
  }

  return { success: true, data: undefined };
}

export async function regenerateApiKey(id: string): Promise<ActionResult<App>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    // Verify app exists
    const existingApp = yield* db.getAppById(id);
    if (!existingApp) {
      return null;
    }

    // Generate new API key
    const newKey = yield* crypto.generateUUID();
    const apiKey = `pk_${newKey.replace(/-/g, "")}`;

    // Update the app with new API key
    const updatedApp = yield* Effect.tryPromise({
      try: () =>
        db.client.app.update({
          where: { id },
          data: { api_key: apiKey },
        }),
      catch: (error) => new Error(`Failed to update: ${error}`),
    });

    return updatedApp;
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to regenerate API key" };
  }

  if (!result.right) {
    return { success: false, error: "App not found" };
  }

  const app = result.right;
  return {
    success: true,
    data: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  };
}

export async function regenerateWebhookSecret(id: string): Promise<ActionResult<App>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    const crypto = yield* CryptoService;

    // Verify app exists
    const existingApp = yield* db.getAppById(id);
    if (!existingApp) {
      return null;
    }

    // Generate new webhook secret
    const newSecret = yield* crypto.generateUUID();
    const webhookSecret = `whsec_${newSecret.replace(/-/g, "")}`;

    // Update the app with new webhook secret
    const updatedApp = yield* Effect.tryPromise({
      try: () =>
        db.client.app.update({
          where: { id },
          data: { webhook_secret: webhookSecret },
        }),
      catch: (error) => new Error(`Failed to update: ${error}`),
    });

    return updatedApp;
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to regenerate webhook secret" };
  }

  if (!result.right) {
    return { success: false, error: "App not found" };
  }

  const app = result.right;
  return {
    success: true,
    data: {
      id: app.id,
      name: app.name,
      provider: app.provider,
      apiKey: app.api_key,
      webhookSecret: app.webhook_secret,
      webhookUrl: app.webhook_url,
      isActive: app.is_active,
      metadata: app.metadata as Record<string, unknown> | null,
      createdAt: app.created_at.toISOString(),
      updatedAt: app.updated_at.toISOString(),
    },
  };
}

// =============================================================================
// Transaction Actions
// =============================================================================

export async function listTransactions(filter?: TransactionFilter): Promise<ActionResult<Transaction[]>> {
  const program = Effect.gen(function* () {
    const db = yield* DbService;
    return yield* db.listTransactions({
      app_id: filter?.appId,
      status: filter?.status,
      limit: filter?.limit ?? 50,
      offset: filter?.offset ?? 0,
    });
  });

  const result = await Effect.runPromise(
    program.pipe(Effect.provide(RuntimeLayer), Effect.either)
  );

  if (result._tag === "Left") {
    return { success: false, error: "Failed to list transactions" };
  }

  return {
    success: true,
    data: result.right.map((txn) => ({
      id: txn.id,
      appId: txn.app_id,
      payupId: txn.payup_id,
      externalId: txn.external_id,
      amount: txn.amount,
      currency: txn.currency,
      status: txn.status as Transaction["status"],
      customerEmail: txn.customer_email,
      customerName: txn.customer_name,
      customerId: txn.customer_id,
      description: txn.description,
      metadata: (txn.metadata ?? {}) as Record<string, unknown>,
      failureReason: txn.failure_reason,
      fees: txn.fees,
      netAmount: txn.net_amount,
      createdAt: txn.created_at.toISOString(),
      updatedAt: txn.updated_at.toISOString(),
    })),
  };
}
