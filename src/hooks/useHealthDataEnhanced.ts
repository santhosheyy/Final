import { useEffect, useState, useCallback } from 'react';
import AppleHealthKit, { 
  HealthValue, 
  HealthKitPermissions,
  HealthInputOptions 
} from 'react-native-health';
import { HealthHookReturn, HealthMetrics } from '../types/health';

const useHealthDataEnhanced = (): HealthHookReturn => {
  const [data, setData] = useState<HealthMetrics>({
    steps: 0,
    distance: 0,
    flights: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeHealthKit = useCallback(() => {
    const permissions: HealthKitPermissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
        ],
        write: [],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (initError: string) => {
      if (initError) {
        setError(`Failed to initialize HealthKit: ${initError}`);
        setIsLoading(false);
        return;
      }
      
      setHasPermissions(true);
      setError(null);
      refreshData();
    });
  }, []);

  const refreshData = useCallback((): void => {
    if (!hasPermissions) return;
    
    setIsLoading(true);
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options: HealthInputOptions = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    Promise.all([
      new Promise<number>((resolve, reject) => {
        AppleHealthKit.getStepCount(options, (err: string, results: HealthValue) => {
          if (err) reject(err);
          else resolve(results.value || 0);
        });
      }),
      new Promise<number>((resolve, reject) => {
        AppleHealthKit.getDistanceWalkingRunning(options, (err: string, results: HealthValue) => {
          if (err) reject(err);
          else resolve(results.value || 0);
        });
      }),
      new Promise<number>((resolve, reject) => {
        AppleHealthKit.getFlightsClimbed(options, (err: string, results: HealthValue) => {
          if (err) reject(err);
          else resolve(results.value || 0);
        });
      }),
    ])
    .then(([steps, distance, flights]) => {
      setData({ steps, distance, flights });
      setError(null);
    })
    .catch((fetchError) => {
      setError(`Failed to fetch health data: ${fetchError}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [hasPermissions]);

  useEffect(() => {
    initializeHealthKit();
  }, [initializeHealthKit]);

  useEffect(() => {
    if (hasPermissions) {
      const interval = setInterval(refreshData, 30000);
      return () => clearInterval(interval);
    }
  }, [hasPermissions, refreshData]);

  return { data, isLoading, hasPermissions, error, refreshData };
};

export default useHealthDataEnhanced;
