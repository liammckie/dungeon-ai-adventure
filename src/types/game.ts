export type CharacterRace = 
  | "Human" | "Elf" | "Dwarf" | "Halfling" 
  | "Dragonborn" | "Gnome" | "Half-Elf" | "Tiefling";

export type CharacterSubrace = 
  | "High Elf" | "Wood Elf" | "Dark Elf"
  | "Hill Dwarf" | "Mountain Dwarf"
  | "Lightfoot" | "Stout"
  | "Standard Human" | "Variant Human"
  | "Forest Gnome" | "Rock Gnome" | "Deep Gnome";

export type CharacterClass = 
  | "Fighter" | "Wizard" | "Cleric" | "Rogue"
  | "Barbarian" | "Paladin" | "Ranger"
  | "Druid" | "Warlock" | "Sorcerer" | "Monk" | "Bard";

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type ItemType = "weapon" | "armor" | "tool" | "focus" | "misc";

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  damage?: string;
  armorClass?: number;
}

export interface Trait {
  name: string;
  description: string;
  level?: number;
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
  stats: CharacterStats;
  hp: number;
  maxHp: number;
  temporaryHp?: number;
  inventory: Item[];
  traits: Trait[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
    languages: string[];
    saves: (keyof CharacterStats)[];
  };
  isAI: boolean;
}

export interface GameState {
  characters: Character[];
  currentTurn: number;
  gameLog: string[];
  combatActive: boolean;
  activeQuests: Quest[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const getDefaultStats = (): CharacterStats => ({
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
});

export const getHitDice = (characterClass: CharacterClass): number => {
  const hitDice: Record<CharacterClass, number> = {
    Barbarian: 12,
    Fighter: 10,
    Paladin: 10,
    Ranger: 10,
    Bard: 8,
    Cleric: 8,
    Druid: 8,
    Monk: 8,
    Rogue: 8,
    Warlock: 8,
    Sorcerer: 6,
    Wizard: 6
  };
  return hitDice[characterClass];
};

export const calculateModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

export const calculateProficiencyBonus = (level: number): number => {
  return Math.floor((level - 1) / 4) + 2;
};
