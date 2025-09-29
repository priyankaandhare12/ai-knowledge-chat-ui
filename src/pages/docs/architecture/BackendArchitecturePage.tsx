import React from 'react';
import { Zap, Cloud, Server, FileText, Terminal, Shield, Database, Loader2 } from 'lucide-react';

export const BackendArchitecturePage: React.FC = () => {
  const backendLibraries = [
    {
      title: 'Express',
      description: 'Web server and routing framework',
      icon: <Server className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'LangChain',
      description: 'Core library for building language model pipelines',
      icon: <Zap className="h-5 w-5 text-orange-500" />,
    },
    {
      title: 'LangGraph',
      description: 'Graph-based orchestration for LLMs',
      icon: <Cloud className="h-5 w-5 text-blue-400" />,
    },
    {
      title: 'OpenAI GPT-4.1-mini',
      description: 'AI model integration for LLM tasks',
      icon: <Zap className="h-5 w-5 text-purple-500" />,
    },
    {
      title: 'Pinecone',
      description: 'Vector DB for embeddings',
      icon: <Database className="h-5 w-5 text-green-600" />,
    },
    {
      title: 'Auth0 + jsonwebtoken',
      description: 'Authentication and JWT management',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
    },
    {
      title: 'LangSmith',
      description: 'Monitoring and tracing of LLM workflows',
      icon: <Cloud className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: 'Axios',
      description: 'External API requests',
      icon: <Terminal className="h-5 w-5 text-gray-700" />,
    },
    {
      title: 'Pino Logging',
      description: 'Structured logging for backend',
      icon: <Loader2 className="h-5 w-5 text-pink-600" />,
    },
    {
      title: 'Multer',
      description: 'File upload middleware (PDF and text files)',
      icon: <FileText className="h-5 w-5 text-teal-600" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Backend</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive overview of the Node.js/Express backend architecture, AI processing
            pipeline, and service integrations.
          </p>

          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Backend Libraries & Integrations
            </h1>
            <div className="space-y-4">
              {backendLibraries.map((lib, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  {lib.icon && <div className="mt-1">{lib.icon}</div>}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{lib.title}</h3>
                    <p className="text-sm text-gray-600">{lib.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">🏗️ Server Architecture</h2>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {`server/
├── app/                    # Application core
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/            # Data models
│   └── services/          # Business logic services
├── routes/                # API route definitions
│   ├── auth.js           # Authentication routes
│   ├── chat.js           # Chat endpoints
│   └── files.js          # File processing routes
├── config/               # Configuration files
│   ├── database.js       # Database configuration
│   └── auth0.js          # Auth0 setup
├── tests/                # Test suites
└── index.js             # Application entry point`}
              </pre>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {/* Why LangChain/LangGraph Architecture? */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 shadow-sm">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                🤖 Why LangChain & LangGraph?
              </h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Based on project requirements, it enables orchestration of multiple external tools
                  and data sources, including file uploads, APIs, and services like Weather or
                  Slack.
                </li>
                <li>
                  Supports OpenAI as the primary LLM, with flexibility to integrate other LLMs if
                  needed.
                </li>
                <li>
                  LangGraph creates nodes for different tools, allowing the agent to intelligently
                  decide which tool to call for each query.
                </li>
                <li>
                  Facilitates complex AI workflows and ensures context-aware, dynamic responses.
                </li>
                <li>
                  Scales easily to support new tools or knowledge sources as the platform evolves.
                </li>
                <li>
                  Provides a flexible, agent-based architecture that aligns with the project’s need
                  for multi-tool integration and intelligent decision-making.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200 shadow-sm">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">🧠 OpenAI LLM</h2>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Uses GPT-4.1-mini model to summarize outputs from multiple tools efficiently.
                </li>
                <li>Analyzes prompts and decides which LangGraph node to call based on context.</li>
                <li>
                  Generates actionable insights from aggregated data across tools and sources.
                </li>
                <li>
                  Supports flexible integration with other LLMs if project requirements evolve.
                </li>
                <li>
                  Enables context-aware and dynamic responses, improving overall workflow
                  intelligence.
                </li>
              </ul>
            </div>

            {/* LangGraph Flow Diagram Card */}
            <div className="bg-white rounded-lg p-6 border border-purple-200 shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                🕸️ LangGraph Flow Diagram
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                The diagram below illustrates how LangGraph orchestrates agent-based decision making
                and tool selection for multi-source queries. Each node represents a tool (Slack,
                Weather, File, GitHub, etc.), and the agent dynamically routes requests based on
                query context, enabling flexible, scalable AI workflows.
              </p>
              <img
                src="/Langgraph-architecture.png"
                alt="LangGraph Architecture Diagram"
                className="rounded-lg border shadow-sm max-w-full"
              />
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🔌 External Integrations</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>OpenWeather API:</strong> Integrated for real-time weather updates and
                  forecasts. Users can query weather by city, and receive instant, accurate results.
                </li>
                <li>
                  <strong>Webhook Endpoint (n8n):</strong> A unified webhook endpoint is set up to
                  receive real-time triggers from Slack, Jira, and GitHub via n8n automation
                  workflows. This enables the backend to process and respond to events such as new
                  messages, issues, or commits, keeping the system up-to-date and interactive.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendArchitecturePage;
