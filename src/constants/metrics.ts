export const MetricConfig = [
  {
    key: 'steps',
    label: 'Steps',
    unit: 'steps',
    color: '#007AFF',
    formatter: (value: number) => value.toLocaleString(),
  },
  {
    key: 'distance',
    label: 'Distance',
    unit: 'km',
    color: '#34C759',
    formatter: (value: number) => (value / 1000).toFixed(2), // Keep 2 decimals for km
  },
  {
    key: 'flights',
    label: 'Flights',
    unit: 'climbed',
    color: '#FF9500',
    formatter: (value: number) => value.toString(),
  },
  {
    key: 'heartRate',
    label: 'Heart Rate',
    unit: 'bpm',
    color: '#FF3B30',
    formatter: (value: number) => Math.round(value).toString(), // Whole numbers only
  },
  {
    key: 'calories',
    label: 'Active Calories',
    unit: 'kcal',
    color: '#FF9500',
    formatter: (value: number) => Math.round(value).toString(), // Whole numbers only
  },
  {
    key: 'basalCalories',
    label: 'Resting Calories',
    unit: 'kcal',
    color: '#34C759',
    formatter: (value: number) => Math.round(value).toString(), // Whole numbers only
  },
  {
    key: 'totalCalories',
    label: 'Total Calories',
    unit: 'kcal',
    color: '#FF6B35',
    formatter: (value: number) => Math.round(value).toString(), // Whole numbers only
  },
];
