import { getAgent } from './index';
import { getOpenAIClient } from '@/lib/openai';
import { compileUserMemory } from '@/lib/memory/compiler';

export interface PanelAgentResponse {
  agentId: string;
  agentName: string;
  agentTitle: string;
  avatarColor: string;
  response: string;
}

export interface MultiAgentPanelResult {
  topic: string;
  responses: PanelAgentResponse[];
}

/**
 * Executes a Multi-Agent Panel discussion where multiple companion agents respond to a user prompt,
 * all sharing the identical compiled long-term memory context.
 */
export async function runMultiAgentPanel(
  userId: string,
  prompt: string,
  participatingAgentIds: string[] = ['skylar', 'hailey', 'chris']
): Promise<MultiAgentPanelResult> {
  const memoryContext = await compileUserMemory(userId, prompt);
  const openai = await getOpenAIClient();

  const results: PanelAgentResponse[] = [];

  for (const agentId of participatingAgentIds) {
    const config = getAgent(agentId);

    const systemPrompt = `${config.systemPrompt}

You are participating in a Multi-Agent Panel discussion with your fellow companions.
Give your unique, persona-aligned perspective (1-3 sentences) on the topic below.

${memoryContext.promptBlock}`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-5.4-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Panel Discussion Topic: "${prompt}"` },
        ],
        temperature: 0.8,
        max_completion_tokens: 150,
      });

      const responseText = completion.choices[0]?.message?.content || `${config.name} is listening carefully.`;

      results.push({
        agentId: config.id,
        agentName: config.name,
        agentTitle: config.title,
        avatarColor: config.avatarColor,
        response: responseText,
      });
    } catch (err: any) {
      console.warn(`[Multi-Agent Panel] Error from ${config.name}:`, err.message);
    }
  }

  return {
    topic: prompt,
    responses: results,
  };
}
