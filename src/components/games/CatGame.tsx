
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cat } from 'lucide-react';

const CatGame = () => {
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [message, setMessage] = useState('Your cat is waiting for attention!');
  const [isResting, setIsResting] = useState(false);
  
  const catMoods = [
    { min: 0, max: 20, mood: 'very sad 😿' },
    { min: 21, max: 40, mood: 'sad 🙁' },
    { min: 41, max: 60, mood: 'content 😐' },
    { min: 61, max: 80, mood: 'happy 😺' },
    { min: 81, max: 100, mood: 'purring! 😻' },
  ];
  
  const getCatMood = () => {
    return catMoods.find(mood => happiness >= mood.min && happiness <= mood.max)?.mood || 'content';
  };
  
  const feed = () => {
    setHappiness(prev => Math.min(100, prev + 15));
    setEnergy(prev => Math.min(100, prev + 10));
    setMessage('Your cat enjoyed the food! 🐟');
  };
  
  const pet = () => {
    setHappiness(prev => Math.min(100, prev + 20));
    setEnergy(prev => Math.max(0, prev - 5));
    setMessage('Your cat purrs with joy! 😽');
  };
  
  const play = () => {
    if (energy < 20) {
      setMessage('Your cat is too tired to play! Let them rest. 😴');
      return;
    }
    setHappiness(prev => Math.min(100, prev + 25));
    setEnergy(prev => Math.max(0, prev - 30));
    setMessage('Your cat had fun playing! 🐱');
  };
  
  const rest = () => {
    setIsResting(true);
    setMessage('Your cat is napping... 💤');
    
    setTimeout(() => {
      setEnergy(prev => Math.min(100, prev + 40));
      setHappiness(prev => Math.min(100, prev + 5));
      setIsResting(false);
      setMessage('Your cat woke up refreshed! 😺');
    }, 3000);
  };
  
  useEffect(() => {
    // Natural decrease in happiness and energy over time
    const timer = setInterval(() => {
      if (!isResting) {
        setHappiness(prev => Math.max(0, prev - 5));
        setEnergy(prev => Math.max(0, prev - 3));
      }
    }, 10000); // Every 10 seconds
    
    return () => clearInterval(timer);
  }, [isResting]);
  
  return (
    <Card className="border-aurora-purple bg-aurora-deep-purple/30 backdrop-blur-md text-white relative overflow-hidden">
      <CardHeader>
        <CardTitle>Luna the Period Cat</CardTitle>
        <CardDescription className="text-white/70">
          Take care of Luna to feel better
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className={`text-6xl mb-2 ${isResting ? 'animate-bounce' : 'animate-pulse'}`}>
            <Cat size={80} className="text-aurora-light-purple" />
          </div>
          <p className="text-lg">Mood: {getCatMood()}</p>
          
          <div className="w-full space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm w-20">Happiness:</span>
              <div className="h-3 bg-aurora-deep-purple/50 rounded-full flex-1">
                <div 
                  className="h-3 bg-aurora-purple rounded-full transition-all duration-500" 
                  style={{width: `${happiness}%`}}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm w-20">Energy:</span>
              <div className="h-3 bg-aurora-deep-purple/50 rounded-full flex-1">
                <div 
                  className="h-3 bg-aurora-light-purple rounded-full transition-all duration-500" 
                  style={{width: `${energy}%`}}
                ></div>
              </div>
            </div>
          </div>
          
          <p className="mt-4 mb-4 text-center min-h-[24px]">{message}</p>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              onClick={feed} 
              disabled={isResting}
              variant="outline" 
              className="border-aurora-purple text-white hover:bg-aurora-purple"
            >
              Feed
            </Button>
            <Button 
              onClick={pet} 
              disabled={isResting}
              variant="outline" 
              className="border-aurora-purple text-white hover:bg-aurora-purple"
            >
              Pet
            </Button>
            <Button 
              onClick={play} 
              disabled={isResting || energy < 20}
              variant="outline" 
              className="border-aurora-purple text-white hover:bg-aurora-purple"
            >
              Play
            </Button>
            <Button 
              onClick={rest} 
              disabled={isResting || energy > 90}
              variant="outline" 
              className="border-aurora-purple text-white hover:bg-aurora-purple"
            >
              Rest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatGame;
