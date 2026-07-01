import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { WORLDS } from '../../config/worlds';
import { useAudio } from '../../hooks/useAudio';
import type { WorldId } from '../../types';
import { HUD } from './HUD';

const WORLD_EMOJI  = ['🏙️', '🌲', '🏜️', '🔬', '🏰'];
const BOSS_EMOJI   = ['🤖', '🐉', '🦂', '👾', '💀'];
const LEVEL_THEMES = [
  ['📐','🔢','➕','✖️','🔄','🎯'],
  ['🌿','🍀','🎋','🌺','🌸','🍃'],
  ['🌵','💎','🔑','🌙','⚡','🔆'],
  ['🔭','⚗️','🧬','🔬','💡','🧩'],
  ['⚔️','🛡️','🏹','💎','🔮','👑'],
];
// Sky/ambient gradients for each world (base layer beneath SVG scene)
const WORLD_SKY = [
  ['#04060f', '#0d1535', '#1a0a35'],   // city: cyberpunk night
  ['#020e04', '#0a2a0a', '#041508'],   // forest: deep forest
  ['#1a0a00', '#3a1a00', '#0a0400'],   // desert: warm dusk
  ['#080010', '#180035', '#0d0020'],   // lab: deep space purple
  ['#0e0205', '#200408', '#080008'],   // fortress: stormy crimson
];

export const WorldMap: React.FC = () => {
  const completedLevels = useGameStore((s) => s.completedLevels);
  const defeatedBosses  = useGameStore((s) => s.defeatedBosses);
  const startLevel      = useGameStore((s) => s.startLevel);
  const startBoss       = useGameStore((s) => s.startBoss);
  const currentWorld    = useGameStore((s) => s.currentWorld);
  const { playClick, playUnlock } = useAudio();
  const [selectedWorld, setSelectedWorld] = useState<number>(currentWorld);

  const world = WORLDS[selectedWorld - 1];
  const wIdx  = selectedWorld - 1;
  const [ws]  = world.levelRange;
  const sky   = WORLD_SKY[wIdx];

  const isWorldUnlocked = (wid: number) =>
    wid === 1 || defeatedBosses.has((wid - 1) as WorldId);

  const isBossUnlocked = (wid: number) => {
    const [ws2, we] = WORLDS[wid - 1].levelRange;
    for (let l = ws2; l <= we; l++) if (!completedLevels.has(l)) return false;
    return true;
  };

  const handleLevel = (level: number) => {
    if (!completedLevels.has(level - 1) && level > ws) return;
    if (completedLevels.has(level)) return;
    playClick();
    startLevel(level);
  };

  const handleBoss = (wid: WorldId) => {
    if (!isBossUnlocked(wid)) return;
    playUnlock();
    startBoss(wid);
  };

  const selectWorld = (wid: number) => {
    if (!isWorldUnlocked(wid)) return;
    playClick();
    setSelectedWorld(wid);
  };

  const bossUnlocked = isBossUnlocked(selectedWorld);
  const bossDefeated = defeatedBosses.has(selectedWorld as WorldId);

  // ── Level node ──
  const levelNode = (idx: number) => {
    const level     = ws + idx;
    const done      = completedLevels.has(level);
    const available = level === ws || completedLevels.has(level - 1);
    const locked    = !available && !done;
    const icon      = LEVEL_THEMES[wIdx][idx];

    return (
      <div key={level} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
        {/* Stars above completed nodes */}
        <div style={{ height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
          {done && <span style={{ fontSize: 14, filter: 'drop-shadow(0 0 4px gold)' }}>⭐</span>}
        </div>

        {/* Main circle button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => !locked && !done && handleLevel(level)}
            disabled={locked || done}
            style={{
              width: 68, height: 68,
              borderRadius: '50%',
              border: `4px solid ${done
                ? world.colorAccent
                : available
                ? world.colorSecondary
                : 'rgba(255,255,255,0.12)'}`,
              background: done
                ? `radial-gradient(circle at 38% 28%, ${world.colorSecondary}dd, ${world.colorPrimary})`
                : available
                ? `radial-gradient(circle at 38% 28%, rgba(255,255,255,0.28), rgba(255,255,255,0.08))`
                : 'rgba(8,12,28,0.75)',
              boxShadow: done
                ? `0 0 24px ${world.colorAccent}cc, inset 0 2px 6px rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.7)`
                : available
                ? `0 0 18px ${world.colorSecondary}66, inset 0 2px 4px rgba(255,255,255,0.15), 0 6px 14px rgba(0,0,0,0.6)`
                : `inset 0 2px 8px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.5)`,
              cursor: locked || done ? 'default' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.15s, box-shadow 0.15s',
              opacity: locked ? 0.38 : 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span style={{ fontSize: done ? 26 : locked ? 20 : 24, lineHeight: 1 }}>
              {done ? icon : locked ? '🔒' : icon}
            </span>
            {!done && !locked && (
              <span style={{
                fontSize: 9, fontWeight: 900, lineHeight: 1.1,
                color: world.colorAccent,
                textShadow: `0 0 6px ${world.colorAccent}`,
              }}>NV.{idx + 1}</span>
            )}
          </button>

          {/* Platform shadow beneath button */}
          <div style={{
            position: 'absolute',
            bottom: -6, left: '50%',
            transform: 'translateX(-50%)',
            width: 52, height: 10,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${done ? world.colorAccent : available ? world.colorSecondary : 'rgba(255,255,255,0.1)'}44, transparent 70%)`,
            filter: 'blur(2px)',
          }} />

          {/* Pulsing ring for available level */}
          {available && !done && (
            <div className="pvz-pulse" style={{
              position: 'absolute', inset: -8,
              borderRadius: '50%',
              border: `3px solid ${world.colorSecondary}`,
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          )}
        </div>

        {/* Level number label below */}
        <div style={{ height: 16, marginTop: 6 }}>
          {!locked && (
            <span style={{
              fontSize: 10, fontWeight: 800,
              color: done ? world.colorAccent : 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>{done ? '¡Hecho!' : `Nv. ${idx + 1}`}</span>
          )}
        </div>
      </div>
    );
  };

  // ── Dotted path ──
  const hPath = (key: string) => (
    <div key={key} style={{
      flex: 1, height: 10, alignSelf: 'center', margin: '0 4px', marginBottom: 16,
      backgroundImage: `radial-gradient(circle, ${world.colorSecondary}cc 3.5px, transparent 3.5px)`,
      backgroundSize: '16px 10px',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center',
    }} />
  );

  const vPath = (side: 'left' | 'right') => (
    <div style={{
      height: 32,
      paddingRight: side === 'right' ? 30 : 0,
      paddingLeft:  side === 'left'  ? 30 : 0,
      display: 'flex', justifyContent: side,
    }}>
      <div style={{
        width: 10,
        backgroundImage: `radial-gradient(circle, ${world.colorSecondary}cc 3.5px, transparent 3.5px)`,
        backgroundSize: '10px 16px',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'center',
      }} />
    </div>
  );

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      background: `radial-gradient(ellipse at 50% 0%, ${sky[1]}ff 0%, ${sky[0]}ff 55%, ${sky[2]}ff 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Thematic background photo */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url(${world.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${sky[0]}66 0%, ${sky[0]}a0 50%, ${sky[2]}f0 100%)`,
        }} />
      </div>

      <HUD />

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

        {/* ── World island selector ── */}
        <div style={{ display: 'flex', gap: 8, padding: '10px 10px 6px', overflowX: 'auto', flexShrink: 0, alignItems: 'flex-end' }}>
          {WORLDS.map((w, i) => {
            const unlocked = isWorldUnlocked(w.id);
            const defeated = defeatedBosses.has(w.id);
            const sel      = selectedWorld === w.id;
            const wSky     = WORLD_SKY[i];
            return (
              <button key={w.id} onClick={() => selectWorld(w.id)} style={{
                flex: '0 0 auto',
                width: sel ? 80 : 62,
                height: sel ? 90 : 70,
                borderRadius: 16,
                border: `3px solid ${sel ? w.colorAccent : 'rgba(255,255,255,0.08)'}`,
                background: sel
                  ? `linear-gradient(170deg, ${wSky[1]}55 0%, ${wSky[0]}cc 100%), url(${w.bgImage}) center/cover`
                  : `linear-gradient(170deg, ${wSky[0]}bb 0%, ${wSky[2]}bb 100%), url(${w.bgImage}) center/cover`,
                boxShadow: sel
                  ? `0 0 28px ${w.colorAccent}aa, 0 -4px 16px ${w.colorAccent}44, 0 10px 24px rgba(0,0,0,0.7)`
                  : '0 4px 12px rgba(0,0,0,0.5)',
                cursor: unlocked ? 'pointer' : 'default',
                opacity: unlocked ? 1 : 0.3,
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                transform: sel ? 'translateY(-8px)' : 'translateY(0)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 4px 6px',
                touchAction: 'manipulation',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Island glow top */}
                {sel && (
                  <div style={{
                    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                    width: 60, height: 30,
                    background: `radial-gradient(ellipse, ${w.colorAccent}44, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}
                <span style={{ fontSize: sel ? 30 : 24, lineHeight: 1, filter: sel ? `drop-shadow(0 0 8px ${w.colorAccent})` : 'none' }}>
                  {WORLD_EMOJI[i]}
                </span>
                {/* Island ground strip */}
                <div style={{
                  width: '90%', height: sel ? 18 : 14, borderRadius: 6,
                  background: `linear-gradient(180deg, ${w.colorPrimary}, ${w.bgGradient[1]})`,
                  border: `1.5px solid ${sel ? w.colorAccent : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 8, fontWeight: 900, color: sel ? w.colorAccent : 'rgba(255,255,255,0.45)' }}>
                    {defeated ? '✅' : unlocked ? `M${w.id}` : '🔒'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* World title banner */}
        <div style={{
          margin: '6px 12px 4px',
          padding: '8px 14px',
          background: `linear-gradient(90deg, ${world.colorPrimary}ee, ${world.bgGradient[1]}88)`,
          border: `1.5px solid ${world.colorAccent}44`,
          borderRadius: 12,
          flexShrink: 0,
        }}>
          <div style={{ color: world.colorAccent, fontSize: 16, fontWeight: 900, letterSpacing: '0.02em' }}>
            {WORLD_EMOJI[wIdx]}&nbsp;{world.name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 1 }}>
            {world.subtitle}
          </div>
        </div>

        {/* ── Snake level path ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10px 0 14px' }}>

          {/* Row 1: Nv.1 → Nv.2 → Nv.3 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {levelNode(0)}
            {hPath('h1a')}
            {levelNode(1)}
            {hPath('h1b')}
            {levelNode(2)}
          </div>

          {vPath('right')}

          {/* Row 2: Nv.6 ← Nv.5 ← Nv.4  (4 is on right, below 3) */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {levelNode(5)}
            {hPath('h2a')}
            {levelNode(4)}
            {hPath('h2b')}
            {levelNode(3)}
          </div>

          {vPath('left')}

          {/* ── Boss ── */}
          <button
            onClick={() => bossUnlocked && !bossDefeated && handleBoss(selectedWorld as WorldId)}
            disabled={!bossUnlocked || bossDefeated}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px',
              borderRadius: 22,
              border: `3px solid ${bossDefeated ? '#c060ff' : bossUnlocked ? '#ff3a3a' : 'rgba(255,255,255,0.1)'}`,
              background: bossDefeated
                ? 'linear-gradient(135deg, #2a1050cc, #6a20c0cc)'
                : bossUnlocked
                ? 'linear-gradient(135deg, #4a0a0acc, #cc2020cc)'
                : 'rgba(0,0,0,0.5)',
              boxShadow: bossUnlocked && !bossDefeated
                ? '0 0 36px rgba(255,58,58,0.6), 0 8px 24px rgba(0,0,0,0.7)'
                : bossDefeated
                ? '0 0 24px rgba(192,96,255,0.5)'
                : 'none',
              cursor: bossUnlocked && !bossDefeated ? 'pointer' : 'default',
              opacity: !bossUnlocked && !bossDefeated ? 0.35 : 1,
              transition: 'all 0.2s',
              width: '100%',
              touchAction: 'manipulation',
            }}
          >
            <div style={{ position: 'relative' }}>
              <span style={{
                fontSize: 46, lineHeight: 1,
                filter: bossUnlocked && !bossDefeated ? 'drop-shadow(0 0 10px rgba(255,80,80,0.9))' : 'none',
              }}>
                {bossDefeated ? '👑' : bossUnlocked ? BOSS_EMOJI[wIdx] : '🔒'}
              </span>
              {bossUnlocked && !bossDefeated && (
                <div className="boss-pulse" style={{
                  position: 'absolute', inset: -6,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,80,80,0.7)',
                  pointerEvents: 'none',
                }} />
              )}
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                {world.bossName}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 }}>
                {bossDefeated
                  ? '¡Derrotado! 👑'
                  : bossUnlocked
                  ? '¡Toca para combatir!'
                  : 'Completa los 6 niveles primero'}
              </div>
            </div>
            {bossUnlocked && !bossDefeated && (
              <span style={{ fontSize: 10, fontWeight: 900, color: '#ff6060', padding: '3px 7px', border: '1px solid #ff4040', borderRadius: 6, flexShrink: 0, letterSpacing: '0.05em' }}>
                JEFE
              </span>
            )}
          </button>
        </div>

        {defeatedBosses.has(selectedWorld as WorldId) && selectedWorld < 5 && (
          <div style={{ margin: '6px 12px 8px', padding: '8px 14px', textAlign: 'center', background: 'rgba(74,158,222,0.15)', border: '1px solid rgba(74,158,222,0.3)', borderRadius: 10, color: '#87ceeb', fontSize: 12 }}>
            ✨ ¡Mundo {selectedWorld + 1} desbloqueado!
          </div>
        )}
        {defeatedBosses.size === 5 && (
          <div style={{ margin: '6px 12px 10px', padding: '10px 14px', textAlign: 'center', background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', borderRadius: 10, color: '#f5c518', fontSize: 14, fontWeight: 700 }}>
            🏆 ¡Misión completada!
          </div>
        )}
      </div>

      <style>{`
        .pvz-pulse {
          animation: pvzPulse 1.6s ease-in-out infinite;
        }
        @keyframes pvzPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
        .boss-pulse {
          animation: bossPulse 1.2s ease-in-out infinite;
        }
        @keyframes bossPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.25); }
        }
        .star-twinkle {
          animation: twinkle 2.5s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
