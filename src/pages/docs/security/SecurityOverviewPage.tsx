import React from 'react';

export const SecurityOverviewPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Security Overview</h1>

      <p className="text-gray-700 mb-6">
        Key security measures implemented to protect user data, API endpoints, and application
        integrity.
      </p>

      {/* Authentication Section */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">🔐 Authentication</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Auth0 Google SSO for secure user sign-in</li>
          <li>Protected routes ensuring only authenticated users can access sensitive pages</li>
          <li>JWT token-based session management for secure API calls</li>
        </ul>
      </div>

      {/* Authorization & Access */}

      {/* Network & API Security */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-800">🌐 Network & API Security</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>CORS checks with allowlisted domains</li>
          <li>Allowed headers validation for API requests</li>
          <li>Rate limiting to prevent abuse and throttling attacks</li>
        </ul>
      </div>

      <p className="text-gray-700 mt-4">
        These measures ensure that only authorized users can access the application while protecting
        against common web attacks and API misuse.
      </p>
    </div>
  );
};

export default SecurityOverviewPage;
