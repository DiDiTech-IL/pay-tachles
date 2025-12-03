"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Logo } from "../components/ui/logo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Modal } from "../components/ui/modal";
import { ToastContainer } from "../components/ui/toast";
import {
  appsApi,
  transactionsApi,
  payupsApi,
  calculateStats,
  type App,
  type Transaction,
} from "../lib/api";

// ============================================================================
// Types & Constants
// ============================================================================
type ProviderType = "stripe" | "paypal" | "square" | "adyen" | "custom";
type TabType = "overview" | "apps" | "transactions" | "create-payment";

interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const PROVIDERS: Record<ProviderType, { label: string; icon: string }> = {
  stripe: { label: "Stripe", icon: "💳" },
  paypal: { label: "PayPal", icon: "🅿️" },
  square: { label: "Square", icon: "⬜" },
  adyen: { label: "Adyen", icon: "🌐" },
  custom: { label: "Custom", icon: "⚙️" },
};

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "apps", label: "Apps", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { id: "transactions", label: "Transactions", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { id: "create-payment", label: "Create Payment", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
];

// ============================================================================
// Utility Functions
// ============================================================================
function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount / 100);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
}

// ============================================================================
// Sub-components
// ============================================================================
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "success" | "error" | "warning" | "purple" | "default"> = {
    completed: "success", failed: "error", pending: "warning", refunded: "purple",
    processing: "warning", cancelled: "error", expired: "error", disputed: "error",
  };
  return <Badge variant={variants[status] || "default"} size="sm" className="capitalize">{status}</Badge>;
}

function SecretField({ label, value, onRegenerate }: { label: string; value: string; onRegenerate?: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const displayValue = revealed ? value : value.slice(0, 7) + "•".repeat(20);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-400">{label}</label>
      <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-3 border border-slate-700/50">
        <code className="text-sm text-slate-300 font-mono flex-1 truncate">{displayValue}</code>
        <button onClick={() => setRevealed(!revealed)} className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {revealed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </>
            )}
          </svg>
        </button>
        <button onClick={handleCopy} className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-700 transition-colors">
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
        {onRegenerate && (
          <button onClick={onRegenerate} className="p-1.5 text-slate-500 hover:text-amber-400 rounded-lg hover:bg-slate-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Toast Hook
// ============================================================================
function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = generateId("toast");
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

// ============================================================================
// Main Dashboard Component
// ============================================================================
export default function DashboardPage() {
  // Toast
  const { toasts, addToast, removeToast } = useToasts();

  // Data state
  const [apps, setApps] = useState<App[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedAppId, setSelectedAppId] = useState<string>("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Modal state
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [deleteConfirmApp, setDeleteConfirmApp] = useState<App | null>(null);
  const [appForm, setAppForm] = useState({ name: "", provider: "stripe" as ProviderType, webhookUrl: "" });

  // Payment creation state
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    currency: "USD",
    description: "",
    customerEmail: "",
    customerId: "",
    returnUrl: "",
    cancelUrl: "",
  });
  const [createdPayment, setCreatedPayment] = useState<{ payupId: string; paymentUrl: string; expiresAt: string } | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derived state
  const selectedApp = apps.find((a) => a.id === selectedAppId) || apps[0];
  const appTransactions = selectedApp ? transactions.filter((t) => t.appId === selectedApp.id) : [];
  const stats = calculateStats(appTransactions);

  // Filtered & paginated transactions
  const filteredTransactions = appTransactions.filter((txn) => {
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    const matchesSearch = !searchQuery ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ============================================================================
  // Data Fetching
  // ============================================================================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [appsData, txnData] = await Promise.all([
        appsApi.list(),
        transactionsApi.list(),
      ]);
      setApps(appsData);
      setTransactions(txnData);
      if (appsData.length > 0 && !selectedAppId) {
        setSelectedAppId(appsData[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      addToast("error", "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [selectedAppId, addToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ============================================================================
  // App Actions
  // ============================================================================
  const handleCreateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name.trim() || !appForm.webhookUrl.trim()) {
      addToast("error", "Please fill all required fields");
      return;
    }

    try {
      const newApp = await appsApi.create({
        name: appForm.name,
        provider: appForm.provider,
        webhookUrl: appForm.webhookUrl,
      });
      setApps((prev) => [newApp, ...prev]);
      setSelectedAppId(newApp.id);
      setAppModalOpen(false);
      setAppForm({ name: "", provider: "stripe", webhookUrl: "" });
      addToast("success", `App "${newApp.name}" created!`);
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to create app");
    }
  };

  const handleUpdateApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    try {
      const updated = await appsApi.update(editingApp.id, {
        name: appForm.name,
        webhookUrl: appForm.webhookUrl,
      });
      setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setAppModalOpen(false);
      setEditingApp(null);
      addToast("success", `App "${updated.name}" updated!`);
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to update app");
    }
  };

  const handleDeleteApp = async () => {
    if (!deleteConfirmApp) return;

    try {
      await appsApi.delete(deleteConfirmApp.id);
      setApps((prev) => prev.filter((a) => a.id !== deleteConfirmApp.id));
      if (selectedAppId === deleteConfirmApp.id && apps.length > 1) {
        setSelectedAppId(apps.find((a) => a.id !== deleteConfirmApp.id)?.id || "");
      }
      setDeleteConfirmApp(null);
      addToast("success", `App "${deleteConfirmApp.name}" deleted`);
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to delete app");
    }
  };

  const handleRegenerateApiKey = async (app: App) => {
    try {
      const updated = await appsApi.regenerateApiKey(app.id);
      setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      addToast("success", "API key regenerated");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to regenerate API key");
    }
  };

  const handleRegenerateWebhookSecret = async (app: App) => {
    try {
      const updated = await appsApi.regenerateWebhookSecret(app.id);
      setApps((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      addToast("success", "Webhook secret regenerated");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to regenerate webhook secret");
    }
  };

  // ============================================================================
  // Payment Actions
  // ============================================================================
  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) {
      addToast("error", "Please select an app first");
      return;
    }

    const amount = parseInt(paymentForm.amount, 10);
    if (isNaN(amount) || amount <= 0) {
      addToast("error", "Please enter a valid amount");
      return;
    }

    try {
      const result = await payupsApi.create(selectedApp.apiKey, {
        amount,
        currency: paymentForm.currency,
        description: paymentForm.description || undefined,
        customerEmail: paymentForm.customerEmail || undefined,
        customerId: paymentForm.customerId || undefined,
        returnUrl: paymentForm.returnUrl || undefined,
        cancelUrl: paymentForm.cancelUrl || undefined,
      });
      setCreatedPayment(result);
      addToast("success", "Payment created successfully!");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Failed to create payment");
    }
  };

  // ============================================================================
  // Modal Handlers
  // ============================================================================
  const openCreateAppModal = () => {
    setEditingApp(null);
    setAppForm({ name: "", provider: "stripe", webhookUrl: "" });
    setAppModalOpen(true);
  };

  const openEditAppModal = (app: App) => {
    setEditingApp(app);
    setAppForm({ name: app.name, provider: app.provider as ProviderType, webhookUrl: app.webhookUrl });
    setAppModalOpen(true);
  };

  // ============================================================================
  // Render
  // ============================================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950/50 border-r border-slate-800/50 backdrop-blur-xl z-20 hidden lg:flex flex-col">
        <div className="p-5 border-b border-slate-800/50">
          <Link href="/"><Logo size="sm" /></Link>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-white border border-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
          <Link href="/docs" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileNavOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950 border-r border-slate-800/50 z-50 flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between p-5 border-b border-slate-800/50">
              <Logo size="sm" />
              <button onClick={() => setMobileNavOpen(false)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as TabType); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    activeTab === item.id
                      ? "bg-linear-to-r from-indigo-500/10 to-purple-500/10 text-white border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileNavOpen(true)} className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-white capitalize">{activeTab.replace("-", " ")}</h1>
            </div>
            <div className="flex items-center gap-4">
              {apps.length > 0 && (
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {apps.map((app) => (
                    <option key={app.id} value={app.id}>{app.name}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
              <button onClick={fetchData} className="ml-4 underline hover:no-underline">Retry</button>
            </div>
          )}

          {/* Empty State */}
          {apps.length === 0 && !error && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-5xl mb-4">🚀</div>
                <h2 className="text-xl font-bold text-white mb-2">Welcome to Tachles Pay!</h2>
                <p className="text-slate-400 mb-6">Create your first app to start accepting payments.</p>
                <Button onClick={openCreateAppModal}>Create Your First App</Button>
              </CardContent>
            </Card>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && apps.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Revenue", value: formatCurrency(stats.totalRevenue, "USD"), icon: "💰", color: "indigo" },
                  { label: "Transactions", value: stats.totalTransactions.toString(), icon: "📊", color: "purple" },
                  { label: "Success Rate", value: `${stats.successRate.toFixed(1)}%`, icon: "✅", color: "emerald" },
                ].map((stat) => (
                  <Card key={stat.label} hover>
                    <CardContent>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                {appTransactions.length === 0 ? (
                  <CardContent>
                    <p className="text-slate-400 text-center py-8">No transactions yet. Create a payment to get started!</p>
                  </CardContent>
                ) : (
                  <div className="divide-y divide-slate-800/50">
                    {appTransactions.slice(0, 5).map((txn) => (
                      <div key={txn.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                        <div>
                          <code className="text-sm text-slate-300 font-mono">{txn.id}</code>
                          <div className="text-xs text-slate-500 mt-1">{txn.customerEmail || "No email"}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{formatCurrency(txn.amount, txn.currency)}</div>
                          <StatusBadge status={txn.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Apps Tab */}
          {activeTab === "apps" && selectedApp && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>API Credentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <SecretField label="API Key" value={selectedApp.apiKey} onRegenerate={() => handleRegenerateApiKey(selectedApp)} />
                    <SecretField label="Webhook Secret" value={selectedApp.webhookSecret} onRegenerate={() => handleRegenerateWebhookSecret(selectedApp)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhook Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <SecretField label="Webhook URL" value={selectedApp.webhookUrl} />
                  <div className="flex gap-3 mt-4">
                    <Button variant="secondary" onClick={() => openEditAppModal(selectedApp)}>Edit Configuration</Button>
                    <Button variant="outline" onClick={() => addToast("success", "Test webhook sent!")}>Send Test Event</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>All Apps</CardTitle>
                  <Button size="sm" onClick={openCreateAppModal}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create App
                  </Button>
                </CardHeader>
                <div className="divide-y divide-slate-800/50">
                  {apps.map((app) => (
                    <div
                      key={app.id}
                      className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-colors ${
                        app.id === selectedAppId ? "bg-indigo-500/5" : "hover:bg-slate-800/30"
                      }`}
                      onClick={() => setSelectedAppId(app.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{PROVIDERS[app.provider as ProviderType]?.icon || "⚙️"}</div>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {app.name}
                            {app.id === selectedAppId && <Badge variant="info" size="sm">Selected</Badge>}
                          </div>
                          <div className="text-xs text-slate-500">
                            {PROVIDERS[app.provider as ProviderType]?.label || app.provider} • {formatDate(app.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openEditAppModal(app); }} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); setDeleteConfirmApp(app); }} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>All Transactions</CardTitle>
                  <div className="flex gap-3">
                    <select
                      value={statusFilter}
                      onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                    <Input
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      placeholder="Search..."
                      className="w-48"
                    />
                  </div>
                </div>
              </CardHeader>
              {paginatedTransactions.length === 0 ? (
                <CardContent>
                  <p className="text-slate-400 text-center py-8">No transactions found.</p>
                </CardContent>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-800/30">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Transaction</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Customer</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Amount</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/30">
                        {paginatedTransactions.map((txn) => (
                          <tr key={txn.id} className="hover:bg-slate-800/20 transition-colors">
                            <td className="px-6 py-4">
                              <code className="text-sm text-slate-300 font-mono">{txn.id}</code>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">{txn.customerEmail || "-"}</div>
                              <div className="text-xs text-slate-500">{txn.description || "-"}</div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">
                              {formatCurrency(txn.amount, txn.currency)}
                            </td>
                            <td className="px-6 py-4">
                              <StatusBadge status={txn.status} />
                            </td>
                            <td className="px-6 py-4 text-slate-400 text-sm">
                              {formatDate(txn.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="text-sm text-slate-400">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                        <Button variant="secondary" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Card>
          )}

          {/* Create Payment Tab */}
          {activeTab === "create-payment" && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  {createdPayment ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">✅</span>
                          <span className="text-emerald-400 font-semibold">Payment Created Successfully!</span>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-slate-400">Payment ID:</span>
                            <code className="ml-2 text-white bg-slate-800 px-2 py-1 rounded">{createdPayment.payupId}</code>
                          </div>
                          <div>
                            <span className="text-slate-400">Expires:</span>
                            <span className="ml-2 text-white">{formatDate(createdPayment.expiresAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-400">Payment URL</label>
                        <div className="flex gap-2">
                          <Input value={createdPayment.paymentUrl} readOnly className="flex-1" />
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(createdPayment.paymentUrl);
                              addToast("success", "URL copied!");
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500">Send this URL to your customer to complete the payment.</p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          className="flex-1"
                          onClick={() => window.open(createdPayment.paymentUrl, "_blank")}
                        >
                          Open Payment Page
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => {
                            setCreatedPayment(null);
                            setPaymentForm({ amount: "", currency: "USD", description: "", customerEmail: "", customerId: "", returnUrl: "", cancelUrl: "" });
                          }}
                        >
                          Create Another
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleCreatePayment} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Amount (in cents)"
                          type="number"
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm((p) => ({ ...p, amount: e.target.value }))}
                          placeholder="2999 = $29.99"
                          required
                        />
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                          <select
                            value={paymentForm.currency}
                            onChange={(e) => setPaymentForm((p) => ({ ...p, currency: e.target.value }))}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white"
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="ILS">ILS</option>
                          </select>
                        </div>
                      </div>

                      <Input
                        label="Description"
                        value={paymentForm.description}
                        onChange={(e) => setPaymentForm((p) => ({ ...p, description: e.target.value }))}
                        placeholder="Premium subscription"
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Customer Email"
                          type="email"
                          value={paymentForm.customerEmail}
                          onChange={(e) => setPaymentForm((p) => ({ ...p, customerEmail: e.target.value }))}
                          placeholder="customer@example.com"
                        />
                        <Input
                          label="Customer ID (your system)"
                          value={paymentForm.customerId}
                          onChange={(e) => setPaymentForm((p) => ({ ...p, customerId: e.target.value }))}
                          placeholder="user_123"
                        />
                      </div>

                      <Input
                        label="Return URL (after success)"
                        value={paymentForm.returnUrl}
                        onChange={(e) => setPaymentForm((p) => ({ ...p, returnUrl: e.target.value }))}
                        placeholder="https://yoursite.com/success"
                      />

                      <Input
                        label="Cancel URL"
                        value={paymentForm.cancelUrl}
                        onChange={(e) => setPaymentForm((p) => ({ ...p, cancelUrl: e.target.value }))}
                        placeholder="https://yoursite.com/cancel"
                      />

                      <Button type="submit" className="w-full" size="lg">
                        Create Payment
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* App Modal */}
      <Modal
        isOpen={appModalOpen}
        onClose={() => { setAppModalOpen(false); setEditingApp(null); }}
        title={editingApp ? "Edit App" : "Create New App"}
        description={editingApp ? "Update your app configuration" : "Set up a new payment app"}
      >
        <form onSubmit={editingApp ? handleUpdateApp : handleCreateApp} className="space-y-5">
          <Input
            label="App Name"
            value={appForm.name}
            onChange={(e) => setAppForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="My Payment App"
            required
          />

          {!editingApp && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Payment Provider</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(PROVIDERS) as ProviderType[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAppForm((p) => ({ ...p, provider: key }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      appForm.provider === key
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-xl mr-2">{PROVIDERS[key].icon}</span>
                    <span className="text-sm font-medium text-white">{PROVIDERS[key].label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <Input
            label="Webhook URL"
            value={appForm.webhookUrl}
            onChange={(e) => setAppForm((p) => ({ ...p, webhookUrl: e.target.value }))}
            placeholder="https://your-server.com/webhooks/tachles"
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setAppModalOpen(false); setEditingApp(null); }}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingApp ? "Save Changes" : "Create App"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmApp}
        onClose={() => setDeleteConfirmApp(null)}
        title="Delete App"
        description={`Are you sure you want to delete "${deleteConfirmApp?.name}"? This cannot be undone.`}
        size="sm"
      >
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteConfirmApp(null)}>Cancel</Button>
          <Button variant="danger" className="flex-1" onClick={handleDeleteApp}>Delete App</Button>
        </div>
      </Modal>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
