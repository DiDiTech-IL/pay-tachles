"use client";

import Link from "next/link";
import { Suspense, useState, useTransition, useEffect } from "react";
import { Logo } from "@/components/ui/logo";

// ============================================================================
// Code Block with Copy and Tab Support
// ============================================================================
function Code({ children, lang = "typescript" }: { children: string; lang?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4">
            <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">{lang}</span>
                <button
                    onClick={copy}
                    className="p-1.5 rounded-md bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
            <pre className="bg-slate-900 border border-slate-800 rounded-xl p-4 pt-10 overflow-x-auto">
                <code className="text-sm font-mono text-slate-300 whitespace-pre">{children}</code>
            </pre>
        </div>
    );
}

// ============================================================================
// Tab Component
// ============================================================================
function Tabs({ tabs, children }: { tabs: string[]; children: React.ReactNode[] }) {
    const [active, setActive] = useState(0);

    return (
        <div className="my-6">
            <div className="flex border-b border-slate-800">
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActive(i)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${active === i
                                ? "text-indigo-400 border-b-2 border-indigo-400 -mb-px"
                                : "text-slate-400 hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="mt-4">{children[active]}</div>
        </div>
    );
}

// ============================================================================
// Alert/Callout
// ============================================================================
function Alert({ type, children }: { type: "info" | "warning" | "success"; children: React.ReactNode }) {
    const styles = {
        info: { bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "💡", text: "text-blue-300" },
        warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "⚠️", text: "text-amber-300" },
        success: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "✅", text: "text-emerald-300" },
    };
    const s = styles[type];
    return (
        <div className={`${s.bg} ${s.border} border rounded-xl p-4 my-4 flex gap-3`}>
            <span className="text-lg">{s.icon}</span>
            <div className={`${s.text} text-sm leading-relaxed`}>{children}</div>
        </div>
    );
}

// ============================================================================
// Code Examples
// ============================================================================

const examples = {
    // Basic TypeScript usage
    basicTs: `import { Effect } from "effect";
import {
  createInfraLayer,
  runWithInfra,
  Database,
} from "@tachles/core";

// Create infrastructure with in-memory providers (great for dev/testing)
const layer = createInfraLayer();

// Define your payment flow using Effect
const createPayment = Effect.gen(function* () {
  const db = yield* Database;

  // 1. Create or get your app (represents a merchant/integration)
  const app = yield* db.createApp({
    name: "My E-Commerce Store",
    provider: "stripe",
    apiKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    webhookUrl: "https://mystore.com/webhooks/stripe",
  });

  // 2. Create a payup (payment intent)
  const payup = yield* db.createPayup({
    appId: app.id,
    amount: 4999,           // $49.99 in cents
    currency: "USD",
    customerEmail: "customer@example.com",
    customerName: "John Doe",
    description: "Premium Plan - Monthly",
    returnUrl: "https://mystore.com/success",
    cancelUrl: "https://mystore.com/cancel",
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
  });

  console.log("Payment created:", payup.id);
  console.log("Checkout URL:", \`https://checkout.tachles.dev/\${payup.id}\`);

  return payup;
});

// Execute the effect with infrastructure
const payup = await runWithInfra(layer, createPayment);`,

    // Cloudflare Worker
    cloudflareWorker: `// worker.ts - Cloudflare Workers deployment
import { Effect } from "effect";
import {
  makeFetchRuntime,
  Database,
  createCloudflareKVStorage,
  createMemoryStorage,
  type CloudflareEnv,
} from "@tachles/core/adapters/cloudflare";

// Request body types
interface CreatePayupBody {
  amount: number;
  currency?: string;
  customerEmail?: string;
  description?: string;
}

// Create request-scoped runtime
const runtime = makeFetchRuntime({
  // Use KV for persistence, fallback to memory for dev
  makeStorage: (env) =>
    env.TACHLES_KV 
      ? createCloudflareKVStorage(env.TACHLES_KV) 
      : createMemoryStorage(),
});

// Define your API handler
const handler = (request: Request, _env: CloudflareEnv) =>
  Effect.gen(function* () {
    const url = new URL(request.url);
    const db = yield* Database;

    // POST /api/payups - Create a new payment
    if (url.pathname === "/api/payups" && request.method === "POST") {
      const body = (yield* Effect.promise(() => request.json())) as CreatePayupBody;
      
      const payup = yield* db.createPayup({
        appId: "default-app",
        amount: body.amount,
        currency: body.currency || "USD",
        customerEmail: body.customerEmail,
        description: body.description,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      });

      return Response.json(payup, { status: 201 });
    }

    // GET /api/payups/:id - Get payment status
    if (url.pathname.startsWith("/api/payups/") && request.method === "GET") {
      const id = url.pathname.split("/").pop()!;
      const payup = yield* db.getPayup(id);
      
      if (!payup) {
        return Response.json({ error: "Not found" }, { status: 404 });
      }
      
      return Response.json(payup);
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  });

// Export the worker
export default { fetch: runtime(handler) };`,

    // Node.js Server
    nodeServer: `// server.ts - Node.js HTTP server
import { Effect } from "effect";
import { startServer, Database } from "@tachles/core/adapters/node";

interface CreatePayupBody {
  amount: number;
  currency?: string;
  customerEmail?: string;
  description?: string;
}

const handler = (request: Request) =>
  Effect.gen(function* () {
    const url = new URL(request.url);
    const db = yield* Database;

    // Health check
    if (url.pathname === "/health") {
      return Response.json({ status: "ok", timestamp: new Date().toISOString() });
    }

    // Create payment
    if (url.pathname === "/api/payups" && request.method === "POST") {
      const body = (yield* Effect.promise(() => request.json())) as CreatePayupBody;
      
      const payup = yield* db.createPayup({
        appId: "default-app",
        amount: body.amount,
        currency: body.currency || "USD",
        customerEmail: body.customerEmail,
        description: body.description,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      });

      return Response.json(payup, { status: 201 });
    }

    // List payments
    if (url.pathname === "/api/payups" && request.method === "GET") {
      const payups = yield* db.listPayups();
      return Response.json(payups);
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  }).pipe(
    Effect.catchAll((error) =>
      Effect.succeed(Response.json({ error: String(error) }, { status: 500 }))
    )
  );

// Start the server
const PORT = parseInt(process.env.PORT || "3000");

startServer({ port: PORT, handler }).then(({ url }) => {
  console.log(\`🚀 Server running at \${url}\`);
});`,

    // React Hook
    reactHook: `// hooks/useTachles.ts
import { useState, useCallback } from "react";

interface Payup {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "completed" | "failed" | "expired";
  customerEmail?: string;
  description?: string;
  checkoutUrl?: string;
}

interface CreatePayupParams {
  amount: number;
  currency?: string;
  customerEmail?: string;
  description?: string;
}

interface UseTachlesOptions {
  baseUrl?: string;
  apiKey?: string;
}

export function useTachles(options: UseTachlesOptions = {}) {
  const { baseUrl = "/api", apiKey } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(apiKey && { Authorization: \`Bearer \${apiKey}\` }),
  };

  const createPayup = useCallback(async (params: CreatePayupParams): Promise<Payup | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`\${baseUrl}/payups\`, {
        method: "POST",
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      return await response.json();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, apiKey]);

  const getPayup = useCallback(async (id: string): Promise<Payup | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`\${baseUrl}/payups/\${id}\`, { headers });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      return await response.json();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }, [baseUrl, apiKey]);

  const listPayups = useCallback(async (): Promise<Payup[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`\${baseUrl}/payups\`, { headers });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      return await response.json();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseUrl, apiKey]);

  return {
    loading,
    error,
    createPayup,
    getPayup,
    listPayups,
  };
}`,

    // React Component
    reactComponent: `// components/CheckoutButton.tsx
"use client";

import { useState } from "react";
import { useTachles } from "../hooks/useTachles";

interface CheckoutButtonProps {
  amount: number;
  currency?: string;
  productName: string;
  customerEmail?: string;
  onSuccess?: (checkoutUrl: string) => void;
  onError?: (error: string) => void;
}

export function CheckoutButton({
  amount,
  currency = "USD",
  productName,
  customerEmail,
  onSuccess,
  onError,
}: CheckoutButtonProps) {
  const { createPayup, loading, error } = useTachles();
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const handleCheckout = async () => {
    const payup = await createPayup({
      amount,
      currency,
      customerEmail,
      description: productName,
    });

    if (payup) {
      const url = \`https://checkout.tachles.dev/\${payup.id}\`;
      setCheckoutUrl(url);
      onSuccess?.(url);
      
      // Redirect to checkout
      window.location.href = url;
    } else if (error) {
      onError?.(error);
    }
  };

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="relative px-6 py-3 bg-indigo-600 hover:bg-indigo-700 
                 disabled:bg-indigo-400 disabled:cursor-not-allowed
                 text-white font-medium rounded-lg transition-colors
                 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Pay {formattedAmount}
        </>
      )}
    </button>
  );
}`,

    // React Payment Form
    reactPaymentForm: `// components/PaymentForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useTachles } from "../hooks/useTachles";

interface PaymentFormProps {
  defaultAmount?: number;
  defaultCurrency?: string;
  onPaymentCreated?: (payupId: string) => void;
}

export function PaymentForm({
  defaultAmount = 1000,
  defaultCurrency = "USD",
  onPaymentCreated,
}: PaymentFormProps) {
  const { createPayup, loading, error } = useTachles();
  
  const [amount, setAmount] = useState(defaultAmount / 100);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    const payup = await createPayup({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customerEmail: email || undefined,
      description: description || undefined,
    });

    if (payup) {
      setSuccess(\`Payment \${payup.id} created successfully!\`);
      onPaymentCreated?.(payup.id);
      
      // Reset form
      setAmount(defaultAmount / 100);
      setEmail("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Amount
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 bg-slate-800 border border-r-0 border-slate-700 rounded-l-lg text-slate-400">
            $
          </span>
          <input
            type="number"
            step="0.01"
            min="0.50"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-r-lg 
                       text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Currency
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg 
                     text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="ILS">ILS - Israeli Shekel</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Customer Email (optional)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="customer@example.com"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg 
                     text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          Description (optional)
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product or service description"
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg 
                     text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 
                   disabled:bg-indigo-400 disabled:cursor-not-allowed
                   text-white font-medium rounded-lg transition-colors"
      >
        {loading ? "Creating Payment..." : "Create Payment"}
      </button>
    </form>
  );
}`,

    // Webhook Handler
    webhookHandler: `// api/webhooks/stripe/route.ts (Next.js App Router)
import { Effect } from "effect";
import { createInfraLayer, runWithInfra, Database } from "@tachles/core";
import { verifyWebhookSignature } from "@tachles/core";

const layer = createInfraLayer();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  const program = Effect.gen(function* () {
    const db = yield* Database;

    // Get the app to retrieve webhook secret
    const apps = yield* db.listApps();
    const app = apps.find((a) => a.provider === "stripe");

    if (!app) {
      return Response.json({ error: "App not found" }, { status: 404 });
    }

    // Verify webhook signature
    const isValid = yield* verifyWebhookSignature({
      payload: body,
      signature,
      secret: app.webhookSecret,
    });

    if (!isValid) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse and handle the event
    const event = JSON.parse(body);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        
        // Find and update the payup
        const payups = yield* db.listPayups({ appId: app.id });
        const payup = payups.find((p) => 
          p.providerPaymentId === paymentIntent.id
        );

        if (payup) {
          yield* db.updatePayup(payup.id, {
            status: "completed",
            providerData: paymentIntent,
          });
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        
        const payups = yield* db.listPayups({ appId: app.id });
        const payup = payups.find((p) => 
          p.providerPaymentId === paymentIntent.id
        );

        if (payup) {
          yield* db.updatePayup(payup.id, {
            status: "failed",
            providerData: paymentIntent,
          });
        }
        break;
      }
    }

    return Response.json({ received: true });
  });

  return runWithInfra(layer, program);
}`,

    // React 19 Hooks - use() with Suspense
    react19UseHook: `// Using React 19's use() hook with Suspense
import { Suspense } from "react";
import { usePaymentsData, usePaymentData, usePaymentStatsData } from "@tachles/core/react";

// Component that fetches payments - MUST be inside Suspense boundary
function PaymentsList() {
  // use() hook - throws promise, caught by Suspense
  const payments = usePaymentsData({ status: "completed", limit: 10 });
  
  return (
    <ul className="space-y-2">
      {payments.map(payment => (
        <li key={payment.id} className="flex justify-between">
          <span>{payment.customerEmail || "Anonymous"}</span>
          <span>\${(payment.amount / 100).toFixed(2)}</span>
        </li>
      ))}
    </ul>
  );
}

// Wrapper with Suspense boundary
function PaymentsPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading payments...</div>}>
      <PaymentsList />
    </Suspense>
  );
}`,

    // React 19 - useOptimistic
    react19Optimistic: `// Optimistic updates with React 19's useOptimistic
import { useOptimisticPayment, usePaymentActions } from "@tachles/core/react";

function PaymentCard({ payment }: { payment: Payment }) {
  // Optimistic state - immediately reflects changes while API catches up
  const [optimisticPayment, updatePayment] = useOptimisticPayment(payment);
  const { cancel, isPending, error } = usePaymentActions(payment.id);
  
  const handleCancel = async () => {
    // 1. Update UI immediately (optimistic)
    updatePayment({ status: "cancelled" });
    
    // 2. Actually cancel on server
    try {
      await cancel("User requested cancellation");
    } catch {
      // UI will revert automatically if this fails
    }
  };
  
  return (
    <div 
      className="p-4 rounded-lg border"
      style={{ opacity: optimisticPayment.isPending ? 0.7 : 1 }}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">\${(optimisticPayment.amount / 100).toFixed(2)}</span>
        <span className={\`px-2 py-1 rounded text-sm \${
          optimisticPayment.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
          optimisticPayment.status === "cancelled" ? "bg-slate-500/20 text-slate-400" :
          "bg-yellow-500/20 text-yellow-400"
        }\`}>
          {optimisticPayment.status}
        </span>
      </div>
      
      {optimisticPayment.status === "pending" && (
        <button 
          onClick={handleCancel}
          disabled={isPending}
          className="mt-2 text-sm text-red-400 hover:text-red-300"
        >
          {isPending ? "Cancelling..." : "Cancel Payment"}
        </button>
      )}
    </div>
  );
}`,

    // React 19 - useTransition
    react19Transition: `// Non-blocking mutations with useTransition
import { useCreatePayment } from "@tachles/core/react";

function CreatePaymentForm() {
  const { createPayment, isPending, error, lastCreated, reset } = useCreatePayment();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    // createPayment uses useTransition internally - UI stays responsive
    const payment = await createPayment({
      appId: "app_demo",
      amount: Number(form.get("amount")) * 100, // Convert to cents
      currency: "USD",
      customerEmail: String(form.get("email")),
      description: String(form.get("description")),
    });
    
    if (payment) {
      console.log("Created:", payment.id);
      e.currentTarget.reset();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="amount" type="number" placeholder="Amount" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="description" placeholder="Description" />
      
      <button 
        type="submit" 
        disabled={isPending}
        className="px-4 py-2 bg-indigo-600 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Payment"}
      </button>
      
      {error && <p className="text-red-400">{error.message}</p>}
      {lastCreated && (
        <p className="text-emerald-400">
          ✓ Created: {lastCreated.id}
        </p>
      )}
    </form>
  );
}`,

    // React 19 - useSyncExternalStore for realtime
    react19Realtime: `// Real-time updates with useSyncExternalStore
import { useRealtimePayments } from "@tachles/core/react";

function LiveDashboard() {
  // Connects to SSE endpoint, updates when events arrive
  const { payments, events, isConnected } = useRealtimePayments({
    appId: "app_demo", // Optional filter
  });
  
  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <span className={\`w-2 h-2 rounded-full \${
          isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"
        }\`} />
        <span className="text-sm text-slate-400">
          {isConnected ? "Connected - Live Updates" : "Disconnected"}
        </span>
      </div>
      
      {/* Live Payment Feed */}
      <div className="space-y-2">
        <h3 className="font-semibold">Recent Payments</h3>
        {payments.slice(0, 5).map(payment => (
          <div key={payment.id} className="flex justify-between p-2 bg-slate-800/50 rounded">
            <span>{payment.id.slice(0, 12)}...</span>
            <span className="text-emerald-400">
              \${(payment.amount / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Webhook Events */}
      <div className="space-y-2">
        <h3 className="font-semibold">Webhook Events</h3>
        {events.slice(0, 3).map(event => (
          <div key={event.id} className="text-sm text-slate-400">
            {event.type} - {event.paymentId.slice(0, 8)}...
          </div>
        ))}
      </div>
    </div>
  );
}`,

    // React 19 - Utility hooks
    react19Utilities: `// Utility hooks for formatting and status
import { 
  usePaymentStatus, 
  useFormatCurrency, 
  useRelativeTime,
  useCountdown 
} from "@tachles/core/react";

function PaymentDetails({ payment }: { payment: Payment }) {
  // Get all status info at once
  const { 
    status, 
    isTerminal, 
    isSuccess, 
    isPending,
    label, 
    color 
  } = usePaymentStatus(payment);
  
  // Format currency properly (handles cents, different currencies)
  const amount = useFormatCurrency(payment.amount, payment.currency);
  
  // Human-readable relative time
  const timeAgo = useRelativeTime(payment.createdAt);
  
  return (
    <div className="p-4 rounded-lg border border-slate-700">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold">{amount}</div>
          <div className="text-sm text-slate-400">{timeAgo}</div>
        </div>
        <span className={\`px-3 py-1 rounded-full text-sm \${color.bg} \${color.text}\`}>
          {label}
        </span>
      </div>
      
      {!isTerminal && <ExpiryTimer expiresAt={payment.expiresAt} />}
    </div>
  );
}

// Countdown for expiring payments
function ExpiryTimer({ expiresAt }: { expiresAt: Date | null }) {
  const { timeLeft, isExpired } = useCountdown(expiresAt);
  
  if (!expiresAt) return null;
  
  return (
    <div className={\`mt-3 text-sm \${isExpired ? "text-red-400" : "text-yellow-400"}\`}>
      {isExpired ? "⚠️ Expired" : \`⏱️ Expires in: \${timeLeft}\`}
    </div>
  );
}`,
};

// ============================================================================
// Live Demo Components for React 19 Hooks
// ============================================================================

// Types for demo
interface DemoPayment {
    id: string;
    amount: number;
    currency: string;
    status: "pending" | "processing" | "completed" | "failed" | "cancelled";
    customerEmail: string;
    createdAt: Date;
    expiresAt: Date;
}

// Helper to create initial demo payments
const createInitialPayments = (): DemoPayment[] => [
    { id: "pay_demo_1", amount: 4999, currency: "USD", status: "pending", customerEmail: "alice@demo.com", createdAt: new Date(), expiresAt: new Date(Date.now() + 30 * 60 * 1000) },
    { id: "pay_demo_2", amount: 2499, currency: "USD", status: "pending", customerEmail: "bob@demo.com", createdAt: new Date(), expiresAt: new Date(Date.now() + 25 * 60 * 1000) },
    { id: "pay_demo_3", amount: 9999, currency: "USD", status: "completed", customerEmail: "carol@demo.com", createdAt: new Date(Date.now() - 5 * 60 * 1000), expiresAt: new Date() },
];

// Simulated useOptimistic behavior
function OptimisticDemo() {
    const [payments, setPayments] = useState<DemoPayment[]>(createInitialPayments);
    const [pendingIds, setPendingIds] = useState<Set<string>>(() => new Set());

    const handleCancel = (id: string) => {
        // Optimistically update
        setPendingIds(prev => new Set(prev).add(id));
        setPayments(prev => prev.map(p =>
            p.id === id ? { ...p, status: "cancelled" as const } : p
        ));

        // Simulate API call that fails
        setTimeout(() => {
            // Revert on failure
            setPayments(prev => prev.map(p =>
                p.id === id ? { ...p, status: "pending" as const } : p
            ));
            setPendingIds(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }, 1500);
    };

    const resetDemo = () => {
        setPayments(createInitialPayments());
        setPendingIds(new Set());
    };

    return (
        <div className="space-y-3">
            {payments.map(payment => (
                <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                    style={{ opacity: pendingIds.has(payment.id) ? 0.6 : 1, transition: "opacity 0.2s" }}
                >
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 font-mono">{payment.id.slice(0, 12)}...</span>
                        <span className="text-white font-medium">${(payment.amount / 100).toFixed(2)}</span>
                        <span className="text-slate-400 text-sm">{payment.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${payment.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                                payment.status === "cancelled" ? "bg-slate-500/20 text-slate-400" :
                                    payment.status === "failed" ? "bg-red-500/20 text-red-400" :
                                        "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {payment.status}
                        </span>
                        {payment.status === "pending" && (
                            <button
                                onClick={() => handleCancel(payment.id)}
                                disabled={pendingIds.has(payment.id)}
                                className="px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button onClick={resetDemo} className="text-xs text-slate-500 hover:text-slate-400">
                Reset Demo
            </button>
        </div>
    );
}

// Simulated useTransition behavior  
function TransitionDemo() {
    const [isPending, startTransition] = useTransition();
    const [createdPayments, setCreatedPayments] = useState<DemoPayment[]>([]);
    const [formData, setFormData] = useState({ amount: "49.99", email: "demo@tachles.dev", description: "Test Payment" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newPayment: DemoPayment = {
                id: `pay_${Math.random().toString(36).slice(2, 10)}`,
                amount: Math.round(parseFloat(formData.amount) * 100),
                currency: "USD",
                status: "pending",
                customerEmail: formData.email,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 30 * 60 * 1000),
            };

            setCreatedPayments(prev => [newPayment, ...prev]);
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Amount ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Description</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {isPending && (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    )}
                    {isPending ? "Creating..." : "Create Payment"}
                </button>
            </form>

            <div className="space-y-2">
                <div className="text-xs text-slate-400 mb-2">Created Payments:</div>
                {createdPayments.length === 0 ? (
                    <div className="text-sm text-slate-500 italic">No payments yet. Try creating one!</div>
                ) : (
                    createdPayments.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg text-sm">
                            <span className="text-slate-400 font-mono">{p.id}</span>
                            <span className="text-emerald-400">${(p.amount / 100).toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Simulated Suspense demo
function SuspenseDemo() {
    const [key, setKey] = useState(0);

    return (
        <div className="space-y-4">
            <Suspense fallback={<SuspenseLoading />}>
                <SuspenseContent key={key} />
            </Suspense>
            <button
                onClick={() => setKey(k => k + 1)}
                className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
            >
                Reload Data
            </button>
        </div>
    );
}

function SuspenseLoading() {
    return (
        <div className="space-y-2 animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-slate-800/50 rounded-lg" />
            ))}
        </div>
    );
}

// This simulates the use() hook behavior
function SuspenseContent() {
    const [data, setData] = useState<DemoPayment[] | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setData([
                { id: "pay_sus_1", amount: 5999, currency: "USD", status: "completed", customerEmail: "user1@demo.com", createdAt: new Date(Date.now() - 2 * 60 * 1000), expiresAt: new Date() },
                { id: "pay_sus_2", amount: 3499, currency: "USD", status: "processing", customerEmail: "user2@demo.com", createdAt: new Date(Date.now() - 1 * 60 * 1000), expiresAt: new Date(Date.now() + 29 * 60 * 1000) },
                { id: "pay_sus_3", amount: 7999, currency: "USD", status: "pending", customerEmail: "user3@demo.com", createdAt: new Date(), expiresAt: new Date(Date.now() + 30 * 60 * 1000) },
            ]);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (!data) {
        // In real use() hook, this would throw a Promise
        return <SuspenseLoading />;
    }

    return (
        <div className="space-y-2">
            {data.map(payment => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 font-mono">{payment.id}</span>
                        <span className="text-white font-medium">${(payment.amount / 100).toFixed(2)}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${payment.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                            payment.status === "processing" ? "bg-blue-500/20 text-blue-400" :
                                "bg-yellow-500/20 text-yellow-400"
                        }`}>
                        {payment.status}
                    </span>
                </div>
            ))}
        </div>
    );
}
// Format currency
const formatCurrencyLocal = (amt: number, cur: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(amt / 100);
};

// Utility hooks demo
function UtilityHooksDemo() {
    const [now, setNow] = useState(() => new Date());
    const [expiresAt] = useState(() => new Date(Date.now() + 2 * 60 * 1000)); // 2 min from now
    const amount = 4999;
    const currency = "USD";
    const [createdAt] = useState(() => new Date(Date.now() - 3 * 60 * 1000)); // 3 min ago

    // Countdown effect
    const [countdown, setCountdown] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const update = () => {
            const diff = expiresAt.getTime() - Date.now();
            if (diff <= 0) {
                setIsExpired(true);
                setCountdown("Expired");
                return;
            }
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setCountdown(`${minutes}m ${seconds}s`);
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [expiresAt]);

    // Relative time
    const getRelativeTime = (date: Date) => {
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };


    // Update "now" every second for relative time
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">useFormatCurrency</div>
                <div className="text-2xl font-bold text-white">{formatCurrencyLocal(amount, currency)}</div>
                <div className="text-xs text-slate-400 mt-1">from {amount} cents</div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">useRelativeTime</div>
                <div className="text-2xl font-bold text-white">{getRelativeTime(createdAt)}</div>
                <div className="text-xs text-slate-400 mt-1">updates in real-time</div>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <div className="text-xs text-slate-500 mb-1">useCountdown</div>
                <div className={`text-2xl font-bold ${isExpired ? "text-red-400" : "text-yellow-400"}`}>
                    {countdown}
                </div>
                <div className="text-xs text-slate-400 mt-1">{isExpired ? "payment expired" : "until expiry"}</div>
            </div>
        </div>
    );
}

// ============================================================================
// Section Navigation
// ============================================================================
const sections = [
    { id: "installation", title: "Installation", icon: "📦" },
    { id: "typescript", title: "TypeScript Usage", icon: "🔷" },
    { id: "cloudflare", title: "Cloudflare Workers", icon: "⚡" },
    { id: "nodejs", title: "Node.js Server", icon: "🟢" },
    { id: "react19", title: "React 19 Hooks", icon: "⚛️" },
    { id: "react19-demo", title: "Live Hook Demos", icon: "🎮" },
    { id: "react-components", title: "React Components", icon: "🧩" },
    { id: "webhooks", title: "Webhook Handler", icon: "🔔" },
];

// ============================================================================
// Main Page
// ============================================================================
export default function ExamplesPage() {
    const [activeSection, setActiveSection] = useState("installation");
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Logo size="sm" />
                            <span className="text-slate-600">|</span>
                            <span className="text-sm font-medium text-slate-400">Code Examples</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/docs"
                                className="hidden sm:flex text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                API Docs
                            </Link>
                            <Link
                                href="/demo"
                                className="hidden sm:flex text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                Live Demo
                            </Link>
                            <button
                                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                                className="lg:hidden p-2 text-slate-400 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside
                        className={`
            ${mobileNavOpen ? "fixed inset-0 z-40 bg-slate-950 p-6 pt-20" : "hidden"} 
            lg:block lg:relative lg:bg-transparent lg:p-0 lg:w-56 lg:shrink-0
          `}
                    >
                        {mobileNavOpen && (
                            <button
                                onClick={() => setMobileNavOpen(false)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white lg:hidden"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <nav className="sticky top-24 space-y-1">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                        setMobileNavOpen(false);
                                    }}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section.id
                                            ? "bg-indigo-500/20 text-indigo-400"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                        }`}
                                >
                                    <span>{section.icon}</span>
                                    <span>{section.title}</span>
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <div className="prose prose-invert max-w-none">
                            {/* Hero */}
                            <div className="mb-12">
                                <h1 className="text-4xl font-bold text-white mb-4">Code Examples</h1>
                                <p className="text-lg text-slate-400">
                                    Complete, copy-paste ready examples for integrating @tachles/core into your applications.
                                </p>
                            </div>

                            {/* Installation */}
                            <section id="installation" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>📦</span> Installation
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Install the core package and its peer dependency:
                                </p>
                                <Code lang="bash">{`npm install @tachles/core effect`}</Code>

                                <Alert type="info">
                                    <strong>Effect-TS:</strong> Tachles uses Effect for type-safe error handling and dependency injection.
                                    If you&apos;re new to Effect, check out the{" "}
                                    <a href="https://effect.website" className="underline hover:text-white">
                                        official docs
                                    </a>
                                    .
                                </Alert>

                                <h3 className="text-lg font-semibold text-white mt-8 mb-3">Optional Dependencies</h3>
                                <Code lang="bash">{`# For Upstash Redis storage
npm install @upstash/redis

# For Cloudflare Workers types
npm install -D @cloudflare/workers-types`}</Code>
                            </section>

                            {/* TypeScript Usage */}
                            <section id="typescript" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>🔷</span> TypeScript Usage
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Basic usage with the Effect pattern. This example shows how to create apps and payment intents
                                    using the in-memory providers (perfect for development and testing).
                                </p>
                                <Code lang="typescript">{examples.basicTs}</Code>

                                <Alert type="success">
                                    <strong>Type Safety:</strong> All database operations return typed Effect values with explicit error types.
                                    TypeScript will catch issues at compile time!
                                </Alert>
                            </section>

                            {/* Cloudflare Workers */}
                            <section id="cloudflare" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>⚡</span> Cloudflare Workers
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Deploy a payment API to Cloudflare Workers with KV storage. The runtime handles request-scoped
                                    dependency injection automatically.
                                </p>
                                <Code lang="typescript">{examples.cloudflareWorker}</Code>

                                <h3 className="text-lg font-semibold text-white mt-8 mb-3">wrangler.toml</h3>
                                <Code lang="toml">{`name = "tachles-api"
main = "src/worker.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "TACHLES_KV"
id = "your-kv-namespace-id"`}</Code>
                            </section>

                            {/* Node.js */}
                            <section id="nodejs" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>🟢</span> Node.js Server
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Run a standalone HTTP server using Node.js. Great for self-hosting or containerized deployments.
                                </p>
                                <Code lang="typescript">{examples.nodeServer}</Code>
                            </section>

                            {/* React 19 Hooks */}
                            <section id="react19" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>⚛️</span> React 19 Hooks
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Modern React hooks using <strong>React 19 features</strong>: <code className="text-indigo-400">use()</code>,
                                    <code className="text-indigo-400 ml-1">useOptimistic</code>, and <code className="text-indigo-400 ml-1">useTransition</code>.
                                    These hooks require React 19.x.
                                </p>

                                <Alert type="info">
                                    <strong>React 19 Required:</strong> Install React 19 to use these hooks:
                                    <code className="block mt-2 bg-slate-800 px-2 py-1 rounded">npm install react@^19 @tachles/core</code>
                                </Alert>

                                <Tabs tabs={["use() + Suspense", "useOptimistic", "useTransition", "Real-time", "Utilities"]}>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Data Fetching with <code className="text-indigo-400">use()</code></h4>
                                        <p className="text-slate-400 mb-4">
                                            React 19&apos;s <code className="text-indigo-400">use()</code> hook suspends rendering while data loads.
                                            Wrap components in <code className="text-indigo-400">&lt;Suspense&gt;</code> to show loading states.
                                        </p>
                                        <Code lang="typescript">{examples.react19UseHook}</Code>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Optimistic Updates with <code className="text-indigo-400">useOptimistic</code></h4>
                                        <p className="text-slate-400 mb-4">
                                            Show instant UI feedback while the server processes. If the request fails, the UI automatically reverts.
                                        </p>
                                        <Code lang="typescript">{examples.react19Optimistic}</Code>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Non-blocking Mutations with <code className="text-indigo-400">useTransition</code></h4>
                                        <p className="text-slate-400 mb-4">
                                            Keep your UI responsive during async operations. The form stays interactive while creating payments.
                                        </p>
                                        <Code lang="typescript">{examples.react19Transition}</Code>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Real-time Updates with <code className="text-indigo-400">useSyncExternalStore</code></h4>
                                        <p className="text-slate-400 mb-4">
                                            Subscribe to Server-Sent Events for live payment updates. The hook handles connection and reconnection.
                                        </p>
                                        <Code lang="typescript">{examples.react19Realtime}</Code>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mt-4 mb-3">Utility Hooks</h4>
                                        <p className="text-slate-400 mb-4">
                                            Helper hooks for formatting, status checks, and countdown timers.
                                        </p>
                                        <Code lang="typescript">{examples.react19Utilities}</Code>
                                    </div>
                                </Tabs>
                            </section>

                            {/* React 19 Live Demos */}
                            <section id="react19-demo" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>🎮</span> Live Hook Demos
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Interactive demos showing the React 19 hooks in action. These demos use simulated data
                                    to demonstrate the hook patterns without requiring a backend.
                                </p>

                                <div className="space-y-8">
                                    {/* Optimistic Update Demo */}
                                    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <span className="text-indigo-400">useOptimistic</span> Demo
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Click &quot;Cancel&quot; to see optimistic UI update instantly, then revert after 1.5s (simulated failure).
                                        </p>
                                        <OptimisticDemo />
                                    </div>

                                    {/* Transition Demo */}
                                    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <span className="text-indigo-400">useTransition</span> Demo
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Create payments with non-blocking UI. The form stays responsive during submission.
                                        </p>
                                        <TransitionDemo />
                                    </div>

                                    {/* Suspense Demo */}
                                    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <span className="text-indigo-400">use() + Suspense</span> Demo
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Click &quot;Reload&quot; to see Suspense fallback while data loads.
                                        </p>
                                        <SuspenseDemo />
                                    </div>

                                    {/* Utility Hooks Demo */}
                                    <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            <span className="text-indigo-400">Utility Hooks</span> Demo
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Live countdown timer and dynamic formatting.
                                        </p>
                                        <UtilityHooksDemo />
                                    </div>
                                </div>

                                <Alert type="success">
                                    <strong>Try the Full Demo:</strong> Check out the{" "}
                                    <Link href="/demo" className="underline hover:text-white">Live Demo Dashboard</Link>{" "}
                                    to see all these patterns working together with simulated payment data.
                                </Alert>
                            </section>

                            {/* React Components */}
                            <section id="react-components" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>🧩</span> React Components
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Ready-to-use React components for common payment flows.
                                </p>

                                <Tabs tabs={["Checkout Button", "Payment Form"]}>
                                    <div>
                                        <p className="text-slate-400 mb-4">
                                            A simple checkout button that creates a payment and redirects to the hosted checkout page.
                                        </p>
                                        <Code lang="typescript">{examples.reactComponent}</Code>

                                        <h4 className="text-md font-semibold text-white mt-6 mb-3">Usage</h4>
                                        <Code lang="tsx">{`<CheckoutButton
  amount={4999}
  currency="USD"
  productName="Premium Plan"
  customerEmail="customer@example.com"
  onSuccess={(url) => console.log("Redirecting to:", url)}
  onError={(err) => console.error("Payment failed:", err)}
/>`}</Code>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 mb-4">
                                            A complete payment form with amount, currency, and customer details.
                                        </p>
                                        <Code lang="typescript">{examples.reactPaymentForm}</Code>
                                    </div>
                                </Tabs>
                            </section>

                            {/* Webhooks */}
                            <section id="webhooks" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span>🔔</span> Webhook Handler
                                </h2>
                                <p className="text-slate-400 mb-4">
                                    Handle incoming webhooks from payment providers like Stripe. This example shows a Next.js App Router
                                    implementation with signature verification.
                                </p>
                                <Code lang="typescript">{examples.webhookHandler}</Code>

                                <Alert type="warning">
                                    <strong>Security:</strong> Always verify webhook signatures to prevent replay attacks.
                                    Never trust webhook payloads without verification!
                                </Alert>
                            </section>

                            {/* Footer CTA */}
                            <div className="mt-16 p-8 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20">
                                <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
                                <p className="text-slate-400 mb-4">
                                    Check out the full API documentation or try the live demo to see the package in action.
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href="/docs"
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        API Documentation
                                    </Link>
                                    <Link
                                        href="/demo"
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Live Demo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
