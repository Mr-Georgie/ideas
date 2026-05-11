import React from 'react';
import { ReactionRow } from './ReactionRow';

export function CardReceipt({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: 'var(--paper)',
        padding: '16px 14px 18px',
        border: '2px solid var(--ink)',
        transform: `rotate(${idea.tilt}deg)`,
        maxWidth: '88%',
        margin: '0 auto',
        position: 'relative',
        boxShadow: '4px 4px 0 var(--ink)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 96%, 95% 100%, 90% 96%, 85% 100%, 80% 96%, 75% 100%, 70% 96%, 65% 100%, 60% 96%, 55% 100%, 50% 96%, 45% 100%, 40% 96%, 35% 100%, 30% 96%, 25% 100%, 20% 96%, 15% 100%, 10% 96%, 5% 100%, 0% 96%)',
        cursor: 'pointer',
      }}
    >
      <div className="f-mono" style={{ fontSize: 9, textAlign: 'center', letterSpacing: '0.2em', color: 'var(--ink-3)', borderBottom: '1px dashed var(--ink-3)', paddingBottom: 8, marginBottom: 10 }}>
        ━━━ IDIAS RECEIPT ━━━
      </div>
      <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FROM</span><span>{idea.author.name.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>POSTED</span><span>{idea.posted} AGO</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>RECORD</span><span>{idea.author.tag.toUpperCase()}</span>
        </div>
      </div>
      <div style={{ borderTop: '1px dashed var(--ink-3)', borderBottom: '1px dashed var(--ink-3)', padding: '10px 0', margin: '10px 0' }}>
        <div className="f-display" style={{ fontSize: 24, lineHeight: 1 }}>{idea.title}</div>
        <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.4 }}>{idea.body}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <ReactionRow reactions={idea.reactions} compact />
      </div>
      <div className="f-mono" style={{ fontSize: 9, textAlign: 'center', color: 'var(--ink-3)', marginTop: 10, letterSpacing: '0.2em' }}>
        ✺ {idea.replies} REPLIES · TAP TO OPEN
      </div>
    </div>
  );
}
