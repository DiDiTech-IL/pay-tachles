import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tachles Pay - Payment Data Hub",
  description: "Route payments through Tachles Pay to track, link, and enrich your payment data with webhook events and logs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-slate-100`}
      >
        {/* Global background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        {children}
      </body>
    </html>
  );
}
