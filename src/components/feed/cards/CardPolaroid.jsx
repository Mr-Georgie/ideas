import React from 'react';
import { Tape } from '../../shared/Tape';
import { MetaRow } from './MetaRow';
import { ReactionRow } from './ReactionRow';

export function CardPolaroid({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: 'var(--paper)',
        padding: 12,
        paddingBottom: 18,
        border: '2px solid var(--ink)',
        transform: `rotate(${idea.tilt}deg)`,
        boxShadow: '6px 6px 0 var(--ink)',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Tape left="50%" top={-10} color="rgba(61,91,255,0.5)" tilt={2} />
      <div className="img-placeholder" style={{ height: 180, marginBottom: 12, fontSize: 11 }}>
        <div>
          <div style={{ fontSize: 14, marginBottom: 4 }}>📷</div>
          <div>{idea.image}</div>
        </div>
      </div>
      <MetaRow author={idea.author} posted={idea.posted} accent={idea.accent} />
      <div className="f-display" style={{ fontSize: 24, marginTop: 10 }}>{idea.title}</div>
      <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.4 }}>{idea.body}</div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ReactionRow reactions={idea.reactions} compact />
        <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>{idea.replies}↩</div>
      </div>
    </div>
  );
}
