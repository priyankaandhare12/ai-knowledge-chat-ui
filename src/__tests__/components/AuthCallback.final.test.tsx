import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the config module before importing component
jest.mock('@/config', () => ({
  config: {
    apiUrl: 'http://localhost:3001',
    domainRestrictions: { enabled: false, allowedDomains: [] },
  },
}));

// Mock functions
const mockNavigate = jest.fn();
const mockSearchParams = {
  get: jest.fn((_key: string) => null) as jest.MockedFunction<(key: string) => string | null>,
};
const mockRefreshUser = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams, jest.fn()],
}));

// Mock AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    refreshUser: mockRefreshUser,
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock history.replaceState
const mockReplaceState = jest.fn();
Object.defineProperty(window.history, 'replaceState', {
  value: mockReplaceState,
  writable: true,
});

import { AuthCallback } from '../../components/AuthCallback';

// Component wrapper for testing
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('AuthCallback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset localStorage mock
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});

    // Reset history mock
    mockReplaceState.mockImplementation(() => {});

    // Reset searchParams mock
    mockSearchParams.get.mockReturnValue(null);

    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial Render', () => {
    it('should render loading state initially', () => {
      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      expect(screen.getByText('Completing sign-in...')).toBeInTheDocument();
      expect(
        screen.getByText('Please wait while we complete your authentication.')
      ).toBeInTheDocument();
    });
  });

  describe('Successful Authentication', () => {
    it('should handle successful authentication with token', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          case 'token':
            return 'test-jwt-token';
          default:
            return null;
        }
      });

      mockRefreshUser.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Wait for token storage
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'test-jwt-token');
      });

      // Wait for user refresh
      await waitFor(() => {
        expect(mockRefreshUser).toHaveBeenCalledTimes(1);
      });

      // Wait for navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
      });

      // Verify URL cleanup
      expect(mockReplaceState).toHaveBeenCalledWith({}, '', window.location.pathname);
    });

    it('should handle successful authentication without token', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          default:
            return null;
        }
      });

      mockRefreshUser.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Should not store any token
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith('auth_token', expect.anything());

      // Wait for user refresh
      await waitFor(() => {
        expect(mockRefreshUser).toHaveBeenCalledTimes(1);
      });

      // Wait for navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
      });
    });
  });

  describe('Error Handling', () => {
    it('should display authentication error from URL parameters', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'error':
            return 'access_denied';
          case 'error_description':
            return 'User cancelled authentication';
          default:
            return null;
        }
      });

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/login?error=callback_failed&message=User%20cancelled%20authentication',
          { replace: true }
        );
      });

      expect(console.error).toHaveBeenCalledWith(
        'Authentication callback error:',
        'access_denied',
        'User cancelled authentication'
      );
      expect(mockRefreshUser).not.toHaveBeenCalled();
    });

    it('should handle domain restriction errors specifically', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'error':
            return 'domain_not_allowed';
          case 'error_description':
            return 'Your domain is not allowed';
          default:
            return null;
        }
      });

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/login?error=domain_not_allowed&message=Your%20domain%20is%20not%20allowed',
          { replace: true }
        );
      });

      expect(console.error).toHaveBeenCalledWith(
        'Authentication callback error:',
        'domain_not_allowed',
        'Your domain is not allowed'
      );
    });

    it('should handle user refresh failure', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          case 'token':
            return 'test-token';
          default:
            return null;
        }
      });

      const mockError = new Error('Failed to refresh user');
      mockRefreshUser.mockRejectedValueOnce(mockError);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Wait for token storage
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'test-token');
      });

      // Wait for user refresh attempt
      await waitFor(() => {
        expect(mockRefreshUser).toHaveBeenCalledTimes(1);
      });

      // Wait for error navigation
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/login?error=callback_failed&message=Authentication%20failed',
          { replace: true }
        );
      });

      expect(console.error).toHaveBeenCalledWith('Callback handling error:', mockError);
    });

    it('should handle callback without success status as error', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'token':
            return 'test-token-without-success';
          default:
            return null;
        }
      });

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Should not store token without success status
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith('auth_token', expect.anything());

      // Should navigate to login with error
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/login?error=callback_failed&message=Authentication%20failed',
          { replace: true }
        );
      });

      // Should log error
      expect(console.error).toHaveBeenCalledWith('Callback handling error:', expect.any(Error));
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing URL parameters gracefully', async () => {
      mockSearchParams.get.mockReturnValue(null);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Should navigate to login with error when no success status
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/login?error=callback_failed&message=Authentication%20failed',
          { replace: true }
        );
      });

      expect(console.error).toHaveBeenCalledWith('Callback handling error:', expect.any(Error));
    });

    it('should handle empty token values', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          case 'token':
            return '';
          default:
            return null;
        }
      });

      mockRefreshUser.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      // Should not store empty tokens
      expect(localStorageMock.setItem).not.toHaveBeenCalledWith('auth_token', '');

      // But should still proceed with authentication
      await waitFor(() => {
        expect(mockRefreshUser).toHaveBeenCalledTimes(1);
      });
    });

    it('should clean up URL parameters after processing', async () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          case 'token':
            return 'test-token';
          case 'extra_param':
            return 'should-be-removed';
          default:
            return null;
        }
      });

      mockRefreshUser.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(mockReplaceState).toHaveBeenCalledWith({}, '', window.location.pathname);
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner during authentication', () => {
      mockSearchParams.get.mockImplementation((key: string) => {
        switch (key) {
          case 'auth':
            return 'success';
          case 'token':
            return 'test-token';
          default:
            return null;
        }
      });

      // Make refreshUser return a promise that doesn't resolve immediately
      mockRefreshUser.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      render(
        <TestWrapper>
          <AuthCallback />
        </TestWrapper>
      );

      expect(screen.getByText('Completing sign-in...')).toBeInTheDocument();
      expect(
        screen.getByText('Please wait while we complete your authentication.')
      ).toBeInTheDocument();

      // Check for loading spinner by class
      const spinnerElement = document.querySelector('.animate-spin');
      expect(spinnerElement).toBeInTheDocument();
      expect(spinnerElement).toHaveClass('animate-spin');
    });
  });
});
