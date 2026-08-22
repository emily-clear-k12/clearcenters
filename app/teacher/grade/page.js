"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

const COLORS = {
  navy: "#16243F",
  deepNavy: "#1B2D4D",
  slate: "#2A3E63",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
  gold: "#FFC44D",
  success: "#22C55E",
  warning: "#FF9F43",
};

const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };

export default function TeacherGradeListPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setLoadingAuth(false);
    });
  }, [router]);

  const loadSubmissions = useCallback(async () => {
    setLoadingSubs(true);
    setError(null);

    const { data: subs, error: subsError } = await supabase
      .from("submissions")
      .select("id, submitted_at, released, ai_score, teacher_grade, self_confidence, student_id, assignment_id")
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false });

    if (subsError) {
      setError(subsError.message);
      setLoadingSubs(false);
      return;
    }

    const list = subs || [];
    if (list.length === 0) {
      setSubmissions([]);
      setLoadingSubs(false);
      return;
    }

    const studentIds = [...new Set(list.map((s) => s.student_id).filter(Boolean))];
    const assignmentIds = [...new Set(list.map((s) => s.assignment_id).filter(Boolean))];

    const { data: students } = await supabase.from("students").select("id, first_name").in("id", studentIds);
    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date, class_id").in("id", assignmentIds);

    const classIds = [...new Set((assignments || []).map((a) => a.class_id).filter(Boolean))];
    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];

    const { data: classes } = await supabase.from("classes").select("id, name").in("id", classIds);
    const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);

    const studentMap = Object.fromEntries((students || []).map((s) => [s.id, s]));
    const classMap = Object.fromEntries((classes || []).map((c) => [c.id, c]));
    const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));
    const assignmentMap = Object.fromEntries((assignments || []).map((a) => [a.id, a]));

    const merged = list.map((s) => {
      const assignment = assignmentMap[s.assignment_id];
      return {
        ...s,
        studentName: studentMap[s.student_id]?.first_name || "Unknown student",
        caseTitle: assignment ? (caseMap[assignment.case_standard]?.title || assignment.case_standard) : "Unknown case",
        className: assignment ? classMap[assignment.class_id]?.name : "Unknown class",
      };
    });

    setSubmissions(merged);
    setLoadingSubs(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth) loadSubmissions();
  }, [loadingAuth, loadSubmissions]);

  if (loadingAuth || loadingSubs) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.white, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.deepNavy} 100%)`, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <div style={{ background: COLORS.slate, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 17, marginRight: "auto" }}>
          Review Submissions
        </div>
        <button onClick={() => router.push("/teacher")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5, marginRight: 8 }}>
          Dashboard
        </button>
        <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}>
          Assign & Roster
        </button>
        <button
          onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }}
          className="gc-btn"
          style={{ background: "rgba(255,255,255,.12)", color: COLORS.white, border: "none", borderRadius: 999, padding: "7px 16px", fontWeight: 700, fontSize: 12.5 }}
        >
          Log Out
        </button>
      </div>

      <div style={{ padding: "20px 20px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 900 }}>
          {error && (
            <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          {submissions.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
              No submissions yet — once a student submits a mission, it'll show up here.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {submissions.map((s) => {
                const needsReview = s.teacher_grade === null || s.teacher_grade === undefined;
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
                        {s.caseTitle} · {s.className}
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
                          background: s.released ? "#E6F8F9" : needsReview ? "#FFF4E5" : "#E6F8F9",
                          color: s.released ? COLORS.teal : needsReview ? "#B8860B" : COLORS.teal,
                        }}
                      >
                        {s.released ? "Released" : needsReview ? "Needs Review" : `Graded: ${GRADE_LABELS[s.teacher_grade]}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
