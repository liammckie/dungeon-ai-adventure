export type Item = {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  damage?: string;
  armorClass?: number;
};

export type ItemType = "weapon" | "armor" | "misc" | "focus" | "tool";

export type CharacterStats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

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
  | "Bard";

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

export type GamePhase = 
  | "exploration"
  | "combat"
  | "interaction"
  | "rest";

export type Quest = {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "failed";
  difficulty: string;
};

export type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

export type RollType = "attack" | "damage" | "save" | "check" | "heal" | "ability" | "saving" | "initiative";

export type DiceRoll = {
  type: RollType | DiceType;
  modifier?: number;
  advantage?: boolean;
  disadvantage?: boolean;
};

export type RollResult = {
  total: number;
  rolls: number[];
  modifier?: number;
  type: RollType | DiceType;
  success?: boolean;
  isNatural20?: boolean;
  isNatural1?: boolean;
  isCritical?: boolean;
};

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
  traits: string[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: string[];
    languages: string[];
    saves: (keyof CharacterStats)[];
  };
  isAI: boolean;
  isHostile?: boolean;
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
  const hitDiceMap: Record<CharacterClass, number> = {
    Barbarian: 12,
    Fighter: 10,
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
  };
  return hitDiceMap[characterClass];
};