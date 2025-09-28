import React from 'react';
import { DocPage, CodeBlock, Alert, QuickLinks } from '@/components/docs/DocComponents';

export const QuickStartPage: React.FC = () => {
  return (
    <DocPage
      title="Quick Start Guide"
      description="Get the Universal Knowledge Chatbot up and running in minutes"
      lastUpdated="September 28, 2025"
      backLink="/docs"
      backLinkText="Back to Documentation"
    >
      <Alert type="info">
        <p>
          This guide assumes you have Node.js 18+ and npm installed on your system. If you need help
          with installation, check our{' '}
          <a href="/docs/getting-started/installation" className="text-blue-600 hover:underline">
            detailed installation guide
          </a>
          .
        </p>
      </Alert>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">🚀 Quick Setup (5 minutes)</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Clone the Repository</h3>
              <CodeBlock language="bash">
                {`git clone <repository-url>
cd ai-knowledge-chat-ui`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">2. Install Dependencies</h3>
              <CodeBlock language="bash" title="Install Frontend Dependencies">
                {`# Install frontend dependencies
cd ai-knowledge-chat-ui
npm install`}
              </CodeBlock>
              <CodeBlock language="bash" title="Install Backend Dependencies">
                {`# Install backend dependencies
cd ../knowledge-chatbot/server
npm install`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">3. Environment Setup</h3>
              <Alert type="tip">
                <p>
                  We've automated the environment setup! Use our script to generate all required
                  secrets.
                </p>
              </Alert>
              <CodeBlock language="bash" title="Automated Environment Generation">
                {`# From project root
node generate-env.js`}
              </CodeBlock>
              <p className="text-sm text-gray-600 mt-2">
                This script will create <code>.env</code> files for both frontend and backend with
                all required secrets.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">
                4. Configure Auth0 (Optional for Development)
              </h3>
              <p className="text-gray-600 mb-2">
                For basic testing, you can skip Auth0 setup initially. For full authentication
                features:
              </p>
              <CodeBlock language="bash" title="Auth0 Environment Variables">
                {`# Add these to knowledge-chatbot/server/.env
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/`}
              </CodeBlock>
              <p className="text-sm text-gray-600 mt-2">
                See our{' '}
                <a href="/docs/security/auth0-setup" className="text-blue-600 hover:underline">
                  Auth0 Setup Guide
                </a>{' '}
                for detailed configuration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">5. Start the Applications</h3>

              <CodeBlock language="bash" title="Start Backend Server (Terminal 1)">
                {`cd knowledge-chatbot/server
npm start
# Server will run on http://localhost:3001`}
              </CodeBlock>

              <CodeBlock language="bash" title="Start Frontend Development Server (Terminal 2)">
                {`cd ai-knowledge-chat-ui
npm run dev
# Frontend will run on http://localhost:3000`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">✅ Verify Installation</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Check Services</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Frontend: Visit{' '}
                  <a href="http://localhost:3000" className="text-blue-600 hover:underline">
                    http://localhost:3000
                  </a>
                </li>
                <li>
                  Backend API: Visit{' '}
                  <a
                    href="http://localhost:3001/api/health"
                    className="text-blue-600 hover:underline"
                  >
                    http://localhost:3001/api/health
                  </a>
                </li>
                <li>
                  Documentation: You're already here at{' '}
                  <a href="/docs" className="text-blue-600 hover:underline">
                    /docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Test Core Features</h3>
              <Alert type="success">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Weather Queries:</strong> Try asking "What's the weather in New York?"
                  </li>
                  <li>
                    <strong>File Upload:</strong> Upload a PDF and ask questions about it
                  </li>
                  <li>
                    <strong>Authentication:</strong> Test login/logout functionality
                  </li>
                </ul>
              </Alert>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔧 Development Commands</h2>

          <div className="space-y-4">
            <CodeBlock language="bash" title="Useful Development Commands">
              {`# Frontend commands
npm run dev          # Start development server
npm run build        # Build for production
npm test            # Run tests
npm run lint        # Check code quality

# Backend commands  
npm start           # Start server
npm run dev         # Start with nodemon (auto-reload)
npm test           # Run tests
npm run lint       # Check code quality`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🏗️ Project Architecture</h2>

          <div className="bg-gray-50 p-6 rounded-lg">
            <pre className="text-sm text-gray-700 font-mono">
              {`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │  External APIs  │
│   (React)       │───▶│   (Express)     │───▶│   OpenAI        │
│   Port: 3000    │    │   Port: 3001    │    │   Weather API   │
│                 │    │                 │    │   Slack API     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Auth0 SSO     │
                       │   Vector DB     │
                       │   File Storage  │
                       └─────────────────┘`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📚 Next Steps</h2>

          <QuickLinks
            links={[
              {
                title: 'Environment Configuration',
                description: 'Detailed guide for setting up environment variables and secrets',
                href: '/docs/getting-started/environment-setup',
              },
              {
                title: 'Feature Documentation',
                description: 'Explore all available features and integrations',
                href: '/docs/features',
              },
              {
                title: 'API Reference',
                description: 'Complete API documentation for developers',
                href: '/docs/api',
              },
              {
                title: 'Deployment Guide',
                description: 'Deploy to production with Vercel and other platforms',
                href: '/docs/deployment',
              },
            ]}
          />
        </section>

        <Alert type="warning">
          <p>
            <strong>Having Issues?</strong> Check our{' '}
            <a
              href="/docs/development/troubleshooting"
              className="text-yellow-800 hover:underline font-medium"
            >
              troubleshooting guide
            </a>{' '}
            or review the{' '}
            <a
              href="/docs/getting-started/cheat-sheet"
              className="text-yellow-800 hover:underline font-medium"
            >
              command cheat sheet
            </a>{' '}
            for common solutions.
          </p>
        </Alert>
      </div>
    </DocPage>
  );
};
