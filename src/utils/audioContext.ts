let ctx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      ctx = new ((window as any).AudioContext ?? (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return ctx;
}
