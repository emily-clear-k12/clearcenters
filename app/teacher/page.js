"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherPageBanner from "../../components/TeacherPageBanner";

const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  aqua: "#4DD6FF",
  gold: "#FFC44D",
  success: "#22C55E",
  warning: "#FF9F43",
  info: "#3D84F5",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

function proficiencyBand(avg) {
  if (avg >= 1.8) return { label: "Excellent", color: COLORS.success };
  if (avg >= 1.4) return { label: "Proficient", color: COLORS.info };
  if (avg >= 1.0) return { label: "Developing", color: COLORS.violet };
  return { label: "Needs Support", color: "#E4574C" };
}

function Card({ children, style }) {
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20, boxShadow: "0 4px 16px rgba(13,27,42,.06)", ...style }}>
      {children}
    </div>
  );
}

function Donut({ segments, size = 150, centerLabel, centerSub }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let acc = 0;
  const stops = segments.map((seg) => {
    const start = (acc / total) * 360;
    acc += seg.value;
    const end = (acc / total) * 360;
    return `${seg.color} ${start}deg ${end}deg`;
  });
  const gradient = stops.length > 0 ? `conic-gradient(${stops.join(", ")})` : `conic-gradient(${COLORS.border} 0deg 360deg)`;
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: "50%", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: size * 0.66, height: size * 0.66, borderRadius: "50%", background: COLORS.white, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size * 0.19, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{centerLabel}</div>
        {centerSub && <div style={{ fontSize: 11, color: COLORS.textMuted, textAlign: "center" }}>{centerSub}</div>}
      </div>
    </div>
  );
}

const POINT_PRESETS = [5, 10, 25, 50];

function AwardPointsModal({ open, classes, rawStudents, defaultClassId, awarding, onCancel, onAward }) {
  const [classId, setClassId] = useState(defaultClassId || (classes[0] && classes[0].id) || "");
  const [mode, setMode] = useState("class"); // "class" | "student"
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    if (open) {
      setClassId(defaultClassId || (classes[0] && classes[0].id) || "");
      setMode("class");
      setStudentId("");
      setAmount(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const classStudents = rawStudents.filter((s) => s.class_id === classId);
  const selectedClass = classes.find((c) => c.id === classId);
  const canAward = amount > 0 && classId && (mode === "class" ? classStudents.length > 0 : !!studentId);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(440px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.textDark, marginBottom: 4 }}>🔮 Award Crystal Points</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 18 }}>Give a class or a single student a bonus — great for a great question, a kind classmate moment, or anything else that doesn't fit a rubric.</div>

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6 }}>Class</label>
        <select value={classId} onChange={(e) => { setClassId(e.target.value); setStudentId(""); }} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button type="button" className="gc-btn" onClick={() => setMode("class")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: mode === "class" ? COLORS.violet : COLORS.canvas, color: mode === "class" ? COLORS.white : COLORS.textDark }}>
            Whole Class{selectedClass ? ` (${classStudents.length})` : ""}
          </button>
          <button type="button" className="gc-btn" onClick={() => setMode("student")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: mode === "student" ? COLORS.violet : COLORS.canvas, color: mode === "student" ? COLORS.white : COLORS.textDark }}>
            One Student
          </button>
        </div>

        {mode === "student" && (
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
            <option value="">Choose a student...</option>
            {classStudents.map((s) => <option key={s.id} value={s.id}>{s.first_name}</option>)}
          </select>
        )}

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6 }}>Points</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {POINT_PRESETS.map((p) => (
            <button key={p} type="button" className="gc-btn" onClick={() => setAmount(p)} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: amount === p ? COLORS.gold : COLORS.canvas, color: COLORS.textDark }}>
              +{p}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 18, fontFamily: "inherit", boxSizing: "border-box" }}
        />

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="gc-btn" style={{ background: COLORS.canvas, color: COLORS.textDark, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Cancel</button>
          <button
            onClick={() => onAward({ classId, mode, studentId, amount, studentCount: classStudents.length })}
            disabled={!canAward || awarding}
            className="gc-btn"
            style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5, opacity: canAward ? 1 : 0.5 }}
          >
            {awarding ? "Awarding..." : `Award +${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeacherOverview() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [error, setError] = useState(null);

  // Raw data straight from Supabase, unfiltered by class. Everything the
  // dashboard displays is derived from this via the `dashboard` memo below,
  // filtered down to whichever class tab is selected — that's what keeps
  // the Class Performance donut (and everything else) from blending every
  // class's numbers together.
  const [classes, setClasses] = useState([]);
  const [rawStudents, setRawStudents] = useState([]);
  const [rawAssignments, setRawAssignments] = useState([]);
  const [rawSubmissions, setRawSubmissions] = useState([]);
  const [targetsByAssignment, setTargetsByAssignment] = useState({});
  const [caseMap, setCaseMap] = useState({});
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awarding, setAwarding] = useState(false);
  const [awardSuccess, setAwardSuccess] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);
      setLoadingAuth(false);
    });
  }, [router]);

  const loadDashboard = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);

    // Only THIS teacher's own classes — otherwise every teacher using the
    // app would see every other teacher's students and classes mixed in.
    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classesData || []).map((c) => c.id);
    setClasses(classesData || []);

    let students = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, first_name, class_id, crystal_points").in("class_id", classIds);
      students = data || [];
    }
    setRawStudents(students);

    let assignments = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("assignments").select("id, case_standard, due_date, class_id, created_at").in("class_id", classIds).order("created_at", { ascending: false });
      assignments = data || [];
    }
    setRawAssignments(assignments);

    const caseStandards = [...new Set(assignments.map((a) => a.case_standard).filter(Boolean))];
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      setCaseMap(Object.fromEntries((cases || []).map((c) => [c.standard, c.title])));
    } else {
      setCaseMap({});
    }

    const assignmentIds = assignments.map((a) => a.id);
    let allSubmissions = [];
    let targetRows = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested").in("assignment_id", assignmentIds);
      allSubmissions = data || [];
      const { data: targets } = await supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds);
      targetRows = targets || [];
    }
    setRawSubmissions(allSubmissions);

    const targetsMap = {};
    targetRows.forEach((t) => {
      if (!targetsMap[t.assignment_id]) targetsMap[t.assignment_id] = new Set();
      targetsMap[t.assignment_id].add(t.student_id);
    });
    setTargetsByAssignment(targetsMap);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadDashboard(teacherId);
  }, [loadingAuth, teacherId, loadDashboard]);

  async function handleAwardPoints({ classId, mode, studentId, amount, studentCount }) {
    setAwarding(true);
    const targetIds = mode === "student" ? [studentId] : rawStudents.filter((s) => s.class_id === classId).map((s) => s.id);

    // Same increment_crystal_points() function the grade-release flow uses —
    // one RPC call per student so a class award can't race with itself.
    await Promise.all(targetIds.map((id) => supabase.rpc("increment_crystal_points", { p_student_id: id, p_amount: amount })));

    setAwarding(false);
    setAwardModalOpen(false);
    const className = classMap[classId] || "the class";
    setAwardSuccess(mode === "student" ? `+${amount} points awarded!` : `+${amount} points awarded to all ${targetIds.length} students in ${className}!`);
    if (teacherId) await loadDashboard(teacherId);
    setTimeout(() => setAwardSuccess(null), 4000);
  }

  const classMap = React.useMemo(() => Object.fromEntries(classes.map((c) => [c.id, c.name])), [classes]);
  const studentMap = React.useMemo(() => Object.fromEntries(rawStudents.map((s) => [s.id, s.first_name])), [rawStudents]);

  // Everything the page renders is computed here, scoped to the selected
  // class tab ("all" combines every class, same as the old behavior).
  const dashboard = React.useMemo(() => {
    function applicableStudentIdsFor(assignment) {
      const targetSet = targetsByAssignment[assignment.id];
      const classStudents = rawStudents.filter((st) => st.class_id === assignment.class_id).map((st) => st.id);
      if (!targetSet || targetSet.size === 0) return classStudents;
      return classStudents.filter((id) => targetSet.has(id));
    }

    const students = selectedClassId === "all" ? rawStudents : rawStudents.filter((s) => s.class_id === selectedClassId);
    const assignments = selectedClassId === "all" ? rawAssignments : rawAssignments.filter((a) => a.class_id === selectedClassId);
    const assignmentIds = new Set(assignments.map((a) => a.id));
    const submissions = rawSubmissions.filter((s) => assignmentIds.has(s.assignment_id));

    // A submission that's been sent back for revision has already been
    // reviewed once — it's now waiting on the student, not on the
    // teacher, so it's excluded here rather than cluttering this queue.
    const pending = submissions
      .filter((s) => s.submitted_at && !s.revision_requested && (s.teacher_grade === null || s.teacher_grade === undefined))
      .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
      .map((s) => ({ ...s, studentName: studentMap[s.student_id] || "Unknown" }));

    const released = submissions.filter((s) => s.released && s.teacher_grade !== null && s.teacher_grade !== undefined);
    const classAverage = released.length > 0 ? Math.round((released.reduce((sum, s) => sum + s.teacher_grade, 0) / released.length / 2) * 100) : null;

    const byStudent = {};
    released.forEach((s) => {
      if (!byStudent[s.student_id]) byStudent[s.student_id] = [];
      byStudent[s.student_id].push(s.teacher_grade);
    });
    const bandCounts = { Excellent: 0, Proficient: 0, Developing: 0, "Needs Support": 0 };
    const insights = [];
    Object.entries(byStudent).forEach(([studentId, grades]) => {
      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
      const band = proficiencyBand(avg);
      bandCounts[band.label] += 1;
      insights.push({ studentId, name: studentMap[studentId] || "Unknown", avgPct: Math.round((avg / 2) * 100), band });
    });
    insights.sort((a, b) => a.avgPct - b.avgPct);

    const recentAssignments = assignments.slice(0, 5).map((a) => {
      const subsForA = rawSubmissions.filter((s) => s.assignment_id === a.id);
      const submittedCount = subsForA.filter((s) => s.submitted_at).length;
      const releasedForA = subsForA.filter((s) => s.released && s.teacher_grade !== null && s.teacher_grade !== undefined);
      const avgForA = releasedForA.length > 0 ? Math.round((releasedForA.reduce((sum, s) => sum + s.teacher_grade, 0) / releasedForA.length / 2) * 100) : null;
      const rosterSize = applicableStudentIdsFor(a).length;
      return { id: a.id, title: caseMap[a.case_standard] || a.case_standard, standard: a.case_standard, className: classMap[a.class_id], dueDate: a.due_date, submittedCount, rosterSize, avgForA };
    });

    let completionDonut = { completed: 0, inProgress: 0, notStarted: 0 };
    if (assignments.length > 0) {
      const mostRecent = assignments[0];
      const applicable = applicableStudentIdsFor(mostRecent);
      const subs = rawSubmissions.filter((s) => s.assignment_id === mostRecent.id && applicable.includes(s.student_id));
      const completed = subs.filter((s) => s.submitted_at).length;
      const inProgress = subs.filter((s) => !s.submitted_at).length;
      const notStarted = Math.max(0, applicable.length - completed - inProgress);
      completionDonut = { completed, inProgress, notStarted };
    }

    // Same released-grade rollup as the Reports/Progress "By Standard"
    // views, just scoped to whichever class tab is selected here ("all"
    // pools every class together, same as the rest of this dashboard) —
    // gives a quick "which standards need reteaching" read without a click.
    const assignmentStandardMap = Object.fromEntries(assignments.map((a) => [a.id, a.case_standard]));
    const byStandard = {};
    released.forEach((s) => {
      const standard = assignmentStandardMap[s.assignment_id];
      if (!standard) return;
      if (!byStandard[standard]) byStandard[standard] = [];
      byStandard[standard].push(s.teacher_grade);
    });
    const standardRows = Object.entries(byStandard).map(([standard, grades]) => {
      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
      return { standard, title: caseMap[standard] || standard, avgPct: Math.round((avg / 2) * 100), band: proficiencyBand(avg), gradedCount: grades.length };
    }).sort((a, b) => a.avgPct - b.avgPct);

    return {
      studentCount: students.length,
      totalCrystalPoints: students.reduce((sum, s) => sum + (s.crystal_points || 0), 0),
      assignmentCount: assignments.length,
      pendingSubmissions: pending,
      classAverage,
      bandCounts,
      studentInsights: insights.slice(0, 5),
      recentAssignments,
      completionDonut,
      standardRows,
    };
  }, [selectedClassId, rawStudents, rawAssignments, rawSubmissions, targetsByAssignment, caseMap, classMap, studentMap]);

  const {
    studentCount,
    totalCrystalPoints,
    assignmentCount,
    pendingSubmissions,
    classAverage,
    bandCounts,
    studentInsights,
    recentAssignments,
    completionDonut,
    standardRows,
  } = dashboard;

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>
        Loading...
      </div>
    );
  }

  const pendingCount = pendingSubmissions.length;
  const teacherFirstName = teacherEmail.split("@")[0];
  const completionTotal = completionDonut.completed + completionDonut.inProgress + completionDonut.notStarted;
  const completionPct = completionTotal > 0 ? Math.round((completionDonut.completed / completionTotal) * 100) : 0;
  const bandTotal = Object.values(bandCounts).reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-fade-in { animation: gcFadeIn 220ms ease-out; }
        @keyframes gcFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>

      <TeacherSidebar teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 1450, margin: "0 auto" }}>
        {error && <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}

        <TeacherPageBanner>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, color: COLORS.textDark, margin: "0 0 6px 0" }}>
              Welcome back{teacherFirstName ? `, ${teacherFirstName}` : ""}!
            </h1>
            <p style={{ fontSize: 15, color: COLORS.textMuted, margin: 0 }}>Here's what's happening in your classes today.</p>
          </div>
        </TeacherPageBanner>

        {classes.length > 1 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <button
              className="gc-btn"
              onClick={() => setSelectedClassId("all")}
              style={{ background: selectedClassId === "all" ? COLORS.violet : COLORS.white, color: selectedClassId === "all" ? COLORS.white : COLORS.textDark, border: selectedClassId === "all" ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13 }}
            >
              All Classes
            </button>
            {classes.map((c) => (
              <button
                key={c.id}
                className="gc-btn"
                onClick={() => setSelectedClassId(c.id)}
                style={{ background: selectedClassId === c.id ? COLORS.violet : COLORS.white, color: selectedClassId === c.id ? COLORS.white : COLORS.textDark, border: selectedClassId === c.id ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13 }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <Card style={{ display: "flex", padding: "18px 8px", marginBottom: 20, gap: 8 }}>
          {[
            { icon: "/teacher/metric_students.png", value: studentCount, label: "Students" },
            { icon: "/teacher/metric_class_average.png", value: classAverage !== null ? `${classAverage}%` : "—", label: "Class Average", sub: classAverage === null ? "No released grades yet" : null },
            { icon: "/teacher/metric_active_assignments.png", value: assignmentCount, label: "Active Assignments" },
            { icon: "/teacher/metric_needs_review.png", value: pendingCount, label: "Needs Review" },
            { icon: "/teacher/metric_crystal_points.png", value: totalCrystalPoints, label: "Crystal Points" },
          ].map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, padding: "8px 14px", borderRight: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
              <img src={m.icon} alt="" style={{ width: 44, height: 44, objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark, lineHeight: 1.1 }}>{m.value}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted, fontWeight: 600 }}>{m.label}</div>
                {m.sub && <div style={{ fontSize: 10, color: COLORS.textMuted, fontStyle: "italic" }}>{m.sub}</div>}
              </div>
            </div>
          ))}
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr 1fr", gap: 16, marginBottom: 16 }}>
          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Class Performance Overview</div>
            {bandTotal > 0 ? (
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <Donut
                  segments={[
                    { value: bandCounts.Excellent, color: COLORS.success },
                    { value: bandCounts.Proficient, color: COLORS.info },
                    { value: bandCounts.Developing, color: COLORS.violet },
                    { value: bandCounts["Needs Support"], color: "#E4574C" },
                  ]}
                  centerLabel={`${classAverage}%`}
                  centerSub="Average"
                />
                <div style={{ flex: 1, display: "grid", gap: 6 }}>
                  {[
                    ["Excellent (90–100%)", bandCounts.Excellent, COLORS.success],
                    ["Proficient (70–89%)", bandCounts.Proficient, COLORS.info],
                    ["Developing (50–69%)", bandCounts.Developing, COLORS.violet],
                    ["Needs Support (<50%)", bandCounts["Needs Support"], "#E4574C"],
                  ].map(([label, count, color]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <div style={{ flex: 1, color: COLORS.textDark }}>{label}</div>
                      <div style={{ fontWeight: 700 }}>{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "20px 0", textAlign: "center" }}>No released grades yet — this fills in once you release some.</div>
            )}
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Student Progress Insights</div>
              <button onClick={() => router.push("/teacher/progress")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700 }}>View All</button>
            </div>
            {studentInsights.length > 0 ? (
              <div style={{ display: "grid", gap: 10 }}>
                {studentInsights.map((s) => (
                  <div key={s.studentId} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 12, flexShrink: 0 }}>{s.name[0]}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, width: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                    <div style={{ flex: 1, height: 6, background: COLORS.border, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.avgPct}%`, background: s.band.color, borderRadius: 999 }} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, width: 34, textAlign: "right" }}>{s.avgPct}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "20px 0", textAlign: "center" }}>No released grades yet.</div>
            )}
          </Card>

          <Card>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Assignment Completion</div>
            {completionTotal > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <Donut
                  segments={[
                    { value: completionDonut.completed, color: COLORS.violet },
                    { value: completionDonut.inProgress, color: COLORS.info },
                    { value: completionDonut.notStarted, color: COLORS.warning },
                  ]}
                  centerLabel={`${completionPct}%`}
                  centerSub="Completed"
                />
                <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>{completionDonut.completed} / {completionTotal} students · most recent assignment</div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "20px 0", textAlign: "center" }}>Assign a case to see completion here.</div>
            )}
          </Card>
        </div>

        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Standards at a Glance</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>Released grades, rolled up by standard{selectedClassId === "all" && classes.length > 1 ? " · all classes" : ""}.</div>
            </div>
            <button onClick={() => router.push("/teacher/reports/standards")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap" }}>Full Standards Report →</button>
          </div>
          {standardRows.length > 0 ? (
            <div style={{ display: "grid", gap: 4 }}>
              {standardRows.slice(0, 5).map((row) => (
                <div key={row.standard} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ width: 220, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.title}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{row.standard} · {row.gradedCount} graded</div>
                  </div>
                  <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${row.avgPct}%`, background: row.band.color, borderRadius: 999 }} />
                  </div>
                  <div style={{ width: 44, textAlign: "right", fontWeight: 700, fontSize: 13 }}>{row.avgPct}%</div>
                  <div style={{ width: 110, textAlign: "right" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: row.band.color + "22", color: row.band.color }}>{row.band.label}</span>
                  </div>
                </div>
              ))}
              {standardRows.length > 5 && (
                <div style={{ fontSize: 12, color: COLORS.textMuted, padding: "8px 4px 0", textAlign: "center" }}>+{standardRows.length - 5} more standard{standardRows.length - 5 === 1 ? "" : "s"} — see the full report</div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "12px 0", textAlign: "center" }}>No released grades yet — this fills in once you release some.</div>
          )}
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.3fr 1fr", gap: 16 }}>
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Active Assignments</div>
              <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700 }}>View All</button>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              {recentAssignments.length > 0 ? recentAssignments.map((a) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{a.className}{a.dueDate ? ` · Due ${a.dueDate}` : ""}</div>
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>{a.submittedCount} / {a.rosterSize}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, width: 40, textAlign: "right" }}>{a.avgForA !== null ? `${a.avgForA}%` : "—"}</div>
                </div>
              )) : <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "12px 0" }}>No assignments yet.</div>}
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Submission Review Queue</div>
              <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ background: "none", color: COLORS.violet, fontSize: 12.5, fontWeight: 700 }}>View All</button>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              {pendingSubmissions.slice(0, 4).length > 0 ? pendingSubmissions.slice(0, 4).map((s) => (
                <button key={s.id} onClick={() => router.push(`/teacher/grade/${s.id}`)} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}`, background: "none", textAlign: "left" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 12, flexShrink: 0 }}>{s.studentName[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.studentName}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>Submitted {new Date(s.submitted_at).toLocaleString()}</div>
                  </div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "#FFF4E5", color: "#B8860B" }}>Needs Review</span>
                </button>
              )) : <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "12px 0" }}>Nothing waiting — you're all caught up!</div>}
              {pendingCount > 0 && (
                <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ marginTop: 8, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>
                  Review All Submissions ({pendingCount})
                </button>
              )}
            </div>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card style={{ background: COLORS.violetSoft, border: "none", position: "relative", overflow: "visible" }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: COLORS.violet, marginBottom: 6 }}>✨ HQ INSIGHT</div>
              <p style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, margin: "0 0 14px 0", paddingRight: 50 }}>
                {pendingCount > 0
                  ? `${pendingCount} submission${pendingCount === 1 ? "" : "s"} ${pendingCount === 1 ? "is" : "are"} waiting for your review.`
                  : "You're all caught up! No submissions are waiting right now."}
              </p>
              {pendingCount > 0 && (
                <button onClick={() => router.push("/teacher/grade")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "9px 16px", fontWeight: 700, fontSize: 12.5 }}>
                  Review Now
                </button>
              )}
              <img src="/teacher/hq_guide_robot.png" alt="" style={{ position: "absolute", right: 4, bottom: 0, width: 64, height: "auto" }} />
            </Card>

            <Card>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Quick Actions</div>
              <div style={{ display: "grid", gap: 2 }}>
                <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 10, background: "none", padding: "9px 4px", fontSize: 13, fontWeight: 600, color: COLORS.textDark, textAlign: "left" }}>
                  <img src="/teacher/action_create_assignment.png" alt="" style={{ width: 20, height: 20 }} /> Create New Assignment <span style={{ marginLeft: "auto", color: COLORS.textMuted }}>›</span>
                </button>
                <button onClick={() => setAwardModalOpen(true)} disabled={classes.length === 0} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 10, background: "none", padding: "9px 4px", fontSize: 13, fontWeight: 600, color: COLORS.textDark, textAlign: "left", opacity: classes.length === 0 ? 0.5 : 1 }}>
                  <img src="/teacher/action_award_crystal_points.png" alt="" style={{ width: 20, height: 20 }} /> Award Crystal Points <span style={{ marginLeft: "auto", color: COLORS.textMuted }}>›</span>
                </button>
                <button onClick={() => router.push("/teacher/reports")} disabled={classes.length === 0} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 10, background: "none", padding: "9px 4px", fontSize: 13, fontWeight: 600, color: COLORS.textDark, textAlign: "left", opacity: classes.length === 0 ? 0.5 : 1 }}>
                  <img src="/teacher/action_generate_report.png" alt="" style={{ width: 20, height: 20 }} /> Generate Class Report <span style={{ marginLeft: "auto", color: COLORS.textMuted }}>›</span>
                </button>
                {[
                  { icon: "/teacher/action_send_announcement.png", label: "Send Class Announcement" },
                ].map((a) => (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 4px", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, opacity: 0.6 }}>
                    <img src={a.icon} alt="" style={{ width: 20, height: 20, filter: "grayscale(1)" }} /> {a.label} <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, background: COLORS.border, padding: "2px 8px", borderRadius: 999 }}>Soon</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {awardSuccess && (
        <div className="gc-fade-in" style={{ position: "fixed", bottom: 28, right: 28, background: COLORS.textDark, color: COLORS.white, borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: 13.5, boxShadow: "0 8px 24px rgba(0,0,0,.25)", zIndex: 200 }}>
          🔮 {awardSuccess}
        </div>
      )}

      <AwardPointsModal
        open={awardModalOpen}
        classes={classes}
        rawStudents={rawStudents}
        defaultClassId={selectedClassId !== "all" ? selectedClassId : undefined}
        awarding={awarding}
        onCancel={() => setAwardModalOpen(false)}
        onAward={handleAwardPoints}
      />
    </div>
  );
}
