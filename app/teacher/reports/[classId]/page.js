"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import TeacherSidebar from "../../../../components/TeacherSidebar";

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

const BAND_ORDER = [
  { label: "Excellent", color: COLORS.success },
  { label: "Proficient", color: COLORS.info },
  { label: "Developing", color: COLORS.violet },
  { label: "Needs Support", color: COLORS.danger },
];

const RANGE_OPTIONS = [
  { key: "all", label: "All Time" },
  { key: "30", label: "Last 30 Days" },
  { key: "90", label: "Last 90 Days" },
  { key: "custom", label: "Custom Range" },
];

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: COLORS.danger };
}

function StatBlock({ label, value }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{value}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function BandBar({ counts }) {
  const total = BAND_ORDER.reduce((sum, b) => sum + (counts[b.label] || 0), 0);
  if (total === 0) {
    return <div style={{ fontSize: 13, color: COLORS.textMuted }}>No released grades yet.</div>;
  }
  return (
    <div>
      <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
        {BAND_ORDER.map(({ label, color }) => {
          const count = counts[label] || 0;
          if (count === 0) return null;
          return <div key={label} title={`${label}: ${count}`} style={{ width: `${(100 * count) / total}%`, background: color }} />;
        })}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12 }}>
        {BAND_ORDER.map(({ label, color }) => (
          (counts[label] || 0) > 0 && (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: color }} />
              {label} ({counts[label]})
            </div>
          )
        ))}
      </div>
    </div>
  );
}

// Simple inline SVG line chart — no charting library dependency. Handles
// gaps (null values, e.g. a not-yet-graded or not-submitted assignment) by
// breaking the line rather than drawing a misleading connector across them.
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
    return <div style={{ fontSize: 13, color: COLORS.textMuted }}>Not enough data yet for this range.</div>;
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
                  <title>{`${s.pointTitles ? s.pointTitles[i] + ": " : ""}${v}%`}</title>
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

export default function ClassReportPage() {
  const router = useRouter();
  const params = useParams();
  const classId = params.classId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [className, setClassName] = useState("");
  const [rawStudents, setRawStudents] = useState([]);
  const [rawAssignments, setRawAssignments] = useState([]);
  const [rawSubmissions, setRawSubmissions] = useState([]);
  const [targetsByAssignment, setTargetsByAssignment] = useState({});
  const [caseTitleMap, setCaseTitleMap] = useState({});

  const [range, setRange] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, classId]);

  const load = useCallback(async (teacherId) => {
    setLoading(true);

    // Only this teacher's own class — never generate a report for a class
    // that isn't yours, even if you know its id.
    const { data: cls } = await supabase.from("classes").select("id, name, teacher_id").eq("id", classId).single();
    if (!cls || cls.teacher_id !== teacherId) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setClassName(cls.name);

    const { data: students } = await supabase.from("students").select("id, first_name").eq("class_id", classId);
    const studentIds = (students || []).map((s) => s.id);

    // Ascending so the trend chart and every other "over time" view reads
    // left-to-right chronologically. created_at is always populated (unlike
    // due_date, which a teacher can leave blank), so it's the date field
    // used for both the x-axis and the date-range filter below.
    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date, created_at").eq("class_id", classId).order("created_at", { ascending: true });
    const assignmentIds = (assignments || []).map((a) => a.id);

    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let titleMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      titleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
    }

    let submissions = [];
    let targetRows = [];
    if (assignmentIds.length > 0) {
      const [{ data: subs }, { data: targets }] = await Promise.all([
        supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds),
        supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds),
      ]);
      submissions = subs || [];
      targetRows = targets || [];
    }

    const targetsMap = {};
    targetRows.forEach((t) => {
      if (!targetsMap[t.assignment_id]) targetsMap[t.assignment_id] = new Set();
      targetsMap[t.assignment_id].add(t.student_id);
    });

    setRawStudents(students || []);
    setRawAssignments(assignments || []);
    setRawSubmissions(submissions);
    setTargetsByAssignment(targetsMap);
    setCaseTitleMap(titleMap);
    setLoading(false);
  }, [classId]);

  const rangeStart = useMemo(() => {
    const now = new Date();
    if (range === "30") { const d = new Date(now); d.setDate(d.getDate() - 30); return d; }
    if (range === "90") { const d = new Date(now); d.setDate(d.getDate() - 90); return d; }
    if (range === "custom" && customFrom) return new Date(customFrom);
    return null;
  }, [range, customFrom]);

  const rangeEnd = useMemo(() => {
    if (range === "custom" && customTo) { const d = new Date(customTo); d.setHours(23, 59, 59, 999); return d; }
    return null;
  }, [range, customTo]);

  const report = useMemo(() => {
    const assignments = rawAssignments.filter((a) => {
      const d = new Date(a.created_at);
      if (rangeStart && d < rangeStart) return false;
      if (rangeEnd && d > rangeEnd) return false;
      return true;
    });
    const assignmentIds = new Set(assignments.map((a) => a.id));
    const submissions = rawSubmissions.filter((s) => assignmentIds.has(s.assignment_id));
    const studentIds = rawStudents.map((s) => s.id);

    function applicableIdsFor(assignmentId) {
      const targetSet = targetsByAssignment[assignmentId];
      return targetSet && targetSet.size > 0 ? [...targetSet] : studentIds;
    }
    function assignmentTitle(a) {
      return caseTitleMap[a.case_standard] || a.case_standard || "Untitled";
    }

    const labels = assignments.map((a) => new Date(a.due_date || a.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    const titles = assignments.map(assignmentTitle);

    // Completion rate — real submits vs. how many student-assignment pairs
    // were actually applicable (respecting per-student targeting).
    const totalApplicable = assignments.reduce((sum, a) => sum + applicableIdsFor(a.id).length, 0);
    const totalCompleted = submissions.filter((s) => s.submitted_at).length;
    const completionPct = totalApplicable > 0 ? Math.round((totalCompleted / totalApplicable) * 100) : 0;

    // Per-assignment class average (released grades only) — powers the
    // trend chart and lines up with the same "released + graded" rule used
    // everywhere else in the app.
    const classWeeklyAvg = assignments.map((a) => {
      const grades = submissions.filter((s) => s.assignment_id === a.id && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
      if (grades.length === 0) return null;
      return Math.round((grades.reduce((x, y) => x + y, 0) / grades.length / 2) * 100);
    });

    // Missing work — applicable students who never actually submitted,
    // independent of whether an existing submission has been graded yet.
    const missingWork = assignments.map((a) => {
      const applicable = new Set(applicableIdsFor(a.id));
      const submittedIds = new Set(submissions.filter((s) => s.assignment_id === a.id && s.submitted_at).map((s) => s.student_id));
      const missingIds = [...applicable].filter((id) => !submittedIds.has(id));
      const nameById = Object.fromEntries(rawStudents.map((s) => [s.id, s.first_name]));
      return { assignmentId: a.id, title: assignmentTitle(a), missing: missingIds.map((id) => nameById[id] || "Unknown") };
    });

    // Per-student rollup: score at each assignment (for the trend line),
    // overall average/band, and which applicable assignments they never
    // submitted.
    const studentRows = rawStudents.map((st) => {
      const scores = assignments.map((a) => {
        const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === st.id);
        if (!sub || !sub.released || sub.teacher_grade === null || sub.teacher_grade === undefined) return null;
        return Math.round((sub.teacher_grade / 2) * 100);
      });
      const graded = scores.filter((v) => v !== null);
      const avgPct = graded.length > 0 ? Math.round(graded.reduce((a, b) => a + b, 0) / graded.length) : null;
      const missionsCompleted = submissions.filter((s) => s.student_id === st.id && s.submitted_at).length;
      const missingTitles = assignments.filter((a) => {
        const applicable = applicableIdsFor(a.id).includes(st.id);
        if (!applicable) return false;
        const sub = submissions.find((s) => s.assignment_id === a.id && s.student_id === st.id);
        return !sub || !sub.submitted_at;
      }).map(assignmentTitle);
      return {
        id: st.id,
        name: st.first_name,
        scores,
        avgPct,
        band: avgPct !== null ? proficiencyBand(avgPct / 50) : null,
        missionsCompleted,
        missingTitles,
      };
    }).sort((a, b) => (a.avgPct ?? -1) - (b.avgPct ?? -1));

    const releasedAll = submissions.filter((s) => s.released && s.teacher_grade !== null && s.teacher_grade !== undefined);
    const classAverage = releasedAll.length > 0 ? Math.round((releasedAll.reduce((sum, s) => sum + s.teacher_grade, 0) / releasedAll.length / 2) * 100) : null;

    const bandCounts = { Excellent: 0, Proficient: 0, Developing: 0, "Needs Support": 0 };
    studentRows.forEach((r) => { if (r.band) bandCounts[r.band.label] += 1; });

    // Standards summary — now a band breakdown (how many kids are at each
    // level on this standard) rather than one blended average, so it
    // actually shows who needs re-teaching. Sorted so the standards with
    // the most Developing/Needs Support students surface first.
    const standardKeys = [...new Set(assignments.map((a) => a.case_standard).filter(Boolean))];
    const standardRows = standardKeys.map((standard) => {
      const idsForStandard = assignments.filter((a) => a.case_standard === standard).map((a) => a.id);
      const counts = { Excellent: 0, Proficient: 0, Developing: 0, "Needs Support": 0 };
      let gradedStudents = 0;
      rawStudents.forEach((st) => {
        const grades = submissions.filter((s) => idsForStandard.includes(s.assignment_id) && s.student_id === st.id && s.released && s.teacher_grade !== null && s.teacher_grade !== undefined).map((s) => s.teacher_grade);
        if (grades.length === 0) return;
        gradedStudents += 1;
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        counts[proficiencyBand(avg).label] += 1;
      });
      const struggling = counts["Developing"] + counts["Needs Support"];
      const title = caseTitleMap[standard] || standard;
      return { standard, title, counts, gradedStudents, strugglingFrac: gradedStudents > 0 ? struggling / gradedStudents : 0 };
    }).filter((r) => r.gradedStudents > 0).sort((a, b) => b.strugglingFrac - a.strugglingFrac);

    return {
      studentCount: rawStudents.length,
      assignmentCount: assignments.length,
      classAverage,
      completionPct,
      bandCounts,
      studentRows,
      standardRows,
      missingWork,
      classWeeklyAvg,
      labels,
      titles,
    };
  }, [rawStudents, rawAssignments, rawSubmissions, targetsByAssignment, caseTitleMap, rangeStart, rangeEnd]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  if (notFound) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textDark, textAlign: "center", padding: 20 }}>
        <div>
          <p>Couldn't find that class.</p>
          <button onClick={() => router.push("/teacher/reports")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to Reports</button>
        </div>
      </div>
    );
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        details.gc-missing summary { cursor: pointer; list-style: none; }
        details.gc-missing summary::-webkit-details-marker { display: none; }
        .print-only { display: none; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body, main { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div className="no-print"><TeacherSidebar teacherEmail={teacherEmail} /></div>

      <main style={{ flex: 1, padding: "32px 36px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 800, margin: "0 auto 20px", flexWrap: "wrap", gap: 12 }} className="no-print">
          <button onClick={() => router.push("/teacher/reports")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to Reports
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {RANGE_OPTIONS.map((opt) => (
                <button key={opt.key} onClick={() => setRange(opt.key)} className="gc-btn" style={{
                  background: range === opt.key ? COLORS.violet : COLORS.white,
                  color: range === opt.key ? COLORS.white : COLORS.textDark,
                  border: range === opt.key ? "none" : `1px solid ${COLORS.border}`,
                  borderRadius: 999, padding: "7px 14px", fontWeight: 700, fontSize: 12,
                }}>{opt.label}</button>
              ))}
            </div>
            <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
              <Printer size={16} /> Print / Save as PDF
            </button>
          </div>
        </div>

        {range === "custom" && (
          <div className="no-print" style={{ maxWidth: 800, margin: "-8px auto 20px", display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: COLORS.textMuted }}>
            From <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontFamily: "inherit" }} />
            to <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} style={{ padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontFamily: "inherit" }} />
          </div>
        )}

        <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 4px 16px rgba(13,27,42,.08)" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ClearCenters Class Report</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>{className}</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}{range !== "all" ? ` · ${RANGE_OPTIONS.find((o) => o.key === range)?.label}` : ""}</div>
          </div>

          <div style={{ display: "flex", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
            <StatBlock label="Students" value={report.studentCount} />
            <StatBlock label="Assignments" value={report.assignmentCount} />
            <StatBlock label="Class Average" value={report.classAverage !== null ? `${report.classAverage}%` : "—"} />
            <StatBlock label="Completion Rate" value={`${report.completionPct}%`} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Class Average Over Time</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>One point per assignment — shows growth instead of just a single snapshot number.</div>
            <TrendChart series={[{ label: "Class Average", color: COLORS.violet, values: report.classWeeklyAvg, pointTitles: report.titles }]} labels={report.labels} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Class Performance</div>
            <BandBar counts={report.bandCounts} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Missing Work</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>Click an assignment to see who still owes it.</div>
            {report.missingWork.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>No assignments in this range.</div>
            ) : (
              <div>
                {report.missingWork.map((m) => (
                  m.missing.length === 0 ? (
                    <div key={m.assignmentId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 4px", borderBottom: `1px solid ${COLORS.border}`, opacity: 0.55 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.title}</div>
                      <div style={{ fontSize: 11.5, color: COLORS.success, fontWeight: 700 }}>✓ everyone submitted</div>
                    </div>
                  ) : (
                    <details key={m.assignmentId} className="gc-missing no-print-open" style={{ padding: "10px 4px", borderBottom: `1px solid ${COLORS.border}` }}>
                      <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{m.title}</span>
                        <span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: COLORS.danger + "18", color: COLORS.danger }}>{m.missing.length} missing</span>
                      </summary>
                      <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>{m.missing.join(", ")}</div>
                    </details>
                  )
                ))}
              </div>
            )}
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Standards Summary</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>Sorted so standards with the most kids still Developing or Needing Support show up first.</div>
            {report.standardRows.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>No released grades yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {report.standardRows.map((row) => (
                  <div key={row.standard}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{row.title} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({row.standard})</span></div>
                    <BandBar counts={row.counts} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Student Summary</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }} className="no-print">Click any student to preview their trend and missing work — or open their full standalone report.</div>
            <div style={{ display: "grid", gap: 2 }}>
              {report.studentRows.map((r) => (
                <div key={r.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <button
                    onClick={() => setExpanded((e) => ({ ...e, [r.id]: !e[r.id] }))}
                    className="gc-btn no-print"
                    style={{ display: "flex", alignItems: "center", width: "100%", gap: 10, padding: "10px 4px", background: "none", textAlign: "left", font: "inherit", color: "inherit" }}
                  >
                    <ChevronRight size={14} style={{ color: COLORS.textMuted, transform: expanded[r.id] ? "rotate(90deg)" : "none", transition: "transform 150ms ease", flexShrink: 0 }} />
                    <div style={{ width: 140, fontWeight: 600, fontSize: 12.5 }}>{r.name}</div>
                    <div style={{ width: 110, color: COLORS.textMuted, fontSize: 12.5 }}>{r.missionsCompleted} submitted</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ width: 40, fontWeight: 700, textAlign: "right", fontSize: 12.5 }}>{r.avgPct !== null ? `${r.avgPct}%` : "—"}</div>
                    {r.band ? (
                      <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: r.band.color + "22", color: r.band.color, marginLeft: 10 }}>{r.band.label}</span>
                    ) : (
                      <span style={{ fontSize: 10.5, color: COLORS.textMuted, marginLeft: 10 }}>No grades yet</span>
                    )}
                  </button>
                  {/* print-only flat row, since the interactive button above is hidden when printing */}
                  <div className="print-only" style={{ display: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", fontSize: 12.5 }}>
                      <div style={{ width: 140, fontWeight: 600 }}>{r.name}</div>
                      <div style={{ width: 110, color: COLORS.textMuted }}>{r.missionsCompleted} submitted</div>
                      <div style={{ flex: 1 }} />
                      <div style={{ width: 40, fontWeight: 700, textAlign: "right" }}>{r.avgPct !== null ? `${r.avgPct}%` : "—"}</div>
                      {r.band ? (
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: r.band.color + "22", color: r.band.color }}>{r.band.label}</span>
                      ) : (
                        <span style={{ fontSize: 10.5, color: COLORS.textMuted }}>No grades yet</span>
                      )}
                    </div>
                  </div>
                  {expanded[r.id] && (
                    <div className="no-print" style={{ padding: "6px 4px 16px 24px", display: "flex", gap: 24, flexWrap: "wrap" }}>
                      <div style={{ width: 300 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", marginBottom: 4 }}>Trend</div>
                        <TrendChart series={[{ label: r.name, color: COLORS.violet, values: r.scores, pointTitles: report.titles }]} labels={report.labels} height={100} />
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        {r.missingTitles.length > 0 ? (
                          <div style={{ fontSize: 12, color: COLORS.danger }}><b>Missing:</b> {r.missingTitles.join(", ")}</div>
                        ) : (
                          <div style={{ fontSize: 12, color: COLORS.success }}>✓ Nothing missing</div>
                        )}
                        <button onClick={() => router.push(`/teacher/reports/student/${r.id}`)} className="gc-btn" style={{ marginTop: 10, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5 }}>
                          View Full Report →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
