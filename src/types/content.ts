import { Character } from "./game";

export interface DialogueOption {
  text: string;
  nextId?: string;
  response?: string;
  action?: () => void;
  condition?: {
    type: string;
    requirement: string;
    value: number;
  };
  consequence?: {
    type: 'state' | 'item';
    effect: string;
    value: any;
  };
}

export interface Scene {
  id: string;
  type: 'forest' | 'tavern' | 'town' | 'dungeon' | 'graveyard' | 'chapel';
  name: string;
  description: string;
  imageUrl: string;
  dialogueOptions?: DialogueOption[];
  availableNPCs?: Character[];
  possibleEvents?: StoryEvent[];
  environmentEffects?: {
    time: string;
    weather: string;
  };
}

export interface StoryEvent {
  id: string;
  title: string;
  description: string;
  type: 'quest' | 'encounter' | 'dialogue';
  completed: boolean;
}

export interface NPC extends Character {
  imageUrl?: string;
  dialogue: {
    greeting: string;
    options: {
      text: string;
      response: string;
      action?: () => void;
    }[];
  };
}