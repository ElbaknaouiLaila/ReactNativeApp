import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface LogoutResponse {
    message: string;
    statusCode: number;
  }
  
  export const logoutApi = createApi({
    reducerPath: 'logoutApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://10.0.2.2:8009/api',
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
      logout: builder.mutation<LogoutResponse, void>({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
      }),
    }),
  });
  
  export const { useLogoutMutation } = logoutApi;