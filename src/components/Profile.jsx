import React, { useState } from 'react';
import { Avatar } from './shared/Avatar';
import { Tag } from './shared/Tag';
import { Tape } from './shared/Tape';
import { PostIt } from './shared/PostIt';
import { Stamp } from './shared/Stamp';
import { ReliabilityBar } from './shared/ReliabilityBar';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';

const STAMP_DATA = [
  { label: 'WEIRD',    color: 'var(--mustard)' },
  { label: 'BUILD IT', color: 'var(--lime)' },
  { label: 'MORE',     color: 'var(--pink)' },
  { label: 'HUH?',    color: 'var(--blue)' },
  { label: 'BAD IDEA', color: 'var(--red)' },
];

function StatBlock({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div className="f-display" style={{ fontSize: 30, lineHeight: 1, color: 'var(--ink)' }}>
        <span style={{ borderBottom: `4px solid ${color}` }}>{value}</span>
      </div>
      <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-2)', letterSpacing: '0.12em', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function HistoryList({ ideas }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 10 }}>ALL IDEAS (NEWEST FIRST)</div>
      {ideas.length === 0 && (
        <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', padding: '20px 0' }}>no ideas yet.</div>
      )}
      {ideas.map((h, i) => {
        const tilt = i % 2 === 0 ? -0.5 : 0.4;
        return (
          <div key={h.id} style={{
            background: 'var(--paper)', border: '2px solid var(--ink)',
            padding: 12, marginBottom: 10,
            transform: `rotate(${tilt}deg)`,
            boxShadow: '3px 3px 0 var(--ink)', position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div className="f-display" style={{ fontSize: 17, lineHeight: 1.05, flex: 1 }}>{h.title}</div>
              <Tag color={h.status === 'dropped' ? 'var(--ink-2)' : 'var(--ink)'} filled={h.status !== 'dropped'} tilt={2}>
                {h.status?.toUpperCase()}
              </Tag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{h.date}</div>
              <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
                <span style={{ color: 'var(--pink)' }}>♦</span> {h.reactions} reactions
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReactionsTab({ reactionsGiven }) {
  const max = reactionsGiven || 1;
  const distributed = STAMP_DATA.map((d, i) => ({
    ...d,
    given: Math.max(1, Math.round(max * [0.41, 0.23, 0.2, 0.11, 0.05][i])),
  }));
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 10 }}>
        REACTIONS YOU'VE STAMPED · {reactionsGiven} TOTAL
      </div>
      <div style={{ background: 'var(--paper)', border: '2px solid var(--ink)', padding: 16, boxShadow: '3px 3px 0 var(--ink)' }}>
        {distributed.map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 78 }}><Stamp color={d.color} size="sm">{d.label}</Stamp></div>
            <div style={{ flex: 1, height: 12, border: '1.5px solid var(--ink)', background: 'var(--paper-2)' }}>
              <div style={{ width: `${(d.given / distributed[0].given) * 100}%`, height: '100%', background: d.color }} />
            </div>
            <div className="f-mono" style={{ fontSize: 11, fontWeight: 700, width: 32, textAlign: 'right' }}>{d.given}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RemixedTab({ remixers }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 10 }}>
        {remixers.length} PEOPLE REMIXED YOUR IDEAS
      </div>
      {remixers.length === 0 && (
        <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-3)', textAlign: 'center', padding: '20px 0' }}>no remixes yet.</div>
      )}
      {remixers.map((r, i) => (
        <div key={r.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--paper)', border: '2px solid var(--ink)',
          padding: '10px 12px', marginBottom: 8,
          transform: `rotate(${i % 2 === 0 ? -0.4 : 0.3}deg)`,
          boxShadow: '2px 2px 0 var(--ink)',
        }}>
          <Avatar name={(r.username || 'AN').slice(0, 2).toUpperCase()} size={36} color={r.avatar_color || 'var(--pink)'} shape="soft" />
          <div style={{ flex: 1 }}>
            <div className="f-body" style={{ fontWeight: 700, fontSize: 14 }}>{r.username}</div>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>{r.count} remix{r.count > 1 ? 'es' : ''} of your stuff</div>
          </div>
          <Tag color="var(--ink)" tilt={-2}>VIEW →</Tag>
        </div>
      ))}
    </div>
  );
}

export function Profile() {
  const { session, signOut } = useAuth();
  const { profile, ideas, remixers, loading, stats, reactionsGiven, streak, initials: ini, joined } = useProfile();
  const [tab, setTab] = useState('history');

  if (!session) {
    return (
      <div className="paper-bg" style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="f-display" style={{ fontSize: 24, color: 'var(--ink-2)' }}>sign in to see your profile.</div>
        </div>
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="paper-bg" style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>LOADING…</div>
      </div>
    );
  }

  const followThrough = stats.total > 0 ? Math.round(stats.shipped / stats.total * 100) : 0;

  return (
    <div className="paper-bg" style={{ minHeight: '100%', paddingBottom: 110 }}>
      {/* header */}
      <div style={{ padding: '20px 18px 0' }}>
        <div style={{
          background: 'var(--paper)', border: '3px solid var(--ink)',
          padding: 16, position: 'relative',
          boxShadow: '6px 6px 0 var(--pink)',
        }}>
          <Tape left={24} top={-10} color="rgba(245,197,24,0.6)" tilt={-5} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <Avatar name={ini} size={64} color={profile.avatar_color || 'var(--lime)'} shape="soft" tilt={-3} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="f-display" style={{ fontSize: 28, lineHeight: 0.92 }}>{profile.username}</div>
              <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 2 }}>
                joined {joined}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {stats.shipped >= 5 && <Tag color="var(--lime)" filled tilt={-2}>★ TRUSTED REMIXER</Tag>}
                {streak > 0 && <Tag color="var(--blue)" filled tilt={1}>{streak} DAY STREAK</Tag>}
              </div>
            </div>
          </div>
          {profile.bio && (
            <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 12, fontStyle: 'italic' }}>
              "{profile.bio}"
            </div>
          )}
          <button onClick={signOut} className="tap f-mono" style={{
            marginTop: 14, fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.1em',
            fontWeight: 700, textTransform: 'uppercase',
          }}>SIGN OUT</button>
        </div>
      </div>

      {/* track record */}
      {stats.total > 0 && (
        <div style={{ padding: '18px 18px 0' }}>
          <div style={{
            background: 'var(--paper-2)', border: '2.5px solid var(--ink)',
            padding: 14, transform: 'rotate(0.5deg)', boxShadow: '4px 4px 0 var(--ink)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div className="f-display" style={{ fontSize: 22 }}>track record</div>
              <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.1em' }}>SINCE {joined}</div>
            </div>
            <ReliabilityBar shipped={stats.shipped} cooking={stats.cooking} dropped={stats.dropped} label={false} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <StatBlock label="SHIPPED" value={stats.shipped} color="var(--lime)" />
              <StatBlock label="COOKING" value={stats.cooking} color="var(--mustard)" />
              <StatBlock label="DROPPED" value={stats.dropped} color="var(--paper-3)" />
            </div>
            <div style={{ borderTop: '1.5px dashed var(--ink-3)', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
              <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
                FOLLOW-THROUGH: <span style={{ color: 'var(--lime)', fontWeight: 700 }}>{followThrough}%</span>
              </div>
              <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
                REPS: <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{stats.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '20px 18px 0' }}>
        {[
          { k: 'history',  label: 'HISTORY' },
          { k: 'reactions',label: 'REACTIONS' },
          { k: 'remixed',  label: 'REMIXED BY' },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} className="tap" style={{
            padding: '7px 12px', border: '2px solid var(--ink)',
            background: tab === t.k ? 'var(--ink)' : 'transparent',
            color: tab === t.k ? 'var(--paper)' : 'var(--ink)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
          }}>{t.label}</button>
        ))}
      </div>

      {/* tab content */}
      <div style={{ padding: '14px 18px 0' }}>
        {tab === 'history'   && <HistoryList ideas={ideas} />}
        {tab === 'reactions' && <ReactionsTab reactionsGiven={reactionsGiven} />}
        {tab === 'remixed'   && <RemixedTab remixers={remixers} />}
      </div>

      {stats.total === 0 && tab === 'history' && (
        <div style={{ padding: '0 18px' }}>
          <PostIt color="var(--mustard)" tilt={-2} style={{ fontSize: 12 }}>
            <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>FIRST IDEA</div>
            hit the pink + button. your first idea doesn't have to be good.
          </PostIt>
        </div>
      )}
    </div>
  );
}
