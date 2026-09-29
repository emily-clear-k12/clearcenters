"use client";

// One small group — Sept 29, 2026.
// Follows a saved group from "made it" to "everyone gets it":
//   How they're doing   where each student started, the follow-up, the table checks
//   Plan for the table  the standard, what went wrong, a plan and check questions
//   At the table        tap Got it now / Still shaky and jot a note, per student
//   Follow-up           what was assigned since, and what to assign next
// Progress comes from the same book as the gradebook (lib/gradebook.js).

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import { BridgePage, Empty } from "../../../../components/teacher/BridgeUI";
import { rememberTeacherClass } from "../../../../lib/teacherClass";
import { engineInfo } from "../../../../lib/teacherBridge";
import { levelWord } from "../../../../lib/gradeScale";
import { standardWording } from "../../../../lib/standardWording";
import { codesFor, mainCode } from "../../../../lib/standardCodes";
import { buildGradebook, cellWord, isGraded, studentStats, WAITING, MISSING, NOT_ASSIGNED } from "../../../../lib/gradebook";
import {
  CHECKS, ROW_LABELS, groupProgress, groupStandard, whatWentWrong, suggestActivities, meetings, groupRow,
} from "../../../../lib/smallGroups";
import { groupsApi, loadTeacherBook } from "../../../../lib/groupsApi";
import "../../gradebook/gradebook.css";
import "../groups.css";

function niceDate(value, withDay) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, withDay ? { weekday: "short", month: "short", day: "numeric" } : { month: "short", day: "numeric" });
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

function Level({ level }) {
  if (level == null) return <span className="gb-chip km word">No grade</span>;
  return <span className={`gb-chip k${level} word`}>{levelWord(level)}</span>;
}

function cellChip(cell) {
  if (!cell || cell.kind === NOT_ASSIGNED) return <span className="gb-chip kn">–</span>;
  if (isGraded(cell)) return <span className={`gb-chip k${cell.kind}`}>{cell.kind}</span>;
  if (cell.kind === WAITING) return <span className="gb-chip kw">?</span>;
  if (cell.kind === MISSING) return <span className={`gb-chip km${cell.pastDue ? " late" : ""}`}>{cell.pastDue ? "!" : "·"}</span>;
  return <span className="gb-chip kr">↺</span>;
}

function statusClass(row) {
  if (row.done || row.movedUp || row.followLevel === 2 || row.lastCheck === "got" && row.followLevel == null) return "up";
  if (row.slipped) return "down";
  if (row.waiting) return "wait";
  return "";
}

function Board({ questions, onClose }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { setI((n) => Math.min(n + 1, questions.length - 1)); setShow(false); }
      if (e.key === "ArrowLeft") { setI((n) => Math.max(n - 1, 0)); setShow(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [questions.length, onClose]);
  const q = questions[i];
  return (
    <div className="sg-board" role="dialog" aria-modal="true" aria-label="Check questions">
      <header><span>Check question {i + 1} of {questions.length}</span><button type="button" onClick={onClose}>Close</button></header>
      <main>
        <div>
          <h2>{q.q}</h2>
          {show && <div className="sg-answer">{q.a}</div>}
        </div>
      </main>
      <footer>
        <button type="button" disabled={i === 0} onClick={() => { setI(i - 1); setShow(false); }}>Back</button>
        <button type="button" className="main" onClick={() => setShow(!show)}>{show ? "Hide answer" : "Show answer"}</button>
        <button type="button" disabled={i === questions.length - 1} onClick={() => { setI(i + 1); setShow(false); }}>Next</button>
      </footer>
    </div>
  );
}

export default function GroupPage() {
  const router = useRouter();
  const { groupId } = useParams();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [data, setData] = useState(null);
  const [allCases, setAllCases] = useState([]);
  const [group, setGroup] = useState(null);
  const [notes, setNotes] = useState([]);
  const [planning, setPlanning] = useState(false);
  const [planError, setPlanError] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [board, setBoard] = useState(false);
  const [meet, setMeet] = useState({});
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // Set of student ids while editing who's in the group
  const [renaming, setRenaming] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    setError("");
    try {
      const [rows, got] = await Promise.all([loadTeacherBook(teacherId), groupsApi("get", { groupId })]);
      setData(rows);
      setGroup(got.group);
      setNotes(got.notes || []);
      rememberTeacherClass(got.group.class_id);
      if (got.group.subject) {
        const { data: cases } = await supabase.from("cases").select("standard, title, engine, subject").eq("subject", got.group.subject);
        setAllCases(cases || []);
      }
    } catch (err) {
      setError(err.message || "Couldn't load this group.");
    }
    setLoading(false);
  }, [groupId]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: auth, error: authError }) => {
      if (authError || !auth?.user) { router.push("/login"); return; }
      setTeacherEmail(auth.user.email || "");
      load(auth.user.id);
    });
  }, [router, load]);

  const book = useMemo(() => (data && group ? buildGradebook({ classId: group.class_id, periodKey: "all", ...data }) : null), [data, group]);
  const progress = useMemo(() => (book && group ? groupProgress(book, group, notes) : null), [book, group, notes]);
  const wrong = useMemo(() => (book && group ? whatWentWrong(book, group) : []), [book, group]);

  async function update(patch, message) {
    setError("");
    try {
      const res = await groupsApi("update", { groupId, patch });
      setGroup(res.group);
      if (message) setNotice(message);
    } catch (err) { setError(err.message); }
  }

  async function makePlan() {
    setPlanning(true);
    setPlanError("");
    try {
      const res = await groupsApi("plan", { groupId });
      setGroup(res.group);
    } catch (err) { setPlanError(err.message); }
    setPlanning(false);
  }

  async function saveMeeting() {
    setSaving(true);
    setError("");
    const entries = Object.entries(meet).map(([studentId, v]) => ({ studentId, check: v.check || null, note: v.note || "" }));
    try {
      const res = await groupsApi("meet", { groupId, entries });
      setNotes(res.notes || []);
      setMeet({});
      setNotice("Meeting saved.");
    } catch (err) { setError(err.message); }
    setSaving(false);
  }

  async function removeGroup() {
    try {
      await groupsApi("delete", { groupId });
      router.push(`/teacher/groups?classId=${group.class_id}`);
    } catch (err) { setError(err.message); }
  }

  if (loading) return <div className="cc-loading">Loading…</div>;
  if (!group || !book) {
    return <BridgePage teacherEmail={teacherEmail}><div className="sg"><Link className="sg-back" href="/teacher/groups">← Small groups</Link><Empty>{error || "This group couldn't be found."}</Empty></div></BridgePage>;
  }

  const cls = data.classes.find((c) => c.id === group.class_id) || {};
  const std = groupStandard(book, group);
  const wording = group.plan?.wording || std?.wording || standardWording(group.subject, group.standard_code);
  const classAssignments = data.assignments.filter((a) => a.class_id === group.class_id);
  const caseMap = Object.fromEntries(data.cases.map((c) => [c.standard, c]));
  const targets = [...new Set(classAssignments
    .filter((a) => group.standard_code && (mainCode(a.case_standard) === group.standard_code || codesFor(a.case_standard).includes(group.standard_code)))
    .map((a) => caseMap[a.case_standard])
    .filter((c) => c && (!group.subject || !c.subject || c.subject === group.subject))
    .map((c) => c.learning_target)
    .filter(Boolean))].slice(0, 3);
  const ideas = suggestActivities(allCases, book, group, classAssignments.map((a) => a.case_standard));
  const rows = progress.rows;
  const active = rows.filter((r) => !r.done);
  const activeIds = active.map((r) => r.student.id);
  const plan = group.plan;
  const planNotes = Object.fromEntries((plan?.students || []).map((s) => [s.studentId, s.note]));
  const closed = group.status === "closed";
  const pastMeetings = meetings(notes);
  const nameOf = (id) => book.students.find((s) => s.id === id)?.first_name || "Student";
  const want = groupRow(group);

  function assignHref(ids, engine) {
    const params = new URLSearchParams({ classId: group.class_id });
    if (engine) params.set("engine", engine);
    if (group.standard_code) params.set("standard", group.standard_code);
    if (group.subject) params.set("subject", group.subject);
    params.set("students", ids.join(","));
    return `/teacher/assign/new?${params.toString()}`;
  }

  function setMark(id, check) {
    const cur = meet[id] || {};
    setMeet({ ...meet, [id]: { ...cur, check: cur.check === check ? null : check } });
  }

  function toggleDone(id) {
    const done = new Set(group.done_ids || []);
    if (done.has(id)) done.delete(id); else done.add(id);
    update({ doneIds: [...done] }, done.has(id) ? `${nameOf(id)} is done with this group.` : `${nameOf(id)} is back in the group.`);
  }

  function saveMembers() {
    const ids = [...editing];
    const startLevels = {};
    ids.forEach((id) => { startLevels[id] = std ? studentStats(book, id, std.columnIds).level : null; });
    update({ studentIds: ids, startLevels }, "Group updated.");
    setEditing(null);
  }

  function printCard() {
    const kids = active.map((r) => `<tr><td><b>${esc(r.student.first_name)}</b><br><small>Started: ${esc(r.startLevel == null ? "No grade" : levelWord(r.startLevel))}</small>${planNotes[r.student.id] ? `<br><small>${esc(planNotes[r.student.id])}</small>` : ""}</td><td>☐ Got it now<br>☐ Still shaky</td><td></td></tr>`).join("");
    const steps = (plan?.steps || []).map((s) => `<li>${esc(s)}</li>`).join("");
    const qs = (plan?.questions || []).map((q) => `<li>${esc(q.q)}<br><small>Listen for: ${esc(q.a)}</small></li>`).join("");
    const popup = window.open("", "_blank");
    if (!popup) return;
    popup.document.write(`<html><head><title>${esc(group.name)}</title><style>body{font-family:Inter,Arial,sans-serif;padding:24px;color:#241b50;font-size:13px}h1{font-size:20px;margin:0 0 2px}h2{font-size:14px;margin:16px 0 6px}p{margin:0 0 6px}small{color:#70658d}ol{margin:0;padding-left:18px}li{margin-bottom:6px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #d9d3ea;padding:8px;vertical-align:top;text-align:left}th{background:#f3effa}td:last-child{width:45%}</style></head><body><h1>${esc(group.name)}</h1><p><small>${esc(cls.name || "")} · TEKS ${esc(group.standard_code || "")}${group.subject ? ` · ${esc(group.subject)}` : ""} · printed ${esc(new Date().toLocaleDateString())}</small></p>${wording ? `<p>${esc(wording)}</p>` : ""}${targets.length ? `<p><b>${targets.map(esc).join("<br>")}</b></p>` : ""}${plan?.mixUp ? `<h2>The mix-up</h2><p>${esc(plan.mixUp)}</p>` : ""}${steps ? `<h2>At the table</h2><ol>${steps}</ol>` : ""}${plan?.materials ? `<p><small>Have ready: ${esc(plan.materials)}</small></p>` : ""}${qs ? `<h2>Check questions</h2><ol>${qs}</ol>` : ""}<h2>Students</h2><table><thead><tr><th>Student</th><th>Check</th><th>Notes</th></tr></thead><tbody>${kids}</tbody></table></body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
  }

  const s = progress.summary;
  return (
    <BridgePage teacherEmail={teacherEmail}>
      <div className="sg">
        <Link className="sg-back" href={`/teacher/groups?classId=${group.class_id}`}>← Small groups</Link>
        <div className="sg-top">
          <div>
            {renaming != null ? (
              <form className="sg-row" onSubmit={(e) => { e.preventDefault(); update({ name: renaming }); setRenaming(null); }}>
                <input className="sg-name-input" aria-label="Group name" value={renaming} onChange={(e) => setRenaming(e.target.value)} autoFocus maxLength={80} />
                <button className="cc-btn" type="submit" disabled={!renaming.trim()}>Save</button>
                <button className="cc-btn quiet" type="button" onClick={() => setRenaming(null)}>Cancel</button>
              </form>
            ) : (
              <h1>{group.name} {closed && <span className="sg-tag closed">Closed</span>}</h1>
            )}
            <p className="sg-sub">
              {cls.name}{group.standard_code ? ` · TEKS ${group.standard_code}` : ""}{group.subject ? ` · ${group.subject}` : ""} · made {niceDate(group.created_at)} · {rows.length} {rows.length === 1 ? "student" : "students"}
              {renaming == null && <> · <button type="button" className="sg-link" onClick={() => setRenaming(group.name)}>Rename</button></>}
            </p>
            {wording && <p className="sg-wording">{wording}</p>}
          </div>
          <div className="sg-row">
            <button type="button" className="cc-btn secondary" onClick={printCard}>Print table card</button>
            {plan?.questions?.length > 0 && <button type="button" className="cc-btn secondary" onClick={() => setBoard(true)}>Show questions on the board</button>}
            {closed
              ? <button type="button" className="cc-btn" onClick={() => update({ status: "open" }, "Group reopened.")}>Reopen</button>
              : <button type="button" className="cc-btn secondary" onClick={() => update({ status: "closed" }, "Group closed. It's under Closed groups.")}>Close group</button>}
          </div>
        </div>

        {error && <div className="cc-error" role="alert">{error}</div>}
        {notice && <div className="cc-notice" role="status" onClick={() => setNotice("")}>{notice}</div>}

        {!closed && s.everyoneGetsIt && (
          <div className="sg-banner">
            <span>Everyone in this group has it now.</span>
            <button type="button" className="cc-btn" onClick={() => update({ status: "closed" }, "Group closed. Nice work.")}>Close the group</button>
          </div>
        )}

        <section className="sg-card" aria-label="How they're doing">
          <h2>How they're doing</h2>
          <p className="sg-hint">Started is their level when you made the group. Follow-up is anything on TEKS {group.standard_code} assigned since then.</p>
          <div className="sg-sum">
            <div className="sg-stat good"><b>{s.withFollow ? s.movedUp : "—"}</b><span>{s.withFollow ? `of ${s.withFollow} moved up` : "moved up · no follow-up grades yet"}</span></div>
            <div className="sg-stat good"><b>{s.ready}</b><span>ready to leave</span></div>
            <div className="sg-stat"><b>{s.done}</b><span>done</span></div>
            <div className="sg-stat"><b>{pastMeetings.length}</b><span>{pastMeetings.length === 1 ? "meeting" : "meetings"}{pastMeetings[0] ? ` · last ${niceDate(pastMeetings[0].at)}` : ""}</span></div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="sg-table">
              <thead><tr><th>Student</th><th>Started <span className="sg-arrow">→</span> Follow-up</th><th>At the table</th><th>Last note</th><th>Where they are</th><th></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.student.id} className={r.done ? "is-done" : ""}>
                    <td><strong>{r.student.first_name}</strong></td>
                    <td><Level level={r.startLevel} /><span className="sg-arrow">→</span>{r.followLevel != null ? <Level level={r.followLevel} /> : <span className="gb-note">—</span>}</td>
                    <td>{r.lastCheck ? <span className={`sg-tag ${r.lastCheck}`}>{CHECKS[r.lastCheck].label}</span> : <span className="gb-note">—</span>}</td>
                    <td><span className="gb-note">{r.lastNote}</span></td>
                    <td><span className={`sg-status ${statusClass(r)}`}>{r.status}</span>{r.ready && <> <span className="sg-tag ready">Ready to leave</span></>}</td>
                    <td>{!closed && <button type="button" className="sg-link" onClick={() => toggleDone(r.student.id)}>{r.done ? "Put back" : r.ready ? "Mark done" : "Done early"}</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!closed && (editing ? (
            <>
              <div className="sg-edit">
                {book.students.map((st) => (
                  <button key={st.id} type="button" className={`gb-name-chip${editing.has(st.id) ? "" : " is-out"}`} aria-pressed={editing.has(st.id)} onClick={() => { const next = new Set(editing); if (next.has(st.id)) next.delete(st.id); else next.add(st.id); setEditing(next); }}>{st.first_name}</button>
                ))}
              </div>
              <div className="sg-row">
                <button type="button" className="cc-btn" onClick={saveMembers} disabled={!editing.size}>Save students</button>
                <button type="button" className="cc-btn quiet" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <p style={{ margin: "10px 0 0" }}><button type="button" className="sg-link" onClick={() => setEditing(new Set(group.student_ids || []))}>Add or take out students</button></p>
          ))}
        </section>

        <div className="sg-cols">
          <section className="sg-card" aria-label="Plan for the table">
            <h2>Plan for the table</h2>
            {targets.map((t) => <p key={t} className="sg-target">{t}</p>)}
            <h3>What their work shows</h3>
            {wrong.map((w) => (
              <div key={w.student.id} className="sg-kid">
                <div className="sg-kid-top">
                  <strong>{w.student.first_name}</strong>
                  {w.marks.length ? w.marks.map((m) => (
                    <Link key={m.col.id} href={`/teacher/grade/${m.cell.submissionId}`} title={`${m.col.title}: ${cellWord(m.cell, m.col.engine)} · open their work`}>{cellChip(m.cell)}</Link>
                  )) : <span className="gb-note">Nothing graded on this before the group.</span>}
                  {w.sureButWrong.length > 0 && <span className="sg-sure">Was really sure{w.sureButWrong.length > 1 ? ` (${w.sureButWrong.length}×)` : ""}</span>}
                </div>
                {planNotes[w.student.id] && <p>{planNotes[w.student.id]}</p>}
              </div>
            ))}
            {wrong.some((w) => w.sureButWrong.length) && <p className="sg-hint" style={{ marginTop: 8 }}>"Was really sure" on a wrong answer usually means a wrong idea, not a gap. Start by asking them to explain their thinking.</p>}

            {plan ? (
              <div className="sg-plan">
                <div className="sg-row" style={{ justifyContent: "space-between" }}>
                  <strong>The mix-up</strong>
                  <span className="gb-note">Made {niceDate(plan.at || group.plan_at)} · <button type="button" className="sg-link" onClick={makePlan} disabled={planning}>{planning ? "Writing…" : "Make a new plan"}</button></span>
                </div>
                <p className="sg-mix">{plan.mixUp}</p>
                <h3>At the table · about 10 minutes</h3>
                <ol>{(plan.steps || []).map((step, i) => <li key={i}>{step}</li>)}</ol>
                {plan.materials && <p className="gb-note" style={{ marginTop: 8 }}>Have ready: {plan.materials}</p>}
                {plan.questions?.length > 0 && (
                  <>
                    <h3 className="sg-row" style={{ justifyContent: "space-between" }}>Check questions <button type="button" className="sg-link" onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? "Hide answers" : "Show answers"}</button></h3>
                    <div className="sg-qs">{plan.questions.map((q, i) => <div key={i} className="sg-q">{i + 1}. {q.q}{showAnswers && <small>Listen for: {q.a}</small>}</div>)}</div>
                  </>
                )}
                <p className="gb-note" style={{ marginTop: 10 }}>Written by AI from this group's work. Read it over before you use it.</p>
              </div>
            ) : (
              <div className="sg-plan">
                <p className="sg-mix">Make a plan from this group's work: the mix-up they share, three steps for about 10 minutes at the table, and three check questions.</p>
                <div className="sg-row" style={{ marginTop: 10 }}>
                  <button type="button" className="cc-btn" onClick={makePlan} disabled={planning || !group.standard_code}>{planning ? "Writing a plan… about 15 seconds" : "Make a plan"}</button>
                </div>
              </div>
            )}
            {planError && <div className="cc-error" role="alert" style={{ marginTop: 10 }}>{planError}</div>}
          </section>

          <div className="sg-stack">
            <section className="sg-card" aria-label="At the table">
              <h2>At the table</h2>
              <p className="sg-hint">Tap how each student did, jot a note, then save. It shows up here and in the gradebook.</p>
              {active.length ? (
                <div className="sg-meet">
                  {active.map((r) => {
                    const v = meet[r.student.id] || {};
                    return (
                      <div key={r.student.id} className="sg-meet-row">
                        <strong>{r.student.first_name}</strong>
                        <span className="sg-toggle">
                          <button type="button" className="got" aria-pressed={v.check === "got"} onClick={() => setMark(r.student.id, "got")}>Got it now</button>
                          <button type="button" className="shaky" aria-pressed={v.check === "shaky"} onClick={() => setMark(r.student.id, "shaky")}>Still shaky</button>
                        </span>
                        <input aria-label={`Note for ${r.student.first_name}`} placeholder="Note (optional)" value={v.note || ""} maxLength={500} onChange={(e) => setMeet({ ...meet, [r.student.id]: { ...v, note: e.target.value } })} />
                      </div>
                    );
                  })}
                  <div className="sg-row"><button type="button" className="cc-btn" onClick={saveMeeting} disabled={saving || !Object.values(meet).some((v) => v.check || (v.note || "").trim())}>{saving ? "Saving…" : "Save this meeting"}</button></div>
                </div>
              ) : <p className="gb-note">Everyone is done with this group.</p>}
              {pastMeetings.length > 0 && (
                <div className="sg-past">
                  {pastMeetings.map((m, i) => (
                    <details key={m.at} open={i === 0}>
                      <summary>{niceDate(m.at, true)} · {m.notes.length} {m.notes.length === 1 ? "student" : "students"}</summary>
                      <ul>{m.notes.map((n) => <li key={n.id}><b>{nameOf(n.student_id)}</b>{n.check_result ? ` · ${CHECKS[n.check_result]?.label}` : ""}{n.note ? ` · ${n.note}` : ""}</li>)}</ul>
                    </details>
                  ))}
                </div>
              )}
            </section>

            <section className="sg-card" aria-label="Follow-up">
              <h2>Follow-up</h2>
              {progress.follow.length ? (
                <div className="sg-follow">
                  {progress.follow.map((col) => (
                    <div key={col.id} className="sg-follow-row">
                      <span><strong>{col.title}</strong><small>{engineInfo(col.engine).label} · assigned {niceDate(col.createdAt)}</small></span>
                      <span className="sg-dots">{rows.map((r) => <span key={r.student.id} className="sg-dot" title={`${r.student.first_name}: ${cellWord(book.cells[r.student.id]?.[col.id], col.engine)}`}>{cellChip(book.cells[r.student.id]?.[col.id])}{r.student.first_name}</span>)}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="sg-hint">Nothing on TEKS {group.standard_code} has been assigned since you made the group. Assign one to see who moved up.</p>}
              {!closed && activeIds.length > 0 && (
                <>
                  <h3>Next for this group</h3>
                  {ideas.length ? (
                    <div className="sg-ideas">
                      {ideas.map((idea) => (
                        <div key={idea.standard} className="sg-idea">
                          <strong>{idea.title}</strong>
                          <small>{idea.label}{idea.row ? ` · ${ROW_LABELS[idea.row]}` : ""}{idea.minutes ? ` · ${idea.minutes}` : ""}{!idea.graded ? " · scores itself" : ""}</small>
                          {idea.row === want && <span className="sg-tag plan" style={{ justifySelf: "start" }}>Fits this group</span>}
                          <Link className="cc-btn" href={assignHref(activeIds, idea.engine)}>Assign to {activeIds.length === 1 ? nameOf(activeIds[0]) : `these ${activeIds.length}`}</Link>
                        </div>
                      ))}
                    </div>
                  ) : <p className="sg-hint">Every activity on this standard has been used with this class.</p>}
                  <p className="gb-note" style={{ marginTop: 8 }}>Games that score themselves don't go in the gradebook, so pick a graded activity to see who moved up.</p>
                  <div className="sg-row" style={{ marginTop: 10 }}><Link className="cc-btn secondary" href={assignHref(activeIds)}>See every activity for TEKS {group.standard_code}</Link></div>
                </>
              )}
            </section>
          </div>
        </div>

        <div className="sg-row" style={{ marginTop: 18 }}>
          {confirmDelete ? (
            <>
              <span className="gb-note">Delete this group and its notes? Grades aren't touched.</span>
              <button type="button" className="cc-btn" style={{ background: "#c93c3c" }} onClick={removeGroup}>Delete</button>
              <button type="button" className="cc-btn quiet" onClick={() => setConfirmDelete(false)}>Keep it</button>
            </>
          ) : <button type="button" className="sg-link" onClick={() => setConfirmDelete(true)}>Delete this group</button>}
        </div>
      </div>
      {board && plan?.questions?.length > 0 && <Board questions={plan.questions} onClose={() => setBoard(false)} />}
    </BridgePage>
  );
}
