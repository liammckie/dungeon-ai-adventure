import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dice6 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGame } from "@/context/GameContext";
import { CharacterStats } from "./CharacterStats";

const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling"]),
  class: z.enum(["Warrior", "Mage", "Rogue", "Cleric"]),
  stats: z.object({
    strength: z.number().min(3).max(18),
    dexterity: z.number().min(3).max(18),
    constitution: z.number().min(3).max(18),
    intelligence: z.number().min(3).max(18),
    wisdom: z.number().min(3).max(18),
    charisma: z.number().min(3).max(18),
  }),
});

const getStartingItems = (characterClass: string) => {
  const commonItems = [
    { id: "backpack", name: "Backpack", description: "A sturdy leather backpack", type: "misc" },
    { id: "rations", name: "Rations (5 days)", description: "Dried food and water", type: "misc" },
  ];

  const classItems = {
    Warrior: [
      { id: "longsword", name: "Longsword", description: "A well-balanced sword", type: "weapon" },
      { id: "chainmail", name: "Chainmail", description: "Standard chainmail armor", type: "armor" },
    ],
    Mage: [
      { id: "staff", name: "Staff", description: "A wooden staff for casting", type: "weapon" },
      { id: "spellbook", name: "Spellbook", description: "Contains basic spells", type: "misc" },
    ],
    Rogue: [
      { id: "dagger", name: "Dagger", description: "A sharp dagger", type: "weapon" },
      { id: "leather", name: "Leather Armor", description: "Light leather armor", type: "armor" },
    ],
    Cleric: [
      { id: "mace", name: "Mace", description: "A holy mace", type: "weapon" },
      { id: "shield", name: "Shield", description: "A sturdy shield", type: "armor" },
    ],
  };

  return [...commonItems, ...classItems[characterClass as keyof typeof classItems]];
};

const rollStats = () => ({
  strength: Math.floor(Math.random() * 16) + 3,
  dexterity: Math.floor(Math.random() * 16) + 3,
  constitution: Math.floor(Math.random() * 16) + 3,
  intelligence: Math.floor(Math.random() * 16) + 3,
  wisdom: Math.floor(Math.random() * 16) + 3,
  charisma: Math.floor(Math.random() * 16) + 3,
});

export const CharacterCreationForm = ({ onCharacterCreated }: { onCharacterCreated: () => void }) => {
  const { dispatch } = useGame();
  const form = useForm({
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
      form.setValue(`stats.${stat}`, value);
    });
  };

  const onSubmit = (data: z.infer<typeof characterSchema>) => {
    const startingItems = getStartingItems(data.class);
    const newCharacter = {
      id: "player1",
      name: data.name,
      race: data.race,
      class: data.class,
      stats: data.stats,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Character Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white/80" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="race"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Race</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select a race" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Human">Human</SelectItem>
                    <SelectItem value="Elf">Elf</SelectItem>
                    <SelectItem value="Dwarf">Dwarf</SelectItem>
                    <SelectItem value="Halfling">Halfling</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Warrior">Warrior</SelectItem>
                    <SelectItem value="Mage">Mage</SelectItem>
                    <SelectItem value="Rogue">Rogue</SelectItem>
                    <SelectItem value="Cleric">Cleric</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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