import type { BossVariant } from '../types';

// ============================================================
// BOSS VARIANTS — 5 questions per boss (mix of originals + variants)
// Each boss draws from the 6 problems of its world.
// Variants change numbers/context but preserve the same reasoning.
// ============================================================

export const BOSS_VARIANTS: Record<number, BossVariant[]> = {
  // ── BOSS 1: Código Guardián (World 1 — Álgebra) ──────────
  1: [
    {
      id: 'b1_q1',
      baseProblemId: 1,
      statement: 'Si 3x + 4 = 19, ¿cuánto vale x?',
      options: [
        { id: 'a', text: 'x = 3' },
        { id: 'b', text: 'x = 4' },
        { id: 'c', text: 'x = 5' },
        { id: 'd', text: 'x = 6' },
      ],
      correctOptionId: 'c',
      variantRule: 'Cambio de coeficiente (2→3) y constante (7→4, 15→19). 3x=15 → x=5',
    },
    {
      id: 'b1_q2',
      baseProblemId: 2,
      statement: 'Si 4(x − 1) = 16, entonces x vale:',
      options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '5' },
        { id: 'c', text: '6' },
        { id: 'd', text: '7' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de coeficiente (3→4) y constante (-2→-1, 12→16). 4x=20 → x=5',
    },
    {
      id: 'b1_q3',
      baseProblemId: 3,
      statement: 'El triple de un número aumentado en 6 es igual a 21. ¿Cuál es ese número?',
      options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '5' },
        { id: 'c', text: '6' },
        { id: 'd', text: '7' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de "doble"→"triple", -4→+6, 10→21. 3x+6=21 → 3x=15 → x=5',
    },
    {
      id: 'b1_q4',
      baseProblemId: 5,
      statement: 'La suma de dos números es 30 y su diferencia es 6. ¿Cuál es el número mayor?',
      options: [
        { id: 'a', text: '12' },
        { id: 'b', text: '15' },
        { id: 'c', text: '18' },
        { id: 'd', text: '20' },
      ],
      correctOptionId: 'c',
      variantRule: 'Cambio de suma (20→30) y diferencia (4→6). 2x=36 → x=18',
    },
    {
      id: 'b1_q5',
      baseProblemId: 4,
      statement: 'Si 7x − 4 = 3x + 12, ¿cuánto vale x?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '6' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de coeficientes (5→7, 2→3) y constantes (-3→-4, 9→12). 4x=16 → x=4',
    },
  ],

  // ── BOSS 2: Bestia Proporcional (World 2 — Proporciones) ──
  2: [
    {
      id: 'b2_q1',
      baseProblemId: 7,
      statement: '¿Cuánto es el 40% de 150?',
      options: [
        { id: 'a', text: '50' },
        { id: 'b', text: '60' },
        { id: 'c', text: '70' },
        { id: 'd', text: '80' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de porcentaje (30→40) y base (240→150). 40%×150=60',
    },
    {
      id: 'b2_q2',
      baseProblemId: 8,
      statement: 'Si ⅖ de un número es 16, ¿cuál es ese número?',
      options: [
        { id: 'a', text: '32' },
        { id: 'b', text: '38' },
        { id: 'c', text: '40' },
        { id: 'd', text: '45' },
      ],
      correctOptionId: 'c',
      variantRule: 'Cambio de fracción (3/4→2/5) y resultado (18→16). n=16×(5/2)=40',
    },
    {
      id: 'b2_q3',
      baseProblemId: 9,
      statement: 'En una clase de 50 estudiantes, 20 son varones. ¿Qué porcentaje son mujeres?',
      options: [
        { id: 'a', text: '40%' },
        { id: 'b', text: '50%' },
        { id: 'c', text: '60%' },
        { id: 'd', text: '64%' },
      ],
      correctOptionId: 'c',
      variantRule: 'Cambio de total (40→50) y varones (16→20). Mujeres=30, %=60%',
    },
    {
      id: 'b2_q4',
      baseProblemId: 11,
      statement: 'Dos números están en razón 2:3. Si su suma es 30, ¿cuál es el número menor?',
      options: [
        { id: 'a', text: '10' },
        { id: 'b', text: '12' },
        { id: 'c', text: '15' },
        { id: 'd', text: '18' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de razón (3:5→2:3) y suma (40→30). k=6, menor=2k=12',
    },
    {
      id: 'b2_q5',
      baseProblemId: 12,
      statement: '6 pintores tardan 4 días en pintar una casa. ¿Cuántos días tardarán 8 pintores?',
      options: [
        { id: 'a', text: '2 días' },
        { id: 'b', text: '3 días' },
        { id: 'c', text: '4 días' },
        { id: 'd', text: '5 días' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de trabajadores y días. 6×4=8×d → d=24/8=3 días',
    },
  ],

  // ── BOSS 3: El Criptomante (World 3 — Teoría de números) ──
  3: [
    {
      id: 'b3_q1',
      baseProblemId: 13,
      statement: '¿Cuál es el MCD de 36 y 54?',
      options: [
        { id: 'a', text: '6' },
        { id: 'b', text: '9' },
        { id: 'c', text: '18' },
        { id: 'd', text: '27' },
      ],
      correctOptionId: 'c',
      variantRule: '36=2²×3², 54=2×3³. MCD=2×3²=18',
    },
    {
      id: 'b3_q2',
      baseProblemId: 14,
      statement: '¿Cuál es el MCM de 4, 6 y 9?',
      options: [
        { id: 'a', text: '18' },
        { id: 'b', text: '24' },
        { id: 'c', text: '36' },
        { id: 'd', text: '72' },
      ],
      correctOptionId: 'c',
      variantRule: '4=2², 6=2×3, 9=3². MCM=2²×3²=36',
    },
    {
      id: 'b3_q3',
      baseProblemId: 17,
      statement: 'En la sucesión aritmética 5, 9, 13, 17, … ¿Cuál es el octavo término?',
      options: [
        { id: 'a', text: '31' },
        { id: 'b', text: '33' },
        { id: 'c', text: '37' },
        { id: 'd', text: '41' },
      ],
      correctOptionId: 'b',
      variantRule: 'a₁=5, d=4. a₈=5+(8-1)×4=5+28=33',
    },
    {
      id: 'b3_q4',
      baseProblemId: 18,
      statement: 'En la operación ■3 + 3■ = 77, siendo ■ el mismo dígito, ¿qué número es ■?\n(■3 y 3■ representan números de dos cifras)',
      options: [
        { id: 'a', text: '4' },
        { id: 'b', text: '5' },
        { id: 'c', text: '6' },
        { id: 'd', text: '7' },
      ],
      correctOptionId: 'a',
      variantRule: '(10■+3)+(30+■)=11■+33=77 → 11■=44 → ■=4. Verificación: 43+34=77 ✓',
    },
    {
      id: 'b3_q5',
      baseProblemId: 16,
      statement: 'La suma de los dígitos de un número de 2 cifras es 11. Al invertir sus dígitos, el nuevo número es 27 mayor. ¿Cuál es el número original?',
      options: [
        { id: 'a', text: '47' },
        { id: 'b', text: '56' },
        { id: 'c', text: '29' },
        { id: 'd', text: '38' },
      ],
      correctOptionId: 'a',
      variantRule: 'a+b=11, b-a=3 → b=7, a=4. Número: 47. Invertido=74. 74-47=27 ✓',
    },
  ],

  // ── BOSS 4: Protogeómetra (World 4 — Geometría) ──────────
  4: [
    {
      id: 'b4_q1',
      baseProblemId: 19,
      statement: '¿Cuál es el área de un triángulo con base 12 cm y altura 5 cm?',
      options: [
        { id: 'a', text: '30 cm²' },
        { id: 'b', text: '34 cm²' },
        { id: 'c', text: '60 cm²' },
        { id: 'd', text: '17 cm²' },
      ],
      correctOptionId: 'a',
      variantRule: 'Cambio de base (10→12) y altura (8→5). Área=(12×5)/2=30',
    },
    {
      id: 'b4_q2',
      baseProblemId: 20,
      statement: 'Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide su hipotenusa?',
      options: [
        { id: 'a', text: '13 cm' },
        { id: 'b', text: '14 cm' },
        { id: 'c', text: '15 cm' },
        { id: 'd', text: '18 cm' },
      ],
      correctOptionId: 'c',
      variantRule: 'c²=9²+12²=81+144=225 → c=15. (Terna pitagórica 3-4-5 escalada por 3)',
    },
    {
      id: 'b4_q3',
      baseProblemId: 21,
      statement: 'Un cuadrado tiene un perímetro de 36 cm. ¿Cuál es su área?',
      options: [
        { id: 'a', text: '64 cm²' },
        { id: 'b', text: '72 cm²' },
        { id: 'c', text: '81 cm²' },
        { id: 'd', text: '100 cm²' },
      ],
      correctOptionId: 'c',
      variantRule: 'Problema inverso: lado=36/4=9 cm. Área=9²=81 cm²',
    },
    {
      id: 'b4_q4',
      baseProblemId: 23,
      statement: 'Los ángulos de un triángulo miden x°, 3x° y 5x°. ¿Cuánto mide el ángulo menor?',
      options: [
        { id: 'a', text: '15°' },
        { id: 'b', text: '20°' },
        { id: 'c', text: '25°' },
        { id: 'd', text: '30°' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de razones (1:2:3→1:3:5). x+3x+5x=180 → 9x=180 → x=20°',
    },
    {
      id: 'b4_q5',
      baseProblemId: 24,
      statement: 'Un cubo tiene una arista de 5 cm. ¿Cuál es su volumen?',
      options: [
        { id: 'a', text: '25 cm³' },
        { id: 'b', text: '75 cm³' },
        { id: 'c', text: '100 cm³' },
        { id: 'd', text: '125 cm³' },
      ],
      correctOptionId: 'd',
      variantRule: 'Cambio a cubo en lugar de prisma. V=5³=125 cm³',
    },
  ],

  // ── BOSS 5: El Gran Razonador (World 5 — Final) ───────────
  5: [
    {
      id: 'b5_q1',
      baseProblemId: 25,
      statement: 'Si g(x) = 2x² − x + 1, ¿cuánto es g(3)?',
      options: [
        { id: 'a', text: '14' },
        { id: 'b', text: '16' },
        { id: 'c', text: '18' },
        { id: 'd', text: '20' },
      ],
      correctOptionId: 'b',
      variantRule: 'Cambio de función. g(3)=2(9)-3+1=18-3+1=16',
    },
    {
      id: 'b5_q2',
      baseProblemId: 26,
      statement: 'En la sucesión geométrica 3, 9, 27, 81, … ¿Cuál es el 5° término?',
      options: [
        { id: 'a', text: '162' },
        { id: 'b', text: '216' },
        { id: 'c', text: '243' },
        { id: 'd', text: '324' },
      ],
      correctOptionId: 'c',
      variantRule: 'a₁=3, r=3. a₅=3×3⁴=3×81=243',
    },
    {
      id: 'b5_q3',
      baseProblemId: 27,
      statement: 'Una urna tiene 4 bolas verdes, 3 amarillas y 1 negra. ¿Cuál es la probabilidad de sacar una bola amarilla?',
      options: [
        { id: 'a', text: '1/4' },
        { id: 'b', text: '3/8' },
        { id: 'c', text: '3/7' },
        { id: 'd', text: '1/2' },
      ],
      correctOptionId: 'b',
      variantRule: 'Total=8 bolas. P(amarilla)=3/8',
    },
    {
      id: 'b5_q4',
      baseProblemId: 29,
      statement: 'Si log₃(x) = 4, ¿cuánto vale x?',
      options: [
        { id: 'a', text: '12' },
        { id: 'b', text: '27' },
        { id: 'c', text: '64' },
        { id: 'd', text: '81' },
      ],
      correctOptionId: 'd',
      variantRule: 'Cambio de base (2→3) y resultado (5→4). 3⁴=81',
    },
    {
      id: 'b5_q5',
      baseProblemId: 30,
      statement: '¿Cuántos términos tiene la progresión aritmética: 3, 7, 11, …, 59?',
      options: [
        { id: 'a', text: '13' },
        { id: 'b', text: '14' },
        { id: 'c', text: '15' },
        { id: 'd', text: '16' },
      ],
      correctOptionId: 'c',
      variantRule: 'a₁=3, d=4, aₙ=59. 59=3+(n-1)×4 → 56=4(n-1) → n=15',
    },
  ],
};

export function getBossQuestions(worldId: number): BossVariant[] {
  return BOSS_VARIANTS[worldId] ?? [];
}

// Shuffle and return questions for a boss attempt (no repeats within attempt)
export function getShuffledBossQuestions(worldId: number): BossVariant[] {
  const questions = [...(BOSS_VARIANTS[worldId] ?? [])];
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}
