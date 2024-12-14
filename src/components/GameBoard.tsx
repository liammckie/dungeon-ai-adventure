import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
import { Sword, Map, Users, ScrollText } from "lucide-react";

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
          <div className="bg-character-frame bg-cover bg-center p-6 rounded-lg border-2 border-fantasy-frame-border min-h-[600px] relative overflow-hidden">
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg h-full flex flex-col">
              <div className="prose prose-invert prose-lg max-w-none space-y-6 animate-fade-in">
                {state.currentScene && (
                  <>
                    <h2 className="text-3xl font-bold text-amber-400 mb-6 font-serif tracking-wide">
                      {state.currentScene.name}
                    </h2>
                    
                    {/* Scene Image Container */}
                    <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden border-2 border-fantasy-frame-border">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img 
                        src="/placeholder.svg" 
                        alt={state.currentScene.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <p className="text-xl leading-relaxed text-amber-200 font-serif">
                      {state.currentScene.description}
                    </p>
                    <div className="mt-8 space-y-4">
                      {state.gameLog.slice(-3).map((log, index) => (
                        <p 
                          key={index} 
                          className="text-lg text-amber-100/90 italic leading-relaxed transition-opacity duration-500"
                          style={{ 
                            opacity: 1 - (index * 0.3),
                            transform: `translateY(${index * -10}px)`
                          }}
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
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