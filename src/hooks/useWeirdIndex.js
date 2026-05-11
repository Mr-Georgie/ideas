import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

// Higher weight = weirder. Normalized to 0-100.
const WEIGHTS = { weird: 10, cursed: 9, huh: 6, more: 5, build: 3, bad: 2 };
const MIN_W = 2;
const MAX_W = 10;

function compute(reactions) {
  if (!reactions.length) return null;
  const sum = reactions.reduce((acc, r) => acc + (WEIGHTS[r.kind] || 0), 0);
  const avg = sum / reactions.length;
  return Math.min(100, Math.max(0, Math.round(((avg - MIN_W) / (MAX_W - MIN_W)) * 100)));
}

function label(index) {
  if (index === null) return null;
  if (index >= 80) return 'DEEPLY CURSED';
  if (index >= 60) return 'PRETTY WEIRD';
  if (index >= 40) return 'SOME VIBES';
  if (index >= 20) return 'ALMOST NORMAL';
  return 'SUSPICIOUSLY SANE';
}

export function useWeirdIndex() {
  const [index, setIndex] = useState(null);
  const [reactionCount, setReactionCount] = useState(0);
  const channelId = useRef(`weird-index:${Math.random().toString(36).slice(2, 9)}`);

  const load = useCallback(async () => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('reactions')
      .select('kind')
      .gte('created_at', since);

    if (error) { console.error('[IDIAS] weirdIndex: load error', error.message); return; }
    const idx = compute(data || []);
    console.log('[IDIAS] weirdIndex:', idx, '| based on', data?.length ?? 0, 'reactions (24h)');
    setIndex(idx);
    setReactionCount(data?.length ?? 0);
  }, []);

  useEffect(() => {
    load();
    // Refresh every 5 min in case the tab stays open a long time
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [load]);

  // Also update immediately when anyone stamps something
  useEffect(() => {
    const ch = supabase
      .channel(channelId.current)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, () => {
        console.log('[IDIAS] weirdIndex: reaction change → recomputing');
        load();
      })
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, [load]);

  return { index, reactionCount, label: label(index) };
}
