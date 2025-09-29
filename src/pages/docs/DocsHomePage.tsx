import React from 'react';
import { Github, Cloud, FileText, Slack, Zap, User } from 'lucide-react';

export const DocsHomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          OmniPulse
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive documentation for the Universal Knowledge AI Assistant, delivering insights
          from all your connected sources!
        </p>
      </div>
      {/* Features Overview */}
      {/* Features Overview / Tagline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
          Your AI companion for instant insights from all your connected sources:
        </h2>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Cloud className="h-5 w-5 text-blue-500" />
            <span>Connects with Weather API to provide real-time insights</span>
          </div>

          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-purple-500" />
            <span>Upload PDF files and query them with AI</span>
          </div>

          <div className="flex items-center space-x-3">
            <Slack className="h-5 w-5 text-green-500" />
            <span>Integrated with Slack for knowledge chatbot updates</span>
          </div>

          <div className="flex items-center space-x-3">
            <Github className="h-5 w-5 text-gray-800" />
            <span>Connects with GitHub to track repo commits</span>
          </div>

          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-orange-500" />
            <span>Integrated with Jira to provide project insights</span>
          </div>
        </div>
      </div>

      {/* Project Highlights (Moved to Top) */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Core Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">React + TS</div>
            <div className="text-sm text-gray-600">Frontend</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">Express.js</div>
            <div className="text-sm text-gray-600">Backend API</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">LangGraph</div>
            <div className="text-sm text-gray-600">AI Framework</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-600">Auth0</div>
            <div className="text-sm text-gray-600">Authentication</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-teal-600">Pinecone</div>
            <div className="text-sm text-gray-600">Vector DB</div>
          </div>
        </div>
      </div>

      {/* Repositories Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
          <Github className="h-6 w-6 mr-2" />
          GitHub Repositories
        </h2>

        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-lg font-bold text-gray-900">AI Knowledge Chat UI</div>
            <div className="text-sm text-gray-600 mb-2">Frontend Interface</div>
            <a
              href="https://github.com/priyankaandhare12/ai-knowledge-chat-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Visit
            </a>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-lg font-bold text-gray-900">Knowledge Chatbot</div>
            <div className="text-sm text-gray-600 mb-2">Backend AI Bot</div>
            <a
              href="https://github.com/priyankaandhare12/knowledge-chatbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Visit
            </a>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-lg font-bold text-gray-900">Automation</div>
            <div className="text-sm text-gray-600 mb-2">Automation Scripts</div>
            <a
              href="https://github.com/nayanagrawal-tech9/ai-knowledge-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Visit
            </a>
          </div>
        </div>
      </div>

      {/* Deployments Section */}
      {/* Deployments Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
          🌐
          <span className="ml-2">Deployments</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-lg font-bold text-gray-900">AI Knowledge Chat UI</div>
            <div className="text-sm text-gray-600 mb-2">Frontend Deployment</div>
            <a
              href="https://ai-knowledge-chat-ui.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Visit
            </a>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-lg font-bold text-gray-900">Knowledge Chatbot</div>
            <div className="text-sm text-gray-600 mb-2">Backend Deployment</div>
            <a
              href="https://knowledge-chatbot-pi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
            >
              Visit
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
          <User className="h-6 w-6 mr-2" />
          Project Contributors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Contributor 1 */}
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <User className="h-5 w-5 text-blue-500" />
            <span className="text-gray-900 font-medium">Govind Kumar</span>
          </div>

          {/* Contributor 2 */}
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <User className="h-5 w-5 text-green-500" />
            <span className="text-gray-900 font-medium">Priyanka Andhare</span>
          </div>

          {/* Contributor 3 */}
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <User className="h-5 w-5 text-purple-500" />
            <span className="text-gray-900 font-medium">Nayan Agarwal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
