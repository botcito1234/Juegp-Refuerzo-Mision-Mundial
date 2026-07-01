import { useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

// Web Speech API wrapper with graceful degradation.
export function useSpeech() {
  const voiceEnabled = useGameStore((s) => s.voiceEnabled);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = useCallback(
    (text: string, rate = 1.0, pitch = 1.0) => {
      if (!supported || !voiceEnabled) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'es-PE';
      utter.rate = rate;
      utter.pitch = pitch;
      utter.volume = 1.0;

      // Pick a Spanish voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) => v.lang.startsWith('es') && v.localService,
      ) ?? voices.find((v) => v.lang.startsWith('es'));
      if (spanishVoice) utter.voice = spanishVoice;

      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    },
    [supported, voiceEnabled],
  );

  const cancel = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { speak, cancel, supported };
}
