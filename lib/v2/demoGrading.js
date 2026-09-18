// CI2.0 grading inbox — demo submissions + same-browser live student submits.
// Teacher always confirms; SAM suggests a first read.
// Live bridge: student Submit → localStorage ci2.grading.inbox → teacher Grading.
// Same-browser only — no auth, Supabase, or AI scoring API.

import { SUBJECTS } from "./demoWeek";


export const GRADING_STORAGE_KEY = "ci2.grading.confirmedIds";
/** Live student submits (same browser). Shape: GradingSubmission[] */
export const GRADING_INBOX_KEY = "ci2.grading.inbox";
export const GRADING_INBOX_HREF = "/v2/teacher/grading";

/** Same-browser teacher-checked stamps on student My Day missions. */
export const TEACHER_CHECKED_KEY = "ci2.student.teacherChecked";

function notifyTeacherCheckedUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-teacher-checked-updated"));
  } catch {
    /* ignore */
  }
}

export function loadTeacherCheckedIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TEACHER_CHECKED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveTeacherCheckedIds(ids) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      TEACHER_CHECKED_KEY,
      JSON.stringify([...new Set(ids)].slice(0, 40))
    );
    notifyTeacherCheckedUpdated();
  } catch {
    /* ignore quota */
  }
}

/**
 * Resolve My Day mission ids from a grading submission.
 * Live rows carry missionId; demo rows may match by title heuristics.
 */
export function resolveMissionIdsForStamp(item) {
  if (!item) return [];
  const ids = [];
  if (typeof item.missionId === "string" && item.missionId) {
    ids.push(item.missionId);
  }
  if (typeof item.id === "string" && item.id.startsWith("live-")) {
    const rest = item.id.slice("live-".length);
    if (rest && !ids.includes(rest)) ids.push(rest);
  }
  const title = String(item.assignment || item.title || "").toLowerCase();
  if (/pizza/.test(title) && !ids.includes("stu-next-pizza")) ids.push("stu-next-pizza");
  if (/(equiv|equivalent|fraction strip)/.test(title) && !ids.includes("stu-now-equiv")) {
    ids.push("stu-now-equiv");
  }
  if (/purpose/.test(title) && !ids.includes("stu-later-purpose")) ids.push("stu-later-purpose");
  return ids;
}

/** Mark mission/practice cards on student My Day as teacher-checked (calm stamp). */
export function stampTeacherCheckedFromSubmission(item) {
  const missionIds = resolveMissionIdsForStamp(item);
  if (!missionIds.length) return [];
  const prev = loadTeacherCheckedIds();
  const next = [...prev];
  for (const id of missionIds) {
    if (!next.includes(id)) next.unshift(id);
  }
  saveTeacherCheckedIds(next);
  return missionIds;
}

export function isTeacherChecked(missionId, checkedIds = null) {
  if (!missionId) return false;
  const ids = checkedIds || loadTeacherCheckedIds();
  return ids.includes(missionId);
}


/** @typedef {"ClearSheets"|"ClearCenters"|"CrystalQuest"|"CrystalChecks"|"ClearLessons"} ProductKind */

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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
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
    source: "demo",
  },
];

/** Fixed "now" for demo relative times only. */
export const DEMO_GRADING_NOW = new Date("2025-10-08T15:00:00");

export function subjectMeta(key) {
  return SUBJECTS[key] || { key, name: key, color: "#8B6CFF" };
}

export function productLabel(product) {
  const map = {
    ClearLessons: "Lesson",
    ClearSheets: "Sheet",
    ClearCenters: "Center",
    CrystalQuest: "Quest",
    CrystalChecks: "Check",
  };
  return map[product] || product;
}

function notifyGradingUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-grading-updated"));
  } catch {
    /* ignore */
  }
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
    notifyGradingUpdated();
  } catch {
    /* ignore quota */
  }
}

/** Normalize one live inbox row; drop junk. */
function normalizeLiveItem(raw) {
  if (!raw || typeof raw !== "object") return null;
  if (typeof raw.id !== "string" || !raw.id) return null;
  return {
    id: raw.id,
    studentFirst: typeof raw.studentFirst === "string" ? raw.studentFirst : "Leo",
    assignment: typeof raw.assignment === "string" ? raw.assignment : "Submitted work",
    product: raw.product || "ClearCenters",
    subject: raw.subject || "math",
    standard: raw.standard || null,
    submittedAt: typeof raw.submittedAt === "string" ? raw.submittedAt : new Date().toISOString(),
    workSnippet:
      typeof raw.workSnippet === "string" && raw.workSnippet.trim()
        ? raw.workSnippet
        : "(No response text)",
    samScore: typeof raw.samScore === "number" ? raw.samScore : 3,
    samReason:
      typeof raw.samReason === "string"
        ? raw.samReason
        : "First read stub — confirm when you've looked.",
    maxScore: typeof raw.maxScore === "number" ? raw.maxScore : 4,
    source: "live",
    missionId: typeof raw.missionId === "string" ? raw.missionId : null,
  };
}

/** Live submits from student activity (same browser). Newest first. */
export function loadLiveInbox() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GRADING_INBOX_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeLiveItem).filter(Boolean);
  } catch {
    return [];
  }
}

export function saveLiveInbox(items) {
  if (typeof window === "undefined") return;
  try {
    const clean = (Array.isArray(items) ? items : [])
      .map(normalizeLiveItem)
      .filter(Boolean);
    window.localStorage.setItem(GRADING_INBOX_KEY, JSON.stringify(clean));
    notifyGradingUpdated();
  } catch {
    /* ignore quota */
  }
}

/**
 * Build a short work snippet from activity answers (stub text for teacher inbox).
 */
export function buildWorkSnippetFromAnswers(items, answers) {
  if (!Array.isArray(items) || !items.length) return "(Submitted — no items)";
  const lines = items.map((it, idx) => {
    const raw = answers?.[it.id];
    let shown = "";
    if (it.kind === "mc") {
      const choice = (it.choices || []).find((c) => c.id === raw);
      shown = choice?.label || String(raw || "—");
    } else {
      shown = String(raw || "").trim() || "—";
    }
    const prompt = (it.prompt || `Item ${idx + 1}`).slice(0, 80);
    return `${idx + 1}. ${prompt} → ${shown}`;
  });
  return lines.join("\n");
}

/**
 * Student Submit → teacher grading inbox (upsert by mission id).
 * Same-browser localStorage only.
 */
export function enqueueStudentSubmission({
  missionId,
  title,
  subject,
  product,
  workSnippet,
  samScore = 3,
  samReason = "First read stub — confirm when you've looked.",
  maxScore = 4,
  studentFirst = "Leo",
  standard = null,
} = {}) {
  if (typeof window === "undefined" || !missionId) return null;
  const item = normalizeLiveItem({
    id: `live-${missionId}`,
    missionId,
    studentFirst,
    assignment: title || "Submitted work",
    product,
    subject,
    standard,
    submittedAt: new Date().toISOString(),
    workSnippet,
    samScore,
    samReason,
    maxScore,
    source: "live",
  });
  const rest = loadLiveInbox().filter((x) => x.id !== item.id);
  saveLiveInbox([item, ...rest]);
  return item;
}

/** Demo + live submissions (live first). */
export function getAllSubmissions() {
  const live = loadLiveInbox();
  const demo = DEMO_GRADING_SUBMISSIONS.map((s) => ({ ...s, source: s.source || "demo" }));
  return [...live, ...demo];
}

/**
 * Pending = not yet confirmed. Live submits stay at top (newest first);
 * demo rows follow via sortSubmissions.
 */
export function getPendingSubmissions(confirmedIds = loadConfirmedIds(), sortMode = "oldest") {
  const done = new Set(confirmedIds);
  const all = getAllSubmissions().filter((s) => !done.has(s.id));
  const live = all
    .filter((s) => s.source === "live")
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  const demo = sortSubmissions(
    all.filter((s) => s.source !== "live"),
    sortMode
  );
  return [...live, ...demo];
}

export function getPendingCount(confirmedIds = loadConfirmedIds()) {
  return getPendingSubmissions(confirmedIds).length;
}

export function getDemoGradingTotal() {
  return DEMO_GRADING_SUBMISSIONS.length;
}

export function formatSubmittedAgo(iso, now = DEMO_GRADING_NOW) {
  const t = new Date(iso).getTime();
  const n = now instanceof Date ? now.getTime() : new Date(now).getTime();
  const mins = Math.max(0, Math.round((n - t) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 36) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

/** Relative time: live uses wall clock; demo uses fixed demo "now". */
export function formatSubmissionAgo(item) {
  if (!item) return "";
  const now = item.source === "live" ? new Date() : DEMO_GRADING_NOW;
  return formatSubmittedAgo(item.submittedAt, now);
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
