import React, { useState } from "react";
import { useIdeas } from "../../hooks/useIdeas";
import { CardManifesto } from "./cards/CardManifesto";
import { CardSticky } from "./cards/CardSticky";
import { CardNewsclip } from "./cards/CardNewsclip";

const VARIANT_MAP = {
  manifesto: CardManifesto,
  sticky: CardSticky,
  newsclip: CardNewsclip,
  polaroid: CardManifesto,
  receipt: CardNewsclip,
  halftone: CardManifesto,
};

const FILTERS = [
  { k: "ALL", label: "ALL" },
  { k: "COOKING", label: "COOKING" },
  { k: "HALF-BAKED", label: "HALF-BAKED" },
  { k: "SHIPPED", label: "SHIPPED" },
  { k: "CURSED", label: "CURSED" },
];

function FeedHeader({ filter, setFilter }) {
  const today = new Date()
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div
      style={{
        padding: "14px 20px 10px",
        position: "sticky",
        top: 0,
        background: "var(--paper)",
        zIndex: 5,
        borderBottom: "2px solid var(--ink)",
      }}
    >
      <div
        className="f-mono"
        style={{
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "var(--ink-3)",
          textTransform: "uppercase",
        }}
      >
        BULLETIN · {today}
      </div>
      <h1
        className="f-display"
        style={{
          fontSize: 38,
          margin: "2px 0 0",
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span className="rainbow-text">IDIAS</span>
        <span
          className="f-mono"
          style={{
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.12em",
            padding: "2px 5px",
            background: "var(--orange)",
            color: "var(--paper)",
            border: "1.5px solid var(--ink)",
            transform: "rotate(-3deg)",
            display: "inline-block",
            boxShadow: "1.5px 1.5px 0 var(--ink)",
            marginBottom: 4,
          }}
        >
          BETA
        </span>
      </h1>
      <div
        style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto" }}
        className="no-scrollbar"
      >
        {FILTERS.map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className="tap hover:animate-wiggle"
            style={{
              border: "2px solid var(--ink)",
              background: filter === f.k ? "var(--ink)" : "transparent",
              color: filter === f.k ? "var(--paper)" : "var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "5px 10px",
              whiteSpace: "nowrap",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ padding: "14px 16px" }}>
      <div
        style={{
          background: "var(--paper-2)",
          border: "2px solid var(--ink-3)",
          padding: 18,
          height: 140,
          boxShadow: "3px 3px 0 var(--ink-3)",
          opacity: 0.5,
        }}
      >
        <div style={{ height: 10, background: "var(--ink-3)", width: "40%", marginBottom: 12 }} />
        <div style={{ height: 24, background: "var(--ink-3)", width: "80%", marginBottom: 8 }} />
        <div style={{ height: 10, background: "var(--ink-3)", width: "60%" }} />
      </div>
    </div>
  );
}

function FeedCard({ idea, onOpen, index }) {
  const Comp = VARIANT_MAP[idea.variant] || CardManifesto;
  const delay = Math.min(index * 0.1, 1);
  return (
    <div
      className="fade-in"
      style={{ padding: "14px 16px", animationDelay: `${delay}s` }}
    >
      <Comp idea={idea} onOpen={() => onOpen(idea)} />
    </div>
  );
}

export function Feed({ onOpenIdea }) {
  const [filter, setFilter] = useState("ALL");
  const { ideas, loading, error } = useIdeas(filter);

  return (
    <div className="paper-bg" style={{ minHeight: "100%" }}>
      <FeedHeader filter={filter} setFilter={setFilter} />
      
      {loading && [1, 2, 3].map((k) => <SkeletonCard key={k} />)}

      {error && (
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div className="f-display" style={{ fontSize: 20, color: "var(--red)" }}>couldn't load ideas.</div>
          <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 6 }}>{error}</div>
        </div>
      )}

      {!loading && !error && ideas.length === 0 && (
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div className="f-display" style={{ fontSize: 20, color: "var(--ink-2)" }}>nothing here yet.</div>
          <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 6 }}>BE THE FIRST →</div>
        </div>
      )}

      {!loading &&
        ideas.map((idea, index) => (
          <FeedCard
            key={idea.id}
            idea={idea}
            onOpen={onOpenIdea}
            index={index}
          />
        ))}

      {!loading && ideas.length > 0 && (
        <div style={{ padding: "10px 0 100px", textAlign: "center" }}>
          <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.2em" }}>━ END OF TODAY'S BULLETIN ━</div>
          <div className="f-display" style={{ fontSize: 18, color: "var(--ink-2)", marginTop: 8 }}>come back tomorrow.</div>
        </div>
      )}
    </div>
  );
}