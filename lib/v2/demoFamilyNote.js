// CI2.0 · Family note stub — teacher-facing one-pager (not a parent portal).
// Kid name · today's focus · celebration + ask-home chips · copy message stub.

import { DEMO_WHO_NEEDS_ME } from "./demoWhoNeedsMe";
import { SUBJECTS, DAY_NAMES, DATES, DEMO_WEEK, DEMO_TEACHER } from "./demoWeek";

export const FAMILY_NOTE_HREF = (id) =>
  `/v2/teacher/family/${encodeURIComponent(id)}`;

/** Default demo kid when Reports links in without a card id. */
export const FAMILY_NOTE_DEFAULT_ID = "wnm-kai";


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

  return {
    id: card.id,
    studentFirst: card.studentFirst,
    subject: card.subject,
    subjectName: sub.name,
    subjectColor: sub.color,
    standard: card.standard || null,
    assignment: card.assignment || "",
    reason: card.reason,
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
 * Family note stub from Check-ins card id (wnm-*) or student first name fallback.
 */
export function getFamilyNoteStub(id) {
  const key = String(id || "").trim();
  if (!key) return getFamilyNoteStub(FAMILY_NOTE_DEFAULT_ID);

  let card = DEMO_WHO_NEEDS_ME.find((c) => c.id === key);
  if (!card) {
    const byName = DEMO_WHO_NEEDS_ME.find(
      (c) => c.studentFirst.toLowerCase() === key.toLowerCase()
    );
    card = byName || DEMO_WHO_NEEDS_ME.find((c) => c.id === FAMILY_NOTE_DEFAULT_ID);
  }
  if (!card) return null;
  return baseFromCard(card);
}

export default getFamilyNoteStub;
