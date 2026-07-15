import { openai } from '@/lib/openai';
import type { Conversation, MemoryCategory, MemoryEntry } from './types';
import { saveMemory } from './memory-store';
import { Timestamp } from 'firebase/firestore';

/**
 * Extracts facts, preferences, and goals from a conversation transcript
 * and saves them as long-term semantic memories.
 */
export async function extractAndSaveMemories(conversation: Conversation): Promise<void> {
  const transcript = conversation.messages.map(m => `${m.speaker}: ${m.text}`).join('\n');
  
  if (!transcript.trim()) return;

  try {
    const messages = [
      {
        role: "system",
        content: `You are an AI memory extraction system. Analyze the following conversation transcript and extract any important, long-term facts about the user.
        
Ignore temporary chit-chat. Focus on extracting:
- Personal profile (CRITICAL: User's name, background, identity)
- Session Summary (A brief summary of what was discussed in this specific session)
- Preferences (likes, dislikes, communication style)
- Health and wellness (ongoing issues, emotional patterns, feelings discussed)
- Goals, projects, and tasks
- Family, friends, career, hobbies

Output format: A JSON object with a single "memories" key containing an array of objects.
{
  "memories": [
    { "category": "Personal Profile", "content": "The user's name is John." },
    { "category": "General", "content": "Session Summary: John discussed his stress at work and his goal to run a 5k." },
    { "category": "Goals", "content": "John is trying to run a 5k next month." }
  ]
}`
      },
      {
        role: "user",
        content: `Transcript:\n\n${transcript}`
      }
    ] as any;

    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-5.6-terra",
        messages,
        response_format: { type: "json_object" }, // Requires GPT-4 Turbo or newer
        temperature: 0.1,
      });
    } catch (error) {
      console.warn("gpt-5.6-terra failed in summarizer, falling back to gpt-5.4-mini", error);
      response = await openai.chat.completions.create({
        model: "gpt-5.4-mini",
        messages,
        response_format: { type: "json_object" },
        temperature: 0.1,
      });
    }

    const content = response.choices[0]?.message?.content || '{}';
    let data;
    try {
      data = JSON.parse(content);
    } catch (e) {
      // In case it didn't wrap in an object for some reason, though json_object format requires it.
      data = JSON.parse(`{"memories": ${content}}`); 
    }
    
    // Check if the model returned { "memories": [...] } or just an array (though json_object requires dict)
    const memories = Array.isArray(data) ? data : (data.memories || data.data || []);

    for (const mem of memories) {
      if (mem.category && mem.content) {
        await saveMemory({
          userId: conversation.userId,
          category: mem.category as MemoryCategory,
          content: mem.content,
          sourceConversationId: conversation.id,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
    }
  } catch (error) {
    console.error("Failed to extract memories:", error);
  }
}
