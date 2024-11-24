// Purpose:

// Contains reusable validation functions
// Ensures consistent validation across the app
// Makes validation logic maintainable and testable

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };