// Briefing SS-3-2A-BR — Why Communities Form — PUBLIC pack.
// Converted from docs/briefings/SS-3-2A-BR-why-communities-form.md.
// Answer keys live only in SS-3-2A-BR.server.js — never import that here.
//
// Sept 14, 2026 — REBUILT (second pass). The first v2 pass only touched
// minutes/engagement and left the actual lesson content untouched — Emily
// played it and correctly called it out as "the same as the previous
// version." This pass rewrites intelDrop and fieldBrief (the teach) and
// reworks opsChoice and evidenceDrop (the apply/evidence phases) with a
// single throughline: this is the origin story of Maple Crossing itself —
// an old settler travel log, not an abstract "guess why this place is
// here" mystery card. Reason Sort's mechanic stays (Emily didn't flag the
// mechanic, only the writing), and every item id / project id / scene id
// is kept identical to the pre-rebuild file on purpose, so the server
// answer key needed zero changes — see SS-3-2A-BR.server.js's header.
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
  minutes: 20,
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

  // Sept 14, 2026 — Briefings v2 engagement block (see
  // lib/briefings/schema/engagement.schema.js). Progress trail replaces
  // the old "Phase 3 of 6" style label; hiddenBonus is a silly, ungraded
  // S.A.M. line shown once after Clearance. No celebration-burst — Emily
  // explicitly didn't like it.
  engagement: {
    progressTrail: { enabled: true, steps: 6 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: Maple Crossing's Founders' Council once tried to fund the toy arcade FIRST. Everyone left to go find dinner. The arcade is still waiting.",
    },
  },

  // Short kid lines only — SamGuide shows these; tap for tipOnTap; no auto-dump.
  samLines: {
    intelDrop: "Found an old travel log. Read what made a family stop walking and stay right here.",
    fieldBrief: "Three reasons turned this stop into a town. One beat at a time.",
    reasonSort: "Sort each clue from Maple Crossing's early days into the reason bin that fits.",
    opsChoice: "Pick exactly two builds. Maple Crossing can't build everything year one.",
    evidenceDrop: "Postcard time — show one reason clearly.",
    clearance: "HQ check-in. Show what you know.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    intelDrop: "Tap a chip that matches your best guess.",
    fieldBrief: "Answer the quick check before you move on.",
    reasonSort: "Tap a clue, then tap the bin — try again if it's wrong.",
    opsChoice: "Only two this year. A real reason might have to wait — that's okay. Skip anything that's just for fun.",
    evidenceDrop: "Front = scene. Back = reason + evidence.",
    clearance: "Gates light up from work you already finished.",
  },

  intelDrop: {
    title: "Before Maple Crossing Was a Town",
    kidPrompt: "Read the settler's note. Pick why you think they decided to stay.",
    kidParagraph:
      "HQ found an old travel log. A family had been walking for days, looking for a place to settle down. One night they wrote down why THIS spot — not the last one — was the one they'd stay at. Pick the reason you think convinced them.",
    samOpener: "Found an old travel log. Read what made a family stop walking and stay right here.",
    claimFrame: "I think they stayed because __________.",
    // Chip-only for G3 — no Notice/Wonder free-text.
    claimChips: ["safety", "rules", "beliefs", "food/jobs", "school", "friends"],
    claimMode: "chipsOnly",
    reveal:
      "Good instinct. That family's reason turned out to be one of three big ones HQ tracks: **security and laws**, **religious freedom**, or **material well-being**. That first family's choice is how Maple Crossing got its start.",
    learningTarget:
      "People form communities for **security and laws**, **religious freedom**, and **material well-being**.",
  },

  fieldBrief: {
    vocab: [
      { term: "community", meaning: "a group of people who live and work together in one place", icon: "🏘️", color: "#7B5DFF" },
      { term: "security", meaning: "being safe and protected from harm", icon: "🛡️", color: "#00C2C7" },
      { term: "laws", meaning: "rules a community agrees to follow so life stays fair", icon: "📜", color: "#FFC44D" },
      { term: "religious freedom", meaning: "the freedom to believe and worship in your own way", icon: "🕊️", color: "#7B5DFF" },
      {
        term: "material well-being",
        meaning: "having the everyday things people need to live well — food, homes, jobs, goods",
        icon: "🛒",
        color: "#00C2C7",
      },
    ],
    beats: [
      {
        id: "beat1",
        title: "Security and laws",
        body: "Maple Crossing's first families wanted to feel safe. So they made simple **laws** — rules about where to build and who watches the road at night. Firefighters and posted speed limits are signs of security and laws today.",
        example: "Maple Crossing's first rule: no fires after dark near the barns.",
        imageKey: "beatSecurity",
        qcId: "qc1",
      },
      {
        id: "beat2",
        title: "Religious freedom",
        body: "Other families came to Maple Crossing for a different reason. Back home, they'd been told how they could worship. Here, nobody stopped them. That's **religious freedom** — believing your own way, without hiding it.",
        example: "A chapel went up in year two. These families had never been allowed one before.",
        imageKey: "beatReligious",
        qcId: "qc2",
        teacherNote: "Keep civic and respectful — freedom to believe, not comparing religions.",
      },
      {
        id: "beat3",
        title: "Material well-being",
        body: "Most families came for something simpler. They needed to eat, work, and build a home. Maple Crossing sat near a river — good for water, a mill, and boats to trade goods. That's **material well-being**: having what a family needs, not just extra toys.",
        example: "The river gave Maple Crossing its first mill and its first market.",
        imageKey: "beatMaterial",
        qcId: "qc3",
      },
    ],
    quickChecks: [
      {
        id: "qc1",
        prompt: "Maple Crossing's first rule was \"no fires after dark.\" Which reason does that match?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
      {
        id: "qc2",
        prompt: "A family builds a chapel because nobody here stops them from worshipping their own way. Which reason?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
      {
        id: "qc3",
        prompt: "A mill and a market open by the river so families can work and trade. Which reason?",
        choices: [
          { id: "a", text: "Security and laws" },
          { id: "b", text: "Religious freedom" },
          { id: "c", text: "Material well-being" },
        ],
      },
    ],
    trapLine:
      "Material well-being just means Maple Crossing wanted to look fancy. → False; it's needs like food, homes, jobs, and goods — not extras.",
    requireQcBeforeNext: true,
  },

  reasonSort: {
    title: "Maple Crossing Reason Sort",
    kidPrompt: "Sort each clue from Maple Crossing's early days under the reason it fits best.",
    helpWrong: "Hmm — try another bin. Which reason matches that part of the story?",
    helpPass: "Nice sorting! Those three reasons built this whole town.",
    bins: [
      { id: "security", label: "Security & laws", emoji: "🛡️", color: "#00C2C7" },
      { id: "religious", label: "Religious freedom", emoji: "🕊️", color: "#7B5DFF" },
      { id: "material", label: "Material well-being", emoji: "🛒", color: "#FFC44D" },
    ],
    // 2 per TEKS bin: one obvious, one stretch (no keyword giveaways). Keys in server pack.
    items: [
      { id: "fire_safety", text: "Maple Crossing posts a night watch and a no-fires-after-dark rule" },
      { id: "school_zone", text: "The town paints a slow-down zone on the road by the new schoolhouse" },
      { id: "meeting_house", text: "A family builds a small chapel and nobody tells them to stop" },
      { id: "holy_days", text: "New settlers pick Maple Crossing to keep their holy days in peace" },
      { id: "farm_market", text: "A market stall opens so farmers can trade what they grow" },
      { id: "river_growth", text: "New homes and a mill spring up once the river makes work easy to find" },
    ],
  },

  opsChoice: {
    title: "Founders' Council — Maple Crossing",
    pickHeader: "Pick exactly 2 projects to build this year",
    constraint:
      "It's Maple Crossing's very first year. The council can only build **two** things right now. Three ideas match real community reasons — one is just for fun.",
    scenario:
      "One wagon of tools. One crew of builders. One year before winter. Whatever doesn't get picked has to wait.",
    projects: [
      {
        id: "town_hall",
        label: "A town hall and a first set of shared rules",
        reason: "Security and laws",
        shortReasonLabel: "Safe & fair",
        reasonId: "security",
        sceneId: "rules",
        emoji: "🏛️",
        teks: true,
        improves: "Streets get safer and rules get fair for everyone.",
      },
      {
        id: "worship_land",
        label: "Land set aside where anyone can build a place to worship",
        reason: "Religious freedom",
        shortReasonLabel: "Believe freely",
        reasonId: "religious",
        sceneId: "worship",
        emoji: "🕊️",
        teks: true,
        improves: "Families can practice their beliefs out in the open.",
      },
      {
        id: "market_road",
        label: "A market and a real road so farmers can sell what they grow",
        reason: "Material well-being",
        shortReasonLabel: "Food & jobs",
        reasonId: "material",
        sceneId: "market",
        emoji: "🛒",
        teks: true,
        improves: "Food, goods, and jobs stay close to home.",
      },
      {
        id: "toy_arcade",
        label: "A giant toy arcade and a famous fun statue park",
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
      "We can add the third project later",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "security", label: "Security and laws is still waiting" },
      { id: "religious", label: "Religious freedom is still waiting" },
      { id: "material", label: "Material well-being is still waiting" },
    ],
    deferredPrompt: "Which real community reason is Maple Crossing still waiting on?",
    fundMeterLabel: "Build meter — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets built vs. what waits",
    // P4 lean post-vote board (Grade 3 picture-first)
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two built. One real reason waits for next year.",
    distractorFailMessage:
      "That fun park isn't one of the three community reasons. Pick two projects that help security and laws, religious freedom, or material well-being.",
    // Kept for tip/reference; post-vote UI no longer shows this paragraph.
    debrief:
      "Which reasons did Maple Crossing build first? Which had to wait? Communities form for **security and laws**, **religious freedom**, and **material well-being** — new towns just can't build everything in year one. Fun-only projects can always wait.",
  },

  evidenceDrop: {
    title: "Postcard from Maple Crossing's First Year",
    frontHint: "Pick a scene that clearly shows **one** reason.",
    // Map scene stickers to beat art when available.
    frontScenes: [
      {
        id: "rules",
        label: "New rules and a night watch",
        reason: "security and laws",
        imageKey: "beatSecurity",
        sticker: "🛡️",
      },
      {
        id: "worship",
        label: "A new chapel, built in the open",
        reason: "religious freedom",
        imageKey: "beatReligious",
        sticker: "🕊️",
      },
      {
        id: "market",
        label: "A market and mill by the river",
        reason: "material well-being",
        imageKey: "beatMaterial",
        sticker: "🛒",
      },
    ],
    carryForwardOps: true,
    carryForwardPrompt: "You built {X} & {Y} — pick one to show on your postcard",
    backFrame: "Maple Crossing's people came together because __________. You can see it because __________.",
    reasonOptions: ["security and laws", "religious freedom", "material well-being"],
    evidenceChips: [
      "new rules and a night watch",
      "a new chapel where people worship freely",
      "a market and mill by the river",
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
