import React from "react";
import { useGame } from "@/context/GameContext";
import { TavernScene } from "./TavernScene";
import { GamePhase } from "@/types/game";
import { useToast } from "@/hooks/use-toast";
import { FOREST_SCENES } from "@/data/stories/scenes/forestScenes";
import { PhaseButtons } from "./game-phases/PhaseButtons";
import { ForestScene } from "./game-phases/ForestScene";
import { generateEnemy } from "@/utils/enemyGenerator";
import { Button } from "@/components/ui/button";

export const GamePhaseManager = () => {
  const { state, dispatch } = useGame();
  const [showTavern, setShowTavern] = React.useState(true);
  const { toast } = useToast();
  const [currentForestSceneIndex, setCurrentForestSceneIndex] = React.useState(0);

  const handlePhaseChange = (phase: GamePhase) => {
    if (phase === state.currentPhase) return;

    dispatch({ type: "SET_PHASE", phase });
    
    switch (phase) {
      case "exploration":
        dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
        // Clear any existing enemies
        const updatedCharacters = state.characters.filter(char => !char.isAI);
        updatedCharacters.forEach(char => {
          dispatch({ type: "UPDATE_CHARACTER", character: char });
        });
        
        toast({
          title: "Exploration Phase",
          description: "You carefully explore the surrounding area...",
        });
        break;
      case "interaction":
        if (!showTavern) {
          dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
          // Clear any existing enemies here too
          const characters = state.characters.filter(char => !char.isAI);
          characters.forEach(char => {
            dispatch({ type: "UPDATE_CHARACTER", character: char });
          });
          
          toast({
            title: "Interaction Phase",
            description: "You look around for anyone to interact with...",
          });
        }
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

  const handleLeaveTavern = () => {
    // Clear any existing enemies when leaving tavern
    const updatedCharacters = state.characters.filter(char => !char.isAI);
    updatedCharacters.forEach(char => {
      dispatch({ type: "UPDATE_CHARACTER", character: char });
    });
    
    dispatch({ type: "SET_PHASE", phase: "exploration" });
    dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
    setShowTavern(false);
    setCurrentForestSceneIndex(0);
    
    toast({
      title: "Leaving Black Hollow",
      description: "You step out of the tavern and make your way towards the forest path.",
    });
  };

  const handleReturnToTavern = () => {
    // Clear any existing enemies when returning to tavern
    const updatedCharacters = state.characters.filter(char => !char.isAI);
    updatedCharacters.forEach(char => {
      dispatch({ type: "UPDATE_CHARACTER", character: char });
    });
    
    dispatch({ type: "SET_PHASE", phase: "interaction" });
    dispatch({ type: "GENERATE_SCENE", sceneType: "tavern" });
    setShowTavern(true);
    
    toast({
      title: "Returning to the Tavern",
      description: "You make your way back to the Broken Blade Tavern.",
    });
  };

  const handleProgressStory = () => {
    if (state.currentPhase === "exploration") {
      const nextIndex = (currentForestSceneIndex + 1) % FOREST_SCENES.length;
      setCurrentForestSceneIndex(nextIndex);
      
      dispatch({ 
        type: "ADD_LOG", 
        message: `Entering ${FOREST_SCENES[nextIndex].name}...` 
      });
      
      // Only generate enemy if in exploration phase and with 30% chance
      if (Math.random() < 0.3) {
        const newEnemy = generateEnemy();
        dispatch({ type: "CREATE_CHARACTER", character: newEnemy });
        
        toast({
          title: "Ambush!",
          description: "A hostile creature appears!",
        });
      } else {
        toast({
          title: "Story Progress",
          description: FOREST_SCENES[nextIndex].description,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-parchment-texture">
      <PhaseButtons 
        currentPhase={state.currentPhase} 
        onPhaseChange={handlePhaseChange} 
      />
      
      {showTavern ? (
        <div className="relative">
          <TavernScene />
          <div className="absolute bottom-4 right-4">
            <Button 
              onClick={handleLeaveTavern}
              className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
            >
              Leave Tavern
            </Button>
          </div>
        </div>
      ) : (
        <ForestScene 
          onProgressStory={handleProgressStory}
          onReturnToTavern={handleReturnToTavern}
        />
      )}
    </div>
  );
};