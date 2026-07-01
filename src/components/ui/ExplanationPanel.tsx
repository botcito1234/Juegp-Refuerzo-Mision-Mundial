import React, { useEffect } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import type { ScoreEvent } from '../../types';

interface ExplanationPanelProps {
  correct: boolean;
  correctOptionText: string;
  explanation: string;
  scoreEvents?: ScoreEvent[];
  onContinue: () => void;
  worldColor?: string;
  showLifeLost?: boolean;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  correct,
  correctOptionText,
  explanation,
  scoreEvents = [],
  onContinue,
  worldColor = '#4a9ede',
  showLifeLost = true,
}) => {
  const { speak } = useSpeech();

  useEffect(() => {
    const msg = correct
      ? `¡Correcto! ${explanation}`
      : `La respuesta correcta es: ${correctOptionText}. ${explanation}`;
    speak(msg, 1.0);
  }, []);

  const totalPoints = scoreEvents.reduce((s, e) => s + e.points, 0);

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        {/* Result banner */}
        <div
          style={{
            ...styles.banner,
            background: correct
              ? 'linear-gradient(135deg, rgba(76,175,80,0.25), rgba(76,175,80,0.1))'
              : 'linear-gradient(135deg, rgba(222,74,74,0.25), rgba(222,74,74,0.1))',
            borderColor: correct ? '#4caf50' : '#de4a4a',
          }}
        >
          <span style={styles.resultIcon}>{correct ? '✅' : '❌'}</span>
          <div>
            <p style={{ ...styles.resultTitle, color: correct ? '#4caf50' : '#de4a4a' }}>
              {correct ? '¡Respuesta Correcta!' : '¡Incorrecto!'}
            </p>
            {!correct && (
              <p style={styles.correctAnswer}>
                Respuesta correcta: <strong>{correctOptionText}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Score events */}
        {correct && scoreEvents.length > 0 && (
          <div style={styles.eventsBox}>
            {scoreEvents.map((e, i) => (
              <div key={i} style={styles.eventRow}>
                <span style={styles.eventLabel}>{e.label}</span>
                <span style={styles.eventPoints}>+{e.points}</span>
              </div>
            ))}
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total obtenido</span>
              <span style={styles.totalPoints}>+{totalPoints}</span>
            </div>
          </div>
        )}

        {!correct && showLifeLost && (
          <div style={styles.lifeLostNote}>
            ❤️ Perdiste una vida. ¡No te rindas!
          </div>
        )}

        {/* Explanation */}
        <div style={styles.explanationBox}>
          <p style={styles.explanationTitle}>💡 Explicación:</p>
          <p style={styles.explanationText}>{explanation}</p>
        </div>

        <button
          style={{
            ...styles.continueBtn,
            background: correct
              ? `linear-gradient(135deg, ${worldColor}, #1a3a6e)`
              : 'linear-gradient(135deg, #4a4a6e, #2a2a4e)',
          }}
          onClick={onContinue}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    zIndex: 100, padding: '0 0 0 0',
  },
  panel: {
    background: '#0d1f3c', borderTop: '1px solid rgba(74,158,222,0.3)',
    borderRadius: '20px 20px 0 0', padding: '24px 20px',
    width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 14,
    maxHeight: '80vh', overflowY: 'auto',
  },
  banner: {
    display: 'flex', alignItems: 'center', gap: 14,
    border: '1px solid', borderRadius: 14, padding: '14px 16px',
  },
  resultIcon: { fontSize: 32, flexShrink: 0 },
  resultTitle: { fontSize: 18, fontWeight: 800, margin: 0 },
  correctAnswer: { color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' },
  eventsBox: {
    background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.15)',
    borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 6,
  },
  eventRow: { display: 'flex', justifyContent: 'space-between' },
  eventLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  eventPoints: { color: '#4caf50', fontSize: 13, fontWeight: 700 },
  totalRow: {
    display: 'flex', justifyContent: 'space-between',
    borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 6, marginTop: 4,
  },
  totalLabel: { color: '#f5c518', fontSize: 13, fontWeight: 700 },
  totalPoints: { color: '#f5c518', fontSize: 15, fontWeight: 900 },
  lifeLostNote: {
    background: 'rgba(222,74,74,0.1)', border: '1px solid rgba(222,74,74,0.2)',
    borderRadius: 10, padding: '10px 14px', color: '#ef9a9a', fontSize: 13,
  },
  explanationBox: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)', padding: '14px 16px',
  },
  explanationTitle: { color: '#f5c518', fontSize: 13, fontWeight: 700, margin: '0 0 6px' },
  explanationText: { color: '#c5e0f7', fontSize: 14, margin: 0, lineHeight: 1.6 },
  continueBtn: {
    width: '100%', padding: '16px', fontSize: 16, fontWeight: 800,
    color: '#fff', border: 'none', borderRadius: 50,
    cursor: 'pointer', touchAction: 'manipulation',
  },
};
