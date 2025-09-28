import React from 'react';

export const AuthenticationAPIPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Authentication API</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete reference for authentication endpoints, token management, and user session
            handling with Auth0 integration.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">🔐 Authentication Flow</h2>
            <p className="text-gray-700">
              The authentication system uses Auth0 for secure SSO with JWT token-based session
              management, supporting multiple identity providers and MFA capabilities.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🛡️ Auth0 Integration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                🎯 Authentication Configuration
              </h3>

              <div className="bg-gray-50 p-4 rounded border mb-4">
                <h4 className="font-medium mb-2">Environment Variables</h4>
                <div className="bg-black p-3 rounded text-green-400 font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
                    {`# Frontend (.env)
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_AUDIENCE=https://your-api.com
VITE_AUTH0_SCOPE=openid profile email

# Backend (.env)
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_AUDIENCE=https://your-api.com`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📡 API Endpoints</h2>

          <div className="space-y-6 mb-8">
            {/* Login Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/auth/login</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Initiate Authentication</h3>
              <p className="text-gray-600 mb-4">
                Redirects user to Auth0 Universal Login page for authentication.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>Content-Type: application/json</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "returnTo": "https://ai-knowledge-chat-ui.vercel.app/dashboard",
  "connection": "google-oauth2", // optional
  "prompt": "login" // optional
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "authUrl": "https://domain.auth0.com/authorize?...",
  "state": "random-state-value"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Callback Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  GET
                </span>
                <code className="text-lg font-mono">/api/auth/callback</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Authentication Callback</h3>
              <p className="text-gray-600 mb-4">
                Handles the callback from Auth0 after successful authentication.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>code: Authorization code from Auth0</div>
                    <div>state: State parameter for security</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "tokens": {
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refreshToken": "v1.M0_BQH2bgU...",
    "expiresIn": 3600
  },
  "user": {
    "sub": "auth0|507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "picture": "https://s.gravatar.com/avatar/..."
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  GET
                </span>
                <code className="text-lg font-mono">/api/auth/user</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Get User Profile</h3>
              <p className="text-gray-600 mb-4">
                Retrieve authenticated user's profile information.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>Authorization: Bearer {'{accessToken}'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "user": {
    "sub": "auth0|507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "email_verified": true,
    "picture": "https://s.gravatar.com/avatar/...",
    "updated_at": "2023-10-01T12:00:00.000Z",
    "user_metadata": {},
    "app_metadata": {
      "roles": ["user"],
      "permissions": ["read:profile"]
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Refresh Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/auth/refresh</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Refresh Access Token</h3>
              <p className="text-gray-600 mb-4">Exchange refresh token for new access token.</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "refreshToken": "v1.M0_BQH2bgU..."
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "tokens": {
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "expiresIn": 3600
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/auth/logout</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">User Logout</h3>
              <p className="text-gray-600 mb-4">Terminate user session and invalidate tokens.</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>Authorization: Bearer {'{accessToken}'}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "returnTo": "https://ai-knowledge-chat-ui.vercel.app/login"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "message": "User logged out successfully",
  "logoutUrl": "https://domain.auth0.com/v2/logout?..."
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔒 Security & Middleware</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                🛡️ JWT Token Validation
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Middleware Implementation</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`// JWT validation middleware
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: \`https://\${process.env.AUTH0_DOMAIN}/.well-known/jwks.json\`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: \`https://\${process.env.AUTH0_DOMAIN}/\`,
  algorithms: ['RS256']
});

// Apply to protected routes
app.use('/api/protected', jwtCheck);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Token Validation Process</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Verify JWT signature using Auth0's public key</li>
                    <li>• Validate token expiration time</li>
                    <li>• Check issuer and audience claims</li>
                    <li>• Extract user information from token payload</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Frontend Integration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                ⚛️ React Auth0 Implementation
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Auth0 Provider Setup</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/auth/callback',
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: 'openid profile email'
      }}
    >
      <Router>
        <Routes>
          {/* App routes */}
        </Routes>
      </Router>
    </Auth0Provider>
  );
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Authentication Hook Usage</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <div>
        <span>Welcome, {user?.name}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={() => loginWithRedirect()}>
      Login
    </button>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Error Handling</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Common Error Responses</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">401 Unauthorized</div>
                  <div className="text-sm text-gray-600">Invalid or expired access token</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">403 Forbidden</div>
                  <div className="text-sm text-gray-600">
                    Insufficient permissions for requested resource
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">400 Bad Request</div>
                  <div className="text-sm text-gray-600">
                    Invalid request parameters or missing required fields
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🎯 Next Steps</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                • Review the <strong>Security Overview</strong> for comprehensive authentication
                security measures
              </p>
              <p className="text-gray-700">
                • Check the <strong>Auth0 Setup Guide</strong> for detailed configuration
                instructions
              </p>
              <p className="text-gray-700">
                • Explore the <strong>Chat API</strong> documentation for authenticated conversation
                endpoints
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationAPIPage;
