// CI2.0 grading inbox — demo submissions only (no AI API / Supabase).
// Teacher always confirms; SAM suggests a first read.

import { SUBJECTS } from "./demoWeek";

export const GRADING_STORAGE_KEY = "ci2.grading.confirmedIds";
export const GRADING_INBOX_HREF = "/v2/teacher/grading";

/** @typedef {"ClearSheets"|"ClearCenters"|"CrystalQuest"|"CrystalChecks"} ProductKind */

/**
 * Demo mix: ClearSheet, Center, Quest, Check.
 * submittedAt is ISO-ish relative to a fixed demo "now" (Wed Oct 8, 2025 ~3pm).
 */
export const DEMO_GRADING_SUBMISSIONS = [
  {
    id: "g-01",
    studentFirst: "Maya",
    assignment: "Fraction strips",
    product: "ClearSheets",
    subject: "math",
    standard: "4.3G",
    submittedAt: "2025-10-07T14:12:00",
    workSnippet:
      "I lined up 1/2 and 2/4 on the strip. They match at the same place, so they are equivalent.",
    samScore: 3,
    samReason: "Clear equivalence language; strip model matches the claim.",
    maxScore: 4,
  },
  {
    id: "g-02",
    studentFirst: "Jordan",
    assignment: "Analyze: The Pizza Problem",
    product: "ClearCenters",
    subject: "math",
    standard: "4.3C",
    submittedAt: "2025-10-08T09:40:00",
    workSnippet:
      "Prove: 3/6 = 1/2 because both show half the pizza. Push: 4/8 is also half.",
    samScore: 4,
    samReason: "Prove and Push both land; student names the half relationship.",
    maxScore: 4,
  },
  {
    id: "g-03",
    studentFirst: "Ava",
    assignment: "Author's purpose sort",
    product: "ClearSheets",
    subject: "elar",
    standard: "4.9A",
    submittedAt: "2025-10-06T16:05:00",
    workSnippet:
      "The ad wants me to buy the sneakers — persuade. The how-to is inform. The joke book is entertain.",
    samScore: 4,
    samReason: "All three purposes tagged with a short why.",
    maxScore: 4,
  },
  {
    id: "g-04",
    studentFirst: "Leo",
    assignment: "Read & Respond: The Great Garden",
    product: "ClearCenters",
    subject: "elar",
    standard: "4.10A",
    submittedAt: "2025-10-07T11:22:00",
    workSnippet:
      "The narrator plants sunflowers because the garden felt empty. Evidence: 'bare dirt stared back.'",
    samScore: 3,
    samReason: "Solid claim + quote; could name the author's craft move more clearly.",
    maxScore: 4,
  },
  {
    id: "g-05",
    studentFirst: "Sofia",
    assignment: "Density lab write-up",
    product: "ClearSheets",
    subject: "science",
    standard: "5.6A",
    submittedAt: "2025-10-08T10:15:00",
    workSnippet:
      "The wood floated and the metal sank. Density is how packed the matter is — metal is packed tighter.",
    samScore: 3,
    samReason: "Observation + density idea present; units / mass-volume link missing.",
    maxScore: 4,
  },
  {
    id: "g-06",
    studentFirst: "Noah",
    assignment: "Matter stations",
    product: "ClearCenters",
    subject: "science",
    standard: "5.6A",
    submittedAt: "2025-10-07T15:48:00",
    workSnippet:
      "Practice: solids keep shape. Prove: water takes the cup's shape. Push: steam spreads out.",
    samScore: 4,
    samReason: "States of matter compared cleanly across Practice / Prove / Push.",
    maxScore: 4,
  },
  {
    id: "g-07",
    studentFirst: "Emma",
    assignment: "Texas regions map check",
    product: "CrystalQuest",
    subject: "social",
    standard: "4.7B",
    submittedAt: "2025-10-06T13:30:00",
    workSnippet:
      "Coastal plains are wetter and flatter. Mountains and Basins are drier. I matched each region to a climate clue.",
    samScore: 3,
    samReason: "Two regions contrasted well; one mismatch on Panhandle clues.",
    maxScore: 4,
  },
  {
    id: "g-08",
    studentFirst: "Kai",
    assignment: "Equivalent fractions practice",
    product: "CrystalQuest",
    subject: "math",
    standard: "4.3C",
    submittedAt: "2025-10-08T12:05:00",
    workSnippet: "Quest run: 9/12 correct. Missed 2/8 = ?/4 and a number-line jump.",
    samScore: 2,
    samReason: "Mostly there; two missed items show number-line gaps.",
    maxScore: 4,
  },
  {
    id: "g-09",
    studentFirst: "Zoe",
    assignment: "Reading quick check",
    product: "CrystalQuest",
    subject: "elar",
    standard: "4.9A",
    submittedAt: "2025-10-08T13:20:00",
    workSnippet: "Quick check 10/12. Mixed up entertain vs persuade on one ad.",
    samScore: 3,
    samReason: "Strong overall; one purpose mix-up on a borderline ad.",
    maxScore: 4,
  },
  {
    id: "g-10",
    studentFirst: "Diego",
    assignment: "Friday quick check",
    product: "CrystalQuest",
    subject: "math",
    standard: "4.3",
    submittedAt: "2025-10-08T14:02:00",
    workSnippet: "8/10 on Friday check. Tripped on comparing 5/6 and 7/8.",
    samScore: 3,
    samReason: "Benchmark comparison still shaky; other items solid.",
    maxScore: 4,
  },
  {
    id: "g-11",
    studentFirst: "Priya",
    assignment: "Unit check — Fractions",
    product: "CrystalChecks",
    subject: "math",
    standard: "4.3",
    submittedAt: "2025-10-07T16:40:00",
    workSnippet:
      "Constructed response: drew 3/4 and 6/8, wrote 'same amount, different pieces.'",
    samScore: 4,
    samReason: "Model + explanation align; ready to confirm as of record.",
    maxScore: 4,
  },
  {
    id: "g-12",
    studentFirst: "Owen",
    assignment: "Unit check — Author's Purpose",
    product: "CrystalChecks",
    subject: "elar",
    standard: "4.9A",
    submittedAt: "2025-10-08T11:55:00",
    workSnippet:
      "Short write: 'The flyer is persuade because it tells me to join the club and lists prizes.'",
    samScore: 3,
    samReason: "Purpose named with a reason; could cite one more text detail.",
    maxScore: 4,
  },
];

export function subjectMeta(key) {
  return SUBJECTS[key] || { key, name: key, color: "#8B6CFF" };
}

export function productLabel(product) {
  const map = {
    ClearSheets: "Sheet",
    ClearCenters: "Center",
    CrystalQuest: "Quest",
    CrystalChecks: "Check",
  };
  return map[product] || product;
}

export function loadConfirmedIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GRADING_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveConfirmedIds(ids) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(GRADING_STORAGE_KEY, JSON.stringify([...new Set(ids)]));
    window.dispatchEvent(new CustomEvent("ci2-grading-updated"));
  } catch {
    /* ignore quota */
  }
}

export function getPendingSubmissions(confirmedIds = loadConfirmedIds()) {
  const done = new Set(confirmedIds);
  return DEMO_GRADING_SUBMISSIONS.filter((s) => !done.has(s.id));
}

export function getPendingCount(confirmedIds = loadConfirmedIds()) {
  return getPendingSubmissions(confirmedIds).length;
}

export function getDemoGradingTotal() {
  return DEMO_GRADING_SUBMISSIONS.length;
}

export function formatSubmittedAgo(iso, now = new Date("2025-10-08T15:00:00")) {
  const t = new Date(iso).getTime();
  const mins = Math.max(0, Math.round((now.getTime() - t) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 36) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function sortSubmissions(list, mode) {
  const copy = [...list];
  if (mode === "standard") {
    copy.sort((a, b) => {
      const sa = a.standard || "zzz";
      const sb = b.standard || "zzz";
      if (sa !== sb) return sa.localeCompare(sb);
      return new Date(a.submittedAt) - new Date(b.submittedAt);
    });
  } else {
    copy.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
  }
  return copy;
}