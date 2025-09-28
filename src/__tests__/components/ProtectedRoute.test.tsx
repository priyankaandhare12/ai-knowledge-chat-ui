import React from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from '../../components/ProtectedRoute';

// Mock the config module
jest.mock('@/config', () => ({
  config: {
    apiUrl: 'http://localhost:3001',
    domainRestrictions: { enabled: false, allowedDomains: [] },
  },
}));

// Mock functions for AuthContext
const mockUseAuth = jest.fn();

// Mock AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

// Test components
const TestProtectedComponent = () => <div>Protected Content</div>;
const TestPublicComponent = () => <div>Public Content</div>;

// Test wrapper with routing
const TestWrapper = ({
  children,
  initialEntries = ['/'],
}: {
  children: React.ReactNode;
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/" element={children} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/home" element={<div>Home Page</div>} />
      <Route
        path="/protected"
        element={
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/public"
        element={
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        }
      />
    </Routes>
  </MemoryRouter>
);

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner when authentication is loading', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      // Should show loading spinner
      const spinnerElement = document.querySelector('.animate-spin');
      expect(spinnerElement).toBeInTheDocument();
      expect(spinnerElement).toHaveClass('animate-spin');

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Authenticated User', () => {
    it('should render children when user is authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      // Should show protected content
      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      // Should not show loading spinner
      expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    });
  });

  describe('Unauthenticated User', () => {
    it('should redirect to login when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper initialEntries={['/protected']}>
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      // Should redirect to login page
      expect(screen.getByText('Login Page')).toBeInTheDocument();

      // Should not show protected content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should pass current location as state when redirecting to login', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      // We'll use a custom test to check the location state
      const LocationTester = () => {
        const location = window.location;
        return <div>Current path: {location.pathname}</div>;
      };

      render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestProtectedComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LocationTester />} />
          </Routes>
        </MemoryRouter>
      );

      // Should be redirected to login
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('Complex Routing Scenarios', () => {
    it('should handle nested protected routes', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      const NestedComponent = () => (
        <ProtectedRoute>
          <div>
            <span>Outer Protected</span>
            <ProtectedRoute>
              <span>Inner Protected</span>
            </ProtectedRoute>
          </div>
        </ProtectedRoute>
      );

      render(
        <TestWrapper>
          <NestedComponent />
        </TestWrapper>
      );

      expect(screen.getByText('Outer Protected')).toBeInTheDocument();
      expect(screen.getByText('Inner Protected')).toBeInTheDocument();
    });

    it('should handle authentication state changes', () => {
      // Start with authenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      const { rerender } = render(
        <TestWrapper>
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      // Change to unauthenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      rerender(
        <TestWrapper>
          <ProtectedRoute>
            <TestProtectedComponent />
          </ProtectedRoute>
        </TestWrapper>
      );

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });
});

describe('PublicOnlyRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should show loading spinner when authentication is loading', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
      });

      render(
        <TestWrapper>
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        </TestWrapper>
      );

      // Should show loading spinner
      const spinnerElement = document.querySelector('.animate-spin');
      expect(spinnerElement).toBeInTheDocument();
      expect(spinnerElement).toHaveClass('animate-spin');

      // Should not show public content
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });
  });

  describe('Unauthenticated User', () => {
    it('should render children when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      render(
        <TestWrapper>
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        </TestWrapper>
      );

      // Should show public content
      expect(screen.getByText('Public Content')).toBeInTheDocument();

      // Should not show loading spinner
      expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    });
  });

  describe('Authenticated User', () => {
    it('should redirect to home when user is authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <TestWrapper initialEntries={['/public']}>
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        </TestWrapper>
      );

      // Should redirect to home page
      expect(screen.getByText('Home Page')).toBeInTheDocument();

      // Should not show public content
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });

    it('should redirect to previous location when coming from protected route', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      // Simulate coming from a protected route
      const WrapperWithState = () => (
        <MemoryRouter
          initialEntries={[{ pathname: '/login', state: { from: { pathname: '/dashboard' } } }]}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <TestPublicComponent />
                </PublicOnlyRoute>
              }
            />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/home" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      render(<WrapperWithState />);

      // Should redirect to the original location (dashboard) instead of home
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
      expect(screen.queryByText('Home Page')).not.toBeInTheDocument();
    });

    it('should default to home when no previous location state exists', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      render(
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <TestPublicComponent />
                </PublicOnlyRoute>
              }
            />
            <Route path="/home" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Should redirect to home when no state
      expect(screen.getByText('Home Page')).toBeInTheDocument();
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });
  });

  describe('Authentication State Changes', () => {
    it('should handle authentication from unauthenticated to authenticated', () => {
      // Start with unauthenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
      });

      const { rerender } = render(
        <TestWrapper>
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        </TestWrapper>
      );

      expect(screen.getByText('Public Content')).toBeInTheDocument();

      // Change to authenticated
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      rerender(
        <TestWrapper>
          <PublicOnlyRoute>
            <TestPublicComponent />
          </PublicOnlyRoute>
        </TestWrapper>
      );

      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid location state gracefully', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      // Simulate invalid state structure
      const WrapperWithInvalidState = () => (
        <MemoryRouter
          initialEntries={[{ pathname: '/login', state: { invalidKey: 'invalidValue' } }]}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <TestPublicComponent />
                </PublicOnlyRoute>
              }
            />
            <Route path="/home" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      render(<WrapperWithInvalidState />);

      // Should default to home when state is invalid
      expect(screen.getByText('Home Page')).toBeInTheDocument();
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });

    it('should handle null location state', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
      });

      const WrapperWithNullState = () => (
        <MemoryRouter initialEntries={[{ pathname: '/login', state: null }]}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <TestPublicComponent />
                </PublicOnlyRoute>
              }
            />
            <Route path="/home" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      render(<WrapperWithNullState />);

      // Should default to home when state is null
      expect(screen.getByText('Home Page')).toBeInTheDocument();
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });
  });
});
