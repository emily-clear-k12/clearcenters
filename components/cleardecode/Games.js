"use client";
import React, { useEffect, useRef, useState } from "react";
import { S, C } from "./ui";

// Bonus games (45 seconds). Only the ruin's own words count; a wrong tap or
// gate never triggers anything fun. Bonus crystals are capped at 3 (score / 6).
const SECONDS = 45;
const H = 440;
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];

export function GameRoom({ room, onDone }) {
  const [kind, setKind] = useState(null);
  const [over, setOver] = useState(null);
  const [, force] = useState(0);
  const g = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => timer.current && clearInterval(timer.current), []);

  function start(k) {
    if (timer.current) clearInterval(timer.current);
    g.current = { kind: k, t: 0, last: Date.now(), next: 0, id: 0, rows: [], lane: 1, speed: 0.3, cleared: 0, stones: [], hits: 0, missed: 0, msg: k === "runner" ? "Tap a gate to steer into its lane." : `Tap the ${room.code.label} words before they hit the shield.`, msgOk: true, msgUntil: 2.5 };
    setKind(k); setOver(null);
    timer.current = setInterval(tick, 50);
  }
  function say(m, ok) { const s = g.current; s.msg = m; s.msgOk = ok; s.msgUntil = s.t + 2; }
  function tick() {
    const s = g.current;
    if (!s) return;
    const now = Date.now();
    const dt = Math.min(0.1, (now - s.last) / 1000);
    s.last = now; s.t += dt;
    if (s.kind === "runner") {
      s.speed = Math.min(0.55, s.speed + dt * 0.004);
      s.rows.forEach((r) => {
        r.y += dt * s.speed;
        if (!r.res && r.y >= 0.84) {
          if (s.lane === r.target) { r.res = "hit"; s.cleared += 1; s.speed = Math.min(0.6, s.speed + 0.02); say(`Boost! ${r.words[r.target]} has the code.`, true); }
          else { r.res = "miss"; s.speed = Math.max(0.28, s.speed - 0.06); say(`Slowed down. The code word was ${r.words[r.target]}.`, false); }
        }
      });
      s.rows = s.rows.filter((r) => r.y < 1.12);
      s.next -= dt;
      if (s.next <= 0 && s.t < SECONDS - 2) {
        const target = Math.floor(Math.random() * 3);
        const decoys = [...room.decoys];
        const words = [0, 1, 2].map((i) => (i === target ? pickOne(room.targets) : decoys.splice(Math.floor(Math.random() * decoys.length), 1)[0] || pickOne(room.decoys)));
        s.rows.push({ id: ++s.id, y: 0, words, target, res: "" });
        s.next = Math.max(1.35, 2.1 - s.t * 0.015);
      }
    } else {
      s.stones = s.stones.filter((st) => {
        if (st.state === "hit") return s.t - st.at < 0.35;
        st.y += dt * st.v;
        if (st.state === "wrong" && s.t - st.at > 0.6) st.state = "";
        if (st.y >= 0.9) { if (st.target) { s.missed += 1; say(`${st.word} got through. It had the code.`, false); } return false; }
        return true;
      });
      s.next -= dt;
      if (s.next <= 0 && s.t < SECONDS - 2) {
        const isT = Math.random() < 0.55;
        s.stones.push({ id: ++s.id, x: 0.04 + Math.random() * 0.8, y: 0, v: 0.16 + Math.min(0.12, s.t * 0.003) + Math.random() * 0.05, word: isT ? pickOne(room.targets) : pickOne(room.decoys), target: isT, state: "", at: 0 });
        s.next = Math.max(0.7, 1.15 - s.t * 0.008);
      }
    }
    if (s.msg && s.t > s.msgUntil) s.msg = "";
    if (s.t >= SECONDS) {
      clearInterval(timer.current); timer.current = null;
      const score = s.kind === "runner" ? s.cleared : s.hits;
      setOver({ score, bonus: Math.min(3, Math.floor(score / 6)), missed: s.missed });
    }
    force((n) => n + 1);
  }

  const s = g.current;
  if (!kind) {
    return (
      <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <div style={S.eyebrow}>Bonus game · 45 seconds</div>
          <h2 style={S.h2}>Chamber cleared. Time to get out of the ruin.</h2>
          <p style={S.p}>Only words with today&apos;s code count: {room.code.spellings.join(", ")}.</p>
        </div>
        <button type="button" onClick={() => start(room.kind)} style={{ alignSelf: "flex-start", minHeight: 220, minWidth: 560, borderRadius: 20, border: `2px solid ${C.teal}`, background: "linear-gradient(160deg, #183a63, #141844)", color: "#eef0ff", cursor: "pointer", padding: 24, textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}>
          <span style={{ ...S.eyebrow, color: "#7ff0ff" }}>Today&apos;s game</span>
          <span style={{ font: "800 30px Poppins, sans-serif" }}>{room.kind === "runner" ? "Ruin Runner" : "Glyph Storm"}</span>
          <span style={{ fontSize: 18, color: "#cfe0ff" }}>{room.kind === "runner" ? "Race the rover out of the tunnel. Tap the gate with the code word to steer through it." : "Glyph stones are falling on the shield. Tap only the code words to blast them."}</span>
          <span style={{ alignSelf: "flex-start", marginTop: 6, padding: "10px 20px", borderRadius: 999, background: `linear-gradient(90deg, ${C.violet}, ${C.teal})`, font: "700 16px Poppins, sans-serif", color: "#fff" }}>Tap to start</span>
        </button>
      </section>
    );
  }
  if (over) {
    return (
      <section style={{ ...S.panel, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <div style={S.eyebrow}>{kind === "runner" ? "Ruin Runner" : "Glyph Storm"} · run complete</div>
        <div style={{ font: "800 42px Poppins, sans-serif" }}>{over.score} {kind === "runner" ? "gates cleared" : "glyphs blasted"}</div>
        <div style={{ font: "700 18px Poppins, sans-serif", color: C.gold }}>+{over.bonus} bonus crystals</div>
        <button type="button" style={S.primary} onClick={() => onDone({ bonus: over.bonus })}>Collect your reward</button>
      </section>
    );
  }
  return (
    <section style={{ ...S.panel, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ font: "800 20px Poppins, sans-serif" }}>{kind === "runner" ? "Ruin Runner" : "Glyph Storm"}</div>
        <div style={{ flexGrow: 1, height: 10, borderRadius: 999, background: "#dcebf5", overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.max(0, Math.round((1 - s.t / SECONDS) * 100))}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.teal})` }} /></div>
        <div style={{ font: "700 16px Poppins, sans-serif", color: C.tealText }}>{kind === "runner" ? `${s.cleared} gates` : `${s.hits} blasted`}</div>
      </div>
      <div style={{ ...S.fb(s.msgOk), minHeight: 22 }}>{s.msg}</div>
      {kind === "runner" ? (
        <div style={{ position: "relative", height: H, borderRadius: 18, overflow: "hidden", background: "linear-gradient(180deg, #05071a 0%, #141a4e 55%, #22306e 100%)", border: "1px solid #333a80" }}>
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}><div style={{ borderRight: "2px dashed rgba(127,240,230,0.18)" }} /><div style={{ borderRight: "2px dashed rgba(127,240,230,0.18)" }} /><div /></div>
          {s.rows.map((r) => (
            <div key={r.id} style={{ position: "absolute", left: 0, right: 0, top: Math.round(r.y * H - 70), display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", transform: `scale(${(0.6 + 0.4 * Math.min(1, r.y)).toFixed(3)})` }}>
              {r.words.map((w, i) => {
                const look = r.res === "hit" && i === r.target ? { background: "rgba(47,212,200,0.35)", border: "2px solid #7ff0e6", color: "#fff" }
                  : r.res === "miss" && i === r.target ? { background: "rgba(28,34,90,0.9)", border: `2px solid ${C.teal}`, color: "#9ff5ec" }
                  : i === s.lane && !r.res ? { background: "rgba(40,48,120,0.95)", border: "2px solid #9b8cff", color: "#fff" }
                  : { background: "rgba(28,34,90,0.9)", border: "2px solid #4a52a8", color: "#e8eaff" };
                return <button key={i} type="button" onClick={() => { s.lane = i; force((n) => n + 1); }} style={{ margin: "0 22px", height: 60, borderRadius: 14, cursor: "pointer", font: "700 26px Inter, sans-serif", ...look }}>{w}</button>;
              })}
            </div>
          ))}
          <div style={{ position: "absolute", bottom: 12, left: `calc(${(s.lane * 33.333 + 16.667).toFixed(3)}% - 48px)`, transition: "left 0.15s ease-out" }}>
            <svg width="96" height="70" viewBox="0 0 96 70" aria-hidden="true"><ellipse cx="48" cy="62" rx="38" ry="6" fill="rgba(47,212,200,0.35)" /><path d="M14 44c0-14 14-26 34-26s34 12 34 26v6H14z" fill="#3a4cb0" /><path d="M30 30c4-8 10-12 18-12s14 4 18 12z" fill="#7ff0e6" opacity="0.85" /><rect x="10" y="44" width="76" height="10" rx="5" fill="#2fd4c8" /></svg>
          </div>
        </div>
      ) : (
        <div style={{ position: "relative", height: H, borderRadius: 18, overflow: "hidden", background: "radial-gradient(ellipse at 50% 0%, #2a1f63 0%, #10133a 60%, #0b0e27 100%)", border: "1px solid #333a80" }}>
          {s.stones.map((st) => (
            <button key={st.id} type="button"
              onClick={() => { if (st.state === "hit") return; if (st.target) { st.state = "hit"; st.at = s.t; s.hits += 1; say(`Blasted: ${st.word}.`, true); } else { st.state = "wrong"; st.at = s.t; say(`${st.word} has no ${room.code.spellings.join(" or ")}. Let it fall.`, false); } force((n) => n + 1); }}
              style={{ position: "absolute", left: `${(st.x * 100).toFixed(1)}%`, top: Math.round(st.y * H - 30), width: 128, height: 56, borderRadius: "20px 20px 26px 26px", cursor: "pointer", font: "700 24px Inter, sans-serif", boxShadow: "0 8px 18px rgba(0,0,0,0.35)", ...(st.state === "hit" ? { background: "radial-gradient(circle, #7ff0e6, #2fd4c8)", color: "#0b0e27", transform: "scale(1.25)", opacity: 0.5, border: "2px solid #fff" } : st.state === "wrong" ? { background: "linear-gradient(180deg, #4a4f86, #2b2f5e)", color: "#ffd0ad", border: `2px solid ${C.warn}` } : { background: "linear-gradient(180deg, #5b62a8, #2e3474)", color: "#fff", border: "2px solid #8a90d8" }) }}>{st.word}</button>
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34, background: `linear-gradient(0deg, rgba(47,212,200,${Math.max(0.15, 0.75 - s.missed * 0.06).toFixed(2)}), rgba(47,212,200,0))`, borderTop: "2px solid rgba(127,240,230,0.6)" }} />
        </div>
      )}
    </section>
  );
}
