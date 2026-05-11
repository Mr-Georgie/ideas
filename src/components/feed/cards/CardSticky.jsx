import React from "react";
import { Avatar } from "../../shared/Avatar";
import { Tag } from "../../shared/Tag";
import { ReactionRow } from "./ReactionRow";

export function CardSticky({ idea, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="hover:animate-jello transition-transform duration-300 hover:scale-105"
      style={{
        background: idea.accent,
        padding: 18,
        transform: `rotate(${idea.tilt}deg)`,
        boxShadow: "4px 6px 0 rgba(0,0,0,0.18), 2px 3px 14px rgba(0,0,0,0.12)",
        position: "relative",
        color: "var(--ink)",
        border: "2px solid var(--ink)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Tag color="var(--ink)" filled>
          STICKY
        </Tag>
        <div
          className="f-mono"
          style={{ fontSize: 10, color: "var(--ink)", fontWeight: 600 }}
        >
          {idea.posted} ago
        </div>
      </div>
      <div
        className="f-display"
        style={{ fontSize: 28, marginTop: 12, lineHeight: 0.96 }}
      >
        {idea.title}
      </div>
      {idea.original && (
        <div
          className="f-mono"
          style={{ marginTop: 8, fontSize: 10, color: "var(--ink-3)" }}
        >
          remix of {idea.original.title}
        </div>
      )}
      <div
        className="f-body"
        style={{ fontSize: 13, marginTop: 10, lineHeight: 1.4 }}
      >
        {idea.body}
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar
            name={idea.author.initials}
            size={26}
            color="var(--paper)"
            shape="circle"
          />
          <span
            className="f-mono"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}
          >
            — {idea.author.name.toUpperCase()}
          </span>
        </div>
        <div className="f-mono" style={{ fontSize: 10, fontWeight: 700 }}>
          {idea.replies} ✺
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <ReactionRow reactions={idea.reactions} compact />
      </div>
    </div>
  );
}
