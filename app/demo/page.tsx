"use client";

import Link from "next/link";
import { useState } from "react";
import {
    KPICard,
    LivePaymentFeed,
    LiveWebhookEvents,
    PulseIndicator,
    RevenueChart,
    StatusDistribution,
    formatCurrency,
    useDemoData,
} from "@/components/demo";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

// ============================================================================
// Demo Dashboard - Sales Manager View
// ============================================================================

export default function DemoDashboard() {
  const {
    payments,
    webhookEvents,
    stats,
    lastEvent,
    isSimulating,
    setIsSimulating,
    simulateEvent,
  } = useDemoData({
    initialCount: 30,
    eventInterval: 2500,
    autoSimulate: true,
  });

  const [selectedView, setSelectedView] = useState<"overview" | "feed" | "webhooks">("overview");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
                <Logo size="sm" />
              <span className="text-slate-600">|</span>
              <span className="text-sm font-medium text-slate-400">Live Demo Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <PulseIndicator active={isSimulating} label={isSimulating ? "Live" : "Paused"} />
              <Button
                variant={isSimulating ? "outline" : "primary"}
                size="sm"
                onClick={() => setIsSimulating(!isSimulating)}
              >
                {isSimulating ? "Pause" : "Resume"} Simulation
              </Button>
              <Button variant="secondary" size="sm" onClick={simulateEvent}>
                + Trigger Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <div className="border-b border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 py-2">
            {[
              { id: "overview", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
              { id: "feed", label: "Payment Feed", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
              { id: "webhooks", label: "Webhook Events", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedView(item.id as typeof selectedView)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedView === item.id
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Last Event Banner */}
        {lastEvent && (
          <div className="mb-6 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 flex items-center justify-between animate-pulse-once">
            <div className="flex items-center gap-3">
              <span className="text-lg">
                {lastEvent.status === "completed" ? "✅" :
                 lastEvent.status === "failed" ? "❌" :
                 lastEvent.status === "refunded" ? "↩️" :
                 lastEvent.status === "processing" ? "⏳" : "🔔"}
              </span>
              <div>
                <span className="text-sm text-white font-medium">{lastEvent.type}</span>
                <span className="text-sm text-slate-500 ml-2">
                  {lastEvent.paymentId.slice(0, 16)}...
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-500">just now</span>
          </div>
        )}

        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                label="Total Revenue"
                value={formatCurrency(stats.totalRevenue)}
                subValue={`${stats.completedCount} successful payments`}
                color="emerald"
                trend={{ value: 12.5, label: "vs last hour" }}
                icon={
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <KPICard
                label="Success Rate"
                value={`${stats.successRate.toFixed(1)}%`}
                subValue={`${stats.completedCount}/${stats.completedCount + stats.failedCount} transactions`}
                color="indigo"
                trend={{ value: 2.3, label: "improvement" }}
                icon={
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <KPICard
                label="Processing"
                value={`${stats.pendingCount + stats.processingCount}`}
                subValue="payments in progress"
                color="amber"
                icon={
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <KPICard
                label="Avg Processing Time"
                value={`${(stats.avgProcessingTime / 1000).toFixed(1)}s`}
                subValue="webhook delivery"
                color="purple"
                trend={{ value: -8.2, label: "faster" }}
                icon={
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Revenue Over Time</h3>
                    <p className="text-sm text-slate-500">Last 6 hours</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.totalRevenue)}</div>
                    <div className="text-xs text-slate-500">total revenue</div>
                  </div>
                </div>
                <RevenueChart data={stats.revenueByHour} />
              </div>

              {/* Status Distribution */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Payment Status</h3>
                    <p className="text-sm text-slate-500">Current distribution</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stats.totalTransactions}</div>
                    <div className="text-xs text-slate-500">total payments</div>
                  </div>
                </div>
                <StatusDistribution data={stats.statusBreakdown} />
                
                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
                  <div className="text-center">
                    <div className="text-xl font-bold text-emerald-400">{stats.completedCount}</div>
                    <div className="text-xs text-slate-500">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-400">{stats.failedCount}</div>
                    <div className="text-xs text-slate-500">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-400">{stats.refundedCount}</div>
                    <div className="text-xs text-slate-500">Refunded</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Feed Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Payments */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Live Payment Feed
                  </h3>
                  <button
                    onClick={() => setSelectedView("feed")}
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    View all →
                  </button>
                </div>
                <LivePaymentFeed payments={payments} maxItems={5} />
              </div>

              {/* Webhook Events */}
              <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Webhook Events
                  </h3>
                  <button
                    onClick={() => setSelectedView("webhooks")}
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    View all →
                  </button>
                </div>
                <LiveWebhookEvents events={webhookEvents} maxItems={6} />
              </div>
            </div>
          </div>
        )}

        {/* Feed View */}
        {selectedView === "feed" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Live Payment Feed</h2>
                <p className="text-slate-500">Real-time payment events as they happen</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {payments.length} payments tracked
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
              <LivePaymentFeed payments={payments} maxItems={20} />
            </div>
          </div>
        )}

        {/* Webhooks View */}
        {selectedView === "webhooks" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Webhook Events</h2>
                <p className="text-slate-500">All webhook notifications received</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                {webhookEvents.length} events
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50">
              <LiveWebhookEvents events={webhookEvents} maxItems={25} />
            </div>
          </div>
        )}

        {/* Code Example Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Build this dashboard with @tachles/core
              </h3>
              <p className="text-slate-400 max-w-xl">
                This demo showcases what you can build with the Tachles payment infrastructure package. 
                See live payment data before provider webhooks arrive.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/docs/examples">
                <Button variant="primary">
                  View Code Examples
                </Button>
              </Link>
              <Link href="https://github.com/DiDiTech-IL/pay-tachles" target="_blank">
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Logo size="sm" />
              <span>Demo Dashboard — Simulated Data</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/docs" className="text-slate-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/docs/examples" className="text-slate-400 hover:text-white transition-colors">
                Code Examples
              </Link>
              <Link href="https://www.npmjs.com/package/@tachles/core" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                npm Package
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
