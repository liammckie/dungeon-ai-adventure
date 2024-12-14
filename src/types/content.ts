import { Character } from "./game";

export interface NPC extends Character {
  imageUrl?: string;
  dialogue?: {
    greeting: string;
    options: {
      text: string;
      response: string;
      action?: () => void;
    }[];
  };
}
