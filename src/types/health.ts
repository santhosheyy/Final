export interface HealthMetrics {
    steps: number;
    distance: number;
    flights: number;
    calories?: number;
    heartRate?: number;
  }
  
  export interface HealthHookReturn {
    data: HealthMetrics;
    isLoading: boolean;
    hasPermissions: boolean;
    error: string | null;
    refreshData: () => void;
  }
  
  export type HealthPermission = 
    | 'Steps'
    | 'DistanceWalkingRunning'
    | 'FlightsClimbed'
    | 'HeartRate'
    | 'ActiveEnergyBurned';
  