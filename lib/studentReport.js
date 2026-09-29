// One student's report — Sept 29, 2026.
// Used by the teacher's report page (app/teacher/reports/student/[studentId])
// and the shared link a parent opens (app/report/[token] via
// /api/reports/shared/[token]), so both always say the same thing.
// Built from the same book as the gradebook (lib/gradebook.js), in the same
// words: Got it / Almost / Not yet. No percents, no bands.
// Only RELEASED grades count here — a grade the teacher hasn't released yet
// shows as "Being graded", since this page can be shared with families.
// Pure functions only.

import { buildGradebook, isGraded, levelFromGrades, countGrades, studentStats, WAITING, RETURNED, MISSING, NOT_ASSIGNED } from "./gradebook";
import { levelWord } from "./gradeScale";
import { engineInfo } from "./teacherBridge";

function time(value) {
  const t = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(t) ? t : 0;
}

function resultWord(cell, engine) {
  if (!cell || cell.kind === NOT_ASSIGNED) return "Not assigned";
  if (isGraded(cell)) return levelWord(cell.kind, engine);
  if (cell.kind === WAITING) return "Being graded";
  if (cell.kind === RETURNED) return "Trying again";
  if (cell.kind === MISSING) return cell.pastDue ? "Not turned in" : cell.started ? "Started" : "Not started yet";
  return "";
}

export function buildStudentReport({ studentId, className, teacherName, students, assignments, targets, submissions, cases, tiers, crystalPoints = 0, now = Date.now() }) {
  const student = (students || []).find((s) => s.id === studentId);
  if (!student) return null;
  // Unreleased grades are hidden: they read as "Being graded".
  const released = (submissions || []).map((s) => (s.released ? s : { ...s, teacher_grade: null }));
  const book = buildGradebook({ classId: student.class_id, students, assignments, targets, submissions: released, cases, periodKey: "all", now });
  const caseMap = Object.fromEntries((cases || []).map((c) => [c.standard, c]));
  const row = book.cells[student.id] || {};
  const mine = book.columns.filter((col) => row[col.id] && row[col.id].kind !== NOT_ASSIGNED);
  const stats = studentStats(book, student.id, mine.map((c) => c.id));

  // The class, for one line of comparison: share of graded work at Got it.
  let classGot = 0;
  let classGraded = 0;
  book.students.forEach((s) => {
    book.columns.forEach((col) => {
      const cell = book.cells[s.id]?.[col.id];
      if (!isGraded(cell)) return;
      classGraded += 1;
      if (cell.kind === 2) classGot += 1;
    });
  });
  const myGraded = stats.grades.length;
  const myGot = stats.counts[2];

  const work = mine
    .map((col) => {
      const cell = row[col.id];
      return {
        id: col.id,
        title: col.title,
        activity: engineInfo(col.engine).label,
        code: col.code,
        subject: col.subject,
        date: col.dueDate || col.createdAt,
        at: time(cell.submittedAt) || time(col.createdAt),
        level: isGraded(cell) ? cell.kind : null,
        result: resultWord(cell, col.engine),
        missing: cell.kind === MISSING && !!cell.pastDue,
        waiting: cell.kind === WAITING,
      };
    })
    .sort((a, b) => time(b.date) - time(a.date));

  const skills = book.standards
    .filter((std) => std.key !== "Other")
    .map((std) => {
      const ids = std.columnIds.filter((id) => row[id] && row[id].kind !== NOT_ASSIGNED);
      if (!ids.length) return null;
      const st = studentStats(book, student.id, ids);
      const target = ids.map((id) => caseMap[book.columns.find((c) => c.id === id)?.standard]?.learning_target).find(Boolean) || "";
      return { key: std.key, code: std.code, subject: std.subject, wording: std.wording, target, level: st.level, graded: st.grades.length, activities: ids.length };
    })
    .filter(Boolean);

  const levelNow = levelFromGrades(stats.grades);
  const turnedIn = mine.filter((col) => row[col.id].kind !== MISSING).length;
  const pastDue = mine.filter((col) => row[col.id].kind === MISSING && row[col.id].pastDue).length;
  const missionsCompleted = turnedIn;
  const allTiers = tiers || [];
  const earnedTiers = allTiers.filter((t) => missionsCompleted >= t.threshold);
  const nextTier = allTiers.find((t) => missionsCompleted < t.threshold) || null;

  return {
    studentName: student.first_name,
    className: className || "",
    teacherName: teacherName || "",
    level: levelNow,
    counts: countGrades(stats.grades),
    assigned: mine.length,
    turnedIn,
    pastDue,
    waiting: stats.waiting,
    gotShare: myGraded ? Math.round((myGot / myGraded) * 100) : null,
    classGotShare: classGraded ? Math.round((classGot / classGraded) * 100) : null,
    strengths: skills.filter((s) => s.level === 2),
    workingOn: skills.filter((s) => s.level === 0 || s.level === 1).sort((a, b) => a.level - b.level),
    notGraded: skills.filter((s) => s.level == null),
    skills,
    work,
    crystalPoints,
    earnedTiers,
    nextTier,
    missionsCompleted,
  };
}
