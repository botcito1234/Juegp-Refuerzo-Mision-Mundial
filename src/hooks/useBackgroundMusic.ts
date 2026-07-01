import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { getAudioContext } from '../utils/audioContext';

// ── Note frequencies (Hz) ────────────────────────────────────
const C3=130.81, D3=146.83, E3=164.81, G3=196, A3=220, B3=246.94;
const C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392, A4=440, B4=493.88;
const C5=523.25, D5=587.33, E5=659.25;

interface Theme {
  notes: number[];   // melody — 0 = rest
  noteDur: number;   // seconds per step
  gapRatio: number;  // note on-time / step
  bass: number;      // drone Hz (0 = none)
  bassVol: number;
  melVol: number;
  wave: OscillatorType;
}

const THEMES: Record<string, Theme> = {
  title:  { notes:[C4,E4,G4,E4,C4,0,G3,0],     noteDur:0.65, gapRatio:0.75, bass:C3,  bassVol:0.04, melVol:0.035, wave:'sine'     },
  world1: { notes:[C4,E4,G4,C5,G4,E4,C4,0],    noteDur:0.38, gapRatio:0.70, bass:C3,  bassVol:0.04, melVol:0.04,  wave:'square'   },
  world2: { notes:[G4,B4,D5,B4,G4,D4,B3,0],    noteDur:0.50, gapRatio:0.78, bass:G3,  bassVol:0.04, melVol:0.04,  wave:'triangle' },
  world3: { notes:[D4,F4,A4,0,C5,A4,F4,D4],    noteDur:0.55, gapRatio:0.65, bass:D3,  bassVol:0.04, melVol:0.04,  wave:'sine'     },
  world4: { notes:[E4,G4,B4,E5,D5,B4,G4,0],    noteDur:0.35, gapRatio:0.68, bass:E3,  bassVol:0.04, melVol:0.045, wave:'sawtooth' },
  world5: { notes:[A3,C4,E4,G4,E4,C4,A3,0],    noteDur:0.50, gapRatio:0.75, bass:A3,  bassVol:0.05, melVol:0.05,  wave:'triangle' },
  final:  { notes:[C4,E4,G4,C5,E5,C5,G4,E4],   noteDur:0.45, gapRatio:0.80, bass:C3,  bassVol:0.04, melVol:0.05,  wave:'sine'     },
};

const SCHEDULE_AHEAD = 0.15;
const TICK_MS = 50;

function themeKey(screen: string, world: number): string {
  if (screen === 'final') return 'final';
  if (['worldMap', 'level', 'boss'].includes(screen)) return `world${world}`;
  return 'title';
}

export function useBackgroundMusic() {
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const screen       = useGameStore((s) => s.screen);
  const currentWorld = useGameStore((s) => s.currentWorld);

  const tickRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTime   = useRef(0);
  const noteIdx    = useRef(0);
  const bassRef    = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);
  const masterRef  = useRef<GainNode | null>(null);
  const themeRef   = useRef<Theme | null>(null);

  function getMaster(ctx: AudioContext): GainNode {
    if (!masterRef.current) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.connect(ctx.destination);
      masterRef.current = g;
    }
    return masterRef.current;
  }

  function stopAll(fadeMs = 500) {
    if (tickRef.current !== null) { clearInterval(tickRef.current); tickRef.current = null; }
    const ctx = getAudioContext();
    const t = ctx?.currentTime ?? 0;
    const fadeSec = fadeMs / 1000;
    if (bassRef.current) {
      try { bassRef.current.gain.gain.linearRampToValueAtTime(0, t + fadeSec); } catch {}
      try { bassRef.current.osc.stop(t + fadeSec + 0.05); } catch {}
      bassRef.current = null;
    }
    if (masterRef.current && ctx) {
      try {
        masterRef.current.gain.cancelScheduledValues(t);
        masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, t);
        masterRef.current.gain.linearRampToValueAtTime(0, t + fadeSec);
      } catch {}
    }
  }

  function startTheme(key: string) {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state !== 'running') ctx.resume();

    const theme = THEMES[key] ?? THEMES.title;
    themeRef.current = theme;
    noteIdx.current  = 0;
    nextTime.current = ctx.currentTime + 0.25;

    const master = getMaster(ctx);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 1.8);

    if (theme.bass > 0) {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(theme.bass, ctx.currentTime);
      gain.gain.setValueAtTime(theme.bassVol, ctx.currentTime);
      osc.connect(gain);
      gain.connect(master);
      osc.start(ctx.currentTime);
      bassRef.current = { osc, gain };
    }

    tickRef.current = setInterval(() => {
      const c = getAudioContext();
      if (!c || !themeRef.current) return;
      if (c.state !== 'running') c.resume();
      const th = themeRef.current;
      while (nextTime.current < c.currentTime + SCHEDULE_AHEAD) {
        const freq = th.notes[noteIdx.current % th.notes.length];
        noteIdx.current++;
        if (freq > 0) {
          const osc  = c.createOscillator();
          const gain = c.createGain();
          const dur  = th.noteDur * th.gapRatio;
          osc.type = th.wave;
          osc.frequency.setValueAtTime(freq, nextTime.current);
          gain.gain.setValueAtTime(th.melVol, nextTime.current);
          gain.gain.exponentialRampToValueAtTime(0.001, nextTime.current + dur);
          osc.connect(gain);
          gain.connect(masterRef.current ?? c.destination);
          osc.start(nextTime.current);
          osc.stop(nextTime.current + dur + 0.02);
        }
        nextTime.current += th.noteDur;
      }
    }, TICK_MS);
  }

  useEffect(() => {
    if (!audioEnabled || screen === 'loading') {
      stopAll();
      return;
    }
    const key = themeKey(screen, currentWorld);
    stopAll(400);
    const t = setTimeout(() => startTheme(key), 450);
    return () => { clearTimeout(t); stopAll(300); };
  }, [audioEnabled, screen, currentWorld]); // eslint-disable-line react-hooks/exhaustive-deps
}
