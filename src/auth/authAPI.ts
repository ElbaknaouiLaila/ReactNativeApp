// Purpose:

// Handles all API calls related to authentication
// Uses RTK Query for efficient data fetching and caching
// Automatically handles authentication headers
// Provides hooks for API operations (useLoginMutation, etc.)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
    permissions: string[];
    statusCode: number;
    temporaryPassword: boolean;
  };
  message: string[];
  statusCode: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.2.2:8007/api/v1',
    prepareHeaders: async (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;