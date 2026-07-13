export type AgentGender = 'female' | 'male';

export interface AgentConfig {
  id: string;
  name: string;
  title: string;
  description: string;
  systemPrompt: string;
  voiceId: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  voiceSpeed: number;
  avatarColor: string;
  gender: AgentGender;
}
