import React, { useState, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { getProblemByLevel } from '../../config/problems';
import { getWorldById } from '../../config/worlds';
import { QuestionPanel } from '../ui/QuestionPanel';
import { ExplanationPanel } from '../ui/ExplanationPanel';
import { HUD } from '../ui/HUD';
import { useAudio } from '../../hooks/useAudio';
import { useSpeech } from '../../hooks/useSpeech';
import type { ScoreEvent } from '../../types';

type Phase = 'question' | 'explanation';

export const LevelScreen: React.FC = () => {
  const currentLevel = useGameStore((s) => s.currentLevel);
  const currentWorld = useGameStore((s) => s.currentWorld);
  const answerQuestion = useGameStore((s) => s.answerQuestion);
  const completeWorld = useGameStore((s) => s.completeWorld);
  const startBoss = useGameStore((s) => s.startBoss);
  const goToWorldMap = useGameStore((s) => s.goToWorldMap);

  const [phase, setPhase] = useState<Phase>('question');
  const [lastCorrect, setLastCorrect] = useState(false);
  const [lastEvents, setLastEvents] = useState<ScoreEvent[]>([]);

  const { playCorrect, playWrong, playLifeLost, playLevelComplete } = useAudio();
  const { speak, cancel } = useSpeech();

  const problem = getProblemByLevel(currentLevel);
  const world = getWorldById(currentWorld);

  if (!problem || !world) return null;

  const handleAnswer = useCallback(
    (optionId: string, elapsed: number) => {
      const correct = optionId === problem.correctOptionId;
      const internalId = correct ? '__correct__' : '__wrong__';
      const { events, gameOver, worldComplete } = answerQuestion(internalId, elapsed);

      setLastCorrect(correct);
      setLastEvents(events);
      setPhase('explanation');

      if (correct) {
        playCorrect();
        if (worldComplete) playLevelComplete();
      } else {
        playWrong();
        playLifeLost();
      }
    },
    [problem, answerQuestion, playCorrect, playWrong, playLifeLost, playLevelComplete],
  );

  const handleContinue = useCallback(() => {
    cancel();
    setPhase('question');

    // Check if all 6 levels in this world are done
    const completedLevels = useGameStore.getState().completedLevels;
    const [ws] = world.levelRange;
    const allDone = Array.from({ length: 6 }, (_, i) => ws + i).every((l) =>
      completedLevels.has(l),
    );

    if (allDone) {
      completeWorld(currentWorld);
      // Go to boss battle
      startBoss(currentWorld);
    } else {
      goToWorldMap();
    }
  }, [cancel, world, currentWorld, completeWorld, startBoss, goToWorldMap]);

  const worldLevelInWorld = ((currentLevel - 1) % 6) + 1;
  const correctOption = problem.options.find((o) => o.id === problem.correctOptionId);

  return (
    <div style={styles.container}>
      <HUD />

      {/* Scene area */}
      <div
        style={{
          ...styles.scene,
          background: `linear-gradient(160deg, ${world.bgGradient[0]} 0%, ${world.bgGradient[1]} 100%)`,
        }}
      >
        <div style={styles.sceneContent}>
          {/* Enemy */}
          <div style={styles.enemyArea}>
            <div style={styles.enemyEmoji}>
              {['🤖', '🍄', '🦂', '🎲', '⚙️'][currentWorld - 1]}
            </div>
            <div style={styles.enemyName}>{world.enemyName}</div>
          </div>

          {/* Protagonist */}
          <div style={styles.protagonistArea}>
            <div style={styles.protagonistEmoji}>🤖</div>
            <div style={styles.protagonistName}>AXIOM</div>
          </div>
        </div>

        <div style={styles.sceneInfo}>
          <span style={{ color: world.colorAccent, fontWeight: 700, fontSize: 13 }}>
            {world.name} — Nivel {worldLevelInWorld}/6
          </span>
        </div>
      </div>

      {/* Question */}
      <div style={styles.questionArea}>
        <QuestionPanel
          problem={problem}
          onAnswer={handleAnswer}
          disabled={phase === 'explanation'}
          worldColor={world.colorSecondary}
        />
      </div>

      {/* Explanation overlay */}
      {phase === 'explanation' && (
        <ExplanationPanel
          correct={lastCorrect}
          correctOptionText={correctOption?.text ?? ''}
          explanation={problem.explanation}
          scoreEvents={lastEvents}
          onContinue={handleContinue}
          worldColor={world.colorSecondary}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    background: '#0a1628', overflow: 'hidden',
  },
  scene: { height: 160, flexShrink: 0, position: 'relative', overflow: 'hidden' },
  sceneContent: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    height: '100%', padding: '12px 24px 20px',
  },
  enemyArea: { textAlign: 'center' },
  enemyEmoji: { fontSize: 52 },
  enemyName: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2 },
  protagonistArea: { textAlign: 'center' },
  protagonistEmoji: { fontSize: 52 },
  protagonistName: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 2 },
  sceneInfo: {
    position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center',
  },
  questionArea: { flex: 1, overflowY: 'auto', paddingBottom: 20 },
};
