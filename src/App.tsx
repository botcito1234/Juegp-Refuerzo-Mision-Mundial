import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { useAbandonDetection } from './hooks/useAbandonDetection';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

// Screens
import { LoadingScreen } from './components/ui/LoadingScreen';
import { TitleScreen } from './components/ui/TitleScreen';
import { WarningScreen } from './components/ui/WarningScreen';
import { IntroScreen } from './components/ui/IntroScreen';
import { WorldMap } from './components/ui/WorldMap';
import { LevelScreen } from './components/game/LevelScreen';
import { BossBattle } from './components/game/BossBattle';
import { FinalScreen } from './components/ui/FinalScreen';

// Global keyframe animations injected once
const GLOBAL_CSS = `
  @keyframes float {
    from { transform: translateY(0px); }
    to   { transform: translateY(-8px); }
  }
  @keyframes pulse {
    from { transform: scale(1); }
    to   { transform: scale(1.08); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  * { -webkit-tap-highlight-color: transparent; }
  button:active { opacity: 0.85; }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById('game-global-css')) return;
    const style = document.createElement('style');
    style.id = 'game-global-css';
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return null;
}

// WebGL detection
function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function App() {
  const screen = useGameStore((s) => s.screen);
  const setWebGL = useGameStore((s) => s.setWebGL);

  useEffect(() => {
    setWebGL(checkWebGL());
  }, [setWebGL]);

  // Abandon detection — resets session if user leaves mid-game
  useAbandonDetection();
  useBackgroundMusic();

  const renderScreen = () => {
    switch (screen) {
      case 'loading':       return <LoadingScreen />;
      case 'title':         return <TitleScreen />;
      case 'warning':       return <WarningScreen />;
      case 'intro':         return <IntroScreen />;
      case 'worldMap':      return <WorldMap />;
      case 'level':         return <LevelScreen />;
      case 'boss':          return <BossBattle />;
      case 'final':         return <FinalScreen />;
      default:              return <LoadingScreen />;
    }
  };

  return (
    <>
      <StyleInjector />
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {renderScreen()}
      </div>
    </>
  );
}
