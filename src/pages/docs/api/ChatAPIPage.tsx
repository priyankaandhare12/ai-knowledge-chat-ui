import React from 'react';

export const ChatAPIPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Chat API</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete reference for conversational AI endpoints, message handling, and real-time chat
            functionality powered by OpenAI and LangChain.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">
              🤖 AI-Powered Conversations
            </h2>
            <p className="text-gray-700">
              The Chat API provides intelligent conversational capabilities with context awareness,
              document retrieval, and multi-modal interactions through advanced LangChain
              orchestration.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 Core Chat Endpoints</h2>

          <div className="space-y-6 mb-8">
            {/* Send Message Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/chat/message</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Send Chat Message</h3>
              <p className="text-gray-600 mb-4">
                Send a message to the AI assistant and receive an intelligent response with optional
                document context.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>Authorization: Bearer {'{accessToken}'}</div>
                    <div>Content-Type: application/json</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "message": "What are the latest sales figures?",
  "conversationId": "conv-123456789",
  "useContext": true,
  "temperature": 0.7,
  "maxTokens": 2000,
  "includeDocuments": true,
  "filters": {
    "documentTypes": ["pdf", "xlsx"],
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    },
    "tags": ["sales", "quarterly"]
  }
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
  "messageId": "msg-987654321",
  "conversationId": "conv-123456789",
  "response": {
    "content": "Based on the latest sales data...",
    "type": "text",
    "tokens": 150,
    "model": "gpt-4",
    "finishReason": "stop"
  },
  "context": {
    "documentsUsed": [
      {
        "id": "doc-456789",
        "title": "Q3 Sales Report.pdf",
        "relevanceScore": 0.92,
        "excerpt": "Q3 revenue increased by 15%..."
      }
    ],
    "totalDocuments": 5,
    "searchTime": 120
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "processingTime": 2300,
    "usage": {
      "promptTokens": 850,
      "completionTokens": 150,
      "totalTokens": 1000
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Stream Chat Endpoint */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/chat/stream</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Streaming Chat Response</h3>
              <p className="text-gray-600 mb-4">
                Send a message and receive streaming response chunks for real-time conversation
                experience.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Headers</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>Authorization: Bearer {'{accessToken}'}</div>
                    <div>Content-Type: application/json</div>
                    <div>Accept: text/event-stream</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "message": "Explain the company's growth strategy",
  "conversationId": "conv-123456789",
  "stream": true,
  "temperature": 0.7
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Streaming Response (Server-Sent Events)</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`event: message
data: {"type": "start", "messageId": "msg-987654321"}

event: message
data: {"type": "content", "delta": "Based on our"}

event: message
data: {"type": "content", "delta": " analysis..."}

event: message
data: {"type": "documents", "documents": [...]}

event: message
data: {"type": "end", "usage": {...}}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Conversation History */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  GET
                </span>
                <code className="text-lg font-mono">
                  /api/chat/conversations/{'{conversationId}'}
                </code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Get Conversation History</h3>
              <p className="text-gray-600 mb-4">
                Retrieve the complete message history for a specific conversation.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Path Parameters</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>conversationId: string - Unique conversation identifier</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Query Parameters</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <div>limit: number (default: 50) - Maximum messages to return</div>
                    <div>offset: number (default: 0) - Number of messages to skip</div>
                    <div>order: 'asc' | 'desc' (default: 'desc') - Sort order</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "success": true,
  "conversation": {
    "id": "conv-123456789",
    "title": "Sales Analysis Discussion",
    "createdAt": "2024-01-15T09:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "messageCount": 12,
    "summary": "Discussion about Q3 sales performance..."
  },
  "messages": [
    {
      "id": "msg-001",
      "role": "user",
      "content": "What are the latest sales figures?",
      "timestamp": "2024-01-15T10:30:00Z"
    },
    {
      "id": "msg-002",
      "role": "assistant",
      "content": "Based on the latest sales data...",
      "timestamp": "2024-01-15T10:30:05Z",
      "context": {
        "documentsUsed": [...]
      }
    }
  ],
  "pagination": {
    "total": 12,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Conversation */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                  POST
                </span>
                <code className="text-lg font-mono">/api/chat/conversations</code>
              </div>

              <h3 className="text-lg font-semibold mb-3">Create New Conversation</h3>
              <p className="text-gray-600 mb-4">
                Start a new conversation thread with optional initial context and settings.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Request Body</h4>
                  <div className="bg-gray-50 p-3 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "title": "Marketing Strategy Discussion",
  "initialMessage": "I need help with our Q1 marketing plan",
  "context": {
    "department": "marketing",
    "project": "q1-strategy"
  },
  "settings": {
    "temperature": 0.7,
    "maxTokens": 2000,
    "useDocumentContext": true
  }
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
  "conversation": {
    "id": "conv-987654321",
    "title": "Marketing Strategy Discussion",
    "createdAt": "2024-01-15T11:00:00Z",
    "settings": {
      "temperature": 0.7,
      "maxTokens": 2000,
      "useDocumentContext": true
    }
  },
  "firstResponse": {
    "messageId": "msg-001",
    "content": "I'd be happy to help with your Q1 marketing plan...",
    "timestamp": "2024-01-15T11:00:03Z"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Advanced Features</h2>

          <div className="space-y-6 mb-8">
            {/* Document Search Integration */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-blue-800">
                📚 Document Context Integration
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Semantic Search</h4>
                  <div className="bg-white p-4 rounded border text-sm">
                    <p className="mb-2">
                      The chat system automatically searches relevant documents using semantic
                      similarity:
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Vector embeddings for semantic matching</li>
                      <li>• Relevance scoring and ranking</li>
                      <li>• Context window optimization</li>
                      <li>• Multi-document synthesis</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Context Management</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`// Example context usage in response
{
  "context": {
    "documentsUsed": [
      {
        "id": "doc-123",
        "title": "Q3 Financial Report",
        "relevanceScore": 0.94,
        "excerpt": "Revenue increased by 15%...",
        "pageNumber": 3,
        "sections": ["Executive Summary", "Revenue Analysis"]
      }
    ],
    "searchQuery": "quarterly revenue growth",
    "totalResults": 25,
    "searchTime": 180
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Function Calling */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-4 text-green-800">
                ⚡ Function Calling & Tools
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Available Functions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-green-700">weather_lookup</div>
                      <div className="text-sm text-gray-600">Get current weather data</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-blue-700">slack_search</div>
                      <div className="text-sm text-gray-600">Search team messages</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-purple-700">document_search</div>
                      <div className="text-sm text-gray-600">Find relevant documents</div>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="font-medium text-orange-700">data_analysis</div>
                      <div className="text-sm text-gray-600">Analyze uploaded data</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Function Call Response</h4>
                  <div className="bg-white p-4 rounded border text-sm font-mono">
                    <pre className="whitespace-pre-wrap">
                      {`{
  "response": {
    "content": "Based on the weather data, it's currently 72°F...",
    "functionCalls": [
      {
        "name": "weather_lookup",
        "arguments": {"location": "San Francisco"},
        "result": {
          "temperature": 72,
          "condition": "sunny",
          "humidity": 65
        }
      }
    ]
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚙️ Configuration & Settings</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-4 text-yellow-800">🎛️ Chat Parameters</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Model Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>temperature</span>
                      <span className="text-gray-600">0.0 - 1.0 (default: 0.7)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>maxTokens</span>
                      <span className="text-gray-600">1 - 4000 (default: 2000)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>topP</span>
                      <span className="text-gray-600">0.0 - 1.0 (default: 1.0)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>frequencyPenalty</span>
                      <span className="text-gray-600">0.0 - 2.0 (default: 0.0)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Context Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>useContext</span>
                      <span className="text-gray-600">boolean (default: true)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>maxDocuments</span>
                      <span className="text-gray-600">1 - 10 (default: 5)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>contextWindow</span>
                      <span className="text-gray-600">512 - 8000 (default: 4000)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>similarityThreshold</span>
                      <span className="text-gray-600">0.0 - 1.0 (default: 0.7)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Error Handling</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">Common Error Responses</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">400 Bad Request</div>
                  <div className="text-sm text-gray-600">
                    Invalid message format or missing required parameters
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Check message content and conversation ID
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">429 Too Many Requests</div>
                  <div className="text-sm text-gray-600">Rate limit exceeded for API calls</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Wait before sending next request or upgrade plan
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-red-700 mb-1">503 Service Unavailable</div>
                  <div className="text-sm text-gray-600">OpenAI API temporarily unavailable</div>
                  <div className="text-xs text-gray-500 mt-1">Retry with exponential backoff</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📈 Usage & Monitoring</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">📊</span>
              <div>
                <strong>Token Usage Tracking:</strong> Monitor API usage, token consumption, and
                cost optimization
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">⚡</span>
              <div>
                <strong>Performance Metrics:</strong> Track response times, success rates, and user
                satisfaction
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🔍</span>
              <div>
                <strong>Conversation Analytics:</strong> Analyze conversation patterns and popular
                topics
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🎯 Next Steps</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                • Explore the <strong>Authentication API</strong> for securing chat endpoints
              </p>
              <p className="text-gray-700">
                • Check the <strong>Files API</strong> for document upload and management
              </p>
              <p className="text-gray-700">
                • Review the <strong>External API Integrations</strong> for Slack and weather
                functions
              </p>
              <p className="text-gray-700">
                • Test the API endpoints using the provided examples and Postman collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAPIPage;
