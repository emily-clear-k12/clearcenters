"use client";

// Gradebook — Sept 28, 2026.
// Replaces the green paper ledger that opened inside the Grades page.
// Emily picked all three mockup designs, so they are three views of one book:
//   Grid         every student × every activity, colored 2 / 1 / 0
//   By standard  one column per TEKS, a level across that standard's activities
//   Cards        students grouped into Needs help / Getting there / On track
// The data comes from lib/gradebook.js; this page only draws it.
// Grading still happens on the grading screen (grade/[submissionId]) so
// feedback, release and crystals keep working the same way.

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, Empty } from "../../../components/teacher/BridgeUI";
import { rememberedTeacherClass, rememberTeacherClass } from "../../../lib/teacherClass";
import { engineInfo } from "../../../lib/teacherBridge";
import { levelWord } from "../../../lib/gradeScale";
import {
  PERIODS, WAITING, RETURNED, MISSING, NOT_ASSIGNED,
  buildGradebook, studentStats, columnCounts, bookTotals, sortStudents,
  isGraded, cellWord, cellNumber,
} from "../../../lib/gradebook";
import "./gradebook.css";

const VIEWS = [["grid", "Grid"], ["standard", "By standard"], ["cards", "Cards"]];
const VIEW_KEY = "cc-gradebook-view";
const BAR = { 2: "#1f8a4d", 1: "#e0a800", 0: "#d64545" };
const CONFIDENCE = { shaky: "😕 still shaky", solid: "🙂 pretty solid", strong: "😄 really strong" };

function readView() {
  try {
    const saved = localStorage.getItem(VIEW_KEY);
    if (VIEWS.some(([key]) => key === saved)) return saved;
  } catch {}
  return "grid";
}

function saveView(view) {
  try { localStorage.setItem(VIEW_KEY, view); } catch {}
}

function niceDate(value) {
  if (!value) return "";
  const d = new Date(String(value).length <= 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function htmlCell(value) {
  return String(value ?? "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

function downloadCsv(filename, rows) {
  const text = rows.map((line) => line.map(csvCell).join(",")).join("\n");
  const blob = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function chipClass(cell) {
  if (!cell) return "kn";
  if (isGraded(cell)) return `k${cell.kind}`;
  if (cell.kind === WAITING) return "kw";
  if (cell.kind === RETURNED) return "kr";
  if (cell.kind === MISSING) return cell.pastDue ? "km late" : "km";
  return "kn";
}

function chipMark(cell) {
  if (!cell) return "";
  if (isGraded(cell)) return String(cell.kind);
  if (cell.kind === WAITING) return "?";
  if (cell.kind === RETURNED) return "↺";
  if (cell.kind === MISSING) return cell.pastDue ? "!" : "·";
  return "–";
}

function levelChip(level, word) {
  if (level == null) return null;
  return <span className={`gb-chip k${level}${word ? " word" : ""}`}>{word ? levelWord(level) : level}</span>;
}

function Bar({ counts, width = 90, tally = false }) {
  const total = counts[2] + counts[1] + counts[0];
  return (
    <span className={tally ? "gb-tally" : "gb-bar"} style={{ width }} aria-hidden="true">
      {total > 0 && [2, 1, 0].map((k) => <span key={k} style={{ width: `${(counts[k] / total) * 100}%`, background: BAR[k] }} />)}
    </span>
  );
}

function Cell({ cell, column, student, onOpen }) {
  if (!cell || cell.kind === NOT_ASSIGNED) {
    return <span className="gb-chip kn" title={`${column.title}: not assigned to ${student.first_name}`}>–</span>;
  }
  const word = cellWord(cell, column.engine);
  const label = `${student.first_name}, ${column.title}: ${word}${cell.kind === MISSING && cell.pastDue ? " (past due)" : ""}`;
  return (
    <button type="button" className={`gb-chip ${chipClass(cell)}`} title={label} aria-label={label} onClick={() => onOpen({ studentId: student.id, columnId: column.id })}>
      {chipMark(cell)}
    </button>
  );
}

function StudentSummary({ stats }) {
  return (
    <>
      <div className="gb-sumline">
        {stats.level == null ? <span className="gb-note">No grades yet</span> : <>{levelChip(stats.level, true)}<Bar counts={stats.counts} width={70} /></>}
      </div>
      {stats.missing > 0 && <div className="gb-flag">{stats.missing} not turned in{stats.pastDue ? ` · ${stats.pastDue} past due` : ""}</div>}
    </>
  );
}

function Legend() {
  const items = [
    ["k2", "2", "Got it"], ["k1", "1", "Almost"], ["k0", "0", "Not yet"],
    ["kw", "?", "Needs your review"], ["kr", "↺", "Sent back"],
    ["km", "·", "Not turned in"], ["km late", "!", "Past due"], ["kn", "–", "Not assigned"],
  ];
  return <div className="gb-legend">{items.map(([cls, mark, label]) => <span key={label}><span className={`gb-chip ${cls}`}>{mark}</span>{label}</span>)}</div>;
}

function GridView({ book, order, filter, onOpen }) {
  const rows = order.filter((s) => {
    if (filter === "all") return true;
    const st = studentStats(book, s.id);
    return filter === "review" ? st.waiting > 0 : st.missing > 0;
  });
  if (!rows.length) return <Empty>{filter === "review" ? "Nothing is waiting for your review." : "Everyone has turned in their work."}</Empty>;
  return (
    <div className="gb-scroll">
      <table className="gb-table">
        <thead>
          <tr>
            <th className="gb-name">Student</th>
            {book.columns.map((col) => (
              <th key={col.id} title={`${col.title}\n${engineInfo(col.engine).label}${col.code ? ` · TEKS ${col.code}` : ""}\n${col.dueDate ? `Due ${niceDate(col.dueDate)}` : `Assigned ${niceDate(col.createdAt)}`}`}>
                <div className="gb-col">
                  <b>{col.short}</b>
                  <i>{[col.code, niceDate(col.dueDate || col.createdAt)].filter(Boolean).join(" · ")}</i>
                  <Bar counts={columnCounts(book, col.id)} width={60} tally />
                </div>
              </th>
            ))}
            <th className="gb-summary">Overall</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((student) => (
            <tr key={student.id}>
              <td className="gb-name"><a href="#" onClick={(e) => { e.preventDefault(); onOpen({ studentId: student.id }); }}>{student.first_name}</a></td>
              {book.columns.map((col) => <td key={col.id}><Cell cell={book.cells[student.id]?.[col.id]} column={col} student={student} onOpen={onOpen} /></td>)}
              <td className="gb-summary"><StudentSummary stats={studentStats(book, student.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StandardView({ book, order, openStd, setOpenStd, onOpen }) {
  const colMap = Object.fromEntries(book.columns.map((c) => [c.id, c]));
  return (
    <div className="gb-scroll">
      <table className="gb-table">
        <thead>
          <tr>
            <th className="gb-name">Student</th>
            {book.standards.map((std) => {
              const open = openStd === std.code;
              return (
                <React.Fragment key={std.code}>
                  <th className={`gb-std${open ? " gb-open" : ""}`} onClick={() => setOpenStd(open ? null : std.code)} title={std.wording || std.topic}>
                    <div className="gb-col wide">
                      <b>{std.code === "Other" ? "Other" : `TEKS ${std.code}`}</b>
                      <i>{std.topic}</i>
                      <i>{std.columnIds.length} {std.columnIds.length === 1 ? "activity" : "activities"} <span className="gb-caret">{open ? "▲" : "▼"}</span></i>
                    </div>
                  </th>
                  {open && std.columnIds.map((id) => (
                    <th key={id} className="gb-open" title={colMap[id].title}>
                      <div className="gb-col"><b>{colMap[id].short}</b><i>{engineInfo(colMap[id].engine).label}</i></div>
                    </th>
                  ))}
                </React.Fragment>
              );
            })}
            <th className="gb-summary">Overall</th>
          </tr>
        </thead>
        <tbody>
          {order.map((student) => (
            <tr key={student.id}>
              <td className="gb-name"><a href="#" onClick={(e) => { e.preventDefault(); onOpen({ studentId: student.id }); }}>{student.first_name}</a></td>
              {book.standards.map((std) => {
                const open = openStd === std.code;
                const st = studentStats(book, student.id, std.columnIds);
                const detail = std.columnIds.map((id) => `${colMap[id].title}: ${cellWord(book.cells[student.id]?.[id], colMap[id].engine)}`).join("\n");
                let main;
                if (st.level != null) main = levelChip(st.level, true);
                else if (st.waiting) main = <span className="gb-chip kw word">Needs review</span>;
                else if (st.returned) main = <span className="gb-chip kr word">Sent back</span>;
                else if (st.assigned === 0) main = <span className="gb-chip kn">–</span>;
                else main = <span className={`gb-chip km${st.pastDue ? " late" : ""}`}>{st.pastDue ? "!" : "·"}</span>;
                return (
                  <React.Fragment key={std.code}>
                    <td className={open ? "gb-open" : ""} title={`${student.first_name}\n${detail}`}>
                      {main}
                      {st.level != null && st.missing > 0 && <div className="gb-flag">{st.missing} missing</div>}
                    </td>
                    {open && std.columnIds.map((id) => (
                      <td key={id} className="gb-open"><Cell cell={book.cells[student.id]?.[id]} column={colMap[id]} student={student} onOpen={onOpen} /></td>
                    ))}
                  </React.Fragment>
                );
              })}
              <td className="gb-summary"><StudentSummary stats={studentStats(book, student.id)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CardsView({ book, order, onOpen }) {
  const groups = [[0, "Needs help"], [1, "Getting there"], [2, "On track"], [null, "No grades yet"]];
  return (
    <div>
      {groups.map(([level, label]) => {
        const list = order.filter((s) => studentStats(book, s.id).level === level);
        if (!list.length) return null;
        return (
          <section key={label}>
            <h2 className="gb-group"><span className={`gb-chip ${level == null ? "km" : `k${level}`}`}>{list.length}</span>{label}</h2>
            <div className="gb-cards">
              {list.map((student) => {
                const st = studentStats(book, student.id);
                return (
                  <article key={student.id} className="gb-card">
                    <header>
                      <button type="button" className="gb-card-name" onClick={() => onOpen({ studentId: student.id })}>{student.first_name}</button>
                      <Bar counts={st.counts} width={90} />
                    </header>
                    <div className="gb-dots">
                      {book.columns.map((col) => <Cell key={col.id} cell={book.cells[student.id]?.[col.id]} column={col} student={student} onOpen={onOpen} />)}
                    </div>
                    <div className="gb-meta">
                      {st.grades.length} graded
                      {st.waiting > 0 && <> · <b>{st.waiting} to review</b></>}
                      {st.returned > 0 && <> · {st.returned} sent back</>}
                      {st.missing > 0 && <> · <em>{st.missing} not turned in</em></>}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Drawer({ book, open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const student = book.students.find((s) => s.id === open.studentId);
  if (!student) return null;
  const column = open.columnId ? book.columns.find((c) => c.id === open.columnId) : null;
  let body;
  if (column) {
    const cell = book.cells[student.id]?.[column.id];
    const graded = isGraded(cell);
    body = (
      <>
        <h2>{student.first_name} · {column.title}</h2>
        <p className="cc-muted">{engineInfo(column.engine).label}{column.code ? ` · TEKS ${column.code}` : ""}{column.dueDate ? ` · due ${niceDate(column.dueDate)}` : ` · assigned ${niceDate(column.createdAt)}`}</p>
        <div className="gb-big"><span className={`gb-chip ${chipClass(cell)}`}>{chipMark(cell)}</span>{cellWord(cell, column.engine)}{cell?.kind === MISSING && cell.pastDue ? " · past due" : ""}</div>
        {cell?.submittedAt && <p className="cc-muted">Turned in {niceDate(cell.submittedAt)}{cell.confidence && CONFIDENCE[cell.confidence] ? ` · felt ${CONFIDENCE[cell.confidence]}` : ""}{graded ? (cell.released ? " · released" : " · not released yet") : ""}</p>}
        {cell?.kind === MISSING && <p className="cc-muted">{cell.started ? "Started but not turned in yet." : "Nothing turned in yet."}</p>}
        <div className="gb-actions">
          {cell?.submissionId && <Link className="cc-btn" href={`/teacher/grade/${cell.submissionId}`}>{cell.kind === WAITING ? "Grade it now" : "Open their work"}</Link>}
          {cell?.kind === MISSING && <Link className="cc-btn" href="/teacher/messages">Send a reminder</Link>}
          <button type="button" className="cc-btn secondary" onClick={() => onClose({ studentId: student.id })}>All of {student.first_name}'s work</button>
        </div>
      </>
    );
  } else {
    const st = studentStats(book, student.id);
    body = (
      <>
        <h2>{student.first_name}</h2>
        <p className="cc-muted">{st.grades.length} graded · {st.waiting} to review · {st.missing} not turned in</p>
        <div className="gb-sumline" style={{ margin: "10px 0 6px" }}>{levelChip(st.level, true)}<Bar counts={st.counts} width={200} /></div>
        {book.columns.map((col) => {
          const cell = book.cells[student.id]?.[col.id];
          return (
            <div key={col.id} className="gb-drawer-row">
              <span><strong>{col.title}</strong><small>{engineInfo(col.engine).label}{col.code ? ` · ${col.code}` : ""} · {niceDate(col.dueDate || col.createdAt)}</small></span>
              <Cell cell={cell} column={col} student={student} onOpen={(next) => onClose(next)} />
            </div>
          );
        })}
        <div className="gb-actions"><Link className="cc-btn" href={`/teacher/students/${student.id}`}>Open {student.first_name}'s page</Link></div>
      </>
    );
  }
  return (
    <>
      <div className="gb-drawer-back" onClick={() => onClose()} />
      <aside className="gb-drawer" role="dialog" aria-modal="true" aria-label="Details">
        <button type="button" className="gb-x" aria-label="Close" onClick={() => onClose()}>×</button>
        {body}
      </aside>
    </>
  );
}

export default function GradebookPage() {
  const router = useRouter();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ classes: [], students: [], assignments: [], targets: [], submissions: [], cases: [] });
  const [classId, setClassId] = useState("");
  const [period, setPeriod] = useState("all");
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("name");
  const [filter, setFilter] = useState("all");
  const [openStd, setOpenStd] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => { setView(readView()); }, []);

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);
    const { data: classes, error: classError } = await supabase.from("classes").select("id, name, subject, grade").eq("teacher_id", teacherId).order("name");
    if (classError) { setError(classError.message); setLoading(false); return; }
    const classIds = (classes || []).map((c) => c.id);
    if (!classIds.length) { setData((d) => ({ ...d, classes: [] })); setLoading(false); return; }
    const [{ data: students }, { data: assignments }] = await Promise.all([
      supabase.from("students").select("*").in("class_id", classIds),
      supabase.from("assignments").select("id, case_standard, class_id, game_skin, due_date, created_at").in("class_id", classIds),
    ]);
    const assignmentIds = (assignments || []).map((a) => a.id);
    const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    const [targetResult, submissionResult, caseResult] = await Promise.all([
      assignmentIds.length ? supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds) : { data: [] },
      assignmentIds.length ? supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested, self_confidence").in("assignment_id", assignmentIds) : { data: [] },
      standards.length ? supabase.from("cases").select("standard, title, engine, subject, learning_target").in("standard", standards) : { data: [] },
    ]);
    let caseRows = caseResult.data;
    if (caseResult.error) {
      // learning_target is optional; older databases may not have it.
      const retry = await supabase.from("cases").select("standard, title, engine, subject").in("standard", standards);
      caseRows = retry.data;
    }
    if (submissionResult.error) setError("Could not load student work. Grades may be missing.");
    setData({
      classes: classes || [],
      students: students || [],
      assignments: assignments || [],
      targets: targetResult.data || [],
      submissions: submissionResult.data || [],
      cases: caseRows || [],
    });
    setClassId((current) => current || rememberedTeacherClass(classes || [], (classes || [])[0]?.id || ""));
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: auth, error: authError }) => {
      if (authError || !auth?.user) { router.push("/login"); return; }
      setTeacherEmail(auth.user.email || "");
      load(auth.user.id);
    });
  }, [router, load]);

  const book = useMemo(() => buildGradebook({ classId, periodKey: period, ...data }), [classId, period, data]);
  const order = useMemo(() => sortStudents(book, sort), [book, sort]);
  const totals = useMemo(() => bookTotals(book), [book]);
  const current = data.classes.find((c) => c.id === classId) || null;

  function chooseView(next) { setView(next); saveView(next); setDrawer(null); }
  function closeDrawer(next) { setDrawer(next && next.studentId ? next : null); }

  function exportRows(kind) {
    const cols = book.columns;
    const students = book.students;
    const name = current?.name || "Class";
    if (kind === "excel") {
      const header = ["Student", ...cols.map((c) => c.title), "Overall", "Not turned in"];
      const lines = students.map((s) => {
        const st = studentStats(book, s.id);
        return [s.first_name, ...cols.map((c) => cellWord(book.cells[s.id]?.[c.id], c.engine)), st.level == null ? "" : levelWord(st.level), st.missing];
      });
      downloadCsv(`${name} gradebook.csv`, [header, ...lines]);
    } else if (kind === "skyward") {
      const lines = [["Student Name", "Assignment", "Score", "Points Possible"]];
      students.forEach((s) => cols.forEach((c) => {
        const cell = book.cells[s.id]?.[c.id];
        if (cell && cell.kind !== NOT_ASSIGNED) lines.push([s.first_name, c.title, cellNumber(cell), "2"]);
      }));
      downloadCsv(`${name} skyward.csv`, lines);
    } else if (kind === "schoology") {
      const header = ["Student", ...cols.map((c) => c.title)];
      const lines = students.map((s) => [s.first_name, ...cols.map((c) => cellNumber(book.cells[s.id]?.[c.id]))]);
      downloadCsv(`${name} schoology.csv`, [header, ...lines]);
    } else if (kind === "pdf") {
      const head = ["Student", ...cols.map((c) => c.title), "Overall"].map((h) => `<th>${htmlCell(h)}</th>`).join("");
      const color = { "Got it": "#e3f5ea", Almost: "#fdf3d6", "Not yet": "#fde7e7" };
      const body = students.map((s) => {
        const st = studentStats(book, s.id);
        const cells = cols.map((c) => { const w = cellWord(book.cells[s.id]?.[c.id], c.engine); return `<td style="background:${color[w] || "#fff"}">${htmlCell(w === "Not assigned" ? "–" : w)}</td>`; }).join("");
        return `<tr><td><b>${htmlCell(s.first_name)}</b></td>${cells}<td><b>${htmlCell(st.level == null ? "" : levelWord(st.level))}</b></td></tr>`;
      }).join("");
      const popup = window.open("", "_blank");
      if (!popup) return;
      popup.document.write(`<html><head><title>${htmlCell(name)} gradebook</title><style>body{font-family:Inter,Arial,sans-serif;padding:20px;color:#241b50}h1{font-size:20px;margin:0 0 4px}p{color:#70658d;font-size:12px;margin:0 0 12px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d9d3ea;padding:5px;font-size:11px;text-align:center}th{background:#f3effa}td:first-child,th:first-child{text-align:left}@page{size:landscape}</style></head><body><h1>${htmlCell(name)} · Gradebook</h1><p>${htmlCell(PERIODS.find((p) => p.key === period)?.label || "")} · printed ${htmlCell(new Date().toLocaleDateString())}</p><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></body></html>`);
      popup.document.close();
      popup.focus();
      popup.print();
    }
    setMenu(false);
  }

  if (loading) return <div className="cc-loading">Loading…</div>;

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <div className="gb">
        <div className="gb-top">
          <div>
            <h1>Gradebook</h1>
            <p className="gb-sub">
              {current ? `${current.name}${current.grade && !/grade/i.test(current.name) ? ` · Grade ${current.grade}` : ""}` : "No class yet"} · {book.students.length} {book.students.length === 1 ? "student" : "students"} · {book.columns.length} {book.columns.length === 1 ? "activity" : "activities"}
              {totals.waiting > 0 && <> · <b>{totals.waiting} waiting for you</b></>}
            </p>
          </div>
          <Link className="cc-btn secondary" href="/teacher/grade">Review list →</Link>
        </div>

        {error && <div className="cc-error" role="alert">{error}</div>}

        <div className="gb-controls">
          <select aria-label="Class" value={classId} onChange={(e) => { setClassId(e.target.value); rememberTeacherClass(e.target.value); setOpenStd(null); setDrawer(null); }}>
            {[...data.classes].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select aria-label="Time" value={period} onChange={(e) => setPeriod(e.target.value)}>
            {PERIODS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
          <div className="gb-seg gb-views" role="group" aria-label="View">
            {VIEWS.map(([key, label]) => <button key={key} type="button" aria-pressed={view === key} onClick={() => chooseView(key)}>{label}</button>)}
          </div>
          <div className="gb-seg" role="group" aria-label="Order">
            <button type="button" aria-pressed={sort === "name"} onClick={() => setSort("name")}>A–Z</button>
            <button type="button" aria-pressed={sort === "need"} onClick={() => setSort("need")}>Needs help first</button>
          </div>
          {view === "grid" && (
            <div className="gb-seg" role="group" aria-label="Show">
              <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>Everyone</button>
              <button type="button" aria-pressed={filter === "review"} onClick={() => setFilter("review")}>Needs review</button>
              <button type="button" aria-pressed={filter === "missing"} onClick={() => setFilter("missing")}>Missing work</button>
            </div>
          )}
          <div className="gb-download">
            <button type="button" className="cc-btn" aria-expanded={menu} onClick={() => setMenu(!menu)} disabled={!book.columns.length}>Download ▾</button>
            {menu && (
              <div className="gb-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => exportRows("excel")}>Excel<small>Words: Got it, Almost, Not yet</small></button>
                <button type="button" role="menuitem" onClick={() => exportRows("pdf")}>PDF<small>Print or save the grid</small></button>
                <button type="button" role="menuitem" onClick={() => exportRows("skyward")}>Skyward<small>Scores out of 2</small></button>
                <button type="button" role="menuitem" onClick={() => exportRows("schoology")}>Schoology<small>Scores out of 2</small></button>
              </div>
            )}
          </div>
        </div>

        {view === "standard"
          ? <div className="gb-legend"><span><span className="gb-chip k2 word">Got it</span></span><span><span className="gb-chip k1 word">Almost</span></span><span><span className="gb-chip k0 word">Not yet</span></span><span>across that standard's activities · click a standard to open them</span></div>
          : <Legend />}

        {!data.classes.length ? <Empty>Add a class to start a gradebook.</Empty>
          : !book.students.length ? <Empty>No students in this class yet.</Empty>
          : !book.columns.length ? <Empty>No graded activities {period === "all" ? "assigned yet" : "in this time"}. Practice games like Frequency Rush don't go in the gradebook.</Empty>
          : view === "standard" ? <StandardView book={book} order={order} openStd={openStd} setOpenStd={setOpenStd} onOpen={setDrawer} />
          : view === "cards" ? <CardsView book={book} order={order} onOpen={setDrawer} />
          : <GridView book={book} order={order} filter={filter} onOpen={setDrawer} />}
      </div>
      <Drawer book={book} open={drawer} onClose={closeDrawer} />
    </BridgePage>
  );
}
