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
    padding: 16, // Reduced padding for more cards
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
    minHeight: 100, // Reduced height for more cards
  },
  metricLabel: {
    fontSize: 14, // Slightly smaller
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.7,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 32, // Reduced for more cards
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
});

export default MetricCard;
