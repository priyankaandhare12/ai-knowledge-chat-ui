import React from 'react';
import { DocPage, Alert, QuickLinks } from '@/components/docs/DocComponents';
import { Cloud, MessageSquare, FileText, Shield, Database, Zap } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <DocPage
      title="Features Overview"
      description="Comprehensive guide to all Universal Knowledge Chatbot features and integrations"
      lastUpdated="September 28, 2025"
      backLink="/docs"
      backLinkText="Back to Documentation"
    >
      <div className="space-y-8">
        <Alert type="info">
          <p>
            The Universal Knowledge Chatbot supports multiple knowledge sources and integrations.
            Each feature can be configured independently based on your needs.
          </p>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🔥 Core Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-semibold">Auth0 Authentication</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Enterprise-grade authentication with Google SSO, JWT tokens, and HTTP-only cookies.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Google Social Login</li>
                <li>• JWT Session Management</li>
                <li>• Domain Restrictions</li>
                <li>• Secure Cookie Handling</li>
              </ul>
              <a
                href="/docs/features/authentication"
                className="text-blue-600 hover:underline text-sm"
              >
                Learn more →
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Cloud className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold">Weather Integration</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Real-time weather data integration using OpenWeatherMap API with natural language
                queries.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Current weather conditions</li>
                <li>• Natural language queries</li>
                <li>• Multiple city support</li>
                <li>• Detailed weather descriptions</li>
              </ul>
              <a href="/docs/features/weather" className="text-blue-600 hover:underline text-sm">
                Learn more →
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="h-8 w-8 text-purple-500" />
                <h3 className="text-lg font-semibold">Slack Integration</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Search through team conversations and project discussions with AI-powered
                understanding.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• Channel message search</li>
                <li>• Thread analysis</li>
                <li>• Team member queries</li>
                <li>• Project discussion insights</li>
              </ul>
              <a href="/docs/features/slack" className="text-blue-600 hover:underline text-sm">
                Learn more →
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-8 w-8 text-orange-500" />
                <h3 className="text-lg font-semibold">Document Processing</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Upload and analyze PDF files with AI-powered Q&A and content extraction.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>• PDF file upload</li>
                <li>• Content extraction</li>
                <li>• Vector database storage</li>
                <li>• Semantic search</li>
              </ul>
              <a
                href="/docs/features/pdf-processing"
                className="text-blue-600 hover:underline text-sm"
              >
                Learn more →
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🔧 Technical Features</h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  LangChain & LangGraph Integration
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                Advanced AI workflow orchestration with intelligent routing and context management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">Smart Routing</h4>
                  <p className="text-sm text-gray-600">
                    Automatically routes queries to appropriate knowledge sources
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">Context Awareness</h4>
                  <p className="text-sm text-gray-600">
                    Maintains conversation context across multiple exchanges
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">Multi-Source Synthesis</h4>
                  <p className="text-sm text-gray-600">
                    Combines information from multiple sources intelligently
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Vector Database Integration</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Pinecone vector database for semantic search and knowledge retrieval.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">Semantic Search</h4>
                  <p className="text-sm text-gray-600">
                    Find relevant information based on meaning, not just keywords
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">Scalable Storage</h4>
                  <p className="text-sm text-gray-600">
                    Efficiently store and retrieve large document collections
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🚀 Advanced Capabilities</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Multi-Modal Input Support</h3>
              <p className="text-gray-600">
                Support for text, file uploads, and API integrations with intelligent content
                processing.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Real-Time Data Integration</h3>
              <p className="text-gray-600">
                Connect to live APIs and databases for up-to-date information retrieval.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Extensible Architecture</h3>
              <p className="text-gray-600">
                Modular design allows easy addition of new knowledge sources and integrations.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-lg font-semibold mb-2">Enterprise Security</h3>
              <p className="text-gray-600">
                Production-ready security with Auth0, JWT tokens, and configurable access controls.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">📋 Feature Status</h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium">Implementation Status</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">Auth0 Authentication</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">Weather API Integration</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">PDF Document Processing</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">Slack Integration</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">Vector Database (Pinecone)</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="font-medium">LangChain Workflows</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  ✅ Complete
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📚 Detailed Feature Documentation</h2>

          <QuickLinks
            links={[
              {
                title: 'Authentication Setup',
                description: 'Complete Auth0 configuration and Google SSO setup',
                href: '/docs/features/authentication',
              },
              {
                title: 'Weather Integration',
                description: 'OpenWeatherMap API setup and usage examples',
                href: '/docs/features/weather',
              },
              {
                title: 'Slack Integration',
                description: 'Connect to Slack workspaces and search conversations',
                href: '/docs/features/slack',
              },
              {
                title: 'File Upload & Processing',
                description: 'PDF upload, processing, and Q&A capabilities',
                href: '/docs/features/file-upload',
              },
              {
                title: 'External Source Implementation',
                description: 'Adding new data sources and API integrations',
                href: '/docs/features/external-sources',
              },
              {
                title: 'API Reference',
                description: 'Complete API documentation for all endpoints',
                href: '/docs/api',
              },
            ]}
          />
        </section>

        <Alert type="tip">
          <p>
            <strong>Need help with a specific feature?</strong> Each feature has detailed
            documentation with setup instructions, code examples, and troubleshooting guides. Use
            the sidebar navigation to explore specific topics.
          </p>
        </Alert>
      </div>
    </DocPage>
  );
};
