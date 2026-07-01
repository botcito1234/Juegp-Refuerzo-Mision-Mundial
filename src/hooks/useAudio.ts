import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { getAudioContext } from '../utils/audioContext';

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.4,
  decay = true,
) {
  const ctx = getAudioContext();
  if (!ctx) return;
  // Auto-resume if the browser suspended the context (tab switch, autoplay policy, etc.)
  if (ctx.state !== 'running') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  if (decay) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playChord(notes: number[], duration: number, volume = 0.25) {
  notes.forEach((n) => playTone(n, duration, 'sine', volume));
}

export function useAudio() {
  const audioEnabled = useGameStore((s) => s.audioEnabled);

  // Resume AudioContext on first user gesture
  const resume = useCallback(async () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state !== 'running') await ctx.resume();
  }, []);

  const playCorrect = useCallback(() => {
    if (!audioEnabled) return;
    playTone(523, 0.1, 'sine', 0.3);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 100);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.3), 200);
  }, [audioEnabled]);

  const playWrong = useCallback(() => {
    if (!audioEnabled) return;
    playTone(200, 0.2, 'sawtooth', 0.2);
    setTimeout(() => playTone(150, 0.3, 'sawtooth', 0.2), 200);
  }, [audioEnabled]);

  const playLifeLost = useCallback(() => {
    if (!audioEnabled) return;
    playTone(300, 0.15, 'square', 0.25);
    setTimeout(() => playTone(250, 0.15, 'square', 0.25), 150);
    setTimeout(() => playTone(180, 0.3, 'square', 0.25), 300);
  }, [audioEnabled]);

  const playLevelComplete = useCallback(() => {
    if (!audioEnabled) return;
    playChord([523, 659, 784], 0.4, 0.2);
    setTimeout(() => playChord([587, 740, 880], 0.5, 0.2), 400);
  }, [audioEnabled]);

  const playBossDefeated = useCallback(() => {
    if (!audioEnabled) return;
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.15, 'sine', 0.3), i * 80);
    });
  }, [audioEnabled]);

  const playUnlock = useCallback(() => {
    if (!audioEnabled) return;
    playTone(784, 0.1, 'sine', 0.25);
    setTimeout(() => playTone(1047, 0.2, 'sine', 0.25), 100);
  }, [audioEnabled]);

  const playClick = useCallback(() => {
    if (!audioEnabled) return;
    playTone(440, 0.05, 'sine', 0.15, false);
  }, [audioEnabled]);

  return { resume, playCorrect, playWrong, playLifeLost, playLevelComplete, playBossDefeated, playUnlock, playClick };
}
