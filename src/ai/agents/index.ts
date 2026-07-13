import type { AgentConfig } from './types';
import { Skylar } from './skylar';
import { Chancellor } from './chancellor';
import { Sydney } from './sydney';
import { Hailey } from './hailey';
import { Chris } from './chris';

export const AGENTS: Record<string, AgentConfig> = {
  skylar: Skylar,
  chancellor: Chancellor,
  sydney: Sydney,
  hailey: Hailey,
  chris: Chris,
};

export const DEFAULT_AGENT = 'skylar';

export function getAgent(agentId?: string): AgentConfig {
  if (!agentId || !AGENTS[agentId]) {
    return AGENTS[DEFAULT_AGENT];
  }
  return AGENTS[agentId];
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(AGENTS);
}

export * from './types';
