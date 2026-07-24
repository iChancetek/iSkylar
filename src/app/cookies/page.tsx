"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, Cookie, Check } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            iSkylar Cookie Policy
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 font-semibold">
            <Cookie className="h-3.5 w-3.5" />
            <span>Cookie & Tracking Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            This Cookie Policy explains how iSkylar™ uses essential cookies and local browser storage to maintain secure authentication and companion state.
          </p>
        </div>

        <div className="space-y-6 text-sm md:text-base text-foreground/90 leading-relaxed">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xl font-bold">1. Strictly Necessary Cookies</h3>
            <p className="text-foreground/80">
              We utilize essential session tokens and authentication cookies (via Clerk / Firebase Authentication) to keep your account securely logged in and protect your session state. These cookies cannot be disabled as the application cannot function without them.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xl font-bold">2. Local Browser Storage</h3>
            <p className="text-foreground/80">
              iSkylar uses IndexedDB (<code className="text-primary font-mono">idb-keyval</code>) and LocalStorage strictly to store client-side app preferences, active agent selections, and local PWA cache states for offline capability.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xl font-bold">3. No Advertising Cookies</h3>
            <p className="text-foreground/80">
              iSkylar does <strong>NOT</strong> place third-party tracking pixels, advertising cookies, or behavioral targeting scripts on your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
