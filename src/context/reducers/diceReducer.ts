import { GameState } from "../gameState";
import { RollType, DiceType } from "@/types/game";
import { rollDice } from "@/utils/diceRolls";

interface RollOptions {
  advantage?: boolean;
  disadvantage?: boolean;
  diceCount?: number;
  modifier?: number;
}

export const handleRollDice = (
  state: GameState,
  rollType: RollType,
  options: RollOptions = {}
): GameState => {
  const {
    advantage = false,
    disadvantage = false,
    diceCount = 1,
    modifier = 0
  } = options;

  let result;
  const diceType = rollType as DiceType;

  if (diceType) {
    result = rollDice(diceType, diceCount, modifier);
  } else {
    // Handle special roll types
    switch (rollType) {
      case 'attack':
      case 'ability':
      case 'saving':
      case 'initiative':
        result = rollDice('d20', 1, modifier);
        break;
      case 'damage':
        result = rollDice('d6', diceCount, modifier); // Default damage die
        break;
      default:
        result = rollDice('d20', 1, modifier);
    }
  }

  return {
    ...state,
    lastRoll: {
      total: result.total,
      rolls: result.rolls,
      type: result.type
    }
  };
};