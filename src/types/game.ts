export type Character = {
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
};

export type CharacterStats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  type: "weapon" | "armor" | "potion" | "misc";
};

export type CharacterClass = "Warrior" | "Mage" | "Rogue" | "Cleric";
export type CharacterRace = "Human" | "Elf" | "Dwarf" | "Halfling";

export type GameState = {
  characters: Character[];
  currentTurn: number;
  gameLog: string[];
  combatActive: boolean;
};