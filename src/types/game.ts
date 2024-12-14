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

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  difficulty: number;
}

export type GamePhase = 'exploration' | 'interaction' | 'combat' | 'rest';

export interface DiceRoll {
  type: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
}

export const getDefaultStats = (): CharacterStats => ({
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10
});

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
    Sorcerer: 6
  };
  return hitDice[characterClass];
};

export const rollDice = (dice: DiceRoll): number => {
  const getDiceValue = (type: DiceRoll['type']): number => {
    const values: Record<DiceRoll['type'], number> = {
      'd4': 4,
      'd6': 6,
      'd8': 8,
      'd10': 10,
      'd12': 12,
      'd20': 20,
      'd100': 100
    };
    return values[type];
  };

  const roll = () => Math.floor(Math.random() * getDiceValue(dice.type)) + 1;
  
  let rolls: number[] = [];
  if (dice.advantage || dice.disadvantage) {
    rolls = [roll(), roll()];
    const result = dice.advantage ? Math.max(...rolls) : Math.min(...rolls);
    return result + (dice.modifier || 0);
  }
  
  const result = roll();
  return result + (dice.modifier || 0);
};