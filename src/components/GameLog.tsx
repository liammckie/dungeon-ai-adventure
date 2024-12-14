import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/context/GameContext";
import { ScrollText } from "lucide-react";

export const GameLog = () => {
  const { state } = useGame();

  return (
    <div className="h-full bg-black/70 backdrop-blur-sm rounded-lg">
      <div className="p-4 border-b border-fantasy-frame-border">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <ScrollText className="h-5 w-5" />
          Game Log
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)] p-4">
        {state.gameLog.map((log, index) => (
          <p
            key={index}
            className="mb-2 text-amber-200 border-b border-fantasy-frame-border/20 pb-2 last:border-0"
          >
            {log}
          </p>
        ))}
      </ScrollArea>
    </div>
  );
};