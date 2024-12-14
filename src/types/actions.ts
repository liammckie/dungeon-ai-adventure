import { Character, GamePhase, Scene, Quest, DiceRoll, RollResult } from "./game";
import { StoryEvent } from "./content";

export type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "UPDATE_CHARACTER"; character: Character }
  | { type: "CREATE_CHARACTER"; character: Character }
  | { type: "GAIN_XP"; characterId: string; amount: number }
  | { type: "SET_PHASE"; phase: GamePhase }
  | { type: "ROLL_DICE"; rollType: DiceRoll["type"]; options?: Partial<DiceRoll> }
  | { type: "GENERATE_SCENE"; sceneType: Scene["type"] }
  | { type: "SET_SCENE"; scene: Scene }
  | { type: "ADD_EVENT"; event: StoryEvent }
  | { type: "COMPLETE_EVENT"; eventId: string }
  | { type: "UPDATE_WORLD_STATE"; key: string; value: any }
  | { type: "ADD_LOG"; message: string }
  | { type: "PROGRESS_STORY" }
  | { type: "RETURN_TO_TAVERN" };