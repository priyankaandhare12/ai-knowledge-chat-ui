import React from 'react';
import { DocPage, CodeBlock, Alert } from '@/components/docs/DocComponents';

export const InstallationPage: React.FC = () => {
  return (
    <DocPage
      title="Installation Guide"
      description="Complete installation instructions for the Universal Knowledge Chatbot"
      lastUpdated="September 28, 2025"
      backLink="/docs/getting-started"
      backLinkText="Back to Getting Started"
    >
      <div className="space-y-8">
        <Alert type="info">
          <p>
            This guide covers installation for development. For production deployment, see our{' '}
            <a href="/docs/deployment" className="text-blue-600 hover:underline">
              deployment guide
            </a>
            .
          </p>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📋 Prerequisites</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Required Software</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">Node.js</span>
                  <span>Version 18.0.0 or higher</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">npm</span>
                  <span>Version 8.0.0 or higher (comes with Node.js)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">Git</span>
                  <span>For version control and repository management</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium mb-3 text-blue-900">Check Current Versions</h3>
              <CodeBlock language="bash" title="Version Check Commands">
                {`node --version     # Should be v18.0.0 or higher
npm --version      # Should be 8.0.0 or higher
git --version      # Any recent version`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">⚡ Quick Installation</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Clone Repositories</h3>
              <CodeBlock language="bash">
                {`# Clone the frontend repository
git clone https://github.com/priyankaandhare12/ai-knowledge-chat-ui.git
cd ai-knowledge-chat-ui

# Clone the backend repository
git clone https://github.com/priyankaandhare12/knowledge-chatbot.git

# Optional: Create a new branch for your work
git checkout -b feature/your-feature-name`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">2. Install Frontend Dependencies</h3>
              <CodeBlock language="bash" title="Frontend Setup">
                {`# Navigate to frontend directory
cd ai-knowledge-chat-ui

# Install dependencies
npm install

# Verify installation
npm list --depth=0`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">3. Install Backend Dependencies</h3>
              <CodeBlock language="bash" title="Backend Setup">
                {`# Navigate to backend directory
cd ../knowledge-chatbot/server

# Install dependencies
npm install

# Verify installation
npm list --depth=0`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">4. Generate Environment Files</h3>
              <Alert type="tip">
                <p>
                  Use our automated script to generate all required environment variables and
                  secrets.
                </p>
              </Alert>
              <CodeBlock language="bash" title="Automated Environment Setup">
                {`# From project root directory
cd ../..
node generate-env.js

# This creates:
# - ai-knowledge-chat-ui/.env
# - knowledge-chatbot/server/.env`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔧 Manual Environment Setup</h2>

          <Alert type="warning">
            <p>Only use manual setup if the automated script doesn't work for your environment.</p>
          </Alert>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Frontend Environment (.env)</h3>
              <CodeBlock language="bash" title="ai-knowledge-chat-ui/.env">
                {`# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/

# API Configuration  
VITE_API_URL=http://localhost:3001

# Environment
VITE_NODE_ENV=development`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Backend Environment (.env)</h3>
              <CodeBlock language="bash" title="knowledge-chatbot/server/.env">
                {`# Server Configuration
PORT=3001
NODE_ENV=development

# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/

# Session Security
SESSION_SECRET=your-64-character-session-secret
JWT_SECRET=your-base64-jwt-secret

# Frontend Integration
FRONTEND_URL=http://localhost:5173

# External APIs
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key
SLACK_BOT_TOKEN=your_slack_bot_token

# Vector Database
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name

# Optional Features
DOMAIN_RESTRICTIONS_ENABLED=false`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🚀 Start Development Servers</h2>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium mb-3 text-green-900">
                Backend Server (Terminal 1)
              </h3>
              <CodeBlock language="bash">
                {`cd knowledge-chatbot/server
npm start

# Expected output:
# Server running on http://localhost:3001
# Auth0 configured successfully
# Database connection established`}
              </CodeBlock>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium mb-3 text-blue-900">
                Frontend Server (Terminal 2)
              </h3>
              <CodeBlock language="bash">
                {`cd ai-knowledge-chat-ui  
npm run dev

# Expected output:
# VITE ready in XXXms
# Local:   http://localhost:5173
# Network: http://192.168.x.x:3000`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">✅ Verify Installation</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Health Checks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Frontend Health Check</h4>
                <p className="text-sm text-gray-600 mb-2">Visit the frontend application:</p>
                <CodeBlock language="bash">
                  {`curl http://localhost:5173
# Or visit in browser: http://localhost:5173`}
                </CodeBlock>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Backend Health Check</h4>
                <p className="text-sm text-gray-600 mb-2">Test the API endpoint:</p>
                <CodeBlock language="bash">
                  {`curl http://localhost:3001/api/health
# Expected: {"status": "ok", "timestamp": "..."}`}
                </CodeBlock>
              </div>
            </div>

            <h3 className="text-lg font-medium">Feature Tests</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Frontend loads at http://localhost:5173</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Backend API responds at http://localhost:3001/api/health</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                <span>Documentation accessible at http://localhost:5173/docs</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></span>
                <span>Authentication (requires Auth0 setup)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0"></span>
                <span>Weather API (requires API key)</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔧 Development Tools</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Useful Commands</h3>
            <CodeBlock language="bash" title="Development Commands">
              {`# Frontend commands (in ai-knowledge-chat-ui/)
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test            # Run tests
npm run lint        # Check code quality
npm run format      # Format code

# Backend commands (in knowledge-chatbot/server/)
npm start           # Start server
npm run dev         # Start with auto-reload (if configured)
npm test           # Run tests
npm run lint       # Check code quality`}
            </CodeBlock>

            <h3 className="text-lg font-medium">Port Management</h3>
            <CodeBlock language="bash" title="Port Utilities">
              {`# Check if ports are available
npm run check-port      # Check port 3000
lsof -i :3001          # Check port 3001

# Kill processes on ports (if needed)
npm run kill-port      # Kill process on 3000
lsof -ti:3001 | xargs kill -9  # Kill process on 3001`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🐛 Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-medium text-red-900 mb-2">Common Issues</h3>
              <div className="space-y-3 text-sm text-red-800">
                <div>
                  <strong>Port already in use:</strong>
                  <CodeBlock language="bash">
                    {`# Kill process on port 3000
npx kill-port 3000

# Or find and kill manually
lsof -ti:3000 | xargs kill -9`}
                  </CodeBlock>
                </div>
                <div>
                  <strong>Node version issues:</strong>
                  <p>Use Node Version Manager (nvm) to install correct version:</p>
                  <CodeBlock language="bash">
                    {`# Install and use Node 18
nvm install 18
nvm use 18`}
                  </CodeBlock>
                </div>
                <div>
                  <strong>Permission errors:</strong>
                  <p>Fix npm permissions or use npx instead of global installs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Alert type="success">
          <p>
            <strong>Installation Complete!</strong> Your development environment is ready. Continue
            with the{' '}
            <a
              href="/docs/getting-started/quick-start"
              className="text-green-800 hover:underline font-medium"
            >
              Quick Start Guide
            </a>
            to begin using the application.
          </p>
        </Alert>
      </div>
    </DocPage>
  );
};
