import { useEffect, useState, useCallback } from 'react';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import { Platform } from 'react-native';
import { HealthDateOfBirth } from '../types/health';

const useHealthData = () => {
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [flights, setFlights] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [standTime, setStandTime] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [biologicalSex, setBiologicalSex] = useState<string>('unknown');
  const [age, setAge] = useState<number>(0);
  const [calories, setCalories] = useState<number>(0);
  const [basalCalories, setBasalCalories] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [hasPermissions, setHasPermissions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const permissions: HealthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
        AppleHealthKit.Constants.Permissions.FlightsClimbed,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
        AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
        AppleHealthKit.Constants.Permissions.AppleStandTime,
        AppleHealthKit.Constants.Permissions.Height,
        AppleHealthKit.Constants.Permissions.Weight,
        AppleHealthKit.Constants.Permissions.BiologicalSex,
        AppleHealthKit.Constants.Permissions.DateOfBirth,
      ],
      write: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.Weight,
        AppleHealthKit.Constants.Permissions.Height,
      ],
    },
  };

  const initHealthKit = useCallback(() => {
    if (Platform.OS !== 'ios') {
      setError('HealthKit is only available on iOS');
      setIsLoading(false);
      return;
    }

    AppleHealthKit.isAvailable((error: Object, available: boolean) => {
      if (error) {
        setError(`HealthKit not available: ${error}`);
        setIsLoading(false);
        return;
      }

      if (!available) {
        setError('HealthKit is not available on this device');
        setIsLoading(false);
        return;
      }

      setIsAvailable(true);

      AppleHealthKit.initHealthKit(permissions, (initError: Object) => {
        if (initError) {
          setError(`Failed to initialize HealthKit: ${initError}`);
          setIsLoading(false);
          return;
        }

        setHasPermissions(true);
        setError(null);
        fetchAllData();
      });
    });
  }, []);

  const getSteps = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getStepCount(options, (error: Object, results: any) => {
      if (error) {
        console.log('Error getting steps:', error);
        return;
      }
      console.log('Steps:', results.value);
      setSteps(results.value || 0);
    });
  };

  const getDistance = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getDistanceWalkingRunning(options, (error: Object, results: any) => {
      if (error) {
        console.log('Error getting distance:', error);
        return;
      }
      console.log('Distance:', results.value);
      setDistance(results.value || 0);
    });
  };

  const getFlights = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getFlightsClimbed(options, (error: Object, results: any) => {
      if (error) {
        console.log('Error getting flights:', error);
        return;
      }
      console.log('Flights:', results.value);
      setFlights(results.value || 0);
    });
  };

  const getHeartRate = () => {
    const options = {
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getHeartRateSamples(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting heart rate:', error);
        return;
      }
      if (results && results.length > 0) {
        const latestHeartRate = results[results.length - 1];
        console.log('Heart Rate:', latestHeartRate.value);
        setHeartRate(latestHeartRate.value || 0);
      }
    });
  };

  const getActiveCalories = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getActiveEnergyBurned(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting active calories:', error);
        return;
      }
      if (results && results.length > 0) {
        const totalActiveCalories = results.reduce((sum, sample) => sum + sample.value, 0);
        console.log('Active Calories:', totalActiveCalories);
        setCalories(totalActiveCalories);
      }
    });
  };

  const getBasalCalories = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getBasalEnergyBurned(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting basal calories:', error);
        return;
      }
      if (results && results.length > 0) {
        const totalBasalCalories = results.reduce((sum, sample) => sum + sample.value, 0);
        console.log('Basal Calories:', totalBasalCalories);
        setBasalCalories(totalBasalCalories);
      }
    });
  };

  const getStandTime = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    AppleHealthKit.getAppleStandTime(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting stand time:', error);
        return;
      }
      if (results && results.length > 0) {
        const totalStandTime = results.reduce((sum, sample) => sum + sample.value, 0);
        console.log('Stand Time:', totalStandTime);
        setStandTime(totalStandTime);
      }
    });
  };

  const getHeight = () => {
    const options = {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getHeightSamples(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting height:', error);
        return;
      }
      if (results && results.length > 0) {
        const heights = results.map(sample => sample.value);
        const averageHeight = heights.reduce((sum, height) => sum + height, 0) / heights.length;
        console.log('Height:', averageHeight);
        setHeight(averageHeight);
      }
    });
  };

  const getWeight = () => {
    const options = {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    };

    AppleHealthKit.getWeightSamples(options, (error: Object, results: any[]) => {
      if (error) {
        console.log('Error getting weight:', error);
        return;
      }
      if (results && results.length > 0) {
        const latestWeight = results[results.length - 1];
        console.log('Weight:', latestWeight.value);
        setWeight(latestWeight.value);
      }
    });
  };

  const getBiologicalSex = () => {
    AppleHealthKit.getBiologicalSex({}, (error: Object, results: any) => {
      if (error) {
        console.log('Error getting biological sex:', error);
        return;
      }
      console.log('Biological Sex:', results.value);
      setBiologicalSex(results.value || 'unknown');
    });
  };

  const getDateOfBirth = () => {
    AppleHealthKit.getDateOfBirth({}, (error: Object, results: HealthDateOfBirth) => {
      if (error) {
        console.log('Error getting date of birth:', error);
        return;
      }
      console.log('Date of Birth:', results);
      setAge(results.age || 0);
    });
  };

  const fetchAllData = useCallback(() => {
    if (!hasPermissions) return;
    
    setIsLoading(true);
    
    getSteps();
    getDistance();
    getFlights();
    getHeartRate();
    getActiveCalories();
    getBasalCalories();
    getStandTime();
    getHeight();
    getWeight();
    getBiologicalSex();
    getDateOfBirth();
    
    setIsLoading(false);
  }, [hasPermissions]);

  const refreshData = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    initHealthKit();
  }, [initHealthKit]);

  useEffect(() => {
    if (hasPermissions) {
      const interval = setInterval(fetchAllData, 30000);
      return () => clearInterval(interval);
    }
  }, [hasPermissions, fetchAllData]);

  useEffect(() => {
    setTotalCalories(calories + basalCalories);
  }, [calories, basalCalories]);

  return {
    steps,
    distance,
    flights,
    heartRate,
    standTime,
    height,
    weight,
    biologicalSex,
    age,
    calories,
    basalCalories,
    totalCalories,
    hasPermissions,
    isLoading,
    error,
    isAvailable,
    refreshData,
  };
};

export default useHealthData;
