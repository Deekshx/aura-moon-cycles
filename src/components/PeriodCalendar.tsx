
import React from 'react';
import { format, addDays, isWithinInterval, isSameDay } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";

interface PeriodCalendarProps {
  periodHistory: {
    startDate: Date;
    endDate: Date;
  }[];
  nextPeriodPrediction: {
    startDate: Date;
    endDate: Date;
  } | null;
}

const PeriodCalendar: React.FC<PeriodCalendarProps> = ({ periodHistory, nextPeriodPrediction }) => {
  // Custom day rendering to show period days
  const renderDay = (day: Date) => {
    // Check if day is in period history
    const isInPeriod = periodHistory.some(period => 
      isWithinInterval(day, { start: period.startDate, end: period.endDate })
    );
    
    // Check if day is in predicted period
    const isInPredictedPeriod = nextPeriodPrediction ? 
      isWithinInterval(day, { 
        start: nextPeriodPrediction.startDate, 
        end: nextPeriodPrediction.endDate 
      }) : false;
    
    // Different styling based on if it's a past period or predicted period
    let className = "";
    
    if (isInPeriod) {
      className = "bg-aurora-deep-purple/50 text-white rounded-md";
    } else if (isInPredictedPeriod) {
      className = "bg-aurora-pastel-red/40 text-white rounded-md";
    }
    
    // Add border on first day of period
    periodHistory.forEach(period => {
      if (isSameDay(day, period.startDate)) {
        className += " border-l-2 border-t-2 border-b-2 border-aurora-purple";
      }
      if (isSameDay(day, period.endDate)) {
        className += " border-r-2 border-t-2 border-b-2 border-aurora-purple";
      }
    });
    
    // Add border on predicted period
    if (nextPeriodPrediction) {
      if (isSameDay(day, nextPeriodPrediction.startDate)) {
        className += " border-l-2 border-t-2 border-b-2 border-aurora-pastel-red";
      }
      if (isSameDay(day, nextPeriodPrediction.endDate)) {
        className += " border-r-2 border-t-2 border-b-2 border-aurora-pastel-red";
      }
    }
    
    return <div className={className}>{format(day, 'd')}</div>;
  };

  return (
    <div className="period-calendar-container bg-aurora-deep-purple/20 backdrop-blur-md rounded-xl p-4">
      <h2 className="text-aurora-purple text-xl font-semibold mb-4">Period Calendar</h2>
      <div className="p-2 backdrop-filter backdrop-blur-sm bg-black/40 rounded-lg">
        <Calendar
          mode="single"
          className="p-3 pointer-events-auto text-white"
          dayClassName={(day) => "hover:bg-aurora-deep-purple/30"}
          selected={new Date()}
          components={{
            Day: ({ day }) => renderDay(day),
          }}
        />
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-aurora-deep-purple/50 rounded-full mr-2"></div>
          <span className="text-white">Past Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-aurora-pastel-red/40 rounded-full mr-2"></div>
          <span className="text-white">Predicted Period</span>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;
