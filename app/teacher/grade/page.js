"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";

const COLORS = {
  cream: "#F2F0FA",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };

export default function TeacherGradeListPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

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

  const loadSubmissions = useCallback(async (teacherId) => {
    setLoadingSubs(true);
    setError(null);

    // Start from THIS teacher's own classes and work outward, instead of
    // starting from every submission in the database — otherwise every
    // teacher using the app would see every other teacher's submissions
    // mixed in together here.
    const { data: classes, error: classesError } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    if (classesError) {
      setError(classesError.message);
      setLoadingSubs(false);
      return;
    }
    const classList = classes || [];
    const classIds = classList.map((c) => c.id);
    const classMap = Object.fromEntries(classList.map((c) => [c.id, c]));

    if (classIds.length === 0) {
      setGroups([]);
      setLoadingSubs(false);
      return;
    }

    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date, class_id").in("class_id", classIds);
    const assignmentList = assignments || [];
    const assignmentIds = assignmentList.map((a) => a.id);
    const assignmentMap = Object.fromEntries(assignmentList.map((a) => [a.id, a]));
    const caseStandards = [...new Set(assignmentList.map((a) => a.case_standard).filter(Boolean))];

    let list = [];
    if (assignmentIds.length > 0) {
      const { data: subs, error: subsError } = await supabase
        .from("submissions")
        .select("id, submitted_at, released, ai_score, teacher_grade, self_confidence, student_id, assignment_id, revision_requested")
        .in("assignment_id", assignmentIds)
        .not("submitted_at", "is", null)
        .order("submitted_at", { ascending: false });

      if (subsError) {
        setError(subsError.message);
        setLoadingSubs(false);
        return;
      }
      list = subs || [];
    }

    const studentIds = [...new Set(list.map((s) => s.student_id).filter(Boolean))];
    const { data: students } = studentIds.length > 0 ? await supabase.from("students").select("id, first_name").in("id", studentIds) : { data: [] };
    const { data: cases } = caseStandards.length > 0 ? await supabase.from("cases").select("standard, title").in("standard", caseStandards) : { data: [] };

    const studentMap = Object.fromEntries((students || []).map((s) => [s.id, s]));
    const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));

    const merged = list.map((s) => {
      const assignment = assignmentMap[s.assignment_id];
      return {
        ...s,
        studentName: studentMap[s.student_id]?.first_name || "Unknown student",
        caseTitle: assignment ? (caseMap[assignment.case_standard]?.title || assignment.case_standard) : "Unknown case",
        classId: assignment ? assignment.class_id : null,
        className: assignment ? classMap[assignment.class_id]?.name : "Unknown class",
      };
    });

    // Divide by class instead of one mixed list across every class.
    const byClass = {};
    classList.forEach((c) => { byClass[c.id] = { classId: c.id, className: c.name, submissions: [] }; });
    merged.forEach((s) => {
      if (s.classId && byClass[s.classId]) byClass[s.classId].submissions.push(s);
    });
    const grouped = Object.values(byClass).filter((g) => g.submissions.length > 0);

    setGroups(grouped);
    setLoadingSubs(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadSubmissions(teacherId);
  }, [loadingAuth, teacherId, loadSubmissions]);

  if (loadingAuth || loadingSubs) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <TeacherSidebar teacherEmail={teacherEmail} />

      <div style={{ flex: 1, padding: "32px 36px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 900 }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 20px 0" }}>Review Submissions</h1>
          {error && (
            <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          {groups.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
              No submissions yet — once a student submits a mission, it'll show up here.
            </div>
          ) : (
            groups.map((g) => (
              <div key={g.classId} style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 10px 4px" }}>{g.className}</h2>
                <div style={{ display: "grid", gap: 10 }}>
                  {g.submissions.map((s) => {
                    const needsReview = !s.revision_requested && (s.teacher_grade === null || s.teacher_grade === undefined);
                    return (
                      <button
                        key={s.id}
                        className="gc-btn"
                        onClick={() => router.push(`/teacher/grade/${s.id}`)}
                        style={{ background: COLORS.white, borderRadius: 14, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,.08)", display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 15, flexShrink: 0 }}>
                          {s.studentName?.[0] || "?"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14.5 }}>{s.studentName}</div>
                          <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>
                            {s.caseTitle}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4 }}>
                            {new Date(s.submitted_at).toLocaleDateString()}
                          </div>
                          <span
                            style={{
                              fontSize: 11.5,
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: 999,
                              background: s.released ? "#E6F8F9" : s.revision_requested ? "#FFF4E5" : needsReview ? "#FFF4E5" : "#E6F8F9",
                              color: s.released ? COLORS.teal : s.revision_requested ? "#B8860B" : needsReview ? "#B8860B" : COLORS.teal,
                            }}
                          >
                            {s.released ? "Released" : s.revision_requested ? "🔁 Sent Back" : needsReview ? "Needs Review" : `Graded: ${GRADE_LABELS[s.teacher_grade]}`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
