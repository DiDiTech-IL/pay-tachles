// =============================================================================
// Tachles Client - API Client for communicating with Tachles backend
// =============================================================================

export interface TachlesClientConfig {
  baseUrl: string;
  apiKey?: string;
  appId?: string;
  timeout?: number;
  onError?: (error: Error) => void;
  onRequest?: (request: RequestInit) => RequestInit;
  onResponse?: (response: Response) => void;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextCursor?: string;
  };
}

export interface PaymentFilters {
  status?: string | string[];
  customerEmail?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  from?: Date | string;
  to?: Date | string;
  appId?: string;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  expiresInMinutes?: number;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface UpdatePaymentParams {
  status?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface Payment {
  id: string;
  appId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";
  customerEmail: string | null;
  customerName: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  returnUrl: string | null;
  cancelUrl: string | null;
  expiresAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: "completed" | "failed" | "refunded" | "disputed";
  fees: number | null;
  netAmount: number | null;
  refundedAmount: number | null;
  metadata: Record<string, unknown> | null;
  providerData: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface App {
  id: string;
  name: string;
  provider: string;
  isActive: boolean;
  webhookUrl: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEvent {
  id: string;
  appId: string;
  paymentId: string;
  type: string;
  status: "pending" | "delivered" | "failed";
  payload: Record<string, unknown>;
  attempts: number;
  lastAttemptAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
}

export interface PaymentStats {
  totalCount: number;
  totalAmount: number;
  completedCount: number;
  completedAmount: number;
  failedCount: number;
  pendingCount: number;
  avgAmount: number;
  successRate: number;
}

export class TachlesClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "TachlesClientError";
  }
}

// =============================================================================
// Main Client Class
// =============================================================================

export class TachlesClient {
  private config: Required<TachlesClientConfig>;
  private abortControllers: Map<string, AbortController> = new Map();

  constructor(config: TachlesClientConfig) {
    this.config = {
      baseUrl: config.baseUrl.replace(/\/$/, ""),
      apiKey: config.apiKey || "",
      appId: config.appId || "",
      timeout: config.timeout || 30000,
      onError: config.onError || (() => {}),
      onRequest: config.onRequest || ((r) => r),
      onResponse: config.onResponse || (() => {}),
    };
  }

  // ---------------------------------------------------------------------------
  // Request helpers
  // ---------------------------------------------------------------------------

  private async request<T>(
    method: string,
    path: string,
    options: {
      body?: unknown;
      params?: Record<string, string | number | boolean | undefined>;
      signal?: AbortSignal;
      requestId?: string;
    } = {}
  ): Promise<T> {
    const { body, params, signal, requestId } = options;

    // Build URL with query params
    const url = new URL(path, this.config.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    // Setup abort controller
    const controller = new AbortController();
    if (requestId) {
      this.abortControllers.get(requestId)?.abort();
      this.abortControllers.set(requestId, controller);
    }

    // Build request
    let init: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(this.config.apiKey && { Authorization: `Bearer ${this.config.apiKey}` }),
        ...(this.config.appId && { "X-App-Id": this.config.appId }),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: signal || controller.signal,
    };

    // Allow request modification
    init = this.config.onRequest(init);

    // Setup timeout
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url.toString(), init);
      clearTimeout(timeoutId);

      // Callback
      this.config.onResponse(response);

      // Parse response
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");
      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const error = new TachlesClientError(
          data?.message || data?.error || `HTTP ${response.status}`,
          response.status,
          data?.code,
          data?.details
        );
        this.config.onError(error);
        throw error;
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof TachlesClientError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        const abortError = new TachlesClientError("Request aborted", 0, "ABORTED");
        this.config.onError(abortError);
        throw abortError;
      }

      const networkError = new TachlesClientError(
        error instanceof Error ? error.message : "Network error",
        0,
        "NETWORK_ERROR"
      );
      this.config.onError(networkError);
      throw networkError;
    } finally {
      if (requestId) {
        this.abortControllers.delete(requestId);
      }
    }
  }

  // Cancel a pending request
  cancelRequest(requestId: string): void {
    this.abortControllers.get(requestId)?.abort();
    this.abortControllers.delete(requestId);
  }

  // ---------------------------------------------------------------------------
  // Payment Operations
  // ---------------------------------------------------------------------------

  // Create a new payment
  async createPayment(data: CreatePaymentParams): Promise<Payment> {
    return this.request<Payment>("POST", "/api/payups", { body: data });
  }

  // Get a payment by ID
  async getPayment(id: string): Promise<Payment> {
    return this.request<Payment>("GET", `/api/payups/${id}`);
  }

  // Get payment with transaction
  async getPaymentWithTransaction(id: string): Promise<{ payment: Payment; transaction: Transaction | null }> {
    return this.request("GET", `/api/payups/${id}?include=transaction`);
  }

  // List payments with filters and pagination
  async listPayments(
    filters?: PaymentFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Payment>> {
    const params: Record<string, string | number | undefined> = {
      ...pagination,
      status: Array.isArray(filters?.status) ? filters.status.join(",") : filters?.status,
      customerEmail: filters?.customerEmail,
      minAmount: filters?.minAmount,
      maxAmount: filters?.maxAmount,
      currency: filters?.currency,
      from: filters?.from instanceof Date ? filters.from.toISOString() : filters?.from,
      to: filters?.to instanceof Date ? filters.to.toISOString() : filters?.to,
      appId: filters?.appId,
    };

    return this.request("GET", "/api/payups", { params });
  }

  // Update a payment
  async updatePayment(id: string, data: UpdatePaymentParams): Promise<Payment> {
    return this.request<Payment>("PATCH", `/api/payups/${id}`, { body: data });
  }

  // Cancel a payment
  async cancelPayment(id: string, reason?: string): Promise<Payment> {
    return this.request<Payment>("POST", `/api/payups/${id}/cancel`, {
      body: { reason },
    });
  }

  // Complete a payment (for testing/manual completion)
  async completePayment(
    id: string,
    data?: { externalId?: string; fees?: number }
  ): Promise<{ payment: Payment; transaction: Transaction }> {
    return this.request("POST", `/api/payups/${id}/complete`, { body: data });
  }

  // Refund a payment
  async refundPayment(
    id: string,
    data?: { amount?: number; reason?: string }
  ): Promise<Transaction> {
    return this.request<Transaction>("POST", `/api/payups/${id}/refund`, { body: data });
  }

  // ---------------------------------------------------------------------------
  // Transaction Operations
  // ---------------------------------------------------------------------------

  // Get transaction by ID
  async getTransaction(id: string): Promise<Transaction> {
    return this.request<Transaction>("GET", `/api/transactions/${id}`);
  }

  // List transactions
  async listTransactions(
    filters?: {
      paymentId?: string;
      status?: string;
      from?: Date | string;
      to?: Date | string;
    },
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Transaction>> {
    const params: Record<string, string | number | undefined> = {
      ...pagination,
      payupId: filters?.paymentId,
      status: filters?.status,
      from: filters?.from instanceof Date ? filters.from.toISOString() : filters?.from,
      to: filters?.to instanceof Date ? filters.to.toISOString() : filters?.to,
    };

    return this.request("GET", "/api/transactions", { params });
  }

  // ---------------------------------------------------------------------------
  // App Operations
  // ---------------------------------------------------------------------------

  // Get current app info
  async getApp(): Promise<App> {
    return this.request<App>("GET", "/api/apps/me");
  }

  // List all apps (admin)
  async listApps(): Promise<App[]> {
    return this.request<App[]>("GET", "/api/apps");
  }

  // Update app settings
  async updateApp(data: Partial<Pick<App, "name" | "webhookUrl" | "metadata">>): Promise<App> {
    return this.request<App>("PATCH", "/api/apps/me", { body: data });
  }

  // ---------------------------------------------------------------------------
  // Statistics
  // ---------------------------------------------------------------------------

  // Get payment statistics
  async getStats(params?: {
    from?: Date | string;
    to?: Date | string;
    groupBy?: "hour" | "day" | "week" | "month";
  }): Promise<PaymentStats> {
    return this.request<PaymentStats>("GET", "/api/stats", {
      params: {
        from: params?.from instanceof Date ? params.from.toISOString() : params?.from,
        to: params?.to instanceof Date ? params.to.toISOString() : params?.to,
        groupBy: params?.groupBy,
      },
    });
  }

  // Get revenue over time
  async getRevenueTimeSeries(params?: {
    from?: Date | string;
    to?: Date | string;
    groupBy?: "hour" | "day" | "week" | "month";
  }): Promise<Array<{ period: string; revenue: number; count: number }>> {
    return this.request("GET", "/api/stats/revenue", {
      params: {
        from: params?.from instanceof Date ? params.from.toISOString() : params?.from,
        to: params?.to instanceof Date ? params.to.toISOString() : params?.to,
        groupBy: params?.groupBy,
      },
    });
  }

  // ---------------------------------------------------------------------------
  // Webhook Events
  // ---------------------------------------------------------------------------

  // List webhook events
  async listWebhookEvents(
    filters?: {
      paymentId?: string;
      type?: string;
      status?: string;
    },
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<WebhookEvent>> {
    return this.request("GET", "/api/webhooks/events", {
      params: {
        ...pagination,
        payupId: filters?.paymentId,
        type: filters?.type,
        status: filters?.status,
      },
    });
  }

  // Retry a webhook event
  async retryWebhook(eventId: string): Promise<WebhookEvent> {
    return this.request<WebhookEvent>("POST", `/api/webhooks/events/${eventId}/retry`);
  }

  // ---------------------------------------------------------------------------
  // Real-time / SSE
  // ---------------------------------------------------------------------------

  // Subscribe to real-time events
  subscribeToEvents(
    callbacks: {
      onPaymentCreated?: (payment: Payment) => void;
      onPaymentUpdated?: (payment: Payment) => void;
      onWebhook?: (event: WebhookEvent) => void;
      onError?: (error: Error) => void;
      onConnect?: () => void;
      onDisconnect?: () => void;
    }
  ): () => void {
    const url = new URL("/api/events", this.config.baseUrl);
    if (this.config.appId) {
      url.searchParams.set("appId", this.config.appId);
    }

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => {
      callbacks.onConnect?.();
    };

    eventSource.onerror = () => {
      callbacks.onDisconnect?.();
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { type: string; payload: unknown };

        switch (data.type) {
          case "payment.created":
            callbacks.onPaymentCreated?.(data.payload as Payment);
            break;
          case "payment.updated":
            callbacks.onPaymentUpdated?.(data.payload as Payment);
            break;
          case "webhook":
            callbacks.onWebhook?.(data.payload as WebhookEvent);
            break;
        }
      } catch (error) {
        callbacks.onError?.(error instanceof Error ? error : new Error("Parse error"));
      }
    };

    // Return unsubscribe function
    return () => {
      eventSource.close();
    };
  }
}

// =============================================================================
// Factory function
// =============================================================================

export function createTachlesClient(config: TachlesClientConfig): TachlesClient {
  return new TachlesClient(config);
}

// =============================================================================
// Singleton instance
// =============================================================================

let defaultClient: TachlesClient | null = null;

export function initTachlesClient(config: TachlesClientConfig): TachlesClient {
  defaultClient = new TachlesClient(config);
  return defaultClient;
}

export function getTachlesClient(): TachlesClient {
  if (!defaultClient) {
    throw new Error(
      "Tachles client not initialized. Call initTachlesClient() first."
    );
  }
  return defaultClient;
}
