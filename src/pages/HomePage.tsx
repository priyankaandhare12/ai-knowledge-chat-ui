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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/services/api.service';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: { name: string; url: string }[];
}

export const HomePage: React.FC = () => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    scrollToBottom();
  }, [messages, isTyping]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    console.log('Sending message to API:', currentInput);

    try {
      // Call the real chat API
      console.log('Making API call to /api/chat...');
      const response = await apiClient.sendMessage(currentInput);
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
          width: isSidebarCollapsed ? '64px' : '256px',
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

        <div className="flex-1 p-4">
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
                <Slack className="w-4 h-4 text-purple-500 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Slack</span>
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

        <div className="mt-auto border-t py-6">
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

      {/* Main Chat Area - Adjusted for fixed sidebar */}
      <div
        className={`flex flex-col flex-1 h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {messages.length === 0 ? (
          // Empty State with Enhanced Branding
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
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
                  <div className="bg-gradient-to-b from-primary/5 to-transparent p-8 rounded-2xl backdrop-blur-sm">
                    <p className="text-xl text-primary/80 font-medium leading-relaxed mb-8">
                      Your AI companion for instant weather insights and document analysis. Ask
                      anything, get intelligent answers.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages - Scrollable area only
          <div className="flex-1 overflow-y-auto p-6">
            <div ref={messagesEndRef} className="space-y-6">
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
                            message.text
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
            </div>
          </div>
        )}

        {/* Input Area - Always fixed at bottom */}
        <div
          className={`bg-background fixed bottom-0 right-0 z-20 transition-all duration-300 ${
            isSidebarCollapsed ? 'left-16' : 'left-64'
          }`}
        >
          <div className="border-t border-gray-200">
            <div className="px-6 py-12 flex space-x-2">
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  messages.length === 0
                    ? 'Ask about weather or upload a file for analysis...'
                    : 'Type your message...'
                }
                className="flex-1 py-3"
                disabled={isTyping || !isAuthenticated}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || !isAuthenticated}
                className="px-4 py-3"
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
  );
};
