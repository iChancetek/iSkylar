"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, ShieldCheck, Key, Lock, Server, Cpu } from "lucide-react";
import { PageTTSReader } from "@/components/page-tts-reader";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-transparent bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              iSkylar Security & Compliance
            </span>
            <PageTTSReader />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-transparent pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Enterprise-Grade Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Security & Architecture
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            iSkylar is engineered from the ground up with military-grade encryption, zero cross-tenant memory leakage, and isolated vector memory namespaces to protect your personal reflections.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold">End-to-End Encryption</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              All audio streams, text messages, and session state tokens are encrypted in transit using TLS 1.3 and at rest using AES-256 standards.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-bold">Google Secret Manager</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              All API credentials and service keys are hosted inside GCP Secret Manager with restricted IAM service account execution.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-sky-400" />
              <h3 className="text-lg font-bold">Pinecone Namespace Isolation</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Semantic memory records are filtered strictly by <code className="text-primary font-mono text-xs">userId</code> in Pinecone vector indexes, guaranteeing complete data isolation.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-bold">Upstash Redis Cache TTL</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              High-speed memory compilation uses automated 10-minute cache expiration, ensuring no stale context remains exposed after session termination.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
