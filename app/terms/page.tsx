import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            ← Back to home
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text:white mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          These terms outline how Tachles Pay is provided and supported.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          In a production deployment this page would contain the full contractual terms covering
          service availability, responsibilities, and limitations.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          For now, treat this as a placeholder so navigation is complete and the product feels whole.
        </p>
      </div>
    </main>
  );
}
