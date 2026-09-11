// Briefing SS-3-2A-BR — Why Communities Form — PUBLIC pack.
// Converted from docs/briefings/SS-3-2A-BR-why-communities-form.md.
// Answer keys live only in SS-3-2A-BR.server.js — never import that here.
// P3: harder Reason Sort, Ops distractor + fund/waiting UI, no-giveaway clearance, postcard on Cleared.
// P4: lean visual Ops debrief (shortReasonLabel + THIS YEAR / NEXT YEAR board).

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
  phases: ["intelDrop", "fieldBrief", "reasonSort", "opsChoice", "evidenceDrop", "clearance"],

  // Short kid lines only — SamGuide shows these; tap for tipOnTap; no auto-dump.
  samLines: {
    intelDrop: "Look at this place. Don't name the town yet — pick why people might live here.",
    fieldBrief: "Three big reasons. One beat at a time.",
    reasonSort: "Sort each clue into the reason bin that fits.",
    opsChoice: "Pick exactly two. Towns can't fund everything.",
    evidenceDrop: "Postcard time — show one reason clearly.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Answer the quick check before you move on.",
    reasonSort: "Tap a clue, then tap the bin — try again if it's wrong.",
    opsChoice: "Only two this year. A real need might have to wait — that's okay. Skip anything that's just for fun.",
    evidenceDrop: "Front = scene. Back = reason + evidence.",
    clearance: "Gates light up from work you already finished.",
  },

  intelDrop: {
    title: "Why is this place here?",
    kidPrompt: "Pick why you think this place is here.",
    // On-card Grade-3 paragraph (next to / under mystery image) — chips-only claim.
    kidParagraph:
      "Look at this place. Don't name the town yet. Your job: pick why people might live here. Tap the reason that fits best.",
    samOpener: "Look at this place. Don't name the town yet — pick why people might live here.",
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

  reasonSort: {
    title: "Community Reason Sort",
    kidPrompt: "Sort each example under the reason that fits best.",
    helpWrong: "Hmm — try another bin. Which reason matches that clue?",
    helpPass: "Nice sorting! Those three reasons show up all over town.",
    bins: [
      { id: "security", label: "Security & laws", emoji: "🛡️", color: "#00C2C7" },
      { id: "religious", label: "Religious freedom", emoji: "🕊️", color: "#7B5DFF" },
      { id: "material", label: "Material well-being", emoji: "🛒", color: "#FFC44D" },
    ],
    // 2 per TEKS bin: one obvious, one stretch (no keyword giveaways). Keys in server pack.
    items: [
      { id: "fire_safety", text: "Town hires firefighters and posts fire-safety rules" },
      { id: "school_zone", text: "Kids walk safer streets after the town posts school-zone signs" },
      { id: "meeting_house", text: "People can practice their beliefs in their own meeting house" },
      { id: "holy_days", text: "Families choose a town where nobody stops them from celebrating their holy days" },
      { id: "farm_market", text: "A market and road help farmers sell what they grow" },
      { id: "river_growth", text: "New homes and jobs grow near the river town" },
    ],
  },

  opsChoice: {
    title: "Founders' Council — Maple Crossing",
    pickHeader: "Pick exactly 2 projects to fund this year",
    constraint:
      "The new town can fund **only two** projects this year. Three help real community reasons — one is just for fun.",
    projects: [
      {
        id: "town_hall",
        label: "Town hall + community rules",
        reason: "Security and laws",
        shortReasonLabel: "Safe & fair",
        reasonId: "security",
        sceneId: "rules",
        emoji: "🏛️",
        teks: true,
        improves: "Safer streets and fair rules for everyone.",
      },
      {
        id: "worship_land",
        label: "Land set aside for a place of worship for anyone who wants it",
        reason: "Religious freedom",
        shortReasonLabel: "Believe freely",
        reasonId: "religious",
        sceneId: "worship",
        emoji: "🕊️",
        teks: true,
        improves: "People can practice their beliefs freely.",
      },
      {
        id: "market_road",
        label: "Market + road so farmers can sell food and goods",
        reason: "Material well-being",
        shortReasonLabel: "Food & jobs",
        reasonId: "material",
        sceneId: "market",
        emoji: "🛒",
        teks: true,
        improves: "Food, goods, and jobs stay nearby.",
      },
      {
        id: "toy_arcade",
        label: "Giant toy arcade and famous fun statue park",
        reason: "Sounds fun!",
        reasonId: null,
        sceneId: null,
        emoji: "🎮",
        teks: false,
        distractor: true,
        improves: null,
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
    deferredReasonChips: [
      { id: "security", label: "We're waiting on security and laws" },
      { id: "religious", label: "We're waiting on religious freedom" },
      { id: "material", label: "We're waiting on material well-being" },
    ],
    deferredPrompt: "Name the real community reason that waits until next year:",
    fundMeterLabel: "Fund meter — fill 2 slots",
    waitingLabel: "Waiting until next year",
    consequenceTitle: "What improves vs what waits",
    // P4 lean post-vote board (Grade 3 picture-first)
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two funded. One waits until next year.",
    distractorFailMessage:
      "That fun park isn't one of the three community reasons. Pick two projects that help security and laws, religious freedom, or material well-being.",
    // Kept for tip/reference; post-vote UI no longer shows this paragraph.
    debrief:
      "Which reasons did Maple Crossing put first? Which waited? Communities form for **security and laws**, **religious freedom**, and **material well-being** — towns just can't do everything on day one. Fun-only projects can wait.",
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
    hqIntro: "Agent report-in. Finish the progress gates from your work, then answer four quick questions.",
    // Progress gates are auto-ticked from saved phase work (read-only) — not honesty taps.
    progressGates: [
      { id: "claim", label: "Claim locked" },
      { id: "field", label: "All 3 Field Brief beats + QCs done" },
      { id: "sort", label: "Reason Sort complete" },
      { id: "postcard", label: "Postcard transmitted to HQ" },
    ],
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
        // Dynamic stem built in client — never names the answer in the prompt.
        prompt: "Think about Maple Crossing’s waiting project or your postcard evidence. Which TEKS reason fits?",
        dynamicReuse: true,
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
    ],
    // Legacy honesty self-check kept empty — gates replace free taps for G3.
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage:
      "Briefing cleared: Why Communities Form. Ask your teacher when you're ready for a Challenge.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · mission trail postcard",
  },
};
