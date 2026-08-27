"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Printer } from "lucide-react";
import { supabase } from "../../../../../lib/supabaseClient";
import TeacherSidebar from "../../../../../components/TeacherSidebar";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  success: "#22C55E",
  info: "#3D84F5",
  danger: "#E4574C",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

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
// shared since neither file imports from the other (matches how COLORS/
// proficiencyBand are already duplicated across the reports pages).
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

    const allTiers = tiers || [];
    const earnedTiers = allTiers.filter((t) => (student.crystal_points || 0) >= t.threshold);
    const nextTier = allTiers.find((t) => (student.crystal_points || 0) < t.threshold) || null;

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

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  if (notFound) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textDark, textAlign: "center", padding: 20 }}>
        <div>
          <p>Couldn't find that student.</p>
          <button onClick={() => router.push("/teacher/reports")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to Reports</button>
        </div>
      </div>
    );
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const delta = report.avgPct !== null && report.classAveragePct !== null ? report.avgPct - report.classAveragePct : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          body, main { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="no-print"><TeacherSidebar teacherEmail={teacherEmail} /></div>

      <main style={{ flex: 1, padding: "32px 36px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 800, margin: "0 auto 20px" }} className="no-print">
          <button onClick={() => router.push(`/teacher/reports/${report.classId}`)} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to {report.className}
          </button>
          <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>

        <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 4px 16px rgba(13,27,42,.08)" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ClearCenters Student Report</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>{report.studentName}</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>{report.className} · Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}</div>
          </div>

          <div style={{ display: "flex", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
            <StatBlock label="Missions Completed" value={`${report.missionsCompleted} of ${report.assignmentCount}`} />
            <StatBlock label="Average Score" value={report.avgPct !== null ? `${report.avgPct}%` : "—"} />
            <StatBlock label="Band" value={report.band ? report.band.label : "No grade yet"} />
            <StatBlock label="vs. Class Average" value={delta !== null ? `${delta >= 0 ? "+" : ""}${delta} pts` : "—"} />
          </div>

          <div style={{ marginBottom: 28 }}>
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

          <div style={{ marginBottom: 28 }}>
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

          <div style={{ marginBottom: 28 }}>
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

          <div>
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
                  <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 2 }}>{report.nextTier.threshold - report.crystalPoints} pts to {report.nextTier.label}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
