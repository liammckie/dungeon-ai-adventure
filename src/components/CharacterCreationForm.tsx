import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { CharacterBasicInfo } from "./character-creation/CharacterBasicInfo";
import { RaceSelection } from "./character-creation/RaceSelection";
import { AbilityScoreGeneration } from "./character-creation/AbilityScoreGeneration";
import { characterSchema, type CharacterFormData } from "./character-creation/characterSchema";
import { getStartingItems } from "./character-creation/characterUtils";
import { getDefaultStats, getHitDice, type Character } from "@/types/game";

export const CharacterCreationForm = ({ onCharacterCreated }: { onCharacterCreated: () => void }) => {
  const { dispatch } = useGame();
  
  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "Human",
      class: "Fighter",
      background: "Soldier",
      stats: getDefaultStats(),
      skills: [],
    },
  });

  const onSubmit = (data: CharacterFormData) => {
    const startingItems = getStartingItems(data.class);
    const hitDice = getHitDice(data.class);
    const newCharacter: Character = {
      id: "player1",
      name: data.name,
      race: data.race,
      subrace: data.subrace,
      class: data.class,
      stats: data.stats,
      hp: hitDice,
      maxHp: hitDice,
      level: 1,
      xp: 0,
      inventory: startingItems,
      traits: [],
      proficiencies: {
        armor: [],
        weapons: [],
        tools: [],
        skills: data.skills,
        languages: ["Common"],
        saves: [],
      },
      isAI: false,
    };

    dispatch({ type: "CREATE_CHARACTER", character: newCharacter });
    onCharacterCreated();
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 max-w-4xl mx-auto bg-black/40 p-8 rounded-lg backdrop-blur-sm border-2 border-fantasy-frame-border shadow-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Create Your Legend</h2>
          <p className="text-gray-300">Choose wisely, brave adventurer</p>
        </div>

        <div className="space-y-8">
          <div className="bg-black/30 p-6 rounded-lg border border-fantasy-frame-border animate-frame-glow">
            <CharacterBasicInfo form={form} />
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-fantasy-frame-border animate-frame-glow">
            <h3 className="text-2xl font-bold text-white mb-4">Race & Heritage</h3>
            <RaceSelection form={form} />
          </div>

          <div className="bg-black/30 p-6 rounded-lg border border-fantasy-frame-border animate-frame-glow">
            <h3 className="text-2xl font-bold text-white mb-4">Ability Scores</h3>
            <AbilityScoreGeneration form={form} />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="submit" 
            className="bg-fantasy-primary hover:bg-fantasy-primary/90 text-white px-8 py-3 text-lg"
          >
            Begin Your Journey
          </Button>
        </div>
      </form>
    </Form>
  );
};