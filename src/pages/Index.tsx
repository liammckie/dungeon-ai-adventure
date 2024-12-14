import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-parchment-texture bg-cover bg-center flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-parchment/90 p-8 rounded-lg border-2 border-fantasy-accent text-center space-y-6">
        <h1 className="text-4xl font-bold text-fantasy-primary">Dungeon Adventure</h1>
        <p className="text-fantasy-secondary">Embark on an epic journey with AI companions!</p>
        <Button 
          onClick={() => navigate("/create-character")}
          className="w-full bg-fantasy-primary hover:bg-fantasy-primary/90 text-white"
        >
          Start New Adventure
        </Button>
      </div>
    </div>
  );
};

export default Index;