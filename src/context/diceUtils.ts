import { DiceRoll, RollType, RollResult } from "@/types/game";

export const rollDice = (dice: DiceRoll): RollResult => {
  const getDiceValue = (type: DiceRoll['type']): number => {
    const values: Record<string, number> = {
      'd4': 4,
      'd6': 6,
      'd8': 8,
      'd10': 10,
      'd12': 12,
      'd20': 20,
      'd100': 100
    };
    return values[type] || 20; // Default to d20 for non-dice roll types
  };

  const roll = () => Math.floor(Math.random() * getDiceValue(dice.type)) + 1;
  
  let rolls: number[] = [];
  if (dice.advantage || dice.disadvantage) {
    rolls = [roll(), roll()];
    const result = dice.advantage ? Math.max(...rolls) : Math.min(...rolls);
    return {
      rolls,
      total: result + (dice.modifier || 0),
      modifier: dice.modifier,
      type: dice.type,
      isNatural20: result === 20,
      isNatural1: result === 1
    };
  }
  
  const result = roll();
  return {
    rolls: [result],
    total: result + (dice.modifier || 0),
    modifier: dice.modifier,
    type: dice.type,
    isNatural20: result === 20,
    isNatural1: result === 1
  };
};