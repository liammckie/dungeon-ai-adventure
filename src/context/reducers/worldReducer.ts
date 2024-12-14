import { GameState } from "../gameState";
import { WorldState, WorldStateValue } from "@/types/worldState";

export const handleUpdateWorldState = (
  state: GameState,
  key: keyof WorldState,
  value: WorldStateValue
): GameState => {
  if (typeof value !== 'string' && 
      typeof value !== 'number' && 
      typeof value !== 'boolean' && 
      value !== null &&
      !Array.isArray(value) &&
      typeof value !== 'object') {
    console.error(`Invalid value type for world state key: ${key}`);
    return state;
  }

  return {
    ...state,
    worldState: {
      ...state.worldState,
      [key]: value
    }
  };
};