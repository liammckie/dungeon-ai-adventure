import React from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCreationForm } from "@/components/CharacterCreationForm";
import { Button } from "@/components/ui/button";

const CharacterCreation = () => {
  const navigate = useNavigate();

  const handleCharacterCreated = () => {
    navigate("/");
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