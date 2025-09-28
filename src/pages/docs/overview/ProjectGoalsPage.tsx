import React from 'react';

export const ProjectGoalsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Project Goals</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Understanding the strategic objectives and success criteria that drive the Universal
            Knowledge Chatbot development.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 Project Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">🌐 Live Application</h3>
                <a
                  href="https://ai-knowledge-chat-ui.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  ai-knowledge-chat-ui.vercel.app
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">📱 Frontend Repository</h3>
                <a
                  href="https://github.com/priyankaandhare12/ai-knowledge-chat-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  github.com/priyankaandhare12/ai-knowledge-chat-ui
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">⚙️ Backend Repository</h3>
                <a
                  href="https://github.com/priyankaandhare12/knowledge-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  github.com/priyankaandhare12/knowledge-chatbot
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-700">🚀 Deployment</h3>
                <span className="text-sm text-gray-600">
                  Frontend: Vercel, Backend: Flexible options
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎯 Primary Goals</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">
                1. Simplify Information Access
              </h3>
              <p className="text-gray-700 text-sm">
                Transform how users interact with complex data sources. Instead of manual searching
                through 200-page PDFs or crafting complex database queries, users can simply ask
                questions in natural language.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold mb-3 text-green-800">
                2. Increase Productivity
              </h3>
              <p className="text-gray-700 text-sm">
                Reduce time spent searching for information by 80%. Enable instant access to
                insights from multiple knowledge sources through conversational AI interface.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">
                3. Multi-Source Intelligence
              </h3>
              <p className="text-gray-700 text-sm">
                Create a unified interface to query diverse data sources: documents, databases,
                APIs, and external services through a single conversational interface.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
              <h3 className="text-xl font-semibold mb-3 text-red-800">4. Enterprise Security</h3>
              <p className="text-gray-700 text-sm">
                Maintain enterprise-grade security with SSO authentication, ensuring only authorized
                users can access sensitive organizational knowledge and data.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Technical Objectives</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-blue-500 mr-2">📱</span>
                Modern User Experience
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Intuitive chat interface with real-time responses</li>
                <li>Mobile-responsive design for access anywhere</li>
                <li>Smooth animations and interactive elements</li>
                <li>Accessibility compliance for all users</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-green-500 mr-2">⚡</span>
                High Performance
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Sub-second response times for common queries</li>
                <li>Efficient document processing and vectorization</li>
                <li>Optimized API calls and caching strategies</li>
                <li>Scalable architecture for growing workloads</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-purple-500 mr-2">🔧</span>
                Developer Experience
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>TypeScript for type safety and better tooling</li>
                <li>Comprehensive testing suite with high coverage</li>
                <li>Clear documentation and code examples</li>
                <li>Easy local development setup</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎯 Success Criteria</h2>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Measurable Outcomes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-700">User Adoption</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 90% user satisfaction rating</li>
                  <li>• Daily active user growth</li>
                  <li>• Reduced support tickets for information access</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-700">Performance Metrics</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 95% uptime reliability</li>
                  <li>• &lt;2 second average response time</li>
                  <li>• 99% accurate query responses</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔮 Future Vision</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-500 text-lg">🔄</span>
              <div>
                <strong>Enhanced Integrations:</strong> Expand to Jira, GitHub, and more enterprise
                tools for comprehensive workflow integration
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🧠</span>
              <div>
                <strong>Advanced AI:</strong> Implement more sophisticated reasoning capabilities
                and multi-modal inputs (images, audio)
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">📊</span>
              <div>
                <strong>Analytics Dashboard:</strong> Provide insights on usage patterns, popular
                queries, and system performance
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🌐</span>
              <div>
                <strong>Multi-Language Support:</strong> Extend capabilities to support multiple
                languages and regional data sources
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📈 Roadmap Phases</h2>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">Phase 1: Foundation (Completed)</h4>
              <p className="text-green-700 text-sm">
                Core chat interface, Auth0 integration, basic document processing, weather API
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">
                Phase 2: Enhancement (In Progress)
              </h4>
              <p className="text-blue-700 text-sm">
                Advanced PDF processing, Slack integration, improved UI/UX, comprehensive testing
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-2">Phase 3: Integration (Planned)</h4>
              <p className="text-yellow-700 text-sm">
                Database connectivity, Jira/GitHub integration, advanced analytics
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-2">Phase 4: Scale (Future)</h4>
              <p className="text-purple-700 text-sm">
                Multi-tenant support, advanced AI models, enterprise features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGoalsPage;
