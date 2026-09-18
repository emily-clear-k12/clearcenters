// CI2.0 · Library browse stub — glance-first cards, not a catalog rebuild.
// Add to Daily Focus / This Week writes ci2.teacher.addedActivities (same browser).

import { ADDED_ACTIVITIES_KEY } from "./demoStudentDay";
import { FOCUS_TODAY_DAY } from "./demoWhoNeedsMe";
import { hasStandardStub, STANDARDS_HREF } from "./demoStandardsUnit";

export const LIBRARY_HREF = "/v2/teacher/library";

/**
 * Demo library cards — Briefing / Challenge / Practice / Project flavors.
 * Glance-first: title, product chip, minutes, TEKS/standard chip, one-line why.
 * standard: TEKS code when known; link to Standard info stub when hasStandardStub.
 */
export const DEMO_LIBRARY_CARDS = [
  {
    id: "lib-briefing-fractions",
    flavor: "Briefing",
    title: "Warm-up · Equivalent fractions glance",
    subject: "math",
    product: "ClearLessons",
    kind: "teach",
    minutes: 8,
    standard: "4.3C",
    blurb: "Two models side by side — kids name what stays the same.",
    glance: "ready",
  },
  {
    id: "lib-challenge-pizza",
    flavor: "Challenge",
    title: "Challenge · The Pizza Problem",
    subject: "math",
    product: "ClearCenters",
    kind: "work",
    minutes: 25,
    standard: "4.3D",
    blurb: "Prove + Push with a shareable pizza model.",
    glance: "needsYou",
  },
  {
    id: "lib-practice-number-line",
    flavor: "Practice",
    title: "Practice · Fractions on a number line",
    subject: "math",
    product: "ClearSheets",
    kind: "work",
    minutes: 12,
    standard: "4.3G",
    blurb: "Short reps — mark, compare, explain in one sentence.",
    glance: "ready",
  },
  {
    id: "lib-project-garden",
    flavor: "Project",
    title: "Project · Garden story evidence",
    subject: "elar",
    product: "ClearCenters",
    kind: "work",
    minutes: 30,
    standard: "4.6C",
    blurb: "Checkpoint chips + one evidence product for the week.",
    glance: "needsYou",
  },
  {
    id: "lib-briefing-purpose",
    flavor: "Briefing",
    title: "Briefing · Author purpose in 5 minutes",
    subject: "elar",
    product: "ClearLessons",
    kind: "teach",
    minutes: 5,
    standard: "4.9A",
    blurb: "Persuade / inform / entertain — three calm examples.",
    glance: "ready",
  },
  {
    id: "lib-practice-density",
    flavor: "Practice",
    title: "Practice · Density lab notes",
    subject: "science",
    product: "ClearSheets",
    kind: "work",
    minutes: 15,
    // Non-stub code → plain chip (no Standard info link)
    standard: "5.5A",
    blurb: "Float / sink claims with one density sentence.",
    glance: "ready",
  },
];

/** Chip label + optional Standard info href when stub exists. */
export function libraryStandardChip(card) {
  const code = String(card?.standard || "").trim();
  if (!code) return null;
  const linked = hasStandardStub(code);
  return {
    code,
    label: code.startsWith("TEKS") ? code : `TEKS ${code}`,
    href: linked ? STANDARDS_HREF({ code }) : null,
    linked,
  };
}

function notifyAddedUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-added-activities-updated"));
  } catch {
    /* ignore */
  }
}

export function loadAddedActivities() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ADDED_ACTIVITIES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((a) => a && a.id) : [];
  } catch {
    return [];
  }
}

export function saveAddedActivities(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      ADDED_ACTIVITIES_KEY,
      JSON.stringify(Array.isArray(list) ? list.slice(0, 40) : [])
    );
    notifyAddedUpdated();
  } catch {
    /* ignore quota */
  }
}


/**
 * Quiet provenance for minted planner tiles (glance chip, not a loud badge).
 * Library / Check-ins / Sunday / live-teach flags + id prefixes.
 */
export function plannerProvenanceLabel(act) {
  if (!act) return null;
  const id = String(act.id || "");
  if (act.fromCheckIns || id.startsWith("added-checkin-")) return "From Check-ins";
  if (act.fromLibrary || id.startsWith("added-lib-")) return "From Library";
  if (act.fromSunday || id.startsWith("added-sunday-")) return "From Sunday";
  if (act.fromLiveTeach || id.startsWith("added-live-")) return "From live teach";
  return null;
}

/** One-time dismissible helper: “Tiles remember where they came from.” */
export const PROVENANCE_HELPER_KEY = "ci2.provenance.helperDismissed";
export const PROVENANCE_HELPER_TEXT = "Tiles remember where they came from.";

export function anyMintedProvenance(activities) {
  return (activities || []).some((a) => !!plannerProvenanceLabel(a));
}

export function isProvenanceHelperDismissed() {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(PROVENANCE_HELPER_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissProvenanceHelper() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROVENANCE_HELPER_KEY, "1");
  } catch {
    /* ignore */
  }
}

/** Remove a minted planner tile by id (Undo Add to This Week / Daily Focus). */
export function removeAddedActivity(id) {
  if (typeof window === "undefined" || !id) return false;
  const prev = loadAddedActivities();
  const next = prev.filter((a) => a && a.id !== id);
  if (next.length === prev.length) return false;
  saveAddedActivities(next);
  return true;
}

/**
 * Add a library card onto Daily Focus (today) or This Week (planner extras).
 * target: "daily_focus" | "this_week"
 * Writes the same shape usePlanner persistAdded expects (added-* id).
 */
export function addLibraryCardToPlanner(card, target = "daily_focus") {
  if (typeof window === "undefined" || !card) return null;
  const day = target === "this_week" ? FOCUS_TODAY_DAY : FOCUS_TODAY_DAY;
  const entry = {
    id: `added-lib-${card.id}-${Date.now().toString(36)}`,
    subject: card.subject || "math",
    day,
    kind: card.kind || "work",
    title: card.title,
    product: card.product || "ClearLessons",
    minutes: card.minutes || 10,
    who: "Everyone",
    classes: "all",
    standard: card.standard || "",
    isNew: true,
    fromLibrary: true,
    libraryId: card.id,
    libraryTarget: target,
  };
  const prev = loadAddedActivities().filter((a) => a.id !== entry.id);
  saveAddedActivities([entry, ...prev]);
  return entry;
}