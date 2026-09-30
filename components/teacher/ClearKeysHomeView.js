"use client";
import React from "react";
import Link from "next/link";
import ClearKeysSwitch from "./ClearKeysSwitch";

// ClearKeys teacher Overview (Sept 29, 2026 polish). Pure view: the page
// loads the data and passes it in, so the layout can be checked on its own.
// Uses the teacher site's own pieces (.cc-panel, .cc-hero, .cc-summary,
// .cc-person, .cc-board-tile) so it looks like the rest of the Bridge.
export default function ClearKeysHomeView({ cls, classId, rows, summaries, counts, stuck, fuel, planet, total, stuckAttempts, error }) {
  const q = classId ? `?classId=${classId}` : "";
  const started = rows ? rows.length - counts.new : 0;
  const goalCounts = { met: 0, on: 0, build: 0, none: 0 };
  (summaries || []).forEach((s) => { goalCounts[s.status.key] += 1; });
  const tools = [
    { href: `/teacher/typing-track${q}`, img: "/teacher/challenges/relay_station.jpg", name: "Class progress", what: "Levels, tries, trouble keys, placement and supports." },
    { href: `/teacher/clearkeys/report${q}`, img: "/cases/RS-4-DAILY.jpg", name: "Report", what: "Speed over time, year goals, gradebook marks, family notes." },
    { href: `/teacher/relay-race${q}`, img: "/teacher/relay_race_bg.jpg", name: "Relay Race", what: "Start a whole-class race on the projector." },
    { href: `/teacher/typing-texts${q}`, img: "/cases/RS-4-L01.jpg", name: "My texts", what: "Paste a passage or spelling list to type." },
  ];

  return (
    <>
      <section className="cc-panel cc-hero" style={{ marginBottom: 18 }}>
        <div className="cc-hero-main">
          <div>
            <p className="cc-eyebrow">Typing that doubles as reading practice</p>
            <h2 style={{ margin: "0 0 8px" }}>
              {rows === null ? "Loading your class…" : rows.length === 0 ? "No students in this class yet" : `${started} of ${rows.length} students are typing`}
            </h2>
            <p className="cc-muted" style={{ margin: 0 }}>
              {cls?.name ? `${cls.name}. ` : ""}Students climb {total} Foundations levels at their own pace, unlock a story as they go, and keep practicing with Fluency levels, games and the Daily Transmission.
            </p>
            {classId && <ClearKeysSwitch classId={classId} className={cls?.name} />}
          </div>
          <img src="/teacher/products/keys.jpg" alt="" />
        </div>
      </section>

      {error && <div className="cc-error" role="alert">{error}</div>}

      {rows && rows.length > 0 && (
        <div className="cc-three" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginBottom: 18 }}>
          {[
            { n: counts.stuck, label: "need help", color: "#b42b3a" },
            { n: counts.on, label: "on track", color: "#513193" },
            { n: counts.done, label: `passed all ${total}`, color: "#087b64" },
            { n: counts.new, label: "not started", color: "#70658d" },
          ].map((t) => (
            <Link key={t.label} href={`/teacher/typing-track${q}`} className="cc-summary" style={{ margin: 0, textDecoration: "none", color: "#241b50" }}>
              <strong style={{ color: t.color }}>{t.n}</strong><span>{t.label}</span>
            </Link>
          ))}
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="cc-two" style={{ marginBottom: 18 }}>
          <div className="cc-stack">
            <section className="cc-panel cc-attention">
              <h3>Who needs you</h3>
              {stuck.length === 0 ? (
                <p className="cc-muted" style={{ margin: 0 }}>Nobody is stuck right now. A student shows up here after {stuckAttempts} tries on the same level.</p>
              ) : (
                stuck.slice(0, 6).map((s) => (
                  <div key={s.id} className="cc-person">
                    <div className="cc-avatar">{(s.firstName || "?").slice(0, 1)}</div>
                    <div>
                      <strong>{s.firstName}</strong>
                      <p>Level {s.level}: {s.levelTitle} · {s.tries} tries{s.lastAcc != null ? ` · last try ${s.lastAcc}% accuracy` : ""}</p>
                    </div>
                    <Link className="cc-btn secondary" href={`/teacher/typing-track${q}`}>Help</Link>
                  </div>
                ))
              )}
              {stuck.length > 6 && <p className="cc-muted" style={{ margin: "8px 0 0" }}>And {stuck.length - 6} more on Class progress.</p>}
            </section>
            <section className="cc-panel">
              <h3>Year typing goal</h3>
              <p className="cc-muted" style={{ marginTop: 0 }}>Speed and accuracy on recent runs compared with the grade {summaries?.[0]?.goal ? `goal (${summaries[0].goal.wpm} words per minute, ${summaries[0].goal.accuracy}% accuracy)` : "goal"}.</p>
              <div className="cc-progress-bar" aria-hidden="true">
                {[["met", "#22B573"], ["on", "#7B5DFF"], ["build", "#F5B82E"], ["none", "#e4e0ef"]].map(([k, c]) => goalCounts[k] > 0 && <span key={k} style={{ flex: goalCounts[k], background: c }} />)}
              </div>
              <div className="cc-progress-labels">
                <span><b>{goalCounts.met}</b> met the goal</span>
                <span><b>{goalCounts.on}</b> on the way</span>
                <span><b>{goalCounts.build}</b> building</span>
                <span><b>{goalCounts.none}</b> not started</span>
              </div>
              <Link className="cc-link" href={`/teacher/clearkeys/report${q}`} style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 600 }}>Open the full report</Link>
            </section>
          </div>
          <div className="cc-stack">
            {fuel && (
              <section className="cc-panel">
                <div className="cc-row" style={{ flexWrap: "nowrap" }}>
                  <img src={planet.image} alt="" width={64} height={64} style={{ flex: "0 0 auto" }} />
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ marginBottom: 2 }}>Class relay beam</h3>
                    <p className="cc-muted" style={{ margin: 0 }}>{fuel.fuel >= fuel.goal ? `Goal reached: ${fuel.fuel} fuel this week (goal ${fuel.goal}). The beam reached ${planet.name}!` : `${fuel.fuel} of ${fuel.goal} fuel this week, toward ${planet.name}`}</p>
                  </div>
                </div>
                <div className="cc-progress-bar" style={{ marginTop: 12 }}><span style={{ width: `${fuel.pct}%`, background: "linear-gradient(90deg,#00C2C7,#7541cf)" }} /></div>
                <p className="cc-muted" style={{ margin: "8px 0 0", fontSize: 12 }}>Each Daily Transmission and each level passed adds 1. Students see this bar on their ClearKeys page.</p>
              </section>
            )}
            <section className="cc-panel">
              <h3>Tools</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {tools.map((t) => (
                  <Link key={t.name} href={t.href} className="cc-board-tile" style={{ border: "1px solid #eee9f7" }}>
                    <img src={t.img} alt="" style={{ aspectRatio: "16 / 10" }} />
                    <strong>{t.name}</strong>
                    <span>{t.what}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
