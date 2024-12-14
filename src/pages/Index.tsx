import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGame } from "@/context/GameContext";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useGame();

  const handleStartGame = () => {
    navigate("/create-character", { 
      state: { from: 'startScreen' } 
    });
  };

  const handleLoadGame = () => {
    if (state.characters.length > 0) {
      navigate("/game");
    } else {
      toast({
        title: "No saved game found",
        description: "Please start a new game instead.",
        variant: "destructive",
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center p-6"
      style={{ 
        backgroundImage: "url('/lovable-uploads/dc838ce3-0194-4835-bc02-1fa34cb0eabd.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            Dungeon Adventure
          </h1>
          <p className="text-xl text-gray-300">
            Begin your epic journey
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleStartGame}
            className="w-full bg-fantasy-primary hover:bg-fantasy-primary/90 text-white py-6 text-xl"
          >
            Start New Game
          </Button>
          <Button 
            onClick={handleLoadGame}
            className="w-full bg-fantasy-secondary hover:bg-fantasy-secondary/90 text-white py-6 text-xl"
          >
            Load Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;