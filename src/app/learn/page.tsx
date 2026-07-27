"use client";

import Link from "next/link";
import { ArrowLeft, Brain, Sparkles, Heart, Zap, Shield, ShieldCheck, Clock, Lock, Smile, Volume2, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { PageTTSReader } from "@/components/page-tts-reader";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#07060b] text-white selection:bg-purple-500/30 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent border-none shadow-none pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 shadow-md">
              <Brain className="h-5 w-5 text-purple-400" />
            </div>
            <span>iSkylar</span>
          </Link>
          <div className="flex items-center gap-4">
            <PageTTSReader />
            <Link href="/">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-950/40 px-4 py-1.5 text-xs md:text-sm font-semibold text-purple-300 backdrop-blur-md shadow-sm mb-6">
          <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
          <span>5 Specialized Companions • One Unified Memory</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent leading-tight">
          A Team of Experts — Tailored to Every Need
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          You're not limited to a single perspective. Switch seamlessly between 5 distinct AI companions—each with a unique voice, role, and therapeutic background, all sharing identical memory of your journey.
        </p>
      </section>

      {/* 5 Companions Roster */}
      <section className="py-20 bg-black/40 border-t border-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">Meet Your Companions</h2>
            <p className="text-purple-300 font-medium text-base">Select the right energy for your exact moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skylar */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/40 via-white/5 to-transparent border border-purple-500/30 hover:border-purple-400 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Voice: Nova
                </span>
                <span className="text-xs font-semibold text-zinc-400">Emotional Support & Guidance</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">Skylar</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-purple-400 mb-4">THE THERAPIST</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Warm, empathetic, and clinically grounded. Skylar is your safe harbor for deep emotional processing, healing, CBT techniques, and self-reflection.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> Best for CBT, stress & emotional healing
                </div>
                <PageTTSReader textToRead="Voice Nova. Skylar. The Therapist. Warm, empathetic, and clinically grounded. Skylar is your safe harbor for deep emotional processing, healing, CBT techniques, and self-reflection. Emotional Support and Guidance." variant="compact" />
              </div>
            </div>

            {/* Chancellor */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/40 via-white/5 to-transparent border border-blue-500/30 hover:border-blue-400 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-400"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Voice: Onyx
                </span>
                <span className="text-xs font-semibold text-zinc-400">Wisdom, Strategy & Growth</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">Chancellor</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-blue-400 mb-4">STRATEGIC MENTOR & COACH</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Embodiment of wisdom, calm confidence, discipline, and high-character leadership. Your strategist for career, AI tech, mindfulness, and personal growth.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> Best for career strategy, leadership & growth
                </div>
                <PageTTSReader textToRead="Voice Onyx. Chancellor. Strategic Mentor and Coach. Embodiment of wisdom, calm confidence, discipline, and high-character leadership. Your strategist for career, AI tech, mindfulness, and personal growth. Wisdom, Strategy and Growth." variant="compact" />
              </div>
            </div>

            {/* Sydney */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/40 via-white/5 to-transparent border border-amber-500/30 hover:border-amber-400 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Voice: Shimmer
                </span>
                <span className="text-xs font-semibold text-zinc-400">Motivation & Positivity</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">Sydney</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-amber-400 mb-4">THE OPTIMIST</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Sunshine energy. Sydney is here to lift your mood, celebrate your wins (big or small), and remind you of the bright side with actionable hope.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Best for mood boosts & celebrating victories
                </div>
                <PageTTSReader textToRead="Voice Shimmer. Sydney. The Optimist. Sunshine energy. Sydney is here to lift your mood, celebrate your wins, big or small, and remind you of the bright side with actionable hope. Motivation and Positivity." variant="compact" />
              </div>
            </div>

            {/* Hailey */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-pink-950/40 via-white/5 to-transparent border border-pink-500/30 hover:border-pink-400 transition-all duration-300 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-400"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Voice: Fable
                </span>
                <span className="text-xs font-semibold text-zinc-400">Direct & Honest Sounding Board</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">Hailey</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-pink-400 mb-4">BEST FRIEND</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Smart, playful, and relentlessly honest. Hailey gives you the reality check you need with warmth, humor, and unwavering loyalty.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-pink-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" /> Best for honest feedback & friendly banter
                </div>
                <PageTTSReader textToRead="Voice Fable. Hailey. Best Friend. Smart, playful, and relentlessly honest. Hailey gives you the reality check you need with warmth, humor, and unwavering loyalty. Direct and Honest Sounding Board." variant="compact" />
              </div>
            </div>

            {/* Chris */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-white/5 to-transparent border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 shadow-2xl relative overflow-hidden group md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" /> Voice: Echo
                </span>
                <span className="text-xs font-semibold text-zinc-400">Mindfulness & Relaxation</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-1">Chris</h3>
              <p className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-4">THE CHILL ONE</p>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Grounded and calm. Chris is the late-night conversation partner who helps you slow down, breathe, decompress, and practice mindfulness.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Best for late-night talks & meditation
                </div>
                <PageTTSReader textToRead="Voice Echo. Chris. The Chill One. Grounded and calm. Chris is the late-night conversation partner who helps you slow down, breathe, decompress, and practice mindfulness. Mindfulness and Relaxation." variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose iSkylar? Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Why Choose iSkylar?</h2>
            <PageTTSReader textToRead="Why Choose iSkylar? 24/7 Availability: Support whenever you need it, day or night. Judgment Free: A safe space to express yourself freely without fear. Instant Relief: Talk through anxiety and stress in moments. 100% Confidential: Your secrets are encrypted and remain strictly private." variant="compact" />
          </div>
          <p className="text-zinc-400">Built around trust, privacy, and continuous memory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">24/7 Availability</h3>
            <p className="text-sm text-zinc-300">Support whenever you need it, day or night.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Judgment Free</h3>
            <p className="text-sm text-zinc-300">A safe space to express yourself freely without fear.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Instant Relief</h3>
            <p className="text-sm text-zinc-300">Talk through anxiety and stress in moments.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">100% Confidential</h3>
            <p className="text-sm text-zinc-300">Your secrets are encrypted and remain strictly private.</p>
          </div>
        </div>
      </section>

      {/* iSkylar Tagline & Privacy Statement */}
      <section className="py-20 bg-gradient-to-b from-purple-950/30 via-black to-black border-t border-transparent text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              iSkylar™ — Therapy, <span className="text-sky-400">Evolved.</span>
            </h2>
            <PageTTSReader textToRead="iSkylar Therapy, Evolved. Understand. Remember. Support. Grow. Private AI conversations designed to support your emotional well-being through personalized, long-term companionship. Your conversations are encrypted, private, and remain under your control." variant="compact" />
          </div>
          <div className="inline-block rounded-full bg-purple-950/60 px-6 py-2 border border-purple-500/40">
            <p className="text-xs md:text-sm font-extrabold tracking-widest text-purple-200 uppercase">
              Understand. Remember. Support. Grow.
            </p>
          </div>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            Private AI conversations designed to support your emotional well-being through personalized, long-term companionship. Your conversations are encrypted, private, and remain under your control.
          </p>
          <div className="pt-6">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-xl shadow-purple-600/30">
                Start Your Companion Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
