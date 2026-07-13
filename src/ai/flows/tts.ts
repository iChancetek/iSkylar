'use server';
/**
 * @fileOverview OpenAI Text-to-Speech conversion
 */

import { getOpenAIClient } from '@/lib/openai';

export async function textToSpeech(
  text: string, 
  language: string = 'en', 
  voiceId: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer' = 'nova',
  speed: number = 0.95
): Promise<{ audioDataUri: string }> {
  try {
    // Get client (fetches key if needed)
    const openai = await getOpenAIClient();

    // Use OpenAI TTS API
    const mp3 = await openai.audio.speech.create({
      model: "tts-1", // or "tts-1-hd" for higher quality
      voice: voiceId,
      input: text,
      speed: speed,
    });

    // Convert to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    // Create Data URI for the frontend audio player
    const audioDataUri = `data:audio/mp3;base64,${buffer.toString('base64')}`;
    
    return { audioDataUri };
  } catch (error) {
    console.error("TTS Error:", error);
    // Return empty audio if TTS fails
    return { audioDataUri: "" };
  }
}
