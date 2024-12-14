import { DiceType, DiceRoll, RollResult } from "@/types/game";

export const createDiceRoll = (type: DiceType, count: number = 1, modifier: number = 0): DiceRoll => ({
  type,
  count,
  modifier
});

export const rollDice = (roll: DiceRoll): RollResult => {
  const rolls: number[] = [];
  for (let i = 0; i < roll.count; i++) {
    const diceMax = parseInt(roll.type.substring(1));
    rolls.push(Math.floor(Math.random() * diceMax) + 1);
  }

  const total = rolls.reduce((sum, roll) => sum + roll, 0) + (roll.modifier || 0);

  return {
    rolls,
    total,
    type: roll.type,
    modifier: roll.modifier,
    isNatural20: roll.type === 'd20' && rolls.includes(20),
    isNatural1: roll.type === 'd20' && rolls.includes(1),
    isCritical: roll.type === 'd20' && rolls.includes(20)
  };
};

export const rollWithAdvantage = (roll: DiceRoll): RollResult => {
  const roll1 = rollDice(roll);
  const roll2 = rollDice(roll);
  return roll1.total > roll2.total ? roll1 : roll2;
};

export const rollWithDisadvantage = (roll: DiceRoll): RollResult => {
  const roll1 = rollDice(roll);
  const roll2 = rollDice(roll);
  return roll1.total < roll2.total ? roll1 : roll2;
};