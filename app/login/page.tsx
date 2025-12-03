"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Logo } from "../components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple demo login - just redirect to dashboard
    // In production, you'd implement proper auth here
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <Logo />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400">Sign in to your Tachles Pay account</p>
          </div>

          {/* Form Card */}
          <Card variant="glass">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">
                      Password
                    </label>
                    <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Create one for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-linear-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-l border-slate-800">
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Payment Data Infrastructure</h2>
            <p className="text-slate-400 leading-relaxed">
              Complete visibility into your payment operations. Track transactions, 
              correlate webhooks, and debug issues in real-time.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-800">
              <div>
                <div className="text-2xl font-bold text-white">99.99%</div>
                <div className="text-sm text-slate-500">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt;100ms</div>
                <div className="text-sm text-slate-500">Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-sm text-slate-500">Transactions</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
    </div>
  );
}
