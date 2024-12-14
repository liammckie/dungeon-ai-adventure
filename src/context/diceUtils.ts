import { DiceRoll } from "@/types/game";

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