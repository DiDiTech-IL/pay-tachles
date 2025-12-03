// =============================================================================
// React Components for Tachles Core
// Pre-built UI components for payment flows
// =============================================================================

import React, {
  type ButtonHTMLAttributes,
  type ChangeEvent,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from "react";

// =============================================================================
// Types
// =============================================================================

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerEmail: string | null;
  customerName: string | null;
  description: string | null;
  createdAt: Date;
  expiresAt: Date | null;
}

export interface PaymentComponentProps {
  payment: Payment;
  onAction?: (action: string, paymentId: string) => void;
  className?: string;
}

// =============================================================================
// Utility Functions
// =============================================================================

const formatCurrency = (amount: number, currency: string): string => {
  const noDecimalCurrencies = ["JPY", "KRW", "VND"];
  const divisor = noDecimalCurrencies.includes(currency.toUpperCase()) ? 1 : 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / divisor);
};

const getStatusStyles = (status: PaymentStatus) => {
  const styles: Record<PaymentStatus, { bg: string; text: string; border: string }> = {
    pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20" },
    processing: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
    completed: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
    failed: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
    cancelled: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/20" },
    expired: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
  };
  return styles[status];
};

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

// =============================================================================
// PaymentBadge - Status indicator
// =============================================================================

export interface PaymentBadgeProps {
  status: PaymentStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PaymentBadge({ status, size = "md", className }: PaymentBadgeProps) {
  const styles = getStatusStyles(status);
  const sizes = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  const labels: Record<PaymentStatus, string> = {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
    cancelled: "Cancelled",
    expired: "Expired",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        styles.bg,
        styles.text,
        styles.border,
        "border",
        sizes[size],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}

// =============================================================================
// PaymentAmount - Formatted currency display
// =============================================================================

export interface PaymentAmountProps {
  amount: number;
  currency: string;
  size?: "sm" | "md" | "lg" | "xl";
  showCurrency?: boolean;
  className?: string;
}

export function PaymentAmount({
  amount,
  currency,
  size = "md",
  showCurrency = false,
  className,
}: PaymentAmountProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl font-bold",
  };

  return (
    <span className={cn(sizes[size], className)}>
      {formatCurrency(amount, currency)}
      {showCurrency && <span className="text-slate-400 text-sm ml-1">{currency}</span>}
    </span>
  );
}

// =============================================================================
// PaymentCard - Full payment display card
// =============================================================================

export interface PaymentCardProps extends PaymentComponentProps {
  showActions?: boolean;
  compact?: boolean;
}

export function PaymentCard({
  payment,
  onAction,
  showActions = true,
  compact = false,
  className,
}: PaymentCardProps) {
  const styles = getStatusStyles(payment.status);
  const isTerminal = ["completed", "failed", "cancelled", "expired"].includes(payment.status);

  return (
    <div
      className={cn(
        "rounded-xl border bg-slate-900/50 overflow-hidden",
        styles.border,
        className
      )}
    >
      <div className={cn("p-4", compact && "p-3")}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <PaymentAmount
                amount={payment.amount}
                currency={payment.currency}
                size={compact ? "md" : "lg"}
                className="font-semibold"
              />
              <PaymentBadge status={payment.status} size={compact ? "sm" : "md"} />
            </div>
            {payment.description && (
              <p className={cn("text-slate-400 truncate mt-1", compact ? "text-xs" : "text-sm")}>
                {payment.description}
              </p>
            )}
          </div>
          <span className="text-xs text-slate-500 font-mono shrink-0">
            {payment.id.slice(0, 12)}...
          </span>
        </div>

        {/* Details */}
        {!compact && (
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Customer</span>
              <p className="text-white truncate">
                {payment.customerEmail || payment.customerName || "Anonymous"}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Created</span>
              <p className="text-white">
                {payment.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && !isTerminal && onAction && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
            {payment.status === "pending" && (
              <>
                <button
                  onClick={() => onAction("cancel", payment.id)}
                  className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onAction("process", payment.id)}
                  className="px-3 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  Process
                </button>
              </>
            )}
            {payment.status === "processing" && (
              <button
                onClick={() => onAction("complete", payment.id)}
                className="px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                Mark Complete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// PaymentList - List of payments with virtual scrolling support
// =============================================================================

export interface PaymentListProps {
  payments: Payment[];
  onPaymentClick?: (payment: Payment) => void;
  onAction?: (action: string, paymentId: string) => void;
  emptyMessage?: string;
  compact?: boolean;
  className?: string;
}

export function PaymentList({
  payments,
  onPaymentClick,
  onAction,
  emptyMessage = "No payments found",
  compact = false,
  className,
}: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div className={cn("text-center py-8 text-slate-500", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {payments.map((payment) => (
        <div
          key={payment.id}
          onClick={() => onPaymentClick?.(payment)}
          className={onPaymentClick ? "cursor-pointer" : undefined}
        >
          <PaymentCard
            payment={payment}
            onAction={onAction}
            compact={compact}
            showActions={!!onAction}
          />
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// PaymentTimeline - Payment status history
// =============================================================================

export interface TimelineEvent {
  id: string;
  type: string;
  status: PaymentStatus;
  timestamp: Date;
  message?: string;
}

export interface PaymentTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function PaymentTimeline({ events, className }: PaymentTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => {
        const styles = getStatusStyles(event.status);
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn("w-3 h-3 rounded-full", styles.bg, styles.border, "border-2")} />
              {!isLast && <div className="w-0.5 flex-1 bg-slate-700 my-1" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", styles.text)}>{event.type}</span>
                <span className="text-xs text-slate-500">
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {event.message && (
                <p className="text-sm text-slate-400 mt-1">{event.message}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// =============================================================================
// PaymentStats - Statistics display
// =============================================================================

export interface PaymentStatsData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
}

export interface PaymentStatsProps {
  stats: PaymentStatsData[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function PaymentStats({ stats, columns = 4, className }: PaymentStatsProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            {stat.icon}
            <span>{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
          {stat.change !== undefined && (
            <div
              className={cn(
                "text-xs mt-1",
                stat.change > 0 ? "text-emerald-400" : stat.change < 0 ? "text-red-400" : "text-slate-400"
              )}
            >
              {stat.change > 0 ? "+" : ""}
              {stat.change}% {stat.changeLabel}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// PaymentForm - Create payment form
// =============================================================================

export interface PaymentFormData {
  amount: number;
  currency: string;
  customerEmail?: string;
  customerName?: string;
  description?: string;
}

export interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  defaultCurrency?: string;
  currencies?: string[];
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function PaymentForm({
  onSubmit,
  defaultCurrency = "USD",
  currencies = ["USD", "EUR", "GBP", "ILS"],
  isLoading = false,
  error,
  className,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    currency: defaultCurrency,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      amount: Math.round(formData.amount * 100), // Convert to cents
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0.50"
            value={formData.amount || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((d) => ({ ...d, amount: parseFloat(e.target.value) || 0 }))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData((d) => ({ ...d, currency: e.target.value }))}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Customer Email
        </label>
        <input
          type="email"
          value={formData.customerEmail || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((d) => ({ ...d, customerEmail: e.target.value }))}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="customer@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Description
        </label>
        <input
          type="text"
          value={formData.description || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((d) => ({ ...d, description: e.target.value }))}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product or service"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || formData.amount <= 0}
        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {isLoading ? "Creating..." : `Create Payment`}
      </button>
    </form>
  );
}

// =============================================================================
// CheckoutButton - Quick checkout button
// =============================================================================

export interface CheckoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  amount: number;
  currency?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const CheckoutButton = forwardRef<HTMLButtonElement, CheckoutButtonProps>(
  (
    {
      amount,
      currency = "USD",
      label,
      variant = "primary",
      size = "md",
      isLoading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
      secondary: "bg-slate-700 hover:bg-slate-600 text-white",
      outline: "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "rounded-lg font-medium transition-colors flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )}
        {label || `Pay ${formatCurrency(amount, currency)}`}
      </button>
    );
  }
);

CheckoutButton.displayName = "CheckoutButton";

// =============================================================================
// LiveIndicator - Real-time connection status
// =============================================================================

export interface LiveIndicatorProps {
  isConnected: boolean;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export function LiveIndicator({
  isConnected,
  label,
  showLabel = true,
  className,
}: LiveIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"
        )}
      />
      {showLabel && (
        <span className="text-sm text-slate-400">
          {label || (isConnected ? "Live" : "Disconnected")}
        </span>
      )}
    </div>
  );
}

// =============================================================================
// CountdownTimer - Expiry countdown
// =============================================================================

export interface CountdownTimerProps {
  expiresAt: Date | string | null;
  onExpired?: () => void;
  className?: string;
}

export function CountdownTimer({ expiresAt, onExpired, className }: CountdownTimerProps) {
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
        onExpired?.();
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
  }, [expiresAt, onExpired]);

  if (!expiresAt) return null;

  return (
    <span
      className={cn(
        "font-mono",
        isExpired ? "text-red-400" : "text-yellow-400",
        className
      )}
    >
      {isExpired ? "⚠️ " : "⏱️ "}
      {timeLeft}
    </span>
  );
}

// =============================================================================
// Input Components
// =============================================================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-slate-300">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2 bg-slate-900 border rounded-lg text-white",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "placeholder-slate-500",
            error ? "border-red-500" : "border-slate-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

// =============================================================================
// CurrencyInput - Formatted currency input
// =============================================================================

export interface CurrencyInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: number;
  currency?: string;
  onChange: (value: number) => void;
}

export function CurrencyInput({
  value,
  currency = "USD",
  onChange,
  ...props
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState((value / 100).toFixed(2));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      setDisplayValue(raw);
      const cents = Math.round(parseFloat(raw || "0") * 100);
      onChange(cents);
    },
    [onChange]
  );

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₪"}
      </span>
      <Input
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        className="pl-8"
        {...props}
      />
    </div>
  );
}

// =============================================================================
// Export all components
// =============================================================================

export {
  formatCurrency,
  getStatusStyles,
  cn,
};
