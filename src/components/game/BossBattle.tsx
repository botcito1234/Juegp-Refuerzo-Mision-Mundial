import React, { useState, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getWorldById } from '../../config/worlds';
import { HUD } from '../ui/HUD';
import { ExplanationPanel } from '../ui/ExplanationPanel';
import { useAudio } from '../../hooks/useAudio';
import { useSpeech } from '../../hooks/useSpeech';
import { GAME_CONFIG } from '../../config/gameConfig';
import type { BossVariant, WorldId } from '../../types';

type Phase = 'intro' | 'question' | 'explanation' | 'defeated' | 'lost';

export const BossBattle: React.FC = () => {
  const currentWorld = useGameStore((s) => s.currentWorld) as WorldId;
  const bossQuestions = useGameStore((s) => s.bossQuestions) as BossVariant[];
  const bossQuestionIndex = useGameStore((s) => s.bossQuestionIndex);
  const bossCorrectAnswers = useGameStore((s) => s.bossCorrectAnswers);
  const bossQuestionsAnswered = useGameStore((s) => s.bossQuestionsAnswered);
  const answerBossQuestion = useGameStore((s) => s.answerBossQuestion);
  const nextBossQuestion = useGameStore((s) => s.nextBossQuestion);
  const startBoss = useGameStore((s) => s.startBoss);
  const goToWorldMap = useGameStore((s) => s.goToWorldMap);
  const endGame = useGameStore((s) => s.endGame);
  const defeatedBosses = useGameStore((s) => s.defeatedBosses);

  const [phase, setPhase] = useState<Phase>('intro');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const { playCorrect, playWrong, playBossDefeated } = useAudio();
  const { speak, cancel } = useSpeech();

  const world = getWorldById(currentWorld);
  if (!world) return null;

  const currentQ = bossQuestions[bossQuestionIndex];
  const questionsLeft = GAME_CONFIG.BOSS_QUESTIONS_COUNT - bossQuestionsAnswered;
  const correctAnswerOption = currentQ?.options.find((o) => o.id === currentQ.correctOptionId);

  const handleStart = () => {
    speak(`¡Batalla contra ${world.bossName}! Responde ${GAME_CONFIG.BOSS_QUESTIONS_TO_WIN} de ${GAME_CONFIG.BOSS_QUESTIONS_COUNT} para vencer.`);
    setStartTime(Date.now());
    setSelectedOption(null);
    setPhase('question');
  };

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (selectedOption !== null) return;
      const elapsed = (Date.now() - startTime) / 1000;
      setSelectedOption(optionId);

      const correct = optionId === currentQ.correctOptionId;
      const internalId = correct ? '__correct__' : '__wrong__';
      const { bossDefeated, bossLost } = answerBossQuestion(internalId);

      setLastCorrect(correct);
      correct ? playCorrect() : playWrong();
      setPhase('explanation');

      if (bossDefeated) {
        setTimeout(() => {
          playBossDefeated();
          setPhase('defeated');
        }, 2200);
      } else if (bossLost) {
        setTimeout(() => setPhase('lost'), 2200);
      }
    },
    [currentQ, selectedOption, startTime, answerBossQuestion, playCorrect, playWrong, playBossDefeated],
  );

  const handleExplanationContinue = useCallback(() => {
    cancel();
    if (phase === 'explanation') {
      const state = useGameStore.getState();
      const answered = state.bossQuestionsAnswered;
      if (answered < GAME_CONFIG.BOSS_QUESTIONS_COUNT) {
        nextBossQuestion();
        setSelectedOption(null);
        setStartTime(Date.now());
        setPhase('question');
      }
      // bossDefeated/lost handled by phase state set in handleAnswer
    }
  }, [phase, nextBossQuestion, cancel]);

  const handleRetry = () => {
    cancel();
    startBoss(currentWorld);
    setPhase('intro');
    setSelectedOption(null);
  };

  const handleContinue = () => {
    cancel();
    if (currentWorld === 5) {
      endGame();
    } else {
      goToWorldMap();
    }
  };

  const bossEmojis = ['🤖', '🐉', '👻', '🧙', '💀'];
  const bossEmoji = bossEmojis[currentWorld - 1];

  // ── Intro ─────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div style={styles.container}>
        <HUD />
        <div style={{ ...styles.scene, background: `linear-gradient(160deg, ${world.bgGradient[0]}, ${world.bgGradient[1]})` }}>
          <div style={styles.bossIntro}>
            <div style={{ fontSize: 80, animation: 'pulse 1s infinite alternate' }}>{bossEmoji}</div>
            <h2 style={{ color: '#de4a4a', fontSize: 24, fontWeight: 900, margin: '8px 0 4px' }}>
              {world.bossName}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0, textAlign: 'center', maxWidth: 280 }}>
              {world.bossDescription}
            </p>
            <div style={styles.bossStats}>
              <span style={styles.statItem}>❓ {GAME_CONFIG.BOSS_QUESTIONS_COUNT} preguntas</span>
              <span style={styles.statItem}>✅ Necesitas {GAME_CONFIG.BOSS_QUESTIONS_TO_WIN} aciertos</span>
            </div>
            <button style={styles.fightBtn} onClick={handleStart}>
              ⚔️ ¡PELEAR!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Defeated ──────────────────────────────────────────────
  if (phase === 'defeated') {
    return (
      <div style={styles.container}>
        <HUD />
        <div style={styles.resultScreen}>
          <div style={{ fontSize: 72 }}>🏆</div>
          <h2 style={{ color: '#f5c518', fontSize: 26, fontWeight: 900, margin: '12px 0 8px' }}>
            ¡{world.bossName} derrotado!
          </h2>
          <p style={{ color: '#87ceeb', fontSize: 15, margin: '0 0 20px', textAlign: 'center' }}>
            Respondiste {bossCorrectAnswers} de {GAME_CONFIG.BOSS_QUESTIONS_COUNT} correctamente.
          </p>
          <p style={{ color: '#f5c518', fontSize: 20, fontWeight: 800 }}>
            +{GAME_CONFIG.BOSS_DEFEAT_POINTS[currentWorld] ?? 0} puntos
          </p>
          <button style={styles.continueBtn} onClick={handleContinue}>
            {currentWorld === 5 ? '🎉 Ver resultados finales' : '→ Continuar aventura'}
          </button>
        </div>
      </div>
    );
  }

  // ── Lost ──────────────────────────────────────────────────
  if (phase === 'lost') {
    return (
      <div style={styles.container}>
        <HUD />
        <div style={styles.resultScreen}>
          <div style={{ fontSize: 72 }}>💔</div>
          <h2 style={{ color: '#de4a4a', fontSize: 24, fontWeight: 900, margin: '12px 0 8px' }}>
            ¡El {world.bossName} te venció!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: '0 0 6px', textAlign: 'center' }}>
            Solo necesitabas {GAME_CONFIG.BOSS_QUESTIONS_TO_WIN} de {GAME_CONFIG.BOSS_QUESTIONS_COUNT}. ¡Vuelve a intentarlo!
          </p>
          <p style={{ color: '#87ceeb', fontSize: 13, margin: '0 0 20px', textAlign: 'center' }}>
            Tu puntuación acumulada se mantiene. Los 6 niveles del mundo no se reinician.
          </p>
          <button style={{ ...styles.continueBtn, background: 'linear-gradient(135deg, #de4a4a, #6e1a1a)' }} onClick={handleRetry}>
            ⚔️ Reintentar jefe
          </button>
        </div>
      </div>
    );
  }

  // ── Question ─────────────────────────────────────────────
  return (
    <div style={styles.container}>
      <HUD />

      <div style={{ ...styles.scene, background: `linear-gradient(160deg, ${world.bgGradient[0]}, ${world.bgGradient[1]})` }}>
        <div style={styles.bossHeader}>
          <span style={{ fontSize: 40 }}>{bossEmoji}</span>
          <div>
            <div style={{ color: '#de4a4a', fontWeight: 800, fontSize: 14 }}>{world.bossName}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
              Pregunta {bossQuestionsAnswered + 1}/{GAME_CONFIG.BOSS_QUESTIONS_COUNT} · Aciertos: {bossCorrectAnswers}
            </div>
          </div>
        </div>

        {/* Boss health bar */}
        <div style={styles.bossHpBar}>
          {Array.from({ length: GAME_CONFIG.BOSS_QUESTIONS_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.hpSegment,
                background: i < bossCorrectAnswers ? '#4caf50' : i < bossQuestionsAnswered ? '#de4a4a' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={styles.questionArea}>
        {currentQ && (
          <div style={{ padding: '14px 14px 0' }}>
            <div style={styles.bossQHeader}>
              <span style={styles.bossQNum}>Pregunta {bossQuestionsAnswered + 1}</span>
              <span style={styles.bossQTag}>BATALLA JEFE</span>
            </div>
            <div style={styles.statementBox}>
              <p style={styles.statement}>{currentQ.statement}</p>
            </div>
            <div style={styles.options}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    style={{
                      ...styles.option,
                      background: isSelected ? 'rgba(222,74,74,0.25)' : 'rgba(255,255,255,0.04)',
                      borderColor: isSelected ? '#de4a4a' : 'rgba(255,255,255,0.12)',
                    }}
                    onClick={() => handleAnswer(opt.id)}
                    disabled={selectedOption !== null}
                  >
                    <span style={{ ...styles.optLabel, background: isSelected ? '#de4a4a' : 'rgba(255,255,255,0.1)', color: '#fff' }}>
                      {opt.id.toUpperCase()}
                    </span>
                    <span style={styles.optText}>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Explanation overlay */}
      {phase === 'explanation' && currentQ && (
        <ExplanationPanel
          correct={lastCorrect}
          correctOptionText={correctAnswerOption?.text ?? ''}
          explanation={lastCorrect ? '¡Bien! Esa es la respuesta correcta.' : `La respuesta era: ${correctAnswerOption?.text}`}
          onContinue={handleExplanationContinue}
          worldColor="#de4a4a"
          showLifeLost={false}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0a1628' },
  scene: { height: 150, flexShrink: 0, padding: '12px 16px' },
  bossIntro: {
    height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 10,
  },
  bossStats: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  statItem: {
    background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '4px 12px',
    color: '#87ceeb', fontSize: 12, fontWeight: 600,
  },
  fightBtn: {
    padding: '14px 40px', fontSize: 18, fontWeight: 900,
    background: 'linear-gradient(135deg, #de4a4a, #6e1a1a)',
    color: '#fff', border: 'none', borderRadius: 50, cursor: 'pointer',
    marginTop: 8, touchAction: 'manipulation',
  },
  bossHeader: { display: 'flex', alignItems: 'center', gap: 12 },
  bossHpBar: { display: 'flex', gap: 6, marginTop: 10 },
  hpSegment: { flex: 1, height: 8, borderRadius: 4, transition: 'background 0.3s' },
  resultScreen: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: 32, gap: 8,
  },
  continueBtn: {
    padding: '16px 36px', fontSize: 16, fontWeight: 800, marginTop: 12,
    background: 'linear-gradient(135deg, #f5c518, #e8762b)',
    color: '#0d1f3c', border: 'none', borderRadius: 50, cursor: 'pointer',
    touchAction: 'manipulation',
  },
  questionArea: { flex: 1, overflowY: 'auto' },
  bossQHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  bossQNum: { color: '#87ceeb', fontSize: 12, fontWeight: 700 },
  bossQTag: {
    background: 'rgba(222,74,74,0.2)', color: '#de4a4a', fontSize: 10,
    padding: '3px 10px', borderRadius: 99, fontWeight: 800, letterSpacing: '0.08em',
  },
  statementBox: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)',
    padding: '16px 18px', marginBottom: 12,
  },
  statement: { color: '#e8f4fd', fontSize: 16, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line', fontWeight: 500 },
  options: { display: 'flex', flexDirection: 'column', gap: 8 },
  option: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
    border: '2px solid', borderRadius: 14, cursor: 'pointer', transition: 'all 0.18s', touchAction: 'manipulation',
    textAlign: 'left',
  },
  optLabel: {
    width: 28, height: 28, borderRadius: 8, fontWeight: 800, fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  optText: { color: '#e8f4fd', fontSize: 15, fontWeight: 500, lineHeight: 1.4 },
};
