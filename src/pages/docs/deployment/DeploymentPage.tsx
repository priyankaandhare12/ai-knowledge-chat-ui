import React from 'react';

export const DeploymentPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Deployment Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-4">
            <strong>Vercel</strong> is a cloud platform for hosting both static websites and
            serverless functions. It enables automatic, continuous deployments from your GitHub
            repositories, making it easy to push changes without manual configuration.
          </p>
          <p className="text-gray-700 mb-4">
            In this project, both the frontend and backend are deployed on Vercel. Auto-deployment
            is configured for the main branch of each repository, ensuring that any changes pushed
            to GitHub are instantly reflected in the live applications.
          </p>

          {/* Deployments Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 flex items-center">
              🌐<span className="ml-2">Deployment Details</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-gray-900">AI Knowledge Chat UI</div>
                <div className="text-sm text-gray-600 mb-2">
                  Frontend interface deployed on Vercel. It provides a responsive and interactive
                  user experience for chatting with the AI knowledge bot.
                </div>
                <a
                  href="https://ai-knowledge-chat-ui.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
                >
                  Visit Frontend
                </a>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-gray-900">Knowledge Chatbot</div>
                <div className="text-sm text-gray-600 mb-2">
                  Backend AI bot deployed as serverless functions on Vercel. Handles API requests,
                  data processing, and integrations with Slack, GitHub, Jira, and other sources.
                </div>
                <a
                  href="https://knowledge-chatbot-pi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors text-sm font-medium"
                >
                  Visit Backend
                </a>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              Both deployments are configured with SSL, optimized for performance, and monitored for
              uptime. Using Vercel’s serverless functions ensures that the backend scales
              automatically based on demand, making the system robust and reliable.
            </p>

            {/* <img src="/vercel-deployments.png" alt="Vercel Active Deployments" style={{ maxWidth: '100%', marginTop: 16 }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentPage;
