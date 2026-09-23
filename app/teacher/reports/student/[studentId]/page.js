"use client";
import {BridgePage,PageHeading} from "../../../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Printer, Link2, Check } from "lucide-react";
import { supabase } from "../../../../../lib/supabaseClient";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS } from "../../../../../lib/teacherTheme";

// Sept 13 — moved to the console-interior look, same pattern as the rest of
// Reports (see Teacher_SiteWide_Redesign_Plan.md). Same reasoning as the
// class report: the report itself stays a plain, opaque white card (not the
// glass panel look) since it's a printable document, and its aqua Observatory
// accent replaces decorative violet uses only — the trend chart's two-line
// coloring (this student vs. class average) and the proficiency-band colors
// (including violet for "Developing") are untouched, since changing either
// would hurt at-a-glance readability rather than help it. Crystal Points
// stays violet too — that's this app's consistent brand color for the
// points/rewards currency everywhere, not a page-specific accent.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/reports"];

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: COLORS.danger };
}

function StatBlock({ label, value }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{value}</div>
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function BandBadge({ band }) {
  if (!band) return <span style={{ fontSize: 10.5, color: COLORS.textMuted, fontStyle: "italic" }}>No grade yet</span>;
  return <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: band.color + "22", color: band.color }}>{band.label}</span>;
}

// Same inline SVG line chart as the class report — duplicated rather than
// shared since neither file imports from the other (matches how
// proficiencyBand is already duplicated across the reports pages).
function TrendChart({ series, labels, height = 170 }) {
  const width = 680;
  const padL = 32, padR = 10, padTop = 12, padBottom = 22;
  const plotW = width - padL - padR;
  const plotH = height - padTop - padBottom;
  const n = labels.length;
  const yMax = 100;
  const xFor = (i) => padL + (n > 1 ? (plotW * i) / (n - 1) : plotW / 2);
  const yFor = (v) => padTop + plotH * (1 - v / yMax);

  if (n === 0) {
    return <div style={{ fontSize: 13, color: COLORS.textMuted }}>Not enough data yet.</div>;
  }

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + plotH * (1 - frac);
        return (
          <g key={frac}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke={COLORS.border} strokeWidth={1} />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9.5} fill={COLORS.textMuted}>{Math.round(frac * yMax)}</text>
          </g>
        );
      })}
      {series.map((s) => {
        const segments = [];
        let current = [];
        labels.forEach((_, i) => {
          const v = s.values[i];
          if (v === null || v === undefined) {
            if (current.length > 1) segments.push(current);
            current = [];
          } else {
            current.push([xFor(i), yFor(v)]);
          }
        });
        if (current.length > 1) segments.push(current);
        return (
          <g key={s.label}>
            {segments.map((seg, si) => (
              <polyline key={si} points={seg.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {labels.map((_, i) => {
              const v = s.values[i];
              if (v === null || v === undefined) return null;
              return (
                <circle key={i} cx={xFor(i)} cy={yFor(v)} r={3.5} fill={s.color} stroke="white" strokeWidth={1.5}>
                  <title>{`${s.label} — ${s.pointTitles ? s.pointTitles[i] + ": " : ""}${v}%`}</title>
                </circle>
              );
            })}
          </g>
        );
      })}
      {labels.map((lab, i) => (
        <text key={i} x={xFor(i)} y={height - 4} textAnchor="middle" fontSize={9.5} fill={COLORS.textMuted}>{lab}</text>
      ))}
    </svg>
  );
}

export default function StudentReportPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.studentId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [report, setReport] = useState(null);
  const [shareStatus, setShareStatus] = useState("idle"); // idle | loading | copied | error
  const [shareError, setShareError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, studentId]);

  const load = useCallback(async (teacherId) => {
    setLoading(true);

    const { data: student } = await supabase.from("students").select("id, first_name, class_id, crystal_points").eq("id", studentId).maybeSingle();
    if (!student) { setNotFound(true); setLoading(false); return; }

    // Only this student's own teacher can view their report.
    const { data: cls } = await supabase.from("classes").select("id, name, teacher_id").eq("id", student.class_id).maybeSingle();
    if (!cls || cls.teacher_id !== teacherId) { setNotFound(true); setLoading(false); return; }

    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date, created_at").eq("class_id", student.class_id).order("created_at", { ascending: true });
    const assignmentIds = (assignments || []).map((a) => a.id);

    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let caseTitleMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
    }

    let submissions = [];
    let targetRows = [];
    if (assignmentIds.length > 0) {
      // ALL of the class's submissions (not just this student's) — needed
      // for the "vs. class average" line, and this student's own rows are
      // filtered back out of the same result below.
      const [{ data: subs }, { data: targets }] = await Promise.all([
        supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds),
        supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds),
      ]);
      submissions = subs || [];
      targetRows = targets || [];
    }

    const { data: tiers } = await supabase.from("badge_tiers").select("*").order("sort_order");

    const targetsMap = {};
    targetRows.forEach((t) => {
      if (!targetsMap[t.assignment_id]) targetsMap[t.assignment_id] = new Set();
      targetsMap[t.assignment_id].add(t.student_id);
    });
    function appliesToStudent(assignmentId) {
      const targetSet = targetsMap[assignmentId];
      if (!targetSet || targetSet.size === 0) return true;
      return targetSet.has(studentId);
    }
    function assignmentTitle(a) {
      return caseTitleMap[a.case_standard] || a.case_standard || "Untitled";
    }

    const applicable = (assignments || []).filter((a) => appliesToStudent(a.id));
    const labels = applicable.map((a) => new Date(a.due_date || a.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    const titles = applicable.map(assignmentTitle);

    const myScores = applicable.map((a) => {
      const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === studentId);
      if (!sub || !sub.released || sub.teacher_grade === null || sub.teacher_grade === undefined) return null;
      return Math.round((sub.teacher_grade / 2) * 100);
    });

    const classAvgSeries = applicable.map((a) => {
      const grades = submissions.filter((s) => s.assignment_id === a.id && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
      if (grades.length === 0) return null;
      return Math.round((grades.reduce((x, y) => x + y, 0) / grades.length / 2) * 100);
    });

    const missing = applicable.filter((a) => {
      const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === studentId);
      return !sub || !sub.submitted_at;
    }).map((a) => a.id);

    const graded = myScores.filter((v) => v !== null);
    const avgPct = graded.length > 0 ? Math.round(graded.reduce((a, b) => a + b, 0) / graded.length) : null;
    const band = avgPct !== null ? proficiencyBand(avgPct / 50) : null;

    const classGraded = classAvgSeries.filter((v) => v !== null);
    const classAveragePct = classGraded.length > 0 ? Math.round(classGraded.reduce((a, b) => a + b, 0) / classGraded.length) : null;

    const missionsCompleted = submissions.filter((s) => s.student_id === studentId && s.submitted_at && applicable.some((a) => a.id === s.assignment_id)).length;

    const standardKeys = [...new Set(applicable.map((a) => a.case_standard).filter(Boolean))];
    const standardRows = standardKeys.map((standard) => {
      const idsForStandard = applicable.filter((a) => a.case_standard === standard).map((a) => a.id);
      const grades = submissions.filter((s) => idsForStandard.includes(s.assignment_id) && s.student_id === studentId && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
      const title = caseTitleMap[standard] || standard;
      if (grades.length === 0) return { standard, title, avgPct: null, band: null };
      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
      return { standard, title, avgPct: Math.round((avg / 2) * 100), band: proficiencyBand(avg) };
    });

    // Sept 13 — badges now gate on missionsCompleted (already computed
    // above for this same report) instead of crystal_points, matching the
    // same change made to Home/My Progress/Crystal Vault. Crystal Points
    // stay in the report as their own separate stat below.
    const allTiers = tiers || [];
    const earnedTiers = allTiers.filter((t) => missionsCompleted >= t.threshold);
    const nextTier = allTiers.find((t) => missionsCompleted < t.threshold) || null;

    setReport({
      studentName: student.first_name,
      classId: cls.id,
      className: cls.name,
      crystalPoints: student.crystal_points || 0,
      earnedTiers,
      nextTier,
      assignmentCount: applicable.length,
      missionsCompleted,
      avgPct,
      band,
      classAveragePct,
      myScores,
      classAvgSeries,
      labels,
      titles,
      missingCount: missing.length,
      assignmentRows: applicable.map((a, i) => ({
        id: a.id,
        title: titles[i],
        standard: a.case_standard,
        dateLabel: labels[i],
        score: myScores[i],
        isMissing: missing.includes(a.id),
        band: myScores[i] !== null ? proficiencyBand(myScores[i] / 50) : null,
      })),
      standardRows,
    });
    setLoading(false);
  }, [studentId]);

  // Copies a public, no-login-required link to this one student's report
  // (app/report/[token]) — for a parent or admin. Get-or-create: the same
  // link is returned every time until "Regenerate" is used, so sharing it
  // twice doesn't create two different URLs.
  const handleCopyShareLink = useCallback(async (regenerate) => {
    setShareStatus("loading");
    setShareError("");
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) throw new Error("Your session expired — refresh the page and try again.");

      const res = await fetch("/api/teacher/reports/share-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, accessToken, regenerate: !!regenerate }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Couldn't create a share link.");

      const url = `${window.location.origin}/report/${json.token}`;
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2200);
    } catch (err) {
      setShareError(err.message || "Couldn't create a share link.");
      setShareStatus("error");
      setTimeout(() => setShareStatus("idle"), 3200);
    }
  }, [studentId]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  if (notFound) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textDark, textAlign: "center", padding: 20 }}>
        <div>
          <p>Couldn't find that student.</p>
          <button onClick={() => router.push("/teacher/reports")} style={{ background: ACCENT, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to Reports</button>
        </div>
      </div>
    );
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const delta = report.avgPct !== null && report.classAveragePct !== null ? report.avgPct - report.classAveragePct : null;

  // Sept 14 — same at-a-glance treatment as the class report: surfaces the
  // same numbers already computed above (band, missingCount) as a one-line
  // callout right under the title, instead of requiring a scroll down to
  // Assignment History to notice a student is struggling or has missing work.
  const atAGlance = [];
  if (report.band?.label === "Needs Support") atAGlance.push({ color: COLORS.danger, text: `Needs Support — ${report.avgPct}% average` });
  else if (report.band?.label === "Developing") atAGlance.push({ color: COLORS.violet, text: `Developing — ${report.avgPct}% average` });
  if (report.missingCount > 0) atAGlance.push({ color: COLORS.danger, text: `${report.missingCount} assignment${report.missingCount === 1 ? "" : "s"} not submitted` });
  if (atAGlance.length === 0) atAGlance.push({ color: COLORS.success, text: "✓ On track, nothing missing" });

  function jumpTo(id) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <BridgePage teacherEmail={teacherEmail} >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          .reports-shell { background: white !important; background-image: none !important; }
          body, main { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="no-print"><PageHeading title="Reports" subtitle={`${report.studentName}`}></PageHeading></div>

      <div className="cc-detail-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 800, margin: "0 auto 20px" }} className="no-print">
          <button onClick={() => router.push(`/teacher/reports/${report.classId}`)} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to {report.className}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
              <button
                onClick={() => handleCopyShareLink(false)}
                disabled={shareStatus === "loading"}
                className="gc-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: shareStatus === "copied" ? COLORS.success : COLORS.white,
                  color: shareStatus === "copied" ? COLORS.white : ACCENT,
                  border: `2px solid ${shareStatus === "copied" ? COLORS.success : ACCENT}`,
                  borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13.5,
                  opacity: shareStatus === "loading" ? 0.7 : 1,
                }}
              >
                {shareStatus === "copied" ? <Check size={16} /> : <Link2 size={16} />}
                {shareStatus === "loading" ? "Getting link…" : shareStatus === "copied" ? "Link Copied!" : "Copy Share Link"}
              </button>
              {shareStatus === "error" && <div style={{ fontSize: 11, color: COLORS.danger, maxWidth: 220, textAlign: "right" }}>{shareError}</div>}
              {(shareStatus === "idle" || shareStatus === "copied") && (
                <button onClick={() => handleCopyShareLink(true)} className="gc-btn" style={{ background: "none", color: COLORS.textMuted, fontSize: 10.5, fontWeight: 600, textDecoration: "underline", padding: 0 }}>
                  Reset link (invalidates the old one)
                </button>
              )}
            </div>
            <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
              <Printer size={16} /> Print / Save as PDF
            </button>
          </div>
        </div>

        <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 28px rgba(80,60,150,.16)" }}>
          <div style={{ marginBottom: 24 }}>
            <img src="/clearcenters_logo.png" alt="ClearCenters" style={{ height: 26, marginBottom: 10, display: "block" }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Student Report</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>{report.studentName}</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>{report.className} · Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}</div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {atAGlance.map((chip, i) => (
              <div key={i} style={{ fontSize: 12.5, fontWeight: 700, padding: "6px 14px", borderRadius: 999, background: chip.color + "18", color: chip.color }}>{chip.text}</div>
            ))}
          </div>

          <div className="no-print" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {[
              { id: "section-trend", label: "Trend" },
              { id: "section-assignments", label: "Assignments" },
              { id: "section-standards", label: "Standards" },
              { id: "section-badges", label: "Badges" },
            ].map((s) => (
              <button key={s.id} onClick={() => jumpTo(s.id)} className="gc-btn" style={{ background: "none", color: ACCENT, border: `1.5px solid ${ACCENT}55`, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 12 }}>
                {s.label} ↓
              </button>
            ))}
          </div>

          <div style={{ display: "flex", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
            <StatBlock label="Missions Completed" value={`${report.missionsCompleted} of ${report.assignmentCount}`} />
            <StatBlock label="Average Score" value={report.avgPct !== null ? `${report.avgPct}%` : "—"} />
            <StatBlock label="Band" value={report.band ? report.band.label : "No grade yet"} />
            <StatBlock label="vs. Class Average" value={delta !== null ? `${delta >= 0 ? "+" : ""}${delta} pts` : "—"} />
          </div>

          <div id="section-trend" style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Score Over Time</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>
              <span style={{ color: COLORS.violet, fontWeight: 700 }}>● {report.studentName}</span>{"  "}
              <span style={{ color: COLORS.teal, fontWeight: 700 }}>● Class Average</span>{"  "}
              — gaps mean the assignment wasn't submitted or hasn't been graded yet.
            </div>
            <TrendChart series={[
              { label: report.studentName, color: COLORS.violet, values: report.myScores, pointTitles: report.titles },
              { label: "Class Average", color: COLORS.teal, values: report.classAvgSeries, pointTitles: report.titles },
            ]} labels={report.labels} />
          </div>

          <div id="section-assignments" style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Assignment History</div>
            {report.assignmentRows.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>Nothing assigned yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 2 }}>
                {report.assignmentRows.map((r) => (
                  <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{r.title}</div>
                      <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{r.standard} · {r.dateLabel}</div>
                    </div>
                    {r.isMissing ? (
                      <span style={{ fontWeight: 700, color: COLORS.danger, fontSize: 12 }}>Not submitted</span>
                    ) : (
                      <>
                        <span style={{ fontWeight: 700 }}>{r.score !== null ? `${r.score}%` : "Pending"}</span>
                        <BandBadge band={r.band} />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div id="section-standards" style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Standards Mastery</div>
            {report.standardRows.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>No standards to show yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 2 }}>
                {report.standardRows.map((row) => (
                  <div key={row.standard} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                    <div style={{ fontWeight: 700 }}>{row.title} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({row.standard})</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {row.avgPct !== null && <span style={{ color: COLORS.textMuted }}>{row.avgPct}%</span>}
                      <BandBadge band={row.band} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div id="section-badges">
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Badges &amp; Crystal Points</div>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              {report.earnedTiers.length > 0 ? (
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  {report.earnedTiers.map((t) => (
                    <div key={t.id} style={{ textAlign: "center", width: 64 }}>
                      <img
                        src={`/badges/transparent/${t.tier_key}.png`}
                        alt={t.label}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = t.image_path; }}
                        style={{ width: 40, height: 40, objectFit: "contain", margin: "0 auto" }}
                      />
                      <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 4 }}>{t.label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>No badges earned yet.</div>
              )}
              <div style={{ borderLeft: `1px solid ${COLORS.border}`, paddingLeft: 22 }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.violet }}>✦ {report.crystalPoints}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>Crystal Points earned</div>
                {report.nextTier && (
                  <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 2 }}>{report.nextTier.threshold - report.missionsCompleted} more mission{report.nextTier.threshold - report.missionsCompleted === 1 ? "" : "s"} to {report.nextTier.label}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BridgePage>
  );
}
