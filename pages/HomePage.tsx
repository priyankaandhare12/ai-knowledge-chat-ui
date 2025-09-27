import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Send, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { config } from '../config';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sources?: { name: string; url: string }[];
}

export const HomePage: React.FC = () => {
  const { logout, isLoading } = useAuth();
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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I received your message: "${userMessage.text}". This is a demo response. In a real implementation, this would be processed by your AI knowledge system and provide relevant information with sources.`,
        isUser: false,
        timestamp: new Date(),
        sources: [
          { name: 'Example Source 1', url: '#' },
          { name: 'Example Source 2', url: '#' },
        ],
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              <a
                                href={source.url}
                                className="text-xs text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {source.name}
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
                placeholder="Ask me anything about stocks, technology, science, or any topic..."
                className="pr-12 py-3 text-sm"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
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
