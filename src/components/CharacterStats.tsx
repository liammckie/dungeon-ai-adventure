import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CharacterFormData } from "./character-creation/characterSchema";
import type { CharacterStats as CharacterStatsType } from "@/types/game";

const ABILITY_SCORES = [
  { name: "strength", label: "Strength" },
  { name: "dexterity", label: "Dexterity" },
  { name: "constitution", label: "Constitution" },
  { name: "intelligence", label: "Intelligence" },
  { name: "wisdom", label: "Wisdom" },
  { name: "charisma", label: "Charisma" },
] as const;

export const CharacterStats = ({ form }: { form: UseFormReturn<CharacterFormData> }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {ABILITY_SCORES.map((stat) => (
        <FormField
          key={stat.name}
          control={form.control}
          name={`stats.${stat.name}` as keyof CharacterStatsType}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{stat.label}</FormLabel>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};