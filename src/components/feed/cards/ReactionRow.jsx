import React from 'react';
import { Stamp } from '../../shared/Stamp';

const REACTION_DEFS = [
  { k: 'weird', label: 'WEIRD',    color: 'var(--mustard)' },
  { k: 'build', label: 'BUILD IT', color: 'var(--lime)' },
  { k: 'more',  label: 'MORE',     color: 'var(--pink)' },
  { k: 'huh',   label: 'HUH?',    color: 'var(--blue)' },
  { k: 'bad',   label: 'BAD IDEA', color: 'var(--red)' },
];

export function ReactionRow({ reactions, compact = false }) {
  const sorted = [...REACTION_DEFS].sort((a, b) => (reactions[b.k] || 0) - (reactions[a.k] || 0));
  const shown = compact ? sorted.slice(0, 3) : sorted;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {shown.map((it, i) => (
        <Stamp key={it.k} color={it.color} count={reactions[it.k]} tilt={i % 2 === 0 ? -0.7 : 0.6} size="sm">
          {it.label}
        </Stamp>
      ))}
    </div>
  );
}

export { REACTION_DEFS };
