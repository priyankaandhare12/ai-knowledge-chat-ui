import React from 'react';

export const SystemOverviewPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">System Overview</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive architectural overview of how all components work together to deliver
            intelligent knowledge access.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🏗️ High-Level Architecture
            </h2>
            <div className="bg-white p-6 rounded-lg border border-blue-100">
              <div className="font-mono text-sm">
                <pre className="text-gray-700 whitespace-pre-wrap">
                  {`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │◄──►│    Backend      │◄──►│  AI Services    │
│   (React App)   │    │ (Express API)   │    │  (OpenAI/LC)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth0 SSO     │    │ External APIs   │    │ Vector Database │
│  (Security)     │    │(Weather/Slack)  │    │   (Pinecone)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔄 Data Flow Architecture</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
                <span className="mr-2">1️⃣</span>
                User Interaction Layer
              </h3>
              <p className="text-gray-700 mb-4">
                Users interact through a modern React-based chat interface. Authentication is
                handled seamlessly via Auth0 SSO.
              </p>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <div className="text-sm text-green-800">
                  <strong>Components:</strong> Chat UI, Authentication Forms, File Upload Interface,
                  Settings Dashboard
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
                <span className="mr-2">2️⃣</span>
                API Gateway & Processing
              </h3>
              <p className="text-gray-700 mb-4">
                Express.js backend receives requests, validates authentication, and routes queries
                to appropriate processing engines.
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <div className="text-sm text-blue-800">
                  <strong>Components:</strong> REST API Endpoints, JWT Validation, Request Routing,
                  Error Handling
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-purple-700">
                <span className="mr-2">3️⃣</span>
                AI Processing Engine
              </h3>
              <p className="text-gray-700 mb-4">
                LangChain orchestrates AI workflows, managing context, tool selection, and response
                generation through OpenAI models.
              </p>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <div className="text-sm text-purple-800">
                  <strong>Components:</strong> LangChain Agents, OpenAI GPT Models, Tool Selection
                  Logic, Context Management
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-700">
                <span className="mr-2">4️⃣</span>
                Data Sources & Integration
              </h3>
              <p className="text-gray-700 mb-4">
                Multiple data sources provide information: vector database for documents, external
                APIs for real-time data, and integrated services.
              </p>
              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <div className="text-sm text-orange-800">
                  <strong>Components:</strong> Pinecone Vector DB, Weather API, Slack API, File
                  Processing Pipeline
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🛡️ Security Architecture</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">🔐 Authentication Flow</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>User initiates login via Auth0</li>
                <li>Auth0 handles SSO with Google</li>
                <li>JWT token issued upon success</li>
                <li>Token validated on each API request</li>
                <li>Secure session management</li>
              </ol>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🛡️ Data Protection</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>HTTPS encryption in transit</li>
                <li>Environment variable secrets</li>
                <li>API key protection</li>
                <li>Input validation and sanitization</li>
                <li>CORS and CSP headers</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Scalability Design</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🔄</span>
              <div>
                <strong>Stateless Backend:</strong> Express API designed as stateless microservice,
                enabling horizontal scaling
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">⚡</span>
              <div>
                <strong>Efficient Caching:</strong> TanStack Query on frontend, vector similarity
                caching in Pinecone
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🌐</span>
              <div>
                <strong>CDN Distribution:</strong> Static assets served via Vercel's global edge
                network
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">📈</span>
              <div>
                <strong>Auto-scaling:</strong> Serverless functions scale automatically based on
                demand
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Component Interactions</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">Query Processing Flow</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-gray-300">
                <div className="font-medium text-sm text-gray-800 mb-1">
                  Step 1: Query Reception
                </div>
                <div className="text-xs text-gray-600">
                  User submits query → Frontend validates → Auth token attached → API call made
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-300">
                <div className="font-medium text-sm text-gray-800 mb-1">Step 2: Authentication</div>
                <div className="text-xs text-gray-600">
                  Backend validates JWT → User permissions checked → Request authorized
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-300">
                <div className="font-medium text-sm text-gray-800 mb-1">
                  Step 3: Intent Classification
                </div>
                <div className="text-xs text-gray-600">
                  LangChain agent analyzes query → Determines required tools/sources → Plans
                  execution
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-300">
                <div className="font-medium text-sm text-gray-800 mb-1">Step 4: Data Retrieval</div>
                <div className="text-xs text-gray-600">
                  Vector search (documents) OR API calls (weather/Slack) → Data gathered and
                  processed
                </div>
              </div>

              <div className="bg-white p-3 rounded border border-gray-300">
                <div className="font-medium text-sm text-gray-800 mb-1">
                  Step 5: Response Generation
                </div>
                <div className="text-xs text-gray-600">
                  OpenAI processes context → Generates natural language response → Returns to
                  frontend
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🚀 Performance Optimizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Frontend Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Code splitting and lazy loading</li>
                <li>• Optimized bundle size with tree shaking</li>
                <li>• React Query for intelligent caching</li>
                <li>• Memoized components and callbacks</li>
                <li>• Compressed assets and images</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Backend Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Connection pooling for databases</li>
                <li>• Response compression (gzip)</li>
                <li>• Efficient vector similarity search</li>
                <li>• API response caching strategies</li>
                <li>• Optimized LangChain workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverviewPage;
