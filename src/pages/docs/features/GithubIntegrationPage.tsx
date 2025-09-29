import React from 'react';

export const GithubIntegrationPage: React.FC = () => {
  const steps = [
    {
      title: 'GitHub App/Token Setup',
      description: (
        <>
          Created a GitHub app or personal access token with permissions to read repository data,
          issues, pull requests, and comments.
        </>
      ),
    },
    {
      title: 'Webhook/Event Subscriptions',
      description: (
        <>
          Subscribed to repository events (<code>push</code>, <code>issues</code>, <code>PRs</code>,{' '}
          <code>comments</code>) to receive real-time updates via webhook.
        </>
      ),
    },
    {
      title: 'n8n Workflow Integration',
      description: (
        <>
          Configured an{' '}
          <a
            href="https://n8n.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            n8n
          </a>{' '}
          workflow to process GitHub webhook events and send relevant data to the backend for
          storage and analysis.
          <img
            src="/github-n8n-integration.png"
            alt="n8n GitHub Integration Workflow"
            className="rounded-md border mt-4"
          />
          <div className="text-sm text-gray-500 mt-2">
            n8n workflow for GitHub event integration (<code>github-n8n-integration.png</code> in{' '}
            <code>/public</code>)
          </div>
        </>
      ),
    },
    {
      title: 'Vector DB Update',
      description: (
        <>
          The backend stores GitHub data (commits, issues, PRs, comments) as vector records in
          Pinecone, enabling semantic search and retrieval.
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">GitHub Integration</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          This page demonstrates how GitHub repository data is integrated into the universal
          knowledge chatbot for real-time code search, issue tracking, and collaboration insights.
        </p>
      </header>

      {/* Steps */}
      <section className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-blue-200 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-800">
              {idx + 1}. {step.title}
            </h2>
            <div className="text-gray-700 text-base">{step.description}</div>
          </div>
        ))}
      </section>

      {/* Result */}
      <footer className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-800">
          <strong>Result:</strong> All new GitHub activity is instantly available for search and
          retrieval in the universal knowledge chatbot, supporting code intelligence and project
          collaboration across <code>knowledge-chatbot</code> and <code>ai-knowledge-chat-ui</code>{' '}
          repositories.
        </p>
      </footer>
    </div>
  );
};

export default GithubIntegrationPage;
