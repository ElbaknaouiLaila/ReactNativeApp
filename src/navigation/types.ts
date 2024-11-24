// Purpose:

// Defines navigation structure types
// Enables type-safe navigation
// Makes navigation params explicit


export type RootStackParamList = {
    Welcome: undefined;
    Auth: undefined;
    Main: undefined;
  };
  
  export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
  };
  
  export type MainStackParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
  };
  