"use client";

import Link from "next/link";
import { Footer } from "@/components/footer";
import { ArrowLeft, HelpCircle, Mic, Users, Brain, Shield } from "lucide-react";
import { PageTTSReader } from "@/components/page-tts-reader";

export default function HelpCenterPage() {
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
              iSkylar Help Center
            </span>
            <PageTTSReader />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 max-w-4xl space-y-10">
        <div className="space-y-4 text-center md:text-left border-b border-transparent pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-400 font-semibold">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>User Guide & FAQs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Help Center
          </h1>
          <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
            Learn how to make the most of your iSkylar companions, voice therapy sessions, long-term memory system, and multi-agent switching.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6 text-sm md:text-base text-foreground/90 leading-relaxed">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Mic className="h-5 w-5" />
              <span>How does voice therapy work on iSkylar?</span>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              Press the microphone button or start a session to speak naturally. iSkylar uses OpenAI Whisper for speech recognition, processes your input through GPT-5.6 Terra with four-tier long-term memory, and streams real-time spoken audio responses using OpenAI TTS.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-lg">
              <Users className="h-5 w-5" />
              <span>How do I switch between companions?</span>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              Click the agent sidebar on the left side of your session screen to select any of the 5 AI companions (Skylar, Chancellor, Sydney, Hailey, or Chris). The new companion will introduce themselves by name and role while sharing the exact same long-term memory.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
              <Brain className="h-5 w-5" />
              <span>How does long-term memory work?</span>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              Our automated memory extraction engine indexes your personal preferences, goals, relationships, and emotional trends into a four-tier stack (LangGraph Working Memory, Upstash Redis Cache, Firestore Structured Facts, and Pinecone Vector Store). All companions remember past sessions across months and years.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
