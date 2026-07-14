# iSkylar: AI Voice Therapist

iSkylar is an emotionally intelligent, voice-interactive Generative AI Therapist designed to offer empathetic mental health support.
This application is built with NextJS, React, ShadCN UI components, Tailwind CSS, Firebase, and direct OpenAI integrations alongside Genkit for specialized AI flows.

It provides real-time voice-based therapeutic conversations, aiming to interpret emotional cues and deliver evidence-based therapeutic interventions.

## Core Features
- **AI-Powered Voice Companions:** Real-time, empathetic interaction powered by OpenAI `gpt-4-turbo-preview`.
- **Voice Interaction:** High-accuracy Speech-to-Text (OpenAI Whisper) and natural Text-to-Speech integration.
- **Dynamic Conversational Flow:** Adapts to user input, emotional state, and conversation history.
- **Therapeutic Interventions:** Utilizes techniques from CBT, DBT, ACT, and Mindfulness.
- **Crisis Support:** Built-in safety net protocols for immediate crisis intervention.

## Agentic AI Architecture

iSkylar leverages a modular AI architecture, using a combination of **Firebase**, **OpenAI**, and **Genkit** to manage dynamic conversational memory and agent personas.

### Frameworks & Protocols
- **Core Model**: The system relies on OpenAI's `gpt-4-turbo-preview` via direct API calls for the primary conversational loop, optimizing for ultra-low latency and highly natural response flow.
- **RAG & Memory Pipeline**: A robust memory backend built on Firebase Firestore stores long-term conversational facts. Embeddings (`text-embedding-3-small`) power semantic search to retrieve relevant memories seamlessly across sessions.
- **Secondary Flows**: Google's **Genkit** is used for structured background processes, such as emotional cue recognition and personalized therapy interventions.

### Agent Personas & Responsibilities

The system provides multiple specialized AI personas, each designed with a unique personality and role to offer tailored support:

#### 1. Skylar: The Therapist
- **Personality**: Warm, empathetic, and clinically grounded.
- **Role**: Skylar is your safe harbor for deep emotional processing and healing.

#### 2. Chancellor: Executive Assistant
- **Personality**: Loyal, efficient, and sharply witty.
- **Role**: Chancellor keeps you organized and focused on your goals.

#### 3. Sydney: The Optimist
- **Personality**: Sunshine energy.
- **Role**: Sydney is here to lift your mood, celebrate your wins, and remind you of the bright side.

#### 4. Hailey: Best Friend
- **Personality**: Smart, playful, and relentlessly honest.
- **Role**: Hailey gives you the reality check you need with a laugh.

#### 5. Chris: The Chill One
- **Personality**: Grounded and calm.
- **Role**: Chris is the late-night conversation partner who helps you slow down and breathe.

## Getting Started

To get started or see the main user interface, take a look at `src/app/page.tsx`, which loads the `VoiceInterface` component (`src/components/voice-interface.tsx`).

**Core AI Logic:**
- The primary conversational loop and prompt engineering for each agent is located in `src/ai/flows/ai-therapy.ts`.
- The agent personas and voice configurations are maintained in `src/ai/agents/index.ts`.
- The retrieval-augmented generation (RAG) and semantic memory pipeline lives in `src/ai/memory/rag-pipeline.ts`.
- Safety mechanisms and immediate crisis detection run in parallel via `src/ai/flows/safety-net.ts`.
