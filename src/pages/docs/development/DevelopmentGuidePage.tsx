import React from 'react';

export const DevelopmentGuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Development Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive development environment setup, coding standards, and workflow guidelines
            for contributing to the Universal Knowledge Chatbot project.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🚀 Quick Start Development
            </h2>
            <p className="text-gray-700">
              Get your development environment running in minutes with our streamlined setup
              process. This guide covers everything from initial repository setup to advanced
              debugging techniques.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🔧 Development Environment Setup
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">📋 Prerequisites</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-gray-800">Required Software</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded border">
                      <span className="font-medium">Node.js</span>
                      <span className="text-sm text-green-700">v18.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                      <span className="font-medium">pnpm</span>
                      <span className="text-sm text-blue-700">v8.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded border">
                      <span className="font-medium">Docker</span>
                      <span className="text-sm text-purple-700">v24.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded border">
                      <span className="font-medium">Git</span>
                      <span className="text-sm text-orange-700">v2.40.0+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-gray-800">Development Tools</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-indigo-50 rounded border">
                      <span className="font-medium">VS Code</span>
                      <span className="text-sm text-indigo-700">Recommended</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-pink-50 rounded border">
                      <span className="font-medium">ESLint Extension</span>
                      <span className="text-sm text-pink-700">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-teal-50 rounded border">
                      <span className="font-medium">Prettier Extension</span>
                      <span className="text-sm text-teal-700">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border">
                      <span className="font-medium">TypeScript Extension</span>
                      <span className="text-sm text-yellow-700">Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚡ Initial Setup</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">1️⃣ Repository Clone & Setup</h3>

              <div className="bg-black rounded p-4 text-green-400 font-mono text-sm mb-4">
                <div className="mb-2"># Clone the frontend repository</div>
                <div className="mb-2">
                  git clone https://github.com/priyankaandhare12/ai-knowledge-chat-ui.git
                </div>
                <div className="mb-2">cd ai-knowledge-chat-ui</div>
                <br />
                <div className="mb-2"># Clone the backend repository</div>
                <div className="mb-2">
                  git clone https://github.com/priyankaandhare12/knowledge-chatbot.git
                </div>
                <div className="mb-2">cd knowledge-chatbot</div>
                <br />
                <div className="mb-2"># Install frontend dependencies</div>
                <div className="mb-2">cd ../ai-knowledge-chat-ui</div>
                <div className="mb-2">pnpm install</div>
                <br />
                <div className="mb-2"># Install backend dependencies</div>
                <div className="mb-2">cd ../knowledge-chatbot/server</div>
                <div>npm install</div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-4">2️⃣ Environment Configuration</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Frontend Environment (.env)</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_API_BASE_URL=http://localhost:3001/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_APP_URL=http://localhost:5173
VITE_ENVIRONMENT=development`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Backend Environment (.env)</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`PORT=3001
NODE_ENV=development
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=knowledge-chatbot
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_APP_TOKEN=xapp-your-slack-app-token
OPENWEATHER_API_KEY=your_openweather_api_key
CORS_ORIGIN=http://localhost:5173`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-4">3️⃣ Start Development Servers</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Frontend Development</h4>
                  <div className="bg-black rounded p-3 text-green-400 font-mono text-sm">
                    <div>cd ai-knowledge-chat-ui</div>
                    <div>pnpm dev</div>
                    <div className="text-gray-400 mt-2"># Runs on http://localhost:5173</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Backend Development</h4>
                  <div className="bg-black rounded p-3 text-green-400 font-mono text-sm">
                    <div>cd knowledge-chatbot/server</div>
                    <div>npm run dev</div>
                    <div className="text-gray-400 mt-2"># Runs on http://localhost:3001</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📁 Project Structure</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🗂️ Frontend Structure</h3>

              <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                <pre className="text-gray-800 whitespace-pre-wrap">
                  {`ai-knowledge-chat-ui/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layouts/        # Layout components
│   │   └── docs/           # Documentation components
│   ├── pages/              # Page components
│   │   ├── docs/           # Documentation pages
│   │   └── HomePage.tsx    # Main application page
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── lib/                # Utility libraries
│   └── __tests__/          # Test files
├── public/                 # Static assets
├── coverage/               # Test coverage reports
└── docs/                   # Project documentation`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">⚙️ Backend Structure</h3>

              <div className="bg-gray-50 p-4 rounded border font-mono text-sm">
                <pre className="text-gray-800 whitespace-pre-wrap">
                  {`knowledge-chatbot/server/
├── app/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── routes/                # API route definitions
├── config/                # Configuration files
├── __tests__/             # Test files
├── coverage/              # Test coverage reports
└── index.js               # Application entry point`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎯 Development Workflow</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold mb-4 text-indigo-800">🌿 Git Workflow</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Branch Naming Convention</h4>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>
                      • <code>feature/description</code> - New features
                    </li>
                    <li>
                      • <code>bugfix/description</code> - Bug fixes
                    </li>
                    <li>
                      • <code>hotfix/description</code> - Critical fixes
                    </li>
                    <li>
                      • <code>refactor/description</code> - Code refactoring
                    </li>
                    <li>
                      • <code>docs/description</code> - Documentation updates
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Commit Message Format</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div className="text-gray-600">type(scope): description</div>
                    <div className="text-gray-600 mt-1">Examples:</div>
                    <div>feat(auth): add OAuth integration</div>
                    <div>fix(api): resolve chat endpoint error</div>
                    <div>docs(readme): update setup instructions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">🔄 Development Process</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    1
                  </span>
                  <div>
                    <strong>Create Feature Branch:</strong> Branch from main for new work
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    2
                  </span>
                  <div>
                    <strong>Write Tests:</strong> Add test cases for new functionality
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    3
                  </span>
                  <div>
                    <strong>Implement Feature:</strong> Write code following coding standards
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    4
                  </span>
                  <div>
                    <strong>Run Tests:</strong> Ensure all tests pass locally
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    5
                  </span>
                  <div>
                    <strong>Code Review:</strong> Create pull request for team review
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                    6
                  </span>
                  <div>
                    <strong>Deploy:</strong> Merge to main triggers deployment
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing Guidelines</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">🎭 Frontend Testing</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Testing Stack</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Jest - Test runner</li>
                    <li>• React Testing Library - Component testing</li>
                    <li>• MSW - API mocking</li>
                    <li>• @testing-library/jest-dom - Custom matchers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Test Commands</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div>pnpm test # Run tests</div>
                    <div>pnpm test:watch # Watch mode</div>
                    <div>pnpm test:coverage # Coverage</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">⚡ Backend Testing</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Testing Stack</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Jest - Test runner</li>
                    <li>• Supertest - HTTP testing</li>
                    <li>• MongoDB Memory Server - Database testing</li>
                    <li>• Nock - HTTP request mocking</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Test Commands</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div>npm test # Run tests</div>
                    <div>npm run test:watch # Watch mode</div>
                    <div>npm run test:coverage # Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📏 Coding Standards</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                🎨 Code Style & Formatting
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">TypeScript Rules</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Strict mode enabled</li>
                    <li>• No any types allowed</li>
                    <li>• Explicit return types for functions</li>
                    <li>• Interface over type for objects</li>
                    <li>• Consistent naming conventions</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">React Guidelines</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Functional components with hooks</li>
                    <li>• Custom hooks for reusable logic</li>
                    <li>• Props interface definitions</li>
                    <li>• Consistent component structure</li>
                    <li>• Error boundaries for error handling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">🛠️ Code Quality Tools</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">ESLint</h4>
                  <div className="bg-white p-3 rounded border text-sm">
                    <div className="font-mono">npm run lint</div>
                    <div className="text-gray-600 mt-1">Code linting</div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-medium mb-2">Prettier</h4>
                  <div className="bg-white p-3 rounded border text-sm">
                    <div className="font-mono">npm run format</div>
                    <div className="text-gray-600 mt-1">Code formatting</div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-medium mb-2">TypeScript</h4>
                  <div className="bg-white p-3 rounded border text-sm">
                    <div className="font-mono">npm run type-check</div>
                    <div className="text-gray-600 mt-1">Type checking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🔍 Debugging & Troubleshooting
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-4 text-red-800">
                🐛 Common Issues & Solutions
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Port Already in Use</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Error: EADDRINUSE: address already in use :::3001
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    lsof -ti:3001 | xargs kill -9
                  </div>
                </div>

                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Module Not Found</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Clear node_modules and reinstall dependencies
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    rm -rf node_modules package-lock.json && npm install
                  </div>
                </div>

                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Auth0 Configuration</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Check environment variables and Auth0 settings
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    node verify-env.js
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Performance Optimization</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">⚡</span>
              <div>
                <strong>Bundle Analysis:</strong> Use <code>pnpm run analyze</code> to inspect
                bundle size and dependencies
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🎯</span>
              <div>
                <strong>Code Splitting:</strong> Implement lazy loading for route-based code
                splitting
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🔍</span>
              <div>
                <strong>Performance Monitoring:</strong> Use React DevTools Profiler for component
                performance analysis
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">📊</span>
              <div>
                <strong>Lighthouse Audits:</strong> Regular performance, accessibility, and SEO
                audits
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🎯 Next Steps</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                • Review the <strong>Testing Requirements</strong> document for comprehensive
                testing guidelines
              </p>
              <p className="text-gray-700">
                • Check the <strong>Package Dependencies</strong> guide for library management
              </p>
              <p className="text-gray-700">
                • Follow the <strong>Deployment Guide</strong> for production deployment procedures
              </p>
              <p className="text-gray-700">
                • Join our development Slack channel for team communication and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentGuidePage;
