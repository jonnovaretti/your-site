import { UserAuthenticated } from '@apps/shared/types';
import { apiClient } from '@lib/api-client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserAuthenticated;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials,
    );
    return response.data;
  },

  register: async (data: LoginCredentials & { name: string }) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get<UserAuthenticated>('/auth/profile');
    return response.data;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
  },
};
