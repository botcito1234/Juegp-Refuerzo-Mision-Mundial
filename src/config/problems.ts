import type { MathProblem } from '../types';

// ============================================================
// 30 MATH PROBLEMS — 3rd Secondary (Colegio Mundial)
// Verified solutions. Distributed across 5 worlds, 6 per world.
// ============================================================

export const PROBLEMS: MathProblem[] = [
  // ────────────────────────────────────────────────────────────
  // WORLD 1: CIUDAD DE LOS CÓDIGOS — Álgebra (Levels 1-6)
  // ────────────────────────────────────────────────────────────
  {
    id: 1,
    world: 1,
    level: 1,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Ecuaciones lineales',
    statement: 'Si 2x + 7 = 15, ¿cuánto vale x?',
    options: [
      { id: 'a', text: 'x = 3' },
      { id: 'b', text: 'x = 4' },
      { id: 'c', text: 'x = 5' },
      { id: 'd', text: 'x = 6' },
    ],
    correctOptionId: 'b',
    explanation:
      'Despejamos x: 2x = 15 − 7 = 8, entonces x = 8 ÷ 2 = 4. Comprobación: 2(4) + 7 = 15 ✓',
    referenceTime: 20,
    validated: true,
  },
  {
    id: 2,
    world: 1,
    level: 2,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Ecuaciones lineales con paréntesis',
    statement: 'Si 3(x − 2) = 12, entonces x vale:',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '5' },
      { id: 'c', text: '6' },
      { id: 'd', text: '7' },
    ],
    correctOptionId: 'c',
    explanation:
      'Distribuimos: 3x − 6 = 12. Sumamos 6: 3x = 18. Dividimos: x = 6. Comprobación: 3(6−2) = 3×4 = 12 ✓',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 3,
    world: 1,
    level: 3,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Planteamiento de ecuaciones',
    statement:
      'El doble de un número disminuido en 4 es igual a 10. ¿Cuál es ese número?',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '6' },
      { id: 'c', text: '7' },
      { id: 'd', text: '8' },
    ],
    correctOptionId: 'c',
    explanation:
      'Sea x el número. La ecuación es 2x − 4 = 10. Sumamos 4: 2x = 14. Dividimos: x = 7. Comprobación: 2(7) − 4 = 10 ✓',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 4,
    world: 1,
    level: 4,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Ecuaciones con variable en ambos lados',
    statement: 'Si 5x − 3 = 2x + 9, ¿cuánto vale x?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
    ],
    correctOptionId: 'b',
    explanation:
      'Agrupamos x: 5x − 2x = 9 + 3 → 3x = 12 → x = 4. Comprobación: 5(4)−3 = 17 y 2(4)+9 = 17 ✓',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 5,
    world: 1,
    level: 5,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Sistema de ecuaciones',
    statement:
      'La suma de dos números es 20 y su diferencia es 4. ¿Cuál es el número mayor?',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '11' },
      { id: 'c', text: '12' },
      { id: 'd', text: '14' },
    ],
    correctOptionId: 'c',
    explanation:
      'Sistema: x + y = 20 y x − y = 4. Sumando: 2x = 24, x = 12. Luego y = 8. El mayor es 12.',
    referenceTime: 35,
    validated: true,
  },
  {
    id: 6,
    world: 1,
    level: 6,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Factorización de trinomios',
    statement: '¿Cuál es la factorización correcta de x² − 7x + 12?',
    options: [
      { id: 'a', text: '(x − 2)(x − 6)' },
      { id: 'b', text: '(x − 3)(x − 4)' },
      { id: 'c', text: '(x + 3)(x + 4)' },
      { id: 'd', text: '(x − 1)(x − 12)' },
    ],
    correctOptionId: 'b',
    explanation:
      'Buscamos dos números que sumen 7 y multipliquen 12: son 3 y 4. Por tanto x² − 7x + 12 = (x − 3)(x − 4). Verificación: (x−3)(x−4) = x²−4x−3x+12 = x²−7x+12 ✓',
    referenceTime: 35,
    validated: true,
  },

  // ────────────────────────────────────────────────────────────
  // WORLD 2: BOSQUE DE LAS PROPORCIONES — Porcentajes (Levels 7-12)
  // ────────────────────────────────────────────────────────────
  {
    id: 7,
    world: 2,
    level: 7,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Porcentajes',
    statement: '¿Cuánto es el 30% de 240?',
    options: [
      { id: 'a', text: '60' },
      { id: 'b', text: '72' },
      { id: 'c', text: '80' },
      { id: 'd', text: '96' },
    ],
    correctOptionId: 'b',
    explanation:
      '30% de 240 = (30 ÷ 100) × 240 = 0.30 × 240 = 72. También: 10% de 240 = 24, entonces 30% = 3 × 24 = 72.',
    referenceTime: 20,
    validated: true,
  },
  {
    id: 8,
    world: 2,
    level: 8,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Fracciones de un número',
    statement: 'Si ¾ de un número es 18, ¿cuál es ese número?',
    options: [
      { id: 'a', text: '20' },
      { id: 'b', text: '22' },
      { id: 'c', text: '24' },
      { id: 'd', text: '27' },
    ],
    correctOptionId: 'c',
    explanation:
      '(3/4) × n = 18 → n = 18 × (4/3) = 72/3 = 24. Comprobación: (3/4) × 24 = 18 ✓',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 9,
    world: 2,
    level: 9,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Porcentaje de una parte',
    statement:
      'En una clase de 40 estudiantes, 16 son mujeres. ¿Qué porcentaje son varones?',
    options: [
      { id: 'a', text: '40%' },
      { id: 'b', text: '50%' },
      { id: 'c', text: '60%' },
      { id: 'd', text: '64%' },
    ],
    correctOptionId: 'c',
    explanation:
      'Varones = 40 − 16 = 24. Porcentaje = (24 ÷ 40) × 100 = 0.60 × 100 = 60%.',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 10,
    world: 2,
    level: 10,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Aumento porcentual',
    statement:
      'Un artículo cuesta S/ 80. Si su precio aumenta un 25%, ¿cuánto costará?',
    options: [
      { id: 'a', text: 'S/ 95' },
      { id: 'b', text: 'S/ 100' },
      { id: 'c', text: 'S/ 105' },
      { id: 'd', text: 'S/ 110' },
    ],
    correctOptionId: 'b',
    explanation:
      'Aumento = 80 × 0.25 = 20. Nuevo precio = 80 + 20 = S/ 100. Otra forma: 80 × 1.25 = 100.',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 11,
    world: 2,
    level: 11,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Razón y proporción',
    statement:
      'Dos números están en razón 3:5. Si su suma es 40, ¿cuál es el número mayor?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '20' },
      { id: 'c', text: '25' },
      { id: 'd', text: '30' },
    ],
    correctOptionId: 'c',
    explanation:
      'Los números son 3k y 5k. Entonces 3k + 5k = 40 → 8k = 40 → k = 5. El mayor es 5k = 5 × 5 = 25.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 12,
    world: 2,
    level: 12,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Proporcionalidad inversa',
    statement:
      '4 obreros construyen un muro en 9 días trabajando al mismo ritmo. ¿Cuántos días tardarán 6 obreros?',
    options: [
      { id: 'a', text: '4 días' },
      { id: 'b', text: '5 días' },
      { id: 'c', text: '6 días' },
      { id: 'd', text: '7 días' },
    ],
    correctOptionId: 'c',
    explanation:
      'Proporcionalidad inversa: más obreros → menos días. 4 × 9 = 6 × d → d = 36 ÷ 6 = 6 días.',
    referenceTime: 35,
    validated: true,
  },

  // ────────────────────────────────────────────────────────────
  // WORLD 3: DESIERTO DE LOS CRIPTOGRAMAS — Teoría de números (Levels 13-18)
  // ────────────────────────────────────────────────────────────
  {
    id: 13,
    world: 3,
    level: 13,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'MCD',
    statement: '¿Cuál es el Máximo Común Divisor (MCD) de 48 y 60?',
    options: [
      { id: 'a', text: '6' },
      { id: 'b', text: '8' },
      { id: 'c', text: '12' },
      { id: 'd', text: '24' },
    ],
    correctOptionId: 'c',
    explanation:
      '48 = 2⁴ × 3 y 60 = 2² × 3 × 5. MCD = producto de factores comunes con el menor exponente = 2² × 3 = 4 × 3 = 12.',
    referenceTime: 35,
    validated: true,
  },
  {
    id: 14,
    world: 3,
    level: 14,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'MCM',
    statement: '¿Cuál es el Mínimo Común Múltiplo (MCM) de 6, 8 y 12?',
    options: [
      { id: 'a', text: '12' },
      { id: 'b', text: '16' },
      { id: 'c', text: '24' },
      { id: 'd', text: '48' },
    ],
    correctOptionId: 'c',
    explanation:
      '6 = 2 × 3, 8 = 2³, 12 = 2² × 3. MCM = producto de cada factor primo con el mayor exponente = 2³ × 3 = 8 × 3 = 24.',
    referenceTime: 35,
    validated: true,
  },
  {
    id: 15,
    world: 3,
    level: 15,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Cantidad de divisores',
    statement: '¿Cuántos divisores tiene el número 36?',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '8' },
      { id: 'c', text: '9' },
      { id: 'd', text: '10' },
    ],
    correctOptionId: 'c',
    explanation:
      '36 = 2² × 3². La cantidad de divisores = (2+1)(2+1) = 3 × 3 = 9. Los divisores son: 1, 2, 3, 4, 6, 9, 12, 18, 36.',
    referenceTime: 35,
    validated: true,
  },
  {
    id: 16,
    world: 3,
    level: 16,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Acertijo de dígitos',
    statement:
      'La suma de los dígitos de un número de 2 cifras es 9. Al invertir sus dígitos, el nuevo número es 27 mayor. ¿Cuál es el número original?',
    options: [
      { id: 'a', text: '27' },
      { id: 'b', text: '36' },
      { id: 'c', text: '45' },
      { id: 'd', text: '54' },
    ],
    correctOptionId: 'b',
    explanation:
      'Sea el número = 10a + b. Condiciones: a + b = 9 y (10b + a) − (10a + b) = 27 → 9(b − a) = 27 → b − a = 3. Sumando: 2b = 12 → b = 6, a = 3. Número: 36.',
    referenceTime: 45,
    validated: true,
  },
  {
    id: 17,
    world: 3,
    level: 17,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Sucesión aritmética',
    statement:
      'En la sucesión aritmética 3, 7, 11, 15, … ¿Cuál es el décimo término?',
    options: [
      { id: 'a', text: '35' },
      { id: 'b', text: '38' },
      { id: 'c', text: '39' },
      { id: 'd', text: '43' },
    ],
    correctOptionId: 'c',
    explanation:
      'Primer término a₁ = 3, razón d = 4. Término n-ésimo: aₙ = a₁ + (n−1)d. a₁₀ = 3 + (10−1)×4 = 3 + 36 = 39.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 18,
    world: 3,
    level: 18,
    difficulty: 'hard',
    type: 'multiple_choice',
    topic: 'Criptograma numérico',
    statement:
      'En la operación ★4 + 4★ = 99, siendo ★ el mismo dígito en ambos casos, ¿qué número es ★?\n(★4 y 4★ representan números de dos cifras)',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '6' },
      { id: 'c', text: '7' },
      { id: 'd', text: '8' },
    ],
    correctOptionId: 'a',
    explanation:
      '★4 = 10★ + 4 y 4★ = 40 + ★. Sumando: (10★ + 4) + (40 + ★) = 11★ + 44 = 99. Entonces 11★ = 55 → ★ = 5. Verificación: 54 + 45 = 99 ✓',
    referenceTime: 45,
    validated: true,
  },

  // ────────────────────────────────────────────────────────────
  // WORLD 4: LABORATORIO DEL INGENIO — Geometría (Levels 19-24)
  // ────────────────────────────────────────────────────────────
  {
    id: 19,
    world: 4,
    level: 19,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Área del triángulo',
    statement: '¿Cuál es el área de un triángulo con base 10 cm y altura 8 cm?',
    options: [
      { id: 'a', text: '40 cm²' },
      { id: 'b', text: '48 cm²' },
      { id: 'c', text: '80 cm²' },
      { id: 'd', text: '18 cm²' },
    ],
    correctOptionId: 'a',
    explanation:
      'Área = (base × altura) ÷ 2 = (10 × 8) ÷ 2 = 80 ÷ 2 = 40 cm².',
    referenceTime: 20,
    validated: true,
  },
  {
    id: 20,
    world: 4,
    level: 20,
    difficulty: 'easy',
    type: 'multiple_choice',
    topic: 'Teorema de Pitágoras',
    statement:
      'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide su hipotenusa?',
    options: [
      { id: 'a', text: '8 cm' },
      { id: 'b', text: '9 cm' },
      { id: 'c', text: '10 cm' },
      { id: 'd', text: '12 cm' },
    ],
    correctOptionId: 'c',
    explanation:
      'Pitágoras: c² = a² + b² = 6² + 8² = 36 + 64 = 100. Entonces c = √100 = 10 cm.',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 21,
    world: 4,
    level: 21,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Perímetro del cuadrado',
    statement: 'Un cuadrado tiene un área de 64 cm². ¿Cuál es su perímetro?',
    options: [
      { id: 'a', text: '24 cm' },
      { id: 'b', text: '28 cm' },
      { id: 'c', text: '32 cm' },
      { id: 'd', text: '36 cm' },
    ],
    correctOptionId: 'c',
    explanation:
      'Si el área es 64 cm², entonces lado = √64 = 8 cm. Perímetro = 4 × lado = 4 × 8 = 32 cm.',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 22,
    world: 4,
    level: 22,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Área del círculo',
    statement:
      'El radio de un círculo es 7 cm. Usando π ≈ 22/7, ¿cuál es su área?',
    options: [
      { id: 'a', text: '44 cm²' },
      { id: 'b', text: '98 cm²' },
      { id: 'c', text: '154 cm²' },
      { id: 'd', text: '196 cm²' },
    ],
    correctOptionId: 'c',
    explanation:
      'Área = π × r² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 23,
    world: 4,
    level: 23,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Ángulos del triángulo',
    statement:
      'Los ángulos de un triángulo miden x°, 2x° y 3x°. ¿Cuánto mide el ángulo mayor?',
    options: [
      { id: 'a', text: '60°' },
      { id: 'b', text: '75°' },
      { id: 'c', text: '90°' },
      { id: 'd', text: '120°' },
    ],
    correctOptionId: 'c',
    explanation:
      'La suma de ángulos de un triángulo es 180°: x + 2x + 3x = 180° → 6x = 180° → x = 30°. El ángulo mayor es 3x = 3 × 30° = 90°.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 24,
    world: 4,
    level: 24,
    difficulty: 'hard',
    type: 'multiple_choice',
    topic: 'Volumen del prisma rectangular',
    statement:
      'Un prisma rectangular tiene dimensiones 4 cm × 5 cm × 6 cm. ¿Cuál es su volumen?',
    options: [
      { id: 'a', text: '60 cm³' },
      { id: 'b', text: '80 cm³' },
      { id: 'c', text: '100 cm³' },
      { id: 'd', text: '120 cm³' },
    ],
    correctOptionId: 'd',
    explanation:
      'Volumen = largo × ancho × alto = 4 × 5 × 6 = 120 cm³.',
    referenceTime: 20,
    validated: true,
  },

  // ────────────────────────────────────────────────────────────
  // WORLD 5: FORTALEZA DEL RAZONAMIENTO — Avanzado (Levels 25-30)
  // ────────────────────────────────────────────────────────────
  {
    id: 25,
    world: 5,
    level: 25,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Evaluación de funciones',
    statement: 'Si f(x) = x² − 3x + 2, ¿cuánto es f(4)?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '5' },
      { id: 'c', text: '6' },
      { id: 'd', text: '8' },
    ],
    correctOptionId: 'c',
    explanation:
      'Sustituimos x = 4: f(4) = 4² − 3(4) + 2 = 16 − 12 + 2 = 6.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 26,
    world: 5,
    level: 26,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Sucesión geométrica',
    statement:
      'En la sucesión geométrica 2, 6, 18, 54, … ¿Cuál es el 5° término?',
    options: [
      { id: 'a', text: '108' },
      { id: 'b', text: '162' },
      { id: 'c', text: '216' },
      { id: 'd', text: '256' },
    ],
    correctOptionId: 'b',
    explanation:
      'La razón es r = 6÷2 = 3. Término n-ésimo: aₙ = a₁ × rⁿ⁻¹. a₅ = 2 × 3⁴ = 2 × 81 = 162.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 27,
    world: 5,
    level: 27,
    difficulty: 'medium',
    type: 'multiple_choice',
    topic: 'Probabilidad clásica',
    statement:
      'Una bolsa contiene 5 bolas rojas y 3 bolas azules. ¿Cuál es la probabilidad de sacar una bola azul al azar?',
    options: [
      { id: 'a', text: '1/3' },
      { id: 'b', text: '3/8' },
      { id: 'c', text: '3/5' },
      { id: 'd', text: '5/8' },
    ],
    correctOptionId: 'b',
    explanation:
      'Total de bolas = 5 + 3 = 8. Bolas azules = 3. P(azul) = casos favorables ÷ total = 3/8.',
    referenceTime: 25,
    validated: true,
  },
  {
    id: 28,
    world: 5,
    level: 28,
    difficulty: 'hard',
    type: 'multiple_choice',
    topic: 'Ecuación cuadrática aplicada',
    statement:
      'Dos números enteros consecutivos tienen un producto de 72. ¿Cuál es la suma de esos dos números?',
    options: [
      { id: 'a', text: '14' },
      { id: 'b', text: '15' },
      { id: 'c', text: '17' },
      { id: 'd', text: '18' },
    ],
    correctOptionId: 'c',
    explanation:
      'Sea n y n+1 los números. n(n+1) = 72 → n² + n − 72 = 0 → (n−8)(n+9) = 0 → n = 8. Los números son 8 y 9. Suma = 17.',
    referenceTime: 40,
    validated: true,
  },
  {
    id: 29,
    world: 5,
    level: 29,
    difficulty: 'hard',
    type: 'multiple_choice',
    topic: 'Logaritmos',
    statement: 'Si log₂(x) = 5, ¿cuánto vale x?',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '16' },
      { id: 'c', text: '25' },
      { id: 'd', text: '32' },
    ],
    correctOptionId: 'd',
    explanation:
      'log₂(x) = 5 significa que 2⁵ = x. Calculamos: 2⁵ = 2×2×2×2×2 = 32. Por tanto x = 32.',
    referenceTime: 30,
    validated: true,
  },
  {
    id: 30,
    world: 5,
    level: 30,
    difficulty: 'hard',
    type: 'multiple_choice',
    topic: 'Conteo de términos en progresión aritmética',
    statement:
      '¿Cuántos términos tiene la progresión aritmética: 5, 9, 13, …, 61?',
    options: [
      { id: 'a', text: '12' },
      { id: 'b', text: '13' },
      { id: 'c', text: '14' },
      { id: 'd', text: '15' },
    ],
    correctOptionId: 'd',
    explanation:
      'Primer término a₁ = 5, último aₙ = 61, razón d = 4. Fórmula: aₙ = a₁ + (n−1)d → 61 = 5 + (n−1)×4 → 56 = 4(n−1) → n−1 = 14 → n = 15.',
    referenceTime: 40,
    validated: true,
  },
];

export function getProblemByLevel(level: number): MathProblem | undefined {
  return PROBLEMS.find((p) => p.level === level);
}

export function getProblemsByWorld(worldId: number): MathProblem[] {
  return PROBLEMS.filter((p) => p.world === worldId);
}
