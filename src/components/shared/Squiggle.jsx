import React from 'react';

export function Squiggle({ color = 'var(--ink)', height = 8 }) {
  const svg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8'><path d='M0 4 Q 12.5 0, 25 4 T 50 4 T 75 4 T 100 4' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='1.5'/></svg>`;
  return (
    <div
      style={{
        height,
        width: '100%',
        background: `url("${svg}") repeat-x center / 100px ${height}px`,
      }}
    />
  );
}
