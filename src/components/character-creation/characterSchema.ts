import * as z from "zod";
import type { AbilityScores } from "@/types/character";

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
  race: z.string(),
  subrace: z.string().optional(),
  class: z.string(),
  subclass: z.string().optional(),
  background: z.string(),
  stats: statsSchema,
  skills: z.array(z.string()),
  spells: z.array(z.string()).optional(),
  feats: z.array(z.string()).optional(),
});

export type CharacterFormData = z.infer<typeof characterSchema>;