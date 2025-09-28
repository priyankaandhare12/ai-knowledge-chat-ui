/** @type {import('jest').Config} */
export default {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.helper.ts'],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2020',
          module: 'CommonJS',
          moduleResolution: 'node',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          types: ['jest', 'node', '@testing-library/jest-dom'],
        },
      },
    ],
  },

  // Module name mapping for path aliases
  moduleNameMapper: {
    '^@/config$': '<rootDir>/src/__tests__/__mocks__/@/config/index.helper.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock static assets including the logo
    '\\.(jpg|jpeg|png|gif|svg|webp)$': 'identity-obj-proxy',
  },

  // Transform ignore patterns
  transformIgnorePatterns: ['node_modules/(?!(axios|@testing-library)/)'],

  // Global setup for import.meta.env
  globals: {
    'import.meta': {
      env: {
        VITE_API_URL: 'http://localhost:3001',
        VITE_DOMAIN_RESTRICTIONS_ENABLED: 'false',
        VITE_ALLOWED_DOMAINS: '',
      },
    },
  },

  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx|js)',
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '\\.helper\\.(ts|tsx|js)$',
    '__mocks__/.*\\.helper\\.(ts|tsx|js)$',
  ],

  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],

  // Coverage collection patterns
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/__tests__/**/*',
    '!src/**/__tests__/**/*',
    '!src/**/*.stories.{ts,tsx}',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Critical files require higher coverage
    './src/services/auth.service.ts': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    './src/contexts/AuthContext.tsx': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },

  // Module directories
  moduleDirectories: ['node_modules', 'src'],

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after each test
  restoreMocks: true,

  // Verbose output
  verbose: true,

  // Test timeout
  testTimeout: 10000,
};
