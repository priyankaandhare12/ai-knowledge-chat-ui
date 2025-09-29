import React from 'react';
import { Type, Router, Terminal, Cloud, Zap, FileText, Loader2 } from 'lucide-react';

export const FrontendArchitecturePage: React.FC = () => {
  const libraries = [
    {
      title: 'React 18',
      description: 'Core library for building UI components',
      icon: <Zap className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'TypeScript',
      description: 'Provides type safety across the frontend codebase',
      icon: <Type className="h-5 w-5 text-blue-400" />,
    },
    {
      title: 'React Router DOM',
      description: 'Client-side routing for navigation',
      icon: <Router className="h-5 w-5 text-purple-600" />,
    },
    {
      title: 'Tailwind CSS',
      description: 'Utility-first styling framework',
      icon: <Cloud className="h-5 w-5 text-teal-600" />,
    },
    {
      title: 'Framer Motion',
      description: 'Smooth animations and transitions',
      icon: <Loader2 className="h-5 w-5 text-pink-600" />,
    },
    {
      title: 'React Hook Form',
      description: 'Easy form handling and validation',
      icon: <FileText className="h-5 w-5 text-green-600" />,
    },
    {
      title: 'Zod + Resolvers',
      description: 'Schema validation for forms',
      icon: <Zap className="h-5 w-5 text-orange-600" />,
    },
    {
      title: 'TanStack React Query',
      description: 'Server state management and caching',
      icon: <Cloud className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Axios',
      description: 'HTTP requests for APIs',
      icon: <Terminal className="h-5 w-5 text-gray-700" />,
    },
    {
      title: 'Husky + lint-staged + ESLint + Prettier',
      description: 'Code quality and formatting',
      icon: <Loader2 className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Frontend</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Deep dive into the React-based frontend architecture, component design patterns, and
            state management strategies.
          </p>
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Frontend Libraries & Integrations
            </h1>
            <div className="space-y-4">
              {libraries.map((lib, idx) => (
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

          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-8">
            <h1 className="text-lg font-semibold mb-4 text-blue-700">State Management</h1>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Global State (Context API):</strong> AuthContext, app settings
              </li>
              <li>
                <strong>Server State (TanStack Query):</strong> Chat API interactions and File
                Uploads
              </li>
              <li>
                <strong>Local State (useState/useReducer):</strong> Manages form inputs and UI
                States
              </li>
              <li>
                <strong>Persistent State (localStorage)</strong> Session data, and Frequently
                accessed data
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendArchitecturePage;
