import * as z from "zod";
import { CharacterClass, CharacterRace, CharacterStats, CharacterSubrace } from "@/types/game";

export const statsSchema = z.object({
  strength: z.number().min(3).max(18),
  dexterity: z.number().min(3).max(18),
  constitution: z.number().min(3).max(18),
  intelligence: z.number().min(3).max(18),
  wisdom: z.number().min(3).max(18),
  charisma: z.number().min(3).max(18),
}).strict();

const characterClassEnum = z.enum([
  "Fighter", "Wizard", "Cleric", "Rogue", "Barbarian", 
  "Paladin", "Ranger", "Druid", "Warlock", "Sorcerer", "Monk", "Bard", "NPC"
]) as z.ZodType<CharacterClass>;

const characterRaceEnum = z.enum([
  "Human", "Elf", "Dwarf", "Halfling", "Dragonborn", 
  "Gnome", "Half-Elf", "Tiefling"
]) as z.ZodType<CharacterRace>;

const characterSubraceEnum = z.enum([
  "High Elf", "Wood Elf", "Dark Elf", 
  "Hill Dwarf", "Mountain Dwarf",
  "Lightfoot", "Stout", 
  "Standard Human", "Variant Human",
  "Forest Gnome", "Rock Gnome", "Deep Gnome"
]) as z.ZodType<CharacterSubrace>;

export const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  race: characterRaceEnum,
  subrace: characterSubraceEnum.optional(),
  class: characterClassEnum,
  background: z.string(),
  stats: statsSchema,
  skills: z.array(z.string()),
  spells: z.array(z.string()).optional(),
  feats: z.array(z.string()).optional(),
});

export type CharacterFormData = z.infer<typeof characterSchema>;