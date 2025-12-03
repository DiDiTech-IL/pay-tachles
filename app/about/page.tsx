import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            1 Back to home
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Tachles Pay</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Tachles Pay was built to give product and engineering teams a reliable, auditable layer between
          their applications and payment providers.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We focus on three things: predictable routing of payment requests, complete visibility into every
          transaction, and secure delivery of webhooks back to your systems.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Our infrastructure is designed for teams that care about correctness, observability, and compliance
          from day one.
        </p>
      </div>
    </main>
  );
}
