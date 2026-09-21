// CI2.0 Student My Day — pitch cast Sofia · Noah · Diego (TEKS 5.6B mixtures).
// Missions mirror teacher demo week "today" = Wednesday (day index 2).
// Leo / Kai / Riley stay in data for legacy storage migration only — not on the pitch path.
// Teacher Add extras: see ADDED_ACTIVITIES_KEY (written by usePlanner).

import { DATES, DAY_NAMES, DEMO_TEACHER, PRODUCT_INFO, SUBJECTS } from "./demoWeek";

/** localStorage key — teacher Add / suggestion tiles (session bridge). */
export const ADDED_ACTIVITIES_KEY = "ci2.teacher.addedActivities";

/** Demo "today" matches teacher Daily Focus default (Wed). */
export const STUDENT_TODAY_DAY = 2;

/** Active demo kid id — pitch cast only on the happy path (Sofia · Noah · Diego). */
export const DEMO_KID_STORAGE_KEY = "ci2.student.demoKid";

/** Soft-story cast (TEKS 5.6B) — must match teacher demoReports softCluster. */
export const SOFT_CAST_KID_IDS = ["sofia", "noah", "diego"];

/** Light demo roster — soft cast + math/ELAR demos. Diego is Period A on teacher side. */
export const DEMO_STUDENT_KIDS = [
  {
    id: "sofia",
    name: "Sofia",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
    softCast: true,
    /** Soft 5.6B cluster lives on Period A with teacher Check-ins. */
    periodId: "A",
  },
  {
    id: "noah",
    name: "Noah",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
    softCast: true,
    periodId: "A",
  },
  {
    id: "diego",
    name: "Diego",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
    softCast: true,
    /** Teacher: Diego science / Period A only — never on Period B math demos. */
    periodId: "A",
  },
  {
    id: "leo",
    name: "Leo",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
  },
  {
    id: "kai",
    name: "Kai",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
  },
  {
    id: "riley",
    name: "Riley",
    className: "Room 12",
    teacher: DEMO_TEACHER.name,
    classCodeStub: "BARRONS-12",
  },
];

/** Default demo kid — soft-story lead so teacher→student doors land correctly. */
export const DEFAULT_DEMO_KID_ID = "sofia";

/** Pitch-path kids only (Sofia · Noah · Diego). UI switcher uses this — not Leo / Kai / Riley. */
export const DEMO_PITCH_KIDS = DEMO_STUDENT_KIDS.filter((k) => k.softCast);


/** @deprecated Prefer getActiveDemoStudent() — soft-cast Sofia default. */
export const DEMO_STUDENT = DEMO_STUDENT_KIDS[0];

export function resolveDemoKidIdFromName(nameOrId) {
  const raw = String(nameOrId || "").trim().toLowerCase();
  if (!raw) return null;
  const byId = DEMO_STUDENT_KIDS.find((k) => k.id === raw);
  if (byId) return byId.id;
  const byName = DEMO_STUDENT_KIDS.find((k) => k.name.toLowerCase() === raw);
  return byName ? byName.id : null;
}

export function isSoftCastKidId(kidId) {
  return SOFT_CAST_KID_IDS.includes(String(kidId || "").trim().toLowerCase());
}

/**
 * Student My Day deep link — kid + optional soft standard.
 * Teacher Confirm toast / soft doors use this so the right kid + 5.6B land.
 */
export function studentMyDayHref(opts = {}) {
  const params = new URLSearchParams();
  const kidId = resolveDemoKidIdFromName(opts.student || opts.studentFirst || opts.kidId);
  if (kidId) params.set("student", kidId);
  const standard = String(opts.standard || opts.code || "").trim();
  if (standard) params.set("standard", standard);
  const q = params.toString();
  return q ? `/v2/student?${q}` : "/v2/student";
}

/** Soft-story My Day door — first soft-cluster name (or Sofia) + standard. */
export function softStoryMyDayHref(opts = {}) {
  const code = String(opts.standard || opts.code || "5.6B").trim() || "5.6B";
  const names = Array.isArray(opts.names) ? opts.names.filter(Boolean) : [];
  const lead =
    opts.student ||
    opts.studentFirst ||
    names[0] ||
    "Sofia";
  return studentMyDayHref({ student: lead, standard: code });
}

export function getActiveDemoKidId() {
  if (typeof window === "undefined") return DEFAULT_DEMO_KID_ID;
  try {
    const raw = window.localStorage.getItem(DEMO_KID_STORAGE_KEY);
    // Pitch path: only Sofia · Noah · Diego. Legacy Leo / Kai / Riley → Sofia.
    if (raw && isSoftCastKidId(raw)) return raw;
    if (raw && DEMO_STUDENT_KIDS.some((k) => k.id === raw)) {
      try {
        window.localStorage.setItem(DEMO_KID_STORAGE_KEY, DEFAULT_DEMO_KID_ID);
      } catch {
        /* ignore */
      }
      return DEFAULT_DEMO_KID_ID;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_DEMO_KID_ID;
}

export function getActiveDemoStudent() {
  const id = getActiveDemoKidId();
  return DEMO_STUDENT_KIDS.find((k) => k.id === id) || DEMO_STUDENT_KIDS[0];
}

export function setActiveDemoKidId(id) {
  if (typeof window === "undefined") return getActiveDemoKidId();
  const resolved = resolveDemoKidIdFromName(id) || DEFAULT_DEMO_KID_ID;
  // Pitch path: refuse Leo / Kai / Riley picks.
  const next = isSoftCastKidId(resolved) ? resolved : DEFAULT_DEMO_KID_ID;
  try {
    window.localStorage.setItem(DEMO_KID_STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent("ci2-demo-kid-changed"));
  } catch {
    /* ignore quota */
  }
  return next;
}

/**
 * Per-kid localStorage key so demo kids don't collide.
 * Leo also falls back to the legacy unscoped key when reading (migration).
 */
export function studentScopedKey(baseKey, kidId = null) {
  const kid = kidId || getActiveDemoKidId();
  return `${baseKey}.${kid}`;
}

/** Read string from scoped key; Leo migrates from legacy unscoped key. */
export function readStudentScopedRaw(baseKey, kidId = null) {
  if (typeof window === "undefined") return null;
  try {
    const kid = kidId || getActiveDemoKidId();
    const scoped = window.localStorage.getItem(studentScopedKey(baseKey, kid));
    if (scoped != null) return scoped;
    if (kid === "leo") {
      return window.localStorage.getItem(baseKey);
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function writeStudentScopedRaw(baseKey, value, kidId = null) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(studentScopedKey(baseKey, kidId), value);
  } catch {
    /* ignore quota */
  }
}

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
    `Hey — ${DEMO_TEACHER.name} checked “${title}.” Nice work. Keep going when you're ready.`,
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
      samHint: `${DEMO_TEACHER.name} is teaching — tap Start when she says go.`,
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

/** Soft-story science mission — TEKS 5.6B mixtures (Sofia · Noah · Diego). */
export const SOFT_MIXTURES_MISSION = {
  id: "stu-soft-mixtures",
  teacherTitle: "Mixtures exit ticket",
  title: "Mixtures · claim + evidence",
  product: "ClearSheets",
  subject: "science",
  standard: "5.6B",
  minutes: 15,
  must: true,
  kidAction: "Start",
  continueAction: "Continue",
  softStory: true,
  samHint: "Claim + one evidence note — mixture vs solution. Take your time.",
};

/**
 * Missions for the active demo kid.
 * Soft cast (or ?standard=5.6B arrival) leads with mixtures so teacher loop lands.
 * Leo / Kai / Riley keep the math/ELAR day (no Riley-on-mixtures contradiction).
 */
export function missionsForDemoKid(kidId = null, opts = {}) {
  const kid = String(kidId || getActiveDemoKidId()).trim().toLowerCase();
  const code = String(opts.standard || "").trim().toUpperCase();
  const softFocus = code === "5.6B" || isSoftCastKidId(kid);
  const base = DEMO_STUDENT_DAY.missions.map((m) => ({ ...m }));
  if (!softFocus) return base;
  // Soft cast: mixtures Now, keep Pizza as may-do later — no Riley math as "their" soft story.
  const rest = base
    .filter((m) => m.id !== "stu-now-equiv")
    .map((m) =>
      m.id === "stu-next-pizza" || m.id === "stu-later-purpose"
        ? { ...m, must: false }
        : m
    );
  return [{ ...SOFT_MIXTURES_MISSION }, ...rest].slice(0, 3);
}

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

/**
 * Apply ?student=&standard= from teacher→student doors.
 * Switches active demo kid when known; returns { kidId, standard } for calm context.
 */
export function applyStudentArrivalQuery(searchParams) {
  if (!searchParams) return { kidId: getActiveDemoKidId(), standard: null };
  const studentRaw =
    (typeof searchParams.get === "function"
      ? searchParams.get("student")
      : searchParams.student) || "";
  const standardRaw =
    (typeof searchParams.get === "function"
      ? searchParams.get("standard")
      : searchParams.standard) || "";
  const kidId = resolveDemoKidIdFromName(studentRaw);
  if (kidId) setActiveDemoKidId(kidId);
  const standard = String(standardRaw || "").trim() || null;
  return {
    kidId: kidId || getActiveDemoKidId(),
    standard,
  };
}