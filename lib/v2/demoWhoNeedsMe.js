// CI2.0 Check-ins (UI) â€” reteach / small-group stub. User path: /v2/teacher/check-ins
// Legacy /v2/teacher/who-needs-me redirects. localStorage keys unchanged.
// Calm 1â€“3 kid cards from demo + live grading inbox. Same-browser localStorage only.
// No standards analytics, AI grouping, or roster sync.
// periodId matches TEACHER_SETUPS class keys (A/B/C) so departmentalized room filter works.

import { ADDED_ACTIVITIES_KEY } from "./demoStudentDay";
import { TEACHER_SETUPS } from "./demoWeek";

import { rememberReteachFromReports } from "./demoLoopSeams";
import {
  getPendingSubmissions,
  loadConfirmedIds,
  loadLiveInbox,
} from "./demoGrading";

/** User-facing Check-ins path. */
export const CHECK_INS_HREF = "/v2/teacher/check-ins";
/** @deprecated Use CHECK_INS_HREF â€” same value; kept so callers keep working. */
export const WHO_NEEDS_ME_HREF = CHECK_INS_HREF;
/** Legacy URL â€” page redirects to CHECK_INS_HREF. */
export const WHO_NEEDS_ME_LEGACY_HREF = "/v2/teacher/who-needs-me";
export const WHO_NEEDS_ME_STORAGE_KEY = "ci2.whoNeedsMe.choices";
export const WHO_NEEDS_ME_MAX = 3;

/** Shared with Daily Focus / This Week / TeacherSubnav â€” selected period room. */
export const TEACHER_CLASS_FILTER_KEY = "ci2.teacher.classFilter";
export const TEACHER_SETUP_KEY = "ci2.teacher.setupKey";

/**
 * Resolve current period lens the same way Daily Focus / Check-ins do.
 * "all" â†’ first class in current setup (RoomCards never leave an unscoped lens).
 */
export function readSelectedClassFilter() {
  if (typeof window === "undefined") return "A";
  try {
    const raw = window.localStorage.getItem(TEACHER_CLASS_FILTER_KEY);
    if (raw && raw !== "all") return raw;
    const setupKey = window.localStorage.getItem(TEACHER_SETUP_KEY) || "self";
    const setup = TEACHER_SETUPS[setupKey] || TEACHER_SETUPS.self;
    return setup?.classes?.[0]?.key || "A";
  } catch {
    return "A";
  }
}



/** Daily Focus blocks pulled from Check-ins (same browser). */
export const FOCUS_BLOCKS_KEY = "ci2.checkins.focusBlocks";

/** Demo "today" day index â€” matches Daily Focus default d=2 (Wed). */
export const FOCUS_TODAY_DAY = 2;

/** Demo "tomorrow" day index â€” Reteach tomorrow lands here (Thu). */
export const FOCUS_TOMORROW_DAY = Math.min(4, FOCUS_TODAY_DAY + 1);

/** @typedef {"needs_you"|"ready"} NeedTone */
/** @typedef {"low_clearance"|"not_started"|"just_submitted"|"watch"} NeedReason */
/** @typedef {"small_group"|"reteach_tomorrow"|"dismiss"} NeedAction */

/**
 * Demo seed kids. Light reasons only â€” not a spreadsheet.
 * Ids are stable so dismiss / action choices persist.
 * periodId = class key (A/B/C) for RoomCards / classFilter sync with Daily Focus.
 */
export const DEMO_WHO_NEEDS_ME = [
  // Softest Reports cluster (5.6B) â€” same who as class story, period A default.
  {
    id: "wnm-sofia",
    studentFirst: "Sofia",
    subject: "science",
    standard: "5.6B",
    assignment: "Mixtures exit ticket",
    reason: "low_clearance",
    tone: "needs_you",
    blurb: "Needs a look â€” claim without an evidence note; mixture/solution still swapped.",
    nextHint: "Small group with Noah Â· Diego: claim + one evidence note.",
    source: "demo",
    periodId: "A",
  },
  {
    id: "wnm-noah",
    studentFirst: "Noah",
    subject: "science",
    standard: "5.6B",
    assignment: "Mixtures exit ticket",
    reason: "low_clearance",
    tone: "needs_you",
    blurb: "Needs a look â€” wrote a sort, skipped the evidence sentence.",
    nextHint: "Pull with Sofia Â· Diego on claim + one evidence note.",
    source: "demo",
    periodId: "A",
  },
  {
    id: "wnm-diego",
    studentFirst: "Diego",
    subject: "science",
    standard: "5.6B",
    assignment: "Mixtures exit ticket",
    reason: "low_clearance",
    tone: "needs_you",
    blurb: "Needs a look â€” terms mixed; evidence line empty.",
    nextHint: "Same soft cluster as Reports â€” short Check-in, then Daily Focus reteach.",
    source: "demo",
    periodId: "A",
  },
  // Secondary Reports soft (4.3D) â€” other periods; same cast language.
  {
    id: "wnm-kai",
    studentFirst: "Kai",
    subject: "math",
    standard: "4.3D",
    assignment: "Compare fractions mini-task",
    reason: "low_clearance",
    tone: "needs_you",
    blurb: "Mixed â€” reasons thin when models donâ€™t match.",
    nextHint: "Pair share with matching models; soft radar with Riley.",
    source: "demo",
    periodId: "B",
  },
  {
    id: "wnm-riley",
    studentFirst: "Riley",
    subject: "math",
    standard: "4.3D",
    assignment: "Compare fractions mini-task",
    reason: "not_started",
    tone: "needs_you",
    blurb: "Hasnâ€™t started todayâ€™s compare task yet.",
    nextHint: "Gentle nudge, or pull into the group with Kai.",
    source: "demo",
    periodId: "B",
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

/** Resolve period key from a live/inbox submission, else inherit selected room. */
function resolvePeriodId(submission, inheritPeriodId) {
  const fromRow =
    (typeof submission?.periodId === "string" && submission.periodId) ||
    (typeof submission?.classKey === "string" && submission.classKey) ||
    null;
  if (fromRow) return fromRow;
  if (inheritPeriodId && inheritPeriodId !== "all") return inheritPeriodId;
  return "A";
}

/** True when card belongs in the current period lens. */
export function periodMatches(card, classFilter) {
  if (!classFilter || classFilter === "all") return true;
  const pid = card?.periodId;
  if (!pid || pid === "all") return true;
  return pid === classFilter;
}

/** Live pending â†’ soft "just submitted" cards (dedupe by first name). */
function liveJustSubmittedCards(confirmedIds = loadConfirmedIds(), inheritPeriodId = "A") {
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
    blurb: `Just submitted ${s.assignment} â€” ready when you are.`,
    nextHint: "Open grading when you want to confirm.",
    source: s.source === "live" ? "live" : "inbox",
    gradingId: s.id,
    periodId: resolvePeriodId(s, inheritPeriodId),
  }));
}

/**
 * Build active Who-needs-me list (optionally unscoped / uncapped for room badges).
 * Live/inbox "just submitted" replaces the demo Maya card when present.
 * Choices (dismiss / small group / reteach) remove kids from the list.
 *
 * @param {object} [choices]
 * @param {string[]} [confirmedIds]
 * @param {{ classFilter?: string, inheritPeriodId?: string, limit?: number|null }} [opts]
 *   classFilter â€” TEACHER_SETUPS class key (A/B/C) or "all"; filters kid cards.
 *   inheritPeriodId â€” stamp live rows without period onto this room (defaults to classFilter).
 *   limit â€” max cards (default WHO_NEEDS_ME_MAX); null = no cap (for needsByClass counts).
 */
export function getWhoNeedsMeCards(
  choices = loadWhoNeedsChoices(),
  confirmedIds = loadConfirmedIds(),
  opts = {}
) {
  void loadLiveInbox(); // ensure callers that depend on inbox still re-read
  const classFilter = opts.classFilter;
  const inheritPeriodId =
    opts.inheritPeriodId ||
    (classFilter && classFilter !== "all" ? classFilter : "A");
  const limit = opts.limit === null ? null : opts.limit ?? WHO_NEEDS_ME_MAX;

  const acted = new Set(Object.keys(choices || {}));
  const liveCards = liveJustSubmittedCards(confirmedIds, inheritPeriodId).filter(
    (c) => !acted.has(c.id)
  );

  const demo = DEMO_WHO_NEEDS_ME.filter((c) => {
    if (acted.has(c.id)) return false;
    // Drop demo "just submitted" when we already have a live/inbox submit card
    if (c.reason === "just_submitted" && liveCards.length > 0) return false;
    return true;
  });

  // Prefer needs_you first, then ready â€” keep calm priority
  const merged = [...demo, ...liveCards];
  const needsYou = merged.filter((c) => c.tone === "needs_you");
  const ready = merged.filter((c) => c.tone !== "needs_you");
  const ordered = [...needsYou, ...ready].filter((c) => periodMatches(c, classFilter));
  return limit == null ? ordered : ordered.slice(0, limit);
}

export function getWhoNeedsMeCount(
  choices = loadWhoNeedsChoices(),
  confirmedIds = loadConfirmedIds(),
  opts = {}
) {
  return getWhoNeedsMeCards(choices, confirmedIds, opts).length;
}

/**
 * Per-period counts for RoomCards "needs you" badges (assistant lens).
 * Uncapped; ignores current classFilter so each room shows its own total.
 */
export function getWhoNeedsCountsByClass(
  classKeys = [],
  choices = loadWhoNeedsChoices(),
  confirmedIds = loadConfirmedIds()
) {
  const map = {};
  for (const k of classKeys) map[k] = 0;
  const cards = getWhoNeedsMeCards(choices, confirmedIds, {
    classFilter: "all",
    limit: null,
  });
  for (const c of cards) {
    const pid = c.periodId && c.periodId !== "all" ? c.periodId : null;
    if (pid && map[pid] != null) map[pid] += 1;
    else if (!pid) {
      // Untagged â†’ count toward every room lightly? Prefer first key only.
      const first = classKeys[0];
      if (first && map[first] != null) map[first] += 1;
    }
  }
  return map;
}


/**
 * Focus blocks pulled from Check-ins onto Daily Focus.
 * Shape: { id, day, periodId, kind, title, studentNames[], subject, standard, assignment, fromCardIds[], at }
 * kind: "small_group" | "reteach"
 */
export function loadFocusBlocks() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FOCUS_BLOCKS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((b) => b && b.id) : [];
  } catch {
    return [];
  }
}

export function saveFocusBlocks(blocks) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      FOCUS_BLOCKS_KEY,
      JSON.stringify(Array.isArray(blocks) ? blocks.slice(0, 12) : [])
    );
    notifyWhoNeedsUpdated();
    try {
      window.dispatchEvent(new CustomEvent("ci2-focus-blocks-updated"));
    } catch {
      /* ignore */
    }
  } catch {
    /* ignore quota */
  }
}

function focusBlockTitle(kind, subject, assignment) {
  if (kind === "reteach") {
    return assignment ? `Reteach Â· ${assignment}` : "Reteach tomorrow (stub)";
  }
  return assignment ? `Small group Â· ${assignment}` : "Small group pull";
}

/**
 * Pull a Check-ins card onto Daily Focus: small group â†’ today; reteach â†’ tomorrow.
 * Merges kid names when same day + period + kind. Period filter uses periodId.
 */
export function pushCheckInToDailyFocus(card, action, opts = {}) {
  if (!card || !action) return null;
  if (action !== "small_group" && action !== "reteach_tomorrow") return null;

  const kind = action === "reteach_tomorrow" ? "reteach" : "small_group";
  // Small group â†’ today; Reteach tomorrow â†’ tomorrow (unless caller overrides day).
  const defaultDay = kind === "reteach" ? FOCUS_TOMORROW_DAY : FOCUS_TODAY_DAY;
  const day = opts.day != null ? Number(opts.day) : defaultDay;
  const periodId = card.periodId || opts.periodId || "A";
  const name = card.studentFirst || "Student";
  const existing = loadFocusBlocks();

  // Merge into same day+period+kind block when present
  const hitIdx = existing.findIndex(
    (b) =>
      Number(b.day) === day &&
      b.periodId === periodId &&
      b.kind === kind
  );

  let block;
  if (hitIdx >= 0) {
    const prev = existing[hitIdx];
    const names = Array.isArray(prev.studentNames) ? [...prev.studentNames] : [];
    if (!names.includes(name)) names.push(name);
    const fromIds = Array.isArray(prev.fromCardIds) ? [...prev.fromCardIds] : [];
    if (card.id && !fromIds.includes(card.id)) fromIds.push(card.id);
    block = {
      ...prev,
      studentNames: names,
      fromCardIds: fromIds,
      title: focusBlockTitle(kind, card.subject, card.assignment || prev.assignment),
      assignment: card.assignment || prev.assignment,
      subject: card.subject || prev.subject,
      standard: card.standard || prev.standard,
      at: new Date().toISOString(),
    };
    const next = [...existing];
    next[hitIdx] = block;
    saveFocusBlocks(next);
  } else {
    block = {
      id: `focus-${kind}-${periodId}-d${day}-${Date.now().toString(36)}`,
      day,
      periodId,
      kind,
      title: focusBlockTitle(kind, card.subject, card.assignment),
      studentNames: [name],
      subject: card.subject || "math",
      standard: card.standard || "",
      assignment: card.assignment || "",
      fromCardIds: card.id ? [card.id] : [],
      at: new Date().toISOString(),
    };
    saveFocusBlocks([block, ...existing]);
  }
  return block;
}

/**
 * Blocks for a Daily Focus day, optionally filtered by period (classFilter).
 */
export function readFocusBlocksForDay(dayIndex = FOCUS_TODAY_DAY, classFilter = "all") {
  return loadFocusBlocks().filter((b) => {
    if (Number(b.day) !== Number(dayIndex)) return false;
    return periodMatches(b, classFilter);
  });
}

export function focusBlockKindLabel(kind) {
  if (kind === "reteach") return "Reteach";
  return "Small group";
}

export function focusBlockNamesLine(block) {
  const names = Array.isArray(block?.studentNames) ? block.studentNames.filter(Boolean) : [];
  if (!names.length) return "kids stub";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} Â· ${names[1]}`;
  return `${names.slice(0, -1).join(" Â· ")} Â· ${names[names.length - 1]}`;
}

/** Calm SAM glance line for Daily Focus / This Week. */
export function whoNeedsGlanceText(count) {
  if (!count) return null;
  if (count === 1) return "1 kid for a quick check-in â€” ready when you are.";
  return `${count} kids for a quick check-in â€” ready when you are.`;
}


/**
 * Deep link to Check-ins, optionally scoped to a period + student focus.
 * CheckInsClient honors ?period= (room sync) and ?student= (calm focus highlight).
 */
export function checkInsHrefForStudent(studentFirst, opts = null) {
  const params = new URLSearchParams();
  const period =
    opts && opts.periodId && String(opts.periodId) !== "all"
      ? String(opts.periodId).trim()
      : "";
  if (period) params.set("period", period);
  const standard =
    opts && opts.standard ? String(opts.standard).trim() : "";
  if (standard) params.set("standard", standard);
  const name = String(studentFirst || opts?.student || "").trim();
  if (name) params.set("student", name);
  const q = params.toString();
  return q ? `${CHECK_INS_HREF}?${q}` : CHECK_INS_HREF;
}

/**
 * Open Check-in / reteach already in motion for one kid.
 * Reuses Check-ins list, focusBlocks, and whoNeedsMe.choices â€” no new storage.
 * Returns null when nothing is open (quiet empty on the kid page).
 */
export function getKidCheckInMotion(studentFirst, confirmedIds = loadConfirmedIds()) {
  const name = String(studentFirst || "").trim().toLowerCase();
  if (!name) return null;

  const choices = loadWhoNeedsChoices();
  const openCards = getWhoNeedsMeCards(choices, confirmedIds, {
    classFilter: "all",
    limit: null,
  });
  const openCard = openCards.find(
    (c) => String(c.studentFirst || "").trim().toLowerCase() === name
  );
  if (openCard) {
    const needsYou = openCard.tone === "needs_you";
    return {
      status: "open",
      kind: needsYou ? "check_in" : "ready",
      label: needsYou ? "On Check-ins Â· needs you" : "On Check-ins Â· ready",
      samLine: openCard.blurb
        ? openCard.blurb
        : needsYou
          ? `${openCard.studentFirst} is waiting on Check-ins.`
          : `${openCard.studentFirst} is on Check-ins â€” calm look when ready.`,
      cardId: openCard.id,
      periodId: openCard.periodId || null,
      subject: openCard.subject || null,
      href: checkInsHrefForStudent(openCard.studentFirst, {
        periodId: openCard.periodId,
      }),
    };
  }

  // Already pulled onto Daily Focus (small group / reteach)
  const blocks = loadFocusBlocks().filter((b) => {
    const names = Array.isArray(b?.studentNames) ? b.studentNames : [];
    return names.some((n) => String(n || "").trim().toLowerCase() === name);
  });
  if (blocks.length) {
    const prefer =
      blocks.find((b) => b.kind === "reteach") ||
      blocks.find((b) => b.kind === "small_group") ||
      blocks[0];
    const isReteach = prefer.kind === "reteach";
    const display = String(studentFirst || "").trim() || "This kid";
    return {
      status: "in_motion",
      kind: prefer.kind || "small_group",
      label: isReteach ? "Reteach Â· in motion" : "Small group Â· in motion",
      samLine: isReteach
        ? `Reteach is lined up â€” ${display} is on the tomorrow block.`
        : `Small group is on Daily Focus for ${display}.`,
      cardId: Array.isArray(prefer.fromCardIds) ? prefer.fromCardIds[0] : null,
      periodId: prefer.periodId || null,
      subject: prefer.subject || null,
      href: checkInsHrefForStudent(display, { periodId: prefer.periodId }),
    };
  }

  // Choice recorded (pulled / reteach) even if focus block was cleared
  const roster = DEMO_WHO_NEEDS_ME.filter(
    (c) => String(c.studentFirst || "").trim().toLowerCase() === name
  );
  for (const card of roster) {
    const choice = choices[card.id];
    if (!choice) continue;
    if (choice.action !== "small_group" && choice.action !== "reteach_tomorrow") {
      continue;
    }
    const isReteach = choice.action === "reteach_tomorrow";
    return {
      status: "in_motion",
      kind: choice.action,
      label: isReteach ? "Reteach Â· in motion" : "Small group Â· in motion",
      samLine: isReteach
        ? `Reteach tomorrow already noted for ${card.studentFirst}.`
        : `Small group pull already noted for ${card.studentFirst}.`,
      cardId: card.id,
      periodId: card.periodId || null,
      subject: card.subject || null,
      href: checkInsHrefForStudent(card.studentFirst, { periodId: card.periodId }),
    };
  }

  return null;
}

/**
 * Mint a This Week planner tile from a Check-ins card (same key as Library / Sunday).
 * Period-aware when card.periodId is set. Does not remove the kid from Check-ins.
 */

/**
 * Put a standard's soft cluster onto Daily Focus today as an 8-min reteach block.
 * Reuses pushCheckInToDailyFocus â€” synthesizes cards from DEMO_WHO_NEEDS_ME (or opts.names).
 * Amber still only when live Check-ins waiting > 0; this does not shout Demo.
 */
export function pushStandardClusterToToday(standardCode, opts = {}) {
  const code = String(standardCode || "").trim();
  if (!code || typeof window === "undefined") return null;

  let cards = DEMO_WHO_NEEDS_ME.filter(
    (c) => String(c.standard || "").trim() === code
  );
  if (!cards.length && Array.isArray(opts.names) && opts.names.length) {
    cards = opts.names.filter(Boolean).map((name, i) => ({
      id: `wnm-synth-${String(name).toLowerCase()}-${code}`,
      studentFirst: name,
      subject: opts.subject || "science",
      standard: code,
      assignment: opts.assignment || `TEKS ${code} reteach`,
      periodId: opts.periodId || "A",
      source: "synth",
    }));
  }
  if (!cards.length) return null;

  let block = null;
  for (const card of cards) {
    block = pushCheckInToDailyFocus(card, "reteach_tomorrow", {
      day: FOCUS_TODAY_DAY,
      periodId: opts.periodId || card.periodId || "A",
    });
  }
  if (!block) return null;

  // Stamp 8-min reteach title onto the merged block (same store â€” no second system).
  const all = loadFocusBlocks();
  const idx = all.findIndex((b) => b && b.id === block.id);
  if (idx >= 0) {
    const names = Array.isArray(all[idx].studentNames) ? all[idx].studentNames : [];
    all[idx] = {
      ...all[idx],
      minutes: 8,
      title: `Reteach Â· ${code} Â· 8 min`,
      standard: code,
      fromReports: true,
      source: "reports",
      at: new Date().toISOString(),
    };
    saveFocusBlocks(all);
    block = all[idx];
    try {
      rememberReteachFromReports(code, { names });
    } catch {
      /* ignore */
    }
  }
  return block;
}

export function pushCheckInToThisWeek(card, opts = {}) {
  if (typeof window === "undefined" || !card) return null;
  const periodId = card.periodId || opts.periodId || null;
  const day = opts.day != null ? opts.day : FOCUS_TODAY_DAY;
  const entry = {
    id: `added-checkin-${card.id}-${Date.now().toString(36)}`,
    subject: card.subject || "math",
    day,
    kind: "work",
    title: `Check-ins Â· ${card.studentFirst} Â· ${card.assignment || "small group"}`,
    product: "ClearCenters",
    minutes: 15,
    who: card.studentFirst || "Small group",
    classes: periodId && periodId !== "all" ? [periodId] : "all",
    standard: card.standard || "",
    isNew: true,
    fromCheckIns: true,
    checkInCardId: card.id,
    checkInPeriodId: periodId || "all",
  };
  try {
    const raw = window.localStorage.getItem(ADDED_ACTIVITIES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const prev = Array.isArray(parsed) ? parsed.filter((a) => a && a.id) : [];
    const next = [entry, ...prev].slice(0, 40);
    window.localStorage.setItem(ADDED_ACTIVITIES_KEY, JSON.stringify(next));
    try {
      window.dispatchEvent(new CustomEvent("ci2-added-activities-updated"));
    } catch {
      /* ignore */
    }
  } catch {
    return null;
  }
  return entry;
}