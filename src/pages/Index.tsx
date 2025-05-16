
import React from 'react';
import { usePeriodContext } from '@/context/PeriodContext';
import StarryBackground from '@/components/StarryBackground';
import Navigation from '@/components/Navigation';
import PeriodCountdown from '@/components/PeriodCountdown';
import PeriodPhaseInfo from '@/components/PeriodPhaseInfo';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { userData, currentPhase, nextPeriodPrediction, loadingData } = usePeriodContext();

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
            AuraMoon
          </h1>
          <p className="text-white/70">Your celestial period tracker</p>
        </header>
        
        <div className="space-y-6">
          {/* Period Countdown */}
          <PeriodCountdown nextPeriodDate={nextPeriodPrediction?.startDate || null} />
          
          {/* Current Phase Info */}
          <div className="bg-aurora-deep-purple/30 border border-aurora-purple/30 p-4 rounded-xl backdrop-blur-md">
            <h3 className="text-aurora-purple font-semibold mb-2">Current Phase</h3>
            <p className="text-white text-xl font-bold">{currentPhase}</p>
            <p className="text-white/70 text-sm">
              {userData.lastPeriodStartDate ? (
                <>Last period started on {format(userData.lastPeriodStartDate, 'MMMM d, yyyy')}</>
              ) : (
                <>No period data available</>
              )}
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/calendar" className="block">
              <Button 
                className="w-full bg-aurora-purple hover:bg-aurora-deep-purple"
              >
                View Calendar
              </Button>
            </Link>
            <Link to="/profile" className="block">
              <Button 
                variant="outline" 
                className="w-full border-aurora-purple text-aurora-purple hover:bg-aurora-purple hover:text-white"
              >
                Log Period
              </Button>
            </Link>
          </div>
          
          {/* Phase Information */}
          <PeriodPhaseInfo currentPhase={currentPhase} />
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;
