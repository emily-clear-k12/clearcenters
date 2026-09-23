"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import {BridgePage,PageHeading,ClassTabs,Empty} from "../../../components/teacher/BridgeUI";
import {rememberedTeacherClass} from "../../../lib/teacherClass";


// Sept 14 — Feature 5 of the teacher-efficiency build (see
// Teacher_SiteWide_Redesign_Plan.md), and the last of the five. Turns this
// from a "Coming Soon" stub into real messaging: an announcement to a
// whole class, or a direct nudge to one student, both landing in that
// student's own in-app inbox (app/messages) — no email, per the scope
// decision made before this build started (the app has no parent/guardian
// data model or email-sending integration at all).
//
// Deliberately its own thing, not a reuse of the existing S.A.M. shoutout
// system (RewardsModal's "shoutout" tab on Overview, `sam_shoutouts`
// table) — shoutouts are a single ephemeral, always-encouraging note "from
// S.A.M.," one active note at a time, no history. This is real free-text
// messaging from the teacher themselves, class-wide or direct, kept as a
// real history both sides can see, with per-student read tracking.


function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function MessagesPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [history, setHistory] = useState([]);

  const [classId, setClassId] = useState("");
  const [mode, setMode] = useState("class"); // "class" | "student"
  const [studentId, setStudentId] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text }

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      load(data.user.id);
      setLoadingAuth(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async (tId) => {
    setLoading(true);

    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", tId).order("name");
    const classList = classesData || [];
    setClasses(classList);
    setClassId((prev) => prev || rememberedTeacherClass(classList, classList[0]?.id || ""));
    const classIds = classList.map((c) => c.id);

    if (classIds.length > 0) {
      // Same "SQL delivered != SQL run" hardening as Roster Management —
      // `active` may not exist yet, so fall back to treating everyone as
      // active rather than erroring out on the student picker.
      let { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("id, first_name, class_id, active")
        .in("class_id", classIds);
      if (studentsError) {
        const fallback = await supabase.from("students").select("id, first_name, class_id").in("class_id", classIds);
        studentsData = (fallback.data || []).map((s) => ({ ...s, active: true }));
      } else {
        studentsData = (studentsData || []).map((s) => ({ ...s, active: s.active !== false }));
      }
      setStudents(studentsData.filter((s) => s.active));

      const { data: historyData } = await supabase
        .from("teacher_messages")
        .select("id, batch_id, class_id, student_id, is_broadcast, body, created_at, read_at, students(first_name), classes(name)")
        .eq("teacher_id", tId)
        .order("created_at", { ascending: false });
      setHistory(historyData || []);
    }

    setLoading(false);
  }, []);

  // Group the flat per-recipient rows back into one card per send — every
  // row in a batch shares the same body/class/timestamp, so this is just
  // "how many recipients, how many have read it" per batch_id.
  const batches = useMemo(() => {
    const map = new Map();
    history.forEach((row) => {
      if (!map.has(row.batch_id)) {
        map.set(row.batch_id, {
          batchId: row.batch_id,
          body: row.body,
          createdAt: row.created_at,
          isBroadcast: row.is_broadcast,
          className: row.classes?.name || "",
          studentName: row.is_broadcast ? null : row.students?.first_name || "",
          total: 0,
          read: 0,
        });
      }
      const b = map.get(row.batch_id);
      b.total += 1;
      if (row.read_at) b.read += 1;
    });
    return [...map.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [history]);

  const classStudents = students.filter((s) => s.class_id === classId);
  const canSend = classId && body.trim() && (mode === "class" ? classStudents.length > 0 : !!studentId) && !sending;

  async function handleSend() {
    if (!canSend) return;
    setSending(true);
    setStatus(null);
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    try {
      if (!accessToken) throw new Error("Your session expired — refresh the page and try again.");
      const res = await fetch("/api/teacher/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId, studentId: mode === "student" ? studentId : null, body, accessToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Couldn't send that.");
      setStatus({ type: "success", text: mode === "class" ? `Sent to ${json.recipientCount} student${json.recipientCount === 1 ? "" : "s"}!` : "Sent!" });
      setBody("");
      if (teacherId) await load(teacherId);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Couldn't send that." });
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4000);
    }
  }

  if (loadingAuth || loading) return <BridgePage teacherEmail={teacherEmail}><Empty>Loading notes…</Empty></BridgePage>;
  return <BridgePage teacherEmail={teacherEmail}>
    <PageHeading title="Notes" subtitle="Send encouragement, reminders, and announcements to your students.">
      <ClassTabs classes={classes} value={classId} onChange={id=>{setClassId(id);setStudentId('');setStatus(null)}}/>
    </PageHeading>
    {!classes.length?<Empty>No classes yet.</Empty>:<div className="cc-two cc-notes-layout">
      <section className="cc-panel">
        <h2>New note</h2>
        <p className="cc-muted">To {classes.find(c=>c.id===classId)?.name}</p>
        <div className="cc-classes cc-note-modes" aria-label="Note recipients">
          <button aria-pressed={mode==='class'} onClick={()=>setMode('class')}>Whole class</button>
          <button aria-pressed={mode==='student'} onClick={()=>setMode('student')}>One student</button>
        </div>
        {mode==='student'&&<label className="cc-field">Student<select value={studentId} onChange={e=>setStudentId(e.target.value)}><option value="">Choose a student…</option>{classStudents.map(s=><option key={s.id} value={s.id}>{s.first_name}</option>)}</select></label>}
        {mode==='class'&&!classStudents.length&&<p className="cc-muted">No active students in this class.</p>}
        <label className="cc-field">Your note<textarea className="cc-input cc-note-body" value={body} onChange={e=>setBody(e.target.value)} placeholder={mode==='class'?'Write an announcement for the whole class…':'Write a note for this student…'} rows={7} maxLength={2000}/></label>
        <div className="cc-row cc-between"><span className="cc-muted">{body.length}/2,000</span><button className="cc-btn" onClick={handleSend} disabled={!canSend}><Send size={15}/>{sending?'Sending…':'Send note'}</button></div>
        {status&&<p role="status" className={status.type==='error'?'cc-error':'cc-muted'}>{status.text}</p>}
      </section>
      <aside className="cc-stack">
        <section className="cc-panel"><div className="cc-row cc-between"><h2>Sent notes</h2><span className="cc-badge">All classes</span></div>
          {!batches.length?<Empty>Your sent notes will appear here.</Empty>:<div className="cc-sent-notes">{batches.map(b=><article className="cc-sent-note" key={b.batchId}>
            <div className="cc-row cc-between"><strong>{b.isBroadcast?`Whole class · ${b.className}`:`${b.studentName} · ${b.className}`}</strong><time className="cc-muted" dateTime={b.createdAt}>{timeAgo(b.createdAt)}</time></div>
            <p>{b.body}</p><span className="cc-badge neutral">{b.total===1?(b.read===1?'Read':'Not read yet'):`Read by ${b.read} of ${b.total}`}</span>
          </article>)}</div>}
        </section>
        <Link className="cc-btn secondary" href="/teacher/badges">Give a reward</Link>
      </aside>
    </div>}
  </BridgePage>;
}
