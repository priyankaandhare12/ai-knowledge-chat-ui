export interface DocSection {
  id: string;
  title: string;
  path: string;
  icon?: string;
  children?: DocSection[];
}

export const documentationStructure: DocSection[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    path: '/docs',
    icon: '📋',
    children: [
      {
        id: 'introduction',
        title: 'Introduction',
        path: '/docs/overview/introduction',
      },
      {
        id: 'project-goals',
        title: 'Project Goals',
        path: '/docs/overview/goals',
      },
      {
        id: 'tech-stack',
        title: 'Technology Stack',
        path: '/docs/overview/tech-stack',
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    path: '/docs/getting-started',
    icon: '🚀',
    children: [
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        path: '/docs/getting-started/quick-start',
      },
      {
        id: 'installation',
        title: 'Installation',
        path: '/docs/getting-started/installation',
      },
      {
        id: 'environment-setup',
        title: 'Environment Setup',
        path: '/docs/getting-started/environment-setup',
      },
      {
        id: 'cheat-sheet',
        title: 'Command Cheat Sheet',
        path: '/docs/getting-started/cheat-sheet',
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    path: '/docs/architecture',
    icon: '🏗️',
    children: [
      {
        id: 'system-overview',
        title: 'System Overview',
        path: '/docs/architecture/system-overview',
      },
      {
        id: 'frontend-architecture',
        title: 'Frontend Architecture',
        path: '/docs/architecture/frontend',
      },
      {
        id: 'backend-architecture',
        title: 'Backend Architecture',
        path: '/docs/architecture/backend',
      },
      {
        id: 'database-design',
        title: 'Database Design',
        path: '/docs/architecture/database',
      },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    path: '/docs/features',
    icon: '⚡',
    children: [
      {
        id: 'authentication',
        title: 'Authentication (Auth0)',
        path: '/docs/features/authentication',
      },
      {
        id: 'weather-integration',
        title: 'Weather API Integration',
        path: '/docs/features/weather',
      },
      {
        id: 'slack-integration',
        title: 'Slack Integration',
        path: '/docs/features/slack',
      },
      {
        id: 'file-upload',
        title: 'File Upload & Processing',
        path: '/docs/features/file-upload',
      },
      {
        id: 'pdf-processing',
        title: 'PDF Processing',
        path: '/docs/features/pdf-processing',
      },
      {
        id: 'external-sources',
        title: 'External Source Implementation',
        path: '/docs/features/external-sources',
      },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    path: '/docs/api',
    icon: '📡',
    children: [
      {
        id: 'authentication-endpoints',
        title: 'Authentication Endpoints',
        path: '/docs/api/authentication',
      },
      {
        id: 'chat-endpoints',
        title: 'Chat Endpoints',
        path: '/docs/api/chat',
      },
      {
        id: 'file-endpoints',
        title: 'File Upload Endpoints',
        path: '/docs/api/files',
      },
      {
        id: 'external-apis',
        title: 'External API Integrations',
        path: '/docs/api/external',
      },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    path: '/docs/deployment',
    icon: '🚀',
    children: [
      {
        id: 'vercel-deployment',
        title: 'Vercel Deployment',
        path: '/docs/deployment/vercel',
      },
      {
        id: 'production-setup',
        title: 'Production Setup',
        path: '/docs/deployment/production',
      },
      {
        id: 'environment-variables',
        title: 'Environment Variables',
        path: '/docs/deployment/environment',
      },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    path: '/docs/development',
    icon: '💻',
    children: [
      {
        id: 'development-guide',
        title: 'Development Guide',
        path: '/docs/development/guide',
      },
      {
        id: 'testing',
        title: 'Testing',
        path: '/docs/development/testing',
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        path: '/docs/development/troubleshooting',
      },
      {
        id: 'package-dependencies',
        title: 'Package Dependencies',
        path: '/docs/development/dependencies',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    path: '/docs/security',
    icon: '🔒',
    children: [
      {
        id: 'security-overview',
        title: 'Security Overview',
        path: '/docs/security/overview',
      },
      {
        id: 'auth0-setup',
        title: 'Auth0 Configuration',
        path: '/docs/security/auth0-setup',
      },
      {
        id: 'environment-secrets',
        title: 'Environment Secrets',
        path: '/docs/security/secrets',
      },
      {
        id: 'security-alerts',
        title: 'Security Alerts',
        path: '/docs/security/alerts',
      },
    ],
  },
];

export const flattenDocumentationStructure = (sections: DocSection[]): DocSection[] => {
  const flattened: DocSection[] = [];

  const flatten = (items: DocSection[]) => {
    items.forEach(item => {
      flattened.push(item);
      if (item.children) {
        flatten(item.children);
      }
    });
  };

  flatten(sections);
  return flattened;
};

export const findDocumentationItem = (path: string): DocSection | undefined => {
  const flattened = flattenDocumentationStructure(documentationStructure);
  return flattened.find(item => item.path === path);
};
