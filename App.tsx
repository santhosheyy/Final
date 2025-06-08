/**
 * Health Data React Native App
 * Displays steps, distance, and flights climbed from Apple HealthKit
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import useHealthData from './src/hooks/useHealthData';
import useBackgroundHealthObserver from './src/services/backgroundHealthObserver';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { steps, distance, flights, hasPermissions } = useHealthData();

  // Initialize background observers for real-time health data updates
  useBackgroundHealthObserver();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const textColor = isDarkMode ? '#fff' : '#333';

  if (!hasPermissions) {
    return (
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#333'} />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Requesting HealthKit permissions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Health Dashboard
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Today's Activity • Live Updates
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={[styles.metricCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Steps</Text>
          <Text style={[styles.metricValue, { color: '#007AFF' }]}>
            {steps.toLocaleString()}
          </Text>
          <Text style={[styles.metricUnit, { color: textColor }]}>steps</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Distance</Text>
          <Text style={[styles.metricValue, { color: '#34C759' }]}>
            {(distance / 1000).toFixed(2)}
          </Text>
          <Text style={[styles.metricUnit, { color: textColor }]}>km</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
          <Text style={[styles.metricLabel, { color: textColor }]}>Flights</Text>
          <Text style={[styles.metricValue, { color: '#FF9500' }]}>
            {flights}
          </Text>
          <Text style={[styles.metricUnit, { color: textColor }]}>climbed</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: textColor }]}>
          Data synced from Apple Health • Background updates enabled
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    opacity: 0.7,
  },
  metricsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 20,
  },
  metricCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.6,
  },
});

export default App;
