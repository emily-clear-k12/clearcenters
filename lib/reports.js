// Reports — Sept 28, 2026.
// Everything the Reports page draws, worked out from the same book the
// gradebook uses (lib/gradebook.js), so the two pages never disagree.
// Four tabs: Snapshot, Standards, Students, Confidence Check.
// Pure functions only, so they can be tested without Supabase.

import {
  WAITING, MISSING, NOT_ASSIGNED,
  isGraded, levelFromGrades, countGrades, studentStats,
} from "./gradebook";
import { TEKS_WORDING } from "./teksWording";
import { SS_TEKS } from "./briefings/teks/ss-teks-3-5";

const DAY = 24 * 60 * 60 * 1000;
export const LOOK_BACK_DAYS = 14;

function time(value) {
  const t = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
}

function mondayOf(t) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d.getTime();
}

// When a piece of work counts: when it was turned in, or else when it was assigned.
function whenOf(column, cell) {
  return time(cell && cell.submittedAt) || time(column.createdAt);
}

function gradesFor(book, studentId, test) {
  const row = book.cells[studentId] || {};
  return book.columns
    .map((col) => ({ col, cell: row[col.id] }))
    .filter(({ col, cell }) => isGraded(cell) && (!test || test(col, cell)))
    .map(({ cell }) => cell.kind);
}

// A student's level now, and their level from work before two weeks ago.
export function studentLevels(book, studentId, now = Date.now()) {
  const cut = now - LOOK_BACK_DAYS * DAY;
  const all = gradesFor(book, studentId);
  const before = gradesFor(book, studentId, (col, cell) => whenOf(col, cell) < cut);
  const recent = gradesFor(book, studentId, (col, cell) => whenOf(col, cell) >= cut);
  const early = levelFromGrades(before);
  const late = levelFromGrades(recent);
  let direction = "steady";
  if (early != null && late != null && late !== early) direction = late > early ? "improving" : "slipping";
  return { now: levelFromGrades(all), before: early, direction };
}

// One level per student per standard, from every activity for that standard.
export function standardRows(book) {
  return book.standards
    .filter((std) => std.key !== "Other")
    .map((std) => {
      const perStudent = {};
      let waiting = 0;
      let assessed = 0;
      book.students.forEach((s) => {
        const st = studentStats(book, s.id, std.columnIds);
        perStudent[s.id] = st.level;
        waiting += st.waiting;
        if (st.level != null) assessed += 1;
      });
      const counts = countGrades(Object.values(perStudent).filter((l) => l != null));
      return { ...std, perStudent, counts, waiting, assessed, need: counts[0] * 2 + counts[1] };
    })
    .sort((a, b) => b.need - a.need || a.code.localeCompare(b.code, undefined, { numeric: true }));
}

export function snapshot(book, now = Date.now()) {
  const levels = Object.fromEntries(book.students.map((s) => [s.id, studentLevels(book, s.id, now)]));
  const nowCounts = countGrades(Object.values(levels).map((l) => l.now).filter((l) => l != null));
  const beforeCounts = countGrades(Object.values(levels).map((l) => l.before).filter((l) => l != null));
  const hasBefore = Object.values(levels).some((l) => l.before != null);
  return { levels, nowCounts, beforeCounts: hasBefore ? beforeCounts : null };
}

// Week by week: the share of graded work at each level.
export function weeklySeries(book, maxWeeks = 8) {
  const weeks = {};
  book.students.forEach((s) => {
    const row = book.cells[s.id] || {};
    book.columns.forEach((col) => {
      const cell = row[col.id];
      if (!isGraded(cell)) return;
      const wk = mondayOf(whenOf(col, cell));
      (weeks[wk] = weeks[wk] || []).push(cell.kind);
    });
  });
  return Object.keys(weeks)
    .map(Number)
    .sort((a, b) => a - b)
    .slice(-maxWeeks)
    .map((wk) => {
      const c = countGrades(weeks[wk]);
      const n = weeks[wk].length;
      return { week: wk, n, got: c[2] / n, almost: c[1] / n, notYet: c[0] / n };
    });
}

export function confidenceGrid(book) {
  const grid = {};
  ["strong", "solid", "shaky"].forEach((c) => [2, 1, 0].forEach((g) => { grid[`${c}${g}`] = []; }));
  const colMap = Object.fromEntries(book.columns.map((c) => [c.id, c]));
  book.students.forEach((s) => {
    const row = book.cells[s.id] || {};
    Object.entries(row).forEach(([colId, cell]) => {
      if (!isGraded(cell) || !grid[`${cell.confidence}${cell.kind}`]) return;
      grid[`${cell.confidence}${cell.kind}`].push({ studentId: s.id, name: s.first_name, column: colMap[colId] });
    });
  });
  return grid;
}

export function studentRows(book, rows, snap) {
  return book.students.map((s) => {
    const lv = snap.levels[s.id];
    const st = studentStats(book, s.id);
    const row = book.cells[s.id] || {};
    const marks = book.columns
      .map((col) => ({ col, cell: row[col.id] }))
      .filter(({ cell }) => isGraded(cell))
      .map(({ col, cell }) => ({ title: col.title, kind: cell.kind }));
    const byStd = rows.map((r) => ({ code: r.code, subject: r.subject, level: r.perStudent[s.id] })).filter((x) => x.level != null);
    const strongest = [...byStd].sort((a, b) => b.level - a.level)[0] || null;
    const lowest = [...byStd].sort((a, b) => a.level - b.level)[0] || null;
    // Only name a weakest standard when it is lower than the strongest one.
    const weakest = lowest && strongest && lowest.level < strongest.level ? lowest : null;
    const sureNotYet = Object.values(row).filter((c) => isGraded(c) && c.kind === 0 && c.confidence === "strong").length;
    return {
      student: s,
      now: lv.now,
      direction: lv.direction,
      marks,
      strongest,
      weakest,
      missing: st.missing,
      pastDue: st.pastDue,
      waiting: st.waiting,
      sureNotYet,
    };
  }).sort((a, b) => (a.now ?? 3) - (b.now ?? 3) || String(a.student.first_name).localeCompare(String(b.student.first_name)));
}

// Grade-level standards in this class's subjects that no activity has covered.
// Left out on purpose: process standards (Math x.1; Science x.1–x.5),
// ELAR listening and speaking (x.1), fluency (x.4), self-sustained reading
// (x.5), and Social Studies skills.
const SKIP = {
  Math: (n) => n === 1,
  Science: (n) => n <= 5,
  ELAR: (n) => n === 1 || n === 4 || n === 5,
};

export function notTaughtYet(book, grade, subjects) {
  const taught = new Set(book.standards.map((s) => `${s.subject}|${s.code}`));
  const out = {};
  (subjects || []).forEach((subject) => {
    const list = [];
    if (subject === "Social Studies") {
      Object.values(SS_TEKS).forEach((entry) => {
        if (Number(entry.grade) !== Number(grade)) return;
        if (/skills/i.test(entry.strand || "")) return;
        if (!taught.has(`${subject}|${entry.code}`)) list.push({ code: entry.code, text: entry.text });
      });
    } else {
      const table = TEKS_WORDING[subject] || {};
      Object.entries(table).forEach(([code, text]) => {
        const m = code.match(/^(\d+)\.(\d+)/);
        if (!m || Number(m[1]) !== Number(grade)) return;
        if (SKIP[subject] && SKIP[subject](Number(m[2]))) return;
        if (!taught.has(`${subject}|${code}`)) list.push({ code, text });
      });
    }
    list.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
    if (list.length) out[subject] = list;
  });
  return out;
}

// "What to do this week": only the ones that apply, most useful first.
export function insights(book, rows, snap, grid) {
  const list = [];
  const weakest = rows.find((r) => r.counts[0] + r.counts[1] > 0);
  if (weakest) {
    const notYet = book.students.filter((s) => weakest.perStudent[s.id] === 0);
    const almost = book.students.filter((s) => weakest.perStudent[s.id] === 1);
    list.push({
      kind: "reteach",
      tone: "not",
      title: `Reteach TEKS ${weakest.code}${weakest.subject ? ` (${weakest.subject})` : ""}`,
      sub: weakest.wording || weakest.topic || "",
      text: `${notYet.length} ${notYet.length === 1 ? "student is" : "students are"} at Not yet and ${almost.length} at Almost, the most in the class.${notYet.length ? ` Not yet: ${notYet.map((s) => s.first_name).join(", ")}.` : ""}`,
      standard: weakest,
      students: notYet.length ? notYet : almost,
    });
  }
  const slipping = book.students.filter((s) => snap.levels[s.id].direction === "slipping");
  const improving = book.students.filter((s) => snap.levels[s.id].direction === "improving");
  if (slipping.length || improving.length) {
    list.push({
      kind: "direction",
      tone: slipping.length ? "not" : "got",
      title: `${slipping.length} slipping, ${improving.length} improving`,
      text: `Compared with two weeks ago. Slipping: ${slipping.map((s) => s.first_name).join(", ") || "no one"}. Improving: ${improving.map((s) => s.first_name).join(", ") || "no one"}.`,
      slipping,
      improving,
    });
  }
  const sure = grid.strong0 || [];
  if (sure.length) {
    const names = [...new Set(sure.map((x) => x.name))];
    list.push({
      kind: "confidence",
      tone: "wait",
      title: `${sure.length} "really strong, but Not yet" ${sure.length === 1 ? "answer" : "answers"}`,
      text: `These students were sure they were right, and weren't. That usually means a wrong idea, not a gap: ${sure.slice(0, 6).map((x) => `${x.name} (${x.column?.short || x.column?.code || ""})`).join(", ")}${sure.length > 6 ? "…" : ""}.`,
      students: names,
    });
  }
  const missing = book.students
    .map((s) => ({ s, st: studentStats(book, s.id) }))
    .filter((x) => x.st.pastDue > 0)
    .sort((a, b) => b.st.pastDue - a.st.pastDue);
  if (missing.length) {
    list.push({
      kind: "missing",
      tone: "alm",
      title: `${missing.length} ${missing.length === 1 ? "student has" : "students have"} past-due work`,
      text: `${missing.slice(0, 8).map((x) => `${x.s.first_name} (${x.st.pastDue})`).join(", ")}${missing.length > 8 ? "…" : ""}.`,
    });
  }
  let waiting = 0;
  book.students.forEach((s) => { waiting += studentStats(book, s.id).waiting; });
  if (waiting) {
    list.push({ kind: "waiting", tone: "wait", title: `${waiting} ${waiting === 1 ? "piece" : "pieces"} of work waiting for you`, text: "Grading these will update this page." });
  }
  return list;
}

export function buildReport(book, { grade, subjects, now = Date.now() } = {}) {
  const rows = standardRows(book);
  const snap = snapshot(book, now);
  const grid = confidenceGrid(book);
  return {
    rows,
    snap,
    grid,
    weeks: weeklySeries(book),
    students: studentRows(book, rows, snap),
    gaps: notTaughtYet(book, grade, subjects),
    todo: insights(book, rows, snap, grid),
  };
}

export { WAITING, MISSING, NOT_ASSIGNED };
