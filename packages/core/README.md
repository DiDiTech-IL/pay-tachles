# @tachles/core

An unopinionated, runtime-agnostic payment management toolkit built with [Effect-TS](https://effect.website/).

## Features

- 🔌 **Provider-Agnostic**: Swap database and storage providers without changing your code
- 🌐 **Runtime-Agnostic**: Works on Node.js, Cloudflare Workers, Deno, Bun, and more
- 🏗️ **Type-Safe**: Built with Effect-TS for robust error handling and dependency injection
- 🧩 **Modular**: Use only what you need, compose your own stack
- ⚡ **Zero Lock-in**: In-memory providers included for development and testing

## Installation

```bash
npm install @tachles/core effect
```

## Quick Start

### Basic Usage (In-Memory)

```typescript
import { Effect } from "effect";
import {
  createInfraLayer,
  runWithInfra,
  Database,
  createMemoryDatabase,
} from "@tachles/core";

// Create infrastructure with in-memory providers
const layer = createInfraLayer();

// Define your Effect program
const program = Effect.gen(function* () {
  const db = yield* Database;
  
  // Create an app (payment provider integration)
  const app = yield* db.createApp({
    name: "My Store",
    provider: "stripe",
    apiKey: "sk_test_...",
    webhookSecret: "whsec_...",
    webhookUrl: "https://mystore.com/webhooks",
  });

  // Create a payup (payment intent)
  const payup = yield* db.createPayup({
    appId: app.id,
    amount: 2999, // $29.99 in cents
    currency: "USD",
    customerEmail: "customer@example.com",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  return { app, payup };
});

// Run with infrastructure
const result = await runWithInfra(layer, program);
console.log(result);
```

## Cloudflare Workers

The Cloudflare adapter provides request-scoped runtime management, which is essential because Cloudflare Workers only provides env bindings at request time.

```typescript
// worker.ts
import { Effect } from "effect";
import {
  makeFetchRuntime,
  Database,
  createCloudflareKVStorage,
} from "@tachles/core/adapters/cloudflare";

// Create request-scoped runtime
const runtime = makeFetchRuntime({
  makeStorage: (env) => 
    env.TACHLES_KV ? createCloudflareKVStorage(env.TACHLES_KV) : undefined,
});

// Define your handler
export default {
  fetch: runtime((request, env) =>
    Effect.gen(function* () {
      const url = new URL(request.url);
      const db = yield* Database;

      if (url.pathname === "/apps") {
        const apps = yield* db.listApps();
        return new Response(JSON.stringify(apps), {
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response("Not Found", { status: 404 });
    })
  ),
};
```

### wrangler.toml

```toml
name = "tachles-api"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "TACHLES_KV"
id = "your-kv-namespace-id"
```

## Node.js

```typescript
// server.ts
import { Effect } from "effect";
import { startServer, Database } from "@tachles/core/adapters/node";

const handler = (request: Request) =>
  Effect.gen(function* () {
    const url = new URL(request.url);
    const db = yield* Database;

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/apps" && request.method === "GET") {
      const apps = yield* db.listApps();
      return new Response(JSON.stringify(apps), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  });

startServer({
  port: 3000,
  handler,
}).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
```

## Custom Database Provider

You can implement your own database provider for PostgreSQL, MySQL, MongoDB, etc:

```typescript
import { Effect } from "effect";
import type { DatabaseProvider } from "@tachles/core";
import { DbError } from "@tachles/core";

export const createPostgresDatabase = (pool: Pool): DatabaseProvider => ({
  connect: () => Effect.tryPromise({
    try: () => pool.connect(),
    catch: (e) => new DbError({ operation: "connect", cause: e }),
  }),
  
  disconnect: () => Effect.tryPromise({
    try: () => pool.end(),
    catch: (e) => new DbError({ operation: "disconnect", cause: e }),
  }),
  
  isConnected: () => pool.totalCount > 0,

  getAppByApiKey: (apiKey) =>
    Effect.tryPromise({
      try: async () => {
        const result = await pool.query(
          "SELECT * FROM apps WHERE api_key = $1",
          [apiKey]
        );
        return result.rows[0] || null;
      },
      catch: (e) => new DbError({ operation: "getAppByApiKey", cause: e }),
    }),

  // ... implement other methods
});
```

## Custom Storage Provider (Redis/Upstash)

```typescript
import { Effect } from "effect";
import { Redis } from "@upstash/redis";
import type { StorageProvider } from "@tachles/core";
import { StorageError } from "@tachles/core";

export const createUpstashStorage = (redis: Redis): StorageProvider => ({
  get: <T>(key: string) =>
    Effect.tryPromise({
      try: () => redis.get<T>(key),
      catch: (e) => new StorageError({ operation: "get", key, cause: e }),
    }),

  set: <T>(key: string, value: T, ttlSeconds?: number) =>
    Effect.tryPromise({
      try: async () => {
        if (ttlSeconds) {
          await redis.setex(key, ttlSeconds, JSON.stringify(value));
        } else {
          await redis.set(key, JSON.stringify(value));
        }
      },
      catch: (e) => new StorageError({ operation: "set", key, cause: e }),
    }),

  // ... implement other methods
});
```

## Domain Types

### App (Payment Provider Integration)

```typescript
interface App {
  id: string;
  name: string;
  provider: string;      // "stripe", "paypal", etc.
  apiKey: string;
  webhookSecret: string;
  webhookUrl: string;
  isActive: boolean;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Payup (Payment Intent)

```typescript
interface Payup {
  id: string;
  appId: string;
  amount: number;        // In smallest currency unit (cents)
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "expired";
  customerEmail: string | null;
  customerName: string | null;
  customerId: string | null;
  description: string | null;
  returnUrl: string | null;
  cancelUrl: string | null;
  metadata: Record<string, unknown> | null;
  expiresAt: Date;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction

```typescript
interface Transaction {
  id: string;
  appId: string;
  payupId: string;
  externalId: string | null;  // Provider's transaction ID
  amount: number;
  currency: string;
  status: "completed" | "failed" | "refunded" | "disputed";
  fees: number | null;
  netAmount: number | null;
  // ... more fields
}
```

## Error Handling

All errors are tagged unions for exhaustive pattern matching:

```typescript
import { Effect } from "effect";
import { DbError, AppNotFoundError, toHttpError } from "@tachles/core";

const program = Effect.gen(function* () {
  const db = yield* Database;
  const app = yield* db.getAppByApiKey("invalid-key");
  
  if (!app) {
    return yield* Effect.fail(new AppNotFoundError({ apiKey: "invalid-key" }));
  }
  
  return app;
}).pipe(
  Effect.catchTag("DbError", (e) => {
    console.error("Database error:", e.operation);
    return Effect.fail(toHttpError(e));
  }),
  Effect.catchTag("AppNotFoundError", (e) => {
    return Effect.fail(toHttpError(e)); // Returns 401
  })
);
```

## Webhook Security

```typescript
import {
  createWebhookSignature,
  verifyWebhookSignature,
} from "@tachles/core";

// Creating a signature (when sending webhooks)
const payload = JSON.stringify({ event: "payment.completed", data: {} });
const sig = await Effect.runPromise(
  createWebhookSignature(payload, webhookSecret)
);
// sig = { timestamp: 1234567890, signature: "abc123..." }
// Header: X-Webhook-Signature: t=1234567890,v1=abc123...

// Verifying a signature (when receiving webhooks)
const isValid = await Effect.runPromise(
  verifyWebhookSignature(payload, signature, timestamp, webhookSecret)
);
```

## Cloud Deployment

### Cloudflare Workers

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create KV namespace
wrangler kv:namespace create TACHLES_KV

# Deploy
wrangler deploy
```

### Docker (Node.js)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Fly.io

```bash
fly launch
fly deploy
```

### Railway / Render / Heroku

Standard Node.js deployment. Set `PORT` environment variable.

## Stats Module

Get payment analytics and aggregations:

```typescript
import { 
  calculatePayupStats,
  getPayupStatusBreakdown,
  groupByPeriod,
  getPaymentStats, // Effect-based
} from "@tachles/core";

// Pure functions (work with any data)
const stats = calculatePayupStats(payups);
console.log(stats.totalRevenue, stats.successRate);

const breakdown = getPayupStatusBreakdown(payups);
// [{ status: "completed", count: 10, percentage: 80, totalAmount: 50000 }, ...]

const byDay = groupByPeriod(transactions, "day");
// [{ period: "2024-01-15", revenue: 10000, count: 5, avgAmount: 2000 }, ...]

// Effect-based (uses Database service)
const program = Effect.gen(function* () {
  const stats = yield* getPaymentStats({ appId: "app_123" });
  return stats;
});
```

## Operations Module

High-level payment workflows:

```typescript
import {
  createPayment,
  completePayment,
  failPayment,
  cancelPayment,
  refundPayment,
  getPaymentWithTransaction,
} from "@tachles/core";

const program = Effect.gen(function* () {
  // Create a payment
  const payup = yield* createPayment({
    appId: "app_123",
    amount: 1999,
    customerEmail: "customer@example.com",
    description: "Pro Plan",
    expiresInMinutes: 30,
  });

  // Complete the payment
  const { payup: completed, transaction } = yield* completePayment({
    payupId: payup.id,
    externalId: "stripe_pi_xxx",
    fees: 58, // Provider fees in cents
  });

  // Or handle failure
  const failed = yield* failPayment({
    payupId: payup.id,
    reason: "Card declined",
  });

  // Refund a transaction
  const refunded = yield* refundPayment({
    transactionId: transaction.id,
    reason: "Customer requested",
  });
});
```

## React 19 Hooks

Modern React hooks using React 19 features (`use()`, `useOptimistic`, `useTransition`). Requires **React 19.x**.

```bash
npm install @tachles/core react@^19
```

### Configuration

```tsx
import { configureTachles } from "@tachles/core/react";

// Configure the API endpoint globally
configureTachles({
  apiUrl: "/api",
  apiKey: "your-api-key", // Optional
  onError: (error) => console.error(error),
});
```

### Data Fetching with `use()` (Suspense)

These hooks use React 19's `use()` hook and must be wrapped in a `<Suspense>` boundary:

```tsx
import { Suspense } from "react";
import {
  usePaymentsData,
  usePaymentData,
  usePaymentStatsData,
} from "@tachles/core/react";

// Fetch payments list
function PaymentsList() {
  const payments = usePaymentsData({ status: "completed", limit: 20 });
  
  return (
    <ul>
      {payments.map(p => (
        <li key={p.id}>${(p.amount / 100).toFixed(2)} - {p.status}</li>
      ))}
    </ul>
  );
}

// Single payment
function PaymentDetails({ paymentId }: { paymentId: string }) {
  const { payment, transaction } = usePaymentData(paymentId);
  
  return (
    <div>
      <p>Amount: ${(payment.amount / 100).toFixed(2)}</p>
      <p>Status: {payment.status}</p>
      {transaction && <p>Fees: ${(transaction.fees ?? 0 / 100).toFixed(2)}</p>}
    </div>
  );
}

// Stats
function PaymentDashboard() {
  const stats = usePaymentStatsData({ appId: "app_123" });
  
  return (
    <div>
      <p>Revenue: ${(stats.totalRevenue / 100).toFixed(2)}</p>
      <p>Success Rate: {(stats.successRate * 100).toFixed(1)}%</p>
    </div>
  );
}

// Always wrap in Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentsList />
    </Suspense>
  );
}
```

### Optimistic Updates with `useOptimistic`

```tsx
import { useOptimisticPayment, useOptimisticPayments } from "@tachles/core/react";

// Single payment optimistic update
function PaymentCard({ payment }: { payment: Payment }) {
  const [optimisticPayment, updatePayment] = useOptimisticPayment(payment);
  
  const handleCancel = async () => {
    updatePayment({ status: "cancelled" }); // Optimistic update
    await cancelPaymentAPI(payment.id);     // Actual API call
  };
  
  return (
    <div style={{ opacity: optimisticPayment.isPending ? 0.7 : 1 }}>
      <p>Status: {optimisticPayment.status}</p>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

// List optimistic updates
function PaymentsList({ payments }: { payments: Payment[] }) {
  const [optimisticPayments, updatePayments] = useOptimisticPayments(payments);
  
  const handleAdd = async (newPayment: Payment) => {
    updatePayments({ type: "add", payment: newPayment });
    await createPaymentAPI(newPayment);
  };
  
  return (
    <ul>
      {optimisticPayments.map(p => (
        <li key={p.id} style={{ opacity: p.isPending ? 0.7 : 1 }}>
          {p.amount}
        </li>
      ))}
    </ul>
  );
}
```

### Mutations with `useTransition`

```tsx
import { useCreatePayment, usePaymentActions } from "@tachles/core/react";

// Create payments
function CreatePaymentForm() {
  const { createPayment, isPending, error, lastCreated } = useCreatePayment();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payment = await createPayment({
      appId: "app_123",
      amount: 1999,
      customerEmail: "customer@example.com",
    });
    console.log("Created:", payment.id);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={isPending}>
        {isPending ? "Creating..." : "Create Payment"}
      </button>
      {error && <p className="error">{error.message}</p>}
      {lastCreated && <p>Created: {lastCreated.id}</p>}
    </form>
  );
}

// Payment actions (cancel, refund)
function PaymentActions({ paymentId }: { paymentId: string }) {
  const { cancel, refund, isPending, error } = usePaymentActions(paymentId);
  
  return (
    <div>
      <button onClick={() => cancel("User requested")} disabled={isPending}>
        Cancel
      </button>
      <button onClick={() => refund()} disabled={isPending}>
        Refund
      </button>
      {error && <p>{error.message}</p>}
    </div>
  );
}
```

### Real-time Updates with `useSyncExternalStore`

```tsx
import { useRealtimePayments } from "@tachles/core/react";

function LivePaymentFeed() {
  const { payments, events, isConnected } = useRealtimePayments({
    appId: "app_123", // Optional filter
  });
  
  return (
    <div>
      <span className={isConnected ? "text-green-500" : "text-red-500"}>
        {isConnected ? "🟢 Live" : "🔴 Disconnected"}
      </span>
      
      <h3>Recent Payments</h3>
      <ul>
        {payments.slice(0, 10).map(p => (
          <li key={p.id}>{p.id} - {p.status}</li>
        ))}
      </ul>
      
      <h3>Webhook Events</h3>
      <ul>
        {events.slice(0, 5).map(e => (
          <li key={e.id}>{e.type} - {e.paymentId}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Utility Hooks

```tsx
import {
  usePaymentStatus,
  useFormatCurrency,
  useRelativeTime,
  useCountdown,
} from "@tachles/core/react";

function PaymentDisplay({ payment }: { payment: Payment }) {
  // Status helpers
  const { status, isTerminal, isSuccess, label, color } = usePaymentStatus(payment);
  
  // Currency formatting
  const formattedAmount = useFormatCurrency(payment.amount, payment.currency);
  
  // Relative time
  const timeAgo = useRelativeTime(payment.createdAt);
  
  return (
    <div className={color.bg}>
      <span className={color.text}>{label}</span>
      <p>{formattedAmount}</p>
      <p>{timeAgo}</p>
    </div>
  );
}

// Countdown timer (for expiring payments)
function ExpiryTimer({ expiresAt }: { expiresAt: Date }) {
  const { timeLeft, isExpired } = useCountdown(expiresAt);
  
  return (
    <span className={isExpired ? "text-red-500" : "text-yellow-500"}>
      {isExpired ? "Expired" : `Expires in: ${timeLeft}`}
    </span>
  );
}
```

### Cache Invalidation

```tsx
import { invalidateCache } from "@tachles/core/react";

// Invalidate specific cache
invalidateCache("payments");
invalidateCache("payment:pay_123");

// Invalidate all
invalidateCache();
```

## Components Module

Pre-built React components for payment UIs:

```tsx
import {
  PaymentBadge,
  PaymentCard,
  PaymentList,
  PaymentAmount,
  PaymentTimeline,
  PaymentForm,
  PaymentStats,
  CurrencyInput,
  Button,
  Input,
  Card,
  formatCurrency,
} from "@tachles/core/components";

// Payment status badge
function StatusIndicator({ status }) {
  return <PaymentBadge status={status} size="md" />;
}

// Payment card component
function PaymentItem({ payment }) {
  return (
    <PaymentCard
      payment={payment}
      onAction={(action, id) => console.log(action, id)}
    />
  );
}

// Payment list with filtering
function PaymentDashboard({ payments }) {
  return (
    <PaymentList
      payments={payments}
      onPaymentClick={(p) => console.log("Clicked:", p.id)}
      filter={{ status: "pending" }}
    />
  );
}

// Amount display with currency formatting
function AmountDisplay({ payment }) {
  return (
    <PaymentAmount
      amount={payment.amount}
      currency={payment.currency}
      showSymbol
    />
  );
}

// Payment creation form
function CreatePayment({ appId, onSuccess }) {
  const handleCreate = async (data) => {
    const response = await fetch("/api/payments", {
      method: "POST",
      body: JSON.stringify(data),
    });
    onSuccess(await response.json());
  };
  
  return (
    <PaymentForm
      appId={appId}
      onSubmit={handleCreate}
      currencies={["USD", "EUR", "GBP", "ILS"]}
    />
  );
}

// Stats card
function RevenueCard({ stats }) {
  return (
    <PaymentStats
      title="Total Revenue"
      value={formatCurrency(stats.totalRevenue, "USD")}
      trend={{ value: 12.5, isPositive: true }}
    />
  );
}

// Currency input with formatting
function AmountInput({ value, onChange }) {
  return (
    <CurrencyInput
      value={value}
      currency="USD"
      onChange={onChange}
      placeholder="0.00"
    />
  );
}
```

## Client Module

A standalone API client for communicating with Tachles backend:

```typescript
import {
  TachlesClient,
  createTachlesClient,
  initTachlesClient,
  getTachlesClient,
} from "@tachles/core/client";

// Create a client instance
const client = createTachlesClient({
  baseUrl: "https://api.yoursite.com",
  apiKey: "your-api-key",
  appId: "app_123",
  timeout: 30000,
  onError: (error) => console.error(error),
});

// Or use singleton pattern
initTachlesClient({ baseUrl: "https://api.yoursite.com" });
const client = getTachlesClient();

// Payment operations
const payment = await client.createPayment({
  amount: 1999,
  currency: "USD",
  customerEmail: "customer@example.com",
  description: "Pro subscription",
});

const payments = await client.listPayments(
  { status: ["pending", "processing"], minAmount: 1000 },
  { page: 1, limit: 20 }
);

await client.cancelPayment(payment.id, "Customer requested");

const { payment: completed, transaction } = await client.completePayment(
  payment.id,
  { externalId: "stripe_pi_xxx", fees: 58 }
);

// Transaction operations
const transactions = await client.listTransactions(
  { status: "completed" },
  { limit: 50 }
);

// Statistics
const stats = await client.getStats({ from: new Date("2024-01-01") });
const revenue = await client.getRevenueTimeSeries({ groupBy: "day" });

// Real-time subscriptions (SSE)
const unsubscribe = client.subscribeToEvents({
  onPaymentCreated: (payment) => console.log("New payment:", payment),
  onPaymentUpdated: (payment) => console.log("Updated:", payment),
  onConnect: () => console.log("Connected"),
  onDisconnect: () => console.log("Disconnected"),
});

// Cleanup
unsubscribe();
```

## Database Hooks Module

React 19 hooks with built-in caching and optimistic updates for database operations:

```tsx
import {
  // Configuration
  initDatabase,
  
  // Query hooks
  usePayments,
  usePayment,
  useTransactions,
  useTransaction,
  usePaymentStats,
  useRevenueTimeSeries,
  useApp,
  useWebhookEvents,
  
  // Mutation hooks
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useCancelPaymentMutation,
  useCompletePaymentMutation,
  useRefundPaymentMutation,
  useUpdateAppMutation,
  useRetryWebhookMutation,
  
  // Advanced hooks
  usePaymentSearch,
  usePaymentAggregation,
  useBatchPaymentUpdate,
  useOptimisticPayments,
  useRealtimeSubscription,
  
  // Cache utilities
  useInvalidateCache,
  useClearCache,
  usePrefetch,
  
  // React 19 Suspense
  createPaymentResource,
  usePaymentSuspense,
} from "@tachles/core/db-hooks";

// Initialize the database connection
initDatabase({
  baseUrl: "https://api.yoursite.com",
  apiKey: "your-api-key",
  enableCache: true,
  cacheTime: 5 * 60 * 1000, // 5 minutes
  staleTime: 30 * 1000,     // 30 seconds
});

// Query payments with automatic caching
function PaymentsList() {
  const { data, isLoading, error, refetch } = usePayments({
    status: "pending",
    limit: 20,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data?.map(p => <li key={p.id}>{p.id}</li>)}
      <button onClick={refetch}>Refresh</button>
    </ul>
  );
}

// Create payment with mutation
function CreatePaymentButton() {
  const { mutateAsync, isPending, error } = useCreatePaymentMutation({
    onSuccess: (payment) => console.log("Created:", payment.id),
  });
  
  const handleCreate = async () => {
    await mutateAsync({
      amount: 1999,
      customerEmail: "test@example.com",
    });
  };
  
  return (
    <button onClick={handleCreate} disabled={isPending}>
      {isPending ? "Creating..." : "Create Payment"}
    </button>
  );
}

// Search with debouncing
function PaymentSearch() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = usePaymentSearch(query, { debounceMs: 300 });
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search payments..."
      />
      {isLoading && <span>Searching...</span>}
      <ul>
        {data?.map(p => <li key={p.id}>{p.id}</li>)}
      </ul>
    </div>
  );
}

// Aggregation for charts
function RevenueChart() {
  const { data } = usePaymentAggregation("day", {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  });
  
  return (
    <div>
      {data?.map(d => (
        <div key={d.group}>
          {d.group}: ${d.amount / 100} ({d.count} payments)
        </div>
      ))}
    </div>
  );
}

// Optimistic updates
function OptimisticPaymentList({ initialPayments }) {
  const { payments, addPayment, updatePayment, removePayment } =
    useOptimisticPayments(initialPayments);
  
  return (
    <ul>
      {payments.map(p => (
        <li key={p.id}>
          {p.id}
          <button onClick={() => updatePayment({ ...p, status: "cancelled" })}>
            Cancel
          </button>
        </li>
      ))}
    </ul>
  );
}

// Real-time subscription
function LivePayments() {
  const { isConnected } = useRealtimeSubscription({
    onPaymentCreated: (p) => console.log("New:", p),
    onPaymentUpdated: (p) => console.log("Updated:", p),
  });
  
  return <span>{isConnected ? "🟢 Live" : "🔴 Offline"}</span>;
}

// React 19 Suspense pattern
function PaymentWithSuspense({ id }) {
  const promise = useMemo(() => createPaymentResource(id, getConfig()), [id]);
  const payment = usePaymentSuspense(promise);
  
  return <div>{payment.id}: ${payment.amount / 100}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading payment...</div>}>
      <PaymentWithSuspense id="pay_123" />
    </Suspense>
  );
}
```

## Utilities Module

Helper functions for common operations:

```typescript
import {
  formatCurrency,
  parseCurrency,
  isTerminalStatus,
  getStatusLabel,
  getStatusColor,
  formatRelativeTime,
  getTimeUntilExpiry,
  validatePaymentInput,
  sortByDate,
  groupBy,
} from "@tachles/core";

// Currency formatting
formatCurrency(1999, "USD");  // "$19.99"
formatCurrency(1999, "EUR");  // "€19.99"
formatCurrency(1999, "JPY");  // "¥1,999"

// Status helpers
isTerminalStatus("completed");  // true
isTerminalStatus("processing"); // false
getStatusLabel("completed");    // "Completed"
getStatusColor("completed");    // { bg: "bg-emerald-500/10", text: "text-emerald-500", ... }

// Time utilities
formatRelativeTime(new Date(Date.now() - 60000)); // "1m ago"
getTimeUntilExpiry(expiresAt); // { isExpired: false, timeLeft: "29m 45s", seconds: 1785 }

// Validation
const { valid, errors } = validatePaymentInput({
  amount: 1999,
  currency: "USD",
  customerEmail: "test@example.com",
});

// Sorting & grouping
const sorted = sortByDate(payments, "desc");
const byStatus = groupBy(payments, p => p.status);
```

## License

MIT
