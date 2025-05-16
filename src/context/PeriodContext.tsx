
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  UserCycleData, 
  loadUserData, 
  saveUserData, 
  addPeriodToHistory,
  defaultUserData,
  getCurrentPhase,
  predictNextPeriod,
  PeriodData
} from '@/lib/period-utils';

interface PeriodContextType {
  userData: UserCycleData;
  currentPhase: string;
  nextPeriodPrediction: PeriodData | null;
  setLastPeriod: (startDate: Date, endDate: Date) => void;
  loadingData: boolean;
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

export const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserCycleData>(defaultUserData);
  const [currentPhase, setCurrentPhase] = useState<string>("Unknown");
  const [nextPeriodPrediction, setNextPeriodPrediction] = useState<PeriodData | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  
  // Initialize data from local storage
  useEffect(() => {
    const loadData = () => {
      const data = loadUserData();
      setUserData(data);
      setCurrentPhase(getCurrentPhase(data));
      setNextPeriodPrediction(predictNextPeriod(data));
      setLoadingData(false);
    };
    
    loadData();
  }, []);
  
  // Set last period
  const setLastPeriod = (startDate: Date, endDate: Date) => {
    const updatedUserData = addPeriodToHistory(userData, startDate, endDate);
    setUserData(updatedUserData);
    setCurrentPhase(getCurrentPhase(updatedUserData));
    setNextPeriodPrediction(predictNextPeriod(updatedUserData));
    saveUserData(updatedUserData);
  };
  
  const contextValue = {
    userData,
    currentPhase,
    nextPeriodPrediction,
    setLastPeriod,
    loadingData
  };
  
  return (
    <PeriodContext.Provider value={contextValue}>
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);
  
  if (context === undefined) {
    throw new Error('usePeriodContext must be used within a PeriodProvider');
  }
  
  return context;
};
