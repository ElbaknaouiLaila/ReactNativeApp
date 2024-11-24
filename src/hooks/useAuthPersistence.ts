import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../auth/authSlice';
import { getAuthToken } from '../utils/keychain';
// import { useGetCurrentUserQuery } from '../auth/authAPI';

export const useAuthPersistence = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getAuthToken();
        
        if (token) {
          // If we have a token, fetch the current user
          const response = await fetch('http://10.0.2.2:8007/api/v1/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            dispatch(setCredentials({
              token,
              user: userData.data
            }));
          } else {
            // If the token is invalid or expired, it will be cleared in the error handler
            throw new Error('Failed to get user data');
          }
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        // Don't throw the error - just let the user stay logged out
      }
    };

    initializeAuth();
  }, [dispatch]);
};
