import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dice6, Swords, Scroll } from "lucide-react";
import { useGame } from "@/context/GameContext";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  
  React.useEffect(() => {
    // Only redirect if game is in progress (has characters)
    if (state.characters.length > 0) {
      navigate("/game", { replace: true });
    }
  }, [state.characters, navigate]);

  const handleStartGame = () => {
    // Add fade-out animation to current screen
    document.body.classList.add('animate-fade-out');
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate("/create-character");
    }, 300); // Match this with animation duration
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] bg-opacity-95 flex items-center justify-center p-6 relative overflow-hidden animate-fade-in">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/28950689-1e3c-4d6c-846e-f8506162e596.png')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-black/60 p-8 rounded-lg border-2 border-red-900/50 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-red-600 mb-4">
              Dungeon & Dragons
            </h1>
            <p className="text-gray-300 text-xl mb-8">
              Embark on an epic journey into darkness
            </p>
            
            <div className="grid gap-4">
              <Button 
                onClick={handleStartGame}
                className="w-full bg-red-900 hover:bg-red-800 text-white py-6 text-lg group transition-all duration-300"
              >
                <Dice6 className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
                Begin Your Adventure
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  className="bg-transparent border-red-900/50 text-red-500 hover:bg-red-900/20"
                >
                  <Scroll className="mr-2 h-5 w-5" />
                  Load Game
                </Button>
                <Button 
                  variant="outline"
                  className="bg-transparent border-red-900/50 text-red-500 hover:bg-red-900/20"
                >
                  <Swords className="mr-2 h-5 w-5" />
                  Tutorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;