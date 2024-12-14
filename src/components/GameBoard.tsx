import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
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

          {/* Inventory Section */}
          <Inventory />

          {/* Story Controls */}
          <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
            <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2 mb-4">
              <Map className="h-5 w-5" />
              Story Navigation
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => dispatch({ type: "PROGRESS_STORY" })}
                className="w-full bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white flex items-center justify-center gap-2"
              >
                <ScrollText className="h-4 w-4" />
                Progress Story
              </Button>
              <Button
                onClick={() => dispatch({ type: "RETURN_TO_TAVERN" })}
                className="w-full bg-gradient-to-br from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Tavern
              </Button>
            </div>
          </div>

          {/* Game Log */}
          <div className="bg-character-frame bg-cover bg-center p-4 rounded-lg border-2 border-fantasy-frame-border">
            <GameLog />
          </div>
        </div>

        {/* Center Column - Main Game Area */}
        <div className="col-span-6 space-y-4">
          {/* Story Scene */}
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border min-h-[800px] relative overflow-hidden">
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg h-full flex flex-col">
              <div className="prose prose-invert prose-lg max-w-none space-y-6">
                {state.currentScene && (
                  <>
                    <h2 className="text-3xl font-bold text-amber-400 mb-6 font-serif tracking-wide">
                      {state.currentScene.name}
                    </h2>
                    
                    {/* Scene Image Container */}
                    <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden border-2 border-fantasy-frame-border">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src={state.currentScene.imageUrl || "/placeholder.svg"}
                        alt={state.currentScene.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Story Text Section */}
                    <div className="bg-black/40 p-6 rounded-lg border border-fantasy-frame-border">
                      <p className="text-xl leading-relaxed text-amber-200 font-serif">
                        {state.currentScene.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {state.combatActive && <CombatControls />}
        </div>

        {/* Right Column - Enemies/NPCs */}
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
        </div>
      </div>
    </div>
  );
};