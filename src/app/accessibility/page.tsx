"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, Accessibility, CheckCircle2, Mic, Volume2 } from "lucide-react";

export default function AccessibilityPage() {
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
            iSkylar Accessibility
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-400 font-semibold">
            <Accessibility className="h-3.5 w-3.5" />
            <span>Inclusive Design</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Accessibility Statement
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            iSkylar™ is committed to ensuring digital accessibility for all users, including people with visual, hearing, motor, or cognitive disabilities.
          </p>
        </div>

        <div className="space-y-6 text-sm md:text-base text-foreground/90 leading-relaxed">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Voice-First Accessibility</h3>
            </div>
            <p className="text-foreground/80">
              Our real-time speech recognition (OpenAI Whisper) and natural voice synthesis (OpenAI TTS) enable complete hands-free interaction for users with motor or visual impairments.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <Volume2 className="h-6 w-6 text-sky-400" />
              <h3 className="text-xl font-bold">WCAG 2.1 AA Compliance</h3>
            </div>
            <p className="text-foreground/80">
              We strive to adhere to the Web Content Accessibility Guidelines (WCAG 2.1 AA standards), featuring high-contrast themes, screen-reader aria labels, keyboard-navigable components, and clear focus indicators.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-xl font-bold">Feedback & Support</h3>
            <p className="text-foreground/80">
              If you encounter accessibility barriers on iSkylar, please contact our team at <a href="mailto:accessibility@chancetek.com" className="text-primary underline">accessibility@chancetek.com</a>. We welcome your feedback and actively work to enhance accessibility across all devices.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
