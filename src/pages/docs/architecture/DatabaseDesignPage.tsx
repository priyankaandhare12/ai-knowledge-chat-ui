import React from 'react';

export const DatabaseDesignPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold mb-4 mt-8">
        Pinecone: Vector Database for Multi-Source Knowledge Retrieval
      </h2>
      {/* Pinecone Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Chosen as the core vector database for semantic search and multi-source knowledge
            retrieval.
          </li>
          <li>
            Enables fast and scalable similarity search across Slack messages, Jira project details,
            file chunks, and GitHub commits.
          </li>
          <li>
            Supports real-time insights and context-aware responses by retrieving relevant
            information efficiently.
          </li>
          <li>
            Serverless architecture reduces infrastructure overhead and simplifies scaling for large
            datasets.
          </li>
          <li>
            Metadata filtering allows precise querying across diverse data types and embeddings.
          </li>
          <li>
            Handles large-scale embeddings efficiently, making it ideal for multi-tool AI workflows.
          </li>
          <li>
            Provides flexibility and performance advantages for semantic search and agent-based
            decision-making in LangChain + LangGraph setups.
          </li>
        </ul>
      </div>

      {/* Pinecone Configuration */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4 text-green-700">🔧 Pinecone Configuration</h3>
        {/* Pinecone Dashboard Image */}
        <div className="mt-6">
          <span className="block text-xs text-gray-500 mb-2">Pinecone Configuration Used:</span>
          <img
            src="/pinecone-config-dashboard.png"
            alt="Pinecone Dashboard"
            className="rounded-lg border shadow-sm max-w-full"
          />
        </div>
      </div>

      {/* Example: Slack Message Vector Record */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
        <h5 className="text-2xl font-semibold mb-4 text-purple-700">🔍 Vector Records</h5>
        <p className="text-md text-gray-700 mb-4">
          All real-time Slack messages, Jira project updates, uploaded file chunks, and GitHub
          commit data are stored as vector records in Pinecone. This enables unified semantic search
          and retrieval across all sources. Below is an example of how a Slack message is
          represented as a vector record:
        </p>
        <h3 className="text-lg font-semibold mb-4">Example: Slack Message Vector Record</h3>

        <div className="mt-6">
          <img
            src="/pinecone-slack-vectors.png"
            alt="Pinecone Slack Vectors"
            className="rounded-lg border shadow-sm max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseDesignPage;
