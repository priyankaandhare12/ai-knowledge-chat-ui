import React from 'react';

export const IntroductionPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Introduction</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Welcome to the Universal Knowledge Chatbot - an AI-powered web application designed to
            make complex information easily accessible through natural conversation.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🔗 Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://ai-knowledge-chat-ui.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-700 hover:text-green-900 font-medium"
              >
                <span>🌐</span>
                <span>Live Application</span>
              </a>
              <a
                href="https://github.com/priyankaandhare12/ai-knowledge-chat-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-medium"
              >
                <span>📱</span>
                <span>Frontend Repository</span>
              </a>
              <a
                href="https://github.com/priyankaandhare12/knowledge-chatbot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 font-medium"
              >
                <span>⚙️</span>
                <span>Backend Repository</span>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">🎯 Project Mission</h2>
            <p className="text-gray-700">
              Our biggest challenge is making large, complex information easy to access. Whether
              it's a 200-page PDF, a book, a structured database, or data coming from external APIs
              — people waste too much time searching, reading, or trying to query data manually.
              This chatbot solves that problem by providing intelligent, conversational access to
              diverse knowledge sources.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">What Makes This Special?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-lg font-semibold mb-2">Document Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Upload PDFs, documents, and books. Ask questions like "What are the main takeaways
                of Chapter 3?" or "Summarize this contract in simple terms."
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">🗄️</div>
              <h3 className="text-lg font-semibold mb-2">Database Queries</h3>
              <p className="text-gray-600 text-sm">
                Connect to databases and ask natural language questions like "Show me the top 10
                customers by revenue" or "Which orders are pending shipment?"
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="text-lg font-semibold mb-2">API Integration</h3>
              <p className="text-gray-600 text-sm">
                Query external APIs for weather, finance, sports data, and more. Ask "What's the
                forecast tomorrow?" or "Give me today's exchange rates."
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Current Capabilities</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">✅</span>
              <div>
                <strong>Weather Integration:</strong> Real-time weather data for any city using
                OpenWeatherMap API
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">✅</span>
              <div>
                <strong>PDF Document Analysis:</strong> Upload and analyze PDF files with AI-powered
                Q&A capabilities
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">✅</span>
              <div>
                <strong>Slack Integration:</strong> Search through project discussions and team
                conversations
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">✅</span>
              <div>
                <strong>Secure Authentication:</strong> Enterprise-grade Auth0 SSO with Google login
                integration
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Enterprise Features</h2>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔒 Security First</h3>
            <p className="text-gray-700">
              Built with enterprise-grade security using Auth0 SSO. Only authorized internal users
              can access the system, ensuring your sensitive data remains protected.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-green-800">🚀 Scalable Architecture</h3>
            <p className="text-gray-700">
              Modern microservices architecture with React frontend, Express backend, and AI
              services. Designed to handle enterprise workloads and integrate with existing systems.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Getting Started</h2>

          <p className="text-gray-700 mb-4">
            Ready to explore the capabilities? Check out our{' '}
            <a
              href="/docs/getting-started/quick-start"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Quick Start Guide
            </a>{' '}
            to begin using the chatbot, or dive into the{' '}
            <a href="/docs/architecture" className="text-blue-600 hover:text-blue-800 underline">
              Architecture
            </a>{' '}
            section to understand how everything works under the hood.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Navigation Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Use the sidebar navigation to explore specific topics</li>
              <li>• Each section provides comprehensive information about that component</li>
              <li>• Code examples and setup instructions are included where relevant</li>
              <li>• Both frontend and backend details are documented</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionPage;
