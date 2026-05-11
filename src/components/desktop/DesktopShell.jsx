import React, { useState } from 'react';
import { useIdeas } from '../../hooks/useIdeas';
import { useWeirdIndex } from '../../hooks/useWeirdIndex';
import { Icon } from '../shared/Icon';
import { Tape } from '../shared/Tape';
import { CardManifesto } from '../feed/cards/CardManifesto';
import { CardSticky } from '../feed/cards/CardSticky';
import { CardPolaroid } from '../feed/cards/CardPolaroid';
import { CardReceipt } from '../feed/cards/CardReceipt';
import { CardHalftone } from '../feed/cards/CardHalftone';
import { CardNewsclip } from '../feed/cards/CardNewsclip';
import { Notifications } from '../Notifications';
import { Profile } from '../Profile';
import { IdeaPost } from '../IdeaPost';
import { PostFlow } from '../PostFlow';

const VARIANT_MAP = {
  manifesto: CardManifesto,
  sticky:    CardSticky,
  polaroid:  CardPolaroid,
  receipt:   CardReceipt,
  halftone:  CardHalftone,
  newsclip:  CardNewsclip,
};

const FILTERS = [
  { k: 'ALL',        label: 'ALL' },
  { k: 'COOKING',    label: 'COOKING' },
  { k: 'HALF-BAKED', label: 'HALF-BAKED' },
  { k: 'SHIPPED',    label: 'SHIPPED' },
  { k: 'CURSED',     label: 'CURSED' },
];

// ─── Top bar ──────────────────────────────────────────────────

function DesktopTopBar({ tab, setTab, openPost, newCount, onLogoClick }) {
  const items = [
    { id: 'feed',    label: 'BOARD' },
    { id: 'notifs',  label: 'PINGS', badge: newCount },
    { id: 'profile', label: 'YOU' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'var(--paper)',
      borderBottom: '2.5px solid var(--ink)',
      padding: '14px 32px',
      display: 'flex', alignItems: 'center', gap: 24,
    }}>
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onLogoClick}>
        <Tape left={-4} top={-12} color="rgba(255,61,127,0.55)" tilt={-9} w={46} h={14} />
        <div className="f-display" style={{ fontSize: 32, lineHeight: 0.9, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <span>ID<span style={{ color: 'var(--pink)' }}>I</span>AS</span>
          <span className="f-mono" style={{
            fontSize: 8, fontWeight: 700, letterSpacing: '0.12em',
            padding: '2px 5px',
            background: 'var(--orange)', color: 'var(--paper)',
            border: '1.5px solid var(--ink)',
            transform: 'rotate(4deg)',
            display: 'inline-block',
            boxShadow: '1.5px 1.5px 0 var(--ink)',
            marginTop: 2,
          }}>BETA</span>
        </div>
      </div>
      <div className="f-mono" style={{
        fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em',
        borderLeft: '2px solid var(--ink-3)', paddingLeft: 16,
      }}>
        BULLETIN FOR<br />HALF-BAKED IDEAS
      </div>

      <div style={{ flex: 1 }} />

      <nav style={{ display: 'flex', gap: 4 }}>
        {items.map(it => {
          const active = tab === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setTab(it.id)}
              className="tap"
              style={{
                padding: '8px 14px',
                background: active ? 'var(--ink)' : 'transparent',
                color: active ? 'var(--paper)' : 'var(--ink)',
                border: '2px solid ' + (active ? 'var(--ink)' : 'transparent'),
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {it.label}
              {it.badge > 0 && (
                <span style={{
                  background: 'var(--pink)', color: 'var(--paper)',
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                  fontSize: 9, minWidth: 16, height: 16, borderRadius: 8,
                  padding: '0 4px', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid var(--ink)',
                }}>{it.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <button onClick={openPost} className="tap" style={{
        padding: '10px 16px',
        background: 'var(--pink)', color: 'var(--paper)',
        border: '2.5px solid var(--ink)',
        boxShadow: '3px 3px 0 var(--ink)',
        display: 'flex', alignItems: 'center', gap: 8,
        transform: 'rotate(-1.2deg)',
      }}>
        <Icon name="plus" size={18} color="white" />
        <span className="f-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em' }}>
          PIN AN IDEA
        </span>
      </button>
    </header>
  );
}

// ─── Desktop feed ─────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--paper-2)', border: '2px solid var(--ink-3)',
      padding: 28, height: 180,
      boxShadow: '4px 4px 0 var(--ink-3)', opacity: 0.5,
    }}>
      <div style={{ height: 12, background: 'var(--ink-3)', width: '35%', marginBottom: 16 }} />
      <div style={{ height: 32, background: 'var(--ink-3)', width: '75%', marginBottom: 12 }} />
      <div style={{ height: 12, background: 'var(--ink-3)', width: '55%' }} />
    </div>
  );
}

function DesktopFeed({ onOpenIdea }) {
  const [filter, setFilter] = useState('ALL');
  const { ideas, loading, error } = useIdeas(filter);
  const { index, reactionCount, label } = useWeirdIndex();
  const today = new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();

  return (
    <div style={{ padding: '40px 32px 80px' }} className="paper-bg">
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* page header */}
        <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.18em' }}>
              {today}
            </div>
            <div className="f-display" style={{ fontSize: 72, lineHeight: 0.92, marginTop: 6 }}>
              the{' '}
              <span style={{ background: 'var(--mustard)', padding: '0 8px' }}>bulletin</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', paddingBottom: 6, flexShrink: 0 }}>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>WEIRD INDEX</div>
            <div className="f-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--pink)' }}>
              {index === null ? '–' : index}
              <span className="f-mono" style={{ fontSize: 16, color: 'var(--ink-3)' }}>/100</span>
            </div>
            {label && (
              <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 2 }}>
                {label}
              </div>
            )}
            <div className="f-mono" style={{ fontSize: 8, color: 'var(--ink-3)', marginTop: 2, opacity: 0.6 }}>
              {reactionCount} STAMPS · LAST 24H
            </div>
          </div>
        </div>

        {/* filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f.k}
              onClick={() => setFilter(f.k)}
              className="tap"
              style={{
                padding: '7px 11px',
                border: '2px solid var(--ink)',
                background: filter === f.k ? 'var(--ink)' : 'transparent',
                color: filter === f.k ? 'var(--paper)' : 'var(--ink)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              }}
            >{f.label}</button>
          ))}
        </div>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[1, 2, 3].map(k => <SkeletonCard key={k} />)}
          </div>
        )}

        {error && (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="f-display" style={{ fontSize: 24, color: 'var(--red)' }}>couldn't load ideas.</div>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>{error}</div>
          </div>
        )}

        {!loading && !error && ideas.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <div className="f-display" style={{ fontSize: 28, color: 'var(--ink-2)' }}>nothing here yet.</div>
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 8 }}>BE THE FIRST →</div>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {ideas.map(idea => {
              const Comp = VARIANT_MAP[idea.variant] || CardManifesto;
              return (
                <div key={idea.id} className="fade-in">
                  <Comp idea={idea} onOpen={() => onOpenIdea(idea)} />
                </div>
              );
            })}
          </div>
        )}

        {!loading && ideas.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.22em' }}>
              ━ END OF TODAY'S BULLETIN ━
            </div>
            <div className="f-display" style={{ fontSize: 26, color: 'var(--ink-2)', marginTop: 8 }}>
              come back tomorrow.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Posted splash (fixed overlay for desktop) ────────────────

function PostedSplash() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 90,
      background: 'var(--lime)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }} className="fade-in">
      <div className="f-display" style={{ fontSize: 80, lineHeight: 0.92, color: 'var(--ink)', textAlign: 'center', transform: 'rotate(-3deg)' }}>
        PINNED!
      </div>
      <div className="f-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', marginTop: 14, color: 'var(--ink)' }}>
        ✺ ✺ ✺ NOW ON THE BOARD ✺ ✺ ✺
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────

export function DesktopShell({ tab, setTab, openIdea, setOpenIdea, openPost, posting, posted, onClosePost, onPosted, newCount }) {
  const main = openIdea ? (
    <div style={{ padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <IdeaPost idea={openIdea} onBack={() => setOpenIdea(null)} isDesktop />
      </div>
    </div>
  ) : tab === 'feed' ? (
    <DesktopFeed onOpenIdea={setOpenIdea} />
  ) : tab === 'notifs' ? (
    <div style={{ padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <Notifications />
      </div>
    </div>
  ) : tab === 'profile' ? (
    <div style={{ padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Profile />
      </div>
    </div>
  ) : (
    <DesktopFeed onOpenIdea={setOpenIdea} />
  );

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'var(--paper)', color: 'var(--ink)',
    }} className="paper-bg">
      <DesktopTopBar
        tab={tab}
        setTab={(t) => { setOpenIdea(null); setTab(t); }}
        openPost={openPost}
        newCount={newCount}
        onLogoClick={() => { setOpenIdea(null); setTab('feed'); }}
      />
      <main>{main}</main>

      {/* PostFlow as centered modal */}
      {posting && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 80,
            background: 'rgba(20,16,12,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }}
          className="fade-in"
          onClick={onClosePost}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 560, maxHeight: '88vh', overflow: 'hidden',
              background: 'var(--paper)',
              border: '3px solid var(--ink)',
              boxShadow: '10px 10px 0 var(--pink)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <PostFlow onClose={onClosePost} onPosted={onPosted} />
          </div>
        </div>
      )}

      {posted && <PostedSplash />}
    </div>
  );
}
