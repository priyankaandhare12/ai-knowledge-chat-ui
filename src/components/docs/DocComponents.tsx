import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
} from 'lucide-react';

interface DocPageProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  backLink?: string;
  backLinkText?: string;
  children: React.ReactNode;
}

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

interface AlertProps {
  type?: 'info' | 'warning' | 'success' | 'tip';
  children: React.ReactNode;
}

export const DocPage: React.FC<DocPageProps> = ({
  title,
  description,
  lastUpdated,
  backLink,
  backLinkText,
  children,
}) => {
  return (
    <div className="space-y-6">
      {/* Back navigation */}
      {backLink && (
        <Link
          to={backLink}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backLinkText || 'Back'}
        </Link>
      )}

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-xl text-gray-600">{description}</p>}
        {lastUpdated && <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>}
      </div>

      {/* Content */}
      <div className="max-w-none">{children}</div>
    </div>
  );
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = 'bash', title }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-gray-800 text-sm text-gray-300 border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code className={`language-${language}`}>{children}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export const Alert: React.FC<AlertProps> = ({ type = 'info', children }) => {
  const alertStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    tip: 'bg-purple-50 border-purple-200 text-purple-800',
  };

  const icons = {
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    tip: <Lightbulb className="h-5 w-5" />,
  };

  return (
    <div className={`border-l-4 p-4 rounded-md ${alertStyles[type]}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

interface QuickLinksProps {
  links: Array<{
    title: string;
    description: string;
    href: string;
    external?: boolean;
  }>;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ links }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{link.title}</h3>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">{link.description}</p>
            </a>
          ) : (
            <Link to={link.href} className="block space-y-2">
              <h3 className="font-medium text-gray-900">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
