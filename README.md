# Misión Mundial: Desafío Matemático
**Colegio Mundial — 3.° Secundaria**

Videojuego educativo de razonamiento matemático. 5 mundos, 30 problemas, 5 jefes épicos.

---

## Instalación y ejecución local

```bash
cd mision-mundial
npm install
npm run dev
```
Abre http://localhost:5173 en el navegador.

## Compilar para producción

```bash
npm run build
```
Los archivos estáticos quedan en `/dist`.

## Desplegar en Vercel

### Opción A — CLI
```bash
npm install -g vercel
vercel --prod
```

### Opción B — Dashboard Vercel
1. Sube el proyecto a un repositorio GitHub.
2. Entra a https://vercel.com/new y conecta el repositorio.
3. Vercel detecta Vite automáticamente. Haz clic en **Deploy**.
4. El archivo `vercel.json` ya está configurado.

## Ejecutar pruebas

```bash
npm run test
```
28 pruebas cubre las 25 verificaciones obligatorias del proyecto.

---

## Colocar el logotipo oficial del Colegio Mundial

1. Coloca los archivos en `/public/assets/branding/`:
   - `logo-light.svg` — para fondos oscuros (pantallas del juego)
   - `logo-dark.svg`  — para fondos claros (si aplica)
2. En `src/config/gameConfig.ts`, línea `LOGO_PATH`, cambia el valor:
   ```ts
   LOGO_PATH: '/assets/branding/logo-light.svg',
   ```
3. El componente `Logo.tsx` carga la imagen automáticamente.
   Si el archivo no existe, muestra el texto "Colegio Mundial" como respaldo.

---

## Ajustar configuración del juego

Todos los valores de balance están en **`src/config/gameConfig.ts`**:

| Parámetro | Valor actual | Descripción |
|-----------|-------------|-------------|
| `POINTS_CORRECT_ANSWER` | 100 | Puntos por respuesta correcta |
| `POINTS_FIRST_TRY_BONUS` | 50 | Bono primer intento |
| `POINTS_MAX_SPEED_BONUS` | 50 | Bono máximo por rapidez |
| `POINTS_WORLD_COMPLETE` | 300 | Bono al completar mundo |
| `POINTS_PER_LIFE_REMAINING` | 100 | Bono por vida restante |
| `BOSS_DEFEAT_POINTS` | 400-1000 | Puntos por jefe derrotado |
| `STREAK_BONUS_BASE` | 20 | Bono racha base |
| `BOSS_QUESTIONS_TO_WIN` | 4 | Aciertos para vencer al jefe |
| `LIVES_ON_WORLD_START` | 3 | Vidas al iniciar mundo |

---

## Arquitectura técnica

```
src/
├── config/
│   ├── gameConfig.ts     ← Configuración centralizada
│   ├── problems.ts       ← 30 problemas matemáticos verificados
│   ├── worlds.ts         ← 5 configuraciones de mundo
│   └── bossVariants.ts   ← Variantes para los 5 jefes
├── store/
│   └── gameStore.ts      ← Estado global (Zustand, sin persistencia)
├── hooks/
│   ├── useGameTimer.ts   ← Cronómetro ascendente
│   ├── useSpeech.ts      ← Web Speech API
│   ├── useAudio.ts       ← Web Audio API (tonos generados)
│   └── useAbandonDetection.ts ← Detecta abandono y reinicia
├── utils/
│   └── scoring.ts        ← Cálculos de puntuación
├── components/
│   ├── ui/               ← Pantallas y controles
│   └── game/             ← Lógica de nivel y jefe
└── __tests__/
    └── game.test.ts      ← 28 pruebas automatizadas
```

**Stack:** React 18 · Vite · TypeScript · Zustand · @react-three/fiber · Web Audio API · Web Speech API

**Sin backend. Sin base de datos. Sin login. Despliegue estático.**

---

## Sistema de puntuación

```
Respuesta correcta:       +100 pts
Primer intento:           +50  pts
Rapidez (< 5 seg):        +50  pts (decrece hasta 0 a los 30 seg)
Racha (×2, ×3, ...):      +20, +40, ..., máx +100 pts
Completar mundo:          +300 pts
Vida restante:            +100 pts c/u
Jefe 1-4:                 +400/500/600/700 pts
Jefe final:               +1000 pts
```

## Rangos finales

| Rango | Precisión mínima | Puntuación mínima |
|-------|-----------------|-------------------|
| Maestro del Razonamiento | 90% | 8000 |
| Guardián Matemático | 80% | 6000 |
| Estratega | 70% | 4000 |
| Explorador | 55% | 2000 |
| Aprendiz | 0% | 0 |

## Sistema de reinicio por abandono

- El estado vive **únicamente en memoria RAM** durante la sesión activa.
- Si el jugador cambia de pestaña, minimiza o regresa después de salir, se detecta el evento `visibilitychange` y se invoca `resetGame()`.
- `beforeunload` activa un diálogo nativo de confirmación del navegador.
- No se usa LocalStorage, SessionStorage, IndexedDB ni cookies.
- Al regresar, el jugador ve la pantalla de título con la partida borrada.

## Limitaciones conocidas

- Los modelos 3D son procedurales/emoji (sin archivos externos). Se pueden reemplazar por modelos `.glb` en `@react-three/drei`.
- La música de fondo es generada con Web Audio API (tonos simples). Se puede agregar un sistema de tracks `.mp3` en `src/hooks/useAudio.ts`.
- La síntesis de voz depende del soporte del navegador. En iOS Safari puede requerir que el usuario habilite "Speak Selection".
- La detección de abandono tiene limitaciones nativas del navegador: no puede impedir físicamente que el usuario cierre la pestaña.
