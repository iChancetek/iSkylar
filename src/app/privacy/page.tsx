"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { Shield, ArrowLeft, Lock, Database, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            iSkylar Privacy Policy
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        {/* Hero Section */}
        <div className="space-y-4 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-semibold">
            <Shield className="h-3.5 w-3.5" />
            <span>Privacy by Design</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-foreground/70 text-base md:text-lg">
            Effective Date: July 24, 2026 | Version 2.0
          </p>
          <p className="text-foreground/80 leading-relaxed">
            At iSkylar™ (operated by ChanceTEK LLC), we believe that emotional well-being requires total privacy and uncompromised trust. Your voice conversations, memory entries, and personal reflection data are encrypted, protected, and strictly under your ownership.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-foreground/90 text-sm md:text-base leading-relaxed">
          
          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
            </div>
            <p>
              To provide personalized AI therapy companionship and long-term memory continuity across your sessions, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Account Credentials:</strong> Basic registration data (name, email address, and authentication provider tokens).</li>
              <li><strong>Voice & Text Inputs:</strong> Audio streams and text inputs provided during active companion turns for real-time speech processing and memory extraction.</li>
              <li><strong>Long-Term Memory Data:</strong> Key preferences, emotional patterns, goals, and factual updates extracted automatically to preserve session continuity across your companion ecosystem.</li>
              <li><strong>Technical Metadata:</strong> Anonymized diagnostic logs, performance metrics, and session duration data for platform optimization.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-purple-400" />
              <h2 className="text-xl font-bold text-foreground">2. How We Use Your Data</h2>
            </div>
            <p>
              Your data is utilized strictly to deliver, maintain, and personalize the iSkylar companion experience. Specifically:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>To compile your four-tier persistent long-term memory context (Working Memory, Redis High-Speed Cache, Firestore Structured Facts, and Pinecone Vector Store).</li>
              <li>To tailor response tone and therapeutic guidance for your active agent companion (Skylar, Chancellor, Sydney, Hailey, or Chris).</li>
              <li>We <strong>NEVER</strong> sell your personal data or conversation transcripts to third parties, advertisers, or data brokers.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-foreground">3. Encryption & Data Isolation</h2>
            </div>
            <p>
              All user content is protected in transit using TLS 1.3 encryption and at rest using AES-256 enterprise encryption. Vector embeddings in Pinecone are strictly scoped by your unique User ID, preventing any possibility of cross-user memory leakage.
            </p>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-foreground">4. Your Data Rights & Deletion</h2>
            <p>
              You maintain total authority over your personal memories and conversation history. You may request full memory exports or permanent deletion of your account and all associated vector indexes at any time by contacting <a href="mailto:privacy@chancetek.com" className="text-primary underline">privacy@chancetek.com</a> or using the in-app account settings.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
