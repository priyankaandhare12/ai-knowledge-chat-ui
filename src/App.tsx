import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/ProtectedRoute';
import { AuthCallback } from '@/components/AuthCallback';
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { DocsLayout } from '@/components/layouts/DocsLayout';
import { DocsHomePage } from '@/pages/docs/DocsHomePage';
import { QuickStartPage } from '@/pages/docs/QuickStartPage';
import { InstallationPage } from '@/pages/docs/InstallationPage';
import { EnvironmentSetupPage } from '@/pages/docs/EnvironmentSetupPage';
import { CheatSheetPage } from '@/pages/docs/CheatSheetPage';
import { FeaturesPage } from '@/pages/docs/FeaturesPage';
import { ArchitecturePage } from '@/pages/docs/ArchitecturePage';
import { validateConfig } from '@/config';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // Validate configuration on app start
  React.useEffect(() => {
    validateConfig();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - only accessible when not authenticated */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />

            {/* Auth callback routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Public documentation routes - accessible without authentication */}
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsHomePage />} />

              {/* Getting Started */}
              <Route path="getting-started/quick-start" element={<QuickStartPage />} />
              <Route path="getting-started/installation" element={<InstallationPage />} />
              <Route path="getting-started/environment-setup" element={<EnvironmentSetupPage />} />
              <Route path="getting-started/cheat-sheet" element={<CheatSheetPage />} />

              {/* Features */}
              <Route path="features" element={<FeaturesPage />} />

              {/* Architecture */}
              <Route path="architecture" element={<ArchitecturePage />} />

              {/* Fallback for unmatched docs routes */}
              <Route path="*" element={<Navigate to="/docs" replace />} />
            </Route>

            {/* Protected routes - require authentication */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
