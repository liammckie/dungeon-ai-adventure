import { DiceRoll, RollResult, DiceType } from "@/types/game";

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

export const rollAbilityCheck = (modifier: number = 0): RollResult => {
  return rollDice('d20', 1, modifier);
};

export const rollSavingThrow = (modifier: number = 0): RollResult => {
  return rollDice('d20', 1, modifier);
};

export const rollAttack = (modifier: number = 0): RollResult => {
  return rollDice('d20', 1, modifier);
};

export const rollDamage = (diceType: DiceType, count: number = 1, modifier: number = 0): RollResult => {
  return rollDice(diceType, count, modifier);
};

export const rollInitiative = (modifier: number = 0): RollResult => {
  return rollDice('d20', 1, modifier);
};