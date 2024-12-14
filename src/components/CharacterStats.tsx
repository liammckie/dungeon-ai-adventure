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

const stats = [
  { name: "strength", label: "Strength" },
  { name: "dexterity", label: "Dexterity" },
  { name: "constitution", label: "Constitution" },
  { name: "intelligence", label: "Intelligence" },
  { name: "wisdom", label: "Wisdom" },
  { name: "charisma", label: "Charisma" },
];

export const CharacterStats = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <FormField
          key={stat.name}
          control={form.control}
          name={`stats.${stat.name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{stat.label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  className="bg-white/80"
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