import { type Item } from "./game";

export type AbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type Skill = {
  name: string;
  ability: keyof AbilityScores;
  isProficient: boolean;
};

export type CharacterRace = {
  name: string;
  subrace?: string;
  abilityScoreIncrease: Partial<AbilityScores>;
  traits: string[];
  languages: string[];
  speed: number;
  darkvision?: number;
};

export type CharacterClass = {
  name: string;
  subclass?: string;
  hitDie: number;
  primaryAbility: (keyof AbilityScores)[];
  savingThrows: (keyof AbilityScores)[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    skills: number; // Number of skills to choose
  };
  features: string[];
  spellcasting?: {
    ability: keyof AbilityScores;
    cantripsKnown: number;
    spellsKnown: number;
    spellSlots: number[];
  };
};

export type Background = {
  name: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  languages: number;
  equipment: Item[];
  feature: {
    name: string;
    description: string;
  };
  characteristics: {
    personality: string[];
    ideal: string[];
    bond: string[];
    flaw: string[];
  };
};

export type Spell = {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
  classes: string[];
};

export type Feat = {
  name: string;
  prerequisites?: Partial<{
    abilityScores: Partial<AbilityScores>;
    level: number;
    race: string[];
    class: string[];
  }>;
  description: string;
  benefits: string[];
};

export type CharacterData = {
  id: string;
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  background: Background;
  abilityScores: AbilityScores;
  skills: Skill[];
  feats: Feat[];
  spells: Spell[];
  equipment: Item[];
  level: number;
  experience: number;
  hitPoints: {
    current: number;
    maximum: number;
    temporary: number;
  };
  proficiencyBonus: number;
  initiative: number;
  armorClass: number;
  speed: number;
  inspiration: boolean;
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
};