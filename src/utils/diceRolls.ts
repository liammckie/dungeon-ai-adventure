import { DiceRoll, RollResult, DiceType, RollType } from "@/types/game";

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

export const createDiceRoll = (type: DiceType, count: number = 1, modifier: number = 0): DiceRoll => ({
  type,
  count,
  modifier
});

export const rollAbilityCheck = (modifier: number = 0): RollResult => {
  return rollDice(createDiceRoll('d20', 1, modifier));
};

export const rollSavingThrow = (modifier: number = 0): RollResult => {
  return rollDice(createDiceRoll('d20', 1, modifier));
};

export const rollAttack = (modifier: number = 0): RollResult => {
  return rollDice(createDiceRoll('d20', 1, modifier));
};

export const rollDamage = (diceType: DiceType, count: number = 1, modifier: number = 0): RollResult => {
  return rollDice(createDiceRoll(diceType, count, modifier));
};

export const rollInitiative = (modifier: number = 0): RollResult => {
  return rollDice(createDiceRoll('d20', 1, modifier));
};