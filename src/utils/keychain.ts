// Purpose:

// Securely stores authentication tokens
// Provides methods for token management
// Uses device's secure storage system
// Handles token persistence between app launches

import * as Keychain from 'react-native-keychain';

const KEYCHAIN_USERNAME = 'auth_user';

export const storeAuthToken = async (token: string | null | undefined): Promise<boolean> => {
  try {
    if (!token || typeof token !== 'string' || token.trim() === '') {
      console.error('Invalid token provided to storeAuthToken:', token);
      throw new Error('Valid token is required');
    }
    
    await Keychain.setGenericPassword(KEYCHAIN_USERNAME, token);
    console.log('Token stored successfully');
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeAuthToken = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token removed successfully');
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};
