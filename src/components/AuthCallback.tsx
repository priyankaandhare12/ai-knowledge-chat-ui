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

        // Wait a moment for the auth context to update after the callback
        await new Promise(resolve => setTimeout(resolve, 500));

        // Refresh the user state in the auth context
        await refreshUser();

        // Wait another moment to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 500));

        // Success - redirect to home
        navigate('/home', { replace: true });
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
