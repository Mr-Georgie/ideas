import { useEffect, useState, useCallback } from "react";
import { supabase, transformIdea } from "../lib/supabase";

export function useIdeas(filter = "ALL") {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    console.log("[IDIAS] ideas: loading feed, filter =", filter);
    let q = supabase
      .from("ideas")
      .select(
        `
        *,
        author:profiles(id, username, avatar_color, shipped_count, cooking_count, dropped_count),
        reactions(kind),
        original:remixes!remix_idea_id(
          original_idea_id,
          original:ideas!original_idea_id(
            id, title,
            author:profiles(id, username, avatar_color),
            status
          )
        )
      `,
      )
      .order("created_at", { ascending: false })
      .limit(30);

    if (filter !== "ALL") {
      q = q.eq("status", filter.toLowerCase().replace("-", "-"));
    }

    const { data, error: err } = await q;
    if (err) {
      console.error("[IDIAS] ideas: load error", err.message);
      setError(err.message);
      setLoading(false);
      return;
    }
    console.log("[IDIAS] ideas: loaded", data?.length ?? 0, "ideas");
    setIdeas((data || []).filter((row) => !row.hidden).map((row, i) => transformIdea(row, i)));
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  // Realtime: new ideas + reaction changes
  useEffect(() => {
    const ideasSub = supabase
      .channel("public:ideas")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ideas" },
        () => {
          console.log("[IDIAS] ideas: realtime change → refetching feed");
          load();
        },
      )
      .subscribe((status) =>
        console.log("[IDIAS] ideas channel status →", status),
      );

    const reactionsSub = supabase
      .channel("public:reactions-feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reactions" },
        () => {
          console.log("[IDIAS] reactions: realtime change → refetching feed");
          load();
        },
      )
      .subscribe((status) =>
        console.log("[IDIAS] reactions-feed channel status →", status),
      );

    return () => {
      supabase.removeChannel(ideasSub);
      supabase.removeChannel(reactionsSub);
    };
  }, [load]);

  return { ideas, loading, error, refetch: load };
}
