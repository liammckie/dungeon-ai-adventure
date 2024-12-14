import React from "react";
import { useNavigate } from "react-router-dom";
import { GameBoard } from "@/components/GameBoard";
import { useGame } from "@/context/GameContext";

const Game = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (state.characters.length === 0) {
      navigate("/");
    }
  }, [state.characters, navigate]);

  if (state.characters.length === 0) {
    return null;
  }

  return <GameBoard />;
};

export default Game;