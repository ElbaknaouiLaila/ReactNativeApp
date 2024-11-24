import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from './types';
import HomeScreen from '../screens/main/HomeScreen';
// import HomeScreen from '../screens/main/HomeScreen';
// import ProfileScreen from '../screens/main/ProfileScreen';
// import SettingsScreen from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
