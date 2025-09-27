import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { config } from '@/config';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.apiUrl,
      timeout: 60000, // Increased to 60 seconds for AI responses
      withCredentials: true, // Enable cookies for authentication
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - cookies are automatically included with withCredentials: true
    this.client.interceptors.request.use(
      config => {
        // No need to add Authorization header - using HTTP-only cookies
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor - handle auth errors
    this.client.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        // For cookie-based auth, don't retry 401 errors automatically
        // Let the component handle authentication errors
        if (error.response?.status === 401) {
          console.log('Authentication required - user needs to log in');
        }
        return Promise.reject(error);
      }
    );
  }

  // HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get('/health');
  }

  // Chat API
  async sendMessage(message: string): Promise<{
    success: boolean;
    data?: {
      message: string;
      metadata?: {
        conversationId?: string;
        timestamp?: string;
        [key: string]: unknown;
      };
      sources?: { name: string; url: string }[];
    };
    response?: string; // fallback for different response formats
    sources?: { name: string; url: string }[];
  }> {
    return this.post('/api/chat', { message });
  }
}

export const apiClient = new ApiClient();
