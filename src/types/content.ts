import { Character } from "./game";

export type SceneType = 'tavern' | 'forest' | 'dungeon' | 'town' | 'combat' | 'graveyard' | 'chapel';

export interface Scene {
  id: string;
  type: SceneType;
  name: string;
  description: string;
  imageUrl?: string;
  availableNPCs?: Character[];
  dialogueOptions?: DialogueOption[];
  actions?: SceneAction[];
  environmentEffects?: {
    time: 'day' | 'night';
    weather: 'clear' | 'rain' | 'fog' | 'storm';
  };
  possibleEvents?: StoryEvent[];
}

export interface DialogueOption {
  text: string;
  response: string;
  nextId?: string;
  condition?: {
    requirement: string;
    value: any;
  };
  consequence?: {
    type: 'state' | 'item' | 'quest';
    effect: string;
    value: any;
  };
  action?: () => void;
}

export interface SceneAction {
  name: string;
  description: string;
  execute: () => void;
}

export interface StoryEvent {
  id: string;
  title: string;
  description: string;
  type: 'combat' | 'dialogue' | 'exploration';
  completed: boolean;
}

export interface NPC extends Character {
  age?: number;
  dialogue: {
    greeting: string;
    options: {
      text: string;
      response: string;
      action?: () => void;
    }[];
  };
}