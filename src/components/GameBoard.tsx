import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
import { Card } from "./ui/card";

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
          <h1 className="text-3xl font-bold text-fantasy-primary mb-6">Adventure</h1>
          
          {state.currentScene && (
            <Card className="p-4 bg-black/70 backdrop-blur-sm mb-6">
              <h3 className="text-xl font-bold text-amber-400 mb-2">{state.currentScene.name}</h3>
              <p className="text-amber-200">{state.currentScene.description}</p>
            </Card>
          )}

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