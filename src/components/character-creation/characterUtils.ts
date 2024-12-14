import { CharacterClass, Item, ItemType } from "@/types/game";

export const getStartingItems = (characterClass: CharacterClass): Item[] => {
  const commonItems: Item[] = [
    { id: "backpack", name: "Backpack", description: "A sturdy leather backpack", type: "misc" as ItemType },
    { id: "rations", name: "Rations (5 days)", description: "Dried food and water", type: "misc" as ItemType },
  ];

  const classItems: Record<CharacterClass, Item[]> = {
    Warrior: [
      { id: "longsword", name: "Longsword", description: "A well-balanced sword", type: "weapon" as ItemType },
      { id: "chainmail", name: "Chainmail", description: "Standard chainmail armor", type: "armor" as ItemType },
    ],
    Mage: [
      { id: "staff", name: "Staff", description: "A wooden staff for casting", type: "weapon" as ItemType },
      { id: "spellbook", name: "Spellbook", description: "Contains basic spells", type: "misc" as ItemType },
    ],
    Rogue: [
      { id: "dagger", name: "Dagger", description: "A sharp dagger", type: "weapon" as ItemType },
      { id: "leather", name: "Leather Armor", description: "Light leather armor", type: "armor" as ItemType },
    ],
    Cleric: [
      { id: "mace", name: "Mace", description: "A holy mace", type: "weapon" as ItemType },
      { id: "shield", name: "Shield", description: "A sturdy shield", type: "armor" as ItemType },
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