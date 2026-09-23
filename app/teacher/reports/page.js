"use client";

import {rememberedTeacherClass} from "../../../lib/teacherClass";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import Link from 'next/link';
import {BridgePage,PageHeading,ClassTabs,Empty} from '../../../components/teacher/BridgeUI';
import {subjectStyle} from '../../../lib/teacherBridge';
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";

// Sept 13 — Reports moves to the console-interior look, same pattern as
// My Classes and Student Progress (see Teacher_SiteWide_Redesign_Plan.md).
// Observatory's other destination — same aqua accent and background art as
// Student Progress, since the two share that landmark family. Only the
// visual layer changes here; every query/callback below is untouched.
const ACCENT = PAGE_ACCENTS["/teacher/reports"];
const BG = PAGE_BACKGROUNDS["/teacher/reports"];

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
  const [selectedClassId,setSelectedClassId]=useState("all");
  const [evidence,setEvidence]=useState([]);
  const classContextReady = React.useRef(false);
  useEffect(()=>{if(classes.length&&!classContextReady.current){classContextReady.current=true;setSelectedClassId(rememberedTeacherClass(classes,'all'))}},[classes]);
  const [error,setError]=useState(null);

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
    const { data: classesData, error: classError } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    if(classError){setError("Could not load reports. Please refresh to try again.");setLoading(false);return;}
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
    let evidenceRows=[];
    const gradesByStudent={};
    if (classIds.length > 0 && students.length > 0) {
      const { data: assignments } = await supabase.from("assignments").select("id, class_id, case_standard").in("class_id", classIds);
      const assignmentIds = (assignments || []).map((a) => a.id);
      const classByAssignment = Object.fromEntries((assignments || []).map((a) => [a.id, a.class_id]));

      let submissions = [];
      if (assignmentIds.length > 0) {
        const { data } = await supabase.from("submissions").select("student_id, assignment_id, teacher_grade, released, submitted_at").in("assignment_id", assignmentIds);
        submissions = data || [];
      }

      const standards=[...new Set((assignments||[]).map(a=>a.case_standard))];
      const {data:cases}=standards.length?await supabase.from('cases').select('standard, title, subject').in('standard',standards):{data:[]};
      evidenceRows=(assignments||[]).map(a=>({...a,case:(cases||[]).find(c=>c.standard===a.case_standard),submissions:submissions.filter(s=>s.assignment_id===a.id)}));
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

    setEvidence(evidenceRows);
    setAllStudents(students.map((s) => ({ ...s, support: gradesByStudent[s.id]?.length>0 && proficiencyBand(gradesByStudent[s.id].reduce((a,b)=>a+b,0)/gradesByStudent[s.id].length)==="Needs Support", className: (classesData || []).find((c) => c.id === s.class_id)?.name || "" })));
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

  const scoped=evidence.filter(a=>selectedClassId==='all'||a.class_id===selectedClassId);
  const byStandard=Object.values(scoped.reduce((m,a)=>{const key=a.case_standard;if(!m[key])m[key]={key,title:a.case?.title||key,subject:a.case?.subject,work:[]};m[key].work.push(...a.submissions);return m},{}));
  const support=allStudents.filter(s=>s.support&&(selectedClassId==='all'||s.class_id===selectedClassId));
  const studentMatches=allStudents.filter(s=>(selectedClassId==='all'||s.class_id===selectedClassId)&&s.first_name.toLowerCase().includes(search.toLowerCase()));
  return <BridgePage teacherEmail={teacherEmail}><PageHeading title="See what’s clicking" subtitle="Use learning evidence to plan your next step."><ClassTabs classes={classes} value={selectedClassId} onChange={setSelectedClassId} all/></PageHeading>
  {error&&<div className="cc-error" role="alert">{error}</div>}
  <div className="cc-toolbar"><input className="cc-input cc-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a student report" aria-label="Find a student report"/><Link className="cc-btn secondary" href="/teacher/reports/standards">Standards report</Link><Link className="cc-btn secondary" href="/teacher/reports/curriculum">Curriculum report</Link></div>
  {search&&<section className="cc-panel" style={{marginBottom:18}}>{studentMatches.length?studentMatches.map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{s.className}</p></div><Link className="cc-link" href={`/teacher/reports/student/${s.id}`}>Open report</Link></div>):<Empty>No matching students.</Empty>}</section>}
  <div className="cc-two"><section className="cc-panel"><h2>Learning evidence</h2><p className="cc-muted">Completed activities and teacher-reviewed work, across all dates.</p><div className="cc-table-scroll"><table className="cc-table"><thead><tr><th>Activity / standard</th><th>Evidence collected</th><th>Review</th></tr></thead><tbody>{byStandard.map(g=>{const submitted=g.work.filter(s=>s.submitted_at),graded=submitted.filter(s=>s.released&&s.teacher_grade!=null);return <tr key={g.key} style={{borderLeft:`3px solid ${subjectStyle(g.subject)["--subject"]}`}}><td><strong>{g.title}</strong><small>{g.key}</small></td><td>{submitted.length} submission{submitted.length===1?'':'s'}<small>{graded.length} released teacher review{graded.length===1?'':'s'}</small></td><td><Link className="cc-link" href="/teacher/reports/standards">View evidence →</Link></td></tr>})}</tbody></table></div>{!byStandard.length&&<Empty>Evidence will appear as your class works through assigned activities.</Empty>}</section>
  <aside className="cc-stack"><section className="cc-panel"><h2>Plan a follow-up</h2><p className="cc-muted">Students in the Needs Support band, based on released teacher grades.</p>{support.length?support.slice(0,5).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{s.className}</p></div><Link className="cc-link" href={`/teacher/reports/student/${s.id}`}>View</Link></div>):<p className="cc-muted">No students in this band in the selected scope.</p>}<Link className="cc-btn secondary" style={{marginTop:14}} href="/teacher/progress">Explore student progress</Link></section><section className="cc-panel"><h3>Class reports</h3>{classes.filter(c=>selectedClassId==='all'||c.id===selectedClassId).map(c=><div key={c.id} className="cc-person"><div><strong>{c.name}</strong><p>{c.studentCount} students</p></div><Link className="cc-link" href={`/teacher/reports/${c.id}`}>Open</Link></div>)}</section></aside></div>
  <section className="cc-panel cc-row cc-between" style={{marginTop:18}}><div><h2>Choose the next learning experience</h2><p className="cc-muted">Use the evidence above to choose a topic and assign it to a class or selected students.</p></div><Link className="cc-btn" href={`/teacher/assign/new${selectedClassId==='all'?'':`?classId=${selectedClassId}`}`}>Find an activity</Link></section>
  </BridgePage>;
}
