'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// SpeechRecognition type definitions for cross-browser support
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
}

export type SpeechRecognitionErrorType =
  | 'not-allowed'
  | 'no-speech'
  | 'network'
  | 'audio-capture'
  | 'not-supported'
  | 'service-not-allowed'
  | 'bad-grammar'
  | 'language-not-supported'
  | 'aborted'
  | string
  | null;

interface UseSpeechRecognitionOptions {
  onFinalTranscript?: (transcript: string) => void;
  lang?: string;
  continuous?: boolean;
}

export function useSpeechRecognition({
  onFinalTranscript,
  lang = 'en-US',
  continuous = true,
}: UseSpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<SpeechRecognitionErrorType>(null);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  const isListeningRef = useRef(false);
  const transcriptRef = useRef('');
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startFreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  // Check browser support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const supported = !!SpeechRecognitionConstructor;
      setIsSupported(supported);
      if (!supported) {
        setError('not-supported');
      }
    }
  }, []);

  // Builder for clean, uncorrupted SpeechRecognition instance
  const initRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const SpeechRecognitionConstructor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) return null;

    const recognition: SpeechRecognitionInstance = new SpeechRecognitionConstructor();
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
      isListeningRef.current = true;
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentInterim = '';
      let currentFinal = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) {
          currentFinal += text;
        } else {
          currentInterim += text;
        }
      }

      if (currentFinal) {
        setTranscript((prev) => {
          const updated = prev ? `${prev} ${currentFinal}`.replace(/\s+/g, ' ').trim() : currentFinal.trim();
          transcriptRef.current = updated;
          if (onFinalTranscriptRef.current) {
            onFinalTranscriptRef.current(updated);
          }
          return updated;
        });
        setInterimTranscript('');
      } else {
        setInterimTranscript(currentInterim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const err = event.error as SpeechRecognitionErrorType;
      
      // 'no-speech' is fired when silence occurs (e.g. user pauses).
      // In continuous mode, do NOT treat this as a fatal error or stop session.
      if (err === 'no-speech') {
        return;
      }

      // 'aborted' is fired when .abort() or .stop() is intentionally invoked.
      if (err === 'aborted') {
        return;
      }

      // Fatal errors: mic denied, no mic hardware, network disconnected, service disallowed, etc.
      console.warn('[WebSpeech] Recognition fatal error:', event.error);
      setError(err);
      setIsListening(false);
      isListeningRef.current = false;
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
    };

    recognition.onend = () => {
      // In Chromium, continuous listening needs a short tick before restart to avoid InvalidStateError
      if (continuous && isListeningRef.current) {
        if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (isListeningRef.current) {
            startFreshRef.current();
          }
        }, 120);
      } else {
        setIsListening(false);
        isListeningRef.current = false;
      }
    };

    return recognition;
  }, [continuous, lang]);

  // Restart function utilizing fresh instance to prevent Chromium audio pipeline wedging
  startFreshRef.current = () => {
    if (!isListeningRef.current) return;
    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      const rec = initRecognition();
      if (rec && isListeningRef.current) {
        recognitionRef.current = rec;
        rec.start();
      }
    } catch (e: any) {
      console.warn('[WebSpeech] Restart error:', e);
      setIsListening(false);
      isListeningRef.current = false;
    }
  };

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    setError(null);
    setTranscript('');
    transcriptRef.current = '';
    setInterimTranscript('');
    isListeningRef.current = true;

    // Abort prior instance to guarantee clean audio channel
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
    }

    const rec = initRecognition();
    if (!rec) {
      setIsSupported(false);
      setError('not-supported');
      setIsListening(false);
      isListeningRef.current = false;
      return;
    }

    recognitionRef.current = rec;
    try {
      rec.start();
    } catch (err: any) {
      console.warn('[WebSpeech] Start error:', err);
      setIsListening(false);
      isListeningRef.current = false;
      if (err?.name === 'NotAllowedError') {
        setError('not-allowed');
      } else {
        setError('audio-capture');
      }
    }
  }, [initRecognition]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    transcriptRef.current = '';
    setInterimTranscript('');
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    fullLiveText: (transcript ? `${transcript} ${interimTranscript}` : interimTranscript).trim(),
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    clearError,
  };
}
