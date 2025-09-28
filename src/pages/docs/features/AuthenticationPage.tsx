import React from 'react';

export const AuthenticationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Authentication (Auth0)</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive guide to the Auth0 authentication system, SSO implementation, and security
            features.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🔐 Authentication Overview
            </h2>
            <p className="text-gray-700">
              The system uses Auth0 as the primary authentication provider, offering
              enterprise-grade security with Single Sign-On (SSO) capabilities and seamless Google
              integration for user convenience.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Auth0 Configuration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">🏗️ Application Setup</h3>
              <p className="text-gray-700 mb-4">
                The Auth0 application is configured as a Single Page Application (SPA) with specific
                settings for the React frontend and API authorization.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">Application Type</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Type:</strong> Single Page Application
                    </li>
                    <li>
                      • <strong>Token Endpoint:</strong> Client Secret Basic
                    </li>
                    <li>
                      • <strong>Grant Types:</strong> Authorization Code, Refresh Token
                    </li>
                    <li>
                      • <strong>Response Types:</strong> Code
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">URLs Configuration</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Allowed Callback:</strong> /auth/callback
                    </li>
                    <li>
                      • <strong>Allowed Logout:</strong> /
                    </li>
                    <li>
                      • <strong>Allowed Web Origins:</strong> Frontend domain
                    </li>
                    <li>
                      • <strong>Allowed Origins (CORS):</strong> API domain
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">🔑 API Configuration</h3>
              <div className="bg-purple-50 p-4 rounded border border-purple-200">
                <h4 className="font-medium mb-2">API Settings</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>Identifier:</strong> https://api.knowledge-chatbot.com
                  </div>
                  <div>
                    <strong>Signing Algorithm:</strong> RS256
                  </div>
                  <div>
                    <strong>Token Expiration:</strong> 24 hours
                  </div>
                  <div>
                    <strong>Scopes:</strong> read:messages, write:messages, upload:files
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔄 Authentication Flow</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">
                📱 Frontend Authentication Flow
              </h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-orange-100">
                  <h4 className="font-medium mb-3">Step-by-Step Process</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>1. Login Initiation:</strong> User clicks login button
                    </li>
                    <li>
                      <strong>2. Auth0 Redirect:</strong> Browser redirects to Auth0 login page
                    </li>
                    <li>
                      <strong>3. Credential Entry:</strong> User enters credentials or uses Google
                      SSO
                    </li>
                    <li>
                      <strong>4. Authorization:</strong> Auth0 validates credentials and permissions
                    </li>
                    <li>
                      <strong>5. Callback Redirect:</strong> Auth0 redirects back with authorization
                      code
                    </li>
                    <li>
                      <strong>6. Token Exchange:</strong> Frontend exchanges code for access token
                    </li>
                    <li>
                      <strong>7. User Context:</strong> User information and session established
                    </li>
                  </ol>
                </div>

                <div className="bg-orange-50 p-4 rounded border border-orange-200">
                  <h4 className="font-medium mb-2">Code Implementation</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`// Auth0 Provider Setup
<Auth0Provider
  domain="your-domain.auth0.com"
  clientId="your-client-id"
  redirectUri={window.location.origin + "/auth/callback"}
  audience="https://api.knowledge-chatbot.com"
>
  <App />
</Auth0Provider>

// Using Auth0 Hook
const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🌐 Google SSO Integration</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-red-700">🔗 Social Connection</h3>
              <p className="text-gray-700 text-sm mb-3">
                Seamless Google authentication integration providing one-click login experience.
              </p>
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-medium mb-2 text-sm">Configuration</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>
                    • <strong>Provider:</strong> Google OAuth 2.0
                  </li>
                  <li>
                    • <strong>Scopes:</strong> profile, email
                  </li>
                  <li>
                    • <strong>User Attributes:</strong> Auto-mapping enabled
                  </li>
                  <li>
                    • <strong>Account Linking:</strong> Automatic by email
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">👤 User Profile Mapping</h3>
              <p className="text-gray-700 text-sm mb-3">
                Automatic mapping of Google profile data to user attributes.
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-medium mb-2 text-sm">Profile Data</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>
                    • <strong>Name:</strong> Google display name
                  </li>
                  <li>
                    • <strong>Email:</strong> Primary Google email
                  </li>
                  <li>
                    • <strong>Picture:</strong> Google profile picture URL
                  </li>
                  <li>
                    • <strong>Locale:</strong> User's preferred language
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🛡️ Security Features</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🔐</span>
              <div>
                <strong>JWT Token Security:</strong> RS256 algorithm with secure key rotation and
                expiration
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🔄</span>
              <div>
                <strong>Refresh Token Rotation:</strong> Automatic token refresh with secure
                rotation to prevent replay attacks
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🚫</span>
              <div>
                <strong>Brute Force Protection:</strong> Built-in rate limiting and account lockout
                mechanisms
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🌐</span>
              <div>
                <strong>Multi-Factor Authentication:</strong> Optional MFA support for enhanced
                security
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Backend Integration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-4 text-green-800">🔍 Token Validation</h3>

              <div className="bg-white p-4 rounded border border-green-100 mb-4">
                <h4 className="font-medium mb-2">Middleware Implementation</h4>
                <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`// JWT Validation Middleware
const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, getKey, {
      audience: 'https://api.knowledge-chatbot.com',
      issuer: 'https://your-domain.auth0.com/',
      algorithms: ['RS256']
    });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-medium text-sm text-green-700 mb-2">Validation Checks</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Token signature verification</li>
                    <li>• Expiration time validation</li>
                    <li>• Audience and issuer checks</li>
                    <li>• Scope and permission validation</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Error Handling</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Invalid signature responses</li>
                    <li>• Expired token handling</li>
                    <li>• Malformed token errors</li>
                    <li>• Missing token responses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            ⚙️ Environment Configuration
          </h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">🔐 Required Environment Variables</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Frontend (.env)</h4>
                <div className="text-sm font-mono text-gray-700 space-y-1">
                  <div>VITE_AUTH0_DOMAIN=your-domain.auth0.com</div>
                  <div>VITE_AUTH0_CLIENT_ID=your-client-id</div>
                  <div>VITE_AUTH0_AUDIENCE=https://api.knowledge-chatbot.com</div>
                  <div>VITE_API_BASE_URL=https://api.yourdomain.com</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">Backend (.env)</h4>
                <div className="text-sm font-mono text-gray-700 space-y-1">
                  <div>AUTH0_DOMAIN=your-domain.auth0.com</div>
                  <div>AUTH0_AUDIENCE=https://api.knowledge-chatbot.com</div>
                  <div>AUTH0_CLIENT_ID=your-client-id</div>
                  <div>AUTH0_CLIENT_SECRET=your-client-secret</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing Authentication</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🔍 Frontend Testing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Login Flow:</strong> Test complete authentication flow
                </li>
                <li>
                  • <strong>Token Handling:</strong> Verify token storage and retrieval
                </li>
                <li>
                  • <strong>Protected Routes:</strong> Test route protection logic
                </li>
                <li>
                  • <strong>Logout Process:</strong> Verify session cleanup
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🛠️ Backend Testing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Token Validation:</strong> Test JWT verification
                </li>
                <li>
                  • <strong>API Protection:</strong> Verify endpoint security
                </li>
                <li>
                  • <strong>Error Responses:</strong> Test invalid token handling
                </li>
                <li>
                  • <strong>Scope Validation:</strong> Test permission checking
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
              <h4 className="font-semibold text-red-800 mb-2">Common Issues</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>
                  • <strong>CORS Errors:</strong> Check allowed origins in Auth0 settings
                </li>
                <li>
                  • <strong>Redirect Loops:</strong> Verify callback URLs match exactly
                </li>
                <li>
                  • <strong>Token Errors:</strong> Ensure audience matches API identifier
                </li>
                <li>
                  • <strong>Login Failures:</strong> Check Auth0 logs for detailed error information
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Debug Tools</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • <strong>Auth0 Dashboard:</strong> Monitor authentication logs and metrics
                </li>
                <li>
                  • <strong>JWT Debugger:</strong> Use jwt.io to decode and validate tokens
                </li>
                <li>
                  • <strong>Browser DevTools:</strong> Check network requests and localStorage
                </li>
                <li>
                  • <strong>Auth0 Extensions:</strong> Use Real-time Webtask Logs extension
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
