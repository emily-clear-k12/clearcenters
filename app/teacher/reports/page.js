"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  danger: "#E4574C",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

function proficiencyBand(avg) {
  if (avg >= 1.8) return "Excellent";
  if (avg >= 1.4) return "Proficient";
  if (avg >= 1.0) return "Developing";
  return "Needs Support";
}

export default function ReportsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      loadClasses(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadClasses = useCallback(async (teacherId) => {
    setLoading(true);
    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    const classIds = (classesData || []).map((c) => c.id);

    let students = [];
    let counts = {};
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, first_name, class_id").in("class_id", classIds);
      students = data || [];
      students.forEach((s) => { counts[s.class_id] = (counts[s.class_id] || 0) + 1; });
    }

    // Needs-attention badge per class: how many students are currently in
    // the "Needs Support" band, same rule as the class report and Student
    // Progress. Requires pulling every class's released grades up front —
    // fine at this scale, and it means a teacher can see which class to
    // check on before even opening a report.
    let needsCounts = {};
    if (classIds.length > 0 && students.length > 0) {
      const { data: assignments } = await supabase.from("assignments").select("id, class_id").in("class_id", classIds);
      const assignmentIds = (assignments || []).map((a) => a.id);
      const classByAssignment = Object.fromEntries((assignments || []).map((a) => [a.id, a.class_id]));

      let submissions = [];
      if (assignmentIds.length > 0) {
        const { data } = await supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released").in("assignment_id", assignmentIds);
        submissions = data || [];
      }

      const gradesByStudent = {};
      submissions.forEach((s) => {
        if (!s.released || s.teacher_grade === null || s.teacher_grade === undefined) return;
        if (!gradesByStudent[s.student_id]) gradesByStudent[s.student_id] = [];
        gradesByStudent[s.student_id].push(s.teacher_grade);
      });

      students.forEach((st) => {
        const grades = gradesByStudent[st.id];
        if (!grades || grades.length === 0) return;
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
        if (proficiencyBand(avg) === "Needs Support") {
          needsCounts[st.class_id] = (needsCounts[st.class_id] || 0) + 1;
        }
      });
    }

    setAllStudents(students.map((s) => ({ ...s, className: (classesData || []).find((c) => c.id === s.class_id)?.name || "" })));
    setClasses((classesData || []).map((c) => ({ ...c, studentCount: counts[c.id] || 0, needsAttention: needsCounts[c.id] || 0 })));
    setLoading(false);
  }, []);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allStudents.filter((s) => s.first_name.toLowerCase().includes(q)).slice(0, 6);
  }, [search, allStudents]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-card { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; }
        .gc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .gc-hit { cursor: pointer; }
        .gc-hit:hover { background: ${COLORS.violetSoft}; }
      `}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 900, margin: "0 auto" }}>
        <TeacherPageBanner>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>Reports</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0 }}>Pick a class or search for a student — printable summaries for parent conferences and admin check-ins.</p>
          </div>
        </TeacherPageBanner>

        <div style={{ marginBottom: 22 }}>
          <div style={{ position: "relative", maxWidth: 420 }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a student across all your classes..."
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px 12px 38px", borderRadius: 12, border: `1.5px solid ${COLORS.border}`, fontSize: 14, fontFamily: "inherit", color: COLORS.textDark }}
            />
          </div>
          {search.trim() && (
            <div style={{ maxWidth: 420, marginTop: 8, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, boxShadow: "0 4px 14px rgba(13,27,42,.06)", overflow: "hidden" }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: "14px", fontSize: 12.5, color: COLORS.textMuted }}>No students match "{search}".</div>
              ) : (
                searchResults.map((s) => (
                  <div key={s.id} className="gc-hit" onClick={() => router.push(`/teacher/reports/student/${s.id}`)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5 }}>{s.first_name}</div>
                      <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>{s.className}</div>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.violet }}>View report →</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="gc-card" onClick={() => router.push("/teacher/reports/standards")} style={{ background: COLORS.violetSoft, border: `1px solid ${COLORS.violet}33`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 16px rgba(13,27,42,.06)", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 20, flexShrink: 0 }}>📊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Standards Report — All Classes</div>
            <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>How every standard is going, broken out class by class — one printable page.</div>
          </div>
          <div style={{ color: COLORS.violet, fontWeight: 700, fontSize: 13 }}>View →</div>
        </div>

        {classes.length === 0 ? (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No classes yet.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {classes.map((c) => (
              <div key={c.id} className="gc-card" onClick={() => router.push(`/teacher/reports/${c.id}`)} style={{ position: "relative", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 20, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                {c.needsAttention > 0 && (
                  <div style={{ position: "absolute", top: 14, right: 14, background: COLORS.danger + "18", color: COLORS.danger, fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999 }}>
                    {c.needsAttention} need attention
                  </div>
                )}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 18, marginBottom: 12 }}>{c.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>{c.studentCount} student{c.studentCount === 1 ? "" : "s"}</div>
                <div style={{ marginTop: 12, color: COLORS.violet, fontWeight: 700, fontSize: 12.5 }}>Generate Report →</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
