import React from 'react';

export function Avatar({ name = 'AB', size = 36, color = 'var(--mustard)', shape = 'square', tilt = 0 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  const radius = shape === 'circle' ? '50%' : shape === 'soft' ? '28%' : '4px';
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: color,
        fontSize: size * 0.42,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {initials}
    </span>
  );
}
