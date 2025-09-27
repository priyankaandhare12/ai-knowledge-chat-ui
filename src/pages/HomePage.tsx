import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Send, Bot, Copy, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { config } from '@/config';
import { apiClient } from '@/services/api.service';

// Function to convert URLs and Markdown links in text to clickable links
const linkifyText = (text: string) => {
  // First handle Markdown-style links: [Text](URL)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const processedText = text.replace(markdownLinkRegex, (_, linkText, url) => {
    return `<MARKDOWN_LINK>${linkText}|${url}</MARKDOWN_LINK>`;
  });

  // Then handle regular URLs
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = processedText.split(/(<MARKDOWN_LINK>[^<]+<\/MARKDOWN_LINK>|https?:\/\/[^\s)]+)/g);

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
          onClick={e => {
            e.stopPropagation();
            console.log('Markdown link clicked:', { text: linkText, url });
          }}
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
          onClick={e => {
            e.stopPropagation();
            console.log('URL clicked:', part);
          }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: { name: string; url: string }[];
}

export const HomePage: React.FC = () => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Universal Knowledge Assistant. I can help you with questions about anything - from stock prices to technical documentation. What would you like to know today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageTime = useRef<number>(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      console.error('Error details:', {
        status: axiosError?.response?.status,
        data: axiosError?.response?.data,
        message: axiosError?.message,
      });

      let errorText =
        'Sorry, I encountered an error while processing your message. Please try again.';

      // Check for specific error types
      if (axiosError?.code === 'ECONNABORTED' && axiosError?.message?.includes('timeout')) {
        errorText =
          '⏰ The AI is taking longer than usual to respond. This might be due to a complex query or high server load. Please try again with a shorter question.';
      } else if (axiosError?.response?.status === 429) {
        errorText =
          '⏳ Too many requests. Please wait 15 minutes before trying again. The server has rate limiting to prevent spam.';
      } else if (
        axiosError?.response?.status === 401 ||
        axiosError?.response?.data?.error === 'Authentication required'
      ) {
        errorText =
          '🔒 You need to be logged in to use the chat. Please click "Sign Out" and then log in again to refresh your session.';
      } else if (axiosError?.response?.status === 403) {
        errorText =
          'You do not have permission to use this feature. Please check your account access.';
      } else if (!axiosError?.response) {
        errorText =
          'Unable to connect to the server. Please check if the backend is running on port 3001.';
      } else if (axiosError?.response?.data?.message) {
        errorText = `API Error: ${axiosError.response.data.message}`;
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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card shadow-sm flex-shrink-0"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-primary"
            >
              {config.app.name}
            </motion.h1>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <User className="w-8 h-8 p-1.5 bg-primary/10 rounded-full text-primary" />
            </motion.div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign Out</span>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">AI Assistant</span>
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.isUser ? 'bg-blue-500 text-white ml-12' : 'bg-card border shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {linkifyText(message.text)}
                    </p>

                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-muted-foreground mb-2 font-medium">Sources:</p>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2 group">
                              <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <a
                                href={source.url}
                                className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 flex items-center space-x-1 cursor-pointer no-underline hover:bg-blue-50 rounded px-1 py-0.5 -mx-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Open ${source.name} in new tab`}
                                onClick={e => {
                                  console.log('Source clicked:', source);
                                  // Ensure the click event propagates properly
                                  e.stopPropagation();
                                }}
                              >
                                <span className="break-all">{source.name}</span>
                                <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mt-2 ml-10">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <span className="text-xs text-muted-foreground ml-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}

                  {message.isUser && (
                    <div className="flex justify-end mt-1 mr-2">
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-card border shadow-sm rounded-lg px-4 py-3">
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
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="border-t bg-card p-4 flex-shrink-0">
          <div className="flex space-x-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  !isAuthenticated
                    ? 'Please log in to start chatting...'
                    : 'Ask me anything about stocks, technology, science, or any topic...'
                }
                className="pr-12 py-3 text-sm"
                disabled={isTyping || !isAuthenticated}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping || !isAuthenticated}
              className="px-4 py-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
