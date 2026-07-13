import { Timestamp } from 'firebase/firestore';

export type MemoryCategory = 
  | 'Personal Profile'
  | 'Communication Preferences'
  | 'Health and Wellness'
  | 'Career'
  | 'Education'
  | 'Family'
  | 'Friends'
  | 'Travel'
  | 'Hobbies'
  | 'Financial'
  | 'Projects'
  | 'Tasks'
  | 'Goals'
  | 'Emotional Patterns'
  | 'Frequently Asked Questions'
  | 'Favorite Responses'
  | 'Long-term Plans'
  | 'General';

export interface MemoryEntry {
  id?: string;
  userId: string;
  agentId?: string; // Optional: if memory is specific to one agent
  category: MemoryCategory;
  content: string;
  embedding: number[]; // Vector embedding of the content (1536 dims for text-embedding-3-small)
  sourceConversationId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ConversationMessage {
  id: string;
  speaker: 'user' | 'system' | 'agent';
  agentId?: string;
  text: string;
  timestamp: Timestamp;
}

export interface Conversation {
  id?: string;
  userId: string;
  agentId: string;
  messages: ConversationMessage[];
  startTime: Timestamp;
  endTime?: Timestamp;
  duration?: number; // in seconds
  summaryShort?: string;
  summaryMedium?: string;
  summaryComprehensive?: string;
}

export interface AgentMemory {
  userId: string;
  agentId: string;
  interactionCount: number;
  toneAdaptations: string[];
  personalizedObservations: string[];
  lastInteraction: Timestamp;
}
