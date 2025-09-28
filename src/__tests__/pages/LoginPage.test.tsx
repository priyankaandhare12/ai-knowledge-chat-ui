import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';

// Mock the logo import
jest.mock('/logodesign.png', () => 'mocked-logo.png', { virtual: true });

// Mock the config module
jest.mock('@/config', () => ({
  config: {
    apiUrl: 'http://localhost:3001',
    domainRestrictions: {
      enabled: false,
      allowedDomains: [],
      blockMessage: 'Your domain is not allowed to access this application.',
    },
    isDevelopment: false,
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  LogIn: () => <svg data-testid="login-icon">LogIn Icon</svg>,
}));

// Mock UI Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock functions for AuthContext
const mockLogin = jest.fn();
const mockUseAuth = jest.fn();

// Mock AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Test wrapper with routing
const TestWrapper = ({
  children,
  initialEntries = ['/login'],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>;

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial Render', () => {
    it('should render all login page elements', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      // Check for logo
      expect(screen.getByAltText('Universal Knowledge Chatbot Logo')).toBeInTheDocument();

      // Check for title and description
      expect(screen.getByText('Universal Knowledge Chatbot')).toBeInTheDocument();
      expect(
        screen.getByText("Sign in to your account using your organization's SSO")
      ).toBeInTheDocument();

      // Check for login button
      expect(screen.getByRole('button', { name: /sign in with sso/i })).toBeInTheDocument();

      // Check for footer info
      expect(screen.getByText('Secure login powered by Auth0')).toBeInTheDocument();

      // Check for login icon
      expect(screen.getByTestId('login-icon')).toBeInTheDocument();
    });

    it('should render logo with correct attributes', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const logo = screen.getByAltText('Universal Knowledge Chatbot Logo');
      expect(logo).toHaveAttribute('src');
      expect(logo).toHaveClass('w-32');
      expect(logo).toHaveClass('h-32');
      expect(logo).toHaveClass('object-contain');
    });
  });

  describe('Login Functionality', () => {
    it('should call login function when login button is clicked', async () => {
      mockLogin.mockResolvedValueOnce(undefined);
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /sign in with sso/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(1);
      });
    });

    it('should display loading state during login', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();

      // Check for loading spinner
      const spinnerElement = document.querySelector('.animate-spin');
      expect(spinnerElement).toBeInTheDocument();
    });

    it('should handle login failure', async () => {
      const loginError = new Error('Login failed');
      mockLogin.mockRejectedValueOnce(loginError);
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /sign in with sso/i });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(1);
      });

      await waitFor(() => {
        expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
      });

      expect(console.error).toHaveBeenCalledWith('Login failed:', loginError);
    });

    it('should clear error when attempting login again', async () => {
      // First, simulate a failed login
      const loginError = new Error('First login failed');
      mockLogin.mockRejectedValueOnce(loginError).mockResolvedValueOnce(undefined);

      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /sign in with sso/i });

      // First failed login
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument();
      });

      // Second successful login should clear error
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledTimes(2);
      });

      // Error should be cleared (not visible)
      expect(screen.queryByText('Login failed. Please try again.')).not.toBeInTheDocument();
    });
  });

  describe('URL Parameter Error Handling', () => {
    it('should display domain restriction error from URL parameters', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper
          initialEntries={['/login?error=domain_not_allowed&message=Your%20domain%20is%20blocked']}
        >
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Your domain is blocked')).toBeInTheDocument();
    });

    it('should use default domain restriction message when no custom message provided', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper initialEntries={['/login?error=domain_not_allowed']}>
          <LoginPage />
        </TestWrapper>
      );

      expect(
        screen.getByText('Your domain is not allowed to access this application.')
      ).toBeInTheDocument();
    });

    it('should display callback failure error from URL parameters', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper
          initialEntries={['/login?error=callback_failed&message=Authentication%20failed']}
        >
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Authentication failed. Please try again.')).toBeInTheDocument();
    });

    it('should ignore unrecognized error types', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper initialEntries={['/login?error=unknown_error&message=Some%20unknown%20error']}>
          <LoginPage />
        </TestWrapper>
      );

      // Should not show any error message for unknown error types
      expect(screen.queryByText('Some unknown error')).not.toBeInTheDocument();
    });
  });

  describe('Development Mode', () => {
    it('should not show development mode info when not in development', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      // Should not show development mode info when isDevelopment is false
      expect(screen.queryByText(/Development Mode:/)).not.toBeInTheDocument();
    });
  });

  describe('Error Message Display', () => {
    it('should display error message with correct styling', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper
          initialEntries={['/login?error=domain_not_allowed&message=Test%20error%20message']}
        >
          <LoginPage />
        </TestWrapper>
      );

      const errorElement = screen.getByText('Test error message');
      expect(errorElement).toBeInTheDocument();

      // Find the error message
      const errorMessage = screen.getByText('Test error message');
      expect(errorMessage).toBeInTheDocument();

      // Check if error element has appropriate styling classes
      expect(errorMessage).toHaveClass('p-4');
      expect(errorMessage).toHaveClass('bg-red-50');
      expect(errorMessage).toHaveClass('border');
      expect(errorMessage).toHaveClass('border-red-200');
      expect(errorMessage).toHaveClass('text-red-700');
    });

    it('should handle URL decoding of error messages', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper
          initialEntries={[
            '/login?error=domain_not_allowed&message=Error%20with%20spaces%20and%20%21symbols%21',
          ]}
        >
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByText('Error with spaces and !symbols!')).toBeInTheDocument();
    });
  });

  describe('Button States', () => {
    it('should enable button when not loading', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /sign in with sso/i });
      expect(loginButton).not.toBeDisabled();
    });

    it('should disable button when loading', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button');
      expect(loginButton).toBeDisabled();
    });

    it('should have correct CSS classes for styling', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole('button', { name: /sign in with sso/i });
      expect(loginButton).toHaveClass('w-full');
      expect(loginButton).toHaveClass('bg-black');
      expect(loginButton).toHaveClass('text-white');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for logo', () => {
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('alt', 'Universal Knowledge Chatbot Logo');
    });

    it('should have accessible button text in different states', () => {
      // Test normal state
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: false,
      });

      const { rerender } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /sign in with sso/i })).toBeInTheDocument();

      // Test loading state
      mockUseAuth.mockReturnValue({
        login: mockLogin,
        isLoading: true,
      });

      rerender(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByRole('button', { name: /signing in/i })).toBeInTheDocument();
    });
  });
});
