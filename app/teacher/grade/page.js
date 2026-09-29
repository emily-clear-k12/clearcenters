"use client";

import {rememberedTeacherClass} from "../../../lib/teacherClass";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Link from 'next/link';
import {BridgePage,PageHeading,ClassTabs,Empty} from '../../../components/teacher/BridgeUI';
import {subjectStyle} from '../../../lib/teacherBridge';
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS } from "../../../lib/teacherTheme";
import { isPracticeGame } from "../../../lib/engineKinds";
import { levelWord } from "../../../lib/gradeScale";

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function htmlCell(value) {
  return String(value ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&", "<": "<", ">": ">", '"': """ }[ch]));
}

function downloadText(filename, text) {
  const blob = new Blob(["\uFEFF" + text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Sept 13 — moved to the console-interior look, same pattern as the rest of
// the app. Grading isn't one of the 5 Overview landmarks by itself, so it
// shares Progress/Reports' aqua Observatory accent and background (see the
// note in lib/teacherTheme.js) rather than getting a 6th color invented for
// it. Only the decorative violet (banner, tabs, class badges) moved to
// ACCENT — the amber "needs review" / teal "handled" submission-status
// colors are genuine status signals, not page branding, so they're
// untouched, same principle as every other page in this redesign. No
// query or grading logic changed. The individual grading screen
// (grade/[submissionId]) is a much larger page and got its own separate
// pass, done the same evening — also on TeacherHUD/panelStyle/ACCENT now.
const ACCENT = PAGE_ACCENTS["/teacher/grade"];
const BG = PAGE_BACKGROUNDS["/teacher/grade"];

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
  const [reviewFilter,setReviewFilter]=useState("all");
  const [assignmentFilter,setAssignmentFilter]=useState("all");
  const [book, setBook] = useState(null);

  const classContextReady = React.useRef(false);
  useEffect(()=>{if(classes.length&&!classContextReady.current){classContextReady.current=true;setSelectedClassId(rememberedTeacherClass(classes,'all'))}},[classes]);
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

    const { data: assignments } = await supabase.from("assignments").select("id, case_standard, due_date, class_id, game_skin").in("class_id", classIds);
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
    const { data: cases } = caseStandards.length > 0 ? await supabase.from("cases").select("standard, title, subject, engine").in("standard", caseStandards) : { data: [] };

    const studentMap = Object.fromEntries((students || []).map((s) => [s.id, s]));
    const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));

    const merged = list.map((s) => {
      const assignment = assignmentMap[s.assignment_id];
      const caseRow = assignment ? caseMap[assignment.case_standard] : null;
      return {
        ...s,
        subject: assignment ? caseRow?.subject : null,
        engine: assignment ? caseRow?.engine : null,
        gameSkin: assignment ? assignment.game_skin : null,
        studentName: studentMap[s.student_id]?.first_name || "Unknown student",
        caseTitle: assignment ? (caseRow?.title || assignment.case_standard) : "Unknown case",
        classId: assignment ? assignment.class_id : null,
        className: assignment ? classMap[assignment.class_id]?.name : "Unknown class",
      };
    }).filter((s) => !isPracticeGame(s.engine, s.gameSkin));

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

  function latestScore(studentId, assignmentId) {
    const matches = submissions.filter((s) => s.student_id === studentId && s.assignment_id === assignmentId);
    if (!matches.length) return null;
    return matches.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))[0];
  }

  function scoreWord(studentId, assignmentId) {
    const row = latestScore(studentId, assignmentId);
    if (!row) return "";
    if (row.teacher_grade == null) return "Needs review";
    return levelWord(row.teacher_grade, row.engine);
  }

  function scoreNumber(studentId, assignmentId) {
    const row = latestScore(studentId, assignmentId);
    if (!row || row.teacher_grade == null) return "";
    return String(row.teacher_grade);
  }

  async function openBook() {
    let classId = selectedClassId !== "all" ? selectedClassId : null;
    if (!classId && assignmentFilter !== "all") {
      classId = submissions.find((s) => s.assignment_id === assignmentFilter)?.classId || null;
    }
    if (!classId) classId = classes[0]?.id || null;
    if (!classId) return;
    const { data: kids } = await supabase.from("students").select("id, first_name").eq("class_id", classId).order("first_name");
    const { data: assigns } = await supabase.from("assignments").select("id, case_standard, class_id, game_skin").eq("class_id", classId);
    const standards = [...new Set((assigns || []).map((a) => a.case_standard).filter(Boolean))];
    const { data: caseRows } = standards.length ? await supabase.from("cases").select("standard, title, engine").in("standard", standards) : { data: [] };
    const caseMap = Object.fromEntries((caseRows || []).map((c) => [c.standard, c]));
    let columns = (assigns || [])
      .filter((a) => !isPracticeGame(caseMap[a.case_standard]?.engine, a.game_skin))
      .map((a) => ({ id: a.id, title: caseMap[a.case_standard]?.title || a.case_standard }));
    if (assignmentFilter !== "all") columns = columns.filter((column) => column.id === assignmentFilter);
    setBook({
      className: classes.find((c) => c.id === classId)?.name || "Class",
      students: kids || [],
      columns,
    });
  }

  function exportExcel() {
    if (!book) return;
    const header = ["Student", ...book.columns.map((column) => column.title)];
    const lines = book.students.map((student) => [student.first_name, ...book.columns.map((column) => scoreWord(student.id, column.id))]);
    downloadText(`${book.className} gradebook.csv`, [header, ...lines].map((line) => line.map(csvCell).join(",")).join("\n"));
  }

  function exportSkyward() {
    if (!book) return;
    const header = ["Student Name", "Assignment", "Score", "Points Possible"];
    const lines = [];
    book.students.forEach((student) => {
      book.columns.forEach((column) => {
        lines.push([student.first_name, column.title, scoreNumber(student.id, column.id), "2"]);
      });
    });
    downloadText(`${book.className} skyward.csv`, [header, ...lines].map((line) => line.map(csvCell).join(",")).join("\n"));
  }

  function exportSchoology() {
    if (!book) return;
    const header = ["Student", ...book.columns.map((column) => column.title)];
    const lines = book.students.map((student) => [student.first_name, ...book.columns.map((column) => scoreNumber(student.id, column.id))]);
    downloadText(`${book.className} schoology.csv`, [header, ...lines].map((line) => line.map(csvCell).join(",")).join("\n"));
  }

  function exportPdf() {
    if (!book) return;
    const header = ["Student", ...book.columns.map((column) => column.title)].map((cell) => `<th>${htmlCell(cell)}</th>`).join("");
    const body = book.students.map((student) => `<tr><td>${htmlCell(student.first_name)}</td>${book.columns.map((column) => `<td>${htmlCell(scoreWord(student.id, column.id) || "—")}</td>`).join("")}</tr>`).join("");
    const popup = window.open("", "_blank");
    if (!popup) return;
    popup.document.write(`<html><head><title>${htmlCell(book.className)} gradebook</title><style>body{font-family:sans-serif;padding:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:6px;font-size:12px;text-align:left}h1{font-size:20px}</style></head><body><h1>${htmlCell(book.className)} gradebook</h1><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
  }

  if (loadingAuth || loadingSubs) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  const rows=filteredSubmissions.filter(s=>(assignmentFilter==='all'||s.assignment_id===assignmentFilter)&&(reviewFilter==='all'||(reviewFilter==='review'?needsReview(s):!needsReview(s))));
  const chosen=rows.find(s=>needsReview(s));
  return <BridgePage teacherEmail={teacherEmail}>
    <PageHeading title="Review student work" subtitle="See what is finished and what needs your feedback."><ClassTabs classes={classes} value={selectedClassId} onChange={id=>{setSelectedClassId(id);setAssignmentFilter('all');setBook(null)}} all/><button className="cc-btn" style={{marginTop:10}} onClick={openBook}>Gradebook</button></PageHeading>
    {error&&<div className="cc-error" role="alert">{error}</div>}
    {book&&<section className="cc-panel" style={{marginBottom:18}}><div className="cc-row cc-between"><div><h2 style={{margin:0}}>{book.className} gradebook</h2><p className="cc-muted">{book.columns.length===1?book.columns[0].title:`${book.columns.length} assignments`} · filled from the grades you have already given.</p></div><button className="cc-btn secondary" onClick={()=>setBook(null)}>Close</button></div><div className="cc-row" style={{margin:"12px 0"}}><button className="cc-btn secondary" onClick={exportExcel}>Excel</button><button className="cc-btn secondary" onClick={exportPdf}>PDF</button><button className="cc-btn secondary" onClick={exportSkyward}>Skyward</button><button className="cc-btn secondary" onClick={exportSchoology}>Schoology</button></div><p className="cc-muted">Skyward and Schoology get a 0–2 score. Match each student name to their ID in that system before you upload.</p><div className="cc-table-scroll"><table className="cc-table"><thead><tr><th>Student</th>{book.columns.map(column=><th key={column.id}>{column.title}</th>)}</tr></thead><tbody>{book.students.map(student=><tr key={student.id}><td><Link href={`/teacher/students/${student.id}`}><strong>{student.first_name}</strong></Link></td>{book.columns.map(column=><td key={column.id}>{scoreWord(student.id, column.id)||'—'}</td>)}</tr>)}</tbody></table></div>{!book.students.length&&<Empty>No students in this class yet.</Empty>}</section>}
    <div className="cc-three"><div className="cc-summary"><strong>{totalNeedsReview}</strong><span>ready to review</span></div><div className="cc-summary"><strong>{classFilteredSubmissions.filter(s=>s.teacher_grade!=null&&!s.revision_requested).length}</strong><span>graded</span></div><div className="cc-summary"><strong>{classFilteredSubmissions.filter(s=>s.revision_requested).length}</strong><span>returned for revision</span></div></div>
    <section className="cc-panel cc-frame" style={subjectStyle(assignmentFilter==='all'?null:submissions.find(s=>s.assignment_id===assignmentFilter)?.subject)}>
    <div className="cc-toolbar"><select aria-label="Assignment" value={assignmentFilter} onChange={e=>{setAssignmentFilter(e.target.value);setBook(null)}}><option value="all">All assignments</option>{assignmentGroups.map(g=><option key={g.assignmentId} value={g.assignmentId}>{g.caseTitle}</option>)}</select><input className="cc-input cc-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a student" aria-label="Find a student"/><button className="cc-btn" disabled={!totalNeedsReview} onClick={handleGradeNext}>Review next</button></div>
    <div className="cc-tabs">{[['all','All submissions'],['review','Needs review'],['reviewed','Reviewed / returned']].map(([key,label])=><button key={key} aria-pressed={reviewFilter===key} onClick={()=>setReviewFilter(key)}>{label}</button>)}</div>
    <div className="cc-table-scroll"><table className="cc-table"><thead><tr><th>Student</th><th>Assignment</th><th>Submitted</th><th>Teacher score</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(s=><tr key={s.id}><td><Link href={`/teacher/students/${s.student_id}`}><strong>{s.studentName}</strong></Link><small>{s.className}</small></td><td>{s.caseTitle}</td><td>{new Date(s.submitted_at).toLocaleDateString()}</td><td>{s.teacher_grade==null?'—':`${s.teacher_grade} / 2`}</td><td><span className={'cc-badge '+(s.released?'teal':s.revision_requested?'neutral':'')}>{s.released?'Released':s.revision_requested?'Returned':needsReview(s)?'Needs review':'Graded'}</span></td><td><Link className={'cc-btn '+(needsReview(s)?'':'secondary')} href={`/teacher/grade/${s.id}`}>{needsReview(s)?'Review work':'View work'}</Link></td></tr>)}</tbody></table></div>
    {!rows.length&&<Empty>{submissions.length?'No submissions match these filters.':'Student submissions will appear here when they are ready.'}</Empty>}
    <p className="cc-muted">Teacher scores use the existing 0–2 rubric. Open student work to review the evidence and release feedback.</p></section>
    {chosen&&<section className="cc-panel cc-row cc-between" style={{marginTop:18}}><div><h2>Next up: {chosen.studentName}</h2><p className="cc-muted">{chosen.caseTitle} · Awaiting your feedback</p></div><Link className="cc-btn" href={`/teacher/grade/${chosen.id}`}>Open full response</Link></section>}
  </BridgePage>;
}
