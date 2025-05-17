
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const BubblePopGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 300, height: 300 });
  const [gameTime, setGameTime] = useState(30);
  
  const colors = [
    'bg-aurora-purple',
    'bg-aurora-deep-purple',
    'bg-aurora-light-purple',
    'bg-aurora-pastel-red',
  ];
  
  // Set container size based on window
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth - 60, 340);
      const height = 350;
      setContainerSize({ width, height });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Game timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setGameTime(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);
  
  // Generate bubbles
  useEffect(() => {
    let bubbleInterval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive) {
      bubbleInterval = setInterval(() => {
        if (bubbles.length < 10) {
          const newBubble: Bubble = {
            id: Date.now(),
            x: Math.random() * (containerSize.width - 60),
            y: Math.random() * (containerSize.height - 60),
            size: Math.floor(Math.random() * 20) + 30,
            color: colors[Math.floor(Math.random() * colors.length)]
          };
          
          setBubbles(prev => [...prev, newBubble]);
        }
      }, 800);
    }
    
    return () => {
      if (bubbleInterval) clearInterval(bubbleInterval);
    };
  }, [isActive, bubbles.length, containerSize]);
  
  const startGame = () => {
    setIsActive(true);
    setScore(0);
    setBubbles([]);
    setGameTime(30);
  };
  
  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 10);
  };
  
  return (
    <Card className="border-aurora-purple bg-aurora-deep-purple/30 backdrop-blur-md text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Bubble Pop</CardTitle>
            <CardDescription className="text-white/70">
              Pop bubbles to release tension
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="text-sm">Time: {gameTime}s</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="relative border border-aurora-purple/30 rounded-md mb-4 overflow-hidden"
          style={{ 
            width: containerSize.width, 
            height: containerSize.height,
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {!isActive && gameTime === 30 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm text-white">
              <div className="text-center">
                <p className="mb-4">Pop as many bubbles as possible!</p>
                <Button onClick={startGame} className="bg-aurora-purple hover:bg-aurora-deep-purple">
                  Start Game
                </Button>
              </div>
            </div>
          )}
          
          {!isActive && gameTime === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm text-white">
              <div className="text-center">
                <p className="text-xl mb-2">Game Over!</p>
                <p className="text-2xl font-bold mb-4">Score: {score}</p>
                <Button onClick={startGame} className="bg-aurora-purple hover:bg-aurora-deep-purple">
                  Play Again
                </Button>
              </div>
            </div>
          )}
          
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={`absolute rounded-full cursor-pointer ${bubble.color} shadow-lg flex items-center justify-center animate-pulse`}
              style={{
                left: bubble.x,
                top: bubble.y,
                width: bubble.size,
                height: bubble.size,
              }}
              onClick={() => isActive && popBubble(bubble.id)}
            >
              {/* Optional: Add inner circle for more visual appeal */}
              <div className="rounded-full bg-white/20 w-1/2 h-1/2"></div>
            </div>
          ))}
        </div>
        
        {isActive && (
          <div className="text-center">
            <Button 
              onClick={() => setIsActive(false)}
              className="bg-aurora-pastel-red hover:bg-aurora-pastel-red/80"
            >
              End Game
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BubblePopGame;
