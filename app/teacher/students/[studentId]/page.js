"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import TeacherHUD from "../../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../../lib/teacherTheme";

// Sept 13 — moved to the console-interior look. This page isn't reached
// from one Overview landmark directly (it's a click-through from Grading
// and from Reports), so it shares those pages' aqua Observatory family
// rather than getting its own color — added to PAGE_ACCENTS/
// PAGE_BACKGROUNDS in lib/teacherTheme.js under `/teacher/students`.
// TeacherSidebar swapped for TeacherHUD; the flat opaque-white stat tiles
// and Assignments card became panelStyle glass cards; decorative violet
// (student avatar... see below) became aqua ACCENT on chrome only. No
// query or status logic changed.
//
// Left alone, on purpose, same principle as every other page in this
// redesign: the amber "Needs Review" and teal "graded/released" status
// pills on each assignment row are real submission-status signals, not
// page branding — identical treatment to the Grading list and Grading
// detail pages. The student avatar circle also stays violet, matching the
// precedent that avatars are neutral, not page-branded.
const ACCENT = PAGE_ACCENTS["/teacher/students"];
const BG = PAGE_BACKGROUNDS["/teacher/students"];

const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };

function caseImagePath(standard) {
  return `/cases/${standard.replace(/\./g, "-")}.jpg`;
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params.studentId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [student, setStudent] = useState(null);
  const [studentClass, setStudentClass] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const load = useCallback(async () => {
    if (!teacherId || !studentId) return;
    setLoading(true);
    setNotFound(false);

    const { data: st } = await supabase.from("students").select("*").eq("id", studentId).maybeSingle();
    if (!st) { setNotFound(true); setLoading(false); return; }

    // Only this student's own teacher can view their page.
    const { data: cls } = await supabase.from("classes").select("*").eq("id", st.class_id).eq("teacher_id", teacherId).maybeSingle();
    if (!cls) { setNotFound(true); setLoading(false); return; }

    setStudent(st);
    setStudentClass(cls);

    const { data: assigned } = await supabase
      .from("assignments")
      .select("id, due_date, case_standard, created_at, cases(title)")
      .eq("class_id", st.class_id)
      .order("created_at", { ascending: false });
    const assignmentList = assigned || [];
    const assignmentIds = assignmentList.map((a) => a.id);

    let targetRows = [];
    let submissions = [];
    if (assignmentIds.length > 0) {
      const [{ data: targets }, { data: subs }] = await Promise.all([
        supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds),
        supabase
          .from("submissions")
          .select("id, assignment_id, submitted_at, teacher_grade, released, ai_score, self_confidence")
          .eq("student_id", studentId)
          .in("assignment_id", assignmentIds),
      ]);
      targetRows = targets || [];
      submissions = subs || [];
    }

    // Same whole-class-vs-targeted rule used everywhere else: an
    // assignment with zero targeting rows applies to everyone; one WITH
    // targeting rows only applies to the students listed.
    const targetsByAssignment = {};
    targetRows.forEach((t) => {
      if (!targetsByAssignment[t.assignment_id]) targetsByAssignment[t.assignment_id] = new Set();
      targetsByAssignment[t.assignment_id].add(t.student_id);
    });
    function appliesToThisStudent(assignmentId) {
      const targetSet = targetsByAssignment[assignmentId];
      if (!targetSet || targetSet.size === 0) return true;
      return targetSet.has(studentId);
    }

    const submissionByAssignment = Object.fromEntries(submissions.map((s) => [s.assignment_id, s]));

    const merged = assignmentList
      .filter((a) => appliesToThisStudent(a.id))
      .map((a) => {
        const sub = submissionByAssignment[a.id] || null;
        let status = "not_started";
        if (sub && sub.submitted_at) {
          if (sub.released) status = "released";
          else if (sub.teacher_grade === null || sub.teacher_grade === undefined) status = "needs_review";
          else status = "graded";
        } else if (sub) {
          status = "in_progress";
        }
        return { ...a, submission: sub, status };
      });

    setRows(merged);
    setLoading(false);
  }, [teacherId, studentId]);

  useEffect(() => { if (!loadingAuth) load(); }, [loadingAuth, load]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  if (notFound) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: COLORS.canvas,
          backgroundImage: `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundAttachment: "fixed",
          fontFamily: "'Inter', sans-serif",
          color: COLORS.textDark,
        }}
      >
        <TeacherHUD title="Student" subtitle="Observatory" accent={ACCENT} teacherEmail={teacherEmail} />
        <div style={{ padding: "32px 36px" }}>
          <div style={{ ...panelStyle(ACCENT, { padding: 32, textAlign: "center", color: COLORS.textMuted, maxWidth: 460, margin: "40px auto" }) }}>
            Couldn't find that student in one of your classes.
            <div style={{ marginTop: 14 }}>
              <button className="gc-btn" onClick={() => router.push("/teacher/assign")} style={{ background: ACCENT, color: COLORS.white, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>← Back to My Classes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const needsReview = rows.filter((r) => r.status === "needs_review").length;
  const notStarted = rows.filter((r) => r.status === "not_started").length;
  const inProgress = rows.filter((r) => r.status === "in_progress").length;
  const completed = rows.filter((r) => r.status === "graded" || r.status === "released").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        backgroundImage: `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
      `}</style>

      <TeacherHUD title={student.first_name} subtitle="Observatory — student progress" accent={ACCENT} teacherEmail={teacherEmail} />

      <div style={{ padding: "28px 36px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 900 }}>
          <button onClick={() => router.push("/teacher/assign")} className="gc-btn" style={{ background: "none", color: COLORS.textMuted, fontWeight: 600, fontSize: 13, marginBottom: 14, padding: 0 }}>← Back to My Classes</button>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${COLORS.violet}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 20, flexShrink: 0 }}>{student.first_name[0]}</div>
            <div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: 0, color: COLORS.textDark }}>{student.first_name}</h1>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>
                {studentClass?.name} · PIN: <span style={{ fontFamily: "monospace" }}>{student.pin}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
            <div style={{ ...panelStyle(needsReview > 0 ? COLORS.warning : ACCENT, { padding: 16, textAlign: "center", background: needsReview > 0 ? "#FFF4E5" : undefined }) }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: needsReview > 0 ? "#B8860B" : COLORS.textDark }}>{needsReview}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>Need Review</div>
            </div>
            <div style={{ ...panelStyle(ACCENT, { padding: 16, textAlign: "center" }) }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{inProgress}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>In Progress</div>
            </div>
            <div style={{ ...panelStyle(ACCENT, { padding: 16, textAlign: "center" }) }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{notStarted}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>Not Started</div>
            </div>
            <div style={{ ...panelStyle(ACCENT, { padding: 16, textAlign: "center" }) }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{completed}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600 }}>Completed</div>
            </div>
          </div>

          <div style={{ ...panelStyle(ACCENT, { padding: 16 }) }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Assignments</div>
            {rows.length === 0 ? (
              <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "16px 0" }}>Nothing assigned to {student.first_name} yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 6 }}>
                {rows.map((r) => {
                  const clickable = r.status === "needs_review" || r.status === "graded" || r.status === "released";
                  const Wrapper = clickable ? "button" : "div";
                  return (
                    <Wrapper
                      key={r.id}
                      type={clickable ? "button" : undefined}
                      onClick={clickable ? () => router.push(`/teacher/grade/${r.submission.id}`) : undefined}
                      className={clickable ? "gc-btn" : undefined}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 8px", borderBottom: `1px solid ${COLORS.border}`, background: "none", border: "none", width: "100%", textAlign: "left", cursor: clickable ? "pointer" : "default", font: "inherit", color: "inherit" }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                        <img src={caseImagePath(r.case_standard)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{r.cases?.title || r.case_standard}</div>
                        <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{r.due_date ? `Due ${r.due_date}` : "No due date"}</div>
                      </div>
                      {r.status === "needs_review" && (
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "#FFF4E5", color: "#B8860B" }}>Needs Review →</span>
                      )}
                      {r.status === "graded" && (
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: `${COLORS.teal}22`, color: "#0F7C8C" }}>{GRADE_LABELS[r.submission.teacher_grade]} →</span>
                      )}
                      {r.status === "released" && (
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: `${COLORS.teal}22`, color: "#0F7C8C" }}>Released: {GRADE_LABELS[r.submission.teacher_grade]} →</span>
                      )}
                      {r.status === "in_progress" && (
                        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: COLORS.canvas, color: COLORS.textMuted }}>In Progress</span>
                      )}
                      {r.status === "not_started" && (
                        <span style={{ fontSize: 10.5, color: COLORS.textMuted }}>Not Started</span>
                      )}
                    </Wrapper>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
