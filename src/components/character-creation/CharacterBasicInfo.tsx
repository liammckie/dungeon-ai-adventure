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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CharacterFormData } from "./characterSchema";
import { CharacterClass } from "@/types/game";

const classes: CharacterClass[] = [
  "Fighter", "Wizard", "Cleric", "Rogue", "Barbarian", 
  "Paladin", "Ranger", "Druid", "Warlock", "Sorcerer", "Monk", "Bard"
];

export const CharacterBasicInfo = ({ form }: { form: UseFormReturn<CharacterFormData> }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Character Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white/10 border-fantasy-frame-border text-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="class"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Class</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-white/10 border-fantasy-frame-border text-white">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-black/90 border-fantasy-frame-border">
                {classes.map((className) => (
                  <SelectItem 
                    key={className} 
                    value={className}
                    className="text-white hover:bg-white/20"
                  >
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};