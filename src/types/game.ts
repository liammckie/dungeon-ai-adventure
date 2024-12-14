// Basic game types
export type CharacterClass = 
  | "Fighter" 
  | "Wizard" 
  | "Cleric" 
  | "Rogue" 
  | "Barbarian"
  | "Paladin" 
  | "Ranger" 
  | "Druid" 
  | "Warlock" 
  | "Sorcerer" 
  | "Monk" 
  | "Bard"
  | "NPC";

export type CharacterRace = 
  | "Human" 
  | "Elf" 
  | "Dwarf" 
  | "Halfling" 
  | "Dragonborn"
  | "Gnome" 
  | "Half-Elf" 
  | "Tiefling";

export type CharacterSubrace = 
  | "High Elf" 
  | "Wood Elf" 
  | "Dark Elf" 
  | "Hill Dwarf" 
  | "Mountain Dwarf"
  | "Lightfoot" 
  | "Stout" 
  | "Standard Human" 
  | "Variant Human"
  | "Forest Gnome" 
  | "Rock Gnome" 
  | "Deep Gnome";

export type GamePhase = 'exploration' | 'combat' | 'dialogue' | 'interaction' | 'rest';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type ItemType = 'weapon' | 'armor' | 'potion' | 'scroll' | 'misc' | 'focus' | 'tool';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  damage?: string;
  armorClass?: number;
}

export interface Character {
  id: string;
  name: string;
  race: CharacterRace;
  subrace?: CharacterSubrace;
  class: CharacterClass;
  background: string;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  temporaryHp?: number;
  stats: CharacterStats;
  inventory: Item[];
  traits: string[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
    languages: string[];
    saves: string[];
  };
  isAI: boolean;
  isHostile?: boolean;
  description?: string;
  imageUrl?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  rewards: {
    xp: number;
    gold: number;
    items?: Item[];
  };
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceRoll {
  type: DiceType;
  count: number;
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
}

export type RollType = 'attack' | 'damage' | 'skill' | 'save' | 'check' | 'ability' | 'saving' | 'initiative';

export interface RollResult {
  rolls: number[];
  total: number;
  type: RollType;
  modifier?: number;
  isNatural20?: boolean;
  isNatural1?: boolean;
  isCritical?: boolean;
}

export const getHitDice = (characterClass: CharacterClass): number => {
  const hitDice: Record<CharacterClass, number> = {
    Fighter: 10,
    Barbarian: 12,
    Paladin: 10,
    Ranger: 10,
    Monk: 8,
    Rogue: 8,
    Cleric: 8,
    Druid: 8,
    Bard: 8,
    Warlock: 8,
    Wizard: 6,
    Sorcerer: 6,
    NPC: 8
  };
  return hitDice[characterClass];
};