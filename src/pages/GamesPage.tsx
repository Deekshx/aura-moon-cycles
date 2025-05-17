
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import StarryBackground from '@/components/StarryBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreathingGame from '@/components/games/BreathingGame';
import CatGame from '@/components/games/CatGame';
import BubblePopGame from '@/components/games/BubblePopGame';

const GamesPage = () => {
  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 max-w-md mx-auto p-4 pt-12">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-light-purple to-aurora-purple bg-clip-text text-transparent">
            Relaxation Games
          </h1>
          <p className="text-white/70 mb-4">Fun ways to reduce period stress</p>
        </header>
        
        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-aurora-deep-purple/30 border border-aurora-purple/30">
            <TabsTrigger value="breathing" className="text-white data-[state=active]:bg-aurora-purple">Breathing</TabsTrigger>
            <TabsTrigger value="cat" className="text-white data-[state=active]:bg-aurora-purple">Cat Care</TabsTrigger>
            <TabsTrigger value="bubbles" className="text-white data-[state=active]:bg-aurora-purple">Bubble Pop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breathing" className="mt-4">
            <BreathingGame />
          </TabsContent>
          
          <TabsContent value="cat" className="mt-4">
            <CatGame />
          </TabsContent>
          
          <TabsContent value="bubbles" className="mt-4">
            <BubblePopGame />
          </TabsContent>
        </Tabs>
      </div>
      
      <Navigation />
    </div>
  );
};

export default GamesPage;
