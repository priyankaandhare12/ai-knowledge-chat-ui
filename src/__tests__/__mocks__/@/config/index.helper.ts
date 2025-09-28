export const config = {
  apiUrl: 'http://localhost:3001',
  domainRestrictions: {
    enabled: false,
    allowedDomains: [],
  },
  encryption: {
    secretKey: 'test-secret-key',
    algorithm: 'aes-256-gcm',
    ivLength: 16,
    tagLength: 16,
  },
  performance: {
    slowQueryThreshold: 1000,
    enableProfiling: false,
  },
  features: {
    encryption: false,
    performanceProfiling: false,
    enhancedAuth: false,
  },
  ui: {
    theme: 'light',
    animations: true,
    compactMode: false,
  },
};
