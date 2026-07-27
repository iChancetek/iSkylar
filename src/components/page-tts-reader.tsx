"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Pause, Play, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageTTSReaderProps {
  textToRead?: string;
  className?: string;
  variant?: "header" | "floating" | "compact";
}

export function PageTTSReader({ textToRead, className, variant = "header" }: PageTTSReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const getCleanText = () => {
    if (textToRead) return textToRead;
    // Fallback: extract text content from main document area
    if (typeof document !== "undefined") {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        return mainEl.innerText.replace(/\s+/g, " ").trim();
      }
    }
    return "";
  };

  const handleTogglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;

    // Resume if paused
    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Pause if currently playing
    if (isPlaying) {
      synth.pause();
      setIsPaused(true);
      setIsPlaying(false);
      return;
    }

    // Start fresh playback
    synth.cancel(); // Stop any active speech
    const text = getCleanText();
    if (!text) return;

    setIsLoading(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    // Select a pleasant natural voice if available
    const voices = synth.getVoices();
    const naturalVoice = voices.find(
      (v) => (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Daniel")) && v.lang.startsWith("en")
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
    };

    utterance.onerror = (err) => {
      console.error("Speech synthesis error:", err);
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  if (!speechSupported) return null;

  if (variant === "compact") {
    return (
      <Button
        onClick={handleTogglePlay}
        variant="ghost"
        size="sm"
        className={cn("h-8 px-3 text-xs gap-1.5 rounded-full text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30", className)}
        title={isPlaying ? "Pause audio reading" : isPaused ? "Resume audio reading" : "Listen to page content"}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
        ) : isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-purple-400" />
        )}
        <span>{isPlaying ? "Pause" : isPaused ? "Resume" : "Listen"}</span>
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handleTogglePlay}
        size="sm"
        className={cn(
          "h-9 px-4 text-xs font-semibold rounded-full transition-all duration-300 shadow-md flex items-center gap-2 border",
          isPlaying
            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
            : isPaused
            ? "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30"
            : "bg-purple-600/20 text-purple-200 border-purple-500/40 hover:bg-purple-600/30 hover:text-white"
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
        ) : isPlaying ? (
          <>
            <Pause className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Pause Audio</span>
          </>
        ) : isPaused ? (
          <>
            <Play className="w-4 h-4 text-blue-400" />
            <span>Resume Audio</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-purple-400" />
            <span>Listen to Page</span>
          </>
        )}
      </Button>

      {(isPlaying || isPaused) && (
        <Button
          onClick={handleStop}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
          title="Stop playback"
        >
          <VolumeX className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
