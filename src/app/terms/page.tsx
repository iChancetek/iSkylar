"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck } from "lucide-react";
import { PageTTSReader } from "@/components/page-tts-reader";

export default function TermsOfServicePage() {
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
              iSkylar Terms of Service
            </span>
            <PageTTSReader />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-transparent pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary font-semibold">
            <FileText className="h-3.5 w-3.5" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-foreground/70 text-base md:text-lg">
            Last Updated: July 24, 2026 | ChanceTEK LLC
          </p>
        </div>

        {/* Crisis Warning Banner */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 backdrop-blur-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span>Critical Medical & Crisis Disclaimer</span>
          </div>
          <p className="text-sm text-amber-200/90 leading-relaxed">
            iSkylar provides AI-driven emotional support, self-reflection, and wellness guidance. It is <strong>NOT</strong> a licensed healthcare provider, medical device, or clinical therapy service. If you are experiencing a mental health emergency or suicidal thoughts, please call <strong>988</strong> (Suicide & Crisis Lifeline) or your local emergency services immediately.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 text-foreground/90 text-sm md:text-base leading-relaxed">
          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or using iSkylar™ (operated by ChanceTEK LLC), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue platform usage immediately.
            </p>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-foreground">2. User Eligibility & Accounts</h2>
            <p>
              You must be at least 18 years of age (or the legal age of majority in your jurisdiction) to use iSkylar. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-foreground">3. Acceptable Use Policy</h2>
            <p>
              You agree not to misuse the service, attempt unauthorized access to vector databases, reverse-engineer agent system prompts, or utilize the platform for illegal activities.
            </p>
          </section>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-foreground">4. Limitation of Liability</h2>
            <p>
              ChanceTEK LLC and its developers shall not be liable for any indirect, incidental, or consequential damages resulting from your use of artificial intelligence companions for self-reflection and emotional support.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
