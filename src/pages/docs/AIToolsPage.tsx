import React from 'react';
import { Code, Cpu, Cloud, Pencil, MessageSquare } from 'lucide-react';

export const AIToolsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">AI Tools & Frameworks</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Overview of the AI tools and frameworks used in the Universal Knowledge Chatbot project,
        categorized by purpose.
      </p>

      {/* Single Main Card */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-6">
        {/* LLM & Workflow Orchestration */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-purple-800 flex items-center">
            <Cpu className="h-5 w-5 mr-2" /> LLM & Workflow Orchestration
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>LangChain:</strong> Orchestrating LLMs and integrating multiple tools.
            </li>
            <li>
              <strong>LangGraph:</strong> Advanced workflow routing and decision-making for AI
              agents.
            </li>
          </ul>
        </div>

        {/* Workflow Automation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-800 flex items-center">
            <Cloud className="h-5 w-5 mr-2" /> Workflow Automation
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>n8n:</strong> Automates workflows for Slack, GitHub, Jira, and email triggers.
            </li>
          </ul>
        </div>

        {/* Development Tools */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-green-800 flex items-center">
            <Code className="h-5 w-5 mr-2" /> Development Tools
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Cursor:</strong> AI-powered code assistance and auto-completion.
            </li>
            <li>
              <strong>GitHub Copilot:</strong> AI coding assistant for generating code and
              boilerplate.
            </li>
            <li>
              <strong>Lovable:</strong> Creates boilerplate and scaffolding for projects quickly.
            </li>
          </ul>
        </div>

        {/* Content & Text Generation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-yellow-800 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" /> Content & Text Generation
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>ChatGPT / Perplexity AI:</strong> Generating text, summaries, and content.
            </li>
          </ul>
        </div>

        {/* Design & Visual Tools */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-pink-800 flex items-center">
            <Pencil className="h-5 w-5 mr-2" /> Design & Visual Tools
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Canva:</strong> Designing project visuals, SVGs, presentations, and UI
              mockups.
            </li>
            <li>
              <strong>DALL·E:</strong> AI-generated images and diagrams from text prompts.
            </li>
          </ul>
        </div>

        {/* Vector Database */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-indigo-800 flex items-center">
            <Cloud className="h-5 w-5 mr-2" /> Vector Database
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>Pinecone:</strong> Vector database for semantic search and knowledge
              retrieval.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
