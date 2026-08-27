"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Printer } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import TeacherSidebar from "../../../../components/TeacherSidebar";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  success: "#22C55E",
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

function StatBlock({ label, value }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{value}</div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>{label}</div>
    </div>
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
  const [report, setReport] = useState(null);

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

    const { data: students } = await supabase.from("students").select("id, first_name").eq("class_id", classId);
    const studentIds = (students || []).map((s) => s.id);

    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date").eq("class_id", classId).order("created_at", { ascending: false });
    const assignmentIds = (assignments || []).map((a) => a.id);
    const assignmentStandard = Object.fromEntries((assignments || []).map((a) => [a.id, a.case_standard]));

    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let caseTitleMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
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

    const targetsByAssignment = {};
    targetRows.forEach((t) => {
      if (!targetsByAssignment[t.assignment_id]) targetsByAssignment[t.assignment_id] = new Set();
      targetsByAssignment[t.assignment_id].add(t.student_id);
    });
    function applicableCountFor(assignmentId) {
      const targetSet = targetsByAssignment[assignmentId];
      return targetSet && targetSet.size > 0 ? targetSet.size : studentIds.length;
    }

    // Completion rate: real submits vs. how many student-assignment pairs
    // were actually applicable (respecting per-student targeting).
    const totalApplicable = assignmentIds.reduce((sum, id) => sum + applicableCountFor(id), 0);
    const totalCompleted = submissions.filter((s) => s.submitted_at).length;
    const completionPct = totalApplicable > 0 ? Math.round((totalCompleted / totalApplicable) * 100) : 0;

    // Per-student rollup
    const byStudent = {};
    submissions.forEach((s) => {
      if (!byStudent[s.student_id]) byStudent[s.student_id] = { grades: [], submittedCount: 0 };
      if (s.submitted_at) byStudent[s.student_id].submittedCount += 1;
      if (s.released && s.teacher_grade !== null && s.teacher_grade !== undefined) byStudent[s.student_id].grades.push(s.teacher_grade);
    });
    const studentRows = (students || []).map((st) => {
      const info = byStudent[st.id] || { grades: [], submittedCount: 0 };
      const hasGrades = info.grades.length > 0;
      const avg = hasGrades ? info.grades.reduce((a, b) => a + b, 0) / info.grades.length : null;
      return { id: st.id, name: st.first_name, missionsCompleted: info.submittedCount, avgPct: avg !== null ? Math.round((avg / 2) * 100) : null, band: avg !== null ? proficiencyBand(avg) : null };
    }).sort((a, b) => (a.avgPct ?? -1) - (b.avgPct ?? -1));

    const releasedAll = submissions.filter((s) => s.released && s.teacher_grade !== null && s.teacher_grade !== undefined);
    const classAverage = releasedAll.length > 0 ? Math.round((releasedAll.reduce((sum, s) => sum + s.teacher_grade, 0) / releasedAll.length / 2) * 100) : null;

    const bandCounts = { Excellent: 0, Proficient: 0, Developing: 0, "Needs Support": 0 };
    studentRows.forEach((r) => { if (r.band) bandCounts[r.band.label] += 1; });

    // Per-standard rollup, same math as the Student Progress "By Standard" view.
    const byStandard = {};
    releasedAll.forEach((s) => {
      const standard = assignmentStandard[s.assignment_id];
      if (!standard) return;
      if (!byStandard[standard]) byStandard[standard] = [];
      byStandard[standard].push(s.teacher_grade);
    });
    const standardRows = Object.entries(byStandard).map(([standard, grades]) => {
      const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
      return { standard, title: caseTitleMap[standard] || standard, gradedCount: grades.length, avgPct: Math.round((avg / 2) * 100), band: proficiencyBand(avg) };
    }).sort((a, b) => a.avgPct - b.avgPct);

    setReport({
      className: cls.name,
      studentCount: (students || []).length,
      assignmentCount: assignmentIds.length,
      classAverage,
      completionPct,
      bandCounts,
      studentRows,
      standardRows,
    });
    setLoading(false);
  }, [classId]);

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

  const bandTotal = Object.values(report.bandCounts).reduce((a, b) => a + b, 0);
  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

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
          <button onClick={() => router.push("/teacher/reports")} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 6, background: "none", color: COLORS.textMuted, fontWeight: 700, fontSize: 13.5 }}>
            <ChevronLeft size={18} /> Back to Reports
          </button>
          <button onClick={() => window.print()} className="gc-btn" style={{ display: "flex", alignItems: "center", gap: 8, background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
            <Printer size={16} /> Print / Save as PDF
          </button>
        </div>

        <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 4px 16px rgba(13,27,42,.08)" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>ClearCenters Class Report</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>{report.className}</h1>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>Generated {generatedDate}{teacherEmail ? ` · ${teacherEmail}` : ""}</div>
          </div>

          <div style={{ display: "flex", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
            <StatBlock label="Students" value={report.studentCount} />
            <StatBlock label="Assignments" value={report.assignmentCount} />
            <StatBlock label="Class Average" value={report.classAverage !== null ? `${report.classAverage}%` : "—"} />
            <StatBlock label="Completion Rate" value={`${report.completionPct}%`} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Class Performance</div>
            {bandTotal > 0 ? (
              <>
                <div style={{ display: "flex", height: 14, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                  {["Excellent", "Proficient", "Developing", "Needs Support"].map((label) => {
                    const count = report.bandCounts[label];
                    const pct = (count / bandTotal) * 100;
                    const color = proficiencyBand(label === "Excellent" ? 2 : label === "Proficient" ? 1.5 : label === "Developing" ? 1 : 0).color;
                    return pct > 0 ? <div key={label} style={{ width: `${pct}%`, background: color }} /> : null;
                  })}
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12 }}>
                  {["Excellent", "Proficient", "Developing", "Needs Support"].map((label) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: proficiencyBand(label === "Excellent" ? 2 : label === "Proficient" ? 1.5 : label === "Developing" ? 1 : 0).color }} />
                      {label} ({report.bandCounts[label]})
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>No released grades yet.</div>
            )}
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Standards Summary</div>
            {report.standardRows.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>No released grades yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 2 }}>
                {report.standardRows.map((row) => (
                  <div key={row.standard} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                    <div style={{ width: 200, fontWeight: 600 }}>{row.title} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({row.standard})</span></div>
                    <div style={{ width: 80, color: COLORS.textMuted }}>{row.gradedCount} graded</div>
                    <div style={{ flex: 1 }} />
                    <div style={{ width: 40, fontWeight: 700, textAlign: "right" }}>{row.avgPct}%</div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: row.band.color + "22", color: row.band.color }}>{row.band.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Student Summary</div>
            <div style={{ display: "grid", gap: 2 }}>
              {report.studentRows.map((r) => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
