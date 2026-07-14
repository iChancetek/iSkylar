
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
import path from 'path';
import { Readable } from 'stream';

// Try loading from .env.local first, then .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function verifyOpenAI() {
    console.log("----------------------------------------");
    console.log("🔍 OpenAI Connectivity Test");
    console.log("----------------------------------------");

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("❌ ERROR: OPENAI_API_KEY is missing from environment variables.");
        console.log("Checked locations:");
        console.log(" - " + path.resolve(process.cwd(), '.env.local'));
        console.log(" - " + path.resolve(process.cwd(), '.env'));
        process.exit(1);
    }

    console.log(`✅ API Key found (Length: ${apiKey.length} chars)`);
    console.log(`🔑 Key prefix: ${apiKey.substring(0, 7)}...`);

    const openai = new OpenAI({ apiKey });
    let audioBuffer: Buffer | null = null;

    // Test 1: Chat Completion (GPT-5.6-Terra)
    try {
        console.log("\n📡 Testing Chat Completion (gpt-5.6-terra)...");
        const completion = await openai.chat.completions.create({
            model: "gpt-5.6-terra",
            messages: [{ role: "user", content: "Reply with the word 'Success'." }],
            max_completion_tokens: 10,
        });
        console.log("✅ Chat Response:", completion.choices[0].message.content);
    } catch (error: any) {
        console.error("❌ Chat Completion Failed:");
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`   Message: ${error.message}`);
        }
    }

    // Test 2: TTS (tts-1)
    try {
        console.log("\n🔊 Testing Text-to-Speech (tts-1)...");
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: "System check complete.",
        });
        audioBuffer = Buffer.from(await mp3.arrayBuffer());
        console.log(`✅ TTS Success: Received audio buffer (${audioBuffer.byteLength} bytes)`);
    } catch (error: any) {
        console.error("❌ TTS Failed:");
        console.error(`   Message: ${error.message}`);
    }

    // Test 3: STT (whisper-1) - Loopback Test
    if (audioBuffer) {
        try {
            console.log("\n🎙️ Testing Speech-to-Text (whisper-1)...");
            
            // Create a pseudo-file for the OpenAI SDK
            // The SDK accepts a File object or a Readable stream with a 'path' property
            const stream: any = Readable.from(audioBuffer);
            stream.path = 'test.mp3';

            const transcription = await openai.audio.transcriptions.create({
                file: stream,
                model: "whisper-1",
            });
            console.log("✅ STT Response:", transcription.text);
            
            if (transcription.text.toLowerCase().includes("system check complete")) {
                console.log("✨ Loopback Test: PASSED (Transcription matches original text)");
            } else {
                console.log("⚠️ Loopback Test: PARTIAL (Transcription received but text mismatch)");
            }
        } catch (error: any) {
            console.error("❌ STT Failed:");
            console.error(`   Message: ${error.message}`);
        }
    } else {
        console.log("\n⏭️ Skipping STT Test: No audio buffer available from TTS test.");
    }

    console.log("\n----------------------------------------");
}

verifyOpenAI();
