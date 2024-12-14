import { CharacterClass, Item, ItemType, CharacterStats } from "@/types/game";

export const getStartingItems = (characterClass: CharacterClass): Item[] => {
  const commonItems: Item[] = [
    { id: "backpack", name: "Backpack", description: "A sturdy leather backpack", type: "misc" },
    { id: "rations", name: "Rations (5 days)", description: "Dried food and water", type: "misc" },
  ];

  const classItems: Record<CharacterClass, Item[]> = {
    Barbarian: [
      { id: "greataxe", name: "Greataxe", description: "A large two-handed weapon", type: "weapon", damage: "1d12" },
      { id: "handaxe", name: "Handaxe", description: "A versatile throwing axe", type: "weapon", damage: "1d6" },
      { id: "javelin", name: "Javelins (4)", description: "Thrown weapons", type: "weapon", damage: "1d6" },
    ],
    Fighter: [
      { id: "chainmail", name: "Chain Mail", description: "Heavy armor", type: "armor", armorClass: 16 },
      { id: "longsword", name: "Longsword", description: "Versatile melee weapon", type: "weapon", damage: "1d8/1d10" },
      { id: "shield", name: "Shield", description: "Protective shield", type: "armor", armorClass: 2 },
    ],
    Monk: [
      { id: "shortsword", name: "Shortsword", description: "Light melee weapon", type: "weapon", damage: "1d6" },
      { id: "darts", name: "Darts (10)", description: "Throwing weapons", type: "weapon", damage: "1d4" },
    ],
    Rogue: [
      { id: "rapier", name: "Rapier", description: "Finesse weapon", type: "weapon", damage: "1d8" },
      { id: "shortbow", name: "Shortbow", description: "Ranged weapon", type: "weapon", damage: "1d6" },
      { id: "thieves-tools", name: "Thieves' Tools", description: "For lockpicking", type: "tool" },
    ],
    Cleric: [
      { id: "mace", name: "Mace", description: "Simple melee weapon", type: "weapon", damage: "1d6" },
      { id: "holy-symbol", name: "Holy Symbol", description: "Divine focus", type: "focus" },
      { id: "light-crossbow", name: "Light Crossbow", description: "Ranged weapon", type: "weapon", damage: "1d8" },
    ],
    Druid: [
      { id: "scimitar", name: "Scimitar", description: "Curved blade", type: "weapon", damage: "1d6" },
      { id: "druidic-focus", name: "Druidic Focus", description: "Natural focus", type: "focus" },
    ],
    Sorcerer: [
      { id: "quarterstaff", name: "Quarterstaff", description: "Simple staff", type: "weapon", damage: "1d6/1d8" },
      { id: "arcane-focus", name: "Arcane Focus", description: "Magical focus", type: "focus" },
    ],
    Wizard: [
      { id: "quarterstaff", name: "Quarterstaff", description: "Simple staff", type: "weapon", damage: "1d6/1d8" },
      { id: "spellbook", name: "Spellbook", description: "Contains spells", type: "focus" },
    ],
    Warlock: [
      { id: "dagger", name: "Dagger", description: "Simple weapon", type: "weapon", damage: "1d4" },
      { id: "arcane-focus", name: "Arcane Focus", description: "Magical focus", type: "focus" },
    ],
    Bard: [
      { id: "rapier", name: "Rapier", description: "Elegant weapon", type: "weapon", damage: "1d8" },
      { id: "lute", name: "Lute", description: "Musical instrument", type: "focus" },
    ],
    Paladin: [
      { id: "longsword", name: "Longsword", description: "Versatile weapon", type: "weapon", damage: "1d8/1d10" },
      { id: "holy-symbol", name: "Holy Symbol", description: "Divine focus", type: "focus" },
      { id: "chainmail", name: "Chain Mail", description: "Heavy armor", type: "armor", armorClass: 16 },
    ],
    Ranger: [
      { id: "longbow", name: "Longbow", description: "Ranged weapon", type: "weapon", damage: "1d8" },
      { id: "shortsword", name: "Shortsword", description: "Light weapon", type: "weapon", damage: "1d6" },
    ],
    Artificer: [
      { id: "light-crossbow", name: "Light Crossbow", description: "Ranged weapon", type: "weapon", damage: "1d8" },
      { id: "artisans-tools", name: "Artisan's Tools", description: "Crafting tools", type: "tool" },
    ],
  };

  return [...commonItems, ...classItems[characterClass]];
};

export const rollStats = (): CharacterStats => ({
  strength: Math.floor(Math.random() * 16) + 3,
  dexterity: Math.floor(Math.random() * 16) + 3,
  constitution: Math.floor(Math.random() * 16) + 3,
  intelligence: Math.floor(Math.random() * 16) + 3,
  wisdom: Math.floor(Math.random() * 16) + 3,
  charisma: Math.floor(Math.random() * 16) + 3,
});