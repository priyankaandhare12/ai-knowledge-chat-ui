import React from 'react';
import { Outlet } from 'react-router-dom';
import { DocsSidebar } from '../docs/DocsSidebar';

export const DocsLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <DocsSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8 md:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
