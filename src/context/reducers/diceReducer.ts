import { GameState } from "../gameState";
import { DiceRoll, RollType, DiceType } from "@/types/game";
import { rollDice, rollWithAdvantage, rollWithDisadvantage } from "@/utils/diceRolls";

const getRollType = (rollType: RollType): DiceType => {
  switch (rollType) {
    case 'attack':
    case 'ability':
    case 'saving':
    case 'initiative':
      return 'd20';
    case 'damage':
      return 'd6';
    default:
      return rollType as DiceType;
  }
};

export const handleRollDice = (
  state: GameState,
  rollType: RollType,
  options?: {
    advantage?: boolean;
    disadvantage?: boolean;
    modifier?: number;
  }
): GameState => {
  const diceType = getRollType(rollType);
  
  const roll: DiceRoll = {
    type: diceType,
    count: 1,
    modifier: options?.modifier || 0,
    advantage: options?.advantage,
    disadvantage: options?.disadvantage,
  };

  let result;
  if (options?.advantage) {
    result = rollWithAdvantage(roll);
  } else if (options?.disadvantage) {
    result = rollWithDisadvantage(roll);
  } else {
    result = rollDice(roll);
  }

  return {
    ...state,
    lastRoll: {
      total: result.total,
      rolls: result.rolls,
      type: diceType,
    },
    gameLog: [
      ...state.gameLog,
      `Rolled ${rollType}: ${result.rolls.join(", ")} = ${result.total}`,
    ],
  };
};