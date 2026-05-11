import React from "react";
import { Tape } from "../../shared/Tape";
import { Tag } from "../../shared/Tag";
import { MetaRow } from "./MetaRow";
import { ReactionRow } from "./ReactionRow";

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
        transform: `rotate(${idea.tilt}deg)`,
        boxShadow: `5px 5px 0 ${idea.accent}, 5px 5px 0 2px var(--ink)`,
        cursor: "pointer",
      }}
    >
      <Tape left={20} top={-10} color="rgba(255,61,127,0.55)" tilt={-6} />
      <MetaRow author={idea.author} posted={idea.posted} accent={idea.accent} />
      <div
        className="f-display"
        style={{ fontSize: 30, marginTop: 14, color: "var(--ink)" }}
      >
        {idea.title}
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
