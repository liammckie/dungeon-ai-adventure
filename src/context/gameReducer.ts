import { GameState } from "./gameState";
import { Character, GamePhase, RollType, DiceType } from "@/types/game";
import { Scene, StoryEvent } from "@/types/content";
import { 
  handleStartCombat,
  handleEndCombat,
  handleNextTurn
} from "./reducers/combatReducer";
import {
  handleUpdateCharacter,
  handleCreateCharacter,
  handleGainXP
} from "./reducers/characterReducer";
import { handleRollDice } from "./reducers/diceReducer";
import {
  handleGenerateScene,
  handleAddEvent,
  handleCompleteEvent
} from "./reducers/sceneReducer";

export type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "ADD_LOG"; message: string }
  | { type: "UPDATE_CHARACTER"; character: Character }
  | { type: "CREATE_CHARACTER"; character: Character }
  | { type: "GAIN_XP"; characterId: string; amount: number }
  | { type: "SET_PHASE"; phase: GamePhase }
  | { type: "GENERATE_SCENE"; sceneType: Scene['type'] }
  | { type: "ADD_EVENT"; event: StoryEvent }
  | { type: "COMPLETE_EVENT"; eventId: string }
  | { type: "UPDATE_WORLD_STATE"; key: string; value: any }
  | { 
      type: "ROLL_DICE"; 
      rollType: RollType;
      options: {
        abilityModifier?: number;
        proficiencyBonus?: number;
        advantage?: boolean;
        disadvantage?: boolean;
        diceCount?: number;
        diceType?: DiceType;
        isCritical?: boolean;
      };
    };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_COMBAT":
      return handleStartCombat(state);
    case "END_COMBAT":
      return handleEndCombat(state);
    case "NEXT_TURN":
      return handleNextTurn(state);
    case "ADD_LOG":
      return {
        ...state,
        gameLog: [...state.gameLog, action.message]
      };
    case "UPDATE_CHARACTER":
      return handleUpdateCharacter(state, action.character);
    case "CREATE_CHARACTER":
      return handleCreateCharacter(state, action.character);
    case "GAIN_XP":
      return handleGainXP(state, action.characterId, action.amount);
    case "SET_PHASE":
      return {
        ...state,
        currentPhase: action.phase,
        gameLog: [
          ...state.gameLog,
          `Entering ${action.phase} phase...`
        ]
      };
    case "ROLL_DICE":
      return handleRollDice(state, action.rollType, action.options);
    case "GENERATE_SCENE":
      return handleGenerateScene(state, action.sceneType);
    case "ADD_EVENT":
      return handleAddEvent(state, action.event);
    case "COMPLETE_EVENT":
      return handleCompleteEvent(state, action.eventId);
    case "UPDATE_WORLD_STATE":
      return {
        ...state,
        worldState: {
          ...state.worldState,
          [action.key]: action.value
        }
      };
    default:
      return state;
  }
};