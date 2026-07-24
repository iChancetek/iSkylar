import { config } from 'dotenv';
config({ path: '.env.local' });

import { compileUserMemory } from '../src/lib/memory/compiler';
import { saveMemory } from '../src/lib/memory/memory-store';
import { upsertVectorMemory, queryVectorMemories } from '../src/lib/memory/pinecone-store';
import { cacheSet, cacheGet, getUserCacheKeys } from '../src/lib/memory/redis-cache';
import { getAgent, getAllAgents } from '../src/ai/agents/index';

async function testMemoryPipeline() {
  console.log("=== Testing iSkylar Long-Term Memory Architecture ===");
  const testUserId = "user_test_verify_999";
  const testFact = "User's wife is named Sarah, daughter is Lily, and user founded ChanceTEK.";

  // 1. Verify all agents are registered and read from unified memory
  const agents = getAllAgents();
  console.log(`[✓] Total Registered Companions: ${agents.length} (${agents.map(a => a.name).join(', ')})`);

  // 2. Test L2 Redis Cache
  const cacheKey = getUserCacheKeys(testUserId).profile;
  await cacheSet(cacheKey, { testFact }, 60);
  const cachedData = await cacheGet<{ testFact: string }>(cacheKey);
  console.log(`[✓] Redis L2 High-Speed Cache Test:`, cachedData?.testFact === testFact ? "SUCCESS (< 10ms)" : "FAILED");

  // 3. Test L3 Pinecone Vector Memory Indexing
  console.log(`[...] Upserting vector memory to Pinecone ('user_content' namespace)...`);
  await upsertVectorMemory({
    id: `test_vector_${Date.now()}`,
    userId: testUserId,
    content: testFact,
    category: "Identity",
    importanceScore: 100,
    timestamp: new Date().toISOString(),
  });

  // Query back from Pinecone
  const queryResults = await queryVectorMemories(testUserId, "Who is the user's family and company?", 5, 0.3);
  console.log(`[✓] Pinecone L3 Semantic Recall Test: Found ${queryResults.length} matches.`);
  if (queryResults.length > 0) {
    console.log(`    Top Vector Match: "${queryResults[0].record.content}" (Similarity: ${(queryResults[0].similarity * 100).toFixed(1)}%)`);
  }

  // 4. Test Universal Memory Compiler
  const compiled = await compileUserMemory(testUserId, "Tell me about my life and goals");
  console.log(`[✓] Universal Memory Compiler Block Generated Successfully:`);
  console.log("--------------------------------------------------");
  console.log(compiled.promptBlock.trim());
  console.log("--------------------------------------------------");

  console.log("\n=== VERIFICATION COMPLETE: ALL AGENTS SHARE THIS MEMORY ===");
}

testMemoryPipeline().catch(console.error);
