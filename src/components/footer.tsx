"use client";

import Link from "next/link";
import { ShieldCheck, Heart, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 py-16 text-foreground bg-black/80 backdrop-blur-md pointer-events-auto">
      <div className="container mx-auto px-4 md:px-6 space-y-10 max-w-6xl">
        
        {/* Brand & Tagline Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-sky-400">
            iSkylar™ — Therapy, Evolved.
          </h2>
          <p className="text-sm md:text-base font-semibold tracking-wide text-primary/90 uppercase">
            Understand. Remember. Support. Grow.
          </p>
        </div>

        {/* Core Description */}
        <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-foreground/80 leading-relaxed">
          Private AI conversations designed to support your emotional well-being through personalized, long-term companionship. Your conversations are encrypted, private, and remain under your control.
        </p>

        {/* Safety / Crisis Alert Box */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 md:p-6 backdrop-blur-sm text-left shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs md:text-sm text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300 block">Important Notice:</span>
              iSkylar provides emotional support, self-reflection, and wellness guidance powered by artificial intelligence. It is not a substitute for licensed mental health care, medical advice, diagnosis, or treatment. If you believe you are experiencing a mental health emergency or are in immediate danger, call your local emergency services or contact a qualified crisis service immediately.
            </div>
          </div>
        </div>

        {/* Security & Architecture Subhead */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-foreground/70 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Built with enterprise-grade security, advanced AI, and privacy by design.</span>
        </div>

        {/* Quick Links Navigation */}
        <div className="space-y-3 pt-2 text-center">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground/50">Quick Links</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs md:text-sm text-foreground/80 font-medium z-30 relative">
            <Link href="/privacy" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Privacy Policy</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/terms" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Terms of Service</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/security" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Security</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/trust" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Trust Center</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/cookies" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Cookie Policy</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/accessibility" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Accessibility</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/contact" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Contact Us</Link>
            <span className="text-foreground/30">•</span>
            <Link href="/help" className="hover:text-primary hover:underline transition-colors cursor-pointer p-1">Help Center</Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 space-y-3 text-center text-xs text-foreground/60">
          <p className="font-medium">
            © 2026 ChanceTEK LLC. Developed by Chancellor Minus. All Rights Reserved.
          </p>
          <p className="flex items-center justify-center gap-1.5 text-foreground/50">
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
