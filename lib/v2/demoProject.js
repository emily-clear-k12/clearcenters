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

/** localStorage — last Who-it's-for choice per activity id (same browser). */
export const PROJECT_AUDIENCE_KEY = "ci2.project.audience";

export const PROJECT_HREF = (id) =>
  `/v2/teacher/project/${encodeURIComponent(id)}`;

const DAY_FOCUS_HREF = (day) => `/v2/teacher/day?d=${Number(day) || 2}`;

/** Who it's for — whole class vs small group (ties to Who needs me / reteach). */
export const AUDIENCE_OPTIONS = [
  {
    id: "whole_class",
    label: "Whole class",
    short: "Everyone",
    hint: "Same project beat for the room.",
  },
  {
    id: "small_group",
    label: "Small group",
    short: "Small group",
    hint: "Pull a few kids — often from Who needs me.",
  },
];

/** Demo names when Small group is selected (stub — no roster picker). */
export const DEMO_SMALL_GROUP_NAMES = ["Kai", "Riley"];

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
      label: "1 day",
      chip: "1 day",
      startDay: d,
      endDay: d,
      days: 1,
      dateRange: DATES[d] || "",
    };
  }
  return {
    label: `${span} days`,
    chip: `${span} days`,
    startDay: d,
    endDay: end,
    days: span,
    dateRange: `${DATES[d]} – ${DATES[end]}`,
    weekHint: `${DAYS[d]}–${DAYS[end]}`,
  };
}

/**
 * Named evidence product kids turn in — calm stub, not a rubric engine.
 * Postcard / poster / short response vibes by subject + product family.
 */
const EVIDENCE_BY_SUBJECT = {
  math: { label: "Fraction postcard", vibe: "postcard" },
  elar: { label: "Author's purpose short response", vibe: "short_response" },
  science: { label: "Matter lab poster", vibe: "poster" },
  social: { label: "Texas regions postcard", vibe: "postcard" },
};

const EVIDENCE_BY_PRODUCT = {
  ClearLessons: { label: "Exit sketch postcard", vibe: "postcard" },
  ClearSheets: { label: "Annotated sheet photo", vibe: "photo" },
  ClearCenters: { label: "Prove-it poster", vibe: "poster" },
  CrystalQuest: { label: "Quest reflection postcard", vibe: "postcard" },
  "ClassCade Showdown": { label: "Team review poster", vibe: "poster" },
  CrystalChecks: { label: "CrystalCheck short response", vibe: "short_response" },
};

export function evidenceProductStub(act) {
  const sub = SUBJECTS[act?.subject]?.name || "this subject";
  const productTag = PRODUCT_INFO[act?.product]?.tag || act?.product || "work";
  const bySub = EVIDENCE_BY_SUBJECT[act?.subject];
  const byProd = EVIDENCE_BY_PRODUCT[act?.product];
  const label =
    bySub?.label ||
    byProd?.label ||
    `Short ${String(productTag).toLowerCase()} artifact`;
  const vibe = bySub?.vibe || byProd?.vibe || "artifact";
  return {
    title: "Evidence product",
    label,
    chip: label,
    vibe,
    body: `Kids turn in a ${label.toLowerCase()} — photo of work, 2–3 sentences, or exit sketch. Shows they got the idea. Ready when you are; not graded here yet.`,
    subjectHint: sub,
    productTag,
  };
}

/**
 * Day 1 / Day 2 / Day 3 checkpoint beats (research → draft → share flavor).
 * Length follows stub span; single-day collapses to one beat.
 * chip = 1–3 word glance label; beat/detail stay for Details expand.
 */
export function checkpointsFor(act, span) {
  const days = Math.max(1, Number(span?.days) || 3);
  const start = Number(span?.startDay != null ? span.startDay : act?.day) || 0;
  const sub = act?.subject || "math";

  const beatsBySubject = {
    math: [
      { chip: "Research", beat: "Explore models", detail: "Try equivalent pairs with strips or number lines." },
      { chip: "Draft", beat: "Draft postcard", detail: "Sketch one clear example + a kid sentence." },
      { chip: "Share", beat: "Share & turn in", detail: "Partner check, then drop the postcard in." },
    ],
    elar: [
      { chip: "Research", beat: "Read & notice", detail: "Mark why the author wrote it." },
      { chip: "Draft", beat: "Draft response", detail: "2–3 sentences with one text clue." },
      { chip: "Share", beat: "Share & polish", detail: "Read aloud once, then turn in." },
    ],
    science: [
      { chip: "Observe", beat: "Observe & note", detail: "Gather what you see / measure." },
      { chip: "Draft", beat: "Build poster", detail: "Claim + evidence in kid words." },
      { chip: "Share", beat: "Share findings", detail: "Quick gallery walk, then turn in." },
    ],
    social: [
      { chip: "Research", beat: "Research region", detail: "Land, people, or one map fact." },
      { chip: "Draft", beat: "Draft postcard", detail: "Picture + one sentence from a visitor." },
      { chip: "Share", beat: "Share & send", detail: "Partner swap, then turn in." },
    ],
  };

  const pool = beatsBySubject[sub] || beatsBySubject.math;
  const count = Math.min(days, pool.length);
  const out = [];
  for (let i = 0; i < count; i++) {
    const dayIndex = Math.min(4, start + i);
    const dayNum = i + 1;
    out.push({
      id: `cp-${dayNum}`,
      dayNum,
      dayIndex,
      dayLabel: DAY_NAMES[dayIndex] || `Day ${dayNum}`,
      title: `Day ${dayNum}`,
      chip: pool[i].chip,
      beat: pool[i].beat,
      detail: pool[i].detail,
    });
  }
  return out;
}

/** Light Why one-liner — not a standards picker. */
export function whyStub(act, evidence) {
  const sub = SUBJECTS[act?.subject]?.name || "this subject";
  const label = evidence?.label || "a short artifact";
  return `Give kids a calm multi-day path in ${sub} that ends in ${label.toLowerCase()} — teach heart first, evidence when ready.`;
}

/**
 * SAM calm one-liner for glance default (e.g. "3-day fraction postcard — ready to assign.").
 */
export function samLineStub(act, span, evidence) {
  const n = Math.max(1, Number(span?.days) || 3);
  const dayWord = n === 1 ? "1-day" : `${n}-day`;
  const label = (evidence?.label || "project").toLowerCase();
  const ready = act?.kind === "teach" ? "ready to assign" : "shell only";
  return `${dayWord} ${label} — ${ready}.`;
}

export function loadAudienceMap() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROJECT_AUDIENCE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveAudienceChoice(id, audienceId) {
  if (typeof window === "undefined" || !id) return;
  const next = { ...loadAudienceMap(), [id]: audienceId };
  try {
    localStorage.setItem(PROJECT_AUDIENCE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

export function loadAudienceChoice(id, fallback = "whole_class") {
  if (!id) return fallback;
  const map = loadAudienceMap();
  const hit = map[id];
  return AUDIENCE_OPTIONS.some((o) => o.id === hit) ? hit : fallback;
}

/**
 * Build the project shell model for a teach (or any) activity id.
 */
export function getProjectShell(id) {
  const act = findActivityById(id);
  if (!act) return null;
  const span = projectDaysSpan(act.day);
  const evidence = evidenceProductStub(act);
  const checkpoints = checkpointsFor(act, span);
  const why = whyStub(act, evidence);
  const samLine = samLineStub(act, span, evidence);
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
    why,
    samLine,
    product: act.product,
    productAbout: PRODUCT_INFO[act.product]?.about || "",
    minutes: act.minutes || 15,
    who: act.who || "Everyone",
    day: act.day,
    dayLabel: `${DAY_NAMES[act.day] || "Day"} · ${DATES[act.day] || ""}`.trim(),
    span,
    evidence,
    checkpoints,
    audienceOptions: AUDIENCE_OPTIONS,
    defaultAudience: "whole_class",
    smallGroupDemoNames: DEMO_SMALL_GROUP_NAMES,
    whoNeedsMeHref: "/v2/teacher/who-needs-me",
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
 * Upserts by activity id. Includes evidence label + audience.
 */
export function assignProjectToMyDay(shellOrAct, opts = {}) {
  if (typeof window === "undefined" || !shellOrAct?.id) return null;
  const audienceId =
    opts.audienceId ||
    shellOrAct.audienceId ||
    loadAudienceChoice(shellOrAct.id, shellOrAct.defaultAudience || "whole_class");
  const audienceMeta = AUDIENCE_OPTIONS.find((o) => o.id === audienceId) || AUDIENCE_OPTIONS[0];
  const evidenceLabel =
    shellOrAct.evidence?.label ||
    shellOrAct.evidenceLabel ||
    "Short artifact";
  const entry = {
    id: shellOrAct.id,
    title: shellOrAct.title,
    subject: shellOrAct.subject,
    product: shellOrAct.product || "ClearLessons",
    standard: shellOrAct.standard || "",
    minutes: shellOrAct.minutes || 20,
    day: shellOrAct.day != null ? shellOrAct.day : 2,
    evidenceTitle: shellOrAct.evidence?.title || "Evidence product",
    evidenceLabel,
    audienceId: audienceMeta.id,
    audienceLabel: audienceMeta.label,
    assignedAt: new Date().toISOString(),
  };
  saveAudienceChoice(shellOrAct.id, audienceMeta.id);
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
  const evidenceLabel = entry.evidenceLabel || null;
  const audienceNote =
    entry.audienceId === "small_group"
      ? " · small group"
      : entry.audienceLabel
        ? ` · ${entry.audienceLabel.toLowerCase()}`
        : "";
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
    samHint: evidenceLabel
      ? `Multi-day project — turn in your ${evidenceLabel.toLowerCase()} when ready.`
      : "Multi-day project stub — when you're ready, after must-dos.",
    isProject: true,
    fromProjectAssign: true,
    projectActivityId: entry.id,
    evidenceLabel,
    audienceId: entry.audienceId || "whole_class",
    audienceLabel: entry.audienceLabel || "Whole class",
    projectMetaLine: evidenceLabel
      ? `${evidenceLabel}${audienceNote}`
      : null,
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
