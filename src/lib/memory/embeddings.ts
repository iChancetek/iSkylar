import { openai } from '@/lib/openai';

/**
 * Generates a vector embedding for the given text using OpenAI's text-embedding-3-small.
 * This model produces 1536-dimensional embeddings by default, optimized for latency and cost.
 * @param text The string to embed
 * @returns A number array representing the vector embedding
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate vector embedding.');
  }
}
