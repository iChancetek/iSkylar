"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, Award, CheckCircle2, Shield, HeartHandshake } from "lucide-react";

export default function TrustCenterPage() {
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
            iSkylar Trust Center
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-400 font-semibold">
            <Award className="h-3.5 w-3.5" />
            <span>Built on Uncompromised Trust</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Trust & AI Ethics Center
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            Trust is the cornerstone of iSkylar. Learn about our commitments to AI ethics, clinical grounding, safety net guardrails, and data ownership.
          </p>
        </div>

        {/* Pillars of Trust */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold">1. Clinically-Informed Guardrails</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                All 5 agent companion prompts draw from Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and positive psychology while maintaining clear boundary controls.
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <HeartHandshake className="h-6 w-6 text-purple-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold">2. Real-Time Safety Net Activation</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Every user message is evaluated in parallel by a dedicated safety detection model (`safetyNetActivation`). If acute crisis or self-harm is detected, immediate crisis hotline resources (988) are prioritized over companion dialog.
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <Shield className="h-6 w-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold">3. No Unauthorized Model Training</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Your private conversations and memory vector entries are strictly isolated and are NEVER submitted for foundation model training or public AI dataset creation.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
