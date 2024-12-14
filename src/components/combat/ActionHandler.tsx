import { toast } from "@/components/ui/use-toast";
import type { Character } from "@/types/game";

export const handleAction = (
  action: string,
  character: Character,
  target?: Character,
  onUpdateCharacter?: (character: Character) => void,
  onUpdateTarget?: (target: Character) => void
) => {
  switch (action) {
    case "defend":
      // Apply defensive stance
      if (character && onUpdateCharacter) {
        const updatedCharacter = {
          ...character,
          temporaryHp: character.temporaryHp || 0 + Math.floor(character.stats.constitution / 2),
        };
        onUpdateCharacter(updatedCharacter);
        toast({
          title: "Defense",
          description: `${character.name} takes a defensive stance`,
        });
      }
      break;

    case "rest":
      // Heal character
      if (character && onUpdateCharacter) {
        const healAmount = Math.floor(character.maxHp * 0.2);
        const newHp = Math.min(character.hp + healAmount, character.maxHp);
        const updatedCharacter = { ...character, hp: newHp };
        onUpdateCharacter(updatedCharacter);
        toast({
          title: "Rest",
          description: `${character.name} recovers ${healAmount} HP`,
        });
      }
      break;

    default:
      console.warn(`Unknown action: ${action}`);
  }
};