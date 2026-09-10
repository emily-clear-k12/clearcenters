// Briefing SS-3-2A-BR — Why Communities Form — PUBLIC pack.
// Converted from docs/briefings/SS-3-2A-BR-why-communities-form.md.
// Answer keys live only in SS-3-2A-BR.server.js — never import that here.
// P1 UX: chip-only intel, ~30-min spine, 4 clearance items, short SAM lines.

export const PUBLIC_BRIEFING = {
  id: "SS-3-2A-BR",
  title: "Why Communities Form",
  tagline: "HQ needs to know: why do people live together in the first place?",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  grade: 3,
  teks: "3.2A",
  teksText:
    "Identify reasons people form communities, including security and laws, religious freedom, and material well-being.",
  minutes: 30,
  engine: "briefing",
  relatedChallengeIds: [],
  objective: "I can name reasons people form communities and show one with evidence.",
  successCriteria:
    "Names security & laws, religious freedom, and material well-being; uses at least one correctly in Ops Choice and Evidence Drop.",
  art: {
    intel: "/briefings/ss-3-2a-br/01-intel-drop-mystery-gate.png",
    beatSecurity: "/briefings/ss-3-2a-br/02-beat-security-laws.png",
    beatReligious: "/briefings/ss-3-2a-br/03-beat-religious-freedom.png",
    beatMaterial: "/briefings/ss-3-2a-br/04-beat-material-wellbeing.png",
    ops: "/briefings/ss-3-2a-br/05-maple-crossing.png",
  },
  phases: ["intelDrop", "fieldBrief", "opsChoice", "evidenceDrop", "clearance"],

  // Short kid lines only — SamGuide shows these; tap for tipOnTap; no auto-dump.
  samLines: {
    intelDrop: "Look close. Why is this place here?",
    fieldBrief: "Three big reasons. One beat at a time.",
    opsChoice: "Pick exactly two. Towns can't fund everything.",
    evidenceDrop: "Postcard time — show one reason clearly.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Answer the quick check before you move on.",
    opsChoice: "Two projects now — the third can wait.",
    evidenceDrop: "Front = scene. Back = reason + evidence.",
    clearance: "Reuse what you already picked when you can.",
  },

  intelDrop: {
    title: "Why is this place here?",
    kidPrompt: "Pick why you think this place is here.",
    samOpener: "Look close. Why is this place here?",
    claimFrame: "I think this place exists because __________.",
    // Chip-only for G3 — no Notice/Wonder free-text.
    claimChips: ["safety", "rules", "beliefs", "food/jobs", "school", "friends"],
    claimMode: "chipsOnly",
    reveal:
      "Today's Intel Drop is really about **why people form communities**. Keep your claim — we'll see if HQ's three reasons match what you noticed.",
    learningTarget:
      "People form communities for **security and laws**, **religious freedom**, and **material well-being**.",
  },

  fieldBrief: {
    vocab: [
      { term: "community", meaning: "people living and working together in a place", icon: "🏘️", color: "#7B5DFF" },
      { term: "security", meaning: "staying safe and protected", icon: "🛡️", color: "#00C2C7" },
      { term: "laws", meaning: "rules that help keep people safe and fair", icon: "📜", color: "#FFC44D" },
      { term: "religious freedom", meaning: "being able to practice your beliefs", icon: "🕊️", color: "#7B5DFF" },
      {
        term: "material well-being",
        meaning: "having what you need to live well (food, homes, jobs, goods)",
        icon: "🛒",
        color: "#00C2C7",
      },
    ],
    beats: [
      {
        id: "beat1",
        title: "Security and laws",
        body: "Living together helps people stay safe. Communities make **laws** (rules) so people know what's fair and what keeps everyone protected. Firefighters, police, and speed limits near schools are clues you can spot.",
        example: "A town has firefighters and speed limits near schools.",
        imageKey: "beatSecurity",
        qcId: "qc1",
      },
      {
        id: "beat2",
        title: "Religious freedom",
        body: "Some communities formed so people could practice their beliefs without being stopped. In U.S. history, groups moved to new places for **religious freedom** — the freedom to believe and worship in their own way.",
        example: "Groups in U.S. history moved to new places for religious freedom.",
        imageKey: "beatReligious",
        qcId: "qc2",
        teacherNote: "Keep civic and respectful — freedom to believe, not comparing religions.",
      },
      {
        id: "beat3",
        title: "Material well-being",
        body: "People gather where they can get food, homes, jobs, and goods. That's **material well-being** — not just toys, but the everyday needs that help a community live well.",
        example: "A town grows near a river for water, trade, and jobs.",
        imageKey: "beatMaterial",
        qcId: "qc3",
      },
    ],
    quickChecks: [
      {
        id: "qc1",
        prompt: "Speed limits near a school mostly match which reason?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
      {
        id: "qc2",
        prompt: "A group moves so they can worship in their own way. Which reason?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
      {
        id: "qc3",
        prompt: "Families settle near farms and markets for food and work. Which reason?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
    ],
    trapLine:
      "Material well-being just means having toys. → False; it's needs like food, homes, jobs, goods.",
    requireQcBeforeNext: true,
  },

  opsChoice: {
    title: "Founders' Council — Maple Crossing",
    pickHeader: "Pick exactly 2 projects to fund this year",
    constraint: "The new town can fund **only two** of three big projects this year.",
    projects: [
      {
        id: "town_hall",
        label: "Town hall + community rules",
        reason: "Security and laws",
        sceneId: "rules",
        emoji: "🏛️",
      },
      {
        id: "worship_land",
        label: "Land set aside for a place of worship for anyone who wants it",
        reason: "Religious freedom",
        sceneId: "worship",
        emoji: "🕊️",
      },
      {
        id: "market_road",
        label: "Market + road so farmers can sell food and goods",
        reason: "Material well-being",
        sceneId: "market",
        emoji: "🛒",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "We need to stay safe",
      "People should be free to believe",
      "People need food, homes, and jobs",
      "We can add the third later",
    ],
    justificationMode: "chipsOnly",
    debrief:
      "Which reasons did Maple Crossing put first? Which waited? Communities form for **security and laws**, **religious freedom**, and **material well-being** — towns just can't do everything on day one.",
  },

  evidenceDrop: {
    title: "Community Postcard from Maple Crossing",
    frontHint: "Pick a scene that clearly shows **one** reason.",
    // Map scene stickers to beat art when available.
    frontScenes: [
      {
        id: "rules",
        label: "Rules / firefighters / speed limits",
        reason: "security and laws",
        imageKey: "beatSecurity",
        sticker: "🛡️",
      },
      {
        id: "worship",
        label: "Place to worship freely",
        reason: "religious freedom",
        imageKey: "beatReligious",
        sticker: "🕊️",
      },
      {
        id: "market",
        label: "Market, farms, jobs, homes",
        reason: "material well-being",
        imageKey: "beatMaterial",
        sticker: "🛒",
      },
    ],
    carryForwardOps: true,
    carryForwardPrompt: "You funded {X} & {Y} — pick one to show on your postcard",
    backFrame: "People formed our community for __________. You can see it because __________.",
    reasonOptions: ["security and laws", "religious freedom", "material well-being"],
    evidenceChips: [
      "posted rules / firefighters / speed limits",
      "place to worship freely",
      "market, farms, jobs, homes",
    ],
    transmitLabel: "Transmit postcard to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Agent report-in. Answer four quick questions, then mark your self-check.",
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What three reasons does TEKS 3.2A name for forming communities?",
        choices: [
          { id: "a", text: "security and laws; religious freedom; material well-being" },
          { id: "b", text: "fun only; toys; being famous" },
          { id: "c", text: "sports; shopping; vacations" },
          { id: "d", text: "security and laws; toys; material well-being" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A town hires firefighters and posts fire-safety rules. Best match?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
        reuseFrom: "intel",
      },
      {
        id: "c3",
        type: "tf",
        prompt: "True/False: Material well-being is only about having toys.",
        choices: [
          { id: "true", text: "True" },
          { id: "false", text: "False" },
        ],
      },
      {
        id: "c4",
        type: "single",
        // Reuses Ops / Evidence picks when available (client injects dynamic prompt).
        prompt: "Which reason best matches a project or postcard you already chose?",
        dynamicReuse: true,
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
    ],
    selfCheck: [
      "Did I name security and laws?",
      "Did I name religious freedom?",
      "Did I name material well-being?",
      "Did my Ops Choice pick exactly two projects and say why?",
      "Did my postcard reason match my evidence?",
    ],
    selfCheckRequired: 3,
    clearedMessage:
      "Briefing cleared: Why Communities Form. Ask your teacher when you're ready for a Challenge.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
  },
};
