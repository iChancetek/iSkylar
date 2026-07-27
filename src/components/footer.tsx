"use client";

import Link from "next/link";
import { ShieldCheck, Heart, AlertTriangle } from "lucide-react";
import { PageTTSReader } from "@/components/page-tts-reader";

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-transparent py-16 text-white bg-[#07050e] backdrop-blur-xl pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6 space-y-10 max-w-6xl">
        
        {/* Brand & Tagline Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
            <span>iSkylar™ — Therapy, <span className="text-sky-400">Evolved.</span></span>
            <PageTTSReader textToRead="iSkylar Therapy, Evolved. Understand. Remember. Support. Grow. Private AI conversations designed to support your emotional well-being through personalized, long-term companionship. Your conversations are encrypted, private, and remain under your control." variant="compact" />
          </h2>
          <div className="inline-block rounded-full bg-purple-950/50 px-5 py-1.5 border border-purple-500/40 backdrop-blur-md">
            <p className="text-xs md:text-sm font-extrabold tracking-widest text-purple-200 uppercase">
              Understand. Remember. Support. Grow.
            </p>
          </div>
        </div>

        {/* Core Description */}
        <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
          Private AI conversations designed to support your emotional well-being through personalized, long-term companionship. Your conversations are encrypted, private, and remain under your control.
        </p>

        {/* Safety / Crisis Alert Box */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-amber-500/40 bg-[#130b24] p-5 md:p-6 backdrop-blur-md text-left shadow-2xl shadow-purple-950/30">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs md:text-sm text-zinc-200 leading-relaxed">
                <span className="font-bold text-amber-400 block text-sm">Important Notice:</span>
                iSkylar provides emotional support, self-reflection, and wellness guidance powered by artificial intelligence. It is not a substitute for licensed mental health care, medical advice, diagnosis, or treatment. If you believe you are experiencing a mental health emergency or are in immediate danger, call your local emergency services or contact a qualified crisis service immediately.
              </div>
            </div>
            <PageTTSReader textToRead="Important Notice: iSkylar provides emotional support, self-reflection, and wellness guidance powered by artificial intelligence. It is not a substitute for licensed mental health care, medical advice, diagnosis, or treatment. If you believe you are experiencing a mental health emergency or are in immediate danger, call your local emergency services or contact a qualified crisis service immediately." variant="compact" />
          </div>
        </div>

        {/* Security & Architecture Subhead */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-zinc-300 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Built with enterprise-grade security, advanced AI, and privacy by design.</span>
        </div>

        {/* Quick Links Navigation */}
        <div className="space-y-3 pt-2 text-center">
          <h3 className="text-xs uppercase tracking-widest font-bold text-purple-300/80">Quick Links</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs md:text-sm text-zinc-200 font-medium z-30 relative">
            <Link href="/privacy" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Privacy Policy</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/terms" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Terms of Service</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/security" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Security</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/trust" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Trust Center</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/cookies" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Cookie Policy</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/accessibility" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Accessibility</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/contact" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Contact Us</Link>
            <span className="text-zinc-600">•</span>
            <Link href="/help" className="hover:text-white hover:underline transition-colors cursor-pointer p-1">Help Center</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-transparent pt-6 space-y-3 text-center text-xs text-zinc-400">
          <p className="font-medium text-zinc-300">
            © 2026 ChanceTEK LLC. Developed by Chancellor Minus. All Rights Reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-zinc-400">
            <span>Version 2.0</span>
            <span>•</span>
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
            <span>to help people feel heard, understood, and supported.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
