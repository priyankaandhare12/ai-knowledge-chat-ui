import React from 'react';

export const JiraIntegrationPage: React.FC = () => {
  const steps = [
    {
      title: 'Connect JiraGo to Credentials in n8n',
      description: (
        <>
          Created a Jira app or API token with permissions to read issues, projects, comments, and
          status updates.
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
          workflow to process Jira webhook events and send relevant data to the backend for storage
          and analysis.
          <img
            src="/jira-n8n-integration.png"
            alt="n8n Jira Integration Workflow"
            className="rounded-md border mt-4"
          />
        </>
      ),
    },
    {
      title: 'Vector DB Update',
      description: (
        <>
          The backend stores Jira data (issues, comments, transitions) as vector records in
          Pinecone, enabling semantic search and retrieval.
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Jira Integration</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          This page demonstrates how Jira issue and project data is integrated into the universal
          knowledge chatbot for real-time ticket tracking, status updates, and collaboration
          insights.
        </p>
      </header>

      {/* Steps */}
      <section className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-6 border border-yellow-200 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 text-yellow-800">
              {idx + 1}. {step.title}
            </h2>
            <div className="text-gray-700 text-base">{step.description}</div>
          </div>
        ))}
      </section>

      {/* Result */}
      <footer className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-800">
          <strong>Result:</strong> All new Jira activity is instantly available for search and
          retrieval in the universal knowledge chatbot, supporting project management and team
          collaboration.
        </p>
      </footer>
    </div>
  );
};

export default JiraIntegrationPage;
