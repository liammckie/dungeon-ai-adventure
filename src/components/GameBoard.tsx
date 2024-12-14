import React from "react";
import { useGame } from "@/context/GameContext";
import { CharacterCard } from "./CharacterCard";
import { GameLog } from "./GameLog";
import { CombatControls } from "./CombatControls";
import { Inventory } from "./Inventory";
import { ActionMenu } from "./ActionMenu";
import { SceneDisplay } from "./SceneDisplay";
import { Sword, Map, Users, ScrollText } from "lucide-react";

export const GameBoard = () => {
  const { state } = useGame();
  const playerCharacter = state.characters.find(char => !char.isAI);
  const npcsPresent = state.currentScene?.availableNPCs || [];

  const createNPCCharacter = (npc: any): Character => ({
    id: npc.id,
    name: npc.name,
    race: "Human",
    class: "NPC",
    background: "Commoner",
    level: 1,
    xp: 0,
    hp: 10,
    maxHp: 10,
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    inventory: [],
    traits: [],
    proficiencies: {
      armor: [],
      weapons: [],
      tools: [],
      skills: [],
      languages: ["Common"],
      saves: []
    },
    isAI: true,
    isHostile: false,
    description: npc.description,
    imageUrl: npc.imageUrl
  });

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

        {/* Right Column - NPCs & Game Log */}
        <div className="col-span-3 space-y-4">
          {npcsPresent.length > 0 && (
            <div className="bg-parchment-texture bg-cover rounded-lg border-2 border-fantasy-frame-border p-4">
              <h3 className="text-lg font-bold text-fantasy-primary flex items-center gap-2 mb-4">
                <Users className="h-5 w-5" />
                Characters Present
              </h3>
              <div className="space-y-4">
                {npcsPresent.map((npc) => (
                  <CharacterCard 
                    key={npc.id} 
                    character={{
                      ...npc,
                      level: 1,
                      hp: 10,
                      maxHp: 10,
                      class: "NPC",
                      isAI: true,
                      isHostile: false,
                      stats: {
                        strength: 10,
                        dexterity: 10,
                        constitution: 10,
                        intelligence: 10,
                        wisdom: 10,
                        charisma: 10
                      }
                    }} 
                  />
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
