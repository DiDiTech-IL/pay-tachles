import Link from "next/link";
import { Header } from "./components/ui/header";
import { Container } from "./components/ui/container";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import PaymentFlowAnimation from "./components/payment-flow-animation";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: "Unified Transaction View",
    description: "Link provider responses with webhook events. See the complete transaction lifecycle in one place."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Complete Audit Trail",
    description: "Every request, response, and webhook logged and indexed. Debug payment issues in seconds."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Reliable Webhooks",
    description: "Automatic retries with exponential backoff. HMAC signatures for security. Never miss an event."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Security First",
    description: "API key authentication, encrypted storage, and PCI DSS compliant infrastructure."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "High Performance",
    description: "Sub-100ms latency. Global infrastructure. Handle millions of transactions per day."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Developer Friendly",
    description: "RESTful API, comprehensive documentation, and SDKs. Integrate in minutes."
  },
];

const trustIndicators = [
  { icon: "🛡️", label: "SOC 2 Compliant" },
  { icon: "🔐", label: "256-bit Encryption" },
  { icon: "⚡", label: "99.99% Uptime" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-sm font-medium text-indigo-300">Trusted by payment platforms worldwide</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              <span className="text-white">Payment Data</span>
              <br />
              <span className="gradient-text">Infrastructure</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              A unified payment routing layer that captures, correlates, and enriches every transaction. 
              Complete visibility from initiation to webhook delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/signup">
                <Button size="lg" rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }>
                  Start Building Free
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  View Documentation
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-slate-800 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
                {trustIndicators.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[128px] -z-10" />
      </section>

      {/* Payment Flow Section */}
      <section className="py-24 relative">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="purple" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Payment Flow Visualization
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Every payment flows through our infrastructure, ensuring complete data capture and correlation
            </p>
          </div>
          <Card variant="glass" className="overflow-hidden">
            <CardContent className="p-8">
              <PaymentFlowAnimation />
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to manage, track, and optimize your payment operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {features.map((feature) => (
              <Card key={feature.title} hover className="group">
                <CardContent>
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-24 relative">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="success" className="mb-4">Simple Integration</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Integrate in Minutes,<br />Not Days
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Replace your payment provider endpoints with Tachles Pay. We handle the routing, 
                logging, and webhook correlation automatically.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Drop-in Replacement", desc: "Compatible with existing payment provider APIs" },
                  { title: "No Code Changes", desc: "Update your endpoint URL and you're done" },
                  { title: "Instant Visibility", desc: "Start seeing enriched data immediately" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-0.5">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card variant="glass" className="overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Integration Example</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
              </div>
              <CardContent>
                <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
{`// Before
const url = "https://api.stripe.com/v1/charges"

// After
const url = "https://api.tachlespay.com/v1/charges"

// That's it! All data now flows through
// Tachles Pay for complete visibility`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <Container size="md">
          <Card variant="glass" className="text-center overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10" />
            <CardContent className="py-16 relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                Join companies using Tachles Pay to build reliable payment infrastructure. 
                Start for free, no credit card required.
              </p>
              <Link href="/signup">
                <Button size="lg" rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }>
                  Create Your Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><span className="text-slate-500">Status (coming soon)</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-white">Tachles Pay</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Tachles Pay. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
