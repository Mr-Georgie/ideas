import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "./shared/Avatar";
import { Stamp } from "./shared/Stamp";
import { Tag } from "./shared/Tag";
import { Tape } from "./shared/Tape";
import { PostIt } from "./shared/PostIt";
import { Icon } from "./shared/Icon";
import { ShareSheet } from "./ShareSheet";
import { useReactions } from "../hooks/useReactions";
import { useComments } from "../hooks/useComments";
import { useRemixes } from "../hooks/useRemixes";
import { useAuth } from "../context/AuthContext";
import { supabase, REACTION_DEFS } from "../lib/supabase";

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;

// --- Internal Component for the Voice Note ---
function RamblePlayer({ url, accent }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("ended", handleEnd);
      audio.pause();
    };
  }, []);

  return (
    <button
      onClick={togglePlay}
      className="tap"
      style={{
        marginTop: 20,
        padding: "12px 18px",
        background: isPlaying ? "var(--ink)" : "var(--pink)",
        color: "var(--paper)",
        border: "3px solid var(--ink)",
        boxShadow: `4px 4px 0 ${accent}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 800,
        fontSize: 12,
        letterSpacing: "0.05em",
        transform: isPlaying ? "translate(2px, 2px)" : "none",
      }}
    >
      <Icon name={isPlaying ? "close" : "back"} size={16} style={{ transform: isPlaying ? 'none' : 'rotate(180deg)' }} />
      {isPlaying ? "PAUSE RAMBLE" : "LISTEN TO 3AM RAMBLE"}
    </button>
  );
}

function CommentBlock({ c, i, onReply, isAdmin, onHideComment }) {
  const tilt = i % 2 === 0 ? -0.4 : 0.5;
  return (
    <div>
      <div
        style={{
          padding: "14px 14px 12px",
          background: "var(--paper)",
          border: "2px solid var(--ink)",
          transform: `rotate(${tilt}deg)`,
          marginBottom: 14,
          position: "relative",
          boxShadow: c.pinned
            ? "4px 4px 0 var(--pink)"
            : "3px 3px 0 var(--ink)",
        }}
      >
        {c.pinned && (
          <div
            style={{
              position: "absolute",
              top: -10,
              right: 12,
              transform: "rotate(8deg)",
            }}
          >
            <Tag color="var(--pink)" filled>
              ★ OP REPLIED
            </Tag>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Avatar name={c.initials} size={32} color={c.color} shape="soft" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                justifyContent: "space-between",
              }}
            >
              <div className="f-body" style={{ fontWeight: 700, fontSize: 13 }}>
                {c.author}
              </div>
              <div
                className="f-mono"
                style={{
                  fontSize: 9,
                  color: "var(--ink-3)",
                  letterSpacing: "0.06em",
                }}
              >
                {c.posted} ago
              </div>
            </div>
            <div
              className="f-body"
              style={{
                fontSize: 13.5,
                lineHeight: 1.45,
                color: "var(--ink)",
                marginTop: 6,
              }}
            >
              {c.body}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              {c.stamp && (
                <Stamp color={c.stampColor} size="sm" tilt={-1}>
                  {c.stamp}
                </Stamp>
              )}
              <button
                onClick={() => onReply(c)}
                className="tap f-mono"
                style={{
                  color: "var(--ink-2)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                REPLY{" "}
                {c.replies && c.replies.length > 0 && `· ${c.replies.length}`}
              </button>
              {isAdmin && (
                <button
                  onClick={() => onHideComment(c.id)}
                  className="tap f-mono"
                  style={{
                    color: "var(--red)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  HIDE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {c.replies &&
        c.replies.map((reply, replyIndex) => (
          <div key={reply.id} style={{ marginLeft: 40, marginBottom: 10 }}>
            <CommentBlock c={reply} i={i + replyIndex + 1} onReply={onReply} isAdmin={isAdmin} onHideComment={onHideComment} />
          </div>
        ))}
    </div>
  );
}

export function IdeaPost({ idea, onBack, isDesktop, onRemix, onOpenOriginal }) {
  const { session } = useAuth();
  const { counts, myReaction, toggle } = useReactions(idea?.id);
  const { comments, post, refetch: refetchComments } = useComments(idea?.id);
  const remixes = useRemixes(idea?.id);
  const isAdmin = !!ADMIN_ID && session?.user?.id === ADMIN_ID;
  const [shareOpen, setShareOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [hiding, setHiding] = useState(false);
  const i = idea;

  const hideIdea = async () => {
    if (!i || hiding) return;
    setHiding(true);
    const { error } = await supabase
      .from("ideas")
      .update({ hidden: true })
      .eq("id", i.id);
    if (error) {
      console.error("[IDIAS] hide idea error:", error.message);
      setHiding(false);
    } else {
      onBack();
    }
  };

  const hideComment = async (commentId) => {
    const { error } = await supabase
      .from("comments")
      .update({ hidden: true })
      .eq("id", commentId);
    if (!error) refetchComments();
  };

  if (!i) return null;

  const handlePost = async () => {
    if (!comment.trim()) return;
    setPosting(true);
    await post(comment, null, replyTo?.id);
    setComment("");
    setReplyTo(null);
    setPosting(false);
  };

  return (
    <div
      className="paper-bg"
      style={{ minHeight: "100%", paddingBottom: isDesktop ? 0 : 110 }}
    >
      {/* top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "var(--paper)",
          borderBottom: "2px solid var(--ink)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 5,
        }}
      >
        <button
          onClick={onBack}
          className="tap"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--ink)",
          }}
        >
          <Icon name="back" size={18} />
          <span
            className="f-mono"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}
          >
            BACK TO FEED
          </span>
        </button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {isAdmin && (
            <button
              onClick={hideIdea}
              disabled={hiding}
              className="tap f-mono"
              style={{
                color: "var(--red)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                border: "2px solid var(--red)",
                padding: "5px 10px",
                opacity: hiding ? 0.5 : 1,
              }}
            >
              {hiding ? "HIDING…" : "HIDE IDEA"}
            </button>
          )}
          <button className="tap" style={{ color: "var(--ink)" }}>
            <Icon name="bookmark" size={18} />
          </button>
          <button
            onClick={() => setShareOpen(true)}
            className="tap"
            style={{
              background: "var(--pink)",
              color: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "2px 2px 0 var(--ink)",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.1em",
            }}
          >
            <Icon name="share" size={13} color="white" />
            SHARE
          </button>
        </div>
      </div>

      {/* hero card */}
      <div style={{ padding: "18px 18px 0" }}>
        <div style={{ position: "relative" }}>
          <Tape left={28} top={-6} color="rgba(255,61,127,0.55)" tilt={-7} />
          {/* FIXED TYPO HERE: tilt={6} instead of tilt(6) */}
          <Tape right={36} top={-6} color="rgba(61,91,255,0.45)" tilt={6} />
          <div
            style={{
              background: "var(--paper)",
              border: "3px solid var(--ink)",
              padding: 18,
              position: "relative",
              boxShadow: `6px 6px 0 ${i.accent}, 6px 6px 0 3px var(--ink)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar
                name={i.author.initials}
                size={32}
                color={i.accent}
                shape="soft"
              />
              <div>
                <div
                  className="f-body"
                  style={{ fontWeight: 600, fontSize: 13 }}
                >
                  {i.author.name}
                </div>
                <div
                  className="f-mono"
                  style={{
                    fontSize: 9,
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {i.author.tag} · {i.posted} ago
                </div>
              </div>
            </div>
            <div
              className="f-mono"
              style={{
                fontSize: 9,
                color: "var(--ink-3)",
                letterSpacing: "0.18em",
                marginTop: 14,
              }}
            >
              IDEA · {i.status?.toUpperCase()}
            </div>
            
            <div
              className="f-display"
              style={{ fontSize: 38, lineHeight: 0.94, marginTop: 6 }}
            >
              {i.title}
            </div>
            <div
              className="f-body"
              style={{
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                marginTop: 14,
              }}
            >
              {i.body}
            </div>

            {/* --- VOICE RAMBLE PLAYER --- */}
            {/* {i.audio_url && <RamblePlayer url={i.audio_url} accent={i.accent} />} */}
            <RamblePlayer 
  url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
  accent={i.accent} 
/>

            <div
              style={{
                display: "flex",
                gap: 6,
                marginTop: 14,
                flexWrap: "wrap",
              }}
            >
              {i.tags.map((t) => (
                <Tag key={t} color="var(--ink)">
                  #{t}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* reactions */}
      <div style={{ padding: "22px 16px 6px" }}>
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "var(--ink-2)",
            letterSpacing: "0.16em",
            marginBottom: 8,
          }}
        >
          {session ? "STAMP YOUR REACTION ↓" : "SIGN IN TO STAMP"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {REACTION_DEFS.map((r, idx) => (
            <Stamp
              key={r.k}
              color={r.color}
              count={counts[r.k] || 0}
              tilt={idx % 2 === 0 ? -1.4 : 1.2}
              active={myReaction === r.k}
              onClick={() => session && toggle(r.k)}
              size="lg"
            >
              {r.label}
            </Stamp>
          ))}
        </div>
      </div>

      {/* comments header */}
      <div
        style={{
          padding: "18px 16px 6px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div className="f-display" style={{ fontSize: 22 }}>
          responses
        </div>
        <div
          style={{
            flex: 1,
            height: 0,
            borderBottom: "2px dashed var(--ink-3)",
          }}
        />
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "var(--ink-2)",
            letterSpacing: "0.1em",
          }}
        >
          {comments.length} · constructive only
        </div>
      </div>

      {/* comments */}
      <div style={{ padding: "4px 16px 0" }}>
        {comments.map((c, idx) => (
          <CommentBlock
            key={c.id}
            c={c}
            i={idx}
            onReply={setReplyTo}
            isAdmin={isAdmin}
            onHideComment={hideComment}
          />
        ))}
      </div>

      {shareOpen && <ShareSheet idea={i} onClose={() => setShareOpen(false)} />}
    </div>
  );
}