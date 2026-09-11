// Briefing SS-3-2B-BR — How Communities Meet Needs — PUBLIC pack.
// Converted from docs/briefings/SS-3-2B-BR-how-communities-meet-needs.md.
// Answer keys live only in SS-3-2B-BR.server.js — never import that here.
// Sequel to SS-3-2A-BR (Maple Crossing). Compare-local-vs-other for TEKS 3.2B.
// Player constraints: 3 Field Brief beats, 3-column Reason Sort, Ops = 3 TEKS + 1 distractor.

export const PUBLIC_BRIEFING = {
  id: "SS-3-2B-BR",
  title: "How Communities Meet Needs",
  tagline: "Maple Crossing and Cloudreach both take care of people — they just do it differently.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  grade: 3,
  teks: "3.2B",
  teksText:
    "Compare ways people in the local community and other communities meet their needs for government, education, communication, transportation, and recreation.",
  minutes: 30,
  engine: "briefing",
  relatedChallengeIds: [],
  objective: "I can name ways communities meet needs and show how two towns can do the same need differently.",
  successCriteria:
    "Names government, education, communication, transportation, and recreation; compares Maple Crossing and Cloudreach on at least one need in Ops Choice and Evidence Drop.",
  art: {
    intel: "/briefings/ss-3-2b-br/01-intel-two-towns.png",
    beatCivic: "/briefings/ss-3-2b-br/02-beat-gov-school.png",
    beatConnect: "/briefings/ss-3-2b-br/03-beat-news-travel.png",
    beatPlay: "/briefings/ss-3-2b-br/04-beat-play.png",
    ops: "/briefings/ss-3-2b-br/05-sister-towns.png",
  },
  phases: ["intelDrop", "fieldBrief", "reasonSort", "opsChoice", "evidenceDrop", "clearance"],

  samLines: {
    intelDrop: "Don't name the towns yet. What do people here need taken care of?",
    fieldBrief: "Same needs. Two towns. Different ways. One beat at a time.",
    reasonSort: "Sort each clue into the need that fits.",
    opsChoice: "Pick exactly two needs to compare this year.",
    evidenceDrop: "Postcard time — show one need both towns take care of.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Answer the quick check before you move on.",
    reasonSort: "Tap a clue, then tap the bin — try again if it's wrong.",
    opsChoice: "Only two compares this year. Skip anything that's just for show.",
    evidenceDrop: "Front = scene. Back = the need + how each town does it.",
    clearance: "Gates light up from work you already finished.",
  },

  intelDrop: {
    title: "What does this town take care of?",
    kidPrompt: "Pick what you think this town takes care of.",
    kidParagraph:
      "Look at these two places. Don't name the towns yet. Your job: pick what people here need taken care of. Tap the idea that fits best.",
    samOpener: "Don't name the towns yet. What do people here need taken care of?",
    claimFrame: "I think this town takes care of __________.",
    claimChips: ["rules", "school", "messages", "getting around", "play", "food"],
    claimMode: "chipsOnly",
    reveal:
      "Today's Intel Drop is really about **how communities meet needs**. Keep your claim — HQ wants to compare two towns, not pick a winner.",
    learningTarget:
      "Communities meet needs for **government**, **education**, **communication**, **transportation**, and **recreation**. Different towns can meet the **same need** in **different ways**.",
  },

  fieldBrief: {
    vocab: [
      { term: "government", meaning: "people and rules that help a town run fairly", icon: "🏛️", color: "#7B5DFF" },
      { term: "education", meaning: "how kids learn (school, teachers, getting to class)", icon: "📚", color: "#00C2C7" },
      { term: "communication", meaning: "how people send news and messages", icon: "📣", color: "#FFC44D" },
      { term: "transportation", meaning: "how people and goods get from place to place", icon: "🚌", color: "#7B5DFF" },
      { term: "recreation", meaning: "how people play and rest (parks, games, fun together)", icon: "🌳", color: "#00C2C7" },
    ],
    beats: [
      {
        id: "beat1",
        title: "Government and education",
        body: "Every town needs a way to make fair rules, and a way for kids to learn. **Maple Crossing** holds a town meeting on the porch and kids **walk** to a small school. **Cloudreach** has a mayor's office and kids ride a **school bus**. Same needs. Different ways.",
        example: "Kids still get to school — some walk, some ride the bus.",
        imageKey: "beatCivic",
        qcId: "qc1",
      },
      {
        id: "beat2",
        title: "Communication and transportation",
        body: "People need news, and they need to get around. Maple Crossing posts notes on a **bulletin board** and uses a **wagon road**. Cloudreach uses a **radio tower** and a **river ferry**. That's **communication** and **transportation** — same needs, different ways.",
        example: "A ferry and a wagon road both help people get from place to place.",
        imageKey: "beatConnect",
        qcId: "qc2",
      },
      {
        id: "beat3",
        title: "Recreation — and the compare move",
        body: "People also need a place to play and rest. Maple Crossing has a **creek park**. Cloudreach has an **indoor rec center**. That's **recreation**. HQ's job is not \"which town is better.\" It's \"how do they each take care of people?\"",
        example: "A creek park and a rec center both give people a place to play.",
        imageKey: "beatPlay",
        qcId: "qc3",
        teacherNote: "Cloudreach is a sister town, not a real Texas city — teachers can later swap in their own community.",
      },
    ],
    quickChecks: [
      {
        id: "qc1",
        prompt: "Kids walk to school in one town and ride a bus in the other. Which need?",
        choices: [
          { id: "a", text: "Education" },
          { id: "b", text: "Recreation" },
          { id: "c", text: "Government" },
        ],
      },
      {
        id: "qc2",
        prompt: "A ferry that carries people across the river is mostly which need?",
        choices: [
          { id: "a", text: "Recreation" },
          { id: "b", text: "Transportation" },
          { id: "c", text: "Education" },
        ],
      },
      {
        id: "qc3",
        prompt: "True/False: Every town has to meet needs the exact same way.",
        choices: [
          { id: "a", text: "True" },
          { id: "b", text: "False" },
        ],
      },
    ],
    trapLine:
      "Every town has to meet needs the exact same way. → False; same need, different ways.",
    requireQcBeforeNext: true,
  },

  reasonSort: {
    title: "Community Need Sort",
    kidPrompt: "Sort each example under the need that fits best.",
    helpWrong: "Hmm — try another bin. Which need matches that clue?",
    helpPass: "Nice sorting! Towns can meet the same need in different ways.",
    bins: [
      { id: "government", label: "Government", emoji: "🏛️", color: "#7B5DFF" },
      { id: "education", label: "Education", emoji: "📚", color: "#00C2C7" },
      { id: "transportation", label: "Transportation", emoji: "🚌", color: "#FFC44D" },
    ],
    items: [
      { id: "porch_meeting", text: "Town meeting on the porch to make fair rules" },
      { id: "mayor_office", text: "A mayor's office that helps the town run" },
      { id: "walk_school", text: "Kids walk down the lane to a small school" },
      { id: "school_bus", text: "Kids ride a yellow bus to a bigger school" },
      { id: "wagon_road", text: "A wagon road to carry people and goods" },
      { id: "river_ferry", text: "A river ferry instead of a long wagon trip" },
    ],
  },

  opsChoice: {
    title: "Sister Town Signal — Maple Crossing & Cloudreach",
    pickHeader: "Pick exactly 2 needs to compare this year",
    constraint:
      "HQ can compare **only two** needs this year. Three help real community needs — one is just for show.",
    projects: [
      {
        id: "gov_compare",
        label: "Town meeting vs mayor's office",
        reason: "Government",
        shortReasonLabel: "Fair rules",
        reasonId: "government",
        sceneId: "gov",
        emoji: "🏛️",
        teks: true,
        improves: "See how each town makes fair rules.",
      },
      {
        id: "edu_compare",
        label: "Walk to school vs school bus",
        reason: "Education",
        shortReasonLabel: "Kids learn",
        reasonId: "education",
        sceneId: "edu",
        emoji: "📚",
        teks: true,
        improves: "See how kids in each town get to school.",
      },
      {
        id: "transport_compare",
        label: "Wagon road vs river ferry",
        reason: "Transportation",
        shortReasonLabel: "Get around",
        reasonId: "transportation",
        sceneId: "transport",
        emoji: "🚌",
        teks: true,
        improves: "See how people and goods move in each town.",
      },
      {
        id: "snack_statue",
        label: "World's largest snack statue contest",
        reason: "Sounds fun!",
        reasonId: null,
        sceneId: null,
        emoji: "🏆",
        teks: false,
        distractor: true,
        improves: null,
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Towns can meet the same need in different ways",
      "Kids still get to school",
      "People still get around",
      "We can compare the third later",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "government", label: "We're waiting on government" },
      { id: "education", label: "We're waiting on education" },
      { id: "transportation", label: "We're waiting on transportation" },
    ],
    deferredPrompt: "Name the real community need that waits until next year:",
    fundMeterLabel: "Compare meter — fill 2 slots",
    waitingLabel: "Waiting until next year",
    consequenceTitle: "What we compare vs what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two compares. One waits until next year.",
    distractorFailMessage:
      "That snack statue isn't a community need. Pick two that help government, education, or transportation.",
    debrief:
      "Maple Crossing and Cloudreach both take care of people. They just meet the same needs in different ways. Fun-only projects can wait.",
  },

  evidenceDrop: {
    title: "Compare postcard to HQ",
    frontHint: "Pick a scene that clearly shows **one** need both towns take care of.",
    frontScenes: [
      {
        id: "gov",
        label: "Town meeting / mayor's office",
        reason: "government",
        imageKey: "beatCivic",
        sticker: "🏛️",
      },
      {
        id: "edu",
        label: "Walk to school / school bus",
        reason: "education",
        imageKey: "beatCivic",
        sticker: "📚",
      },
      {
        id: "transport",
        label: "Wagon road / river ferry",
        reason: "transportation",
        imageKey: "beatConnect",
        sticker: "🚌",
      },
    ],
    carryForwardOps: true,
    carryForwardPrompt: "You compared {X} & {Y} — pick one to show on your postcard",
    backFrame: "Both towns meet the need for __________. Maple Crossing does it by __________. Cloudreach does it by __________.",
    reasonOptions: ["government", "education", "transportation"],
    evidenceChips: [
      "town meeting vs mayor's office",
      "walk to school vs school bus",
      "wagon road vs river ferry",
    ],
    transmitLabel: "Transmit postcard to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Agent report-in. Finish the progress gates from your work, then answer four quick questions.",
    progressGates: [
      { id: "claim", label: "Claim locked" },
      { id: "field", label: "All 3 Field Brief beats + QCs done" },
      { id: "sort", label: "Need Sort complete" },
      { id: "postcard", label: "Postcard transmitted to HQ" },
    ],
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What five needs do communities take care of?",
        choices: [
          { id: "a", text: "government, education, communication, transportation, recreation" },
          { id: "b", text: "toys, snacks, fame, naps, cartoons" },
          { id: "c", text: "security and laws, religious freedom, material well-being" },
          { id: "d", text: "government, toys, transportation, snacks, recreation" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Kids walk to school in Maple Crossing. Kids ride a bus in Cloudreach. Same need?",
        choices: [
          { id: "a", text: "Education" },
          { id: "b", text: "Recreation" },
          { id: "c", text: "Government" },
        ],
        reuseFrom: "intel",
      },
      {
        id: "c3",
        type: "tf",
        prompt: "True/False: Every town has to meet needs the exact same way.",
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Think about the need HQ is still waiting to compare, or your postcard. Which need fits?",
        dynamicReuse: true,
        choices: [
          { id: "a", text: "Government" },
          { id: "b", text: "Education" },
          { id: "c", text: "Transportation" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage:
      "Briefing cleared: How Communities Meet Needs. Ask your teacher when you're ready for a Challenge.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · compare postcard",
    dynamicDeferredPrompt: "Which need is HQ still waiting to compare?",
    dynamicEvidencePrompt: "Your postcard evidence was “{evidence}” — which need matches?",
    dynamicFallbackPrompt: "Think about the Sister Town Signal. Which need still matters even if it waits?",
    reasonIdToChoice: {
      government: "a",
      education: "b",
      transportation: "c",
    },
    evidenceToReasonChoice: {
      "town meeting vs mayor's office": "a",
      "walk to school vs school bus": "b",
      "wagon road vs river ferry": "c",
    },
  },
};
