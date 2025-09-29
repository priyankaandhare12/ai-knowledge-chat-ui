import React from 'react';
import { DocPage, Alert } from '@/components/docs/DocComponents';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export const QAAutomation: React.FC = () => {
  return (
    <DocPage
      title="QA Automation Framework"
      description="Complete test automation framework with enterprise-grade security, reporting, and CI/CD integration for Gmail SSO authentication"
      lastUpdated="September 28, 2025"
      backLink="/docs/development"
      // backLinkText="Back to Development"
    >
      <div className="space-y-8">
        <Alert type="info">
          <p>
            This comprehensive test automation framework provides enterprise-grade testing
            capabilities with advanced security, Allure reporting, and CI/CD integration for the AI
            Knowledge Chat UI application.
          </p>
        </Alert>

        {/* Framework Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🎯 Framework Overview</CardTitle>
            <CardDescription>
              Enterprise-grade test automation framework for AI Knowledge Chat UI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">✅ Current Status</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Enterprise-Grade Framework Complete
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Production-Ready with Security
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    13+ Comprehensive Test Cases
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    60+ Manual Test Scenarios
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">🏗️ Architecture</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Page Object Model (POM)</li>
                  <li>• TypeScript with Type Safety</li>
                  <li>• Custom Playwright Fixtures</li>
                  <li>• Multi-source Configuration</li>
                  <li>• Modular Design Pattern</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔐 Security & Credential Management
            </CardTitle>
            <CardDescription>Military-grade security with multi-layer protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🔒 Encryption</h3>
                <ul className="space-y-2 text-sm">
                  <li>• AES-256-CBC Encryption</li>
                  <li>• PBKDF2 Key Derivation</li>
                  <li>• Secure Password Generation</li>
                  <li>• Military-grade Protection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">🛡️ Protection</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multi-layer Security</li>
                  <li>• Environment Variables</li>
                  <li>• Encrypted File Storage</li>
                  <li>• Automated leak Detection</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">⚙️ Setup</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Interactive Setup Wizard</li>
                  <li>• Security Validation Scripts</li>
                  <li>• Automated Configuration</li>
                  <li>• User-friendly Interface</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporting & Analytics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Advanced Reporting & Analytics
            </CardTitle>
            <CardDescription>Rich test reporting with comprehensive analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">📈 Allure Integration</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Step-by-step execution tracking</li>
                  <li>• Screenshots and attachments</li>
                  <li>• Rich metadata and annotations</li>
                  <li>• Visual debugging capabilities</li>
                  <li>• Historical trend analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">📋 Report Variants</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Single-file complete reports</li>
                  <li>• Optimized GitHub artifacts</li>
                  <li>• Automatic cleanup management</li>
                  <li>• CI/CD integration ready</li>
                  <li>• Downloadable documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CI/CD Automation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🚀 CI/CD & Automation</CardTitle>
            <CardDescription>Continuous integration with automated workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🕐 Scheduling</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Daily execution at 4 PM IST</li>
                  <li>• GitHub Actions workflows</li>
                  <li>• Automated trigger system</li>
                  <li>• Configurable schedules</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">📦 Artifacts</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Automated report generation</li>
                  <li>• GitHub Pages deployment</li>
                  <li>• Artifact storage management</li>
                  <li>• Easy download access</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">⚡ Optimization</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Parallel execution strategies</li>
                  <li>• Failure notifications</li>
                  <li>• Environment automation</li>
                  <li>• Fast feedback cycles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Coverage */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧪 Comprehensive Test Coverage
            </CardTitle>
            <CardDescription>Complete testing across all functional areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🤖 Automated Tests</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Gmail SSO authentication flow</li>
                  <li>• Login page UI validation</li>
                  <li>• Error handling scenarios</li>
                  <li>• Access control verification</li>
                  <li>• Responsive design testing</li>
                  <li>• Navigation functionality</li>
                  <li>• Accessibility compliance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">📝 Manual Test Suites</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Authentication (8 test cases)</li>
                  <li>• User Interface (3 test cases)</li>
                  <li>• Chat Functionality (3 test cases)</li>
                  <li>• File Upload (4 test cases)</li>
                  <li>• Security Testing (3 test cases)</li>
                  <li>• Performance (3 test cases)</li>
                  <li>• Compatibility (3 test cases)</li>
                  <li>• And 6 more specialized areas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Commands */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🚀 Quick Start Commands</CardTitle>
            <CardDescription>Essential commands to get started with automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">📦 Initial Setup</h3>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div># Navigate to automation framework</div>
                    <div>cd ai-knowledge-automation</div>
                    <div className="mt-2"># Install dependencies and browsers</div>
                    <div>npm install</div>
                    <div>npm run test:install</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">🔐 Security Setup</h3>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div># Interactive credential setup (recommended)</div>
                    <div>node scripts/setup-credentials.js</div>
                    <div className="mt-2"># Security validation</div>
                    <div>chmod +x scripts/security-check.sh</div>
                    <div>./scripts/security-check.sh</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">🧪 Run Tests</h3>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div># Run with Allure reporting (recommended)</div>
                    <div>npm run test:allure</div>
                    <div className="mt-2"># Run with visible browser</div>
                    <div>npm run test:allure:headed</div>
                    <div className="mt-2"># Debug mode</div>
                    <div>npm run test:debug</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">📊 View Reports</h3>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-2">
                    <div># Generate and serve Allure reports</div>
                    <div>npm run allure:serve</div>
                    <div className="mt-2"># Generate single-file report</div>
                    <div>node scripts/generate-complete-allure.js</div>
                    <div className="mt-2"># Standard Playwright reports</div>
                    <div>npm run report</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Framework Capabilities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌟 Framework Capabilities Summary
            </CardTitle>
            <CardDescription>Complete overview of all implemented features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Feature Category</th>
                    <th className="border border-gray-300 p-3 text-left">Capability</th>
                    <th className="border border-gray-300 p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Test Automation</td>
                    <td className="border border-gray-300 p-3">Gmail SSO Authentication</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Reporting</td>
                    <td className="border border-gray-300 p-3">
                      Allure Integration with Rich Reports
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Security</td>
                    <td className="border border-gray-300 p-3">AES-256-CBC Password Encryption</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">CI/CD</td>
                    <td className="border border-gray-300 p-3">GitHub Actions Daily Automation</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Documentation</td>
                    <td className="border border-gray-300 p-3">60+ Manual Test Cases</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Setup</td>
                    <td className="border border-gray-300 p-3">Interactive Credential Wizard</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Artifacts</td>
                    <td className="border border-gray-300 p-3">Single-File Report Generation</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Validation</td>
                    <td className="border border-gray-300 p-3">Security Check Scripts</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Cross-Platform</td>
                    <td className="border border-gray-300 p-3">Multi-Browser & Device Support</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Maintenance</td>
                    <td className="border border-gray-300 p-3">Automated Cleanup & Utilities</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <span className="text-green-500 font-bold">✅ Complete</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📁 Project Structure</CardTitle>
            <CardDescription>Complete automation framework organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{`ai-knowledge-automation/
├── src/
│   ├── pages/                              # 🏗️ Page Object Models
│   │   ├── BasePage.ts                    # ✅ Base functionality
│   │   ├── LoginPage.ts                   # ✅ Login automation
│   │   ├── GoogleOAuthPage.ts             # ✅ OAuth flow
│   │   └── HomePage.ts                    # ✅ Post-login page
│   ├── fixtures/
│   │   ├── test-fixtures.ts               # ✅ Custom fixtures
│   │   └── persistent-context-fixtures.ts # ✅ Persistent context
│   ├── utils/
│   │   ├── credential-encryption.ts       # 🔐 AES encryption
│   │   ├── simple-credential-encryption.ts # 🔐 Simple encryption
│   │   └── test-config.ts                 # ✅ Configuration
│   └── config/
│       └── credentials.ts                 # 🔐 Credential management
├── tests/
│   └── auth/
│       └── login.spec.ts                  # ✅ Authentication tests
├── scripts/
│   ├── setup-credentials.js               # 🛠️ Setup wizard
│   ├── security-check.sh                  # 🔒 Security validation
│   ├── cleanup-allure.js                  # 🧹 Cleanup utility
│   ├── generate-complete-allure.js        # 📊 Complete reports
│   └── generate-optimized-single-file-allure.js # 📊 Optimized reports
├── .github/workflows/
│   ├── daily-e2e-tests.yml               # 🕐 Daily automation
│   ├── playwright.yml                     # 🚀 CI/CD workflow
│   └── test-setup.yml                     # ⚙️ Environment setup
├── playwright.config.ts                   # ✅ Playwright + Allure config
├── package.json                           # ✅ Dependencies
└── Manual_Test_Cases_AI_Knowledge_Chat.csv # 📝 Manual test cases`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Production Readiness */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🎉 Production Readiness</CardTitle>
            <CardDescription>Enterprise-grade framework ready for deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">🚀 Production Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Enterprise Security with AES-256-CBC
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Advanced Allure Reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Daily Automated Testing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Complete Documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Security Validation
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">🔄 CI/CD Integration</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    GitHub Actions Workflows
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Artifact Management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Environment Automation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Failure Reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Parallel Execution
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-gray-600">
            This framework provides enterprise-grade test automation with comprehensive security,
            reporting, and CI/CD integration for the AI Knowledge Chat UI application's Gmail SSO
            authentication flow.
          </p>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ✅ Production Ready
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 ml-2">
              🔐 Enterprise Security
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 ml-2">
              📊 Advanced Reporting
            </span>
          </div>
        </div>
      </div>
    </DocPage>
  );
};
