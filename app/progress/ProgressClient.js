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
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

// Friendlier, kid-facing wording for the same 0/1/2 scale teachers see as
// "Level 0/1/2" on their grading screen — students never see the raw AI
// score, only the teacher's own grade, released on the teacher's schedule.
const GRADE_META = {
  0: { label: "Keep Practicing", emoji: "🌱", bg: COLORS.goldSoft, color: "#B8860B" },
  1: { label: "Getting There", emoji: "💪", bg: COLORS.tealSoft, color: COLORS.teal },
  2: { label: "Nailed It!", emoji: "🌟", bg: COLORS.successSoft, color: COLORS.success },
};
const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };
const CONFIDENCE_META = {
  shaky: { emoji: "😕", label: "Still shaky" },
  solid: { emoji: "🙂", label: "Pretty solid" },
  strong: { emoji: "😄", label: "Really strong" },
};

// Mostly-opaque card treatment for this page (vs. the frosted-glass "see
// the background through it" look elsewhere) — Emily's reference mockup
// uses crisp, nearly-solid white cards over the scene, not translucent
// ones, so this page gets its own card style rather than reusing glassCard.
const card = {
  background: "rgba(255,255,255,.95)",
  borderRadius: 18,
  boxShadow: "0 4px 20px rgba(60,40,120,.12)",
};

function caseImagePath(standard) {
  if (!standard) return "/icons/crystal_points.png";
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// A plain SVG ring — no chart library needed for one circle.
function ProgressRing({ percent, size = 92, stroke = 9, color }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(123,93,255,.15)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.textDark, lineHeight: 1 }}>{percent}%</span>
      </div>
    </div>
  );
}

// Lightweight inline line chart for "Your Crystal Growth" — built from real
// crystal_points_history rows (see sql/crystal_points_history_migration.sql)
// rather than a charting library, since it's just one line. Needs at least
// 2 points to draw a meaningful line; a brand-new student (or one who was
// already active before this migration ran) may only have 0-1 points for a
// while, so this shows a friendly placeholder instead of a broken/flat line.
function GrowthChart({ points }) {
  if (!points || points.length < 2) {
    return (
      <div style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: COLORS.textMuted, fontSize: 11.5, padding: "0 10px" }}>
        Your growth chart will fill in as you earn more crystals!
      </div>
    );
  }
  const width = 260;
  const height = 70;
  const pad = 6;
  const values = points.map((p) => p.new_total);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (p.new_total - min) / range);
    return [x, y];
  });
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1][0]},${height - pad} L ${coords[0][0]},${height - pad} Z`;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.violet} stopOpacity="0.32" />
            <stop offset="100%" stopColor={COLORS.violet} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#growthFill)" />
        <path d={linePath} fill="none" stroke={COLORS.violet} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="3.5" fill={COLORS.violet} />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textMuted, marginTop: 2 }}>
        <span>{formatShortDate(points[0].created_at)}</span>
        {points.length > 2 && <span>{formatShortDate(points[Math.floor(points.length / 2)].created_at)}</span>}
        <span>Today</span>
      </div>
    </div>
  );
}

// Ported from the old My Notebook page — the richer "revisit a finished
// case" view (the big question, your actual answer, how confident you
// felt, teacher feedback). Now also used for "Waiting for Teacher" rows so
// a student can re-read what they turned in while it's still pending.
function DetailModal({ entry, onClose }) {
  if (!entry) return null;
  const standard = entry.caseStandard;
  const caseEntry = standard ? getPublicCase(standard) : null;
  const confMeta = entry.selfConfidence ? CONFIDENCE_META[entry.selfConfidence] : null;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: COLORS.white, borderRadius: 20, width: "min(560px, 100%)", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ position: "relative", height: 160, borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          {standard && <img src={caseImagePath(standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(13,20,35,.6)", color: COLORS.white, border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>{standard}</div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px 0" }}>{entry.caseTitle}</h2>

          {caseEntry?.publicCase?.bigQuestion && (
            <div style={{ fontSize: 13.5, background: COLORS.tealSoft, borderRadius: 12, padding: "10px 12px", marginBottom: 14, lineHeight: 1.5 }}>
              🎯 {caseEntry.publicCase.bigQuestion}
            </div>
          )}

          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Your Answer</div>
          <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5, marginBottom: 14 }}>
            {entry.attempt2 || entry.attempt1 || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer saved)</span>}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: entry.released ? 14 : 0 }}>
            {confMeta && (
              <div style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                {confMeta.emoji} You felt: {confMeta.label}
              </div>
            )}
            {!entry.released && (
              <div style={{ background: COLORS.cream, color: COLORS.textMuted, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                Waiting for your teacher
              </div>
            )}
            {entry.released && entry.grade !== null && entry.grade !== undefined && (
              <div style={{ background: COLORS.gold, color: COLORS.textDark, borderRadius: 999, padding: "6px 12px", fontSize: 12, fontWeight: 700 }}>
                {GRADE_LABELS[entry.grade]}
              </div>
            )}
          </div>

          {entry.released && entry.feedback && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>Teacher Feedback</div>
              <div style={{ background: COLORS.tealSoft, borderRadius: 10, padding: 12, fontSize: 13.5, lineHeight: 1.5 }}>{entry.feedback}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, iconBg, value, label }) {
  return (
    <div style={{ ...card, flex: 1, minWidth: 0, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 19, color: COLORS.textDark, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10.5, color: COLORS.textMuted, lineHeight: 1.25 }}>{label}</div>
    </div>
  );
}

function ColumnHeader({ icon, label, count, color, bg }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 12.5, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 0.4, flex: 1 }}>{label}</span>
      <span style={{ background: bg, color, borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{count}</span>
    </div>
  );
}

function FooterBanner({ icon, text, color, bg }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: bg, borderRadius: 14, padding: "12px 14px", marginTop: 12 }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color, lineHeight: 1.35 }}>{text}</span>
    </div>
  );
}

export default function ProgressClient({ student, missions, badgeTiers, pointsHistory }) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  // Three-way split for the three columns Emily's mockup asks for — a
  // graded mission never also shows as "needs a revision," even if both
  // flags were somehow true.
  const needsAttention = missions.filter((m) => m.revisionRequested && !(m.released && m.grade !== null && m.grade !== undefined));
  const waitingForTeacher = missions.filter((m) => !m.revisionRequested && !(m.released && m.grade !== null && m.grade !== undefined));
  const finished = missions.filter((m) => m.released && m.grade !== null && m.grade !== undefined);

  // Badge tier logic ported from Home/Crystal Vault (Aug 27) — same
  // earned/locked math, reused here for the "Badges Earned" row and the
  // "Level"/"Next Level" cards.
  const tiers = badgeTiers && badgeTiers.length > 0 ? badgeTiers : [];
  const currentTierIndex = [...tiers].reverse().findIndex((t) => student.crystal_points >= t.threshold);
  const currentTier = tiers.length > 0 ? (currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : tiers[0]) : null;
  const currentTierPos = currentTier ? tiers.findIndex((t) => t.id === currentTier.id) : -1;
  const level = currentTierPos >= 0 ? currentTierPos + 1 : 1;
  const nextTier = currentTierPos >= 0 && currentTierPos + 1 < tiers.length ? tiers[currentTierPos + 1] : null;
  const overallPercent = nextTier
    ? Math.min(100, Math.max(0, Math.round(((student.crystal_points - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100)))
    : 100;
  const pointsToNext = nextTier ? Math.max(0, nextTier.threshold - student.crystal_points) : 0;

  // Recent Activity — a combined, real timeline built from the same
  // mission data as the three columns (submitted + graded events), not a
  // separate feed.
  const activityEvents = [];
  missions.forEach((m) => {
    if (m.submittedAt) activityEvents.push({ date: m.submittedAt, text: `${m.caseTitle} turned in` });
    if (m.released && m.releasedAt) activityEvents.push({ date: m.releasedAt, text: `${m.caseTitle} graded` });
  });
  activityEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentActivity = activityEvents.slice(0, 5);

  // "New" grades and revision requests with a note are the two cases where
  // a student has an actual unread note from their teacher waiting on them.
  const unreadFeedbackCount = missions.filter((m) => m.feedback && (m.revisionRequested || m.isNewGrade)).length;

  return (
    <div style={{ position: "relative", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.16); }
      `}</style>

      {/* Fixed full-bleed hero background — stays pinned in the viewport as
          the page scrolls (rather than scrolling away with the content),
          so the crystal centerpiece is always visible behind the top
          "hero" cards the way it is in Emily's mockup. Content further
          down the page is nearly-opaque and simply covers it once
          scrolled that far, same idea as a hero-image section on a
          marketing page. */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <img src="/student/progress_hub_bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: 24, maxWidth: 1300, margin: "0 auto" }}>
        <BackToHubButton />

        {/* HERO ZONE — title, stats, crystal pill + growth chart, then the
            progress ring / next-level pair floating over the background's
            crystal centerpiece. */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: "1 1 420px", minWidth: 280 }}>
            <div style={{ ...card, padding: "16px 20px", marginBottom: 14 }}>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 27, fontWeight: 700, margin: "0 0 4px 0", color: COLORS.textDark }}>My Progress</h1>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>
                Great work, {student.first_name}! Keep your learning crystal growing! 🔮
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <StatPill icon="🚀" iconBg={COLORS.violetSoft} value={missions.length} label="Missions Turned In" />
              <StatPill icon="🕐" iconBg={COLORS.tealSoft} value={waitingForTeacher.length} label="Waiting for Teacher" />
              <StatPill icon="✅" iconBg={COLORS.successSoft} value={finished.length} label="Completed" />
              <StatPill icon="⭐" iconBg={COLORS.goldSoft} value={student.crystal_points} label="Crystals Earned" />
            </div>
          </div>

          <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", fontWeight: 700, fontSize: 15 }}>
              <img src="/icons/crystal_points.png" alt="" style={{ width: 22, height: 22, objectFit: "contain" }} />
              {student.crystal_points}
            </div>
            <div style={{ ...card, width: 260, padding: "14px 16px" }}>
              <p style={{ margin: "0 0 8px 0", fontSize: 12.5, fontWeight: 700, color: COLORS.textDark }}>Your Crystal Growth</p>
              <GrowthChart points={pointsHistory} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 28, flexWrap: "wrap", margin: "18px 0 30px" }}>
          <div style={{ ...card, display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
            <ProgressRing percent={overallPercent} color={COLORS.violet} />
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: COLORS.violet }}>Overall Progress</div>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>Level {level}{currentTier ? ` · ${currentTier.label}` : ""}</div>
            </div>
          </div>

          <div style={{ ...card, width: 240, padding: "14px 18px", textAlign: "left" }}>
            {nextTier ? (
              <>
                <p style={{ margin: "0 0 4px 0", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.violet }}>Next Level</p>
                <p style={{ margin: "0 0 10px 0", fontSize: 12, color: COLORS.textMuted, lineHeight: 1.4 }}>
                  Keep going! Earn {pointsToNext} more crystal{pointsToNext === 1 ? "" : "s"} to reach {nextTier.label}!
                </p>
              </>
            ) : (
              <>
                <p style={{ margin: "0 0 4px 0", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.violet }}>Top Level!</p>
                <p style={{ margin: "0 0 10px 0", fontSize: 12, color: COLORS.textMuted, lineHeight: 1.4 }}>
                  You've reached the highest tier — amazing work! 🎉
                </p>
              </>
            )}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "5px 14px", fontWeight: 700, fontSize: 12 }}>
              💎 Level {level}
            </div>
          </div>
        </div>

        {/* THREE COLUMNS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 20 }}>
          <div style={{ ...card, padding: 16, display: "flex", flexDirection: "column" }}>
            <ColumnHeader icon="⚠️" label="Needs Your Attention" count={needsAttention.length} color={COLORS.orange} bg={COLORS.orangeSoft} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {needsAttention.length === 0 ? (
                <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "6px 0" }}>Nothing waiting on you right now — nice work!</p>
              ) : (
                needsAttention.map((m) => (
                  <div key={m.id} style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                      <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.caseTitle}</div>
                      <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{m.caseStandard} · Turned in {formatShortDate(m.submittedAt)}</div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.orange, marginTop: 2 }}>Revision requested</div>
                    </div>
                    <button type="button" onClick={() => router.push(`/activity/${m.assignmentId}`)} className="gc-btn" style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.orangeSoft, color: COLORS.orange, flexShrink: 0, fontSize: 15 }}>
                      ›
                    </button>
                  </div>
                ))
              )}
            </div>
            <FooterBanner icon="🧭" text="Let's get this mission ready for launch!" color="#B8560E" bg={COLORS.orangeSoft} />
          </div>

          <div style={{ ...card, padding: 16, display: "flex", flexDirection: "column" }}>
            <ColumnHeader icon="⏳" label="Waiting for Teacher" count={waitingForTeacher.length} color={COLORS.violet} bg={COLORS.violetSoft} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {waitingForTeacher.length === 0 ? (
                <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "6px 0" }}>Nothing waiting on your teacher right now.</p>
              ) : (
                waitingForTeacher.map((m) => (
                  <div key={m.id} onClick={() => setSelected(m)} className="gc-card" style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10, cursor: "pointer", transition: "transform 150ms ease, box-shadow 150ms ease" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                      <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.caseTitle}</div>
                      <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{m.caseStandard} · Turned in {formatShortDate(m.submittedAt)}</div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.violet, marginTop: 2 }}>Submitted</div>
                    </div>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.violetSoft, color: COLORS.violet, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>›</div>
                  </div>
                ))
              )}
            </div>
            <FooterBanner icon="⏳" text="Great job! Your missions are on their way to HQ for review." color="#4B3FCC" bg={COLORS.violetSoft} />
          </div>

          <div style={{ ...card, padding: 16, display: "flex", flexDirection: "column" }}>
            <ColumnHeader icon="✅" label="Finished & Graded" count={finished.length} color={COLORS.success} bg={COLORS.successSoft} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
              {finished.length === 0 ? (
                <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "6px 0" }}>Graded missions will show up here.</p>
              ) : (
                finished.map((m) => {
                  const meta = GRADE_META[m.grade];
                  return (
                    <div key={m.id} onClick={() => setSelected(m)} className="gc-card" style={{ display: "flex", gap: 10, alignItems: "center", background: COLORS.cream, borderRadius: 12, padding: 10, cursor: "pointer", transition: "transform 150ms ease, box-shadow 150ms ease" }}>
                      <div style={{ position: "relative", width: 44, height: 44, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                        <img src={caseImagePath(m.caseStandard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        {m.isNewGrade && (
                          <span style={{ position: "absolute", top: 2, left: 2, fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 999, background: "#E4574C", color: COLORS.white }}>NEW</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.caseTitle}</div>
                        <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{m.caseStandard} · Turned in {formatShortDate(m.submittedAt)}</div>
                      </div>
                      {meta && (
                        <div style={{ background: meta.bg, color: meta.color, borderRadius: 999, padding: "5px 10px", fontSize: 15, flexShrink: 0 }} title={meta.label}>
                          {meta.emoji}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <FooterBanner icon="💎" text="Crystal energy stored! You're growing stronger." color="#0E7A45" bg={COLORS.successSoft} />
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div style={{ ...card, padding: 18, textAlign: "center" }}>
            <p style={{ margin: "0 0 10px 0", fontSize: 11.5, fontWeight: 700, color: COLORS.orange, textTransform: "uppercase", letterSpacing: 0.4 }}>🔥 Learning Streak</p>
            <div style={{ width: 76, height: 76, borderRadius: "50%", background: "radial-gradient(circle, #FFF1E0, #FFE0B8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 34 }}>
              🔥
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.textDark }}>{student.streak_days || 0} Day{student.streak_days === 1 ? "" : "s"}</div>
            <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>Keep it going!</div>
          </div>

          <div style={{ ...card, padding: 18 }}>
            <p style={{ margin: "0 0 12px 0", fontSize: 11.5, fontWeight: 700, color: COLORS.gold, textTransform: "uppercase", letterSpacing: 0.4 }}>🏆 Badges Earned</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tiers.length === 0 ? (
                <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: 0 }}>Badges aren't set up yet.</p>
              ) : (
                tiers.map((tier) => {
                  const earned = student.crystal_points >= tier.threshold;
                  return (
                    <img
                      key={tier.id}
                      src={`/badges/transparent/${tier.tier_key}.png`}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = tier.image_path; }}
                      alt={tier.label}
                      title={`${tier.label}${earned ? "" : " · Locked"}`}
                      style={{ width: 42, height: 42, objectFit: "contain", opacity: earned ? 1 : 0.28, filter: earned ? "none" : "grayscale(1)" }}
                    />
                  );
                })
              )}
            </div>
          </div>

          <div style={{ ...card, padding: 18 }}>
            <p style={{ margin: "0 0 10px 0", fontSize: 11.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.4 }}>📝 Recent Activity</p>
            {recentActivity.length === 0 ? (
              <p style={{ fontSize: 11.5, color: COLORS.textMuted, margin: 0 }}>Nothing yet — go complete a mission!</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {recentActivity.map((ev, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.violet, flexShrink: 0 }} />
                    <span style={{ flex: 1, color: COLORS.textDark, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.text}</span>
                    <span style={{ color: COLORS.textMuted, flexShrink: 0 }}>{formatShortDate(ev.date)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ ...card, padding: 18, textAlign: "center" }}>
            <p style={{ margin: "0 0 10px 0", fontSize: 11.5, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.4 }}>💬 Teacher Feedback</p>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.textDark, marginBottom: 6 }}>{unreadFeedbackCount}</div>
            <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>New comment{unreadFeedbackCount === 1 ? "" : "s"}</div>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: 20 }}>💬</div>
          </div>
        </div>
      </div>

      <DetailModal entry={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
