"use client";
import React, { useEffect, useMemo, useState } from "react";
import { S, C, speak, SpeakerIcon } from "./ui";
import { PickItem, SpellItem, BigHear } from "./Items";
import { At } from "./Stage";

// Every room calls onDone({ correct, total }) when finished. correct counts
// first-try answers; total is the number of items. The chamber adds them up
// for the teacher's report. Rooms never reward a wrong answer.
//
// Relic Lab redesign (Sept 30, 2026): rooms draw onto the 1600 x 900 stage.
// MAIN is the default work area to the right of the side card; the wall,
// door, codex and vault rooms place things to line up with their scene art.
export const MAIN = { x: 390, y: 150, w: 1180, h: 690 };

function Panel({ eyebrow, title, sub, right, children, box = MAIN, scroll = false }) {
  return (
    <At {...box}>
      <section style={{ ...S.glass, height: "100%", padding: "24px 30px", display: "flex", flexDirection: "column", gap: 16, overflow: scroll ? "auto" : "hidden" }}>
        {(eyebrow || title || right) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div>
              {eyebrow && <div style={S.eyebrow}>{eyebrow}</div>}
              {title && <h2 style={S.h2}>{title}</h2>}
              {sub && <p style={{ ...S.p, marginTop: 4 }}>{sub}</p>}
            </div>
            {right}
          </div>
        )}
        {children}
      </section>
    </At>
  );
}
function Done({ text, label = "Continue", onClick, box }) {
  return (
    <Panel box={box || { x: 520, y: 330, w: 920, h: 240 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, height: "100%" }}>
        <p style={{ ...S.p, margin: 0, fontSize: 24, fontWeight: 700, color: C.navy, textAlign: "center" }}>{text}</p>
        <button type="button" style={{ ...S.primary, minWidth: 260 }} onClick={onClick}>{label} →</button>
      </div>
    </Panel>
  );
}
function useSeq(items) {
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [results, setResults] = useState([]);
  const next = (ok) => { if (ok) setCorrect((n) => n + 1); setResults((r) => [...r, { i, ok: !!ok }]); setI((n) => n + 1); };
  return { i, item: items[i], done: i >= items.length, correct, next, results };
}
function Count({ n, of, label }) {
  return <div style={{ font: "800 30px Poppins, sans-serif", color: C.tealText, whiteSpace: "nowrap" }}>{n} <span style={{ fontSize: 17, color: C.muted }}>{label || `of ${of}`}</span></div>;
}
function Dots({ n, of }) {
  return <div style={{ display: "flex", gap: 8 }}>{Array.from({ length: of }).map((_, i) => <span key={i} style={{ width: 18, height: 18, borderRadius: "50%", ...(i < n ? { background: C.teal, boxShadow: "0 0 8px rgba(20,184,200,0.7)" } : { background: "#fff", border: "2px solid #9fd6f2" }) }} />)}</div>;
}

// ---------- Warm-up ----------
export function WarmRoom({ room, onDone }) {
  const seq = useSeq(room.items);
  if (seq.done) {
    const items = seq.results.map((r) => ({ probe: room.items[r.i] && room.items[r.i].probe, ok: r.ok })).filter((x) => x.probe);
    return <Done text={`${seq.correct} of ${room.items.length}. ${room.keeper ? "Codes checked." : "Warmed up."}`} label={room.keeper ? "Continue" : "Open the codex"} onClick={() => onDone({ correct: seq.correct, total: room.items.length, items })} />;
  }
  return (
    <Panel eyebrow={`${room.keeper ? "Keeper review" : "Warm-up"} · word ${seq.i + 1} of ${room.items.length}`} title={room.keeper ? "Keep every code sharp" : "Codes you already cracked"} right={<Count n={seq.correct} of={room.items.length} />}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <PickItem key={seq.i} item={seq.item} mode="quick" onDone={seq.next} prompt="Listen, then tap the word you heard." />
      </div>
    </Panel>
  );
}

// ---------- Codex ----------
function CodeBanner({ room }) {
  return (
    <At x={500} y={120} w={720} h={210}>
      <div style={{ height: "100%", borderRadius: 26, padding: 14, background: "linear-gradient(160deg, #b9ab8f, #8d7f66)", boxShadow: "0 0 0 4px rgba(120,214,255,0.55), 0 0 26px rgba(80,200,255,0.55), 0 12px 26px rgba(0,0,0,0.3)", display: "flex", gap: 14, boxSizing: "border-box" }}>
        <div style={{ width: 180, flexShrink: 0, borderRadius: 18, border: "4px solid #e8b84a", background: "radial-gradient(circle at 50% 40%, #a39479, #6f634f)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", boxShadow: "inset 0 0 18px rgba(0,0,0,0.35), 0 0 14px rgba(232,184,74,0.6)" }}>
          {room.code.spellings.map((sp) => <span key={sp} style={{ font: `900 ${room.code.spellings.length > 1 ? 52 : 92}px Poppins, sans-serif`, color: "#7ff6ff", textShadow: "0 0 18px rgba(80,230,255,0.95), 0 0 4px #fff" }}>{sp}</span>)}
        </div>
        <div style={{ flex: 1, borderRadius: 16, background: "linear-gradient(180deg, #fbf5e6, #efe3c6)", padding: "14px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, boxShadow: "inset 0 0 0 2px rgba(150,120,70,0.35)" }}>
          <div style={{ font: "800 30px Poppins, sans-serif", color: C.navy }}>{room.full ? "New code: " : "Code refresh: "}<span style={{ color: C.blue }}>{room.code.label}</span></div>
          <div style={{ font: "600 21px/1.35 Inter, sans-serif", color: "#2a3550" }}>{room.code.rule.charAt(0).toUpperCase() + room.code.rule.slice(1)}.</div>
        </div>
      </div>
    </At>
  );
}
export function CodexRoom({ room, onDone }) {
  const [heard, setHeard] = useState([]);
  const [phase, setPhase] = useState(room.full ? "learn" : "refresh");
  const seq = useSeq(room.checks);
  const allHeard = heard.length >= room.cards.length;
  if (phase === "check") {
    if (seq.done) return <Done text={`Code logged: ${room.code.spellings.join(" and ")}.`} onClick={() => onDone({ correct: seq.correct, total: room.checks.length })} />;
    return (
      <>
        <CodeBanner room={room} />
        <Panel box={{ x: 420, y: 360, w: 1120, h: 470 }} eyebrow={`Quick check ${seq.i + 1} of ${room.checks.length}`}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <PickItem key={seq.i} item={seq.item} onDone={seq.next} />
          </div>
        </Panel>
      </>
    );
  }
  return (
    <>
      <CodeBanner room={room} />
      <At x={500} y={346} w={720} h={58}>
        <div style={{ height: "100%", borderRadius: 999, background: "rgba(13,40,90,0.9)", border: "2px solid rgba(120,214,255,0.8)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, color: "#fff", font: "700 21px Inter, sans-serif" }}>
          <SpeakerIcon /> {phase === "learn" ? "Tap each word to hear it. The glowing chunk is the code." : "Quick refresh: tap any word to hear it again."}
        </div>
      </At>
      <At x={400} y={420} w={1160} h={260}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, height: "100%" }}>
          {room.cards.map((cd) => {
            const on = heard.includes(cd.w);
            return (
              <button key={cd.w} type="button" aria-label={`Hear ${cd.w}`} onClick={() => { speak(cd.w); if (!on) setHeard([...heard, cd.w]); }}
                style={{ borderRadius: 20, cursor: "pointer", font: "800 52px Poppins, sans-serif", color: C.navy, background: "linear-gradient(180deg, #ffffff, #eef4f8)", border: `3px solid ${on ? C.teal : "#e3c27a"}`, boxShadow: on ? "0 0 0 4px rgba(20,184,200,0.3), 0 8px 18px rgba(15,35,80,0.2)" : "0 8px 18px rgba(15,35,80,0.2)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
                <span>{cd.parts.map((p, i) => <span key={i} style={i === cd.hi ? { color: "#14a9d6", textShadow: "0 0 12px rgba(20,169,214,0.45)" } : undefined}>{p}</span>)}</span>
                <span style={{ width: 46, height: 46, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #5cc0ff, #1c6fd6 70%)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><SpeakerIcon /></span>
              </button>
            );
          })}
        </div>
      </At>
      <At x={520} y={712} w={1000} h={92}>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ ...S.glass, padding: "0 24px", display: "flex", alignItems: "center", gap: 16, background: "rgba(13,40,90,0.88)", color: "#fff", border: "2px solid rgba(120,214,255,0.8)" }}>
            <div style={{ font: "800 24px Poppins, sans-serif", whiteSpace: "nowrap" }}>{heard.length} of {room.cards.length} heard</div>
            <Dots n={heard.length} of={room.cards.length} />
          </div>
          <button type="button" disabled={phase === "learn" && !allHeard} style={{ ...S.primary, flex: 1, fontSize: 26, opacity: phase === "learn" && !allHeard ? 0.55 : 1, cursor: phase === "learn" && !allHeard ? "default" : "pointer" }} onClick={() => setPhase("check")}>{phase === "learn" ? "I've got it. Test me." : "Ready"}</button>
        </div>
      </At>
    </>
  );
}

// ---------- Glyph wall ----------
// The stone panels in the wall scene sit at about x 529-1198, y 340-555.
export function WallRoom({ room, onDone }) {
  const [wi, setWi] = useState(0);
  const [cuts, setCuts] = useState([]);
  const [ok, setOk] = useState(false);
  const [misses, setMisses] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const word = room.words[wi];
  const sounds = room.mode === "sounds";
  if (!word) return <Done text="Wall cleared. Every chunk is cut." onClick={() => onDone({ correct, total: room.words.length })} />;
  const letters = word.w.split("");
  const parts = [];
  let last = 0;
  [...word.cuts].sort((a, b) => a - b).forEach((k) => { parts.push(word.w.slice(last, k)); last = k; });
  parts.push(word.w.slice(last));
  const big = letters.length <= 4 ? 150 : letters.length <= 6 ? 116 : letters.length <= 8 ? 92 : letters.length <= 10 ? 74 : 60;
  function fire() {
    const a = [...cuts].sort((x, y) => x - y).join(",");
    if (!cuts.length) { setFb({ ok: false, text: "Tap a gap to aim the laser first." }); return; }
    if (a === [...word.cuts].sort((x, y) => x - y).join(",")) {
      setOk(true); setFb({ ok: true, text: "" });
      if (misses === 0) setCorrect((n) => n + 1);
      speak([...parts, word.w]);
    } else {
      const m = misses + 1; setMisses(m); setCuts([]);
      setFb({ ok: false, text: m >= 2 ? (sounds ? `Say it slowly: ${parts.join(" · ")}. One cut between each sound.` : `Find the vowel sounds first. This word has ${parts.length} chunks.`) : "The wall flickers. Try a different gap: each chunk gets one vowel sound." });
    }
  }
  return (
    <>
      <At x={450} y={96} w={700} h={110}>
        <div style={{ height: "100%", borderRadius: 22, background: "rgba(13,40,90,0.9)", border: "2px solid rgba(120,214,255,0.85)", boxShadow: "0 0 22px rgba(80,200,255,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center" }}>
          <div style={{ font: "800 30px Poppins, sans-serif" }}>{sounds ? "Cut the word into its sounds." : "Cut the word into its chunks."}</div>
          <div style={{ font: "700 23px Inter, sans-serif" }}><span style={{ color: "#6fe6ff" }}>Tap the gaps</span>, then fire the laser. <span style={{ color: "#a9c4e8", fontSize: 18 }}>Word {wi + 1} of {room.words.length}</span></div>
        </div>
      </At>
      <At x={529} y={330} w={670} h={235}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {letters.map((ch, i) => (
            <React.Fragment key={i}>
              <span style={{ font: `800 ${big}px Poppins, sans-serif`, color: ok ? "#0e6f86" : "#2b2418", textShadow: ok ? "0 0 18px rgba(80,230,255,0.9)" : "0 2px 0 rgba(255,255,255,0.35)", lineHeight: 1 }}>{ch}</span>
              {i < letters.length - 1 && (
                <button type="button" aria-label={`Cut between ${ch} and ${letters[i + 1]}`} disabled={ok}
                  onClick={() => setCuts(cuts.includes(i + 1) ? cuts.filter((x) => x !== i + 1) : [...cuts, i + 1])}
                  style={{ width: big > 100 ? 26 : 20, height: 220, margin: "0 2px", border: 0, padding: 0, cursor: ok ? "default" : "pointer", background: "transparent", position: "relative" }}>
                  <span style={{ position: "absolute", left: "50%", top: 10, bottom: 10, width: cuts.includes(i + 1) ? 8 : 4, transform: "translateX(-50%)", borderRadius: 4, ...(cuts.includes(i + 1) ? { background: "#4fe3ff", boxShadow: "0 0 16px #4fe3ff, 0 0 4px #fff" } : { background: "repeating-linear-gradient(180deg, rgba(40,120,170,0.55) 0 8px, transparent 8px 16px)" }) }} />
                  {cuts.includes(i + 1) && <><span style={{ position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderTop: "18px solid #4fe3ff" }} /><span style={{ position: "absolute", left: "50%", bottom: -6, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: "18px solid #4fe3ff" }} /></>}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </At>
      <At x={529} y={612} w={670} h={46}>
        <div style={{ textAlign: "center", ...(ok ? { font: "800 28px Poppins, sans-serif", color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" } : { ...S.fb(fb.ok), fontSize: 20, color: fb.ok ? "#fff" : "#ffd2b8", textShadow: "0 2px 6px rgba(0,0,0,0.75)" }) }}>{ok ? `${parts.join("  ·  ")}  =  ${word.w}` : fb.text}</div>
      </At>
      <At x={560} y={700} w={1010} h={130}>
        <div style={{ display: "flex", gap: 18, height: "100%", alignItems: "stretch" }}>
          <button type="button" onClick={() => speak(ok ? [...parts, word.w] : word.w)} style={{ ...S.hear, flex: 1.1, borderRadius: 22, font: "800 28px Poppins, sans-serif", justifyContent: "center", gap: 18 }}><svg width="46" height="46" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" /><path d="M18.5 5.5a9 9 0 0 1 0 13" fill="none" /></svg>{ok ? "Hear the chunks" : "Hear the word"}</button>
          {ok ? (
            <button type="button" style={{ ...S.primary, flex: 1.3, borderRadius: 22, fontSize: 30 }} onClick={() => { setWi(wi + 1); setCuts([]); setOk(false); setMisses(0); setFb({ ok: true, text: "" }); }}>Next word →</button>
          ) : (
            <>
              <button type="button" style={{ flex: 1, borderRadius: 22, border: "3px solid rgba(255,255,255,0.8)", background: "linear-gradient(180deg, #2fd39a, #0f9e6e)", color: "#fff", font: "800 28px Poppins, sans-serif", cursor: "pointer", boxShadow: "0 0 0 4px rgba(47,211,154,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }} onClick={fire}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="12" r="7" /><path d="M12 2v5M12 17v5M2 12h5M17 12h5" /></svg>Fire the laser</button>
              <button type="button" style={{ ...S.secondary, width: 150, borderRadius: 22, fontSize: 20 }} onClick={() => setCuts([])}>⟲ Clear cuts</button>
            </>
          )}
        </div>
      </At>
    </>
  );
}

// ---------- Sorting vault ----------
// Sorting chamber scene: two console panels (left x 60-640, right x
// 960-1540, y 600-750) are the vaults; the relic floats between them.
export function SortRoom({ room, onDone }) {
  const [queue, setQueue] = useState(room.items.map((_, i) => i));
  const [missed, setMissed] = useState([]);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const item = queue.length ? room.items[queue[0]] : null;
  if (!item) return <Done text="Vault sealed. Every relic is sorted." onClick={() => onDone({ correct: room.items.length - missed.length, total: room.items.length })} />;
  function send(yes) {
    if (item.yes === yes) { setQueue(queue.slice(1)); setFb({ ok: true, text: `Sorted: ${item.w}.` }); }
    else {
      setMissed((m) => (m.includes(queue[0]) ? m : [...m, queue[0]]));
      setQueue([...queue.slice(1), queue[0]]);
      setFb({ ok: false, text: `${item.w}: read it again. It will come back around.` });
      speak(item.w);
    }
  }
  const vaultBtn = (yes, box) => (
    <At {...box}>
      <button type="button" onClick={() => send(yes)}
        style={{ width: "100%", height: "100%", borderRadius: 26, border: `4px solid ${yes ? C.teal : "#e3a92c"}`, background: yes ? "rgba(226,251,255,0.9)" : "rgba(255,246,223,0.92)", color: C.navy, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 0 0 4px ${yes ? "rgba(20,184,200,0.3)" : "rgba(227,169,44,0.3)"}, 0 10px 22px rgba(15,35,80,0.2)` }}>
        <span style={{ font: "800 34px Poppins, sans-serif", color: yes ? "#086b78" : "#9a6200" }}>{yes ? room.sort.yes : room.sort.no}</span>
        <span style={{ font: "700 21px Inter, sans-serif", color: C.soft }}>{yes ? room.sort.yesHint : room.sort.noHint}</span>
      </button>
    </At>
  );
  return (
    <>
      <At x={480} y={110} w={640} h={92}>
        <div style={{ height: "100%", borderRadius: 22, background: "rgba(13,40,90,0.9)", border: "2px solid rgba(120,214,255,0.85)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18, color: "#fff" }}>
          <div style={{ font: "800 26px Poppins, sans-serif" }}>Read the relic. Which vault?</div>
          <div style={{ font: "700 18px Inter, sans-serif", color: "#9fe9ff" }}>{queue.length} left</div>
        </div>
      </At>
      <At x={620} y={410} w={360} h={230}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 340, height: 170, borderRadius: 30, background: "radial-gradient(circle at 50% 30%, #fffdf6, #e9dcc0 80%)", border: "4px solid #d8b46a", boxShadow: "0 0 30px rgba(232,184,74,0.75), 0 12px 24px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", font: "800 64px Poppins, sans-serif", color: C.navy }}>{item.w}</div>
          <button type="button" style={{ ...S.hear, minHeight: 46 }} onClick={() => speak(item.w)}><SpeakerIcon /> Hear it</button>
        </div>
      </At>
      {vaultBtn(true, { x: 70, y: 606, w: 560, h: 150 })}
      {vaultBtn(false, { x: 970, y: 606, w: 560, h: 150 })}
      <At x={640} y={660} w={320} h={110}>
        {fb.text && <div style={{ ...S.fb(fb.ok), textAlign: "center", fontSize: 20, background: "rgba(255,255,255,0.9)", borderRadius: 14, padding: "8px 12px" }}>{fb.text}</div>}
      </At>
    </>
  );
}

// ---------- Sealed door (spelling) ----------
// The console in the door scene: dark screen about y 397-522, light deck below.
export function DoorRoom({ room, onDone }) {
  const seq = useSeq(room.words);
  if (seq.done) return <Done text="The door is open. You read it, cut it, and now you can spell it." onClick={() => onDone({ correct: seq.correct, total: room.words.length })} />;
  return (
    <>
      <At x={580} y={404} w={640} h={112}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 26, color: "#fff" }}>
          <button type="button" onClick={() => speak(seq.item.say)} aria-label="Hear the password" style={{ width: 96, height: 96, borderRadius: "50%", border: "3px solid #fff", background: "radial-gradient(circle at 35% 30%, #5cc0ff, #1c6fd6 70%)", boxShadow: "0 0 0 6px rgba(80,180,255,0.35), 0 0 24px rgba(80,180,255,0.6)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" fill="none" /><path d="M18.5 5.5a9 9 0 0 1 0 13" fill="none" /></svg>
          </button>
          <div style={{ font: "800 30px/1.2 Poppins, sans-serif", textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>Hear the password,<br />then build it.</div>
        </div>
      </At>
      <At x={500} y={530} w={760} h={330}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SpellItem key={seq.i} item={seq.item} onDone={seq.next} noHeader />
        </div>
      </At>
      <PasswordDots n={seq.i} of={room.words.length} />
    </>
  );
}
function PasswordDots({ n, of }) {
  return (
    <At x={1290} y={420} w={280} h={90}>
      <div style={{ ...S.glass, height: "100%", padding: "12px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
        <div style={{ font: "800 19px Poppins, sans-serif", color: C.navy }}>Password {Math.min(n + 1, of)} of {of}</div>
        <Dots n={n} of={of} />
      </div>
    </At>
  );
}

// ---------- Forge (word parts) ----------
// Forge scene: the anvil sits about x 670-1000, y 250-420; the console
// panel below (x 220-1380, y 530-760) holds the part chips.
const KIND = {
  pre: { border: "3px solid #14b8c8", color: "#086b78", background: "#e0fbff" },
  base: { border: "3px solid #e3a92c", color: "#7a4d00", background: "#fff4d6" },
  suf: { border: "3px solid #f08a6c", color: "#9a3412", background: "#ffece4" },
};
export function ForgeRoom({ room, onDone }) {
  const [fi, setFi] = useState(0);
  const [forged, setForged] = useState([]);
  const [ok, setOk] = useState(false);
  const [misses, setMisses] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const item = room.items[fi];
  if (!item) return <Done text="Every key is forged. Word parts snap together like key pieces." onClick={() => onDone({ correct, total: room.items.length })} />;
  function forge() {
    const made = forged.map((c) => c.t).join("");
    if (!made) { setFb({ ok: false, text: "Load some parts first." }); return; }
    if (made === item.w) { setOk(true); if (misses === 0) setCorrect((n) => n + 1); speak(item.w); setFb({ ok: true, text: "" }); return; }
    const m = misses + 1; setMisses(m); setForged([]);
    setFb({ ok: false, text: m >= 2 ? `Start with the base word, then add the parts: ${item.parts.join(" + ")}.` : `The forge sparks: that makes "${made}". Check the meaning again.` });
  }
  const chipStyle = (k) => ({ minWidth: 84, minHeight: 74, padding: "0 20px", borderRadius: 16, font: "800 32px Poppins, sans-serif", cursor: "pointer", boxShadow: "0 6px 12px rgba(15,35,80,0.15)", ...KIND[k] });
  return (
    <>
      <At x={400} y={96} w={780} h={104}>
        <div style={{ height: "100%", borderRadius: 22, background: "rgba(13,40,90,0.9)", border: "2px solid rgba(255,190,90,0.9)", boxShadow: "0 0 22px rgba(255,170,60,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center", padding: "0 18px" }}>
          <div style={{ font: "700 16px Inter, sans-serif", color: "#ffd89a", letterSpacing: "0.08em" }}>THE FORGE · KEY {fi + 1} OF {room.items.length}</div>
          <div style={{ font: "800 27px/1.2 Poppins, sans-serif" }}>Forge the word that means: {item.clue}</div>
        </div>
      </At>
      <At x={430} y={262} w={740} h={120}>
        <div style={{ height: "100%", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: ok ? "rgba(255,240,200,0.92)" : "rgba(255,255,255,0.55)", border: `3px ${ok ? "solid #ffb84a" : "dashed rgba(255,200,120,0.95)"}`, boxShadow: ok ? "0 0 36px rgba(255,170,40,0.9)" : "0 0 18px rgba(255,170,60,0.5)" }}>
          {forged.length ? forged.map((c, i) => <div key={i} style={{ ...chipStyle(c.k), cursor: "default", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.t}</div>)
            : <div style={{ font: "700 21px Inter, sans-serif", color: "#5a3b00" }}>Tap parts to load the anvil</div>}
          {ok && <div style={{ font: "800 36px Poppins, sans-serif", color: "#7a4d00", marginLeft: 10 }}>= {item.w}</div>}
        </div>
      </At>
      <At x={240} y={540} w={1120} h={210}>
        {ok ? (
          <div style={{ height: "100%", display: "flex", alignItems: "center", gap: 22, padding: "0 20px" }}>
            <div style={{ font: "600 23px/1.4 Inter, sans-serif", color: C.navy, flex: 1 }}>{item.explain}</div>
            <button type="button" style={{ ...S.primary, minWidth: 220 }} onClick={() => { setFi(fi + 1); setForged([]); setOk(false); setMisses(0); setFb({ ok: true, text: "" }); }}>Next key →</button>
          </div>
        ) : (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {room.chips.map((c) => <button key={c.t} type="button" style={chipStyle(c.k)} onClick={() => forged.length < 4 && setForged([...forged, c])}>{c.t}</button>)}
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "center" }}>
              <button type="button" style={S.hear} onClick={() => speak(item.w)}><SpeakerIcon /> Hear the word</button>
              <button type="button" style={S.dark} onClick={() => setForged([])}>Clear</button>
              <button type="button" style={{ ...S.primary, minWidth: 220, background: "linear-gradient(180deg, #ffb84a, #e07a14)", boxShadow: "0 0 0 3px rgba(255,170,60,0.4)" }} onClick={forge}>Forge it</button>
            </div>
          </div>
        )}
      </At>
      <At x={240} y={770} w={1120} h={40}>
        <div style={{ ...S.fb(fb.ok), textAlign: "center", fontSize: 20, textShadow: "0 0 6px #fff, 0 0 6px #fff" }}>{fb.text}</div>
      </At>
    </>
  );
}

// ---------- Word chains ----------
export function ChainRoom({ room, onDone }) {
  const seq = useSeq(room.steps);
  if (seq.done) return <Done text="The bridge is built." onClick={() => onDone({ correct: seq.correct, total: room.steps.length })} />;
  return (
    <Panel eyebrow={`Word chain · plank ${seq.i + 1} of ${room.steps.length}`} title="Change one sound to lay the next plank.">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {[room.start, ...room.steps.slice(0, seq.i).map((s) => s.answer)].map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: C.teal, font: "800 24px Poppins, sans-serif" }}>→</span>}
            <span style={{ padding: "8px 18px", borderRadius: 14, background: "#fff4d6", border: "3px solid #e3a92c", color: "#5a3b00", font: "800 28px Poppins, sans-serif" }}>{w}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <PickItem key={seq.i} item={seq.item} onDone={seq.next} prompt={`From ${seq.item.from}: listen, then tap the new word.`} />
      </div>
    </Panel>
  );
}

// ---------- Inscription ----------
// Tablet scene: the blank stone sits about x 470-1140, y 190-580.
const TAB = { x: 482, y: 214, w: 646, h: 356 };
function tabletFont(n) { return n <= 50 ? 28 : n <= 75 ? 25 : n <= 100 ? 22 : 20; }
export function ReadRoom({ room, onDone }) {
  const find = useMemo(() => new RegExp(room.find, "i"), [room.find]);
  const tokens = useMemo(() => room.text.split(/\s+/).map((t) => ({ t, target: find.test(t.toLowerCase().replace(/[^a-z]/g, "")) })), [room.text, find]);
  const totalTargets = tokens.filter((x) => x.target).length;
  const [found, setFound] = useState([]);
  const [wrongs, setWrongs] = useState(0);
  const [wrongIdx, setWrongIdx] = useState(-1);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const done = found.length >= totalTargets;
  const fs = tabletFont(tokens.length);
  function tap(i) {
    if (found.includes(i)) return;
    if (tokens[i].target) { setFound([...found, i]); setWrongIdx(-1); setFb({ ok: true, text: `Yes: ${tokens[i].t.replace(/[^A-Za-z]/g, "")}.` }); }
    else { setWrongs((n) => n + 1); setWrongIdx(i); setFb({ ok: false, text: `Look again: that word doesn't have ${room.code.spellings.join(" or ")}.` }); }
  }
  return (
    <>
      <At {...TAB}>
        <div style={{ height: "100%", overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ ...S.eyebrow, color: "#8a5a00" }}>{room.title}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 4px" }}>
            {tokens.map((x, i) => {
              const on = found.includes(i);
              return (
                <button key={i} type="button" onClick={() => tap(i)}
                  style={{ font: `700 ${fs}px/1.45 Inter, sans-serif`, padding: "0 5px", borderRadius: 9, cursor: "pointer", ...(on ? { background: "#c9f5fa", color: "#06606d", border: `2px solid ${C.teal}` } : wrongIdx === i ? { background: "#ffe6d8", color: "#9a3412", border: "2px solid #f0a274" } : { background: "transparent", color: "#2b2418", border: "2px solid transparent" }) }}>{x.t}</button>
              );
            })}
          </div>
        </div>
      </At>
      <Panel box={{ x: 1210, y: 190, w: 360, h: 420 }}>
        <h2 style={{ ...S.h2, fontSize: 24 }}>Read the log. Then find every word with {room.code.spellings.join(" or ")}.</h2>
        <Count n={found.length} of={totalTargets} label={`of ${totalTargets} found`} />
        <div style={{ height: 14, borderRadius: 999, background: "#dcebf5", overflow: "hidden" }}><div style={{ height: "100%", width: `${totalTargets ? Math.round((found.length / totalTargets) * 100) : 100}%`, background: "linear-gradient(90deg, #2fd3e0, #1c6fd6)" }} /></div>
        <div style={S.fb(fb.ok)}>{fb.text}</div>
      </Panel>
      <At x={420} y={705} w={760} h={90}>
        <div style={{ height: "100%", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
          <button type="button" style={{ ...S.hear, minHeight: 66, fontSize: 21 }} onClick={() => speak(room.text)}><SpeakerIcon /> Read it to me</button>
          {done && <button type="button" style={{ ...S.primary, minHeight: 66 }} onClick={() => onDone({ correct: totalTargets, total: totalTargets + wrongs })}>Continue →</button>}
        </div>
      </At>
    </>
  );
}

// ---------- Reread (fluency) ----------
// Yesterday's log again, with one goal. Tap a sentence to hear it, read it
// out loud, and (if the device allows) record and play yourself back. The
// recording stays on the device; nothing is uploaded or scored.
const GOALS = {
  accurate: { name: "Read every word right", tip: "Tap any sentence to hear it first. Then read the whole log out loud, carefully." },
  smooth: { name: "Read it smoothly", tip: "Read it like you're talking, not like a robot. Pause at the periods." },
  expression: { name: "Read it with expression", tip: "Read it like a crew member telling the story. Make your voice match what's happening." },
};
export function RereadRoom({ room, onDone }) {
  const goal = GOALS[room.goal] || GOALS.smooth;
  const sentences = useMemo(() => room.text.match(/[^.!?]+[.!?]+["”]?|[^.!?]+$/g) || [room.text], [room.text]);
  const [heard, setHeard] = useState(-1);
  const [readAloud, setReadAloud] = useState(false);
  const [rec, setRec] = useState(null);
  const [url, setUrl] = useState(null);
  const [micErr, setMicErr] = useState("");
  const chunks = React.useRef([]);
  const [canRecord, setCanRecord] = useState(false);
  useEffect(() => { setCanRecord(!!(navigator.mediaDevices && window.MediaRecorder)); }, []);
  const fs = tabletFont(room.text.split(/\s+/).length);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  async function startRec() {
    setMicErr("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.current.push(e.data); };
      mr.onstop = () => { const b = new Blob(chunks.current, { type: mr.mimeType || "audio/webm" }); setUrl(URL.createObjectURL(b)); stream.getTracks().forEach((t) => t.stop()); };
      mr.start(); setRec(mr);
    } catch (e) { setMicErr("The microphone isn't available. Read it out loud anyway."); }
  }
  function stopRec() { if (rec) rec.stop(); setRec(null); setReadAloud(true); }
  const rate = (self) => onDone({ correct: 0, total: 0, reread: { goal: room.goal, self } });
  return (
    <>
      <At {...TAB}>
        <div style={{ height: "100%", overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ ...S.eyebrow, color: "#8a5a00" }}>Reread · {room.title}</div>
          <div style={{ font: `700 ${fs}px/1.55 Inter, sans-serif`, color: "#2b2418" }}>
            {sentences.map((t, i) => (
              <span key={i} role="button" tabIndex={0} onClick={() => { setHeard(i); speak(t.trim()); }} onKeyDown={(e) => { if (e.key === "Enter") { setHeard(i); speak(t.trim()); } }}
                style={{ cursor: "pointer", borderRadius: 8, padding: "1px 2px", background: heard === i ? "rgba(120,214,255,0.45)" : "transparent" }}>{t} </span>
            ))}
          </div>
        </div>
      </At>
      <Panel box={{ x: 1210, y: 190, w: 360, h: 470 }}>
        <div style={S.eyebrow}>Today&apos;s goal</div>
        <h2 style={{ ...S.h2, fontSize: 25, marginTop: 0 }}>{goal.name}</h2>
        <p style={{ ...S.p, fontSize: 17, marginTop: 0 }}>{goal.tip}</p>
        {!readAloud ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            {canRecord && !rec && <button type="button" style={{ ...S.secondary, borderColor: "#f08a6c" }} onClick={startRec}>● Record myself</button>}
            {rec && <button type="button" style={{ ...S.secondary, background: "#ffece4", borderColor: "#f08a6c" }} onClick={stopRec}>■ Stop recording</button>}
            {!rec && <button type="button" style={S.primary} onClick={() => setReadAloud(true)}>I read it out loud</button>}
            {micErr && <div style={{ ...S.fb(false), fontSize: 15 }}>{micErr}</div>}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            {url && <button type="button" style={S.hear} onClick={() => new Audio(url).play()}><SpeakerIcon /> Hear myself</button>}
            <div style={{ font: "800 19px Poppins, sans-serif", color: C.navy }}>How did it go?</div>
            {[["smooth", "Smooth"], ["bumps", "A few bumps"], ["tricky", "Tricky"]].map(([k, label]) => <button key={k} type="button" style={S.secondary} onClick={() => rate(k)}>{label}</button>)}
          </div>
        )}
      </Panel>
      <At x={420} y={705} w={760} h={90}>
        <div style={{ height: "100%", display: "flex", gap: 18, alignItems: "center", justifyContent: "center" }}>
          <button type="button" style={{ ...S.hear, minHeight: 66, fontSize: 21 }} onClick={() => speak(room.text)}><SpeakerIcon /> Hear S.A.M. read it</button>
          <div style={{ font: "700 17px Inter, sans-serif", color: C.navy, background: "rgba(255,255,255,0.85)", padding: "8px 14px", borderRadius: 12 }}>Tap a sentence to hear just that part.</div>
        </div>
      </At>
    </>
  );
}

// ---------- Class words ----------
export function ClassRoom({ room, onDone }) {
  const [heard, setHeard] = useState([]);
  const done = heard.length >= room.words.length;
  return (
    <Panel eyebrow="Class words · from this week's class work" title="Get ready for your class's big words" sub="Tap each chunk to hear it, then hear the whole word.">
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(3, room.words.length)}, minmax(0, 1fr))`, gap: 18, flex: 1, alignContent: "center" }}>
        {room.words.map((w) => {
          const on = heard.includes(w.word);
          return (
            <div key={w.word} style={{ borderRadius: 22, padding: 20, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center", background: "#ffffff", border: `3px solid ${on ? C.teal : "#9fd6f2"}`, boxShadow: on ? "0 0 0 4px rgba(20,184,200,0.25)" : "0 6px 14px rgba(15,35,80,0.12)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {w.chunks.map((ck, i) => <button key={i} type="button" onClick={() => speak(ck)} style={{ minWidth: 56, minHeight: 62, padding: "0 12px", border: "3px solid #e3c27a", borderRadius: 14, background: "#fffaf0", color: C.navy, font: "800 30px Poppins, sans-serif", cursor: "pointer" }}>{ck}</button>)}
              </div>
              <button type="button" style={{ ...S.hear, justifyContent: "center", fontSize: 20 }} onClick={() => { speak([...w.chunks, w.word]); if (!on) setHeard([...heard, w.word]); }}><SpeakerIcon /> {w.word}</button>
              {w.meaning && <div style={{ fontSize: 17, color: C.soft, textAlign: "center" }}>{w.meaning}</div>}
              {on && <div style={{ fontSize: 15, fontWeight: 800, color: C.tealText, textAlign: "center" }}>Ready for class</div>}
            </div>
          );
        })}
      </div>
      {done && <button type="button" style={{ ...S.primary, alignSelf: "center", minWidth: 260 }} onClick={() => onDone({ correct: 0, total: 0 })}>Continue →</button>}
    </Panel>
  );
}

// ---------- The vault (mastery check) ----------
// Four stone seals in the vault scene (centers about x 421, 680, 923, 1177;
// y 368). Each seal stands for a quarter of the 15 items and lights up as
// the student works through them. The console sits at about x 258-1340,
// y 541-823.
const SEALS = [421, 680, 923, 1177];
export function VaultRoom({ items, onDone, relic, pieces = 0 }) {
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const item = items[i];
  useEffect(() => { if (i >= items.length) onDone({ correct, total: items.length }); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps
  const per = Math.ceil(items.length / 4);
  const sealAt = Math.min(3, Math.floor(i / per));
  const next = (ok) => { if (ok) setCorrect((n) => n + 1); setI((n) => n + 1); };
  return (
    <>
      {SEALS.map((x, k) => {
        const lit = k < sealAt || i >= items.length;
        const now = k === sealAt && i < items.length;
        return (
          <React.Fragment key={k}>
            <At x={x - 34} y={250} w={68} h={48}>
              <div style={{ height: "100%", borderRadius: 10, background: "rgba(40,48,64,0.85)", border: "2px solid rgba(255,255,255,0.6)", color: "#fff", font: "800 28px Poppins, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>{k + 1}</div>
            </At>
            {(lit || now) && <At x={x - 92} y={280} w={184} h={184} style={{ pointerEvents: "none" }}><div style={{ width: "100%", height: "100%", borderRadius: "50%", boxSizing: "border-box", border: lit ? "7px solid #ffd24a" : "6px solid #5fe6ff", background: lit ? "radial-gradient(circle, rgba(255,214,90,0.6), rgba(255,190,60,0.25) 65%)" : "radial-gradient(circle, rgba(120,230,255,0.25), transparent 70%)", boxShadow: lit ? "0 0 36px 8px rgba(255,200,60,0.85), inset 0 0 20px rgba(255,220,120,0.8)" : "0 0 30px 6px rgba(80,220,255,0.75)" }} /></At>}
          </React.Fragment>
        );
      })}
      {relic && (
        <At x={1350} y={170} w={225} h={300}>
          <div style={{ height: "100%", borderRadius: 22, background: "linear-gradient(180deg, #13254a, #0b1838)", border: "3px solid rgba(120,214,255,0.85)", boxShadow: "0 0 22px rgba(80,200,255,0.5)", padding: 16, boxSizing: "border-box", color: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ font: "800 20px/1.2 Poppins, sans-serif" }}>{relic.name}</div>
            <div style={{ font: "600 14px Inter, sans-serif", color: "#a9c4e8" }}>{pieces} of 4 relic pieces found. Crack the vault to finish it.</div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[0, 1, 2, 3].map((k) => <div key={k} style={{ borderRadius: 10, border: "2px solid rgba(120,214,255,0.5)", background: k < pieces ? "linear-gradient(135deg, #ffd765, #d99a14)" : "rgba(255,255,255,0.08)", boxShadow: k < pieces ? "0 0 12px rgba(255,200,60,0.7)" : "none" }} />)}
            </div>
          </div>
        </At>
      )}
      {item && (
        <At x={290} y={530} w={1020} h={330}>
          <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
            <div style={{ textAlign: "center", font: "700 16px Inter, sans-serif", color: C.muted }}>Seal {sealAt + 1} · item {i + 1} of {items.length}</div>
            {item.kind === "spell"
              ? <SpellItem key={i} item={item} mode="check" onDone={next} prompt="Hear the password, then build it." compact />
              : <VaultPick key={i} item={item} onDone={next} />}
          </div>
        </At>
      )}
    </>
  );
}
// Compact one-row pick for the vault console.
function VaultPick({ item, onDone }) {
  return <PickItem item={item} mode="check" onDone={onDone} prompt={item.alien ? "An alien word! Listen, then tap how it's spelled." : "Listen, then tap the word you heard."} compact />;
}

export { BigHear };
