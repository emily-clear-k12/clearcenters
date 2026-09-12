// Briefing SS-3-2B-BR — How Communities Meet Needs — PUBLIC pack.
// Converted from docs/briefings/SS-3-2B-BR-how-communities-meet-needs.md.
// Answer keys live only in SS-3-2B-BR.server.js — never import that here.
// Sequel to SS-3-2A-BR (Maple Crossing). Compare-local-vs-other for TEKS 3.2B.
// Player: pack-driven Field Brief pages (Story → Idea → Worked → Check).
// Reason Sort stays 3-column. Ops = 3 TEKS + 1 distractor.

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
    fieldBrief: "Four pages: a story, an idea, a worked compare, then a quick check.",
    reasonSort: "Sort each clue into the need that fits.",
    opsChoice: "Pick exactly two needs to compare this year.",
    evidenceDrop: "Postcard time — show one need both towns take care of.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Tap a chip on each page. The check comes last.",
    reasonSort: "Tap a clue, then tap the bin — try again if it's wrong.",
    opsChoice: "Only two compares this year. Skip anything that's just for show.",
    evidenceDrop: "Front = scene. Back = the need + how each town does it.",
    clearance: "Gates light up from work you already finished.",
  },

  intelDrop: {
    title: "What do these towns take care of?",
    kidPrompt: "Pick what you think these two towns take care of.",
    kidParagraph:
      "Look at these two places. Don't name the towns yet. Your job: pick what people here need taken care of. Tap the idea that fits best.",
    samOpener: "Don't name the towns yet. What do people here need taken care of?",
    claimFrame: "I think these towns take care of __________.",
    claimChips: ["rules", "school", "messages", "getting around", "play", "food"],
    claimMode: "chipsOnly",
    reveal:
      "Today's Intel Drop is really about **how communities meet needs**. Keep your claim — HQ wants to compare two towns, not pick a winner.",
    learningTarget:
      "Communities meet needs for **government**, **education**, **communication**, **transportation**, and **recreation**. Different towns can meet the **same need** in **different ways**.",
  },

  fieldBrief: {
    pages: [
      {
        id: "story",
        kicker: "Story",
        title: "Sister towns",
        body: "Maple Crossing sits by the creek. Cloudreach sits across the river. They are sister towns. Both take care of people. HQ is coming to visit to learn **how** each town takes care of people.",
        imageKey: "intel",
        sam: {
          question: "What is HQ coming to learn?",
          chips: [
            { id: "how", label: "How each town takes care of people" },
            { id: "winner", label: "Which town is better" },
            { id: "names", label: "What the towns are named" },
          ],
          correct: "how",
          afterCorrect: "Right — HQ wants to learn how, not pick a winner. Ready for the idea?",
          afterWrong: "HQ isn't picking a winner. What is HQ coming to learn?",
        },
      },
      {
        id: "idea",
        kicker: "Idea",
        title: "Same needs, different ways",
        body: "Communities take care of people. They meet needs for **government**, **education**, **communication**, **transportation**, and **recreation**. Two towns can take care of the **same need** in **different ways**.",
        vocabSentences: [
          "Government is the people and rules that help a town run fairly.",
          "Education is how kids learn — school, teachers, getting to class.",
          "Communication is how people send news and messages.",
          "Transportation is how people and goods get from place to place.",
          "Recreation is how people play and rest.",
        ],
        imageKey: "ops",
        sam: {
          question: "Can two towns take care of the same need in different ways?",
          chips: [
            { id: "Yes", label: "Yes" },
            { id: "No", label: "No" },
          ],
          correct: "Yes",
          afterCorrect: "Yes. Same need — different way. HQ will show you one.",
          afterWrong: "Look again. Same need — can the way be different?",
        },
      },
      {
        id: "worked",
        kicker: "Worked example",
        title: "HQ already compared school",
        body: "Kids in Maple Crossing **walk** to a little school. Kids in Cloudreach **ride a bus**. That is still **education**. Same need. Different way.",
        imageKey: "beatCivic",
        compare: {
          left: { town: "Maple Crossing", way: "Kids walk to a little school." },
          right: { town: "Cloudreach", way: "Kids ride a bus." },
          need: "education",
        },
        sam: {
          question: "Walking and the bus — same need or different needs?",
          chips: [
            { id: "Same need", label: "Same need" },
            { id: "Different needs", label: "Different needs" },
          ],
          correct: "Same need",
          afterCorrect: "Same need: education. Different way to get there.",
          afterWrong: "Both are still school. Same need or different needs?",
        },
      },
      {
        id: "check",
        kicker: "Check",
        title: "Quick HQ check",
        body: "Show what you caught. Then we practice.",
        imageKey: "beatPlay",
        sam: {
          question: "Show what you caught. Then we practice.",
        },
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
            prompt: "Do towns have to take care of people the same way?",
            choices: [
              { id: "a", text: "Yes, they have to match" },
              { id: "b", text: "No, different ways still count" },
            ],
          },
        ],
      },
    ],
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
    pickHeader: "Pick exactly 2 needs HQ should visit this year",
    constraint:
      "HQ's backpack only fits **two** visits.",
    scenario:
      "Maple Crossing sits by the creek. Cloudreach sits across the river. Both towns take care of people — they just do it differently. HQ wrote: We can only visit two needs this year. Which two should we compare so we learn how each town takes care of people? One of the four cards is not a community need.",
    emptySlotLabel: "Open compare slot",
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
        label: "Giant welcome statue so visitors remember us",
        reason: "Town pride",
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
      "That statue is town pride, not a community need. Pick two that help government, education, or transportation.",
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
      { id: "field", label: "Field Brief pages + checks done" },
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
    explanations: {
      c1: "Communities take care of government, education, communication, transportation, and recreation. Those five are the needs HQ studies.",
      c2: "Walking or riding a bus is still school — that's education. Same need, different way.",
      c3: "Towns do not have to do things the same way. A creek park and a rec center both count as play.",
      c4: "HQ can only compare two needs this year. The third real need waits — that's the one still on the waiting list.",
    },
    evidenceToReasonChoice: {
      "town meeting vs mayor's office": "a",
      "walk to school vs school bus": "b",
      "wagon road vs river ferry": "c",
    },
  },
};
