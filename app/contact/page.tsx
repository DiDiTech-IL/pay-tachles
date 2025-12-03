import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            1 Back to home
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Reach the Tachles Pay team for support, onboarding, or security questions.
        </p>
        <div className="space-y-3 text-gray-600 dark:text-gray-300">
          <p><span className="font-medium">Support:</span> support@tachlespay.com</p>
          <p><span className="font-medium">Security:</span> security@tachlespay.com</p>
          <p><span className="font-medium">Sales:</span> sales@tachlespay.com</p>
        </div>
      </div>
    </main>
  );
}
