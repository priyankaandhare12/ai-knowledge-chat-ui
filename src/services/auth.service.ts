import axios from 'axios';
import { config } from '@/config';

// User type for our backend API
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  emailVerified: boolean;
}

// Custom error for domain restrictions
export class DomainNotAllowedError extends Error {
  constructor(email: string, message?: string) {
    super(message || `Access denied for domain: ${email.split('@')[1]}`);
    this.name = 'DomainNotAllowedError';
  }
}

// API client for backend communication
const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  console.log('🔍 API Request:', config.url, 'Token present:', !!token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header added');
  }
  return config;
});

// Add response interceptor to log errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('❌ API Error:', error.config?.url, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export class AuthService {
  // Authentication methods
  async login(): Promise<void> {
    try {
      // Get login URL from backend
      const response = await apiClient.get('/api/auth/login', {
        params: {
          returnTo: window.location.origin + '/auth/callback',
        },
      });

      if (response.data.success && response.data.loginUrl) {
        // Redirect to Auth0 via backend
        window.location.href = response.data.loginUrl;
      } else {
        throw new Error('Failed to get login URL');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear local token first
      localStorage.removeItem('auth_token');

      const response = await apiClient.post('/api/auth/logout', {
        returnTo: window.location.origin,
      });

      if (response.data.success && response.data.logoutUrl) {
        // Redirect to Auth0 logout - this will clear Auth0 session
        window.location.href = response.data.logoutUrl;

        // Set a timeout to redirect back to home after logout
        // This is a fallback in case Auth0 doesn't redirect back
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        // Fallback: just redirect to home
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Clear token and redirect to home
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
  }

  async handleCallback(): Promise<User | null> {
    // Check URL for token from backend redirect
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const authStatus = urlParams.get('auth');

    if (token && authStatus === 'success') {
      // Store token for future API calls
      localStorage.setItem('auth_token', token);

      // Clean the URL
      window.history.replaceState({}, '', window.location.pathname);

      // Get user info to verify token works
      return await this.getUser();
    }

    console.log('No token found in callback URL');
    return null;
  }

  async handleSilentCallback(): Promise<void> {
    // No longer needed with backend authentication
    console.log('Silent callback not needed with backend auth');
  }

  // User management
  async getUser(): Promise<User | null> {
    try {
      const response = await apiClient.get('/api/auth/user');

      if (response.data.success && response.data.authenticated) {
        return response.data.user;
      }

      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await apiClient.get('/api/auth/status');
      return response.data.success && response.data.authenticated;
    } catch (error) {
      console.error('Auth status check error:', error);
      return false;
    }
  }

  // Validate if user's domain is allowed (now handled by backend)
  async validateUserDomain(): Promise<boolean> {
    const user = await this.getUser();
    return !!user; // If user exists, domain is already validated by backend
  }

  async getAccessToken(): Promise<string | null> {
    // With HTTP-only cookies, frontend doesn't need direct access to tokens
    // Backend automatically includes auth headers
    return null;
  }

  async renewToken(): Promise<User | null> {
    // Token renewal is handled automatically by the backend
    return await this.getUser();
  }

  // Utility methods
  async getUserProfile(): Promise<User | null> {
    return this.getUser();
  }

  async removeUser(): Promise<void> {
    // User is removed on logout
    await this.logout();
  }

  // Get authentication status and domain restrictions info
  async getAuthStatus(): Promise<{
    authenticated: boolean;
    domainRestrictions: {
      enabled: boolean;
      allowedDomains: string[];
      allowAllGmail: boolean;
    };
  }> {
    try {
      const response = await apiClient.get('/api/auth/status');
      return {
        authenticated: response.data.authenticated,
        domainRestrictions: response.data.domainRestrictions,
      };
    } catch (error) {
      console.error('Get auth status error:', error);
      return {
        authenticated: false,
        domainRestrictions: {
          enabled: false,
          allowedDomains: [],
          allowAllGmail: true,
        },
      };
    }
  }
}

// Create singleton instance
export const authService = new AuthService();
