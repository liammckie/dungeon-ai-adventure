import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGame } from "@/context/GameContext";
import { ScrollText } from "lucide-react";

export const GameLog = () => {
  const { state } = useGame();

  return (
    <div className="h-[calc(100vh-8rem)] bg-black/70 backdrop-blur-sm rounded-lg">
      <div className="p-2 border-b border-fantasy-frame-border">
        <h2 className="text-sm font-bold text-amber-400 flex items-center gap-2">
          <ScrollText className="h-4 w-4" />
          Game Log
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-2 space-y-2">
          {state.gameLog.map((log, index) => (
            <p
              key={index}
              className="text-xs text-amber-200 border-b border-fantasy-frame-border/20 pb-2 last:border-0"
            >
              {log}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};