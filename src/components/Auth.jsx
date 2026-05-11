import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Tape } from './shared/Tape';
import { PostIt } from './shared/PostIt';
import { Tag } from './shared/Tag';

// ─── Username setup (first sign-in) ───────────────────────────

function UsernameSetup({ userId, onDone }) {
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [color, setColor] = useState('var(--pink)');

  const COLORS = ['var(--pink)', 'var(--blue)', 'var(--lime)', 'var(--mustard)', 'var(--orange)'];

  const save = async () => {
    const name = username.trim();
    if (name.length < 2) { setErr('at least 2 characters'); return; }
    if (!/^[a-zA-Z0-9 _-]+$/.test(name)) { setErr('letters, numbers, spaces, _ or - only'); return; }
    setSaving(true);
    const { error } = await supabase.from('profiles').update({ username: name, avatar_color: color }).eq('id', userId);
    if (error?.code === '23505') { setErr('that name is taken, try another'); setSaving(false); return; }
    if (error) { setErr(error.message); setSaving(false); return; }
    onDone();
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'var(--lime)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '0 28px', zIndex: 60,
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
        <Tape left={20} top={-10} color="rgba(255,61,127,0.6)" tilt={-5} />
        <div style={{ background: 'var(--paper)', border: '3px solid var(--ink)', padding: 22, boxShadow: '6px 6px 0 var(--ink)' }}>
          <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--ink-3)' }}>STEP 0 OF 0</div>
          <div className="f-display" style={{ fontSize: 32, lineHeight: 0.94, margin: '8px 0 18px' }}>
            who are<br />you?
          </div>
          <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 14 }}>
            Pick a name for the bulletin. No real names required.
          </div>
          <input
            value={username}
            onChange={e => { setUsername(e.target.value); setErr(''); }}
            placeholder="example: halfbaked wizard"
            maxLength={32}
            style={{
              width: '100%', padding: '10px 12px',
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15,
              border: '2.5px solid var(--ink)', background: 'var(--paper-2)',
              boxSizing: 'border-box',
            }}
          />
          {err && (
            <div className="f-mono" style={{ fontSize: 10, color: 'var(--red)', marginTop: 6 }}>{err}</div>
          )}
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <div className="f-mono" style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 8 }}>PICK YOUR COLOUR</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{
                  width: 28, height: 28, background: c, border: color === c ? '3px solid var(--ink)' : '1.5px solid var(--ink-3)',
                  boxShadow: color === c ? '2px 2px 0 var(--ink)' : 'none',
                  cursor: 'pointer',
                }} />
              ))}
            </div>
          </div>
          <button
            onClick={save}
            disabled={saving || username.trim().length < 2}
            className="tap"
            style={{
              marginTop: 18, width: '100%', padding: '12px 0',
              background: 'var(--ink)', color: 'var(--paper)',
              border: '2px solid var(--ink)', boxShadow: '4px 4px 0 var(--pink)',
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12, letterSpacing: '0.12em',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'SAVING…' : 'JOIN THE BULLETIN →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main auth screen ──────────────────────────────────────────

export function Auth() {
  const { session, profile, refreshProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [rateLimited, setRateLimited] = useState(false);

  const siteUrl = process.env.REACT_APP_SITE_URL || window.location.origin;

  const sendMagicLink = async () => {
    if (!email.includes('@')) { setErr('that doesn\'t look like an email'); return; }
    setLoading(true);
    setRateLimited(false);
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: siteUrl } });
    if (error) {
      const isRateLimit = error.status === 429 || /rate.?limit|too many/i.test(error.message);
      if (isRateLimit) { setRateLimited(true); } else { setErr(error.message); }
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: siteUrl },
    });
    if (error) { setErr(error.message); setLoading(false); }
  };

  // Show username setup if logged in but no username yet
  if (session && profile && !profile.username) {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <UsernameSetup userId={session.user.id} onDone={refreshProfile} />
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'var(--paper)', overflowY: 'auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 28px',
    }} className="paper-bg">
      <div style={{ width: '100%', maxWidth: 320 }}>
        {/* logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div className="f-display" style={{ fontSize: 52, lineHeight: 0.9, transform: 'rotate(-2deg)', display: 'inline-block' }}>
              ID<span style={{ color: 'var(--pink)' }}>I</span>AS
            </div>
            <span className="f-mono" style={{
              position: 'absolute', top: -8, right: -30,
              fontSize: 8, fontWeight: 700, letterSpacing: '0.12em',
              padding: '2px 5px',
              background: 'var(--orange)', color: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              transform: 'rotate(6deg)',
              display: 'inline-block',
              boxShadow: '1.5px 1.5px 0 var(--ink)',
            }}>BETA</span>
          </div>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.18em', marginTop: 6 }}>
            BULLETIN FOR HALF-BAKED IDEAS
          </div>
        </div>

        {/* card */}
        <div style={{ position: 'relative' }}>
          <Tape left={30} top={-9} color="rgba(255,61,127,0.5)" tilt={-6} />
          <div style={{ background: 'var(--paper)', border: '3px solid var(--ink)', padding: 22, boxShadow: '6px 6px 0 var(--mustard)' }}>
            {sent ? (
              <div className="fade-in">
                <div className="f-display" style={{ fontSize: 30, lineHeight: 0.94, marginBottom: 12 }}>
                  check your<br />inbox ✉
                </div>
                <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  We sent a magic link to <strong>{email}</strong>. Click it and you're in.
                </div>
                <div style={{ marginTop: 18 }}>
                  <PostIt color="var(--lime)" tilt={-2} style={{ fontSize: 12 }}>
                    <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>HEADS UP</div>
                    check spam if you don't see it in 2 minutes.
                  </PostIt>
                </div>
                <button onClick={() => setSent(false)} className="tap" style={{
                  marginTop: 18, color: 'var(--ink-2)',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                }}>← USE DIFFERENT EMAIL</button>
              </div>
            ) : (
              <>
                <div className="f-display" style={{ fontSize: 30, lineHeight: 0.94, marginBottom: 6 }}>
                  join the<br />bulletin
                </div>
                <div className="f-body" style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 18 }}>
                  no password needed. just ideas.
                </div>

                {/* Google OAuth — primary */}
                <button
                  onClick={signInWithGoogle}
                  disabled={loading}
                  className="tap"
                  style={{
                    width: '100%', padding: '11px 0', marginBottom: 14,
                    background: 'var(--paper)', color: 'var(--ink)',
                    border: '2.5px solid var(--ink)', boxShadow: '3px 3px 0 var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11, letterSpacing: '0.08em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {loading ? 'REDIRECTING…' : 'CONTINUE WITH GOOGLE'}
                </button>

                {/* divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 0, borderBottom: '1.5px dashed var(--ink-3)' }} />
                  <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>OR USE EMAIL</div>
                  <div style={{ flex: 1, height: 0, borderBottom: '1.5px dashed var(--ink-3)' }} />
                </div>

                {/* rate limit banner */}
                {rateLimited && (
                  <div style={{
                    marginBottom: 10, padding: '10px 12px',
                    background: 'var(--mustard)', border: '2px solid var(--ink)',
                    boxShadow: '3px 3px 0 var(--ink)',
                  }}>
                    <div className="f-mono" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', marginBottom: 4 }}>
                      TOO MANY EMAILS SENT
                    </div>
                    <div className="f-body" style={{ fontSize: 12, lineHeight: 1.45, marginBottom: 8 }}>
                      We've hit the email limit for now. Use Google to sign in instantly — no email needed.
                    </div>
                    <button
                      onClick={signInWithGoogle}
                      disabled={loading}
                      className="tap"
                      style={{
                        width: '100%', padding: '9px 0',
                        background: 'var(--ink)', color: 'var(--paper)',
                        border: 'none',
                        fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 10, letterSpacing: '0.08em',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        opacity: loading ? 0.6 : 1,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {loading ? 'REDIRECTING…' : 'SIGN IN WITH GOOGLE →'}
                    </button>
                  </div>
                )}

                {/* magic link — fallback */}
                <input
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErr(''); setRateLimited(false); }}
                  onKeyDown={e => e.key === 'Enter' && sendMagicLink()}
                  placeholder="your@email.com"
                  type="email"
                  style={{
                    width: '100%', padding: '10px 12px',
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 14,
                    border: '2px solid var(--ink-3)', background: 'var(--paper-2)',
                    boxSizing: 'border-box', marginBottom: 10,
                  }}
                />
                {err && <div className="f-mono" style={{ fontSize: 10, color: 'var(--red)', marginBottom: 8 }}>{err}</div>}
                <button
                  onClick={sendMagicLink}
                  disabled={loading}
                  className="tap"
                  style={{
                    width: '100%', padding: '10px 0',
                    background: 'transparent', color: 'var(--ink-2)',
                    border: '1.5px solid var(--ink-3)',
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 10, letterSpacing: '0.08em',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? 'SENDING…' : 'SEND MAGIC LINK ✉'}
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
            BAD IDEAS WELCOME · JUDGING NOT · NO STARTUP PITCHES
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
            {['WEIRD', 'BUILD IT', 'MORE', 'HUH?'].map((s, i) => (
              <Tag key={s} color={['var(--mustard)', 'var(--lime)', 'var(--pink)', 'var(--blue)'][i]} filled tilt={(i - 1.5) * 2}>
                {s}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
