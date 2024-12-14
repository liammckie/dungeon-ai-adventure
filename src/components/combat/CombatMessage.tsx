import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Sword, Heart } from "lucide-react";

export type CombatMessageType = "attack" | "defend" | "miss" | "heal";

interface CombatMessageProps {
  type: CombatMessageType;
  attacker?: string;
  target: string;
  damage?: number;
  healing?: number;
}

export const CombatMessage = ({ type, attacker, target, damage, healing }: CombatMessageProps) => {
  const getIcon = () => {
    switch (type) {
      case "attack":
        return <Sword className="h-4 w-4" />;
      case "defend":
        return <Shield className="h-4 w-4" />;
      case "heal":
        return <Heart className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "attack":
        return {
          title: "Attack!",
          description: `${attacker} hits ${target} for ${damage} damage!`
        };
      case "miss":
        return {
          title: "Miss!",
          description: `${attacker}'s attack missed ${target}!`
        };
      case "defend":
        return {
          title: "Defense!",
          description: `${attacker} takes a defensive stance.`
        };
      case "heal":
        return {
          title: "Healing!",
          description: `${target} recovers ${healing} HP!`
        };
    }
  };

  const message = getMessage();

  return (
    <Alert className="mb-4">
      {getIcon()}
      <AlertTitle>{message?.title}</AlertTitle>
      <AlertDescription>{message?.description}</AlertDescription>
    </Alert>
  );
};