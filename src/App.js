import React, { useState, useEffect } from 'react';
import { Feed } from './components/feed/Feed';
import { IdeaPost } from './components/IdeaPost';
import { PostFlow } from './components/PostFlow';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { Auth } from './components/Auth';
import { Icon } from './components/shared/Icon';
import { AuthProvider, useAuth } from './context/AuthContext';
import { subscribeToPush } from './utils/pushNotifications';
import { useNotifications } from './hooks/useNotifications';
import { DesktopShell } from './components/desktop/DesktopShell';

function useViewportWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return w;
}

// ─── Palette system ───────────────────────────────────────────

const PALETTES = {
  classic: {
    '--paper': '#f3ede0', '--paper-2': '#ebe2cf', '--paper-3': '#d9ceb2',
    '--ink': '#1a1410', '--ink-2': '#4a3f33', '--ink-3': '#8a7c69',
    '--pink': '#ff3d7f', '--mustard': '#f5c518', '--lime': '#c4dd3a',
    '--blue': '#3d5bff', '--orange': '#ff6b35', '--red': '#e23d2c',
  },
  riso: {
    '--paper': '#f7f1e8', '--paper-2': '#efe6d4', '--paper-3': '#dcc9aa',
    '--ink': '#0e1810', '--ink-2': '#2a3428', '--ink-3': '#6a7a68',
    '--pink': '#ff5252', '--mustard': '#ffcb05', '--lime': '#1cb46e',
    '--blue': '#005bbb', '--orange': '#ff7a3a', '--red': '#d2222d',
  },
  acid: {
    '--paper': '#ecf3d8', '--paper-2': '#dde6c2', '--paper-3': '#c2cba0',
    '--ink': '#0a0a0a', '--ink-2': '#2a2a2a', '--ink-3': '#5a5a5a',
    '--pink': '#ff2d95', '--mustard': '#fff200', '--lime': '#a8ff14',
    '--blue': '#00d4ff', '--orange': '#ff7800', '--red': '#ff003c',
  },
  bruise: {
    '--paper': '#1a1410', '--paper-2': '#241c16', '--paper-3': '#3a2e24',
    '--ink': '#f3ede0', '--ink-2': '#d9ceb2', '--ink-3': '#a8987a',
    '--pink': '#ff3d7f', '--mustard': '#f5c518', '--lime': '#a8ff14',
    '--blue': '#a78bfa', '--orange': '#ff6b35', '--red': '#ff5252',
  },
};

function applyPalette(key) {
  const vars = PALETTES[key] || PALETTES.classic;
  Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

// ─── Bottom nav ───────────────────────────────────────────────

function BottomNav({ tab, setTab, openPost, newCount }) {
  const tabs = [
    { id: 'feed',    label: 'BOARD', icon: 'feed' },
    { id: 'notifs',  label: 'PINGS', icon: 'bell', badge: newCount || 0 },
    { id: '_post',   center: true },
    { id: 'profile', label: 'YOU',   icon: 'user' },
  ];
  return (
    <div style={{
      background: 'var(--paper)', borderTop: '2.5px solid var(--ink)',
      padding: '8px 8px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      zIndex: 30, flexShrink: 0,
    }}>
      {tabs.map(t => {
        if (t.center) {
          return (
            <button key="_post" onClick={openPost} className="tap" style={{
              background: 'var(--pink)', color: 'var(--paper)',
              border: '2.5px solid var(--ink)',
              width: 54, height: 54, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '3px 3px 0 var(--ink)',
              marginTop: -22, position: 'relative',
            }}>
              <Icon name="plus" size={26} color="white" />
              <span style={{
                position: 'absolute', bottom: -16, left: '50%',
                transform: 'translateX(-50%) rotate(-3deg)',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: 'var(--ink)',
              }}>POST</span>
            </button>
          );
        }
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} className="tap" style={{
            background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 10px', position: 'relative',
            color: active ? 'var(--pink)' : 'var(--ink-2)', minWidth: 56,
          }}>
            <Icon name={t.icon} size={22} color={active ? 'var(--pink)' : 'var(--ink-2)'} />
            <span className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em' }}>{t.label}</span>
            {t.badge > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 6,
                background: 'var(--pink)', color: 'var(--paper)',
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 9,
                width: 16, height: 16, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid var(--ink)',
              }}>{t.badge}</span>
            )}
            {active && (
              <span style={{
                position: 'absolute', bottom: -2, left: '50%',
                transform: 'translateX(-50%) rotate(-2deg)',
                width: 28, height: 3, background: 'var(--pink)',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Posted splash ────────────────────────────────────────────

function PostedSplash() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'var(--lime)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }} className="fade-in">
      <div className="f-display" style={{ fontSize: 64, lineHeight: 0.92, color: 'var(--ink)', textAlign: 'center', transform: 'rotate(-3deg)' }}>
        PINNED!
      </div>
      <div className="f-mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', marginTop: 14, color: 'var(--ink)' }}>
        ✺ ✺ ✺ NOW ON THE BOARD ✺ ✺ ✺
      </div>
    </div>
  );
}


// ─── Palette switcher ─────────────────────────────────────────

const PALETTE_META = {
  classic: { label: 'CLASSIC ZINE',  dots: ['#f3ede0','#ff3d7f','#f5c518','#3d5bff'] },
  riso:    { label: 'RISO PRINT',    dots: ['#f7f1e8','#ff5252','#ffcb05','#005bbb'] },
  acid:    { label: 'ACID NOTEBOOK', dots: ['#ecf3d8','#ff2d95','#fff200','#00d4ff'] },
  bruise:  { label: 'BRUISE',        dots: ['#1a1410','#ff3d7f','#f5c518','#a78bfa'] },
};

function PaletteSwitcher({ palette, setPalette }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 90, right: 16, zIndex: 100 }}>
      {open && (
        <div className="fade-in" style={{
          position: 'absolute', bottom: 44, right: 0,
          background: '#1a1a1a', border: '2px solid #333',
          padding: 10, width: 200, boxShadow: '4px 4px 0 #000',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {Object.entries(PALETTE_META).map(([k, meta]) => (
              <button key={k} onClick={() => { setPalette(k); setOpen(false); }} style={{
                border: palette === k ? '2px solid #fff' : '1.5px solid #444',
                background: '#111', padding: 7, cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 5 }}>
                  {meta.dots.map((c, i) => <div key={i} style={{ width: 12, height: 12, background: c, border: '1px solid #333' }} />)}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: palette === k ? '#fff' : '#aaa', letterSpacing: '0.08em' }}>
                  {meta.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 36, height: 36,
        background: '#1a1a1a', border: '2px solid #444',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '2px 2px 0 #000', cursor: 'pointer',
      }} title="Switch palette">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {PALETTE_META[palette].dots.map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, background: c, borderRadius: 1 }} />
          ))}
        </div>
      </button>
    </div>
  );
}

// ─── Inner app (needs auth context) ──────────────────────────

function AppInner() {
  const { session, profile } = useAuth();
  const { newCount } = useNotifications();
  const [palette, setPalette]   = useState('classic');
  const [tab, setTab]           = useState('feed');
  const [openIdea, setOpenIdea] = useState(null);
  const [posting, setPosting]   = useState(false);
  const [posted, setPosted]     = useState(false);
  const vpw = useViewportWidth();
  const isDesktop = vpw >= 1100;

  useEffect(() => { applyPalette(palette); }, [palette]);

  // Request push permission after first click, once logged in
  useEffect(() => {
    if (!session) return;
    const handle = () => {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(p => { if (p === 'granted') subscribeToPush(); });
      }
    };
    window.addEventListener('click', handle, { once: true });
    return () => window.removeEventListener('click', handle);
  }, [session]);

  const handlePosted = () => {
    setPosting(false);
    setPosted(true);
    setTimeout(() => { setPosted(false); setTab('feed'); }, 1700);
  };

  // Show auth screen if not logged in or if profile has no username yet
  const needsAuth = !session || (session && profile !== null && !profile?.username);

  // ─── Desktop layout ───────────────────────────────────────────
  if (isDesktop) {
    if (needsAuth) {
      return (
        <div style={{ minHeight: '100vh', position: 'relative', background: 'var(--paper)' }} className="paper-bg">
          <Auth />
          <PaletteSwitcher palette={palette} setPalette={setPalette} />
        </div>
      );
    }
    return (
      <>
        <DesktopShell
          tab={tab}
          setTab={setTab}
          openIdea={openIdea}
          setOpenIdea={setOpenIdea}
          openPost={() => setPosting(true)}
          posting={posting}
          posted={posted}
          onClosePost={() => setPosting(false)}
          onPosted={handlePosted}
          newCount={newCount}
        />
        <PaletteSwitcher palette={palette} setPalette={setPalette} />
      </>
    );
  }

  // ─── Mobile layout ────────────────────────────────────────────
  const screen = openIdea
    ? <IdeaPost idea={openIdea} onBack={() => setOpenIdea(null)} />
    : tab === 'feed'    ? <Feed onOpenIdea={setOpenIdea} />
    : tab === 'notifs'  ? <Notifications />
    : tab === 'profile' ? <Profile />
    : <Feed onOpenIdea={setOpenIdea} />;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--paper)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }} className="paper-bg">
      {/* auth gate */}
      {needsAuth && <Auth />}

      {/* scrollable screen */}
      {!needsAuth && (
        <div style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          background: 'var(--paper)',
        }} className="no-scrollbar">
          {screen}
        </div>
      )}



      {/* bottom nav */}
      {!needsAuth && !openIdea && (
        <BottomNav tab={tab} setTab={setTab} openPost={() => setPosting(true)} newCount={newCount} />
      )}

      {/* post flow */}
      {!needsAuth && posting && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'var(--paper)' }}>
          <PostFlow onClose={() => setPosting(false)} onPosted={handlePosted} />
        </div>
      )}

      {posted && <PostedSplash />}

      <PaletteSwitcher palette={palette} setPalette={setPalette} />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
