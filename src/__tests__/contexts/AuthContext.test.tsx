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
  const { user, isLoading, isAuthenticated, login, logout, renewToken, refreshUser } = useAuth();

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
      <button data-testid="renew-token-button" onClick={renewToken}>
        Renew Token
      </button>
      <button data-testid="refresh-user-button" onClick={refreshUser}>
        Refresh User
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
    it('should call authService.login and set loading state', async () => {
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

    it('should handle login errors and reset loading state', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockAuthService.getUser.mockResolvedValue(null);
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));

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

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });

      expect(consoleSpy).toHaveBeenCalledWith('Login failed:', expect.any(Error));
      consoleSpy.mockRestore();
    });
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

    it('should handle logout errors and reset loading state', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockAuthService.getUser.mockResolvedValue(mockUser);
      mockAuthService.logout.mockRejectedValue(new Error('Logout failed'));

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
      expect(consoleSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error));

      // Loading should be reset even on error
      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('Not loading');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('renewToken function', () => {
    it('should call authService.renewToken and update user', async () => {
      const updatedUser = { ...mockUser, name: 'Updated User' };
      mockAuthService.getUser.mockResolvedValue(mockUser);
      mockAuthService.renewToken.mockResolvedValue(updatedUser);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial user load
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
      });

      const renewTokenButton = screen.getByTestId('renew-token-button');

      await act(async () => {
        renewTokenButton.click();
      });

      expect(mockAuthService.renewToken).toHaveBeenCalledTimes(1);

      // User should be updated with renewed token
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Updated User (test@example.com)'
        );
      });
    });

    it('should handle token renewal errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockAuthService.getUser.mockResolvedValue(mockUser);
      mockAuthService.renewToken.mockRejectedValue(new Error('Token renewal failed'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial user load
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
      });

      const renewTokenButton = screen.getByTestId('renew-token-button');

      await act(async () => {
        renewTokenButton.click();
      });

      expect(mockAuthService.renewToken).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith('Token renewal failed:', expect.any(Error));

      // User should remain unchanged on renewal error
      expect(screen.getByTestId('user-info')).toHaveTextContent(
        'User: Test User (test@example.com)'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('refreshUser function', () => {
    it('should call authService.getUser and update user', async () => {
      const updatedUser = { ...mockUser, name: 'Refreshed User' };
      mockAuthService.getUser
        .mockResolvedValueOnce(mockUser) // Initial load
        .mockResolvedValueOnce(updatedUser); // Refresh call

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial user load
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
      });

      const refreshUserButton = screen.getByTestId('refresh-user-button');

      await act(async () => {
        refreshUserButton.click();
      });

      expect(mockAuthService.getUser).toHaveBeenCalledTimes(2);

      // User should be updated with refreshed data
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Refreshed User (test@example.com)'
        );
      });
    });

    it('should handle refresh user errors and clear user', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockAuthService.getUser
        .mockResolvedValueOnce(mockUser) // Initial load
        .mockRejectedValueOnce(new Error('Refresh failed')); // Refresh call

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial user load
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
      });

      const refreshUserButton = screen.getByTestId('refresh-user-button');

      await act(async () => {
        refreshUserButton.click();
      });

      expect(mockAuthService.getUser).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith('Failed to refresh user:', expect.any(Error));

      // User should be cleared on refresh error
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
        expect(screen.getByTestId('authenticated')).toHaveTextContent('Not authenticated');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('window focus handling', () => {
    it('should refresh user when window gains focus', async () => {
      const refreshedUser = { ...mockUser, name: 'Focus Refreshed User' };
      mockAuthService.getUser
        .mockResolvedValueOnce(mockUser) // Initial load
        .mockResolvedValueOnce(refreshedUser); // Focus refresh

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial user load
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Test User (test@example.com)'
        );
      });

      // Simulate window focus event
      await act(async () => {
        window.dispatchEvent(new Event('focus'));
      });

      await waitFor(() => {
        expect(mockAuthService.getUser).toHaveBeenCalledTimes(2);
      });

      // User should be updated with focus refresh data
      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent(
          'User: Focus Refreshed User (test@example.com)'
        );
      });
    });

    it('should not refresh user on focus when loading', async () => {
      mockAuthService.getUser.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Component should be loading
      expect(screen.getByTestId('loading')).toHaveTextContent('Loading');

      // Simulate window focus event while loading
      await act(async () => {
        window.dispatchEvent(new Event('focus'));
      });

      // Should only have been called once (for initialization)
      expect(mockAuthService.getUser).toHaveBeenCalledTimes(1);
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

      // Verify all context methods are available
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
      expect(screen.getByTestId('renew-token-button')).toBeInTheDocument();
      expect(screen.getByTestId('refresh-user-button')).toBeInTheDocument();
    });
  });
});
