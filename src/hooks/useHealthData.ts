import { useEffect, useState } from 'react';
import AppleHealthKit, { 
  HealthValue, 
  HealthKitPermissions,
  HealthInputOptions 
} from 'react-native-health';

interface HealthData {
  steps: number;
  distance: number;
  flights: number;
  hasPermissions: boolean;
}

const useHealthData = (): HealthData => {
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);

  useEffect(() => {
    // Define what permissions we need
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

    // Initialize HealthKit
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!', error);
        return;
      }
      
      console.log('HealthKit initialized successfully');
      setHasPermissions(true);
      
      // Fetch today's data
      fetchHealthData();
    });
  }, []);

  const fetchHealthData = (): void => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options: HealthInputOptions = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    // Get steps
    AppleHealthKit.getStepCount(options, (error: string, results: HealthValue) => {
      if (error) {
        console.log('Error getting steps:', error);
        return;
      }
      setSteps(results.value || 0);
    });

    // Get distance
    AppleHealthKit.getDistanceWalkingRunning(options, (error: string, results: HealthValue) => {
      if (error) {
        console.log('Error getting distance:', error);
        return;
      }
      setDistance(results.value || 0);
    });

    // Get flights climbed
    AppleHealthKit.getFlightsClimbed(options, (error: string, results: HealthValue) => {
      if (error) {
        console.log('Error getting flights:', error);
        return;
      }
      setFlights(results.value || 0);
    });
  };

  // Add real-time updates
  useEffect(() => {
    if (hasPermissions) {
      const interval = setInterval(fetchHealthData, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [hasPermissions]);

  return { steps, distance, flights, hasPermissions };
};

export default useHealthData;
