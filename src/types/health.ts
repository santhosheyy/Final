export interface HealthMetrics {
  steps: number;
  distance: number;
  flights: number;
  heartRate: number;
  standTime: number;
  height: number;
  weight: number;
  biologicalSex: string;
  calories: number;
  basalCalories: number;
  totalCalories: number;
  hasPermissions: boolean;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export interface HealthHookReturn extends HealthMetrics {}

export type HealthPermission = 
  | 'Steps'
  | 'DistanceWalkingRunning'
  | 'FlightsClimbed'
  | 'HeartRate'
  | 'ActiveEnergyBurned'
  | 'BasalEnergyBurned'
  | 'AppleStandTime'
  | 'Height'
  | 'BodyMass'
  | 'BiologicalSex';
