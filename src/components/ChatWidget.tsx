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
  ChevronDown,
  Mic,
  MicOff,
  AlertCircle,
  Square
} from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const QUICK_PROMPTS = [
  'Tell me about your top AI/ML projects & demos 🚀',
  'What are your technical skills & certifications? 🛠️',
];

function getSpeechErrorMessage(err: string | null): string {
  if (!err) return '';
  switch (err) {
    case 'not-allowed':
      return 'Microphone permission blocked. Please allow microphone access in your browser.';
    case 'audio-capture':
      return 'No microphone detected or audio capture failed. Please check your microphone.';
    case 'network':
      return 'Speech recognition network error. Please check your internet connection.';
    case 'service-not-allowed':
      return 'Speech recognition service disallowed by browser or network policy.';
    case 'not-supported':
      return 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.';
    default:
      return `Speech recognition notice: ${err}. Please try again.`;
  }
}

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
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isNearBottomRef = useRef(true);

  // Speech Recognition Hook (for inline input bar mic with continuous recording)
  const {
    isListening,
    fullLiveText,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript,
    clearError,
  } = useSpeechRecognition({
    continuous: true,
    onFinalTranscript: (finalText) => {
      if (finalText.trim()) {
        setInput(finalText.trim());
      }
    },
  });

  // Speech Synthesis Hook (for audio responses)
  const { isSpeaking, speak, cancel: cancelSpeech } = useSpeechSynthesis();

  // Keep input synchronized with live voice transcript as user speaks
  useEffect(() => {
    if (isListening && fullLiveText) {
      setInput(fullLiveText);
    }
  }, [isListening, fullLiveText]);

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      setInput('');
      resetTranscript();
      startListening();
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleMessagesScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distanceFromBottom < 80;
    isNearBottomRef.current = nearBottom;
    setShowScrollToBottom(!nearBottom);
  };

  // Auto-scroll to bottom on new messages, but only if user hasn't scrolled up
  useEffect(() => {
    if (isOpen && isNearBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Reset scroll state whenever widget is opened
  useEffect(() => {
    if (isOpen) {
      isNearBottomRef.current = true;
      setShowScrollToBottom(false);
      requestAnimationFrame(() => scrollToBottom('auto'));
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleReset = () => {
    cancelSpeech();
    if (isListening) stopListening();
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content:
          "Hi! I'm **MorningStar AI**, powered by Gemini and grounded directly in Kyaw's portfolio data. Ask me anything about his machine learning projects, technical skills, UCSD coursework, or how to get in touch!",
      },
    ]);
  };

  const handleSendMessage = async (userText: string): Promise<string | void> => {
    const text = userText.trim();
    if (!text || isLoading) return;

    if (isListening) {
      stopListening();
    }

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

      return accumulated;
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackError =
        '⚠️ Sorry, I encountered a temporary connection error. Please make sure the Gemini API is reachable, or feel free to reach out directly via email at kylwin@ucsd.edu!';
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, content: fallbackError } : msg
        )
      );
      return fallbackError;
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
    <div data-chat-widget-root className="fixed bottom-6 right-6 z-50 font-sans pointer-events-none">
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
            className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-b from-[#0b171c]/90 via-[#071116]/95 to-[#030709] border border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.12)] hover:shadow-[0_0_35px_rgba(6,182,212,0.55),inset_0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl transition-colors duration-300 pointer-events-auto cursor-pointer"
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

            {/* Ambient Radial Aura Bloom */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-400/15 to-transparent opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 blur-sm pointer-events-none" />

            {/* Central Iconic 4-Pointed MorningStar / Gemini Celestial Glyph */}
            <div className="relative z-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                fill="currentColor"
              >
                <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
              </svg>
            </div>

            {/* HUD Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-lg bg-[#071116]/95 border border-cyan-500/40 text-[11px] font-mono tracking-wider text-cyan-300 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_10px_rgba(6,182,212,0.25)] flex items-center gap-2 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>MORNINGSTAR AI</span>
                <span className="text-[9px] text-neutral-400">// SPEECH AI</span>
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
            transition={{ type: 'spring', damping: 15, stiffness: 300, mass: 0.8 }}
            className="relative w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] flex flex-col bg-[#0b1013]/95 border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.18)] backdrop-blur-2xl overflow-hidden pointer-events-auto"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
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

              {/* Header Action Tools */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    cancelSpeech();
                    if (isListening) stopListening();
                    setIsOpen(false);
                  }}
                  title="Close MorningStar AI"
                  className="p-1.5 text-neutral-400 hover:text-cyan-300 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Microphone / Speech Recognition Error Bar */}
            {speechError && (
              <div className="px-3.5 py-2 bg-rose-500/10 border-b border-rose-500/25 text-rose-300 text-[11px] flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 min-w-0">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span className="truncate">{getSpeechErrorMessage(speechError)}</span>
                </span>
                <button
                  onClick={clearError}
                  className="text-white hover:underline text-[10px] ml-2 cursor-pointer shrink-0 font-medium"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Chat Messages Area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleMessagesScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth min-h-0"
            >
              <div className="flex flex-col space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'model' && (
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0 flex items-center justify-center text-cyan-400 mt-1 shadow-[0_0_8px_rgba(6,182,212,0.15)]">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium rounded-tr-none shadow-[0_2px_15px_rgba(6,182,212,0.3)]'
                          : 'bg-[#14181a] border border-white/5 text-neutral-200 rounded-tl-none font-normal'
                      }`}
                    >
                      {msg.content ? (
                        <div className="space-y-1.5 whitespace-pre-wrap">
                          {formatContent(msg.content)}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.4s]" />
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
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                      Suggested Questions
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] text-left px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 transition-all duration-200 cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll-to-latest button */}
            <AnimatePresence>
              {showScrollToBottom && (
                <motion.button
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    isNearBottomRef.current = true;
                    setShowScrollToBottom(false);
                    scrollToBottom();
                  }}
                  title="Jump to latest"
                  aria-label="Scroll to latest message"
                  className="absolute bottom-[74px] right-4 z-10 w-8 h-8 rounded-full bg-[#14181a] border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.6),0_0_10px_rgba(6,182,212,0.25)] hover:bg-cyan-500/10 hover:border-cyan-400/70 transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Active Speech Recognition Banner with Dedicated Stop Button */}
            {isListening && (
              <div className="px-3.5 py-2 bg-gradient-to-r from-cyan-950/90 via-[#0a1820]/95 to-cyan-950/90 border-t border-cyan-500/40 flex items-center justify-between gap-2 shadow-inner">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300 font-bold truncate">
                    Listening continuously &middot; Talk as much as you want!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={stopListening}
                  className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.25)] shrink-0"
                  title="Stop microphone recording"
                >
                  <Square className="w-3 h-3 fill-current text-red-400" />
                  <span>Stop Mic</span>
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isListening) stopListening();
                handleSendMessage(input);
              }}
              className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="chat-user-input"
                name="chat-user-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening
                    ? 'Listening... Speak as much as you want 🎙️'
                    : "Ask about Kyaw's projects, skills..."
                }
                disabled={isLoading}
                className={`flex-1 bg-[#101518] border rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none transition-all disabled:opacity-50 ${
                  isListening
                    ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] placeholder-cyan-300'
                    : 'border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50'
                }`}
              />

              {/* Microphone Speech Recognition / Stop Button */}
              {isSpeechSupported ? (
                <button
                  type="button"
                  onClick={handleToggleMic}
                  disabled={isLoading}
                  title={isListening ? 'Stop microphone' : 'Click to speak'}
                  className={`p-2 rounded-xl border transition-all duration-200 flex-shrink-0 flex items-center justify-center cursor-pointer ${
                    isListening
                      ? 'bg-red-500/20 border-red-500/60 text-red-300 shadow-[0_0_18px_rgba(239,68,68,0.6)] animate-pulse'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-white/10'
                  }`}
                  aria-label={isListening ? 'Stop microphone' : 'Start microphone'}
                >
                  {isListening ? (
                    <div className="flex items-center gap-1">
                      <Square className="w-3.5 h-3.5 fill-current text-red-400" />
                    </div>
                  ) : (
                    <Mic className="w-3.5 h-3.5" />
                  )}
                </button>
              ) : (
                <div
                  title="Speech recognition not supported in this browser (use Chrome, Edge, or Safari)"
                  className="p-2 rounded-xl bg-white/5 border border-white/5 text-neutral-600 cursor-not-allowed flex-shrink-0"
                >
                  <MicOff className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-black font-semibold transition-all duration-200 flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
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
