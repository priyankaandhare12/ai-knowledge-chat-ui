import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { config } from '@/config';
import { useSearchParams } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check for error parameters from redirect
    const errorType = searchParams.get('error');
    const errorMessage = searchParams.get('message');

    if (errorType === 'domain_not_allowed') {
      setError(
        errorMessage ? decodeURIComponent(errorMessage) : config.domainRestrictions.blockMessage
      );
    } else if (errorType === 'callback_failed') {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleLogin = async () => {
    try {
      setError(null);
      await login();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="/logodesign.png"
            alt="Universal Knowledge Chatbot Logo"
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-black">Universal Knowledge Chatbot</h1>
          <p className="text-lg text-black">
            Sign in to your account using your organization's SSO
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* SSO Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 text-lg bg-black text-white hover:bg-gray-800 border border-black rounded-lg font-medium"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <LogIn className="w-5 h-5" />
                <span>Sign in with SSO</span>
              </div>
            )}
          </Button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center text-sm text-gray-600"
        >
          <p>Secure login powered by Auth0</p>
        </motion.div>

        {/* Development Mode Info */}
        {config.isDevelopment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <p className="text-sm text-orange-700">
              <strong>Development Mode:</strong> Please configure your OIDC settings in the
              environment variables.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
