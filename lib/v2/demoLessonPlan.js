// CI2.0 · Lesson plan stub — glance-first teacher one-pager (skeleton only).
// Not a full planner. Objective · TEKS · materials · 3-beat spine · exit ticket.

import {
  SUBJECTS,
  DAY_NAMES,
  DATES,
  PRODUCT_INFO,
} from "./demoWeek";
import {
  findActivityById,
  materialsStub,
  standardOneLiner,
  PROJECT_HREF,
} from "./demoProject";

export const LESSON_PLAN_HREF = (id) =>
  `/v2/teacher/lesson-plan/${encodeURIComponent(id)}`;

const DAY_FOCUS_HREF = (day) => `/v2/teacher/day?d=${Number(day) || 2}`;

/** 3-beat teach spine (today's lesson — not multi-day project checkpoints). */
const TEACH_SPINE_BY_SUBJECT = {
  math: [
    { beat: "Hook · model", detail: "Show one clear model (strips or number line). Kids name what they see." },
    { beat: "We do · try", detail: "Guided pair try — one example, one kid sentence." },
    { beat: "You do · check", detail: "Independent beat + exit ticket stub. Circulate calm." },
  ],
  elar: [
    { beat: "Hook · purpose", detail: "Read the purpose aloud once. Kids whisper-guess before sorting." },
    { beat: "We do · clue", detail: "Mark one text clue together. Say it in kid words." },
    { beat: "You do · check", detail: "Short response + exit ticket stub. Partner whisper-read." },
  ],
  science: [
    { beat: "Hook · predict", detail: "Predict → observe setup. One calm question on the board." },
    { beat: "We do · note", detail: "Gather one observation together. Claim in kid words." },
    { beat: "You do · check", detail: "Independent note + exit ticket stub. Gallery optional." },
  ],
  social: [
    { beat: "Hook · map", detail: "Finger on the region first. One visitor-style fact." },
    { beat: "We do · fact", detail: "Build one sentence together from the map or card." },
    { beat: "You do · check", detail: "Postcard sketch + exit ticket stub. Partner swap." },
  ],
};

const OBJECTIVE_BY_SUBJECT = {
  math: "Kids show the fraction idea with a clear model and one calm sentence.",
  elar: "Kids name the author’s purpose with one text clue in kid words.",
  science: "Kids claim + one evidence note from today’s observe beat.",
  social: "Kids share one clear region / map fact like a visitor.",
};

const EXIT_BY_SUBJECT = {
  math: "Exit ticket stub · sketch one equivalent pair + “same amount” sentence.",
  elar: "Exit ticket stub · purpose + one clue in 1–2 lines.",
  science: "Exit ticket stub · claim + one observation (not a lab novel).",
  social: "Exit ticket stub · one visitor sentence + tiny map mark.",
};

/**
 * Build lesson-plan one-pager model from a teach (or any) activity id.
 */
export function getLessonPlanStub(id) {
  const act = findActivityById(id);
  if (!act) return null;
  const sub = SUBJECTS[act.subject] || { name: act.subject || "Subject", color: "#8B6CFF", unit: "" };
  const spine = TEACH_SPINE_BY_SUBJECT[act.subject] || TEACH_SPINE_BY_SUBJECT.math;
  const objective =
    OBJECTIVE_BY_SUBJECT[act.subject] ||
    "Kids show the idea in a short, clear way — model, clue, or artifact.";
  const exitTicket =
    EXIT_BY_SUBJECT[act.subject] ||
    "Exit ticket stub · one short check before they leave the beat.";
  // Single-day materials feel (lesson, not multi-day project span)
  const materials = materialsStub(act, { days: 1 });
  return {
    id: act.id,
    title: act.title,
    subject: act.subject,
    subjectName: sub.name,
    subjectColor: sub.color,
    unitHint: sub.unit || "",
    kind: act.kind,
    isTeach: act.kind === "teach",
    standard: act.standard || null,
    teksLabel: act.standard ? `TEKS ${act.standard}` : "TEKS stub · add when ready",
    teksChip: act.standard || "TEKS stub",
    objective,
    materials,
    spine,
    exitTicket,
    minutes: act.minutes || 15,
    who: act.who || "Everyone",
    product: act.product,
    productAbout: PRODUCT_INFO[act.product]?.about || "",
    day: act.day,
    dayLabel: `${DAY_NAMES[act.day] || "Day"} · ${DATES[act.day] || ""}`.trim(),
    samLine: act.kind === "teach"
      ? "Lesson plan · skeleton only — glance first, teach heart."
      : "Lesson shell · teach beat when this tile is a teach.",
    standardOneLiner: standardOneLiner(act),
    standardInfoHref: `/v2/teacher/standards?from=${encodeURIComponent(act.id)}#${encodeURIComponent(act.standard || "stub")}`,
    unitGuideHref: `/v2/teacher/unit-guide?from=${encodeURIComponent(act.id)}#${encodeURIComponent(act.id)}`,
    projectHref: act.kind === "teach" ? PROJECT_HREF(act.id) : null,
    backHref: DAY_FOCUS_HREF(act.day),
    source: act.source,
  };
}

export default getLessonPlanStub;
