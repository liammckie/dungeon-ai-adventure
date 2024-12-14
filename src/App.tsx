import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { GameProvider } from "@/context/GameContext";
import Game from "@/pages/Game";
import Index from "@/pages/Index";
import CharacterCreation from "@/pages/CharacterCreation";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game" element={<Game />} />
          <Route path="/character-creation" element={<CharacterCreation />} />
        </Routes>
        <Toaster />
      </Router>
    </GameProvider>
  );
};

export default App;