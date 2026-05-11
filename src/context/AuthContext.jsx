import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session ?? null;
      console.log('[IDIAS] auth: initial session', s ? `user ${s.user.id}` : 'none');
      setSession(s);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      console.log('[IDIAS] auth: state change →', event, s ? `user ${s.user.id}` : 'signed out');
      setSession(s ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) { setProfile(null); return; }
    console.log('[IDIAS] auth: fetching profile for', session.user.id);
    supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) { console.error('[IDIAS] auth: profile fetch error', error.message); return; }
        console.log('[IDIAS] auth: profile loaded', data?.username ?? '(no username yet)');
        setProfile(data);
      });
  }, [session]);

  const refreshProfile = async () => {
    if (!session?.user) return;
    console.log('[IDIAS] auth: refreshing profile');
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    setProfile(data);
  };

  const signOut = () => {
    console.log('[IDIAS] auth: signing out');
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, profile, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
