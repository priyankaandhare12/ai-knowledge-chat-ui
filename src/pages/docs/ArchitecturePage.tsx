import React from 'react';
import { DocPage, CodeBlock, Alert, QuickLinks } from '@/components/docs/DocComponents';

export const ArchitecturePage: React.FC = () => {
  return (
    <DocPage
      title="System Architecture"
      description="Comprehensive overview of the Universal Knowledge Chatbot architecture and design patterns"
      lastUpdated="September 28, 2025"
      backLink="/docs"
      backLinkText="Back to Documentation"
    >
      <div className="space-y-8">
        <Alert type="info">
          <p>
            The Universal Knowledge Chatbot follows a modern microservices architecture with clear
            separation between frontend, backend, and external services.
          </p>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🏗️ High-Level Architecture</h2>

          <div className="bg-gray-50 p-6 rounded-lg border">
            <pre className="text-sm text-gray-800 font-mono overflow-x-auto">
              {`┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │   React UI      │    │  Documentation  │    │   Mobile Web    │     │
│  │   (Port 3000)   │    │    (/docs)      │    │   Responsive    │     │
│  │                 │    │                 │    │                 │     │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                              HTTPS/REST API
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Express.js Server                             │   │
│  │                     (Port 3001)                                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │  │    Auth     │  │    Chat     │  │    File     │             │   │
│  │  │ Middleware  │  │   Routes    │  │   Upload    │             │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                            AI ORCHESTRATION
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI PROCESSING LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    LangChain + LangGraph                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │  │   Router    │  │   Weather   │  │  Document   │             │   │
│  │  │    Node     │  │    Node     │  │    Node     │             │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │  │    Slack    │  │   OpenAI    │  │   Vector    │             │   │
│  │  │    Node     │  │    GPT-4    │  │  Database   │             │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                           EXTERNAL INTEGRATIONS
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │    Auth0    │  │ OpenWeather │  │    Slack    │  │   Pinecone  │   │
│  │     SSO     │  │     API     │  │     API     │  │   Vector    │   │
│  │             │  │             │  │             │  │  Database   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">📱 Frontend Architecture</h2>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">React 18</h4>
                <p className="text-sm text-blue-700">
                  Modern React with hooks, concurrent features, and automatic batching
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">TypeScript</h4>
                <p className="text-sm text-blue-700">
                  Type safety, better IDE support, and enhanced developer experience
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Vite</h4>
                <p className="text-sm text-blue-700">
                  Fast build tool with hot module replacement and optimized bundling
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Tailwind CSS</h4>
                <p className="text-sm text-blue-700">
                  Utility-first CSS framework with responsive design system
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">TanStack Query</h4>
                <p className="text-sm text-blue-700">
                  Powerful server state management with caching and synchronization
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">React Router</h4>
                <p className="text-sm text-blue-700">
                  Declarative routing with nested routes and code splitting
                </p>
              </div>
            </div>

            <h3 className="text-xl font-medium">Component Architecture</h3>
            <CodeBlock language="text" title="Frontend Structure">
              {`src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI primitives (buttons, inputs)
│   ├── docs/           # Documentation-specific components
│   ├── layouts/        # Page layout components
│   ├── ProtectedRoute.tsx
│   └── AuthCallback.tsx
├── pages/              # Page-level components
│   ├── HomePage.tsx    # Main chat interface
│   ├── LoginPage.tsx   # Authentication page
│   └── docs/           # Documentation pages
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state
├── services/           # API communication layer
│   └── auth.service.ts
├── hooks/              # Custom React hooks
│   └── useApi.ts
└── config/             # Configuration and constants
    └── index.ts`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">⚙️ Backend Architecture</h2>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Express.js</h4>
                <p className="text-sm text-green-700">
                  Fast, unopinionated web framework for Node.js
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">LangChain</h4>
                <p className="text-sm text-green-700">
                  Framework for developing applications with large language models
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibent text-green-900 mb-2">LangGraph</h4>
                <p className="text-sm text-green-700">
                  Workflow orchestration for complex AI agent interactions
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">OpenAI GPT</h4>
                <p className="text-sm text-green-700">
                  Large language model for natural language processing
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Auth0</h4>
                <p className="text-sm text-green-700">Authentication and authorization platform</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Jest</h4>
                <p className="text-sm text-green-700">
                  JavaScript testing framework with built-in assertion library
                </p>
              </div>
            </div>

            <h3 className="text-xl font-medium">Server Architecture</h3>
            <CodeBlock language="text" title="Backend Structure">
              {`knowledge-chatbot/server/
├── app/
│   ├── services/           # Business logic layer
│   │   ├── auth0.service.js
│   │   ├── chat.service.js
│   │   └── file.service.js
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── cors.middleware.js
│   │   └── error.middleware.js
│   └── utils/             # Utility functions
│       ├── langchain/     # LangChain configurations
│       └── validators/    # Input validation
├── routes/
│   └── api/               # API route definitions
│       ├── auth.js        # Authentication endpoints
│       ├── chat.js        # Chat endpoints
│       └── files.js       # File upload endpoints
├── config/                # Configuration files
│   ├── environment.js     # Environment variables
│   └── database.js        # Database configuration
└── tests/                 # Test suites
    ├── integration/       # Integration tests
    └── unit/              # Unit tests`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🤖 AI Workflow Architecture</h2>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">LangGraph Flow</h3>
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <pre className="text-sm text-purple-800 font-mono overflow-x-auto">
                {`                    ┌─────────────────┐
                    │   User Query    │
                    └─────────┬───────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Router Node    │
                    │  (Intent        │
                    │   Classification)│
                    └─────────┬───────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  Weather Node   │ │ Document Node   │ │   Slack Node    │
    │                 │ │                 │ │                 │
    │ OpenWeatherMap  │ │ Vector Search + │ │ Slack API +     │
    │ API Integration │ │ PDF Processing  │ │ Message Search  │
    └─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
              │                   │                   │
              └─────────────┬─────────────────────────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │   OpenAI GPT    │
                  │   Synthesis     │
                  │   & Response    │
                  └─────────┬───────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │ Formatted       │
                  │ Response        │
                  └─────────────────┘`}
              </pre>
            </div>

            <h3 className="text-xl font-medium">Node Responsibilities</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold mb-1">Router Node</h4>
                <p className="text-gray-600">
                  Analyzes user intent and routes queries to appropriate specialized nodes
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold mb-1">Weather Node</h4>
                <p className="text-gray-600">
                  Handles weather-related queries using OpenWeatherMap API
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold mb-1">Document Node</h4>
                <p className="text-gray-600">
                  Processes PDF files and performs semantic search using vector database
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold mb-1">Slack Node</h4>
                <p className="text-gray-600">
                  Searches through Slack conversations and team communications
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">🔐 Security Architecture</h2>

          <div className="space-y-6">
            <h3 className="text-xl font-medium">Authentication Flow</h3>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <pre className="text-sm text-gray-800 font-mono overflow-x-auto">
                {`Frontend                Backend                 Auth0
    │                       │                     │
    │ 1. /login click        │                     │
    ├──────────────────────► │                     │
    │                       │ 2. Generate auth URL│
    │                       ├────────────────────►│
    │                       │                     │
    │ 3. Redirect to Auth0  │                     │
    │◄──────────────────────┤                     │
    │                       │                     │
    │ 4. OAuth flow         │                     │
    ├───────────────────────────────────────────►│
    │                       │                     │
    │ 5. Callback to backend│                     │
    │                       │◄────────────────────┤
    │                       │ 6. Exchange code    │
    │                       ├────────────────────►│
    │                       │    for tokens       │
    │                       │◄────────────────────┤
    │ 7. Set HTTP-only      │                     │
    │    cookie & redirect  │                     │
    │◄──────────────────────┤                     │`}
              </pre>
            </div>

            <h3 className="text-xl font-medium">Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Authentication</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Auth0 Enterprise SSO</li>
                  <li>• Google Social Login</li>
                  <li>• JWT Token Management</li>
                  <li>• HTTP-Only Cookies</li>
                  <li>• Session Management</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Data Protection</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• HTTPS Encryption</li>
                  <li>• Environment Variable Security</li>
                  <li>• CORS Configuration</li>
                  <li>• Input Validation</li>
                  <li>• Rate Limiting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">📊 Data Flow</h2>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Chat Message Processing</h3>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
                <li>User submits chat message through React frontend</li>
                <li>Frontend sends authenticated request to Express.js backend</li>
                <li>Backend validates JWT token and extracts user information</li>
                <li>Message is processed through LangGraph workflow</li>
                <li>Router Node determines appropriate knowledge source</li>
                <li>Specialized node processes query (Weather/Document/Slack)</li>
                <li>Results are synthesized using OpenAI GPT-4</li>
                <li>Formatted response is returned to frontend</li>
                <li>Frontend displays response with proper formatting</li>
              </ol>
            </div>

            <h3 className="text-xl font-medium">File Upload Processing</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>User selects PDF file through upload interface</li>
                <li>File is uploaded to Express.js backend with progress tracking</li>
                <li>Backend validates file type and size constraints</li>
                <li>PDF content is extracted using LangChain document loaders</li>
                <li>Text is chunked and converted to vector embeddings</li>
                <li>Embeddings are stored in Pinecone vector database</li>
                <li>File metadata is stored for future reference</li>
                <li>Success confirmation is returned to frontend</li>
              </ol>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📚 Related Documentation</h2>

          <QuickLinks
            links={[
              {
                title: 'Frontend Setup',
                description: 'Detailed frontend configuration and development guide',
                href: '/docs/architecture/frontend',
              },
              {
                title: 'Backend Setup',
                description: 'Backend architecture and API development guide',
                href: '/docs/architecture/backend',
              },
              {
                title: 'Security Guide',
                description: 'Comprehensive security implementation and best practices',
                href: '/docs/security',
              },
              {
                title: 'API Reference',
                description: 'Complete API documentation with examples',
                href: '/docs/api',
              },
              {
                title: 'Deployment Guide',
                description: 'Production deployment and infrastructure setup',
                href: '/docs/deployment',
              },
              {
                title: 'Testing Strategy',
                description: 'Testing approaches and quality assurance processes',
                href: '/docs/development/testing',
              },
            ]}
          />
        </section>

        <Alert type="tip">
          <p>
            <strong>Performance Considerations:</strong> The architecture is designed for
            scalability with caching layers, optimized database queries, and efficient API
            integrations. Monitor performance metrics and consider implementing additional caching
            strategies for high-traffic scenarios.
          </p>
        </Alert>
      </div>
    </DocPage>
  );
};
