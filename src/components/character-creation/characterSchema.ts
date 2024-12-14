import * as z from "zod";
import type { CharacterClass, CharacterRace, CharacterStats } from "@/types/game";

// Define the stats schema with all fields required and strict typing
const statsSchema = z.object({
  strength: z.number().min(3).max(18),
  dexterity: z.number().min(3).max(18),
  constitution: z.number().min(3).max(18),
  intelligence: z.number().min(3).max(18),
  wisdom: z.number().min(3).max(18),
  charisma: z.number().min(3).max(18),
}).strict();

// Define the character schema with all fields required
export const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling"]),
  class: z.enum([
    "Barbarian", "Fighter", "Monk", "Rogue",
    "Cleric", "Druid", "Sorcerer", "Wizard", "Warlock",
    "Bard", "Paladin", "Ranger", "Artificer"
  ]),
  stats: statsSchema,
}).strict();

export type CharacterFormData = z.infer<typeof characterSchema>;