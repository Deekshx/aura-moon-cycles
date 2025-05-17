import { addDays, subDays, differenceInDays, isSameDay } from 'date-fns';

export interface PeriodData {
  startDate: Date;
  endDate: Date;
}

export interface UserCycleData {
  averageCycleLength: number;
  averagePeriodLength: number;
  periodHistory: PeriodData[];
  lastPeriodStartDate: Date | null;
}

// Initialize with some default data that will later be loaded from localStorage
export const defaultUserData: UserCycleData = {
  averageCycleLength: 28, // Average cycle length in days
  averagePeriodLength: 5, // Average period duration in days
  periodHistory: [],
  lastPeriodStartDate: null,
};

// Calculate the user's current cycle phase
export const getCurrentPhase = (userData: UserCycleData): string => {
  if (!userData.lastPeriodStartDate) {
    return "Unknown";
  }

  const today = new Date();
  const daysSinceLastPeriod = differenceInDays(today, userData.lastPeriodStartDate);
  
  // Phase calculations based on average cycle
  if (daysSinceLastPeriod < userData.averagePeriodLength) {
    return "Menstrual";
  } else if (daysSinceLastPeriod < Math.floor(userData.averageCycleLength / 2)) {
    return "Follicular";
  } else if (daysSinceLastPeriod < Math.floor(userData.averageCycleLength / 2) + 3) {
    return "Ovulatory";
  } else if (daysSinceLastPeriod < userData.averageCycleLength) {
    return "Luteal";
  } else {
    // If past expected cycle length
    return "Luteal";
  }
};

// Predict next period
export const predictNextPeriod = (userData: UserCycleData): PeriodData | null => {
  if (!userData.lastPeriodStartDate) {
    return null;
  }

  const nextStartDate = new Date(userData.lastPeriodStartDate);
  nextStartDate.setDate(nextStartDate.getDate() + userData.averageCycleLength);
  
  const nextEndDate = new Date(nextStartDate);
  nextEndDate.setDate(nextEndDate.getDate() + userData.averagePeriodLength - 1);
  
  return {
    startDate: nextStartDate,
    endDate: nextEndDate
  };
};

// Check if a period already exists in history with the same start date
const periodExists = (history: PeriodData[], startDate: Date): boolean => {
  return history.some(period => 
    isSameDay(period.startDate, startDate)
  );
};

// Add a new period to history
export const addPeriodToHistory = (
  userData: UserCycleData, 
  startDate: Date, 
  endDate: Date
): UserCycleData => {
  // Check if a period with this start date already exists
  if (periodExists(userData.periodHistory, startDate)) {
    // If it exists, remove the old one before adding the updated one
    const updatedHistory = userData.periodHistory.filter(period => 
      !isSameDay(period.startDate, startDate)
    );
    
    const newPeriod: PeriodData = {
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };
    
    // Add the updated period
    const finalHistory = [...updatedHistory, newPeriod];
    
    return updateUserDataWithHistory(userData, finalHistory, startDate);
  }
  
  // If period doesn't exist yet, proceed with normal addition
  const newPeriod: PeriodData = {
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };
  
  // Add to history
  const updatedHistory = [...userData.periodHistory, newPeriod];
  
  return updateUserDataWithHistory(userData, updatedHistory, startDate);
};

// Helper function to update user data based on updated history
const updateUserDataWithHistory = (
  userData: UserCycleData,
  updatedHistory: PeriodData[],
  lastPeriodStartDate: Date
): UserCycleData => {
  // Recalculate average cycle length if there are at least 2 periods
  let averageCycleLength = userData.averageCycleLength;
  if (updatedHistory.length >= 2) {
    // Sort history by start date
    const sortedHistory = [...updatedHistory].sort((a, b) => 
      a.startDate.getTime() - b.startDate.getTime()
    );
    
    // Calculate average gap between periods
    let totalDays = 0;
    for (let i = 1; i < sortedHistory.length; i++) {
      totalDays += differenceInDays(
        sortedHistory[i].startDate, 
        sortedHistory[i-1].startDate
      );
    }
    
    averageCycleLength = Math.round(totalDays / (sortedHistory.length - 1));
  }
  
  // Recalculate average period length
  let averagePeriodLength = userData.averagePeriodLength;
  if (updatedHistory.length > 0) {
    let totalLength = 0;
    updatedHistory.forEach(period => {
      totalLength += differenceInDays(period.endDate, period.startDate) + 1;
    });
    
    averagePeriodLength = Math.round(totalLength / updatedHistory.length);
  }
  
  return {
    averageCycleLength,
    averagePeriodLength,
    periodHistory: updatedHistory,
    lastPeriodStartDate: new Date(lastPeriodStartDate)
  };
};

// Save data to localStorage
export const saveUserData = (userData: UserCycleData): void => {
  // Convert dates to strings for storage
  const dataForStorage = {
    ...userData,
    periodHistory: userData.periodHistory.map(period => ({
      startDate: period.startDate.toISOString(),
      endDate: period.endDate.toISOString()
    })),
    lastPeriodStartDate: userData.lastPeriodStartDate?.toISOString() || null
  };
  
  localStorage.setItem('auraMoonUserData', JSON.stringify(dataForStorage));
};

// Load data from localStorage
export const loadUserData = (): UserCycleData => {
  const storedData = localStorage.getItem('auraMoonUserData');
  
  if (!storedData) {
    return defaultUserData;
  }
  
  try {
    const parsedData = JSON.parse(storedData);
    
    // Convert strings back to Date objects
    return {
      ...parsedData,
      periodHistory: parsedData.periodHistory.map((period: any) => ({
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate)
      })),
      lastPeriodStartDate: parsedData.lastPeriodStartDate ? new Date(parsedData.lastPeriodStartDate) : null
    };
  } catch (error) {
    console.error("Error parsing stored user data:", error);
    return defaultUserData;
  }
};
