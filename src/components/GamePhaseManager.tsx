import React from "react";
import { useGame } from "@/context/GameContext";
import { GamePhase } from "@/types/game";
import { useToast } from "@/hooks/use-toast";
import { FOREST_SCENES } from "@/data/stories/scenes/forestScenes";
import { PhaseButtons } from "./game-phases/PhaseButtons";
import { GameBoard } from "./GameBoard";
import { generateEnemy } from "@/utils/enemyGenerator";

export const GamePhaseManager = () => {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const [currentSceneIndex, setCurrentSceneIndex] = React.useState(0);

  React.useEffect(() => {
    // Initialize with tavern scene
    dispatch({ 
      type: "SET_SCENE", 
      scene: FOREST_SCENES[0] // Tavern scene is first in array
    });
  }, []);

  const clearEnemies = () => {
    const playerCharacters = state.characters.filter(char => !char.isAI);
    playerCharacters.forEach(char => {
      dispatch({ type: "UPDATE_CHARACTER", character: char });
    });
    if (state.combatActive) {
      dispatch({ type: "END_COMBAT" });
    }
  };

  const handlePhaseChange = (phase: GamePhase) => {
    if (phase === state.currentPhase) return;

    clearEnemies();
    dispatch({ type: "SET_PHASE", phase });
    
    switch (phase) {
      case "exploration":
        const explorationScene = FOREST_SCENES[currentSceneIndex];
        dispatch({ 
          type: "SET_SCENE", 
          scene: explorationScene 
        });
        toast({
          title: "Exploration Phase",
          description: "You carefully explore the surrounding area...",
        });
        break;
      case "interaction":
        const interactionScene = FOREST_SCENES[0]; // Tavern scene
        dispatch({ 
          type: "SET_SCENE", 
          scene: interactionScene 
        });
        toast({
          title: "Interaction Phase",
          description: "You look around for anyone to interact with...",
        });
        break;
      case "combat":
        if (state.characters.some(char => char.isAI && char.hp > 0)) {
          dispatch({ type: "START_COMBAT" });
          toast({
            title: "Combat Phase",
            description: "You ready your weapons as combat begins!",
          });
        } else {
          toast({
            title: "No Enemies",
            description: "There are no enemies to fight here.",
          });
        }
        break;
      case "rest":
        dispatch({ 
          type: "ADD_LOG", 
          message: "The party takes a short rest to recover..." 
        });
        state.characters.forEach(char => {
          const healAmount = Math.floor(char.maxHp * 0.25);
          dispatch({
            type: "UPDATE_CHARACTER",
            character: {
              ...char,
              hp: Math.min(char.maxHp, char.hp + healAmount)
            }
          });
        });
        toast({
          title: "Rest Phase",
          description: "Your party takes a moment to rest and recover.",
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-parchment-texture">
      <PhaseButtons 
        currentPhase={state.currentPhase} 
        onPhaseChange={handlePhaseChange} 
      />
      <GameBoard />
    </div>
  );
};