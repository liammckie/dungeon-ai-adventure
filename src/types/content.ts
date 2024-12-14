import { Character } from "./game";

export interface Scene {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  npcs?: Character[];
  dialogueOptions?: DialogueOption[];
  actions?: SceneAction[];
}

export interface DialogueOption {
  text: string;
  response: string;
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
  dialogue: {
    greeting: string;
    options: {
      text: string;
      response: string;
      action?: () => void;
    }[];
  };
}