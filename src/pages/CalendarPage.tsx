
import React from 'react';
import { usePeriodContext } from '@/context/PeriodContext';
import StarryBackground from '@/components/StarryBackground';
import Navigation from '@/components/Navigation';
import PeriodCalendar from '@/components/PeriodCalendar';

const CalendarPage = () => {
  const { userData, nextPeriodPrediction, loadingData } = usePeriodContext();

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-aurora-purple">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <StarryBackground />
      
      <div className="relative z-10 max-w-md mx-auto p-4 pt-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-light-purple to-aurora-purple bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-white/70">Track your cycle and plan ahead</p>
        </header>
        
        <div className="space-y-6">
          <PeriodCalendar 
            periodHistory={userData.periodHistory}
            nextPeriodPrediction={nextPeriodPrediction}
          />
          
          <div className="bg-aurora-deep-purple/30 border border-aurora-purple/30 p-4 rounded-xl backdrop-blur-md">
            <h3 className="text-aurora-purple font-semibold mb-2">Your Cycle</h3>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>
                <p className="text-sm opacity-70">Average Cycle Length</p>
                <p className="text-xl font-bold">{userData.averageCycleLength} days</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Average Period Length</p>
                <p className="text-xl font-bold">{userData.averagePeriodLength} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CalendarPage;
