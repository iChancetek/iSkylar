import { generateEmbedding } from './embeddings';

export interface VectorMemoryRecord {
  id: string;
  userId: string;
  content: string;
  embedding?: number[];
  category: string;
  importanceScore: number;
  emotionScore?: number;
  sourceConversationId?: string;
  agentId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface VectorSearchResult {
  record: VectorMemoryRecord;
  similarity: number;
}

/**
 * Normalizes host URL to omit leading protocol or trailing slashes for SDK or fetch API.
 */
function getPineconeConfig() {
  const apiKey = process.env.PINECONE_API_KEY;
  let host = process.env.PINECONE_HOST || '';
  if (host.startsWith('https://')) {
    host = host.replace('https://', '');
  }
  if (host.endsWith('/')) {
    host = host.slice(0, -1);
  }
  return { apiKey, host };
}

/**
 * Upsert a memory record to Pinecone vector database.
 */
export async function upsertVectorMemory(record: VectorMemoryRecord): Promise<void> {
  const { apiKey, host } = getPineconeConfig();

  if (!apiKey || !host) {
    console.warn('[Pinecone Store] Missing PINECONE_API_KEY or PINECONE_HOST. Skipping vector upsert.');
    return;
  }

  try {
    const embedding = record.embedding && record.embedding.length === 1536
      ? record.embedding
      : await generateEmbedding(record.content);

    const vectorId = record.id || `mem_${record.userId}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const url = `https://${host}/vectors/upsert`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        namespace: 'user_content',
        vectors: [
          {
            id: vectorId,
            values: embedding,
            metadata: {
              userId: record.userId,
              content: record.content,
              category: record.category || 'General',
              importanceScore: record.importanceScore || 50,
              emotionScore: record.emotionScore || 0,
              sourceConversationId: record.sourceConversationId || '',
              agentId: record.agentId || 'skylar',
              timestamp: record.timestamp || new Date().toISOString(),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Pinecone Store] Upsert failed with status ${response.status}: ${errText}`);
    } else {
      console.log(`[Pinecone Store] Successfully upserted vector memory: ${vectorId}`);
    }
  } catch (err: any) {
    console.error('[Pinecone Store] Error in upsertVectorMemory:', err.message);
  }
}

/**
 * Query Pinecone for semantic similarity memories.
 * Strictly filtered by `userId` and filtered by similarity >= 0.45.
 */
export async function queryVectorMemories(
  userId: string,
  queryText: string,
  topK: number = 15,
  similarityThreshold: number = 0.45
): Promise<VectorSearchResult[]> {
  const { apiKey, host } = getPineconeConfig();

  if (!apiKey || !host) {
    console.warn('[Pinecone Store] Missing PINECONE_API_KEY or PINECONE_HOST. Returning empty results.');
    return [];
  }

  try {
    const queryEmbedding = await generateEmbedding(queryText);
    const url = `https://${host}/query`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        namespace: 'user_content',
        vector: queryEmbedding,
        topK: topK,
        includeMetadata: true,
        filter: {
          userId: { '$eq': userId },
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Pinecone Store] Query failed with status ${response.status}: ${errText}`);
      return [];
    }

    const data = await response.json();
    const matches = data.matches || [];

    const results: VectorSearchResult[] = matches
      .filter((m: any) => m.score >= similarityThreshold)
      .map((m: any) => ({
        similarity: m.score,
        record: {
          id: m.id,
          userId: m.metadata?.userId || userId,
          content: m.metadata?.content || '',
          category: m.metadata?.category || 'General',
          importanceScore: m.metadata?.importanceScore || 50,
          emotionScore: m.metadata?.emotionScore || 0,
          sourceConversationId: m.metadata?.sourceConversationId,
          agentId: m.metadata?.agentId,
          timestamp: m.metadata?.timestamp || new Date().toISOString(),
        },
      }));

    return results;
  } catch (err: any) {
    console.error('[Pinecone Store] Error querying Pinecone:', err.message);
    return [];
  }
}
