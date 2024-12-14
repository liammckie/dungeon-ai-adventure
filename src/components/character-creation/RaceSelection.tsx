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
import { races } from "@/data/races";
import { CharacterFormData } from "./characterSchema";
import type { CharacterRace, CharacterStats } from "@/types/game";

export const RaceSelection = ({ 
  form 
}: { 
  form: UseFormReturn<CharacterFormData> 
}) => {
  const handleRaceChange = (value: string) => {
    const raceValue = value as CharacterRace;
    form.setValue("race", raceValue);
    form.setValue("subrace", undefined);
    
    const selectedRace = races.find(r => r.name === value);
    if (selectedRace?.abilityScoreIncrease) {
      const currentStats = form.getValues("stats") as CharacterStats;
      const newStats: CharacterStats = {
        strength: currentStats.strength || 10,
        dexterity: currentStats.dexterity || 10,
        constitution: currentStats.constitution || 10,
        intelligence: currentStats.intelligence || 10,
        wisdom: currentStats.wisdom || 10,
        charisma: currentStats.charisma || 10,
      };

      Object.entries(selectedRace.abilityScoreIncrease).forEach(([ability, bonus]) => {
        if (ability in newStats && typeof bonus === 'number') {
          newStats[ability as keyof CharacterStats] += bonus;
        }
      });

      form.setValue("stats", newStats);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="race"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-lg font-semibold text-white">Race</FormLabel>
            <Select onValueChange={handleRaceChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/10 border-fantasy-frame-border text-white">
                  <SelectValue placeholder="Select a race" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-black/90 border-fantasy-frame-border">
                {races.map((race) => (
                  <SelectItem 
                    key={race.name} 
                    value={race.name}
                    className="text-white hover:bg-white/20"
                  >
                    {race.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("race") && (
        <div className="bg-black/20 p-4 rounded-lg border border-fantasy-frame-border">
          <h3 className="text-white font-semibold mb-2">Racial Traits</h3>
          <div className="space-y-2">
            {races.find(r => r.name === form.watch("race"))?.traits.map((trait, index) => (
              <p key={index} className="text-gray-300 text-sm">{trait}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};