"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CaseImage } from "../../lib/caseImage";

// Student ClearKeys door (Sept 29, 2026). Bright crystal-ship look to match
// the Home hub: the ClearKeys typing room behind frosted-glass panels, with
// the existing Track / Daily / Race / reading art on every card.
const C = {
  ink: "#241b50",
  muted: "#6b5f8a",
  violet: "#7B5DFF",
  violet2: "#9B7DFF",
  teal: "#00C2C7",
  gold: "#F5B82E",
  green: "#22B573",
  glass: "rgba(255,255,255,0.80)",
  line: "rgba(255,255,255,0.95)",
};
const glass = {
  background: C.glass,
  border: `1px solid ${C.line}`,
  borderRadius: 24,
  boxShadow: "0 10px 30px rgba(60, 40, 140, 0.18)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};
const eyebrow = { color: C.muted, fontSize: 12, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" };
const h = { fontFamily: "'Poppins', sans-serif", color: C.ink, margin: 0 };
const pill = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: "#fff", borderRadius: 999, padding: "11px 20px", fontWeight: 800, textDecoration: "none", fontSize: 15, boxShadow: "0 6px 16px rgba(123,93,255,.3)" });
const cover = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

function Sparkline({ points }) {
  if (points.length < 2) return <p style={{ color: C.muted, margin: 0 }}>Finish a few Daily Transmissions and your speed line shows up here.</p>;
  const w = 320, hgt = 80, pad = 8;
  const max = Math.max(...points.map((p) => p.wpm), 1);
  const xy = points.map((p, i) => [pad + (i * (w - 2 * pad)) / (points.length - 1), hgt - pad - (p.wpm / max) * (hgt - 2 * pad)]);
  const last = points[points.length - 1];
  return (
    <figure style={{ margin: 0 }}>
      <svg viewBox={`0 0 ${w} ${hgt}`} style={{ display: "block", width: "100%", maxWidth: 520 }} role="img" aria-label={`Your speed on your last ${points.length} Daily Transmissions, now ${last.wpm} words per minute`}>
        <defs>
          <linearGradient id="ckLine" x1="0" x2="1"><stop offset="0" stopColor={C.teal} /><stop offset="1" stopColor={C.violet} /></linearGradient>
        </defs>
        <polyline fill="none" stroke="url(#ckLine)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" points={xy.map((p) => p.join(",")).join(" ")} />
        <circle cx={xy[xy.length - 1][0]} cy={xy[xy.length - 1][1]} r="6" fill={C.gold} stroke="#fff" strokeWidth="2" />
      </svg>
      <figcaption style={{ color: C.muted, fontSize: 13 }}>Your speed on your last {points.length} Daily Transmissions. Latest: {last.wpm} WPM.</figcaption>
    </figure>
  );
}

function ActivityCard({ label, title, line, code, href, button, color, off }) {
  return (
    <section style={{ ...glass, padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ flex: "0 0 96px", height: 96, borderRadius: 18, overflow: "hidden", background: "#e9e4fb" }}>
        <CaseImage standard={code} engine="relay_station" style={cover} />
      </div>
      <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
        <div style={eyebrow}>{label}</div>
        <h2 style={{ ...h, fontSize: 19 }}>{title}</h2>
        <p style={{ color: C.muted, margin: "0 0 6px", fontSize: 14 }}>{line}</p>
        {href ? <Link href={href} style={{ ...pill(color), justifySelf: "start", padding: "9px 16px", fontSize: 14 }}>{button}</Link> : <span style={{ color: C.muted, fontWeight: 600, fontSize: 14 }}>{off}</span>}
      </div>
    </section>
  );
}

export default function KeysClient({ firstName, track, daily, race, readings, level, rank, streak, bests, history, practice, grade, story = [], arcade = [] }) {
  const subjects = ["All", ...Array.from(new Set(practice.map((p) => p.subject)))];
  const [subject, setSubject] = useState("All");
  const shown = practice.filter((p) => subject === "All" || p.subject === subject);
  const passedCount = level.complete ? level.total : level.current - 1;
  const g = grade || 3;

  return (
    <main style={{ minHeight: "100vh", color: C.ink, fontFamily: "'Inter', sans-serif", padding: "20px 16px 60px", background: "linear-gradient(180deg, #E9E4FB 0%, #F2F0FA 40%, #F7F5FD 100%)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');`}</style>
      <div style={{ width: "min(1060px, 100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <header style={{ ...glass, borderRadius: 999, padding: "10px 14px 10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/home" style={{ color: C.violet, textDecoration: "none", fontWeight: 800 }}>← Home</Link>
          <h1 style={{ ...h, fontSize: 26, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 8 }}><img src="/student/orb_keys.png" alt="" width={40} height={40} />ClearKeys</h1>
          <span style={{ color: C.muted, fontWeight: 700, fontSize: 14 }}>Grade {g}</span>
        </header>

        {/* Track hero: the ClearKeys typing room is the one big picture. */}
        <section style={{ position: "relative", borderRadius: 28, overflow: "hidden", minHeight: 340, display: "flex", alignItems: "flex-end", padding: 18, backgroundColor: "#dcd6f5", backgroundImage: "url(/relay/keys_room.jpg)", backgroundSize: "cover", backgroundPosition: "center 35%", boxShadow: "0 12px 34px rgba(60,40,140,.22)" }}>
          <div style={{ ...glass, padding: 20, display: "grid", gap: 14, width: "min(520px, 100%)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {rank.badge && <img src={rank.badge} alt={`${rank.name} badge`} width={76} height={76} style={{ flex: "0 0 auto", filter: "drop-shadow(0 6px 12px rgba(80,50,180,.25))" }} />}
              <div>
                <div style={eyebrow}>Foundations Track</div>
                <h2 style={{ ...h, fontSize: 24 }}>{rank.name}{firstName ? ` ${firstName}` : ""}</h2>
                <div style={{ color: C.muted, fontWeight: 600 }}>{level.complete ? "All 20 levels passed. Foundations Certified!" : `Level ${level.current} of ${level.total}`}</div>
              </div>
            </div>
            <div aria-label={`${passedCount} of ${level.total} levels passed`} role="img" style={{ display: "grid", gridTemplateColumns: `repeat(${level.total}, 1fr)`, gap: 4 }}>
              {Array.from({ length: level.total }, (_, i) => {
                const done = i < passedCount;
                const now = !level.complete && i === level.current - 1;
                return <span key={i} style={{ height: 12, borderRadius: 999, background: done ? `linear-gradient(90deg, ${C.teal}, ${C.violet})` : now ? C.gold : "rgba(123,93,255,.15)", boxShadow: now ? `0 0 10px ${C.gold}` : "none" }} />;
              })}
            </div>
            <div>
              {track ? (
                <Link href={`/activity/${track.id}`} style={pill(`linear-gradient(135deg, ${C.violet}, ${C.violet2})`)}>{level.complete ? "Replay for stars" : level.passed ? "Keep climbing →" : "Start the track →"}</Link>
              ) : (
                <span style={{ color: C.muted, fontWeight: 600 }}>Your teacher hasn&apos;t turned on the track yet. Try free play below!</span>
              )}
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          <ActivityCard
            label="Daily Transmission"
            title={streak.now > 0 ? `${streak.now}-day streak!` : "Start a streak today"}
            line={`A new message every school day. Weekends never break your streak.${streak.best > 0 ? ` Best: ${streak.best} days.` : ""}`}
            code={daily?.code || `RS.${g}.DAILY`}
            href={daily ? `/activity/${daily.id}` : null}
            button="Today's message →"
            color={`linear-gradient(135deg, ${C.teal}, #33D6DA)`}
            off="Not turned on for your class yet."
          />
          <ActivityCard
            label="Class Relay Race"
            title="Decode the secret message"
            line="When your teacher starts a race, grab a leg and type it fast and right."
            code={race?.code || `RS.${g}.RACE`}
            href={race ? `/activity/${race.id}` : null}
            button="Join the race →"
            color={`linear-gradient(135deg, ${C.gold}, #FFD466)`}
            off="Not turned on for your class yet."
          />
        </div>

        {story.length > 0 && (() => {
          const all = story.flatMap((a) => a.chapters);
          const latest = [...all].reverse().find((c) => c.open);
          return (
            <section id="story" style={{ ...glass, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <h2 style={{ ...h, fontSize: 22 }}>Story: The Hush</h2>
                <span style={{ color: C.muted, fontWeight: 700, fontSize: 14 }}>{all.filter((c) => c.open).length} of {all.length} chapters unlocked</span>
              </div>
              <p style={{ color: C.muted, margin: "4px 0 14px" }}>A lost ship is calling for help, but the signal is broken. Every level you pass repairs more of it.</p>
              <div style={{ display: "grid", gap: 14 }}>
                {story.map((act, i) => (
                  <div key={act.name}>
                    <div style={{ ...eyebrow, marginBottom: 8 }}>Act {i + 1} · {act.name}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
                      {act.chapters.map((c) => {
                        const isNew = latest && c.n === latest.n;
                        const inner = (
                          <>
                            <span style={{ flex: "0 0 34px", height: 34, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, background: c.open ? `linear-gradient(135deg, ${C.violet}, ${C.teal})` : "#ece8f8", color: c.open ? "#fff" : C.muted }}>{c.open ? c.n : "🔒"}</span>
                            <span style={{ minWidth: 0 }}>
                              <span style={{ display: "block", fontWeight: 800, color: c.open ? C.ink : C.muted }}>{c.open ? c.title : `Chapter ${c.n}`}</span>
                              <span style={{ display: "block", fontSize: 12.5, color: isNew ? C.violet : C.muted, fontWeight: isNew ? 800 : 500 }}>{c.open ? (isNew ? "Newest chapter!" : `Chapter ${c.n}`) : c.hint}</span>
                            </span>
                          </>
                        );
                        const box = { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 16, background: c.open ? "#fff" : "rgba(255,255,255,.55)", textDecoration: "none", boxShadow: isNew ? `0 0 0 2px ${C.violet}, 0 6px 16px rgba(123,93,255,.25)` : c.open ? "0 4px 12px rgba(60,40,140,.08)" : "none" };
                        return c.open
                          ? <Link key={c.n} href={`/keys/story/${c.n}`} style={box}>{inner}</Link>
                          : <div key={c.n} style={box} aria-label={`Chapter ${c.n}, locked. ${c.hint}.`}>{inner}</div>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {arcade.length > 0 && (
          <section id="arcade" style={{ ...glass, padding: 20 }}>
            <h2 style={{ ...h, fontSize: 22 }}>Arcade</h2>
            <p style={{ color: C.muted, margin: "4px 0 14px" }}>Typing games that open up as you climb the track.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {arcade.map((g) => {
                const inner = (
                  <>
                    <div style={{ aspectRatio: "16 / 8", background: "#e9e4fb", position: "relative" }}>
                      <img src={g.image} alt="" style={{ ...cover, filter: g.open ? "none" : "grayscale(1) opacity(.55)" }} />
                      {!g.open && <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }} aria-hidden="true">🔒</span>}
                    </div>
                    <div style={{ padding: "10px 12px" }}>
                      <div style={{ fontWeight: 800 }}>{g.name}</div>
                      <div style={{ color: C.muted, fontSize: 13 }}>{g.open ? g.line : `Pass Level ${g.unlockLevel} to unlock`}</div>
                    </div>
                  </>
                );
                const box = { background: "#fff", borderRadius: 18, overflow: "hidden", textDecoration: "none", color: C.ink, boxShadow: "0 4px 12px rgba(60,40,140,.1)", opacity: g.open ? 1 : 0.85 };
                return g.open ? <Link key={g.key} href={`/keys/arcade/${g.key}`} style={box}>{inner}</Link> : <div key={g.key} style={box}>{inner}</div>;
              })}
            </div>
          </section>
        )}

        {readings.length > 0 && (
          <section style={{ ...glass, padding: 20 }}>
            <h2 style={{ ...h, fontSize: 22, marginBottom: 12 }}>Readings from your teacher</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {readings.map((r) => (
                <Link key={r.id} href={`/activity/${r.id}`} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", textDecoration: "none", color: C.ink, boxShadow: "0 4px 12px rgba(60,40,140,.1)" }}>
                  <div style={{ aspectRatio: "16 / 9" }}><CaseImage standard={r.code} engine="relay_station" style={cover} /></div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 800 }}>{r.title}</div>
                    {r.due && <div style={{ color: C.muted, fontSize: 13 }}>Due {new Date(`${r.due}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ ...glass, padding: 20 }}>
          <h2 style={{ ...h, fontSize: 22, marginBottom: 12 }}>My personal bests</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Top speed", value: bests.wpm ? `${bests.wpm} WPM` : "—", color: C.teal },
              { label: "Stars earned", value: bests.stars, color: C.gold },
              { label: "Perfect runs", value: bests.perfectRuns, color: C.green },
              { label: "Levels passed", value: `${level.passed} / ${level.total}`, color: C.violet },
            ].map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 18, padding: 14, textAlign: "center", boxShadow: "0 4px 12px rgba(60,40,140,.08)" }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: 13, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <Sparkline points={history} />
        </section>

        <section style={{ ...glass, padding: 20 }}>
          <h2 style={{ ...h, fontSize: 22 }}>Free play</h2>
          <p style={{ color: C.muted, margin: "4px 0 12px" }}>Type any reading just for fun. Free play isn&apos;t saved or graded, so try Dictation or Corrupted Transmission too.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {subjects.map((s) => (
              <button key={s} type="button" onClick={() => setSubject(s)} aria-pressed={subject === s} style={{ borderRadius: 999, padding: "8px 16px", fontWeight: 800, border: subject === s ? "1px solid transparent" : "1px solid #d9d0f5", background: subject === s ? `linear-gradient(135deg, ${C.violet}, ${C.violet2})` : "#fff", color: subject === s ? "#fff" : C.ink, cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {shown.map((p) => (
              <Link key={p.code} href={`/keys/practice/${encodeURIComponent(p.code)}`} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", textDecoration: "none", color: C.ink, boxShadow: "0 4px 12px rgba(60,40,140,.1)" }}>
                <div style={{ aspectRatio: "16 / 9", background: "#e9e4fb" }}><CaseImage standard={p.code} engine="relay_station" style={cover} /></div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontWeight: 800, lineHeight: 1.25 }}>{p.title}</div>
                  <div style={{ color: C.muted, fontSize: 13 }}>{p.subject}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
