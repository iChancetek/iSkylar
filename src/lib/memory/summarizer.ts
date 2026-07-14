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
    const response = await openai.chat.completions.create({
      model: "gpt-5.6-terra",
      messages: [
        {
          role: "system",
          content: `You are an AI memory extraction system. Analyze the following conversation transcript and extract any important, long-term facts about the user.
          
Ignore temporary chit-chat. Focus on:
- Personal profile (name, background)
- Preferences (likes, dislikes, communication style)
- Health and wellness (ongoing issues, feelings)
- Goals, projects, and tasks
- Family, friends, career, hobbies

Output format: A JSON array of objects.
[
  { "category": "Hobbies", "content": "The user enjoys painting with watercolors." },
  { "category": "Goals", "content": "The user is trying to run a 5k next month." }
]`
        },
        {
          role: "user",
          content: `Transcript:\n\n${transcript}`
        }
      ],
      response_format: { type: "json_object" }, // Requires GPT-4 Turbo or newer
      temperature: 0.1,
    });

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
