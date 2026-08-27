"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  cream: "#F2F0FA",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  white: "#FFFFFF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

export default function TeacherGradeListPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [search, setSearch] = useState("");
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
    setClasses(classList);

    if (classIds.length === 0) {
      setSubmissions([]);
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

    // Kept as one flat list rather than pre-grouped by class — the class
    // tabs and the assignment grouping below both derive from this via
    // useMemo, so switching tabs is instant and doesn't need a re-fetch.
    setSubmissions(merged);
    setLoadingSubs(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadSubmissions(teacherId);
  }, [loadingAuth, teacherId, loadSubmissions]);

  // Two-stage derive from the flat submissions list: filter by the selected
  // class tab, then bucket what's left by assignment so the grid reads as
  // "here's who's done with THIS mission" instead of one long name list.
  const classFilteredSubmissions = useMemo(() => {
    return selectedClassId === "all" ? submissions : submissions.filter((s) => s.classId === selectedClassId);
  }, [submissions, selectedClassId]);

  const filteredSubmissions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return classFilteredSubmissions;
    return classFilteredSubmissions.filter((s) => s.studentName.toLowerCase().includes(q));
  }, [classFilteredSubmissions, search]);

  function needsReview(s) {
    return !s.revision_requested && (s.teacher_grade === null || s.teacher_grade === undefined);
  }

  // How many are still waiting, in the current class scope (not affected by
  // the search box) — this backs the Grade Next button and the page-level
  // count, so typing a name to look someone up doesn't change that number.
  const totalNeedsReview = useMemo(() => classFilteredSubmissions.filter(needsReview).length, [classFilteredSubmissions]);

  const assignmentGroups = useMemo(() => {
    const byAssignment = {};
    filteredSubmissions.forEach((s) => {
      const key = s.assignment_id;
      if (!byAssignment[key]) {
        byAssignment[key] = { assignmentId: key, caseTitle: s.caseTitle, className: s.className, classId: s.classId, submissions: [] };
      }
      byAssignment[key].submissions.push(s);
    });
    // Sorted by how many submissions in that assignment still need review —
    // an assignment with a real backlog should sit above one that's fully
    // graded, even if the fully-graded one had a late resubmission more
    // recently. Ties broken by most-recently-active, same as before.
    return Object.values(byAssignment)
      .map((g) => {
        const sorted = [...g.submissions].sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
        const needsCount = sorted.filter(needsReview).length;
        return { ...g, submissions: sorted, needsCount, mostRecent: new Date(sorted[0].submitted_at).getTime() };
      })
      .sort((a, b) => b.needsCount - a.needsCount || b.mostRecent - a.mostRecent);
  }, [filteredSubmissions]);

  function handleGradeNext() {
    // Oldest still-waiting submission first — that's the one that's been
    // sitting the longest, not necessarily the one in the top assignment
    // group (a small backlog can still contain the oldest wait).
    const waiting = classFilteredSubmissions.filter(needsReview).sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));
    if (waiting.length > 0) router.push(`/teacher/grade/${waiting[0].id}`);
  }

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
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <TeacherPageBanner>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: 0 }}>Review Submissions</h1>
          </TeacherPageBanner>
          {error && (
            <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})`, borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 18, boxShadow: "0 6px 18px rgba(140,82,242,.25)" }}>
            <div style={{ fontSize: 24 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 15, fontFamily: "'Poppins', sans-serif" }}>Grade Next</div>
              <div style={{ color: "rgba(255,255,255,.85)", fontSize: 12 }}>
                {totalNeedsReview > 0
                  ? `Jump straight to the oldest ungraded submission — ${totalNeedsReview} waiting${selectedClassId === "all" ? " across all classes" : ""}.`
                  : "Nothing waiting — you're all caught up!"}
              </div>
            </div>
            <button className="gc-btn" onClick={handleGradeNext} disabled={totalNeedsReview === 0} style={{ background: COLORS.white, color: COLORS.violet, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13, opacity: totalNeedsReview === 0 ? 0.6 : 1, cursor: totalNeedsReview === 0 ? "default" : "pointer" }}>
              Start Grading →
            </button>
          </div>

          <div style={{ position: "relative", maxWidth: 300, marginBottom: 16 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "9px 10px 9px 34px", fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" }}
            />
            <span style={{ position: "absolute", left: 10, top: 9, color: COLORS.textMuted }}>🔍</span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 14 }}>Sorted by how many submissions still need review — not by which assignment is newest.</div>

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

          {assignmentGroups.length === 0 ? (
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 32, textAlign: "center", color: COLORS.textMuted }}>
              No submissions yet — once a student submits a mission, it'll show up here.
            </div>
          ) : (
            assignmentGroups.map((g) => (
              <div key={g.assignmentId} style={{ marginBottom: 28, opacity: g.needsCount === 0 ? 0.6 : 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10, padding: "0 2px" }}>
                  <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15.5, margin: 0 }}>{g.caseTitle}</h2>
                  {selectedClassId === "all" && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.violet, background: COLORS.violetSoft, padding: "2px 9px", borderRadius: 999 }}>{g.className}</span>
                  )}
                  {g.needsCount > 0 ? (
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#B8860B", background: "#FFF4E5", padding: "2px 9px", borderRadius: 999 }}>🔴 {g.needsCount} need review</span>
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.success || "#22C55E", background: "#E9F9EE", padding: "2px 9px", borderRadius: 999 }}>✓ all graded</span>
                  )}
                  <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: "auto" }}>
                    {g.submissions.length} submission{g.submissions.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
                  {g.submissions.map((s) => {
                    const isNeedsReview = needsReview(s);
                    // Same "amber = needs your attention, teal = handled" split the
                    // old row layout used — graded-but-not-yet-released counts as
                    // handled here too, same as it always has.
                    const isHandled = s.released || (!isNeedsReview && !s.revision_requested);
                    const statusBg = isHandled ? "#E6F8F9" : "#FFF4E5";
                    const statusColor = isHandled ? COLORS.teal : "#B8860B";
                    const statusLabel = s.released ? "Released" : s.revision_requested ? "Sent Back" : isNeedsReview ? "Needs Review" : "Graded";
                    return (
                      <button
                        key={s.id}
                        className="gc-btn"
                        onClick={() => router.push(`/teacher/grade/${s.id}`)}
                        title={`${s.studentName} · submitted ${new Date(s.submitted_at).toLocaleDateString()}`}
                        style={{
                          aspectRatio: "1 / 1",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          background: statusBg,
                          border: `1.5px solid ${statusColor}33`,
                          borderRadius: 14,
                          padding: 10,
                          textAlign: "center",
                          overflow: "hidden",
                        }}
                      >
                        <div style={{ width: 34, height: 34, borderRadius: "50%", background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 13.5, flexShrink: 0 }}>
                          {s.studentName?.[0] || "?"}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 12, color: COLORS.textDark, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {s.studentName}
                        </div>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: statusColor, letterSpacing: .2 }}>
                          {s.revision_requested && !s.released ? "🔁 " : ""}{statusLabel}
                        </span>
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
