// API client utilities for the dashboard
// Re-exports server actions for use in client components

import {
  listApps as listAppsAction,
  getApp as getAppAction,
  createApp as createAppAction,
  updateApp as updateAppAction,
  deleteApp as deleteAppAction,
  regenerateApiKey as regenerateApiKeyAction,
  regenerateWebhookSecret as regenerateWebhookSecretAction,
  listTransactions as listTransactionsAction,
  type Transaction,
} from "./actions";

// Re-export types from actions
export type {
  App,
  Transaction,
  CreateAppInput,
  UpdateAppInput,
  TransactionFilter,
} from "./actions";

// Stats helper (client-side utility - not a server action)
export function calculateStats(transactions: Transaction[]): {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  completedCount: number;
  failedCount: number;
} {
  const completed = transactions.filter((t) => t.status === "completed");
  const failed = transactions.filter((t) => t.status === "failed");
  const totalRevenue = completed.reduce((sum, t) => sum + t.amount, 0);
  const successRate = transactions.length > 0
    ? (completed.length / transactions.length) * 100
    : 0;

  return {
    totalRevenue,
    totalTransactions: transactions.length,
    successRate,
    completedCount: completed.length,
    failedCount: failed.length,
  };
}

// Payup types (kept for external API usage)
export interface Payup {
  id: string;
  appId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  returnUrl: string | null;
  cancelUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
}

export interface CreatePayupInput {
  amount: number;
  currency: string;
  description?: string;
  customerId?: string;
  customerEmail?: string;
  customerName?: string;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, unknown>;
}

// Error handling for action results
class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

function unwrapResult<T>(result: { success: true; data: T } | { success: false; error: string }): T {
  if (!result.success) {
    throw new ActionError(result.error);
  }
  return result.data;
}

// Apps API - wrapper around server actions
export const appsApi = {
  async list() {
    return unwrapResult(await listAppsAction());
  },

  async get(id: string) {
    return unwrapResult(await getAppAction(id));
  },

  async create(input: { name: string; provider: string; webhookUrl: string; metadata?: Record<string, unknown> }) {
    return unwrapResult(await createAppAction(input));
  },

  async update(id: string, input: { name?: string; webhookUrl?: string; isActive?: boolean; metadata?: Record<string, unknown> }) {
    return unwrapResult(await updateAppAction(id, input));
  },

  async delete(id: string) {
    unwrapResult(await deleteAppAction(id));
  },

  async regenerateApiKey(id: string) {
    return unwrapResult(await regenerateApiKeyAction(id));
  },

  async regenerateWebhookSecret(id: string) {
    return unwrapResult(await regenerateWebhookSecretAction(id));
  },
};

// Transactions API - wrapper around server actions
export const transactionsApi = {
  async list(params?: { appId?: string; status?: string; limit?: number; offset?: number }) {
    return unwrapResult(await listTransactionsAction(params));
  },
};

// Payups API - these still use fetch because they require external API authentication
const API_BASE = "/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" })) as { message?: string; error?: string };
    throw new ActionError(error.message || error.error || "Unknown error");
  }
  return response.json();
}

export const payupsApi = {
  async create(apiKey: string, input: CreatePayupInput): Promise<{ payupId: string; paymentUrl: string; expiresAt: string }> {
    const res = await fetch(`${API_BASE}/payups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(input),
    });
    return handleResponse(res);
  },

  async get(id: string): Promise<Payup> {
    const res = await fetch(`${API_BASE}/sessions/${id}`);
    const data = await handleResponse<{ session: Payup }>(res);
    return data.session;
  },

  async finalize(id: string): Promise<{ success: boolean; transaction: { id: string } }> {
    const res = await fetch(`${API_BASE}/sessions/${id}/finalize`, {
      method: "POST",
    });
    return handleResponse(res);
  },
};
