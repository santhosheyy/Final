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
    formatter: (value: number) => (value / 1000).toFixed(2),
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
    formatter: (value: number) => Math.round(value).toString(),
  },
  {
    key: 'standTime',
    label: 'Stand Time',
    unit: 'minutes',
    color: '#00D4AA',
    formatter: (value: number) => Math.round(value / 60).toString(),
  },
  {
    key: 'height',
    label: 'Height',
    unit: 'cm',
    color: '#5856D6',
    formatter: (value: number) => Math.round(value).toString(),
  },
  {
    key: 'weight',
    label: 'Weight',
    unit: 'kg',
    color: '#AF52DE',
    formatter: (value: number) => value.toFixed(1),
  },
  {
    key: 'biologicalSex',
    label: 'Biological Sex',
    unit: '',
    color: '#FF2D92',
    formatter: (value: string | number) => {
      const stringValue = typeof value === 'string' ? value : 'unknown';
      return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    },
  },
  {
    key: 'calories',
    label: 'Active Calories',
    unit: 'kcal',
    color: '#FF9500',
    formatter: (value: number) => Math.round(value).toString(),
  },
  {
    key: 'basalCalories',
    label: 'Resting Calories',
    unit: 'kcal',
    color: '#34C759',
    formatter: (value: number) => Math.round(value).toString(),
  },
  {
    key: 'totalCalories',
    label: 'Total Calories',
    unit: 'kcal',
    color: '#FF6B35',
    formatter: (value: number) => Math.round(value).toString(),
  },
];
