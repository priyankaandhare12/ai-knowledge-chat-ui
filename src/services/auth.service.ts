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

export class AuthService {
  // Authentication methods
  async login(): Promise<void> {
    try {
      // Get login URL from backend
      const response = await apiClient.get('/api/auth/login', {
        params: {
          returnTo: window.location.origin + '/home',
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
      const response = await apiClient.post('/api/auth/logout', {
        returnTo: window.location.origin,
      });

      if (response.data.success && response.data.logoutUrl) {
        // Redirect to Auth0 logout - this will clear Auth0 session
        // Since returnTo is temporarily disabled, we'll handle redirect manually
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
      // Fallback: redirect to home
      window.location.href = '/';
    }
  }

  async handleCallback(): Promise<User | null> {
    // No longer needed - backend handles the callback
    // This method is kept for compatibility but does nothing
    console.log('Callback handled by backend');
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
