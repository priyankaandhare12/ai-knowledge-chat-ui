import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for error parameters from the server
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          console.error('Authentication callback error:', error, errorDescription);

          // Handle domain restriction errors specifically
          if (error === 'domain_not_allowed') {
            navigate(
              '/login?error=domain_not_allowed&message=' +
                encodeURIComponent(
                  errorDescription || 'Your domain is not allowed to access this application'
                ),
              {
                replace: true,
              }
            );
          } else {
            navigate(
              '/login?error=callback_failed&message=' +
                encodeURIComponent(errorDescription || 'Authentication failed'),
              {
                replace: true,
              }
            );
          }
          return;
        }

        // Handle token from URL if present
        const authStatus = searchParams.get('auth');
        const token = searchParams.get('token');

        if (authStatus === 'success' && token) {
          // Store the token
          localStorage.setItem('auth_token', token);

          // Clean URL
          window.history.replaceState({}, '', window.location.pathname);

          // Refresh the user state
          await refreshUser();

          // Success - redirect to home
          navigate('/home', { replace: true });
        } else if (authStatus === 'success') {
          // Fallback: refresh user and redirect
          await refreshUser();
          navigate('/home', { replace: true });
        } else {
          // No success status, something went wrong
          throw new Error('Authentication callback did not indicate success');
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        navigate(
          '/login?error=callback_failed&message=' + encodeURIComponent('Authentication failed'),
          {
            replace: true,
          }
        );
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Completing sign-in...</h2>
        <p className="text-muted-foreground mt-2">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
};
