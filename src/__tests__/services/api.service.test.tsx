// Mock axios module BEFORE importing anything
const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
};

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

// Mock config BEFORE importing the service
jest.mock('../../config', () => ({
  config: {
    apiUrl: 'http://localhost:3001',
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Now import after all mocks are set up
import axios, { AxiosResponse } from 'axios';
import { ApiClient } from '../../services/api.service';

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Reset localStorage mocks
    mockLocalStorage.getItem.mockReset();
    mockLocalStorage.setItem.mockReset();
    mockLocalStorage.removeItem.mockReset();

    // Mock console
    console.log = jest.fn();
    console.error = jest.fn();

    // Create a fresh instance for testing
    apiClient = new ApiClient();
  });

  afterEach(() => {
    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe('constructor and setup', () => {
    it('should create axios instance with correct configuration', () => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3001',
        timeout: 60000,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should set up request and response interceptors', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('request interceptor', () => {
    it('should add authorization header when token exists', async () => {
      mockLocalStorage.getItem.mockReturnValue('test-token-123');

      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];

      const config = {
        url: '/test',
        headers: {},
      };

      const result = requestInterceptor(config);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('auth_token');
      expect(result.headers.Authorization).toBe('Bearer test-token-123');
      expect(console.log).toHaveBeenCalledWith(
        '🔍 API Service Request:',
        '/test',
        'Token present:',
        true
      );
      expect(console.log).toHaveBeenCalledWith('✅ Authorization header added to API service');
    });

    it('should not add authorization header when token does not exist', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];

      const config = {
        url: '/test',
        headers: {},
      };

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
      expect(console.log).toHaveBeenCalledWith(
        '🔍 API Service Request:',
        '/test',
        'Token present:',
        false
      );
    });

    it('should handle request errors', async () => {
      const requestErrorHandler = mockAxiosInstance.interceptors.request.use.mock.calls[0][1];
      const error = new Error('Request failed');

      await expect(requestErrorHandler(error)).rejects.toThrow('Request failed');
    });
  });

  describe('response interceptor', () => {
    it('should return successful responses as-is', async () => {
      const responseInterceptor = mockAxiosInstance.interceptors.response.use.mock.calls[0][0];
      const response = { data: { test: 'data' } };

      const result = responseInterceptor(response);

      expect(result).toBe(response);
    });

    it('should log authentication errors for 401 responses', async () => {
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const error = {
        config: { url: '/test' },
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
      };

      await expect(responseErrorHandler(error)).rejects.toEqual(error);

      expect(console.error).toHaveBeenCalledWith('❌ API Service Error:', '/test', 401, {
        message: 'Unauthorized',
      });
      expect(console.log).toHaveBeenCalledWith('Authentication required - user needs to log in');
    });

    it('should handle non-401 errors without special logging', async () => {
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      const error = {
        config: { url: '/test' },
        response: {
          status: 500,
          data: { message: 'Server Error' },
        },
      };

      await expect(responseErrorHandler(error)).rejects.toEqual(error);

      expect(console.error).toHaveBeenCalledWith('❌ API Service Error:', '/test', 500, {
        message: 'Server Error',
      });
      expect(console.log).not.toHaveBeenCalledWith(
        'Authentication required - user needs to log in'
      );
    });
  });

  describe('HTTP methods', () => {
    describe('get', () => {
      it('should make GET request and return data', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'success' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const result = await apiClient.get('/test');

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
        expect(result).toEqual({ message: 'success' });
      });

      it('should pass config to GET request', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'success' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const config = { params: { id: '123' } };
        await apiClient.get('/test', config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
      });
    });

    describe('post', () => {
      it('should make POST request and return data', async () => {
        const mockResponse: AxiosResponse = {
          data: { id: '123', message: 'created' },
          status: 201,
          statusText: 'Created',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.post.mockResolvedValue(mockResponse);

        const postData = { name: 'test' };
        const result = await apiClient.post('/test', postData);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, undefined);
        expect(result).toEqual({ id: '123', message: 'created' });
      });

      it('should pass config to POST request', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'success' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.post.mockResolvedValue(mockResponse);

        const postData = { name: 'test' };
        const config = { timeout: 5000 };
        await apiClient.post('/test', postData, config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, config);
      });
    });

    describe('put', () => {
      it('should make PUT request and return data', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'updated' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.put.mockResolvedValue(mockResponse);

        const putData = { name: 'updated' };
        const result = await apiClient.put('/test/123', putData);

        expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/123', putData, undefined);
        expect(result).toEqual({ message: 'updated' });
      });
    });

    describe('patch', () => {
      it('should make PATCH request and return data', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'patched' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.patch.mockResolvedValue(mockResponse);

        const patchData = { status: 'active' };
        const result = await apiClient.patch('/test/123', patchData);

        expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/123', patchData, undefined);
        expect(result).toEqual({ message: 'patched' });
      });
    });

    describe('delete', () => {
      it('should make DELETE request and return data', async () => {
        const mockResponse: AxiosResponse = {
          data: { message: 'deleted' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as AxiosResponse['config'],
        };
        mockAxiosInstance.delete.mockResolvedValue(mockResponse);

        const result = await apiClient.delete('/test/123');

        expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/123', undefined);
        expect(result).toEqual({ message: 'deleted' });
      });
    });
  });

  describe('healthCheck', () => {
    it('should call GET /health and return health status', async () => {
      const mockHealthResponse = {
        status: 'healthy',
        timestamp: '2023-01-01T00:00:00Z',
      };

      const mockResponse: AxiosResponse = {
        data: mockHealthResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.healthCheck();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health', undefined);
      expect(result).toEqual(mockHealthResponse);
    });

    it('should handle health check errors', async () => {
      const error = new Error('Health check failed');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(apiClient.healthCheck()).rejects.toThrow('Health check failed');
    });
  });

  describe('uploadFile', () => {
    it('should upload file with FormData and correct headers', async () => {
      const mockUploadResponse = {
        success: true,
        data: {
          fileId: 'file-123',
          fileName: 'test.pdf',
          message: 'File uploaded successfully',
          uploadedAt: '2023-01-01T00:00:00Z',
        },
      };

      const mockResponse: AxiosResponse = {
        data: mockUploadResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      // Create a mock file
      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      const result = await apiClient.uploadFile(file);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/api/upload', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verify FormData contains the file
      const formDataCall = mockAxiosInstance.post.mock.calls[0][1] as FormData;
      expect(formDataCall.get('file')).toBe(file);

      expect(result).toEqual(mockUploadResponse);
    });

    it('should handle file upload errors', async () => {
      const error = new Error('Upload failed');
      mockAxiosInstance.post.mockRejectedValue(error);

      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      await expect(apiClient.uploadFile(file)).rejects.toThrow('Upload failed');
    });
  });

  describe('sendMessage', () => {
    it('should send message without fileId', async () => {
      const mockChatResponse = {
        success: true,
        data: {
          message: 'AI response here',
          metadata: {
            conversationId: 'conv-123',
            timestamp: '2023-01-01T00:00:00Z',
          },
          sources: [{ name: 'Document 1', url: 'http://example.com/doc1' }],
        },
      };

      const mockResponse: AxiosResponse = {
        data: mockChatResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await apiClient.sendMessage('Hello, how are you?');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/chat',
        { message: 'Hello, how are you?' },
        undefined
      );
      expect(result).toEqual(mockChatResponse);
    });

    it('should send message with fileId', async () => {
      const mockChatResponse = {
        success: true,
        data: {
          message: 'AI response about the document',
          metadata: {
            conversationId: 'conv-456',
            timestamp: '2023-01-01T00:00:00Z',
          },
        },
      };

      const mockResponse: AxiosResponse = {
        data: mockChatResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await apiClient.sendMessage('What is this document about?', 'file-123');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/chat',
        {
          message: 'What is this document about?',
          fileId: 'file-123',
        },
        undefined
      );
      expect(result).toEqual(mockChatResponse);
    });

    it('should handle chat API errors', async () => {
      const error = new Error('Chat API failed');
      mockAxiosInstance.post.mockRejectedValue(error);

      await expect(apiClient.sendMessage('Hello')).rejects.toThrow('Chat API failed');
    });

    it('should handle fallback response format', async () => {
      const mockFallbackResponse = {
        response: 'Direct response string',
        sources: [{ name: 'Source 1', url: 'http://example.com' }],
      };

      const mockResponse: AxiosResponse = {
        data: mockFallbackResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as AxiosResponse['config'],
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await apiClient.sendMessage('Test message');

      expect(result).toEqual(mockFallbackResponse);
    });
  });

  describe('error handling', () => {
    it('should properly reject promises on network errors', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(networkError);

      await expect(apiClient.get('/test')).rejects.toThrow('Network Error');
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('Timeout');
      mockAxiosInstance.post.mockRejectedValue(timeoutError);

      await expect(apiClient.post('/test', {})).rejects.toThrow('Timeout');
    });
  });
});
