import React, { useState } from "react";
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
      {/* Render replies */}
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
  const { session, profile } = useAuth();
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
            {i.original && (
              <button
                onClick={() => onOpenOriginal?.(i.original.id)}
                className="tap"
                style={{
                  marginTop: 10,
                  padding: "6px 10px",
                  border: "2px dashed var(--ink)",
                  background: "rgba(61,91,255,0.08)",
                  color: "var(--ink-2)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                REMIX OF {i.original.title}
              </button>
            )}
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
        {myReaction && (
          <div className="fade-in" style={{ marginTop: 10 }}>
            <PostIt color="var(--mustard)" tilt={-1} style={{ fontSize: 12 }}>
              <span
                className="f-mono"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                STAMPED ✓{" "}
              </span>
              your reaction was added. care to leave a note?
            </PostIt>
          </div>
        )}
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
        {comments.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              className="f-body"
              style={{ fontSize: 13, color: "var(--ink-3)" }}
            >
              no responses yet. be the first.
            </div>
          </div>
        )}
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

      {/* remixes of this idea */}
      {remixes.length > 0 && (
        <div style={{ padding: "18px 16px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div className="f-display" style={{ fontSize: 22 }}>
              remixes
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
              {remixes.length}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {remixes.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => onOpenOriginal?.(r.id)}
                className="tap"
                style={{
                  textAlign: "left",
                  background: "var(--paper)",
                  border: "2px solid var(--ink)",
                  padding: "12px 14px",
                  boxShadow: `3px 3px 0 ${r.accent}`,
                  transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar
                      name={r.author.initials}
                      size={22}
                      color={r.author.color}
                      shape="soft"
                    />
                    <span
                      className="f-mono"
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {r.author.name}
                    </span>
                  </div>
                  <span
                    className="f-mono"
                    style={{ fontSize: 9, color: "var(--ink-3)" }}
                  >
                    {r.posted} ago
                  </span>
                </div>
                <div
                  className="f-display"
                  style={{ fontSize: 18, lineHeight: 1.05, color: "var(--ink)" }}
                >
                  {r.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* remix CTA */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          style={{
            border: "2.5px dashed var(--ink)",
            padding: 16,
            textAlign: "center",
            background: "var(--paper-2)",
            position: "relative",
          }}
        >
          <div className="f-display" style={{ fontSize: 22 }}>
            got a remix?
          </div>
          <div
            className="f-body"
            style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 4 }}
          >
            post your own riff on this idea — it'll thread back here.
          </div>
          <button
            onClick={() => onRemix(i)}
            className="tap"
            style={{
              marginTop: 12,
              padding: "8px 14px",
              background: "var(--pink)",
              color: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.1em",
            }}
          >
            + REMIX THIS IDEA
          </button>
        </div>
      </div>

      {/* comment bar */}
      <div
        style={{
          ...(isDesktop
            ? {
                padding: "10px 14px",
                marginTop: 24,
                background: "var(--paper)",
                borderTop: "2px solid var(--ink)",
              }
            : {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 84,
                padding: "10px 14px",
                background: "var(--paper)",
                borderTop: "2px solid var(--ink)",
              }),
        }}
      >
        {replyTo && (
          <div
            style={{
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              className="f-mono"
              style={{
                fontSize: 10,
                color: "var(--ink-2)",
                letterSpacing: "0.08em",
              }}
            >
              REPLYING TO {replyTo.author.toUpperCase()}
            </div>
            <button
              onClick={() => setReplyTo(null)}
              className="tap f-mono"
              style={{ fontSize: 10, color: "var(--red)", fontWeight: 700 }}
            >
              CANCEL
            </button>
          </div>
        )}
        {session ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Avatar
              name={
                profile ? profile.username?.slice(0, 2).toUpperCase() : "YO"
              }
              size={32}
              color="var(--lime)"
              shape="soft"
            />
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handlePost()
              }
              placeholder={
                replyTo
                  ? `reply to ${replyTo.author}…`
                  : "write something kind & weird…"
              }
              style={{
                flex: 1,
                border: "2px solid var(--ink)",
                padding: "8px 10px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                background: "var(--paper-2)",
              }}
            />
            <button
              onClick={handlePost}
              disabled={posting || !comment.trim()}
              className="tap"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                border: "none",
                padding: "8px 12px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                opacity: posting ? 0.6 : 1,
              }}
            >
              {replyTo ? "REPLY" : "POST"}
            </button>
          </div>
        ) : (
          <div
            className="f-mono"
            style={{
              fontSize: 11,
              color: "var(--ink-2)",
              textAlign: "center",
              letterSpacing: "0.08em",
            }}
          >
            SIGN IN TO LEAVE A RESPONSE
          </div>
        )}
      </div>

      {shareOpen && <ShareSheet idea={i} onClose={() => setShareOpen(false)} />}
    </div>
  );
}
