"use client";

import Link from "next/link";
import { useState } from "react";

// =============================================================================
// Design System Components - Clean, Professional, Trustworthy
// =============================================================================

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 bg-stone-100 text-stone-700 rounded text-sm font-mono">
      {children}
    </code>
  );
}

function CodeBlock({
  code,
  language = "typescript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-stone-100 border border-b-0 border-stone-200 rounded-t-lg">
          <span className="text-sm font-medium text-stone-600">{title}</span>
          <span className="text-xs text-stone-400 uppercase tracking-wide">{language}</span>
        </div>
      )}
      <div className={`relative bg-stone-900 ${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
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
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-stone-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-8 border-b border-stone-200 last:border-0">
      <h2 className="text-xl font-semibold text-stone-900 mb-4">{title}</h2>
      <div className="text-stone-600 space-y-4">{children}</div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-stone-200 rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
}

function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-sky-50 border-sky-200 text-sky-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    tip: "bg-violet-50 border-violet-200 text-violet-800",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✓",
    tip: "💡",
  };

  return (
    <div className={`border rounded-lg p-4 ${styles[type]}`}>
      {title && (
        <div className="font-medium mb-1 flex items-center gap-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
        {number}
      </div>
      <div className="flex-1 pb-6">
        <h3 className="font-medium text-stone-900 mb-2">{title}</h3>
        <div className="text-stone-600">{children}</div>
      </div>
    </div>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "warning" }) {
  const styles = {
    default: "bg-stone-100 text-stone-600",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

// =============================================================================
// Navigation
// =============================================================================

function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`block py-1.5 text-sm transition-colors ${
        active ? "text-emerald-600 font-medium" : "text-stone-500 hover:text-stone-900"
      }`}
    >
      {children}
    </a>
  );
}

// =============================================================================
// Main Page
// =============================================================================

export default function IntegrationGuidePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-semibold text-stone-900">Tachles Pay</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/docs" className="text-stone-500 hover:text-stone-900">Docs</Link>
              <span className="text-stone-300">/</span>
              <span className="text-stone-900">Integration Guide</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/docs" className="text-sm text-stone-500 hover:text-stone-900">
              ← Back
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-20 space-y-6">
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Getting Started</div>
              <div className="space-y-0.5">
                <NavLink href="#overview">Overview</NavLink>
                <NavLink href="#quick-start">Quick Start</NavLink>
                <NavLink href="#authentication">Authentication</NavLink>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Core Concepts</div>
              <div className="space-y-0.5">
                <NavLink href="#payment-flow">Payment Flow</NavLink>
                <NavLink href="#creating-payups">Creating Payups</NavLink>
                <NavLink href="#webhooks">Webhooks</NavLink>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Advanced</div>
              <div className="space-y-0.5">
                <NavLink href="#existing-providers">Payment Providers</NavLink>
                <NavLink href="#custom-providers">Custom Providers</NavLink>
                <NavLink href="#sdk-examples">SDK Examples</NavLink>
                <NavLink href="#error-handling">Error Handling</NavLink>
                <NavLink href="#self-hosting">Self-Hosting</NavLink>
                <NavLink href="#ai-integration">AI Integration</NavLink>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Hero */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="success">Documentation</Badge>
              <Badge>v1.0</Badge>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-3">Integration Guide</h1>
            <p className="text-lg text-stone-600">
              Everything you need to integrate Tachles Pay into your application. Accept payments from all your apps with a single API.
            </p>
          </div>

          {/* Overview */}
          <Section id="overview" title="Overview">
            <p>
              Tachles Pay is a self-hosted payment orchestration platform. Connect your existing payment providers 
              (Stripe, PayPal, Square) and get unified tracking, webhooks, and analytics across all your applications.
            </p>

            <InfoBox type="tip" title="Why Tachles Pay?">
              <strong>One integration, all your apps.</strong> Redirect users from your web app, mobile app, or marketplace — 
              all through the same checkout. Switch payment providers anytime without changing code.
            </InfoBox>

            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <Card>
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium text-stone-900">Multi-App</div>
                <div className="text-sm text-stone-500 mt-1">One checkout for all your applications</div>
              </Card>
              <Card>
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-medium text-stone-900">Provider Agnostic</div>
                <div className="text-sm text-stone-500 mt-1">Switch providers without code changes</div>
              </Card>
              <Card>
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-medium text-stone-900">Self-Hosted</div>
                <div className="text-sm text-stone-500 mt-1">Your data stays on your servers</div>
              </Card>
            </div>
          </Section>

          {/* Quick Start */}
          <Section id="quick-start" title="Quick Start">
            <p>Get up and running in three steps:</p>

            <div className="mt-6 space-y-2">
              <Step number={1} title="Install the SDK">
                <CodeBlock code="npm install @tachles/pay-sdk" language="bash" />
              </Step>

              <Step number={2} title="Initialize the Client">
                <CodeBlock
                  code={`import { TachlesPay } from '@tachles/pay-sdk';

const tachles = new TachlesPay({
  apiKey: process.env.TACHLES_API_KEY,
  webhookSecret: process.env.TACHLES_WEBHOOK_SECRET,
});`}
                  language="typescript"
                />
              </Step>

              <Step number={3} title="Create a Payment">
                <CodeBlock
                  code={`const payup = await tachles.payups.create({
  amount: 2999,       // $29.99 in cents
  currency: 'USD',
  customerEmail: 'customer@example.com',
  successUrl: 'https://yourapp.com/success',
  cancelUrl: 'https://yourapp.com/cancel',
});

// Redirect customer to checkout
redirect(payup.checkoutUrl);`}
                  language="typescript"
                />
              </Step>
            </div>
          </Section>

          {/* Authentication */}
          <Section id="authentication" title="Authentication">
            <p>
              All API requests require authentication using your API key. Include it in the <Code>X-API-Key</Code> header.
            </p>

            <CodeBlock
              title="Example Request"
              code={`curl -X POST https://your-domain.com/api/sessions \\
  -H "X-API-Key: pk_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"amount": 2999, "currency": "USD"}'`}
              language="bash"
            />

            <InfoBox type="warning" title="Keep your API key secret">
              Never expose your API key in client-side code. Always make API calls from your server.
            </InfoBox>
          </Section>

          {/* Payment Flow */}
          <Section id="payment-flow" title="Payment Flow">
            <p>Here&apos;s how a payment moves through Tachles Pay:</p>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {[
                { step: "1", label: "Your App", desc: "Create payup" },
                { step: "2", label: "Tachles", desc: "Generate checkout" },
                { step: "3", label: "Provider", desc: "Process payment" },
                { step: "4", label: "Tachles", desc: "Capture result" },
                { step: "5", label: "Webhook", desc: "Notify your app" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                    {item.step}
                  </div>
                  <div className="mt-2 text-sm font-medium text-stone-900">{item.label}</div>
                  <div className="text-xs text-stone-500">{item.desc}</div>
                </div>
              ))}
            </div>

            <Card className="mt-6">
              <div className="text-sm font-medium text-stone-900 mb-2">How it works</div>
              <ol className="text-sm text-stone-600 space-y-2 list-decimal list-inside">
                <li>Your backend creates a payup via API, specifying amount and customer info</li>
                <li>Tachles Pay returns a secure checkout URL</li>
                <li>Customer completes payment on the provider&apos;s checkout (Stripe, PayPal, etc.)</li>
                <li>Tachles Pay captures the result and enriches it with your metadata</li>
                <li>Your webhook endpoint receives a standardized event — same format for all providers</li>
              </ol>
            </Card>
          </Section>

          {/* Creating Payups */}
          <Section id="creating-payups" title="Creating Payups">
            <p>
              A &quot;payup&quot; is a payment session. Create one when your customer is ready to pay.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-2 font-medium text-stone-900">Parameter</th>
                    <th className="text-left py-2 font-medium text-stone-900">Type</th>
                    <th className="text-left py-2 font-medium text-stone-900">Required</th>
                    <th className="text-left py-2 font-medium text-stone-900">Description</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  <tr className="border-b border-stone-100">
                    <td className="py-2"><Code>amount</Code></td>
                    <td className="py-2">number</td>
                    <td className="py-2">Yes</td>
                    <td className="py-2">Amount in smallest currency unit (cents)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2"><Code>currency</Code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Yes</td>
                    <td className="py-2">Three-letter ISO currency code</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2"><Code>customerEmail</Code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">Yes</td>
                    <td className="py-2">Customer&apos;s email address</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2"><Code>metadata</Code></td>
                    <td className="py-2">object</td>
                    <td className="py-2">No</td>
                    <td className="py-2">Custom key-value pairs</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2"><Code>successUrl</Code></td>
                    <td className="py-2">string</td>
                    <td className="py-2">No</td>
                    <td className="py-2">Redirect URL after payment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              title="Full Example"
              code={`const payup = await tachles.payups.create({
  amount: 9999,
  currency: 'USD',
  customerEmail: 'customer@example.com',
  description: 'Pro Subscription',
  metadata: {
    orderId: 'order_123',
    userId: 'user_456',
  },
  successUrl: 'https://app.com/success',
  cancelUrl: 'https://app.com/cancel',
});

// Response
{
  id: "pyp_abc123",
  checkoutUrl: "https://pay.tachles.dev/checkout/pyp_abc123",
  status: "pending",
  expiresAt: "2024-01-15T12:00:00Z"
}`}
              language="typescript"
            />
          </Section>

          {/* Webhooks */}
          <Section id="webhooks" title="Webhooks">
            <p>
              Webhooks notify your application when payment events occur. Configure your endpoint in the dashboard.
            </p>

            <div className="mt-4 space-y-2">
              {[
                { event: "payup.created", desc: "Payment link was created" },
                { event: "transaction.completed", desc: "Payment was successful" },
                { event: "transaction.failed", desc: "Payment attempt failed" },
                { event: "transaction.refunded", desc: "Payment was refunded" },
              ].map((item) => (
                <div key={item.event} className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg">
                  <Code>{item.event}</Code>
                  <span className="text-sm text-stone-600">{item.desc}</span>
                </div>
              ))}
            </div>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Verifying Signatures</h3>
            <p className="text-sm text-stone-600 mb-3">
              All webhooks include HMAC-SHA256 signatures. Always verify before processing.
            </p>

            <CodeBlock
              title="Webhook Handler"
              code={`import { TachlesPay } from '@tachles/pay-sdk';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-tachles-signature');
  
  const tachles = new TachlesPay({ 
    webhookSecret: process.env.TACHLES_WEBHOOK_SECRET 
  });
  
  // Verify signature
  const event = tachles.webhooks.verify(body, signature);
  
  if (event.type === 'transaction.completed') {
    // Handle successful payment
    await fulfillOrder(event.data.metadata.orderId);
  }
  
  return new Response('OK');
}`}
              language="typescript"
            />
          </Section>

          {/* Existing Payment Providers */}
          <Section id="existing-providers" title="Integrating with Existing Providers">
            <p>Tachles Pay works with your existing payment providers. No migration required.</p>

            <InfoBox type="info" title="How Provider Integration Works">
              Tachles Pay sits between your application and your payment providers. You continue using Stripe, PayPal, or Square—
              but now all payments flow through a unified interface with consistent webhooks and tracking.
            </InfoBox>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Supported Providers</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: "Stripe", status: "Supported", desc: "Cards, wallets, subscriptions" },
                { name: "PayPal", status: "Supported", desc: "PayPal, Venmo, Pay Later" },
                { name: "Square", status: "Supported", desc: "In-person & online payments" },
                { name: "Custom", status: "Available", desc: "Any REST-based provider" },
              ].map((p) => (
                <Card key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-stone-900">{p.name}</span>
                    <Badge variant="success">{p.status}</Badge>
                  </div>
                  <div className="text-sm text-stone-500">{p.desc}</div>
                </Card>
              ))}
            </div>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Configuration Example: Stripe</h3>
            <CodeBlock
              title="Dashboard Configuration"
              code={`// In your Tachles Pay dashboard:
// 1. Navigate to Settings > Payment Providers
// 2. Click "Add Provider" and select Stripe
// 3. Enter your Stripe credentials:

Provider: Stripe
API Key: sk_live_...
Webhook Secret: whsec_...
Mode: Live

// 4. Save and test the connection`}
              language="text"
            />

            <p className="mt-4">
              Once configured, Tachles automatically routes payments through Stripe while maintaining a unified API for your application.
            </p>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Multi-Provider Setup</h3>
            <p>
              You can configure multiple providers and route payments based on customer location, currency, or custom logic:
            </p>

            <CodeBlock
              code={`const payup = await tachles.payups.create({
  amount: 2999,
  currency: 'USD',
  customerEmail: 'customer@example.com',
  // Optional: specify provider
  provider: 'stripe',  // or 'paypal', 'square'
  // Or let Tachles auto-select based on rules
});`}
              language="typescript"
            />
          </Section>

          {/* Custom Providers */}
          <Section id="custom-providers" title="Custom Payment Providers">
            <p>
              Need to integrate with a provider not listed? Tachles Pay supports custom provider integrations through a flexible adapter system.
            </p>

            <InfoBox type="tip" title="When to Use Custom Providers">
              Use custom providers when integrating with regional payment gateways, proprietary systems, or emerging payment platforms
              that Tachles doesn&apos;t natively support.
            </InfoBox>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Creating a Custom Provider</h3>
            <CodeBlock
              title="Provider Adapter Interface"
              code={`interface PaymentProviderAdapter {
  // Create a payment session
  createSession(params: {
    amount: number;
    currency: string;
    customerEmail: string;
    metadata?: Record<string, any>;
  }): Promise<{
    sessionId: string;
    checkoutUrl: string;
  }>;

  // Verify webhook signatures
  verifyWebhook(
    payload: string,
    signature: string
  ): boolean;

  // Parse webhook events into standard format
  parseWebhook(payload: any): {
    type: 'completed' | 'failed' | 'refunded';
    sessionId: string;
    amount: number;
    currency: string;
    metadata?: Record<string, any>;
  };
}`}
              language="typescript"
            />

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Example: Implementing a Custom Provider</h3>
            <CodeBlock
              code={`import { PaymentProviderAdapter } from '@tachles/pay-sdk';

class MyCustomProvider implements PaymentProviderAdapter {
  constructor(private apiKey: string) {}

  async createSession(params) {
    const response = await fetch('https://api.customprovider.com/sessions', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.apiKey}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        customer_email: params.customerEmail,
      }),
    });

    const data = await response.json();
    
    return {
      sessionId: data.id,
      checkoutUrl: data.checkout_url,
    };
  }

  verifyWebhook(payload: string, signature: string): boolean {
    // Implement signature verification
    const computed = hmacSha256(payload, this.webhookSecret);
    return computed === signature;
  }

  parseWebhook(payload: any) {
    return {
      type: payload.event_type === 'payment.succeeded' ? 'completed' : 'failed',
      sessionId: payload.session_id,
      amount: payload.amount,
      currency: payload.currency,
    };
  }
}

// Register with Tachles
tachles.registerProvider('my-custom-provider', new MyCustomProvider(apiKey));`}
              language="typescript"
            />
          </Section>

          {/* SDK Examples */}
          <Section id="sdk-examples" title="SDK Examples">
            <p>Code examples for common integration patterns.</p>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Next.js Server Action</h3>
            <CodeBlock
              code={`'use server'

import { TachlesPay } from '@tachles/pay-sdk';
import { redirect } from 'next/navigation';

const tachles = new TachlesPay({
  apiKey: process.env.TACHLES_API_KEY!,
});

export async function createCheckout(formData: FormData) {
  const payup = await tachles.payups.create({
    amount: 2999,
    currency: 'USD',
    customerEmail: formData.get('email') as string,
    metadata: {
      productId: formData.get('productId'),
    },
  });
  
  redirect(payup.checkoutUrl);
}`}
              language="typescript"
            />

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Express.js Webhook Handler</h3>
            <CodeBlock
              code={`import express from 'express';
import { TachlesPay } from '@tachles/pay-sdk';

const app = express();
const tachles = new TachlesPay({
  webhookSecret: process.env.TACHLES_WEBHOOK_SECRET!,
});

app.post('/webhooks/tachles', 
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['x-tachles-signature'] as string;
    
    try {
      const event = tachles.webhooks.verify(req.body, signature);
      
      switch (event.type) {
        case 'transaction.completed':
          await handlePayment(event.data);
          break;
        case 'transaction.refunded':
          await handleRefund(event.data);
          break;
      }
      
      res.status(200).send('OK');
    } catch (error) {
      res.status(400).send('Invalid signature');
    }
  }
);`}
              language="typescript"
            />

            <h3 className="font-medium text-stone-900 mt-6 mb-3">React Checkout Button</h3>
            <CodeBlock
              code={`'use client'

import { useState } from 'react';
import { createCheckout } from './actions';

export function CheckoutButton({ productId, amount }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('amount', amount);
    
    await createCheckout(formData);
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="px-4 py-2 bg-emerald-600 text-white rounded"
    >
      {loading ? 'Loading...' : 'Checkout'}
    </button>
  );
}`}
              language="typescript"
            />
          </Section>

          {/* Error Handling */}
          <Section id="error-handling" title="Error Handling">
            <p>Tachles Pay uses standard HTTP status codes and provides detailed error messages.</p>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Common Error Codes</h3>
            <div className="space-y-2">
              {[
                { code: "400", name: "Bad Request", desc: "Invalid parameters or malformed request" },
                { code: "401", name: "Unauthorized", desc: "Missing or invalid API key" },
                { code: "404", name: "Not Found", desc: "Resource does not exist" },
                { code: "429", name: "Rate Limited", desc: "Too many requests" },
                { code: "500", name: "Server Error", desc: "Internal server error" },
              ].map((error) => (
                <Card key={error.code}>
                  <div className="flex items-center gap-3">
                    <Badge variant="warning">{error.code}</Badge>
                    <div className="flex-1">
                      <div className="font-medium text-stone-900">{error.name}</div>
                      <div className="text-sm text-stone-500">{error.desc}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Error Response Format</h3>
            <CodeBlock
              code={`{
  "error": {
    "type": "validation_error",
    "message": "Invalid amount: must be a positive integer",
    "field": "amount",
    "code": "INVALID_AMOUNT"
  }
}`}
              language="json"
            />

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Handling Errors in Code</h3>
            <CodeBlock
              code={`try {
  const payup = await tachles.payups.create({
    amount: -100,  // Invalid amount
    currency: 'USD',
    customerEmail: 'test@example.com',
  });
} catch (error) {
  if (error.type === 'validation_error') {
    console.error('Validation failed:', error.message);
    console.error('Field:', error.field);
  } else if (error.type === 'rate_limit_error') {
    // Implement retry logic with exponential backoff
    await sleep(1000);
    retry();
  } else {
    // Handle other errors
    console.error('Payment creation failed:', error);
  }
}`}
              language="typescript"
            />

            <InfoBox type="warning" title="Retry Logic">
              For network errors or rate limits, implement exponential backoff. For validation errors, fix the input and retry.
            </InfoBox>
          </Section>

          {/* Self-Hosting */}
          <Section id="self-hosting" title="Self-Hosting Guide">
            <p>Tachles Pay is designed for self-hosting. Your payment data stays on your infrastructure.</p>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Tech Stack</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Card>
                <div className="text-sm font-medium text-stone-900 mb-2">Application</div>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• Next.js 16 (React 19)</li>
                  <li>• TypeScript 5</li>
                  <li>• Tailwind CSS 4</li>
                  <li>• Prisma 7 (ORM)</li>
                </ul>
              </Card>
              <Card>
                <div className="text-sm font-medium text-stone-900 mb-2">Infrastructure</div>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• PostgreSQL 14+ (database)</li>
                  <li>• Redis 7+ (sessions)</li>
                  <li>• Cloudflare Workers (webhooks)</li>
                  <li>• Cloudflare Queues (dispatch)</li>
                </ul>
              </Card>
            </div>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">System Requirements</h3>
            <Card>
              <ul className="text-sm text-stone-600 space-y-2">
                <li><strong>Node.js:</strong> v20 or higher</li>
                <li><strong>PostgreSQL:</strong> v14 or higher</li>
                <li><strong>Redis:</strong> v7 or higher (optional, for production)</li>
                <li><strong>Memory:</strong> Minimum 512MB RAM</li>
                <li><strong>Storage:</strong> 1GB+ for database and logs</li>
              </ul>
            </Card>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Quick Setup</h3>
            <div className="space-y-2">
              <Step number={1} title="Clone the Repository">
                <CodeBlock
                  code="git clone https://github.com/didi-tech/tachles-pay.git\ncd tachles-pay"
                  language="bash"
                />
              </Step>

              <Step number={2} title="Install Dependencies">
                <CodeBlock code="npm install" language="bash" />
              </Step>

              <Step number={3} title="Configure Environment">
                <CodeBlock
                  code="cp .env.example .env\n# Edit .env with your configuration"
                  language="bash"
                />
              </Step>

              <Step number={4} title="Setup Database">
                <CodeBlock code="npx prisma migrate deploy" language="bash" />
              </Step>

              <Step number={5} title="Start the Application">
                <CodeBlock code="npm run build && npm start" language="bash" />
              </Step>
            </div>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Environment Variables</h3>
            <CodeBlock
              title=".env"
              code={`# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/tachles"

# Redis (optional, recommended for production)
REDIS_URL="redis://localhost:6379"

# Security
TACHLES_WEBHOOK_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret"

# Application
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Optional: Cloudflare Worker for webhook dispatch
TACHLES_WORKER_URL="https://webhooks.your-domain.workers.dev"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_API_TOKEN="your-api-token"`}
              language="bash"
            />

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Deployment Options</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Card>
                <div className="font-medium text-stone-900 mb-2">Docker</div>
                <CodeBlock
                  code={`docker build -t tachles-pay .
docker run -p 3000:3000 \\
  --env-file .env \\
  tachles-pay`}
                  language="bash"
                />
              </Card>
              <Card>
                <div className="font-medium text-stone-900 mb-2">Vercel</div>
                <CodeBlock
                  code={`vercel deploy
# Configure environment variables in dashboard`}
                  language="bash"
                />
              </Card>
            </div>

            <InfoBox type="info" title="Production Checklist">
              <ul className="text-sm space-y-1 mt-2">
                <li>✓ Use strong, unique secrets for TACHLES_WEBHOOK_SECRET</li>
                <li>✓ Enable SSL/TLS for all connections</li>
                <li>✓ Set up automated database backups</li>
                <li>✓ Configure Redis for session management</li>
                <li>✓ Set up monitoring and logging</li>
                <li>✓ Use environment-specific configuration</li>
              </ul>
            </InfoBox>
          </Section>

          {/* AI Integration */}
          <Section id="ai-integration" title="AI Integration">
            <p>
              Tachles Pay is built with AI assistance in mind. The codebase uses Effect for functional programming patterns
              and follows modern TypeScript best practices.
            </p>

            <InfoBox type="tip" title="Built for Extensibility">
              The architecture makes it easy to add new features, payment providers, or integrations with AI tools like
              GitHub Copilot or Cursor.
            </InfoBox>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Code Structure</h3>
            <Card>
              <pre className="text-xs text-stone-700 overflow-x-auto">
{`tachles-pay/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── checkout/          # Checkout pages
│   └── dashboard/         # Admin dashboard
├── src/
│   ├── domain/            # Domain models & schemas
│   ├── services/          # Business logic
│   └── workflows/         # Payment workflows
├── workers/               # Cloudflare Workers
└── prisma/                # Database schema`}
              </pre>
            </Card>

            <h3 className="font-medium text-stone-900 mt-6 mb-3">Key Patterns</h3>
            <CodeBlock
              code={`// Effect-based service composition
import { Effect } from 'effect';

const createPayup = (params: CreatePayupParams) =>
  Effect.gen(function* (_) {
    // Validate input
    const validated = yield* _(validatePayupParams(params));
    
    // Create in database
    const payup = yield* _(db.payups.create(validated));
    
    // Trigger webhook
    yield* _(queue.enqueue('payup.created', payup));
    
    return payup;
  });`}
              language="typescript"
            />
          </Section>

          {/* Footer */}
          <div className="border-t border-stone-200 mt-8 pt-8 flex items-center justify-between">
            <Link href="/docs" className="text-sm text-stone-500 hover:text-stone-900">
              ← Back to Documentation
            </Link>
            <Link href="/dashboard" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Go to Dashboard →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
