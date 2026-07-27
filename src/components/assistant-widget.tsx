"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  X,
  Sparkles,
  Send,
  Brain,
  Bot,
  Shield,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
  Loader2,
  ChevronDown,
  ArrowRight,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
  welcomeMsg: string;
  placeholder: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    speechCode: "en-US",
    welcomeMsg: "🤖 Hi! I am the **iSkylar Autonomous Agent**. I can answer questions, look up memory, suggest companions, and take actions across the platform for you!",
    placeholder: "Ask me anything or say 'Take me to Admin'..."
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    speechCode: "es-ES",
    welcomeMsg: "🤖 ¡Hola! Soy el **Agente Autónomo iSkylar**. Puedo responder preguntas, recomendar compañeros y realizar acciones por ti en la plataforma.",
    placeholder: "Pregúntame algo o di 'Llévame al Panel Admin'..."
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    speechCode: "fr-FR",
    welcomeMsg: "🤖 Bonjour ! Je suis l'**Agent Autonome iSkylar**. Je peux répondre à vos questions, consulter la mémoire et exécuter des actions !",
    placeholder: "Posez-moi des questions ou dites 'Emmène-moi vers Admin'..."
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    speechCode: "de-DE",
    welcomeMsg: "🤖 Hallo! Ich bin der **autonome iSkylar KI-Agent**. Ich kann Fragen beantworten, Speicher abrufen und Aktionen ausführen!",
    placeholder: "Fragen Sie mich alles oder sagen Sie 'Gehe zu Admin'..."
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    speechCode: "zh-CN",
    welcomeMsg: "🤖 你好！我是 **iSkylar 自主 AI 智能体**。我可以回答问题、查询记忆库、推荐伴侣并为您在平台上执行操作！",
    placeholder: "询问任何问题或说“带我去管理面板”..."
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    speechCode: "ja-JP",
    welcomeMsg: "🤖 こんにちは！**iSkylar自律型AIエージェント**です。質問回答、メモリ参照、コンパニオン提案、アクション実行が可能です！",
    placeholder: "何でも質問するか「管理者ダッシュボードを開いて」と言ってください..."
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    speechCode: "ar-SA",
    welcomeMsg: "🤖 مرحبًا! أنا **وكيل iSkylar الذكي المستقل**. يمكنني الإجابة على الأسئلة وتوجيهك وتنفيذ الإجراءات!",
    placeholder: "اسألني أي شيء أو قل 'خذني إلى لوحة التحكم'..."
  }
];

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: {
    type: "navigate" | "companion" | "none";
    target?: string;
    companionName?: string;
  };
}

export function AIAssistantWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]); // English default
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: SUPPORTED_LANGUAGES[0].welcomeMsg
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle language switch
  const handleLanguageChange = (lang: LanguageOption) => {
    setSelectedLanguage(lang);
    setShowLangMenu(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `lang-change-${Date.now()}`,
        sender: "bot",
        text: `${lang.flag} Switched language to **${lang.nativeName} (${lang.name})**.\n${lang.welcomeMsg}`
      }
    ]);

    if (ttsEnabled) {
      speakText(lang.welcomeMsg, lang.speechCode);
    }
  };

  // TTS Reader logic
  const speakText = (text: string, speechLangCode?: string, msgId?: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    if (msgId && currentlySpeakingId === msgId) {
      setCurrentlySpeakingId(null);
      return;
    }

    const cleanText = text.replace(/[*_#•🌸⚡✨💖☕👥🧠🔒👋🤖]/g, "").trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLang = speechLangCode || selectedLanguage.speechCode;
    utterance.lang = targetLang;
    utterance.rate = 1.0;

    const voices = synth.getVoices();
    const matchedVoice = voices.find(
      (v) => v.lang.toLowerCase() === targetLang.toLowerCase() || v.lang.startsWith(targetLang.slice(0, 2))
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      if (msgId) setCurrentlySpeakingId(msgId);
    };

    utterance.onend = () => {
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setCurrentlySpeakingId(null);
    };

    synth.speak(utterance);
  };

  // STT Speech Recognition
  const toggleListening = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage.speechCode;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputValue(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("STT error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Execute Agent Tool Action
  const executeAction = (action?: ChatMessage["action"]) => {
    if (!action || action.type === "none") return;

    if (action.type === "navigate" && action.target) {
      router.push(action.target);
    } else if (action.type === "companion" && action.target) {
      router.push("/dashboard");
    }
  };

  // Send message to Agent API
  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: selectedLanguage.code
        })
      });

      const data = await res.json();
      setIsThinking(false);

      const botResponse = data.response || "I am your iSkylar AI Agent. Ask me anything or tell me to perform an action!";
      const botMsgId = `bot-${Date.now()}`;
      const action = data.action;

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: botResponse,
          action: action
        }
      ]);

      // Auto-trigger navigation action if explicit
      if (action && action.type === "navigate" && action.target) {
        setTimeout(() => {
          executeAction(action);
        }, 1200);
      }

      // Speak response if TTS is enabled
      if (ttsEnabled) {
        speakText(botResponse, selectedLanguage.speechCode, botMsgId);
      }
    } catch (err) {
      console.error("Agent error:", err);
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "I am connected as your iSkylar Autonomous Agent. Ask me about companions, memory, privacy, or tell me to navigate!"
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="relative group h-14 w-14 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-110 transition-all duration-300 p-0 flex items-center justify-center border border-white/20"
          aria-label="Open AI Agent"
        >
          <Bot className="h-7 w-7 text-white animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
        </Button>
      )}

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[560px] rounded-3xl bg-transparent border border-purple-500/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-transparent border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                  iSkylar AI Agent
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/30 text-purple-300 font-bold border border-purple-400/30 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> AGENT
                  </span>
                </h4>
                <p className="text-[11px] text-purple-300/80 font-medium">Autonomous Co-Pilot • 7 Languages</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="h-8 px-2 rounded-xl text-xs text-purple-200 hover:bg-white/10 flex items-center gap-1 border border-purple-500/30 bg-purple-950/40"
                  title="Select Language"
                >
                  <span className="text-sm">{selectedLanguage.flag}</span>
                  <span className="font-bold text-[11px] uppercase">{selectedLanguage.code}</span>
                  <ChevronDown className="w-3 h-3 text-purple-400" />
                </Button>

                {showLangMenu && (
                  <div className="absolute right-0 top-10 w-44 rounded-2xl bg-[#0e0c1a] border border-purple-500/40 shadow-2xl p-1.5 z-[1000] space-y-1 backdrop-blur-xl">
                    <div className="px-2 py-1 text-[10px] font-bold text-purple-300/70 uppercase tracking-wider flex items-center gap-1 border-b border-white/10 mb-1">
                      <Globe className="w-3 h-3 text-purple-400" /> 7 Languages
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang)}
                        className={cn(
                          "w-full px-2.5 py-1.5 rounded-xl text-left text-xs flex items-center justify-between transition-colors",
                          selectedLanguage.code === lang.code
                            ? "bg-purple-600 text-white font-bold"
                            : "text-zinc-300 hover:bg-white/10"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </span>
                        <span className="text-[10px] opacity-70 uppercase font-mono">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Global TTS Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (ttsEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setTtsEnabled(!ttsEnabled);
                }}
                className={cn(
                  "h-8 w-8 rounded-full transition-colors",
                  ttsEnabled ? "text-purple-300 hover:bg-purple-500/20" : "text-zinc-500 hover:bg-white/10"
                )}
                title={ttsEnabled ? "TTS Audio On (Click to Mute)" : "TTS Audio Off (Click to Enable)"}
              >
                {ttsEnabled ? <Volume2 className="h-4 w-4 text-purple-400" /> : <VolumeX className="h-4 w-4" />}
              </Button>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Agent Action Chips */}
          <div className="px-3 py-2 bg-transparent border-b border-white/10 flex gap-1.5 overflow-x-auto custom-scrollbar text-xs">
            <button
              onClick={() => handleSend("Take me to Admin Dashboard")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-200 text-[11px] font-medium transition-colors flex items-center gap-1"
            >
              📊 Admin Dashboard
            </button>
            <button
              onClick={() => handleSend("Talk to Chancellor")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-200 text-[11px] font-medium transition-colors flex items-center gap-1"
            >
              ⚡ Chancellor
            </button>
            <button
              onClick={() => handleSend("Talk to Skylar")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 text-pink-200 text-[11px] font-medium transition-colors flex items-center gap-1"
            >
              🌸 Skylar
            </button>
            <button
              onClick={() => handleSend("Open Learn page")}
              className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-200 text-[11px] font-medium transition-colors flex items-center gap-1"
            >
              📖 Learn More
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-white/90 bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex flex-col gap-1", msg.sender === "user" ? "items-end" : "items-start")}
              >
                <div className="flex items-center justify-between w-full px-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-white/50">
                    {msg.sender === "bot" ? (
                      <>
                        <Bot className="w-3 h-3 text-purple-400" />
                        <span>iSkylar Agent ({selectedLanguage.code.toUpperCase()})</span>
                      </>
                    ) : (
                      <>
                        <span>You</span>
                        <User className="w-3 h-3 text-blue-400" />
                      </>
                    )}
                  </div>

                  {msg.sender === "bot" && (
                    <button
                      onClick={() => speakText(msg.text, selectedLanguage.speechCode, msg.id)}
                      className="text-purple-400/80 hover:text-purple-300 text-[10px] font-medium flex items-center gap-1"
                      title="Listen to response"
                    >
                      <Volume2 className={cn("w-3 h-3", currentlySpeakingId === msg.id && "text-amber-400 animate-pulse")} />
                      <span>{currentlySpeakingId === msg.id ? "Speaking..." : "Listen"}</span>
                    </button>
                  )}
                </div>

                <div
                  className={cn(
                    "px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap leading-relaxed max-w-[88%] flex flex-col gap-2 border",
                    msg.sender === "user"
                      ? "bg-blue-600/20 text-blue-50 border-blue-500/30 rounded-tr-xs"
                      : "bg-purple-950/20 text-white border-purple-500/30 rounded-tl-xs"
                  )}
                >
                  <span>{msg.text}</span>

                  {/* Render Agent Action Button if present */}
                  {msg.action && msg.action.type !== "none" && (
                    <Button
                      onClick={() => executeAction(msg.action)}
                      size="sm"
                      className="mt-1 h-7 text-[11px] font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md self-start"
                    >
                      <span>
                        {msg.action.type === "navigate"
                          ? `🚀 Open ${msg.action.target}`
                          : `🎙️ Launch ${msg.action.companionName || "Session"}`}
                      </span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-purple-300/80 text-xs italic px-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>Agent processing request...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Listening Overlay Bar */}
          {isListening && (
            <div className="px-4 py-2 bg-transparent border-t border-purple-500/40 flex items-center justify-between text-purple-200 text-xs font-semibold animate-pulse">
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-purple-400 animate-bounce" />
                Listening via Whisper STT ({selectedLanguage.nativeName})...
              </span>
              <button onClick={toggleListening} className="text-[11px] underline text-purple-300 hover:text-white">
                Done
              </button>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-transparent border-t border-white/10 flex items-center gap-2"
          >
            <Button
              type="button"
              onClick={toggleListening}
              size="icon"
              variant="ghost"
              className={cn(
                "h-9 w-9 shrink-0 rounded-xl border transition-all duration-300",
                isListening
                  ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse"
                  : "bg-purple-500/10 border-purple-500/20 text-purple-300 hover:bg-purple-500/20"
              )}
              title={isListening ? "Stop listening" : `Speak in ${selectedLanguage.name} (STT / Whisper)`}
            >
              {isListening ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedLanguage.placeholder}
              className="h-9 text-xs bg-transparent border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 rounded-xl"
            />

            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-xl bg-purple-600 hover:bg-purple-500 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
