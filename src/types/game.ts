export type CharacterClass = 
  | "Barbarian" | "Fighter" | "Monk" | "Rogue" 
  | "Cleric" | "Druid" | "Sorcerer" | "Wizard" | "Warlock"
  | "Bard" | "Paladin" | "Ranger" | "Artificer";

export type CharacterRace = "Human" | "Elf" | "Dwarf" | "Halfling";
export type ItemType = "weapon" | "armor" | "tool" | "focus" | "misc";

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
  damage?: string;
  armorClass?: number;
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

export const getDefaultStats = (characterClass: CharacterClass): CharacterStats => {
  const stats: Record<CharacterClass, CharacterStats> = {
    Barbarian: { strength: 15, constitution: 14, dexterity: 13, wisdom: 12, intelligence: 10, charisma: 8 },
    Fighter: { strength: 16, constitution: 14, dexterity: 12, wisdom: 12, intelligence: 10, charisma: 8 },
    Monk: { dexterity: 16, wisdom: 14, constitution: 13, intelligence: 10, charisma: 8, strength: 10 },
    Rogue: { dexterity: 16, intelligence: 14, constitution: 13, wisdom: 12, charisma: 10, strength: 8 },
    Cleric: { wisdom: 16, constitution: 14, strength: 13, dexterity: 12, charisma: 10, intelligence: 8 },
    Druid: { wisdom: 16, constitution: 14, dexterity: 13, intelligence: 12, strength: 10, charisma: 8 },
    Sorcerer: { charisma: 16, constitution: 14, dexterity: 13, intelligence: 12, wisdom: 10, strength: 8 },
    Wizard: { intelligence: 16, constitution: 14, dexterity: 13, wisdom: 12, charisma: 10, strength: 8 },
    Warlock: { charisma: 16, constitution: 14, dexterity: 13, intelligence: 12, wisdom: 10, strength: 8 },
    Bard: { charisma: 16, dexterity: 14, constitution: 13, intelligence: 12, wisdom: 10, strength: 8 },
    Paladin: { strength: 16, charisma: 14, constitution: 13, dexterity: 12, wisdom: 10, intelligence: 8 },
    Ranger: { dexterity: 16, wisdom: 14, constitution: 13, strength: 12, intelligence: 10, charisma: 8 },
    Artificer: { intelligence: 16, dexterity: 14, constitution: 13, wisdom: 12, charisma: 10, strength: 8 }
  };
  return stats[characterClass];
};

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
    Artificer: 8,
    Sorcerer: 6,
    Wizard: 6
  };
  return hitDice[characterClass];
};