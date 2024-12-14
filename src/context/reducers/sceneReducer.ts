import { GameState } from "../gameState";
import { Scene, StoryEvent } from "@/types/content";
import { generateScene } from "@/utils/contentGeneration";

export const handleGenerateScene = (
  state: GameState,
  sceneType: Scene['type']
): GameState => {
  const playerCharacter = state.characters.find(char => !char.isAI);
  if (!playerCharacter) return state;
  
  const newScene = generateScene(
    sceneType,
    playerCharacter.level,
    state.worldState
  );
  
  return {
    ...state,
    currentScene: newScene,
    gameLog: [
      ...state.gameLog,
      `Entering ${newScene.name}...`,
      newScene.description
    ]
  };
};

export const handleAddEvent = (state: GameState, event: StoryEvent): GameState => {
  return {
    ...state,
    activeEvents: [...state.activeEvents, event],
    gameLog: [
      ...state.gameLog,
      `New event: ${event.title}`
    ]
  };
};

export const handleCompleteEvent = (state: GameState, eventId: string): GameState => {
  return {
    ...state,
    activeEvents: state.activeEvents.filter(event => event.id !== eventId),
    gameLog: [
      ...state.gameLog,
      `Event completed!`
    ]
  };
};