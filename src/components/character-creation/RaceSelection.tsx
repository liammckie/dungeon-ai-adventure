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
import { Info } from "lucide-react";
import { races } from "@/data/races";
import { CharacterFormData } from "./characterSchema";
import type { CharacterRace, CharacterStats } from "@/types/game";

const RACE_DESCRIPTIONS = {
  Human: "Adaptable and ambitious, humans are diverse in their talents and motivations. In Black Hollow, many humans serve in the Church of Light or work as merchants and craftspeople.",
  Elf: "Ancient and graceful, elves possess natural magic and keen senses. Some elven scouts first noticed the dark omens around the Dread Keep.",
  Dwarf: "Strong-willed and hardy, dwarves are master craftsmen. The dwarven smiths of Black Hollow have long supplied arms to the region's defenders.",
  Halfling: "Small but resourceful, halflings make excellent scouts. Their keen eyes have helped track cultist movements through the Northern Woods.",
  Dragonborn: "Proud warriors with draconic heritage. Their presence is rare but respected in these lands.",
  Gnome: "Curious and clever, gnomes excel at magical tinkering. Some study the ancient mechanisms of the Dread Keep.",
  "Half-Elf": "Combining human adaptability and elven grace, half-elves often serve as diplomats between communities.",
  Tiefling: "Bearing infernal heritage, tieflings face prejudice but possess great resolve. Some secretly investigate the cult's activities.",
} as const;

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
        strength: currentStats.strength,
        dexterity: currentStats.dexterity,
        constitution: currentStats.constitution,
        intelligence: currentStats.intelligence,
        wisdom: currentStats.wisdom,
        charisma: currentStats.charisma,
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
            <div className="flex items-center gap-2">
              <FormLabel className="text-lg font-semibold text-white">Race</FormLabel>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 border-fantasy-frame-border text-white p-2 max-w-md">
                    <p>Choose your character's race carefully. Each race brings unique abilities and cultural perspectives that may affect your journey through the Dread Keep.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
        <div className="space-y-4">
          <div className="bg-black/20 p-4 rounded-lg border border-fantasy-frame-border">
            <h3 className="text-white font-semibold mb-2">Race Description</h3>
            <p className="text-gray-300 text-sm">
              {RACE_DESCRIPTIONS[form.watch("race") as keyof typeof RACE_DESCRIPTIONS]}
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-fantasy-frame-border">
            <h3 className="text-white font-semibold mb-2">Racial Traits</h3>
            <div className="space-y-2">
              {races.find(r => r.name === form.watch("race"))?.traits.map((trait, index) => (
                <p key={index} className="text-gray-300 text-sm">{trait}</p>
              ))}
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-fantasy-frame-border">
            <h3 className="text-white font-semibold mb-2">Ability Score Increases</h3>
            <div className="space-y-1">
              {Object.entries(races.find(r => r.name === form.watch("race"))?.abilityScoreIncrease || {}).map(([ability, bonus]) => (
                <p key={ability} className="text-gray-300 text-sm capitalize">
                  {ability}: +{bonus}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};