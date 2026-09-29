// Gradebook data — Sept 28, 2026.
// One place that turns the raw rows (classes, students, assignments,
// targeting, submissions, cases) into what all three gradebook views draw:
// the color grid, the by-standard view and the student cards.
// Pure functions only, so it can be tested without Supabase.

import { isPracticeGame } from "./engineKinds";
import { codesFor, mainCode } from "./standardCodes";
import { standardWording } from "./standardWording";
import { levelWord } from "./gradeScale";

// Cell kinds. A graded cell is 0, 1 or 2.
export const WAITING = "waiting"; // turned in, not graded yet
export const RETURNED = "returned"; // sent back to revise
export const MISSING = "missing"; // not turned in
export const NOT_ASSIGNED = "none"; // assigned to other students only

export const PERIODS = [
  { key: "all", label: "Whole year", days: null },
  { key: "9w", label: "Last 9 weeks", days: 63 },
  { key: "6w", label: "Last 6 weeks", days: 42 },
  { key: "3w", label: "Last 3 weeks", days: 21 },
];

const DAY = 24 * 60 * 60 * 1000;

function time(value) {
  const t = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
}

export function shortTitle(title) {
  return String(title || "").replace(/^The\s+/i, "").trim() || "Activity";
}

// A standard's wording, cut to fit a column header. The full sentence
// stays available for the hover text.
export function clip(text, max = 64) {
  const line = String(text || "").replace(/\s+/g, " ").trim().replace(/[.]+$/, "");
  if (line.length <= max) return line;
  return line.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "") + "…";
}

export function isGraded(cell) {
  return !!cell && (cell.kind === 0 || cell.kind === 1 || cell.kind === 2);
}

// Average of 0/1/2 grades turned back into one of the three levels.
export function levelFromGrades(grades) {
  const list = (grades || []).filter((g) => g === 0 || g === 1 || g === 2);
  if (!list.length) return null;
  const avg = list.reduce((sum, g) => sum + g, 0) / list.length;
  if (avg >= 1.5) return 2;
  if (avg >= 0.75) return 1;
  return 0;
}

export function countGrades(grades) {
  const counts = { 0: 0, 1: 0, 2: 0 };
  (grades || []).forEach((g) => {
    if (counts[g] != null) counts[g] += 1;
  });
  return counts;
}

// The newest turned-in submission wins. A draft with nothing turned in
// only tells us the student started.
function pickSubmission(rows) {
  const turnedIn = rows.filter((row) => row.submitted_at);
  if (turnedIn.length) return turnedIn.sort((a, b) => time(b.submitted_at) - time(a.submitted_at))[0];
  return null;
}

export function cellFor(rows, isPastDue) {
  const row = pickSubmission(rows || []);
  if (!row) {
    const started = (rows || []).length > 0;
    return { kind: MISSING, started, pastDue: !!isPastDue };
  }
  const base = { submissionId: row.id, submittedAt: row.submitted_at, confidence: row.self_confidence || null, released: !!row.released };
  if (row.revision_requested) return { ...base, kind: RETURNED };
  if (row.teacher_grade === 0 || row.teacher_grade === 1 || row.teacher_grade === 2) return { ...base, kind: Number(row.teacher_grade) };
  if (row.teacher_grade != null && Number.isFinite(Number(row.teacher_grade))) {
    const g = Math.max(0, Math.min(2, Math.round(Number(row.teacher_grade))));
    return { ...base, kind: g };
  }
  return { ...base, kind: WAITING };
}

export function buildGradebook({ classId, students, assignments, targets, submissions, cases, periodKey = "all", now = Date.now() }) {
  const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));
  const period = PERIODS.find((p) => p.key === periodKey) || PERIODS[0];
  const since = period.days ? now - period.days * DAY : null;

  const roster = (students || [])
    .filter((s) => s.class_id === classId && s.active !== false)
    .sort((a, b) => String(a.first_name || "").localeCompare(String(b.first_name || ""), undefined, { sensitivity: "base" }));

  const columns = (assignments || [])
    .filter((a) => a.class_id === classId)
    .filter((a) => !isPracticeGame(caseMap[a.case_standard]?.engine, a.game_skin))
    .filter((a) => !since || time(a.created_at) >= since)
    .sort((a, b) => time(a.created_at) - time(b.created_at))
    .map((a) => {
      const row = caseMap[a.case_standard] || {};
      const code = mainCode(a.case_standard) || codesFor(a.case_standard)[0] || "";
      const subject = row.subject || "";
      const wording = code ? standardWording(subject, code) : "";
      return {
        id: a.id,
        standard: a.case_standard,
        title: row.title || a.case_standard || "Activity",
        short: shortTitle(row.title || a.case_standard),
        engine: row.engine || "",
        subject,
        code,
        topic: clip(wording || row.learning_target || ""),
        wording,
        dueDate: a.due_date || null,
        createdAt: a.created_at || null,
      };
    });

  const targetMap = {};
  (targets || []).forEach((t) => {
    (targetMap[t.assignment_id] = targetMap[t.assignment_id] || new Set()).add(t.student_id);
  });

  const subsByKey = {};
  (submissions || []).forEach((s) => {
    const key = `${s.student_id}|${s.assignment_id}`;
    (subsByKey[key] = subsByKey[key] || []).push(s);
  });

  const cells = {};
  roster.forEach((student) => {
    cells[student.id] = {};
    columns.forEach((col) => {
      const targeted = targetMap[col.id];
      if (targeted && targeted.size && !targeted.has(student.id)) {
        cells[student.id][col.id] = { kind: NOT_ASSIGNED };
        return;
      }
      const due = col.dueDate ? time(`${col.dueDate}T23:59:59`) : 0;
      cells[student.id][col.id] = cellFor(subsByKey[`${student.id}|${col.id}`], due && due < now);
    });
  });

  // Standards, in the order they were first assigned.
  const standards = [];
  const byCode = {};
  columns.forEach((col) => {
    const key = col.code || "Other";
    if (!byCode[key]) {
      byCode[key] = { code: key, topic: col.code ? col.topic : "Not tied to one standard", wording: col.wording, subject: col.subject, columnIds: [] };
      standards.push(byCode[key]);
    }
    byCode[key].columnIds.push(col.id);
  });

  return { students: roster, columns, cells, standards };
}

export function studentStats(book, studentId, columnIds) {
  const ids = columnIds || book.columns.map((c) => c.id);
  const row = book.cells[studentId] || {};
  const list = ids.map((id) => row[id]).filter(Boolean);
  const grades = list.filter(isGraded).map((c) => c.kind);
  return {
    grades,
    counts: countGrades(grades),
    level: levelFromGrades(grades),
    waiting: list.filter((c) => c.kind === WAITING).length,
    returned: list.filter((c) => c.kind === RETURNED).length,
    missing: list.filter((c) => c.kind === MISSING).length,
    pastDue: list.filter((c) => c.kind === MISSING && c.pastDue).length,
    assigned: list.filter((c) => c.kind !== NOT_ASSIGNED).length,
  };
}

export function columnCounts(book, columnId) {
  const grades = book.students.map((s) => book.cells[s.id]?.[columnId]).filter(isGraded).map((c) => c.kind);
  return countGrades(grades);
}

export function bookTotals(book) {
  let waiting = 0;
  let missing = 0;
  book.students.forEach((s) => {
    const st = studentStats(book, s.id);
    waiting += st.waiting;
    missing += st.missing;
  });
  return { waiting, missing };
}

// "Needs help first": lowest level first, then most missing, then name.
export function sortStudents(book, mode) {
  const list = [...book.students];
  if (mode !== "need") return list;
  const rank = (s) => {
    const st = studentStats(book, s.id);
    return [st.level == null ? 3 : st.level, -st.missing];
  };
  return list.sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    return ra[0] - rb[0] || ra[1] - rb[1] || String(a.first_name).localeCompare(String(b.first_name));
  });
}

export function cellWord(cell, engine) {
  if (!cell) return "";
  if (isGraded(cell)) return levelWord(cell.kind, engine);
  if (cell.kind === WAITING) return "Needs review";
  if (cell.kind === RETURNED) return "Sent back";
  if (cell.kind === MISSING) return cell.started ? "Started" : "Not turned in";
  return "Not assigned";
}

export function cellNumber(cell) {
  return isGraded(cell) ? String(cell.kind) : "";
}
