import { Quest } from './game';

export type CharacterClass = "Warrior" | "Mage" | "Rogue" | "Cleric" | "NPC";

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  hp: number;
  maxHp: number;
  temporaryHp?: number;
  isAI: boolean;
  isHostile: boolean;
  stats: CharacterStats;
  imageUrl?: string;
  description?: string;
}

export type SceneType = 'tavern' | 'forest' | 'dungeon' | 'village' | 'graveyard' | 'chapel';
export type EventType = 'combat' | 'dialogue' | 'puzzle' | 'discovery';
export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';
export type Weather = 'clear' | 'rain' | 'storm' | 'fog';

export interface DialogueOption {
  text: string;
  nextId?: string;
  condition?: EventCondition;
  consequence?: EventConsequence;
}

export interface Scene {
  id: string;
  type: SceneType;
  name: string;
  description: string;
  imageUrl: string;
  possibleEvents: StoryEvent[];
  requiredLevel?: number;
  availableNPCs: NPC[];
  dialogueOptions?: DialogueOption[];
  environmentEffects?: {
    time: TimeOfDay;
    weather: Weather;
  };
}

export interface StoryEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  difficulty: string;
  rewards: Reward[];
  conditions: EventCondition[];
  consequences: EventConsequence[];
}

export interface EventCondition {
  type: 'quest' | 'level' | 'item' | 'npc';
  requirement: string;
  value: any;
}

export interface EventConsequence {
  type: 'quest' | 'reputation' | 'item' | 'state';
  effect: string;
  value: any;
}

export interface Reward {
  type: 'gold' | 'item' | 'xp' | 'reputation';
  amount: number;
  itemId?: string;
}

export interface NPC {
  id: string;
  name: string;
  description: string;
  age: number;
  race: string;
  traits: string[];
  inventory: Item[];
  dialogue: DialogueNode[];
  quests?: Quest[];
  reputation?: number;
  imageUrl?: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  options: DialogueOption[];
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  damage?: string;
  armorClass?: number;
}
