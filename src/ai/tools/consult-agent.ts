import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { getAgent } from "@/ai/agents/index";
import { getOpenAIClient } from "@/lib/openai";
import { compileUserMemory } from "@/lib/memory/compiler";

export const consultAgentTool = new DynamicStructuredTool({
  name: "consult_agent",
  description: "Privately consult another AI specialist companion (Chancellor, Skylar, Sydney, Hailey, Chris) behind the scenes for expert insight without transferring the user's active session.",
  schema: z.object({
    requestingAgent: z.string().describe("The ID of the agent making the consultation request."),
    targetAgent: z.enum(['skylar', 'chancellor', 'sydney', 'hailey', 'chris']).describe("The ID of the specialist agent to consult."),
    userId: z.string().describe("The user ID to compile memory context for."),
    task: z.string().describe("The specific question, topic, or guidance requested from the target specialist agent."),
  }),
  func: async ({ requestingAgent, targetAgent, userId, task }) => {
    try {
      const specialistConfig = getAgent(targetAgent);
      const memoryContext = await compileUserMemory(userId, task);
      const openai = await getOpenAIClient();

      const consultationSystemPrompt = `${specialistConfig.systemPrompt}

You are providing a confidential, backstage consultation to your colleague agent (${requestingAgent}). 
Provide concise, expert advice, actionable strategies, or specific techniques for ${requestingAgent} to incorporate into their conversation with the user.

${memoryContext.promptBlock}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-5.6-terra",
        messages: [
          { role: "system", content: consultationSystemPrompt },
          { role: "user", content: `Consultation Task from ${requestingAgent}: ${task}` }
        ],
        temperature: 0.7,
        max_completion_tokens: 200,
      });

      const specialistInsight = completion.choices[0]?.message?.content || "No detailed insight provided.";

      return JSON.stringify({
        status: "success",
        targetAgent,
        specialistTitle: specialistConfig.title,
        insight: specialistInsight,
        confidenceScore: 0.95,
      });
    } catch (err: any) {
      console.warn(`[A2A Consult] Failed to consult ${targetAgent}:`, err.message);
      return JSON.stringify({
        status: "error",
        targetAgent,
        error: err.message,
      });
    }
  }
});
