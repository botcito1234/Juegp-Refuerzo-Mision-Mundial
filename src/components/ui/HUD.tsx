import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useGameTimer } from '../../hooks/useGameTimer';
import { GAME_CONFIG } from '../../config/gameConfig';

// ── Lives display ─────────────────────────────────────────
const Hearts: React.FC<{ lives: number }> = ({ lives }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {Array.from({ length: GAME_CONFIG.INITIAL_LIVES }).map((_, i) => (
      <span key={i} style={{ fontSize: 18, filter: i < lives ? 'none' : 'grayscale(1) opacity(0.3)' }}>
        ❤️
      </span>
    ))}
  </div>
);

// ── HUD bar ───────────────────────────────────────────────
export const HUD: React.FC = () => {
  const lives = useGameStore((s) => s.lives);
  const score = useGameStore((s) => s.score);
  const streak = useGameStore((s) => s.streak);
  const currentWorld = useGameStore((s) => s.currentWorld);
  const currentLevel = useGameStore((s) => s.currentLevel);
  const isBossBattle = useGameStore((s) => s.isBossBattle);
  const toggleAudio = useGameStore((s) => s.toggleAudio);
  const toggleVoice = useGameStore((s) => s.toggleVoice);
  const audioEnabled = useGameStore((s) => s.audioEnabled);
  const voiceEnabled = useGameStore((s) => s.voiceEnabled);
  const timer = useGameTimer();

  const worldLevelInWorld = ((currentLevel - 1) % 6) + 1;

  return (
    <div style={styles.hud}>
      <div style={styles.topRow}>
        {/* Left: world + level */}
        <div style={styles.leftBlock}>
          <span style={styles.worldLabel}>Mundo {currentWorld}</span>
          <span style={styles.levelLabel}>
            {isBossBattle ? '👑 JEFE' : `Nv. ${worldLevelInWorld}/6`}
          </span>
        </div>

        {/* Center: score */}
        <div style={styles.scoreBlock}>
          <span style={styles.scoreLabel}>★</span>
          <span style={styles.scoreValue}>{score.toLocaleString()}</span>
        </div>

        {/* Right: controls */}
        <div style={styles.rightBlock}>
          <button style={styles.iconBtn} onClick={toggleAudio} aria-label="Sonido">
            {audioEnabled ? '🔊' : '🔇'}
          </button>
          <button style={styles.iconBtn} onClick={toggleVoice} aria-label="Voz">
            {voiceEnabled ? '🗣️' : '🚫'}
          </button>
        </div>
      </div>

      <div style={styles.bottomRow}>
        <Hearts lives={lives} />
        <div style={styles.timerBlock}>
          <span style={styles.timerIcon}>⏱️</span>
          <span style={styles.timerValue}>{timer}</span>
        </div>
        {streak >= 2 && (
          <div style={styles.streakBadge}>
            🔥 ×{streak}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  hud: {
    background: 'rgba(10,20,50,0.92)',
    borderBottom: '1px solid rgba(74,158,222,0.2)',
    padding: '8px 14px 6px',
    flexShrink: 0,
    backdropFilter: 'blur(8px)',
  },
  topRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 6,
  },
  leftBlock: { display: 'flex', flexDirection: 'column', gap: 1 },
  worldLabel: { color: '#87ceeb', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' },
  levelLabel: { color: '#f5c518', fontSize: 13, fontWeight: 800 },
  scoreBlock: { display: 'flex', alignItems: 'center', gap: 4 },
  scoreLabel: { color: '#f5c518', fontSize: 14 },
  scoreValue: { color: '#fff', fontSize: 16, fontWeight: 800, letterSpacing: '0.02em' },
  rightBlock: { display: 'flex', gap: 4 },
  iconBtn: {
    background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8,
    padding: '4px 8px', fontSize: 16, cursor: 'pointer', touchAction: 'manipulation',
  },
  bottomRow: { display: 'flex', alignItems: 'center', gap: 12 },
  timerBlock: { display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' },
  timerIcon: { fontSize: 12 },
  timerValue: { color: '#87ceeb', fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
  streakBadge: {
    background: 'rgba(232,118,43,0.25)', border: '1px solid rgba(232,118,43,0.4)',
    borderRadius: 99, padding: '2px 10px', color: '#e8762b', fontSize: 12, fontWeight: 800,
  },
};
