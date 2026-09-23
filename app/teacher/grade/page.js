"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Link from 'next/link';
import {BridgePage,PageHeading,ClassTabs,Empty} from '../../../components/teacher/BridgeUI';
import {subjectStyle} from '../../../lib/teacherBridge';
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS } from "../../../lib/teacherTheme";

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
  useEffect(()=>{const id=new URLSearchParams(window.location.search).get("classId");if(id)setSelectedClassId(id)},[]);
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
    const { data: cases } = caseStandards.length > 0 ? await supabase.from("cases").select("standard, title, subject").in("standard", caseStandards) : { data: [] };

    const studentMap = Object.fromEntries((students || []).map((s) => [s.id, s]));
    const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));

    const merged = list.map((s) => {
      const assignment = assignmentMap[s.assignment_id];
      return {
        ...s,
        subject: assignment ? caseMap[assignment.case_standard]?.subject : null,
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
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  const rows=filteredSubmissions.filter(s=>(assignmentFilter==='all'||s.assignment_id===assignmentFilter)&&(reviewFilter==='all'||(reviewFilter==='review'?needsReview(s):!needsReview(s))));
  const chosen=rows.find(s=>needsReview(s));
  return <BridgePage teacherEmail={teacherEmail}>
    <PageHeading title="Review student work" subtitle="See what is finished and what needs your feedback."><ClassTabs classes={classes} value={selectedClassId} onChange={id=>{setSelectedClassId(id);setAssignmentFilter('all')}} all/></PageHeading>
    {error&&<div className="cc-error" role="alert">{error}</div>}
    <div className="cc-three"><div className="cc-summary"><strong>{totalNeedsReview}</strong><span>ready to review</span></div><div className="cc-summary"><strong>{classFilteredSubmissions.filter(s=>s.teacher_grade!=null&&!s.revision_requested).length}</strong><span>graded</span></div><div className="cc-summary"><strong>{classFilteredSubmissions.filter(s=>s.revision_requested).length}</strong><span>returned for revision</span></div></div>
    <section className="cc-panel cc-frame" style={subjectStyle(assignmentFilter==='all'?null:submissions.find(s=>s.assignment_id===assignmentFilter)?.subject)}>
    <div className="cc-toolbar"><select aria-label="Assignment" value={assignmentFilter} onChange={e=>setAssignmentFilter(e.target.value)}><option value="all">All assignments</option>{assignmentGroups.map(g=><option key={g.assignmentId} value={g.assignmentId}>{g.caseTitle}</option>)}</select><input className="cc-input cc-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a student" aria-label="Find a student"/><button className="cc-btn" disabled={!totalNeedsReview} onClick={handleGradeNext}>Review next</button></div>
    <div className="cc-tabs">{[['all','All submissions'],['review','Needs review'],['reviewed','Reviewed / returned']].map(([key,label])=><button key={key} aria-pressed={reviewFilter===key} onClick={()=>setReviewFilter(key)}>{label}</button>)}</div>
    <div className="cc-table-scroll"><table className="cc-table"><thead><tr><th>Student</th><th>Assignment</th><th>Submitted</th><th>Teacher score</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(s=><tr key={s.id}><td><strong>{s.studentName}</strong><small>{s.className}</small></td><td>{s.caseTitle}</td><td>{new Date(s.submitted_at).toLocaleDateString()}</td><td>{s.teacher_grade==null?'—':`${s.teacher_grade} / 2`}</td><td><span className={'cc-badge '+(s.released?'teal':s.revision_requested?'neutral':'')}>{s.released?'Released':s.revision_requested?'Returned':needsReview(s)?'Needs review':'Graded'}</span></td><td><Link className={'cc-btn '+(needsReview(s)?'':'secondary')} href={`/teacher/grade/${s.id}`}>{needsReview(s)?'Review work':'View work'}</Link></td></tr>)}</tbody></table></div>
    {!rows.length&&<Empty>{submissions.length?'No submissions match these filters.':'Student submissions will appear here when they are ready.'}</Empty>}
    <p className="cc-muted">Teacher scores use the existing 0–2 rubric. Open student work to review the evidence and release feedback.</p></section>
    {chosen&&<section className="cc-panel cc-row cc-between" style={{marginTop:18}}><div><h2>Next up: {chosen.studentName}</h2><p className="cc-muted">{chosen.caseTitle} · Awaiting your feedback</p></div><Link className="cc-btn" href={`/teacher/grade/${chosen.id}`}>Open full response</Link></section>}
  </BridgePage>;
}
