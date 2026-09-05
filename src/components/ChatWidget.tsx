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
        "Hi! I'm **MorningStar AI**, powered by Gemini and grounded directly in Kyaw's portfolio data. Ask me anything about his machine learning projects, technical skills, UCSD coursework, or how to get in touch!",
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
          "Hi! I'm **MorningStar AI**, powered by Gemini and grounded directly in Kyaw's portfolio data. Ask me anything about his machine learning projects, technical skills, UCSD coursework, or how to get in touch!",
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
          className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 inline-flex items-center gap-0.5"
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
    <div className="fixed bottom-6 right-6 z-50 font-sans pointer-events-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="chat-toggle"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-b from-[#0b171c]/90 via-[#071116]/95 to-[#030709] border border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.12)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55),inset_0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl transition-colors duration-300 pointer-events-auto"
            aria-label="Open MorningStar AI"
          >
            {/* Outer Rotating Cybernetic Orbit Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-1.5 rounded-full border border-dashed border-cyan-400/30 group-hover:border-cyan-400/60 pointer-events-none transition-colors"
            >
              {/* Micro Orbiting Satellite Node */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
            </motion.div>

            {/* Ambient Radial Aura Bloom (expands on hover) */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-400/15 to-transparent opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 blur-sm pointer-events-none" />

            {/* Central Iconic 4-Pointed MorningStar / Gemini Celestial Glyph */}
            <div className="relative z-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                fill="currentColor"
              >
                {/* 4-pointed astroid / morning star */}
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
              </svg>
            </div>

            {/* HUD Tooltip (Reveals smoothly to the left on hover) */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-lg bg-[#071116]/95 border border-cyan-500/40 text-[11px] font-mono tracking-wider text-cyan-300 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_10px_rgba(6,182,212,0.25)] flex items-center gap-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>MORNINGSTAR AI</span>
                <span className="text-[9px] text-neutral-400">// GEMINI</span>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            style={{ transformOrigin: 'bottom right' }}
            initial={{ opacity: 0, scale: 0.15, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              scale: 0.15,
              y: 20,
              x: 20,
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ type: 'spring', damping: 26, stiffness: 320, mass: 0.7 }}
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] flex flex-col bg-[#0b1013]/95 border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.18)] backdrop-blur-2xl overflow-hidden pointer-events-auto"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-white tracking-wide">MorningStar AI</h3>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
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
                  title="Close MorningStar AI"
                  className="p-1.5 text-neutral-400 hover:text-cyan-300 rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
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
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex-shrink-0 flex items-center justify-center text-cyan-400 mt-1">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-600/90 text-white rounded-br-none shadow-[0_2px_12px_rgba(6,182,212,0.3)]'
                        : 'bg-[#14181a] text-neutral-200 border border-white/10 rounded-bl-none shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {msg.content ? (
                      <div className="whitespace-pre-wrap space-y-1">
                        {formatContent(msg.content)}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]"></span>
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
                        className="text-[11px] text-left px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 transition-all duration-200"
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
                className="flex-1 bg-[#101518] border border-white/10 focus:border-cyan-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-black font-semibold transition-all duration-200 flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
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
