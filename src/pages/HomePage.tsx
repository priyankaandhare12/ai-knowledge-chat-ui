import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import {
  LogOut,
  User,
  Send,
  Bot,
  ExternalLink,
  Github,
  Slack,
  Zap,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock,
  Cloud,
  Loader2,
  Paperclip,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AttachedFiles } from '@/components/ui/AttachedFiles';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/services/api.service';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: { name: string; url: string }[];
  attachedFile?: {
    id: string;
    name: string;
    type: string;
  };
}

export const HomePage: React.FC = () => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  interface AttachedFile {
    id: string;
    file: File;
    previewUrl?: string;
  }

  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastMessageTime = useRef<number>(0);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add a small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF only for now)
    if (file.type !== 'application/pdf') {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: '❌ Please upload a PDF file only.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: '❌ File size too large. Please upload a file smaller than 10MB.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setIsUploading(true);

    try {
      console.log('Uploading file:', file.name);
      const uploadResponse = await apiClient.uploadFile(file);
      console.log('File upload response:', uploadResponse);

      if (uploadResponse.success && uploadResponse.data?.fileId) {
        const newFile: AttachedFile = {
          id: uploadResponse.data.fileId,
          file: file,
        };
        setAttachedFiles(prev => [...prev, newFile]);
        setSelectedFileId(uploadResponse.data.fileId);
        console.log('File uploaded successfully:', uploadResponse.data.fileName);
      } else {
        throw new Error('Upload failed - no file ID received');
      }
    } catch (error: unknown) {
      console.error('File upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFileId === fileId) {
      setSelectedFileId(null);
    }
  };

  const handleFileClick = (file: AttachedFile) => {
    // Create a temporary URL for the PDF file
    const fileUrl = URL.createObjectURL(file.file);
    window.open(fileUrl, '_blank');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Rate limiting: prevent messages sent within 2 seconds of each other
    const now = Date.now();
    if (now - lastMessageTime.current < 2000) {
      console.log('Rate limited: Please wait 2 seconds between messages');
      return;
    }
    lastMessageTime.current = now;

    // Prevent multiple rapid calls
    if (isTyping) {
      console.log('Already sending message, please wait...');
      return;
    }

    // Check authentication status
    if (!isAuthenticated || !user) {
      const authErrorMessage: Message = {
        id: Date.now().toString(),
        text: '🔒 Please log in to use the chat feature. Click "Sign Out" and then log in again to refresh your authentication.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, authErrorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      attachedFile: selectedFileId
        ? {
            id: selectedFileId,
            name: attachedFiles.find(f => f.id === selectedFileId)?.file.name || '',
            type: 'PDF',
          }
        : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Scroll to bottom immediately after adding user message
    setTimeout(() => scrollToBottom(), 100);

    console.log('Sending message to API:', currentInput);

    try {
      // Call the real chat API with optional fileId
      console.log(
        'Making API call to /api/chat...',
        selectedFileId ? `with fileId: ${selectedFileId}` : 'without file'
      );
      const response = await apiClient.sendMessage(currentInput, selectedFileId || undefined);
      console.log('API response received:', response);

      // Extract message from the correct response structure
      const messageText = response.data?.message || response.response || 'No response received';

      const sources = response.data?.sources || response.sources || [];
      console.log('Sources received:', sources);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: messageText,
        isUser: false,
        timestamp: new Date(),
        sources: sources,
      };

      console.log('Bot message with sources:', botMessage);
      setMessages(prev => [...prev, botMessage]);

      // Scroll to bottom after adding bot response
      setTimeout(() => scrollToBottom(), 100);

      // Clear selected file after successful message send
      if (selectedFileId) {
        setSelectedFileId(null);
      }
    } catch (error: unknown) {
      console.error('Chat API error:', error);
      const axiosError = error as {
        response?: {
          status?: number;
          data?: { error?: string; message?: string };
        };
        message?: string;
        code?: string;
      };

      let errorText =
        'Sorry, I encountered an error while processing your message. Please try again.';

      // Check for specific error types
      if (axiosError?.code === 'ECONNABORTED' && axiosError?.message?.includes('timeout')) {
        errorText =
          '⏰ The AI is taking longer than usual to respond. Please try again with a shorter question.';
      } else if (axiosError?.response?.status === 429) {
        errorText = '⏳ Too many requests. Please wait 15 minutes before trying again.';
      } else if (
        axiosError?.response?.status === 401 ||
        axiosError?.response?.data?.error === 'Authentication required'
      ) {
        errorText = '🔒 You need to be logged in to use the chat. Please log in again.';
      } else if (axiosError?.response?.status === 403) {
        errorText = 'You do not have permission to use this feature.';
      } else if (!axiosError?.response) {
        errorText = 'Unable to connect to the server. Please check if the backend is running.';
      }

      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);

      // Scroll to bottom after adding error message
      setTimeout(() => scrollToBottom(), 100);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to convert URLs and Markdown links in text to clickable links
  const linkifyText = (text: string) => {
    // First handle Markdown-style links: [Text](URL)
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    const processedText = text.replace(markdownLinkRegex, (_, linkText, url) => {
      return `<MARKDOWN_LINK>${linkText}|${url}</MARKDOWN_LINK>`;
    });

    // Then handle regular URLs
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = processedText.split(
      /(<MARKDOWN_LINK>[^<]+<\/MARKDOWN_LINK>|https?:\/\/[^\s)]+)/g
    );

    return parts.map((part, index) => {
      // Handle Markdown links
      if (part.startsWith('<MARKDOWN_LINK>') && part.endsWith('</MARKDOWN_LINK>')) {
        const linkContent = part.replace('<MARKDOWN_LINK>', '').replace('</MARKDOWN_LINK>', '');
        const [linkText, url] = linkContent.split('|');
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
          >
            {linkText}
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        );
      }
      // Handle regular URLs
      else if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Fixed */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          width: isSidebarCollapsed ? '64px' : '320px',
        }}
        transition={{ duration: 0.3 }}
        className={`bg-card border-r flex flex-col fixed left-0 top-0 h-full z-10`}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-4 top-6 h-8 w-8 rounded-full border shadow-md bg-background z-50"
          aria-label="Toggle sidebar"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <div className="p-6 border-b bg-gradient-to-b from-primary/5 to-transparent">
          {!isSidebarCollapsed && (
            <div className="space-y-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Universal Knowledge Chatbot
              </h1>
              <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full text-xs text-primary/70 gap-1">
                <Bot className="w-3 h-3" />
                Powered by AI
              </div>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Ask questions about weather, uploaded files, and get instant answers powered by AI.
              </p>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="flex justify-center">
              <Bot className="w-6 h-6 text-primary animate-pulse" />
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <h3
            className={`text-sm font-medium text-primary mb-3 overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-200`}
          >
            Manage Sources
          </h3>

          {/* Connected Sources Section */}
          {!isSidebarCollapsed && (
            <div className="mb-6">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Connected Sources</h4>
              <div className="space-y-2">
                <div className="bg-accent/20 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Cloud className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Weather API</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Real-time weather information and forecasts
                  </p>
                </div>
                <div className="bg-accent/20 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="font-medium">File Analysis</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Upload and analyze documents</p>
                </div>
                <div className="bg-accent/20 rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Slack className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Slack Integration</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Search through project discussions
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Available Integrations */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-medium text-muted-foreground mb-2 ${
                isSidebarCollapsed ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Coming Soon
            </h4>
            <div
              className={`w-full h-auto py-3 ${isSidebarCollapsed ? 'px-0' : 'px-3'} opacity-60`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Jira</span>
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground">Coming soon</div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`w-full h-auto py-3 ${isSidebarCollapsed ? 'px-0' : 'px-3'} opacity-60`}
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-700 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">GitHub</span>
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="text-xs text-muted-foreground">Coming soon</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t py-4 bg-background/50 backdrop-blur-sm">
          <div className={`px-4 ${isSidebarCollapsed ? 'flex flex-col items-center gap-4' : ''}`}>
            <div className={`flex items-center ${isSidebarCollapsed ? '' : 'space-x-3 mb-4'}`}>
              <User className="w-8 h-8 p-1.5 bg-primary/10 rounded-full text-primary flex-shrink-0" />
              {!isSidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{user?.name || 'User'}</div>
                  <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoading}
              className={`${isSidebarCollapsed ? 'w-8 h-8 p-0' : 'w-full'} justify-center`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && <span className="ml-2">Sign Out</span>}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Attached Files */}
      <AttachedFiles
        files={attachedFiles}
        onRemoveFile={handleRemoveFile}
        onFileClick={handleFileClick}
      />

      {/* Main Chat Area - Adjusted for fixed sidebar */}
      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-80'
        }`}
      >
        {messages.length === 0 ? (
          // Empty State with Enhanced Branding
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
              <div className="text-center">
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                  <Bot className="w-20 h-20 mx-auto text-primary relative animate-float" />
                </div>

                <div className="space-y-4 mb-12">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    Universal Knowledge Chatbot
                  </h2>
                  <div className="inline-flex items-center px-4 py-2 bg-primary/5 rounded-full text-sm text-primary gap-2">
                    <Bot className="w-4 h-4" />
                    <span className="font-medium">Powered by AI</span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-gradient-to-b from-primary/5 to-transparent p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-xl text-primary/80 font-medium leading-relaxed mb-8">
                      Your AI companion for instant weather insights and document analysis. Ask
                      anything, get intelligent answers.
                    </p>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary/10">
                        <Cloud className="w-8 h-8 text-blue-500 mb-3" />
                        <div className="font-semibold text-lg mb-2 text-primary">
                          Weather Updates
                        </div>
                        <p className="text-muted-foreground">
                          Real-time forecasts and weather conditions for any location worldwide
                        </p>
                      </div>
                      <div className="bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary/10">
                        <FileText className="w-8 h-8 text-green-500 mb-3" />
                        <div className="font-semibold text-lg mb-2 text-primary">
                          Document Analysis
                        </div>
                        <p className="text-muted-foreground">
                          Smart document processing with instant insights and summaries
                        </p>
                      </div>
                      <div className="bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary/10">
                        <Slack className="w-8 h-8 text-purple-500 mb-3" />
                        <div className="font-semibold text-lg mb-2 text-primary">
                          Slack Integration
                        </div>
                        <p className="text-muted-foreground">
                          Search through project discussions and team conversations
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages - Scrollable area only
          <div className="flex-1 overflow-y-auto p-6 pb-32">
            <div className="space-y-6">
              {messages.map(message => (
                <div key={message.id} className="message-wrapper">
                  {/* Timestamp */}
                  <div
                    className={`text-xs text-gray-400 mb-2 ${message.isUser ? 'text-right mr-12' : 'text-left ml-12'}`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>

                  {/* Message Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                      ${message.isUser ? 'bg-blue-600' : 'bg-blue-100'}`}
                    >
                      {message.isUser ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-blue-600" />
                      )}
                    </div>

                    {/* Message Card */}
                    <Card
                      className={`max-w-[70%] shadow-sm hover:shadow-md transition-shadow duration-200 ${
                        message.isUser
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="p-4">
                        <div className="whitespace-pre-wrap">
                          {message.isUser ? (
                            <div className="space-y-3">
                              {message.attachedFile && (
                                <div
                                  className="flex items-center gap-3 bg-blue-700 rounded-lg p-2 cursor-pointer hover:bg-blue-800 transition-colors"
                                  onClick={() => {
                                    const file = attachedFiles.find(
                                      f => f.id === message.attachedFile?.id
                                    )?.file;
                                    if (file) {
                                      const fileUrl = URL.createObjectURL(file);
                                      window.open(fileUrl, '_blank');
                                    }
                                  }}
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                    <svg
                                      className="w-5 h-5 text-white"
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
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                      {message.attachedFile.name}
                                    </div>
                                    <div className="text-xs text-blue-200">PDF</div>
                                  </div>
                                </div>
                              )}
                              <div>{message.text}</div>
                            </div>
                          ) : (
                            <div className="space-y-2 text-gray-800">
                              <div className="text-gray-800">{linkifyText(message.text)}</div>
                              {message.sources && message.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <p className="text-sm font-medium text-gray-600 mb-2">Sources:</p>
                                  <div className="space-y-1">
                                    {message.sources.map((source, index) => (
                                      <div
                                        key={index}
                                        className="text-xs text-gray-500 bg-gray-50 rounded px-2 py-1"
                                      >
                                        {source.name && (
                                          <div className="font-medium">{source.name}</div>
                                        )}
                                        {source.url && (
                                          <a
                                            href={source.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                          >
                                            {source.url}
                                          </a>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <Card className="bg-white border-gray-200">
                    <div className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          ></div>
                        </div>
                        <span className="text-gray-500 text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Scroll target element - adds extra space at bottom */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        )}

        {/* Input Area - Always fixed at bottom */}
        <div
          className={`bg-background fixed bottom-0 right-0 z-20 transition-all duration-300 ${
            isSidebarCollapsed ? 'left-16' : 'left-80'
          }`}
        >
          {/* Input Row */}
          <div className="border-t border-gray-200">
            <div className="px-6 py-4">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1 rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center min-h-[44px]">
                    {/* File Upload Button */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleFileIconClick}
                          disabled={isUploading || isTyping || selectedFileId !== null}
                          className="relative h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                                  Uploading file...
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <Paperclip
                                className={`w-4 h-4 ${selectedFileId ? 'opacity-50' : ''}`}
                              />
                              {selectedFileId && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Only one file at a time
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* File Display */}
                    {selectedFileId && (
                      <div className="flex items-center gap-2 ml-12 mr-2 my-2">
                        <div
                          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-lg py-2 px-3 cursor-pointer transition-colors text-gray-700 text-sm group"
                          onClick={() => {
                            const file = attachedFiles.find(f => f.id === selectedFileId)?.file;
                            if (file) {
                              const fileUrl = URL.createObjectURL(file);
                              window.open(fileUrl, '_blank');
                            }
                          }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
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
                          <span className="font-medium">
                            {attachedFiles.find(f => f.id === selectedFileId)?.file.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedFileId(null);
                            }}
                            className="h-6 w-6 p-0 hover:bg-gray-200 rounded-full transition-colors ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Input Field */}
                    <Input
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        selectedFileId
                          ? `Ask about the uploaded file...`
                          : messages.length === 0
                            ? 'Ask about weather or upload a file for analysis...'
                            : 'Type your message...'
                      }
                      className={`w-full py-3 pl-12 pr-4 border-0 focus-visible:ring-0 bg-transparent ${
                        selectedFileId ? 'placeholder:text-gray-400' : ''
                      }`}
                      disabled={isTyping || !isAuthenticated}
                    />
                  </div>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading || isTyping}
                    aria-label="Upload file"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !isAuthenticated}
                  className="h-[44px] px-4"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
