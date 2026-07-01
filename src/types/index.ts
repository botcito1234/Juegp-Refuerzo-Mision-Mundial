// ============================================================
// CORE GAME TYPES
// ============================================================

export type Screen =
  | 'loading'
  | 'title'
  | 'warning'
  | 'intro'
  | 'worldMap'
  | 'level'
  | 'boss'
  | 'final';

export type WorldId = 1 | 2 | 3 | 4 | 5;

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'ordering'
  | 'matching';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Option {
  id: string;
  text: string;
  latex?: string;
}

export interface MathProblem {
  id: number;
  world: WorldId;
  level: number; // 1-30
  difficulty: Difficulty;
  type: QuestionType;
  statement: string;
  contextNote?: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  topic: string;
  referenceTime: number; // seconds — used for speed bonus calculation
  validated: boolean;
}

export interface BossVariant {
  id: string;
  baseProblemId: number;
  statement: string;
  options: Option[];
  correctOptionId: string;
  variantRule: string;
}

export interface WorldConfig {
  id: WorldId;
  name: string;
  subtitle: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  bgGradient: [string, string];
  bgImage: string;
  enemyName: string;
  bossName: string;
  bossDescription: string;
  levelRange: [number, number]; // [first, last] inclusive
}

// ============================================================
// GAME STATE TYPES
// ============================================================

export interface LevelResult {
  levelNumber: number;
  problemId: number;
  correct: boolean;
  timeSpent: number;
  pointsEarned: number;
  firstTry: boolean;
}

export interface BossAttemptResult {
  correct: boolean;
  variantId: string;
}

export interface BossResult {
  worldId: WorldId;
  attempts: number; // how many times the boss was fought
  lastAttemptCorrect: number; // correct answers in last attempt
  pointsEarned: number;
  defeated: boolean;
}

export interface WorldStats {
  worldId: WorldId;
  levelResults: LevelResult[];
  bossResult: BossResult | null;
  livesRemaining: number;
  completedAt: number; // timestamp
}

export interface GameState {
  // Navigation
  screen: Screen;
  currentWorld: WorldId;
  currentLevel: number; // 1-30
  isBossBattle: boolean;

  // Resources
  lives: number;
  score: number;
  streak: number;
  bestStreak: number;
  timerStart: number; // Date.now() when adventure began
  timerElapsed: number; // ms, updated on game end
  sessionActive: boolean;

  // Progress
  completedLevels: Set<number>;
  defeatedBosses: Set<WorldId>;
  worldStats: WorldStats[];
  currentWorldStats: Partial<WorldStats>;

  // Boss state
  bossQuestionsAnswered: number;
  bossCorrectAnswers: number;
  bossAttempts: number;
  bossQuestions: BossVariant[];
  bossQuestionIndex: number;

  // UI state
  audioEnabled: boolean;
  voiceEnabled: boolean;
  webglAvailable: boolean;
}

// ============================================================
// SCORING TYPES
// ============================================================

export interface ScoreEvent {
  type:
    | 'correct_answer'
    | 'first_try_bonus'
    | 'speed_bonus'
    | 'streak_bonus'
    | 'world_complete'
    | 'life_bonus'
    | 'boss_defeat';
  points: number;
  label: string;
}

// ============================================================
// FINAL STATS TYPES
// ============================================================

export interface FinalStats {
  totalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  totalTimeMs: number;
  livesRemaining: number;
  bestStreak: number;
  worldStats: WorldStats[];
  failedProblems: number[];
  rank: string;
  rankDescription: string;
}
