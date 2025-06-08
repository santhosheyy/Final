import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  color: string;
  isDarkMode: boolean;
  textColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  color,
  isDarkMode,
  textColor,
}) => {
  return (
    <View style={[
      styles.metricCard, 
      { backgroundColor: isDarkMode ? Colors.dark.surface : Colors.light.surface }
    ]}>
      <Text style={[styles.metricLabel, { color: textColor }]}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={[styles.metricUnit, { color: textColor }]}>{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow.color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: Colors.shadow.radius,
    elevation: Colors.shadow.elevation,
    minHeight: 120,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
});

export default MetricCard;
