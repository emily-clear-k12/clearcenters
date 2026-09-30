"use client";
import React, { useState } from "react";
import Link from "next/link";

// Student ClearKeys door (Sept 29, 2026). Same space look as the typing screens.
const T = {
  bg: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 45%, #060B16 100%)",
  panel: "rgba(13, 27, 42, 0.92)",
  border: "rgba(143, 164, 255, 0.28)",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  green: "#39D97A",
  gold: "#FFC44D",
  violet: "#7B5DFF",
  teal: "#00C2C7",
};
const panel = { background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 20 };
const bigBtn = (bg, color = "#0D1B2A") => ({ display: "inline-block", background: bg, color, borderRadius: 999, padding: "12px 22px", fontWeight: 800, textDecoration: "none", fontSize: 16 });

function Sparkline({ points }) {
  if (points.length < 2) return <p style={{ color: T.muted, margin: 0 }}>Finish a few Daily Transmissions to see your speed climb here.</p>;
  const w = 320, h = 80, pad = 6;
  const max = Math.max(...points.map((p) => p.wpm), 1);
  const xy = points.map((p, i) => [pad + (i * (w - 2 * pad)) / (points.length - 1), h - pad - (p.wpm / max) * (h - 2 * pad)]);
  const last = points[points.length - 1];
  return (
    <figure style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ display: "block", width: "100%", maxWidth: 520 }} role="img" aria-label={`Your Daily Transmission speed over your last ${points.length} runs, now ${last.wpm} words per minute`}>
        <polyline fill="none" stroke={T.teal} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" points={xy.map((p) => p.join(",")).join(" ")} />
        <circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="5" fill={T.gold} />
      </svg>
      <figcaption style={{ color: T.muted, fontSize: 13 }}>Your speed on your last {points.length} Daily Transmissions. Latest: {last.wpm} WPM.</figcaption>
    </figure>
  );
}

export default function KeysClient({ firstName, track, daily, race, readings, level, rank, streak, bests, history, practice }) {
  const subjects = ["All", ...Array.from(new Set(practice.map((p) => p.subject)))];
  const [subject, setSubject] = useState("All");
  const shown = practice.filter((p) => subject === "All" || p.subject === subject);
  const pct = Math.round(((level.complete ? level.total : level.current - 1) / level.total) * 100);

  return (
    <main style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter', sans-serif", padding: "24px 16px 60px" }}>
      <div style={{ width: "min(1040px, 100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <Link href="/home" style={{ color: T.muted, textDecoration: "none", fontWeight: 700 }}>← Home</Link>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 32 }}>ClearKeys</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {rank.badge && <img src={rank.badge} alt="" width={40} height={40} />}
            <span style={{ fontWeight: 700 }}>{rank.name}{firstName ? ` ${firstName}` : ""}</span>
          </div>
        </header>

        <section style={{ ...panel, display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <div>
              <div style={{ color: T.muted, fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Foundations Track</div>
              <h2 style={{ margin: "4px 0 0", fontSize: 24 }}>{level.complete ? "All 20 levels passed!" : `Level ${level.current} of ${level.total}`}</h2>
            </div>
            {track ? (
              <Link href={`/activity/${track.id}`} style={bigBtn(T.green)}>{level.complete ? "Replay for stars" : level.passed ? "Keep going →" : "Start →"}</Link>
            ) : (
              <span style={{ color: T.muted }}>Your teacher hasn&apos;t turned on the track yet. Try free play below!</span>
            )}
          </div>
          <div aria-hidden="true" style={{ height: 12, background: "rgba(255,255,255,.12)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${T.teal}, ${T.green})` }} />
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          <section style={panel}>
            <div style={{ color: T.muted, fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Daily Transmission</div>
            <h2 style={{ margin: "4px 0 6px", fontSize: 22 }}>{streak.now > 0 ? `${streak.now}-day streak` : "Start a streak today"}</h2>
            <p style={{ color: T.muted, marginTop: 0 }}>A new message every school day. Weekends never break your streak.{streak.best > 0 ? ` Best: ${streak.best} days.` : ""}</p>
            {daily ? <Link href={`/activity/${daily.id}`} style={bigBtn(T.teal)}>Today&apos;s message →</Link> : <span style={{ color: T.muted }}>Not turned on for your class yet.</span>}
          </section>
          <section style={panel}>
            <div style={{ color: T.muted, fontSize: 13, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>Class Relay Race</div>
            <h2 style={{ margin: "4px 0 6px", fontSize: 22 }}>Decode the secret message together</h2>
            <p style={{ color: T.muted, marginTop: 0 }}>When your teacher starts a race, grab a leg and type it fast and right.</p>
            {race ? <Link href={`/activity/${race.id}`} style={bigBtn(T.gold)}>Join the race →</Link> : <span style={{ color: T.muted }}>Not turned on for your class yet.</span>}
          </section>
        </div>

        {readings.length > 0 && (
          <section style={panel}>
            <h2 style={{ marginTop: 0, fontSize: 22 }}>Readings from your teacher</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {readings.map((r) => (
                <Link key={r.id} href={`/activity/${r.id}`} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderRadius: 14, background: "rgba(255,255,255,.06)", color: T.text, textDecoration: "none", fontWeight: 700 }}>
                  <span>{r.title}</span>
                  {r.due && <span style={{ color: T.muted, fontWeight: 500 }}>Due {new Date(`${r.due}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={panel}>
          <h2 style={{ marginTop: 0, fontSize: 22 }}>My personal bests</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Top speed", value: bests.wpm ? `${bests.wpm} WPM` : "—", color: T.teal },
              { label: "Stars earned", value: bests.stars, color: T.gold },
              { label: "Perfect runs", value: bests.perfectRuns, color: T.green },
              { label: "Levels passed", value: `${level.passed} / ${level.total}`, color: T.violet },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,.06)", borderRadius: 14, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: T.muted, fontSize: 13 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <Sparkline points={history} />
        </section>

        <section style={panel}>
          <h2 style={{ marginTop: 0, fontSize: 22 }}>Free play</h2>
          <p style={{ color: T.muted, marginTop: 0 }}>Type any reading for fun. Free play isn&apos;t saved or graded, so try Dictation or Corrupted Transmission too.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {subjects.map((s) => (
              <button key={s} type="button" onClick={() => setSubject(s)} aria-pressed={subject === s} style={{ borderRadius: 999, padding: "8px 14px", fontWeight: 700, border: `1px solid ${T.border}`, background: subject === s ? T.violet : "transparent", color: T.text, cursor: "pointer" }}>{s}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {shown.map((p) => (
              <Link key={p.code} href={`/keys/practice/${encodeURIComponent(p.code)}`} style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,.06)", color: T.text, textDecoration: "none" }}>
                <div style={{ fontWeight: 700 }}>{p.title}</div>
                <div style={{ color: T.muted, fontSize: 13 }}>{p.subject}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
