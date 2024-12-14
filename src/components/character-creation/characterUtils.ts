import { Item } from "@/types/game";

export const getStartingItems = (characterClass: string): Item[] => {
  const commonItems = [
    { id: "backpack", name: "Backpack", description: "A sturdy leather backpack", type: "misc" },
    { id: "rations", name: "Rations (5 days)", description: "Dried food and water", type: "misc" },
  ];

  const classItems: Record<string, Item[]> = {
    Warrior: [
      { id: "longsword", name: "Longsword", description: "A well-balanced sword", type: "weapon" },
      { id: "chainmail", name: "Chainmail", description: "Standard chainmail armor", type: "armor" },
    ],
    Mage: [
      { id: "staff", name: "Staff", description: "A wooden staff for casting", type: "weapon" },
      { id: "spellbook", name: "Spellbook", description: "Contains basic spells", type: "misc" },
    ],
    Rogue: [
      { id: "dagger", name: "Dagger", description: "A sharp dagger", type: "weapon" },
      { id: "leather", name: "Leather Armor", description: "Light leather armor", type: "armor" },
    ],
    Cleric: [
      { id: "mace", name: "Mace", description: "A holy mace", type: "weapon" },
      { id: "shield", name: "Shield", description: "A sturdy shield", type: "armor" },
    ],
  };

  return [...commonItems, ...classItems[characterClass]];
};

export const rollStats = () => ({
  strength: Math.floor(Math.random() * 16) + 3,
  dexterity: Math.floor(Math.random() * 16) + 3,
  constitution: Math.floor(Math.random() * 16) + 3,
  intelligence: Math.floor(Math.random() * 16) + 3,
  wisdom: Math.floor(Math.random() * 16) + 3,
  charisma: Math.floor(Math.random() * 16) + 3,
});