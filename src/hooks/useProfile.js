import { useEffect, useState, useCallback } from 'react';
import { supabase, initials, ACCENT_MAP } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

function transformIdea(row) {
  return {
    id: row.id,
    title: row.title,
    status: row.status,
    date: new Date(row.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric' }).toUpperCase(),
    reactions: (row.reactions || []).length,
    accent: ACCENT_MAP[row.status] || 'var(--mustard)',
  };
}

export function useProfile(targetUserId) {
  const { session, profile: ownProfile, refreshProfile } = useAuth();
  const userId = targetUserId || session?.user?.id;
  const isOwn = userId === session?.user?.id;

  const [profile, setProfile] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [remixers, setRemixers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return; }

    const [profileRes, ideasRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase
        .from('ideas')
        .select('*, reactions(kind)')
        .eq('author_id', userId)
        .order('created_at', { ascending: false }),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (ideasRes.data)   setIdeas(ideasRes.data.map(transformIdea));

    // Load remixers: profiles of people who remixed this user's ideas
    const myIdeaIds = (ideasRes.data || []).map(i => i.id);
    if (myIdeaIds.length > 0) {
      const { data: remixes } = await supabase
        .from('remixes')
        .select('remix_idea:ideas!remix_idea_id(author_id, author:profiles(id, username, avatar_color))')
        .in('original_idea_id', myIdeaIds);

      if (remixes) {
        const map = {};
        remixes.forEach(r => {
          const a = r.remix_idea?.author;
          if (a && a.id !== userId) {
            map[a.id] = { ...a, count: (map[a.id]?.count || 0) + 1 };
          }
        });
        setRemixers(Object.values(map).sort((a, b) => b.count - a.count).slice(0, 10));
      }
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (isOwn && ownProfile) setProfile(ownProfile);
  }, [isOwn, ownProfile]);

  const updateProfile = async (updates) => {
    if (!session?.user) return;
    const { error } = await supabase.from('profiles').update(updates).eq('id', session.user.id);
    if (!error) refreshProfile();
    return !error;
  };

  return {
    profile,
    ideas,
    remixers,
    loading,
    isOwn,
    updateProfile,
    stats: {
      shipped: profile?.shipped_count || 0,
      cooking: profile?.cooking_count || 0,
      dropped: profile?.dropped_count || 0,
      total:   (profile?.shipped_count || 0) + (profile?.cooking_count || 0) + (profile?.dropped_count || 0),
    },
    reactionsGiven: profile?.reactions_given || 0,
    reactionsReceived: profile?.reactions_received || 0,
    streak: profile?.streak_days || 0,
    initials: initials(profile?.username),
    joined: profile?.created_at
      ? new Date(profile.created_at).toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
      : '',
  };
}
