export type CharacterClass = 
  | "Fighter" | "Wizard" | "Cleric" | "Rogue" | "Barbarian"
  | "Paladin" | "Ranger" | "Druid" | "Warlock" | "Sorcerer" 
  | "Monk" | "Bard" | "NPC";

export type CharacterRace = 
  | "Human" | "Elf" | "Dwarf" | "Halfling" | "Dragonborn"
  | "Gnome" | "Half-Elf" | "Tiefling";

export type CharacterSubrace = 
  | "High Elf" | "Wood Elf" | "Dark Elf" 
  | "Hill Dwarf" | "Mountain Dwarf"
  | "Lightfoot" | "Stout" 
  | "Standard Human" | "Variant Human"
  | "Forest Gnome" | "Rock Gnome" | "Deep Gnome";

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type AbilityScoreKey = keyof CharacterStats;

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

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  damage?: string;
  armorClass?: number;
}

export type ItemType = 'weapon' | 'armor' | 'potion' | 'scroll' | 'misc' | 'focus' | 'tool';

export type GamePhase = 'exploration' | 'interaction' | 'combat' | 'rest';

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
export type RollType = DiceType | 'attack' | 'ability' | 'saving' | 'initiative' | 'damage';

export interface DiceRoll {
  type: DiceType;
  count: number;
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
}

export interface RollResult {
  rolls: number[];
  total: number;
  type: DiceType;
  modifier?: number;
  isNatural20?: boolean;
  isNatural1?: boolean;
  isCritical?: boolean;
}