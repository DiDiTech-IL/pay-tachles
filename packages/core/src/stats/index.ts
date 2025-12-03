// =============================================================================
// Stats Module - Payment Analytics & Aggregations
// =============================================================================

import { Effect } from "effect";
import { Database, type DatabaseProvider } from "../database";
import { DbError } from "../errors";
import type { Payup, PayupStatus, Transaction, TransactionStatus } from "../types";

// =============================================================================
// Types
// =============================================================================

export interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  completedCount: number;
  failedCount: number;
  pendingCount: number;
  processingCount: number;
  cancelledCount: number;
  expiredCount: number;
  refundedCount: number;
  disputedCount: number;
  successRate: number;
  avgTransactionAmount: number;
  totalFees: number;
  netRevenue: number;
}

export interface StatusBreakdown {
  status: PayupStatus | TransactionStatus;
  count: number;
  percentage: number;
  totalAmount: number;
}

export interface TimeSeriesPoint {
  timestamp: Date;
  count: number;
  amount: number;
}

export interface RevenueByPeriod {
  period: string;
  revenue: number;
  count: number;
  avgAmount: number;
}

export interface CustomerStats {
  customerId: string;
  customerEmail: string | null;
  customerName: string | null;
  totalSpent: number;
  transactionCount: number;
  avgTransactionAmount: number;
  firstTransactionAt: Date;
  lastTransactionAt: Date;
}

export interface StatsFilter {
  appId?: string;
  startDate?: Date;
  endDate?: Date;
  customerId?: string;
}

// =============================================================================
// Stats Computation Functions
// =============================================================================

/**
 * Calculate comprehensive payment statistics from payups
 */
export const calculatePayupStats = (payups: Payup[]): PaymentStats => {
  const completedPayups = payups.filter(p => p.status === "completed");
  const totalRevenue = completedPayups.reduce((sum, p) => sum + p.amount, 0);
  
  const statusCounts = {
    completed: payups.filter(p => p.status === "completed").length,
    failed: payups.filter(p => p.status === "failed").length,
    pending: payups.filter(p => p.status === "pending").length,
    processing: payups.filter(p => p.status === "processing").length,
    cancelled: payups.filter(p => p.status === "cancelled").length,
    expired: payups.filter(p => p.status === "expired").length,
  };

  const total = payups.length;
  const successRate = total > 0 ? (statusCounts.completed / total) * 100 : 0;
  const avgTransactionAmount = completedPayups.length > 0 
    ? totalRevenue / completedPayups.length 
    : 0;

  return {
    totalRevenue,
    totalTransactions: total,
    completedCount: statusCounts.completed,
    failedCount: statusCounts.failed,
    pendingCount: statusCounts.pending,
    processingCount: statusCounts.processing,
    cancelledCount: statusCounts.cancelled,
    expiredCount: statusCounts.expired,
    refundedCount: 0,
    disputedCount: 0,
    successRate,
    avgTransactionAmount,
    totalFees: 0,
    netRevenue: totalRevenue,
  };
};

/**
 * Calculate comprehensive statistics from transactions
 */
export const calculateTransactionStats = (transactions: Transaction[]): PaymentStats => {
  const completedTxs = transactions.filter(t => t.status === "completed");
  const totalRevenue = completedTxs.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = completedTxs.reduce((sum, t) => sum + (t.fees ?? 0), 0);
  const netRevenue = completedTxs.reduce((sum, t) => sum + (t.netAmount ?? t.amount), 0);
  
  const statusCounts = {
    completed: transactions.filter(t => t.status === "completed").length,
    failed: transactions.filter(t => t.status === "failed").length,
    refunded: transactions.filter(t => t.status === "refunded").length,
    disputed: transactions.filter(t => t.status === "disputed").length,
  };

  const total = transactions.length;
  const successRate = total > 0 ? (statusCounts.completed / total) * 100 : 0;
  const avgTransactionAmount = completedTxs.length > 0 
    ? totalRevenue / completedTxs.length 
    : 0;

  return {
    totalRevenue,
    totalTransactions: total,
    completedCount: statusCounts.completed,
    failedCount: statusCounts.failed,
    pendingCount: 0,
    processingCount: 0,
    cancelledCount: 0,
    expiredCount: 0,
    refundedCount: statusCounts.refunded,
    disputedCount: statusCounts.disputed,
    successRate,
    avgTransactionAmount,
    totalFees,
    netRevenue,
  };
};

/**
 * Get status breakdown with percentages
 */
export const getPayupStatusBreakdown = (payups: Payup[]): StatusBreakdown[] => {
  const total = payups.length;
  const statuses: PayupStatus[] = ["pending", "processing", "completed", "failed", "cancelled", "expired"];
  
  return statuses.map(status => {
    const filtered = payups.filter(p => p.status === status);
    const count = filtered.length;
    const totalAmount = filtered.reduce((sum, p) => sum + p.amount, 0);
    
    return {
      status,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      totalAmount,
    };
  }).filter(s => s.count > 0);
};

/**
 * Get transaction status breakdown
 */
export const getTransactionStatusBreakdown = (transactions: Transaction[]): StatusBreakdown[] => {
  const total = transactions.length;
  const statuses: TransactionStatus[] = ["completed", "failed", "refunded", "disputed"];
  
  return statuses.map(status => {
    const filtered = transactions.filter(t => t.status === status);
    const count = filtered.length;
    const totalAmount = filtered.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      status,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      totalAmount,
    };
  }).filter(s => s.count > 0);
};

/**
 * Group data by time period (hour, day, week, month)
 */
export const groupByPeriod = <T extends { createdAt: Date; amount: number }>(
  items: T[],
  period: "hour" | "day" | "week" | "month"
): RevenueByPeriod[] => {
  const grouped = new Map<string, { revenue: number; count: number }>();

  items.forEach(item => {
    const date = item.createdAt;
    let key: string;

    switch (period) {
      case "hour":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:00`;
        break;
      case "day":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        break;
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = `${weekStart.getFullYear()}-W${Math.ceil((weekStart.getDate()) / 7)}`;
        break;
      case "month":
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        break;
    }

    const existing = grouped.get(key) ?? { revenue: 0, count: 0 };
    grouped.set(key, {
      revenue: existing.revenue + item.amount,
      count: existing.count + 1,
    });
  });

  return Array.from(grouped.entries())
    .map(([period, data]) => ({
      period,
      revenue: data.revenue,
      count: data.count,
      avgAmount: data.count > 0 ? data.revenue / data.count : 0,
    }))
    .sort((a, b) => a.period.localeCompare(b.period));
};

/**
 * Get customer statistics
 */
export const getCustomerStats = (transactions: Transaction[]): CustomerStats[] => {
  const customerMap = new Map<string, {
    email: string | null;
    name: string | null;
    totalSpent: number;
    count: number;
    firstAt: Date;
    lastAt: Date;
  }>();

  transactions
    .filter(t => t.customerId && t.status === "completed")
    .forEach(t => {
      const existing = customerMap.get(t.customerId!);
      if (existing) {
        existing.totalSpent += t.amount;
        existing.count += 1;
        if (t.createdAt < existing.firstAt) existing.firstAt = t.createdAt;
        if (t.createdAt > existing.lastAt) existing.lastAt = t.createdAt;
      } else {
        customerMap.set(t.customerId!, {
          email: t.customerEmail,
          name: t.customerName,
          totalSpent: t.amount,
          count: 1,
          firstAt: t.createdAt,
          lastAt: t.createdAt,
        });
      }
    });

  return Array.from(customerMap.entries())
    .map(([customerId, data]) => ({
      customerId,
      customerEmail: data.email,
      customerName: data.name,
      totalSpent: data.totalSpent,
      transactionCount: data.count,
      avgTransactionAmount: data.totalSpent / data.count,
      firstTransactionAt: data.firstAt,
      lastTransactionAt: data.lastAt,
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent);
};

// =============================================================================
// Effect-Based Stats Operations
// =============================================================================

/**
 * Get overall payment stats from the database
 */
export const getPaymentStats = (filter?: StatsFilter): Effect.Effect<PaymentStats, DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const payups = yield* db.listPayups({ appId: filter?.appId });
    
    // Filter by date range if specified
    let filteredPayups = payups;
    if (filter?.startDate || filter?.endDate) {
      filteredPayups = payups.filter(p => {
        if (filter.startDate && p.createdAt < filter.startDate) return false;
        if (filter.endDate && p.createdAt > filter.endDate) return false;
        return true;
      });
    }
    
    return calculatePayupStats(filteredPayups);
  });

/**
 * Get transaction stats from the database (Effect-based)
 */
export const fetchTransactionStats = (filter?: StatsFilter): Effect.Effect<PaymentStats, DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const transactions = yield* db.listTransactions({ 
      appId: filter?.appId,
      customerId: filter?.customerId,
    });
    
    // Filter by date range if specified
    let filteredTxs = transactions;
    if (filter?.startDate || filter?.endDate) {
      filteredTxs = transactions.filter(t => {
        if (filter.startDate && t.createdAt < filter.startDate) return false;
        if (filter.endDate && t.createdAt > filter.endDate) return false;
        return true;
      });
    }
    
    return calculateTransactionStats(filteredTxs);
  });

/**
 * Get revenue grouped by time period
 */
export const getRevenueByPeriod = (
  period: "hour" | "day" | "week" | "month",
  filter?: StatsFilter
): Effect.Effect<RevenueByPeriod[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const transactions = yield* db.listTransactions({ appId: filter?.appId });
    
    const completed = transactions.filter(t => t.status === "completed");
    return groupByPeriod(completed, period);
  });

/**
 * Get top customers by spending
 */
export const getTopCustomers = (
  limit: number = 10,
  filter?: StatsFilter
): Effect.Effect<CustomerStats[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const transactions = yield* db.listTransactions({ appId: filter?.appId });
    
    return getCustomerStats(transactions).slice(0, limit);
  });

/**
 * Get real-time status breakdown
 */
export const getStatusBreakdown = (
  filter?: StatsFilter
): Effect.Effect<StatusBreakdown[], DbError, DatabaseProvider> =>
  Effect.gen(function* () {
    const db = yield* Database;
    const payups = yield* db.listPayups({ appId: filter?.appId });
    
    return getPayupStatusBreakdown(payups);
  });
