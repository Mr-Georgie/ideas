import React from 'react';

export function Tag({ children, color = 'var(--ink)', filled = false, tilt = 0 }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '3px 7px',
        border: `1.5px solid ${color}`,
        background: filled ? color : 'transparent',
        color: filled ? 'var(--paper)' : color,
        display: 'inline-block',
        transform: `rotate(${tilt}deg)`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
