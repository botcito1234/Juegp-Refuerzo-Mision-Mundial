import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Logo } from './Logo';

export const LoadingScreen: React.FC = () => {
  const goTo = useGameStore((s) => s.goTo);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => goTo('title'), 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [goTo]);

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <Logo size="lg" variant="light" />
        <h1 style={styles.title}>Misión Mundial</h1>
        <p style={styles.subtitle}>Desafío Matemático</p>
        <div style={styles.barBg}>
          <div style={{ ...styles.bar, width: `${progress}%` }} />
        </div>
        <p style={styles.loadingText}>
          {progress < 100 ? 'Cargando aventura...' : '¡Listo para la misión!'}
        </p>
        <div style={styles.stars}>
          {['★', '★', '★'].map((s, i) => (
            <span
              key={i}
              style={{
                ...styles.star,
                opacity: progress > i * 33 ? 1 : 0.2,
                transform: progress > i * 33 ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%',
    background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6e 50%, #0d1f3c 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  inner: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    padding: 32, maxWidth: 400, width: '100%',
  },
  title: {
    color: '#f5c518', fontSize: 28, fontWeight: 900, margin: 0,
    textShadow: '0 2px 12px rgba(245,197,24,0.4)',
    letterSpacing: '0.02em',
  },
  subtitle: {
    color: '#87ceeb', fontSize: 16, margin: 0, letterSpacing: '0.1em',
  },
  barBg: {
    width: '100%', height: 12, background: 'rgba(255,255,255,0.1)',
    borderRadius: 99, overflow: 'hidden', marginTop: 8,
  },
  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, #4a9ede, #f5c518)',
    borderRadius: 99,
    transition: 'width 0.1s linear',
  },
  loadingText: { color: '#87ceeb', fontSize: 14, margin: 0 },
  stars: { display: 'flex', gap: 16, marginTop: 8 },
  star: {
    fontSize: 28, color: '#f5c518',
    transition: 'all 0.3s ease',
  },
};
