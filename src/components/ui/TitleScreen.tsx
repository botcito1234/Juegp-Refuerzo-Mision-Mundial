import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useAudio } from '../../hooks/useAudio';
import { Logo } from './Logo';

export const TitleScreen: React.FC = () => {
  const goTo = useGameStore((s) => s.goTo);
  const { resume, playClick } = useAudio();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 900);
    return () => clearInterval(t);
  }, []);

  const handleStart = async () => {
    await resume();
    playClick();
    goTo('warning');
  };

  return (
    <div style={styles.container}>
      <div style={styles.bg} />
      <div style={styles.content}>
        <Logo size="lg" variant="light" />

        <div style={styles.titleBlock}>
          <h1 style={styles.mainTitle}>MISIÓN MUNDIAL</h1>
          <div style={styles.titleLine} />
          <h2 style={styles.subTitle}>⚔ Desafío Matemático ⚔</h2>
        </div>

        <div style={styles.worldsPreview}>
          {['🏙️', '🌳', '🏜️', '🔬', '🏰'].map((icon, i) => (
            <span key={i} style={{ ...styles.worldIcon, animationDelay: `${i * 0.15}s` }}>
              {icon}
            </span>
          ))}
        </div>

        <p style={styles.tagline}>
          5 mundos · 30 desafíos · 5 jefes épicos
        </p>

        <button
          style={{
            ...styles.startBtn,
            transform: pulse ? 'scale(1.04)' : 'scale(1)',
            boxShadow: pulse
              ? '0 0 30px rgba(245,197,24,0.6)'
              : '0 4px 20px rgba(245,197,24,0.3)',
          }}
          onClick={handleStart}
        >
          ▶ INICIAR MISIÓN
        </button>

        <p style={styles.footer}>Colegio Mundial · 3° Secundaria</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%', position: 'relative',
    background: 'linear-gradient(160deg, #0a0f2e 0%, #1a3a6e 60%, #0d2a5e 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 50% 30%, rgba(74,158,222,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 20, padding: '24px 20px', maxWidth: 440, width: '100%', zIndex: 1,
  },
  titleBlock: { textAlign: 'center' },
  mainTitle: {
    color: '#f5c518', fontSize: 36, fontWeight: 900, margin: '8px 0 4px',
    textShadow: '0 0 30px rgba(245,197,24,0.5), 0 2px 4px rgba(0,0,0,0.5)',
    letterSpacing: '0.05em',
  },
  titleLine: {
    height: 2, background: 'linear-gradient(90deg, transparent, #f5c518, transparent)',
    margin: '4px 0',
  },
  subTitle: {
    color: '#87ceeb', fontSize: 16, fontWeight: 600, margin: '4px 0',
    letterSpacing: '0.1em',
  },
  worldsPreview: { display: 'flex', gap: 16, fontSize: 32 },
  worldIcon: { display: 'inline-block', animation: 'float 2s ease-in-out infinite alternate' },
  tagline: { color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: 0 },
  startBtn: {
    padding: '18px 40px', fontSize: 20, fontWeight: 800,
    background: 'linear-gradient(135deg, #f5c518, #e8762b)',
    color: '#0d1f3c', border: 'none', borderRadius: 50,
    cursor: 'pointer', letterSpacing: '0.05em',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    minWidth: 240, touchAction: 'manipulation',
  },
  footer: { color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: 0 },
};
