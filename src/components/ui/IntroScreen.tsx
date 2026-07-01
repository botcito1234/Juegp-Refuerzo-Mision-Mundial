import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { useSpeech } from '../../hooks/useSpeech';
import { useAudio } from '../../hooks/useAudio';

const STORY_SLIDES = [
  {
    icon: '🌍',
    title: '¡Una amenaza matemática!',
    text: 'El Gran Razonador ha encerrado el conocimiento matemático en cinco mundos. Solo alguien con verdadero ingenio puede liberarlo.',
  },
  {
    icon: '🤖',
    title: '¡Tú eres la esperanza!',
    text: 'AXIOM, el explorador cuántico del Colegio Mundial, ha sido convocado para esta misión. Con cada problema resuelto, recupera el saber perdido.',
  },
  {
    icon: '🗺️',
    title: 'Cinco mundos te esperan',
    text: 'Ciudad de los Códigos · Bosque de las Proporciones · Desierto de los Criptogramas · Laboratorio del Ingenio · Fortaleza del Razonamiento.',
  },
  {
    icon: '⚔️',
    title: '¡Prepárate, Explorador!',
    text: 'Responde con sabiduría, mantén tu racha y derrota a los 5 jefes. El conocimiento de todos los estudiantes del Colegio Mundial depende de ti.',
  },
];

export const IntroScreen: React.FC = () => {
  const startAdventure = useGameStore((s) => s.startAdventure);
  const { speak, cancel } = useSpeech();
  const { playClick } = useAudio();
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const current = STORY_SLIDES[slide];

  useEffect(() => {
    speak(current.text, 0.95);
    return () => cancel();
  }, [slide]);

  const next = () => {
    if (animating) return;
    playClick();
    if (slide < STORY_SLIDES.length - 1) {
      setAnimating(true);
      setTimeout(() => { setSlide(slide + 1); setAnimating(false); }, 200);
    } else {
      cancel();
      startAdventure();
    }
  };

  const skip = () => {
    cancel();
    startAdventure();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Progress dots */}
        <div style={styles.dots}>
          {STORY_SLIDES.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                background: i === slide ? '#f5c518' : 'rgba(255,255,255,0.2)',
                transform: i === slide ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        <div style={{ ...styles.slideContent, opacity: animating ? 0 : 1, transition: 'opacity 0.2s' }}>
          <div style={styles.icon}>{current.icon}</div>
          <h2 style={styles.title}>{current.title}</h2>
          <p style={styles.text}>{current.text}</p>
        </div>

        {/* AXIOM protagonist preview */}
        <div style={styles.protagonist}>
          <div style={styles.axiomBody}>
            <div style={styles.axiomHead}>🤖</div>
            <div style={styles.axiomName}>AXIOM</div>
            <div style={styles.axiomSub}>Explorador Cuántico</div>
          </div>
          {slide === 3 && (
            <div style={styles.speechBubble}>
              "¡Juntos resolveremos cualquier ecuación!"
            </div>
          )}
        </div>

        <div style={styles.buttons}>
          <button style={styles.skipBtn} onClick={skip}>Saltar intro</button>
          <button style={styles.nextBtn} onClick={next}>
            {slide < STORY_SLIDES.length - 1 ? 'Siguiente →' : '🚀 ¡Comenzar!'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%', overflow: 'auto',
    background: 'linear-gradient(160deg, #0a0f2e 0%, #1a3a6e 50%, #0d2040 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  card: {
    maxWidth: 460, width: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 20, padding: 28,
    background: 'rgba(255,255,255,0.04)', borderRadius: 24,
    border: '1px solid rgba(74,158,222,0.2)',
  },
  dots: { display: 'flex', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: '50%', transition: 'all 0.3s ease' },
  slideContent: { textAlign: 'center' },
  icon: { fontSize: 56, marginBottom: 12 },
  title: { color: '#f5c518', fontSize: 20, fontWeight: 800, margin: '0 0 12px' },
  text: { color: '#c5e0f7', fontSize: 15, lineHeight: 1.6, margin: 0 },
  protagonist: { position: 'relative', display: 'flex', justifyContent: 'center' },
  axiomBody: { textAlign: 'center' },
  axiomHead: { fontSize: 56 },
  axiomName: { color: '#4a9ede', fontWeight: 800, fontSize: 14, marginTop: 4 },
  axiomSub: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  speechBubble: {
    position: 'absolute', right: -20, top: 0,
    background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)',
    borderRadius: 12, padding: '8px 12px', color: '#f5c518', fontSize: 12,
    maxWidth: 160, fontStyle: 'italic',
  },
  buttons: { display: 'flex', gap: 12, width: '100%' },
  skipBtn: {
    flex: 1, padding: '14px 16px', fontSize: 13, fontWeight: 600,
    background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, cursor: 'pointer',
  },
  nextBtn: {
    flex: 2, padding: '14px 16px', fontSize: 15, fontWeight: 800,
    background: 'linear-gradient(135deg, #4a9ede, #1a3a6e)',
    color: '#fff', border: 'none', borderRadius: 50, cursor: 'pointer',
  },
};
