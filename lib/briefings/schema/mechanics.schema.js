// Briefings v2 — reusable practice-mechanic contracts.
// Locked Sept 14, 2026 out of the "My Briefings" foundation conversation.
//
// WHY THIS FILE EXISTS: today, Ops Choice is bespoke logic baked straight
// into the 2,300-line BriefingClient for one specific lesson's mechanic.
// That doesn't scale to 3 grades × 2 subjects. Every practice phase in a
// lesson (SS or Science) must now pick its mechanic from this fixed menu —
// a generic, data-driven component per mechanic — instead of a lesson
// inventing new UI. This is also exactly what an AI generator needs: a
// closed set of shapes it's allowed to fill in, not a blank canvas.
//
// SAME PUBLIC/SERVER SPLIT AS TODAY'S REASON SORT: the answer key never
// ships in the client bundle. Each mechanic below has a `public` shape
// (prompts, labels, art, distractors — anything a student sees before
// answering) and a `server` shape (the answer key — correct pairing,
// order, hotspot label, or true/false + reason). The existing
// SS-3-2A-BR.server.js already does this for Reason Sort; every new
// mechanic follows the same split.
//
// RUNTIME NOTE (updated once BriefingClient.js was actually wired up):
// a mechanic's id is used DIRECTLY as its phase id in a lesson's `phases`
// array (e.g. "matchPairs", not a generic "practice" wrapper) — same
// convention "reasonSort" already uses. Its public content lives at
// PUBLIC_BRIEFING[mechanicId] (e.g. `matchPairs: {...}`), its answer key
// at SERVER_BRIEFING[mechanicId] (e.g. `matchPairs: { answerKey: {...} }`).

// The fixed menu a lesson's practice phase(s) may pick from.
// "reasonSort" is the one mechanic that shipped in v1 (kept as-is).
// The other four are new, agreed on in the Sept 14 mechanics discussion.
export const PRACTICE_MECHANICS = [
  "reasonSort",
  "matchPairs",
  "sequenceIt",
  "labelPicture",
  "trueFalseReason",
];

// --- Per-mechanic data contracts ------------------------------------------
// Each entry documents the public-pack shape (what ships to the browser)
// and the server-pack shape (the answer key, loaded only for grading).

export const MECHANIC_SHAPES = {
  reasonSort: {
    description:
      "Drag/tap clues into labeled bins (kept from v1 — SS-3-2A/2B already use this).",
    public: {
      title: "string",
      kidPrompt: "string",
      helpWrong: "string — shown on a wrong sort, encourages a retry",
      helpPass: "string — shown once all items are sorted correctly",
      bins: "[{ id, label, emoji, color }]",
      items: "[{ id, text }] — no correct-bin id here, see server pack",
    },
    server: {
      // NOTE: reasonSort is the one mechanic whose key is called "answers",
      // not "answerKey" — it shipped in v1 before the other four existed and
      // app/api/briefing/grade/route.js reads `server.reasonSort.answers`.
      // This line used to say "answerKey", which is what the route does NOT
      // read; a lesson written from that would have had every clue marked
      // wrong. Corrected Sept 14, 2026. crossCheck.schema.js now catches it.
      answers: "{ [itemId]: binId }",
    },
  },

  matchPairs: {
    description:
      "Tap/connect two related things (e.g. a vocabulary term and its plain-language meaning, or a clue and the reason it supports).",
    public: {
      title: "string",
      kidPrompt: "string",
      helpWrong: "string",
      helpPass: "string",
      leftItems: "[{ id, text, icon? }] — shown as the left/top column, shuffled at render",
      rightItems: "[{ id, text, icon? }] — shown as the right/bottom column, shuffled at render",
    },
    server: {
      // Which rightItem id is the correct match for each leftItem id.
      answerKey: "{ [leftItemId]: rightItemId }",
    },
  },

  sequenceIt: {
    description:
      "Put 3-5 steps/events in the correct order (e.g. how a community grows, water changing state, the steps of a process).",
    public: {
      title: "string",
      kidPrompt: "string",
      helpWrong: "string",
      helpPass: "string",
      // Steps ship in a SHUFFLED public order; correct order is server-side only.
      steps: "[{ id, text, icon? }]",
    },
    server: {
      // Ordered list of step ids, first-to-last.
      correctOrder: "[stepId, stepId, ...]",
    },
  },

  labelPicture: {
    description:
      "Tap a hotspot on an image, then place the right label on it (prior art: Claude outputs/hotspot_check_new.png — a console with several tap targets). Good fit for anything with visible parts (a community's buildings, matter's containers, a map).",
    public: {
      title: "string",
      kidPrompt: "string",
      helpWrong: "string",
      helpPass: "string",
      imageKey: "string — key into the lesson's `art` map",
      hotspots: "[{ id, x, y }] — x/y as % of image width/height, no labels here",
      wordBank: "[{ id, text }] — the labels a student drags/taps onto a hotspot, shuffled",
    },
    server: {
      // Which wordBank id belongs on each hotspot id.
      answerKey: "{ [hotspotId]: wordBankId }",
    },
  },

  trueFalseReason: {
    description:
      "True/False, but every answer — right or wrong — surfaces a one-line reason, so it doubles as a mini re-teach instead of a bare check mark. Distinct from the Clearance quiz's explained multiple-choice items.",
    public: {
      title: "string",
      kidPrompt: "string",
      statements: "[{ id, text }]",
    },
    server: {
      // Truth + the one-line reason shown after the student answers (both
      // when right and when wrong — the reason is instructional, not a
      // reveal-only-on-fail hint).
      answerKey: "{ [statementId]: { isTrue: boolean, reason: 'string, <=1 sentence' } }",
    },
  },
};

// Minimal, dependency-free shape check — enough to catch a malformed
// AI draft or a typo'd mechanic name before it reaches the checker script
// or the player. Not a full JSON-Schema validator on purpose (see
// package.json — this repo carries no schema-validation dependency).
export function validateMechanicPublicData(mechanicType, data) {
  const errors = [];
  if (!PRACTICE_MECHANICS.includes(mechanicType)) {
    errors.push(`Unknown mechanic type "${mechanicType}". Must be one of: ${PRACTICE_MECHANICS.join(", ")}`);
    return errors;
  }
  if (!data || typeof data !== "object") {
    errors.push(`${mechanicType}: missing data object`);
    return errors;
  }
  if (!data.title) errors.push(`${mechanicType}: missing title`);
  if (!data.kidPrompt) errors.push(`${mechanicType}: missing kidPrompt`);

  const arrayFieldByMechanic = {
    reasonSort: ["bins", "items"],
    matchPairs: ["leftItems", "rightItems"],
    sequenceIt: ["steps"],
    labelPicture: ["hotspots", "wordBank"],
    trueFalseReason: ["statements"],
  };
  for (const field of arrayFieldByMechanic[mechanicType] || []) {
    if (!Array.isArray(data[field]) || data[field].length === 0) {
      errors.push(`${mechanicType}: "${field}" must be a non-empty array`);
    }
  }
  return errors;
}
