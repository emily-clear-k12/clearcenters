"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

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

// Lower rank = shown first in the card grid — students who need a look float
// to the front, a student with no grades yet sorts last (nothing to act on).
const BAND_RANK = { "Needs Support": 0, "Developing": 1, "Proficient": 2, "Excellent": 3 };
const BAND_ORDER = ["Needs Support", "Developing", "Proficient", "Excellent"];

export default function StudentProgressPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [standardGroups, setStandardGroups] = useState([]);
  const [view, setView] = useState("student"); // "student" | "standard"
  const [expandedKey, setExpandedKey] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [search, setSearch] = useState("");
  const [bandFilter, setBandFilter] = useState(null);

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
      ? await supabase.from("assignments").select("id, class_id, case_standard").in("class_id", classIds)
      : { data: [] };
    const assignmentIds = (assignments || []).map((a) => a.id);
    const assignmentStandard = Object.fromEntries((assignments || []).map((a) => [a.id, a.case_standard]));

    let submissions = [];
    if (assignmentIds.length > 0) {
      const { data } = await supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds);
      submissions = data || [];
    }

    // Standards this teacher's classes have actually been assigned, so we
    // can label each row with the case title instead of just a bare code.
    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let caseTitleMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title").in("standard", caseStandards);
      caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
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

    // Same released grades, rolled up the other way: by standard within
    // each class instead of by student. This is what tells a teacher "the
    // whole class is still shaky on 3.9A" instead of just "Maria is at 60%"
    // — something a single per-assignment grade can never show on its own.
    const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));
    const byClassStandard = {};
    submissions.forEach((s) => {
      if (!s.released || s.teacher_grade === null || s.teacher_grade === undefined) return;
      const standard = assignmentStandard[s.assignment_id];
      const student = studentMap[s.student_id];
      if (!standard || !student) return;
      const classId = student.class_id;
      if (!byClassStandard[classId]) byClassStandard[classId] = {};
      if (!byClassStandard[classId][standard]) byClassStandard[classId][standard] = { grades: [], byStudent: {} };
      byClassStandard[classId][standard].grades.push(s.teacher_grade);
      if (!byClassStandard[classId][standard].byStudent[s.student_id]) byClassStandard[classId][standard].byStudent[s.student_id] = [];
      byClassStandard[classId][standard].byStudent[s.student_id].push(s.teacher_grade);
    });

    const standardGrouped = (classes || []).map((c) => {
      const stdMap = byClassStandard[c.id] || {};
      const standardRows = Object.entries(stdMap).map(([standard, info]) => {
        const avg = info.grades.reduce((a, b) => a + b, 0) / info.grades.length;
        const avgPct = Math.round((avg / 2) * 100);
        const studentRows = Object.entries(info.byStudent)
          .map(([studentId, grades]) => {
            const sAvg = grades.reduce((a, b) => a + b, 0) / grades.length;
            return { id: studentId, name: studentMap[studentId]?.first_name || "Unknown", avgPct: Math.round((sAvg / 2) * 100), band: proficiencyBand(sAvg) };
          })
          .sort((a, b) => a.avgPct - b.avgPct);
        return { standard, title: caseTitleMap[standard] || standard, avgPct, band: proficiencyBand(avg), gradedCount: info.grades.length, students: studentRows };
      });
      standardRows.sort((a, b) => a.avgPct - b.avgPct);
      return { classId: c.id, className: c.name, standards: standardRows };
    });

    setStandardGroups(standardGrouped);
    setLoading(false);
  }, []);

  useEffect(() => { if (!loadingAuth && teacherId) load(teacherId); }, [loadingAuth, teacherId, load]);

  // Everyone in the currently-selected class scope (or every class, for "All
  // Classes"), independent of search/band filter — this backs the summary
  // line so the headline counts stay stable while a teacher searches/filters.
  const scopedStudents = useMemo(() => {
    const relevant = selectedClassId === "all" ? groups : groups.filter((g) => g.classId === selectedClassId);
    return relevant.flatMap((g) => g.students);
  }, [groups, selectedClassId]);

  const scopedBandCounts = useMemo(() => {
    const counts = { "Needs Support": 0, "Developing": 0, "Proficient": 0, "Excellent": 0 };
    scopedStudents.forEach((s) => { if (s.band) counts[s.band.label] += 1; });
    return counts;
  }, [scopedStudents]);

  const scopedAvg = useMemo(() => {
    const graded = scopedStudents.filter((s) => s.avgPct !== null);
    if (graded.length === 0) return null;
    return Math.round(graded.reduce((sum, s) => sum + s.avgPct, 0) / graded.length);
  }, [scopedStudents]);

  // Search + band filter on top of the scoped roster, then sorted so
  // students who need a look float to the front of the grid.
  const visibleStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = scopedStudents.filter((s) => (q ? s.name.toLowerCase().includes(q) : true));
    if (bandFilter) list = list.filter((s) => s.band?.label === bandFilter);
    return [...list].sort((a, b) => {
      const rankA = a.band ? BAND_RANK[a.band.label] : 4;
      const rankB = b.band ? BAND_RANK[b.band.label] : 4;
      if (rankA !== rankB) return rankA - rankB;
      return (a.avgPct ?? -1) - (b.avgPct ?? -1);
    });
  }, [scopedStudents, search, bandFilter]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherSidebar teacherEmail={teacherEmail} />
      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 1200, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <TeacherPageBanner>
          <div style={{ maxWidth: "62%" }}>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 6px 0" }}>Student Progress</h1>
            <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0 }}>Based on released grades, grouped by class.</p>
          </div>
        </TeacherPageBanner>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[{ key: "student", label: "By Student" }, { key: "standard", label: "By Standard" }].map((t) => (
            <button
              key={t.key}
              onClick={() => setView(t.key)}
              style={{ background: view === t.key ? COLORS.violet : COLORS.white, color: view === t.key ? COLORS.white : COLORS.textDark, border: view === t.key ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {view === "student" && groups.length === 0 && (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No classes yet.</div>
        )}

        {view === "student" && groups.length > 0 && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
              <button
                onClick={() => setSelectedClassId("all")}
                style={{ background: selectedClassId === "all" ? COLORS.violet : COLORS.white, color: selectedClassId === "all" ? COLORS.white : COLORS.textDark, border: selectedClassId === "all" ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}
              >
                All Classes
              </button>
              {groups.map((g) => (
                <button
                  key={g.classId}
                  onClick={() => setSelectedClassId(g.classId)}
                  style={{ background: selectedClassId === g.classId ? COLORS.violet : COLORS.white, color: selectedClassId === g.classId ? COLORS.white : COLORS.textDark, border: selectedClassId === g.classId ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {g.className}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", maxWidth: 320, marginBottom: 12 }}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                style={{ width: "100%", border: "2px solid #ECEAF5", borderRadius: 10, padding: "9px 10px 9px 34px", fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" }}
              />
              <span style={{ position: "absolute", left: 10, top: 9, color: COLORS.textMuted }}>🔍</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <button
                onClick={() => setBandFilter(null)}
                style={{ background: bandFilter === null ? COLORS.textMuted : `${COLORS.textMuted}18`, color: bandFilter === null ? COLORS.white : COLORS.textMuted, border: `1.5px solid ${COLORS.textMuted}55`, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" }}
              >
                All {scopedStudents.length}
              </button>
              {BAND_ORDER.map((label) => {
                const color = label === "Needs Support" ? COLORS.danger : label === "Developing" ? COLORS.violet : label === "Proficient" ? COLORS.info : COLORS.success;
                const active = bandFilter === label;
                return (
                  <button
                    key={label}
                    onClick={() => setBandFilter(active ? null : label)}
                    style={{ background: active ? color : `${color}18`, color: active ? COLORS.white : color, border: `1.5px solid ${color}55`, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 11.5, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {scopedBandCounts[label]} {label}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 8 }}>
              <b style={{ color: COLORS.textDark }}>{scopedStudents.length} student{scopedStudents.length === 1 ? "" : "s"}</b>
              {scopedAvg !== null && <> · avg <b style={{ color: COLORS.textDark }}>{scopedAvg}%</b></>}
              {" · "}
              <span style={{ color: COLORS.danger, fontWeight: 700 }}>{scopedBandCounts["Needs Support"]} Needs Support</span>
              {" · "}
              <span style={{ color: COLORS.violet, fontWeight: 700 }}>{scopedBandCounts["Developing"]} Developing</span>
              {" · "}
              <span style={{ color: COLORS.info, fontWeight: 700 }}>{scopedBandCounts["Proficient"]} Proficient</span>
              {" · "}
              <span style={{ color: COLORS.success, fontWeight: 700 }}>{scopedBandCounts["Excellent"]} Excellent</span>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 14 }}>
              Sorted so students who need support show up first — a colored border flags anyone below Proficient.
            </div>

            {visibleStudents.length === 0 ? (
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>
                No students match your search or filter.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                {visibleStudents.map((r) => {
                  const flagged = r.band && (r.band.label === "Needs Support" || r.band.label === "Developing");
                  return (
                    <div
                      key={r.id}
                      style={{
                        background: COLORS.white,
                        border: flagged ? `2px solid ${r.band.color}` : `1px solid ${COLORS.border}`,
                        borderRadius: 12,
                        padding: 12,
                        textAlign: "center",
                        boxShadow: "0 2px 6px rgba(13,27,42,.04)",
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 13, margin: "0 auto 8px auto" }}>{r.name[0]}</div>
                      <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>{r.missionsCompleted} submitted</div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: r.band ? r.band.color : COLORS.textMuted, marginBottom: 4 }}>{r.avgPct !== null ? `${r.avgPct}%` : "—"}</div>
                      {r.band ? (
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: r.band.color + "22", color: r.band.color }}>{r.band.label}</span>
                      ) : (
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: COLORS.border, color: COLORS.textMuted }}>No grades yet</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {view === "standard" && standardGroups.length === 0 && (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No classes yet.</div>
        )}

        {view === "standard" && standardGroups.map((g) => (
          <div key={g.classId} style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 10px 4px", color: COLORS.textDark }}>{g.className}</h2>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 8, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
              {g.standards.length === 0 && <div style={{ padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No released grades for this class yet.</div>}
              {g.standards.map((row) => {
                const key = `${g.classId}:${row.standard}`;
                const expanded = expandedKey === key;
                const strugglingCount = row.students.filter((s) => s.band.label === "Needs Support").length;
                return (
                  <div key={key} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <button
                      onClick={() => setExpandedKey(expanded ? null : key)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 12px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
                    >
                      <div style={{ width: 190, flexShrink: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 13.5 }}>{row.title}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{row.standard}</div>
                      </div>
                      <div style={{ width: 100, fontSize: 12.5, color: COLORS.textMuted }}>{row.gradedCount} graded</div>
                      <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${row.avgPct}%`, background: row.band.color, borderRadius: 999 }} />
                      </div>
                      <div style={{ width: 50, textAlign: "right", fontWeight: 700, fontSize: 13 }}>{row.avgPct}%</div>
                      <div style={{ width: 130, textAlign: "right" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: row.band.color + "22", color: row.band.color }}>{row.band.label}</span>
                      </div>
                      {strugglingCount > 0 && (
                        <div style={{ width: 90, textAlign: "right", fontSize: 11, fontWeight: 700, color: "#E4574C" }}>{strugglingCount} need reteach</div>
                      )}
                      <span style={{ color: COLORS.textMuted, marginLeft: 8, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 120ms ease" }}>›</span>
                    </button>
                    {expanded && (
                      <div style={{ padding: "0 12px 14px 12px", display: "grid", gap: 6 }}>
                        {row.students.map((s) => (
                          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", background: COLORS.canvas, borderRadius: 8, fontSize: 12.5 }}>
                            <div style={{ flex: 1, fontWeight: 600 }}>{s.name}</div>
                            <span style={{ fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: s.band.color + "22", color: s.band.color }}>{s.avgPct}% · {s.band.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
