import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../services/api.service';

// Mock dependencies
jest.mock('../../services/api.service');
jest.mock('../../contexts/AuthContext');
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.ComponentProps<'h1'>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock CSS import
jest.mock('../../pages/HomePage.css', () => {});

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Mock user data
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User',
  picture: 'https://example.com/avatar.jpg',
  emailVerified: true,
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();

    // Set default auth mock
    mockUseAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      renewToken: jest.fn(),
      refreshUser: jest.fn(),
    });

    // Reset API client mocks
    mockApiClient.sendMessage = jest.fn();
    mockApiClient.uploadFile = jest.fn();
  });

  describe('Initial Render', () => {
    it('should render the main homepage elements', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.getAllByRole('heading', { name: /Universal Knowledge Chatbot/i })).toHaveLength(
        2
      );
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('should render input and send button', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(
        screen.getByPlaceholderText(/Ask about weather or upload a file for analysis/i)
      ).toBeInTheDocument();
    });

    it('should show loading state when auth is loading', () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        renewToken: jest.fn(),
        refreshUser: jest.fn(),
      });

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(screen.queryByText('Test User')).not.toBeInTheDocument();
    });
  });

  describe('Message Sending', () => {
    it('should send a message when form is submitted', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'Test response from bot',
          sources: [{ name: 'Source 1', url: 'https://example.com' }],
        },
      };

      mockApiClient.sendMessage.mockResolvedValue(mockResponse);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/Ask about weather or upload a file for analysis/i);
      const sendButton = screen.getByRole('button', { name: /send message/i });

      await userEvent.type(input, 'Hello, how are you?');
      await userEvent.click(sendButton);

      await waitFor(() => {
        expect(mockApiClient.sendMessage).toHaveBeenCalledWith('Hello, how are you?', undefined);
      });

      expect(screen.getByText('Hello, how are you?')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Test response from bot')).toBeInTheDocument();
      });
    });

    it('should not send empty messages', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const sendButton = screen.getByRole('button', { name: /send message/i });
      await userEvent.click(sendButton);

      expect(mockApiClient.sendMessage).not.toHaveBeenCalled();
    });

    it('should handle API errors gracefully', async () => {
      const mockError = {
        response: {
          status: 500,
          data: { error: 'Internal server error' },
        },
      };

      mockApiClient.sendMessage.mockRejectedValue(mockError);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/Ask about weather or upload a file for analysis/i);
      const sendButton = screen.getByRole('button', { name: /send message/i });

      await userEvent.type(input, 'Test message');
      await userEvent.click(sendButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Sorry, I encountered an error while processing your message/i)
        ).toBeInTheDocument();
      });
    });

    it('should show authentication error when user is not authenticated', async () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        renewToken: jest.fn(),
        refreshUser: jest.fn(),
      });

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(/Ask about weather or upload a file for analysis/i);
      const sendButton = screen.getByRole('button', { name: /send message/i });

      await userEvent.type(input, 'Test message');
      await userEvent.click(sendButton);

      expect(screen.getByText(/Please log in to use the chat feature/i)).toBeInTheDocument();
      expect(mockApiClient.sendMessage).not.toHaveBeenCalled();
    });
  });

  describe('File Upload', () => {
    it('should handle file upload successfully', async () => {
      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const mockUploadResponse = {
        success: true,
        data: {
          fileId: 'uploaded-file-id',
          fileName: 'test.pdf',
          message: 'File uploaded successfully',
          uploadedAt: new Date().toISOString(),
        },
      };

      mockApiClient.uploadFile.mockResolvedValue(mockUploadResponse);

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const fileInput = screen.getByLabelText(/upload file/i) as HTMLInputElement;

      await userEvent.upload(fileInput, mockFile);

      await waitFor(() => {
        expect(mockApiClient.uploadFile).toHaveBeenCalledWith(mockFile);
      });

      await waitFor(() => {
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });

    it('should reject non-PDF files', async () => {
      const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const fileInput = screen.getByLabelText(/upload file/i) as HTMLInputElement;

      await userEvent.upload(fileInput, mockFile);

      await waitFor(() => {
        expect(screen.getByText(/Please upload a PDF file only/i)).toBeInTheDocument();
      });

      expect(mockApiClient.uploadFile).not.toHaveBeenCalled();
    });
  });

  describe('Logout Functionality', () => {
    it('should call logout when logout button is clicked', async () => {
      const mockLogout = jest.fn();

      mockUseAuth.mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: mockLogout,
        renewToken: jest.fn(),
        refreshUser: jest.fn(),
      });

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const logoutButton = screen.getByRole('button', { name: /sign out/i });
      await userEvent.click(logoutButton);

      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('Sidebar Functionality', () => {
    it('should toggle sidebar when toggle button is clicked', async () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i });
      await userEvent.click(toggleButton);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('sidebarCollapsed', 'true');
    });

    it('should load sidebar state from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('true');

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('sidebarCollapsed');
    });
  });
});
