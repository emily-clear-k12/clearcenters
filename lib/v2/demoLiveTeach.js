// CI2.0 · Live teach shell — present-mode skeleton (not a slide deck builder).
// Big objective · beat 1/2/3 · next/back · assign practice → My Day (localStorage).

import { getLessonPlanStub, LESSON_PLAN_HREF } from "./demoLessonPlan";
import { PROJECT_HREF } from "./demoProject";
import {
  loadAddedActivities,
  saveAddedActivities,
} from "./demoLibrary";
import {
  readStudentScopedRaw,
  writeStudentScopedRaw,
} from "./demoStudentDay";
import { FOCUS_TODAY_DAY } from "./demoWhoNeedsMe";

export const LIVE_TEACH_HREF = (id) =>
  `/v2/teacher/live-teach/${encodeURIComponent(id)}`;

/** Base key — Assign practice stubs; scoped per demo kid so demos do not collide. */
export const PRACTICE_ASSIGNED_KEY = "ci2.practice.assigned";

/**
 * Present-mode model from a teach activity id (reuses lesson-plan spine).
 */
export function getLiveTeachStub(id) {
  const plan = getLessonPlanStub(id);
  if (!plan) return null;
  const beats = (plan.spine || []).map((b, i) => ({
    index: i + 1,
    title: b.beat,
    detail: b.detail,
  }));
  while (beats.length < 3) {
    beats.push({
      index: beats.length + 1,
      title: `Beat ${beats.length + 1}`,
      detail: "Calm teach beat stub.",
    });
  }
  return {
    id: plan.id,
    title: plan.title,
    subject: plan.subject,
    subjectName: plan.subjectName,
    subjectColor: plan.subjectColor,
    objective: plan.objective,
    teksChip: plan.teksChip,
    dayLabel: plan.dayLabel,
    day: plan.day != null ? plan.day : 2,
    minutes: plan.minutes,
    product: plan.product || "ClearLessons",
    beats: beats.slice(0, 3),
    assignPracticeLabel: "Assign practice",
    assignPracticeHint: "Queues a short practice card on student My Day (this browser).",
    samLine: "Teach live · glance-first present mode — not a slide deck.",
    lessonPlanHref: LESSON_PLAN_HREF(plan.id),
    projectHref: plan.projectHref || PROJECT_HREF(plan.id),
    backHref: plan.backHref,
  };
}

export function loadAssignedPractice() {
  if (typeof window === "undefined") return [];
  try {
    const raw = readStudentScopedRaw(PRACTICE_ASSIGNED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => x && x.id) : [];
  } catch {
    return [];
  }
}

/**
 * Mint a quiet planner tile for practice assigned from Teach live.
 * Upserts by liveTeachId so re-assign does not pile tiles. Shows
 * "From live teach" via plannerProvenanceLabel on Daily Focus / This Week.
 */
export function mintLiveTeachPracticeToPlanner(shellOrAct) {
  if (typeof window === "undefined" || !shellOrAct?.id) return null;
  const day =
    shellOrAct.day != null ? Number(shellOrAct.day) : FOCUS_TODAY_DAY;
  const entry = {
    id: `added-live-${shellOrAct.id}`,
    subject: shellOrAct.subject || "math",
    day,
    kind: "work",
    title: `Practice · ${shellOrAct.title || "from teach"}`,
    product: shellOrAct.product || "ClearLessons",
    minutes: Math.min(Number(shellOrAct.minutes) || 10, 15),
    who: "Everyone",
    classes: "all",
    standard: "",
    isNew: true,
    fromLiveTeach: true,
    liveTeachId: shellOrAct.id,
  };
  const prev = loadAddedActivities().filter(
    (a) =>
      a &&
      a.id !== entry.id &&
      !(a.fromLiveTeach && a.liveTeachId === shellOrAct.id)
  );
  saveAddedActivities([entry, ...prev]);
  return entry;
}

/**
 * Assign practice stub to student My Day (same browser).
 * Upserts by activity id. Also mints a planner tile with fromLiveTeach
 * so Daily Focus / This Week show quiet "From live teach" provenance.
 * Mirrors project assign / grading bridge pattern.
 */
export function assignPracticeToMyDay(shellOrAct, opts = {}) {
  if (typeof window === "undefined" || !shellOrAct?.id) return null;
  const entry = {
    id: shellOrAct.id,
    title: shellOrAct.title || "Practice",
    subject: shellOrAct.subject,
    product: shellOrAct.product || "ClearLessons",
    minutes: Math.min(Number(shellOrAct.minutes) || 10, 15),
    day: shellOrAct.day != null ? shellOrAct.day : 2,
    objective: shellOrAct.objective || "",
    assignedAt: new Date().toISOString(),
    must: opts.must === true, // practice defaults to may-do
  };
  const prev = loadAssignedPractice().filter((p) => p.id !== entry.id);
  const next = [entry, ...prev].slice(0, 8);
  try {
    writeStudentScopedRaw(PRACTICE_ASSIGNED_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("ci2-practice-assigned"));
  } catch {
    /* ignore quota */
  }
  mintLiveTeachPracticeToPlanner(shellOrAct);
  return entry;
}

export function isPracticeAssigned(id) {
  return loadAssignedPractice().some((p) => p.id === id);
}

/** Map assigned practice → student Now/Next/Later mission card. */
export function assignedPracticeToMission(entry) {
  return {
    id: `practice-${entry.id}`,
    teacherTitle: entry.title,
    title: entry.title,
    product: entry.product || "ClearLessons",
    subject: entry.subject,
    minutes: entry.minutes || 10,
    must: entry.must === true,
    kidAction: "Start",
    continueAction: "Continue",
    samHint: "Short practice from teach live — try a couple items, then Submit.",
    isPractice: true,
    fromPracticeAssign: true,
    practiceActivityId: entry.id,
    fromTeacherAdd: true,
  };
}

/**
 * Assigned practice for demo today (or given day), as mission cards.
 * Cheap bridge only — same browser; no roster push.
 */
export function readAssignedPracticeForDay(dayIndex = 2) {
  return loadAssignedPractice()
    .filter((p) => Number(p.day) === Number(dayIndex) || p.day == null)
    .map(assignedPracticeToMission);
}

/** Resolve practice-* mission id → assigned entry (for activity stub). */
export function resolvePracticeAssignment(missionId) {
  if (!missionId) return null;
  const decoded = decodeURIComponent(String(missionId));
  const activityId = decoded.startsWith("practice-")
    ? decoded.slice("practice-".length)
    : decoded;
  const entry = loadAssignedPractice().find(
    (p) => p.id === activityId || `practice-${p.id}` === decoded
  );
  return entry || null;
}

export default getLiveTeachStub;