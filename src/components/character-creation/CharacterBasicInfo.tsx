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

export const CharacterBasicInfo = ({ form }: { form: UseFormReturn<CharacterFormData> }) => {
  return (
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
  );
};