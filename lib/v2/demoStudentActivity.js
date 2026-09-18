// CI2.0 Student activity Start stub — demo items + local progress.
// No engines, no grading AI, no Supabase. Same-browser localStorage only.

import {
  DEMO_STUDENT_DAY,
  productKidLabel,
  readTeacherAddedForDay,
  subjectColor,
  subjectName,
  teacherActToMission,
} from "./demoStudentDay";

/** localStorage key — completed mission ids for the demo student day. */
export const STUDENT_PROGRESS_KEY = "ci2.student.missionProgress";

/**
 * Resolve a mission by id from demo day + teacher-added (same browser).
 * Returns null if unknown.
 */
export function resolveStudentMission(missionId) {
  if (!missionId) return null;
  const demo = DEMO_STUDENT_DAY.missions.find((m) => m.id === missionId);
  if (demo) return { ...demo };

  if (String(missionId).startsWith("from-teacher-")) {
    const actId = String(missionId).replace(/^from-teacher-/, "");
    const added = readTeacherAddedForDay(DEMO_STUDENT_DAY.dayIndex);
    const act = added.find((a) => a && String(a.id) === actId);
    if (act) return teacherActToMission(act, { must: true });
  }
  return null;
}

/** Read completed mission id set. Shape: { doneIds: string[], updatedAt?: string } */
export function readStudentProgress() {
  if (typeof window === "undefined") return { doneIds: [] };
  try {
    const raw = localStorage.getItem(STUDENT_PROGRESS_KEY);
    if (!raw) return { doneIds: [] };
    const parsed = JSON.parse(raw);
    const doneIds = Array.isArray(parsed?.doneIds)
      ? parsed.doneIds.filter((id) => typeof id === "string")
      : [];
    return { doneIds, updatedAt: parsed?.updatedAt || null };
  } catch {
    return { doneIds: [] };
  }
}

export function markMissionDone(missionId) {
  if (typeof window === "undefined" || !missionId) return readStudentProgress();
  const prev = readStudentProgress();
  const doneIds = prev.doneIds.includes(missionId)
    ? prev.doneIds
    : [...prev.doneIds, missionId];
  const next = { doneIds, updatedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STUDENT_PROGRESS_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next;
}

export function isMissionDone(missionId, progress) {
  const p = progress || readStudentProgress();
  return Boolean(missionId && p.doneIds?.includes(missionId));
}

/**
 * Stub activity content keyed by mission id.
 * 1–2 kid items: multiple choice or short response.
 * SAM 3-step: nudge → hint → example (positive “not yet” voice).
 */
const ACTIVITY_BY_ID = {
  "stu-now-equiv": {
    directions:
      "Warm up for Ms. Rivera’s lesson. Tap the fraction that matches ½ — then you’re ready.",
    items: [
      {
        id: "q1",
        kind: "mc",
        prompt: "Which fraction equals ½?",
        choices: [
          { id: "a", label: "2/4" },
          { id: "b", label: "1/3" },
          { id: "c", label: "3/5" },
        ],
        correctId: "a",
      },
      {
        id: "q2",
        kind: "short",
        prompt: "In one short sentence: how do you know 2/4 equals ½?",
        placeholder: "I know because…",
      },
    ],
    samSteps: [
      {
        label: "Nudge",
        text: "Not yet — try thinking about fair shares. Two equal parts… what number on top and bottom feels the same?",
      },
      {
        label: "Hint",
        text: "Picture a pizza cut in 2. Now cut each half in half again — how many small slices? That’s the bottom number.",
      },
      {
        label: "Example",
        text: "Example: ½ = 2/4. Top and bottom both doubled. You’ve got this — pick that match.",
      },
    ],
  },
  "stu-next-pizza": {
    directions:
      "Center stub: Practice one idea about the pizza story. No real engine yet — just show your thinking.",
    items: [
      {
        id: "q1",
        kind: "mc",
        prompt: "Leo and Maya share a pizza equally. They each get…",
        choices: [
          { id: "a", label: "More than half" },
          { id: "b", label: "Exactly half" },
          { id: "c", label: "Less than a quarter" },
        ],
        correctId: "b",
      },
      {
        id: "q2",
        kind: "short",
        prompt: "If a third friend joins and they share equally, about how much does each get? (words or a fraction)",
        placeholder: "Each gets…",
      },
    ],
    samSteps: [
      {
        label: "Nudge",
        text: "Not yet — start with “same amount for everyone.” What fraction means fair for two people?",
      },
      {
        label: "Hint",
        text: "Two people → two equal parts. The top number is 1 for each person’s share of the whole.",
      },
      {
        label: "Example",
        text: "Example: equal share for 2 = ½ each. For 3 friends, each gets about ⅓. Nice thinking.",
      },
    ],
  },
  "stu-later-purpose": {
    directions:
      "May-do station stub: match the author’s purpose. One quick pick, one short why.",
    items: [
      {
        id: "q1",
        kind: "mc",
        prompt: "A funny comic about a dog who can’t find its bone is mostly meant to…",
        choices: [
          { id: "a", label: "Persuade you to buy dog food" },
          { id: "b", label: "Entertain you" },
          { id: "c", label: "Teach you how bones form" },
        ],
        correctId: "b",
      },
      {
        id: "q2",
        kind: "short",
        prompt: "Name one clue that told you the purpose (a word, joke, or feeling).",
        placeholder: "My clue is…",
      },
    ],
    samSteps: [
      {
        label: "Nudge",
        text: "Not yet — ask: is the writer trying to make you laugh, teach a fact, or change your mind?",
      },
      {
        label: "Hint",
        text: "Funny comics usually want you to smile. That’s entertain — not a science lesson.",
      },
      {
        label: "Example",
        text: "Example: silly dog + joke = entertain. You’re close — tap that choice.",
      },
    ],
  },
};

const GENERIC_ACTIVITY = {
  directions:
    "Your teacher added this for today. This is a calm skeleton — real content comes later. Try the practice item, then Submit.",
  items: [
    {
      id: "q1",
      kind: "mc",
      prompt: "Ready to try? Pick the best “I’m here” answer.",
      choices: [
        { id: "a", label: "I’m ready" },
        { id: "b", label: "I need a minute" },
        { id: "c", label: "I’ll come back later" },
      ],
      correctId: "a",
    },
    {
      id: "q2",
      kind: "short",
      prompt: "One sentence: what do you already know about this topic?",
      placeholder: "I already know…",
    },
  ],
  samSteps: [
    {
      label: "Nudge",
      text: "Not yet — take a breath. Start with what you already know; wrong guesses are practice.",
    },
    {
      label: "Hint",
      text: "If you’re stuck, pick “I’m ready” and write one true thing you remember. That’s enough for this stub.",
    },
    {
      label: "Example",
      text: "Example: “I’m ready” + “I know fractions can look different but mean the same.” Nice.",
    },
  ],
};

/** Build activity shell model for a mission id. */
export function getStudentActivity(missionId) {
  const mission = resolveStudentMission(missionId);
  if (!mission) return null;
  const stub = ACTIVITY_BY_ID[mission.id] || GENERIC_ACTIVITY;
  return {
    mission,
    directions: stub.directions,
    items: stub.items,
    samSteps: stub.samSteps,
    subjectColor: subjectColor(mission.subject),
    subjectLabel: subjectName(mission.subject),
    productLabel: productKidLabel(mission.product),
  };
}

export { productKidLabel, subjectColor, subjectName };
