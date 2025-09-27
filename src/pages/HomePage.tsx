import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Send, Bot, ExternalLink, Plus, Github, Slack, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { config } from '@/config';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTime = useRef<number>(0);

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

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
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
        animate={{ opacity: 1, x: 0 }}
        className="w-64 bg-card border-r flex flex-col fixed left-0 top-0 h-full z-10"
      >
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold text-primary mb-4">{config.app.name}</h1>
          <Button
            onClick={handleNewChat}
            className="w-full justify-start space-x-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </Button>
        </div>

        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Sources</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start space-x-3 h-auto py-3 px-3">
              <Zap className="w-4 h-4 text-orange-500" />
              <div className="text-left">
                <div className="text-sm font-medium">Jira Connect</div>
                <div className="text-xs text-muted-foreground">Connect your Jira workspace</div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start space-x-3 h-auto py-3 px-3">
              <Slack className="w-4 h-4 text-purple-500" />
              <div className="text-left">
                <div className="text-sm font-medium">Slack Connect</div>
                <div className="text-xs text-muted-foreground">Connect your Slack workspace</div>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start space-x-3 h-auto py-3 px-3">
              <Github className="w-4 h-4 text-gray-700" />
              <div className="text-left">
                <div className="text-sm font-medium">GitHub Repo</div>
                <div className="text-xs text-muted-foreground">Connect your repositories</div>
              </div>
            </Button>
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-3">
            <User className="w-8 h-8 p-1.5 bg-primary/10 rounded-full text-primary" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name || 'User'}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </motion.div>

      {/* Main Chat Area - Adjusted for fixed sidebar */}
      <div className="flex flex-col ml-64 flex-1 h-screen">
        {messages.length === 0 ? (
          // Empty State - Fixed layout
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
              <div className="text-center mb-8">
                <Bot className="w-12 h-12 mx-auto text-primary mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Welcome to {config.app.name}</h2>
                <p className="text-muted-foreground">
                  Ask me anything about your connected data sources
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages - Scrollable area only
          <div
            className="flex-1 overflow-y-auto p-6 space-y-4"
            style={{ height: 'calc(100vh - 120px)' }}
          >
            <div ref={messagesEndRef}>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <Card
                    className={`max-w-[70%] ${
                      message.isUser ? 'bg-blue-600 text-white' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="p-4">
                      <div className="whitespace-pre-wrap">
                        {message.isUser ? (
                          message.text
                        ) : (
                          <div className="space-y-2">
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
                      <div
                        className={`text-xs mt-2 ${
                          message.isUser ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
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
        <div className="bg-background border-t border-gray-200 p-6 fixed bottom-0 right-0 left-64 z-20">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={messages.length === 0 ? 'Ask me anything...' : 'Type your message...'}
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
  );
};
