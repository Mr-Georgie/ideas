import React, { useState, useRef, useEffect } from "react";
import { Tape } from "../../shared/Tape";
import { Tag } from "../../shared/Tag";
import { MetaRow } from "./MetaRow";
import { ReactionRow } from "./ReactionRow";

// --- Mini Player for the Board ---
function MiniRamble({ url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));

  const toggle = (e) => {
    e.stopPropagation(); // CRITICAL: Stops the card from opening
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
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "2.5px solid var(--ink)",
        background: isPlaying ? "var(--lime)" : "var(--pink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 0 var(--ink)",
        marginLeft: 10,
        flexShrink: 0,
        transform: isPlaying ? "translate(1px, 1px)" : "none",
      }}
    >
      {isPlaying ? (
        <div style={{ width: 10, height: 10, background: "var(--ink)" }} />
      ) : (
        <div style={{ 
          width: 0, height: 0, 
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderLeft: "10px solid var(--ink)",
          marginLeft: 3
        }} />
      )}
    </button>
  );
}

export function CardManifesto({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="hover:animate-scale-bounce transition-transform duration-300 hover:scale-105"
      style={{
        background: "var(--paper)",
        border: "2.5px solid var(--ink)",
        padding: 16,
        position: "relative",
        transform: `rotate(${idea.tilt || 0}deg)`,
        boxShadow: `5px 5px 0 ${idea.accent}, 5px 5px 0 2px var(--ink)`,
        cursor: "pointer",
      }}
    >
      <Tape left={20} top={-10} color="rgba(255,61,127,0.55)" tilt={-6} />
      
      <MetaRow author={idea.author} posted={idea.posted} accent={idea.accent} />
      
      <div
        className="f-display"
        style={{ 
          fontSize: 30, 
          marginTop: 14, 
          color: "var(--ink)", 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <span style={{ lineHeight: 1 }}>{idea.title}</span>
        
        {/* --- ADDED MINI PLAYER --- */}
        {idea.audio_url && <MiniRamble url={idea.audio_url} />}
        {/* <MiniRamble url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /> */}
      </div>

      {idea.original && (
        <div
          className="f-mono"
          style={{
            marginTop: 8,
            fontSize: 11,
            color: "var(--ink-3)",
            letterSpacing: "0.08em",
          }}
        >
          remix of{" "}
          <span style={{ color: "var(--blue)" }}>{idea.original.title}</span>
        </div>
      )}

      <div
        className="f-body"
        style={{
          fontSize: 14,
          color: "var(--ink-2)",
          marginTop: 10,
          lineHeight: 1.45,
        }}
      >
        {idea.body}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        {idea.tags.map((t) => (
          <Tag key={t} color="var(--ink)">
            #{t}
          </Tag>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1.5px dashed var(--ink-3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ReactionRow reactions={idea.reactions} compact />
        <div
          className="f-mono"
          style={{ fontSize: 10, color: "var(--ink-2)", fontWeight: 600 }}
        >
          {idea.replies} replies →
        </div>
      </div>
    </div>
  );
}