import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/context/GameContext";

export const GameLog = () => {
  const { state } = useGame();

  return (
    <Card className="h-[600px] bg-parchment border-fantasy-accent">
      <div className="p-4 border-b border-fantasy-accent">
        <h2 className="text-lg font-bold text-fantasy-primary">Game Log</h2>
      </div>
      <ScrollArea className="h-[calc(600px-4rem)] p-4">
        {state.gameLog.map((log, index) => (
          <p key={index} className="mb-2 text-fantasy-secondary">
            {log}
          </p>
        ))}
      </ScrollArea>
    </Card>
  );
};