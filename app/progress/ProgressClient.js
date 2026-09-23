"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";
import { getPublicCase } from "../../lib/cases/index.public";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  goldSoft: "#FFF7E6",
  success: "#22C55E",
  successSoft: "#E9F9EE",
  orange: "#F97316",
  orangeSoft: "#FFF1E6",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#5C6780",
};

const GRADE_META = {
  0: { label: "Keep Practicing", bg: COLORS.goldSoft, color: "#8A6508", bar: "#E2B100", height: 36 },
  1: { label: "Getting There", bg: COLORS.tealSoft, color: "#087C8A", bar: "#1AA7B5", height: 110 },
  2: { label: "Nailed It", bg: COLORS.successSoft, color: "#0E7A45", bar: "#22A35A", height: 190 },
};

const CONFIDENCE_META = {
  shaky: "You felt shaky",
  solid: "You felt pretty solid",
  strong: "You felt really strong",
};

const card = {
  background: "rgba(255,255,255,.95)",
  borderRadius: 18,
  boxShadow: "0 4px 20px rgba(60,40,120,.12)",
};

function caseImagePath(standard) {
  if (!standard) return "/icons/crystal_points.png";
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

function formatDue(dateStr) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" });
}

function shortTitle(title) {
  const clean = (title || "Mission").replace(/^[^:]+:\s*/, "");
  return clean.length > 18 ? `${clean.slice(0, 16)}…` : clean;
}

function samLines(finished) {
  if (!finished.length) {
    return [
      "Turn a mission in and I'll read it with you.",
      "Your graph starts after the first grade.",
    ];
  }
  const newestFirst = [...finished].sort((a, b) => new Date(b.releasedAt || b.submittedAt) - new Date(a.releasedAt || a.submittedAt));
  const best = newestFirst.find((m) => m.grade === 2) || newestFirst.find((m) => m.grade === 1);
  const weak = newestFirst.find((m) => m.grade === 0);
  const line1 = best
    ? `You're doing well on ${best.caseTitle}. That one was a ${GRADE_META[best.grade].label}.`
    : "You're turning work in. The next grade will show what stuck.";
  const line2 = weak
    ? `The one to practice is ${weak.caseTitle}.${weak.feedback ? ` ${weak.feedback}` : ""}`
    : "Nothing needs a redo right now. Keep going.";
  return [line1, line2];
}

function DetailModal({ entry, onClose }) {
  if (!entry) return null;
  const standard = entry.caseStandard;
  const caseEntry = standard ? getPublicCase(standard) : null;
  const feeling = entry.selfConfidence ? CONFIDENCE_META[entry.selfConfidence] : null;
  const meta = entry.released && GRADE_META[entry.grade] ? GRADE_META[entry.grade] : null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, width: "min(560px, 100%)", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ position: "relative", height: 160, borderRadius: "20px 20px 0 0", overflow: "hidden", background: "#1a1038" }}>
          {standard && <img src={caseImagePath(standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(13,20,35,.6)", color: COLORS.white, border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          {meta && <span style={{ display: "inline-block", background: meta.bg, color: meta.color, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{meta.label}</span>}
          {!entry.released && <span style={{ display: "inline-block", background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Waiting for your teacher</span>}
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px 0" }}>{entry.caseTitle}</h2>
          {caseEntry?.publicCase?.bigQuestion && (
            <div style={{ fontSize: 13.5, background: COLORS.tealSoft, borderRadius: 12, padding: "10px 12px", marginBottom: 14, lineHeight: 1.5 }}>
              {caseEntry.publicCase.bigQuestion}
            </div>
          )}
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Your answer</div>
          <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5, marginBottom: 14 }}>
            {entry.attempt2 || entry.attempt1 || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer saved)</span>}
          </div>
          {(feeling || entry.feedback) && (
            <div style={{ background: COLORS.tealSoft, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5 }}>
              {feeling ? `${feeling}. ` : ""}{entry.feedback || ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProgressClient({ student, missions, badgeTiers, pastDue = [] }) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const needsAttention = missions.filter((m) => m.revisionRequested && !(m.released && m.grade !== null && m.grade !== undefined));
  const waitingForTeacher = missions.filter((m) => !m.revisionRequested && !(m.released && m.grade !== null && m.grade !== undefined));
  const finished = missions.filter((m) => m.released && m.grade !== null && m.grade !== undefined);

  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const missionsCompleted = missions.length;
  const earned = tiers.filter((t) => missionsCompleted >= t.threshold);
  const locked = tiers.filter((t) => missionsCompleted < t.threshold);
  const currentTier = earned.length ? earned[earned.length - 1] : null;
  const nextTier = locked[0] || null;
  const laterTier = locked[1] || null;
  const missionsToNext = nextTier ? Math.max(0, nextTier.threshold - missionsCompleted) : 0;
  const path = [
    currentTier ? { tier: currentTier, state: "earned" } : null,
    nextTier ? { tier: nextTier, state: "next" } : null,
    laterTier ? { tier: laterTier, state: "later" } : null,
  ].filter(Boolean);
  if (!path.length && tiers[0]) path.push({ tier: tiers[0], state: "next" });

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = missions.filter((m) => m.submittedAt && new Date(m.submittedAt).getTime() >= weekAgo).length;
  const bars = [...finished]
    .sort((a, b) => new Date(a.releasedAt || a.submittedAt) - new Date(b.releasedAt || b.submittedAt))
    .slice(-8);
  const [line1, line2] = samLines(finished);
  const late = pastDue[0];

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .sp-pop { animation: sp-pop .5s cubic-bezier(.2,1.4,.4,1) both; }
        @keyframes sp-pop { from { opacity: 0; transform: translateY(-10px) scale(.96); } to { opacity: 1; transform: none; } }
        .sp-eq { transform-origin: bottom; animation: sp-eq .9s ease-in-out infinite; }
        @keyframes sp-eq { 50% { transform: scaleY(.35); } }
        .sp-cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 16px; }
        .sp-stage { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 8px; }
        .sp-bar { border: 0; background: none; padding: 0; cursor: pointer; font: inherit; color: inherit; }
        .sp-bar:hover div { filter: brightness(1.08); }
        @media (max-width: 900px) {
          .sp-cols, .sp-stage { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <img src="/student/progress_hub_bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "70px 24px 40px", maxWidth: 1180, margin: "0 auto" }}>
        <BackToHubButton />

        <header style={{ ...card, marginBottom: 18, background: "rgba(255,255,255,.82)", backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", padding: "18px 22px 8px" }}>
            <div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>My Progress</h1>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 15 }}>
                {student.first_name}
                {nextTier ? ` · ${missionsToNext} more mission${missionsToNext === 1 ? "" : "s"} for ${nextTier.label}` : currentTier ? ` · ${currentTier.label}` : ""}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 18 }}>
              <img src="/icons/crystal_points.png" alt="" style={{ width: 26, height: 26, objectFit: "contain" }} />
              {student.crystal_points}
            </div>
          </div>
          {late && (
            <div className="sp-pop" style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 18px 16px", padding: "10px 12px", background: "#fff5f6", border: "2px solid #ee5264", borderRadius: 14 }}>
              <strong style={{ color: "#c4233a", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase" }}>Past due</strong>
              <p style={{ margin: 0, flex: 1, fontSize: 14, fontWeight: 700 }}>
                {pastDue.length === 1
                  ? `${late.cases?.title || late.case_standard} was due ${formatDue(late.due_date)}.`
                  : `${pastDue.length} missions are past due.`}
              </p>
              <button type="button" onClick={() => router.push(`/activity/${late.id}`)} style={{ background: "#ee5264", color: "#fff", border: 0, borderRadius: 999, padding: "8px 14px", fontWeight: 700, cursor: "pointer" }}>Open it</button>
            </div>
          )}
          {!late && <div style={{ height: 10 }} />}
        </header>

        <div className="sp-cols">
          <section style={{ ...card, padding: 16 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase", color: "#b8560e" }}>Try again · {needsAttention.length}</h2>
            {needsAttention.length === 0 ? (
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "6px 0" }}>Nothing to try again.</p>
            ) : needsAttention.map((m) => (
              <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10, boxShadow: "inset 4px 0 0 #39D97A", marginBottom: 8 }}>
                <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: 14 }}>{m.caseTitle}</strong>
                  <span style={{ fontSize: 12, color: COLORS.textMuted }}>Your teacher wants another try.</span>
                </div>
                <button type="button" onClick={() => router.push(`/activity/${m.assignmentId}`)} style={{ background: COLORS.orangeSoft, color: "#b8560e", border: 0, borderRadius: 999, padding: "8px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Try again</button>
              </div>
            ))}
          </section>

          <section style={{ ...card, padding: 16 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase", color: "#6a45d6" }}>Waiting for your teacher · {waitingForTeacher.length}</h2>
            {waitingForTeacher.length === 0 ? (
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "6px 0" }}>Nothing is waiting.</p>
            ) : waitingForTeacher.map((m) => (
              <button key={m.id} type="button" onClick={() => setSelected(m)} style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10, width: "100%", border: 0, textAlign: "left", marginBottom: 8, cursor: "pointer", font: "inherit", color: "inherit" }}>
                <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
                <div>
                  <strong style={{ display: "block", fontSize: 14 }}>{m.caseTitle}</strong>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6a45d6" }}>Your teacher has this.</span>
                </div>
              </button>
            ))}
          </section>

          <section style={{ ...card, padding: 16 }}>
            <h2 style={{ margin: "0 0 10px", fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase", color: "#0e7a45" }}>Finished · {finished.length}</h2>
            {finished.length === 0 ? (
              <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "6px 0" }}>Grades show up here.</p>
            ) : finished.map((m) => {
              const meta = GRADE_META[m.grade];
              return (
                <button key={m.id} type="button" onClick={() => setSelected(m)} style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10, width: "100%", border: 0, textAlign: "left", marginBottom: 8, cursor: "pointer", font: "inherit", color: "inherit", boxShadow: `inset 4px 0 0 ${meta?.bar || "#39D97A"}` }}>
                  <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: "block", fontSize: 14 }}>{m.caseTitle}</strong>
                    <span style={{ fontSize: 12, color: COLORS.textMuted }}>{CONFIDENCE_META[m.selfConfidence] || "Turned in"}</span>
                  </div>
                  {meta && <span style={{ background: meta.bg, color: meta.color, borderRadius: 999, padding: "6px 10px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{meta.label}</span>}
                </button>
              );
            })}
          </section>
        </div>

        <section style={{ ...card, background: "rgba(255,255,255,.82)", backdropFilter: "blur(8px)", padding: 14, marginBottom: 16 }} className="sp-stage">
          <aside style={{ background: "linear-gradient(180deg,#161036,#2a1868)", color: "#f6f3ff", borderRadius: 16, padding: "8px 16px 16px", border: "1px solid rgba(126,231,255,.45)" }}>
            <img src="/icons/sam/cosmic/idle-poster.png" alt="" style={{ width: 140, height: 140, objectFit: "contain", display: "block", margin: "0 auto 2px", transform: "rotate(8deg)" }} />
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, color: "#7ee7ff", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
              <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
                {[6, 12, 8, 14].map((h, i) => <i key={i} className="sp-eq" style={{ width: 3, height: h, borderRadius: 2, background: "#7ee7ff", display: "block", animationDelay: `${i * 0.12}s` }} />)}
              </span>
              S.A.M. live
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.45 }}>{line1}</p>
            <p style={{ margin: "12px 0 0", paddingTop: 12, borderTop: "1px solid rgba(126,231,255,.28)", fontSize: 14.5, lineHeight: 1.45 }}>{line2}</p>
          </aside>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", fontSize: 20 }}>How your missions landed</h2>
                <p style={{ margin: "4px 0 0", color: COLORS.textMuted, fontSize: 13 }}>{bars.length ? "Tap a bar to see that grade." : "Your graph starts after the first grade."}</p>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 12, fontWeight: 700, color: COLORS.textMuted }}>
                <span><i style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#e2b100", marginRight: 4 }} />Keep Practicing</span>
                <span><i style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#1aa7b5", marginRight: 4 }} />Getting There</span>
                <span><i style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#22a35a", marginRight: 4 }} />Nailed It</span>
              </div>
            </div>
            {bars.length > 0 && (
              <div style={{ display: "flex", gap: 12, alignItems: "flex-end", marginTop: 12 }}>
                <div style={{ position: "relative", height: 200, width: 110, flexShrink: 0, fontSize: 12, fontWeight: 700, color: COLORS.textMuted }}>
                  <span style={{ position: "absolute", top: 0, right: 8 }}>Nailed It</span>
                  <span style={{ position: "absolute", top: 82, right: 8 }}>Getting There</span>
                  <span style={{ position: "absolute", top: 156, right: 8 }}>Keep Practicing</span>
                </div>
                <div style={{ flex: 1, minHeight: 230, display: "flex", alignItems: "flex-end", gap: 10, borderBottom: "2px solid #e4dff2", paddingBottom: 28 }}>
                  {bars.map((m) => {
                    const meta = GRADE_META[m.grade] || GRADE_META[0];
                    return (
                      <button key={m.id} type="button" className="sp-bar" onClick={() => setSelected(m)} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", minWidth: 0 }}>
                        <div style={{ width: "min(64px, 100%)", height: meta.height, borderRadius: "14px 14px 4px 4px", background: meta.bar }} />
                        <span style={{ position: "relative", top: 26, fontSize: 12, fontWeight: 700, color: "#3d3558" }}>{shortTitle(m.caseTitle)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {path.length > 0 && (
          <section style={{ ...card, background: "rgba(255,255,255,.82)", backdropFilter: "blur(8px)", padding: "18px 28px 16px", position: "relative" }}>
            <div style={{ position: "absolute", top: 64, left: "12%", right: "12%", height: 4, borderRadius: 99, background: "linear-gradient(90deg,#7b5dff 0 42%,#d9d0ee 42%)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {path.map((stop) => (
                <div key={stop.tier.id} style={{ width: 150, textAlign: "center", opacity: stop.state === "later" ? 0.45 : 1 }}>
                  <img
                    src={`/badges/transparent/${stop.tier.tier_key}.png`}
                    alt=""
                    style={{ width: 96, height: 96, objectFit: "contain", filter: stop.state === "next" ? "drop-shadow(0 0 10px #7b5dff)" : stop.state === "later" ? "grayscale(1)" : "none" }}
                  />
                  <strong style={{ display: "block", marginTop: 4, fontSize: 14 }}>{stop.tier.label}</strong>
                  <span style={{ fontSize: 12, fontWeight: 700, color: stop.state === "next" ? "#5b3db5" : COLORS.textMuted }}>
                    {stop.state === "earned" ? "Earned" : stop.state === "next" ? `${missionsToNext} mission${missionsToNext === 1 ? "" : "s"} away` : "Later"}
                  </span>
                </div>
              ))}
            </div>
            <b style={{ position: "absolute", left: "24%", top: 52, background: "#fff", color: "#5b3db5", border: "2px solid #7b5dff", borderRadius: 999, padding: "4px 10px", fontSize: 12 }}>{thisWeek} this week</b>
          </section>
        )}
      </div>

      <DetailModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
