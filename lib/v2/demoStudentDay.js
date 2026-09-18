// CI2.0 Student My Day — demo day for Leo.
// Missions mirror teacher demo week "today" = Wednesday (day index 2).
// Teacher Add extras: see ADDED_ACTIVITIES_KEY (written by usePlanner).

import { DATES, DAY_NAMES, PRODUCT_INFO, SUBJECTS } from "./demoWeek";

/** localStorage key — teacher Add / suggestion tiles (session bridge). */
export const ADDED_ACTIVITIES_KEY = "ci2.teacher.addedActivities";

/** Demo "today" matches teacher Daily Focus default (Wed). */
export const STUDENT_TODAY_DAY = 2;

export const DEMO_STUDENT = {
  name: "Leo",
  className: "Room 12",
  teacher: "Ms. Rivera",
  classCodeStub: "RIVERA-12",
};

/**
 * Curated student day derived from DEMO_ACTIVITIES Wed (math teach + Pizza Problem)
 * plus one ELAR may-do (Purpose match stations). Same card shape for every product.
 */
export const DEMO_STUDENT_DAY = {
  dayIndex: STUDENT_TODAY_DAY,
  dateLabel: `${DAY_NAMES[STUDENT_TODAY_DAY]} · ${DATES[STUDENT_TODAY_DAY]}`,
  greeting: (name) => `Hi ${name}!`,
  /** Calm, honest SAM — positive + "not yet" when locked. */
  samLine: "Three things today. Start with Now — you've got this.",
  samMustFirst: "Not yet — finish your must-dos first, then this opens. Let's try that order.",
  samStarted: (title) => `Nice — starting “${title}.” Take your time.`,
  /** Once when Teacher checked stamp lands — calm kid voice, not a grade scare. */
  samTeacherChecked: (title) =>
    `Hey — Ms. Rivera checked “${title}.” Nice work. Keep going when you're ready.`,
  doneYesterday: [
    {
      id: "yday-fraction-strips",
      title: "Fraction strips",
      product: "ClearSheets",
      note: "You finished this yesterday. Nice work.",
    },
  ],
  missions: [
    {
      id: "stu-now-equiv",
      /** Links conceptually to teacher act “Equivalent fractions” (ClearLessons, Wed). */
      teacherTitle: "Equivalent fractions",
      title: "Equivalent fractions",
      product: "ClearLessons",
      subject: "math",
      minutes: 15,
      must: true,
      kidAction: "Start",
      continueAction: "Continue",
      samHint: "Ms. Rivera is teaching — tap Start when she says go.",
    },
    {
      id: "stu-next-pizza",
      teacherTitle: "Analyze: The Pizza Problem",
      title: "The Pizza Problem",
      product: "ClearCenters",
      subject: "math",
      minutes: 25,
      must: true,
      kidAction: "Start",
      continueAction: "Continue",
      samHint: "Think it through — Practice, then Prove.",
    },
    {
      id: "stu-later-purpose",
      teacherTitle: "Purpose match stations",
      title: "Purpose match stations",
      product: "ClearCenters",
      subject: "elar",
      minutes: 20,
      must: false,
      kidAction: "Start",
      continueAction: "Continue",
      samHint: "May-do after must-dos. Fun when you're ready.",
    },
  ],
};

/** Kid-facing product chip (same card shape regardless of product). */
export function productKidLabel(product) {
  const tag = PRODUCT_INFO[product]?.tag;
  if (tag) return tag;
  if (!product) return "Activity";
  return String(product).replace(/^Clear/, "").replace(/^Crystal/, "") || "Activity";
}

export function subjectColor(subject) {
  return SUBJECTS[subject]?.color || "#8B6CFF";
}

export function subjectName(subject) {
  return SUBJECTS[subject]?.name || subject || "";
}

/**
 * Read teacher-added tiles from localStorage (same browser).
 * Returns activities for the given day index (default: demo today / Wed).
 */
export function readTeacherAddedForDay(dayIndex = STUDENT_TODAY_DAY) {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ADDED_ACTIVITIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((a) => a && Number(a.day) === Number(dayIndex));
  } catch {
    return [];
  }
}

/** Map a teacher activity tile into a student mission card shape. */
export function teacherActToMission(act, { must = true } = {}) {
  return {
    id: `from-teacher-${act.id}`,
    teacherTitle: act.title,
    title: act.title,
    product: act.product,
    subject: act.subject,
    minutes: act.minutes || 10,
    must,
    kidAction: "Start",
    continueAction: "Continue",
    samHint: must
      ? "Your teacher just added this for today."
      : "Extra from your teacher — after must-dos.",
    fromTeacherAdd: true,
  };
}

/**
 * Build Now / Next / Later list: demo missions + any teacher-added for today.
 * Must-dos first, then may-dos. Cap ~3 on screen (extras beyond slot into Later quietly).
 */
export function buildStudentDayMissions(demoMissions, teacherAdded = []) {
  const base = (demoMissions || []).map((m) => ({ ...m }));
  const extras = (teacherAdded || []).map((a) => teacherActToMission(a, { must: true }));
  // Teacher Add for today rises near the top (after Now demo) so the loop is visible.
  const merged = [...base];
  if (extras.length) {
    // Insert after first must (Now), before remaining — or push if empty.
    const insertAt = Math.min(1, merged.length);
    merged.splice(insertAt, 0, ...extras);
  }
  const musts = merged.filter((m) => m.must);
  const mays = merged.filter((m) => !m.must);
  const ordered = [...musts, ...mays];
  return ordered.slice(0, 3).map((m, i) => ({
    ...m,
    slot: i === 0 ? "now" : i === 1 ? "next" : "later",
  }));
}