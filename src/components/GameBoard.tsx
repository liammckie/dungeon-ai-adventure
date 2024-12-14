import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
import { SceneDisplay } from "./SceneDisplay";
import { Sword, Map, Users, ScrollText, Home } from "lucide-react";
import { Button } from "./ui/button";

export const GameBoard = () => {
  const { state, dispatch } = useGame();
  const playerCharacter = state.characters.find(char => !char.isAI);
  const enemies = state.characters.filter(char => char.isAI);

  return (
    <div className="min-h-screen bg-[#1a1e2e] p-4">
      <div className="max-w-[1800px] mx-auto grid grid-cols-12 gap-4">
        {/* Left Column - Character & Actions */}
        <div className="col-span-3 space-y-4">
          {/* Character Frame */}
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border animate-frame-glow sticky top-4">
            {playerCharacter && (
              <CharacterCard character={playerCharacter} />
            )}
          </div>

          {/* Actions Menu */}
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
          {/* Scene Display */}
          <SceneDisplay />

          {state.combatActive && <CombatControls />}
        </div>

        {/* Right Column - Enemies/NPCs & Game Log */}
        <div className="col-span-3 space-y-4">
          {enemies.length > 0 && (
            <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {state.combatActive ? "Enemies" : "Characters Present"}
                </h3>
                {!state.combatActive && enemies.some(enemy => enemy.isHostile) && (
                  <Button
                    onClick={() => dispatch({ type: "START_COMBAT" })}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Sword className="h-4 w-4" />
                    Initiate Combat
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {enemies.map((enemy) => (
                  <CharacterCard key={enemy.id} character={enemy} />
                ))}
              </div>
            </div>
          )}

          {/* Game Log */}
          <div className="bg-character-frame bg-cover bg-center p-4 rounded-lg border-2 border-fantasy-frame-border">
            <GameLog />
          </div>
        </div>
      </div>
    </div>
  );
};