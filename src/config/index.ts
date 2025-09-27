// Environment configuration with secure defaults
export const config = {
  // Server URL
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',

  // Auth0 Configuration - Uses OIDC under the hood
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || 'your-tenant.auth0.com',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-auth0-client-id',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || undefined, // Optional API identifier
  },

  // OIDC Configuration - Automatically configured for Auth0
  oidc: {
    authority: import.meta.env.VITE_AUTH0_DOMAIN
      ? `https://${import.meta.env.VITE_AUTH0_DOMAIN}`
      : 'https://your-tenant.auth0.com',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'your-auth0-client-id',
    redirectUri:
      import.meta.env.VITE_OIDC_REDIRECT_URI || window.location.origin + '/auth/callback',
    postLogoutRedirectUri: import.meta.env.VITE_OIDC_POST_LOGOUT_URI || window.location.origin,
    responseType: 'code',
    scope: 'openid profile email',
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true,
  },

  // Domain Restrictions Configuration
  domainRestrictions: {
    enabled: import.meta.env.VITE_DOMAIN_RESTRICTIONS_ENABLED === 'true',
    allowedDomains: import.meta.env.VITE_ALLOWED_DOMAINS
      ? import.meta.env.VITE_ALLOWED_DOMAINS.split(',').map((d: string) => d.trim())
      : [], // Empty array means all domains allowed
    allowAllGmail: import.meta.env.VITE_ALLOW_ALL_GMAIL !== 'false', // Default true
    blockMessage:
      import.meta.env.VITE_DOMAIN_BLOCK_MESSAGE ||
      'Access restricted to authorized company domains only.',
  },

  // Development mode detection
  isDevelopment: import.meta.env.DEV,

  // App settings
  app: {
    name: 'Universal Knowledge Chatbot',
    description: 'AI powered chat for anything',
  },
} as const;

// Domain validation utility
export const isEmailDomainAllowed = (email: string): boolean => {
  if (!email || !email.includes('@')) return false;

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // If domain restrictions are not enabled, allow all
  if (!config.domainRestrictions.enabled) return true;

  // Check if it's a Gmail address and Gmail is allowed
  if (domain === 'gmail.com' && config.domainRestrictions.allowAllGmail) return true;

  // If no specific domains configured, allow all (except Gmail if disabled)
  if (config.domainRestrictions.allowedDomains.length === 0) {
    return config.domainRestrictions.allowAllGmail || domain !== 'gmail.com';
  }

  // Check against allowed domains list
  return config.domainRestrictions.allowedDomains.includes(domain);
};

// Validation function to ensure required config is present
export const validateConfig = () => {
  const errors: string[] = [];

  // Check Auth0 configuration
  if (!config.auth0.domain || config.auth0.domain === 'your-tenant.auth0.com') {
    errors.push('VITE_AUTH0_DOMAIN is not configured');
  }

  if (!config.auth0.clientId || config.auth0.clientId === 'your-auth0-client-id') {
    errors.push('VITE_AUTH0_CLIENT_ID is not configured');
  }

  // Log domain restriction status
  if (config.domainRestrictions.enabled) {
    console.log('Domain restrictions enabled:', {
      allowedDomains: config.domainRestrictions.allowedDomains,
      allowAllGmail: config.domainRestrictions.allowAllGmail,
    });
  }

  if (errors.length > 0 && !config.isDevelopment) {
    console.warn('Missing Auth0 configuration:', errors);
  }

  return errors.length === 0;
};
