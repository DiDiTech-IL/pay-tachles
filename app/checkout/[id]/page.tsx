import { Effect, Exit, Layer, Option } from "effect";
import { notFound } from "next/navigation";
import { ConfigServiceLive, KVServiceLive } from "@/services";
import { getPayupData, type PayupData } from "@/workflows";
import CheckoutClient from "./checkout-client";

// =============================================================================
// Runtime Layer
// =============================================================================

const RuntimeLayer = KVServiceLive.pipe(
  Layer.provideMerge(ConfigServiceLive)
);

// =============================================================================
// Helper to extract payup from Effect result
// =============================================================================

function extractPayup(
  result: Exit.Exit<Option.Option<PayupData>, unknown>
): PayupData | null {
  if (Exit.isFailure(result)) {
    return null;
  }
  const opt = result.value;
  if (Option.isNone(opt)) {
    return null;
  }
  return opt.value;
}

// =============================================================================
// Checkout Page (Server Component)
// =============================================================================

interface CheckoutPageProps {
  params: Promise<{ id: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { id: payupId } = await params;

  // Fetch payup data from Redis
  const program = getPayupData(payupId);
  const result = await Effect.runPromiseExit(
    program.pipe(Effect.provide(RuntimeLayer))
  );

  const payup = extractPayup(result);

  if (!payup) {
    notFound();
  }

  // Check if payup is expired
  const expiresAt = new Date(payup.expiresAt);
  if (expiresAt < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Link Expired
          </h1>
          <p className="text-gray-600">
            This payment link has expired. Please request a new checkout link.
          </p>
        </div>
      </div>
    );
  }

  // Check if already processed
  if (payup.status !== "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">
            {payup.status === "completed" ? "✅" : "❌"}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {payup.status === "completed"
              ? "Payment Completed"
              : "Payment Failed"}
          </h1>
          <p className="text-gray-600">
            {payup.status === "completed"
              ? "This payment has already been processed successfully."
              : "This payment has already been processed."}
          </p>
        </div>
      </div>
    );
  }

  // Format amount for display
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: payup.currency,
  }).format(payup.amount / 100);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
            <h1 className="text-xl font-semibold mb-2">Complete Payment</h1>
            <div className="text-4xl font-bold">{formattedAmount}</div>
            <div className="text-blue-200 text-sm mt-1">
              {payup.currency}
            </div>
          </div>

          {/* Details */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Payment ID</span>
              <span className="font-mono text-gray-700">
                {payup.payupId.slice(0, 8)}...
              </span>
            </div>
            {payup.customerEmail && (
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-700">{payup.customerEmail}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-500">Expires</span>
              <span className="text-gray-700">
                {new Date(payup.expiresAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Client Component for Payment Button */}
          <CheckoutClient
            payupId={payup.payupId}
            returnUrl={payup.returnUrl}
          />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Powered by <span className="font-semibold">Tachles Pay</span>
        </div>
      </div>
    </div>
  );
}
