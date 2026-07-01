import React from 'react';
import { GAME_CONFIG } from '../../config/gameConfig';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Displays the school logo or a branded placeholder if the logo is missing.
// To add the official logo:
//   1. Place logo-light.svg in /public/assets/branding/logo-light.svg
//   2. Place logo-dark.svg  in /public/assets/branding/logo-dark.svg
//   3. Update GAME_CONFIG.LOGO_PATH
export const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'md', className = '' }) => {
  const [error, setError] = React.useState(false);
  const heights: Record<string, number> = { sm: 32, md: 48, lg: 64 };
  const h = heights[size];

  if (error) {
    return (
      <div
        className={className}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <span
          style={{
            fontSize: h * 0.35,
            fontWeight: 800,
            color: variant === 'light' ? '#f5c518' : '#1a3a6e',
            letterSpacing: '0.05em',
            textShadow: variant === 'light' ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {GAME_CONFIG.SCHOOL_NAME}
        </span>
      </div>
    );
  }

  return (
    <img
      src={GAME_CONFIG.LOGO_PATH}
      alt={GAME_CONFIG.SCHOOL_NAME}
      height={h}
      className={className}
      style={{ objectFit: 'contain', maxWidth: h * 4 }}
      onError={() => setError(true)}
    />
  );
};
