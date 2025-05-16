
import React, { useState } from 'react';
import StarryBackground from '@/components/StarryBackground';
import Navigation from '@/components/Navigation';
import { usePeriodContext } from '@/context/PeriodContext';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { userData, setLastPeriod } = usePeriodContext();
  const [periodStartDate, setPeriodStartDate] = useState<Date | undefined>(
    userData.lastPeriodStartDate || undefined
  );
  const [periodLength, setPeriodLength] = useState<number>(userData.averagePeriodLength || 5);
  
  const handleSavePeriod = () => {
    if (!periodStartDate) {
      toast.error('Please select a start date for your period');
      return;
    }
    
    // Calculate end date based on period length
    const periodEndDate = addDays(periodStartDate, periodLength - 1);
    
    // Save period
    setLastPeriod(periodStartDate, periodEndDate);
    
    toast.success('Period information saved successfully');
  };
  
  const calculateEndDate = () => {
    if (!periodStartDate) return 'Select a start date';
    return format(addDays(periodStartDate, periodLength - 1), 'MMMM d, yyyy');
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <StarryBackground />
      
      <div className="relative z-10 max-w-md mx-auto p-4 pt-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-aurora-light-purple to-aurora-purple bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-white/70">Track and manage your cycle data</p>
        </header>
        
        <div className="space-y-6">
          <Card className="period-phase-card">
            <CardHeader>
              <CardTitle className="text-aurora-purple">Log Your Period</CardTitle>
              <CardDescription>When did your last period start?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-aurora-light-purple">Period Start Date</label>
                  <div className="bg-black/40 rounded-lg p-2">
                    <Calendar
                      mode="single"
                      selected={periodStartDate}
                      onSelect={setPeriodStartDate}
                      className="p-3 pointer-events-auto text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2 text-aurora-light-purple">Period Length (days)</label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      className="border-aurora-purple text-aurora-purple hover:bg-aurora-deep-purple/20"
                      disabled={periodLength <= 1}
                      onClick={() => setPeriodLength(prev => Math.max(prev - 1, 1))}
                    >
                      -
                    </Button>
                    <span className="text-xl font-bold text-white">{periodLength}</span>
                    <Button 
                      variant="outline" 
                      className="border-aurora-purple text-aurora-purple hover:bg-aurora-deep-purple/20"
                      disabled={periodLength >= 14}
                      onClick={() => setPeriodLength(prev => Math.min(prev + 1, 14))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2 text-aurora-light-purple">Period End Date</label>
                  <p className="text-white">{calculateEndDate()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-aurora-purple hover:bg-aurora-deep-purple"
                onClick={handleSavePeriod}
              >
                Save Period Information
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="period-phase-card">
            <CardHeader>
              <CardTitle className="text-aurora-purple">Period History</CardTitle>
              <CardDescription>Your past {userData.periodHistory.length} periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userData.periodHistory.length === 0 ? (
                  <p className="text-white opacity-70">No period history recorded yet</p>
                ) : (
                  userData.periodHistory.map((period, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-aurora-purple/20">
                      <span className="text-white">{format(period.startDate, 'MMM d, yyyy')}</span>
                      <span className="text-white opacity-70">
                        {format(period.startDate, 'MMM d')} - {format(period.endDate, 'MMM d')}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default ProfilePage;
