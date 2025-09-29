import React from 'react';

export const SampleQueriesPage: React.FC = () => {
  const queryCategories = [
    {
      title: 'Weather Information',
      examples: ["What's the current weather in New York?"],
      description: 'Current weather updates and forecasts for cities worldwide.',
    },
    {
      title: 'Document Search (PDF Upload)',
      examples: [
        'Time logging guideline provided by Tech9?',
        'What are the steps for onboarding in Tech9 Handbook?',
      ],
      description: 'Ask questions based on the content in uploaded documents.',
    },
    {
      title: 'Slack Channel Insights',
      examples: ['What recent updates were discussed for the knowledge chatbot?'],
      description: 'Inquiries about discussions, decisions, and feature updates in Slack.',
    },
    {
      title: 'Jira Ticket Tracking',
      examples: [
        'Show all Jira tickets under Tech9 Hackathon epic.',
        'Who is assigned to issue XYZ?',
      ],
      description: 'Track tickets, assignments, and progress in Jira.',
    },
    {
      title: 'GitHub Contributions',
      examples: [
        'Show contributions by XYZ in Chatbot Frontend repo.',
        'Latest commits in Chatbot Backend repo.',
      ],
      description: 'Summarize commits, contributors, and activity in GitHub repositories.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Sample Queries</h1>
      <p className="text-gray-700 text-center mb-8">
        Explore example queries for the Universal Knowledge Chatbot across different integrations
        and data sources.
      </p>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        {queryCategories.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{cat.title}</h2>
            <p className="text-gray-600">{cat.description}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {cat.examples.map((ex, i) => (
                <li key={i}>
                  <code className="bg-gray-100 p-1 rounded">{ex}</code>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleQueriesPage;
