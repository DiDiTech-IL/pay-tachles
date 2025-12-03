// =============================================================================
// React 19 Hooks for Tachles Core
// Modern hooks using React 19 features: use(), useOptimistic, useTransition
// =============================================================================

import {
  use,
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";

// =============================================================================
// Types
// =============================================================================

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";
export type TransactionStatus = "completed" | "failed" | "refunded" | "disputed";

export interface Payment {
  id: string;
  appId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null;
  amount: number;
  currency: string;
  status: TransactionStatus;
  fees: number | null;
  netAmount: number | null;
  createdAt: Date;
}

export interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  processingCount: number;
  successRate: number;
  avgTransactionAmount: number;
}

export interface WebhookEvent {
  id: string;
  type: string;
  paymentId: string;
  status: string;
  timestamp: Date;
  data?: Record<string, unknown>;
}

// =============================================================================
// Configuration
// =============================================================================

export interface TachlesConfig {
  apiUrl: string;
  apiKey?: string;
  onError?: (error: Error) => void;
}

let globalConfig: TachlesConfig = {
  apiUrl: "/api",
};

/**
 * Configure the Tachles hooks globally
 */
export const configureTachles = (config: Partial<TachlesConfig>): void => {
  globalConfig = { ...globalConfig, ...config };
};

// =============================================================================
// API Helper with Promise Caching for React 19's use()
// =============================================================================

const promiseCache = new Map<string, Promise<unknown>>();

const fetchApi = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(globalConfig.apiKey ? { Authorization: `Bearer ${globalConfig.apiKey}` } : {}),
  };

  const response = await fetch(`${globalConfig.apiUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Request failed" })) as { message?: string };
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
};

/**
 * Create a cached promise for use with React 19's use() hook
 */
const createCachedFetch = <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  if (!promiseCache.has(key)) {
    const promise = fetcher().finally(() => {
      // Clear cache after a short delay to allow for revalidation
      setTimeout(() => promiseCache.delete(key), 100);
    });
    promiseCache.set(key, promise);
  }
  return promiseCache.get(key) as Promise<T>;
};

/**
 * Invalidate cached promises
 */
export const invalidateCache = (keyPattern?: string): void => {
  if (keyPattern) {
    for (const key of promiseCache.keys()) {
      if (key.includes(keyPattern)) {
        promiseCache.delete(key);
      }
    }
  } else {
    promiseCache.clear();
  }
};

// =============================================================================
// React 19 use() based data fetching
// =============================================================================

/**
 * Fetch payments using React 19's use() hook
 * Must be used within a Suspense boundary
 * 
 * @example
 * ```tsx
 * function PaymentsList() {
 *   const payments = usePaymentsData({ status: "completed" });
 *   return <ul>{payments.map(p => <li key={p.id}>{p.id}</li>)}</ul>;
 * }
 * 
 * // Wrap in Suspense
 * <Suspense fallback={<Loading />}>
 *   <PaymentsList />
 * </Suspense>
 * ```
 */
export const usePaymentsData = (options: {
  appId?: string;
  status?: PaymentStatus;
  limit?: number;
} = {}): Payment[] => {
  const { appId, status, limit = 50 } = options;
  
  const params = new URLSearchParams();
  if (appId) params.set("appId", appId);
  if (status) params.set("status", status);
  params.set("limit", String(limit));
  
  const cacheKey = `payments:${params.toString()}`;
  const promise = createCachedFetch(cacheKey, () => 
    fetchApi<Payment[]>(`/payups?${params}`)
  );
  
  return use(promise);
};

/**
 * Fetch a single payment using React 19's use() hook
 */
export const usePaymentData = (paymentId: string): { payment: Payment; transaction: Transaction | null } => {
  const cacheKey = `payment:${paymentId}`;
  const promise = createCachedFetch(cacheKey, () =>
    fetchApi<{ payment: Payment; transaction: Transaction | null }>(`/payups/${paymentId}`)
  );
  
  return use(promise);
};

/**
 * Fetch payment stats using React 19's use() hook
 */
export const usePaymentStatsData = (options: {
  appId?: string;
  startDate?: Date;
  endDate?: Date;
} = {}): PaymentStats => {
  const { appId, startDate, endDate } = options;
  
  const params = new URLSearchParams();
  if (appId) params.set("appId", appId);
  if (startDate) params.set("startDate", startDate.toISOString());
  if (endDate) params.set("endDate", endDate.toISOString());
  
  const cacheKey = `stats:${params.toString()}`;
  const promise = createCachedFetch(cacheKey, () =>
    fetchApi<PaymentStats>(`/stats?${params}`)
  );
  
  return use(promise);
};

// =============================================================================
// useOptimistic for Payment Status Updates
// =============================================================================

export interface OptimisticPayment extends Payment {
  isPending?: boolean;
}

/**
 * Hook for optimistic payment updates using React 19's useOptimistic
 * 
 * @example
 * ```tsx
 * function PaymentCard({ payment }: { payment: Payment }) {
 *   const [optimisticPayment, updatePayment] = useOptimisticPayment(payment);
 *   
 *   const handleCancel = async () => {
 *     updatePayment({ status: "cancelled" });
 *     await cancelPaymentAction(payment.id);
 *   };
 *   
 *   return (
 *     <div style={{ opacity: optimisticPayment.isPending ? 0.7 : 1 }}>
 *       Status: {optimisticPayment.status}
 *       <button onClick={handleCancel}>Cancel</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useOptimisticPayment = (
  payment: Payment
): [OptimisticPayment, (update: Partial<Payment>) => void] => {
  const [optimisticPayment, setOptimisticPayment] = useOptimistic<
    OptimisticPayment,
    Partial<Payment>
  >(
    payment,
    (currentPayment, update) => ({
      ...currentPayment,
      ...update,
      isPending: true,
      updatedAt: new Date(),
    })
  );

  return [optimisticPayment, setOptimisticPayment];
};

/**
 * Hook for optimistic list updates
 */
export const useOptimisticPayments = (
  payments: Payment[]
): [OptimisticPayment[], (action: { type: "add" | "update" | "remove"; payment: Payment }) => void] => {
  const [optimisticPayments, updatePayments] = useOptimistic<
    OptimisticPayment[],
    { type: "add" | "update" | "remove"; payment: Payment }
  >(
    payments,
    (currentPayments, action) => {
      switch (action.type) {
        case "add":
          return [{ ...action.payment, isPending: true }, ...currentPayments];
        case "update":
          return currentPayments.map(p =>
            p.id === action.payment.id ? { ...p, ...action.payment, isPending: true } : p
          );
        case "remove":
          return currentPayments.filter(p => p.id !== action.payment.id);
        default:
          return currentPayments;
      }
    }
  );

  return [optimisticPayments, updatePayments];
};

// =============================================================================
// useTransition for Payment Actions
// =============================================================================

export interface CreatePaymentInput {
  appId: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
  customerName?: string;
  customerId?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Hook for creating payments with transition support
 * 
 * @example
 * ```tsx
 * function CreatePaymentForm() {
 *   const { createPayment, isPending, error } = useCreatePayment();
 *   
 *   const handleSubmit = async (e: FormEvent) => {
 *     e.preventDefault();
 *     const payment = await createPayment({
 *       appId: "app_123",
 *       amount: 1999,
 *     });
 *   };
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <button disabled={isPending}>
 *         {isPending ? "Creating..." : "Create Payment"}
 *       </button>
 *       {error && <p>{error.message}</p>}
 *     </form>
 *   );
 * }
 * ```
 */
export const useCreatePayment = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);
  const [lastCreated, setLastCreated] = useState<Payment | null>(null);

  const createPayment = useCallback(async (input: CreatePaymentInput): Promise<Payment> => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          setError(null);
          const payment = await fetchApi<Payment>("/payups", {
            method: "POST",
            body: JSON.stringify(input),
          });
          setLastCreated(payment);
          invalidateCache("payments");
          resolve(payment);
        } catch (err) {
          const error = err instanceof Error ? err : new Error("Failed to create payment");
          setError(error);
          globalConfig.onError?.(error);
          reject(error);
        }
      });
    });
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setLastCreated(null);
  }, []);

  return {
    createPayment,
    isPending,
    error,
    lastCreated,
    reset,
  };
};

/**
 * Hook for payment actions (complete, fail, cancel, refund)
 */
export const usePaymentActions = (paymentId: string) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const executeAction = useCallback(async <T>(
    action: () => Promise<T>
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      startTransition(async () => {
        try {
          setError(null);
          const result = await action();
          invalidateCache(`payment:${paymentId}`);
          invalidateCache("payments");
          resolve(result);
        } catch (err) {
          const error = err instanceof Error ? err : new Error("Action failed");
          setError(error);
          globalConfig.onError?.(error);
          reject(error);
        }
      });
    });
  }, [paymentId]);

  const cancel = useCallback((reason?: string) =>
    executeAction(() =>
      fetchApi<Payment>(`/payups/${paymentId}/cancel`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      })
    ), [paymentId, executeAction]);

  const refund = useCallback((amount?: number, reason?: string) =>
    executeAction(() =>
      fetchApi<Transaction>(`/payups/${paymentId}/refund`, {
        method: "POST",
        body: JSON.stringify({ amount, reason }),
      })
    ), [paymentId, executeAction]);

  return {
    cancel,
    refund,
    isPending,
    error,
  };
};

// =============================================================================
// useSyncExternalStore for Real-time Updates
// =============================================================================

interface PaymentStore {
  payments: Payment[];
  events: WebhookEvent[];
  isConnected: boolean;
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => { payments: Payment[]; events: WebhookEvent[]; isConnected: boolean };
}

const createPaymentStore = (apiUrl: string, appId?: string): PaymentStore => {
  let payments: Payment[] = [];
  let events: WebhookEvent[] = [];
  let isConnected = false;
  const listeners = new Set<() => void>();
  let eventSource: EventSource | null = null;

  const notify = () => listeners.forEach(l => l());

  const connect = () => {
    const params = new URLSearchParams();
    if (appId) params.set("appId", appId);
    
    eventSource = new EventSource(`${apiUrl}/events?${params}`);
    
    eventSource.onopen = () => {
      isConnected = true;
      notify();
    };
    
    eventSource.onerror = () => {
      isConnected = false;
      notify();
    };
    
    eventSource.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as { type: string; payload: unknown };
        
        if (data.type === "payment.created") {
          const payment = data.payload as Payment;
          payments = [payment, ...payments].slice(0, 100);
          notify();
        } else if (data.type === "payment.updated") {
          const payment = data.payload as Payment;
          payments = payments.map(p => p.id === payment.id ? payment : p);
          notify();
        } else if (data.type === "webhook") {
          const event = data.payload as WebhookEvent;
          events = [event, ...events].slice(0, 50);
          notify();
        }
      } catch {
        // Ignore malformed messages
      }
    };
  };

  connect();

  return {
    get payments() { return payments; },
    get events() { return events; },
    get isConnected() { return isConnected; },
    subscribe: (callback) => {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
        if (listeners.size === 0 && eventSource) {
          eventSource.close();
        }
      };
    },
    getSnapshot: () => ({ payments, events, isConnected }),
  };
};

const storeCache = new Map<string, PaymentStore>();

/**
 * Hook for real-time payment updates using useSyncExternalStore
 * 
 * @example
 * ```tsx
 * function LivePaymentFeed() {
 *   const { payments, events, isConnected } = useRealtimePayments();
 *   
 *   return (
 *     <div>
 *       <span>{isConnected ? "🟢 Live" : "🔴 Disconnected"}</span>
 *       <ul>
 *         {payments.map(p => (
 *           <li key={p.id}>{p.id} - {p.status}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export const useRealtimePayments = (options: { appId?: string } = {}) => {
  const { appId } = options;
  const storeKey = `realtime:${appId ?? "all"}`;
  
  if (!storeCache.has(storeKey)) {
    storeCache.set(storeKey, createPaymentStore(globalConfig.apiUrl, appId));
  }
  
  const store = storeCache.get(storeKey)!;
  
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot // Server snapshot (same for client-only)
  );
  
  return state;
};

// =============================================================================
// Status & Utility Hooks
// =============================================================================

/**
 * Hook to derive payment status information
 */
export const usePaymentStatus = (payment: Payment | null) => {
  return useMemo(() => {
    if (!payment) {
      return {
        status: null,
        isTerminal: false,
        isSuccess: false,
        isFailed: false,
        isPending: false,
        label: "",
        color: { bg: "", text: "", border: "" },
      };
    }

    const status = payment.status;
    const isTerminal = ["completed", "failed", "cancelled", "expired"].includes(status);
    const isSuccess = status === "completed";
    const isFailed = ["failed", "cancelled", "expired"].includes(status);
    const isPending = ["pending", "processing"].includes(status);

    const labels: Record<PaymentStatus, string> = {
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
      expired: "Expired",
    };

    const colors: Record<PaymentStatus, { bg: string; text: string; border: string }> = {
      pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
      processing: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
      completed: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
      failed: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
      cancelled: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/20" },
      expired: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
    };

    return {
      status,
      isTerminal,
      isSuccess,
      isFailed,
      isPending,
      label: labels[status],
      color: colors[status],
    };
  }, [payment]);
};

/**
 * Hook for formatting currency
 */
export const useFormatCurrency = (amount: number, currency: string = "USD"): string => {
  return useMemo(() => {
    const noDecimalCurrencies = ["JPY", "KRW", "VND"];
    const divisor = noDecimalCurrencies.includes(currency.toUpperCase()) ? 1 : 100;
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: noDecimalCurrencies.includes(currency.toUpperCase()) ? 0 : 2,
    }).format(amount / divisor);
  }, [amount, currency]);
};

/**
 * Hook for relative time formatting
 */
export const useRelativeTime = (date: Date | string | null): string => {
  return useMemo(() => {
    if (!date) return "";
    
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 5) return "just now";
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return d.toLocaleDateString();
  }, [date]);
};

/**
 * Hook for countdown timer (useful for payment expiry)
 */
export const useCountdown = (expiresAt: Date | string | null) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    if (!expiresAt) return;
    
    const expiry = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
    
    const update = () => {
      const now = new Date();
      const diffMs = expiry.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        setIsExpired(true);
        setTimeLeft("Expired");
        return;
      }
      
      const seconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes % 60}m`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds % 60}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };
    
    update();
    const interval = setInterval(update, 1000);
    
    return () => clearInterval(interval);
  }, [expiresAt]);
  
  return { timeLeft, isExpired };
};


