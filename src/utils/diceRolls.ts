import { DiceRoll, RollType, RollResult, DiceType } from "@/types/game";

export const rollD20 = (options: {
  advantage?: boolean;
  disadvantage?: boolean;
  modifier?: number;
}): RollResult => {
  const roll1 = Math.floor(Math.random() * 20) + 1;
  const roll2 = Math.floor(Math.random() * 20) + 1;
  
  let finalRoll: number;
  if (options.advantage && !options.disadvantage) {
    finalRoll = Math.max(roll1, roll2);
  } else if (options.disadvantage && !options.advantage) {
    finalRoll = Math.min(roll1, roll2);
  } else {
    finalRoll = roll1;
  }

  const total = finalRoll + (options.modifier || 0);
  
  return {
    rolls: options.advantage || options.disadvantage ? [roll1, roll2] : [roll1],
    total,
    modifier: options.modifier || 0,
    type: "d20",
    isNatural20: finalRoll === 20,
    isNatural1: finalRoll === 1
  };
};

const getDiceValue = (diceType: DiceType): number => {
  const values: Record<DiceType, number> = {
    'd4': 4,
    'd6': 6,
    'd8': 8,
    'd10': 10,
    'd12': 12,
    'd20': 20,
    'd100': 100
  };
  return values[diceType];
};

export const rollDice = (dice: DiceRoll): RollResult => {
  if (typeof dice.type === 'string' && dice.type.startsWith('d')) {
    const diceType = dice.type as DiceType;
    const roll = Math.floor(Math.random() * getDiceValue(diceType)) + 1;
    return {
      rolls: [roll],
      total: roll + (dice.modifier || 0),
      type: dice.type,
      modifier: dice.modifier
    };
  }
  
  // For non-dice roll types, default to d20
  return rollD20({
    advantage: dice.advantage,
    disadvantage: dice.disadvantage,
    modifier: dice.modifier
  });
};

export const rollAbilityCheck = (
  abilityModifier: number,
  proficiencyBonus: number = 0,
  options: { advantage?: boolean; disadvantage?: boolean } = {}
): RollResult => {
  return rollD20({
    ...options,
    modifier: abilityModifier + proficiencyBonus
  });
};

export const rollSavingThrow = (
  savingThrowModifier: number,
  options: { advantage?: boolean; disadvantage?: boolean } = {}
): RollResult => {
  return rollD20({
    ...options,
    modifier: savingThrowModifier
  });
};

export const rollAttack = (
  attackModifier: number,
  options: { advantage?: boolean; disadvantage?: boolean } = {}
): RollResult => {
  return rollD20({
    ...options,
    modifier: attackModifier
  });
};

export const rollDamage = (
  diceCount: number,
  diceType: DiceType,
  modifier: number = 0,
  isCritical: boolean = false
): RollResult => {
  const rolls: number[] = [];
  const numDice = isCritical ? diceCount * 2 : diceCount;
  
  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * getDiceValue(diceType)) + 1);
  }

  return {
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0) + modifier,
    modifier,
    type: diceType,
    isCritical
  };
};

export const rollInitiative = (
  dexterityModifier: number,
  options: { advantage?: boolean; disadvantage?: boolean } = {}
): RollResult => {
  return rollD20({
    ...options,
    modifier: dexterityModifier
  });
};

export const getPassiveScore = (
  abilityModifier: number,
  proficiencyBonus: number = 0
): number => {
  return 10 + abilityModifier + proficiencyBonus;
};