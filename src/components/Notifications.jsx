import React, { useState } from 'react';
import { Avatar } from './shared/Avatar';
import { Tag } from './shared/Tag';
import { Tape } from './shared/Tape';
import { PostIt } from './shared/PostIt';
import { Stamp } from './shared/Stamp';
import { useNotifications } from '../hooks/useNotifications';
import { useAuth } from '../context/AuthContext';

function NotifRow({ n, i }) {
  const tilt = i % 2 === 0 ? -0.4 : 0.3;

  if (n.kind === 'milestone') {
    return (
      <div style={{
        background: 'var(--lime)', border: '2.5px solid var(--ink)',
        padding: 14, marginBottom: 12,
        transform: `rotate(${tilt}deg)`,
        boxShadow: '4px 4px 0 var(--ink)', position: 'relative',
      }}>
        <Tape left={20} top={-9} color="rgba(255,61,127,0.55)" tilt={-7} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Tag color="var(--ink)" filled>★ MILESTONE</Tag>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)', marginLeft: 'auto' }}>{n.when} ago</div>
        </div>
        <div className="f-display" style={{ fontSize: 18, lineHeight: 1.05 }}>{n.note}</div>
        {n.target && (
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)', marginTop: 6, fontStyle: 'italic' }}>
            on: "{n.target}"
          </div>
        )}
      </div>
    );
  }

  if (n.kind === 'prompt') {
    return (
      <div style={{ marginBottom: 12, transform: `rotate(${tilt}deg)` }}>
        <PostIt color="var(--mustard)" tilt={0} style={{ fontSize: 13 }}>
          <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>NUDGE · {n.when} AGO</div>
          {n.note}
        </PostIt>
      </div>
    );
  }

  return (
    <div style={{
      background: n.new ? 'var(--paper)' : 'var(--paper-2)',
      border: '2px solid var(--ink)',
      padding: 12, marginBottom: 10,
      transform: `rotate(${tilt}deg)`,
      boxShadow: n.new ? '3px 3px 0 var(--pink)' : '2px 2px 0 var(--ink-3)',
      position: 'relative',
    }}>
      {n.new && (
        <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)' }} />
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <Avatar name={n.initials} size={36} color={n.color} shape="soft" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'space-between' }}>
            <div className="f-body" style={{ fontWeight: 700, fontSize: 13 }}>{n.actor}</div>
            <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>{n.when} ago</div>
          </div>

          {n.kind === 'reaction' && n.stamp && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              <span className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)' }}>stamped</span>
              <Stamp color={n.stampColor} size="sm" tilt={-1}>{n.stamp}</Stamp>
              <span className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)' }}>on</span>
            </div>
          )}
          {n.kind === 'remix' && (
            <div className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 4 }}>
              <span style={{ background: 'var(--blue)', color: 'var(--paper)', padding: '0 4px', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.06em' }}>REMIX</span>{' '}
              {n.note || 'remixed your idea'}
            </div>
          )}
          {n.kind === 'reply' && (
            <div className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 4 }}>
              <span style={{ background: 'var(--mustard)', color: 'var(--ink)', padding: '0 4px', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.06em' }}>REPLY</span>{' '}
              {n.note}
            </div>
          )}
          {n.kind === 'follow' && (
            <div className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 4 }}>{n.note || 'started watching your bulletin'}</div>
          )}

          {n.target && (n.kind === 'reaction' || n.kind === 'remix' || n.kind === 'reply') && (
            <div className="f-mono" style={{
              fontSize: 11, color: 'var(--ink)', marginTop: 6,
              fontWeight: 600, fontStyle: 'italic',
              borderLeft: '2.5px solid var(--ink)', paddingLeft: 8,
            }}>
              "{n.target}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Notifications() {
  const { session } = useAuth();
  const { notifs, loading, markAllRead, newCount } = useNotifications();
  const [filter, setFilter] = useState('all');

  const filtered = notifs.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'new') return n.new;
    return n.kind === filter;
  });

  if (!session) {
    return (
      <div className="paper-bg" style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="f-display" style={{ fontSize: 24, color: 'var(--ink-2)' }}>sign in to see pings.</div>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>NOTIFICATIONS ARE PERSONAL</div>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-bg" style={{ minHeight: '100%', paddingBottom: 110 }}>
      <div style={{
        position: 'sticky', top: 0,
        background: 'var(--paper)', borderBottom: '2px solid var(--ink)',
        padding: '14px 18px 12px', zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.18em' }}>YOUR INBOX</div>
            <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginTop: 2 }}>
              pings <span style={{ color: 'var(--pink)' }}>({newCount})</span>
            </div>
          </div>
          {newCount > 0 && (
            <button onClick={markAllRead} className="tap f-mono" style={{ color: 'var(--ink-2)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              MARK ALL READ
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, overflowX: 'auto' }} className="no-scrollbar">
          {[
            { k: 'all',      label: 'ALL' },
            { k: 'new',      label: `NEW · ${newCount}` },
            { k: 'reaction', label: 'STAMPS' },
            { k: 'remix',    label: 'REMIXES' },
            { k: 'reply',    label: 'REPLIES' },
          ].map(t => (
            <button key={t.k} onClick={() => setFilter(t.k)} className="tap" style={{
              padding: '5px 9px', border: '2px solid var(--ink)',
              background: filter === t.k ? 'var(--ink)' : 'transparent',
              color: filter === t.k ? 'var(--paper)' : 'var(--ink)',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700,
              letterSpacing: '0.08em', whiteSpace: 'nowrap',
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 0' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>LOADING PINGS…</div>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div className="f-display" style={{ fontSize: 20, color: 'var(--ink-2)' }}>nothing here.</div>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4 }}>POST SOMETHING WEIRD →</div>
          </div>
        )}
        {!loading && filtered.map((n, i) => <NotifRow key={n.id} n={n} i={i} />)}
      </div>
    </div>
  );
}
