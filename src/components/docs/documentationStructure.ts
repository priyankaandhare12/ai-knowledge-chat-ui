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
    title: 'Overview',
    path: '/docs',
    icon: '📋',
    // No children: single page only
  },
  {
    id: 'architecture',
    title: 'Architecture',
    path: '/docs/architecture',
    icon: '🧩',
    children: [
      {
        id: 'frontend-architecture',
        title: 'Frontend',
        path: '/docs/architecture/frontend',
      },
      {
        id: 'backend-architecture',
        title: 'Backend',
        path: '/docs/architecture/backend',
      },
      {
        id: 'database-design',
        title: 'Database',
        path: '/docs/architecture/database',
      },
    ],
  },
  {
    id: 'features',
    title: 'Integrations',
    path: '/docs/features',
    icon: '⚡',
    children: [
      {
        id: 'weather-integration',
        title: 'Weather API',
        path: '/docs/features/weather',
      },
      {
        id: 'slack-integration',
        title: 'Slack',
        path: '/docs/features/slack',
      },
      {
        id: 'github-integration',
        title: 'GitHub',
        path: '/docs/features/github',
      },
      {
        id: 'jira-integration',
        title: 'Jira',
        path: '/docs/features/jira',
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
        title: 'Vercel',
        path: '/docs/deployment/vercel',
      },
    ],
  },
  {
    id: 'development',
    title: 'Testing',
    path: '/docs/development',
    icon: '💻',
    children: [
      {
        id: 'development-guide',
        title: 'Unit Testing',
        path: '/docs/development/guide',
      },
      {
        id: 'qa-automation',
        title: 'Automation',
        path: '/docs/development/qa-automation',
      },
      {
        id: 'langsmith-testing',
        title: 'LangSmith Monitoring',
        path: '/docs/development/langsmith',
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
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    path: '/docs/ai-tools',
    icon: '🤖',
    // No children
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
