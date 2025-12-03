// =============================================================================
// Tachles Core - Payment Management Library
// An unopinionated, runtime-agnostic payment orchestration toolkit
// =============================================================================

// =============================================================================
// Core Types
// =============================================================================

export type {
  App,
  Payup,
  PayupStatus,
  Transaction,
  TransactionStatus,
  WebhookTemplate,
  WebhookLog,
  CreateAppInput,
  UpdateAppInput,
  CreatePayupInput,
  UpdatePayupInput,
  CreateTransactionInput,
  UpdateTransactionInput,
  UpsertWebhookTemplateInput,
  CreateWebhookLogInput,
  PayupFilter,
  TransactionFilter,
  WebhookLogFilter,
} from "./types";

// =============================================================================
// Errors
// =============================================================================

export {
  DbError,
  StorageError,
  AppNotFoundError,
  PayupNotFoundError,
  PayupAlreadyProcessedError,
  SignatureError,
  ValidationError,
  ConfigError,
  RuntimeError,
  HttpError,
  toHttpError,
} from "./errors";

export type { TachlesError } from "./errors";

// =============================================================================
// Configuration
// =============================================================================

export {
  ConfigService,
  createMemoryConfig,
  createCloudflareConfig,
  createUpstashConfig,
} from "./config";

export type { TachlesConfig } from "./config";

// =============================================================================
// Database Layer
// =============================================================================

export {
  Database,
  createDatabaseLayer,
  createMemoryDatabase,
  MemoryDatabaseLive,
} from "./database";

export type { DatabaseProvider } from "./database/provider";

// =============================================================================
// Storage Layer
// =============================================================================

export {
  Storage,
  createStorageLayer,
  createMemoryStorage,
  MemoryStorageLive,
} from "./storage";

export type { StorageProvider } from "./storage/provider";

// =============================================================================
// Stats Module - Analytics & Aggregations
// =============================================================================

export {
  // Pure computation functions
  calculatePayupStats,
  calculateTransactionStats,
  getPayupStatusBreakdown,
  getTransactionStatusBreakdown,
  groupByPeriod,
  getCustomerStats,
  // Effect-based operations
  getPaymentStats,
  fetchTransactionStats,
  getRevenueByPeriod,
  getTopCustomers,
  getStatusBreakdown,
} from "./stats";

export type {
  PaymentStats,
  StatusBreakdown,
  TimeSeriesPoint,
  RevenueByPeriod,
  CustomerStats,
  StatsFilter,
} from "./stats";

// =============================================================================
// Operations Module - High-Level Payment Workflows
// =============================================================================

export {
  // Payment creation
  createPayment,
  createPaymentBatch,
  // Payment completion
  completePayment,
  failPayment,
  cancelPayment,
  // Payment queries
  getPaymentWithTransaction,
  getCustomerPayments,
  getRecentPayments,
  // Status transitions
  startProcessing,
  expireOldPayments,
  // Refunds
  refundPayment,
} from "./operations";

export type {
  CreatePaymentOptions,
  CompletePaymentOptions,
  FailPaymentOptions,
  RefundPaymentOptions,
  PaymentResult,
  OperationResult,
} from "./operations";

// =============================================================================
// Utilities Module - Helper Functions
// =============================================================================

export {
  // Currency utilities
  formatCurrency,
  parseCurrency,
  convertCurrency,
  // Status utilities
  isTerminalStatus,
  isSuccessStatus,
  isFailureStatus,
  isPendingStatus,
  getStatusLabel,
  getStatusColor,
  getAllowedTransitions,
  // Time utilities
  formatDate,
  formatRelativeTime,
  getTimeUntilExpiry,
  // Validation utilities
  isValidEmail,
  isValidAmount,
  isValidCurrency,
  validatePaymentInput,
  // ID utilities
  generateId,
  getIdPrefix,
  hasIdPrefix,
  // Object utilities
  getNestedValue,
  cleanObject,
  deepMerge,
  // Sorting & filtering
  sortByDate,
  sortByAmount,
  filterByDateRange,
  groupBy,
} from "./utils";

// =============================================================================
// Crypto Utilities
// =============================================================================

export {
  generateUUID,
  generateApiKey,
  randomBytes,
  hmacSHA256,
  hashSHA256,
  timingSafeEqual,
  createWebhookSignature,
  verifyWebhookSignature,
} from "./crypto";

export type { WebhookSignature } from "./crypto";

// =============================================================================
// HTTP Router
// =============================================================================

export {
  Router,
  createRouter,
  json,
  ok,
  created,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalError,
  fromHttpError,
} from "./router";

export type {
  RouteParams,
  TachlesRequest,
  TachlesResponse,
  RouteHandler,
} from "./router";

// =============================================================================
// Server Utilities
// =============================================================================

export {
  createInfraLayer,
  getCorsHeaders,
  jsonResponse,
  errorResponse,
  corsPreflightResponse,
  runWithInfra,
} from "./server";

export type { TachlesServerOptions, InfraLayer, FetchHandler } from "./server";

// =============================================================================
// Version
// =============================================================================

export const VERSION = "1.0.0";