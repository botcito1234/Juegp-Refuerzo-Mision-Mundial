import type { WorldConfig } from '../types';

export const WORLDS: WorldConfig[] = [
  {
    id: 1,
    name: 'Ciudad de los Códigos',
    subtitle: 'Álgebra y Ecuaciones',
    description: 'Entre rascacielos de cristal y circuitos luminosos, las ecuaciones cobran vida. El Código Guardián te desafía.',
    colorPrimary: '#1a3a6e',
    colorSecondary: '#4a9ede',
    colorAccent: '#f5c518',
    bgGradient: ['#0d1f3c', '#1a3a6e'],
    bgImage: '/assets/backgrounds/world-1-ciudad.png',
    enemyName: 'Dron Ecuación',
    bossName: 'Código Guardián',
    bossDescription: 'El villano que cifró todas las ecuaciones. Responde 4 de 5 para liberarlas.',
    levelRange: [1, 6],
  },
  {
    id: 2,
    name: 'Bosque de las Proporciones',
    subtitle: 'Porcentajes y Razones',
    description: 'En este bosque mágico cada árbol guarda secretos numéricos. La Bestia Proporcional custodia el paso.',
    colorPrimary: '#1a5c2e',
    colorSecondary: '#4caf50',
    colorAccent: '#f5c518',
    bgGradient: ['#0a2e14', '#1a5c2e'],
    bgImage: '/assets/backgrounds/world-2-bosque.png',
    enemyName: 'Hongo Raíz',
    bossName: 'Bestia Proporcional',
    bossDescription: 'Guardiana del bosque encantado. Vence 4 de 5 desafíos para cruzar.',
    levelRange: [7, 12],
  },
  {
    id: 3,
    name: 'Desierto de los Criptogramas',
    subtitle: 'Teoría de Números',
    description: 'El sol arde sobre arenas llenas de cifras. El Criptomante oculta los números bajo acertijos.',
    colorPrimary: '#7a4a00',
    colorSecondary: '#e8762b',
    colorAccent: '#f5c518',
    bgGradient: ['#3d2000', '#7a4a00'],
    bgImage: '/assets/backgrounds/world-3-desierto.png',
    enemyName: 'Escorpión Divisor',
    bossName: 'El Criptomante',
    bossDescription: 'Maestro de los acertijos numéricos. Necesitas 4 aciertos de 5 para derrotarlo.',
    levelRange: [13, 18],
  },
  {
    id: 4,
    name: 'Laboratorio del Ingenio',
    subtitle: 'Geometría',
    description: 'Un laboratorio futurista donde las formas cobran vida. El Protogeómetra controla cada figura.',
    colorPrimary: '#4a0070',
    colorSecondary: '#9c27b0',
    colorAccent: '#e8762b',
    bgGradient: ['#1a0030', '#4a0070'],
    bgImage: '/assets/backgrounds/world-4-laboratorio.png',
    enemyName: 'Cubo Mutante',
    bossName: 'Protogeómetra',
    bossDescription: 'Creador de figuras imposibles. Derrótalo respondiendo 4 de 5 correctamente.',
    levelRange: [19, 24],
  },
  {
    id: 5,
    name: 'Fortaleza del Razonamiento',
    subtitle: 'Razonamiento Avanzado',
    description: 'La fortaleza final donde convergen todas las matemáticas. El Gran Razonador te aguarda.',
    colorPrimary: '#6e1a1a',
    colorSecondary: '#de4a4a',
    colorAccent: '#f5c518',
    bgGradient: ['#3c0d0d', '#6e1a1a'],
    bgImage: '/assets/backgrounds/world-5-fortaleza.png',
    enemyName: 'Centinela Lógico',
    bossName: 'El Gran Razonador',
    bossDescription: 'El jefe final. Maestro de todas las matemáticas. 4 de 5 para completar la misión.',
    levelRange: [25, 30],
  },
];

export function getWorldById(id: number): WorldConfig | undefined {
  return WORLDS.find((w) => w.id === id);
}

export function getWorldForLevel(levelNumber: number): WorldConfig {
  const world = WORLDS.find(
    (w) => levelNumber >= w.levelRange[0] && levelNumber <= w.levelRange[1],
  );
  return world ?? WORLDS[0];
}
