import React from "react";
import { Button } from "@/components/ui/button";
import { GameBoard } from "../GameBoard";

interface ForestSceneProps {
  onProgressStory: () => void;
  onReturnToTavern: () => void;
}

export const ForestScene = ({ onProgressStory, onReturnToTavern }: ForestSceneProps) => {
  return (
    <div className="relative">
      <GameBoard />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button 
          onClick={onProgressStory}
          className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
        >
          Progress Story
        </Button>
        <Button 
          onClick={onReturnToTavern}
          className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
        >
          Return to Tavern
        </Button>
      </div>
    </div>
  );
};