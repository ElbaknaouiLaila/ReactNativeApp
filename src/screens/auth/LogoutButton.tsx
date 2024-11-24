import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary';
  style?: object;
  showConfirmation?: boolean;
}

export const LogoutButton = ({ 
  variant = 'primary', 
  style,
  showConfirmation = true 
}: LogoutButtonProps) => {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const { handleLogout, isLogoutLoading } = useAuth();

  const onLogout = async () => {
    if (showConfirmation) {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                setIsLoggingOut(true);
                await handleLogout();
              } catch (error) {
                console.error('Logout failed:', error);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              } finally {
                setIsLoggingOut(false);
              }
            }
          }
        ]
      );
    } else {
      try {
        setIsLoggingOut(true);
        await handleLogout();
      } catch (error) {
        console.error('Logout failed:', error);
        Alert.alert('Error', 'Failed to logout. Please try again.');
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  const isDisabled = isLoggingOut || isLogoutLoading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        style,
        isDisabled && styles.buttonDisabled
      ]}
      onPress={onLogout}
      disabled={isDisabled}
    >
      {(isLoggingOut || isLogoutLoading) ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#007AFF'} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variant === 'secondary' && styles.buttonTextSecondary
          ]}
        >
          Logout
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#007AFF',
  },
});