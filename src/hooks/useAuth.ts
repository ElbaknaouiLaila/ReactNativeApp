// Purpose:

// Provides a clean interface for authentication operations
// Handles validation, error handling, and token storage
// Combines Redux state management with API calls
// Reusable across different components
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, setError ,logout} from '../auth/authSlice';
import { useLoginMutation } from '../auth/authAPI';
import { storeAuthToken, removeAuthToken } from '../utils/keychain';
import { authApi } from '../auth/authAPI';
import { Alert } from 'react-native';
import { useLogoutMutation } from '../auth/logoutApi';


export const useAuth = () => {
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();


  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await login({ email, password }).unwrap();
        
        if (!result?.data?.token) {
          throw new Error('No token received from server');
        }

        const token = result.data.token;
        await storeAuthToken(token);
        
        dispatch(setCredentials({
          token,
          user: {
            permissions: result.data.permissions
          }
        }));
        
        return result;
      } catch (error: any) {
        console.error('Login error:', error);
        const errorMessage = error?.data?.message || error.message || 'Login failed';
        dispatch(setError(errorMessage));
        throw error;
      }
    },
    [login, dispatch]
  );
  const handleLogout = useCallback(async () => {
    try {
      await logoutApi().unwrap();
      
      // Clear local state after successful logout
      await removeAuthToken();
      dispatch(logout());
      
      return true;
    } catch (error: any) {
      console.error('Logout error:', error);
      
      // Handle network errors
      if (error?.status === 'FETCH_ERROR') {
        Alert.alert(
          'Network Error',
          'Unable to reach the server. Would you like to logout locally?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Logout Anyway',
              style: 'destructive',
              onPress: async () => {
                await removeAuthToken();
                dispatch(logout());
              }
            }
          ]
        );
        return false;
      }
      
      // Handle other errors
      const errorMessage = error?.data?.message || error.message || 'Logout failed';
      Alert.alert('Error', errorMessage);
      return false;
    }
  }, [dispatch, logoutApi]);

  return {
    handleLogin,
    handleLogout,
    isLoginLoading,
    isLogoutLoading
  };
};