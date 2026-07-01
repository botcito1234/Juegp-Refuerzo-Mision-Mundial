import { create } from 'zustand';
import type { GameState, WorldId, WorldStats, LevelResult, BossVariant } from '../types';
import { GAME_CONFIG } from '../config/gameConfig';
import { getShuffledBossQuestions } from '../config/bossVariants';
import {
  buildCorrectAnswerEvents,
  calcWorldCompleteBonus,
  sumEvents,
} from '../utils/scoring';

// ============================================================
// GAME STORE — All game state in memory, no persistence
// ============================================================

interface GameStore extends GameState {
  // Actions — Navigation
  goTo: (screen: GameState['screen']) => void;
  startAdventure: () => void;
  startLevel: (levelNumber: number) => void;
  startBoss: (worldId: WorldId) => void;
  goToWorldMap: () => void;

  // Actions — Gameplay
  answerQuestion: (optionId: string, elapsedSeconds: number) => {
    correct: boolean;
    events: ReturnType<typeof buildCorrectAnswerEvents>;
    gameOver: boolean;
    worldComplete: boolean;
  };
  answerBossQuestion: (optionId: string) => {
    correct: boolean;
    bossDefeated: boolean;
    bossLost: boolean;
    questionsLeft: number;
  };
  nextBossQuestion: () => void;
  completeWorld: (worldId: WorldId) => void;

  // Actions — Audio/Voice
  toggleAudio: () => void;
  toggleVoice: () => void;
  setWebGL: (available: boolean) => void;

  // Actions — Game lifecycle
  resetGame: () => void;
  endGame: () => void;

  // Derived
  getCurrentProblemId: () => number;
  getTotalElapsedMs: () => number;
}

const INITIAL_STATE: GameState = {
  screen: 'loading',
  currentWorld: 1,
  currentLevel: 1,
  isBossBattle: false,
  lives: GAME_CONFIG.INITIAL_LIVES,
  score: 0,
  streak: 0,
  bestStreak: 0,
  timerStart: 0,
  timerElapsed: 0,
  sessionActive: false,
  completedLevels: new Set(),
  defeatedBosses: new Set(),
  worldStats: [],
  currentWorldStats: {},
  bossQuestionsAnswered: 0,
  bossCorrectAnswers: 0,
  bossAttempts: 0,
  bossQuestions: [],
  bossQuestionIndex: 0,
  audioEnabled: true,
  voiceEnabled: true,
  webglAvailable: true,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...INITIAL_STATE,

  // ── Navigation ────────────────────────────────────────────
  goTo: (screen) => set({ screen }),

  startAdventure: () =>
    set({
      ...INITIAL_STATE,
      screen: 'worldMap',
      timerStart: Date.now(),
      sessionActive: true,
      audioEnabled: get().audioEnabled,
      voiceEnabled: get().voiceEnabled,
      webglAvailable: get().webglAvailable,
    }),

  startLevel: (levelNumber) => {
    const worldId = Math.ceil(levelNumber / 6) as WorldId;
    set({
      screen: 'level',
      currentLevel: levelNumber,
      currentWorld: worldId,
      isBossBattle: false,
    });
  },

  startBoss: (worldId) => {
    const questions = getShuffledBossQuestions(worldId);
    set({
      screen: 'boss',
      currentWorld: worldId,
      isBossBattle: true,
      lives: GAME_CONFIG.LIVES_ON_BOSS_ATTEMPT,
      bossQuestionsAnswered: 0,
      bossCorrectAnswers: 0,
      bossAttempts: get().bossAttempts + 1,
      bossQuestions: questions,
      bossQuestionIndex: 0,
    });
  },

  goToWorldMap: () => set({ screen: 'worldMap', isBossBattle: false }),

  // ── Level gameplay ────────────────────────────────────────
  answerQuestion: (optionId, elapsedSeconds) => {
    const state = get();
    const { currentLevel, lives, streak, bestStreak, score, completedLevels } = state;

    // We need the problem's correct answer — injected via the UI component calling this
    // The store doesn't import problems directly to keep separation clean.
    // The UI passes optionId and also checks correctness via problem data,
    // then calls this action. We receive a pre-checked flag via a wrapper.
    // Here we assume optionId is already validated upstream.
    // ↑ Actually we DO handle it here for simplicity.
    // The UI will call answerQuestion with correct optionId pre-checked.
    // We return events based on correctness flag embedded in optionId == '_correct_' or '_wrong_'.

    const correct = optionId === '__correct__';
    let newLives = lives;
    let newStreak = streak;
    let newBestStreak = bestStreak;
    let newScore = score;
    let gameOver = false;
    let worldComplete = false;
    let events: ReturnType<typeof buildCorrectAnswerEvents> = [];

    if (correct) {
      const isFirstTry = !completedLevels.has(currentLevel);
      events = buildCorrectAnswerEvents(isFirstTry, newStreak, elapsedSeconds);
      newScore += sumEvents(events);
      newStreak += 1;
      newBestStreak = Math.max(newBestStreak, newStreak);

      const newCompleted = new Set(completedLevels);
      newCompleted.add(currentLevel);

      // Check world completion
      const worldId = Math.ceil(currentLevel / 6) as WorldId;
      const worldStart = (worldId - 1) * 6 + 1;
      const allInWorld = Array.from({ length: 6 }, (_, i) => worldStart + i);
      worldComplete = allInWorld.every((l) => newCompleted.has(l));

      const lr: LevelResult = {
        levelNumber: currentLevel,
        problemId: currentLevel,
        correct: true,
        timeSpent: elapsedSeconds,
        pointsEarned: sumEvents(events),
        firstTry: isFirstTry,
      };

      const currentWorldStats = {
        ...state.currentWorldStats,
        levelResults: [...(state.currentWorldStats.levelResults ?? []), lr],
      };

      set({
        score: newScore,
        streak: newStreak,
        bestStreak: newBestStreak,
        completedLevels: newCompleted,
        currentWorldStats,
      });
    } else {
      newLives -= 1;
      newStreak = 0;
      gameOver = newLives <= 0;

      const lr: LevelResult = {
        levelNumber: currentLevel,
        problemId: currentLevel,
        correct: false,
        timeSpent: elapsedSeconds,
        pointsEarned: 0,
        firstTry: !completedLevels.has(currentLevel),
      };

      const currentWorldStats = {
        ...state.currentWorldStats,
        levelResults: [...(state.currentWorldStats.levelResults ?? []), lr],
      };

      set({ lives: newLives, streak: 0, currentWorldStats });

      if (gameOver) {
        // Reset to start of current world
        const worldId = Math.ceil(currentLevel / 6) as WorldId;
        const worldStart = (worldId - 1) * 6 + 1;
        const worldEnd = worldId * 6;
        const newCompleted = new Set(completedLevels);
        for (let l = worldStart; l <= worldEnd; l++) newCompleted.delete(l);

        set({
          lives: GAME_CONFIG.LIVES_ON_WORLD_START,
          completedLevels: newCompleted,
          currentWorldStats: {},
          screen: 'worldMap',
        });
      }
    }

    return { correct, events, gameOver, worldComplete };
  },

  // ── Boss gameplay ─────────────────────────────────────────
  answerBossQuestion: (optionId) => {
    const correct = optionId === '__correct__';
    const state = get();
    const newAnswered = state.bossQuestionsAnswered + 1;
    const newCorrect = state.bossCorrectAnswers + (correct ? 1 : 0);
    const questionsLeft = GAME_CONFIG.BOSS_QUESTIONS_COUNT - newAnswered;
    const bossDefeated =
      newAnswered === GAME_CONFIG.BOSS_QUESTIONS_COUNT &&
      newCorrect >= GAME_CONFIG.BOSS_QUESTIONS_TO_WIN;
    const bossLost =
      newAnswered === GAME_CONFIG.BOSS_QUESTIONS_COUNT &&
      newCorrect < GAME_CONFIG.BOSS_QUESTIONS_TO_WIN;

    set({ bossQuestionsAnswered: newAnswered, bossCorrectAnswers: newCorrect });

    if (bossDefeated) {
      const { currentWorld, defeatedBosses, score } = state;
      const bossPoints = GAME_CONFIG.BOSS_DEFEAT_POINTS[currentWorld] ?? 0;
      const alreadyDefeated = defeatedBosses.has(currentWorld);
      const newDefeated = new Set(defeatedBosses);
      newDefeated.add(currentWorld);

      set({
        defeatedBosses: newDefeated,
        score: score + (alreadyDefeated ? 0 : bossPoints),
      });
    }

    return { correct, bossDefeated, bossLost, questionsLeft };
  },

  nextBossQuestion: () =>
    set((s) => ({ bossQuestionIndex: s.bossQuestionIndex + 1 })),

  completeWorld: (worldId) => {
    const state = get();
    const livesRemaining = state.lives;
    const bonusEvents = calcWorldCompleteBonus(livesRemaining);
    const bonusPoints = sumEvents(bonusEvents);

    const finishedWorldStats: WorldStats = {
      worldId,
      levelResults: state.currentWorldStats.levelResults ?? [],
      bossResult: null,
      livesRemaining,
      completedAt: Date.now(),
    };

    set({
      score: state.score + bonusPoints,
      worldStats: [...state.worldStats, finishedWorldStats],
      currentWorldStats: {},
      lives: GAME_CONFIG.LIVES_ON_WORLD_START,
    });
  },

  // ── Audio / Voice ─────────────────────────────────────────
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
  toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),
  setWebGL: (available) => set({ webglAvailable: available }),

  // ── Lifecycle ─────────────────────────────────────────────
  resetGame: () =>
    set({
      ...INITIAL_STATE,
      screen: 'title',
      audioEnabled: get().audioEnabled,
      voiceEnabled: get().voiceEnabled,
      webglAvailable: get().webglAvailable,
    }),

  endGame: () => {
    const elapsed = get().timerStart > 0 ? Date.now() - get().timerStart : 0;
    set({ timerElapsed: elapsed, sessionActive: false, screen: 'final' });
  },

  // ── Derived ───────────────────────────────────────────────
  getCurrentProblemId: () => get().currentLevel,

  getTotalElapsedMs: () => {
    const s = get();
    if (!s.sessionActive) return s.timerElapsed;
    return Date.now() - s.timerStart;
  },
}));
