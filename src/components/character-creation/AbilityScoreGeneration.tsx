import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dice6, Info } from "lucide-react";
import { CharacterFormData } from "./characterSchema";
import type { AbilityScores } from "@/types/character";

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const ABILITY_DESCRIPTIONS = {
  strength: "Physical power and athletic training. Important for melee combat and feats of might.",
  dexterity: "Agility and reflexes. Crucial for stealth, acrobatics, and ranged combat.",
  constitution: "Health and stamina. Determines hit points and resistance to hardship.",
  intelligence: "Knowledge and reasoning. Key for investigating mysteries and magical study.",
  wisdom: "Perception and insight. Essential for survival and understanding others' motives.",
  charisma: "Force of personality. Vital for social interaction and leadership.",
} as const;

export const AbilityScoreGeneration = ({ 
  form 
}: { 
  form: UseFormReturn<CharacterFormData> 
}) => {
  const [method, setMethod] = React.useState<"standard" | "manual" | "roll">("standard");

  const handleMethodChange = (value: "standard" | "manual" | "roll") => {
    setMethod(value);
    if (value === "standard") {
      const abilities: (keyof AbilityScores)[] = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
      abilities.forEach((ability, index) => {
        form.setValue(`stats.${ability}`, STANDARD_ARRAY[index]);
      });
    }
  };

  const rollAbilityScores = () => {
    const abilities: (keyof AbilityScores)[] = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
    abilities.forEach((ability) => {
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
      const total = rolls.sort((a, b) => b - a).slice(0, 3).reduce((sum, roll) => sum + roll, 0);
      form.setValue(`stats.${ability}`, total);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <FormLabel className="text-lg font-semibold text-white">Ability Score Generation Method</FormLabel>
        <Select value={method} onValueChange={handleMethodChange}>
          <SelectTrigger className="w-[180px] bg-white/10 border-fantasy-frame-border text-white">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-fantasy-frame-border">
            <SelectItem value="standard" className="text-white hover:bg-white/20">Standard Array</SelectItem>
            <SelectItem value="manual" className="text-white hover:bg-white/20">Manual Entry</SelectItem>
            <SelectItem value="roll" className="text-white hover:bg-white/20">Roll Scores</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === "roll" && (
        <Button
          type="button"
          onClick={rollAbilityScores}
          className="bg-fantasy-accent hover:bg-fantasy-accent/90 text-white"
        >
          <Dice6 className="mr-2 h-4 w-4" />
          Roll Ability Scores
        </Button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] as const).map((ability) => (
          <FormField
            key={ability}
            control={form.control}
            name={`stats.${ability}`}
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-white capitalize flex items-center gap-2">
                    {ability}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-black/90 border-fantasy-frame-border text-white p-2">
                          <p>{ABILITY_DESCRIPTIONS[ability]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value?.toString() ?? "10"}
                    onChange={(e) => {
                      const value = e.target.value === "" ? 10 : parseInt(e.target.value);
                      field.onChange(isNaN(value) ? 10 : Math.max(3, Math.min(18, value)));
                    }}
                    className="bg-white/10 border-fantasy-frame-border text-white font-bold text-center"
                    readOnly={method === "standard"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};