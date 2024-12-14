import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CharacterCreationForm } from "@/components/CharacterCreationForm";
import { useGame } from "@/context/GameContext";

const CharacterCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGame();

  React.useEffect(() => {
    // Only allow access if coming from the start screen
    if (!location.state?.from || location.state.from !== 'startScreen') {
      navigate('/', { replace: true });
    }
  }, [navigate, location.state]);

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
        <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
      </div>
    </div>
  );
};

export default CharacterCreation;