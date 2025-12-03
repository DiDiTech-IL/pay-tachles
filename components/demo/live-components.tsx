"use client";

import { useEffect, useRef } from "react";
import type { DemoPayment, DemoWebhookEvent, PaymentStatus } from "./use-demo-data";

// ============================================================================
// Status Badge Component
// ============================================================================

const STATUS_COLORS: Record<PaymentStatus, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
  processing: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  failed: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  refunded: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-400" },
};

export function StatusBadge({ status, pulse = false }: { status: PaymentStatus; pulse?: boolean }) {
  const colors = STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${pulse ? "animate-pulse" : ""}`} />
      {status}
    </span>
  );
}

// ============================================================================
// Format Utilities
// ============================================================================

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 1000) return "just now";
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return `${Math.floor(diff / 3600000)}h ago`;
}

// ============================================================================
// Live Payment Feed Component
// ============================================================================

interface LivePaymentFeedProps {
  payments: DemoPayment[];
  maxItems?: number;
  showAnimation?: boolean;
}

export function LivePaymentFeed({ payments, maxItems = 10, showAnimation = true }: LivePaymentFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFirstId = useRef<string | null>(null);

  useEffect(() => {
    if (payments[0] && payments[0].id !== previousFirstId.current) {
      previousFirstId.current = payments[0].id;
    }
  }, [payments]);

  return (
    <div ref={containerRef} className="space-y-2 overflow-hidden">
      {payments.slice(0, maxItems).map((payment, index) => (
        <div
          key={payment.id}
          className={`
            flex items-center justify-between p-3 rounded-lg
            bg-slate-800/30 border border-slate-700/50
            hover:bg-slate-800/50 transition-all duration-200
            ${showAnimation && index === 0 ? "animate-slide-in-right" : ""}
          `}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-sm">
              {payment.provider === "stripe" && "💳"}
              {payment.provider === "paypal" && "🅿️"}
              {payment.provider === "square" && "⬜"}
              {payment.provider === "adyen" && "🌐"}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium truncate">{payment.customerName}</span>
                <StatusBadge status={payment.status} pulse={payment.status === "processing"} />
              </div>
              <div className="text-xs text-slate-500 truncate">
                {payment.description} • {formatRelativeTime(payment.updatedAt)}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className={`font-mono font-semibold ${
              payment.status === "completed" ? "text-emerald-400" :
              payment.status === "failed" ? "text-red-400" :
              payment.status === "refunded" ? "text-purple-400" :
              "text-white"
            }`}>
              {payment.status === "refunded" ? "-" : ""}{formatCurrency(payment.amount)}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              {payment.id.slice(0, 12)}...
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Live Webhook Events Component
// ============================================================================

interface LiveWebhookEventsProps {
  events: DemoWebhookEvent[];
  maxItems?: number;
}

export function LiveWebhookEvents({ events, maxItems = 8 }: LiveWebhookEventsProps) {
  const eventTypeColors: Record<string, string> = {
    "payment.created": "text-blue-400",
    "payment.pending": "text-amber-400",
    "payment.processing": "text-blue-400",
    "payment.completed": "text-emerald-400",
    "payment.failed": "text-red-400",
    "payment.refunded": "text-purple-400",
  };

  return (
    <div className="font-mono text-xs space-y-1 overflow-hidden">
      {events.slice(0, maxItems).map((event, index) => (
        <div
          key={event.id}
          className={`
            flex items-center gap-2 px-2 py-1.5 rounded
            bg-slate-900/50 border border-slate-800/50
            ${index === 0 ? "animate-slide-in-right" : ""}
          `}
        >
          <span className="text-slate-600">{formatTime(event.timestamp)}</span>
          <span className={eventTypeColors[event.type] || "text-slate-400"}>
            {event.type}
          </span>
          <span className="text-slate-600 truncate">
            {event.paymentId.slice(0, 12)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// KPI Card Component
// ============================================================================

interface KPICardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  color?: "indigo" | "emerald" | "amber" | "red" | "purple";
}

export function KPICard({ label, value, subValue, icon, trend, color = "indigo" }: KPICardProps) {
  const colorClasses = {
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    red: "from-red-500/20 to-red-500/5 border-red-500/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  };

  return (
    <div className={`
      relative p-5 rounded-2xl border
      bg-linear-to-br ${colorClasses[color]}
      backdrop-blur-sm overflow-hidden
    `}>
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-xl bg-slate-800/50">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.value >= 0 ? "text-emerald-400" : "text-red-400"
          }`}>
            <svg className={`w-3 h-3 ${trend.value < 0 ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1 tabular-nums">
        {value}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
      {subValue && (
        <div className="text-xs text-slate-500 mt-1">{subValue}</div>
      )}
    </div>
  );
}

// ============================================================================
// Mini Bar Chart Component
// ============================================================================

interface MiniBarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  color?: string;
}

export function MiniBarChart({ data, maxValue, color = "indigo" }: MiniBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value), 1);
  
  const barColors: Record<string, string> = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t ${barColors[color] || barColors.indigo} transition-all duration-500`}
            style={{ height: `${(item.value / max) * 100}%`, minHeight: item.value > 0 ? 4 : 0 }}
          />
          <span className="text-[10px] text-slate-500 truncate">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Status Distribution Component
// ============================================================================

interface StatusDistributionProps {
  data: { status: PaymentStatus; count: number; percentage: number }[];
}

export function StatusDistribution({ data }: StatusDistributionProps) {
  const filtered = data.filter(d => d.count > 0);
  
  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="h-3 rounded-full overflow-hidden flex bg-slate-800/50">
        {filtered.map((item) => (
          <div
            key={item.status}
            className={`transition-all duration-500 ${
              item.status === "completed" ? "bg-emerald-500" :
              item.status === "pending" ? "bg-amber-500" :
              item.status === "processing" ? "bg-blue-500" :
              item.status === "failed" ? "bg-red-500" :
              "bg-purple-500"
            }`}
            style={{ width: `${item.percentage}%` }}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {filtered.map((item) => (
          <div key={item.status} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              item.status === "completed" ? "bg-emerald-500" :
              item.status === "pending" ? "bg-amber-500" :
              item.status === "processing" ? "bg-blue-500" :
              item.status === "failed" ? "bg-red-500" :
              "bg-purple-500"
            }`} />
            <span className="text-slate-400 capitalize">{item.status}</span>
            <span className="text-slate-500">({item.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Revenue Chart Component
// ============================================================================

interface RevenueChartProps {
  data: { hour: string; amount: number; count: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount), 1);
  
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-32">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end h-24">
              {item.amount > 0 && (
                <span className="text-[10px] text-emerald-400 font-medium mb-1">
                  {formatCurrency(item.amount)}
                </span>
              )}
              <div
                className="w-full bg-linear-to-t from-emerald-500 to-emerald-400 rounded-t transition-all duration-500"
                style={{ height: `${(item.amount / maxAmount) * 100}%`, minHeight: item.amount > 0 ? 4 : 0 }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs text-slate-400">{item.hour}</div>
              <div className="text-[10px] text-slate-600">{item.count} txn</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Pulse Indicator Component
// ============================================================================

export function PulseIndicator({ active = true, label }: { active?: boolean; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        {active && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${active ? "bg-emerald-500" : "bg-slate-600"}`} />
      </span>
      {label && (
        <span className={`text-xs font-medium ${active ? "text-emerald-400" : "text-slate-500"}`}>
          {label}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Live Counter Component
// ============================================================================

export function LiveCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  return (
    <span className="tabular-nums font-mono">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
