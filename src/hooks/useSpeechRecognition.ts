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
  | 'aborted'
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

  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionConstructor) {
        setIsSupported(true);
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
              const updated = prev ? `${prev} ${currentFinal}`.trim() : currentFinal.trim();
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
          if (err === 'not-allowed') {
            setError('not-allowed');
            setIsListening(false);
            isListeningRef.current = false;
          } else if (err !== 'no-speech' && err !== 'aborted') {
            console.warn('[WebSpeech] Recognition error:', event.error);
            setError(err);
          }
        };

        recognition.onend = () => {
          // If continuous is true and the user hasn't explicitly stopped listening,
          // automatically keep listening so the user can speak as long as they want!
          if (continuous && isListeningRef.current) {
            try {
              recognition.start();
            } catch {
              setIsListening(false);
              isListeningRef.current = false;
            }
          } else {
            setIsListening(false);
            isListeningRef.current = false;
          }
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
        setError('not-supported');
      }
    }

    return () => {
      if (recognitionRef.current) {
        isListeningRef.current = false;
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup abort
        }
      }
    };
  }, [lang, continuous]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript('');
    transcriptRef.current = '';
    setInterimTranscript('');
    isListeningRef.current = true;

    try {
      recognitionRef.current.start();
    } catch (err: any) {
      if (err?.name !== 'InvalidStateError') {
        console.warn('SpeechRecognition start error:', err);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    transcriptRef.current = '';
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    fullLiveText: (transcript + ' ' + interimTranscript).trim(),
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}
