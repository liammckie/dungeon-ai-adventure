import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationForm } from "@/components/CharacterCreationForm";
import { useGame } from "@/context/GameContext";

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  React.useEffect(() => {
    // Only redirect to game if we have characters AND we came from the start screen
    if (state.characters.length > 0 && document.referrer.includes('/')) {
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
        backgroundImage: "url('/lovable-uploads/dc838ce3-0194-4835-bc02-1fa34cb0eabd.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Create Your Hero
          </h1>
          <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;