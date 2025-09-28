import React from 'react';

export const FrontendArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Frontend Architecture</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Deep dive into the React-based frontend architecture, component design patterns, and
            state management strategies.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">📁 Project Structure</h2>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {`src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── layouts/        # Layout components
│   └── docs/           # Documentation-specific components
├── pages/              # Route-level page components
│   ├── docs/           # Documentation pages
│   └── HomePage.tsx    # Main chat interface
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   └── useApi.ts       # API interaction hook
├── services/           # API service layers
├── lib/                # Utility functions
└── config/             # Configuration files`}
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🏗️ Component Architecture</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-green-700">📱 Presentation Layer</h3>
              <p className="text-gray-700 mb-4">
                Pure UI components focused on presentation and user interaction, following atomic
                design principles.
              </p>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <div className="text-sm space-y-2">
                  <div>
                    <strong>Atoms:</strong> Buttons, Inputs, Icons, Typography
                  </div>
                  <div>
                    <strong>Molecules:</strong> SearchBar, MessageBubble, FileUpload
                  </div>
                  <div>
                    <strong>Organisms:</strong> ChatInterface, Sidebar, Header
                  </div>
                  <div>
                    <strong>Templates:</strong> DocsLayout, AppLayout
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">🧠 Container Layer</h3>
              <p className="text-gray-700 mb-4">
                Smart components that manage state, handle business logic, and coordinate with
                external services.
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <div className="text-sm space-y-2">
                  <div>
                    <strong>Pages:</strong> Route-level components with data fetching
                  </div>
                  <div>
                    <strong>Providers:</strong> Context providers for global state
                  </div>
                  <div>
                    <strong>Hooks:</strong> Custom hooks for reusable logic
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🔄 State Management Strategy
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold mb-3 text-purple-800">
                🌐 Global State (Context API)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>AuthContext:</strong> User authentication state
                </li>
                <li>
                  <strong>User Profile:</strong> Current user information
                </li>
                <li>
                  <strong>App Settings:</strong> Theme, preferences
                </li>
                <li>
                  <strong>Error Boundaries:</strong> Global error handling
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold mb-3 text-orange-800">
                📡 Server State (TanStack Query)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Chat Messages:</strong> Conversation history
                </li>
                <li>
                  <strong>API Responses:</strong> Backend data caching
                </li>
                <li>
                  <strong>File Uploads:</strong> Upload status and progress
                </li>
                <li>
                  <strong>External Data:</strong> Weather, Slack data
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                🏠 Local State (useState/useReducer)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Form Inputs:</strong> Controlled form components
                </li>
                <li>
                  <strong>UI State:</strong> Modals, dropdowns, loading states
                </li>
                <li>
                  <strong>Temporary Data:</strong> Draft messages, selections
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">
                💾 Persistent State (localStorage)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>User Preferences:</strong> Theme, sidebar state
                </li>
                <li>
                  <strong>Session Data:</strong> Draft messages
                </li>
                <li>
                  <strong>Cache:</strong> Frequently accessed data
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎨 Design System</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">🎯 Component Design Principles</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Reusability</h4>
                  <p className="text-sm text-gray-700">
                    Components designed for maximum reuse across different contexts
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Accessibility</h4>
                  <p className="text-sm text-gray-700">
                    WCAG 2.1 AA compliance with keyboard navigation and screen readers
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">Performance</h4>
                  <p className="text-sm text-gray-700">
                    Optimized rendering with memoization and lazy loading
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Consistency</h4>
                  <p className="text-sm text-gray-700">
                    Unified design language with Tailwind CSS utilities
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔌 Key Integrations</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-3 text-red-800">
                🔐 Auth0 React SDK Integration
              </h3>
              <p className="text-gray-700 mb-3">
                Seamless authentication flow with React hooks and context providers.
              </p>
              <div className="bg-white p-3 rounded border border-red-100">
                <code className="text-sm text-gray-800">
                  {`const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();`}
                </code>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                📡 TanStack Query Implementation
              </h3>
              <p className="text-gray-700 mb-3">
                Intelligent server state management with automatic caching and background updates.
              </p>
              <div className="bg-white p-3 rounded border border-blue-100">
                <code className="text-sm text-gray-800">
                  {`const { data, isLoading, error } = useQuery(['messages'], fetchMessages);`}
                </code>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                🛣️ React Router Integration
              </h3>
              <p className="text-gray-700 mb-3">
                Client-side routing with protected routes and nested route structures.
              </p>
              <div className="bg-white p-3 rounded border border-green-100">
                <code className="text-sm text-gray-800">
                  {`<Route path="/docs" element={<DocsLayout />}>`}
                </code>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            ⚡ Performance Optimizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🚀 React Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>React.memo:</strong> Prevent unnecessary re-renders
                </li>
                <li>
                  • <strong>useCallback:</strong> Memoize event handlers
                </li>
                <li>
                  • <strong>useMemo:</strong> Cache expensive calculations
                </li>
                <li>
                  • <strong>Code Splitting:</strong> Lazy load route components
                </li>
                <li>
                  • <strong>Suspense:</strong> Loading states for async components
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🏗️ Build Optimizations</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Tree Shaking:</strong> Remove unused code
                </li>
                <li>
                  • <strong>Bundle Splitting:</strong> Separate vendor chunks
                </li>
                <li>
                  • <strong>Asset Optimization:</strong> Compress images and fonts
                </li>
                <li>
                  • <strong>CSS Purging:</strong> Remove unused Tailwind classes
                </li>
                <li>
                  • <strong>Preload:</strong> Critical resource hints
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🧪 Testing Strategy</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-green-700">Unit Testing</h4>
                <p className="text-sm text-gray-600 mb-2">Individual component testing</p>
                <ul className="text-xs text-gray-600">
                  <li>• Jest + React Testing Library</li>
                  <li>• Component behavior testing</li>
                  <li>• Hook testing with renderHook</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-blue-700">Integration Testing</h4>
                <p className="text-sm text-gray-600 mb-2">Component interaction testing</p>
                <ul className="text-xs text-gray-600">
                  <li>• User flow testing</li>
                  <li>• API integration mocks</li>
                  <li>• Context provider testing</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2 text-purple-700">E2E Testing</h4>
                <p className="text-sm text-gray-600 mb-2">Full user journey testing</p>
                <ul className="text-xs text-gray-600">
                  <li>• Authentication flows</li>
                  <li>• Chat interactions</li>
                  <li>• File upload workflows</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📱 Responsive Design</h2>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
            <h3 className="text-lg font-semibold mb-4 text-indigo-800">Mobile-First Approach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Breakpoint Strategy</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <strong>sm:</strong> 640px+ (mobile landscape)
                  </li>
                  <li>
                    • <strong>md:</strong> 768px+ (tablet)
                  </li>
                  <li>
                    • <strong>lg:</strong> 1024px+ (desktop)
                  </li>
                  <li>
                    • <strong>xl:</strong> 1280px+ (large desktop)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Adaptive Components</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Collapsible sidebar navigation</li>
                  <li>• Responsive chat interface</li>
                  <li>• Touch-friendly interactions</li>
                  <li>• Optimized typography scales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendArchitecturePage;
