"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, Mail, MapPin, Building, MessageSquare } from "lucide-react";

export default function ContactUsPage() {
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
            Contact iSkylar
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-400 font-semibold">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact Us
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            Have questions about iSkylar™ companions, enterprise integration, or technical support? Get in touch with our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Email Support</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              For general support, feedback, or account inquiries:
            </p>
            <a href="mailto:support@chancetek.com" className="text-primary font-medium hover:underline text-sm block">
              support@chancetek.com
            </a>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-bold">Developer & Ownership</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Developed by Chancellor Minus @ <strong>ChanceTEK LLC</strong>
            </p>
            <p className="text-xs text-foreground/60">
              In partnership with iSynera LLC & Famio.us
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
