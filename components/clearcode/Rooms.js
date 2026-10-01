"use client";
import React, { useEffect, useMemo, useState } from "react";
import { S, C, speak, SpeakerIcon, HearButton } from "./ui";
import { PickItem, SpellItem } from "./Items";

// Every room calls onDone({ correct, total }) when finished. correct counts
// first-try answers; total is the number of items. The chamber adds them up
// for the teacher's report. Rooms never reward a wrong answer.

function Frame({ eyebrow, title, sub, right, children }) {
  return (
    <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={S.eyebrow}>{eyebrow}</div>
          <h2 style={S.h2}>{title}</h2>
          {sub && <p style={S.p}>{sub}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}
function Done({ text, label = "Continue", onClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <p style={{ ...S.p, margin: 0, fontSize: 17 }}>{text}</p>
      <button type="button" style={S.primary} onClick={onClick}>{label}</button>
    </div>
  );
}
function useSeq(items) {
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const next = (ok) => { if (ok) setCorrect((n) => n + 1); setI((n) => n + 1); };
  return { i, item: items[i], done: i >= items.length, correct, next };
}

// ---------- Warm-up ----------
export function WarmRoom({ room, onDone }) {
  const seq = useSeq(room.items);
  return (
    <Frame eyebrow="Warm-up · codes you already cracked" title="Hear it, then tap it."
      right={<div style={{ font: "800 26px Poppins, sans-serif", color: C.tealText }}>{seq.correct} <span style={{ fontSize: 14, color: C.muted }}>of {room.items.length}</span></div>}>
      {!seq.done
        ? <><div style={{ fontSize: 14, color: C.muted }}>Word {seq.i + 1} of {room.items.length}</div><PickItem key={seq.i} item={seq.item} mode="quick" onDone={seq.next} /></>
        : <Done text={`${seq.correct} of ${room.items.length}. Warmed up.`} label="Open the codex" onClick={() => onDone({ correct: seq.correct, total: room.items.length })} />}
    </Frame>
  );
}

// ---------- Codex ----------
export function CodexRoom({ room, onDone }) {
  const [heard, setHeard] = useState([]);
  const [phase, setPhase] = useState(room.full ? "learn" : "refresh");
  const seq = useSeq(room.checks);
  const allHeard = heard.length >= room.cards.length;
  const codeChips = room.code.spellings.map((sp) => <span key={sp} style={{ padding: "8px 16px", borderRadius: 12, background: C.panel2, border: "1px solid #4a52a8", font: "700 26px Inter, sans-serif", color: C.tealText }}>{sp}</span>);
  return (
    <Frame eyebrow={`Codex · ${room.full ? "new code" : "code refresh"}: ${room.code.label}`} title={room.code.rule.charAt(0).toUpperCase() + room.code.rule.slice(1)}
      right={<div style={{ display: "flex", gap: 10 }}>{codeChips}</div>}>
      {(phase === "learn" || phase === "refresh") && (
        <>
          <p style={{ ...S.p, marginTop: 0 }}>{phase === "learn" ? "Tap each word to hear it. The glowing chunk is the code." : "Quick refresh: tap any word to hear it again."}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
            {room.cards.map((cd) => {
              const on = heard.includes(cd.w);
              return (
                <button key={cd.w} type="button" aria-label={`Hear ${cd.w}`} onClick={() => { speak(cd.w); if (!on) setHeard([...heard, cd.w]); }}
                  style={{ minHeight: 92, borderRadius: 16, cursor: "pointer", font: "600 38px Inter, sans-serif", color: "#eef0ff", background: on ? C.panel2 : "#161b4a", border: `1px solid ${on ? C.teal : C.line2}` }}>
                  {cd.parts.map((p, i) => <span key={i} style={i === cd.hi ? { color: C.tealText, textShadow: "0 0 14px rgba(47,212,200,0.6)" } : undefined}>{p}</span>)}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {(phase === "refresh" || allHeard)
              ? <button type="button" style={S.primary} onClick={() => setPhase("check")}>{phase === "learn" ? "I've got it. Test me." : "Ready"}</button>
              : <span style={{ fontSize: 14, color: C.muted }}>{room.cards.length - heard.length} more to hear</span>}
          </div>
        </>
      )}
      {phase === "check" && !seq.done && (
        <><div style={{ fontSize: 14, color: C.muted }}>Quick check {seq.i + 1} of {room.checks.length}</div><PickItem key={seq.i} item={seq.item} onDone={seq.next} /></>
      )}
      {phase === "check" && seq.done && <Done text={`Code logged: ${room.code.spellings.join(" and ")}.`} onClick={() => onDone({ correct: seq.correct, total: room.checks.length })} />}
    </Frame>
  );
}

// ---------- Glyph wall ----------
export function WallRoom({ room, onDone }) {
  const [wi, setWi] = useState(0);
  const [cuts, setCuts] = useState([]);
  const [ok, setOk] = useState(false);
  const [misses, setMisses] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const word = room.words[wi];
  const sounds = room.mode === "sounds";
  if (!word) return <Frame eyebrow="Glyph wall" title="Wall cleared."><Done text="Every chunk is cut." onClick={() => onDone({ correct, total: room.words.length })} /></Frame>;
  const letters = word.w.split("");
  const parts = [];
  let last = 0;
  [...word.cuts].sort((a, b) => a - b).forEach((k) => { parts.push(word.w.slice(last, k)); last = k; });
  parts.push(word.w.slice(last));
  function fire() {
    const a = [...cuts].sort((x, y) => x - y).join(",");
    if (!cuts.length) { setFb({ ok: false, text: "Tap a gap to aim the laser first." }); return; }
    if (a === [...word.cuts].sort((x, y) => x - y).join(",")) {
      setOk(true); setFb({ ok: true, text: "" });
      if (misses === 0) setCorrect((n) => n + 1);
      speak(sounds ? [...parts, word.w] : [...parts, word.w]);
    } else {
      const m = misses + 1; setMisses(m); setCuts([]);
      setFb({ ok: false, text: m >= 2 ? (sounds ? `Say it slowly: ${parts.join(" · ")}. One cut between each sound.` : `Find the vowel sounds first. This word has ${parts.length} chunks.`) : "The wall flickers. Check that every chunk has one vowel sound." });
    }
  }
  return (
    <Frame eyebrow={`Glyph wall · word ${wi + 1} of ${room.words.length}`} title={sounds ? "Cut the word into its sounds" : "Cut the word into its chunks"}
      sub={sounds ? "Tap the gaps between the sounds." : "Tap the gaps where the laser should cut. Every chunk needs one vowel sound."}
      right={<HearButton words={word.w} label="Hear the word" />}>
      <div style={{ minHeight: 190, borderRadius: 16, background: "repeating-linear-gradient(0deg, #1b2050 0px, #1b2050 38px, #20265c 38px, #20265c 40px)", border: "1px solid #333a80", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", padding: 12 }}>
        {letters.map((ch, i) => (
          <React.Fragment key={i}>
            <span style={{ font: "700 76px Poppins, sans-serif", color: ok ? C.tealText : "#d7dbff", padding: "0 2px" }}>{ch}</span>
            {i < letters.length - 1 && (
              <button type="button" aria-label={`Cut between ${ch} and ${letters[i + 1]}`} disabled={ok}
                onClick={() => setCuts(cuts.includes(i + 1) ? cuts.filter((x) => x !== i + 1) : [...cuts, i + 1])}
                style={{ width: 16, height: 96, margin: "0 3px", borderRadius: 6, cursor: "pointer", ...(cuts.includes(i + 1) ? { border: 0, background: C.teal, boxShadow: `0 0 18px ${C.teal}` } : { border: "1px dashed #4a52a8", background: "rgba(123,93,255,0.08)" }) }} />
            )}
          </React.Fragment>
        ))}
      </div>
      {ok ? (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ font: "700 26px Poppins, sans-serif", color: C.tealText }}>{parts.join("  ·  ")}  =  {word.w}</div>
          <button type="button" style={S.secondary} onClick={() => speak([...parts, word.w])}>Hear the chunks, then the word</button>
          <button type="button" style={{ ...S.primary, marginLeft: "auto" }} onClick={() => { setWi(wi + 1); setCuts([]); setOk(false); setMisses(0); setFb({ ok: true, text: "" }); }}>Next</button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <button type="button" style={S.primary} onClick={fire}>Fire the laser</button>
          <button type="button" style={S.secondary} onClick={() => setCuts([])}>Clear cuts</button>
          <div style={S.fb(fb.ok)}>{fb.text}</div>
        </div>
      )}
    </Frame>
  );
}

// ---------- Sorting vault ----------
export function SortRoom({ room, onDone }) {
  const [queue, setQueue] = useState(room.items.map((_, i) => i));
  const [missed, setMissed] = useState([]);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const item = queue.length ? room.items[queue[0]] : null;
  function send(yes) {
    if (!item) return;
    if (item.yes === yes) { setQueue(queue.slice(1)); setFb({ ok: true, text: `Sorted: ${item.w}.` }); }
    else {
      setMissed((m) => (m.includes(queue[0]) ? m : [...m, queue[0]]));
      setQueue([...queue.slice(1), queue[0]]);
      setFb({ ok: false, text: `${item.w}: read it again. It will come back around.` });
      speak(item.w);
    }
  }
  const vaultBtn = (yes) => (
    <button type="button" onClick={() => send(yes)} disabled={!item}
      style={{ height: 230, borderRadius: 22, border: `2px solid ${yes ? C.teal : C.gold}`, background: yes ? "linear-gradient(180deg, #17345a, #121a44)" : "linear-gradient(180deg, #3a3018, #1d1a3a)", color: "#eef0ff", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <span style={{ font: "800 24px Poppins, sans-serif", color: yes ? C.tealText : C.gold }}>{yes ? room.sort.yes : room.sort.no}</span>
      <span style={{ fontSize: 15, color: C.soft }}>{yes ? room.sort.yesHint : room.sort.noHint}</span>
    </button>
  );
  return (
    <Frame eyebrow={`Sorting vault · ${queue.length} relics left`} title="Read the word on each relic. Which vault?" right={item ? <HearButton words={item.w} /> : null}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20, alignItems: "center" }}>
        {vaultBtn(true)}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          {item
            ? <div style={{ width: 230, height: 160, borderRadius: 26, background: "radial-gradient(circle at 50% 30%, #3a438f, #1d2358 75%)", border: "1px solid #5a63c0", display: "flex", alignItems: "center", justifyContent: "center", font: "700 46px Inter, sans-serif", color: "#fff" }}>{item.w}</div>
            : <button type="button" style={S.primary} onClick={() => onDone({ correct: room.items.length - missed.length, total: room.items.length })}>Vault sealed. Continue</button>}
          <div style={{ ...S.fb(fb.ok), textAlign: "center" }}>{fb.text}</div>
        </div>
        {vaultBtn(false)}
      </div>
    </Frame>
  );
}

// ---------- Sealed door (spelling) ----------
export function DoorRoom({ room, onDone }) {
  const seq = useSeq(room.words);
  return (
    <Frame eyebrow={`Sealed door · password ${Math.min(seq.i + 1, room.words.length)} of ${room.words.length}`} title={seq.done ? "The door is open." : "Hear the password, then build it."}>
      {!seq.done
        ? <SpellItem key={seq.i} item={seq.item} onDone={seq.next} prompt="Build the password chip by chip." />
        : <Done text="You read it, cut it, and now you can spell it." onClick={() => onDone({ correct: seq.correct, total: room.words.length })} />}
    </Frame>
  );
}

// ---------- Forge (word parts) ----------
const KIND = {
  pre: { border: `1px solid ${C.teal}`, color: C.tealText, background: "rgba(47,212,200,0.10)" },
  base: { border: `1px solid ${C.gold}`, color: "#ffe08a", background: "rgba(245,200,75,0.10)" },
  suf: { border: "1px solid #ff9f8a", color: "#ffc2b5", background: "rgba(255,159,138,0.10)" },
};
export function ForgeRoom({ room, onDone }) {
  const [fi, setFi] = useState(0);
  const [forged, setForged] = useState([]);
  const [ok, setOk] = useState(false);
  const [misses, setMisses] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const item = room.items[fi];
  if (!item) return <Frame eyebrow="The forge" title="Every key is forged."><Done text="Word parts snap together like key pieces." onClick={() => onDone({ correct, total: room.items.length })} /></Frame>;
  function forge() {
    const made = forged.map((c) => c.t).join("");
    if (!made) { setFb({ ok: false, text: "Load some parts first." }); return; }
    if (made === item.w) { setOk(true); if (misses === 0) setCorrect((n) => n + 1); speak(item.w); setFb({ ok: true, text: "" }); return; }
    const m = misses + 1; setMisses(m); setForged([]);
    setFb({ ok: false, text: m >= 2 ? `Start with the base word, then add the parts: ${item.parts.join(" + ")}.` : `The forge sparks: that makes "${made}". Check the meaning again.` });
  }
  return (
    <Frame eyebrow={`The forge · key ${fi + 1} of ${room.items.length}`} title={`Forge the word that means: ${item.clue}`}
      sub="Snap the parts together in order: front part, base word, ending." right={<HearButton words={item.w} label="Hear the word" />}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 100, borderRadius: 18, background: "#10143a", border: "1px dashed #4a52a8" }}>
        {forged.length ? forged.map((c, i) => <div key={i} style={{ minWidth: 70, minHeight: 60, padding: "0 16px", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", font: "700 28px Inter, sans-serif", ...KIND[c.k] }}>{c.t}</div>)
          : <div style={{ fontSize: 15, color: "#6f73a8" }}>Tap parts below to load the forge</div>}
      </div>
      {ok ? (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 17, color: C.soft }}>{item.explain}</div>
          <button type="button" style={{ ...S.primary, marginLeft: "auto" }} onClick={() => { setFi(fi + 1); setForged([]); setOk(false); setMisses(0); setFb({ ok: true, text: "" }); }}>Next key</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {room.chips.map((c) => <button key={c.t} type="button" style={{ minWidth: 60, minHeight: 54, padding: "0 16px", borderRadius: 12, cursor: "pointer", font: "600 23px Inter, sans-serif", ...KIND[c.k] }} onClick={() => forged.length < 4 && setForged([...forged, c])}>{c.t}</button>)}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button type="button" style={S.primary} onClick={forge}>Forge it</button>
            <button type="button" style={S.secondary} onClick={() => setForged([])}>Clear</button>
            <div style={S.fb(fb.ok)}>{fb.text}</div>
          </div>
        </>
      )}
    </Frame>
  );
}

// ---------- Word chains ----------
export function ChainRoom({ room, onDone }) {
  const seq = useSeq(room.steps);
  const current = seq.done ? room.steps[room.steps.length - 1].answer : room.steps[seq.i].from;
  return (
    <Frame eyebrow={`Word chain · plank ${Math.min(seq.i + 1, room.steps.length)} of ${room.steps.length}`} title="Change one sound to lay the next plank."
      right={<div style={{ font: "700 36px Inter, sans-serif", color: C.tealText }}>{current}</div>}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[room.start, ...room.steps.slice(0, seq.i).map((s) => s.answer)].map((w, i) => <span key={i} style={{ padding: "6px 14px", borderRadius: 10, background: C.panel2, border: `1px solid ${C.teal}`, color: C.tealText, font: "600 20px Inter, sans-serif" }}>{w}</span>)}
      </div>
      {!seq.done
        ? <PickItem key={seq.i} item={seq.item} onDone={seq.next} prompt={`From ${seq.item.from}: listen, then tap the new word.`} />
        : <Done text="The bridge is built." onClick={() => onDone({ correct: seq.correct, total: room.steps.length })} />}
    </Frame>
  );
}

// ---------- Inscription ----------
export function ReadRoom({ room, onDone }) {
  const find = useMemo(() => new RegExp(room.find, "i"), [room.find]);
  const tokens = useMemo(() => room.text.split(/\s+/).map((t) => ({ t, target: find.test(t.toLowerCase().replace(/[^a-z]/g, "")) })), [room.text, find]);
  const totalTargets = tokens.filter((x) => x.target).length;
  const [found, setFound] = useState([]);
  const [wrongs, setWrongs] = useState(0);
  const [wrongIdx, setWrongIdx] = useState(-1);
  const [fb, setFb] = useState({ ok: true, text: "" });
  const done = found.length >= totalTargets;
  function tap(i) {
    if (found.includes(i)) return;
    if (tokens[i].target) { setFound([...found, i]); setWrongIdx(-1); setFb({ ok: true, text: `Yes: ${tokens[i].t.replace(/[^A-Za-z]/g, "")}.` }); }
    else { setWrongs((n) => n + 1); setWrongIdx(i); setFb({ ok: false, text: `Look again: that word doesn't have the ${room.code.label} code.` }); }
  }
  return (
    <section style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
      <div style={{ ...S.panel, background: "linear-gradient(160deg, #22285f, #171b47)", border: "1px solid #3a4190", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={S.eyebrow}>Inscription · {room.title}</div>
          <button type="button" style={S.hear} onClick={() => speak(room.text)}><SpeakerIcon /> Read it to me</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 6px" }}>
          {tokens.map((x, i) => {
            const on = found.includes(i);
            return (
              <button key={i} type="button" onClick={() => tap(i)}
                style={{ font: "500 24px/1.5 Inter, sans-serif", padding: "1px 7px", borderRadius: 8, cursor: "pointer", ...(on ? { background: "rgba(47,212,200,0.2)", color: "#9ff5ec", border: `1px solid ${C.teal}` } : wrongIdx === i ? { background: "rgba(255,178,122,0.1)", color: "#ffd0ad", border: `1px solid ${C.warn}` } : { background: "transparent", color: "#eef0ff", border: "1px solid transparent" }) }}>{x.t}</button>
            );
          })}
        </div>
      </div>
      <div style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 14 }}>
        <h2 style={{ ...S.h2, fontSize: 21 }}>Read the log. Then find every word with the {room.code.label} code.</h2>
        <div style={{ font: "800 38px Poppins, sans-serif", color: C.tealText }}>{found.length} <span style={{ fontSize: 17, color: C.muted }}>of {totalTargets} found</span></div>
        <div style={{ height: 10, borderRadius: 999, background: "#262c68", overflow: "hidden" }}><div style={{ height: "100%", width: `${totalTargets ? Math.round((found.length / totalTargets) * 100) : 100}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.teal})` }} /></div>
        <div style={S.fb(fb.ok)}>{fb.text}</div>
        {done && <button type="button" style={{ ...S.primary, marginTop: "auto" }} onClick={() => onDone({ correct: totalTargets, total: totalTargets + wrongs })}>Continue</button>}
      </div>
    </section>
  );
}

// ---------- Class words ----------
export function ClassRoom({ room, onDone }) {
  const [heard, setHeard] = useState([]);
  const done = heard.length >= room.words.length;
  return (
    <Frame eyebrow="Class words · from this week's class work" title="Get ready for your class's big words" sub="Tap each chunk to hear it, then hear the whole word.">
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(3, room.words.length)}, minmax(0, 1fr))`, gap: 16 }}>
        {room.words.map((w) => {
          const on = heard.includes(w.word);
          return (
            <div key={w.word} style={{ borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center", background: on ? "#1a2a5a" : "#161b4a", border: `1px solid ${on ? C.teal : C.line2}` }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {w.chunks.map((ck, i) => <button key={i} type="button" onClick={() => speak(ck)} style={{ minWidth: 46, minHeight: 50, padding: "0 10px", border: "1px solid #4a52a8", borderRadius: 10, background: C.panel2, color: "#eef0ff", font: "600 22px Inter, sans-serif", cursor: "pointer" }}>{ck}</button>)}
              </div>
              <button type="button" style={{ ...S.hear, justifyContent: "center" }} onClick={() => { speak([...w.chunks, w.word]); if (!on) setHeard([...heard, w.word]); }}><SpeakerIcon /> {w.word}</button>
              {w.meaning && <div style={{ fontSize: 14, color: C.soft, textAlign: "center" }}>{w.meaning}</div>}
              {on && <div style={{ fontSize: 13, fontWeight: 700, color: C.tealText, textAlign: "center" }}>Ready for class</div>}
            </div>
          );
        })}
      </div>
      {done && <button type="button" style={{ ...S.primary, alignSelf: "flex-start" }} onClick={() => onDone({ correct: 0, total: 0 })}>Continue</button>}
    </Frame>
  );
}

// ---------- The vault (mastery check) ----------
export function VaultRoom({ items, onDone }) {
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const item = items[i];
  useEffect(() => { if (i >= items.length) onDone({ correct, total: items.length }); }, [i]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return <section style={S.panel}><p style={S.p}>Checking the vault…</p></section>;
  const next = (ok) => { if (ok) setCorrect((n) => n + 1); setI((n) => n + 1); };
  return (
    <Frame eyebrow={`The vault · seal ${i + 1} of ${items.length}`} title="Crack the vault seals." sub="One try per seal. Take your time.">
      <div style={{ height: 8, borderRadius: 999, background: "#262c68", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.round((i / items.length) * 100)}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.teal})` }} /></div>
      {item.kind === "spell"
        ? <SpellItem key={i} item={item} mode="check" onDone={next} />
        : <PickItem key={i} item={item} mode="check" onDone={next} />}
    </Frame>
  );
}
