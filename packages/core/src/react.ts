// =============================================================================
// React 19 Hooks Entry Point
// Import from "@tachles/core/react" to use React hooks
// Requires React 19.x for use(), useOptimistic, and useTransition features
// =============================================================================

export {
  // Configuration
  configureTachles,
  invalidateCache,
  // React 19 use() based data fetching (requires Suspense boundary)
  usePaymentsData,
  usePaymentData,
  usePaymentStatsData,
  // useOptimistic based hooks
  useOptimisticPayment,
  useOptimisticPayments,
  // useTransition based mutation hooks
  useCreatePayment,
  usePaymentActions,
  // useSyncExternalStore for real-time updates
  useRealtimePayments,
  // Status & utility hooks
  usePaymentStatus,
  useFormatCurrency,
  useRelativeTime,
  useCountdown,
} from "./hooks/index";

export type {
  // Config types
  TachlesConfig,
  // Data types
  Payment,
  Transaction,
  PaymentStats,
  WebhookEvent,
  PaymentStatus,
  TransactionStatus,
  CreatePaymentInput,
  OptimisticPayment,
} from "./hooks/index";
