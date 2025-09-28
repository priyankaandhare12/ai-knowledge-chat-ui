import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure complete logout by clearing all storage
    localStorage.clear();
    sessionStorage.clear();

    // Clear any cookies by setting them to expire
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // Redirect to login after a short delay
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-green-600">✅</div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Successfully Logged Out</h2>
          <p className="mt-2 text-sm text-gray-600">
            You have been securely logged out. Redirecting to login...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
