import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dice6 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useGame } from "@/context/GameContext";
import { CharacterStats } from "./CharacterStats";
import { CharacterBasicInfo } from "./character-creation/CharacterBasicInfo";
import { characterSchema, type CharacterFormData } from "./character-creation/characterSchema";
import { getStartingItems, rollStats } from "./character-creation/characterUtils";
import { getDefaultStats, getHitDice } from "@/types/game";
import type { Character, CharacterStats as CharacterStatsType } from "@/types/game";

const initialStats: CharacterStatsType = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
} as const;

export const CharacterCreationForm = ({ onCharacterCreated }: { onCharacterCreated: () => void }) => {
  const { dispatch } = useGame();
  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "Human",
      class: "Fighter",
      stats: initialStats,
    },
  });

  const handleRandomize = () => {
    const stats = rollStats();
    Object.entries(stats).forEach(([key, value]) => {
      form.setValue(`stats.${key as keyof CharacterStatsType}`, value);
    });
  };

  const onSubmit = (data: CharacterFormData) => {
    const startingItems = getStartingItems(data.class);
    const hitDice = getHitDice(data.class);
    const newCharacter: Character = {
      id: "player1",
      name: data.name,
      race: data.race,
      class: data.class,
      stats: data.stats,
      hp: hitDice,
      maxHp: hitDice,
      level: 1,
      xp: 0,
      inventory: startingItems,
      isAI: false,
    };

    dispatch({ type: "CREATE_CHARACTER", character: newCharacter });
    onCharacterCreated();
  };

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "class" && value.class) {
        const defaultStats = getDefaultStats(value.class);
        Object.entries(defaultStats).forEach(([key, value]) => {
          form.setValue(`stats.${key as keyof CharacterStatsType}`, value);
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

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

        <div className="bg-black/30 p-6 rounded-lg border border-fantasy-frame-border animate-frame-glow">
          <CharacterBasicInfo form={form} />
        </div>

        <div className="bg-black/30 p-6 rounded-lg border border-fantasy-frame-border animate-frame-glow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">Ability Scores</h3>
            <Button
              type="button"
              onClick={handleRandomize}
              className="bg-fantasy-accent hover:bg-fantasy-accent/90 text-white"
            >
              <Dice6 className="mr-2 h-4 w-4" />
              Roll Stats
            </Button>
          </div>
          <CharacterStats form={form} />
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