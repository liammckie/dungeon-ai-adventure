import { Character, GamePhase, RollType, DiceType } from "./game";
import { Scene, StoryEvent } from "./content";

export type CombatAction = 
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" };

export type CharacterAction = 
  | { type: "UPDATE_CHARACTER"; character: Character }
  | { type: "CREATE_CHARACTER"; character: Character }
  | { type: "GAIN_XP"; characterId: string; amount: number };

export type DiceAction = {
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

export type SceneAction = 
  | { type: "GENERATE_SCENE"; sceneType: Scene['type'] }
  | { type: "ADD_EVENT"; event: StoryEvent }
  | { type: "COMPLETE_EVENT"; eventId: string };

export type WorldAction = {
  type: "UPDATE_WORLD_STATE";
  key: keyof WorldState;
  value: WorldStateValue;
};

export type LogAction = {
  type: "ADD_LOG";
  message: string;
};

export type PhaseAction = {
  type: "SET_PHASE";
  phase: GamePhase;
};

export type GameAction =
  | CombatAction
  | CharacterAction
  | DiceAction
  | SceneAction
  | WorldAction
  | LogAction
  | PhaseAction;