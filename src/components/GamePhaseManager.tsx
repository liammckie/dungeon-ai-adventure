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
    dispatch({ type: "SET_PHASE", phase });
  };

  const handleLeaveTavern = () => {
    dispatch({ type: "SET_PHASE", phase: "exploration" });
    dispatch({ type: "GENERATE_SCENE", sceneType: "forest" });
    setShowTavern(false);
    
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
          <div className="absolute bottom-4 right-4">
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