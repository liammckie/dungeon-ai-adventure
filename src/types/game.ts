export type CharacterClass = "Warrior" | "Mage" | "Rogue" | "Cleric";
export type CharacterRace = "Human" | "Elf" | "Dwarf" | "Halfling";
export type ItemType = "weapon" | "armor" | "potion" | "misc";

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
}

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  race: CharacterRace;
  stats: CharacterStats;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  inventory: Item[];
  isAI: boolean;
}

export interface GameState {
  characters: Character[];
  currentTurn: number;
  gameLog: string[];
  combatActive: boolean;
}