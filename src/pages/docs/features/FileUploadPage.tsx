import React from 'react';

export const FileUploadPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">File Upload & Processing</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive guide to file upload capabilities, document processing pipeline, and
            AI-powered analysis features.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              📁 File Processing Overview
            </h2>
            <p className="text-gray-700">
              The system supports uploading and processing various document formats including PDFs,
              Word documents, and text files. Advanced AI processing enables intelligent Q&A on
              uploaded content.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📄 Supported File Types</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-lg font-semibold mb-2">PDF Documents</h3>
              <p className="text-gray-600 text-sm mb-3">
                Extract text from PDF files including scanned documents with OCR capabilities.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Max size: 50MB</li>
                <li>• OCR for scanned PDFs</li>
                <li>• Metadata extraction</li>
                <li>• Multi-page support</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-semibold mb-2">Text Files</h3>
              <p className="text-gray-600 text-sm mb-3">
                Process plain text files, markdown, and other text-based formats.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• .txt, .md, .csv files</li>
                <li>• UTF-8 encoding support</li>
                <li>• Large file handling</li>
                <li>• Structured data parsing</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-lg font-semibold mb-2">Word Documents</h3>
              <p className="text-gray-600 text-sm mb-3">
                Extract content from Microsoft Word documents and similar formats.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• .docx, .doc support</li>
                <li>• Formatting preservation</li>
                <li>• Image and table handling</li>
                <li>• Comment extraction</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔄 Processing Pipeline</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                Step 1: Upload & Validation
              </h3>
              <p className="text-gray-700 text-sm">
                Files are uploaded via drag-and-drop or file picker, validated for type and size,
                then stored securely with unique identifiers.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                Step 2: Content Extraction
              </h3>
              <p className="text-gray-700 text-sm">
                Text content is extracted using specialized parsers for each file type, with OCR
                processing for scanned documents.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Step 3: AI Processing</h3>
              <p className="text-gray-700 text-sm">
                Content is chunked, vectorized using OpenAI embeddings, and stored in Pinecone
                vector database for semantic search capabilities.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="text-lg font-semibold mb-3 text-orange-800">
                Step 4: Ready for Queries
              </h3>
              <p className="text-gray-700 text-sm">
                Processed documents are available for natural language queries, with context-aware
                responses and source attribution.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">💬 Query Examples</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">Example Questions You Can Ask</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "What are the main points in Chapter 3?"
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "Summarize the contract terms"
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "Find information about pricing"
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "What does the author say about X?"
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "List all the requirements mentioned"
                  </div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300">
                  <div className="font-medium text-sm text-gray-800">
                    "Compare sections A and B"
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔒 Security & Privacy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">🛡️ Data Security</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Encrypted file storage</li>
                <li>• User-specific namespacing</li>
                <li>• Secure deletion capabilities</li>
                <li>• Access audit logging</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔐 Privacy Controls</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Private document processing</li>
                <li>• No data sharing between users</li>
                <li>• GDPR compliance</li>
                <li>• Right to data deletion</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚡ Performance & Limits</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">📊</span>
              <div>
                <strong>File Size Limits:</strong> Maximum 50MB per file with intelligent
                compression for large documents
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">⚡</span>
              <div>
                <strong>Processing Speed:</strong> Typical processing time of 2-5 minutes for
                average documents
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🔄</span>
              <div>
                <strong>Concurrent Processing:</strong> Multiple files can be processed
                simultaneously
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">💾</span>
              <div>
                <strong>Storage Quotas:</strong> Generous storage limits with upgrade options for
                enterprise users
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;
