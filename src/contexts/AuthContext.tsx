import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await authService.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listen for focus events to check auth status when user returns to tab
  useEffect(() => {
    const handleFocus = async () => {
      if (!isLoading) {
        try {
          const currentUser = await authService.getUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to refresh user on focus:', error);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isLoading]);

  // TODO: Set up event listeners for authentication events
  // This would be implemented with the actual oidc-client-ts event system

  const login = async () => {
    try {
      setIsLoading(true);
      // Don't set loading to false here since the page will redirect
      await authService.login();
      // The page will redirect, so we don't need to handle the response here
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false); // Only set loading to false if there's an error
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const renewToken = async () => {
    try {
      const renewedUser = await authService.renewToken();
      setUser(renewedUser);
    } catch (error) {
      console.error('Token renewal failed:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  const isAuthenticated = user !== null;

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    renewToken,
    refreshUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for components that require authentication
export const withAuth = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
