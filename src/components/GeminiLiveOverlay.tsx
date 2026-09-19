'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Square,
  MessageSquare,
  Radio,
  Sparkles,
  Volume2,
  AlertCircle
} from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface GeminiLiveOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => Promise<string | void>;
  isSpeaking: boolean;
  speak: (text: string, onEnd?: () => void, onError?: () => void) => void;
  cancelSpeech: () => void;
}

export function GeminiLiveOverlay({
  isOpen,
  onClose,
  onSendMessage,
  isSpeaking,
  speak,
  cancelSpeech,
}: GeminiLiveOverlayProps) {
  const [liveState, setLiveState] = useState<'listening' | 'thinking' | 'speaking'>('listening');
  const [lastUserSpeech, setLastUserSpeech] = useState<string>('');
  const [lastAiResponse, setLastAiResponse] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFinalSpeech = async (speechText: string) => {
    const trimmed = speechText.trim();
    if (!trimmed || isMuted) return;

    setLastUserSpeech(trimmed);
    setLiveState('thinking');
    stopListening();

    try {
      const response = await onSendMessage(trimmed);
      if (response && typeof response === 'string') {
        setLastAiResponse(response);
        setLiveState('speaking');

        speak(
          response,
          () => {
            // Once Gemini finishes speaking, seamlessly re-arm the mic for the next question
            if (!isMuted) {
              setLiveState('listening');
              startListening();
            }
          },
          () => {
            if (!isMuted) {
              setLiveState('listening');
              startListening();
            }
          }
        );
      } else {
        setLiveState('listening');
        if (!isMuted) startListening();
      }
    } catch {
      setLiveState('listening');
      if (!isMuted) startListening();
    }
  };

  const {
    isListening,
    fullLiveText,
    error: speechError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    continuous: false,
    onFinalTranscript: (text) => {
      // Clear any pending silence timer
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      handleFinalSpeech(text);
    },
  });

  // When live overlay opens, activate listening
  useEffect(() => {
    if (isOpen) {
      setLiveState('listening');
      setIsMuted(false);
      resetTranscript();
      setLastUserSpeech('');
      setLastAiResponse(
        "I'm listening live! Ask me anything about Kyaw's machine learning projects, skills, or UCSD studies."
      );

      // Start listening after slight delay for audio hardware initialization
      const timer = setTimeout(() => {
        startListening();
      }, 350);

      return () => {
        clearTimeout(timer);
        stopListening();
        cancelSpeech();
      };
    } else {
      stopListening();
      cancelSpeech();
    }
  }, [isOpen, startListening, stopListening, cancelSpeech, resetTranscript]);

  // Interrupt handler: user clicks to cut off long AI speech
  const handleInterrupt = () => {
    cancelSpeech();
    setLiveState('listening');
    resetTranscript();
    if (!isMuted) {
      startListening();
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setLiveState('listening');
      startListening();
    } else {
      setIsMuted(true);
      stopListening();
      cancelSpeech();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-30 flex flex-col bg-[#070c0f]/98 backdrop-blur-2xl text-white rounded-2xl overflow-hidden p-6 justify-between select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>GEMINI LIVE // VOICE</span>
          </div>
        </div>

        {/* Switch to Text Chat */}
        <button
          onClick={() => {
            cancelSpeech();
            stopListening();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-all shadow-sm cursor-pointer"
          title="Return to standard text chat"
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Text Chat</span>
        </button>
      </div>

      {/* Center Interactive Cosmic Orb Visualizer */}
      <div className="flex flex-col items-center justify-center my-auto relative py-4">
        {/* Pulsating Ambient Glow Backing */}
        <motion.div
          animate={{
            scale: liveState === 'speaking' ? [1, 1.35, 1.1, 1.4, 1] : liveState === 'listening' ? [1, 1.15, 1] : [1, 1.05, 1],
            opacity: liveState === 'speaking' ? [0.4, 0.7, 0.4] : [0.25, 0.45, 0.25],
          }}
          transition={{ duration: liveState === 'speaking' ? 1.4 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-52 h-52 rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-400/25 to-blue-600/30 blur-2xl pointer-events-none"
        />

        {/* Multi-Ring Orbit Sphere */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Cybernetic Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: liveState === 'thinking' ? 4 : 16, repeat: Infinity, ease: 'linear' }}
            className={`absolute inset-0 rounded-full border border-dashed ${
              liveState === 'speaking'
                ? 'border-cyan-400/70 shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                : liveState === 'thinking'
                ? 'border-amber-400/70 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                : 'border-cyan-500/40'
            }`}
          />

          {/* Middle Pulse Ring */}
          <motion.div
            animate={{
              scale: liveState === 'speaking' ? [1, 1.15, 1] : [1, 1.05, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full bg-gradient-to-b from-[#0b171c]/90 via-[#071116]/95 to-[#030709] border border-cyan-500/50 shadow-inner flex items-center justify-center"
          />

          {/* Core Star Glyph */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {liveState === 'thinking' ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-10 h-10 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              </motion.div>
            ) : liveState === 'speaking' ? (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Volume2 className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.9)]" />
              </motion.div>
            ) : (
              <Mic className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            )}
          </div>
        </div>

        {/* State Label Badge */}
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            {liveState === 'listening' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 font-bold">Listening... Speak naturally</span>
              </>
            )}
            {liveState === 'thinking' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-amber-300 font-bold">MorningStar AI is thinking...</span>
              </>
            )}
            {liveState === 'speaking' && (
              <>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-bold">MorningStar AI Speaking</span>
              </>
            )}
          </div>

          {/* Browser Unsupported Warning */}
          {!isSupported && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Voice recognition requires Chrome, Edge, or Safari.</span>
            </div>
          )}

          {speechError === 'not-allowed' && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Microphone blocked. Please allow mic permissions in browser.</span>
            </div>
          )}
        </div>

        {/* Live Subtitle Transcript Card */}
        <div className="mt-5 w-full max-w-sm px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-center min-h-[58px] flex items-center justify-center">
          <p className="text-xs text-neutral-300 italic line-clamp-3 leading-relaxed">
            {fullLiveText
              ? `"${fullLiveText}"`
              : liveState === 'thinking'
              ? 'Processing inquiry with Gemini...'
              : lastAiResponse
              ? `"${lastAiResponse.slice(0, 140)}${lastAiResponse.length > 140 ? '...' : ''}"`
              : 'Say "What projects has Kyaw built?" or "Tell me about his data science skills"'}
          </p>
        </div>
      </div>

      {/* Bottom Control Deck */}
      <div className="flex items-center justify-center gap-4 pt-2 border-t border-white/10">
        {/* Mute Button */}
        <button
          onClick={handleToggleMute}
          className={`p-3 rounded-full border transition-all ${
            isMuted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Interrupt / Stop Button (Appears when AI is speaking) */}
        {liveState === 'speaking' && (
          <button
            onClick={handleInterrupt}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            title="Interrupt AI speaking and talk"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Interrupt</span>
          </button>
        )}

        {/* End Call / Return to Text */}
        <button
          onClick={() => {
            cancelSpeech();
            stopListening();
            onClose();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-bold transition-all cursor-pointer"
        >
          <span>End Live Talk</span>
        </button>
      </div>
    </motion.div>
  );
}
