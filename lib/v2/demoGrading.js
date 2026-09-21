// CI2.0 grading inbox — demo submissions + same-browser live student submits.
// Teacher always confirms; SAM suggests a first read.
// Live bridge: student Submit → localStorage ci2.grading.inbox → teacher Grading.
// Same-browser only — no auth, Supabase, or AI scoring API.

import { SUBJECTS } from "./demoWeek";
import {
  DEMO_STUDENT_KIDS,
  getActiveDemoKidId,
  readStudentScopedRaw,
  writeStudentScopedRaw,
} from "./demoStudentDay";


export const GRADING_STORAGE_KEY = "ci2.grading.confirmedIds";
/** Live student submits (same browser). Shape: GradingSubmission[] */
export const GRADING_INBOX_KEY = "ci2.grading.inbox";
export const GRADING_INBOX_HREF = "/v2/teacher/grading";

/**
 * Deep link into grading inbox. Optional studentFirst focuses/filters that kid (query param).
 * Same-browser Check-ins → Grading bridge.
 */
export function gradingInboxHref(opts = null) {
  const base = GRADING_INBOX_HREF;
  const params = new URLSearchParams();
  const name = String(opts?.studentFirst || opts?.student || "").trim();
  if (name) params.set("student", name);
  const standard = String(opts?.standard || "").trim();
  if (standard) params.set("standard", standard);
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

/** Base key — teacher-checked stamps; scoped per demo kid. */
export const TEACHER_CHECKED_KEY = "ci2.student.teacherChecked";

/** Base key — celebrated Teacher checked ids; scoped per demo kid. */
export const TEACHER_CHECKED_CELEBRATED_KEY = "ci2.student.teacherCheckedCelebrated";

function notifyTeacherCheckedUpdated() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("ci2-teacher-checked-updated"));
  } catch {
    /* ignore */
  }
}

/**
 * Map grading studentFirst → demo kid id (Leo/Kai/Riley).
 * Unknown names fall back to active demo kid so Confirm still stamps My Day.
 */
export function resolveDemoKidIdForStamp(item) {
  const name = String(item?.studentFirst || item?.studentName || "").trim().toLowerCase();
  if (name) {
    const hit = DEMO_STUDENT_KIDS.find((k) => k.name.toLowerCase() === name);
    if (hit) return hit.id;
  }
  if (typeof item?.kidId === "string" && DEMO_STUDENT_KIDS.some((k) => k.id === item.kidId)) {
    return item.kidId;
  }
  return getActiveDemoKidId();
}

export function loadTeacherCheckedIds(kidId = null) {
  if (typeof window === "undefined") return [];
  try {
    const raw = readStudentScopedRaw(TEACHER_CHECKED_KEY, kidId);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function saveTeacherCheckedIds(ids, kidId = null) {
  if (typeof window === "undefined") return;
  try {
    writeStudentScopedRaw(
      TEACHER_CHECKED_KEY,
      JSON.stringify([...new Set(ids)].slice(0, 40)),
      kidId
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

/** Mark mission/practice cards on student My Day as teacher-checked (calm stamp).
 * Writes into the demo kid namespace matching studentFirst (Leo/Kai/Riley switcher). */
export function stampTeacherCheckedFromSubmission(item) {
  const missionIds = resolveMissionIdsForStamp(item);
  if (!missionIds.length) return [];
  const kidId = resolveDemoKidIdForStamp(item);
  const prev = loadTeacherCheckedIds(kidId);
  const next = [...prev];
  for (const id of missionIds) {
    if (!next.includes(id)) next.unshift(id);
  }
  saveTeacherCheckedIds(next, kidId);
  return missionIds;
}

export function isTeacherChecked(missionId, checkedIds = null) {
  if (!missionId) return false;
  const ids = checkedIds || loadTeacherCheckedIds();
  return ids.includes(missionId);
}

export function loadCelebratedTeacherCheckedIds(kidId = null) {
  if (typeof window === "undefined") return [];
  try {
    const raw = readStudentScopedRaw(TEACHER_CHECKED_CELEBRATED_KEY, kidId);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Remember which Teacher checked stamps SAM already celebrated (once). */
export function markTeacherCheckedCelebrated(ids, kidId = null) {
  if (typeof window === "undefined" || !ids?.length) return;
  try {
    const prev = loadCelebratedTeacherCheckedIds(kidId);
    const next = [...prev];
    for (const id of ids) {
      if (typeof id === "string" && !next.includes(id)) next.unshift(id);
    }
    writeStudentScopedRaw(
      TEACHER_CHECKED_CELEBRATED_KEY,
      JSON.stringify(next.slice(0, 40)),
      kidId
    );
  } catch {
    /* ignore quota */
  }
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
    id: "g-13",
    studentFirst: "Sofia",
    assignment: "Mixtures exit ticket",
    product: "ClearSheets",
    subject: "science",
    standard: "5.6B",
    submittedAt: "2025-10-08T09:20:00",
    workSnippet:
      "The salt water is a solution — salt disappears. Sand in water is a mixture — I can still see the sand. Evidence: sand settled at the bottom.",
    samScore: 3,
    samReason: "Claim + one evidence note lands; mixture vs solution still a touch soft.",
    maxScore: 4,
    source: "demo",
  },
  {
    id: "g-14",
    studentFirst: "Noah",
    assignment: "Mixtures exit ticket",
    product: "ClearSheets",
    subject: "science",
    standard: "5.6B",
    submittedAt: "2025-10-08T09:28:00",
    workSnippet:
      "Practice: trail mix is a mixture. Prove: sugar water looks clear — solution. Push: oil and water stay separate so mixture.",
    samScore: 3,
    samReason: "Three examples with reasons; ready to confirm as of record.",
    maxScore: 4,
    source: "demo",
  },
  {
    id: "g-15",
    studentFirst: "Diego",
    assignment: "Mixtures exit ticket",
    product: "ClearSheets",
    subject: "science",
    standard: "5.6B",
    submittedAt: "2025-10-08T09:35:00",
    workSnippet:
      "I stirred salt until it was gone — solution. Pepper stayed on top — mixture. One evidence note: pepper bits still visible.",
    samScore: 3,
    samReason: "Evidence note present; terms used correctly this time.",
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

/** First pending submission for a student first name (case-insensitive), or null. */
export function findPendingForStudent(studentFirst, confirmedIds = loadConfirmedIds()) {
  const name = String(studentFirst || "").trim().toLowerCase();
  if (!name) return null;
  return (
    getPendingSubmissions(confirmedIds).find(
      (s) => String(s.studentFirst || "").trim().toLowerCase() === name
    ) || null
  );
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

/**
 * Demo accommodations / supports — calm chip on kid grading.
 * Only a few kids have listed supports; others show nothing (quiet empty).
 * Not loud amber — informational only unless the teacher needs to act.
 */
export const DEMO_KID_SUPPORTS = {
  leo: {
    kind: "504",
    chip: "504 · extra time",
    detail: "Extra time on timed checks",
  },
  maya: {
    kind: "IEP",
    chip: "IEP · oral admin",
    detail: "Oral administration when asked",
  },
};

/** @returns {{kind:string,chip:string,detail:string}|null} */
export function getKidSupports(studentFirst) {
  const key = String(studentFirst || "").trim().toLowerCase();
  if (!key) return null;
  return DEMO_KID_SUPPORTS[key] || null;
}

/**
 * One calm whole-kid line from subject bands — Mrs. Barrons / SAM voice.
 * Goes above subject donuts; not a wall of text.
 */
export function buildWholeKidLine(studentFirst, subjects = []) {
  const name = String(studentFirst || "").trim() || "This kid";
  const list = Array.isArray(subjects) ? subjects : [];
  const struggling = list.filter((s) => s && s.needsYou);
  const strong = list.filter((s) => s && s.band === "strong");
  const needsCount = struggling.length;

  if (needsCount === 0) {
    if (strong.length >= 3) {
      return `Looking steady across subjects — ${name} is in a good place.`;
    }
    return `Mostly steady across subjects.`;
  }
  if (needsCount === 1) {
    return `Mostly steady — ${struggling[0].name} needs a short look.`;
  }
  if (needsCount === 2) {
    return `Two soft spots — start with ${struggling[0].name}, then ${struggling[1].name}.`;
  }
  return `A few subjects need a short look — begin with ${struggling[0].name}.`;
}

/** Prefer a struggling subject for family-note prefill (fractions / soft spot). */
export function pickStrugglingSubject(subjects = []) {
  const list = Array.isArray(subjects) ? subjects : [];
  const hit =
    list.find((s) => s && s.needsYou) ||
    list.find((s) => s && s.band === "ok" && s.struggle) ||
    list.find((s) => s && s.averagePct != null && s.averagePct < 85) ||
    list[0] ||
    null;
  return hit;
}

/** Kid-first grading view — one student → all subjects (donuts + More). */
export const KID_GRADING_BASE = "/v2/teacher/grading/kid";

/**
 * Deep link to kid-first multi-subject grading view.
 * @param {string|{studentFirst?:string,student?:string}} opts
 */
export function kidGradingHref(opts = null) {
  const name =
    typeof opts === "string"
      ? opts.trim()
      : String(opts?.studentFirst || opts?.student || "").trim();
  if (!name) return GRADING_INBOX_HREF;
  return `${KID_GRADING_BASE}/${encodeURIComponent(name)}`;
}

/** Subject order for Mrs. Barrons self-contained (and demo kid view). */
export const KID_SUBJECT_ORDER = ["math", "elar", "science", "social"];

/**
 * Extra gradebook rows so each demo kid has multi-subject depth
 * (inbox stays lean; kid view shows the full picture).
 */
export const DEMO_KID_GRADEBOOK = [
  // —— Leo (ELAR inbox + fill other subjects)
  {
    id: "kb-leo-math-1",
    studentFirst: "Leo",
    subject: "math",
    assignment: "Equivalent fractions warm-up",
    product: "ClearSheets",
    standard: "4.3C",
    score: 3,
    maxScore: 4,
    note: "Solid strip models; one number-line miss.",
    submittedAt: "2025-10-06T10:00:00",
  },
  {
    id: "kb-leo-math-2",
    studentFirst: "Leo",
    subject: "math",
    assignment: "Friday quick check · fractions",
    product: "CrystalQuest",
    standard: "4.3",
    score: 2,
    maxScore: 4,
    note: "Comparing unlike denominators still shaky.",
    submittedAt: "2025-10-08T14:00:00",
  },
  {
    id: "kb-leo-sci-1",
    studentFirst: "Leo",
    subject: "science",
    assignment: "Matter stations exit ticket",
    product: "ClearCenters",
    standard: "5.6A",
    score: 4,
    maxScore: 4,
    note: "Clear solids / liquids / gases language.",
    submittedAt: "2025-10-07T13:20:00",
  },
  {
    id: "kb-leo-ss-1",
    studentFirst: "Leo",
    subject: "social",
    assignment: "Texas regions map match",
    product: "CrystalQuest",
    standard: "4.7B",
    score: 3,
    maxScore: 4,
    note: "Coastal Plains vs Mountains & Basins solid; Panhandle mix-up.",
    submittedAt: "2025-10-06T15:10:00",
  },
  // —— Kai (math inbox)
  {
    id: "kb-kai-elar-1",
    studentFirst: "Kai",
    subject: "elar",
    assignment: "Author's purpose sort",
    product: "ClearSheets",
    standard: "4.9A",
    score: 3,
    maxScore: 4,
    note: "Persuade vs entertain still blurry on ads.",
    submittedAt: "2025-10-07T09:30:00",
  },
  {
    id: "kb-kai-sci-1",
    studentFirst: "Kai",
    subject: "science",
    assignment: "Density lab write-up",
    product: "ClearSheets",
    standard: "5.6A",
    score: 2,
    maxScore: 4,
    note: "Observations there; mass/volume link missing.",
    submittedAt: "2025-10-08T10:40:00",
  },
  {
    id: "kb-kai-ss-1",
    studentFirst: "Kai",
    subject: "social",
    assignment: "Regions climate clues",
    product: "CrystalQuest",
    standard: "4.7B",
    score: 3,
    maxScore: 4,
    note: "Good climate matches; one region label off.",
    submittedAt: "2025-10-06T14:00:00",
  },
  {
    id: "kb-kai-elar-jump",
    studentFirst: "Kai",
    subject: "elar",
    assignment: "Cold read · author's purpose",
    product: "CrystalChecks",
    standard: "4.9A",
    score: 95,
    maxScore: 100,
    note: "Usually soft on purpose tags — this cold read jumped. Celebrate and name what worked.",
    submittedAt: "2025-10-06T11:20:00",
  },
  // —— Maya (math inbox)
  {
    id: "kb-maya-elar-1",
    studentFirst: "Maya",
    subject: "elar",
    assignment: "Read & Respond: The Great Garden",
    product: "ClearCenters",
    standard: "4.10A",
    score: 4,
    maxScore: 4,
    note: "Claim + evidence clean and confident.",
    submittedAt: "2025-10-07T11:00:00",
  },
  {
    id: "kb-maya-sci-1",
    studentFirst: "Maya",
    subject: "science",
    assignment: "Matter stations",
    product: "ClearCenters",
    standard: "5.6A",
    score: 3,
    maxScore: 4,
    note: "Practice/Prove solid; Push could go further.",
    submittedAt: "2025-10-08T09:15:00",
  },
  {
    id: "kb-maya-ss-1",
    studentFirst: "Maya",
    subject: "social",
    assignment: "Texas regions map check",
    product: "CrystalQuest",
    standard: "4.7B",
    score: 4,
    maxScore: 4,
    note: "All regions matched with climate clues.",
    submittedAt: "2025-10-06T13:00:00",
  },
  {
    id: "kb-maya-math-drop",
    studentFirst: "Maya",
    subject: "math",
    assignment: "Comparing fractions quiz",
    product: "CrystalChecks",
    standard: "4.3D",
    score: 60,
    maxScore: 100,
    note: "Usually A-band — this quiz broke the pattern. Comparing unlike denominators slipped.",
    submittedAt: "2025-10-07T15:30:00",
  },
  // —— Riley (common Check-ins kid — fill if no inbox)
  {
    id: "kb-riley-math-1",
    studentFirst: "Riley",
    subject: "math",
    assignment: "Fraction strips",
    product: "ClearSheets",
    standard: "4.3G",
    score: 2,
    maxScore: 4,
    note: "Equivalence language soft; needs a re-teach touch.",
    submittedAt: "2025-10-07T10:20:00",
  },
  {
    id: "kb-riley-elar-1",
    studentFirst: "Riley",
    subject: "elar",
    assignment: "Author's purpose sort",
    product: "ClearSheets",
    standard: "4.9A",
    score: 3,
    maxScore: 4,
    note: "Inform tagged well; persuade still shaky.",
    submittedAt: "2025-10-08T11:00:00",
  },
  {
    id: "kb-riley-sci-1",
    studentFirst: "Riley",
    subject: "science",
    assignment: "Density lab write-up",
    product: "ClearSheets",
    standard: "5.6A",
    score: 3,
    maxScore: 4,
    note: "Good observations; denser language emerging.",
    submittedAt: "2025-10-07T14:30:00",
  },
  {
    id: "kb-riley-ss-1",
    studentFirst: "Riley",
    subject: "social",
    assignment: "Texas regions map check",
    product: "CrystalQuest",
    standard: "4.7B",
    score: 2,
    maxScore: 4,
    note: "Two region mismatches — map check worth a glance.",
    submittedAt: "2025-10-06T15:40:00",
  },
];

/** Soft summaries keyed by subject when we need a fallback voice. */
const SUBJECT_SUMMARY_FALLBACK = {
  math: {
    strong: "Fractions are landing — models match the claims.",
    ok: "Mostly on track; a few comparison or number-line gaps.",
    struggle: "Needs a closer look — equivalence or comparing still soft.",
  },
  elar: {
    strong: "Purpose and evidence feel clear and confident.",
    ok: "Solid overall; one purpose or craft detail still fuzzy.",
    struggle: "Purpose tags or evidence quotes need a re-teach touch.",
  },
  science: {
    strong: "Observations + science language are clean.",
    ok: "Ideas are there; units or links could tighten.",
    struggle: "Lab write-ups need a closer look — concepts still forming.",
  },
  social: {
    strong: "Regions and clues match well.",
    ok: "Mostly solid; one region or climate clue off.",
    struggle: "Map matches are shaky — worth a quick check-in.",
  },
};

function scorePct(score, maxScore) {
  const max = Number(maxScore) || 4;
  const s = Number(score);
  if (!Number.isFinite(s) || max <= 0) return null;
  return Math.round((Math.max(0, s) / max) * 100);
}

function bandForPct(pct) {
  if (pct == null) return "ok";
  if (pct >= 85) return "strong";
  if (pct < 70) return "struggle";
  return "ok";
}

/**
 * Normalize any row (inbox submission or gradebook) into a kid assignment.
 */
function normalizeKidAssignment(row, confirmedSet = null) {
  if (!row) return null;
  const score =
    typeof row.score === "number"
      ? row.score
      : typeof row.samScore === "number"
        ? row.samScore
        : null;
  const maxScore = typeof row.maxScore === "number" ? row.maxScore : 4;
  const pct = scorePct(score, maxScore);
  const confirmed =
    confirmedSet && typeof row.id === "string" ? confirmedSet.has(row.id) : false;
  return {
    id: row.id || `kb-${row.studentFirst}-${row.subject}-${row.assignment}`,
    studentFirst: row.studentFirst,
    subject: row.subject || "math",
    assignment: row.assignment || "Assignment",
    product: row.product || "ClearSheets",
    standard: row.standard || null,
    score,
    maxScore,
    pct,
    note: row.note || row.samReason || row.workSnippet || "",
    submittedAt: row.submittedAt || null,
    source: row.source || "gradebook",
    pending: row.source === "live" || row.source === "demo" ? !confirmed : false,
    confirmed,
  };
}

/** All assignment rows for a kid: live + demo inbox + gradebook stubs. */
export function getKidAssignments(studentFirst, confirmedIds = null) {
  const name = String(studentFirst || "").trim().toLowerCase();
  if (!name) return [];
  const confirmedSet = new Set(
    Array.isArray(confirmedIds) ? confirmedIds : loadConfirmedIds()
  );
  const fromInbox = getAllSubmissions()
    .filter((s) => String(s.studentFirst || "").trim().toLowerCase() === name)
    .map((s) => normalizeKidAssignment(s, confirmedSet));
  const inboxIds = new Set(fromInbox.map((a) => a.id));
  const fromBook = DEMO_KID_GRADEBOOK.filter(
    (r) => String(r.studentFirst || "").trim().toLowerCase() === name
  )
    .map((r) => normalizeKidAssignment({ ...r, source: "gradebook" }, confirmedSet))
    .filter((a) => a && !inboxIds.has(a.id));

  // Unknown kids: synthesize calm stubs across subjects from whatever inbox they have
  let extras = [];
  if (!fromBook.length && fromInbox.length) {
    const have = new Set(fromInbox.map((a) => a.subject));
    for (const key of KID_SUBJECT_ORDER) {
      if (have.has(key)) continue;
      const sub = subjectMeta(key);
      const band = "ok";
      extras.push(
        normalizeKidAssignment(
          {
            id: `kb-synth-${name}-${key}`,
            studentFirst: studentFirst,
            subject: key,
            assignment: `${sub.name} · recent check`,
            product: "CrystalQuest",
            standard: null,
            score: 3,
            maxScore: 4,
            note: SUBJECT_SUMMARY_FALLBACK[key]?.[band] || "On track.",
            submittedAt: "2025-10-07T12:00:00",
            source: "gradebook",
          },
          confirmedSet
        )
      );
    }
  }

  // Completely unknown name with no rows: still show a full calm stub set
  if (!fromInbox.length && !fromBook.length) {
    extras = KID_SUBJECT_ORDER.map((key) => {
      const sub = subjectMeta(key);
      return normalizeKidAssignment(
        {
          id: `kb-empty-${name || "kid"}-${key}`,
          studentFirst: studentFirst || "Student",
          subject: key,
          assignment: `${sub.unit || sub.name} check`,
          product: "ClearSheets",
          standard: null,
          score: 3,
          maxScore: 4,
          note: SUBJECT_SUMMARY_FALLBACK[key]?.ok || "Not much scored yet.",
          submittedAt: "2025-10-07T12:00:00",
          source: "gradebook",
        },
        confirmedSet
      );
    });
  }

  const all = [...fromInbox, ...fromBook, ...extras].filter(Boolean);
  all.sort((a, b) => {
    const ta = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const tb = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return tb - ta;
  });
  return all;
}

function buildSubjectSummary(subjectKey, assignments, avgPct) {
  const band = bandForPct(avgPct);
  const fallback = SUBJECT_SUMMARY_FALLBACK[subjectKey]?.[band] || "On track.";
  const pending = assignments.filter((a) => a.pending);
  const low = assignments.filter((a) => a.pct != null && a.pct < 70);
  const notes = assignments
    .map((a) => String(a.note || "").trim())
    .filter(Boolean)
    .slice(0, 2);

  let summary = fallback;
  if (band === "strong" && notes[0]) {
    summary = notes[0].length > 90 ? `${notes[0].slice(0, 88)}…` : notes[0];
  } else if (band === "struggle" && low[0]?.note) {
    summary = low[0].note.length > 100 ? `${low[0].note.slice(0, 98)}…` : low[0].note;
  } else if (notes[0] && band === "ok") {
    summary = notes[0].length > 90 ? `${notes[0].slice(0, 88)}…` : notes[0];
  }

  let struggle = null;
  if (low.length) {
    struggle = low[0].assignment
      ? `Watch: ${low[0].assignment}`
      : "Watch: a few soft scores";
  } else if (pending.length && band !== "strong") {
    struggle = `${pending.length} waiting for your confirm`;
  }

  return { summary, struggle, band, needsYou: band === "struggle" };
}

/**
 * Kid-first view model: one card per subject with average, summary, assignments.
 * Subjects follow Mrs. Barrons self-contained order (Math · ELAR · Science · SS).
 */
export function getKidGradingView(studentFirst, confirmedIds = null) {
  const displayName = String(studentFirst || "").trim() || "Student";
  const assignments = getKidAssignments(displayName, confirmedIds);
  const bySubject = new Map();
  for (const key of KID_SUBJECT_ORDER) bySubject.set(key, []);
  for (const a of assignments) {
    const key = KID_SUBJECT_ORDER.includes(a.subject) ? a.subject : "math";
    if (!bySubject.has(key)) bySubject.set(key, []);
    bySubject.get(key).push(a);
  }

  const subjects = KID_SUBJECT_ORDER.map((key) => {
    const list = bySubject.get(key) || [];
    const scored = list.filter((a) => a.pct != null);
    const avgPct =
      scored.length > 0
        ? Math.round(scored.reduce((sum, a) => sum + a.pct, 0) / scored.length)
        : null;
    const meta = subjectMeta(key);
    const { summary, struggle, band, needsYou } = buildSubjectSummary(key, list, avgPct);
    return {
      key,
      name: meta.name,
      color: meta.color,
      unit: meta.unit || "",
      averagePct: avgPct,
      band,
      needsYou,
      summary,
      struggle,
      assignmentCount: list.length,
      pendingCount: list.filter((a) => a.pending).length,
      assignments: list,
    };
  });

  const overallScored = subjects.filter((s) => s.averagePct != null);
  const overallPct =
    overallScored.length > 0
      ? Math.round(
          overallScored.reduce((sum, s) => sum + s.averagePct, 0) / overallScored.length
        )
      : null;
  const needsCount = subjects.filter((s) => s.needsYou).length;

  const wholeKidLine = buildWholeKidLine(displayName, subjects);
  const supports = getKidSupports(displayName);
  const struggleSubject = pickStrugglingSubject(subjects);

  const yearTrend = getKidYearTrend(displayName, confirmedIds);

  return {
    studentFirst: displayName,
    subjects,
    overallPct,
    needsCount,
    totalAssignments: assignments.length,
    wholeKidLine,
    supports,
    struggleSubjectKey: struggleSubject?.key || null,
    struggleSubjectName: struggleSubject?.name || null,
    yearTrend,
  };
}

/**
 * School-year score timeline for kid grading (demo).
 * Per-subject series under subject donuts — each subject gets its own color line.
 * Dates span late Aug → early Oct (demo "now" = Wed Oct 8, 2025).
 *
 * anomaly: "drop" | "jump" | omitted — pre-authored for calm demo storytelling;
 * detectYearTrendAnomalies re-detects per subject from rolling baseline.
 */
export const DEMO_KID_YEAR_TREND = {
  maya: [
    // Math — clear Oct drop (Comparing fractions)
    { id: "yt-maya-m1", date: "2025-08-28", pct: 94, subject: "math", assignment: "Fraction strips warm-up", assignmentId: null },
    { id: "yt-maya-m2", date: "2025-09-11", pct: 92, subject: "math", assignment: "Number-line practice", assignmentId: null },
    { id: "yt-maya-m3", date: "2025-09-25", pct: 90, subject: "math", assignment: "Equivalent fractions check", assignmentId: null },
    { id: "yt-maya-m4", date: "2025-10-02", pct: 88, subject: "math", assignment: "Unlike denominators warm-up", assignmentId: null },
    {
      id: "yt-maya-m5",
      date: "2025-10-07",
      pct: 60,
      subject: "math",
      assignment: "Comparing fractions quiz",
      assignmentId: "kb-maya-math-drop",
      anomaly: "drop",
    },
    { id: "yt-maya-m6", date: "2025-10-08", pct: 86, subject: "math", assignment: "Fraction recovery practice", assignmentId: null },
    // ELAR — steady high
    { id: "yt-maya-e1", date: "2025-08-28", pct: 92, subject: "elar", assignment: "Garden claim draft", assignmentId: null },
    { id: "yt-maya-e2", date: "2025-09-11", pct: 94, subject: "elar", assignment: "Purpose warm-up", assignmentId: null },
    { id: "yt-maya-e3", date: "2025-09-25", pct: 91, subject: "elar", assignment: "Evidence quotes", assignmentId: null },
    { id: "yt-maya-e4", date: "2025-10-02", pct: 94, subject: "elar", assignment: "Purpose practice", assignmentId: null },
    { id: "yt-maya-e5", date: "2025-10-08", pct: 93, subject: "elar", assignment: "Author's purpose sort", assignmentId: null },
    // Science — calm mid-A
    { id: "yt-maya-s1", date: "2025-08-28", pct: 90, subject: "science", assignment: "Matter intro check", assignmentId: null },
    { id: "yt-maya-s2", date: "2025-09-11", pct: 88, subject: "science", assignment: "States of matter sort", assignmentId: null },
    { id: "yt-maya-s3", date: "2025-09-25", pct: 92, subject: "science", assignment: "Density preview", assignmentId: null },
    { id: "yt-maya-s4", date: "2025-10-02", pct: 90, subject: "science", assignment: "Lab notes check", assignmentId: null },
    { id: "yt-maya-s5", date: "2025-10-08", pct: 88, subject: "science", assignment: "Matter stations", assignmentId: "kb-maya-sci-1" },
    // Social Studies — steady high
    { id: "yt-maya-ss1", date: "2025-08-28", pct: 96, subject: "social", assignment: "Regions climate match", assignmentId: null },
    { id: "yt-maya-ss2", date: "2025-09-11", pct: 94, subject: "social", assignment: "Map warm-up", assignmentId: null },
    { id: "yt-maya-ss3", date: "2025-09-25", pct: 95, subject: "social", assignment: "Texas regions quiz", assignmentId: null },
    { id: "yt-maya-ss4", date: "2025-10-02", pct: 97, subject: "social", assignment: "Climate clues", assignmentId: null },
    { id: "yt-maya-ss5", date: "2025-10-08", pct: 96, subject: "social", assignment: "Regions exit ticket", assignmentId: null },
  ],
  leo: [
    // Math — soft then Friday drop
    { id: "yt-leo-m1", date: "2025-08-28", pct: 85, subject: "math", assignment: "Strip models", assignmentId: null },
    { id: "yt-leo-m2", date: "2025-09-11", pct: 82, subject: "math", assignment: "Number-line practice", assignmentId: null },
    { id: "yt-leo-m3", date: "2025-09-25", pct: 78, subject: "math", assignment: "Unlike denominators", assignmentId: null },
    { id: "yt-leo-m4", date: "2025-10-06", pct: 75, subject: "math", assignment: "Equivalent fractions warm-up", assignmentId: "kb-leo-math-1" },
    {
      id: "yt-leo-m5",
      date: "2025-10-08",
      pct: 50,
      subject: "math",
      assignment: "Friday quick check · fractions",
      assignmentId: "kb-leo-math-2",
      anomaly: "drop",
    },
    // ELAR
    { id: "yt-leo-e1", date: "2025-08-28", pct: 82, subject: "elar", assignment: "Purpose warm-up", assignmentId: null },
    { id: "yt-leo-e2", date: "2025-09-11", pct: 80, subject: "elar", assignment: "Claim draft", assignmentId: null },
    { id: "yt-leo-e3", date: "2025-09-25", pct: 78, subject: "elar", assignment: "Evidence quotes", assignmentId: null },
    { id: "yt-leo-e4", date: "2025-10-02", pct: 84, subject: "elar", assignment: "Purpose practice", assignmentId: null },
    { id: "yt-leo-e5", date: "2025-10-08", pct: 81, subject: "elar", assignment: "Author's purpose sort", assignmentId: null },
    // Science — strong
    { id: "yt-leo-s1", date: "2025-08-28", pct: 88, subject: "science", assignment: "Matter sort", assignmentId: null },
    { id: "yt-leo-s2", date: "2025-09-11", pct: 90, subject: "science", assignment: "Density preview", assignmentId: null },
    { id: "yt-leo-s3", date: "2025-09-25", pct: 92, subject: "science", assignment: "Lab notes", assignmentId: null },
    { id: "yt-leo-s4", date: "2025-10-02", pct: 94, subject: "science", assignment: "States check", assignmentId: null },
    { id: "yt-leo-s5", date: "2025-10-07", pct: 100, subject: "science", assignment: "Matter stations exit ticket", assignmentId: "kb-leo-sci-1" },
    // Social
    { id: "yt-leo-ss1", date: "2025-08-28", pct: 84, subject: "social", assignment: "Regions map", assignmentId: null },
    { id: "yt-leo-ss2", date: "2025-09-11", pct: 82, subject: "social", assignment: "Climate clues", assignmentId: null },
    { id: "yt-leo-ss3", date: "2025-09-25", pct: 86, subject: "social", assignment: "Texas regions quiz", assignmentId: null },
    { id: "yt-leo-ss4", date: "2025-10-02", pct: 85, subject: "social", assignment: "Map exit ticket", assignmentId: null },
    { id: "yt-leo-ss5", date: "2025-10-08", pct: 88, subject: "social", assignment: "Regions review", assignmentId: null },
  ],
  kai: [
    // Math — soft, building
    { id: "yt-kai-m1", date: "2025-08-28", pct: 62, subject: "math", assignment: "Fraction warm-up", assignmentId: null },
    { id: "yt-kai-m2", date: "2025-09-11", pct: 58, subject: "math", assignment: "Strip models", assignmentId: null },
    { id: "yt-kai-m3", date: "2025-09-25", pct: 65, subject: "math", assignment: "Unlike denominators", assignmentId: null },
    { id: "yt-kai-m4", date: "2025-10-02", pct: 60, subject: "math", assignment: "Number-line practice", assignmentId: null },
    { id: "yt-kai-m5", date: "2025-10-08", pct: 68, subject: "math", assignment: "Pizza Problem", assignmentId: null },
    // ELAR — soft then clear jump
    { id: "yt-kai-e1", date: "2025-08-28", pct: 68, subject: "elar", assignment: "Purpose sort practice", assignmentId: null },
    { id: "yt-kai-e2", date: "2025-09-11", pct: 70, subject: "elar", assignment: "Claim draft", assignmentId: null },
    { id: "yt-kai-e3", date: "2025-09-25", pct: 66, subject: "elar", assignment: "Evidence quotes", assignmentId: null },
    { id: "yt-kai-e4", date: "2025-10-02", pct: 72, subject: "elar", assignment: "Author's purpose sort", assignmentId: "kb-kai-elar-1" },
    {
      id: "yt-kai-e5",
      date: "2025-10-06",
      pct: 95,
      subject: "elar",
      assignment: "Cold read · author's purpose",
      assignmentId: "kb-kai-elar-jump",
      anomaly: "jump",
    },
    // Science
    { id: "yt-kai-s1", date: "2025-08-28", pct: 58, subject: "science", assignment: "Density preview", assignmentId: null },
    { id: "yt-kai-s2", date: "2025-09-11", pct: 62, subject: "science", assignment: "Matter sort", assignmentId: null },
    { id: "yt-kai-s3", date: "2025-09-25", pct: 60, subject: "science", assignment: "Lab notes", assignmentId: null },
    { id: "yt-kai-s4", date: "2025-10-02", pct: 64, subject: "science", assignment: "States check", assignmentId: null },
    { id: "yt-kai-s5", date: "2025-10-08", pct: 66, subject: "science", assignment: "Matter stations", assignmentId: null },
    // Social
    { id: "yt-kai-ss1", date: "2025-08-28", pct: 70, subject: "social", assignment: "Climate clues", assignmentId: null },
    { id: "yt-kai-ss2", date: "2025-09-11", pct: 72, subject: "social", assignment: "Regions map", assignmentId: null },
    { id: "yt-kai-ss3", date: "2025-09-25", pct: 68, subject: "social", assignment: "Texas regions quiz", assignmentId: null },
    { id: "yt-kai-ss4", date: "2025-10-02", pct: 74, subject: "social", assignment: "Map exit ticket", assignmentId: null },
    { id: "yt-kai-ss5", date: "2025-10-08", pct: 72, subject: "social", assignment: "Regions review", assignmentId: null },
  ],
  riley: [
    // Math — drop
    { id: "yt-riley-m1", date: "2025-08-28", pct: 74, subject: "math", assignment: "Strip warm-up", assignmentId: null },
    { id: "yt-riley-m2", date: "2025-09-11", pct: 76, subject: "math", assignment: "Number-line practice", assignmentId: null },
    { id: "yt-riley-m3", date: "2025-09-25", pct: 72, subject: "math", assignment: "Unlike denominators", assignmentId: null },
    { id: "yt-riley-m4", date: "2025-10-07", pct: 50, subject: "math", assignment: "Fraction strips", assignmentId: "kb-riley-math-1", anomaly: "drop" },
    // ELAR
    { id: "yt-riley-e1", date: "2025-08-28", pct: 78, subject: "elar", assignment: "Purpose practice", assignmentId: null },
    { id: "yt-riley-e2", date: "2025-09-11", pct: 80, subject: "elar", assignment: "Claim draft", assignmentId: null },
    { id: "yt-riley-e3", date: "2025-09-25", pct: 76, subject: "elar", assignment: "Evidence quotes", assignmentId: null },
    { id: "yt-riley-e4", date: "2025-10-08", pct: 75, subject: "elar", assignment: "Author's purpose sort", assignmentId: "kb-riley-elar-1" },
    // Science
    { id: "yt-riley-s1", date: "2025-08-28", pct: 72, subject: "science", assignment: "Lab notes", assignmentId: null },
    { id: "yt-riley-s2", date: "2025-09-11", pct: 70, subject: "science", assignment: "Matter sort", assignmentId: null },
    { id: "yt-riley-s3", date: "2025-09-25", pct: 74, subject: "science", assignment: "Density preview", assignmentId: null },
    { id: "yt-riley-s4", date: "2025-10-08", pct: 73, subject: "science", assignment: "Matter stations", assignmentId: null },
    // Social
    { id: "yt-riley-ss1", date: "2025-08-28", pct: 76, subject: "social", assignment: "Regions map", assignmentId: null },
    { id: "yt-riley-ss2", date: "2025-09-11", pct: 78, subject: "social", assignment: "Climate clues", assignmentId: null },
    { id: "yt-riley-ss3", date: "2025-09-25", pct: 75, subject: "social", assignment: "Texas regions quiz", assignmentId: null },
    { id: "yt-riley-ss4", date: "2025-10-08", pct: 77, subject: "social", assignment: "Regions review", assignmentId: null },
  ],
};

/** Rolling baseline from prior points (median of last up to 4). */
function rollingBaseline(priorPcts) {
  if (!priorPcts.length) return null;
  const slice = priorPcts.slice(-4).slice().sort((a, b) => a - b);
  const mid = Math.floor(slice.length / 2);
  if (slice.length % 2 === 0) {
    return Math.round((slice[mid - 1] + slice[mid]) / 2);
  }
  return slice[mid];
}

/**
 * Mark drops / jumps vs rolling baseline — per subject line.
 * Drop: usually A-band (≥85) then ≤65, or ≥18 below baseline when baseline ≥78.
 * Jump: usually soft (≤70) then ≥88, or ≥18 above baseline when baseline ≤72.
 * Prefers pre-authored anomaly when present.
 */
export function detectYearTrendAnomalies(points = []) {
  const list = Array.isArray(points) ? points : [];
  const result = list.map((p) => ({
    ...p,
    anomaly: p.anomaly === "drop" || p.anomaly === "jump" ? p.anomaly : null,
  }));

  const bySubject = new Map();
  list.forEach((p, i) => {
    const key = p.subject || "math";
    if (!bySubject.has(key)) bySubject.set(key, []);
    bySubject.get(key).push(i);
  });

  for (const indices of bySubject.values()) {
    const ordered = [...indices].sort(
      (a, b) => new Date(list[a].date) - new Date(list[b].date)
    );
    const prior = [];
    for (const idx of ordered) {
      const p = list[idx];
      const pct = typeof p.pct === "number" ? p.pct : null;
      let anomaly = result[idx].anomaly;
      if (!anomaly && pct != null && prior.length >= 2) {
        const base = rollingBaseline(prior);
        if (base != null) {
          if ((base >= 85 && pct <= 65) || (base >= 78 && pct <= base - 18)) {
            anomaly = "drop";
          } else if ((base <= 70 && pct >= 88) || (base <= 72 && pct >= base + 18)) {
            anomaly = "jump";
          }
        }
      }
      if (pct != null) prior.push(pct);
      result[idx] = { ...result[idx], anomaly };
    }
  }
  return result;
}

function formatTrendDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function buildYearTrendCaption(studentFirst, points = []) {
  const name = String(studentFirst || "").trim() || "This kid";
  const subName = (p) => p.subjectName || subjectMeta(p.subject || "math").name;
  const drops = points.filter((p) => p.anomaly === "drop");
  const jumps = points.filter((p) => p.anomaly === "jump");
  if (drops.length === 1 && !jumps.length) {
    const a = drops[0];
    return `Usually steady in ${subName(a)} — ${a.assignment || "this quiz"} broke the pattern.`;
  }
  if (drops.length > 1 && !jumps.length) {
    const subjects = [...new Set(drops.map(subName))];
    const where = subjects.length === 1 ? ` in ${subjects[0]}` : "";
    return `Usually steady${where} — a few scores broke the pattern.`;
  }
  if (jumps.length === 1 && !drops.length) {
    const a = jumps[0];
    return `Usually soft in ${subName(a)} — ${a.assignment || "this one"} jumped.`;
  }
  if (jumps.length && !drops.length) {
    return `Usually soft — a few bright spots broke upward.`;
  }
  if (drops.length && jumps.length) {
    return `A few pattern breaks across subjects — worth a calm glance.`;
  }
  const scored = points.filter((p) => typeof p.pct === "number");
  if (scored.length >= 3) {
    const avg = scored.reduce((s, p) => s + p.pct, 0) / scored.length;
    if (avg >= 85) return `Steady A-band across subjects so far — ${name} is holding.`;
    if (avg < 70) return `Still building — subject lines are soft but tracking.`;
  }
  return `Steady across subjects through the year so far.`;
}

/**
 * School-year trend for kid grading chart — per-subject color lines.
 * Demo kids use DEMO_KID_YEAR_TREND; others synthesize from assignment history.
 */
export function getKidYearTrend(studentFirst, confirmedIds = null) {
  const displayName = String(studentFirst || "").trim() || "Student";
  const key = displayName.toLowerCase();
  const metaColor = (subjectKey) => subjectMeta(subjectKey).color;

  let raw = DEMO_KID_YEAR_TREND[key];
  if (!raw || !raw.length) {
    const assignments = getKidAssignments(displayName, confirmedIds)
      .filter((a) => a.pct != null && a.submittedAt)
      .slice()
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
    raw = assignments.map((a) => ({
      id: `yt-synth-${a.id}`,
      date: a.submittedAt,
      pct: a.pct,
      subject: a.subject,
      assignment: a.assignment,
      assignmentId: a.id,
    }));
  }

  const sorted = [...raw].sort((a, b) => new Date(a.date) - new Date(b.date));
  const withAnomaly = detectYearTrendAnomalies(sorted);
  const points = withAnomaly.map((p) => ({
    id: p.id,
    date: p.date,
    dateLabel: formatTrendDate(p.date),
    pct: p.pct,
    subject: p.subject || "math",
    subjectColor: metaColor(p.subject || "math"),
    subjectName: subjectMeta(p.subject || "math").name,
    assignment: p.assignment || "Assignment",
    assignmentId: p.assignmentId || null,
    anomaly: p.anomaly || null,
  }));

  const series = KID_SUBJECT_ORDER.map((subjectKey) => {
    const meta = subjectMeta(subjectKey);
    const subjectPoints = points
      .filter((p) => p.subject === subjectKey)
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      key: subjectKey,
      name: meta.name,
      color: meta.color,
      points: subjectPoints,
    };
  }).filter((s) => s.points.length > 0);

  return {
    points,
    series,
    caption: buildYearTrendCaption(displayName, points),
    anomalyCount: points.filter((p) => p.anomaly).length,
    dropCount: points.filter((p) => p.anomaly === "drop").length,
    jumpCount: points.filter((p) => p.anomaly === "jump").length,
  };
}
