import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, { 
  HealthValue, 
  HealthKitPermissions,
  HealthInputOptions 
} from 'react-native-health';

interface HealthData {
  steps: number;
  distance: number;
  flights: number;
  heartRate: number;
  calories: number;
  hasPermissions: boolean;
  isHealthKitAvailable: boolean;
}

const useHealthData = (): HealthData => {
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [isHealthKitAvailable, setIsHealthKitAvailable] = useState<boolean>(false);

  useEffect(() => {
    // Restrict HealthKit for iOS devices only
    if (Platform.OS !== 'ios') {
      console.log('HealthKit is only available on iOS');
      return;
    }

    // Check if HealthKit is available before initializing
    AppleHealthKit.isAvailable((err: Object, available: boolean) => {
      if (err) {
        console.log('Error checking HealthKit availability:', err);
        return;
      }
      
      setIsHealthKitAvailable(available);
      
      if (available) {
        console.log('HealthKit is available - initializing...');
        initializeHealthKit();
      } else {
        console.log('HealthKit is not available on this device');
      }
    });
  }, []);

  const initializeHealthKit = () => {
    const permissions: HealthKitPermissions = {
      permissions: {
        read: [
          // Activity & Fitness
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
          AppleHealthKit.Constants.Permissions.DistanceCycling,
          AppleHealthKit.Constants.Permissions.FlightsClimbed,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
          
          // Heart & Vitals
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.RestingHeartRate,
          AppleHealthKit.Constants.Permissions.HeartRateVariability,
          
          // Body Measurements
          AppleHealthKit.Constants.Permissions.Height,
          AppleHealthKit.Constants.Permissions.Weight,
          AppleHealthKit.Constants.Permissions.BodyMass,
          AppleHealthKit.Constants.Permissions.BodyMassIndex,
          
          // Sleep & Mindfulness
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.MindfulSession,
          
          // Apple Watch Specific
          AppleHealthKit.Constants.Permissions.AppleExerciseTime,
          AppleHealthKit.Constants.Permissions.AppleStandTime,
          
          // Workouts
          AppleHealthKit.Constants.Permissions.Workout,
        ],
        write: [
          // Allow writing basic activity data
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
        ],
      },
    };

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!', error);
        return;
      }
      
      console.log('HealthKit initialized successfully');
      setHasPermissions(true);
    });
  };

  // Query Health data when permissions are granted
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }
    fetchHealthData();
  }, [hasPermissions]);

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

    // Get heart rate (latest sample)
    AppleHealthKit.getHeartRateSamples(options, (error: string, results: HealthValue[]) => {
      if (error) {
        console.log('Error getting heart rate:', error);
        return;
      }
      if (results.length > 0) {
        setHeartRate(results[0].value || 0);
      }
    });

    // Get active calories burned
    AppleHealthKit.getActiveEnergyBurned(options, (error: string, results: HealthValue[]) => {
      if (error) {
        console.log('Error getting calories:', error);
        return;
      }
      if (results.length > 0) {
        const totalCalories = results.reduce((sum, item) => sum + (item.value || 0), 0);
        setCalories(totalCalories);
      }
    });
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (hasPermissions) {
      const interval = setInterval(fetchHealthData, 30000);
      return () => clearInterval(interval);
    }
  }, [hasPermissions]);

  return { steps, distance, flights, heartRate, calories, hasPermissions, isHealthKitAvailable };
};

export default useHealthData;
