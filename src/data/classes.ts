import { type CharacterClass } from "@/types/character";

export const classes: CharacterClass[] = [
  {
    name: "Fighter",
    hitDie: 10,
    primaryAbility: ["strength", "dexterity"],
    savingThrows: ["strength", "constitution"],
    proficiencies: {
      armor: ["Light", "Medium", "Heavy", "Shields"],
      weapons: ["Simple", "Martial"],
      tools: [],
      skills: 2,
    },
    features: ["Fighting Style", "Second Wind"],
    subclass: "Champion",
  },
  {
    name: "Wizard",
    hitDie: 6,
    primaryAbility: ["intelligence"],
    savingThrows: ["intelligence", "wisdom"],
    proficiencies: {
      armor: [],
      weapons: ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"],
      tools: [],
      skills: 2,
    },
    features: ["Spellcasting", "Arcane Recovery"],
    spellcasting: {
      ability: "intelligence",
      cantripsKnown: 3,
      spellsKnown: 6,
      spellSlots: [2],
    },
    subclass: "School of Evocation",
  },
];