import React from 'react';

export const APIReferencePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">API Reference</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive API documentation for integrating with the Universal Knowledge Chatbot
            backend services.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">📡 API Overview</h2>
            <p className="text-gray-700 mb-4">
              The Knowledge Chatbot API provides RESTful endpoints for chat interactions, file
              processing, external integrations, and user management. All endpoints require
              authentication via JWT tokens.
            </p>

            <div className="bg-white p-4 rounded border border-blue-300 mt-4">
              <h3 className="font-semibold mb-2 text-blue-800">🔗 Backend Repository</h3>
              <a
                href="https://github.com/priyankaandhare12/knowledge-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                github.com/priyankaandhare12/knowledge-chatbot
              </a>
              <p className="text-sm text-gray-600 mt-1">
                Complete backend implementation with API endpoints, authentication, and
                integrations.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔐 Authentication</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-red-700">
                🔑 JWT Token Authentication
              </h3>
              <p className="text-gray-700 mb-4">
                All API requests must include a valid JWT token in the Authorization header.
              </p>

              <div className="bg-red-50 p-4 rounded border border-red-200 mb-4">
                <h4 className="font-medium mb-2">Request Headers</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800">
                    {`Authorization: Bearer <jwt_token>
Content-Type: application/json`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Token Requirements</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Valid Auth0 JWT token</li>
                    <li>• Proper audience claim</li>
                    <li>• Active expiration time</li>
                    <li>• Required scopes/permissions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Error Responses</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 401: Invalid or missing token</li>
                    <li>• 403: Insufficient permissions</li>
                    <li>• 419: Token expired</li>
                    <li>• 429: Rate limit exceeded</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 Chat Endpoints</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">POST /api/chat/message</h3>
              <p className="text-gray-700 text-sm mb-4">
                Send a message to the chatbot and receive an AI-generated response.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-blue-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "message": "What's the weather in New York?",
  "sessionId": "uuid-session-id",
  "context": {
    "conversationHistory": [...],
    "userPreferences": {...}
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-green-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "message": "The current weather in New York is...",
    "messageId": "msg-uuid",
    "timestamp": "2024-01-15T10:30:00Z",
    "sources": ["weather-api"],
    "processingTime": 1.2
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">GET /api/chat/history</h3>
              <p className="text-gray-700 text-sm mb-4">
                Retrieve conversation history for a user session.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <div className="bg-green-50 p-3 rounded border">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • <strong>sessionId:</strong> Session identifier (optional)
                      </li>
                      <li>
                        • <strong>limit:</strong> Number of messages (default: 50)
                      </li>
                      <li>
                        • <strong>offset:</strong> Pagination offset (default: 0)
                      </li>
                      <li>
                        • <strong>fromDate:</strong> Start date filter (ISO 8601)
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-green-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "messages": [...],
    "totalCount": 150,
    "hasMore": true
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📁 File Upload Endpoints</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">POST /api/files/upload</h3>
              <p className="text-gray-700 text-sm mb-4">
                Upload documents for processing and vectorization.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Request (Multipart Form Data)</h4>
                  <div className="bg-purple-50 p-3 rounded border">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • <strong>file:</strong> Document file (PDF, TXT, DOCX)
                      </li>
                      <li>
                        • <strong>fileName:</strong> Original file name
                      </li>
                      <li>
                        • <strong>category:</strong> Document category (optional)
                      </li>
                      <li>
                        • <strong>metadata:</strong> Additional metadata JSON
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-purple-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "fileId": "file-uuid",
    "fileName": "document.pdf",
    "fileSize": 2048576,
    "status": "processing",
    "processingId": "proc-uuid"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-orange-700">
                GET /api/files/:id/status
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                Check the processing status of an uploaded file.
              </p>

              <div className="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 className="font-medium mb-2">Status Values</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <strong>uploading:</strong> File upload in progress
                  </li>
                  <li>
                    • <strong>processing:</strong> Document being processed and vectorized
                  </li>
                  <li>
                    • <strong>completed:</strong> Ready for querying
                  </li>
                  <li>
                    • <strong>error:</strong> Processing failed
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🌐 External Integration Endpoints
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-cyan-700">GET /api/weather/:city</h3>
              <p className="text-gray-700 text-sm mb-4">
                Get current weather information for a specified city.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Path Parameters</h4>
                  <div className="bg-cyan-50 p-3 rounded border">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • <strong>city:</strong> City name (URL encoded)
                      </li>
                    </ul>
                    <h5 className="font-medium mt-3 mb-1">Query Parameters</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • <strong>country:</strong> Country code (optional)
                      </li>
                      <li>
                        • <strong>units:</strong> metric|imperial (default: metric)
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-cyan-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "city": "New York",
    "temperature": 22.5,
    "description": "Clear sky",
    "humidity": 65,
    "windSpeed": 3.2,
    "visibility": 10000,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700">GET /api/slack/search</h3>
              <p className="text-gray-700 text-sm mb-4">Search Slack messages and conversations.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <div className="bg-indigo-50 p-3 rounded border">
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • <strong>q:</strong> Search query (required)
                      </li>
                      <li>
                        • <strong>channel:</strong> Specific channel ID
                      </li>
                      <li>
                        • <strong>user:</strong> User ID to filter by
                      </li>
                      <li>
                        • <strong>after:</strong> Start date (timestamp)
                      </li>
                      <li>
                        • <strong>before:</strong> End date (timestamp)
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-indigo-50 p-3 rounded border text-sm font-mono">
                    <pre className="text-gray-800 whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "messages": [{
      "text": "Message content...",
      "user": "U123456789",
      "channel": "C987654321",
      "timestamp": "1642248600.123456",
      "permalink": "https://..."
    }],
    "totalCount": 42
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">👤 User Management</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">GET /api/user/profile</h3>
              <p className="text-gray-700 text-sm mb-4">Get current user profile information.</p>

              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-medium mb-2">Response</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://...",
    "preferences": {
      "theme": "light",
      "language": "en"
    },
    "usage": {
      "documentsUploaded": 5,
      "apiCallsThisMonth": 150,
      "storageUsed": 10485760
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚨 Error Handling</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">HTTP Status Codes</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>200:</strong> Success
                </li>
                <li>
                  • <strong>400:</strong> Bad Request - Invalid parameters
                </li>
                <li>
                  • <strong>401:</strong> Unauthorized - Invalid/missing token
                </li>
                <li>
                  • <strong>403:</strong> Forbidden - Insufficient permissions
                </li>
                <li>
                  • <strong>404:</strong> Not Found - Resource doesn't exist
                </li>
                <li>
                  • <strong>429:</strong> Too Many Requests - Rate limited
                </li>
                <li>
                  • <strong>500:</strong> Internal Server Error
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">Error Response Format</h3>
              <div className="bg-white p-3 rounded border text-sm font-mono">
                <pre className="text-gray-800 whitespace-pre-wrap">
                  {`{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter",
    "details": {
      "parameter": "message",
      "location": "body"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Rate Limiting</h2>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">Rate Limit Policy</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Limits by Endpoint</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <strong>Chat:</strong> 60 requests/minute
                  </li>
                  <li>
                    • <strong>File Upload:</strong> 10 requests/minute
                  </li>
                  <li>
                    • <strong>Weather:</strong> 100 requests/hour
                  </li>
                  <li>
                    • <strong>Slack Search:</strong> 30 requests/minute
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Rate Limit Headers</h4>
                <div className="text-sm font-mono text-gray-700">
                  <div>X-RateLimit-Limit: 60</div>
                  <div>X-RateLimit-Remaining: 45</div>
                  <div>X-RateLimit-Reset: 1642248660</div>
                  <div>Retry-After: 15</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 SDK & Examples</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">JavaScript/TypeScript Example</h3>
              <div className="bg-white p-4 rounded border text-sm font-mono">
                <pre className="text-gray-800 whitespace-pre-wrap">
                  {`// Initialize API client
const apiClient = new KnowledgeChatbotAPI({
  baseURL: 'https://api.knowledge-chatbot.com',
  token: 'your-jwt-token'
});

// Send a message
const response = await apiClient.chat.sendMessage({
  message: "What's the weather like today?",
  sessionId: "session-123"
});

console.log(response.data.message);

// Upload a file
const file = new File(['content'], 'document.txt');
const uploadResponse = await apiClient.files.upload(file, {
  category: 'documentation'
});

console.log(uploadResponse.data.fileId);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIReferencePage;
