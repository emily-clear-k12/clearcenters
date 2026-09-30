// Small groups — Sept 29, 2026.
// A saved group follows one standard from "made the group" to "everyone
// gets it". Everything here is worked out from the same gradebook book
// (lib/gradebook.js), plus the group row and the teacher's table notes.
// Pure functions only, so they can be tested without Supabase.

import { isGraded, levelFromGrades, studentStats, WAITING, MISSING } from "./gradebook";
import { codesFor, mainCode } from "./standardCodes";
import { ACTIVITY_FACTS } from "./activityFacts";
import { isPracticeGame } from "./engineKinds";
import { isHiddenContent } from "./contentReview/hidden";

const MINUTE = 60 * 1000;

function time(value) {
  const t = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
}

export const CHECKS = {
  got: { label: "Got it now", short: "Got it" },
  shaky: { label: "Still shaky", short: "Shaky" },
};

// Each student's level on one standard, saved with the group so progress
// can be measured from where they started.
export function startLevels(book, standardKey, studentIds) {
  const std = book.standards.find((s) => s.key === standardKey);
  const out = {};
  (studentIds || []).forEach((id) => {
    out[id] = std ? studentStats(book, id, std.columnIds).level : null;
  });
  return out;
}

export function groupStandard(book, group) {
  return book.standards.find((s) => s.key === group.standard_key) || null;
}

// Activities on the group's standard that were assigned after the group was
// made (a minute of slack for clocks). Those are the follow-ups.
export function followUpColumns(book, group) {
  const std = groupStandard(book, group);
  if (!std) return [];
  const since = time(group.created_at) - MINUTE;
  return book.columns.filter((c) => std.columnIds.includes(c.id) && time(c.createdAt) >= since);
}

export function earlierColumns(book, group) {
  const std = groupStandard(book, group);
  if (!std) return [];
  const since = time(group.created_at) - MINUTE;
  return book.columns.filter((c) => std.columnIds.includes(c.id) && time(c.createdAt) < since);
}

export function notesByStudent(notes) {
  const out = {};
  [...(notes || [])]
    .sort((a, b) => time(b.met_at || b.created_at) - time(a.met_at || a.created_at))
    .forEach((n) => { (out[n.student_id] = out[n.student_id] || []).push(n); });
  return out;
}

// Meetings, newest first: every note saved at the same time is one meeting.
export function meetings(notes) {
  const byTime = {};
  (notes || []).forEach((n) => {
    const key = n.met_at || n.created_at;
    (byTime[key] = byTime[key] || []).push(n);
  });
  return Object.keys(byTime)
    .sort((a, b) => time(b) - time(a))
    .map((key) => ({ at: key, notes: byTime[key] }));
}

// Where each student is now, compared with where they started.
export function groupProgress(book, group, notes) {
  const follow = followUpColumns(book, group);
  const byStudent = notesByStudent(notes);
  const done = new Set(group.done_ids || []);
  const inBook = new Set(book.students.map((s) => s.id));
  const rows = (group.student_ids || [])
    .filter((id) => inBook.has(id))
    .map((id) => {
      const student = book.students.find((s) => s.id === id);
      const cells = follow.map((col) => ({ col, cell: book.cells[id]?.[col.id] }));
      const grades = cells.filter((x) => isGraded(x.cell)).map((x) => x.cell.kind);
      const followLevel = levelFromGrades(grades);
      const start = group.start_levels ? group.start_levels[id] : null;
      const startLevel = start === 0 || start === 1 || start === 2 ? start : null;
      const lastCheck = (byStudent[id] || []).find((n) => n.check_result)?.check_result || null;
      const lastNote = (byStudent[id] || []).find((n) => n.note)?.note || "";
      const waiting = cells.filter((x) => x.cell?.kind === WAITING).length;
      const notIn = cells.filter((x) => x.cell?.kind === MISSING).length;
      const movedUp = followLevel != null && (startLevel == null ? followLevel === 2 : followLevel > startLevel);
      const slipped = followLevel != null && startLevel != null && followLevel < startLevel;
      const isDone = done.has(id);
      const ready = !isDone && (followLevel === 2 || (followLevel == null && lastCheck === "got"));
      let status;
      if (isDone) status = "Done";
      else if (followLevel === 2) status = "Got it on the follow-up";
      else if (followLevel != null) status = movedUp ? "Moved up" : slipped ? "Slipped" : "Same as before";
      else if (waiting) status = "Follow-up needs your review";
      else if (lastCheck === "got") status = "Got it at the table";
      else if (lastCheck === "shaky") status = "Still shaky at the table";
      else if (notIn) status = "Follow-up not turned in";
      else if (follow.length) status = "Not assigned the follow-up";
      else status = "No follow-up yet";
      return { student, startLevel, followLevel, cells, lastCheck, lastNote, waiting, notIn, movedUp, slipped, ready, done: isDone, status };
    });
  const withFollow = rows.filter((r) => r.followLevel != null).length;
  return {
    rows,
    follow,
    summary: {
      total: rows.length,
      withFollow,
      movedUp: rows.filter((r) => r.movedUp).length,
      ready: rows.filter((r) => r.ready).length,
      done: rows.filter((r) => r.done).length,
      everyoneGetsIt: rows.length > 0 && rows.every((r) => r.done || r.ready),
    },
  };
}

// What each student did on this standard before the group: their marks,
// and whether they were really sure about a wrong answer.
export function whatWentWrong(book, group) {
  const cols = earlierColumns(book, group);
  return (group.student_ids || [])
    .map((id) => book.students.find((s) => s.id === id))
    .filter(Boolean)
    .map((student) => {
      const marks = cols
        .map((col) => ({ col, cell: book.cells[student.id]?.[col.id] }))
        .filter((x) => isGraded(x.cell));
      const sureButWrong = marks.filter((x) => x.cell.kind < 2 && x.cell.confidence === "strong");
      return { student, marks, sureButWrong };
    });
}

// The row of activity to reach for next, from where the group started:
// mostly Not yet → Practice, mostly Almost → Prove it, Got it → Make it.
export function groupRow(group) {
  const levels = Object.values(group.start_levels || {}).filter((l) => l === 0 || l === 1 || l === 2);
  const level = levelFromGrades(levels);
  return level === 2 ? "make" : level === 1 ? "prove" : "practice";
}

export const ROW_LABELS = { practice: "Practice", prove: "Prove it", make: "Make it" };

// Activities on this standard the class hasn't been given yet, best fit first.
// A graded one is always offered too, since practice games score themselves
// and don't show who moved up.
export function suggestActivities(cases, book, group, assignedStandards) {
  const code = group.standard_code;
  if (!code) return [];
  const used = new Set(assignedStandards || []);
  const want = groupRow(group);
  const list = (cases || [])
    .filter((c) => c && c.standard && !used.has(c.standard) && !isHiddenContent(c.engine, c.standard))
    .filter((c) => !group.subject || !c.subject || c.subject === group.subject)
    .filter((c) => {
      const codes = codesFor(c.standard);
      return mainCode(c.standard) === code || codes.includes(code);
    })
    .map((c) => {
      const facts = ACTIVITY_FACTS[c.engine] || {};
      const graded = !isPracticeGame(c.engine);
      const row = facts.row || null;
      const score = (row === want ? 0 : 2) + (graded ? 0 : 1);
      return { standard: c.standard, title: c.title || c.standard, engine: c.engine, label: facts.label || "Activity", what: facts.what || "", row, graded, minutes: facts.minutes || "", score };
    })
    .sort((a, b) => a.score - b.score || String(a.title).localeCompare(String(b.title)));
  const top = list.slice(0, 3);
  if (top.length && !top.some((x) => x.graded)) {
    const graded = list.find((x) => x.graded);
    if (graded) top[top.length - 1] = graded;
  }
  return top;
}
