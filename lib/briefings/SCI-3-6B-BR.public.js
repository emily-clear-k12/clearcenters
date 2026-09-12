// Briefing SCI-3-6B-BR — Solid, Liquid, or Gas? — PUBLIC pack.
// Converted from docs/briefings/SCI-3-6B-BR-solid-liquid-gas.md.
// Answer keys live only in SCI-3-6B-BR.server.js — never import that here.
// Prove-the-mold science Briefing. Same spine as SS-3-2B-BR.
// Player: pack-driven Field Brief pages (Story → Idea → Worked → Check).

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
  minutes: 25,
  engine: "briefing",
  relatedChallengeIds: [],
  objective: "I can tell if something is a solid, a liquid, or a gas by what happens to its shape.",
  successCriteria:
    "Names solid, liquid, and gas; says solids keep their shape; says liquids and gases take the shape of their container; sorts new samples that were not the worked rock.",
  art: {
    intel: "/briefings/sci-3-6b-br/01-intel-bench.png",
    idea: "/briefings/sci-3-6b-br/02-idea-shape.png",
    worked: "/briefings/sci-3-6b-br/03-worked-rock.png",
    sort: "/briefings/sci-3-6b-br/04-sort-samples.png",
    ops: "/briefings/sci-3-6b-br/05-ops-tests.png",
  },
  phases: ["intelDrop", "fieldBrief", "reasonSort", "opsChoice", "evidenceDrop", "clearance"],

  samLines: {
    intelDrop: "Don't name them yet. What is the same about these three things?",
    fieldBrief: "Shape is the clue. One page at a time.",
    reasonSort: "What happens to the shape?",
    opsChoice: "Pick two real tests. Skip the pretty one.",
    evidenceDrop: "Show HQ one kind — and how you know.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared. Ask your teacher for Solid, Liquid, or Gas? in Frequency Rush.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Tap a chip on each page. The check comes last.",
    reasonSort: "Tap a sample, then tap the bin — try again if it's wrong.",
    opsChoice: "Only two tests today. Skip the one that is just for show.",
    evidenceDrop: "Front = scene. Back = the kind + how you know.",
    clearance: "Show what you caught. HQ will explain if you miss.",
  },

  intelDrop: {
    title: "What is the same about these?",
    kidPrompt: "Don't name them yet. What is the same about these three things?",
    kidParagraph:
      "Look at the three things on the bench. Don't name solid, liquid, or gas yet. Your job: pick what is the same about them.",
    samOpener: "Don't name them yet. What is the same about these three things?",
    claimFrame: "I think these are all __________.",
    claimChips: ["wet", "food", "matter", "the same shape"],
    claimMode: "chipsOnly",
    reveal:
      "Today is really about **what kind of matter** each one is. Keep your guess. HQ wants to know if it is a **solid**, a **liquid**, or a **gas**.",
    learningTarget:
      "Matter can be a **solid**, a **liquid**, or a **gas**. Solids **keep their own shape**. Liquids and gases **take the shape of their container**.",
  },

  fieldBrief: {
    pages: [
      {
        id: "story",
        kicker: "Story",
        title: "Three things on the bench",
        body: "HQ set three things on the field bench by Pebble Creek: a rock, a jar of creek water, and a bag of air. They look different. They are all **matter**. HQ wants to know what kind of matter each one is.",
        imageKey: "intel",
        sam: {
          question: "What does HQ want to know?",
          chips: [
            { id: "kind", label: "What kind of matter each one is" },
            { id: "pretty", label: "Which one is the prettiest" },
            { id: "heavy", label: "How heavy the rock is" },
          ],
          correct: "kind",
          afterCorrect: "Right — what kind, not which one looks best.",
          afterWrong: "HQ isn't picking a favorite. What does HQ want to know?",
        },
      },
      {
        id: "idea",
        kicker: "Idea",
        title: "Shape is the clue",
        body: "Matter can be a **solid**, a **liquid**, or a **gas**.",
        vocabSentences: [
          "A solid keeps its own shape. Move it to a new box. It still looks like itself.",
          "A liquid pours. It takes the shape of its container.",
          "A gas spreads out. It takes the shape of its container too — it fills the whole thing.",
          "Soft things can still be solids. Sand can pour and still be lots of tiny solids.",
        ],
        imageKey: "idea",
        sam: {
          question: "What is the clue that tells you the kind of matter?",
          chips: [
            { id: "Color", label: "Color" },
            { id: "Shape", label: "Shape" },
            { id: "Loud", label: "How loud it is" },
          ],
          correct: "Shape",
          afterCorrect: "Shape. Does it keep its own, or take the container?",
          afterWrong: "Look again. What is the clue — color, shape, or sound?",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "HQ already tried the rock",
        body: "HQ picked up the rock and set it in a new box. The rock did **not** change shape. It still looked like the rock. That is a **solid**. Solids keep their own shape.",
        imageKey: "worked",
        compare: {
          left: { town: "First box", way: "The rock looks like a rock." },
          right: { town: "New box", way: "The rock still looks like a rock." },
          need: "solid",
        },
        sam: {
          question: "The rock went into a new box. Same shape or new shape?",
          chips: [
            { id: "Same shape", label: "Same shape" },
            { id: "New shape", label: "New shape" },
          ],
          correct: "Same shape",
          afterCorrect: "Same shape. That's how HQ knew it was a solid.",
          afterWrong: "Did the rock still look like the rock? Same shape or new shape?",
        },
      },
      {
        id: "check",
        kicker: "Check",
        title: "Quick HQ check",
        body: "Show what you caught. Then we practice.",
        imageKey: "sort",
        sam: {
          question: "Show what you caught. Then we practice.",
        },
        quickChecks: [
          {
            id: "qc1",
            prompt: "HQ moved a wooden block into a new box. The block still looked like a block. Which kind?",
            choices: [
              { id: "a", text: "Solid" },
              { id: "b", text: "Liquid" },
              { id: "c", text: "Gas" },
            ],
          },
          {
            id: "qc2",
            prompt: "Creek water gets poured into a tall jar. What happens to its shape?",
            choices: [
              { id: "a", text: "It keeps the same shape" },
              { id: "b", text: "It takes the shape of the jar" },
            ],
          },
          {
            id: "qc3",
            prompt: "Air fills up a balloon. What happens to its shape?",
            choices: [
              { id: "a", text: "It keeps one solid shape" },
              { id: "b", text: "It fills the whole balloon" },
            ],
          },
        ],
      },
    ],
    requireQcBeforeNext: true,
  },

  reasonSort: {
    title: "Bench Sort",
    kidPrompt: "Sort each sample. Use shape as the clue.",
    helpWrong: "Hmm — try another bin. What happens to the shape?",
    helpPass: "Nice sorting! Shape told you the kind.",
    bins: [
      { id: "solid", label: "Solid", emoji: "🪨", color: "#7B5DFF" },
      { id: "liquid", label: "Liquid", emoji: "💧", color: "#00C2C7" },
      { id: "gas", label: "Gas", emoji: "🎈", color: "#FFC44D" },
    ],
    items: [
      { id: "creek_rock", text: "A gray rock sitting on the bench" },
      { id: "sand_jar", text: "Dry sand that pours into a jar" },
      { id: "water_cup", text: "Creek water poured into a cup" },
      { id: "honey_drip", text: "Honey dripping from a spoon" },
      { id: "balloon_air", text: "Air filling up a balloon" },
      { id: "balloon_hiss", text: "Air escaping with a hiss when you let go of a balloon" },
    ],
  },

  opsChoice: {
    title: "Field Bench Tests",
    pickHeader: "Pick exactly 2 tests HQ should run today",
    constraint: "HQ's clipboard only fits **two** tests today.",
    scenario:
      "Pebble Creek Station has four cards. Three are real tests of shape. One is just for show. HQ wrote: We can only run two tests today. Which two should we run so we learn about solid, liquid, and gas?",
    emptySlotLabel: "Open test slot",
    projects: [
      {
        id: "block_box",
        label: "Move a wooden block into a new box",
        reason: "Solid",
        shortReasonLabel: "Keeps shape",
        reasonId: "solid",
        sceneId: "block",
        emoji: "🪨",
        teks: true,
        improves: "See that a solid keeps its own shape.",
      },
      {
        id: "pour_jars",
        label: "Pour creek water into a short jar and a tall jar",
        reason: "Liquid",
        shortReasonLabel: "Takes jar",
        reasonId: "liquid",
        sceneId: "pour",
        emoji: "💧",
        teks: true,
        improves: "See that a liquid takes the shape of its container.",
      },
      {
        id: "bag_to_bottle",
        label: "Squeeze air from a bag into a bottle",
        reason: "Gas",
        shortReasonLabel: "Fills it",
        reasonId: "gas",
        sceneId: "air",
        emoji: "🎈",
        teks: true,
        improves: "See that a gas fills the whole container.",
      },
      {
        id: "gold_stars",
        label: "Paint gold stars on the empty jars so the bench looks nice",
        reason: "Pretty bench",
        reasonId: null,
        sceneId: null,
        emoji: "⭐",
        teks: false,
        distractor: true,
        improves: null,
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Shape tells you the kind of matter",
      "Solids keep their own shape",
      "Liquids take the container",
      "We can run the third test later",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "solid", label: "We're waiting on the solid test" },
      { id: "liquid", label: "We're waiting on the liquid test" },
      { id: "gas", label: "We're waiting on the gas test" },
    ],
    deferredPrompt: "Name the real shape test that waits:",
    fundMeterLabel: "Test meter — fill 2 slots",
    waitingLabel: "Waiting until next time",
    consequenceTitle: "What we test vs what waits",
    boardTitle: "TODAY / WAITING",
    boardThisYearLabel: "TODAY",
    boardNextYearLabel: "WAITING",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two tests. One waits.",
    distractorFailMessage:
      "Gold stars make the bench pretty. They do not tell you the kind of matter.",
    debrief:
      "Shape is the clue. A solid keeps its shape. A liquid and a gas take the container. Pretty jars can wait.",
  },

  evidenceDrop: {
    title: "Shape postcard to HQ",
    frontHint: "Pick a scene that clearly shows **one** kind of matter.",
    frontScenes: [
      {
        id: "block",
        label: "Block in two boxes",
        reason: "solid",
        imageKey: "worked",
        sticker: "🪨",
      },
      {
        id: "pour",
        label: "Water in two jars",
        reason: "liquid",
        imageKey: "idea",
        sticker: "💧",
      },
      {
        id: "air",
        label: "Air bag into a bottle",
        reason: "gas",
        imageKey: "ops",
        sticker: "🎈",
      },
    ],
    carryForwardOps: true,
    carryForwardPrompt: "You ran {X} & {Y} — pick one to show on your postcard",
    backFrame: "This is a __________. I know because __________.",
    reasonOptions: ["solid", "liquid", "gas"],
    evidenceChips: [
      "it kept its own shape",
      "it took the shape of the jar",
      "it filled the whole container",
    ],
    transmitLabel: "Transmit postcard to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Agent report-in. Answer four quick questions. HQ will explain if you miss.",
    progressGates: [
      { id: "claim", label: "Claim locked" },
      { id: "field", label: "Field Brief pages + checks done" },
      { id: "sort", label: "Bench Sort complete" },
      { id: "postcard", label: "Postcard transmitted to HQ" },
    ],
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What three kinds of matter did HQ study?",
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
        reuseFrom: "intel",
      },
      {
        id: "c3",
        type: "tf",
        prompt: "True/False: If something is soft or pours, it must be a liquid.",
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Think about the test HQ is still waiting to run, or your postcard. Which kind fits?",
        dynamicReuse: true,
        choices: [
          { id: "a", text: "Solid" },
          { id: "b", text: "Liquid" },
          { id: "c", text: "Gas" },
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
    postcardReceivedLabel: "HQ received · shape postcard",
    dynamicDeferredPrompt: "Which kind of matter is HQ still waiting to test?",
    dynamicEvidencePrompt: "Your postcard evidence was “{evidence}” — which kind matches?",
    dynamicFallbackPrompt: "Think about the Field Bench Tests. Which kind still matters even if it waits?",
    reasonIdToChoice: {
      solid: "a",
      liquid: "b",
      gas: "c",
    },
    explanations: {
      c1: "HQ studied solid, liquid, and gas. Those three are the kinds of matter this briefing is about.",
      c2: "The block kept its own shape in a new box. That is a solid.",
      c3: "Soft or pourable is not the same as liquid. Sand is lots of tiny solids. Play-dough is a soft solid.",
      c4: "HQ can only run two tests today. The third real test waits — that's the kind still on the waiting list.",
    },
    evidenceToReasonChoice: {
      "it kept its own shape": "a",
      "it took the shape of the jar": "b",
      "it filled the whole container": "c",
    },
  },
};
