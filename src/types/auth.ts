export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthHookReturn {
  handleLogin: (email: string, password: string) => Promise<LoginResponse>;
  handleLogout: () => Promise<void>;
  isLoginLoading: boolean;
}