// Broadcast Booth — Wave 0 catalog (Field Radio / voice-first).
// Beats are FIXED site-wide; teacher sets prompt (+ side labels for Debate) via case content.
// Brainstorm (circle/bubble map) is locked before recording — chips only, no typing.

export const CLIP_CAP_SEC = 20; // short caps ~15–25s
export const MIN_CLIP_SEC = 2;

/** Explain Wave 0 minimum: ≥1 chip on Big idea AND ≥1 on Show me. Hook & Sign off encouraged. */
export const BRAINSTORM_MIN_EXPLAIN = {
  requiredBeatIds: ["big_idea", "show_me"],
  minPerBeat: 1,
  emptyHint: "Add ideas to Big idea and Show me before recording",
};

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

export function brainstormMinForCase(caseRow) {
  if (caseRow && caseRow.brainstormMin) return caseRow.brainstormMin;
  const segmentType = (caseRow && caseRow.segmentType) || "explain";
  if (segmentType === "explain") return BRAINSTORM_MIN_EXPLAIN;
  // Soft fallback for future segments: require 1 chip on first two beats
  const beats = beatsForSegment(segmentType);
  return {
    requiredBeatIds: beats.slice(0, 2).map((b) => b.id),
    minPerBeat: 1,
    emptyHint: "Add ideas to your map before recording",
  };
}

/** Empty brainstorm map keyed by beat id. */
export function emptyBrainstormMap(beatDefs) {
  const out = {};
  for (const b of beatDefs || []) out[b.id] = [];
  return out;
}

/**
 * Normalize persisted brainstorm map: { [beatId]: [{ id, label, source? }] }
 */
export function normalizeBrainstormMap(raw, beatDefs) {
  const incoming = raw && typeof raw === "object" ? raw : {};
  const out = emptyBrainstormMap(beatDefs);
  for (const b of beatDefs || []) {
    const list = incoming[b.id];
    if (!Array.isArray(list)) continue;
    out[b.id] = list
      .filter((c) => c && typeof c === "object" && typeof c.label === "string" && c.label.trim())
      .slice(0, 12)
      .map((c) => ({
        id: String(c.id || c.label).slice(0, 80),
        label: String(c.label).trim().slice(0, 80),
        source: c.source === "stem" ? "stem" : "stimulus",
      }));
  }
  return out;
}

export function brainstormMeetsMinimum(map, caseRow, beatDefs) {
  const min = brainstormMinForCase(caseRow);
  const required = min.requiredBeatIds || [];
  const need = Math.max(1, Number(min.minPerBeat) || 1);
  const slots = map && typeof map === "object" ? map : {};
  for (const id of required) {
    const list = Array.isArray(slots[id]) ? slots[id] : [];
    if (list.length < need) return false;
  }
  // If no required list but we have beats, require at least one chip somewhere
  if (!required.length && beatDefs && beatDefs.length) {
    return beatDefs.some((b) => Array.isArray(slots[b.id]) && slots[b.id].length > 0);
  }
  return true;
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
  // Wave 0 brainstorm: tap/drag chips only — no typing
  brainstormChips: [
    { id: "chip_little_rain", label: "little rain", source: "stimulus" },
    { id: "chip_stores_water", label: "stores water", source: "stimulus" },
    { id: "chip_thick_stem", label: "thick stem", source: "stimulus" },
    { id: "chip_spines", label: "spines", source: "stimulus" },
    { id: "chip_shade", label: "shade the plant", source: "stimulus" },
    { id: "chip_keep_animals", label: "keep animals away", source: "stimulus" },
    { id: "chip_deep_roots", label: "deep roots", source: "stimulus" },
    { id: "chip_wide_roots", label: "wide roots", source: "stimulus" },
    { id: "chip_soak_rain", label: "soak up rain fast", source: "stimulus" },
    { id: "chip_hot_dry", label: "hot and dry", source: "stimulus" },
  ],
  beatStems: {
    hook: [
      { id: "stem_hook_1", label: "Imagine almost no rain…" },
      { id: "stem_hook_2", label: "Live from the desert desk!" },
      { id: "stem_hook_3", label: "How does anything survive here?" },
      { id: "stem_hook_4", label: "Picture a prickly green tower…" },
    ],
    big_idea: [
      { id: "stem_big_1", label: "A cactus is built to save water" },
      { id: "stem_big_2", label: "Desert plants have adaptations" },
      { id: "stem_big_3", label: "Survive with little rain" },
      { id: "stem_big_4", label: "Special parts help it live" },
    ],
    show_me: [
      { id: "stem_show_1", label: "Stores water in its thick stem" },
      { id: "stem_show_2", label: "Spines shade and protect it" },
      { id: "stem_show_3", label: "Deep roots soak up rain fast" },
      { id: "stem_show_4", label: "Wide roots catch water when it falls" },
    ],
    sign_off: [
      { id: "stem_off_1", label: "That's how a cactus makes it" },
      { id: "stem_off_2", label: "Back to you from Field Radio" },
      { id: "stem_off_3", label: "Signing off from the desert" },
      { id: "stem_off_4", label: "This is Desert Desk — over and out" },
    ],
  },
  brainstormMin: BRAINSTORM_MIN_EXPLAIN,
  samOpen: "Read the field notes, tap I’m ready, plan your circle map, then record one beat at a time.",
  learning_target: "I can explain how a cactus survives in the desert using clear spoken ideas.",
  lesson_summary:
    "Students hear a short stimulus, build a chip-only circle map (Hook / Big idea / Show me / Sign off), then record four Explain beats. Recorder locked until Big idea and Show me each have at least one chip. Optional stills on Big idea and Show me. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Wave 0 seeds Explain + locked brainstorm. Correspondent and Debate are wired in data/UI; more cases come later.",
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
  const brainstormMin = brainstormMinForCase(c);
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
    topic: c.topic || c.title,
    samOpen: c.samOpen,
    cover: c.cover || null,
    stimulus: c.stimulus || null,
    prompt: c.prompt,
    beats,
    brainstormChips: Array.isArray(c.brainstormChips) ? c.brainstormChips.map((x) => ({ ...x })) : [],
    beatStems: c.beatStems && typeof c.beatStems === "object"
      ? Object.fromEntries(
          Object.entries(c.beatStems).map(([k, arr]) => [
            k,
            Array.isArray(arr) ? arr.map((x) => ({ ...x })) : [],
          ])
        )
      : {},
    brainstormMin,
    config,
    clipCapSec: CLIP_CAP_SEC,
    minClipSec: MIN_CLIP_SEC,
  };
}

export { DESERT_EXPLAIN };
