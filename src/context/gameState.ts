import type { Character, GamePhase, DiceRoll } from "@/types/game";
import type { Scene, StoryEvent } from "@/types/content";
import type { Story } from "@/types/story";
import { StoryManager } from "@/utils/storyManager";

export interface GameState {
  characters: Character[];
  currentTurn: number;
  gameLog: string[];
  combatActive: boolean;
  currentPhase: GamePhase;
  currentScene?: Scene;
  activeEvents: StoryEvent[];
  worldState: Record<string, any>;
  currentStory?: Story;
  storyManager?: StoryManager;
  showTavern: boolean;
  lastRoll?: {
    total: number;
    rolls: number[];
    type: DiceRoll['type'];
  };
  initiativeOrder: string[];
}

export const initialGameState: GameState = {
  characters: [],
  currentTurn: 0,
  gameLog: ["Welcome to the dungeon! Create your character to begin..."],
  combatActive: false,
  currentPhase: 'exploration',
  activeEvents: [],
  worldState: {},
  showTavern: true,
  initiativeOrder: [],
};