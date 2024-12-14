import React from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "@/context/GameContext";
import { GameBoard } from "@/components/GameBoard";
import { TavernScene } from "@/components/TavernScene";

const Game = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  React.useEffect(() => {
    if (state.characters.length === 0) {
      navigate("/", { replace: true });
    }
  }, [state.characters, navigate]);

  if (state.characters.length === 0) {
    return null;
  }

  return (
    <div>
      <TavernScene />
      <GameBoard />
    </div>
  );
};

export default Game;