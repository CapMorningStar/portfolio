'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Strips markdown and special characters so TTS speaks natural sentences.
 */
function cleanMarkdownForSpeech(text: string): string {
  return text
    // Replace markdown links [label](url) with just label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold / italics
    .replace(/[*_~`]/g, '')
    // Remove headers (# Header)
    .replace(/^#+\s+/gm, '')
    // Remove blockquotes (> quote)
    .replace(/^>\s+/gm, '')
    // Remove bullet dashes / asterisks at line start
    .replace(/^[-*+]\s+/gm, '')
    // Remove raw URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;

        // Prioritize natural sounding English voices
        const preferred = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel') ||
              v.name.includes('Karen') ||
              v.name.includes('Alex'))
        );

        selectedVoiceRef.current =
          preferred || voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
          window.speechSynthesis.cancel();
        }
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void, onError?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEnd) onEnd();
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const cleanedText = cleanMarkdownForSpeech(text);
      if (!cleanedText) {
        if (onEnd) onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 1.05; // Slightly brisk, modern pace
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      if (selectedVoiceRef.current) {
        utterance.voice = selectedVoiceRef.current;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        // 'interrupted' or 'canceled' are expected when user interrupts
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('[SpeechSynthesis] Error:', e.error);
        }
        setIsSpeaking(false);
        if (onError) onError();
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return {
    isSpeaking,
    isSupported,
    speak,
    cancel,
  };
}
