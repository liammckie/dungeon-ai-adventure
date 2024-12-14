import React from "react";
import { GameProvider } from "@/context/GameContext";
import { GameBoard } from "@/components/GameBoard";

const Index = () => {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
};

export default Index;