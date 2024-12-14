import { rollDice, createDiceRoll } from "./diceRolls";

export const generateRandomEncounter = () => {
  const encounterRoll = rollDice(createDiceRoll("d4", 1));
  // Logic to generate a random encounter based on the roll
  // This could involve selecting a creature or event from a predefined list
  // For example:
  const encounters = [
    "A wild beast appears!",
    "You stumble upon a hidden treasure!",
    "A group of bandits ambushes you!",
    "You find a mysterious traveler."
  ];
  const encounterIndex = encounterRoll.total - 1; // Adjust for zero-based index
  return encounters[encounterIndex] || "Nothing happens.";
};

export const generateRandomLoot = () => {
  const lootRoll = rollDice(createDiceRoll("d4", 1));
  // Logic to generate random loot based on the roll
  // This could involve selecting items from a loot table
  const lootItems = [
    "Gold coins",
    "A healing potion",
    "A rusty sword",
    "A mysterious artifact"
  ];
  const lootIndex = lootRoll.total - 1; // Adjust for zero-based index
  return lootItems[lootIndex] || "No loot found.";
};
