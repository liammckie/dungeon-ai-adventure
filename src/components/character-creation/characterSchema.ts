import * as z from "zod";
import type { CharacterClass, CharacterRace, CharacterStats } from "@/types/game";

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
  class: z.enum([
    "Barbarian", "Fighter", "Monk", "Rogue",
    "Cleric", "Druid", "Sorcerer", "Wizard", "Warlock",
    "Bard", "Paladin", "Ranger", "Artificer"
  ] as const),
  stats: statsSchema,
}) satisfies z.ZodType<{
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  stats: CharacterStats;
}>;

export type CharacterFormData = z.infer<typeof characterSchema>;