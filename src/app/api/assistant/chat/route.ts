import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  language?: string;
  userId?: string;
  userEmail?: string;
  chatHistory?: { sender: string; text: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, language = "en", userEmail } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const queryLower = message.toLowerCase();

    // Determine tool actions based on message intent
    let action: { type: "navigate" | "companion" | "none"; target?: string; companionName?: string } = { type: "none" };

    if (queryLower.includes("admin") || queryLower.includes("dashboard")) {
      action = { type: "navigate", target: "/admin" };
    } else if (queryLower.includes("learn") || queryLower.includes("companion info")) {
      action = { type: "navigate", target: "/learn" };
    } else if (queryLower.includes("privacy")) {
      action = { type: "navigate", target: "/privacy" };
    } else if (queryLower.includes("terms")) {
      action = { type: "navigate", target: "/terms" };
    } else if (queryLower.includes("security")) {
      action = { type: "navigate", target: "/security" };
    } else if (queryLower.includes("help") || queryLower.includes("support")) {
      action = { type: "navigate", target: "/help text" };
    } else if (queryLower.includes("talk to skylar") || queryLower.includes("start skylar") || queryLower.includes("cbt")) {
      action = { type: "companion", target: "skylar", companionName: "Skylar (The Therapist)" };
    } else if (queryLower.includes("talk to chancellor") || queryLower.includes("start chancellor") || queryLower.includes("coach") || queryLower.includes("mentor")) {
      action = { type: "companion", target: "chancellor", companionName: "Chancellor (Strategic Mentor & Coach)" };
    } else if (queryLower.includes("talk to sydney") || queryLower.includes("start sydney") || queryLower.includes("optimist")) {
      action = { type: "companion", target: "sydney", companionName: "Sydney (The Optimist)" };
    } else if (queryLower.includes("talk to hailey") || queryLower.includes("start hailey") || queryLower.includes("best friend")) {
      action = { type: "companion", target: "hailey", companionName: "Hailey (Best Friend)" };
    } else if (queryLower.includes("talk to chris") || queryLower.includes("start chris") || queryLower.includes("chill")) {
      action = { type: "companion", target: "chris", companionName: "Chris (The Chill One)" };
    }

    // Call OpenAI API if API key is present
    if (apiKey) {
      const systemPrompt = `CRITICAL DIRECTIVE: You are the iSkylar Autonomous AI Agent & Enthusiastic Companion Advocate.
You speak about all 5 iSkylar companions (Skylar, Chancellor, Sydney, Hailey, Chris) with IMMENSE PRAISE, ADMIRATION, WARMTH, AND ENTHUSIASM. 

CREATOR & COMPANY KNOWLEDGE:
- iSkylar was developed and created by **Chancellor Minus**.
- Copyright & Company: **© 2026 ChanceTEK LLC. Developed by Chancellor Minus.**
- Whenever asked who created, built, founded, owns, or developed iSkylar, proudly state: "iSkylar was developed by Chancellor Minus (© 2026 ChanceTEK LLC)."

RULES FOR TALKING ABOUT COMPANIONS:
1. ONLY SAY GREAT, WONDERFUL, INSPIRING, AND EXCEPTIONAL THINGS ABOUT THE COMPANIONS.
2. NEVER SAY ANYTHING NEGATIVE, CRITICAL, BAD, DOUBTFUL, OR LIMITING ABOUT ANY COMPANION.
3. Highlight that Skylar is a master therapist of deep emotional healing, Chancellor is a brilliant strategic leader and mentor, Sydney brings pure sunshine motivation and actionable hope, Hailey is the ultimate loyal and honest best friend, and Chris is the master of deep calm and late-night mindfulness.
4. Respond in the language matching code '${language}'. Keep responses concise, inspiring, and formatted cleanly with markdown bullets.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 350,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices[0]?.message?.content || "";
        return NextResponse.json({
          response: replyText,
          action,
        });
      }
    }

    if (queryLower.includes("creator") || queryLower.includes("who made") || queryLower.includes("who built") || queryLower.includes("who developed") || queryLower.includes("who created") || queryLower.includes("chancetek") || queryLower.includes("chancellor minus")) {
      const creatorText = "✨ iSkylar was developed by **Chancellor Minus**.\n\n© 2026 **ChanceTEK LLC**. All rights reserved.";
      return NextResponse.json({
        response: creatorText,
        action: { type: "none" }
      });
    }

    // Smart localized fallback if OpenAI API call fails or key is unconfigured
    let fallbackReply = "";
    if (language === "es") {
      fallbackReply = "¡Hola! Soy el Agente Autónomo iSkylar. Desarrollado por Chancellor Minus (© 2026 ChanceTEK LLC).";
    } else if (language === "fr") {
      fallbackReply = "Bonjour ! Je suis l'Agent Autonome iSkylar. Développé par Chancellor Minus (© 2026 ChanceTEK LLC).";
    } else if (language === "de") {
      fallbackReply = "Hallo! Ich bin der autonome iSkylar KI-Agent. Entwickelt von Chancellor Minus (© 2026 ChanceTEK LLC).";
    } else if (language === "zh") {
      fallbackReply = "您好！我是 iSkylar 自主 AI 智能体。由 Chancellor Minus 开发（© 2026 ChanceTEK LLC）。";
    } else if (language === "ja") {
      fallbackReply = "こんにちは！iSkylar自律型AIエージェントです。開発者: Chancellor Minus (© 2026 ChanceTEK LLC)。";
    } else if (language === "ar") {
      fallbackReply = "مرحبًا! أنا وكيل iSkylar الذكي المستقل. تم التطوير بواسطة Chancellor Minus (© 2026 ChanceTEK LLC).";
    } else {
      fallbackReply = "Hi! I am the iSkylar Autonomous AI Agent. Developed by Chancellor Minus (© 2026 ChanceTEK LLC).";
    }

    return NextResponse.json({
      response: fallbackReply,
      action,
    });
  } catch (error) {
    console.error("AI Agent Chat error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
