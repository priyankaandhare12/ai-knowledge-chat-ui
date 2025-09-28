// Test data factories for creating mock objects
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-123',
  email: 'test@example.com',
  name: 'Test User',
  emailVerified: true,
  ...overrides,
});

export const createMockAuthResponse = (authenticated = true, user = null) => ({
  success: true,
  user: authenticated ? user || createMockUser() : null,
  authenticated,
});

export const createMockApiResponse = (data: unknown, success = true) => ({
  success,
  data,
  message: success ? 'Success' : 'Error occurred',
});

export const createMockFile = (overrides = {}) => ({
  id: 'test-file-123',
  name: 'test-document.pdf',
  size: 1024,
  type: 'application/pdf',
  uploadedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockChatMessage = (overrides = {}) => ({
  id: 'test-message-123',
  text: 'Hello, this is a test message',
  sender: 'user',
  timestamp: new Date().toISOString(),
  ...overrides,
});

export const createMockChatResponse = (overrides = {}) => ({
  success: true,
  message: 'Hello! This is a test response from the chatbot.',
  conversationId: 'test-conversation-123',
  ...overrides,
});
