// Broadcast Booth — Wave 0 catalog (Field Radio / voice-first).
// Beats are FIXED site-wide; teacher sets prompt (+ side labels for Debate) via case content.

export const CLIP_CAP_SEC = 20; // short caps ~15–25s
export const MIN_CLIP_SEC = 2;

export const SEGMENT_TYPES = {
  explain: {
    id: "explain",
    label: "Explain it live",
    blurb: "Hook → Big idea → Show me → Sign off",
    beats: [
      { id: "hook", label: "Hook", cue: "Open strong. Grab the listener in one breath.", stillRequired: false },
      { id: "big_idea", label: "Big idea", cue: "Say the big idea clearly in your own words.", stillRequired: true },
      { id: "show_me", label: "Show me", cue: "Give one clear example or proof.", stillRequired: true },
      { id: "sign_off", label: "Sign off", cue: "Wrap it up. Sign off like a field reporter.", stillRequired: false },
    ],
  },
  correspondent: {
    id: "correspondent",
    label: "Correspondent",
    blurb: "Where → What I noticed → Why it matters → Sign off",
    beats: [
      { id: "where", label: "Where", cue: "Set the scene. Where are you reporting from?", stillRequired: true },
      { id: "what_noticed", label: "What I noticed", cue: "Describe the artifact or detail you noticed.", stillRequired: true },
      { id: "why_matters", label: "Why it matters", cue: "Why should listeners care?", stillRequired: false },
      { id: "sign_off", label: "Sign off", cue: "Sign off from the field.", stillRequired: false },
    ],
  },
  debate: {
    id: "debate",
    label: "Debate",
    blurb: "Side A → Side B → What I think now → Sign off",
    beats: [
      { id: "side_a", label: "Side A", cue: "Make Side A’s best case.", stillRequired: false },
      { id: "side_b", label: "Side B", cue: "Make Side B’s best case.", stillRequired: false },
      { id: "what_i_think", label: "What I think now", cue: "What do you think after hearing both sides?", stillRequired: false },
      { id: "sign_off", label: "Sign off", cue: "Sign off your debate segment.", stillRequired: false },
    ],
  },
};

/** Soft keyword list for Needs a look stub (Wave 0). */
export const SAFETY_KEYWORDS = [
  "kill", "suicide", "bomb", "gun", "shoot", "hate", "idiot", "stupid",
];

export function beatsForSegment(segmentType) {
  const seg = SEGMENT_TYPES[segmentType] || SEGMENT_TYPES.explain;
  return seg.beats.map((b) => ({ ...b }));
}

export function resolveDebateLabels(caseRow, assignmentConfig) {
  const cfg = assignmentConfig && typeof assignmentConfig === "object" ? assignmentConfig : {};
  const sideA = String(cfg.sideALabel || caseRow?.sideALabel || "Side A").trim() || "Side A";
  const sideB = String(cfg.sideBLabel || caseRow?.sideBLabel || "Side B").trim() || "Side B";
  return { sideA, sideB };
}

export function labeledBeats(caseRow, assignmentConfig) {
  const segmentType = (caseRow && caseRow.segmentType) || "explain";
  const beats = beatsForSegment(segmentType);
  if (segmentType !== "debate") return beats;
  const { sideA, sideB } = resolveDebateLabels(caseRow, assignmentConfig);
  return beats.map((b) => {
    if (b.id === "side_a") return { ...b, label: sideA, cue: `Make ${sideA}’s best case.` };
    if (b.id === "side_b") return { ...b, label: sideB, cue: `Make ${sideB}’s best case.` };
    return b;
  });
}

const DESERT_EXPLAIN = {
  id: "SCI.3.13A-BB",
  standard: "SCI.3.13A-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.13A",
  kicker: "Broadcast Booth · Explain it live",
  title: "Desert Radio: How does a cactus survive?",
  estimatedMinutes: 28,
  segmentType: "explain",
  topic: "Desert adaptations",
  prompt:
    "You are live on Field Radio. Explain how a cactus survives in the desert. Use Hook → Big idea → Show me → Sign off.",
  cover: {
    headline: "Field Radio — Desert Desk",
    line: "Pocket recorder ready. Four short clips. No faces on camera — voice only.",
  },
  // G3 lighter stimulus pack
  stimulus: {
    gradeBand: "G3",
    title: "Cactus field notes",
    readAloud: true,
    bullets: [
      "Deserts get very little rain.",
      "A cactus stores water in its thick stem.",
      "Spines help shade the plant and keep animals away.",
      "Wide or deep roots soak up rain fast when it falls.",
    ],
  },
  samOpen: "Read the field notes, tap I’m ready, then record one beat at a time.",
  learning_target: "I can explain how a cactus survives in the desert using clear spoken ideas.",
  lesson_summary:
    "Students hear a short stimulus, then record four Explain beats (Hook, Big idea, Show me, Sign off). Optional stills on Big idea and Show me. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Wave 0 seeds Explain. Correspondent and Debate are wired in data/UI; more cases come later.",
};

const CASES = {
  [DESERT_EXPLAIN.standard]: DESERT_EXPLAIN,
};

export function listBroadcastBoothCases() {
  return Object.values(CASES);
}

export function getBroadcastBoothCase(standard) {
  return CASES[standard] || null;
}

export function defaultBroadcastConfig(caseRow) {
  const base = caseRow || DESERT_EXPLAIN;
  return {
    prompt: base.prompt,
    segmentType: base.segmentType || "explain",
    sideALabel: base.sideALabel || "Side A",
    sideBLabel: base.sideBLabel || "Side B",
  };
}

export function resolveBroadcastConfig(standard, assignmentConfig) {
  const caseRow = getBroadcastBoothCase(standard) || DESERT_EXPLAIN;
  const defaults = defaultBroadcastConfig(caseRow);
  const cfg = assignmentConfig && typeof assignmentConfig === "object" ? assignmentConfig : {};
  return {
    prompt: String(cfg.prompt || defaults.prompt || "").trim() || defaults.prompt,
    segmentType: String(cfg.segmentType || defaults.segmentType || "explain"),
    sideALabel: String(cfg.sideALabel || defaults.sideALabel || "Side A").trim() || "Side A",
    sideBLabel: String(cfg.sideBLabel || defaults.sideBLabel || "Side B").trim() || "Side B",
  };
}

export function publicBroadcastBoothCase(standard) {
  const c = getBroadcastBoothCase(standard);
  if (!c) return null;
  const config = defaultBroadcastConfig(c);
  const beats = labeledBeats(c, config);
  return {
    standard: c.standard,
    engine: "broadcast_booth",
    grade: c.grade,
    subject: c.subject,
    kicker: c.kicker,
    title: c.title,
    estimatedMinutes: c.estimatedMinutes,
    segmentType: c.segmentType,
    segmentLabel: (SEGMENT_TYPES[c.segmentType] || SEGMENT_TYPES.explain).label,
    samOpen: c.samOpen,
    cover: c.cover || null,
    stimulus: c.stimulus || null,
    prompt: c.prompt,
    beats,
    config,
    clipCapSec: CLIP_CAP_SEC,
    minClipSec: MIN_CLIP_SEC,
  };
}

export { DESERT_EXPLAIN };
