import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

// Ascending general timer that reads from store state.
export function useGameTimer() {
  const timerStart = useGameStore((s) => s.timerStart);
  const sessionActive = useGameStore((s) => s.sessionActive);
  const timerElapsed = useGameStore((s) => s.timerElapsed);
  const [display, setDisplay] = useState('00:00');
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!sessionActive) {
      // Show final elapsed time after game ends
      setDisplay(formatTime(timerElapsed));
      return;
    }

    const tick = () => {
      const elapsed = Date.now() - timerStart;
      setDisplay(formatTime(elapsed));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sessionActive, timerStart, timerElapsed]);

  return display;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}
