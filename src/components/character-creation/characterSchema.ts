import * as z from "zod";
import type { CharacterClass, CharacterRace, CharacterStats } from "@/types/game";

// Define the stats schema with all fields required
const statsSchema = z.object({
  strength: z.number().min(3).max(18),
  dexterity: z.number().min(3).max(18),
  constitution: z.number().min(3).max(18),
  intelligence: z.number().min(3).max(18),
  wisdom: z.number().min(3).max(18),
  charisma: z.number().min(3).max(18),
}).strict(); // Ensure no additional properties are allowed

// Define the character schema with all fields required
export const characterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").min(1, "Name is required"),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling"]),
  class: z.enum([
    "Barbarian", "Fighter", "Monk", "Rogue",
    "Cleric", "Druid", "Sorcerer", "Wizard", "Warlock",
    "Bard", "Paladin", "Ranger", "Artificer"
  ]),
  stats: statsSchema,
}).strict(); // Ensure no additional properties are allowed

// Verify that the schema matches our expected types
type CharacterSchemaType = z.infer<typeof characterSchema>;
type Verification = CharacterSchemaType extends {
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  stats: CharacterStats;
} ? true : false;

// Export the form data type
export type CharacterFormData = z.infer<typeof characterSchema>;