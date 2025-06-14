import { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import AppleHealthKit from 'react-native-health';

const useBackgroundHealthObserver = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.AppleHealthKit);
    
    // Only use officially supported observer types
    const observers = [
      'StepCount',
      'HeartRate',
      'Walking',
      'Running',
      'ActiveEnergyBurned',
      'BasalEnergyBurned',
      'StairClimbing',        // This is the correct one for flights climbed
      'Cycling',
      'HeartRateVariabilitySDNN',
      'RestingHeartRate',
      'Swimming',
      'Vo2Max',
      'Workout',
      'SleepAnalysis',
      'InsulinDelivery',
    ];

    const listeners: any[] = [];

    observers.forEach(type => {
      // Listen for setup success
      const setupSuccessListener = eventEmitter.addListener(
        `healthKit:${type}:setup:success`,
        () => {
          console.log(`✅ ${type} observer setup successfully`);
        }
      );

      // Listen for setup failure
      const setupFailureListener = eventEmitter.addListener(
        `healthKit:${type}:setup:failure`,
        (error) => {
          console.log(`❌ ${type} observer setup failed:`, error);
        }
      );
      
      // Listen for new data
      const newDataListener = eventEmitter.addListener(
        `healthKit:${type}:new`,
        async () => {
          console.log(`🔄 New ${type} data received`);
          await fetchLatestHealthData(type);
        }
      );
      
      // Listen for errors
      const errorListener = eventEmitter.addListener(
        `healthKit:${type}:failure`,
        (error) => {
          console.log(`⚠️ ${type} observer error:`, error);
        }
      );

      listeners.push(setupSuccessListener, setupFailureListener, newDataListener, errorListener);
    });

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, []);
  
  const fetchLatestHealthData = async (type: string) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const options = {
      startDate: startOfDay.toISOString(),
      endDate: today.toISOString(),
    };

    switch (type) {
      case 'StepCount':
        AppleHealthKit.getStepCount(options, (error: Object, results: any) => {
          if (!error) {
            console.log('Background - Latest steps:', results.value);
          }
        });
        break;
        
      case 'Walking':
        AppleHealthKit.getDistanceWalkingRunning(options, (error: Object, results: any) => {
          if (!error) {
            console.log('Background - Latest walking distance:', results.value);
          }
        });
        break;
        
      case 'HeartRate':
        AppleHealthKit.getHeartRateSamples(options, (error: Object, results: any[]) => {
          if (!error && results.length > 0) {
            console.log('Background - Latest heart rate:', results[0].value);
          }
        });
        break;
        
      case 'Running':
        AppleHealthKit.getDistanceWalkingRunning(options, (error: Object, results: any) => {
          if (!error) {
            console.log('Background - Latest running distance:', results.value);
          }
        });
        break;
        
      case 'ActiveEnergyBurned':
        AppleHealthKit.getActiveEnergyBurned(options, (error: Object, results: any[]) => {
          if (!error && results.length > 0) {
            console.log('Background - Latest calories burned:', results[0].value);
          }
        });
        break;
        
      case 'StairClimbing':  // This handles flights climbed data
        AppleHealthKit.getFlightsClimbed(options, (error: Object, results: any) => {
          if (!error) {
            console.log('Background - Latest flights climbed:', results.value);
          }
        });
        break;
        
      case 'Cycling':
        AppleHealthKit.getDistanceCycling(options, (error: Object, results: any) => {
          if (!error) {
            console.log('Background - Latest cycling distance:', results.value);
          }
        });
        break;
        
      default:
        console.log(`No handler implemented for observer type: ${type}`);
        break;
    }
  };
};

export default useBackgroundHealthObserver;
