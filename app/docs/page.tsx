"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "../components/ui/logo";

// ============================================================================
// Code Block with Copy
// ============================================================================
function Code({ children, lang = "bash" }: { children: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute top-2 right-2 flex items-center gap-2">
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
// Method Badge
// ============================================================================
function Method({ type }: { type: "GET" | "POST" | "PUT" | "DELETE" }) {
  const colors = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-bold font-mono rounded border ${colors[type]}`}>
      {type}
    </span>
  );
}

// ============================================================================
// Endpoint Block
// ============================================================================
function Endpoint({ method, path }: { method: "GET" | "POST" | "PUT" | "DELETE"; path: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 font-mono text-sm">
      <Method type={method} />
      <span className="text-slate-300">{path}</span>
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
// Table
// ============================================================================
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/50">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-300">
                  {j === 0 ? <code className="text-indigo-400 bg-slate-800/50 px-1.5 py-0.5 rounded text-xs">{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// Section Navigation
// ============================================================================
const sections = [
  { id: "overview", title: "Overview", icon: "📖" },
  { id: "quickstart", title: "Quick Start", icon: "🚀" },
  { id: "authentication", title: "Authentication", icon: "🔐" },
  { id: "create-payment", title: "Create Payment", icon: "💳" },
  { id: "payment-status", title: "Payment Status", icon: "📊" },
  { id: "webhooks", title: "Webhooks", icon: "🔔" },
  { id: "finalize", title: "Finalize Payment", icon: "✅" },
  { id: "errors", title: "Error Handling", icon: "⚠️" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
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
              <span className="text-sm font-medium text-slate-400">Documentation</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="hidden sm:flex text-sm text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                Get Started
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
          <aside className={`
            ${mobileNavOpen ? "fixed inset-0 z-40 bg-slate-950 p-6 pt-20" : "hidden"} 
            lg:block lg:relative lg:bg-transparent lg:p-0 lg:w-56 lg:shrink-0
          `}>
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
                  onClick={() => { setActiveSection(section.id); setMobileNavOpen(false); }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${activeSection === section.id
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }
                  `}
                >
                  <span>{section.icon}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Overview */}
            <section id="overview" className="mb-16">
              <h1 className="text-4xl font-bold text-white mb-4">Tachles Pay Documentation</h1>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Complete API reference for integrating payment processing with your application.
                Tachles Pay provides a unified hub for managing payment flows, webhooks, and transaction data.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-linear-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="text-white font-semibold mb-1">Simple Integration</h3>
                  <p className="text-sm text-slate-400">Just 3 API calls to process a payment end-to-end.</p>
                </div>
                <div className="p-5 bg-linear-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-2xl mb-2">🔄</div>
                  <h3 className="text-white font-semibold mb-1">Real-time Webhooks</h3>
                  <p className="text-sm text-slate-400">Get instant notifications on your server.</p>
                </div>
              </div>
            </section>

            {/* Quick Start */}
            <section id="quickstart" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🚀</span> Quick Start
              </h2>
              <p className="text-slate-400 mb-6">
                Get started with Tachles Pay in 5 minutes. Here&apos;s the complete payment flow:
              </p>

              <div className="space-y-6">
                <div className="relative pl-8 pb-8 border-l-2 border-slate-800">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                  <h3 className="text-white font-semibold mb-2">Create an App</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Go to your dashboard and create a new app. You&apos;ll receive an API key and webhook secret.
                  </p>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-slate-800">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                  <h3 className="text-white font-semibold mb-2">Create a Payment (Payup)</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    When a user wants to pay, create a payment session:
                  </p>
                  <Code lang="bash">{`curl -X POST https://your-domain.com/api/payups \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2999,
    "currency": "USD",
    "description": "Premium Plan",
    "customerId": "user_123",
    "returnUrl": "https://yoursite.com/success",
    "cancelUrl": "https://yoursite.com/cancel"
  }'`}</Code>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-slate-800">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                  <h3 className="text-white font-semibold mb-2">Redirect User</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Use the returned <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">paymentUrl</code> to redirect your user to complete the payment.
                  </p>
                </div>

                <div className="relative pl-8 pb-8 border-l-2 border-slate-800">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">4</div>
                  <h3 className="text-white font-semibold mb-2">Receive Webhook</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Your server receives a webhook notification when payment completes. Verify the signature!
                  </p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">5</div>
                  <h3 className="text-white font-semibold mb-2">Finalize & Deliver</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Finalize the payment and deliver your product/service to the customer.
                  </p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🔐</span> Authentication
              </h2>
              <p className="text-slate-400 mb-6">
                All API requests require authentication using your API key in the Authorization header.
              </p>

              <Code lang="bash">{`Authorization: Bearer pk_live_abc123xyz789...`}</Code>

              <Alert type="warning">
                <strong>Keep your API key secure!</strong> Never expose it in client-side code.
                Use environment variables and server-side requests only.
              </Alert>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">API Keys</h3>
              <Table
                headers={["Type", "Format", "Usage"]}
                rows={[
                  ["API Key", "pk_live_...", "Server-to-server authentication"],
                  ["Webhook Secret", "whsec_...", "Verify webhook signatures"],
                ]}
              />
            </section>

            {/* Create Payment */}
            <section id="create-payment" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">💳</span> Create Payment
              </h2>
              <p className="text-slate-400 mb-6">
                Create a new payment session (called a &quot;Payup&quot;) to collect payment from a customer.
              </p>

              <Endpoint method="POST" path="/api/payups" />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Request Body</h3>
              <Table
                headers={["Parameter", "Type", "Required", "Description"]}
                rows={[
                  ["amount", "integer", "Yes", "Amount in cents (e.g., 2999 = $29.99)"],
                  ["currency", "string", "Yes", "Currency code: USD, EUR, GBP, ILS"],
                  ["description", "string", "No", "Payment description shown to user"],
                  ["customerId", "string", "No", "Your internal customer ID"],
                  ["customerEmail", "string", "No", "Customer email for receipts"],
                  ["customerName", "string", "No", "Customer display name"],
                  ["returnUrl", "string", "No", "Redirect URL after success"],
                  ["cancelUrl", "string", "No", "Redirect URL on cancel"],
                  ["metadata", "object", "No", "Custom key-value data"],
                ]}
              />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Example Request</h3>
              <Code lang="json">{`{
  "amount": 2999,
  "currency": "USD",
  "description": "Premium Subscription",
  "customerId": "user_abc123",
  "customerEmail": "customer@example.com",
  "returnUrl": "https://yourapp.com/payment/success",
  "cancelUrl": "https://yourapp.com/payment/cancel",
  "metadata": {
    "planId": "premium",
    "orderId": "ord_123"
  }
}`}</Code>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Response</h3>
              <Code lang="json">{`{
  "payupId": "pay_abc123xyz789",
  "paymentUrl": "https://your-domain.com/checkout/pay_abc123xyz789",
  "expiresAt": "2025-12-02T15:30:00.000Z"
}`}</Code>
            </section>

            {/* Payment Status */}
            <section id="payment-status" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">📊</span> Payment Status
              </h2>
              <p className="text-slate-400 mb-6">
                Check the current status of a payment session.
              </p>

              <Endpoint method="GET" path="/api/sessions/{id}" />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Status Values</h3>
              <Table
                headers={["Status", "Description"]}
                rows={[
                  ["pending", "Payment created, waiting for customer"],
                  ["processing", "Customer initiated payment, processing"],
                  ["completed", "Payment successful"],
                  ["failed", "Payment failed or declined"],
                  ["cancelled", "Customer cancelled the payment"],
                  ["expired", "Payment session expired (24h default)"],
                ]}
              />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Example Response</h3>
              <Code lang="json">{`{
  "id": "pay_abc123xyz789",
  "status": "completed",
  "amount": 2999,
  "currency": "USD",
  "customerEmail": "customer@example.com",
  "description": "Premium Subscription",
  "createdAt": "2025-12-02T14:30:00.000Z",
  "completedAt": "2025-12-02T14:35:00.000Z",
  "metadata": {
    "planId": "premium",
    "orderId": "ord_123"
  }
}`}</Code>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">🔔</span> Webhooks
              </h2>
              <p className="text-slate-400 mb-6">
                Webhooks notify your server in real-time when payment events occur.
                <strong className="text-white"> Always verify webhook signatures</strong> before processing.
              </p>

              <Alert type="info">
                Configure your webhook URL in the dashboard under Apps → Webhook Configuration.
                Your server must respond with a 200 status within 30 seconds.
              </Alert>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Signature Verification</h3>
              <p className="text-slate-400 mb-4">
                Every webhook includes a signature in the <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">X-Tachles-Signature</code> header.
              </p>

              <Code lang="typescript">{`import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In your webhook handler:
app.post('/webhooks/tachles', (req, res) => {
  const signature = req.headers['x-tachles-signature'];
  const isValid = verifyWebhook(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook...
  const { event, data } = req.body;
  
  switch (event) {
    case 'payment.completed':
      // Fulfill the order
      break;
    case 'payment.failed':
      // Handle failure
      break;
  }
  
  res.status(200).send('OK');
});`}</Code>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Webhook Events</h3>
              <Table
                headers={["Event", "Description"]}
                rows={[
                  ["payment.completed", "Payment was successful"],
                  ["payment.failed", "Payment failed or was declined"],
                  ["payment.cancelled", "Customer cancelled the payment"],
                  ["payment.expired", "Payment session expired"],
                  ["payment.refunded", "Payment was refunded"],
                ]}
              />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Webhook Payload</h3>
              <Code lang="json">{`{
  "event": "payment.completed",
  "timestamp": "2025-12-02T14:35:00.000Z",
  "data": {
    "payupId": "pay_abc123xyz789",
    "transactionId": "txn_def456uvw012",
    "amount": 2999,
    "currency": "USD",
    "status": "completed",
    "customerEmail": "customer@example.com",
    "customerId": "user_abc123",
    "metadata": {
      "planId": "premium",
      "orderId": "ord_123"
    }
  }
}`}</Code>
            </section>

            {/* Finalize Payment */}
            <section id="finalize" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">✅</span> Finalize Payment
              </h2>
              <p className="text-slate-400 mb-6">
                After receiving a successful webhook, finalize the payment to confirm completion and create a permanent transaction record.
              </p>

              <Endpoint method="POST" path="/api/sessions/{id}/finalize" />

              <Alert type="success">
                Finalizing a payment is idempotent - you can safely call it multiple times.
                This creates a Transaction record from the Payup and returns the final details.
              </Alert>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Example Response</h3>
              <Code lang="json">{`{
  "success": true,
  "transaction": {
    "id": "txn_def456uvw012",
    "payupId": "pay_abc123xyz789",
    "amount": 2999,
    "currency": "USD",
    "status": "completed",
    "customerEmail": "customer@example.com",
    "customerId": "user_abc123",
    "fees": 87,
    "netAmount": 2912,
    "createdAt": "2025-12-02T14:35:00.000Z"
  }
}`}</Code>
            </section>

            {/* Error Handling */}
            <section id="errors" className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">⚠️</span> Error Handling
              </h2>
              <p className="text-slate-400 mb-6">
                All errors follow a consistent format with an error code and message.
              </p>

              <Code lang="json">{`{
  "error": "ValidationError",
  "message": "Amount must be a positive integer"
}`}</Code>

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">HTTP Status Codes</h3>
              <Table
                headers={["Code", "Description"]}
                rows={[
                  ["200", "Success"],
                  ["400", "Bad Request - Invalid parameters"],
                  ["401", "Unauthorized - Invalid or missing API key"],
                  ["404", "Not Found - Resource doesn't exist"],
                  ["422", "Unprocessable - Validation failed"],
                  ["429", "Too Many Requests - Rate limited"],
                  ["500", "Server Error - Something went wrong"],
                ]}
              />

              <h3 className="text-lg font-semibold text-white mt-8 mb-3">Error Types</h3>
              <Table
                headers={["Error", "Description"]}
                rows={[
                  ["AuthenticationError", "Invalid or missing API key"],
                  ["ValidationError", "Request validation failed"],
                  ["NotFoundError", "Resource not found"],
                  ["PayupExpiredError", "Payment session has expired"],
                  ["PayupAlreadyCompletedError", "Payment already processed"],
                  ["InternalError", "Server error (retry safe)"],
                ]}
              />
            </section>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm">
                  Need help? Contact us at{" "}
                  <a href="mailto:support@tachlespay.com" className="text-indigo-400 hover:text-indigo-300">
                    support@tachlespay.com
                  </a>
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Home
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
