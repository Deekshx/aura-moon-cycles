
import React from 'react';
import { differenceInDays } from 'date-fns';

interface PeriodCountdownProps {
  nextPeriodDate: Date | null;
}

const PeriodCountdown: React.FC<PeriodCountdownProps> = ({ nextPeriodDate }) => {
  if (!nextPeriodDate) {
    return (
      <div className="bg-aurora-deep-purple/30 border border-aurora-purple/30 p-4 rounded-xl backdrop-blur-md">
        <h3 className="text-aurora-purple font-semibold mb-2">Next Period</h3>
        <p className="text-white/80">Please set your period information to see predictions</p>
      </div>
    );
  }
  
  const daysRemaining = differenceInDays(nextPeriodDate, new Date());
  
  return (
    <div className="bg-aurora-deep-purple/30 border border-aurora-purple/30 p-4 rounded-xl backdrop-blur-md">
      <h3 className="text-aurora-purple font-semibold mb-2">Next Period</h3>
      
      {daysRemaining <= 0 ? (
        <div className="text-white">
          <p className="text-xl font-bold text-aurora-pastel-red">Today!</p>
          <p className="text-sm opacity-70">Your period is due today</p>
        </div>
      ) : (
        <div className="text-white">
          <p className="text-xl font-bold">{daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}</p>
          <p className="text-sm opacity-70">until your next period</p>
        </div>
      )}
    </div>
  );
};

export default PeriodCountdown;
