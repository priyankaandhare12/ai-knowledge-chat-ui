import React from 'react';

export const SecurityOverviewPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Security Overview</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive security framework protecting user data, API communications, and system
            integrity across all application layers.
          </p>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border border-red-200 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-800">
              🔒 Security-First Architecture
            </h2>
            <p className="text-gray-700">
              The Universal Knowledge Chatbot implements enterprise-grade security measures
              including Zero Trust architecture, end-to-end encryption, and comprehensive access
              controls to protect sensitive organizational data and user privacy.
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            🛡️ Authentication & Authorization
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-blue-700">
                🔐 Multi-Factor Authentication (Auth0)
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Authentication Methods</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>SSO Integration:</strong> Enterprise identity providers
                    </li>
                    <li>
                      • <strong>Google OAuth:</strong> Secure social login
                    </li>
                    <li>
                      • <strong>MFA Support:</strong> SMS, TOTP, biometric
                    </li>
                    <li>
                      • <strong>Password Policies:</strong> Strong requirements
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">Authorization Controls</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • <strong>RBAC:</strong> Role-based access control
                    </li>
                    <li>
                      • <strong>JWT Tokens:</strong> Secure session management
                    </li>
                    <li>
                      • <strong>Scope Validation:</strong> API permission checks
                    </li>
                    <li>
                      • <strong>Session Expiry:</strong> Automatic token rotation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔐 Data Protection</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">🗄️ Encryption at Rest</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Database Encryption:</strong> AES-256 encryption for all stored data
                </li>
                <li>
                  • <strong>File Storage:</strong> Encrypted document storage with user-specific
                  keys
                </li>
                <li>
                  • <strong>Vector Database:</strong> Encrypted embeddings in Pinecone
                </li>
                <li>
                  • <strong>Backup Encryption:</strong> Secure backup and disaster recovery
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                🌐 Encryption in Transit
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>TLS 1.3:</strong> Latest encryption for all communications
                </li>
                <li>
                  • <strong>Certificate Pinning:</strong> Prevent man-in-the-middle attacks
                </li>
                <li>
                  • <strong>HSTS Headers:</strong> Force HTTPS connections
                </li>
                <li>
                  • <strong>API Security:</strong> Encrypted API payload transmission
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibent mb-6 text-gray-800">🏰 Network Security</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-lg">🔥</span>
              <div>
                <strong>Web Application Firewall (WAF):</strong> Protection against common attacks
                including XSS, SQL injection, and DDoS
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🛡️</span>
              <div>
                <strong>CORS Protection:</strong> Strict cross-origin resource sharing policies with
                allowlisted domains
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">⏱️</span>
              <div>
                <strong>Rate Limiting:</strong> Advanced rate limiting with IP-based and user-based
                throttling
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🔍</span>
              <div>
                <strong>Intrusion Detection:</strong> Real-time monitoring for suspicious activities
                and automated response
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🎯 Application Security</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-purple-700">
                🔧 Secure Development Practices
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <h4 className="font-medium mb-2">Code Security</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Static code analysis (SonarQube)</li>
                    <li>• Dependency vulnerability scanning</li>
                    <li>• Automated security testing</li>
                    <li>• Code review requirements</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-medium mb-2">Input Validation</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Schema-based validation</li>
                    <li>• XSS prevention filters</li>
                    <li>• SQL injection protection</li>
                    <li>• File upload sanitization</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <h4 className="font-medium mb-2">Error Handling</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Secure error messages</li>
                    <li>• No sensitive data exposure</li>
                    <li>• Centralized error logging</li>
                    <li>• Graceful failure handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">👁️ Privacy & Compliance</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-semibold mb-3 text-indigo-800">📋 GDPR Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Data Minimization:</strong> Collect only necessary data
                </li>
                <li>
                  • <strong>Right to Deletion:</strong> Complete data removal capabilities
                </li>
                <li>
                  • <strong>Data Portability:</strong> Export user data in standard formats
                </li>
                <li>
                  • <strong>Consent Management:</strong> Clear opt-in/opt-out mechanisms
                </li>
              </ul>
            </div>

            <div className="bg-cyan-50 rounded-lg p-6 border border-cyan-200">
              <h3 className="text-lg font-semibold mb-3 text-cyan-800">🔒 Data Sovereignty</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Geographic Controls:</strong> Data residency compliance
                </li>
                <li>
                  • <strong>User Isolation:</strong> Complete separation of user data
                </li>
                <li>
                  • <strong>Audit Trails:</strong> Comprehensive access logging
                </li>
                <li>
                  • <strong>Retention Policies:</strong> Automated data lifecycle management
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🚨 Incident Response</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold mb-4 text-red-800">⚡ Security Monitoring</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Real-time Alerts</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Unauthorized access attempts</li>
                    <li>• Anomalous user behavior</li>
                    <li>• API abuse patterns</li>
                    <li>• System integrity violations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response Procedures</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Automated threat containment</li>
                    <li>• Incident escalation workflows</li>
                    <li>• Forensic data preservation</li>
                    <li>• Recovery and remediation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">🔍 Security Auditing</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-lg">📊</span>
              <div>
                <strong>Regular Security Assessments:</strong> Quarterly penetration testing and
                vulnerability assessments
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">🔎</span>
              <div>
                <strong>Compliance Audits:</strong> SOC 2 Type II and ISO 27001 certification
                processes
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-purple-500 text-lg">📈</span>
              <div>
                <strong>Continuous Monitoring:</strong> 24/7 security operations center (SOC)
                monitoring
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">🎯</span>
              <div>
                <strong>Bug Bounty Program:</strong> Responsible disclosure program for security
                researchers
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">⚙️ Security Configuration</h2>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold mb-4">🔧 Security Headers Configuration</h3>

            <div className="bg-white p-4 rounded border text-sm font-mono">
              <pre className="text-gray-800 whitespace-pre-wrap">
                {`// Security headers configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.openai.com"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: "no-referrer",
  xssFilter: true
}));`}
              </pre>
            </div>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">📋 Security Checklist</h2>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">✅ Implementation Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Auth0 SSO implementation</li>
                  <li>✓ HTTPS/TLS encryption</li>
                  <li>✓ Input validation & sanitization</li>
                  <li>✓ CORS security policies</li>
                  <li>✓ Rate limiting implementation</li>
                  <li>✓ Secure error handling</li>
                </ul>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Security headers configuration</li>
                  <li>✓ Dependency vulnerability scanning</li>
                  <li>✓ Audit logging system</li>
                  <li>✓ Data encryption (rest & transit)</li>
                  <li>✓ User data isolation</li>
                  <li>✓ Incident response procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityOverviewPage;
