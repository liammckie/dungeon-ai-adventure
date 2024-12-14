import * as z from "zod";
import type { CharacterClass, CharacterRace, CharacterStats } from "@/types/game";

const statsSchema = z.object({
  strength: z.number().min(3).max(18),
  dexterity: z.number().min(3).max(18),
  constitution: z.number().min(3).max(18),
  intelligence: z.number().min(3).max(18),
  wisdom: z.number().min(3).max(18),
  charisma: z.number().min(3).max(18),
}).required();

export const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  race: z.string().refine((val): val is CharacterRace => 
    ["Human", "Elf", "Dwarf", "Halfling"].includes(val as CharacterRace),
    "Invalid race selection"
  ),
  subrace: z.string().optional(),
  class: z.string().refine((val): val is CharacterClass => 
    ["Fighter", "Wizard", "Cleric", "Rogue"].includes(val as CharacterClass),
    "Invalid class selection"
  ),
  subclass: z.string().optional(),
  background: z.string(),
  stats: statsSchema,
  skills: z.array(z.string()),
  spells: z.array(z.string()).optional(),
  feats: z.array(z.string()).optional(),
});

export type CharacterFormData = z.infer<typeof characterSchema>;