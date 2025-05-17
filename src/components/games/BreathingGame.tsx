
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BreathingGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timer, setTimer] = useState(4);
  const [cycles, setCycles] = useState(0);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            // Switch phases
            if (phase === 'inhale') {
              setPhase('hold');
              return 7; // Hold for 7 seconds
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 8; // Exhale for 8 seconds
            } else {
              setPhase('inhale');
              setCycles(c => c + 1);
              return 4; // Inhale for 4 seconds
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);
  
  const handleToggle = () => {
    if (isActive) {
      // Reset when stopping
      setIsActive(false);
      setPhase('inhale');
      setTimer(4);
    } else {
      setIsActive(true);
    }
  };
  
  return (
    <Card className="border-aurora-purple bg-aurora-deep-purple/30 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle>4-7-8 Breathing</CardTitle>
        <CardDescription className="text-white/70">
          A relaxation technique to reduce anxiety
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div 
          className={`w-40 h-40 rounded-full flex items-center justify-center text-xl font-bold mb-4 transition-all duration-1000 ease-in-out 
            ${phase === 'inhale' ? 'bg-aurora-purple scale-75' : 
              phase === 'hold' ? 'bg-aurora-deep-purple scale-100 border-4 border-aurora-purple' : 
              'bg-aurora-light-purple scale-75'}`}
        >
          {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
          {isActive && <div className="text-sm mt-2">{timer}</div>}
        </div>
        
        {cycles > 0 && <p className="mb-4">Cycles completed: {cycles}</p>}
        
        <Button 
          onClick={handleToggle}
          className={isActive ? "bg-aurora-pastel-red hover:bg-aurora-pastel-red/80" : "bg-aurora-purple hover:bg-aurora-deep-purple"}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </CardContent>
      <CardFooter className="text-xs text-white/70 flex flex-col items-start">
        <p>• Breathe in through nose for 4 seconds</p>
        <p>• Hold breath for 7 seconds</p>
        <p>• Exhale completely through mouth for 8 seconds</p>
      </CardFooter>
    </Card>
  );
};

export default BreathingGame;
