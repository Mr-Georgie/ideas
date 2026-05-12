import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error(
    "[IDIAS] Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_PUBLISHABLE_KEY",
  );
}

export const supabase = createClient(url || "", key || "");

// ─── Helpers ──────────────────────────────────────────────────

export function timeAgo(dateStr) {
  const s = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export const ACCENT_MAP = {
  "half-baked": "var(--mustard)",
  cooking: "var(--orange)",
  shipped: "var(--lime)",
  cursed: "var(--pink)",
};

export const VARIANTS = ["manifesto", "sticky", "newsclip"];

export const REACTION_DEFS = [
  { k: "weird", label: "WEIRD", color: "var(--mustard)" },
  { k: "build", label: "BUILD IT", color: "var(--lime)" },
  { k: "more", label: "MORE", color: "var(--pink)" },
  { k: "huh", label: "HUH?", color: "var(--blue)" },
  { k: "bad", label: "BAD IDEA", color: "var(--red)" },
];

export function initials(name = "") {
  return (
    name
      .split(" ")
      .map((w) => w[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AN"
  );
}

export function transformIdea(row, index = 0) {
  const reactions = (row.reactions || []).reduce((acc, r) => {
    acc[r.kind] = (acc[r.kind] || 0) + 1;
    return acc;
  }, {});

  const author = row.author || {};
  const totalIdeas =
    (author.shipped_count || 0) +
    (author.cooking_count || 0) +
    (author.dropped_count || 0);

  const remixSource =
    Array.isArray(row.original) && row.original[0]?.original
      ? row.original[0].original
      : null;

  return {
    id: row.id,
    variant: row.variant || VARIANTS[index % VARIANTS.length],
    accent: ACCENT_MAP[row.status] || "var(--pink)",
    tilt: index % 2 === 0 ? -1.2 : 1.4,
    author: {
      id: author.id,
      name: author.username || "anon",
      initials: initials(author.username),
      color: author.avatar_color || "var(--pink)",
      tag: `${row.status || "cooking"} ${totalIdeas}`,
    },
    posted: timeAgo(row.created_at),
    title: row.title,
    body: row.body,
    tags: row.tags || [],
    reactions,
    replies: row.reply_count || 0,
    status: row.status,
    hidden: row.hidden || false,
    
    audio_url: row.audio_url,
    
    original: remixSource
      ? {
          id: remixSource.id,
          title: remixSource.title,
          author: {
            id: remixSource.author?.id,
            name: remixSource.author?.username || "anon",
            initials: initials(remixSource.author?.username),
            color: remixSource.author?.avatar_color || "var(--pink)",
          },
          status: remixSource.status,
        }
      : null,
  };
}