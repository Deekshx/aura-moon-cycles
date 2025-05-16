
import React from 'react';
import { format, isWithinInterval, isSameDay } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { DayContent } from "react-day-picker";

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
  const renderDay = (props: React.ComponentProps<typeof DayContent>) => {
    const { date, ...dayProps } = props;
    
    // Safety check for invalid date
    if (!date || isNaN(date.getTime())) {
      return <div>{props.displayMonth?.getDate()}</div>;
    }
    
    // Check if day is in period history
    const isInPeriod = periodHistory.some(period => 
      isWithinInterval(date, { start: period.startDate, end: period.endDate })
    );
    
    // Check if day is in predicted period
    const isInPredictedPeriod = nextPeriodPrediction ? 
      isWithinInterval(date, { 
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
      if (isSameDay(date, period.startDate)) {
        className += " border-l-2 border-t-2 border-b-2 border-aurora-purple";
      }
      if (isSameDay(date, period.endDate)) {
        className += " border-r-2 border-t-2 border-b-2 border-aurora-purple";
      }
    });
    
    // Add border on predicted period
    if (nextPeriodPrediction) {
      if (isSameDay(date, nextPeriodPrediction.startDate)) {
        className += " border-l-2 border-t-2 border-b-2 border-aurora-pastel-red";
      }
      if (isSameDay(date, nextPeriodPrediction.endDate)) {
        className += " border-r-2 border-t-2 border-b-2 border-aurora-pastel-red";
      }
    }
    
    return (
      <div className={className}>
        {format(date, 'd')}
      </div>
    );
  };

  return (
    <div className="period-calendar-container bg-aurora-deep-purple/20 backdrop-blur-md rounded-xl p-4">
      <h2 className="text-aurora-purple text-xl font-semibold mb-4">Period Calendar</h2>
      <div className="p-2 backdrop-filter backdrop-blur-sm bg-black/40 rounded-lg">
        <Calendar
          mode="single"
          className="p-3 pointer-events-auto text-white"
          selected={new Date()}
          components={{
            DayContent: (props) => renderDay(props)
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
