import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

// Detects page abandonment and resets the active session.
// Does NOT trigger during loading, initialization, or internal route changes.
export function useAbandonDetection() {
  const sessionActive = useGameStore((s) => s.sessionActive);
  const resetGame = useGameStore((s) => s.resetGame);
  // Track if we have returned after a visibility-hidden event
  const hiddenRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Delay activation so initial load doesn't false-trigger
    const activationTimer = setTimeout(() => {
      mountedRef.current = true;
    }, 2000);
    return () => clearTimeout(activationTimer);
  }, []);

  useEffect(() => {
    if (!sessionActive) return;

    const handleVisibilityChange = () => {
      if (!mountedRef.current) return;
      if (document.hidden) {
        hiddenRef.current = true;
      } else if (hiddenRef.current) {
        // User returned after leaving
        hiddenRef.current = false;
        resetGame();
      }
    };

    const handlePageHide = () => {
      if (!mountedRef.current || !sessionActive) return;
      // Mark as abandoned — when user comes back resetGame will fire
      hiddenRef.current = true;
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!mountedRef.current || !sessionActive) return;
      e.preventDefault();
      e.returnValue = 'Si abandonas la página, perderás todo tu progreso. ¿Continuar?';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sessionActive, resetGame]);
}
