import React from 'react';
import { Tag } from '../../shared/Tag';
import { MetaRow } from './MetaRow';
import { ReactionRow } from './ReactionRow';

export function CardHalftone({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{ position: 'relative', transform: `rotate(${idea.tilt}deg)`, cursor: 'pointer' }}
    >
      <div style={{ position: 'absolute', inset: '8px -6px -6px 8px', color: idea.accent }} className="halftone-lg" />
      <div style={{ position: 'relative', background: 'var(--paper)', border: '3px solid var(--ink)', padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <Tag color={idea.accent} filled tilt={-2}>WHAT IF</Tag>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{idea.posted} ago</div>
        </div>
        <div className="f-display" style={{ fontSize: 36, lineHeight: 0.92, color: 'var(--ink)', marginTop: 6 }}>
          <span style={{ background: idea.accent, padding: '0 4px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
            {idea.title}
          </span>
        </div>
        <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.4 }}>{idea.body}</div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MetaRow author={idea.author} posted={idea.posted} accent={idea.accent} />
        </div>
        <div style={{ marginTop: 12 }}>
          <ReactionRow reactions={idea.reactions} compact />
        </div>
      </div>
    </div>
  );
}
