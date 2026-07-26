"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Sparkles, Clock, Volume2, VolumeX, Briefcase, Sun, Smile, Wind, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { useRef, useState } from "react";

export default function LandingPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#07060b] text-white selection:bg-purple-500 selection:text-white">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07060b]/85 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 shadow-md shadow-purple-500/20">
                            <Brain className="h-5 w-5 text-purple-400" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-white">
                            iSkylar
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full px-6 shadow-lg shadow-purple-500/30 border border-purple-400/20 font-semibold text-sm">
                                Get Started
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32 lg:py-36">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover opacity-90"
                        >
                            <source src="/background-video.mp4" type="video/mp4" />
                        </video>
                        {/* Subtle gradient overlay for high visibility & text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#07060b]/35 to-[#07060b]" />
                    </div>

                    {/* Audio Toggle Button */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 transition-all shadow-xl text-white"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? (
                            <VolumeX className="h-5 w-5 text-white/80" />
                        ) : (
                            <Volume2 className="h-5 w-5 text-purple-400" />
                        )}
                    </button>

                    <div className="container relative z-10 mx-auto px-4 text-center md:px-6 max-w-5xl">
                        <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                            
                            {/* Pill Badge */}
                            <div className="inline-flex items-center rounded-full border border-purple-500/40 bg-purple-950/40 px-4 py-1.5 text-xs md:text-sm font-semibold text-purple-300 backdrop-blur-md shadow-sm">
                                <Sparkles className="mr-2 h-4 w-4 text-purple-400" />
                                <span>AI-Powered Mental Wellness</span>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                                Your Personal AI <br />
                                <span className="text-purple-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">Voice Therapist</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="mx-auto max-w-[650px] text-base md:text-lg text-zinc-300 leading-relaxed font-normal">
                                Experience empathetic, real-time voice conversations with an intelligent companion who is always here to listen, support, and guide you.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-2">
                                <Link href="/signup">
                                    <Button size="lg" className="h-13 min-w-[210px] rounded-full px-8 text-base font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-600/35 transition-all hover:scale-105 active:scale-95 border border-purple-400/30">
                                        Start Your Session
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="h-13 min-w-[210px] rounded-full px-8 text-base font-medium bg-black/50 border-purple-500/30 text-white hover:bg-purple-950/30 hover:border-purple-400 transition-all">
                                        Welcome Back
                                    </Button>
                                </Link>
                            </div>

                            {/* Meet the Agents Link */}
                            <div className="pt-2">
                                <Link href="/learn-more">
                                    <span className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-purple-300 transition-colors font-medium cursor-pointer">
                                        Meet the Agents →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team of Experts Section (Cards) */}
                <section className="container mx-auto px-4 py-20 md:py-28 text-center max-w-6xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-4 py-1.5 text-xs md:text-sm font-semibold text-purple-300 backdrop-blur-md mb-6 shadow-sm">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>5 Specialized Companions • One Unified Memory</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                        <span className="text-white">A Team of Experts — </span>
                        <span className="text-sky-400">Tailored to Every Need</span>
                    </h2>
                    <p className="text-zinc-300 max-w-3xl mx-auto mb-14 text-base md:text-lg leading-relaxed font-normal">
                        You&apos;re not limited to a single perspective. Switch seamlessly between 5 distinct AI companions—each with a unique voice, role, and therapeutic background, all sharing identical memory of your journey.
                    </p>

                    {/* 5 Companion Cards Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
                        
                        {/* 1. Skylar */}
                        <div className="group relative rounded-3xl border border-purple-500/30 bg-[#0d0b18]/90 p-7 backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                    <Brain className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-purple-950/60 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
                                    Voice: Nova
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Skylar</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-purple-400 mb-3">
                                THE THERAPIST
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Warm, empathetic, and clinically grounded. Skylar is your safe harbor for deep emotional processing, healing, CBT techniques, and self-reflection.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-purple-300">
                                <span>Emotional Support & Guidance</span>
                            </div>
                        </div>

                        {/* 2. Chancellor */}
                        <div className="group relative rounded-3xl border border-teal-500/30 bg-[#051113]/90 p-7 backdrop-blur-md transition-all duration-300 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-teal-950/60 px-3 py-1 text-xs font-bold text-teal-300 border border-teal-500/30">
                                    Voice: Onyx
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Chancellor</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-teal-400 mb-3">
                                STRATEGIC MENTOR & COACH
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Embodiment of wisdom, calm confidence, discipline, and high-character leadership. Your strategist for career, AI tech, mindfulness, and personal growth.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-teal-300">
                                <span>Wisdom, Strategy & Growth</span>
                            </div>
                        </div>

                        {/* 3. Sydney */}
                        <div className="group relative rounded-3xl border border-amber-500/30 bg-[#140e05]/90 p-7 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                    <Sun className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-amber-950/60 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                                    Voice: Shimmer
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Sydney</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-3">
                                THE OPTIMIST
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Sunshine energy. Sydney is here to lift your mood, celebrate your wins (big or small), and remind you of the bright side with actionable hope.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-amber-300">
                                <span>Motivation & Positivity</span>
                            </div>
                        </div>

                        {/* 4. Hailey */}
                        <div className="group relative rounded-3xl border border-violet-500/30 bg-[#100718]/90 p-7 backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/20 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                                    <Smile className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-violet-950/60 px-3 py-1 text-xs font-bold text-violet-300 border border-violet-500/30">
                                    Voice: Fable
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Hailey</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-violet-400 mb-3">
                                BEST FRIEND
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Smart, playful, and relentlessly honest. Hailey gives you the reality check you need with warmth, humor, and unwavering loyalty.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-violet-300">
                                <span>Direct & Honest Sounding Board</span>
                            </div>
                        </div>

                        {/* 5. Chris */}
                        <div className="group relative rounded-3xl border border-emerald-500/30 bg-[#05120c]/90 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    <Wind className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                                    Voice: Echo
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Chris</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 mb-3">
                                THE CHILL ONE
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Grounded and calm. Chris is the late-night conversation partner who helps you slow down, breathe, decompress, and practice mindfulness.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-emerald-300">
                                <span>Mindfulness & Relaxation</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Why Choose iSkylar? Section */}
                <section className="border-t border-white/10 bg-black/40 py-20 md:py-28">
                    <div className="container mx-auto px-4 text-center md:px-6 max-w-6xl">
                        <h2 className="mb-14 text-3xl md:text-4xl font-extrabold text-white">Why Choose iSkylar?</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-[#0d0d12]/90 border border-white/10 p-7 shadow-lg">
                                <Clock className="mb-2 h-8 w-8 text-purple-400" />
                                <h4 className="text-xl font-bold text-white">24/7 Availability</h4>
                                <p className="text-sm text-zinc-400">Support whenever you need it</p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-[#0d0d12]/90 border border-white/10 p-7 shadow-lg">
                                <Heart className="mb-2 h-8 w-8 text-red-400" />
                                <h4 className="text-xl font-bold text-white">Judgment Free</h4>
                                <p className="text-sm text-zinc-400">A safe space to be yourself</p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-[#0d0d12]/90 border border-white/10 p-7 shadow-lg">
                                <Sparkles className="mb-2 h-8 w-8 text-amber-400" />
                                <h4 className="text-xl font-bold text-white">Instant Relief</h4>
                                <p className="text-sm text-zinc-400">Talk through anxiety in moments</p>
                            </div>
                            <div className="flex flex-col items-center space-y-3 rounded-2xl bg-[#0d0d12]/90 border border-white/10 p-7 shadow-lg">
                                <Shield className="mb-2 h-8 w-8 text-emerald-400" />
                                <h4 className="text-xl font-bold text-white">100% Confidential</h4>
                                <p className="text-sm text-zinc-400">Your secrets are safe with us</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
