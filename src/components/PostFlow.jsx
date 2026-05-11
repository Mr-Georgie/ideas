import React, { useState } from "react";
import { Tag } from "./shared/Tag";
import { Tape } from "./shared/Tape";
import { PostIt } from "./shared/PostIt";
import { Avatar } from "./shared/Avatar";
import { Icon } from "./shared/Icon";
import { supabase, VARIANTS, ACCENT_MAP } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const STEPS = ["CRACK_OPEN", "TITLE", "GUTS", "TAG_IT", "PREVIEW"];

const TAGS_LIBRARY = [
  "half-baked",
  "tools",
  "social",
  "IRL",
  "audio",
  "memory",
  "communication",
  "limits",
  "community",
  "self",
  "weird",
  "cursed",
  "food",
  "cities",
  "time",
  "AI",
  "analog",
];

const PROMPTS = [
  "what if [thing] but with a 24-hour delay?",
  "an app that does the opposite of what you want.",
  "the version of [popular thing] for people who hate it.",
  "a service that only works when it's raining.",
  "what if you could only do this once a year?",
];

const HEAT_OPTS = [
  {
    k: "half-baked",
    label: "HALF-BAKED",
    desc: "barely a thought, just a vibe",
    color: "var(--mustard)",
  },
  {
    k: "cooking",
    label: "COOKING",
    desc: "got the gist, working on it",
    color: "var(--orange)",
  },
  {
    k: "shipped",
    label: "SHIPPED",
    desc: "actually built or did this",
    color: "var(--lime)",
  },
  {
    k: "cursed",
    label: "CURSED",
    desc: "probably should NOT exist",
    color: "var(--pink)",
  },
];

function Pill({ active, children, onClick, color = "var(--ink)" }) {
  return (
    <button
      onClick={onClick}
      className="tap"
      style={{
        padding: "6px 10px",
        border: "2px solid var(--ink)",
        background: active ? color : "transparent",
        color: active ? "var(--paper)" : "var(--ink)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </button>
  );
}

function Step0({ data, setField }) {
  return (
    <div className="fade-in">
      <div
        className="f-mono"
        style={{
          fontSize: 10,
          color: "var(--ink-3)",
          letterSpacing: "0.16em",
          marginBottom: 6,
        }}
      >
        WHAT KIND OF IDEA IS THIS?
      </div>
      <div
        className="f-display"
        style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 18 }}
      >
        how <span style={{ color: "var(--pink)" }}>baked</span>
        <br />
        is it?
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {HEAT_OPTS.map((o, i) => {
          const active = data.heat === o.k;
          return (
            <button
              key={o.k}
              onClick={() => setField("heat", o.k)}
              className="tap"
              style={{
                background: active ? o.color : "var(--paper)",
                border: "2.5px solid var(--ink)",
                padding: 14,
                textAlign: "left",
                boxShadow: active
                  ? "4px 4px 0 var(--ink)"
                  : "2px 2px 0 var(--ink-3)",
                transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
              }}
            >
              <div
                className="f-display"
                style={{ fontSize: 22, lineHeight: 1, color: "var(--ink)" }}
              >
                {o.label}
              </div>
              <div
                className="f-body"
                style={{
                  fontSize: 12,
                  marginTop: 6,
                  color: active ? "var(--ink)" : "var(--ink-2)",
                }}
              >
                {o.desc}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 22 }}>
        <PostIt color="var(--lime)" tilt={-2} style={{ fontSize: 12 }}>
          <div
            className="f-mono"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            HEADS UP
          </div>
          half-baked is the default. nobody here expects fully formed.
        </PostIt>
      </div>
    </div>
  );
}

function Step1({ data, setField }) {
  const len = data.title.length;
  return (
    <div className="fade-in">
      <div
        className="f-mono"
        style={{
          fontSize: 10,
          color: "var(--ink-3)",
          letterSpacing: "0.16em",
          marginBottom: 6,
        }}
      >
        NAME IT
      </div>
      <div
        className="f-display"
        style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}
      >
        what's
        <br />
        the <span style={{ color: "var(--blue)" }}>idea?</span>
      </div>
      <textarea
        value={data.title}
        onChange={(e) => setField("title", e.target.value)}
        placeholder="A library that's only open at 3am…"
        rows={3}
        style={{
          width: "100%",
          padding: 12,
          fontFamily: "'Caprasimo', serif",
          fontSize: 22,
          lineHeight: 1.1,
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          boxShadow: "4px 4px 0 var(--mustard)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span
          className="f-mono"
          style={{ fontSize: 10, color: "var(--ink-3)" }}
        >
          {len}/120
        </span>
        <span
          className="f-mono"
          style={{
            fontSize: 10,
            color: len > 5 ? "var(--lime)" : "var(--ink-3)",
          }}
        >
          {len > 5 ? "✓ READY" : "KEEP GOING"}
        </span>
      </div>
      <div style={{ marginTop: 18 }}>
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "var(--ink-2)",
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          STUCK? STEAL A PROMPT ↓
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PROMPTS.slice(0, 3).map((p, i) => (
            <button
              key={p}
              onClick={() => setField("title", p)}
              className="tap"
              style={{
                textAlign: "left",
                background: "var(--paper-2)",
                border: "1.5px dashed var(--ink-2)",
                padding: "8px 10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--ink-2)",
                transform: `rotate(${i * 0.4 - 0.4}deg)`,
              }}
            >
              → {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ data, setField }) {
  const wordCount = data.body.split(/\s+/).filter(Boolean).length;
  const readSec = Math.max(1, Math.round((wordCount / 200) * 60));
  return (
    <div className="fade-in">
      <div
        className="f-mono"
        style={{
          fontSize: 10,
          color: "var(--ink-3)",
          letterSpacing: "0.16em",
          marginBottom: 6,
        }}
      >
        UNPACK A LITTLE
      </div>
      <div
        className="f-display"
        style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}
      >
        the <span style={{ color: "var(--lime)" }}>guts</span>
      </div>
      <div
        className="f-body"
        style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 10 }}
      >
        2-4 sentences. Don't pitch it. Just describe it like you would to a
        friend on a walk.
      </div>
      <textarea
        value={data.body}
        onChange={(e) => setField("body", e.target.value)}
        placeholder="how does it work? who's it for? what's the weird part?"
        rows={7}
        className="lined"
        style={{
          width: "100%",
          padding: 14,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          lineHeight: 1.5,
          border: "2.5px solid var(--ink)",
          background: "var(--paper)",
          boxShadow: "4px 4px 0 var(--blue)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <span
          className="f-mono"
          style={{ fontSize: 10, color: "var(--ink-3)" }}
        >
          {data.body.length} chars
        </span>
        <span
          className="f-mono"
          style={{ fontSize: 10, color: "var(--ink-3)" }}
        >
          ~{readSec}s read
        </span>
      </div>
    </div>
  );
}

function Step3({ data, toggleTag }) {
  return (
    <div className="fade-in">
      <div
        className="f-mono"
        style={{
          fontSize: 10,
          color: "var(--ink-3)",
          letterSpacing: "0.16em",
          marginBottom: 6,
        }}
      >
        FILE IT
      </div>
      <div
        className="f-display"
        style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 6 }}
      >
        tag it
        <br />
        <span style={{ color: "var(--mustard)" }}>(max 4)</span>
      </div>
      <div
        className="f-body"
        style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 14 }}
      >
        helps weird people find your weird thing.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {TAGS_LIBRARY.map((t) => (
          <Pill
            key={t}
            active={data.tags.includes(t)}
            onClick={() => toggleTag(t)}
          >
            #{t}
          </Pill>
        ))}
      </div>
      <div style={{ marginTop: 22 }}>
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "var(--ink-2)",
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          SELECTED ({data.tags.length}/4)
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 6, minHeight: 28 }}
        >
          {data.tags.length === 0 && (
            <span
              className="f-mono"
              style={{ fontSize: 11, color: "var(--ink-3)" }}
            >
              none yet
            </span>
          )}
          {data.tags.map((t) => (
            <Tag key={t} color="var(--ink)" filled tilt={-1}>
              #{t}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, profile }) {
  const heatColor = ACCENT_MAP[data.heat] || "var(--mustard)";
  const displayName = profile?.username || "you";
  return (
    <div className="fade-in">
      <div
        className="f-mono"
        style={{
          fontSize: 10,
          color: "var(--ink-3)",
          letterSpacing: "0.16em",
          marginBottom: 6,
        }}
      >
        LAST LOOK
      </div>
      <div
        className="f-display"
        style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}
      >
        ready to <span style={{ color: "var(--pink)" }}>pin?</span>
      </div>
      <div style={{ position: "relative" }}>
        <Tape left={28} top={-10} color="rgba(255,61,127,0.55)" tilt={-7} />
        <Tape right={28} top={-10} color="rgba(61,91,255,0.45)" tilt={6} />
        <div
          style={{
            background: "var(--paper)",
            border: "3px solid var(--ink)",
            padding: 16,
            boxShadow: `5px 5px 0 ${heatColor}, 5px 5px 0 3px var(--ink)`,
            transform: "rotate(-1deg)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar
                name={displayName.slice(0, 2).toUpperCase()}
                size={28}
                color={profile?.avatar_color || heatColor}
                shape="soft"
              />
              <div className="f-body" style={{ fontWeight: 700, fontSize: 12 }}>
                {displayName}
              </div>
            </div>
            <Tag color={heatColor} filled>
              {data.heat.toUpperCase()}
            </Tag>
          </div>
          <div className="f-display" style={{ fontSize: 24, marginTop: 10 }}>
            {data.title || "untitled idea"}
          </div>
          <div
            className="f-body"
            style={{
              fontSize: 13,
              color: "var(--ink-2)",
              marginTop: 8,
              lineHeight: 1.45,
            }}
          >
            {data.body || "no body yet…"}
          </div>
          <div
            style={{ display: "flex", gap: 5, marginTop: 12, flexWrap: "wrap" }}
          >
            {data.tags.map((t) => (
              <Tag key={t} color="var(--ink)">
                #{t}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
        <PostIt color="var(--mustard)" tilt={2} style={{ fontSize: 12 }}>
          <div
            className="f-mono"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            FYI
          </div>
          when you pin this, it joins the bulletin. responses are constructive
          only.
        </PostIt>
        <PostIt color="var(--blue)" tilt={-1} style={{ fontSize: 12 }}>
          <div
            className="f-mono"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: 4,
              color: "var(--paper)",
            }}
          >
            DISCLAIMER
          </div>
          <span style={{ color: "var(--paper)" }}>
            by posting you own your words. keep it legal, keep it human. the
            board reserves the right to remove anything harmful or off-brand.
          </span>
        </PostIt>
      </div>
    </div>
  );
}

export function PostFlow({ onClose, onPosted, remixOf = null }) {
  const { session, profile } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    heat: "cooking",
    title: "",
    body: "",
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const total = STEPS.length;

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const toggleTag = (t) =>
    setData((d) => ({
      ...d,
      tags: d.tags.includes(t)
        ? d.tags.filter((x) => x !== t)
        : d.tags.length < 4
          ? [...d.tags, t]
          : d.tags,
    }));

  const canAdvance = () => {
    if (step === 1) return data.title.trim().length > 5;
    if (step === 2) return data.body.trim().length > 10;
    if (step === 3) return data.tags.length > 0;
    return true;
  };

  const submit = async () => {
    if (!session?.user) {
      setErr("you need to sign in first");
      return;
    }
    setSubmitting(true);
    setErr("");

    const totalIdeas =
      (profile?.shipped_count || 0) +
      (profile?.cooking_count || 0) +
      (profile?.dropped_count || 0);
    const variant = VARIANTS[totalIdeas % VARIANTS.length];

    const { data: newIdea, error } = await supabase
      .from("ideas")
      .insert({
        author_id: session.user.id,
        title: data.title.trim(),
        body: data.body.trim(),
        tags: data.tags,
        status: data.heat,
        variant,
      })
      .select()
      .single();

    if (error) {
      setErr(error.message);
      setSubmitting(false);
      return;
    }

    // If this is a remix, create the remix relationship
    if (remixOf) {
      const { error: remixError } = await supabase
        .from("remixes")
        .insert({
          original_idea_id: remixOf.id,
          remix_idea_id: newIdea.id,
        })
        .select()
        .single();

      if (remixError) {
        setErr(`Could not save remix link: ${remixError.message}`);
        setSubmitting(false);
        return;
      }
    }

    // Increment the right counter on profile
    const counterField =
      data.heat === "shipped"
        ? "shipped_count"
        : data.heat === "dropped"
          ? "dropped_count"
          : "cooking_count";
    await supabase
      .from("profiles")
      .update({
        [counterField]: (profile?.[counterField] || 0) + 1,
      })
      .eq("id", session.user.id);

    setSubmitting(false);
    onPosted();
  };

  return (
    <div
      className="paper-bg"
      style={{
        minHeight: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header */}
      <div
        style={{
          padding: "14px 16px 12px",
          borderBottom: "2px solid var(--ink)",
          background: "var(--paper)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={onClose}
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "var(--ink)",
            }}
          >
            <Icon name="close" size={18} />
            <span
              className="f-mono"
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em" }}
            >
              NEVERMIND
            </span>
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {remixOf && (
              <div
                className="f-mono"
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "var(--blue)",
                  letterSpacing: "0.12em",
                }}
              >
                REMIXING "{remixOf.title.slice(0, 20)}
                {remixOf.title.length > 20 ? "..." : ""}"
              </div>
            )}
            <div
              className="f-mono"
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--ink-3)",
                letterSpacing: "0.12em",
              }}
            >
              STEP {step + 1} / {total}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 6,
                background: i <= step ? "var(--ink)" : "var(--paper-3)",
                border: "1.5px solid var(--ink)",
              }}
            />
          ))}
        </div>
      </div>

      {/* step content */}
      <div style={{ flex: 1, padding: "20px 18px 12px", overflow: "auto" }}>
        {step === 0 && <Step0 data={data} setField={setField} />}
        {step === 1 && <Step1 data={data} setField={setField} />}
        {step === 2 && <Step2 data={data} setField={setField} />}
        {step === 3 && <Step3 data={data} toggleTag={toggleTag} />}
        {step === 4 && <Step4 data={data} profile={profile} />}
        {err && (
          <div
            className="f-mono"
            style={{ fontSize: 10, color: "var(--red)", marginTop: 10 }}
          >
            {err}
          </div>
        )}
      </div>

      {/* action bar */}
      <div
        style={{
          padding: "12px 16px 16px",
          borderTop: "2px solid var(--ink)",
          background: "var(--paper)",
          display: "flex",
          gap: 10,
        }}
      >
        {step > 0 && (
          <button
            onClick={prev}
            className="tap"
            style={{
              padding: "11px 16px",
              background: "transparent",
              border: "2px solid var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
            }}
          >
            ← BACK
          </button>
        )}
        {step < total - 1 && (
          <button
            onClick={next}
            disabled={!canAdvance()}
            className="tap"
            style={{
              flex: 1,
              padding: "11px 16px",
              background: canAdvance() ? "var(--ink)" : "var(--ink-3)",
              color: "var(--paper)",
              border: "2px solid var(--ink)",
              boxShadow: canAdvance() ? "4px 4px 0 var(--pink)" : "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              opacity: canAdvance() ? 1 : 0.6,
            }}
          >
            NEXT →
          </button>
        )}
        {step === total - 1 && (
          <button
            onClick={submit}
            disabled={submitting}
            className="tap"
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "var(--lime)",
              border: "2px solid var(--ink)",
              boxShadow: "4px 4px 0 var(--ink)",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.1em",
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? "PINNING…" : "✺ PIN IT TO THE BOARD"}
          </button>
        )}
      </div>
    </div>
  );
}
