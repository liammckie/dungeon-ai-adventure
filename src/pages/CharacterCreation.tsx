import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationForm } from "@/components/CharacterCreationForm";
import { useGame } from "@/context/GameContext";

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  React.useEffect(() => {
    if (state.characters.length > 0) {
      navigate("/game");
    }
  }, [state.characters, navigate]);

  const handleCharacterCreated = () => {
    navigate("/game");
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed p-6 relative"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=2071&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Create Your Hero
          </h1>
          <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;