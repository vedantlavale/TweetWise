import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface AuthResponse {
  token: string;
  userId: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}

export const authService = {
  async signup(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, credentials);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      return { token, userId };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Signup failed');
      }
      throw error;
    }
  },

  async login(credentials: Omit<UserCredentials, 'name'>): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      return { token, userId };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}; 