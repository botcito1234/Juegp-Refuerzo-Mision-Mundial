import React, { useState, useEffect, useRef } from 'react';
import type { MathProblem, Option } from '../../types';

interface QuestionPanelProps {
  problem: MathProblem;
  onAnswer: (optionId: string, elapsedSeconds: number) => void;
  disabled?: boolean;
  worldColor?: string;
}

export const QuestionPanel: React.FC<QuestionPanelProps> = ({
  problem,
  onAnswer,
  disabled = false,
  worldColor = '#4a9ede',
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    setSelected(null);
    startRef.current = Date.now();
  }, [problem.id]);

  const handleSelect = (opt: Option) => {
    if (disabled || selected !== null) return;
    setSelected(opt.id);
    const elapsed = (Date.now() - startRef.current) / 1000;
    onAnswer(opt.id, elapsed);
  };

  const diffColor = { easy: '#4caf50', medium: '#f5c518', hard: '#de4a4a' }[problem.difficulty];

  return (
    <div style={styles.container}>
      {/* Header info */}
      <div style={styles.header}>
        <span style={styles.levelBadge}>Nivel {problem.level}</span>
        <span style={{ ...styles.diffBadge, background: diffColor + '25', color: diffColor, borderColor: diffColor + '50' }}>
          {problem.difficulty === 'easy' ? 'Fácil' : problem.difficulty === 'medium' ? 'Medio' : 'Difícil'}
        </span>
        <span style={styles.topic}>{problem.topic}</span>
      </div>

      {/* Statement */}
      <div style={styles.statementBox}>
        <p style={styles.statement}>{problem.statement}</p>
        {problem.contextNote && (
          <p style={styles.contextNote}>ℹ️ {problem.contextNote}</p>
        )}
      </div>

      {/* Options */}
      <div style={styles.options}>
        {problem.options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              style={{
                ...styles.option,
                background: isSelected
                  ? worldColor + '30'
                  : 'rgba(255,255,255,0.04)',
                borderColor: isSelected ? worldColor : 'rgba(255,255,255,0.12)',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              }}
              onClick={() => handleSelect(opt)}
              disabled={disabled || selected !== null}
            >
              <span style={{ ...styles.optLabel, background: isSelected ? worldColor : 'rgba(255,255,255,0.1)', color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                {opt.id.toUpperCase()}
              </span>
              <span style={styles.optText}>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!problem.validated && (
        <div style={styles.pendingNote}>
          ⚠️ Este problema está pendiente de validación por el docente.
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex', flexDirection: 'column', gap: 12, padding: '14px 14px 0',
  },
  header: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  levelBadge: {
    background: 'rgba(74,158,222,0.2)', color: '#87ceeb', fontSize: 11,
    padding: '3px 10px', borderRadius: 99, fontWeight: 700,
  },
  diffBadge: {
    fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 700,
    border: '1px solid',
  },
  topic: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  statementBox: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)', padding: '16px 18px',
  },
  statement: {
    color: '#e8f4fd', fontSize: 16, margin: 0, lineHeight: 1.6,
    whiteSpace: 'pre-line', fontWeight: 500,
  },
  contextNote: { color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: '10px 0 0', fontStyle: 'italic' },
  options: { display: 'flex', flexDirection: 'column', gap: 8 },
  option: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 16px', border: '2px solid', borderRadius: 14,
    cursor: 'pointer', transition: 'all 0.18s', touchAction: 'manipulation',
    textAlign: 'left',
  },
  optLabel: {
    width: 28, height: 28, borderRadius: 8, fontWeight: 800, fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    transition: 'all 0.18s',
  },
  optText: { color: '#e8f4fd', fontSize: 15, fontWeight: 500, lineHeight: 1.4 },
  pendingNote: {
    background: 'rgba(255,200,0,0.1)', border: '1px solid rgba(255,200,0,0.2)',
    borderRadius: 10, padding: '8px 12px', color: '#f5c518', fontSize: 12,
  },
};
