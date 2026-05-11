import React, { useState } from 'react';
import { Avatar } from './shared/Avatar';
import { Stamp } from './shared/Stamp';
import { Tag } from './shared/Tag';
import { Tape } from './shared/Tape';
import { PostIt } from './shared/PostIt';
import { Icon } from './shared/Icon';
import { TOP_RESPONSES } from '../data/feedData';

const SHARE_FORMATS = [
  { k: 'story',  label: 'STORY',  sub: '9:16',    w: 320, h: 568, badge: 'IG / TIKTOK' },
  { k: 'square', label: 'SQUARE', sub: '1:1',     w: 380, h: 380, badge: 'INSTAGRAM' },
  { k: 'tweet',  label: 'TWEET',  sub: '1.91:1',  w: 420, h: 220, badge: 'X / TWITTER' },
];

function ShareImage({ idea, format }) {
  const total = Object.values(idea.reactions || {}).reduce((a, b) => a + b, 0);
  const topResponse = TOP_RESPONSES[idea.id] || "this idea broke my brain in a good way.";

  if (format === 'tweet') {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper)', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: 8, background: idea.accent, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, color: 'var(--ink)', opacity: 0.3 }} className="halftone-tiny" />
        </div>
        <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--ink-3)' }}>BULLETIN · IDEA #{idea.id.toUpperCase()}</div>
              <Tag color={idea.accent} filled>{idea.author.tag.toUpperCase()}</Tag>
            </div>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 0.95, marginTop: 8, color: 'var(--ink)' }}>{idea.title}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', maxWidth: '70%' }}>
              <Stamp color="var(--mustard)" count={idea.reactions.weird} size="sm">WEIRD</Stamp>
              <Stamp color="var(--lime)" count={idea.reactions.build} size="sm">BUILD IT</Stamp>
              <Stamp color="var(--pink)" count={idea.reactions.more} size="sm">MORE</Stamp>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="f-display" style={{ fontSize: 26, lineHeight: 0.9, color: 'var(--ink)' }}>
                ID<span style={{ color: 'var(--pink)' }}>I</span>AS
              </div>
              <div className="f-mono" style={{ fontSize: 8, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>idias.app</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isStory = format === 'story';
  const titleSize = isStory ? 38 : 30;
  const padTop = isStory ? 26 : 18;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper)', overflow: 'hidden', color: 'var(--ink)' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, color: idea.accent, opacity: 0.85, transform: 'rotate(15deg)' }} className="halftone-lg" />
      <div style={{ position: 'absolute', bottom: -30, left: -30, width: 180, height: 180, color: 'var(--ink)', opacity: 0.08, transform: 'rotate(-10deg)' }} className="halftone-lg" />
      <Tape left={isStory ? 60 : 40} top={-6} color="rgba(255,61,127,0.65)" tilt={-8} w={70} h={20} />
      <Tape right={isStory ? 40 : 30} top={-8} color="rgba(61,91,255,0.55)" tilt={6} w={60} h={18} />

      <div style={{ padding: `${padTop}px 22px 0`, position: 'relative', zIndex: 2 }}>
        <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'var(--ink-2)' }}>━━ FROM THE BULLETIN ━━</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <Avatar name={idea.author.initials} size={isStory ? 32 : 28} color={idea.accent} shape="soft" />
          <div>
            <div className="f-body" style={{ fontWeight: 700, fontSize: 12 }}>{idea.author.name}</div>
            <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-2)', letterSpacing: '0.06em' }}>{idea.author.tag.toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 22px 0', position: 'relative', zIndex: 2 }}>
        <Tag color={idea.accent} filled tilt={-2}>★ THE IDEA</Tag>
      </div>

      <div style={{ padding: '8px 22px 10px', position: 'relative', zIndex: 2 }}>
        <div className="f-display" style={{ fontSize: titleSize, lineHeight: 0.93, color: 'var(--ink)' }}>
          {idea.title}
        </div>
      </div>

      <div style={{ padding: '4px 22px', position: 'relative', zIndex: 2 }}>
        <div style={{ height: 1, borderTop: '2px dashed var(--ink-3)' }} />
      </div>

      <div style={{ padding: `${isStory ? 12 : 6}px 22px 0`, position: 'relative', zIndex: 2 }}>
        <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--ink-2)', marginBottom: 6 }}>✺ TOP RESPONSE</div>
        <div style={{ background: 'var(--mustard)', padding: '10px 12px', border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)', transform: 'rotate(-1deg)', position: 'relative' }}>
          <div className="f-body" style={{ fontSize: isStory ? 13 : 12, lineHeight: 1.35, fontStyle: 'italic' }}>"{topResponse}"</div>
        </div>
      </div>

      <div style={{ padding: `${isStory ? 18 : 12}px 22px 0`, position: 'relative', zIndex: 2 }}>
        <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'var(--ink-2)', marginBottom: 6 }}>THE STAMPS · {total} TOTAL</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          <Stamp color="var(--mustard)" count={idea.reactions.weird} size="sm" tilt={-2}>WEIRD</Stamp>
          <Stamp color="var(--lime)" count={idea.reactions.build} size="sm" tilt={1}>BUILD IT</Stamp>
          <Stamp color="var(--pink)" count={idea.reactions.more} size="sm" tilt={-1}>MORE</Stamp>
          {isStory && <Stamp color="var(--blue)" count={idea.reactions.huh} size="sm" tilt={2}>HUH?</Stamp>}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 22px',
        borderTop: '2px solid var(--ink)',
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div className="f-display" style={{ fontSize: 26, lineHeight: 0.9 }}>
            ID<span style={{ color: 'var(--pink)' }}>I</span>AS
          </div>
          <div className="f-mono" style={{ fontSize: 8, letterSpacing: '0.16em', opacity: 0.65, marginTop: 2 }}>BULLETIN FOR HALF-BAKED IDEAS</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em' }}>idias.app/i/{idea.id}</div>
          <div className="f-mono" style={{ fontSize: 8, opacity: 0.6, letterSpacing: '0.16em', marginTop: 2 }}>POST YOUR OWN ↗</div>
        </div>
      </div>
    </div>
  );
}

export function ShareSheet({ idea, onClose }) {
  const [format, setFormat] = useState('story');
  const [savedFlash, setSavedFlash] = useState(null);

  if (!idea) return null;
  const fmt = SHARE_FORMATS.find(f => f.k === format);
  const maxW = 260;
  const scale = Math.min(maxW / fmt.w, (format === 'story' ? 380 : 280) / fmt.h);

  const flash = (msg) => {
    setSavedFlash(msg);
    setTimeout(() => setSavedFlash(null), 1500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 60,
        background: 'rgba(20,16,12,0.55)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
      }}
      className="fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--paper)',
          borderTop: '3px solid var(--ink)',
          maxHeight: '92%',
          overflow: 'auto',
          display: 'flex', flexDirection: 'column',
          paddingBottom: 24,
        }}
        className="no-scrollbar"
      >
        <div style={{ padding: '8px 0 4px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 42, height: 4, background: 'var(--ink-3)', borderRadius: 2 }} />
        </div>

        <div style={{ padding: '4px 18px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="f-mono" style={{ fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-3)' }}>SHARE THIS IDEA</div>
            <div className="f-display" style={{ fontSize: 28, lineHeight: 0.94, marginTop: 2 }}>
              make it <span style={{ color: 'var(--pink)' }}>spread</span>
            </div>
          </div>
          <button onClick={onClose} className="tap"><Icon name="close" size={22} /></button>
        </div>

        <div style={{ padding: '0 18px 14px', display: 'flex', gap: 8 }}>
          {SHARE_FORMATS.map(f => (
            <button
              key={f.k}
              onClick={() => setFormat(f.k)}
              className="tap"
              style={{
                flex: 1, padding: '8px 6px',
                background: format === f.k ? 'var(--ink)' : 'transparent',
                color: format === f.k ? 'var(--paper)' : 'var(--ink)',
                border: '2px solid var(--ink)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                boxShadow: format === f.k ? '3px 3px 0 var(--pink)' : 'none',
              }}
            >
              <span className="f-mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>{f.label}</span>
              <span className="f-mono" style={{ fontSize: 8, opacity: 0.7, letterSpacing: '0.06em' }}>{f.sub}</span>
            </button>
          ))}
        </div>

        <div style={{
          background: 'var(--paper-2)', margin: '0 18px',
          border: '2px dashed var(--ink-3)', padding: 18,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 10, alignSelf: 'flex-start' }}>
            PREVIEW · {fmt.badge}
          </div>
          <div style={{ width: fmt.w * scale, height: fmt.h * scale, position: 'relative', boxShadow: '6px 6px 0 var(--ink)', border: '2px solid var(--ink)' }}>
            <div style={{ width: fmt.w, height: fmt.h, transform: `scale(${scale})`, transformOrigin: '0 0' }}>
              <ShareImage idea={idea} format={format} />
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 18px 0' }}>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', marginBottom: 8 }}>SHARE TO ↓</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { k: 'ig', label: 'IG STORY',   color: 'var(--pink)' },
              { k: 'x',  label: 'X / TWITTER', color: 'var(--blue)' },
              { k: 'wa', label: 'WHATSAPP',    color: 'var(--lime)' },
              { k: 'tt', label: 'TIKTOK',      color: 'var(--mustard)' },
            ].map(s => (
              <button
                key={s.k}
                onClick={() => flash(`opening ${s.label.toLowerCase()}…`)}
                className="tap"
                style={{
                  padding: '10px 4px',
                  background: 'var(--paper)', border: '2px solid var(--ink)',
                  boxShadow: `2px 2px 0 ${s.color}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}
              >
                <div style={{ width: 22, height: 22, background: s.color, border: '1.5px solid var(--ink)' }} />
                <span className="f-mono" style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em' }}>{s.label}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => flash('saved to camera roll ✓')} className="tap" style={{
              flex: 1, padding: '11px 10px',
              background: 'var(--ink)', color: 'var(--paper)',
              border: '2px solid var(--ink)', boxShadow: '3px 3px 0 var(--pink)',
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11,
              letterSpacing: '0.1em',
            }}>↓ SAVE IMAGE</button>
            <button onClick={() => flash('link copied ✓')} className="tap" style={{
              padding: '11px 14px',
              background: 'transparent', border: '2px solid var(--ink)',
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11,
              letterSpacing: '0.1em',
            }}>COPY LINK</button>
          </div>

          {savedFlash && (
            <div className="fade-in" style={{ marginTop: 12 }}>
              <PostIt color="var(--lime)" tilt={-1} style={{ fontSize: 12, textAlign: 'center' }}>
                {savedFlash}
              </PostIt>
            </div>
          )}

          <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)' }}>
            <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-2)', marginBottom: 4 }}>✺ THE PLAN</div>
            <div className="f-body" style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4 }}>
              we made this look weird on purpose. people asking <em>"wait, what app is this?"</em> is the marketing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
