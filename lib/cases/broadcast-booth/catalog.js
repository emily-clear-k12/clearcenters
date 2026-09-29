// Broadcast Booth — Wave 0 catalog (Field Radio / voice-first).
// Beats are FIXED site-wide; teacher sets prompt (+ side labels for Debate) via case content.
// Brainstorm (storyboard trays) is locked before recording — chips only, no typing.

import { WAVE1_CASES } from "./wave1.js";

export const CLIP_CAP_SEC = 20; // short caps ~15–25s
export const MIN_CLIP_SEC = 2;

/** Explain Wave 0 minimum: ≥1 chip on Big idea AND ≥1 on Show me. Hook & Sign off encouraged. */
export const BRAINSTORM_MIN_EXPLAIN = {
  requiredBeatIds: ["big_idea", "show_me"],
  minPerBeat: 1,
  emptyHint: "Add ideas to Big idea and Show me before recording",
};

/** Correspondent: ≥1 chip on What I noticed AND ≥1 on Why it matters. */
export const BRAINSTORM_MIN_CORRESPONDENT = {
  requiredBeatIds: ["what_noticed", "why_matters"],
  minPerBeat: 1,
  emptyHint: "Add ideas to What I noticed and Why it matters before recording",
};

/** Debate: ≥1 chip on Side A AND ≥1 on Side B. */
export const BRAINSTORM_MIN_DEBATE = {
  requiredBeatIds: ["side_a", "side_b"],
  minPerBeat: 1,
  emptyHint: "Add ideas to both sides before recording",
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
  if (segmentType === "correspondent") return BRAINSTORM_MIN_CORRESPONDENT;
  if (segmentType === "debate") return BRAINSTORM_MIN_DEBATE;
  // Soft fallback: require 1 chip on first two beats
  const beats = beatsForSegment(segmentType);
  return {
    requiredBeatIds: beats.slice(0, 2).map((b) => b.id),
    minPerBeat: 1,
    emptyHint: "Add ideas to your storyboard before recording",
  };
}

/** Empty brainstorm map keyed by beat id. */
export function emptyBrainstormMap(beatDefs) {
  const out = {};
  for (const b of beatDefs || []) out[b.id] = [];
  return out;
}

/**
 * Normalize persisted brainstorm map: { [beatId]: [{ id, label, source?, imageUrl?, imageId? }] }
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
      .map((c) => {
        const chip = {
          id: String(c.id || c.label).slice(0, 80),
          label: String(c.label).trim().slice(0, 80),
          source: c.source === "stem" ? "stem" : "stimulus",
        };
        const imageUrl = typeof c.imageUrl === "string" ? c.imageUrl.trim() : "";
        const imageId = typeof c.imageId === "string" ? c.imageId.trim() : "";
        if (imageUrl) chip.imageUrl = imageUrl.slice(0, 240);
        if (imageId) chip.imageId = imageId.slice(0, 80);
        return chip;
      });
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
  // Wave 0 brainstorm: image-first chips (+ short labels). Tap/drag only — no typing
  brainstormChips: [
    { id: "chip_little_rain", label: "little rain", source: "stimulus", imageId: "bb-little-rain", imageUrl: "/maker/broadcast/bb-little-rain.png" },
    { id: "chip_stores_water", label: "stores water", source: "stimulus", imageId: "bb-stores-water", imageUrl: "/maker/broadcast/bb-stores-water.png" },
    { id: "chip_thick_stem", label: "thick stem", source: "stimulus", imageId: "bb-thick-stem", imageUrl: "/maker/broadcast/bb-thick-stem.png" },
    { id: "chip_spines", label: "spines", source: "stimulus", imageId: "bb-spines", imageUrl: "/maker/broadcast/bb-spines.png" },
    { id: "chip_shade", label: "shade the plant", source: "stimulus", imageId: "bb-shade", imageUrl: "/maker/broadcast/bb-shade.png" },
    { id: "chip_keep_animals", label: "keep animals away", source: "stimulus", imageId: "bb-animals-away", imageUrl: "/maker/broadcast/bb-animals-away.png" },
    { id: "chip_deep_roots", label: "deep roots", source: "stimulus", imageId: "bb-deep-roots", imageUrl: "/maker/broadcast/bb-deep-roots.png" },
    { id: "chip_wide_roots", label: "wide roots", source: "stimulus", imageId: "bb-wide-roots", imageUrl: "/maker/broadcast/bb-wide-roots.png" },
    { id: "chip_soak_rain", label: "soak up rain fast", source: "stimulus", imageId: "bb-soak-rain", imageUrl: "/maker/broadcast/bb-soak-rain.png" },
    { id: "chip_hot_dry", label: "hot and dry", source: "stimulus", imageId: "bb-hot-dry", imageUrl: "/maker/broadcast/bb-hot-dry.png" },
  ],
  beatStems: {
    hook: [
      { id: "stem_hook_1", label: "almost no rain", source: "stem", imageId: "bb-little-rain", imageUrl: "/maker/broadcast/bb-little-rain.png" },
      { id: "stem_hook_2", label: "desert desk live", source: "stem", imageId: "bb-field-radio", imageUrl: "/maker/broadcast/bb-field-radio.png" },
      { id: "stem_hook_3", label: "How does anything survive here?", source: "stem" },
      { id: "stem_hook_4", label: "prickly green tower", source: "stem", imageId: "bb-cactus", imageUrl: "/maker/broadcast/bb-cactus.png" },
    ],
    big_idea: [
      { id: "stem_big_1", label: "built to save water", source: "stem", imageId: "bb-stores-water", imageUrl: "/maker/broadcast/bb-stores-water.png" },
      { id: "stem_big_2", label: "adaptations", source: "stem", imageId: "bb-adaptations", imageUrl: "/maker/broadcast/bb-adaptations.png" },
      { id: "stem_big_3", label: "survive with little rain", source: "stem", imageId: "bb-survive", imageUrl: "/maker/broadcast/bb-survive.png" },
      { id: "stem_big_4", label: "special parts help", source: "stem", imageId: "bb-adaptations", imageUrl: "/maker/broadcast/bb-adaptations.png" },
    ],
    show_me: [
      { id: "stem_show_1", label: "water in thick stem", source: "stem", imageId: "bb-stores-water", imageUrl: "/maker/broadcast/bb-stores-water.png" },
      { id: "stem_show_2", label: "spines shade & protect", source: "stem", imageId: "bb-spines", imageUrl: "/maker/broadcast/bb-spines.png" },
      { id: "stem_show_3", label: "deep roots soak rain", source: "stem", imageId: "bb-deep-roots", imageUrl: "/maker/broadcast/bb-deep-roots.png" },
      { id: "stem_show_4", label: "wide roots catch water", source: "stem", imageId: "bb-wide-roots", imageUrl: "/maker/broadcast/bb-wide-roots.png" },
    ],
    sign_off: [
      { id: "stem_off_1", label: "That's how a cactus makes it", source: "stem" },
      { id: "stem_off_2", label: "Back to you", source: "stem", imageId: "bb-radio-mic", imageUrl: "/maker/broadcast/bb-radio-mic.png" },
      { id: "stem_off_3", label: "Signing off from the desert", source: "stem" },
      { id: "stem_off_4", label: "Desert Desk — over and out", source: "stem" },
    ],
  },
  brainstormMin: BRAINSTORM_MIN_EXPLAIN,
  samOpen: "Read the field notes, plan your storyboard trays, then record one beat at a time.",
  learning_target: "I can explain how a cactus survives in the desert using clear spoken ideas.",
  lesson_summary:
    "Students hear a short stimulus (visible while planning), place image chips onto storyboard trays (Hook / Big idea / Show me / Sign off), then record four Explain beats. Recorder locked until Big idea and Show me each have at least one chip. Optional stills on Big idea and Show me. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Wave 0 seeds Explain + locked brainstorm. Correspondent and Debate are wired in data/UI; more cases come later.",
};


const CREEK_CORRESPONDENT = {
  id: "SCI.3.12B-BB",
  standard: "SCI.3.12B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.12B",
  kicker: "Broadcast Booth · Correspondent",
  title: "Creek Desk: Reporting from a Texas creek",
  estimatedMinutes: 28,
  segmentType: "correspondent",
  topic: "Creek habitat & food chains",
  prompt:
    "You are live from a Texas creek. Report Where you are, What you noticed, Why it matters, then Sign off.",
  cover: {
    headline: "Field Radio — Creek Desk",
    line: "You-are-here kit ready. Place still + artifact card on the left. Four short clips — voice only.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Creek field kit",
    readAloud: true,
    sceneSetter:
      "You are here on the bank of a shallow Texas creek. Clear water slides over smooth rocks. Shade pools hide under bank plants.",
    placeStill: {
      imageUrl: "/maker/broadcast/bb-creek-bank.png",
      caption: "Creek bank — you are here",
    },
    artifactCard: {
      title: "Ranger note card",
      body: "Minnows dart in the sunny riffle. Duckweed floats in the quiet pool. Roots hold the muddy bank so it does not wash away.",
      imageUrl: "/maker/broadcast/bb-creek-sign.png",
    },
    bullets: [
      "Energy moves: plants → small fish → bigger hunters.",
      "Shade and roots help living things stay safe.",
      "If the creek gets cloudy or hot, the food chain can wobble.",
    ],
  },
  brainstormChips: [
    { id: "chip_clear_water", label: "clear water", source: "stimulus", imageId: "bb-clear-water", imageUrl: "/maker/broadcast/bb-clear-water.png" },
    { id: "chip_smooth_rocks", label: "smooth rocks", source: "stimulus", imageId: "bb-smooth-rocks", imageUrl: "/maker/broadcast/bb-smooth-rocks.png" },
    { id: "chip_minnows", label: "minnows", source: "stimulus", imageId: "bb-minnows", imageUrl: "/maker/broadcast/bb-minnows.png" },
    { id: "chip_bank_plants", label: "bank plants", source: "stimulus", imageId: "bb-bank-plants", imageUrl: "/maker/broadcast/bb-bank-plants.png" },
    { id: "chip_duckweed", label: "duckweed", source: "stimulus", imageId: "bb-duckweed", imageUrl: "/maker/broadcast/bb-duckweed.png" },
    { id: "chip_shaded_pool", label: "shaded pool", source: "stimulus", imageId: "bb-shaded-pool", imageUrl: "/maker/broadcast/bb-shaded-pool.png" },
    { id: "chip_riparian_roots", label: "roots hold bank", source: "stimulus", imageId: "bb-riparian-roots", imageUrl: "/maker/broadcast/bb-riparian-roots.png" },
    { id: "chip_moving_water", label: "moving water", source: "stimulus", imageId: "bb-moving-water", imageUrl: "/maker/broadcast/bb-moving-water.png" },
    { id: "chip_creek_habitat", label: "creek habitat", source: "stimulus", imageId: "bb-creek-habitat", imageUrl: "/maker/broadcast/bb-creek-habitat.png" },
    { id: "chip_willow_shade", label: "willow shade", source: "stimulus", imageId: "bb-willow-shade", imageUrl: "/maker/broadcast/bb-willow-shade.png" },
  ],
  beatStems: {
    where: [
      { id: "stem_where_1", label: "Texas creek bank", source: "stem", imageId: "bb-creek-bank", imageUrl: "/maker/broadcast/bb-creek-bank.png" },
      { id: "stem_where_2", label: "shallow sunny riffle", source: "stem", imageId: "bb-clear-water", imageUrl: "/maker/broadcast/bb-clear-water.png" },
      { id: "stem_where_3", label: "standing by the willow", source: "stem", imageId: "bb-willow-shade", imageUrl: "/maker/broadcast/bb-willow-shade.png" },
      { id: "stem_where_4", label: "Field Radio — Creek Desk", source: "stem", imageId: "bb-field-radio", imageUrl: "/maker/broadcast/bb-field-radio.png" },
    ],
    what_noticed: [
      { id: "stem_noticed_1", label: "minnows in the riffle", source: "stem", imageId: "bb-minnows", imageUrl: "/maker/broadcast/bb-minnows.png" },
      { id: "stem_noticed_2", label: "duckweed on the pool", source: "stem", imageId: "bb-duckweed", imageUrl: "/maker/broadcast/bb-duckweed.png" },
      { id: "stem_noticed_3", label: "roots gripping mud", source: "stem", imageId: "bb-riparian-roots", imageUrl: "/maker/broadcast/bb-riparian-roots.png" },
      { id: "stem_noticed_4", label: "smooth rocks underfoot", source: "stem", imageId: "bb-smooth-rocks", imageUrl: "/maker/broadcast/bb-smooth-rocks.png" },
    ],
    why_matters: [
      { id: "stem_why_1", label: "plants feed small fish", source: "stem", imageId: "bb-bank-plants", imageUrl: "/maker/broadcast/bb-bank-plants.png" },
      { id: "stem_why_2", label: "shade keeps water cooler", source: "stem", imageId: "bb-shaded-pool", imageUrl: "/maker/broadcast/bb-shaded-pool.png" },
      { id: "stem_why_3", label: "food chain can wobble", source: "stem", imageId: "bb-creek-habitat", imageUrl: "/maker/broadcast/bb-creek-habitat.png" },
      { id: "stem_why_4", label: "healthy creek = homes", source: "stem", imageId: "bb-moving-water", imageUrl: "/maker/broadcast/bb-moving-water.png" },
    ],
    sign_off: [
      { id: "stem_off_c1", label: "Back to you from the creek", source: "stem", imageId: "bb-radio-mic", imageUrl: "/maker/broadcast/bb-radio-mic.png" },
      { id: "stem_off_c2", label: "Creek Desk — over and out", source: "stem" },
      { id: "stem_off_c3", label: "Signing off by the willow", source: "stem", imageId: "bb-willow-shade", imageUrl: "/maker/broadcast/bb-willow-shade.png" },
      { id: "stem_off_c4", label: "That's the creek story today", source: "stem" },
    ],
  },
  brainstormMin: BRAINSTORM_MIN_CORRESPONDENT,
  overlayStills: {
    where: { imageUrl: "/maker/broadcast/bb-creek-bank.png", caption: "Creek bank" },
    what_noticed: { imageUrl: "/maker/broadcast/bb-minnows.png", caption: "Minnows in the riffle" },
  },
  samOpen: "Read the creek kit, fill What I noticed and Why it matters, then record one beat at a time.",
  learning_target: "I can report from a creek habitat and tell how living things connect in a food chain.",
  lesson_summary:
    "Students use a you-are-here scene setter, place still, and artifact card, then place chips on Correspondent trays (Where / What I noticed / Why it matters / Sign off). Recorder unlocks when What I noticed and Why it matters each have ≥1 chip. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Correspondent seed. Unlock trays are What I noticed + Why it matters (not Where). Keep Desert Radio Explain seed unchanged.",
};

const SCHOOLYARD_DEBATE = {
  id: "SCI.3.11B-BB",
  standard: "SCI.3.11B-BB",
  engine: "broadcast_booth",
  grade: 3,
  subject: "Science",
  teks: "SCI.3.11B",
  kicker: "Broadcast Booth · Debate",
  title: "Schoolyard Debate: Shade trees or more playground?",
  estimatedMinutes: 28,
  segmentType: "debate",
  topic: "Conserving resources vs play space",
  sideALabel: "More shade trees",
  sideBLabel: "More playground",
  prompt:
    "Live debate: Should the empty schoolyard lot become more shade trees or more playground? Cover Side A, Side B, What I think now, then Sign off.",
  cover: {
    headline: "Field Radio — Schoolyard Debate",
    line: "Shared context plus two mini-briefs. Fair cases for both sides. Voice only — no faces.",
  },
  stimulus: {
    gradeBand: "G3",
    title: "Schoolyard meeting notes",
    readAloud: true,
    sharedContext:
      "Our school has one empty lot. The class must choose: plant more shade trees, or add more playground space. Both ideas help kids — in different ways.",
    sideBriefs: {
      sideA: {
        label: "More shade trees",
        bullets: [
          "Trees cool the yard on hot days.",
          "Leaves and roots help the ground and clean the air.",
          "Birds and bugs can use trees as homes.",
        ],
      },
      sideB: {
        label: "More playground",
        bullets: [
          "Kids need room to run, climb, and play hard.",
          "Open space fits more friends at once.",
          "A bigger play area can make recess fairer for everyone.",
        ],
      },
    },
  },
  brainstormChips: [
    { id: "chip_shade_tree", label: "shade tree", source: "stimulus", imageId: "bb-shade-tree", imageUrl: "/maker/broadcast/bb-shade-tree.png" },
    { id: "chip_cool_shade", label: "cool shade", source: "stimulus", imageId: "bb-cool-shade", imageUrl: "/maker/broadcast/bb-cool-shade.png" },
    { id: "chip_bird_home", label: "bird home", source: "stimulus", imageId: "bb-bird-home", imageUrl: "/maker/broadcast/bb-bird-home.png" },
    { id: "chip_clean_air", label: "cleaner air", source: "stimulus", imageId: "bb-clean-air", imageUrl: "/maker/broadcast/bb-clean-air.png" },
    { id: "chip_leaf_cover", label: "leaf cover", source: "stimulus", imageId: "bb-leaf-cover", imageUrl: "/maker/broadcast/bb-leaf-cover.png" },
    { id: "chip_play_space", label: "play space", source: "stimulus", imageId: "bb-play-space", imageUrl: "/maker/broadcast/bb-play-space.png" },
    { id: "chip_climbing", label: "climbing", source: "stimulus", imageId: "bb-climbing", imageUrl: "/maker/broadcast/bb-climbing.png" },
    { id: "chip_running", label: "running room", source: "stimulus", imageId: "bb-running", imageUrl: "/maker/broadcast/bb-running.png" },
    { id: "chip_open_field", label: "open field", source: "stimulus", imageId: "bb-open-field", imageUrl: "/maker/broadcast/bb-open-field.png" },
    { id: "chip_recess_fun", label: "recess fun", source: "stimulus", imageId: "bb-recess-fun", imageUrl: "/maker/broadcast/bb-recess-fun.png" },
    { id: "chip_hot_sun", label: "hot sun", source: "stimulus", imageId: "bb-hot-sun", imageUrl: "/maker/broadcast/bb-hot-sun.png" },
    { id: "chip_schoolyard", label: "schoolyard lot", source: "stimulus", imageId: "bb-schoolyard", imageUrl: "/maker/broadcast/bb-schoolyard.png" },
  ],
  beatStems: {
    side_a: [
      { id: "stem_a1", label: "trees cool the yard", source: "stem", imageId: "bb-cool-shade", imageUrl: "/maker/broadcast/bb-cool-shade.png" },
      { id: "stem_a2", label: "homes for birds", source: "stem", imageId: "bb-bird-home", imageUrl: "/maker/broadcast/bb-bird-home.png" },
      { id: "stem_a3", label: "roots help the ground", source: "stem", imageId: "bb-riparian-roots", imageUrl: "/maker/broadcast/bb-riparian-roots.png" },
      { id: "stem_a4", label: "cleaner air on hot days", source: "stem", imageId: "bb-clean-air", imageUrl: "/maker/broadcast/bb-clean-air.png" },
    ],
    side_b: [
      { id: "stem_b1", label: "room to run", source: "stem", imageId: "bb-running", imageUrl: "/maker/broadcast/bb-running.png" },
      { id: "stem_b2", label: "more kids can play", source: "stem", imageId: "bb-play-space", imageUrl: "/maker/broadcast/bb-play-space.png" },
      { id: "stem_b3", label: "climbing and games", source: "stem", imageId: "bb-climbing", imageUrl: "/maker/broadcast/bb-climbing.png" },
      { id: "stem_b4", label: "fairer recess for all", source: "stem", imageId: "bb-recess-fun", imageUrl: "/maker/broadcast/bb-recess-fun.png" },
    ],
    what_i_think: [
      { id: "stem_think_1", label: "both ideas help", source: "stem", imageId: "bb-schoolyard", imageUrl: "/maker/broadcast/bb-schoolyard.png" },
      { id: "stem_think_2", label: "mix shade and play", source: "stem", imageId: "bb-shade-tree", imageUrl: "/maker/broadcast/bb-shade-tree.png" },
      { id: "stem_think_3", label: "protect resources first", source: "stem", imageId: "bb-leaf-cover", imageUrl: "/maker/broadcast/bb-leaf-cover.png" },
      { id: "stem_think_4", label: "kids need to move", source: "stem", imageId: "bb-open-field", imageUrl: "/maker/broadcast/bb-open-field.png" },
    ],
    sign_off: [
      { id: "stem_off_d1", label: "That's my take — over", source: "stem", imageId: "bb-radio-mic", imageUrl: "/maker/broadcast/bb-radio-mic.png" },
      { id: "stem_off_d2", label: "Schoolyard Desk signing off", source: "stem" },
      { id: "stem_off_d3", label: "Back to you after debate", source: "stem" },
      { id: "stem_off_d4", label: "Thanks for listening", source: "stem" },
    ],
  },
  brainstormMin: BRAINSTORM_MIN_DEBATE,
  overlayStills: {
    side_a: { imageUrl: "/maker/broadcast/bb-shade-tree.png", caption: "Shade trees" },
    side_b: { imageUrl: "/maker/broadcast/bb-play-space.png", caption: "Play space" },
  },
  samOpen: "Read both mini-briefs. Put at least one chip on each side, then record your debate beats.",
  learning_target: "I can present both sides of a schoolyard choice and share what I think now about conserving resources and play space.",
  lesson_summary:
    "Students read shared context plus Side A / Side B mini-briefs, place chips on Debate trays, then record four beats. Recorder unlocks when Side A and Side B each have ≥1 chip. Teacher listens — not AI-graded. About 25–30 minutes.",
  misconception_note:
    "Debate seed. Tray labels come from sideALabel / sideBLabel (teacher can override on assign). Desert Radio Explain stays as-is.",
};

const CASES = {
  [DESERT_EXPLAIN.standard]: DESERT_EXPLAIN,
  [CREEK_CORRESPONDENT.standard]: CREEK_CORRESPONDENT,
  [SCHOOLYARD_DEBATE.standard]: SCHOOLYARD_DEBATE,
};

for (const waveCase of WAVE1_CASES) {
  waveCase.brainstormMin = BRAINSTORM_MIN_EXPLAIN;
  CASES[waveCase.standard] = waveCase;
}


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
    overlayStills: c.overlayStills && typeof c.overlayStills === "object" ? { ...c.overlayStills } : null,
    sideALabel: config.sideALabel,
    sideBLabel: config.sideBLabel,
    config,
    clipCapSec: CLIP_CAP_SEC,
    minClipSec: MIN_CLIP_SEC,
  };
}

export { DESERT_EXPLAIN, CREEK_CORRESPONDENT, SCHOOLYARD_DEBATE };
