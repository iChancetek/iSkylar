import { cacheGet, cacheSet, getUserCacheKeys } from './redis-cache';
import { getMemories } from './memory-store';
import { queryVectorMemories, VectorSearchResult } from './pinecone-store';
import { UserEmotionalProfile } from './extractor';

export interface CompiledMemoryContext {
  userId: string;
  structuredFacts: string[];
  semanticMemories: string[];
  emotionalContext: string;
  promptBlock: string;
}

/**
 * Universal Memory Compiler: Assembles L1, L2, and L3 memory sources into a unified, high-speed context block.
 * Target compilation latency: < 250ms (cached < 10ms).
 */
export async function compileUserMemory(
  userId: string,
  queryText: string,
  forceRefresh: boolean = false
): Promise<CompiledMemoryContext> {
  const keys = getUserCacheKeys(userId);

  // 1. Check Redis cache first (L2 cache hit)
  if (!forceRefresh) {
    const cached = await cacheGet<CompiledMemoryContext>(keys.compiledMemory);
    if (cached) {
      return cached;
    }
  }

  const startTime = Date.now();

  try {
    // 2. Fetch parallel from Firestore (L2 Structured) + Pinecone (L3 Vector) + Emotional Profile (Redis L2)
    const [firestoreMemories, pineconeMatches, emotionalProfile] = await Promise.all([
      getMemories(userId, undefined, 20).catch(() => []),
      queryVectorMemories(userId, queryText, 10, 0.45).catch(() => [] as VectorSearchResult[]),
      cacheGet<UserEmotionalProfile>(keys.emotions).catch(() => null),
    ]);

    // 3. Deduplicate & Rank Facts
    const factMap = new Map<string, { content: string; score: number }>();

    // Add Firestore memories
    for (const mem of firestoreMemories) {
      if (mem.content) {
        factMap.set(mem.content.trim().toLowerCase(), {
          content: mem.content,
          score: 80,
        });
      }
    }

    // Add Pinecone vector search matches (boost score by vector similarity)
    for (const match of pineconeMatches) {
      const content = match.record.content;
      if (content) {
        const key = content.trim().toLowerCase();
        const score = (match.record.importanceScore || 50) + match.similarity * 20;
        const existing = factMap.get(key);
        if (!existing || score > existing.score) {
          factMap.set(key, { content, score });
        }
      }
    }

    // Sort facts by final score descending
    const sortedFacts = Array.from(factMap.values())
      .sort((a, b) => b.score - a.score)
      .map((f) => f.content);

    // 4. Format Emotional Context
    let emotionalContextStr = 'Neutral and receptive.';
    if (emotionalProfile) {
      emotionalContextStr = `Current Mood: ${emotionalProfile.mood} | Stress Level: ${emotionalProfile.stressLevel}/10 | Confidence: ${emotionalProfile.confidenceLevel}/10 | Burnout Risk: ${emotionalProfile.burnoutRisk}.`;
    }

    // 5. Construct Universal Prompt Block
    let promptBlock = '';
    if (sortedFacts.length > 0 || emotionalProfile) {
      promptBlock = `\n\n=== PERMANENT LONG-TERM MEMORY & CONTEXT ===\n`;
      promptBlock += `You have known this user for years. You remember their life, relationships, projects, preferences, and emotional history.\n\n`;

      if (emotionalProfile) {
        promptBlock += `[EMOTIONAL STATE & TRENDS]: ${emotionalContextStr}\n\n`;
      }

      if (sortedFacts.length > 0) {
        promptBlock += `[KNOWN FACTS & HISTORY]:\n`;
        sortedFacts.forEach((fact) => {
          promptBlock += `- ${fact}\n`;
        });
      }

      promptBlock += `\nUNIVERSAL MEMORY RULES:
1. Speak as though you genuinely know and remember the user.
2. Naturally weave past facts into conversation (e.g., "Last month you mentioned...", "I remember when you worked on...").
3. NEVER say "I don't remember", "I don't have access to past conversations", or "As an AI model".
===================================================\n`;
    }

    const result: CompiledMemoryContext = {
      userId,
      structuredFacts: sortedFacts.slice(0, 15),
      semanticMemories: pineconeMatches.map((m) => m.record.content),
      emotionalContext: emotionalContextStr,
      promptBlock,
    };

    const compilationTime = Date.now() - startTime;
    console.log(`[Memory Compiler] Compiled memory for user ${userId} in ${compilationTime}ms.`);

    // Cache the compiled memory context for 10 minutes in Redis
    await cacheSet(keys.compiledMemory, result, 600);

    return result;
  } catch (err) {
    console.error('[Memory Compiler] Error compiling memory:', err);
    return {
      userId,
      structuredFacts: [],
      semanticMemories: [],
      emotionalContext: '',
      promptBlock: '',
    };
  }
}
