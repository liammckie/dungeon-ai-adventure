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
  const enemies = state.characters.filter(char => char.isAI);

  return (
    <div className="min-h-screen bg-parchment-texture bg-cover bg-center p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left side - Hero section */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-2xl font-bold text-fantasy-primary">Your Hero</h2>
          {playerCharacter && (
            <CharacterCard character={playerCharacter} />
          )}
          <ActionMenu />
          <Inventory />
        </div>

        {/* Center - Game content and story */}
        <div className="lg:col-span-6 space-y-6">
          <Card className="p-6 bg-black/70 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-amber-400 mb-4">Adventure</h1>
            {state.currentScene && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-bold text-amber-400 mb-2">{state.currentScene.name}</h3>
                <p className="text-amber-200 text-lg leading-relaxed">{state.currentScene.description}</p>
              </div>
            )}
          </Card>

          {/* Enemy section - Only shown when enemies are present */}
          {enemies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-fantasy-primary">Enemies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enemies.map((enemy) => (
                  <CharacterCard key={enemy.id} character={enemy} />
                ))}
              </div>
            </div>
          )}

          {state.combatActive && <CombatControls />}
        </div>

        {/* Right side - Game Log */}
        <div className="lg:col-span-3">
          <GameLog />
        </div>
      </div>
    </div>
  );
};