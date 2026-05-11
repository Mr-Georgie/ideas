import React from 'react';

export function ReliabilityBar({ shipped, dropped, cooking, label = true }) {
  const total = shipped + dropped + cooking;
  const sPct = (shipped / total) * 100;
  const cPct = (cooking / total) * 100;
  const dPct = (dropped / total) * 100;

  return (
    <div>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 6,
          color: 'var(--ink-2)',
        }}>
          <span>track record</span>
          <span>{total} ideas</span>
        </div>
      )}
      <div style={{ display: 'flex', height: 14, border: '2px solid var(--ink)', overflow: 'hidden' }}>
        <div style={{ width: sPct + '%', background: 'var(--lime)' }} />
        <div style={{ width: cPct + '%', background: 'var(--mustard)' }} />
        <div style={{ width: dPct + '%', background: 'var(--paper-3)' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, marginTop: 6, color: 'var(--ink-2)' }}>
        <span>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--lime)', border: '1px solid var(--ink)', marginRight: 4, verticalAlign: 'middle' }} />
          SHIPPED {shipped}
        </span>
        <span>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--mustard)', border: '1px solid var(--ink)', marginRight: 4, verticalAlign: 'middle' }} />
          COOKING {cooking}
        </span>
        <span>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--paper-3)', border: '1px solid var(--ink)', marginRight: 4, verticalAlign: 'middle' }} />
          DROPPED {dropped}
        </span>
      </div>
    </div>
  );
}
