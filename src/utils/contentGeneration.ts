import { rollDice } from "./diceRolls";

export const generateRandomEncounter = () => {
  const roll = rollDice({ type: "d4" });
  const numEnemies = roll.total;
  
  // Logic to generate random enemies based on numEnemies
  const enemies = Array.from({ length: numEnemies }, (_, index) => ({
    id: `enemy${index + 1}`,
    name: `Enemy ${index + 1}`,
    hp: Math.floor(Math.random() * 10) + 5, // Random HP between 5 and 15
  }));

  return enemies;
};

export const generateRandomLoot = () => {
  const roll = rollDice({ type: "d4" });
  const numItems = roll.total;
  
  // Logic to generate random loot based on numItems
  const loot = Array.from({ length: numItems }, (_, index) => ({
    id: `item${index + 1}`,
    name: `Loot Item ${index + 1}`,
    description: `Description for loot item ${index + 1}`,
  }));

  return loot;
};
