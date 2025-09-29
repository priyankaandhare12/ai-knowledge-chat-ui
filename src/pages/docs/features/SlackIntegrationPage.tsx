import React from 'react';

export const SlackIntegrationPage: React.FC = () => {
  const steps = [
    {
      title: 'Slack App Creation',
      description: (
        <>
          A dedicated Slack app was created to act as a bot in the <code>knowledge-chatbot</code>{' '}
          channel.
          <img src="/slack-app.png" alt="Slack App Setup" className="rounded-md border mt-4" />
        </>
      ),
    },
    {
      title: 'Event Subscriptions & Permissions',
      description: (
        <>
          The Slack app subscribes to message events and is granted permissions to read channel
          messages. This ensures the bot can detect and process new messages in real time.
        </>
      ),
    },
    {
      title: 'n8n Workflow Integration',
      description: (
        <>
          The{' '}
          <a
            href="https://n8n.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            n8n
          </a>{' '}
          workflow is configured to receive Slack event notifications via webhook. Whenever a new
          message is posted in the <code>knowledge-chatbot</code> channel, Slack sends an event to
          the n8n webhook URL.
          <img
            src="/Slack-n8n-Integration.png"
            alt="n8n Slack Integration Workflow"
            className="rounded-md border mt-4"
          />
        </>
      ),
    },
    {
      title: 'Webhook & Vector DB Update',
      description: (
        <>
          The backend webhook receives the Slack message and stores it as a vector record in
          Pinecone. This enables semantic search and retrieval of Slack messages alongside other
          knowledge sources.
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Slack Channel Integration</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          This page demonstrates how real-time Slack messages are integrated into the universal
          knowledge chatbot using a custom Slack app, n8n workflow, and vector database storage.
        </p>
      </header>

      {/* Step Cards */}
      <section className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-3 text-purple-800">
              {idx + 1}. {step.title}
            </h2>
            <div className="text-gray-700 text-base">{step.description}</div>
          </div>
        ))}
      </section>

      {/* Result */}
      <footer className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <p className="text-gray-800">
          <strong>Result:</strong> All new Slack messages in the <code>knowledge-chatbot</code>{' '}
          channel are instantly available for search and retrieval in the universal knowledge
          chatbot, ensuring up-to-date knowledge and collaboration.
        </p>
      </footer>
    </div>
  );
};

export default SlackIntegrationPage;
