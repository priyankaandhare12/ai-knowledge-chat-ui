import React from 'react';

export const DevelopmentGuidePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Testing Guide</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive development environment setup, coding standards, and workflow guidelines
            for contributing to the Universal Knowledge Chatbot project.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">📋 Prerequisites</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-gray-800">Required Software</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded border">
                      <span className="font-medium">Node.js</span>
                      <span className="text-sm text-green-700">v18.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded border">
                      <span className="font-medium">pnpm</span>
                      <span className="text-sm text-blue-700">v8.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-purple-50 rounded border">
                      <span className="font-medium">Docker</span>
                      <span className="text-sm text-purple-700">v24.0.0+</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded border">
                      <span className="font-medium">Git</span>
                      <span className="text-sm text-orange-700">v2.40.0+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-gray-800">Development Tools</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-indigo-50 rounded border">
                      <span className="font-medium">VS Code</span>
                      <span className="text-sm text-indigo-700">Recommended</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-pink-50 rounded border">
                      <span className="font-medium">ESLint Extension</span>
                      <span className="text-sm text-pink-700">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-teal-50 rounded border">
                      <span className="font-medium">Prettier Extension</span>
                      <span className="text-sm text-teal-700">Required</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded border">
                      <span className="font-medium">TypeScript Extension</span>
                      <span className="text-sm text-yellow-700">Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing Guidelines</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">🎭 Frontend Testing</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Testing Stack</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Jest - Test runner</li>
                    <li>• React Testing Library - Component testing</li>
                    <li>• MSW - API mocking</li>
                    <li>• @testing-library/jest-dom - Custom matchers</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Test Commands</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div>pnpm test # Run tests</div>
                    <div>pnpm test:watch # Watch mode</div>
                    <div>pnpm test:coverage # Coverage</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">⚡ Backend Testing</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Testing Stack</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Jest - Test runner</li>
                    <li>• Supertest - HTTP testing</li>
                    <li>• MongoDB Memory Server - Database testing</li>
                    <li>• Nock - HTTP request mocking</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Test Commands</h4>
                  <div className="bg-white p-3 rounded border text-sm font-mono">
                    <div>npm test # Run tests</div>
                    <div>npm run test:watch # Watch mode</div>
                    <div>npm run test:coverage # Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🔍 Debugging & Troubleshooting
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-4 text-red-800">
                🐛 Common Issues & Solutions
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Port Already in Use</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Error: EADDRINUSE: address already in use :::3001
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    lsof -ti:3001 | xargs kill -9
                  </div>
                </div>

                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Module Not Found</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Clear node_modules and reinstall dependencies
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    rm -rf node_modules package-lock.json && npm install
                  </div>
                </div>

                <div className="bg-white rounded p-4 border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Auth0 Configuration</h4>
                  <div className="text-sm text-gray-700 mb-2">
                    Check environment variables and Auth0 settings
                  </div>
                  <div className="bg-black p-2 rounded text-green-400 font-mono text-sm">
                    node verify-env.js
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentGuidePage;
