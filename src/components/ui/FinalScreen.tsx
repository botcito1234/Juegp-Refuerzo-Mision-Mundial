import React, { useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import { buildFinalStats, computeRank, type GameRank } from '../../utils/scoring';
import { getProblemByLevel } from '../../config/problems';
import { WORLDS } from '../../config/worlds';
import { Logo } from './Logo';

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}h ${m}m ${sec}s`
    : `${m}m ${sec}s`;
}

export const FinalScreen: React.FC = () => {
  const score = useGameStore((s) => s.score);
  const worldStats = useGameStore((s) => s.worldStats);
  const timerElapsed = useGameStore((s) => s.timerElapsed);
  const lives = useGameStore((s) => s.lives);
  const bestStreak = useGameStore((s) => s.bestStreak);
  const resetGame = useGameStore((s) => s.resetGame);

  const stats = useMemo(
    () => buildFinalStats(score, worldStats, timerElapsed, lives, bestStreak),
    [score, worldStats, timerElapsed, lives, bestStreak],
  );

  const rank = useMemo<GameRank>(() => computeRank(stats.accuracy, stats.totalScore), [stats]);

  const handleNewMission = () => {
    resetGame();
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollContent}>
        {/* Header */}
        <div style={styles.header}>
          <Logo size="md" variant="light" />
          <div style={styles.victoryBanner}>
            <span style={styles.victoryEmoji}>🏆</span>
            <h1 style={styles.victoryTitle}>¡MISIÓN COMPLETADA!</h1>
            <p style={styles.victorySubtitle}>Has liberado el conocimiento matemático</p>
          </div>
        </div>

        {/* Rank */}
        <div style={styles.rankCard}>
          <span style={styles.rankEmoji}>{rank.emoji}</span>
          <div>
            <p style={styles.rankLabel}>Tu rango</p>
            <p style={styles.rankName}>{rank.label}</p>
            <p style={styles.rankDesc}>{rank.description}</p>
          </div>
        </div>

        {/* Main stats */}
        <div style={styles.statsGrid}>
          <StatCard label="Puntuación Total" value={stats.totalScore.toLocaleString()} icon="⭐" accent="#f5c518" />
          <StatCard label="Precisión" value={`${stats.accuracy}%`} icon="🎯" accent="#4caf50" />
          <StatCard label="Tiempo Total" value={formatTime(stats.totalTimeMs)} icon="⏱️" accent="#87ceeb" />
          <StatCard label="Mejor Racha" value={`×${stats.bestStreak}`} icon="🔥" accent="#e8762b" />
          <StatCard label="Correctas" value={`${stats.correctAnswers}/30`} icon="✅" accent="#4caf50" />
          <StatCard label="Incorrectas" value={`${stats.incorrectAnswers}`} icon="❌" accent="#de4a4a" />
        </div>

        {/* World breakdown */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📊 Rendimiento por Mundo</h3>
          {WORLDS.map((w) => {
            const ws = worldStats.find((s) => s.worldId === w.id);
            if (!ws) return (
              <div key={w.id} style={styles.worldRow}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Mundo {w.id}: {w.name} — No jugado</span>
              </div>
            );
            const correct = ws.levelResults.filter((l) => l.correct).length;
            const total = ws.levelResults.length;
            return (
              <div key={w.id} style={styles.worldRow}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#87ceeb', fontSize: 13, fontWeight: 600 }}>{w.name}</span>
                  <span style={{ color: '#f5c518', fontSize: 13, fontWeight: 700 }}>{correct}/{total}</span>
                </div>
                <div style={styles.worldBar}>
                  <div style={{ ...styles.worldBarFill, width: `${(correct / 6) * 100}%`, background: w.colorSecondary }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Failed problems */}
        {stats.failedProblems.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📚 Problemas para repasar</h3>
            {stats.failedProblems.map((pid) => {
              const p = getProblemByLevel(pid);
              if (!p) return null;
              return (
                <div key={pid} style={styles.failedProblem}>
                  <div style={styles.failedHeader}>
                    <span style={styles.failedNum}>Nivel {p.level}</span>
                    <span style={styles.failedTopic}>{p.topic}</span>
                  </div>
                  <p style={styles.failedStatement}>{p.statement}</p>
                  <p style={styles.failedExplanation}>{p.explanation}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <button style={styles.newMissionBtn} onClick={handleNewMission}>
          🚀 Nueva Misión
        </button>

        <p style={styles.footer}>Colegio Mundial — Misión Mundial: Desafío Matemático</p>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; icon: string; accent: string }> = ({
  label, value, icon, accent,
}) => (
  <div style={{ ...statStyles.card, borderColor: accent + '30' }}>
    <span style={{ fontSize: 22 }}>{icon}</span>
    <span style={{ ...statStyles.value, color: accent }}>{value}</span>
    <span style={statStyles.label}>{label}</span>
  </div>
);

const statStyles: Record<string, React.CSSProperties> = {
  card: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid', borderRadius: 14,
    padding: '14px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  },
  value: { fontSize: 20, fontWeight: 900 },
  label: { color: 'rgba(255,255,255,0.5)', fontSize: 11, textAlign: 'center' },
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%', overflowY: 'auto',
    background: 'linear-gradient(160deg, #0a0f2e 0%, #1a3a6e 60%, #0d2040 100%)',
  },
  scrollContent: {
    maxWidth: 500, margin: '0 auto', padding: '24px 16px 40px',
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  header: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 },
  victoryBanner: { textAlign: 'center' },
  victoryEmoji: { fontSize: 56 },
  victoryTitle: { color: '#f5c518', fontSize: 26, fontWeight: 900, margin: '8px 0 4px', textShadow: '0 0 20px rgba(245,197,24,0.4)' },
  victorySubtitle: { color: '#87ceeb', fontSize: 14, margin: 0 },
  rankCard: {
    background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.25)',
    borderRadius: 18, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
  },
  rankEmoji: { fontSize: 48 },
  rankLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' },
  rankName: { color: '#f5c518', fontSize: 20, fontWeight: 900, margin: '2px 0' },
  rankDesc: { color: '#87ceeb', fontSize: 13, margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 },
  section: { display: 'flex', flexDirection: 'column', gap: 10 },
  sectionTitle: { color: '#f5c518', fontSize: 16, fontWeight: 800, margin: 0 },
  worldRow: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 12,
    padding: '12px 14px',
  },
  worldBar: { height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' },
  worldBarFill: { height: '100%', borderRadius: 99, transition: 'width 0.5s ease' },
  failedProblem: {
    background: 'rgba(222,74,74,0.06)', border: '1px solid rgba(222,74,74,0.15)',
    borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8,
  },
  failedHeader: { display: 'flex', alignItems: 'center', gap: 10 },
  failedNum: {
    background: 'rgba(222,74,74,0.2)', color: '#de4a4a', fontSize: 11,
    padding: '3px 10px', borderRadius: 99, fontWeight: 700,
  },
  failedTopic: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  failedStatement: { color: '#e8f4fd', fontSize: 13, margin: 0, lineHeight: 1.5 },
  failedExplanation: { color: '#87ceeb', fontSize: 12, margin: 0, lineHeight: 1.5, fontStyle: 'italic' },
  newMissionBtn: {
    width: '100%', padding: '18px', fontSize: 18, fontWeight: 900,
    background: 'linear-gradient(135deg, #f5c518, #e8762b)',
    color: '#0d1f3c', border: 'none', borderRadius: 50, cursor: 'pointer',
    touchAction: 'manipulation',
  },
  footer: { color: 'rgba(255,255,255,0.25)', fontSize: 11, textAlign: 'center', margin: 0 },
};
