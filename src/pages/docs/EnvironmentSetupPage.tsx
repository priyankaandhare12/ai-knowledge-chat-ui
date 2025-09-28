import React from 'react';
import { DocPage, CodeBlock, Alert } from '@/components/docs/DocComponents';

export const EnvironmentSetupPage: React.FC = () => {
  return (
    <DocPage
      title="Environment Setup"
      description="Complete guide for configuring environment variables and secrets"
      lastUpdated="September 28, 2025"
      backLink="/docs/getting-started"
      backLinkText="Back to Getting Started"
    >
      <div className="space-y-8">
        <Alert type="tip">
          <p>
            <strong>Quick Setup:</strong> Use our automated script with{' '}
            <code className="bg-yellow-100 px-1 rounded">node generate-env.js</code> for the fastest
            setup. Manual setup instructions are provided below for customization.
          </p>
        </Alert>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🚀 Automated Generation (Recommended)</h2>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium mb-2 text-green-900">One-Command Setup</h3>
              <CodeBlock language="bash" title="Run from project root directory">
                {`# Automated environment generation
node generate-env.js

# This creates:
# ✅ knowledge-chatbot/server/.env (with secure secrets)
# ✅ ai-knowledge-chat-ui/.env (with frontend config)`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Verify Generated Files</h3>
              <CodeBlock language="bash" title="Verification Commands">
                {`# Verify environment files were created
node verify-env.js

# Check backend environment
ls -la knowledge-chatbot/server/.env

# Check frontend environment  
ls -la ai-knowledge-chat-ui/.env`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔧 Manual Secret Generation</h2>

          <Alert type="info">
            <p>
              Use manual generation when you need custom secrets or the automated script isn't
              available.
            </p>
          </Alert>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">macOS/Linux (Terminal)</h3>
              <CodeBlock language="bash" title="OpenSSL Method">
                {`# Generate SESSION_SECRET (64 characters)
openssl rand -hex 32

# Generate JWT_SECRET (base64, ~88 characters)  
openssl rand -base64 64

# Generate UUID (alternative)
uuidgen`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Windows (PowerShell)</h3>
              <CodeBlock language="powershell" title="PowerShell Method">
                {`# Generate SESSION_SECRET
[System.Web.Security.Membership]::GeneratePassword(64, 0)

# Generate JWT_SECRET (base64)
[Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes(48))`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Cross-Platform (Node.js)</h3>
              <CodeBlock language="bash" title="Node.js Method">
                {`# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔐 Backend Environment Configuration</h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              Create <code>knowledge-chatbot/server/.env</code> with the following configuration:
            </p>

            <CodeBlock language="bash" title="knowledge-chatbot/server/.env">
              {`# =================================
# SERVER CONFIGURATION
# =================================
NODE_ENV=development
PORT=3001

# =================================
# FRONTEND INTEGRATION
# =================================
FRONTEND_URL=http://localhost:3000

# =================================
# AUTH0 CONFIGURATION
# =================================
# Get these from Auth0 Dashboard > Applications > Your App
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id_here
AUTH0_CLIENT_SECRET=your_client_secret_here
AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/

# =================================
# GENERATED SECRETS (REPLACE THESE)
# =================================
SESSION_SECRET=REPLACE_WITH_64_CHARACTER_HEX_STRING
JWT_SECRET=REPLACE_WITH_BASE64_STRING

# =================================
# SESSION CONFIGURATION
# =================================
SESSION_SECURE=false  # true for HTTPS in production
SESSION_COOKIE_DOMAIN=localhost  # your-domain.com in production

# =================================
# DOMAIN RESTRICTIONS (OPTIONAL)
# =================================
DOMAIN_RESTRICTIONS_ENABLED=false
ALLOWED_DOMAINS=yourdomain.com,anotherdomain.com
DOMAIN_BLOCK_MESSAGE=Access is restricted to authorized domains only.

# =================================
# EXTERNAL API KEYS
# =================================
OPENAI_API_KEY=your_openai_api_key_here
WEATHER_API_KEY=your_openweathermap_api_key
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token

# =================================
# VECTOR DATABASE (PINECONE)
# =================================
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name

# =================================
# FILE UPLOAD CONFIGURATION
# =================================
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx,txt
UPLOAD_DIR=./uploads

# =================================
# RATE LIMITING
# =================================
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
RATE_LIMIT_ENABLED=true

# =================================
# LOGGING
# =================================
LOG_LEVEL=info  # error, warn, info, debug
LOG_FORMAT=combined  # combined, common, dev

# =================================
# CORS CONFIGURATION
# =================================
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🎨 Frontend Environment Configuration</h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              Create <code>ai-knowledge-chat-ui/.env</code> with the following configuration:
            </p>

            <CodeBlock language="bash" title="ai-knowledge-chat-ui/.env">
              {`# =================================
# AUTH0 CONFIGURATION
# =================================
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id_here
VITE_AUTH0_AUDIENCE=https://your-tenant.auth0.com/api/v2/

# =================================
# API CONFIGURATION
# =================================
VITE_API_URL=http://localhost:3001
VITE_API_TIMEOUT=30000  # 30 seconds

# =================================
# APPLICATION SETTINGS
# =================================
VITE_APP_NAME=Universal Knowledge Chatbot
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development

# =================================
# FEATURE FLAGS
# =================================
VITE_ENABLE_WEATHER=true
VITE_ENABLE_FILE_UPLOAD=true
VITE_ENABLE_SLACK=true
VITE_ENABLE_DOCS=true

# =================================
# UI CONFIGURATION
# =================================
VITE_DEFAULT_THEME=light
VITE_ENABLE_DARK_MODE=true
VITE_ANIMATION_ENABLED=true

# =================================
# DEVELOPMENT TOOLS
# =================================
VITE_ENABLE_DEVTOOLS=true
VITE_DEBUG_MODE=false`}
            </CodeBlock>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔑 External API Keys Setup</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🤖 OpenAI API</h3>
                <p className="text-sm text-gray-600 mb-3">Required for AI chat functionality</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>
                    Visit{' '}
                    <a href="https://platform.openai.com" className="text-blue-600 hover:underline">
                      OpenAI Platform
                    </a>
                  </li>
                  <li>Create account and navigate to API Keys</li>
                  <li>Generate new secret key</li>
                  <li>
                    Add to <code>OPENAI_API_KEY</code>
                  </li>
                </ol>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🌤️ Weather API</h3>
                <p className="text-sm text-gray-600 mb-3">Required for weather queries</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>
                    Visit{' '}
                    <a
                      href="https://openweathermap.org/api"
                      className="text-blue-600 hover:underline"
                    >
                      OpenWeatherMap
                    </a>
                  </li>
                  <li>Create free account</li>
                  <li>Generate API key</li>
                  <li>
                    Add to <code>WEATHER_API_KEY</code>
                  </li>
                </ol>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">💬 Slack Integration</h3>
                <p className="text-sm text-gray-600 mb-3">Optional: For Slack message search</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>
                    Visit{' '}
                    <a href="https://api.slack.com/apps" className="text-blue-600 hover:underline">
                      Slack API
                    </a>
                  </li>
                  <li>Create new Slack app</li>
                  <li>Get Bot User OAuth Token</li>
                  <li>
                    Add to <code>SLACK_BOT_TOKEN</code>
                  </li>
                </ol>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🗂️ Pinecone Vector DB</h3>
                <p className="text-sm text-gray-600 mb-3">Required for document processing</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>
                    Visit{' '}
                    <a href="https://pinecone.io" className="text-blue-600 hover:underline">
                      Pinecone
                    </a>
                  </li>
                  <li>Create account and project</li>
                  <li>Create index and get API key</li>
                  <li>Add key and index name</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">✅ Environment Validation</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Automated Validation</h3>
            <CodeBlock language="bash" title="Validate Environment Setup">
              {`# Run validation script
node verify-env.js

# Expected output:
# ✅ Backend .env file exists
# ✅ Frontend .env file exists  
# ✅ All required variables present
# ✅ Secrets have proper format
# ⚠️  Optional: Some API keys missing (ok for development)`}
            </CodeBlock>

            <h3 className="text-lg font-medium">Manual Validation</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Check Backend Server</h4>
              <CodeBlock language="bash">
                {`cd knowledge-chatbot/server
npm start

# Look for:
# "Server running on http://localhost:3001"
# "Auth0 configured successfully" (if keys provided)
# No error messages`}
              </CodeBlock>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Check Frontend App</h4>
              <CodeBlock language="bash">
                {`cd ai-knowledge-chat-ui
npm run dev

# Look for:
# "Local: http://localhost:3000"
# No build errors
# App loads in browser`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🔒 Security Best Practices</h2>

          <div className="space-y-4">
            <Alert type="warning">
              <p>
                <strong>Never commit .env files to version control!</strong> Make sure .env files
                are listed in your .gitignore file.
              </p>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">✅ Do's</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use strong, unique secrets for each environment</li>
                  <li>• Regenerate secrets regularly in production</li>
                  <li>• Use different secrets for dev/staging/prod</li>
                  <li>• Store production secrets in secure vault</li>
                  <li>• Use environment-specific API keys</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">❌ Don'ts</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Never commit .env files to git</li>
                  <li>• Don't share secrets in plain text</li>
                  <li>• Don't use weak or default secrets</li>
                  <li>• Don't reuse secrets across projects</li>
                  <li>• Don't log sensitive environment variables</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🐛 Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">Common Environment Issues</h4>
              <div className="space-y-2 text-sm text-red-800">
                <div>
                  <strong>Issue:</strong> "Environment file not found"
                  <br />
                  <strong>Solution:</strong> Ensure .env files exist in correct directories
                </div>
                <div>
                  <strong>Issue:</strong> "Invalid JWT secret format"
                  <br />
                  <strong>Solution:</strong> Regenerate JWT_SECRET using base64 encoding
                </div>
                <div>
                  <strong>Issue:</strong> "Auth0 configuration error"
                  <br />
                  <strong>Solution:</strong> Verify Auth0 credentials and domain format
                </div>
                <div>
                  <strong>Issue:</strong> "CORS errors in browser"
                  <br />
                  <strong>Solution:</strong> Check FRONTEND_URL and CORS_ORIGIN settings
                </div>
              </div>
            </div>
          </div>
        </section>

        <Alert type="success">
          <p>
            <strong>Environment Setup Complete!</strong> Your application should now have all
            required environment variables. Continue with the{' '}
            <a
              href="/docs/getting-started/quick-start"
              className="text-green-800 hover:underline font-medium"
            >
              Quick Start Guide
            </a>{' '}
            to begin development.
          </p>
        </Alert>
      </div>
    </DocPage>
  );
};
