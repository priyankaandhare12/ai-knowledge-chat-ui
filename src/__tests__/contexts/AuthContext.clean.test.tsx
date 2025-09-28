import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth.service';

// Mock the auth service
jest.mock('../../services/auth.service');

const mockAuthService = authService as jest.Mocked<typeof authService>;

// Mock user data
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  picture: 'https://example.com/avatar.jpg',
  emailVerified: true,
};

// Test component to access the context
const TestComponent: React.FC = () => {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="user-info">{user ? `User: ${user.name} (${user.email})` : 'No user'}</div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not loading'}</div>
      <div data-testid="authenticated">
        {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </div>
      <button data-testid="login-button" onClick={login}>
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset auth service mocks
    mockAuthService.getUser = jest.fn();
    mockAuthService.login = jest.fn();
    mockAuthService.logout = jest.fn();
    mockAuthService.renewToken = jest.fn();
  });

  describe('AuthProvider', () => {
    it('should initialize with loading state and no user', async () => {
      mockAuthService.getUser.mockRejectedValue(new Error('No user'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Initially should be loading
      expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
      expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('Not authenticated');

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });
    });

    it('should initialize with user if auth service returns user', async () => {
      mockAuthService.getUser.mockResolvedValue(mockUser);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for user to be loaded
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });

      expect(mockAuthService.getUser).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockAuthService.getUser.mockRejectedValue(new Error('Network error'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
        expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Not authenticated');
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to initialize authentication:',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('login function', () => {
    it('should call authService.login', async () => {
      mockAuthService.getUser.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });

      const loginButton = screen.getByTestId('login-button');

      await act(async () => {
        loginButton.click();
      });

      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
    });

    // Note: Login error handling is tested implicitly through the auth flow
    // The login method re-throws errors after logging them
  });

  describe('logout function', () => {
    it('should call authService.logout and clear user', async () => {
      mockAuthService.getUser.mockResolvedValue(mockUser);
      mockAuthService.logout.mockResolvedValue();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for user to be loaded
      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
      });

      const logoutButton = screen.getByTestId('logout-button');

      await act(async () => {
        logoutButton.click();
      });

      expect(mockAuthService.logout).toHaveBeenCalledTimes(1);

      // User should be cleared after logout
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Not authenticated');
      });
    });
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });

    it('should return correct context values', async () => {
      mockAuthService.getUser.mockResolvedValue(mockUser);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Authenticated');
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });

      // Verify context methods are available
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });
  });
});
