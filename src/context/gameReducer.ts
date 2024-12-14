import { GameState } from "./gameState";
import { GameAction } from "@/types/actions";
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
import { handleUpdateWorldState } from "./reducers/worldReducer";
import { handleAddLog } from "./reducers/logReducer";
import { handleSetPhase } from "./reducers/phaseReducer";

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_COMBAT":
      return handleStartCombat(state);
    case "END_COMBAT":
      return handleEndCombat(state);
    case "NEXT_TURN":
      return handleNextTurn(state);
    case "ADD_LOG":
      return handleAddLog(state, action.message);
    case "UPDATE_CHARACTER":
      return handleUpdateCharacter(state, action.character);
    case "CREATE_CHARACTER":
      return handleCreateCharacter(state, action.character);
    case "GAIN_XP":
      return handleGainXP(state, action.characterId, action.amount);
    case "SET_PHASE":
      return handleSetPhase(state, action.phase);
    case "SET_SCENE":
      return {
        ...state,
        currentScene: action.scene,
        gameLog: [
          ...state.gameLog,
          `Entering ${action.scene.name}...`
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
      return handleUpdateWorldState(state, action.key, action.value);
    case "PROGRESS_STORY":
      return {
        ...state,
        gameLog: [...state.gameLog, "The story progresses..."]
      };
    case "RETURN_TO_TAVERN":
      return {
        ...state,
        showTavern: true,
        gameLog: [...state.gameLog, "Returning to the tavern..."]
      };
    default:
      return state;
  }
};