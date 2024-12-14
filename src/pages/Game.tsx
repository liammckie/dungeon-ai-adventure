import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { GameBoard } from "@/components/GameBoard";
import { TavernScene } from "@/components/TavernScene";
import { Button } from "@/components/ui/button";

const Game = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const [showTavern, setShowTavern] = React.useState(true);

  React.useEffect(() => {
    if (state.characters.length === 0) {
      navigate("/", { replace: true });
    }
  }, [state.characters, navigate]);

  if (state.characters.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-parchment-texture">
      {showTavern ? (
        <div className="relative">
          <TavernScene />
          <div className="absolute bottom-4 right-4">
            <Button 
              onClick={() => setShowTavern(false)}
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
              onClick={() => setShowTavern(true)}
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

export default Game;