import React from 'react';

const PATHS = {
  feed:     'M2 4h20M2 12h20M2 20h20',
  plus:     'M12 5v14M5 12h14',
  bell:     'M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9zm3 13a3 3 0 006 0',
  user:     'M12 12a4 4 0 100-8 4 4 0 000 8zm-8 9a8 8 0 0116 0',
  back:     'M15 18l-6-6 6-6',
  close:    'M18 6L6 18M6 6l12 12',
  bookmark: 'M5 3h14v18l-7-4-7 4z',
  share:    'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13',
  fire:     'M12 2s4 5 4 9a4 4 0 11-8 0c0-2 2-3 2-3s-1 4 2 4',
  edit:     'M12 20h9M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4z',
  image:    'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6',
  arrow:    'M5 12h14M13 5l7 7-7 7',
  sparkle:  'M12 2v6m0 8v6M2 12h6m8 0h6M5 5l4 4M19 19l-4-4M5 19l4-4M19 5l-4 4',
  check:    'M5 12l5 5L20 7',
  quote:    'M3 21c3-1 5-3 5-9V5h7v7H8m9 9c3-1 5-3 5-9V5h-7v7h7',
};

export function Icon({ name, size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
