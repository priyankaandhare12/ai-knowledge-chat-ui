import React from 'react';
import { DocPage, CodeBlock, Alert } from '@/components/docs/DocComponents';

export const CheatSheetPage: React.FC = () => {
  return (
    <DocPage
      title="Command Cheat Sheet"
      description="Quick reference for common commands and operations"
      lastUpdated="September 28, 2025"
      backLink="/docs/getting-started"
      backLinkText="Back to Getting Started"
    >
      <div className="space-y-8">
        <Alert type="info">
          <p>
            This cheat sheet contains the most commonly used commands for developing and maintaining
            the Universal Knowledge Chatbot. Bookmark this page for quick reference!
          </p>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔐 Environment Setup</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Automated Generation</h3>
            <CodeBlock language="bash" title="Generate All Environment Files">
              {`# From project root
node generate-env.js`}
            </CodeBlock>

            <h3 className="text-lg font-medium">Manual Secret Generation</h3>
            <CodeBlock language="bash" title="Generate Individual Secrets">
              {`# SESSION_SECRET (64 characters)
openssl rand -hex 32

# JWT_SECRET (base64, ~88 characters)  
openssl rand -base64 64

# Alternative using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"`}
            </CodeBlock>

            <h3 className="text-lg font-medium">Verify Environment</h3>
            <CodeBlock language="bash">{`node verify-env.js`}</CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🚀 Development Commands</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Backend Server</h3>
              <CodeBlock language="bash" title="Server Commands">
                {`# Start backend server
cd knowledge-chatbot/server
npm start
# Server will run on http://localhost:3001

# Start with auto-reload (if configured)
npm run dev

# Run tests
npm test

# Check code quality
npm run lint`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Frontend Development</h3>
              <CodeBlock language="bash" title="Frontend Commands">
                {`# Start frontend development server
cd ai-knowledge-chat-ui
npm run dev
# Frontend will run on http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Check code quality
npm run lint
npm run lint:fix

# Format code
npm run format`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibent mb-4">🔧 Port Management</h2>

          <CodeBlock language="bash" title="Port Utilities">
            {`# Check if ports are available
npm run check-port      # Check port 3000
lsof -i :3001          # Check port 3001

# Kill processes on ports
npm run kill-port      # Kill process on 3000
lsof -ti:3001 | xargs kill -9  # Kill process on 3001

# Find what's using a port
lsof -i :PORT_NUMBER`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🐛 Debugging & Troubleshooting</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Health Checks</h3>
            <CodeBlock language="bash" title="Service Health Checks">
              {`# Check backend API health
curl http://localhost:3001/api/health

# Check frontend (in browser)
open http://localhost:5173

# Check documentation
open http://localhost:5173/docs`}
            </CodeBlock>

            <h3 className="text-lg font-medium">Common Issues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-900 mb-2">Port Already in Use</h4>
                <CodeBlock language="bash">
                  {`# Kill process on specific port
npx kill-port 3000
# or
lsof -ti:3000 | xargs kill -9`}
                </CodeBlock>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Clear Node Modules</h4>
                <CodeBlock language="bash">
                  {`# Clean install
rm -rf node_modules package-lock.json
npm install`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔑 API Keys & Configuration</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Required API Keys</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <CodeBlock language="bash" title="Essential Environment Variables">
                {`# Core APIs (Required)
OPENAI_API_KEY=sk-...                    # OpenAI for AI functionality
AUTH0_DOMAIN=your-tenant.auth0.com       # Auth0 for authentication  
AUTH0_CLIENT_ID=...                      # Auth0 client ID
AUTH0_CLIENT_SECRET=...                  # Auth0 client secret

# Feature APIs (Optional)
WEATHER_API_KEY=...                      # OpenWeatherMap for weather
SLACK_BOT_TOKEN=xoxb-...                # Slack for team integration
PINECONE_API_KEY=...                     # Pinecone for vector storage`}
              </CodeBlock>
            </div>

            <h3 className="text-lg font-medium">API Key Setup Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>OpenAI API</span>
                <a
                  href="https://platform.openai.com/api-keys"
                  className="text-blue-600 hover:underline"
                >
                  Get Key →
                </a>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Auth0 Dashboard</span>
                <a href="https://manage.auth0.com" className="text-blue-600 hover:underline">
                  Configure →
                </a>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Weather API</span>
                <a href="https://openweathermap.org/api" className="text-blue-600 hover:underline">
                  Get Key →
                </a>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Pinecone</span>
                <a href="https://pinecone.io" className="text-blue-600 hover:underline">
                  Get Key →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📦 Package Management</h2>

          <CodeBlock language="bash" title="Common npm Commands">
            {`# Install new package (frontend)
cd ai-knowledge-chat-ui
npm install package-name

# Install new package (backend)  
cd knowledge-chatbot/server
npm install package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Install specific version
npm install package-name@version

# Remove package
npm uninstall package-name`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🧪 Testing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Frontend Testing</h3>
              <CodeBlock language="bash">
                {`# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- HomePage.test.tsx

# Run tests in watch mode
npm run test:watch`}
              </CodeBlock>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Backend Testing</h3>
              <CodeBlock language="bash">
                {`# Run all tests
cd knowledge-chatbot/server
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- auth.test.js

# Run integration tests
npm run test:integration`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🚀 Deployment</h2>

          <CodeBlock language="bash" title="Deployment Commands">
            {`# Build frontend for production
cd ai-knowledge-chat-ui
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (if configured)
vercel deploy

# Deploy production
vercel --prod`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔍 Monitoring & Logs</h2>

          <CodeBlock language="bash" title="Monitoring Commands">
            {`# View backend logs (if using PM2)
pm2 logs

# View specific process logs
pm2 logs process-name

# Monitor system resources
pm2 monit

# Check process status
pm2 status

# Restart process
pm2 restart process-name`}
          </CodeBlock>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🛠️ Git & Version Control</h2>

          <CodeBlock language="bash" title="Git Commands">
            {`# Common git workflow
git status
git add .
git commit -m "descriptive message"
git push origin branch-name

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline`}
          </CodeBlock>
        </section>

        <Alert type="tip">
          <p>
            <strong>Pro Tip:</strong> Create aliases for frequently used commands in your shell
            configuration (.bashrc, .zshrc) to speed up development. For example:
            <br />
            <code className="bg-blue-100 px-1 rounded">
              alias dev-fe="cd ai-knowledge-chat-ui && npm run dev"
            </code>
          </p>
        </Alert>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">📚 Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <a href="/docs/getting-started/installation" className="text-blue-600 hover:underline">
              → Installation Guide
            </a>
            <a
              href="/docs/getting-started/environment-setup"
              className="text-blue-600 hover:underline"
            >
              → Environment Setup
            </a>
            <a href="/docs/development/troubleshooting" className="text-blue-600 hover:underline">
              → Troubleshooting
            </a>
            <a href="/docs/api" className="text-blue-600 hover:underline">
              → API Reference
            </a>
            <a href="/docs/deployment" className="text-blue-600 hover:underline">
              → Deployment Guide
            </a>
            <a href="/docs/security" className="text-blue-600 hover:underline">
              → Security Guide
            </a>
          </div>
        </div>
      </div>
    </DocPage>
  );
};
