import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Shield, Zap, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade SSO security with OIDC protocol',
    },
    {
      icon: Zap,
      title: 'Fast & Seamless',
      description: 'Quick login process with automatic token renewal',
    },
    {
      icon: Users,
      title: 'Unified Access',
      description: 'Single sign-on across all your applications',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            >
              {config.app.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-muted-foreground max-w-md"
            >
              {config.app.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Login card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account using your organization's SSO
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full h-12 text-lg"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In with SSO</span>
                  </div>
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Secure login powered by Auth0</p>
                <p className="text-xs text-muted-foreground">Sign in with your Google account</p>
              </div>

              {/* Domain Restriction Info */}
              {config.domainRestrictions.enabled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md"
                >
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Access Restrictions:</p>
                      <div className="mt-1 text-xs space-y-1">
                        {config.domainRestrictions.allowedDomains.length > 0 ? (
                          <p>
                            Only users from {config.domainRestrictions.allowedDomains.join(', ')}{' '}
                            domains can access this system.
                          </p>
                        ) : (
                          <p>Domain restrictions are enabled.</p>
                        )}
                        {config.domainRestrictions.allowAllGmail && (
                          <p>Gmail users are also allowed.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {config.isDevelopment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-md"
                >
                  <p className="text-sm text-orange-700">
                    <strong>Development Mode:</strong> Please configure your OIDC settings in the
                    environment variables.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
