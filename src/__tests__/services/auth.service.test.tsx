import axios, { type AxiosInstance } from 'axios';

// Mock axios module BEFORE importing the service
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock config BEFORE importing the service
jest.mock('@/config', () => ({
  config: {
    apiUrl: 'http://localhost:3000',
  },
}));

// Create mock API client upfront
const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

// Mock axios.create to return our mock client
mockedAxios.create.mockReturnValue(mockApiClient as unknown as AxiosInstance);

// Now import the service after mocks are in place
import { AuthService, User, DomainNotAllowedError } from '@/services/auth.service';

// Mock console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('AuthService', () => {
  let authService: AuthService;
  let mockLocalStorage: {
    getItem: jest.Mock;
    setItem: jest.Mock;
    removeItem: jest.Mock;
  };
  let mockWindow: {
    location: {
      href: string;
      origin: string;
      pathname: string;
      search: string;
    };
    history: {
      replaceState: jest.Mock;
    };
    setTimeout: jest.Mock;
  };

  beforeEach(() => {
    // Reset the mock functions in the already created mockApiClient
    jest.clearAllMocks();

    // Mock localStorage
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Mock window properties
    mockWindow = {
      location: {
        href: '',
        origin: 'http://localhost:3000',
        pathname: '/auth/callback',
        search: '',
      },
      history: {
        replaceState: jest.fn(),
      },
      setTimeout: jest.fn(callback => {
        callback();
        return 123;
      }) as jest.Mock,
    };

    // Use jest.spyOn to mock window properties safely
    jest.spyOn(window, 'setTimeout').mockImplementation(mockWindow.setTimeout);

    // Mock location.href assignment
    let mockLocationHref = '';
    Object.defineProperty(window, 'location', {
      value: {
        href: {
          get: () => mockLocationHref,
          set: (value: string) => {
            mockLocationHref = value;
          },
        },
        origin: mockWindow.location.origin,
        pathname: mockWindow.location.pathname,
        search: mockWindow.location.search,
      },
      writable: true,
    });

    Object.defineProperty(window, 'setTimeout', {
      value: mockWindow.setTimeout,
      writable: true,
      configurable: true,
    });

    // Mock console
    console.log = jest.fn();
    console.error = jest.fn();

    // Create fresh instance
    authService = new AuthService();
  });

  afterEach(() => {
    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe('constructor', () => {
    it('should create axios client with correct configuration', () => {
      // axios.create is called during module initialization, not constructor
      // Check that it was mocked properly
      expect(mockedAxios.create).toHaveBeenCalled();

      // Verify the configuration used (may have been called during module load)
      const createCalls = mockedAxios.create.mock.calls;
      expect(createCalls.length).toBeGreaterThan(0);

      // Check the last call matches our config
      const lastCall = createCalls[createCalls.length - 1];
      expect(lastCall[0]).toEqual({
        baseURL: 'http://localhost:3000',
        withCredentials: true,
      });
    });

    it('should set up request and response interceptors', () => {
      expect(mockApiClient.interceptors.request.use).toHaveBeenCalled();
      expect(mockApiClient.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should successfully initiate login flow', async () => {
      const mockLoginResponse = {
        data: {
          success: true,
          loginUrl: 'https://auth0.example.com/login',
        },
      };
      mockApiClient.get.mockResolvedValue(mockLoginResponse);

      await authService.login();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/login', {
        params: {
          returnTo: 'http://localhost:3000/auth/callback',
        },
      });
      expect(mockWindow.location.href).toBe('https://auth0.example.com/login');
    });

    it('should handle failed login URL request', async () => {
      const mockFailResponse = {
        data: {
          success: false,
        },
      };
      mockApiClient.get.mockResolvedValue(mockFailResponse);

      await expect(authService.login()).rejects.toThrow('Failed to get login URL');
      expect(console.error).toHaveBeenCalledWith('Login error:', expect.any(Error));
    });

    it('should handle network errors during login', async () => {
      const networkError = new Error('Network error');
      mockApiClient.get.mockRejectedValue(networkError);

      await expect(authService.login()).rejects.toThrow('Network error');
      expect(console.error).toHaveBeenCalledWith('Login error:', networkError);
    });
  });

  describe('logout', () => {
    it('should successfully logout with redirect URL', async () => {
      const mockLogoutResponse = {
        data: {
          success: true,
          logoutUrl: 'https://auth0.example.com/logout',
        },
      };
      mockApiClient.post.mockResolvedValue(mockLogoutResponse);

      await authService.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/logout', {
        returnTo: 'http://localhost:3000',
      });
      expect(mockWindow.location.href).toBe('https://auth0.example.com/logout');
      expect(mockWindow.setTimeout).toHaveBeenCalled();
    });

    it('should fallback to home redirect when logout fails', async () => {
      const mockFailResponse = {
        data: {
          success: false,
        },
      };
      mockApiClient.post.mockResolvedValue(mockFailResponse);

      await authService.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(mockWindow.location.href).toBe('/');
    });

    it('should handle logout errors gracefully', async () => {
      const logoutError = new Error('Logout failed');
      mockApiClient.post.mockRejectedValue(logoutError);

      await authService.logout();

      expect(console.error).toHaveBeenCalledWith('Logout error:', logoutError);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(mockWindow.location.href).toBe('/');
    });
  });

  describe('handleCallback', () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      picture: 'https://example.com/avatar.jpg',
      emailVerified: true,
    };

    beforeEach(() => {
      // Mock URLSearchParams
      Object.defineProperty(window, 'URLSearchParams', {
        value: jest.fn().mockImplementation(search => ({
          get: jest.fn().mockImplementation(key => {
            if (search === '?token=abc123&auth=success') {
              return key === 'token' ? 'abc123' : key === 'auth' ? 'success' : null;
            }
            return null;
          }),
        })),
        writable: true,
      });
    });

    it('should handle successful callback with token', async () => {
      mockWindow.location.search = '?token=abc123&auth=success';
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
          user: mockUser,
        },
      });

      const result = await authService.handleCallback();

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('auth_token', 'abc123');
      expect(mockWindow.history.replaceState).toHaveBeenCalledWith({}, '', '/auth/callback');
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/user');
      expect(result).toEqual(mockUser);
    });

    it('should return null when no token present', async () => {
      mockWindow.location.search = '';

      const result = await authService.handleCallback();

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      expect(result).toBeNull();
      expect(console.log).toHaveBeenCalledWith('No token found in callback URL');
    });

    it('should return null when auth status is not success', async () => {
      mockWindow.location.search = '?token=abc123&auth=error';

      const result = await authService.handleCallback();

      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('handleSilentCallback', () => {
    it('should log that silent callback is not needed', async () => {
      await authService.handleSilentCallback();
      expect(console.log).toHaveBeenCalledWith('Silent callback not needed with backend auth');
    });
  });

  describe('getUser', () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
    };

    it('should return user when authenticated', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
          user: mockUser,
        },
      });

      const result = await authService.getUser();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/user');
      expect(result).toEqual(mockUser);
    });

    it('should return null when not authenticated', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: false,
        },
      });

      const result = await authService.getUser();

      expect(result).toBeNull();
    });

    it('should return null when API request fails', async () => {
      const apiError = new Error('API Error');
      mockApiClient.get.mockRejectedValue(apiError);

      const result = await authService.getUser();

      expect(console.error).toHaveBeenCalledWith('Get user error:', apiError);
      expect(result).toBeNull();
    });

    it('should return null when response is not successful', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: false,
        },
      });

      const result = await authService.getUser();

      expect(result).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when authenticated', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
        },
      });

      const result = await authService.isAuthenticated();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/status');
      expect(result).toBe(true);
    });

    it('should return false when not authenticated', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: false,
        },
      });

      const result = await authService.isAuthenticated();

      expect(result).toBe(false);
    });

    it('should return false when API request fails', async () => {
      const apiError = new Error('API Error');
      mockApiClient.get.mockRejectedValue(apiError);

      const result = await authService.isAuthenticated();

      expect(console.error).toHaveBeenCalledWith('Auth status check error:', apiError);
      expect(result).toBe(false);
    });
  });

  describe('validateUserDomain', () => {
    it('should return true when user exists', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
          user: { id: '123', email: 'test@example.com' },
        },
      });

      const result = await authService.validateUserDomain();

      expect(result).toBe(true);
    });

    it('should return false when user does not exist', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: false,
        },
      });

      const result = await authService.validateUserDomain();

      expect(result).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return null (tokens handled by backend)', async () => {
      const result = await authService.getAccessToken();
      expect(result).toBeNull();
    });
  });

  describe('renewToken', () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
    };

    it('should renew token by getting user', async () => {
      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
          user: mockUser,
        },
      });

      const result = await authService.renewToken();

      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
      };

      mockApiClient.get.mockResolvedValue({
        data: {
          success: true,
          authenticated: true,
          user: mockUser,
        },
      });

      const result = await authService.getUserProfile();

      expect(result).toEqual(mockUser);
    });
  });

  describe('removeUser', () => {
    it('should call logout method', async () => {
      const mockLogoutResponse = {
        data: {
          success: true,
          logoutUrl: 'https://auth0.example.com/logout',
        },
      };
      mockApiClient.post.mockResolvedValue(mockLogoutResponse);

      await authService.removeUser();

      expect(mockApiClient.post).toHaveBeenCalledWith('/api/auth/logout', {
        returnTo: 'http://localhost:3000',
      });
    });
  });

  describe('getAuthStatus', () => {
    it('should return authentication status and domain restrictions', async () => {
      const mockResponse = {
        data: {
          authenticated: true,
          domainRestrictions: {
            enabled: true,
            allowedDomains: ['example.com'],
            allowAllGmail: false,
          },
        },
      };
      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await authService.getAuthStatus();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/auth/status');
      expect(result).toEqual({
        authenticated: true,
        domainRestrictions: {
          enabled: true,
          allowedDomains: ['example.com'],
          allowAllGmail: false,
        },
      });
    });

    it('should return default values when API fails', async () => {
      const apiError = new Error('API Error');
      mockApiClient.get.mockRejectedValue(apiError);

      const result = await authService.getAuthStatus();

      expect(console.error).toHaveBeenCalledWith('Get auth status error:', apiError);
      expect(result).toEqual({
        authenticated: false,
        domainRestrictions: {
          enabled: false,
          allowedDomains: [],
          allowAllGmail: true,
        },
      });
    });
  });
});

describe('DomainNotAllowedError', () => {
  it('should create error with default message', () => {
    const error = new DomainNotAllowedError('test@example.com');

    expect(error.name).toBe('DomainNotAllowedError');
    expect(error.message).toBe('Access denied for domain: example.com');
  });

  it('should create error with custom message', () => {
    const customMessage = 'Custom domain error';
    const error = new DomainNotAllowedError('test@example.com', customMessage);

    expect(error.name).toBe('DomainNotAllowedError');
    expect(error.message).toBe(customMessage);
  });
});
