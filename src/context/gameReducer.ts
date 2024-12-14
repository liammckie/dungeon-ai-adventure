import { GameState } from "./gameState";
import { Character, DiceRoll, GamePhase } from "@/types/game";
import { calculateLevelUp } from "./levelingUtils";
import { rollDice } from "./diceUtils";

export type GameAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT" }
  | { type: "NEXT_TURN" }
  | { type: "ADD_LOG"; message: string }
  | { type: "UPDATE_CHARACTER"; character: Character }
  | { type: "CREATE_CHARACTER"; character: Character }
  | { type: "GAIN_XP"; characterId: string; amount: number }
  | { type: "SET_PHASE"; phase: GamePhase }
  | { type: "ROLL_DICE"; roll: DiceRoll };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_COMBAT":
      return { ...state, combatActive: true };
    case "END_COMBAT":
      return { ...state, combatActive: false };
    case "NEXT_TURN":
      return { ...state, currentTurn: (state.currentTurn + 1) % state.characters.length };
    case "ADD_LOG":
      return { ...state, gameLog: [...state.gameLog, action.message] };
    case "UPDATE_CHARACTER":
      return {
        ...state,
        characters: state.characters.map((char) =>
          char.id === action.character.id ? action.character : char
        ),
      };
    case "CREATE_CHARACTER": {
      const aiCharacters: Character[] = [
        {
          id: "ai1",
          name: "Eldrin the Wise",
          class: "Wizard",
          race: "Elf",
          background: "Sage",
          stats: {
            strength: 8,
            dexterity: 14,
            constitution: 12,
            intelligence: 17,
            wisdom: 15,
            charisma: 14,
          },
          hp: 15,
          maxHp: 15,
          level: 1,
          xp: 0,
          inventory: [],
          traits: [],
          proficiencies: {
            armor: [],
            weapons: ["Dagger", "Dart", "Sling", "Quarterstaff", "Light Crossbow"],
            tools: [],
            skills: ["Arcana", "History"],
            languages: ["Common", "Elvish"],
            saves: ["intelligence", "wisdom"],
          },
          isAI: true,
        },
        {
          id: "ai2",
          name: "Thorgar Ironbeard",
          class: "Fighter",
          race: "Dwarf",
          background: "Soldier",
          stats: {
            strength: 17,
            dexterity: 12,
            constitution: 16,
            intelligence: 10,
            wisdom: 12,
            charisma: 11,
          },
          hp: 25,
          maxHp: 25,
          level: 1,
          xp: 0,
          inventory: [],
          traits: [],
          proficiencies: {
            armor: ["Light", "Medium", "Heavy", "Shields"],
            weapons: ["Simple", "Martial"],
            tools: [],
            skills: ["Athletics", "Intimidation"],
            languages: ["Common", "Dwarvish"],
            saves: ["strength", "constitution"],
          },
          isAI: true,
        },
      ];
      return {
        ...state,
        characters: [action.character, ...aiCharacters],
        gameLog: [...state.gameLog, `${action.character.name} joins the party!`],
      };
    }
    case "GAIN_XP":
      return {
        ...state,
        characters: state.characters.map((char) => {
          if (char.id === action.characterId) {
            const updatedChar = {
              ...char,
              xp: char.xp + action.amount,
            };
            const leveledChar = calculateLevelUp(updatedChar);
            if (leveledChar.level > char.level) {
              state.gameLog.push(`${char.name} has reached level ${leveledChar.level}!`);
            }
            return leveledChar;
          }
          return char;
        }),
      };
    case "SET_PHASE":
      return {
        ...state,
        currentPhase: action.phase,
        gameLog: [
          ...state.gameLog,
          `Entering ${action.phase} phase...`
        ]
      };
    case "ROLL_DICE": {
      const result = rollDice(action.roll);
      const modifier = action.roll.modifier ? ` + ${action.roll.modifier}` : '';
      const advantage = action.roll.advantage ? ' with advantage' : '';
      const disadvantage = action.roll.disadvantage ? ' with disadvantage' : '';
      
      return {
        ...state,
        lastRoll: {
          total: result,
          rolls: [result],
          type: action.roll.type
        },
        gameLog: [
          ...state.gameLog,
          `Rolling ${action.roll.type}${modifier}${advantage}${disadvantage}: ${result}`
        ]
      };
    }
    default:
      return state;
  }
};