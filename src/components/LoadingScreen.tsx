import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LoadingStyles } from '../styles/AppStyles';

interface LoadingScreenProps {
  isDarkMode: boolean;
  textColor: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isDarkMode, textColor }) => {
  return (
    <View style={LoadingStyles.container}>
      <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#333'} />
      <Text style={[LoadingStyles.text, { color: textColor }]}>
        Requesting HealthKit permissions...
      </Text>
    </View>
  );
};

export default LoadingScreen;
