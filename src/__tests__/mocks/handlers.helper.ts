import { http, HttpResponse } from 'msw';
import { config } from '../../config';

// Mock API handlers for testing
export const handlers = [
  // Health check endpoint
  http.get(`${config.apiUrl}/api/health`, () => {
    return HttpResponse.json({
      success: true,
      status: 'healthy',
      uptime: 12345,
      timestamp: new Date().toISOString(),
      environment: 'test',
    });
  }),

  // Authentication endpoints
  http.get(`${config.apiUrl}/api/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      loginUrl: 'https://test-tenant.auth0.com/authorize?...',
      message: 'Redirect to this URL to login with Google',
    });
  }),

  http.get(`${config.apiUrl}/api/auth/user`, () => {
    // Default to authenticated user - can be overridden in tests
    return HttpResponse.json({
      success: true,
      user: {
        id: 'test-user-123',
        email: 'test@example.com',
        name: 'Test User',
        emailVerified: true,
      },
      authenticated: true,
    });
  }),

  http.post(`${config.apiUrl}/api/auth/logout`, () => {
    return HttpResponse.json({
      success: true,
      logoutUrl: 'https://test-tenant.auth0.com/logout?...',
      message: 'Logged out successfully',
    });
  }),

  // Chat endpoint
  http.post(`${config.apiUrl}/api/chat`, () => {
    return HttpResponse.json({
      success: true,
      message: 'Hello! This is a test response from the chatbot.',
      conversationId: 'test-conversation-123',
    });
  }),

  // File upload endpoint
  http.post(`${config.apiUrl}/api/upload`, () => {
    return HttpResponse.json({
      success: true,
      message: 'File uploaded successfully',
      fileId: 'test-file-123',
    });
  }),

  // Files list endpoint
  http.get(`${config.apiUrl}/api/files`, () => {
    return HttpResponse.json({
      success: true,
      files: [
        {
          id: 'test-file-1',
          name: 'test-document.pdf',
          size: 1024,
          uploadedAt: new Date().toISOString(),
        },
      ],
    });
  }),

  // Error handlers for testing error scenarios
  http.get(`${config.apiUrl}/api/test/error`, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  http.get(`${config.apiUrl}/api/test/unauthorized`, () => {
    return HttpResponse.json(
      {
        success: false,
        error: 'Authentication required',
      },
      { status: 401 }
    );
  }),
];
