import { describe, it, expect, beforeEach } from 'vitest';
import { PROBLEMS, getProblemByLevel, getProblemsByWorld } from '../config/problems';
import { WORLDS } from '../config/worlds';
import { BOSS_VARIANTS, getShuffledBossQuestions } from '../config/bossVariants';
import { GAME_CONFIG } from '../config/gameConfig';
import {
  calcSpeedBonus,
  calcStreakBonus,
  buildCorrectAnswerEvents,
  computeRank,
  sumEvents,
} from '../utils/scoring';

// ============================================================
// TEST SUITE — 25 required checks
// ============================================================

describe('1. Content completeness', () => {
  it('30 problems are loaded', () => {
    expect(PROBLEMS.length).toBe(30);
  });

  it('All 30 problems have unique IDs 1-30', () => {
    const ids = PROBLEMS.map((p) => p.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
  });

  it('All 30 problems have a verified correct option', () => {
    PROBLEMS.forEach((p) => {
      const correctExists = p.options.some((o) => o.id === p.correctOptionId);
      expect(correctExists, `Problem ${p.id} missing correct option`).toBe(true);
    });
  });
});

describe('2. World structure', () => {
  it('Exactly 5 worlds exist', () => {
    expect(WORLDS.length).toBe(5);
  });

  it('Each world has exactly 6 levels', () => {
    WORLDS.forEach((w) => {
      const levels = getProblemsByWorld(w.id);
      expect(levels.length, `World ${w.id} should have 6 levels`).toBe(6);
    });
  });

  it('Each world has a boss in BOSS_VARIANTS', () => {
    WORLDS.forEach((w) => {
      expect(BOSS_VARIANTS[w.id], `World ${w.id} missing boss variants`).toBeDefined();
    });
  });

  it('Levels are distributed sequentially across worlds', () => {
    const expected = [[1,6],[7,12],[13,18],[19,24],[25,30]];
    WORLDS.forEach((w, i) => {
      expect(w.levelRange[0]).toBe(expected[i][0]);
      expect(w.levelRange[1]).toBe(expected[i][1]);
    });
  });
});

describe('3. Boss structure', () => {
  it('Each boss has exactly 5 questions', () => {
    WORLDS.forEach((w) => {
      expect(BOSS_VARIANTS[w.id].length).toBe(5);
    });
  });

  it('BOSS_QUESTIONS_TO_WIN is 4', () => {
    expect(GAME_CONFIG.BOSS_QUESTIONS_TO_WIN).toBe(4);
  });

  it('Boss questions shuffle without duplication', () => {
    const qs = getShuffledBossQuestions(1);
    expect(qs.length).toBe(5);
    const ids = qs.map((q) => q.id);
    expect(new Set(ids).size).toBe(5);
  });

  it('Each boss variant has a valid correct option', () => {
    Object.values(BOSS_VARIANTS).flat().forEach((v) => {
      const exists = v.options.some((o) => o.id === v.correctOptionId);
      expect(exists, `Variant ${v.id} has invalid correctOptionId`).toBe(true);
    });
  });
});

describe('4. Scoring system', () => {
  it('Base correct answer = 100 points', () => {
    expect(GAME_CONFIG.POINTS_CORRECT_ANSWER).toBe(100);
  });

  it('First try bonus = 50 points', () => {
    expect(GAME_CONFIG.POINTS_FIRST_TRY_BONUS).toBe(50);
  });

  it('Max speed bonus = 50 points', () => {
    expect(GAME_CONFIG.POINTS_MAX_SPEED_BONUS).toBe(50);
  });

  it('Speed bonus is max for very fast answers', () => {
    expect(calcSpeedBonus(2)).toBe(50);
  });

  it('Speed bonus decays to 0 for slow answers', () => {
    expect(calcSpeedBonus(35)).toBe(0);
  });

  it('Streak bonus is 0 for first answer', () => {
    expect(calcStreakBonus(1)).toBe(0);
  });

  it('Streak bonus is 20 for second consecutive', () => {
    expect(calcStreakBonus(2)).toBe(20);
  });

  it('Streak bonus caps at 100', () => {
    expect(calcStreakBonus(100)).toBe(GAME_CONFIG.STREAK_BONUS_MAX);
  });

  it('Correct answer events include correct_answer type', () => {
    const events = buildCorrectAnswerEvents(true, 0, 3);
    expect(events.some((e) => e.type === 'correct_answer')).toBe(true);
  });

  it('Score events sum correctly', () => {
    const events = [
      { type: 'correct_answer' as const, points: 100, label: 'test' },
      { type: 'speed_bonus' as const, points: 50, label: 'test' },
    ];
    expect(sumEvents(events)).toBe(150);
  });
});

describe('5. Rank system', () => {
  it('High accuracy and score gives top rank', () => {
    const rank = computeRank(95, 9000);
    expect(rank.id).toBe('maestro');
  });

  it('Low accuracy gives aprendiz rank', () => {
    const rank = computeRank(30, 500);
    expect(rank.id).toBe('aprendiz');
  });
});

describe('6. Game config', () => {
  it('Lives per world = 3', () => {
    expect(GAME_CONFIG.LIVES_ON_WORLD_START).toBe(3);
  });

  it('Levels per world = 6', () => {
    expect(GAME_CONFIG.LEVELS_PER_WORLD).toBe(6);
  });

  it('Final boss points = 1000', () => {
    expect(GAME_CONFIG.BOSS_DEFEAT_POINTS[5]).toBe(1000);
  });

  it('getProblemByLevel returns correct problem', () => {
    const p = getProblemByLevel(1);
    expect(p?.level).toBe(1);
    expect(p?.world).toBe(1);
  });

  it('All 30 problems have non-empty explanations', () => {
    PROBLEMS.forEach((p) => {
      expect(p.explanation.length, `Problem ${p.id} has empty explanation`).toBeGreaterThan(10);
    });
  });
});
