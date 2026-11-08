import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Sparkles, Loader2, X, Send, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';
import { CONSULTANT_INFO } from '../data';

interface AIChatbotProps {
  onOpenConsultationForm: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ onOpenConsultationForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am the AI Strategy Assistant for Aniket Dubey. How can I assist with your business consulting, content marketing, or managed IT inquiries today?',
      timestamp: 'Just now',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'What services are offered?',
    'Explain the 4-step approach',
    'Where is the Durgapur office?',
    'How do I book a consultation?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      // Secure call to server-side proxy route - never exposes GEMINI_API_KEY to browser
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Thank you for your question. Please feel free to schedule a direct consultation with Aniket Dubey.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          sender: 'assistant',
          text: `Aniket Dubey provides strategic consulting, content marketing, and managed IT services. You can reach out directly at ${CONSULTANT_INFO.email} or call ${CONSULTANT_INFO.formattedPhone}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Formats text, bullet points, bold markers, and handles URLs safely without bleeding
  const renderFormattedMessage = (content: string, isUser: boolean) => {
    const lines = content.split('\n');

    return lines.map((line, lineIdx) => {
      const isBullet =
        line.trim().startsWith('- ') ||
        line.trim().startsWith('* ') ||
        /^\d+\.\s/.test(line.trim());
      const cleanLine = isBullet ? line.trim().replace(/^[-*]\s+|\d+\.\s+/, '') : line;

      // Tokenize by markdown link [label](url), standalone URL, or bold **text**
      const tokenRegex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<]+|\*\*[^*]+\*\*)/g;
      const parts = cleanLine.split(tokenRegex);

      const renderedLine = parts.map((part, partIdx) => {
        if (!part) return null;

        // Markdown link [label](url)
        const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
        if (mdLinkMatch) {
          const [, label, url] = mdLinkMatch;
          return (
            <a
              key={partIdx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isUser ? 'text-white underline font-semibold' : 'text-[#D15301] hover:text-[#B94700] underline font-semibold'
              } break-all [overflow-wrap:anywhere] inline-flex items-center gap-0.5`}
            >
              <span>{label}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 inline ml-0.5" />
            </a>
          );
        }

        // Standalone URL: https://...
        if (/^https?:\/\//.test(part)) {
          let cleanUrl = part;
          let trailingPunct = '';
          if (/[.,;:!?]$/.test(cleanUrl)) {
            trailingPunct = cleanUrl.slice(-1);
            cleanUrl = cleanUrl.slice(0, -1);
          }

          const displayText = cleanUrl.includes('scheduler.zoom.us')
            ? 'Zoom Scheduler'
            : cleanUrl.replace(/^https?:\/\/(www\.)?/, '');

          return (
            <React.Fragment key={partIdx}>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isUser
                    ? 'text-white underline font-semibold'
                    : 'text-[#D15301] hover:text-[#B94700] underline font-semibold'
                } break-all [overflow-wrap:anywhere] inline-flex items-center gap-0.5`}
              >
                <span>{displayText}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0 inline ml-0.5" />
              </a>
              {trailingPunct}
            </React.Fragment>
          );
        }

        // Bold text **text**
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        if (boldMatch) {
          return (
            <strong key={partIdx} className="font-bold text-white">
              {boldMatch[1]}
            </strong>
          );
        }

        return <span key={partIdx}>{part}</span>;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 min-w-0">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isUser ? 'bg-white' : 'bg-[#D15301]'
              } shrink-0 mt-1.5`}
            />
            <div className="flex-1 min-w-0 break-words [overflow-wrap:anywhere] [word-break:break-word]">
              {renderedLine}
            </div>
          </div>
        );
      }

      return (
        <p
          key={lineIdx}
          className="min-w-0 break-words [overflow-wrap:anywhere] [word-break:break-word] mb-1.5 last:mb-0"
        >
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-1.5rem)]">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="ai-chatbot-toggle-btn"
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#D15301] hover:bg-[#B94700] active:scale-95 text-white font-bold rounded-full shadow-2xl shadow-[#D15301]/35 hover:shadow-[#D15301]/50 hover:scale-105 transition-all duration-200 cursor-pointer border border-[#D15301]"
          aria-label="Open AI Strategy Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#080808] rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline-block text-white">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className="w-[calc(100vw-1.5rem)] sm:w-[390px] max-w-full max-h-[min(580px,calc(100dvh-5.5rem))] h-[76vh] sm:h-[580px] bg-[#080808] border border-[#292929] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="bg-[#030303] border-b border-[#292929] p-3 sm:p-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#D15301]/15 border border-[#D15301]/30 flex items-center justify-center text-[#D15301] shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-[#F5F2ED] truncate">Aniket Dubey AI Advisory</h4>
                  <Sparkles className="w-3 h-3 text-[#D15301] shrink-0" />
                </div>
                <p className="text-[10px] text-[#A6A6A6] truncate">Strategic Consulting Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#A6A6A6] hover:text-white rounded-lg hover:bg-[#171717] transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-3 bg-[#080808] text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 min-w-0 w-full ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#121212] border border-[#292929] flex items-center justify-center shrink-0 mt-0.5 text-[#D15301]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] min-w-0 rounded-2xl px-3.5 py-2.5 shadow-sm break-words [overflow-wrap:anywhere] [word-break:break-word] ${
                    msg.sender === 'user'
                      ? 'bg-[#D15301] text-white font-medium rounded-br-none'
                      : 'bg-[#121212] border border-[#292929] text-[#F5F2ED] rounded-bl-none'
                  }`}
                >
                  <div className="min-w-0 break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed">
                    {renderFormattedMessage(msg.text, msg.sender === 'user')}
                  </div>
                  <span
                    className={`block text-[9px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-white/80' : 'text-[#A6A6A6]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#D15301]/20 border border-[#D15301]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#D15301]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#A6A6A6] text-xs py-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D15301]" />
                <span>Aniket's assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-[#030303] border-t border-[#292929] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap text-[10px] font-medium px-2.5 py-1.5 rounded-full bg-[#121212] hover:bg-[#D15301]/15 text-[#F5F2ED] hover:text-white border border-[#292929] hover:border-[#D15301]/40 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#030303] border-t border-[#292929] shrink-0 pb-safe">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about strategy, IT, or booking..."
                className="flex-1 bg-[#080808] border border-[#292929] rounded-xl px-3 py-2 text-base sm:text-xs text-[#F5F2ED] placeholder-[#A6A6A6]/60 focus:outline-none focus:ring-1 focus:ring-[#D15301]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 sm:p-2 bg-[#D15301] hover:bg-[#B94700] active:scale-95 disabled:opacity-50 text-white font-bold rounded-xl transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 shadow-md shadow-[#D15301]/20"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#292929] text-[10px] text-[#A6A6A6]">
              <span>Book Consultation:</span>
              <a
                href={CONSULTANT_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D15301] hover:text-[#B94700] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Zoom Scheduler</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
