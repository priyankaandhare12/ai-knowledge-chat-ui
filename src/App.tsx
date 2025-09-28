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
import { QAAutomation } from '@/pages/docs/QAAutomation';

// Overview pages
import IntroductionPage from '@/pages/docs/overview/IntroductionPage';
import ProjectGoalsPage from '@/pages/docs/overview/ProjectGoalsPage';
import TechStackPage from '@/pages/docs/overview/TechStackPage';

// Architecture pages
import SystemOverviewPage from '@/pages/docs/architecture/SystemOverviewPage';
import FrontendArchitecturePage from '@/pages/docs/architecture/FrontendArchitecturePage';
import BackendArchitecturePage from '@/pages/docs/architecture/BackendArchitecturePage';
import DatabaseDesignPage from '@/pages/docs/architecture/DatabaseDesignPage';

// Feature pages
import AuthenticationPage from '@/pages/docs/features/AuthenticationPage';
import WeatherIntegrationPage from '@/pages/docs/features/WeatherIntegrationPage';
import SlackIntegrationPage from '@/pages/docs/features/SlackIntegrationPage';

// API Reference pages
import APIReferencePage from '@/pages/docs/api/APIReferencePage';
import AuthenticationAPIPage from '@/pages/docs/api/AuthenticationAPIPage';
import ChatAPIPage from '@/pages/docs/api/ChatAPIPage';

// Additional feature pages
import FileUploadPage from '@/pages/docs/features/FileUploadPage';

// Deployment pages
import DeploymentPage from '@/pages/docs/deployment/DeploymentPage';

// Security pages
import SecurityOverviewPage from '@/pages/docs/security/SecurityOverviewPage';

// Development pages
import DevelopmentGuidePage from '@/pages/docs/development/DevelopmentGuidePage';

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

              {/* Overview */}
              <Route path="overview/introduction" element={<IntroductionPage />} />
              <Route path="overview/goals" element={<ProjectGoalsPage />} />
              <Route path="overview/tech-stack" element={<TechStackPage />} />

              {/* Getting Started */}
              <Route path="getting-started/quick-start" element={<QuickStartPage />} />
              <Route path="getting-started/installation" element={<InstallationPage />} />
              <Route path="getting-started/environment-setup" element={<EnvironmentSetupPage />} />
              <Route path="getting-started/cheat-sheet" element={<CheatSheetPage />} />

              {/* Architecture */}
              <Route path="architecture" element={<ArchitecturePage />} />
              <Route path="architecture/system-overview" element={<SystemOverviewPage />} />
              <Route path="architecture/frontend" element={<FrontendArchitecturePage />} />
              <Route path="architecture/backend" element={<BackendArchitecturePage />} />
              <Route path="architecture/database" element={<DatabaseDesignPage />} />

              {/* Features */}
              <Route path="features" element={<FeaturesPage />} />
              <Route path="features/authentication" element={<AuthenticationPage />} />
              <Route path="features/weather" element={<WeatherIntegrationPage />} />
              <Route path="features/slack" element={<SlackIntegrationPage />} />
              <Route path="features/file-upload" element={<FileUploadPage />} />

              {/* API Reference */}
              <Route path="api" element={<APIReferencePage />} />
              <Route path="api/authentication" element={<AuthenticationAPIPage />} />
              <Route path="api/chat" element={<ChatAPIPage />} />

              {/* Deployment */}
              <Route path="deployment" element={<DeploymentPage />} />
              <Route path="deployment/vercel" element={<DeploymentPage />} />

              {/* Development */}
              <Route path="development/guide" element={<DevelopmentGuidePage />} />
              <Route path="development/qa-automation" element={<QAAutomation />} />

              {/* Security */}
              <Route path="security/overview" element={<SecurityOverviewPage />} />

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
