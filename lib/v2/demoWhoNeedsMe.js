// CI2.0 Who needs me — reteach / small-group stub.
// Calm 1–3 kid cards from demo + live grading inbox. Same-browser localStorage only.
// No standards analytics, AI grouping, or roster sync.

import {
  getPendingSubmissions,
  loadConfirmedIds,
  loadLiveInbox,
} from "./demoGrading";

export const WHO_NEEDS_ME_HREF = "/v2/teacher/who-needs-me";
export const WHO_NEEDS_ME_STORAGE_KEY = "ci2.whoNeedsMe.choices";
export const WHO_NEEDS_ME_MAX = 3;

/** @typedef {"needs_you"|"ready"} NeedTone */
/** @typedef {"low_clearance"|"not_started"|"just_submitted"|"watch"} NeedReason */
/** @typedef {"small_group"|"reteach_tomorrow"|"dismiss"} NeedAction */

/**
 * Demo seed kids. Light reasons only — not a spreadsheet.
 * Ids are stable so dismiss / action choices persist.
 */
export const DEMO_WHO_NEEDS_ME = [
  {
    id: "wnm-kai",
    studentFirst: "Kai",
    subject: "math",
    standard: "4.3C",
    assignment: "Equivalent fractions practice",
    reason: "low_clearance",
    tone: "needs_you",
    blurb: "Low on clearance — number-line jumps still shaky.",
    nextHint: "A short small-group pass would help.",
    source: "demo",
  },
  {
    id: "wnm-riley",
    studentFirst: "Riley",
    subject: "math",
    standard: "4.3C",
    assignment: "The Pizza Problem",
    reason: "not_started",
    tone: "needs_you",
    blurb: "Hasn't started today's center yet.",
    nextHint: "A gentle nudge, or pull into the group with Kai.",
    source: "demo",
  },
  {
    id: "wnm-maya",
    studentFirst: "Maya",
    subject: "math",
    standard: "4.3G",
    assignment: "Fraction strips",
    reason: "just_submitted",
    tone: "ready",
    blurb: "Just submitted — worth a quick look when you have a minute.",
    nextHint: "Looks mostly solid; confirm in grading when ready.",
    source: "demo",
  },
];

const REASON_LABELS = {
  low_clearance: "Low on clearance",
  not_started: "Not started",
  just_submitted: "Just submitted",
  watch: "Worth a look",
};

const ACTION_LABELS = {
  small_group: "Pulled for small group",
  reteach_tomorrow: "Reteach tomorrow",
  dismiss: "Looks good",
};

export function reasonLabel(reason) {
  return REASON_LABELS[reason] || "Worth a look";
}

export function actionLabel(action) {
  return ACTION_LABELS[action] || action;
}

function notifyWhoNeedsUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-who-needs-updated"));
  } catch {
    /* ignore */
  }
}

/**
 * Choices shape: { [id]: { action, at } }
 * Dismiss / small_group / reteach_tomorrow all leave the active list.
 */
export function loadWhoNeedsChoices() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(WHO_NEEDS_ME_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export function saveWhoNeedsChoices(choices) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WHO_NEEDS_ME_STORAGE_KEY, JSON.stringify(choices || {}));
    notifyWhoNeedsUpdated();
  } catch {
    /* ignore quota */
  }
}

export function recordWhoNeedsAction(id, action) {
  if (!id || !action) return loadWhoNeedsChoices();
  const next = {
    ...loadWhoNeedsChoices(),
    [id]: { action, at: new Date().toISOString() },
  };
  saveWhoNeedsChoices(next);
  return next;
}

/** Live pending → soft "just submitted" cards (dedupe by first name). */
function liveJustSubmittedCards(confirmedIds = loadConfirmedIds()) {
  const pending = getPendingSubmissions(confirmedIds);
  const live = pending.filter((s) => s.source === "live");
  // Prefer live; fall back to newest demo pending if no live
  const pool = live.length
    ? live
    : pending.filter((s) => s.source !== "live").slice(0, 1);

  return pool.slice(0, 2).map((s) => ({
    id: `wnm-live-${s.id}`,
    studentFirst: s.studentFirst,
    subject: s.subject,
    standard: s.standard,
    assignment: s.assignment,
    reason: "just_submitted",
    tone: "ready",
    blurb: `Just submitted ${s.assignment} — ready when you are.`,
    nextHint: "Open grading when you want to confirm.",
    source: s.source === "live" ? "live" : "inbox",
    gradingId: s.id,
  }));
}

/**
 * Build active Who-needs-me list (max 3).
 * Live/inbox "just submitted" replaces the demo Maya card when present.
 * Choices (dismiss / small group / reteach) remove kids from the list.
 */
export function getWhoNeedsMeCards(choices = loadWhoNeedsChoices(), confirmedIds = loadConfirmedIds()) {
  void loadLiveInbox(); // ensure callers that depend on inbox still re-read
  const acted = new Set(Object.keys(choices || {}));
  const liveCards = liveJustSubmittedCards(confirmedIds).filter((c) => !acted.has(c.id));

  const demo = DEMO_WHO_NEEDS_ME.filter((c) => {
    if (acted.has(c.id)) return false;
    // Drop demo "just submitted" when we already have a live/inbox submit card
    if (c.reason === "just_submitted" && liveCards.length > 0) return false;
    return true;
  });

  // Prefer needs_you first, then ready — keep calm priority
  const merged = [...demo, ...liveCards];
  const needsYou = merged.filter((c) => c.tone === "needs_you");
  const ready = merged.filter((c) => c.tone !== "needs_you");
  return [...needsYou, ...ready].slice(0, WHO_NEEDS_ME_MAX);
}

export function getWhoNeedsMeCount(choices = loadWhoNeedsChoices(), confirmedIds = loadConfirmedIds()) {
  return getWhoNeedsMeCards(choices, confirmedIds).length;
}

/** Calm SAM glance line for Daily Focus / This Week. */
export function whoNeedsGlanceText(count) {
  if (!count) return null;
  if (count === 1) return "1 kid could use a quick look — ready when you are.";
  return `${count} kids could use a quick look — ready when you are.`;
}
