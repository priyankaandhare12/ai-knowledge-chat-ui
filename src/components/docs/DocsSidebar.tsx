import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, Menu, X } from 'lucide-react';
import { documentationStructure, DocSection } from './documentationStructure';

interface DocsSidebarProps {
  className?: string;
}

interface SidebarItemProps {
  item: DocSection;
  level: number;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, level, isActive, isOpen, onToggle }) => {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = item.children?.some(
    child => location.pathname === child.path || location.pathname.startsWith(child.path + '/')
  );

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
          level === 0
            ? 'font-medium text-gray-900 hover:bg-gray-100'
            : 'text-gray-600 hover:bg-gray-50'
        } ${
          isActive || isChildActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' : ''
        }`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        <Link
          to={item.path}
          className="flex items-center flex-1 min-w-0"
          onClick={e => {
            if (hasChildren) {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          {item.icon && <span className="mr-2 text-base">{item.icon}</span>}
          <span className="truncate">{item.title}</span>
        </Link>

        {hasChildren && (
          <button
            onClick={e => {
              e.stopPropagation();
              onToggle();
            }}
            className="ml-2 p-1 rounded hover:bg-gray-200"
          >
            {isOpen || isChildActive ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        )}
      </div>

      {hasChildren && (isOpen || isChildActive) && (
        <div className="mt-1 space-y-1">
          {item.children!.map(child => (
            <SidebarItem
              key={child.id}
              item={child}
              level={level + 1}
              isActive={location.pathname === child.path}
              isOpen={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ className = '' }) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <Link
          to="/home"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
        >
          <Home className="h-4 w-4 mr-1" />
          Back to App
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-2">
          {documentationStructure.map(section => (
            <SidebarItem
              key={section.id}
              item={section}
              level={0}
              isActive={location.pathname === section.path}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <div className={`hidden md:flex ${className}`}>
        <div className="w-80 bg-white border-r border-gray-200 h-full">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};
