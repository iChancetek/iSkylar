import { searchMemories } from '@/lib/memory/memory-store';

/**
 * Retrieves relevant long-term memory context for the current conversation turn.
 * 
 * @param userId The user's ID
 * @param agentId The active agent's ID
 * @param currentMessage The current user message to use as the query
 * @returns A formatted string of context to inject into the system prompt
 */
export async function retrieveContext(userId: string, agentId: string, currentMessage: string): Promise<string> {
  try {
    // 1. Search semantic memory for relevant facts based on the current message
    const relevantMemories = await searchMemories(userId, currentMessage, 5);
    
    // 2. Format the context block
    let contextBlock = '';
    
    if (relevantMemories.length > 0) {
      contextBlock += `\n\n=== RELEVANT LONG-TERM MEMORY CONTEXT ===\n`;
      contextBlock += `The following facts are retrieved from your past conversations with the user. Use them naturally if they are relevant to the current conversation.\n`;
      
      relevantMemories.forEach(mem => {
        contextBlock += `- [${mem.category}]: ${mem.content}\n`;
      });
      
      contextBlock += `===========================================\n`;
    }
    
    return contextBlock;
  } catch (error) {
    console.error("RAG Pipeline error:", error);
    return ""; // Fail gracefully and return empty context
  }
}
