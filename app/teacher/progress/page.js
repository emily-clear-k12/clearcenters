"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
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

export default function StudentProgressPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);
      setLoadingAuth(false);
    });
  }, [router]);

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    // Only THIS teacher's own classes — otherwise every teacher using the
    // app would see every other teacher's students mixed in together.
    const { data: classes } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classes || []).map((c) => c.id);
    const classMap = Object.fromEntries((classes || []).map((c) => [c.id, c.name]));

    let students = [];
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, first_name, class_id").in("class_id", classIds);
      students = data || [];
    }

    const { data: assignments } = classIds.length > 0
      ? await supabase.from("assignments").select("id, class_id").in("class_id", classIds)
      : { data: [] };
    const assignmentIds = (assignments || []).map((a) => a.id);

    let submissions = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("submissions").select("student_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds);
      submissions = data || [];
    }

    const byStudent = {};
    submissions.forEach((s) => {
      if (!byStudent[s.student_id]) byStudent[s.student_id] = { grades: [], submittedCount: 0 };
      if (s.submitted_at) byStudent[s.student_id].submittedCount += 1;
      if (s.released && s.teacher_grade !== null && s.teacher_grade !== undefined) byStudent[s.student_id].grades.push(s.teacher_grade);
    });

    const computed = students.map((st) => {
      const info = byStudent[st.id] || { grades: [], submittedCount: 0 };
      const hasGrades = info.grades.length > 0;
      const avg = hasGrades ? info.grades.reduce((a, b) => a + b, 0) / info.grades.length : null;
      const avgPct = avg !== null ? Math.round((avg / 2) * 100) : null;
      const band = avg !== null ? proficiencyBand(avg) : null;
      return { id: st.id, name: st.first_name, classId: st.class_id, className: classMap[st.class_id], missionsCompleted: info.submittedCount, avgPct, band };
    });

    // Divide by class instead of one mixed list, so each class's students
    // are grouped together under their own heading. Within a class, sort by
    // avgPct ascending (students needing the most support float to the top).
    const byClass = {};
    (classes || []).forEach((c) => { byClass[c.id] = { classId: c.id, className: c.name, students: [] }; });
    computed.forEach((row) => {
      if (byClass[row.classId]) byClass[row.classId].students.push(row);
    });
    const grouped = Object.values(byClass);
    grouped.forEach((g) => g.students.sort((a, b) => (a.avgPct ?? -1) - (b.avgPct ?? -1)));

    setGroups(grouped);
    setLoading(false);
  }, []);

  useEffect(() => { if (!loadingAuth && teacherId) load(teacherId); }, [loadingAuth, teacherId, load]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>Student Progress</h1>
        <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 24 }}>Based on released grades, grouped by class.</p>

        {groups.length === 0 && (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No classes yet.</div>
        )}

        {groups.map((g) => (
          <div key={g.classId} style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 10px 4px", color: COLORS.textDark }}>{g.className}</h2>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 8, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
              {g.students.length === 0 && <div style={{ padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No students in this class yet.</div>}
              {g.students.map((r) => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 14, flexShrink: 0 }}>{r.name[0]}</div>
                  <div style={{ width: 140 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                  </div>
                  <div style={{ width: 130, fontSize: 12.5, color: COLORS.textMuted }}>{r.missionsCompleted} submitted</div>
                  <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 999, overflow: "hidden" }}>
                    {r.avgPct !== null && <div style={{ height: "100%", width: `${r.avgPct}%`, background: r.band.color, borderRadius: 999 }} />}
                  </div>
                  <div style={{ width: 50, textAlign: "right", fontWeight: 700, fontSize: 13 }}>{r.avgPct !== null ? `${r.avgPct}%` : "—"}</div>
                  <div style={{ width: 110, textAlign: "right" }}>
                    {r.band ? (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: r.band.color + "22", color: r.band.color }}>{r.band.label}</span>
                    ) : (
                      <span style={{ fontSize: 11, color: COLORS.textMuted }}>No grades yet</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
