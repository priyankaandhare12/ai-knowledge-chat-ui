import React from 'react';

export const DatabaseDesignPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Database Design</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Detailed overview of the database architecture, vector storage systems, and data
            modeling strategies for the knowledge chatbot.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              🗄️ Database Architecture Overview
            </h2>
            <p className="text-gray-700 mb-4">
              The system employs a hybrid database approach combining vector databases for semantic
              search, traditional databases for structured data, and in-memory storage for session
              management.
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="font-mono text-sm text-gray-700">
                <div className="mb-2">
                  <strong>Vector Layer:</strong> Pinecone (Document embeddings, Semantic search)
                </div>
                <div className="mb-2">
                  <strong>Session Layer:</strong> Redis/Memory (Chat history, User sessions)
                </div>
                <div>
                  <strong>Metadata Layer:</strong> JSON Storage (User preferences, File metadata)
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🌲 Vector Database (Pinecone)
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                📊 Vector Index Structure
              </h3>
              <p className="text-gray-700 mb-4">
                Optimized for high-dimensional vector similarity search with metadata filtering
                capabilities.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-3">Index Configuration</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      • <strong>Dimension:</strong> 1536 (OpenAI ada-002)
                    </li>
                    <li>
                      • <strong>Metric:</strong> Cosine similarity
                    </li>
                    <li>
                      • <strong>Pod Type:</strong> p1.x1 (starter)
                    </li>
                    <li>
                      • <strong>Replicas:</strong> 1 (with auto-scaling)
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-3">Metadata Schema</h4>
                  <div className="text-sm text-gray-700 space-y-2 font-mono">
                    <div>userId: string</div>
                    <div>documentId: string</div>
                    <div>chunkIndex: number</div>
                    <div>fileName: string</div>
                    <div>fileType: string</div>
                    <div>uploadDate: timestamp</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                🔍 Semantic Search Implementation
              </h3>

              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 className="font-medium mb-2">Query Processing Pipeline</h4>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>
                      1. <strong>Query Vectorization:</strong> Convert user query to
                      1536-dimensional embedding
                    </li>
                    <li>
                      2. <strong>Similarity Search:</strong> Find top-k most similar document chunks
                    </li>
                    <li>
                      3. <strong>Metadata Filtering:</strong> Apply user-specific and document-type
                      filters
                    </li>
                    <li>
                      4. <strong>Context Ranking:</strong> Re-rank results based on relevance scores
                    </li>
                    <li>
                      5. <strong>Context Assembly:</strong> Combine retrieved chunks for AI
                      processing
                    </li>
                  </ol>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h4 className="font-medium mb-2">Optimization Strategies</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>Namespace Isolation:</strong> Separate user data for security and
                      performance
                    </li>
                    <li>
                      • <strong>Chunk Optimization:</strong> 1000-character chunks with
                      200-character overlap
                    </li>
                    <li>
                      • <strong>Batch Operations:</strong> Bulk upserts for improved throughput
                    </li>
                    <li>
                      • <strong>Query Caching:</strong> Cache embeddings for repeated queries
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            💾 Session & Cache Management
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-red-700">🔄 Chat Session Storage</h3>
              <p className="text-gray-700 text-sm mb-3">
                In-memory storage for real-time chat sessions with Redis-compatible interface.
              </p>
              <div className="bg-red-50 p-4 rounded border border-red-200">
                <h4 className="font-medium mb-2 text-sm">Data Structure</h4>
                <div className="text-xs text-gray-700 font-mono space-y-1">
                  <div>sessionId: uuid</div>
                  <div>userId: string</div>
                  <div>messages: Array&lt;Message&gt;</div>
                  <div>context: string</div>
                  <div>timestamp: ISO8601</div>
                  <div>ttl: 24h (auto-expire)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-blue-700">⚡ Response Cache Layer</h3>
              <p className="text-gray-700 text-sm mb-3">
                Strategic caching for API responses and computed results to improve performance.
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-medium mb-2 text-sm">Cache Strategy</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>
                    • <strong>Weather API:</strong> 10-minute TTL
                  </li>
                  <li>
                    • <strong>Slack Search:</strong> 5-minute TTL
                  </li>
                  <li>
                    • <strong>Document Embeddings:</strong> Persistent
                  </li>
                  <li>
                    • <strong>User Queries:</strong> 1-hour TTL
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            📄 Document Processing Pipeline
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-4 text-orange-800">
                📝 File Processing Workflow
              </h3>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded border border-orange-100">
                  <h4 className="font-medium mb-3">Processing Steps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2 text-orange-700">
                        1. File Validation
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• File type validation (PDF, TXT, DOCX)</li>
                        <li>• Size limit checking (max 50MB)</li>
                        <li>• Virus scanning integration</li>
                        <li>• User quota verification</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2 text-orange-700">
                        2. Content Extraction
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• PDF text extraction (pdf-parse)</li>
                        <li>• OCR for scanned documents</li>
                        <li>• Metadata extraction</li>
                        <li>• Character encoding normalization</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2 text-orange-700">3. Text Chunking</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Semantic chunking (1000 chars)</li>
                        <li>• Overlap handling (200 chars)</li>
                        <li>• Paragraph boundary respect</li>
                        <li>• Chapter/section detection</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2 text-orange-700">4. Vectorization</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• OpenAI embedding generation</li>
                        <li>• Batch processing for efficiency</li>
                        <li>• Metadata attachment</li>
                        <li>• Pinecone index upsert</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Data Models & Schemas</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">👤 User Data Model</h3>
              <div className="bg-gray-50 p-4 rounded border">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {`interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt: Date;
  lastLogin: Date;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  quotas: {
    documents: number;
    apiCalls: number;
    storageUsed: number;
  };
}`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">💬 Message Data Model</h3>
              <div className="bg-gray-50 p-4 rounded border">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {`interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    sources?: string[];
    processingTime?: number;
    confidence?: number;
    tools?: string[];
  };
}`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">📄 Document Data Model</h3>
              <div className="bg-gray-50 p-4 rounded border">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {`interface Document {
  id: string;
  userId: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  processingStatus: string;
  chunkCount: number;
  metadata: {
    title?: string;
    author?: string;
    pages?: number;
    language?: string;
  };
}`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🔍 Vector Record Model</h3>
              <div className="bg-gray-50 p-4 rounded border">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {`interface VectorRecord {
  id: string;
  values: number[];     // 1536-dim
  metadata: {
    userId: string;
    documentId: string;
    chunkIndex: number;
    text: string;
    fileName: string;
    fileType: string;
    uploadDate: string;
  };
}`}
                </pre>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🚀 Performance & Optimization
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">⚡</span>
              <div>
                <strong>Efficient Indexing:</strong> Optimized vector dimensions and similarity
                metrics for fast retrieval
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🔄</span>
              <div>
                <strong>Lazy Loading:</strong> On-demand data loading and progressive chunk
                processing
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">📦</span>
              <div>
                <strong>Batch Operations:</strong> Bulk inserts, updates, and deletions for improved
                throughput
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🗂️</span>
              <div>
                <strong>Data Partitioning:</strong> User-based namespaces and time-based
                partitioning strategies
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔒 Data Security & Privacy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">🛡️ Access Control</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>User Isolation:</strong> Namespace-based data segregation
                </li>
                <li>
                  • <strong>API Authentication:</strong> JWT token validation on all requests
                </li>
                <li>
                  • <strong>Role-Based Access:</strong> Admin vs. user permission levels
                </li>
                <li>
                  • <strong>Audit Logging:</strong> Track all data access and modifications
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔐 Data Protection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Encryption at Rest:</strong> Database-level encryption for sensitive
                  data
                </li>
                <li>
                  • <strong>Encryption in Transit:</strong> TLS 1.2+ for all data transfers
                </li>
                <li>
                  • <strong>Data Anonymization:</strong> Remove PII from vector embeddings
                </li>
                <li>
                  • <strong>Retention Policies:</strong> Automatic data cleanup and archival
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📊 Monitoring & Analytics</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">Performance Metrics</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Query response times</li>
                  <li>• Vector search latency</li>
                  <li>• Cache hit rates</li>
                  <li>• Throughput statistics</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Usage Analytics</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Document upload trends</li>
                  <li>• Query pattern analysis</li>
                  <li>• User engagement metrics</li>
                  <li>• Feature utilization</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-purple-700">Health Monitoring</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Database connectivity</li>
                  <li>• Storage capacity alerts</li>
                  <li>• Error rate tracking</li>
                  <li>• Resource utilization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDesignPage;
