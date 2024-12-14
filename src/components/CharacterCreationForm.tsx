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

export const CharacterCreationForm = ({ onCharacterCreated }: { onCharacterCreated: () => void }) => {
  const { dispatch } = useGame();
  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: "",
      race: "Human",
      class: "Warrior",
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
    },
  });

  const handleRandomize = () => {
    const stats = rollStats();
    Object.entries(stats).forEach(([stat, value]) => {
      form.setValue(`stats.${stat as keyof CharacterStats}`, value);
    });
  };

  const onSubmit = (data: CharacterFormData) => {
    const startingItems = getStartingItems(data.class);
    const newCharacter: Character = {
      id: "player1",
      name: data.name,
      race: data.race,
      class: data.class,
      stats: {
        strength: data.stats.strength,
        dexterity: data.stats.dexterity,
        constitution: data.stats.constitution,
        intelligence: data.stats.intelligence,
        wisdom: data.stats.wisdom,
        charisma: data.stats.charisma,
      },
      hp: data.class === "Warrior" ? 12 : 8,
      maxHp: data.class === "Warrior" ? 12 : 8,
      level: 1,
      xp: 0,
      inventory: startingItems,
      isAI: false,
    };

    dispatch({ type: "CREATE_CHARACTER", character: newCharacter });
    onCharacterCreated();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-parchment p-6 rounded-lg border-2 border-fantasy-accent">
        <CharacterBasicInfo form={form} />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-fantasy-primary">Ability Scores</h3>
            <Button
              type="button"
              onClick={handleRandomize}
              className="bg-fantasy-secondary hover:bg-fantasy-secondary/90"
            >
              <Dice6 className="mr-2 h-4 w-4" />
              Roll Stats
            </Button>
          </div>
          <CharacterStats form={form} />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="bg-fantasy-primary hover:bg-fantasy-primary/90">
            Create Character
          </Button>
        </div>
      </form>
    </Form>
  );
};