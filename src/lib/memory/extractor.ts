import { getOpenAIClient } from '@/lib/openai';
import { saveMemory } from './memory-store';
import { upsertVectorMemory } from './pinecone-store';
import { cacheGet, cacheSet, getUserCacheKeys } from './redis-cache';
import { Timestamp } from 'firebase/firestore';

export interface ExtractedFact {
  category: string;
  content: string;
  importanceScore: number;
  emotionScore?: number;
  detectedMood?: string;
}

export interface UserEmotionalProfile {
  mood: string;
  stressLevel: number; // 1 to 10
  confidenceLevel: number; // 1 to 10
  burnoutRisk: string; // low, medium, high
  recentEmotions: string[];
  lastUpdated: string;
}

/**
 * Calculates importance score based on extracted category.
 */
function getImportanceScore(category: string): number {
  const catLower = category.toLowerCase();
  if (catLower.includes('identity') || catLower.includes('personal profile')) return 100;
  if (catLower.includes('family') || catLower.includes('relationship')) return 95;
  if (catLower.includes('career') || catLower.includes('occupation')) return 90;
  if (catLower.includes('goal') || catLower.includes('long-term')) return 90;
  if (catLower.includes('project')) return 85;
  if (catLower.includes('preference')) return 75;
  if (catLower.includes('health') || catLower.includes('wellness')) return 80;
  if (catLower.includes('interest')) return 40;
  return 50;
}

/**
 * Analyzes a user message using OpenAI to extract facts, preferences, relationships, and emotional state.
 */
export async function analyzeAndExtractMemories(
  userId: string,
  userMessage: string,
  conversationId?: string,
  agentId?: string
): Promise<ExtractedFact[]> {
  if (!userMessage || userMessage.length < 5 || userMessage.startsWith('ISKYLAR_')) {
    return [];
  }

  try {
    const openai = await getOpenAIClient();

    const extractionPrompt = `You are an automatic memory and emotion extraction engine for an AI companion platform.
Analyze the user's message and extract any personal facts, preferences, relationships, career updates, goals, projects, or emotional states worth remembering across conversations.

User Message: "${userMessage}"

Respond ONLY with valid JSON in this exact structure (do not include markdown code blocks):
{
  "facts": [
    {
      "category": "Identity" | "Relationship" | "Career" | "Goal" | "Project" | "Preference" | "Health" | "Location" | "Emotion" | "Achievement",
      "content": "Specific standalone statement (e.g., 'User's wife is named Sarah')",
      "importanceScore": 10-100,
      "detectedMood": "happy" | "anxious" | "stressed" | "confident" | "lonely" | "hopeful" | "frustrated" | "neutral"
    }
  ],
  "emotionalProfile": {
    "mood": "overall current mood descriptor",
    "stressLevel": 1-10,
    "confidenceLevel": 1-10,
    "burnoutRisk": "low" | "medium" | "high"
  }
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [{ role: 'system', content: extractionPrompt }],
      temperature: 0.1,
    });

    const textResponse = completion.choices[0]?.message?.content?.trim() || '';
    const cleanJson = textResponse.replace(/^```json\s*/i, '').replace(/\s*```$/, '');

    const parsed = JSON.parse(cleanJson);
    const facts: ExtractedFact[] = parsed.facts || [];
    const emotionalProfile: UserEmotionalProfile | undefined = parsed.emotionalProfile;

    // Process & store each extracted fact asynchronously
    for (const fact of facts) {
      const importanceScore = fact.importanceScore || getImportanceScore(fact.category);

      // 1. Save to Firestore
      const memoryId = await saveMemory({
        userId,
        category: (fact.category as any) || 'General',
        content: fact.content,
        sourceConversationId: conversationId,
        agentId: agentId || 'skylar',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // 2. Save to Pinecone Vector DB
      await upsertVectorMemory({
        id: memoryId,
        userId,
        content: fact.content,
        category: fact.category,
        importanceScore,
        sourceConversationId: conversationId,
        agentId: agentId || 'skylar',
        timestamp: new Date().toISOString(),
      });
    }

    // 3. Update Emotional Profile in Redis & Cache
    if (emotionalProfile) {
      const keys = getUserCacheKeys(userId);
      const existingProfile = (await cacheGet<UserEmotionalProfile>(keys.emotions)) || {
        mood: 'neutral',
        stressLevel: 5,
        confidenceLevel: 5,
        burnoutRisk: 'low',
        recentEmotions: [],
        lastUpdated: new Date().toISOString(),
      };

      const updatedEmotions = [
        emotionalProfile.mood,
        ...existingProfile.recentEmotions.slice(0, 4),
      ];

      const newProfile: UserEmotionalProfile = {
        mood: emotionalProfile.mood,
        stressLevel: emotionalProfile.stressLevel,
        confidenceLevel: emotionalProfile.confidenceLevel,
        burnoutRisk: emotionalProfile.burnoutRisk,
        recentEmotions: updatedEmotions,
        lastUpdated: new Date().toISOString(),
      };

      await cacheSet(keys.emotions, newProfile, 600);
    }

    return facts;
  } catch (err) {
    console.warn('[Memory Extractor] Error extracting memories:', err);
    return [];
  }
}
