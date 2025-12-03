// =============================================================================
// Utilities Module - Helper Functions for Payment Operations
// =============================================================================

import type { PayupStatus, TransactionStatus } from "../types";

// =============================================================================
// Currency Utilities
// =============================================================================

/**
 * Format amount from cents to display string
 * 
 * @example
 * ```typescript
 * formatCurrency(1999) // "$19.99"
 * formatCurrency(1999, "EUR") // "€19.99"
 * formatCurrency(1999, "JPY") // "¥1,999"
 * ```
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  // JPY and some other currencies don't have decimal places
  const noDecimalCurrencies = ["JPY", "KRW", "VND", "IDR"];
  const divisor = noDecimalCurrencies.includes(currency.toUpperCase()) ? 1 : 100;
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: noDecimalCurrencies.includes(currency.toUpperCase()) ? 0 : 2,
  }).format(amount / divisor);
};

/**
 * Parse currency string to cents
 * 
 * @example
 * ```typescript
 * parseCurrency("$19.99") // 1999
 * parseCurrency("€19,99", "de-DE") // 1999
 * ```
 */
export const parseCurrency = (value: string, locale: string = "en-US"): number => {
  // Remove currency symbols and spaces
  const cleaned = value.replace(/[^0-9.,\-]/g, "");
  
  // Handle different decimal separators
  const isCommaDecimal = locale.includes("de") || locale.includes("fr") || locale.includes("es");
  const normalized = isCommaDecimal 
    ? cleaned.replace(/\./g, "").replace(",", ".") 
    : cleaned.replace(/,/g, "");
  
  const parsed = parseFloat(normalized);
  return Math.round(parsed * 100);
};

/**
 * Convert between currencies (requires exchange rate)
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number => {
  if (fromCurrency === toCurrency) return amount;
  return Math.round(amount * exchangeRate);
};

// =============================================================================
// Status Utilities
// =============================================================================

/**
 * Check if a payup status is terminal (final state)
 */
export const isTerminalStatus = (status: PayupStatus): boolean => {
  return ["completed", "failed", "cancelled", "expired"].includes(status);
};

/**
 * Check if a payup status indicates success
 */
export const isSuccessStatus = (status: PayupStatus | TransactionStatus): boolean => {
  return status === "completed";
};

/**
 * Check if a payup status indicates failure
 */
export const isFailureStatus = (status: PayupStatus | TransactionStatus): boolean => {
  return ["failed", "cancelled", "expired", "disputed"].includes(status);
};

/**
 * Check if a payup is still pending processing
 */
export const isPendingStatus = (status: PayupStatus): boolean => {
  return ["pending", "processing"].includes(status);
};

/**
 * Get human-readable status label
 */
export const getStatusLabel = (status: PayupStatus | TransactionStatus): string => {
  const labels: Record<string, string> = {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
    cancelled: "Cancelled",
    expired: "Expired",
    refunded: "Refunded",
    disputed: "Disputed",
  };
  return labels[status] ?? status;
};

/**
 * Get status color for UI display
 */
export const getStatusColor = (status: PayupStatus | TransactionStatus): {
  bg: string;
  text: string;
  border: string;
} => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
    processing: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
    completed: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
    failed: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
    cancelled: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/20" },
    expired: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
    refunded: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
    disputed: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20" },
  };
  return colors[status] ?? colors.pending;
};

/**
 * Get allowed status transitions
 */
export const getAllowedTransitions = (currentStatus: PayupStatus): PayupStatus[] => {
  const transitions: Record<PayupStatus, PayupStatus[]> = {
    pending: ["processing", "cancelled", "expired"],
    processing: ["completed", "failed", "cancelled"],
    completed: [],
    failed: [],
    cancelled: [],
    expired: [],
  };
  return transitions[currentStatus] ?? [];
};

// =============================================================================
// Time Utilities
// =============================================================================

/**
 * Format date for display
 */
export const formatDate = (
  date: Date | string,
  format: "short" | "long" | "relative" = "short",
  locale: string = "en-US"
): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (format === "relative") {
    return formatRelativeTime(d);
  }
  
  const options: Intl.DateTimeFormatOptions = format === "long"
    ? { dateStyle: "full", timeStyle: "short" }
    : { dateStyle: "short", timeStyle: "short" };
  
  return new Intl.DateTimeFormat(locale, options).format(d);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
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
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
};

/**
 * Calculate time until expiry
 */
export const getTimeUntilExpiry = (expiresAt: Date | string): {
  isExpired: boolean;
  timeLeft: string;
  seconds: number;
} => {
  const expiry = typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt;
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return { isExpired: true, timeLeft: "Expired", seconds: 0 };
  }
  
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  let timeLeft: string;
  if (hours > 0) {
    timeLeft = `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    timeLeft = `${minutes}m ${seconds % 60}s`;
  } else {
    timeLeft = `${seconds}s`;
  }
  
  return { isExpired: false, timeLeft, seconds };
};

// =============================================================================
// Validation Utilities
// =============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate amount (must be positive integer)
 */
export const isValidAmount = (amount: number): boolean => {
  return Number.isInteger(amount) && amount > 0;
};

/**
 * Validate currency code (ISO 4217)
 */
export const isValidCurrency = (currency: string): boolean => {
  const validCurrencies = [
    "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "MXN",
    "BRL", "KRW", "SGD", "HKD", "NOK", "SEK", "DKK", "NZD", "ZAR", "RUB",
    "TRY", "PLN", "THB", "IDR", "MYR", "PHP", "CZK", "ILS", "CLP", "PKR",
  ];
  return validCurrencies.includes(currency.toUpperCase());
};

/**
 * Validate payment input
 */
export const validatePaymentInput = (input: {
  amount: number;
  currency?: string;
  customerEmail?: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!isValidAmount(input.amount)) {
    errors.push("Amount must be a positive integer (in cents)");
  }
  
  if (input.currency && !isValidCurrency(input.currency)) {
    errors.push(`Invalid currency code: ${input.currency}`);
  }
  
  if (input.customerEmail && !isValidEmail(input.customerEmail)) {
    errors.push(`Invalid email format: ${input.customerEmail}`);
  }
  
  return { valid: errors.length === 0, errors };
};

// =============================================================================
// ID Utilities
// =============================================================================

/**
 * Generate a prefixed ID
 */
export const generateId = (prefix: string = "id"): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}${random}`;
};

/**
 * Extract prefix from ID
 */
export const getIdPrefix = (id: string): string | null => {
  const match = id.match(/^([a-z]+)_/);
  return match ? match[1] : null;
};

/**
 * Check if ID has expected prefix
 */
export const hasIdPrefix = (id: string, prefix: string): boolean => {
  return id.startsWith(`${prefix}_`);
};

// =============================================================================
// Object Utilities
// =============================================================================

/**
 * Safely get nested property
 */
export const getNestedValue = <T>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined => {
  const keys = path.split(".");
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  return (current as T) ?? defaultValue;
};

/**
 * Remove undefined values from object
 */
export const cleanObject = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Deep merge objects
 */
export const deepMerge = <T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target };
  
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target[key];
    
    if (
      sourceValue !== undefined &&
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === "object" &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[typeof key];
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[typeof key];
    }
  }
  
  return result;
};

// =============================================================================
// Sorting & Filtering Utilities
// =============================================================================

/**
 * Sort payments by date (newest first)
 */
export const sortByDate = <T extends { createdAt: Date }>(
  items: T[],
  order: "asc" | "desc" = "desc"
): T[] => {
  return [...items].sort((a, b) => {
    const diff = a.createdAt.getTime() - b.createdAt.getTime();
    return order === "desc" ? -diff : diff;
  });
};

/**
 * Sort by amount
 */
export const sortByAmount = <T extends { amount: number }>(
  items: T[],
  order: "asc" | "desc" = "desc"
): T[] => {
  return [...items].sort((a, b) => {
    const diff = a.amount - b.amount;
    return order === "desc" ? -diff : diff;
  });
};

/**
 * Filter payments by date range
 */
export const filterByDateRange = <T extends { createdAt: Date }>(
  items: T[],
  startDate?: Date,
  endDate?: Date
): T[] => {
  return items.filter(item => {
    if (startDate && item.createdAt < startDate) return false;
    if (endDate && item.createdAt > endDate) return false;
    return true;
  });
};

/**
 * Group items by a key
 */
export const groupBy = <T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};
