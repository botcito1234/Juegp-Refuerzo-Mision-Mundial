import { GAME_CONFIG } from '../config/gameConfig';
import type { ScoreEvent, FinalStats, WorldStats } from '../types';

// ============================================================
// SCORING UTILITIES
// All score calculations centralized here.
// ============================================================

/**
 * Calculate speed bonus.
 * Full bonus for answers under SPEED_FAST_THRESHOLD seconds.
 * Linear decay to 0 at SPEED_SLOW_THRESHOLD.
 */
export function calcSpeedBonus(elapsedSeconds: number): number {
  const { SPEED_FAST_THRESHOLD, SPEED_SLOW_THRESHOLD, POINTS_MAX_SPEED_BONUS } =
    GAME_CONFIG;

  if (elapsedSeconds <= SPEED_FAST_THRESHOLD) {
    return POINTS_MAX_SPEED_BONUS;
  }
  if (elapsedSeconds >= SPEED_SLOW_THRESHOLD) {
    return 0;
  }
  const ratio =
    (SPEED_SLOW_THRESHOLD - elapsedSeconds) /
    (SPEED_SLOW_THRESHOLD - SPEED_FAST_THRESHOLD);
  return Math.round(POINTS_MAX_SPEED_BONUS * ratio);
}

/**
 * Calculate streak bonus for the current streak count.
 * Returns 0 for streak < 2.
 */
export function calcStreakBonus(streak: number): number {
  if (streak < 2) return 0;
  const bonus =
    GAME_CONFIG.STREAK_BONUS_BASE +
    (streak - 2) * GAME_CONFIG.STREAK_BONUS_INCREMENT;
  return Math.min(bonus, GAME_CONFIG.STREAK_BONUS_MAX);
}

/**
 * Build the full list of score events for a correct answer.
 */
export function buildCorrectAnswerEvents(
  isFirstTry: boolean,
  streak: number,
  elapsedSeconds: number,
): ScoreEvent[] {
  const events: ScoreEvent[] = [
    { type: 'correct_answer', points: GAME_CONFIG.POINTS_CORRECT_ANSWER, label: '¡Correcto!' },
  ];

  if (isFirstTry) {
    events.push({
      type: 'first_try_bonus',
      points: GAME_CONFIG.POINTS_FIRST_TRY_BONUS,
      label: 'Primer intento',
    });
  }

  const speedBonus = calcSpeedBonus(elapsedSeconds);
  if (speedBonus > 0) {
    events.push({ type: 'speed_bonus', points: speedBonus, label: 'Bono rapidez' });
  }

  const streakBonus = calcStreakBonus(streak + 1); // +1 because this answer extends streak
  if (streakBonus > 0) {
    events.push({ type: 'streak_bonus', points: streakBonus, label: `Racha x${streak + 1}` });
  }

  return events;
}

/**
 * Calculate world completion bonus.
 */
export function calcWorldCompleteBonus(livesRemaining: number): ScoreEvent[] {
  return [
    { type: 'world_complete', points: GAME_CONFIG.POINTS_WORLD_COMPLETE, label: '¡Mundo completo!' },
    ...(livesRemaining > 0
      ? [
          {
            type: 'life_bonus' as const,
            points: livesRemaining * GAME_CONFIG.POINTS_PER_LIFE_REMAINING,
            label: `${livesRemaining} vida(s) restante(s)`,
          },
        ]
      : []),
  ];
}

/**
 * Total points from an array of ScoreEvents.
 */
export function sumEvents(events: ScoreEvent[]): number {
  return events.reduce((sum, e) => sum + e.points, 0);
}

/**
 * Compute the player rank from final stats.
 */
export type GameRank = typeof GAME_CONFIG.RANKS[number];

export function computeRank(accuracy: number, score: number): GameRank {
  for (const rank of GAME_CONFIG.RANKS) {
    if (accuracy >= rank.minAccuracy && score >= rank.minScore) {
      return rank as GameRank;
    }
  }
  return GAME_CONFIG.RANKS[GAME_CONFIG.RANKS.length - 1] as GameRank;
}

/**
 * Build FinalStats object from accumulated world stats.
 */
export function buildFinalStats(
  totalScore: number,
  worldStats: WorldStats[],
  totalTimeMs: number,
  livesRemaining: number,
  bestStreak: number,
): FinalStats {
  let correct = 0;
  let incorrect = 0;
  const failedProblems: number[] = [];

  for (const ws of worldStats) {
    for (const lr of ws.levelResults) {
      if (lr.correct) correct++;
      else {
        incorrect++;
        failedProblems.push(lr.problemId);
      }
    }
  }

  const total = correct + incorrect;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const rank = computeRank(accuracy, totalScore);

  return {
    totalScore,
    correctAnswers: correct,
    incorrectAnswers: incorrect,
    accuracy,
    totalTimeMs,
    livesRemaining,
    bestStreak,
    worldStats,
    failedProblems,
    rank: rank.label,
    rankDescription: rank.description,
  };
}
