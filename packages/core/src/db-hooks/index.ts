// =============================================================================
// Tachles Database Hooks - React 19 hooks for database integration
// =============================================================================

"use client";

import {
    use,
    useCallback,
    useEffect,
    useOptimistic,
    useRef,
    useState,
    useSyncExternalStore,
    useTransition
} from "react";

// =============================================================================
// Types
// =============================================================================

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

export interface DatabaseConfig {
  baseUrl: string;
  apiKey?: string;
  appId?: string;
  enableCache?: boolean;
  cacheTime?: number;
  staleTime?: number;
  onError?: (error: Error) => void;
}

export interface QueryOptions<T> {
  enabled?: boolean;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  initialData?: T;
  select?: (data: T) => T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void;
  optimisticUpdate?: (variables: TVariables) => TData;
}

export interface QueryResult<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  refetch: () => Promise<void>;
}

export interface MutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  error: Error | null;
  isLoading: boolean;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  reset: () => void;
}

// =============================================================================
// Cache Store - Using useSyncExternalStore pattern
// =============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleAt: number;
}

type CacheListener = () => void;

class QueryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private listeners = new Set<CacheListener>();
  private defaultCacheTime = 5 * 60 * 1000; // 5 minutes
  private defaultStaleTime = 30 * 1000; // 30 seconds

  subscribe(listener: CacheListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.timestamp + this.defaultCacheTime) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, options?: { cacheTime?: number; staleTime?: number }): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      staleAt: now + (options?.staleTime ?? this.defaultStaleTime),
    });
    this.notify();
  }

  invalidate(keyOrPattern: string | RegExp): void {
    if (typeof keyOrPattern === "string") {
      this.cache.delete(keyOrPattern);
    } else {
      for (const key of this.cache.keys()) {
        if (keyOrPattern.test(key)) {
          this.cache.delete(key);
        }
      }
    }
    this.notify();
  }

  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;
    return Date.now() > entry.staleAt;
  }

  clear(): void {
    this.cache.clear();
    this.notify();
  }

  getSnapshot(): Map<string, unknown> {
    const snapshot = new Map<string, unknown>();
    this.cache.forEach((entry, key) => {
      if (Date.now() <= entry.timestamp + this.defaultCacheTime) {
        snapshot.set(key, entry.data);
      }
    });
    return snapshot;
  }
}

const globalCache = new QueryCache();

// =============================================================================
// Database Context
// =============================================================================

let globalConfig: DatabaseConfig | null = null;

export function initDatabase(config: DatabaseConfig): void {
  globalConfig = config;
}

export function getConfig(): DatabaseConfig {
  if (!globalConfig) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return globalConfig;
}

// =============================================================================
// Core Query Hook - React 19 patterns
// =============================================================================

export function useQuery<T>(
  key: string | string[],
  fetcher: () => Promise<T>,
  options: QueryOptions<T> = {}
): QueryResult<T> {
  const {
    enabled = true,
    refetchInterval,
    refetchOnWindowFocus = true,
    initialData,
    select,
    onSuccess,
    onError,
  } = options;

  const cacheKey = Array.isArray(key) ? key.join(":") : key;
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const mountedRef = useRef(true);

  // Use useSyncExternalStore for cache subscription (React 18+ pattern)
  const cachedData = useSyncExternalStore(
    globalCache.subscribe.bind(globalCache),
    () => globalCache.get<T>(cacheKey),
    () => initialData
  );

  const fetchData = useCallback(async () => {
    if (!enabled || !mountedRef.current) return;

    setIsFetching(true);
    setError(null);

    try {
      const result = await fetcher();
      if (!mountedRef.current) return;

      const finalData = select ? select(result) : result;
      globalCache.set(cacheKey, finalData);
      onSuccess?.(finalData);
    } catch (err) {
      if (!mountedRef.current) return;
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      onError?.(error);
      globalConfig?.onError?.(error);
    } finally {
      if (mountedRef.current) {
        setIsFetching(false);
      }
    }
  }, [cacheKey, enabled, fetcher, select, onSuccess, onError]);

  // Initial fetch with useTransition
  useEffect(() => {
    mountedRef.current = true;

    if (enabled && (cachedData === undefined || globalCache.isStale(cacheKey))) {
      startTransition(() => {
        void fetchData();
      });
    }

    return () => {
      mountedRef.current = false;
    };
  }, [enabled, fetchData, cachedData, cacheKey]);

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(() => {
      void fetchData();
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [refetchInterval, enabled, fetchData]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus || !enabled) return;

    const handleFocus = () => {
      if (globalCache.isStale(cacheKey)) {
        void fetchData();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetchOnWindowFocus, enabled, cacheKey, fetchData]);

  const data = cachedData ?? initialData;

  return {
    data,
    error,
    isLoading: isPending && !data,
    isError: !!error,
    isSuccess: !!data && !error,
    isFetching,
    refetch: fetchData,
  };
}

// =============================================================================
// Mutation Hook - React 19 patterns
// =============================================================================

export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TVariables> = {}
): MutationResult<TData, TVariables> {
  const { onSuccess, onError, onSettled } = options;

  const [state, setState] = useState<{
    data: TData | undefined;
    error: Error | null;
    isPending: boolean;
  }>({
    data: undefined,
    error: null,
    isPending: false,
  });

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setState((s) => ({ ...s, isPending: true, error: null }));

      try {
        const data = await mutationFn(variables);
        setState({ data, error: null, isPending: false });
        onSuccess?.(data, variables);
        onSettled?.(data, null, variables);
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState((s) => ({ ...s, error, isPending: false }));
        onError?.(error, variables);
        onSettled?.(undefined, error, variables);
        globalConfig?.onError?.(error);
        throw error;
      }
    },
    [mutationFn, onSuccess, onError, onSettled]
  );

  const mutate = useCallback(
    (variables: TVariables) => {
      void mutateAsync(variables);
    },
    [mutateAsync]
  ) as (variables: TVariables) => Promise<TData>;

  const reset = useCallback(() => {
    setState({ data: undefined, error: null, isPending: false });
  }, []);

  return {
    mutate,
    mutateAsync,
    data: state.data,
    error: state.error,
    isLoading: state.isPending,
    isPending: state.isPending,
    isError: !!state.error,
    isSuccess: !!state.data && !state.error,
    reset,
  };
}

// =============================================================================
// Payment Database Hooks
// =============================================================================

export interface PaymentQueryParams {
  status?: string | string[];
  customerEmail?: string;
  minAmount?: number;
  maxAmount?: number;
  from?: Date;
  to?: Date;
  limit?: number;
  cursor?: string;
}

export function usePayments(params?: PaymentQueryParams, options?: QueryOptions<Payment[]>) {
  const config = getConfig();
  const queryKey = ["payments", JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/payups", config.baseUrl);
      if (params?.status) {
        const statuses = Array.isArray(params.status) ? params.status.join(",") : params.status;
        url.searchParams.set("status", statuses);
      }
      if (params?.customerEmail) url.searchParams.set("customerEmail", params.customerEmail);
      if (params?.minAmount) url.searchParams.set("minAmount", String(params.minAmount));
      if (params?.maxAmount) url.searchParams.set("maxAmount", String(params.maxAmount));
      if (params?.from) url.searchParams.set("from", params.from.toISOString());
      if (params?.to) url.searchParams.set("to", params.to.toISOString());
      if (params?.limit) url.searchParams.set("limit", String(params.limit));
      if (params?.cursor) url.searchParams.set("cursor", params.cursor);

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch payments: ${response.status}`);
      }

      const data = await response.json();
      return data.data as Payment[];
    },
    options
  );
}

export function usePayment(id: string | null, options?: QueryOptions<Payment>) {
  const config = getConfig();

  return useQuery(
    ["payment", id ?? ""],
    async () => {
      if (!id) throw new Error("Payment ID is required");

      const response = await fetch(`${config.baseUrl}/api/payups/${id}`, {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch payment: ${response.status}`);
      }

      return response.json() as Promise<Payment>;
    },
    { ...options, enabled: !!id && (options?.enabled ?? true) }
  );
}

// =============================================================================
// Payment Mutations
// =============================================================================

export interface CreatePaymentInput {
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  expiresInMinutes?: number;
}

export function useCreatePaymentMutation(options?: MutationOptions<Payment, CreatePaymentInput>) {
  const config = getConfig();

  return useMutation(
    async (input: CreatePaymentInput) => {
      const response = await fetch(`${config.baseUrl}/api/payups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Failed to create payment: ${response.status}`);
      }

      const payment = (await response.json()) as Payment;
      globalCache.invalidate(/^payments/);
      return payment;
    },
    options
  );
}

export interface UpdatePaymentInput {
  id: string;
  status?: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export function useUpdatePaymentMutation(options?: MutationOptions<Payment, UpdatePaymentInput>) {
  const config = getConfig();

  return useMutation(
    async (input: UpdatePaymentInput) => {
      const { id, ...data } = input;

      const response = await fetch(`${config.baseUrl}/api/payups/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update payment: ${response.status}`);
      }

      const payment = (await response.json()) as Payment;
      globalCache.set(["payment", id].join(":"), payment);
      globalCache.invalidate(/^payments/);
      return payment;
    },
    options
  );
}

export function useCancelPaymentMutation(
  options?: MutationOptions<Payment, { id: string; reason?: string }>
) {
  const config = getConfig();

  return useMutation(
    async ({ id, reason }) => {
      const response = await fetch(`${config.baseUrl}/api/payups/${id}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel payment: ${response.status}`);
      }

      const payment = (await response.json()) as Payment;
      globalCache.set(["payment", id].join(":"), payment);
      globalCache.invalidate(/^payments/);
      return payment;
    },
    options
  );
}

export function useCompletePaymentMutation(
  options?: MutationOptions<Payment, { id: string; externalId?: string; fees?: number }>
) {
  const config = getConfig();

  return useMutation(
    async ({ id, ...data }) => {
      const response = await fetch(`${config.baseUrl}/api/payups/${id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to complete payment: ${response.status}`);
      }

      const result = await response.json();
      const payment = result.payment as Payment;
      globalCache.set(["payment", id].join(":"), payment);
      globalCache.invalidate(/^payments/);
      globalCache.invalidate(/^transactions/);
      return payment;
    },
    options
  );
}

export function useRefundPaymentMutation(
  options?: MutationOptions<Transaction, { id: string; amount?: number; reason?: string }>
) {
  const config = getConfig();

  return useMutation(
    async ({ id, ...data }) => {
      const response = await fetch(`${config.baseUrl}/api/payups/${id}/refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to refund payment: ${response.status}`);
      }

      const transaction = (await response.json()) as Transaction;
      globalCache.invalidate(/^payment/);
      globalCache.invalidate(/^transactions/);
      return transaction;
    },
    options
  );
}

// =============================================================================
// Transaction Hooks
// =============================================================================

export interface TransactionQueryParams {
  paymentId?: string;
  status?: string;
  from?: Date;
  to?: Date;
  limit?: number;
}

export function useTransactions(params?: TransactionQueryParams, options?: QueryOptions<Transaction[]>) {
  const config = getConfig();
  const queryKey = ["transactions", JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/transactions", config.baseUrl);
      if (params?.paymentId) url.searchParams.set("payupId", params.paymentId);
      if (params?.status) url.searchParams.set("status", params.status);
      if (params?.from) url.searchParams.set("from", params.from.toISOString());
      if (params?.to) url.searchParams.set("to", params.to.toISOString());
      if (params?.limit) url.searchParams.set("limit", String(params.limit));

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status}`);
      }

      const data = await response.json();
      return data.data as Transaction[];
    },
    options
  );
}

export function useTransaction(id: string | null, options?: QueryOptions<Transaction>) {
  const config = getConfig();

  return useQuery(
    ["transaction", id ?? ""],
    async () => {
      if (!id) throw new Error("Transaction ID is required");

      const response = await fetch(`${config.baseUrl}/api/transactions/${id}`, {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transaction: ${response.status}`);
      }

      return response.json() as Promise<Transaction>;
    },
    { ...options, enabled: !!id && (options?.enabled ?? true) }
  );
}

// =============================================================================
// Stats Hooks
// =============================================================================

export interface StatsQueryParams {
  from?: Date;
  to?: Date;
  groupBy?: "hour" | "day" | "week" | "month";
}

export function usePaymentStats(params?: StatsQueryParams, options?: QueryOptions<PaymentStats>) {
  const config = getConfig();
  const queryKey = ["stats", JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/stats", config.baseUrl);
      if (params?.from) url.searchParams.set("from", params.from.toISOString());
      if (params?.to) url.searchParams.set("to", params.to.toISOString());
      if (params?.groupBy) url.searchParams.set("groupBy", params.groupBy);

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }

      return response.json() as Promise<PaymentStats>;
    },
    options
  );
}

export interface RevenueDataPoint {
  period: string;
  revenue: number;
  count: number;
}

export function useRevenueTimeSeries(params?: StatsQueryParams, options?: QueryOptions<RevenueDataPoint[]>) {
  const config = getConfig();
  const queryKey = ["revenue", JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/stats/revenue", config.baseUrl);
      if (params?.from) url.searchParams.set("from", params.from.toISOString());
      if (params?.to) url.searchParams.set("to", params.to.toISOString());
      if (params?.groupBy) url.searchParams.set("groupBy", params.groupBy);

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch revenue data: ${response.status}`);
      }

      return response.json() as Promise<RevenueDataPoint[]>;
    },
    options
  );
}

// =============================================================================
// App/Config Hooks
// =============================================================================

export function useApp(options?: QueryOptions<App>) {
  const config = getConfig();

  return useQuery(
    ["app"],
    async () => {
      const response = await fetch(`${config.baseUrl}/api/apps/me`, {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch app: ${response.status}`);
      }

      return response.json() as Promise<App>;
    },
    options
  );
}

export function useUpdateAppMutation(
  options?: MutationOptions<App, Partial<Pick<App, "name" | "webhookUrl" | "metadata">>>
) {
  const config = getConfig();

  return useMutation(
    async (data) => {
      const response = await fetch(`${config.baseUrl}/api/apps/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update app: ${response.status}`);
      }

      const app = (await response.json()) as App;
      globalCache.set("app", app);
      return app;
    },
    options
  );
}

// =============================================================================
// Webhook Event Hooks
// =============================================================================

export interface WebhookQueryParams {
  paymentId?: string;
  type?: string;
  status?: string;
  limit?: number;
}

export function useWebhookEvents(params?: WebhookQueryParams, options?: QueryOptions<WebhookEvent[]>) {
  const config = getConfig();
  const queryKey = ["webhooks", JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/webhooks/events", config.baseUrl);
      if (params?.paymentId) url.searchParams.set("payupId", params.paymentId);
      if (params?.type) url.searchParams.set("type", params.type);
      if (params?.status) url.searchParams.set("status", params.status);
      if (params?.limit) url.searchParams.set("limit", String(params.limit));

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch webhook events: ${response.status}`);
      }

      const data = await response.json();
      return data.data as WebhookEvent[];
    },
    options
  );
}

export function useRetryWebhookMutation(options?: MutationOptions<WebhookEvent, { eventId: string }>) {
  const config = getConfig();

  return useMutation(
    async ({ eventId }) => {
      const response = await fetch(`${config.baseUrl}/api/webhooks/events/${eventId}/retry`, {
        method: "POST",
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to retry webhook: ${response.status}`);
      }

      const event = (await response.json()) as WebhookEvent;
      globalCache.invalidate(/^webhooks/);
      return event;
    },
    options
  );
}

// =============================================================================
// Cache Management Hooks
// =============================================================================

export function useInvalidateCache() {
  return useCallback((pattern: string | RegExp) => {
    globalCache.invalidate(pattern);
  }, []);
}

export function useClearCache() {
  return useCallback(() => {
    globalCache.clear();
  }, []);
}

export function usePrefetch() {
  return useCallback(async (key: string, fetcher: () => Promise<unknown>) => {
    if (globalCache.get(key) !== undefined && !globalCache.isStale(key)) {
      return; // Already cached and fresh
    }

    try {
      const data = await fetcher();
      globalCache.set(key, data);
    } catch {
      // Silently fail prefetch
    }
  }, []);
}

// =============================================================================
// Optimistic Update Hooks using React 19 useOptimistic
// =============================================================================

export function useOptimisticPayments(
  initialPayments: Payment[],
  onUpdate?: (payments: Payment[]) => void
) {
  const [optimisticPayments, setOptimisticPayments] = useOptimistic(
    initialPayments,
    (state: Payment[], action: { type: string; payment: Payment }) => {
      switch (action.type) {
        case "add":
          return [action.payment, ...state];
        case "update":
          return state.map((p) => (p.id === action.payment.id ? action.payment : p));
        case "remove":
          return state.filter((p) => p.id !== action.payment.id);
        default:
          return state;
      }
    }
  );

  useEffect(() => {
    onUpdate?.(optimisticPayments);
  }, [optimisticPayments, onUpdate]);

  return {
    payments: optimisticPayments,
    addPayment: (payment: Payment) => setOptimisticPayments({ type: "add", payment }),
    updatePayment: (payment: Payment) => setOptimisticPayments({ type: "update", payment }),
    removePayment: (payment: Payment) => setOptimisticPayments({ type: "remove", payment }),
  };
}

// =============================================================================
// Real-time Subscription Hook
// =============================================================================

export function useRealtimeSubscription(options?: {
  onPaymentCreated?: (payment: Payment) => void;
  onPaymentUpdated?: (payment: Payment) => void;
  onWebhook?: (event: WebhookEvent) => void;
  enabled?: boolean;
}) {
  const config = getConfig();
  const { enabled = true, onPaymentCreated, onPaymentUpdated, onWebhook } = options ?? {};
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const url = new URL("/api/events", config.baseUrl);
    if (config.appId) {
      url.searchParams.set("appId", config.appId);
    }

    const eventSource = new EventSource(url.toString());

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { type: string; payload: unknown };

        switch (data.type) {
          case "payment.created":
            onPaymentCreated?.(data.payload as Payment);
            globalCache.invalidate(/^payments/);
            break;
          case "payment.updated":
            const payment = data.payload as Payment;
            onPaymentUpdated?.(payment);
            globalCache.set(["payment", payment.id].join(":"), payment);
            globalCache.invalidate(/^payments/);
            break;
          case "webhook":
            onWebhook?.(data.payload as WebhookEvent);
            globalCache.invalidate(/^webhooks/);
            break;
        }
      } catch {
        // Ignore parse errors
      }
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [enabled, config, onPaymentCreated, onPaymentUpdated, onWebhook]);

  return { isConnected };
}

// =============================================================================
// Promise-based Hooks using React 19 use()
// =============================================================================

export function createPaymentResource(id: string, config: DatabaseConfig): Promise<Payment> {
  return fetch(`${config.baseUrl}/api/payups/${id}`, {
    headers: {
      ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      ...(config.appId && { "X-App-Id": config.appId }),
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch payment: ${res.status}`);
    return res.json() as Promise<Payment>;
  });
}

export function createPaymentsResource(
  params: PaymentQueryParams | undefined,
  config: DatabaseConfig
): Promise<Payment[]> {
  const url = new URL("/api/payups", config.baseUrl);
  if (params?.status) {
    const statuses = Array.isArray(params.status) ? params.status.join(",") : params.status;
    url.searchParams.set("status", statuses);
  }
  if (params?.limit) url.searchParams.set("limit", String(params.limit));

  return fetch(url.toString(), {
    headers: {
      ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      ...(config.appId && { "X-App-Id": config.appId }),
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Failed to fetch payments: ${res.status}`);
    return res.json().then((d) => d.data as Payment[]);
  });
}

// Use with React 19's use() in a Suspense boundary
export function usePaymentSuspense(paymentPromise: Promise<Payment>): Payment {
  return use(paymentPromise);
}

export function usePaymentsSuspense(paymentsPromise: Promise<Payment[]>): Payment[] {
  return use(paymentsPromise);
}

// =============================================================================
// Batch Operations
// =============================================================================

export function useBatchPaymentUpdate(
  options?: MutationOptions<Payment[], Array<{ id: string; status: string }>>
) {
  const config = getConfig();

  return useMutation(
    async (updates) => {
      const results = await Promise.all(
        updates.map(async ({ id, status }) => {
          const response = await fetch(`${config.baseUrl}/api/payups/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
              ...(config.appId && { "X-App-Id": config.appId }),
            },
            body: JSON.stringify({ status }),
          });

          if (!response.ok) {
            throw new Error(`Failed to update payment ${id}: ${response.status}`);
          }

          return response.json() as Promise<Payment>;
        })
      );

      // Invalidate caches
      globalCache.invalidate(/^payments/);
      results.forEach((payment) => {
        globalCache.set(["payment", payment.id].join(":"), payment);
      });

      return results;
    },
    options
  );
}

// =============================================================================
// Aggregation Hooks
// =============================================================================

export function usePaymentAggregation(
  groupBy: "status" | "currency" | "day" | "week" | "month",
  params?: { from?: Date; to?: Date },
  options?: QueryOptions<Array<{ group: string; count: number; amount: number }>>
) {
  const config = getConfig();
  const queryKey = ["aggregation", groupBy, JSON.stringify(params)];

  return useQuery(
    queryKey,
    async () => {
      const url = new URL("/api/stats/aggregate", config.baseUrl);
      url.searchParams.set("groupBy", groupBy);
      if (params?.from) url.searchParams.set("from", params.from.toISOString());
      if (params?.to) url.searchParams.set("to", params.to.toISOString());

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch aggregation: ${response.status}`);
      }

      return response.json() as Promise<Array<{ group: string; count: number; amount: number }>>;
    },
    options
  );
}

// =============================================================================
// Search Hook
// =============================================================================

export function usePaymentSearch(
  query: string,
  options?: QueryOptions<Payment[]> & { debounceMs?: number }
) {
  const config = getConfig();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const debounceMs = options?.debounceMs ?? 300;

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  return useQuery(
    ["search", debouncedQuery],
    async () => {
      if (!debouncedQuery.trim()) return [];

      const url = new URL("/api/payups/search", config.baseUrl);
      url.searchParams.set("q", debouncedQuery);

      const response = await fetch(url.toString(), {
        headers: {
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          ...(config.appId && { "X-App-Id": config.appId }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search payments: ${response.status}`);
      }

      const data = await response.json();
      return data.data as Payment[];
    },
    { ...options, enabled: (options?.enabled ?? true) && debouncedQuery.trim().length > 0 }
  );
}
