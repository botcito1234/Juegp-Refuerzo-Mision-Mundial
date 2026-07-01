import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { useAudio } from '../../hooks/useAudio';

export const WarningScreen: React.FC = () => {
  const startAdventure = useGameStore((s) => s.startAdventure);
  const goTo = useGameStore((s) => s.goTo);
  const { playClick } = useAudio();

  const handleStart = () => {
    playClick();
    goTo('intro');
    // startAdventure is called after the intro, when gameplay actually begins
  };

  const handleBack = () => {
    playClick();
    goTo('title');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconRow}>⚠️</div>
        <h2 style={styles.title}>¡Advertencia Importante!</h2>

        <div style={styles.warningBox}>
          <p style={styles.warningText}>
            <strong>No salgas, minimices ni recargues la página.</strong>
          </p>
          <p style={styles.warningText}>
            Si abandonas la misión —cambiando de pestaña, minimizando el navegador
            o recargando— <strong>todo el progreso de la partida se reiniciará</strong>.
          </p>
          <p style={styles.warningText}>
            No se guarda ningún dato entre sesiones. Cada vez que juegues empezarás
            desde cero.
          </p>
        </div>

        <ul style={styles.rules}>
          <li style={styles.rule}>🕹️ Completa los 5 mundos sin cerrar el navegador</li>
          <li style={styles.rule}>❤️ Tienes 3 vidas por mundo</li>
          <li style={styles.rule}>🏆 Derrota a los 5 jefes para completar la misión</li>
          <li style={styles.rule}>⏱️ El cronómetro nunca se detiene</li>
        </ul>

        <div style={styles.buttons}>
          <button style={styles.backBtn} onClick={handleBack}>
            ← Volver
          </button>
          <button style={styles.confirmBtn} onClick={handleStart}>
            ✔ Entiendo, iniciar misión
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%', overflow: 'auto',
    background: 'linear-gradient(160deg, #0a0f2e 0%, #1a3a6e 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 16,
  },
  card: {
    background: 'rgba(255,255,255,0.05)', borderRadius: 20,
    border: '1px solid rgba(255,200,0,0.3)', padding: 28,
    maxWidth: 460, width: '100%', display: 'flex', flexDirection: 'column', gap: 16,
  },
  iconRow: { fontSize: 48, textAlign: 'center' },
  title: { color: '#f5c518', fontSize: 22, fontWeight: 800, margin: 0, textAlign: 'center' },
  warningBox: {
    background: 'rgba(232,118,43,0.15)', border: '1px solid rgba(232,118,43,0.4)',
    borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
  },
  warningText: { color: '#ffe0b2', fontSize: 14, margin: 0, lineHeight: 1.5 },
  rules: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  rule: { color: '#87ceeb', fontSize: 14, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  buttons: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  backBtn: {
    flex: 1, minWidth: 100, padding: '14px 16px', fontSize: 14, fontWeight: 600,
    background: 'rgba(255,255,255,0.08)', color: '#87ceeb',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50,
    cursor: 'pointer', touchAction: 'manipulation',
  },
  confirmBtn: {
    flex: 2, minWidth: 180, padding: '14px 16px', fontSize: 14, fontWeight: 800,
    background: 'linear-gradient(135deg, #f5c518, #e8762b)',
    color: '#0d1f3c', border: 'none', borderRadius: 50,
    cursor: 'pointer', touchAction: 'manipulation',
  },
};
