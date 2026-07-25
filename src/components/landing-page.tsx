
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Shield, Sparkles, Mic, Clock, Volume2, VolumeX, Briefcase, Sun, Smile, Wind, Users, ArrowRight } from "lucide-react";
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
        <div className="flex min-h-screen flex-col bg-background">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Brain className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                            iSkylar
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-medium">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/25">
                                Get Started
                            </Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        >
                            <source src="/background-video.mp4" type="video/mp4" />
                        </video>
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
                    </div>

                    {/* Audio Toggle Button */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all shadow-lg"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? (
                            <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                            <Volume2 className="h-5 w-5 text-white" />
                        )}
                    </button>

                    <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
                        <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                                <Sparkles className="mr-2 h-3.5 w-3.5" />
                                <span>AI-Powered Mental Wellness</span>
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                Your Personal AI <br />
                                <span className="text-primary">Voice Therapist</span>
                            </h1>

                            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                                Experience empathetic, real-time voice conversations with an intelligent companion who is always here to listen, support, and guide you.
                            </p>

                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link href="/signup">
                                    <Button size="lg" className="h-12 min-w-[200px] rounded-full px-8 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                        Start Your Session
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="h-12 min-w-[200px] rounded-full px-8 text-lg border-primary/20 hover:bg-primary/5">
                                        Welcome Back
                                    </Button>
                                </Link>
                            </div>

                            <div className="pt-4">
                                <Link href="/learn-more">
                                    <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5">
                                        Meet the Agents →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="container mx-auto px-4 py-16 md:py-24 md:px-6">
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="group relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                            <CardContent className="p-8">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                                    <Mic className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Natural Voice Interaction</h3>
                                <p className="text-muted-foreground">
                                    Talk naturally as you would with a human. Our advanced voice engine captures nuances, tone, and emotion.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                            <CardContent className="p-8">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 transition-colors group-hover:bg-purple-500/20">
                                    <Brain className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Deep Empathy</h3>
                                <p className="text-muted-foreground">
                                    Skylar is trained to understand complex emotions and provide meaningful, therapeutic support when you need it most.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                            <CardContent className="p-8">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                                    <Shield className="h-6 w-6 text-emerald-500" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold">Private & Secure</h3>
                                <p className="text-muted-foreground">
                                    Your privacy is our top priority. All conversations are encrypted and you have full control over your data.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Testimonial / Impact Section */}
                <section className="border-t border-white/5 bg-white/5 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <h2 className="mb-12 text-3xl font-bold md:text-4xl">Why Choose iSkylar?</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col items-center space-y-2 rounded-2xl bg-background/50 p-6 shadow-sm">
                                <Clock className="mb-2 h-8 w-8 text-primary/80" />
                                <h4 className="text-xl font-bold">24/7 Availability</h4>
                                <p className="text-sm text-muted-foreground">Support whenever you need it</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-2xl bg-background/50 p-6 shadow-sm">
                                <Heart className="mb-2 h-8 w-8 text-red-500/80" />
                                <h4 className="text-xl font-bold">Judgment Free</h4>
                                <p className="text-sm text-muted-foreground">A safe space to be yourself</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-2xl bg-background/50 p-6 shadow-sm">
                                <Sparkles className="mb-2 h-8 w-8 text-amber-500/80" />
                                <h4 className="text-xl font-bold">Instant Relief</h4>
                                <p className="text-sm text-muted-foreground">Talk through anxiety in moments</p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 rounded-2xl bg-background/50 p-6 shadow-sm">
                                <Shield className="mb-2 h-8 w-8 text-emerald-500/80" />
                                <h4 className="text-xl font-bold">100% Confidential</h4>
                                <p className="text-sm text-muted-foreground">Your secrets are safe with us</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Polished Team of Experts Section */}
                <section className="container mx-auto px-4 py-20 md:py-28 text-center max-w-6xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-purple-300 backdrop-blur-md mb-6">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>5 Specialized Companions • One Unified Memory</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-sky-400">
                        A Team of Experts — Tailored to Every Need
                    </h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto mb-14 text-base md:text-lg leading-relaxed">
                        You&apos;re not limited to a single perspective. Switch seamlessly between 5 distinct AI companions—each with a unique voice, role, and therapeutic background, all sharing identical memory of your journey.
                    </p>

                    {/* 5 Companion Cards Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
                        
                        {/* 1. Skylar */}
                        <div className="group relative rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/60 via-blue-950/30 to-background/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/25 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                    <Brain className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                                    Voice: Nova
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Skylar</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-indigo-400 mb-3">
                                The Therapist
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Warm, empathetic, and clinically grounded. Skylar is your safe harbor for deep emotional processing, healing, CBT techniques, and self-reflection.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-indigo-300">
                                <span>Emotional Support & Guidance</span>
                            </div>
                        </div>

                        {/* 2. Chancellor */}
                        <div className="group relative rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-cyan-950/60 via-slate-900/40 to-background/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-500/30">
                                    Voice: Onyx
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Chancellor</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-cyan-400 mb-3">
                                Strategist, Mentor & Coach
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Embodiment of wisdom, calm confidence, discipline, and high-character leadership. Your strategist for career, AI tech, mindfulness, and personal growth.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-cyan-300">
                                <span>Wisdom, Strategy & Growth</span>
                            </div>
                        </div>

                        {/* 3. Sydney */}
                        <div className="group relative rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/50 via-yellow-950/20 to-background/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                    <Sun className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                                    Voice: Shimmer
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Sydney</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-3">
                                The Optimist
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Sunshine energy. Sydney is here to lift your mood, celebrate your wins (big or small), and remind you of the bright side with actionable hope.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-amber-300">
                                <span>Motivation & Positivity</span>
                            </div>
                        </div>

                        {/* 4. Hailey */}
                        <div className="group relative rounded-3xl border border-violet-500/40 bg-gradient-to-br from-violet-950/60 via-purple-950/30 to-background/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
                                    <Smile className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300 border border-violet-500/30">
                                    Voice: Fable
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Hailey</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-violet-400 mb-3">
                                Best Friend
                            </p>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Smart, playful, and relentlessly honest. Hailey gives you the reality check you need with warmth, humor, and unwavering loyalty.
                            </p>
                            <div className="flex items-center text-xs font-semibold text-violet-300">
                                <span>Direct & Honest Sounding Board</span>
                            </div>
                        </div>

                        {/* 5. Chris */}
                        <div className="group relative rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 via-teal-950/30 to-background/80 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/25 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    <Wind className="h-6 w-6" />
                                </div>
                                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                                    Voice: Echo
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Chris</h3>
                            <p className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 mb-3">
                                The Chill One
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
            </main>

            <Footer />
        </div>
    );
}



