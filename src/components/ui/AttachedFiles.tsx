import React from 'react';
import { X } from 'lucide-react';
import { Button } from './button';

interface AttachedFile {
  id: string;
  file: File;
  previewUrl?: string;
}

interface AttachedFilesProps {
  files: AttachedFile[];
  onRemoveFile: (fileId: string) => void;
  onFileClick: (file: AttachedFile) => void;
}

export const AttachedFiles: React.FC<AttachedFilesProps> = ({
  files,
  onRemoveFile,
  onFileClick,
}) => {
  if (files.length === 0) return null;

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="space-y-1">
        {files.map(file => (
          <div key={file.id} className="group relative hover:bg-gray-50 transition-colors">
            <div
              className="flex items-start gap-3 p-4 cursor-pointer"
              onClick={() => onFileClick(file)}
            >
              {/* PDF Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                  <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                  <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{file.file.name}</h4>
                <p className="text-xs text-gray-500 mt-1">PDF</p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-8 w-8 p-0 hover:bg-gray-200 rounded-full transition-all"
                onClick={e => {
                  e.stopPropagation();
                  onRemoveFile(file.id);
                }}
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
