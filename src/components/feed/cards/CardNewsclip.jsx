import React, { useState, useRef, useEffect } from "react";
import { ReactionRow } from "./ReactionRow";

// --- Mini Player Component ---
function MiniRamble({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));

  const toggle = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
      onClick={toggle}
      className="tap"
      style={{
        padding: "4px 12px",
        borderRadius: "0",
        border: "2px solid var(--ink)",
        background: isPlaying ? "var(--lime)" : "var(--pink)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "2px 2px 0 var(--ink)",
        margin: "10px auto 0",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        fontWeight: 800,
        textTransform: "uppercase"
      }}
    >
      {isPlaying ? "■ STOP" : "▶ PLAY RAMBLE"}
    </button>
  );
}

export function CardNewsclip({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: "var(--paper-2)",
        border: "2px solid var(--ink)",
        padding: 14,
        transform: `rotate(${idea.tilt}deg)`,
        position: "relative",
        boxShadow: "3px 4px 0 var(--ink)",
        cursor: "pointer",
      }}
    >
      <div
        className="f-mono"
        style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          color: "var(--ink-2)",
          textAlign: "center",
          borderBottom: "1.5px solid var(--ink)",
          paddingBottom: 6,
          marginBottom: 10,
        }}
      >
        THE WEIRD GAZETTE — VOL III · ISS 88
      </div>
      <div
        className="f-display"
        style={{
          fontSize: 30,
          lineHeight: 0.94,
          textAlign: "center",
          color: "var(--ink)",
        }}
      >
        {idea.title}
      </div>

      {/* --- ADDED MINI PLAYER --- */}
      {idea.audio_url && <MiniRamble url={idea.audio_url} />}

      {idea.original && (
        <div
          className="f-mono"
          style={{
            marginTop: 8,
            fontSize: 10,
            color: "var(--ink-3)",
            textAlign: "center",
          }}
        >
          remix of {idea.original.title}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: "var(--ink-3)",
          marginTop: 8,
          paddingBottom: 8,
          borderBottom: "1px solid var(--ink-3)",
        }}
      >
        <span>BY {idea.author.name.toUpperCase()}</span>
        <span style={{ color: idea.accent, fontWeight: 700 }}>
          ● {idea.author.tag.toUpperCase()}
        </span>
      </div>
      <div style={{ columnCount: 2, columnGap: 12, marginTop: 10 }}>
        <div
          className="f-body"
          style={{ fontSize: 12, lineHeight: 1.4, color: "var(--ink-2)" }}
        >
          <span
            className="f-display"
            style={{
              fontSize: 28,
              float: "left",
              lineHeight: 0.9,
              marginRight: 4,
              color: idea.accent,
            }}
          >
            {idea.body[0]}
          </span>
          {idea.body.slice(1)}
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ReactionRow reactions={idea.reactions} compact />
        <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-2)" }}>
          p.{idea.replies}
        </div>
      </div>
    </div>
  );
}