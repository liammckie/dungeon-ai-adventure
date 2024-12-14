import React from "react";
import { GameBoard } from "@/components/GameBoard";
import { useGame } from "@/context/GameContext";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to character creation if no character exists
    if (state.characters.length === 0) {
      navigate("/create-character");
    }
  }, [state.characters, navigate]);

  if (state.characters.length === 0) {
    return null;
  }

  return <GameBoard />;
};

export default Game;