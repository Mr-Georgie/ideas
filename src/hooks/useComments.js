import { useEffect, useState, useCallback } from 'react';
import { supabase, timeAgo, initials } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const STAMP_COLORS = { weird: 'var(--mustard)', build: 'var(--lime)', more: 'var(--pink)', huh: 'var(--blue)', bad: 'var(--red)' };
const STAMP_LABELS = { weird: 'WEIRD', build: 'BUILD IT', more: 'MORE', huh: 'HUH?', bad: 'BAD IDEA' };

function transformComment(row) {
  const author = row.author || {};
  return {
    id: row.id,
    author: author.username || 'anon',
    initials: initials(author.username),
    color: author.avatar_color || 'var(--pink)',
    authorId: author.id,
    posted: timeAgo(row.created_at),
    body: row.body,
    stamp: row.stamp_kind ? STAMP_LABELS[row.stamp_kind] : null,
    stampColor: row.stamp_kind ? STAMP_COLORS[row.stamp_kind] : null,
    replies: row.reply_count || 0,
    pinned: row.pinned || false,
  };
}

export function useComments(ideaId) {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!ideaId) return;
    const { data } = await supabase
      .from('comments')
      .select('*, author:profiles(id, username, avatar_color)')
      .eq('idea_id', ideaId)
      .is('parent_id', null)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: true });

    setComments((data || []).map(transformComment));
    setLoading(false);
  }, [ideaId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!ideaId) return;
    const ch = supabase
      .channel(`comments:${ideaId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `idea_id=eq.${ideaId}` }, (payload) => {
        supabase.from('profiles').select('id, username, avatar_color').eq('id', payload.new.author_id).single()
          .then(({ data: author }) => {
            setComments(prev => {
              const t = transformComment({ ...payload.new, author });
              return payload.new.pinned ? [t, ...prev] : [...prev, t];
            });
          });
      })
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [ideaId]);

  const post = async (body, stampKind = null) => {
    if (!userId || !body.trim()) return;
    console.log('[IDIAS] comments: posting to idea', ideaId, stampKind ? `| stamp: ${stampKind}` : '');
    const { error } = await supabase.from('comments').insert({
      idea_id: ideaId,
      author_id: userId,
      body: body.trim(),
      stamp_kind: stampKind || null,
    });
    if (error) { console.error('[IDIAS] comments: post error', error.message); }
    if (!error) {
      await supabase.from('ideas').update({ reply_count: comments.length + 1 }).eq('id', ideaId);
    }
    return !error;
  };

  return { comments, loading, post };
}
