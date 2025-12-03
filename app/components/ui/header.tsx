'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './logo';
import { Button } from './button';

interface HeaderProps {
  variant?: 'marketing' | 'dashboard';
  transparent?: boolean;
}

export function Header({ variant = 'marketing', transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (variant === 'dashboard') {
    return null; // Dashboard has its own header in the layout
  }

  return (
    <>
      <header className={`sticky top-0 z-50 ${transparent ? 'bg-transparent' : 'bg-slate-950/80'} backdrop-blur-xl border-b border-slate-800/50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/docs" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
                Docs
              </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
                About
              </Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="md">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="md">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50">
            <nav className="px-4 py-4 space-y-1">
              <Link href="/docs" className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Documentation
              </Link>
              <Link href="/about" className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Get Started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
