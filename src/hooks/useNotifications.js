import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, timeAgo, initials } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const STAMP_LABELS = { weird: 'WEIRD', build: 'BUILD IT', more: 'MORE', huh: 'HUH?', bad: 'BAD IDEA' };
const STAMP_COLORS = { weird: 'var(--mustard)', build: 'var(--lime)', more: 'var(--pink)', huh: 'var(--blue)', bad: 'var(--red)' };
const AVATAR_COLORS = ['var(--pink)', 'var(--blue)', 'var(--mustard)', 'var(--lime)', 'var(--orange)'];

function transformNotif(row, i) {
  const actor = row.actor || {};
  const idea = row.idea || {};
  return {
    id: row.id,
    kind: row.kind,
    new: !row.read,
    actor: actor.username || 'someone',
    initials: initials(actor.username),
    color: actor.avatar_color || AVATAR_COLORS[i % AVATAR_COLORS.length],
    target: idea.title || '',
    note: row.data?.note || '',
    stamp: row.data?.stamp_kind ? STAMP_LABELS[row.data.stamp_kind] : null,
    stampColor: row.data?.stamp_kind ? STAMP_COLORS[row.data.stamp_kind] : null,
    when: timeAgo(row.created_at),
  };
}

export function useNotifications() {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Unique channel name per hook instance — prevents collision when this hook
  // is mounted in two places at once (AppInner badge + Notifications panel).
  const channelId = useRef(`notifs:${Math.random().toString(36).slice(2, 9)}`);

  // Guard against state updates after unmount (async fetch inside realtime callback).
  const mounted = useRef(true);
  useEffect(() => () => { mounted.current = false; }, []);

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    console.log('[IDIAS] notifications: loading for user', userId);
    const { data, error } = await supabase
      .from('notifications')
      .select('*, actor:profiles!actor_id(id, username, avatar_color), idea:ideas(id, title)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) { console.error('[IDIAS] notifications: load error', error.message); return; }
    console.log('[IDIAS] notifications: loaded', data?.length ?? 0, 'items');
    if (mounted.current) {
      setNotifs((data || []).map(transformNotif));
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  // Realtime: new notifications (unique channel per instance avoids double-subscribe crash)
  useEffect(() => {
    if (!userId) return;
    const ch = supabase
      .channel(channelId.current)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        console.log('[IDIAS] notifications: realtime INSERT', payload.new.id);
        supabase
          .from('notifications')
          .select('*, actor:profiles!actor_id(id, username, avatar_color), idea:ideas(id, title)')
          .eq('id', payload.new.id)
          .single()
          .then(({ data: row }) => {
            if (row && mounted.current) setNotifs(prev => [transformNotif(row, 0), ...prev]);
          });
      })
      .subscribe((status) => {
        console.log('[IDIAS] notifications: channel', channelId.current, 'status →', status);
      });
    return () => { supabase.removeChannel(ch); };
  }, [userId]);

  const markAllRead = async () => {
    if (!userId) return;
    console.log('[IDIAS] notifications: marking all read');
    await supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
    if (mounted.current) setNotifs(prev => prev.map(n => ({ ...n, new: false })));
  };

  return { notifs, loading, markAllRead, newCount: notifs.filter(n => n.new).length };
}
