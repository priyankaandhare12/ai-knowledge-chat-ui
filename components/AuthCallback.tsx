import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await authService.handleCallback();
        // Redirect to the intended page or home
        navigate('/home', { replace: true });
      } catch (error) {
        console.error('Authentication callback error:', error);
        navigate('/login?error=callback_failed', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

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

export const SilentCallback: React.FC = () => {
  useEffect(() => {
    const handleSilentCallback = async () => {
      try {
        await authService.handleSilentCallback();
      } catch (error) {
        console.error('Silent callback error:', error);
      }
    };

    handleSilentCallback();
  }, []);

  return null; // This component doesn't render anything
};
