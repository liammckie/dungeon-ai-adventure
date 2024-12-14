import { CharacterClass, Item, ItemType } from "@/types/game";

export const getStartingItems = (characterClass: CharacterClass): Item[] => {
  const commonItems: Item[] = [
    { id: "backpack", name: "Backpack", description: "A sturdy leather backpack", type: "misc" },
    { id: "rations", name: "Rations (5 days)", description: "Dried food and water", type: "misc" },
  ];

  const classItems: Record<CharacterClass, Item[]> = {
    Fighter: [
      { id: "chainmail", name: "Chain Mail", description: "Heavy armor", type: "armor", armorClass: 16 },
      { id: "longsword", name: "Longsword", description: "Versatile melee weapon", type: "weapon", damage: "1d8/1d10" },
    ],
    Wizard: [
      { id: "quarterstaff", name: "Quarterstaff", description: "Simple staff", type: "weapon", damage: "1d6/1d8" },
      { id: "spellbook", name: "Spellbook", description: "Contains spells", type: "focus" },
    ],
    Cleric: [
      { id: "mace", name: "Mace", description: "Simple melee weapon", type: "weapon", damage: "1d6" },
      { id: "holy-symbol", name: "Holy Symbol", description: "Divine focus", type: "focus" },
    ],
    Rogue: [
      { id: "leather", name: "Leather Armor", description: "Light armor", type: "armor", armorClass: 11 },
      { id: "dagger", name: "Dagger", description: "Simple weapon", type: "weapon", damage: "1d4" },
    ],
    Barbarian: [
      { id: "greataxe", name: "Greataxe", description: "Martial weapon", type: "weapon", damage: "1d12" },
      { id: "handaxe", name: "Handaxe", description: "Simple weapon", type: "weapon", damage: "1d6" },
    ],
    Paladin: [
      { id: "chainmail", name: "Chain Mail", description: "Heavy armor", type: "armor", armorClass: 16 },
      { id: "longsword", name: "Longsword", description: "Versatile weapon", type: "weapon", damage: "1d8/1d10" },
    ],
    Ranger: [
      { id: "leather", name: "Leather Armor", description: "Light armor", type: "armor", armorClass: 11 },
      { id: "longbow", name: "Longbow", description: "Martial weapon", type: "weapon", damage: "1d8" },
    ],
    Druid: [
      { id: "leather", name: "Leather Armor", description: "Light armor", type: "armor", armorClass: 11 },
      { id: "scimitar", name: "Scimitar", description: "Martial weapon", type: "weapon", damage: "1d6" },
    ],
    Warlock: [
      { id: "leather", name: "Leather Armor", description: "Light armor", type: "armor", armorClass: 11 },
      { id: "dagger", name: "Dagger", description: "Simple weapon", type: "weapon", damage: "1d4" },
    ],
    Sorcerer: [
      { id: "quarterstaff", name: "Quarterstaff", description: "Simple staff", type: "weapon", damage: "1d6/1d8" },
      { id: "focus", name: "Arcane Focus", description: "Magical focus", type: "focus" },
    ],
    Monk: [
      { id: "quarterstaff", name: "Quarterstaff", description: "Simple staff", type: "weapon", damage: "1d6/1d8" },
      { id: "dart", name: "Dart", description: "Simple weapon", type: "weapon", damage: "1d4" },
    ],
    Bard: [
      { id: "leather", name: "Leather Armor", description: "Light armor", type: "armor", armorClass: 11 },
      { id: "rapier", name: "Rapier", description: "Martial weapon", type: "weapon", damage: "1d8" },
    ],
  };

  return [...commonItems, ...classItems[characterClass]];
};