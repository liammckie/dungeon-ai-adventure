import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationForm } from "@/components/CharacterCreationForm";
import { useGame } from "@/context/GameContext";

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { state } = useGame();

  React.useEffect(() => {
    // If character already exists, redirect to game
    if (state.characters.length > 0) {
      navigate("/game");
    }
  }, [state.characters, navigate]);

  const handleCharacterCreated = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-parchment-texture bg-cover bg-center p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-fantasy-primary mb-8 text-center">Create Your Hero</h1>
        <CharacterCreationForm onCharacterCreated={handleCharacterCreated} />
      </div>
    </div>
  );
};

export default CharacterCreation;