import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import LoadingScreen from   '../screens/LoadingScreen';
import { getAuthToken } from '../utils/keychain';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../auth/authSlice';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          // Here you might want to validate the token or fetch user data
          // For now, we'll just set the credentials
          dispatch(
            setCredentials({
              token,
              user: null // You might want to decode the token to get user info
            })
          );
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;