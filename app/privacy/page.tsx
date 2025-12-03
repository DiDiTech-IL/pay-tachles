import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            ← Back to home
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text:white mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          We treat payment and customer data with the highest level of care.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Tachles Pay acts as a processor for payment and event data passing between your application
          and your payment providers. Data is stored only as long as needed for observability and
          compliance.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          A full, lawyer-reviewed privacy policy would live here in production.
        </p>
      </div>
    </main>
  );
}
