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
      formatter: (value: number) => value.toString(),
    },
    {
      key: 'calories',
      label: 'Calories',
      unit: 'kcal',
      color: '#FF9500',
      formatter: (value: number) => value.toString(),
    },
  ];
  