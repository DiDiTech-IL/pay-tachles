"use client";

import { useState, useTransition } from "react";
import { processPaymentAction } from "./actions";

interface CheckoutClientProps {
  payupId: string;
  returnUrl?: string;
}

export default function CheckoutClient({
  payupId,
  returnUrl,
}: CheckoutClientProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
    transactionId?: string;
  } | null>(null);

  const handlePayment = () => {
    startTransition(async () => {
      const response = await processPaymentAction(payupId);
      setResult(response);

      // If successful and has return URL, redirect after a short delay
      if (response.success && response.returnUrl) {
        setTimeout(() => {
          window.location.href = response.returnUrl!;
        }, 2000);
      }
    });
  };

  // Success state
  if (result?.success) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Transaction ID: <span className="font-mono">{result.transactionId}</span>
        </p>
        {returnUrl && (
          <p className="text-sm text-gray-500">
            Redirecting you back...
          </p>
        )}
      </div>
    );
  }

  // Error state
  if (result?.error) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-red-600 mb-4">{result.error}</p>
        <button
          onClick={() => setResult(null)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Default payment form
  return (
    <div className="px-6 py-6">
      {/* Mock Card Input (for demo) */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={isPending}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isPending}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isPending}
            />
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isPending}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
        }`}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Pay Now"
        )}
      </button>

      {/* Security Note */}
      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-500">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        Secure payment powered by Tachles Pay
      </div>
    </div>
  );
}
