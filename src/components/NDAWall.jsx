import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export default function NDAWall() {
  const [needsToSign, setNeedsToSign] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkNDAStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setLoading(false);
        return; 
      }

      const { data } = await supabase
        .from('profiles')
        .select('has_signed_nda')
        .eq('id', session.user.id)
        .single();

      if (data && data.has_signed_nda === false) {
        setNeedsToSign(true); 
      }
      setLoading(false);
    };

    checkNDAStatus();
  }, []);

  const handleSignVow = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ has_signed_nda: true })
      .eq('id', session.user.id);

    if (error) {
      console.error("Failed to sign NDA:", error);
      alert("The ink didn't dry. Try again!");
      return;
    }

    setNeedsToSign(false);
  };

  if (loading || !needsToSign) return null;

  // We are using strict inline styles here to guarantee it overrides everything
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999, // Guaranteed to be on top
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        style={{
          background: 'var(--paper)',
          border: '4px solid var(--ink)',
          boxShadow: '8px 8px 0px 0px var(--ink)',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          transform: 'rotate(-1deg)'
        }}
      >
        
        {/* Mock "Tape" sticker */}
        <div 
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '96px',
            height: '24px',
            background: 'var(--pink)',
            mixBlendMode: 'multiply',
            opacity: 0.9
          }}
        ></div>

        <h2 
          style={{
            fontSize: '2rem',
            fontWeight: 900,
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            color: 'var(--ink)'
          }}
        >
          Top Secret Vow
        </h2>
        
        <div 
          style={{
            marginBottom: '24px',
            fontSize: '15px',
            lineHeight: 1.6,
            fontWeight: 700,
            padding: '16px',
            border: '2px dashed var(--ink-3)',
            color: 'var(--ink-2)'
          }}
        >
          <p style={{ marginBottom: '12px' }}>
            By entering the Bulletin, you acknowledge that all ideas herein are highly classified, completely unhinged, and strictly half-baked. 
          </p>
          <p style={{ marginBottom: '8px' }}>
            You swear on your favorite text editor to:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '4px' }}>Keep these zany secrets safe.</li>
            <li style={{ marginBottom: '4px' }}>Never steal an idea without leaving a "Build It" stamp.</li>
            <li>Savor the chaos.</li>
          </ul>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '16px', opacity: 0.7 }}>
            Penalty for breach: Perpetual merge conflicts.
          </p>
        </div>

        <button 
          onClick={handleSignVow}
          className="tap hover:animate-wiggle" 
          style={{ 
            width: '100%',
            padding: '16px',
            fontSize: '1.25rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: 'var(--lime)', 
            color: 'var(--ink)',
            border: '4px solid var(--ink)',
            boxShadow: '4px 4px 0px 0px var(--ink)',
            cursor: 'pointer'
          }}
        >
          I SOLEMNLY SWEAR IT 🤝
        </button>
      </div>
    </div>
  );
}