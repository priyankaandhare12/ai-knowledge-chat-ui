import React from 'react';

export const LangsmithTestingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          LangSmith Observability & Monitoring
        </h1>
        <div className="prose prose-lg max-w-none">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">
              <strong>Vercel</strong> is a cloud platform for hosting both static websites and
              serverless functions. It enables automatic, continuous deployments from your GitHub
              repositories, making it easy to push changes without manual configuration.
            </p>
            <p className="text-gray-700">
              In this project, both the frontend and backend are deployed on Vercel. Auto-deployment
              is configured for the main branch of each repository, ensuring that any changes pushed
              to GitHub are instantly reflected in the live applications.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <p className="text-xl text-gray-600 leading-relaxed">
              LangSmith is <strong>mandatory</strong> for tracing, monitoring, and debugging every
              LLM-powered workflow. Every request and chain execution is traced to provide full
              visibility into what happens at each step, which tools are selected, and where
              failures occur.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Why Trace Every Request?</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                <strong>End-to-end monitoring:</strong> Every user query, tool invocation, and chain
                step is logged and visualized.
              </li>
              <li>
                <strong>Failure analysis:</strong> Instantly see which requests fail, why, and at
                what step.
              </li>
              <li>
                <strong>Tool selection:</strong> Track which tools (e.g., <code>jira_search</code>,{' '}
                <code>slack_search</code>) are chosen for each query.
              </li>
              <li>
                <strong>Prompt debugging:</strong> Validate prompt engineering and chain logic with
                real trace data.
              </li>
              <li>
                <strong>Performance metrics:</strong> Monitor latency, error rates, and run history
                for optimization.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              LangSmith Monitoring Dashboard
            </h2>
            <p className="mb-4">
              All traces are monitored inside LangSmith, providing a centralized dashboard for
              workflow analysis and debugging.
            </p>
            <img
              src="/langsmith-monitoring.png"
              alt="LangSmith Monitoring Dashboard"
              style={{ maxWidth: '100%', marginTop: 12 }}
            />
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">LangGraph Trace Example</h2>
            <p className="mb-4">
              When a user asks a Jira-related question, LangSmith traces the entire LangGraph
              workflow. The trace shows how the <code>jira_search</code> tool is selected, the query
              is routed, and the result is returned. This level of monitoring makes it possible to
              debug tool selection, chain logic, and integration issues in real time.
            </p>
            <img
              src="/langgraph-trace.png"
              alt="LangGraph Trace Example"
              style={{ maxWidth: '100%', marginTop: 12 }}
            />
          </div>

          <p>
            <strong>Result:</strong> LangSmith ensures reliability, transparency, and rapid
            debugging for all LLM-based features. Every trace is monitored, every failure is
            visible, and every tool selection is logged for full workflow observability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LangsmithTestingPage;
