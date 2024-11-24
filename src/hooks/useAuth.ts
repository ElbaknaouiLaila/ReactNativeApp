// Purpose:

// Provides a clean interface for authentication operations
// Handles validation, error handling, and token storage
// Combines Redux state management with API calls
// Reusable across different components
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, setError } from '../auth/authSlice';
import { useLoginMutation } from '../auth/authAPI';
import { storeAuthToken } from '../utils/keychain';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

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

  return {
    handleLogin,
    isLoginLoading
  };
};