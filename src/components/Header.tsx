import React from 'react';
import { View, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

interface HeaderProps {
  textColor: string;
}

const Header: React.FC<HeaderProps> = ({ textColor }) => {
  return (
    <View style={AppStyles.header}>
      <Text style={[AppStyles.title, { color: textColor }]}>
        Health Dashboard
      </Text>
      <Text style={[AppStyles.subtitle, { color: textColor }]}>
        Today's Activity • Live Updates
      </Text>
    </View>
  );
};

export default Header;
