import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export default function NDAWall() {
  const [needsToSign, setNeedsToSign] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkNDAStatus = async () => {
      // 1. Get the current logged-in user directly from Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setLoading(false);
        return; // Nobody logged in, no wall needed
      }

      // 2. Check if they have signed
      const { data, error } = await supabase
        .from('profiles')
        .select('has_signed_nda')
        .eq('id', session.user.id)
        .single();

      if (data && data.has_signed_nda === false) {
        setNeedsToSign(true); // Pop the wall!
      }
      setLoading(false);
    };

    checkNDAStatus();
  }, []);

  const handleSignVow = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    // Update the database
    const { error } = await supabase
      .from('profiles')
      .update({ has_signed_nda: true })
      .eq('id', session.user.id);

    if (error) {
      console.error("Failed to sign NDA:", error);
      alert("The ink didn't dry. Try again!");
      return;
    }

    // Drop the wall
    setNeedsToSign(false);
  };

  if (loading || !needsToSign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#f4f0e6]/90 backdrop-blur-sm">
      <div className="bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-lg w-full text-center transform rotate-1">
        
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#ff87ab] -rotate-2 opacity-80 mix-blend-multiply"></div>

        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-black font-serif">
          Top Secret Vow
        </h2>
        
        <p className="font-bold mb-6 text-lg text-black/80 leading-relaxed">
          By entering the Bulletin, you swear on your favorite half-baked idea to keep these zainy secrets safe. No screenshots. No stealing. Just vibes.
        </p>

        <button 
          onClick={handleSignVow}
          className="w-full py-4 bg-[#b5e48c] border-[4px] border-black text-xl font-black text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:bg-[#99d98c]"
        >
          I SWEAR IT 🤝
        </button>

        <p className="mt-4 text-xs font-bold text-black/40 uppercase tracking-widest">
          Binding digital contract
        </p>
      </div>
    </div>
  );
}