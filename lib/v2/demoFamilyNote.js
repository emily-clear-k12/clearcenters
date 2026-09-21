// CI2.0 · Family note stub — teacher-facing one-pager (not a parent portal).
// Kid name · today's focus · celebration + ask-home chips · copy message stub.

import { DEMO_WHO_NEEDS_ME } from "./demoWhoNeedsMe";
import { SUBJECTS, DAY_NAMES, DATES, DEMO_WEEK, DEMO_TEACHER } from "./demoWeek";
import { findStandardByCode, formatSoftNames } from "./demoReports";

/** Deep link to Family note stub. Optional periodId / subject / topic / standard for prefill. */
export const FAMILY_NOTE_HREF = (id, opts = null) => {
  const base = `/v2/teacher/family/${encodeURIComponent(id)}`;
  const params = new URLSearchParams();
  const period =
    opts && opts.periodId && String(opts.periodId) !== "all"
      ? String(opts.periodId).trim()
      : "";
  if (period) params.set("period", period);
  const subject = opts && opts.subject ? String(opts.subject).trim() : "";
  if (subject) params.set("subject", subject);
  const topic = opts && opts.topic ? String(opts.topic).trim() : "";
  if (topic) params.set("topic", topic);
  const standard = opts && opts.standard ? String(opts.standard).trim() : "";
  if (standard) params.set("standard", standard);
  const q = params.toString();
  return q ? `${base}?${q}` : base;
};

/** Default demo kid when Reports links in without a card id. */
export const FAMILY_NOTE_DEFAULT_ID = "wnm-kai";

/** Soft-story care door id — opens already knowing who + why (not a blank form). */
export const FAMILY_NOTE_SOFT_STORY_PREFIX = "soft-";
export const FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE = "5.6B";

export function softStoryFamilyNoteId(code = FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE) {
  const c = String(code || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE).trim() || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE;
  return `${FAMILY_NOTE_SOFT_STORY_PREFIX}${c}`;
}

export function isSoftStoryFamilyNoteId(id) {
  return String(id || "").trim().toLowerCase().startsWith(FAMILY_NOTE_SOFT_STORY_PREFIX);
}

export function softStoryCodeFromId(id) {
  const raw = String(id || "").trim();
  if (!isSoftStoryFamilyNoteId(raw)) return null;
  return raw.slice(FAMILY_NOTE_SOFT_STORY_PREFIX.length).trim() || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE;
}

/**
 * Calm door from soft story → shared Family note compose.
 * Prefills Sofia · Noah · Diego / TEKS 5.6B (Mixtures) by default.
 */
export function FAMILY_NOTE_SOFT_STORY_HREF(opts = null) {
  const code =
    (opts && (opts.standard || opts.code)) || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE;
  return FAMILY_NOTE_HREF(softStoryFamilyNoteId(code), {
    periodId: opts?.periodId,
    subject: opts?.subject,
    topic: opts?.topic,
    standard: code,
  });
}



/** localStorage — fake "Sent · demo" state per family note (not real SMS/email). */
export const FAMILY_SENT_KEY = "ci2.family.sentDemo";

export function loadFamilySentMap() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(FAMILY_SENT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function isFamilyNoteSent(noteId) {
  if (!noteId) return false;
  const map = loadFamilySentMap();
  return Boolean(map[String(noteId)]?.sentAt);
}

/**
 * Mark family note as "Sent · demo" (queued confirmation only — no SMS/email).
 */
export function markFamilyNoteSent(noteId, meta = {}) {
  if (typeof window === "undefined" || !noteId) return null;
  const map = loadFamilySentMap();
  const entry = {
    sentAt: new Date().toISOString(),
    channel: meta.channel || "demo-queue",
    studentFirst: meta.studentFirst || null,
  };
  map[String(noteId)] = entry;
  try {
    localStorage.setItem(FAMILY_SENT_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event("ci2-family-sent"));
  } catch {
    /* ignore quota */
  }
  return entry;
}

/**
 * Undo demo "Sent" flag for a family note (clears queued confirmation only).
 */
export function clearFamilyNoteSent(noteId) {
  if (typeof window === "undefined" || !noteId) return false;
  const map = loadFamilySentMap();
  const key = String(noteId);
  if (!map[key]) return false;
  delete map[key];
  try {
    localStorage.setItem(FAMILY_SENT_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event("ci2-family-sent"));
  } catch {
    /* ignore quota */
  }
  return true;
}

const FOCUS_BY_SUBJECT = {
  math: "We're working on equivalent fractions — same amount, different look.",
  elar: "We're naming the author's purpose with one calm text clue.",
  science: "We're separating mixtures vs solutions with one evidence note.",
  social: "We're sharing one clear region fact like a visitor.",
};

const CELEBRATION_BY_REASON = {
  low_clearance: "Showed grit on the number line today.",
  not_started: "Ready for a gentle start — we'll cheer the first step.",
  just_submitted: "Just finished and turned work in — nice follow-through.",
  watch: "Stayed with the group and tried the hard part.",
};

const ASK_BY_REASON = {
  low_clearance: "Ask at home: can you show me two ways to make the same amount?",
  not_started: "Ask at home: what was today's math title — one sentence is enough.",
  just_submitted: "Ask at home: tell me one thing you checked before submit.",
  watch: "Ask at home: what felt easy / what felt sticky today?",
};

function baseFromCard(card) {
  const sub = SUBJECTS[card.subject] || { name: "Class", color: "#8B6CFF" };
  const focus =
    FOCUS_BY_SUBJECT[card.subject] ||
    "Today's focus in plain words — one calm idea kids can say at home.";
  const celebration =
    CELEBRATION_BY_REASON[card.reason] || "Tried something new in class today.";
  const askHome =
    ASK_BY_REASON[card.reason] ||
    "Ask at home: what was one thing you practiced today?";
  const dayIdx = typeof DEMO_WEEK.focusDay === "number" ? DEMO_WEEK.focusDay : 2;
  const dayLabel = `${DAY_NAMES[dayIdx] || "Today"} · ${DATES[dayIdx] || ""}`.trim();
  const copyMessage = [
    `Hi — quick note about ${card.studentFirst}.`,
    ``,
    `Today's focus: ${focus}`,
    `Celebrate: ${celebration}`,
    `Ask at home: ${askHome}`,
    ``,
    `— ${DEMO_TEACHER.name || "Mrs. Barrons"} (ClearCenters stub)`,
  ].join("\n");

  const periodId =
    card.periodId && String(card.periodId) !== "all"
      ? String(card.periodId)
      : null;
  return {
    id: card.id,
    studentFirst: card.studentFirst,
    subject: card.subject,
    subjectName: sub.name,
    subjectColor: sub.color,
    standard: card.standard || null,
    assignment: card.assignment || "",
    reason: card.reason,
    periodId,
    focusPlain: focus,
    celebration,
    askHome,
    dayLabel,
    samLine: "Family note · teacher one-pager — not a parent login.",
    copyMessage,
    checkInsHref: "/v2/teacher/check-ins",
    reportsHref: "/v2/teacher/reports",
    dayHref: "/v2/teacher/day?d=2",
  };
}

/**
 * Family note stub from Check-ins card id (wnm-*), student first name,
 * or a calm synthesize when grading deep-links a kid outside the Check-ins roster.
 * Optional opts.subject / opts.topic prefill focus from a struggling subject.
 */

/**
 * Soft-story Family note — already knows who (cluster) + why (standard/plain).
 * Shared compose for Reports / Check-ins / Daily Focus care doors.
 */
export function getSoftStoryFamilyNote(code = FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE, opts = null) {
  const key = String(code || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE).trim() || FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE;
  const std = findStandardByCode(key);
  const names = (std?.softCluster || ["Sofia", "Noah", "Diego"]).filter(Boolean);
  const whoLine = formatSoftNames(names, 4) || names.join(" · ");
  const subject = (opts && opts.subject) || std?.subject || "science";
  const sub = SUBJECTS[subject] || { name: std?.subjectName || "Science", color: std?.subjectColor || "#2BB3A3" };
  const plain =
    (opts && opts.topic) ||
    std?.plain ||
    "Mixtures vs solutions — claim + one evidence note.";
  const focus =
    subject === "science"
      ? `We're practicing ${plain.replace(/\s*—\s*/, " — ").replace(/\.$/, "")}.`
      : FOCUS_BY_SUBJECT[subject] || plain;
  const celebration =
    "Stayed with the work and tried a clear claim with one evidence note.";
  const askHome =
    "Ask at home: can you tell me one way a mixture is different from a solution?";
  const dayIdx = typeof DEMO_WEEK.focusDay === "number" ? DEMO_WEEK.focusDay : 2;
  const dayLabel = `${DAY_NAMES[dayIdx] || "Today"} · ${DATES[dayIdx] || ""}`.trim();
  const teacher = DEMO_TEACHER.name || "Mrs. Barrons";
  const copyMessage = [
    `Hi — quick note about ${whoLine}.`,
    ``,
    `They're working on TEKS ${key} (${sub.name}) — ${plain}`,
    `Celebrate: ${celebration}`,
    `Ask at home: ${askHome}`,
    ``,
    `— ${teacher} (ClearCenters stub)`,
  ].join("\n");
  const periodId =
    opts?.periodId && String(opts.periodId) !== "all"
      ? String(opts.periodId)
      : null;
  return {
    id: softStoryFamilyNoteId(key),
    kind: "soft-story",
    studentFirst: whoLine,
    studentNames: names,
    whoLine,
    subject,
    subjectName: sub.name,
    subjectColor: sub.color,
    standard: key,
    assignment: opts?.topic || (key === "5.6B" ? "Mixtures exit ticket" : plain),
    reason: "soft_story",
    periodId,
    focusPlain: focus,
    celebration,
    askHome,
    dayLabel,
    whyLine: `TEKS ${key} · ${plain}`,
    samLine:
      "Family note from the soft story — already filled with who + why. Edit, then send.",
    copyMessage,
    checkInsHref: "/v2/teacher/check-ins",
    reportsHref: "/v2/teacher/reports",
    dayHref: "/v2/teacher/day?d=2",
  };
}

export function getFamilyNoteStub(id, opts = null) {
  const key = String(id || "").trim();
  if (!key) return getFamilyNoteStub(FAMILY_NOTE_DEFAULT_ID, opts);

  // Soft-story care door (cluster who + standard why) — shared compose surface.
  if (isSoftStoryFamilyNoteId(key)) {
    const code =
      softStoryCodeFromId(key) ||
      (opts && opts.standard) ||
      FAMILY_NOTE_SOFT_STORY_DEFAULT_CODE;
    return getSoftStoryFamilyNote(code, opts);
  }
  // Explicit standard opt with story id still lands soft compose when id is the story kid + standard.
  if (opts && opts.standard && key === "wnm-sofia") {
    /* preserve single-kid Sofia door; soft cluster uses soft-* ids */
  }
  const subjectOpt =
    opts && opts.subject ? String(opts.subject).trim().toLowerCase() : "";
  const topicOpt = opts && opts.topic ? String(opts.topic).trim() : "";

  let card = DEMO_WHO_NEEDS_ME.find((c) => c.id === key);
  if (!card) {
    const byName = DEMO_WHO_NEEDS_ME.find(
      (c) => c.studentFirst.toLowerCase() === key.toLowerCase()
    );
    card = byName || null;
  }

  // Synthesize from first name when not on Check-ins roster (e.g. Leo from grading)
  if (!card) {
    const looksLikeId = key.startsWith("wnm-");
    const first = looksLikeId
      ? key.replace(/^wnm-/, "").replace(/-/g, " ")
      : key;
    const studentFirst =
      first.charAt(0).toUpperCase() + first.slice(1);
    const subject = subjectOpt || "math";
    card = {
      id: looksLikeId ? key : `wnm-grade-${studentFirst.toLowerCase()}`,
      studentFirst,
      subject,
      standard: subject === "math" ? "4.3C" : null,
      assignment:
        topicOpt ||
        (subject === "math"
          ? "Equivalent fractions practice"
          : `${SUBJECTS[subject]?.name || "Class"} check-in`),
      reason: "watch",
      tone: "ready",
      periodId: opts?.periodId || null,
    };
  } else if (subjectOpt && subjectOpt !== card.subject) {
    card = {
      ...card,
      subject: subjectOpt,
      assignment:
        topicOpt ||
        card.assignment ||
        (subjectOpt === "math"
          ? "Equivalent fractions practice"
          : card.assignment),
      reason: card.reason === "just_submitted" ? "watch" : card.reason,
    };
  } else if (topicOpt) {
    card = { ...card, assignment: topicOpt };
  }

  if (!card) return null;
  return baseFromCard(card);
}

export default getFamilyNoteStub;
