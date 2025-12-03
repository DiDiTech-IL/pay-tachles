import Link from "next/link";
import { Header } from "../components/ui/header";
import { Container } from "../components/ui/container";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Real-Time Data",
    description: "See payment status changes as they happen, before webhooks arrive from your payment provider."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Live Analytics",
    description: "Revenue graphs, success rates, and KPIs updating in real-time. Built for sales managers."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Effect-TS Powered",
    description: "Type-safe, composable, and runtime-agnostic. Works on Node.js, Cloudflare Workers, Deno, and more."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    title: "Pluggable Storage",
    description: "Swap database and storage providers without changing code. Memory, KV, Redis, or custom."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    title: "Webhook Correlation",
    description: "Link provider responses with webhook events. Complete transaction lifecycle in one place."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Security Built-In",
    description: "HMAC webhook signatures, timing-safe comparisons, and secure crypto utilities included."
  },
];

const codeExample = `import { Effect } from "effect";
import { 
  makeFetchRuntime, 
  Database,
  createCloudflareKVStorage 
} from "@tachles/core/adapters/cloudflare";

const runtime = makeFetchRuntime({
  makeStorage: (env) => 
    createCloudflareKVStorage(env.TACHLES_KV)
});

export default {
  fetch: runtime((request, env) =>
    Effect.gen(function* () {
      const db = yield* Database;
      const payments = yield* db.listPayups();
      return Response.json(payments);
    })
  )
};`;

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-300">npm install @tachles/core</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              <span className="text-white">Payment Infrastructure</span>
              <br />
              <span className="gradient-text">for Developers</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              An unopinionated, runtime-agnostic payment toolkit built with Effect-TS.
              Complete visibility into every transaction &mdash; live, before webhooks arrive.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/demo">
                <Button size="lg" rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }>
                  View Live Demo
                </Button>
              </Link>
              <Link href="/docs/examples">
                <Button variant="outline" size="lg">
                  Code Examples
                </Button>
              </Link>
            </div>

            {/* Install Command */}
            <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <code className="text-sm font-mono text-slate-300">npm install @tachles/core effect</code>
              {/* <button
                onClick={() => navigator.clipboard.writeText("npm install @tachles/core effect")}
                className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button> */}
            </div>
          </div>
        </Container>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[128px] -z-10" />
      </section>

      {/* Live Demo Preview Section */}
      <section className="py-24 relative">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="purple" className="mb-4">Live Demo</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Watch payments flow through in real-time. This is what your sales team dashboard could look like.
            </p>
          </div>
          
          <Card variant="glass" className="overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-slate-400">Live Payment Feed</span>
              </div>
              <Link href="/demo" className="text-sm text-indigo-400 hover:text-indigo-300">
                Open Full Demo →
              </Link>
            </div>
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900/50 flex items-center justify-center">
                <Link href="/demo" className="group flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors">Click to launch interactive demo</span>
                </Link>
              </div>
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
              Built for Sales Teams &amp; Developers
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to monitor, track, and analyze payment data in real-time
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

      {/* Code Example Section */}
      <section className="py-24 relative">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="success" className="mb-4">Developer Experience</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Type-Safe &amp;<br />Runtime-Agnostic
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Built with Effect-TS for robust error handling and dependency injection. 
                Deploy anywhere &mdash; Node.js, Cloudflare Workers, Deno, or Bun.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Effect-TS Powered", desc: "Type-safe errors, composable services, testable code" },
                  { title: "Zero Lock-in", desc: "Swap providers without changing application code" },
                  { title: "Batteries Included", desc: "Crypto utilities, webhook verification, and more" },
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
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Cloudflare Worker</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
              </div>
              <CardContent>
                <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                  <code>{codeExample}</code>
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
                Ready to Build?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                Check out the live demo to see what&apos;s possible, then dive into the code examples
                to start building your own payment dashboard.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }>
                    View Live Demo
                  </Button>
                </Link>
                <Link href="https://github.com/DiDiTech-IL/pay-tachles" target="_blank">
                  <Button variant="outline" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/demo" className="text-slate-400 hover:text-white transition-colors">Live Demo</Link></li>
                <li><Link href="/docs" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/docs/examples" className="text-slate-400 hover:text-white transition-colors">Code Examples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Package</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="https://www.npmjs.com/package/@tachles/core" target="_blank" className="text-slate-400 hover:text-white transition-colors">npm</Link></li>
                <li><Link href="https://github.com/DiDiTech-IL/pay-tachles" target="_blank" className="text-slate-400 hover:text-white transition-colors">GitHub</Link></li>
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
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
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
              <span className="font-bold text-white">@tachles/core</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} DiDiTech-IL. Open source under MIT license.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
