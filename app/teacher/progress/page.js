"use client";
import {BridgePage,PageHeading} from "../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";
import { countLevels, countLine, levelColor, levelWord } from "../../../lib/gradeScale";
import { mistakeLine } from "../../../lib/mistakeLine";
import Icon, { IconBadge } from "../../../components/teacher/Icon";

// Sept 13 — second page moved to the console-interior look (see
// Teacher_SiteWide_Redesign_Plan.md). Observatory's destination, so it
// picks up aqua as its accent and Emily's observatory background art.
// Every proficiency-band color below (Needs Support/Developing/Proficient/
// Excellent) is left untouched by that — those are a real 4-way signal, not
// decorative brand accent, same reasoning as leaving COLORS.warning alone
// on My Classes' "Need Review" tile.
const ACCENT = "#7541cf";
const BG = PAGE_BACKGROUNDS["/teacher/progress"];

export default function StudentProgressPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [standardGroups, setStandardGroups] = useState([]);
  const [view, setView] = useState("student");
  const [levelFilter, setLevelFilter] = useState(null);
  const [gridGroups, setGridGroups] = useState([]);
  const [expandedKey, setExpandedKey] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("all");
  useEffect(()=>{const id=new URLSearchParams(window.location.search).get("classId");if(id)setSelectedClassId(id)},[]);
  const [search, setSearch] = useState("");

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
      const { data } = await supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at, self_confidence, classification_lab_data, signal_data").in("assignment_id", assignmentIds);
      submissions = data || [];
    }

    // Standards this teacher's classes have actually been assigned, so we
    // can label each row with the case title instead of just a bare code.
    const caseStandards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    let caseTitleMap = {};
    let caseEngineMap = {};
    if (caseStandards.length > 0) {
      const { data: cases } = await supabase.from("cases").select("standard, title, engine").in("standard", caseStandards);
      caseTitleMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.title]));
      caseEngineMap = Object.fromEntries((cases || []).map((c) => [c.standard, c.engine]));
    }

    const byStudent = {};
    submissions.forEach((s) => {
      if (!byStudent[s.student_id]) byStudent[s.student_id] = { grades: [], submittedCount: 0 };
      if (s.submitted_at) byStudent[s.student_id].submittedCount += 1;
      if (s.released && s.teacher_grade !== null && s.teacher_grade !== undefined) byStudent[s.student_id].grades.push(s.teacher_grade);
    });

    const computed = students.map((st) => {
      const info = byStudent[st.id] || { grades: [], submittedCount: 0 };
      return { id: st.id, name: st.first_name, classId: st.class_id, className: classMap[st.class_id], missionsCompleted: info.submittedCount, grades: info.grades, notYet: countLevels(info.grades)[0] };
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
    grouped.forEach((g) => g.students.sort((a, b) => b.notYet - a.notYet || a.name.localeCompare(b.name)));

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
        const studentRows = Object.entries(info.byStudent)
          .map(([studentId, grades]) => ({ id: studentId, name: studentMap[studentId]?.first_name || "Unknown", grades }))
          .sort((a, b) => countLevels(b.grades)[0] - countLevels(a.grades)[0]);
        return { standard, title: caseTitleMap[standard] || standard, grades: info.grades, gradedCount: info.grades.length, students: studentRows };
      });
      standardRows.sort((a, b) => countLevels(b.grades)[0] - countLevels(a.grades)[0]);
      return { classId: c.id, className: c.name, standards: standardRows };
    });

    setStandardGroups(standardGrouped);

    const grids = (classes || []).map((c) => {
      const classStudents = students.filter((student) => student.class_id === c.id);
      const standards = [...new Set((assignments || []).filter((a) => a.class_id === c.id).map((a) => a.case_standard).filter(Boolean))];
      const cells = {};
      const byStandard = {};
      submissions.forEach((s) => {
        const standard = assignmentStandard[s.assignment_id];
        const student = studentMap[s.student_id];
        if (!standard || !student || student.class_id !== c.id) return;
        if (!byStandard[standard]) byStandard[standard] = [];
        byStandard[standard].push(s);
        if (s.released && s.teacher_grade !== null && s.teacher_grade !== undefined) cells[`${s.student_id}:${standard}`] = Number(s.teacher_grade);
      });
      const sureWrong = [...new Set(submissions.filter((s) => {
        const student = studentMap[s.student_id];
        return student && student.class_id === c.id && s.released && Number(s.teacher_grade) === 0 && s.self_confidence === "strong";
      }).map((s) => studentMap[s.student_id]?.first_name).filter(Boolean))];
      return {
        classId: c.id,
        className: c.name,
        students: classStudents.map((student) => ({ id: student.id, name: student.first_name })),
        standards: standards.map((standard) => ({
          standard,
          title: caseTitleMap[standard] || standard,
          mistake: mistakeLine(standard, caseEngineMap[standard], byStandard[standard] || []),
        })),
        cells,
        sureWrong,
      };
    });
    setGridGroups(grids);
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

  const scopedLevelCounts = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0 };
    scopedStudents.forEach((student) => {
      const levels = countLevels(student.grades);
      [0, 1, 2].forEach((level) => { if (levels[level]) counts[level] += 1; });
    });
    return counts;
  }, [scopedStudents]);

  const scopedLine = useMemo(() => countLine(scopedStudents.flatMap((student) => student.grades || [])), [scopedStudents]);

  // Search + band filter on top of the scoped roster, then sorted so
  // students who need a look float to the front of the grid.
  const visibleStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = scopedStudents.filter((s) => (q ? s.name.toLowerCase().includes(q) : true));
    if (levelFilter !== null) list = list.filter((s) => countLevels(s.grades)[levelFilter] > 0);
    return [...list].sort((a, b) => b.notYet - a.notYet || a.name.localeCompare(b.name));
  }, [scopedStudents, search, levelFilter]);

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <BridgePage teacherEmail={teacherEmail} >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .sp-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .sp-btn:hover { transform: translateY(-1px); }
        .sp-input::placeholder { color: #8A84AC; }
      `}</style>

      <PageHeading title="Student Progress" subtitle="proficiency across every class, by student or by standard"></PageHeading>

      <div className="cc-detail-content">
        <div style={{ width: "100%", maxWidth: 1200 }}>
          {/* Sept 13 (later pass) — this whole controls cluster (view
              toggle, class/search/band filters, the summary line) used to
              sit directly on the observatory art with only individual pills
              carrying their own background — the plain text bits (the
              summary line, the "sorted so..." note) had nothing behind them
              at all and were genuinely hard to read against a busy
              starfield. Wrapped the whole thing in one panelStyle glass
              card, same treatment every other content block on this page
              already uses, so it reads as one legible control strip instead
              of loose text floating over the art. */}
          <div style={panelStyle(ACCENT, { padding: "16px 18px 18px", marginBottom: 24 })}>
            <div style={{ display: "flex", gap: 8, marginBottom: view === "student" && groups.length > 0 ? 14 : 0 }}>
              {[{ key: "student", label: "By Student" }, { key: "standard", label: "By Standard" }, { key: "grid", label: "Standards grid" }].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setView(t.key)}
                  className="sp-btn"
                  style={{ background: view === t.key ? ACCENT : "rgba(255,255,255,.7)", color: view === t.key ? COLORS.white : COLORS.textDark, border: view === t.key ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "9px 18px", fontWeight: 700, fontSize: 13 }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {view === "student" && groups.length > 0 && (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                  <button
                    onClick={() => setSelectedClassId("all")}
                    className="sp-btn"
                    style={{ background: selectedClassId === "all" ? ACCENT : "rgba(255,255,255,.7)", color: selectedClassId === "all" ? COLORS.white : COLORS.textDark, border: selectedClassId === "all" ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5 }}
                  >
                    All Classes
                  </button>
                  {groups.map((g) => (
                    <button
                      key={g.classId}
                      onClick={() => setSelectedClassId(g.classId)}
                      className="sp-btn"
                      style={{ background: selectedClassId === g.classId ? ACCENT : "rgba(255,255,255,.7)", color: selectedClassId === g.classId ? COLORS.white : COLORS.textDark, border: selectedClassId === g.classId ? "none" : `1px solid ${COLORS.border}`, borderRadius: 999, padding: "8px 16px", fontWeight: 700, fontSize: 12.5 }}
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
                    className="sp-input"
                    style={{ width: "100%", background: "rgba(255,255,255,.8)", color: COLORS.textDark, border: `2px solid ${COLORS.border}`, borderRadius: 10, padding: "9px 10px 9px 34px", fontSize: 13, boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                  <span style={{ position: "absolute", left: 10, top: 9, color: COLORS.textMuted }}><Icon name="search" size={15} /></span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <button
                    onClick={() => setLevelFilter(null)}
                    className="sp-btn"
                    style={{ background: levelFilter === null ? COLORS.textMuted : `${COLORS.textMuted}18`, color: levelFilter === null ? COLORS.white : COLORS.textMuted, border: `1.5px solid ${COLORS.textMuted}55`, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 11.5 }}
                  >
                    All {scopedStudents.length}
                  </button>
                  {[0, 1, 2].map((level) => {
                    const color = levelColor(level);
                    const active = levelFilter === level;
                    return (
                      <button
                        key={level}
                        onClick={() => setLevelFilter(active ? null : level)}
                        className="sp-btn"
                        style={{ background: active ? color : `${color}18`, color: active ? COLORS.white : color, border: `1.5px solid ${color}55`, borderRadius: 999, padding: "6px 14px", fontWeight: 700, fontSize: 11.5 }}
                      >
                        {scopedLevelCounts[level]} {levelWord(level)}
                      </button>
                    );
                  })}
                </div>

                <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 8 }}>
                  <b style={{ color: COLORS.textDark }}>{scopedStudents.length} student{scopedStudents.length === 1 ? "" : "s"}</b>
                  {" · "}
                  {scopedLine}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  Sorted so students with a Not yet show up first.
                </div>
              </>
            )}
          </div>

          {view === "student" && groups.length === 0 && (
            <div style={panelStyle(ACCENT, { padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 })}>No classes yet.</div>
          )}

          {view === "student" && groups.length > 0 && (
            <>
              {visibleStudents.length === 0 ? (
                <div style={panelStyle(ACCENT, { padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 })}>
                  No students match your search or filter.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
                  {visibleStudents.map((r) => {
                    const flagged = r.notYet > 0;
                    return (
                      <div
                        key={r.id}
                        style={panelStyle(flagged ? levelColor(0) : ACCENT, {
                          border: flagged ? `2px solid ${levelColor(0)}` : `1px solid ${COLORS.border}`,
                          padding: 12,
                          textAlign: "center",
                        })}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${COLORS.violet}22`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 13, margin: "0 auto 8px auto" }}>{r.name[0]}</div>
                        <div style={{ fontWeight: 700, fontSize: 12.5, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>{r.missionsCompleted} submitted</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, lineHeight: 1.4 }}>{countLine(r.grades)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {view === "standard" && standardGroups.length === 0 && (
            <div style={panelStyle(ACCENT, { padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 })}>No classes yet.</div>
          )}

          {view === "standard" && standardGroups.map((g) => (
            <div key={g.classId} style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 10px 4px", color: COLORS.textDark }}>{g.className}</h2>
              <div style={panelStyle(ACCENT, { padding: 8 })}>
                {g.standards.length === 0 && <div style={{ padding: 24, textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>No released grades for this class yet.</div>}
                {g.standards.map((row) => {
                  const key = `${g.classId}:${row.standard}`;
                  const expanded = expandedKey === key;
                  const notYetCount = countLevels(row.grades)[0];
                  const levels = countLevels(row.grades);
                  const total = levels[0] + levels[1] + levels[2] || 1;
                  return (
                    <div key={key} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <button
                        onClick={() => setExpandedKey(expanded ? null : key)}
                        className="sp-btn"
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 12px", background: "none", border: "none", textAlign: "left", fontFamily: "inherit" }}
                      >
                        <div style={{ width: 190, flexShrink: 0 }}>
                          <div style={{ fontWeight: 700, fontSize: 13.5, color: COLORS.textDark }}>{row.title}</div>
                          <div style={{ fontSize: 11, color: COLORS.textMuted }}>{row.standard}</div>
                        </div>
                        <div style={{ width: 100, fontSize: 12.5, color: COLORS.textMuted }}>{row.gradedCount} graded</div>
                        <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 999, overflow: "hidden", display: "flex" }}>
                          <div style={{ height: "100%", width: `${(levels[2] / total) * 100}%`, background: levelColor(2) }} />
                          <div style={{ height: "100%", width: `${(levels[1] / total) * 100}%`, background: levelColor(1) }} />
                          <div style={{ height: "100%", width: `${(levels[0] / total) * 100}%`, background: levelColor(0) }} />
                        </div>
                        <div style={{ width: 210, textAlign: "right", fontWeight: 700, fontSize: 12, color: COLORS.textDark }}>{countLine(row.grades)}</div>
                        {notYetCount > 0 && (
                          <div style={{ width: 90, textAlign: "right", fontSize: 11, fontWeight: 700, color: levelColor(0) }}>{notYetCount} not yet</div>
                        )}
                        <span style={{ color: COLORS.textMuted, marginLeft: 8, transform: expanded ? "rotate(90deg)" : "none", transition: "transform 120ms ease" }}>›</span>
                      </button>
                      {expanded && (
                        <div style={{ padding: "0 12px 14px 12px", display: "grid", gap: 6 }}>
                          {row.students.map((s) => (
                            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", background: "rgba(255,255,255,.5)", borderRadius: 8, fontSize: 12.5 }}>
                              <div style={{ flex: 1, fontWeight: 600, color: COLORS.textDark }}>{s.name}</div>
                              <span style={{ fontWeight: 700, color: COLORS.textDark }}>{countLine(s.grades)}</span>
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

          {view === "grid" && gridGroups.filter((g) => selectedClassId === "all" || g.classId === selectedClassId).map((g) => (
            <div key={g.classId} style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 8px 4px" }}>{g.className}</h2>
              {g.sureWrong.length > 0 && <p style={{ fontSize: 13, color: levelColor(0), fontWeight: 700, margin: "0 0 8px 4px" }}>Sure but not yet: {g.sureWrong.join(", ")}</p>}
              {g.standards.length === 0 ? <p style={{ color: COLORS.textMuted }}>No standards assigned yet.</p> : (
                <div style={{ overflowX: "auto", ...panelStyle(ACCENT, { padding: 12 }) }}>
                  <table style={{ borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: 6 }}>Student</th>
                        {g.standards.map((standard) => <th key={standard.standard} style={{ padding: 6, minWidth: 88 }}>{standard.title}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {g.students.map((student) => (
                        <tr key={student.id}>
                          <td style={{ padding: 6, fontWeight: 700 }}>{student.name}</td>
                          {g.standards.map((standard) => {
                            const grade = g.cells[`${student.id}:${standard.standard}`];
                            return <td key={standard.standard} style={{ padding: 6, textAlign: "center" }}>{grade == null ? "—" : <span style={{ display: "inline-block", minWidth: 64, borderRadius: 999, padding: "3px 8px", fontWeight: 700, color: "#fff", background: levelColor(grade) }}>{levelWord(grade)}</span>}</td>;
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {g.standards.filter((standard) => standard.mistake).map((standard) => (
                    <p key={standard.standard} style={{ fontSize: 13, margin: "10px 0 0" }}><b>{standard.title}.</b> {standard.mistake}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BridgePage>
  );
}
