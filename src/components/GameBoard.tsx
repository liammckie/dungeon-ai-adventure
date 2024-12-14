import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
import { Sword, Map, Users } from "lucide-react";

export const GameBoard = () => {
  const { state } = useGame();
  const playerCharacter = state.characters.find(char => !char.isAI);
  const enemies = state.characters.filter(char => char.isAI);

  return (
    <div className="min-h-screen bg-[#1a1e2e] p-4">
      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-4">
        {/* Left Column - Character & Actions */}
        <div className="col-span-3 space-y-4">
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border animate-frame-glow">
            {playerCharacter && (
              <CharacterCard character={playerCharacter} />
            )}
          </div>
          <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
            <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2 mb-4">
              <Sword className="h-5 w-5" />
              Actions
            </h3>
            <ActionMenu />
          </div>
          <Inventory />
        </div>

        {/* Center Column - Main Game Area */}
        <div className="col-span-6 space-y-4">
          {/* Story Scene */}
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border min-h-[300px]">
            <div className="bg-black/70 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2 mb-4">
                <Map className="h-6 w-6" />
                Current Scene
              </h2>
              {state.currentScene && (
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl text-amber-400 mb-2">{state.currentScene.name}</h3>
                  <p className="text-amber-200 text-lg leading-relaxed">{state.currentScene.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Combat Grid */}
          {state.combatActive && (
            <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
              <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2 mb-4">
                <Sword className="h-5 w-5" />
                Combat Area
              </h3>
              <div className="grid grid-cols-8 gap-1 bg-gray-800/50 p-2 rounded-lg min-h-[300px]">
                {/* Combat grid cells would be rendered here */}
                {enemies.map((enemy, index) => (
                  <div key={enemy.id} className="col-span-2">
                    <CharacterCard character={enemy} />
                  </div>
                ))}
              </div>
              <CombatControls />
            </div>
          )}

          {/* Enemy Display (when not in combat) */}
          {!state.combatActive && enemies.length > 0 && (
            <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
              <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2 mb-4">
                <Users className="h-5 w-5" />
                Enemies Present
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {enemies.map((enemy) => (
                  <CharacterCard key={enemy.id} character={enemy} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Game Log */}
        <div className="col-span-3">
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border h-full">
            <GameLog />
          </div>
        </div>
      </div>
    </div>
  );
};