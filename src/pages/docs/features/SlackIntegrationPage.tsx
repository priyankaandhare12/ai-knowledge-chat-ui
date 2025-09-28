import React from 'react';

export const SlackIntegrationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Slack Integration</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive guide to integrating Slack workspace data for intelligent search and
            conversation analysis.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">
              💬 Slack Integration Overview
            </h2>
            <p className="text-gray-700">
              The chatbot integrates with Slack API to search through team conversations, project
              discussions, and archived messages, making organizational knowledge easily accessible
              through natural language queries.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Setup & Configuration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                🏗️ Slack App Configuration
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">OAuth Scopes</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>search:read:</strong> Search messages and files
                    </li>
                    <li>
                      • <strong>channels:read:</strong> List public channels
                    </li>
                    <li>
                      • <strong>groups:read:</strong> List private channels
                    </li>
                    <li>
                      • <strong>users:read:</strong> Get user information
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">API Methods Used</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>search.messages:</strong> Search message content
                    </li>
                    <li>
                      • <strong>conversations.list:</strong> Get channel list
                    </li>
                    <li>
                      • <strong>users.info:</strong> Get user details
                    </li>
                    <li>
                      • <strong>conversations.history:</strong> Get message history
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔍 Search Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">💬 Query Examples</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="bg-white p-2 rounded border border-blue-100">
                  "What did the team discuss about the new feature?"
                </div>
                <div className="bg-white p-2 rounded border border-blue-100">
                  "Show me messages from John about deployment"
                </div>
                <div className="bg-white p-2 rounded border border-blue-100">
                  "Find discussions in #engineering channel"
                </div>
                <div className="bg-white p-2 rounded border border-blue-100">
                  "Search for bug reports from last week"
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                📊 Search Results Include
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Message content and context</li>
                <li>• Channel/DM information</li>
                <li>• User names and mentions</li>
                <li>• Timestamp and thread details</li>
                <li>• File attachments metadata</li>
                <li>• Reaction counts and emoji</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🤖 AI Integration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                🧠 LangChain Tool Implementation
              </h3>
              <div className="bg-purple-50 p-4 rounded border border-purple-200 mb-4">
                <h4 className="font-medium mb-2">Slack Search Tool</h4>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {`const slackSearchTool = {
  name: "search_slack",
  description: "Search Slack messages and conversations",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query for Slack messages"
      },
      channel: {
        type: "string",
        description: "Specific channel to search (optional)"
      },
      user: {
        type: "string", 
        description: "Specific user to search messages from"
      },
      date_range: {
        type: "string",
        description: "Date range filter (e.g., 'last week')"
      }
    },
    required: ["query"]
  }
};`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-sm text-blue-700 mb-2">Query Processing</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Natural language query parsing</li>
                    <li>• Channel and user extraction</li>
                    <li>• Date range interpretation</li>
                    <li>• Context-aware filtering</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-medium text-sm text-green-700 mb-2">Result Processing</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Message relevance ranking</li>
                    <li>• Thread context assembly</li>
                    <li>• User mention resolution</li>
                    <li>• Formatted response generation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔐 Security & Privacy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">🛡️ Access Control</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>OAuth 2.0:</strong> Secure Slack workspace authentication
                </li>
                <li>
                  • <strong>Scope Limitations:</strong> Read-only access to authorized channels
                </li>
                <li>
                  • <strong>User Permissions:</strong> Respect Slack's native user permissions
                </li>
                <li>
                  • <strong>Token Management:</strong> Secure storage and refresh handling
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔒 Data Protection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>No Data Storage:</strong> Messages not stored permanently
                </li>
                <li>
                  • <strong>Encryption in Transit:</strong> All API calls use HTTPS
                </li>
                <li>
                  • <strong>Privacy Compliance:</strong> GDPR and privacy policy adherence
                </li>
                <li>
                  • <strong>Audit Logging:</strong> Track all search activities
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📱 Frontend Integration</h2>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-indigo-800">🎨 Slack Message Display</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border border-indigo-100">
                <h4 className="font-medium mb-3">Message Card Component</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • <strong>User Avatar:</strong> Display Slack profile pictures
                  </li>
                  <li>
                    • <strong>Channel Context:</strong> Show channel name and type
                  </li>
                  <li>
                    • <strong>Timestamp:</strong> Relative and absolute time display
                  </li>
                  <li>
                    • <strong>Thread Context:</strong> Show conversation flow
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border border-indigo-100">
                <h4 className="font-medium mb-3">Interactive Features</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>
                    • <strong>Link to Slack:</strong> Direct links to original messages
                  </li>
                  <li>
                    • <strong>User Mentions:</strong> Clickable user references
                  </li>
                  <li>
                    • <strong>Channel Links:</strong> Navigate to channel discussions
                  </li>
                  <li>
                    • <strong>File Previews:</strong> Display attached file information
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚡ Performance Optimization</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">🔄</span>
              <div>
                <strong>Smart Caching:</strong> Cache search results and user/channel metadata for
                improved response times
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">📊</span>
              <div>
                <strong>Batch Processing:</strong> Combine multiple API calls when fetching related
                data
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">🎯</span>
              <div>
                <strong>Intelligent Filtering:</strong> Pre-filter results based on user permissions
                and relevance
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">⏱️</span>
              <div>
                <strong>Rate Limiting:</strong> Respect Slack API limits with intelligent request
                queuing
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔧 Configuration & Setup</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">Environment Variables</h4>
              <div className="text-sm font-mono text-blue-700 space-y-1">
                <div>SLACK_CLIENT_ID=your_slack_client_id</div>
                <div>SLACK_CLIENT_SECRET=your_slack_client_secret</div>
                <div>SLACK_SIGNING_SECRET=your_slack_signing_secret</div>
                <div>SLACK_REDIRECT_URI=your_oauth_redirect_uri</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">Slack App Setup Steps</h4>
              <ol className="text-sm text-green-700 space-y-1">
                <li>1. Create new Slack app in your workspace</li>
                <li>2. Configure OAuth scopes (search:read, channels:read, etc.)</li>
                <li>3. Set redirect URLs for OAuth flow</li>
                <li>4. Install app to workspace and get tokens</li>
                <li>5. Test with sample search queries</li>
              </ol>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing & Validation</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">🔍 Test Coverage</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">API Integration</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• OAuth flow testing</li>
                  <li>• Search API responses</li>
                  <li>• Error handling scenarios</li>
                  <li>• Rate limit behavior</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Query Processing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Natural language parsing</li>
                  <li>• Result relevance ranking</li>
                  <li>• Context preservation</li>
                  <li>• Multi-channel searches</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-purple-700">User Experience</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Search result display</li>
                  <li>• Loading states</li>
                  <li>• Error message clarity</li>
                  <li>• Performance benchmarks</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚀 Advanced Features</h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-2">Future Enhancements</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • <strong>Sentiment Analysis:</strong> Analyze team sentiment and engagement
                </li>
                <li>
                  • <strong>Topic Clustering:</strong> Group related discussions automatically
                </li>
                <li>
                  • <strong>Real-time Notifications:</strong> Get updates on relevant conversations
                </li>
                <li>
                  • <strong>Cross-workspace Search:</strong> Search across multiple Slack workspaces
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
              <h4 className="font-semibold text-purple-800 mb-2">Integration Opportunities</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>
                  • <strong>Jira Integration:</strong> Link Slack discussions to tickets
                </li>
                <li>
                  • <strong>GitHub Integration:</strong> Connect code discussions to repositories
                </li>
                <li>
                  • <strong>Calendar Integration:</strong> Correlate meetings with follow-up
                  discussions
                </li>
                <li>
                  • <strong>Knowledge Base:</strong> Transform discussions into documentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackIntegrationPage;
