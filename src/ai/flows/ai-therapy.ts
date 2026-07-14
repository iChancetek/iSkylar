'use server';
/**
 * @fileOverview OpenAI-based therapy conversation flow
 */

import { getOpenAIClient } from '@/lib/openai';
import type { iSkylarInput, iSkylarOutput } from '@/ai/schema/ai-therapy';
import { getAgent } from '@/ai/agents/index';
import { CORE_PHILOSOPHY_PROMPT } from '@/ai/agents/core-philosophy';
import { retrieveContext } from '@/ai/memory/rag-pipeline';
import { appendMessage } from '@/lib/memory/conversation-store';

export async function askiSkylar(input: iSkylarInput): Promise<iSkylarOutput> {
  const userInput = input.userInput || '';
  const sessionState = input.sessionState || '{}';
  const language = input.language || 'en';
  const wasInterrupted = input.wasInterrupted || false;
  const interruptedDuring = input.interruptedDuring || '';
  const agentId = input.agentId || 'skylar';
  const userId = input.userId;
  const conversationId = input.conversationId;

  // Retrieve the specific agent's configuration
  const agent = getAgent(agentId);

  // Retrieve relevant long-term memory context via RAG pipeline
  let memoryContext = '';
  if (userId) {
    memoryContext = await retrieveContext(userId, agentId, userInput);
  }

  // Build the system prompt using the agent's specific instructions
  const systemPrompt = `${agent.systemPrompt}
  
${CORE_PHILOSOPHY_PROMPT}

## Conversation Language
The conversation language is: ${language}. All your responses MUST be in this language.
${memoryContext}`;

  // User message with interruption context if applicable
  let userMessage = userInput;

  if (input.userInput === "ISKYLAR_SESSION_START") {
    userMessage = "This is the start of the session. Give a warm, brief greeting (10-20 words) in the specified language.";
  } else if (wasInterrupted && interruptedDuring) {
    userMessage = `[INTERRUPTION CONTEXT]: The user just interrupted you mid-response. You were saying: "${interruptedDuring}"
Acknowledge naturally: "Okay—" or "Yeah, go ahead" then respond to their new input.

User's new input: ${userInput}`;
  }

  // Call OpenAI API
  const openai = await getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-terra",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Session State: ${sessionState}\n\nUser Input: ${userMessage}` }
    ],
    temperature: 0.8,
    max_tokens: 150, // Keep responses brief
  });

  const iSkylarResponse = completion.choices[0]?.message?.content || "I'm here with you.";

  // Async save to conversation store if conversationId is provided
  if (conversationId && userId) {
    if (userInput !== "ISKYLAR_SESSION_START") {
      appendMessage(conversationId, 'user', userInput, agentId, userId).catch(console.error);
    }
    appendMessage(conversationId, 'agent', iSkylarResponse, agentId, userId).catch(console.error);
  }

  // Determine if session should end
  const sessionShouldEnd = userInput.toLowerCase().includes('goodbye') ||
    userInput.toLowerCase().includes('end session') ||
    userInput.toLowerCase().includes("i'm done");

  // Update session state (simplified - in production you might extract themes/patterns)
  const updatedSessionState = sessionState;

  return {
    iSkylarResponse,
    updatedSessionState,
    sessionShouldEnd,
  };
}
