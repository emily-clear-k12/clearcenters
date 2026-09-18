// CI2.0 · Standard info + Unit teaching guide stubs (glance-first skeletons).
// Not a TEKS database. Not a curriculum PDF importer. Teach heart first.

import {
  SUBJECTS,
  DAY_NAMES,
  DATES,
  DAYS,
} from "./demoWeek";
import {
  findActivityById,
  PROJECT_HREF,
  materialsStub,
  projectDaysSpan,
  checkpointsFor,
} from "./demoProject";

/** Routes (match Project one-pager stub links). */
export const STANDARDS_HREF = (opts = {}) => {
  const code = opts.code || "stub";
  const from = opts.from ? `?from=${encodeURIComponent(opts.from)}` : "";
  return `/v2/teacher/standards${from}#${encodeURIComponent(code)}`;
};

export const UNIT_GUIDE_HREF = (opts = {}) => {
  const id = opts.id || opts.from || "stub";
  const from = opts.from ? `?from=${encodeURIComponent(opts.from)}` : "";
  return `/v2/teacher/unit-guide${from}#${encodeURIComponent(id)}`;
};

/** Kid-friendly plain words + mastery look-fors by TEKS family / subject. */
const STANDARD_STUBS = {
  "4.3C": {
    plain: "Kids show two fractions are the same amount with a clear model.",
    lookFors: [
      "Points to matching pieces on strips or a number line.",
      "Says “same amount” in kid words (not just “equal”).",
      "Can name one pair (e.g. 1/2 and 2/4) without guessing.",
    ],
  },
  "4.3D": {
    plain: "Kids compare fractions and say which is bigger — with a reason.",
    lookFors: [
      "Uses a model (strips, circles, or number line) to compare.",
      "Explains “more / less” with one clear sentence.",
      "Doesn’t rely only on bigger denominators = bigger fraction.",
    ],
  },
  "4.3G": {
    plain: "Kids place fractions on a number line and explain the spot.",
    lookFors: [
      "Marks the fraction between 0 and 1 (or whole numbers) carefully.",
      "Can say why it sits there (halves, fourths, etc.).",
      "Fixes a wrong mark after a partner check.",
    ],
  },
  "4.3A": {
    plain: "Kids name numerator and denominator and what each means.",
    lookFors: [
      "Points to parts vs whole without mixing the words.",
      "Uses the words correctly in one short sentence.",
      "Fixes a mix-up when a buddy asks.",
    ],
  },
  "4.3": {
    plain: "Kids show fraction sense — models, compares, or reviews calmly.",
    lookFors: [
      "Uses a model instead of wild guessing.",
      "Talks about the idea in kid words.",
      "Turns in a short artifact that matches the lesson focus.",
    ],
  },
  "4.9A": {
    plain: "Kids name why the author wrote it — persuade, inform, or entertain.",
    lookFors: [
      "Picks one purpose and sticks with it.",
      "Points to one clue in the text or ad.",
      "Says the purpose in a calm kid sentence.",
    ],
  },
  "4.6C": {
    plain: "Kids find a text clue that backs up their idea.",
    lookFors: [
      "Underlines or marks one clear piece of evidence.",
      "Connects the clue to their claim in 1–2 sentences.",
      "Doesn’t copy a whole paragraph — just the proof.",
    ],
  },
  "4.10A": {
    plain: "Kids notice how the author shaped the message.",
    lookFors: [
      "Names one craft move (word choice, structure, image).",
      "Ties it back to meaning in kid words.",
      "Shares one notice with a partner.",
    ],
  },
  "5.6A": {
    plain: "Kids explain density with sink / float or heavy-for-size ideas.",
    lookFors: [
      "Predicts, then checks with a calm observation.",
      "Uses “heavy for its size” or similar kid language.",
      "Records one clear finding (not a lab novel).",
    ],
  },
  "5.6B": {
    plain: "Kids tell mixtures from solutions and show how they know.",
    lookFors: [
      "Sorts or labels mixture vs solution with a reason.",
      "Uses observe words (see pieces / can’t see pieces).",
      "Captures claim + one evidence note on a stub poster.",
    ],
  },
  "5.6": {
    plain: "Kids show matter ideas — density, mixtures, or review.",
    lookFors: [
      "Uses a model or observation, not just a label.",
      "Claims + one evidence beat in kid words.",
      "Ready to share a short finding.",
    ],
  },
  "4.7B": {
    plain: "Kids share one clear fact about a Texas region or coast.",
    lookFors: [
      "Names land, people, or a map feature accurately.",
      "Can show it on a map or postcard sketch.",
      "Says it like a visitor — one sentence that sticks.",
    ],
  },
  "4.7": {
    plain: "Kids show Texas regions / map sense with one solid fact.",
    lookFors: [
      "Uses the map instead of guessing the region.",
      "Shares one clear visitor-style fact.",
      "Turns in a short postcard or check that matches.",
    ],
  },
};

/** True when TEKS code has a Standard info stub pack (linkable chip). */
export function hasStandardStub(code) {
  const c = String(code || "").trim();
  return Boolean(c && STANDARD_STUBS[c]);
}

const DEFAULT_LOOK_FORS = [
  "Shows the idea with a model, clue, or short artifact.",
  "Says it in kid words a partner can follow.",
  "Ready to share or turn in when the beat ends.",
];

const TEACH_TIPS_BY_SUBJECT = {
  math: [
    "Model first — strips or number line before the worksheet.",
    "Partner check on Day 2 — one sentence each.",
    "Keep exit postcard tiny; beauty over busywork.",
  ],
  elar: [
    "Read the purpose aloud once before kids sort.",
    "One text clue is enough — don’t hunt the whole page.",
    "Share beat: whisper-read to a partner, then turn in.",
  ],
  science: [
    "Predict → observe → one sentence claim.",
    "Lab mess is fine; the poster stays calm.",
    "Gallery walk = 30 seconds per poster, not a critique.",
  ],
  social: [
    "Start with the map — finger on the region first.",
    "Postcard = picture + one visitor sentence.",
    "Swap with a partner before the turn-in tray.",
  ],
};

/**
 * Resolve Standard info stub from TEKS code (+ optional project id for back).
 */
export function getStandardInfoStub({ code, fromId } = {}) {
  const raw = (code || "").trim() || "stub";
  const decoded = raw === "stub" ? "" : raw;
  const act = fromId ? findActivityById(fromId) : null;
  const sub = act?.subject || guessSubjectFromCode(decoded);
  const subMeta = SUBJECTS[sub] || { name: "Subject", color: "#8B6CFF", unit: "" };
  const pack = STANDARD_STUBS[decoded] || null;
  const plain =
    pack?.plain ||
    (decoded
      ? "Kids show the idea in a short, clear way — model, clue, or artifact."
      : "Add TEKS when ready — teach heart first.");
  const lookFors = pack?.lookFors || DEFAULT_LOOK_FORS;
  const projectHref = fromId ? PROJECT_HREF(fromId) : null;
  const dayHref = act
    ? `/v2/teacher/day?d=${Number(act.day) || 2}`
    : "/v2/teacher/day?d=2";

  return {
    code: decoded || null,
    teksLabel: decoded ? `TEKS ${decoded}` : "TEKS stub · add when ready",
    plain,
    lookFors,
    subject: sub,
    subjectName: subMeta.name,
    subjectColor: subMeta.color,
    unitHint: subMeta.unit || "",
    activityTitle: act?.title || null,
    projectHref,
    dayHref,
    samLine: decoded
      ? `${decoded} · in plain words — glance first.`
      : "Standard stub — glance first, grammar later.",
    fromId: fromId || null,
  };
}

function guessSubjectFromCode(code) {
  if (!code) return "math";
  if (code.startsWith("5.6")) return "science";
  if (code.startsWith("4.9") || code.startsWith("4.6") || code.startsWith("4.10")) return "elar";
  if (code.startsWith("4.7")) return "social";
  if (code.startsWith("4.3")) return "math";
  return "math";
}

/**
 * Resolve Unit teaching guide stub from activity id (hash / from).
 */
export function getUnitGuideStub({ activityId, fromId } = {}) {
  const id = activityId || fromId || null;
  const act = id ? findActivityById(id) : null;
  const sub = act?.subject || "math";
  const subMeta = SUBJECTS[sub] || { name: "Subject", color: "#8B6CFF", unit: "Unit" };
  const unitTitle = subMeta.unit || `${subMeta.name} unit`;
  const span = act ? projectDaysSpan(act.day) : projectDaysSpan(2);
  const cps = act ? checkpointsFor(act, span) : [];
  const spine = buildSpine(act, span, cps, unitTitle);
  const tips = TEACH_TIPS_BY_SUBJECT[sub] || TEACH_TIPS_BY_SUBJECT.math;
  const materials = act
    ? materialsStub(act, span)
    : "Paper + pencil · calm work space · ~15 min/day";
  const projectHref = id ? PROJECT_HREF(id) : null;
  const dayHref = act
    ? `/v2/teacher/day?d=${Number(act.day) || 2}`
    : "/v2/teacher/day?d=2";

  return {
    unitTitle,
    subject: sub,
    subjectName: subMeta.name,
    subjectColor: subMeta.color,
    activityId: id,
    activityTitle: act?.title || null,
    standard: act?.standard || null,
    teksLabel: act?.standard ? `TEKS ${act.standard}` : "TEKS stub",
    spine,
    materials,
    tips: tips.slice(0, 3),
    projectHref,
    dayHref,
    samLine: `${unitTitle} · ${spine.length}-day spine — teach tips whisper.`,
    spanLabel: span.chip || span.label,
  };
}

function buildSpine(act, span, checkpoints, unitTitle) {
  if (checkpoints?.length) {
    return checkpoints.map((cp) => ({
      id: cp.id,
      dayNum: cp.dayNum,
      dayLabel: cp.dayLabel || DAY_NAMES[cp.dayIndex] || `Day ${cp.dayNum}`,
      chip: cp.chip,
      beat: cp.beat,
      detail: cp.detail,
      date: DATES[cp.dayIndex] || "",
    }));
  }
  // Fallback 3-day spine when no activity resolved
  const start = Number(span?.startDay != null ? span.startDay : 2) || 2;
  const labels = ["Launch", "Build", "Share"];
  const beats = [
    "Open the idea together",
    "Kids draft the artifact",
    "Share & turn in",
  ];
  const n = Math.max(3, Math.min(5, Number(span?.days) || 3));
  const out = [];
  for (let i = 0; i < n; i++) {
    const dayIndex = Math.min(4, start + i);
    out.push({
      id: `spine-${i + 1}`,
      dayNum: i + 1,
      dayLabel: DAY_NAMES[dayIndex] || `Day ${i + 1}`,
      chip: labels[i] || `Day ${i + 1}`,
      beat: beats[i] || `${unitTitle} beat`,
      detail: "Stub spine — swap for real unit pacing later.",
      date: DATES[dayIndex] || "",
      weekday: DAYS[dayIndex] || "",
    });
  }
  return out;
}