import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap, Code, BookOpen, Settings, ExternalLink } from 'lucide-react';

export const DocsHomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Universal Knowledge Chatbot</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive documentation for the AI-powered chatbot that makes complex information
          easily accessible through natural conversation.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/docs/getting-started/quick-start"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Quick Start
          </Link>
          <Link
            to="/home"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Try the App
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="h-8 w-8 text-blue-500" />
            <h3 className="text-lg font-semibold">Multiple Integrations</h3>
          </div>
          <p className="text-gray-600">
            Weather API, Slack integration, file upload processing, and more external data sources.
          </p>
          <Link
            to="/docs/features"
            className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800"
          >
            Explore Features →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-green-500" />
            <h3 className="text-lg font-semibold">Secure Authentication</h3>
          </div>
          <p className="text-gray-600">
            Enterprise-grade Auth0 SSO with Google login, JWT tokens, and HTTP-only cookies.
          </p>
          <Link
            to="/docs/security"
            className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800"
          >
            Security Guide →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="h-8 w-8 text-purple-500" />
            <h3 className="text-lg font-semibold">Modern Tech Stack</h3>
          </div>
          <p className="text-gray-600">
            React 18, TypeScript, Express.js, LangChain, OpenAI, and Vector databases.
          </p>
          <Link
            to="/docs/architecture"
            className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800"
          >
            Architecture →
          </Link>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-6">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Getting Started
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/docs/getting-started/installation" className="hover:text-blue-600">
                  • Installation Guide
                </Link>
              </li>
              <li>
                <Link to="/docs/getting-started/environment-setup" className="hover:text-blue-600">
                  • Environment Setup
                </Link>
              </li>
              <li>
                <Link to="/docs/getting-started/cheat-sheet" className="hover:text-blue-600">
                  • Command Cheat Sheet
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configuration
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/docs/deployment/environment" className="hover:text-blue-600">
                  • Environment Variables
                </Link>
              </li>
              <li>
                <Link to="/docs/security/auth0-setup" className="hover:text-blue-600">
                  • Auth0 Configuration
                </Link>
              </li>
              <li>
                <Link to="/docs/deployment/vercel" className="hover:text-blue-600">
                  • Vercel Deployment
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Project Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">React + TS</div>
            <div className="text-sm text-gray-600">Frontend</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">Express.js</div>
            <div className="text-sm text-gray-600">Backend API</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">LangChain</div>
            <div className="text-sm text-gray-600">AI Framework</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-600">Auth0</div>
            <div className="text-sm text-gray-600">Authentication</div>
          </div>
        </div>
      </div>
    </div>
  );
};
