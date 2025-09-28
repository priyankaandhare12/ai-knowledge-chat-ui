import React from 'react';

export const TechStackPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Technology Stack</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive overview of the modern technologies powering the Universal Knowledge
            Chatbot.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">🏗️ Architecture Overview</h2>
            <div className="font-mono text-sm bg-white p-4 rounded border">
              <pre className="text-gray-700 whitespace-pre-wrap">
                {`Frontend (React/TypeScript) ↔ Backend (Express/Node.js) ↔ AI Services (OpenAI/LangChain)
                            ↕                           ↕
                      Auth0 SSO                    External APIs
                                                 (Weather, Slack)
                                                       ↕
                                                 Vector Database
                                                   (Pinecone)`}
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎨 Frontend Stack</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">⚛️</div>
                <div>
                  <h3 className="text-lg font-semibold">React 18</h3>
                  <p className="text-sm text-gray-500">Modern UI Library</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Latest React with concurrent features, hooks, and modern development patterns for
                building responsive user interfaces.
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Features: Suspense, Error Boundaries, Context API
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">📘</div>
                <div>
                  <h3 className="text-lg font-semibold">TypeScript</h3>
                  <p className="text-sm text-gray-500">Type-Safe JavaScript</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Static type checking for better developer experience, fewer runtime errors, and
                improved code maintainability.
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Features: Strict typing, Interfaces, Generics
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">⚡</div>
                <div>
                  <h3 className="text-lg font-semibold">Vite</h3>
                  <p className="text-sm text-gray-500">Next-Gen Build Tool</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Lightning-fast development server and optimized production builds with ESM-based
                architecture.
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Features: HMR, Tree Shaking, Code Splitting
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🎨</div>
                <div>
                  <h3 className="text-lg font-semibold">Tailwind CSS</h3>
                  <p className="text-sm text-gray-500">Utility-First CSS</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Utility-first CSS framework for rapid UI development with consistent design system
                and responsive capabilities.
              </p>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Features: JIT Mode, Dark Mode, Custom Components
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Additional Frontend Libraries
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🎭 Framer Motion</h4>
              <p className="text-sm text-gray-600">Smooth animations and transitions</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🔄 TanStack Query</h4>
              <p className="text-sm text-gray-600">Server state management and caching</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🧩 shadcn/ui</h4>
              <p className="text-sm text-gray-600">Beautiful, accessible UI components</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🛣️ React Router</h4>
              <p className="text-sm text-gray-600">Client-side routing and navigation</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🔒 Auth0 React SDK</h4>
              <p className="text-sm text-gray-600">Authentication integration</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="font-medium mb-2">🎯 Lucide React</h4>
              <p className="text-sm text-gray-600">Beautiful SVG icons</p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Backend Stack</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🟢</div>
                <div>
                  <h3 className="text-lg font-semibold">Node.js + Express</h3>
                  <p className="text-sm text-gray-500">Server Runtime & Framework</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Fast, unopinionated web framework for Node.js with middleware ecosystem for building
                robust APIs.
              </p>
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Features: RESTful APIs, Middleware, Error Handling
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🤖</div>
                <div>
                  <h3 className="text-lg font-semibold">LangChain + LangGraph</h3>
                  <p className="text-sm text-gray-500">AI Workflow Orchestration</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Advanced framework for building AI applications with chaining capabilities and
                graph-based workflow orchestration.
              </p>
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Features: Chain Management, Memory, Tool Integration
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🧠</div>
                <div>
                  <h3 className="text-lg font-semibold">OpenAI GPT</h3>
                  <p className="text-sm text-gray-500">Language Model</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                State-of-the-art large language model for natural language understanding and
                generation.
              </p>
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Features: GPT-4, Function Calling, Embeddings
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🌲</div>
                <div>
                  <h3 className="text-lg font-semibold">Pinecone</h3>
                  <p className="text-sm text-gray-500">Vector Database</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Managed vector database for storing and searching document embeddings with high
                performance similarity search.
              </p>
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                Features: Semantic Search, Scalable, Real-time
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔗 External Integrations</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-3 text-orange-800">🌤️ OpenWeatherMap API</h3>
              <p className="text-gray-700 mb-2">
                Real-time weather data integration providing current conditions, forecasts, and
                climate information for any global location.
              </p>
              <div className="text-sm text-orange-600">
                <strong>Capabilities:</strong> Current weather, 5-day forecast, weather alerts,
                historical data
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">💬 Slack API</h3>
              <p className="text-gray-700 mb-2">
                Team communication integration for searching through project discussions, channels,
                and archived conversations.
              </p>
              <div className="text-sm text-purple-600">
                <strong>Capabilities:</strong> Message search, channel data, user information, file
                access
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">🔐 Auth0</h3>
              <p className="text-gray-700 mb-2">
                Enterprise-grade authentication and authorization platform with Single Sign-On (SSO)
                and Google integration.
              </p>
              <div className="text-sm text-blue-600">
                <strong>Capabilities:</strong> SSO, Multi-factor auth, User management, Social
                logins
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🛠️ Development & Testing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🧪 Testing Framework</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Jest:</strong> Unit and integration testing
                </li>
                <li>
                  <strong>React Testing Library:</strong> Component testing
                </li>
                <li>
                  <strong>Supertest:</strong> API endpoint testing
                </li>
                <li>
                  <strong>Coverage Reports:</strong> Code quality metrics
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🚀 Deployment & DevOps</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Vercel:</strong> Frontend hosting and deployment
                </li>
                <li>
                  <strong>Docker:</strong> Containerization for backend
                </li>
                <li>
                  <strong>PM2:</strong> Process management
                </li>
                <li>
                  <strong>GitHub Actions:</strong> CI/CD pipeline
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📋 Package Management</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Frontend Dependencies</h4>
                <div className="text-sm text-gray-600 space-y-1 font-mono">
                  <div>react: ^18.2.0</div>
                  <div>typescript: ^5.0.2</div>
                  <div>vite: ^4.4.5</div>
                  <div>tailwindcss: ^3.3.0</div>
                  <div>@tanstack/react-query: ^4.32.6</div>
                  <div>framer-motion: ^10.16.4</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Backend Dependencies</h4>
                <div className="text-sm text-gray-600 space-y-1 font-mono">
                  <div>express: ^4.18.2</div>
                  <div>langchain: ^0.0.147</div>
                  <div>@langchain/openai: ^0.0.14</div>
                  <div>@pinecone-database/pinecone: ^1.1.0</div>
                  <div>express-oauth-server: ^2.0.0</div>
                  <div>jest: ^29.7.0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackPage;
