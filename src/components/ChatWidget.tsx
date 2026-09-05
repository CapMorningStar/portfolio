'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const QUICK_PROMPTS = [
  'Tell me about your GenAI & LLM projects 🤖',
  'What is your ML tech stack & skills? ⚡',
  'Summarize your UCSD education & GPA 🎓',
  'How can I get in touch with you? 📬',
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        "Hi! I'm **Kyaw's AI Copilot**, powered by Gemini and grounded directly in his portfolio data. Ask me anything about his machine learning projects, technical skills, UCSD coursework, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content:
          "Hi! I'm **Kyaw's AI Copilot**, powered by Gemini and grounded directly in his portfolio data. Ask me anything about his machine learning projects, technical skills, UCSD coursework, or how to get in touch!",
      },
    ]);
  };

  const handleSendMessage = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const botMessageId = `bot-${Date.now()}`;
    const botPlaceholder: Message = {
      id: botMessageId,
      role: 'model',
      content: '',
    };

    setMessages((prev) => [...prev, userMessage, botPlaceholder]);
    setInput('');
    setIsLoading(true);

    try {
      // Build history excluding current placeholder and welcome greeting
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      if (!res.body) throw new Error('Readable stream not supported.');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                content:
                  '⚠️ Sorry, I encountered a temporary connection error. Please make sure the Gemini API is reachable, or feel free to reach out directly via email at kylwin@ucsd.edu!',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatContent = (content: string) => {
    // Simple inline Markdown link parser [text](url) -> <a>
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target={match[2].startsWith('http') ? '_blank' : '_self'}
          rel={match[2].startsWith('http') ? 'noopener noreferrer' : ''}
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 inline-flex items-center gap-0.5"
        >
          {match[1]}
          {match[2].startsWith('http') && <ExternalLink className="w-3 h-3 inline" />}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#111111]/90 hover:bg-[#1a1a1a] border border-emerald-500/30 hover:border-emerald-500/60 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.2)] backdrop-blur-xl text-white transition-all duration-300"
            aria-label="Open AI Copilot Chat"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-white via-neutral-200 to-emerald-400 bg-clip-text text-transparent">
              Ask Kyaw&apos;s AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] flex flex-col bg-[#0d0d0d]/95 border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-white tracking-wide">Kyaw&apos;s AI Copilot</h3>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                      Gemini
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400">Grounded in UCSD Data Science & Projects</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex-shrink-0 flex items-center justify-center text-emerald-400 mt-1">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-[0_2px_12px_rgba(16,185,129,0.3)]'
                        : 'bg-[#161616] text-neutral-200 border border-white/10 rounded-bl-none shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {msg.content ? (
                      <div className="whitespace-pre-wrap space-y-1">
                        {formatContent(msg.content)}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]"></span>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex-shrink-0 flex items-center justify-center text-white mt-1">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Starter Chips on first message */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2 font-mono">Suggested Questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] text-left px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-300 transition-all duration-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kyaw's projects, skills..."
                disabled={isLoading}
                className="flex-1 bg-[#141414] border border-white/10 focus:border-emerald-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-black font-semibold transition-all duration-200 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
