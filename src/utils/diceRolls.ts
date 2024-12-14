import { DiceRoll, RollResult, DiceType } from "@/types/game";

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

export const rollAbilityCheck = (modifier: number, proficiencyBonus?: number, options?: { advantage?: boolean; disadvantage?: boolean }): RollResult => {
  const roll: DiceRoll = {
    type: 'd20',
    count: 1,
    modifier: modifier + (proficiencyBonus || 0)
  };
  return rollDice(roll);
};

export const rollSavingThrow = (modifier: number, options?: { advantage?: boolean; disadvantage?: boolean }): RollResult => {
  const roll: DiceRoll = {
    type: 'd20',
    count: 1,
    modifier
  };
  return rollDice(roll);
};

export const rollAttack = (modifier: number, options?: { advantage?: boolean; disadvantage?: boolean }): RollResult => {
  const roll: DiceRoll = {
    type: 'd20',
    count: 1,
    modifier
  };
  return rollDice(roll);
};

export const rollDamage = (diceCount: number, diceType: DiceType, modifier: number, isCritical?: boolean): RollResult => {
  const roll: DiceRoll = {
    type: diceType,
    count: diceCount * (isCritical ? 2 : 1),
    modifier
  };
  return rollDice(roll);
};

export const rollInitiative = (modifier: number, options?: { advantage?: boolean; disadvantage?: boolean }): RollResult => {
  const roll: DiceRoll = {
    type: 'd20',
    count: 1,
    modifier
  };
  return rollDice(roll);
};