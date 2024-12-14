import React from "react";
import { useGame } from "@/context/GameContext";
import { GameBoard } from "./GameBoard";
import { TavernScene } from "./TavernScene";
import { Button } from "@/components/ui/button";
import { Sword, Map, MessageSquare, Heart } from "lucide-react";
import { GamePhase } from "@/types/game";
import { useToast } from "@/hooks/use-toast";

export const GamePhaseManager = () => {
  const { state, dispatch } = useGame();
  const [showTavern, setShowTavern] = React.useState(true);
  const { toast } = useToast();

  const handlePhaseChange = (phase: GamePhase) => {
    if (phase === state.currentPhase) return;

    dispatch({ type: "SET_PHASE", phase });
    
    switch (phase) {
      case "exploration":
        dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
        toast({
          title: "Exploration Phase",
          description: "You carefully explore the surrounding area...",
        });
        break;
      case "interaction":
        if (!showTavern) {
          dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
          toast({
            title: "Interaction Phase",
            description: "You look around for anyone to interact with...",
          });
        }
        break;
      case "combat":
        if (state.characters.some(char => char.isAI && char.currentHP > 0)) {
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
        // Heal characters by 25% of their max HP
        state.characters.forEach(char => {
          const healAmount = Math.floor(char.maxHP * 0.25);
          dispatch({
            type: "UPDATE_CHARACTER",
            character: {
              ...char,
              currentHP: Math.min(char.maxHP, char.currentHP + healAmount)
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
    dispatch({ type: "SET_PHASE", phase: "exploration" });
    dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
    setShowTavern(false);
    
    // Clear any existing combat enemies
    const updatedCharacters = state.characters.filter(char => !char.isAI);
    updatedCharacters.forEach(char => {
      dispatch({ type: "UPDATE_CHARACTER", character: char });
    });
    
    toast({
      title: "Leaving Black Hollow",
      description: "You step out of the tavern and make your way towards the forest path.",
    });
  };

  const handleReturnToTavern = () => {
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
      // Generate new enemies for the next encounter
      const newEnemy = {
        id: `enemy_${Date.now()}`,
        name: "Forest Bandit",
        level: 1,
        maxHP: 20,
        currentHP: 20,
        isAI: true,
        // ... add other necessary character properties
      };
      
      dispatch({ type: "CREATE_CHARACTER", character: newEnemy });
      
      toast({
        title: "Story Progress",
        description: "You encounter a group of bandits on the forest path!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-parchment-texture">
      <div className="fixed top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          className={`${state.currentPhase === 'exploration' ? 'bg-fantasy-primary text-white' : ''}`}
          onClick={() => handlePhaseChange('exploration')}
        >
          <Map className="w-4 h-4 mr-2" />
          Explore
        </Button>
        <Button
          variant="outline"
          className={`${state.currentPhase === 'interaction' ? 'bg-fantasy-primary text-white' : ''}`}
          onClick={() => handlePhaseChange('interaction')}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Interact
        </Button>
        <Button
          variant="outline"
          className={`${state.currentPhase === 'combat' ? 'bg-fantasy-primary text-white' : ''}`}
          onClick={() => handlePhaseChange('combat')}
        >
          <Sword className="w-4 h-4 mr-2" />
          Combat
        </Button>
        <Button
          variant="outline"
          className={`${state.currentPhase === 'rest' ? 'bg-fantasy-primary text-white' : ''}`}
          onClick={() => handlePhaseChange('rest')}
        >
          <Heart className="w-4 h-4 mr-2" />
          Rest
        </Button>
      </div>
      
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
        <div className="relative">
          <GameBoard />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              onClick={handleProgressStory}
              className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
            >
              Progress Story
            </Button>
            <Button 
              onClick={handleReturnToTavern}
              className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
            >
              Return to Tavern
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};