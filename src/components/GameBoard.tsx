import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";

export const GameBoard = () => {
  const { state } = useGame();
  const playerCharacter = state.characters.find(char => !char.isAI);

  return (
    <div className="min-h-screen bg-parchment-texture bg-cover bg-center p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left side - Hero section */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold text-fantasy-primary">Your Hero</h2>
          {playerCharacter && (
            <CharacterCard character={playerCharacter} />
          )}
          <ActionMenu />
        </div>

        {/* Center - Game content */}
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-3xl font-bold text-fantasy-primary mb-6">Dungeon Adventure</h1>
          <div className="grid grid-cols-1 gap-4">
            {state.characters
              .filter(char => char.isAI)
              .map((character) => (
                <CharacterCard key={character.id} character={character} />
            ))}
          </div>
          <div className="mt-6">
            <CombatControls />
          </div>
        </div>

        {/* Right side - Inventory and Log */}
        <div className="lg:col-span-3 space-y-6">
          <Inventory />
          <GameLog />
        </div>
      </div>
    </div>
  );
};