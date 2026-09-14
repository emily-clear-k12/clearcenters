// Briefing SCI-3-6B-BR — Solid, Liquid, or Gas? — PUBLIC pack.
// Answer keys live only in SCI-3-6B-BR.server.js — never import that here.
//
// Sept 14, 2026 — REBUILT against the Science light-review shape (see
// lib/briefings/schema/scienceLightReview.schema.js). The v1 version of
// this file was structurally identical to the SS full-lesson template
// (same 6 phases, same Ops Choice mechanic, same first-teach depth) —
// i.e. a copy of the SS shape with different words, not an actual review.
// That was the core finding from this foundation pass: Science is already
// taught in class, so a briefing here should refresh, not re-teach.
//
// What changed from v1:
//  - fieldBrief's 4-page first-teach -> quickReview's single recap + one
//    quick check (assumes the concept, re-surfaces it).
//  - One Reason Sort -> TWO practice reps (True/False-with-Reason, then
//    Label the Picture), built directly from teksguide.org's documented
//    misconceptions (see docs/briefings/teks-reference/SCI-3-6B.md).
//  - No Ops Choice / Evidence Drop — cut to stay "light touch"; the
//    second practice rep carries the applying weight those gave SS.
//  - Clearance item c4 now directly tests "liquids and gases take the
//    shape of their container" — scripts/briefings-checker.js flagged
//    that claim as under-tested in the v1 version; this closes it.
// Numbering note: current (2024-2025) TEKS number this content 3.5(B);
// this project's content ID stays SCI-3-6B per Emily's Sept 14 decision
// — see docs/briefings/teks-reference/SCI-3-6B.md.

export const PUBLIC_BRIEFING = {
  id: "SCI-3-6B-BR",
  title: "Solid, Liquid, or Gas?",
  tagline: "Matter can be a solid, a liquid, or a gas. The clue is what happens to its shape.",
  subject: "science",
  subjectLabel: "Science",
  grade: 3,
  teks: "3.6B",
  teksText:
    "Describe and classify samples of matter as solids, liquids, and gases and demonstrate that solids have a definite shape and that liquids and gases take the shape of their container.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective: "I can tell if something is a solid, a liquid, or a gas by what happens to its shape.",
  successCriteria:
    "Names solid, liquid, and gas; says solids keep their shape; says liquids and gases take the shape of their container; spots the 'if it pours, it's a liquid' misconception.",
  art: {
    intel: "/briefings/sci-3-6b-br/01-intel-bench.png",
    idea: "/briefings/sci-3-6b-br/02-idea-shape.png",
    sort: "/briefings/sci-3-6b-br/04-sort-samples.png",
  },
  phases: ["intelDrop", "quickReview", "trueFalseReason", "labelPicture", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 5 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: HQ once tried to classify a bowl of gelatin. Three agents argued for twenty minutes. Current ruling: it's a very stubborn solid.",
    },
  },

  samLines: {
    intelDrop: "Remember the bench? What told the three things apart?",
    quickReview: "Quick refresher — shape is still the clue.",
    trueFalseReason: "True or false — HQ will show you why either way.",
    labelPicture: "Tap a sample, then tap its label.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared. Ask your teacher for Solid, Liquid, or Gas? in Frequency Rush.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    quickReview: "Read the recap, then answer the quick check.",
    trueFalseReason: "Pick True or False for each — the reason shows either way.",
    labelPicture: "Tap a word, then tap the sample it matches.",
    clearance: "Show what you caught. HQ will explain if you miss.",
  },

  intelDrop: {
    title: "Remember the bench?",
    kidPrompt: "Remember the rock, the water, and the air from the bench? Pick what told them apart.",
    kidParagraph:
      "Think back to the three things HQ studied at Pebble Creek: a rock, some creek water, and a bag of air. They're not the same kind of matter. Pick the clue that told them apart.",
    samOpener: "Remember the bench? What told the three things apart?",
    claimFrame: "I remember the clue was __________.",
    claimChips: ["shape", "color", "weight", "smell"],
    claimMode: "chipsOnly",
    reveal:
      "Right — **shape** was always the clue. Today's a quick refresher: solid, liquid, or gas, and how to tell them apart fast.",
    learningTarget:
      "Matter can be a **solid**, a **liquid**, or a **gas**. Solids **keep their own shape**. Liquids and gases **take the shape of their container**.",
  },

  quickReview: {
    title: "Quick Review: Shape Is the Clue",
    recapBody:
      "**Solids** keep their own shape. Remember the rock in a new box? Still a rock. **Liquids** pour. They take the shape of their container, like creek water in a jar. **Gases** spread out. They fill their whole container, like air in a balloon.",
    vocab: [
      { term: "solid", meaning: "matter with its own fixed shape", icon: "🪨" },
      { term: "liquid", meaning: "matter that takes the shape of its container", icon: "💧" },
      { term: "gas", meaning: "matter that spreads out to fill its container", icon: "🎈" },
    ],
    quickCheck: {
      prompt: "Honey drips slowly but still takes the shape of whatever jar it's in. Which kind of matter?",
      choices: [
        { id: "a", text: "Solid" },
        { id: "b", text: "Liquid" },
        { id: "c", text: "Gas" },
      ],
    },
  },

  // Built from teksguide.org's documented misconceptions for this
  // standard (see docs/briefings/teks-reference/SCI-3-6B.md) — this is
  // the direct payoff of the AI research step Emily asked for.
  trueFalseReason: {
    title: "True or False: Shape Clues",
    kidPrompt: "Read each statement. Pick True or False — HQ will show you why either way.",
    statements: [
      { id: "s1", text: "If something pours, it must be a liquid." },
      { id: "s2", text: "A solid keeps its own shape, even in a new container." },
      { id: "s3", text: "A gas doesn't really have a shape at all." },
      { id: "s4", text: "Liquids and gases both take the shape of whatever container they're in." },
    ],
  },

  // Hotspot x/y are placeholder positions (percent of image width/height)
  // sized to roughly match "left / center / right" on the existing
  // 04-sort-samples.png art — worth a quick eyeball-and-nudge pass against
  // the real image before this ships, since this file was written without
  // being able to view that art asset directly.
  labelPicture: {
    title: "Label the Bench",
    kidPrompt: "Tap a hotspot on the bench, then tap the word that matches it.",
    helpWrong: "Hmm — try another label. What happens to its shape?",
    helpPass: "Nice labeling! Shape told you the kind every time.",
    imageKey: "sort",
    hotspots: [
      { id: "h_rock", x: 18, y: 65 },
      { id: "h_water", x: 50, y: 60 },
      { id: "h_air", x: 82, y: 45 },
    ],
    wordBank: [
      { id: "w_solid", text: "Solid" },
      { id: "w_liquid", text: "Liquid" },
      { id: "w_gas", text: "Gas" },
    ],
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Agent report-in. Finish the progress gates from your work, then answer four quick questions.",
    progressGates: [
      { id: "claim", label: "Claim locked" },
      { id: "review", label: "Quick Review check done" },
      { id: "practice1", label: "True or False complete" },
      { id: "practice2", label: "Label the Bench complete" },
    ],
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What three kinds of matter did we review?",
        choices: [
          { id: "a", text: "solid, liquid, gas" },
          { id: "b", text: "wet, dry, hot" },
          { id: "c", text: "rock, wood, metal" },
          { id: "d", text: "red, blue, green" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A wooden block goes in a new box and still looks like a block. Which kind?",
        choices: [
          { id: "a", text: "Solid" },
          { id: "b", text: "Liquid" },
          { id: "c", text: "Gas" },
        ],
      },
      {
        id: "c3",
        type: "tf",
        prompt: "True/False: If something pours, it must be a liquid.",
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Liquids and gases both do this to fit where they are:",
        choices: [
          { id: "a", text: "Keep their own shape" },
          { id: "b", text: "Take the shape of the container" },
          { id: "c", text: "Turn into a solid" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage:
      "Briefing cleared: Solid, Liquid, or Gas? Ask your teacher for Solid, Liquid, or Gas? in Frequency Rush.",
    challengeCta: "Ask your teacher for Solid, Liquid, or Gas? in Frequency Rush",
    postcardReceivedLabel: "HQ received · shape review",
    explanations: {
      c1: "We reviewed solid, liquid, and gas. Those three are the kinds of matter this briefing is about.",
      c2: "The block kept its own shape in a new box. That is a solid.",
      c3: "Pourable isn't the same as liquid. Sand and rice are tiny solids that can still pour.",
      c4: "Liquids and gases both take the shape of their container. Solids don't — they keep their own shape.",
    },
  },
};
