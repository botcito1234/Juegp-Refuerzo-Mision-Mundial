// ============================================================
// CENTRALIZED GAME CONFIGURATION
// Modify values here to adjust balance without touching components.
// ============================================================

export const GAME_CONFIG = {
  // ── Lives ─────────────────────────────────────────────────
  INITIAL_LIVES: 3,
  LIVES_ON_WORLD_START: 3,
  LIVES_ON_BOSS_ATTEMPT: 3,

  // ── Scoring ───────────────────────────────────────────────
  POINTS_CORRECT_ANSWER: 100,
  POINTS_FIRST_TRY_BONUS: 50,
  POINTS_MAX_SPEED_BONUS: 50,
  POINTS_WORLD_COMPLETE: 300,
  POINTS_PER_LIFE_REMAINING: 100,
  POINTS_FINAL_BOSS: 1000,

  // Boss defeat bonuses (world 1-4, then final)
  BOSS_DEFEAT_POINTS: {
    1: 400,
    2: 500,
    3: 600,
    4: 700,
    5: 1000,
  } as Record<number, number>,

  // ── Streak bonuses ────────────────────────────────────────
  STREAK_BONUS_BASE: 20,        // bonus for 2nd consecutive correct
  STREAK_BONUS_INCREMENT: 20,   // added per each further consecutive
  STREAK_BONUS_MAX: 100,        // cap per question

  // ── Speed bonus ───────────────────────────────────────────
  // Full bonus for answers under SPEED_FAST_THRESHOLD seconds.
  // Linearly decays to 0 at SPEED_SLOW_THRESHOLD seconds.
  SPEED_FAST_THRESHOLD: 5,   // seconds
  SPEED_SLOW_THRESHOLD: 30,  // seconds

  // ── Boss battle ───────────────────────────────────────────
  BOSS_QUESTIONS_COUNT: 5,
  BOSS_QUESTIONS_TO_WIN: 4,

  // ── Worlds ────────────────────────────────────────────────
  TOTAL_WORLDS: 5,
  LEVELS_PER_WORLD: 6,

  // ── Audio volumes ─────────────────────────────────────────
  MUSIC_VOLUME: 0.35,
  SFX_VOLUME: 0.65,
  VOICE_VOLUME: 1.0,

  // ── Ranks ─────────────────────────────────────────────────
  // Evaluated in order; first matching rank wins.
  RANKS: [
    {
      id: 'maestro',
      label: 'Maestro del Razonamiento',
      emoji: '🏆',
      minAccuracy: 90,
      minScore: 8000,
      description: '¡Dominio absoluto de las matemáticas!',
    },
    {
      id: 'guardian',
      label: 'Guardián Matemático',
      emoji: '⚔️',
      minAccuracy: 80,
      minScore: 6000,
      description: 'Excelente comprensión matemática.',
    },
    {
      id: 'estratega',
      label: 'Estratega',
      emoji: '🎯',
      minAccuracy: 70,
      minScore: 4000,
      description: 'Buen razonamiento lógico.',
    },
    {
      id: 'explorador',
      label: 'Explorador',
      emoji: '🗺️',
      minAccuracy: 55,
      minScore: 2000,
      description: 'En camino a convertirte en experto.',
    },
    {
      id: 'aprendiz',
      label: 'Aprendiz',
      emoji: '📚',
      minAccuracy: 0,
      minScore: 0,
      description: 'El inicio de una gran aventura matemática.',
    },
  ],

  // ── Branding ──────────────────────────────────────────────
  SCHOOL_NAME: 'Colegio Mundial',
  GAME_TITLE: 'Misión Mundial: Desafío Matemático',
  LOGO_PATH: '/assets/branding/logo-placeholder.svg',
  // Replace above paths with:
  // '/assets/branding/logo-light.svg'  (for dark backgrounds)
  // '/assets/branding/logo-dark.svg'   (for light backgrounds)

  BRAND_COLORS: {
    blue: '#1a3a6e',
    skyBlue: '#4a9ede',
    yellow: '#f5c518',
    orange: '#e8762b',
    lightBlue: '#87ceeb',
    darkBlue: '#0d1f3c',
  },
} as const;
