import * as z from "zod";
import type { CharacterClass, CharacterRace } from "@/types/game";

const statsSchema = z.object({
  strength: z.number().min(3).max(18),
  dexterity: z.number().min(3).max(18),
  constitution: z.number().min(3).max(18),
  intelligence: z.number().min(3).max(18),
  wisdom: z.number().min(3).max(18),
  charisma: z.number().min(3).max(18),
});

export const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling"] as const),
  class: z.enum(["Warrior", "Mage", "Rogue", "Cleric"] as const),
  stats: statsSchema,
});

export type CharacterFormData = z.infer<typeof characterSchema>;