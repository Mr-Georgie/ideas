import { useEffect, useState } from "react";
import { supabase, timeAgo, initials, ACCENT_MAP } from "../lib/supabase";

export function useRemixes(ideaId) {
  const [remixes, setRemixes] = useState([]);

  useEffect(() => {
    if (!ideaId) return;
    supabase
      .from("remixes")
      .select(
        `remix:ideas!remix_idea_id(
          id, title, status, created_at, variant,
          author:profiles(id, username, avatar_color)
        )`,
      )
      .eq("original_idea_id", ideaId)
      .order("created_at", { ascending: false, referencedTable: "ideas" })
      .then(({ data }) => {
        setRemixes(
          (data || [])
            .map((r) => r.remix)
            .filter(Boolean)
            .map((r) => ({
              id: r.id,
              title: r.title,
              status: r.status,
              accent: ACCENT_MAP[r.status] || "var(--pink)",
              posted: timeAgo(r.created_at),
              author: {
                name: r.author?.username || "anon",
                initials: initials(r.author?.username),
                color: r.author?.avatar_color || "var(--pink)",
              },
            })),
        );
      });
  }, [ideaId]);

  return remixes;
}
