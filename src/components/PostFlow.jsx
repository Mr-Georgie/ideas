import React, { useState, useRef } from "react";
import { Tag } from "./shared/Tag";
import { Tape } from "./shared/Tape";
import { PostIt } from "./shared/PostIt";
import { Avatar } from "./shared/Avatar";
import { Icon } from "./shared/Icon";
import { supabase, ACCENT_MAP } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const STEPS = ["CRACK_OPEN", "TITLE", "GUTS", "RAMBLE", "TAG_IT", "PREVIEW"];

const TAGS_LIBRARY = [
  "half-baked", "tools", "social", "IRL", "audio", "memory", 
  "communication", "limits", "community", "self", "weird", 
  "cursed", "food", "cities", "time", "AI", "analog",
];

const PROMPTS = [
  "what if [thing] but with a 24-hour delay?",
  "an app that does the opposite of what you want.",
  "the version of [popular thing] for people who hate it.",
  "a service that only works when it's raining.",
];

const HEAT_OPTS = [
  { k: "half-baked", label: "HALF-BAKED", desc: "barely a thought, just a vibe", color: "var(--mustard)" },
  { k: "cooking", label: "COOKING", desc: "got the gist, working on it", color: "var(--orange)" },
  { k: "shipped", label: "SHIPPED", desc: "actually built or did this", color: "var(--lime)" },
  { k: "cursed", label: "CURSED", desc: "probably should NOT exist", color: "var(--pink)" },
];

// --- Shared UI ---
function Pill({ active, children, onClick, color = "var(--ink)" }) {
  return (
    <button onClick={onClick} className="tap" style={{ padding: "6px 10px", border: "2px solid var(--ink)", background: active ? color : "transparent", color: active ? "var(--paper)" : "var(--ink)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {children}
    </button>
  );
}

// --- Step Components ---
function Step0({ data, setField }) {
  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>WHAT KIND OF IDEA IS THIS?</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 18 }}>how <span style={{ color: "var(--pink)" }}>baked</span><br />is it?</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {HEAT_OPTS.map((o, i) => (
          <button key={o.k} onClick={() => setField("heat", o.k)} className="tap" style={{ background: data.heat === o.k ? o.color : "var(--paper)", border: "2.5px solid var(--ink)", padding: 14, textAlign: "left", boxShadow: data.heat === o.k ? "4px 4px 0 var(--ink)" : "2px 2px 0 var(--ink-3)", transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)` }}>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 1, color: "var(--ink)" }}>{o.label}</div>
            <div className="f-body" style={{ fontSize: 12, marginTop: 6, color: data.heat === o.k ? "var(--ink)" : "var(--ink-2)" }}>{o.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step1({ data, setField }) {
  const len = data.title.length;
  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>NAME IT</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}>what's<br />the <span style={{ color: "var(--blue)" }}>idea?</span></div>
      <textarea value={data.title} onChange={(e) => setField("title", e.target.value)} placeholder="A library that's only open at 3am…" rows={3} style={{ width: "100%", padding: 12, fontFamily: "'Caprasimo', serif", fontSize: 22, lineHeight: 1.1, border: "2.5px solid var(--ink)", background: "var(--paper)", boxShadow: "4px 4px 0 var(--mustard)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{len}/120</span>
      </div>
      <div style={{ marginTop: 18 }}>
        <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-2)", marginBottom: 8 }}>STUCK? STEAL A PROMPT ↓</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PROMPTS.map((p, i) => (
            <button key={p} onClick={() => setField("title", p)} className="tap" style={{ textAlign: "left", background: "var(--paper-2)", border: "1.5px dashed var(--ink-2)", padding: "8px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--ink-2)", transform: `rotate(${i * 0.4 - 0.4}deg)` }}>→ {p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step2({ data, setField }) {
  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>UNPACK A LITTLE</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}>the <span style={{ color: "var(--lime)" }}>guts</span></div>
      <textarea value={data.body} onChange={(e) => setField("body", e.target.value)} placeholder="how does it work?..." rows={7} className="lined" style={{ width: "100%", padding: 14, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, lineHeight: 1.5, border: "2.5px solid var(--ink)", background: "var(--paper)", boxShadow: "4px 4px 0 var(--blue)" }} />
      <div className="f-mono" style={{ fontSize: 10, marginTop: 4 }}>{data.body.length} chars (minimum 11)</div>
    </div>
  );
}

function StepRamble({ audioBlob, setAudioBlob }) {
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isSaving, setIsSaving] = useState(false);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(finalBlob);
        setRecording(false);
        setIsSaving(false);
        clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setRecording(true);
      setTimeLeft(15);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      alert("Mic access denied!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      setIsSaving(true);
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const audioURL = audioBlob ? URL.createObjectURL(audioBlob) : null;

  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>OPTIONAL VOICE NOTE</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}>3am <span style={{ color: "var(--pink)" }}>ramble</span></div>
      <div style={{ background: "var(--paper-2)", border: "3px solid var(--ink)", padding: 24, textAlign: "center", boxShadow: "6px 6px 0 var(--ink)" }}>
        {!audioBlob && !recording && !isSaving && (
          <button onClick={startRecording} className="tap" style={{ background: "none", border: "none" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", border: "4px solid var(--ink)", background: "var(--red)", margin: "0 auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: 24, height: 24, borderRadius: "50%", background: "white" }} />
            </div>
            <div className="f-mono" style={{ marginTop: 12, fontWeight: 700 }}>TAP TO RECORD</div>
          </button>
        )}
        
        {(recording || isSaving) && (
          <div>
            <div className="f-display animate-pulse" style={{ fontSize: 48, color: "var(--red)" }}>
              {isSaving ? "SAVING..." : `00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
            </div>
            {!isSaving && <button onClick={stopRecording} className="tap" style={{ background: "var(--ink)", color: "white", padding: "10px 20px", border: "none", marginTop: 15, fontWeight: 700 }}>STOP</button>}
          </div>
        )}

        {audioBlob && !recording && !isSaving && (
          <div>
            <div className="f-mono" style={{ fontWeight: 900, color: "var(--lime)", marginBottom: 10 }}>✓ RAMBLE SAVED</div>
            <audio src={audioURL} controls style={{ width: "100%", marginBottom: 15 }} />
            <button onClick={() => setAudioBlob(null)} className="tap" style={{ color: "var(--red)", background: "none", border: "none", textDecoration: "underline", fontSize: 11, fontWeight: 700 }}>RE-RECORD</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Step3({ data, toggleTag }) {
  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>FILE IT</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 6 }}>tag it <span style={{ color: "var(--mustard)" }}>(max 4)</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {TAGS_LIBRARY.map((t) => (
          <Pill key={t} active={data.tags.includes(t)} onClick={() => toggleTag(t)}>#{t}</Pill>
        ))}
      </div>
    </div>
  );
}

function Step4({ data, profile, audioBlob }) {
  const heatColor = ACCENT_MAP[data.heat] || "var(--mustard)";
  const displayName = profile?.username || "you";
  return (
    <div className="fade-in">
      <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.16em", marginBottom: 6 }}>LAST LOOK</div>
      <div className="f-display" style={{ fontSize: 36, lineHeight: 0.94, marginBottom: 14 }}>ready to <span style={{ color: "var(--pink)" }}>pin?</span></div>
      <div style={{ position: "relative" }}>
        <Tape left={28} top={-10} color="rgba(255,61,127,0.55)" tilt={-7} />
        <div style={{ background: "var(--paper)", border: "3px solid var(--ink)", padding: 16, boxShadow: `5px 5px 0 ${heatColor}, 5px 5px 0 3px var(--ink)`, transform: "rotate(-1deg)" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name={displayName.slice(0, 2).toUpperCase()} size={24} color={profile?.avatar_color || heatColor} shape="soft" />
              <div className="f-body" style={{ fontWeight: 700, fontSize: 11 }}>{displayName}</div>
            </div>
            <Tag color={heatColor} filled>{data.heat.toUpperCase()}</Tag>
          </div>
          <div className="f-display" style={{ fontSize: 24 }}>{data.title || "untitled idea"}</div>
          <div className="f-body" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 8 }}>{data.body}</div>
          <div style={{ marginTop: 15, padding: 10, border: "2px dashed var(--ink-3)", background: audioBlob ? "var(--lime-light, #eaffea)" : "var(--paper-3)" }}>
            <div className="f-mono" style={{ fontSize: 10, fontWeight: 700 }}>
               {audioBlob ? "🎤 RAMBLE ATTACHED" : "🔇 NO AUDIO ATTACHED"}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 22 }}>
        <PostIt color="var(--mustard)" tilt={2} style={{ fontSize: 11 }}>constructive vibes only.</PostIt>
      </div>
    </div>
  );
}

// --- Main App ---
export function PostFlow({ onClose, onPosted }) {
  const { session, profile } = useAuth();
  const [step, setStep] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [data, setData] = useState({ heat: "cooking", title: "", body: "", tags: [] });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const total = STEPS.length;

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);
  const setField = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleTag = (t) => setData(d => ({ ...d, tags: d.tags.includes(t) ? d.tags.filter(x => x !== t) : d.tags.length < 4 ? [...d.tags, t] : d.tags }));

  const canAdvance = () => {
    if (step === 1) return data.title.trim().length > 5;
    if (step === 2) return data.body.trim().length > 10;
    if (step === 4) return data.tags.length > 0;
    return true;
  };

  const submit = async () => {
    if (!session?.user) return;
    setSubmitting(true);
    setErr("");
    let audioUrl = null;

    if (audioBlob) {
      const fileName = `ramble_${Date.now()}.webm`;
      const filePath = `${session.user.id}/${fileName}`;
      const { error: upErr } = await supabase.storage.from('voice_notes').upload(filePath, audioBlob);
      if (upErr) { setErr(upErr.message); setSubmitting(false); return; }
      const { data: { publicUrl } } = supabase.storage.from('voice_notes').getPublicUrl(filePath);
      audioUrl = publicUrl;
    }

    const { error: dbErr } = await supabase.from("ideas").insert({
      author_id: session.user.id,
      title: data.title.trim(),
      body: data.body.trim(),
      tags: data.tags,
      status: data.heat,
      audio_url: audioUrl,
      variant: 'manifesto'
    });

    if (dbErr) { setErr(dbErr.message); setSubmitting(false); }
    else { onPosted(); }
  };

  return (
    <div className="paper-bg" style={{ height: "100%", display: "flex", flexDirection: "column", position: 'relative' }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: "2px solid var(--ink)", background: "var(--paper)" }}>
        <button onClick={onClose} className="tap" style={{ background: "none", border: "none", display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="close" size={18} /><span className="f-mono" style={{ fontSize: 11, fontWeight: 700 }}>NEVERMIND</span>
        </button>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {STEPS.map((_, i) => <div key={i} style={{ flex: 1, height: 6, background: i <= step ? "var(--ink)" : "var(--paper-3)", border: "1.5px solid var(--ink)" }} />)}
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px 18px", overflowY: "auto" }}>
        {step === 0 && <Step0 data={data} setField={setField} />}
        {step === 1 && <Step1 data={data} setField={setField} />}
        {step === 2 && <Step2 data={data} setField={setField} />}
        {step === 3 && <StepRamble audioBlob={audioBlob} setAudioBlob={setAudioBlob} />}
        {step === 4 && <Step3 data={data} toggleTag={toggleTag} />}
        {step === 5 && <Step4 data={data} profile={profile} audioBlob={audioBlob} />}
        {err && <div className="f-mono" style={{ fontSize: 10, color: "var(--red)", marginTop: 10 }}>{err}</div>}
      </div>

      <div style={{ padding: "16px", borderTop: "2px solid var(--ink)", background: "var(--paper)", display: "flex", gap: 10, position: 'sticky', bottom: 0 }}>
        {step > 0 && <button onClick={prev} className="tap" style={{ padding: "12px 16px", background: "none", border: "2px solid var(--ink)", fontWeight: 700, fontSize: 12, fontFamily: 'monospace' }}>← BACK</button>}
        <button 
          onClick={step === total - 1 ? submit : next} 
          disabled={!canAdvance() || submitting} 
          className="tap" 
          style={{ 
            flex: 1, 
            padding: "12px 16px", 
            background: step === total - 1 ? "var(--lime)" : (canAdvance() ? "var(--ink)" : "var(--ink-3)"), 
            color: step === total - 1 ? "var(--ink)" : "white", 
            border: "2px solid var(--ink)", 
            fontWeight: 900,
            fontSize: 12,
            fontFamily: 'monospace',
            opacity: canAdvance() ? 1 : 0.6
          }}
        >
          {step === total - 1 ? (submitting ? "PINNING..." : "✺ PIN IT") : "NEXT →"}
        </button>
      </div>
    </div>
  );
}