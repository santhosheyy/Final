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
  Text,
  View,
  useColorScheme,
  ScrollView,
} from 'react-native';
import useHealthData from './src/hooks/useHealthData';
import useBackgroundHealthObserver from './src/services/backgroundHealthObserver';
import { Colors } from './src/constants/colors';
import { MetricConfig } from './src/constants/metrics';
import { AppStyles } from './src/styles/AppStyles';
import MetricCard from './src/components/MetricCard';
import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const healthData = useHealthData();
  
  useBackgroundHealthObserver();

  const theme = isDarkMode ? Colors.dark : Colors.light;
  const backgroundStyle = { backgroundColor: theme.background };
  const textColor = theme.text;

  if (!healthData.hasPermissions) {
    return (
      <SafeAreaView style={[AppStyles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <LoadingScreen isDarkMode={isDarkMode} textColor={textColor} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[AppStyles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <ScrollView 
        style={AppStyles.scrollContainer}
        contentContainerStyle={AppStyles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Header textColor={textColor} />

        <View style={AppStyles.metricsContainer}>
          {MetricConfig.map((metric) => (
            <MetricCard
              key={metric.key}
              label={metric.label}
              value={metric.formatter(healthData[metric.key as keyof typeof healthData] as number)}
              unit={metric.unit}
              color={metric.color}
              isDarkMode={isDarkMode}
              textColor={textColor}
            />
          ))}
        </View>

        <View style={AppStyles.footer}>
          <Text style={[AppStyles.footerText, { color: textColor }]}>
            Data synced from Apple Health • Background updates enabled
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
