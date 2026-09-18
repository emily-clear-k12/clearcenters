// CI2.0 · Library browse stub — glance-first cards, not a catalog rebuild.
// Add to Daily Focus / This Week writes ci2.teacher.addedActivities (same browser).

import { ADDED_ACTIVITIES_KEY } from "./demoStudentDay";
import { FOCUS_TODAY_DAY } from "./demoWhoNeedsMe";

export const LIBRARY_HREF = "/v2/teacher/library";

/**
 * Demo library cards — Briefing / Challenge / Practice / Project flavors.
 * Glance-first: title, product chip, minutes, one-line why.
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
    blurb: "Float / sink claims with one density sentence.",
    glance: "ready",
  },
];

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
    standard: "",
    isNew: true,
    fromLibrary: true,
    libraryId: card.id,
    libraryTarget: target,
  };
  const prev = loadAddedActivities().filter((a) => a.id !== entry.id);
  saveAddedActivities([entry, ...prev]);
  return entry;
}
