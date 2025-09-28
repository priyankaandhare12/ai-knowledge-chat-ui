import React from 'react';

export const BackendArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Backend Architecture</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive overview of the Node.js/Express backend architecture, AI processing
            pipeline, and service integrations.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🏗️ Server Architecture</h2>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {`server/
├── app/                    # Application core
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/            # Data models
│   └── services/          # Business logic services
├── routes/                # API route definitions
│   ├── auth.js           # Authentication routes
│   ├── chat.js           # Chat endpoints
│   └── files.js          # File processing routes
├── config/               # Configuration files
│   ├── database.js       # Database configuration
│   └── auth0.js          # Auth0 setup
├── tests/                # Test suites
└── index.js             # Application entry point`}
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Express.js Foundation</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🛣️ Middleware Stack</h3>
              <p className="text-gray-700 mb-4">
                Carefully orchestrated middleware pipeline ensuring security, performance, and
                reliability.
              </p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <div className="font-medium text-sm">Security Middleware</div>
                  <div className="text-xs text-gray-600 mt-1">
                    CORS, Helmet, Rate Limiting, JWT Validation
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="font-medium text-sm">Parsing Middleware</div>
                  <div className="text-xs text-gray-600 mt-1">
                    JSON Body Parser, File Upload (Multer), URL Encoding
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <div className="font-medium text-sm">Logging & Monitoring</div>
                  <div className="text-xs text-gray-600 mt-1">
                    Morgan Logger, Error Tracking, Performance Metrics
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">📡 API Endpoints</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 className="font-medium mb-2">Chat Endpoints</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <code>POST /api/chat/message</code> - Send message
                    </li>
                    <li>
                      <code>GET /api/chat/history</code> - Get chat history
                    </li>
                    <li>
                      <code>DELETE /api/chat/session</code> - Clear session
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">File Endpoints</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <code>POST /api/files/upload</code> - Upload file
                    </li>
                    <li>
                      <code>GET /api/files/process</code> - Process status
                    </li>
                    <li>
                      <code>DELETE /api/files/:id</code> - Delete file
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Integration Endpoints</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <code>GET /api/weather/:city</code> - Weather data
                    </li>
                    <li>
                      <code>GET /api/slack/search</code> - Slack search
                    </li>
                    <li>
                      <code>GET /api/auth/profile</code> - User profile
                    </li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded border border-orange-200">
                  <h4 className="font-medium mb-2">Admin Endpoints</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <code>GET /api/health</code> - Health check
                    </li>
                    <li>
                      <code>GET /api/metrics</code> - System metrics
                    </li>
                    <li>
                      <code>POST /api/admin/reset</code> - Reset data
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧠 AI Processing Pipeline</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                🔗 LangChain Integration
              </h3>
              <p className="text-gray-700 mb-4">
                Advanced AI workflow orchestration using LangChain framework for intelligent query
                processing and tool selection.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-purple-100">
                  <h4 className="font-medium mb-2 text-purple-700">Core Components</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Agents:</strong> Intelligent task executors
                    </li>
                    <li>
                      • <strong>Tools:</strong> Weather, Slack, Document search
                    </li>
                    <li>
                      • <strong>Memory:</strong> Conversation context
                    </li>
                    <li>
                      • <strong>Chains:</strong> Sequential processing
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded border border-purple-100">
                  <h4 className="font-medium mb-2 text-purple-700">Processing Flow</h4>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Query analysis and intent detection</li>
                    <li>2. Tool selection based on query type</li>
                    <li>3. Context retrieval and enrichment</li>
                    <li>4. Response generation and validation</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">🤖 OpenAI Integration</h3>
              <p className="text-gray-700 mb-4">
                Advanced language model integration with GPT-4 for natural language understanding
                and generation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-blue-100">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Chat Completions</h5>
                  <p className="text-xs text-gray-600">
                    GPT-4 for conversational responses with function calling
                  </p>
                </div>

                <div className="bg-white p-3 rounded border border-blue-100">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Embeddings</h5>
                  <p className="text-xs text-gray-600">
                    text-embedding-ada-002 for document vectorization
                  </p>
                </div>

                <div className="bg-white p-3 rounded border border-blue-100">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Function Calling</h5>
                  <p className="text-xs text-gray-600">
                    Structured tool invocation and parameter extraction
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🗄️ Data Storage & Management
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-green-700">
                🌲 Vector Database (Pinecone)
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                High-performance vector similarity search for document embeddings and semantic
                retrieval.
              </p>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <div className="text-xs space-y-1">
                  <div>
                    <strong>Index Management:</strong> Document indexing and updates
                  </div>
                  <div>
                    <strong>Similarity Search:</strong> Cosine similarity with metadata filtering
                  </div>
                  <div>
                    <strong>Namespace Isolation:</strong> User-specific data segregation
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">💾 Session Storage</h3>
              <p className="text-gray-700 text-sm mb-3">
                In-memory session management with Redis-compatible interface for fast access.
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <div className="text-xs space-y-1">
                  <div>
                    <strong>Chat History:</strong> Temporary conversation storage
                  </div>
                  <div>
                    <strong>User Sessions:</strong> Authentication state management
                  </div>
                  <div>
                    <strong>Cache Layer:</strong> API response caching
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🔌 External Service Integration
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">🌤️ Weather API Service</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Implementation Features</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Real-time weather data retrieval</li>
                    <li>• City name to coordinates conversion</li>
                    <li>• Response caching for performance</li>
                    <li>• Error handling and fallbacks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Processing</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Temperature unit conversion</li>
                    <li>• Weather condition formatting</li>
                    <li>• Forecast data structuring</li>
                    <li>• Multi-language support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                💬 Slack API Integration
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Search Capabilities</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Message content search</li>
                    <li>• Channel-specific queries</li>
                    <li>• User mention filtering</li>
                    <li>• Time-based filtering</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Access</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• OAuth2 authentication</li>
                    <li>• Rate limit management</li>
                    <li>• Permission-based access</li>
                    <li>• Result aggregation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔐 Security Implementation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">
                🛡️ Authentication Security
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>JWT Validation:</strong> Auth0 token verification
                </li>
                <li>
                  • <strong>CORS Protection:</strong> Origin-based access control
                </li>
                <li>
                  • <strong>Rate Limiting:</strong> API abuse prevention
                </li>
                <li>
                  • <strong>Input Sanitization:</strong> XSS and injection prevention
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔒 Data Protection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Environment Secrets:</strong> Secure API key management
                </li>
                <li>
                  • <strong>HTTPS Enforcement:</strong> TLS encryption in transit
                </li>
                <li>
                  • <strong>Data Validation:</strong> Schema-based input validation
                </li>
                <li>
                  • <strong>Error Sanitization:</strong> Secure error responses
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            ⚡ Performance & Scalability
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🚀</span>
              <div>
                <strong>Asynchronous Processing:</strong> Non-blocking I/O with async/await patterns
                for high concurrency
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🔄</span>
              <div>
                <strong>Connection Pooling:</strong> Efficient database connection management and
                reuse
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">📦</span>
              <div>
                <strong>Response Caching:</strong> Intelligent caching strategies for API responses
                and computations
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🏗️</span>
              <div>
                <strong>Microservice Ready:</strong> Modular architecture supporting horizontal
                scaling
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing & Quality</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">Unit Tests</h4>
                <p className="text-sm text-gray-600 mb-2">Individual function testing</p>
                <ul className="text-xs text-gray-600">
                  <li>• Jest testing framework</li>
                  <li>• Service layer testing</li>
                  <li>• Utility function testing</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Integration Tests</h4>
                <p className="text-sm text-gray-600 mb-2">API endpoint testing</p>
                <ul className="text-xs text-gray-600">
                  <li>• Supertest for HTTP testing</li>
                  <li>• Database integration</li>
                  <li>• External API mocking</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-purple-700">Load Testing</h4>
                <p className="text-sm text-gray-600 mb-2">Performance validation</p>
                <ul className="text-xs text-gray-600">
                  <li>• Concurrent user simulation</li>
                  <li>• Response time monitoring</li>
                  <li>• Resource usage tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendArchitecturePage;
