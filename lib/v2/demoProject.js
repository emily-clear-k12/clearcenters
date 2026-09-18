// CI2.0 · Project-on-teach stub helpers.
// Teacher Project button → lightweight shell; Assign to My Day writes localStorage.

import {
  DEMO_ACTIVITIES,
  DEMO_AUTO_ROUTINES,
  DAY_NAMES,
  DATES,
  DAYS,
  SUBJECTS,
  PRODUCT_INFO,
} from "./demoWeek";
// Key mirrors demoStudentDay.ADDED_ACTIVITIES_KEY (avoid circular import).
const ADDED_ACTIVITIES_KEY = "ci2.teacher.addedActivities";

/** localStorage — teacher "Assign to My Day" stubs (same browser). */
export const PROJECT_ASSIGNED_KEY = "ci2.project.assigned";

export const PROJECT_HREF = (id) =>
  `/v2/teacher/project/${encodeURIComponent(id)}`;

const DAY_FOCUS_HREF = (day) => `/v2/teacher/day?d=${Number(day) || 2}`;

/**
 * Resolve an activity by id from demo base, auto routines, or teacher-added tiles.
 */
export function findActivityById(id) {
  if (!id) return null;
  const fromDemo = DEMO_ACTIVITIES.find((a) => a.id === id);
  if (fromDemo) return { ...fromDemo, source: "demo" };
  const fromAuto = DEMO_AUTO_ROUTINES.find((a) => a.id === id);
  if (fromAuto) return { ...fromAuto, source: "auto" };
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(ADDED_ACTIVITIES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const hit = parsed.find((a) => a && a.id === id);
          if (hit) return { ...hit, source: "added" };
        }
      }
    } catch {
      /* ignore */
    }
  }
  return null;
}

/** Stub multi-day span from the teach day (skeleton — not a real planner). */
export function projectDaysSpan(dayIndex) {
  const d = Math.min(4, Math.max(0, Number(dayIndex) || 0));
  const end = Math.min(4, d + 2);
  const span = end - d + 1;
  if (span <= 1) {
    return {
      label: `${DAY_NAMES[d]} only · single-day stub`,
      startDay: d,
      endDay: d,
      days: 1,
    };
  }
  return {
    label: `${DAYS[d]}–${DAYS[end]} · ${span}-day span (stub)`,
    startDay: d,
    endDay: end,
    days: span,
    dateRange: `${DATES[d]} – ${DATES[end]}`,
  };
}

/** Evidence product vibe — calm stub copy, not a real rubric engine. */
export function evidenceProductStub(act) {
  const sub = SUBJECTS[act?.subject]?.name || "this subject";
  const product = PRODUCT_INFO[act?.product]?.tag || act?.product || "work";
  return {
    title: "Evidence product (stub)",
    body: `Students leave a short ${product.toLowerCase()} artifact that shows they got the idea — photo of work, 2–3 sentence explain, or exit sketch. Ready when you are; not graded here yet.`,
    subjectHint: sub,
  };
}

/**
 * Build the project shell model for a teach (or any) activity id.
 */
export function getProjectShell(id) {
  const act = findActivityById(id);
  if (!act) return null;
  const span = projectDaysSpan(act.day);
  const evidence = evidenceProductStub(act);
  const sub = SUBJECTS[act.subject] || { name: act.subject || "Subject", color: "#8B6CFF" };
  return {
    id: act.id,
    title: act.title,
    subject: act.subject,
    subjectName: sub.name,
    subjectColor: sub.color,
    kind: act.kind,
    isTeach: act.kind === "teach",
    standard: act.standard || "TEKS stub",
    teksLabel: act.standard ? `TEKS ${act.standard}` : "TEKS stub · add when ready",
    product: act.product,
    productAbout: PRODUCT_INFO[act.product]?.about || "",
    minutes: act.minutes || 15,
    who: act.who || "Everyone",
    day: act.day,
    dayLabel: `${DAY_NAMES[act.day] || "Day"} · ${DATES[act.day] || ""}`.trim(),
    span,
    evidence,
    backHref: DAY_FOCUS_HREF(act.day),
    source: act.source,
  };
}

export function loadAssignedProjects() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROJECT_ASSIGNED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => x && x.id) : [];
  } catch {
    return [];
  }
}

/**
 * Assign project stub to student My Day (same browser).
 * Upserts by activity id.
 */
export function assignProjectToMyDay(shellOrAct) {
  if (typeof window === "undefined" || !shellOrAct?.id) return null;
  const entry = {
    id: shellOrAct.id,
    title: shellOrAct.title,
    subject: shellOrAct.subject,
    product: shellOrAct.product || "ClearLessons",
    standard: shellOrAct.standard || "",
    minutes: shellOrAct.minutes || 20,
    day: shellOrAct.day != null ? shellOrAct.day : 2,
    evidenceTitle: shellOrAct.evidence?.title || "Evidence product (stub)",
    assignedAt: new Date().toISOString(),
  };
  const prev = loadAssignedProjects().filter((p) => p.id !== entry.id);
  const next = [entry, ...prev].slice(0, 8);
  try {
    localStorage.setItem(PROJECT_ASSIGNED_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("ci2-project-assigned"));
  } catch {
    /* ignore quota */
  }
  return entry;
}

export function isProjectAssigned(id) {
  return loadAssignedProjects().some((p) => p.id === id);
}

/** Map assigned project → student Later / Project mission card. */
export function assignedProjectToMission(entry) {
  return {
    id: `project-${entry.id}`,
    teacherTitle: entry.title,
    title: entry.title,
    product: entry.product || "ClearLessons",
    subject: entry.subject,
    minutes: entry.minutes || 20,
    must: false,
    kidAction: "Open",
    continueAction: "Continue",
    samHint: "Multi-day project stub — when you're ready, after must-dos.",
    isProject: true,
    fromProjectAssign: true,
    projectActivityId: entry.id,
  };
}

/**
 * Assigned projects for demo today (or given day), as Later mission cards.
 * Cheap bridge only — no real multi-week planner.
 */
export function readAssignedProjectsForDay(dayIndex = 2) {
  return loadAssignedProjects()
    .filter((p) => Number(p.day) === Number(dayIndex) || p.day == null)
    .map(assignedProjectToMission);
}