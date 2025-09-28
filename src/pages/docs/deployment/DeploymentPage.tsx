import React from 'react';

export const DeploymentPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Deployment Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete deployment guide for both frontend and backend components with production-ready
            configurations.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">🚀 Deployment Overview</h2>
            <p className="text-gray-700">
              The application uses a modern deployment strategy with Vercel for the frontend and
              flexible backend deployment options including Docker containers and serverless
              functions.
            </p>

            <div className="mt-4 p-4 bg-white rounded border border-blue-300">
              <h3 className="font-semibold mb-2 text-blue-800">🌐 Live Application</h3>
              <a
                href="https://ai-knowledge-chat-ui.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                https://ai-knowledge-chat-ui.vercel.app/
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🎨 Frontend Deployment (Vercel)
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">🌐 Vercel Configuration</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">Build Settings</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Framework:</strong> Vite
                    </li>
                    <li>
                      • <strong>Build Command:</strong> npm run build
                    </li>
                    <li>
                      • <strong>Output Directory:</strong> dist
                    </li>
                    <li>
                      • <strong>Node.js Version:</strong> 18.x
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Environment Variables</h4>
                  <div className="text-sm font-mono text-gray-700 space-y-1">
                    <div>VITE_AUTH0_DOMAIN</div>
                    <div>VITE_AUTH0_CLIENT_ID</div>
                    <div>VITE_AUTH0_AUDIENCE</div>
                    <div>VITE_API_BASE_URL</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="font-medium mb-2">vercel.json Configuration</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            📋 Step-by-Step Vercel Deployment
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700">🚀 Deploy from GitHub</h3>

              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded border border-indigo-200">
                  <h4 className="font-medium mb-2">1. Import Repository</h4>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>
                      1. Go to{' '}
                      <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        vercel.com
                      </a>{' '}
                      and sign in
                    </li>
                    <li>2. Click "New Project"</li>
                    <li>
                      3. Import:{' '}
                      <code className="bg-gray-200 px-2 py-1 rounded">
                        https://github.com/priyankaandhare12/ai-knowledge-chat-ui
                      </code>
                    </li>
                    <li>4. Configure project settings</li>
                  </ol>
                </div>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">2. Environment Variables</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Add these environment variables in Vercel dashboard:
                  </p>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div>VITE_AUTH0_DOMAIN=your-domain.auth0.com</div>
                    <div>VITE_AUTH0_CLIENT_ID=your-client-id</div>
                    <div>VITE_AUTH0_AUDIENCE=your-api-audience</div>
                    <div>VITE_API_BASE_URL=your-backend-url</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">3. Deploy</h4>
                  <p className="text-sm text-gray-700">
                    Click "Deploy" and Vercel will automatically build and deploy your application!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🖥️ Backend Deployment Options
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">🐳 Docker Deployment</h3>

              <div className="bg-purple-50 p-4 rounded border border-purple-200 mb-4">
                <h4 className="font-medium mb-2">Dockerfile</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Build Commands</h5>
                  <div className="text-xs font-mono text-gray-600 space-y-1">
                    <div>docker build -t knowledge-chatbot .</div>
                    <div>docker run -p 3000:3000 knowledge-chatbot</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Production Features</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Multi-stage builds</li>
                    <li>• Health checks</li>
                    <li>• Security scanning</li>
                    <li>• Optimized layers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-orange-700">
                ☁️ Cloud Platform Deployment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-4 rounded border border-orange-200">
                  <h4 className="font-medium mb-2">AWS</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• ECS with Fargate</li>
                    <li>• Lambda functions</li>
                    <li>• API Gateway</li>
                    <li>• CloudWatch logs</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Google Cloud</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Cloud Run</li>
                    <li>• Cloud Functions</li>
                    <li>• Load Balancer</li>
                    <li>• Cloud Logging</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 className="font-medium mb-2">Azure</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Container Instances</li>
                    <li>• Azure Functions</li>
                    <li>• Application Gateway</li>
                    <li>• Monitor logs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            ⚙️ Environment Configuration
          </h2>

          <div className="space-y-4 mb-8">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
              <h4 className="font-semibold text-red-800 mb-2">Production Environment Variables</h4>
              <div className="text-sm font-mono text-red-700 space-y-1">
                <div>NODE_ENV=production</div>
                <div>PORT=3000</div>
                <div>AUTH0_DOMAIN=your-domain.auth0.com</div>
                <div>AUTH0_AUDIENCE=https://api.knowledge-chatbot.com</div>
                <div>OPENAI_API_KEY=your-openai-key</div>
                <div>PINECONE_API_KEY=your-pinecone-key</div>
                <div>SLACK_CLIENT_ID=your-slack-client-id</div>
                <div>OPENWEATHER_API_KEY=your-weather-key</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔒 Security Configuration</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🛡️ HTTPS & SSL</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• SSL certificate configuration</li>
                <li>• HTTPS redirect enforcement</li>
                <li>• HSTS header setup</li>
                <li>• Certificate auto-renewal</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">🔐 Security Headers</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Content Security Policy</li>
                <li>• X-Frame-Options</li>
                <li>• X-Content-Type-Options</li>
                <li>• Referrer-Policy</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Monitoring & Logging</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">📈</span>
              <div>
                <strong>Application Monitoring:</strong> Health checks, uptime monitoring, and
                performance metrics
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">📋</span>
              <div>
                <strong>Centralized Logging:</strong> Structured logs with correlation IDs and error
                tracking
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🚨</span>
              <div>
                <strong>Alerting:</strong> Real-time alerts for errors, performance issues, and
                system failures
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">📊</span>
              <div>
                <strong>Analytics:</strong> Usage analytics, API performance metrics, and user
                behavior tracking
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔄 CI/CD Pipeline</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">GitHub Actions Workflow</h3>

            <div className="bg-white p-4 rounded border text-sm font-mono">
              <pre className="text-gray-800 whitespace-pre-wrap">
                {`name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          docker build -t knowledge-chatbot .
          docker push registry/knowledge-chatbot:latest`}
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing in Production</h2>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">Health Checks</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• API endpoint health verification</li>
                <li>• Database connectivity checks</li>
                <li>• External service availability</li>
                <li>• Performance baseline monitoring</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Smoke Tests</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Authentication flow verification</li>
                <li>• Core chat functionality testing</li>
                <li>• File upload process validation</li>
                <li>• Integration endpoint checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentPage;
