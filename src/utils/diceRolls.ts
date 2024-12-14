import { DiceRoll, RollResult, DiceType } from "@/types/game";

export const createDiceRoll = (type: DiceType, count: number = 1, modifier: number = 0): DiceRoll => ({
  type,
  count,
  modifier
});

export const rollDice = (diceType: DiceType, count: number = 1, modifier: number = 0): RollResult => {
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    const diceMax = parseInt(diceType.substring(1));
    rolls.push(Math.floor(Math.random() * diceMax) + 1);
  }

  const total = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;

  return {
    rolls,
    total,
    type: diceType,
    modifier,
    isNatural20: diceType === 'd20' && rolls.includes(20),
    isNatural1: diceType === 'd20' && rolls.includes(1),
    isCritical: diceType === 'd20' && rolls.includes(20)
  };
};

export const rollWithDiceRoll = (roll: DiceRoll): RollResult => {
  return rollDice(roll.type, roll.count, roll.modifier || 0);
};