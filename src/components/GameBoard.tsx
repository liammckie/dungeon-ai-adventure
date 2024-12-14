import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";

export const GameBoard = () => {
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-parchment-texture bg-cover bg-center p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-fantasy-primary mb-6">Dungeon Adventure</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <div className="mt-6">
            <CombatControls />
          </div>
        </div>
        <div className="lg:col-span-1">
          <GameLog />
        </div>
      </div>
    </div>
  );
};