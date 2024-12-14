import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "@/context/GameContext";
import Game from "@/pages/Game";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <GameProvider>
        <Game />
        <Toaster />
      </GameProvider>
    </BrowserRouter>
  );
};

export default App;