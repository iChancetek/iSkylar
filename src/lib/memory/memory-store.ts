import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import type { MemoryEntry, MemoryCategory } from './types';
import { generateEmbedding } from './embeddings';

const MEMORIES_COLLECTION = 'user_memories';

/**
 * Save a new memory or update an existing one.
 * Automatically generates a vector embedding for the content if it's new or changed.
 */
export async function saveMemory(entry: Omit<MemoryEntry, 'embedding'> & { id?: string }): Promise<string> {
  const collectionRef = collection(db, MEMORIES_COLLECTION);
  let memoryRef;
  
  if (entry.id) {
    memoryRef = doc(collectionRef, entry.id);
  } else {
    memoryRef = doc(collectionRef);
  }

  // Generate vector embedding for semantic search
  const embedding = await generateEmbedding(entry.content);

  const fullEntry: MemoryEntry = {
    ...entry,
    embedding,
  };

  await setDoc(memoryRef, fullEntry, { merge: true });
  return memoryRef.id;
}

/**
 * Retrieve memories for a user, optionally filtered by category.
 */
export async function getMemories(userId: string, category?: MemoryCategory, limitCount = 50): Promise<MemoryEntry[]> {
  const collectionRef = collection(db, MEMORIES_COLLECTION);
  let q;
  
  if (category) {
    q = query(
      collectionRef, 
      where('userId', '==', userId),
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
  } else {
    q = query(
      collectionRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MemoryEntry));
}

/**
 * Search memories using cosine similarity on embeddings.
 * Note: Firestore doesn't natively support vector search out of the box in the JS SDK 
 * without the Vector Search Extension or specific backend indexing.
 * For this client-side mockup without an external vector DB, we would typically do this server-side,
 * or use a cloud function. Since we are in Next.js Server Actions, we can pull recent memories
 * and compute cosine similarity in-memory for MVP, or assume the Firebase Vector Extension is installed
 * which allows specialized queries.
 * 
 * Here we implement a brute-force cosine similarity over the user's memories for MVP.
 * In production with 1000s of memories, use Firebase Vector Extension or Pinecone.
 */
export async function searchMemories(userId: string, queryText: string, topK: number = 5): Promise<MemoryEntry[]> {
  // 1. Get embedding for the query
  const queryEmbedding = await generateEmbedding(queryText);
  
  // 2. Fetch user's memories (in a real app, use a vector index)
  // For MVP, we fetch all (or a large recent chunk) and rank in memory.
  const collectionRef = collection(db, MEMORIES_COLLECTION);
  const q = query(
    collectionRef, 
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(500) // reasonable limit for in-memory ranking
  );
  
  const snapshot = await getDocs(q);
  const memories = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MemoryEntry));
  
  // 3. Rank by cosine similarity
  const ranked = memories.map(mem => ({
    memory: mem,
    similarity: cosineSimilarity(queryEmbedding, mem.embedding)
  })).sort((a, b) => b.similarity - a.similarity);
  
  // 4. Return top K
  return ranked.slice(0, topK).map(r => r.memory);
}

export async function deleteMemory(memoryId: string): Promise<void> {
  await deleteDoc(doc(db, MEMORIES_COLLECTION, memoryId));
}

// Utility: Cosine Similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
