import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useReactions(ideaId) {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [counts, setCounts] = useState({});
  const [myReaction, setMyReaction] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!ideaId) return;
    const { data, error } = await supabase
      .from('reactions')
      .select('kind, user_id')
      .eq('idea_id', ideaId);

    if (error) { console.error('[IDIAS] reactions: load error', error.message); return; }
    const c = (data || []).reduce((acc, r) => {
      acc[r.kind] = (acc[r.kind] || 0) + 1;
      return acc;
    }, {});
    setCounts(c);
    setMyReaction(userId ? ((data || []).find(r => r.user_id === userId)?.kind ?? null) : null);
    setLoading(false);
  }, [ideaId, userId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!ideaId) return;
    const ch = supabase
      .channel(`reactions:${ideaId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions', filter: `idea_id=eq.${ideaId}` }, load)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [ideaId, load]);

  const toggle = async (kind) => {
    if (!userId) return;
    console.log('[IDIAS] reactions: toggle', kind, '| was', myReaction, '| idea', ideaId);
    if (myReaction === kind) {
      await supabase.from('reactions').delete()
        .eq('idea_id', ideaId).eq('user_id', userId).eq('kind', kind);
    } else {
      if (myReaction) {
        await supabase.from('reactions').delete()
          .eq('idea_id', ideaId).eq('user_id', userId).eq('kind', myReaction);
      }
      await supabase.from('reactions').insert({ idea_id: ideaId, user_id: userId, kind });
    }
    // Realtime will update, but optimistic update for snappiness:
    setCounts(prev => {
      const next = { ...prev };
      if (myReaction) next[myReaction] = Math.max(0, (next[myReaction] || 1) - 1);
      if (myReaction !== kind) next[kind] = (next[kind] || 0) + 1;
      return next;
    });
    setMyReaction(prev => prev === kind ? null : kind);
  };

  return { counts, myReaction, loading, toggle };
}
