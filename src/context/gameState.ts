import type { Character, GamePhase, Quest, DiceRoll } from "@/types/game";

export interface GameState {
  characters: Character[];
  currentTurn: number;
  gameLog: string[];
  combatActive: boolean;
  activeQuests: Quest[];
  currentPhase: GamePhase;
  lastRoll?: {
    total: number;
    rolls: number[];
    type: DiceRoll['type'];
  };
}

export const initialGameState: GameState = {
  characters: [],
  currentTurn: 0,
  gameLog: ["Welcome to the dungeon! Create your character to begin..."],
  combatActive: false,
  activeQuests: [],
  currentPhase: 'exploration',
};