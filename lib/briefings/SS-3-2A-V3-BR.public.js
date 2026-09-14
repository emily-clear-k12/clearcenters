// Briefing SS-3-2A-V3-BR — Why Communities Form — PUBLIC pack, v3 shape.
// Answer keys live only in SS-3-2A-V3-BR.server.js — never import that here.
//
// This is a SEPARATE briefing id from SS-3-2A-BR on purpose. The old one
// stays exactly as it is so the two can be assigned side by side and any
// student mid-way through the old one isn't reset. Swapping for good is a
// one-line change in index.public.js / index.server.js once this wins.
//
// Shape: lib/briefings/schema/ssThinkingLesson.schema.js — read that file's
// header for why this shape exists. Short version: the v2 lesson asked for
// 22 interactions that were all the same cognitive move (which of these
// three categories is this?), its clues contained their own answers, its
// apply phase had no wrong answer, and its assessment's distractors were
// jokes. This one adds the demands that were missing — defining community
// at all, sequencing and causation (TEKS 3.17(B), the process standard
// paired with 3.2A, which the old lesson never touched), interdependence
// the student works out rather than reads, transfer to a place they've
// never seen, and a civic decision with people on both sides of it.
//
// Grade-3 constraint throughout: NO TYPING. Every response is a tap, but
// the options combine into claims that can be false rather than matching
// one-to-one, so the tapping still carries a thought.
//
// ART NEEDED before this ships: `transfer` has no image yet — Cedar
// Landing doesn't exist as a drawing, so that phase currently runs as
// word chips only. It works, but the tap-the-evidence mechanic is much
// better with a picture. See the note in transfer below.

export const PUBLIC_BRIEFING = {
  id: "SS-3-2A-V3-BR",
  title: "Why Communities Form",
  tagline: "Four families stopped at a river crossing. Three hundred live there now.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssThinking",
  grade: 3,
  teks: "3.2A",
  teksText:
    "Identify reasons people form communities, including security and laws, religious freedom, and material well-being.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective: "I can explain why people form communities and back it up with evidence.",
  successCriteria:
    "Defines a community; names security & laws, religious freedom and material well-being; puts the town's three problems in order and says what caused what; finds a reason in a town they've never seen and proves it twice.",
  art: {
    intel: "/briefings/ss-3-2a-br/01-intel-drop-mystery-gate.png",
    beatSecurity: "/briefings/ss-3-2a-br/02-beat-security-laws.png",
    beatReligious: "/briefings/ss-3-2a-br/03-beat-religious-freedom.png",
    beatMaterial: "/briefings/ss-3-2a-br/04-beat-material-wellbeing.png",
    ops: "/briefings/ss-3-2a-br/05-maple-crossing.png",
  },
  phases: ["openingFrame", "storyTeach", "synthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: the council once voted to build the toy arcade first. Everyone went home for dinner and never voted again. The arcade is still waiting.",
    },
  },

  samLines: {
    openingFrame: "Four families, one river crossing. Are they a community yet?",
    storyTeach: "Three winters. Each problem comes from the last thing they fixed.",
    synthesis: "Put it back together — and then take a piece out.",
    reasonSort: "None of these clues say their answer out loud.",
    opsChoice: "Three people, three needs, two builds. Somebody waits.",
    transfer: "A town you've never seen. Find the reason and prove it twice.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "There's no marked answer on the first question — say what you think.",
    storyTeach: "Decide first, then find out what the town actually did.",
    synthesis: "Which problem could four families have had, before anyone else came?",
    reasonSort: "Tap a clue, then tap the reason. Read past the first word.",
    opsChoice: "All three are real needs. You can only build two.",
    transfer: "Every reason has proof here. Only one has two pieces.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Four Families",
    setup: "Four families stop at a river crossing and decide to stay.",
    isItPrompt: "Are they a community yet?",
    // No marked answer — all three are defensible, and it's a discussion
    // opener rather than an item. "Not yet" is the sharpest, but a student
    // who says "it depends what they do next" has the better instinct.
    isItOptions: [
      { id: "yes", text: "Yes — they live in the same place.", response: "A start. But lots of people share a place and never become one. Think of a crowded bus." },
      { id: "notyet", text: "Not yet — living near each other isn't enough.", response: "That's the sharp answer. Something else has to happen first." },
      { id: "depends", text: "Almost — it depends what they do next.", response: "Good instinct. What they do next is exactly what decides it." },
    ],
    traitsPrompt: "So what would make them one? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "They start depending on each other for something.", isTrait: true },
      { text: "They all look the same as each other.", isTrait: false, why: "No. Communities are full of people who are different from each other. That isn't what holds one together." },
      { text: "They agree on how things are going to work.", isTrait: true },
      { text: "They pick a name for the place.", isTrait: false, why: "You can name an empty field. A name doesn't make anybody depend on anybody." },
    ],
    traitsReveal:
      "That's it. A **community** is people who live or work together, depend on each other, and agree how things work. A town is one kind. So is a school, a street, or a group who meet to worship.",
    predictSetup: "Three hundred families live here now. Those first four stopped for **one** reason. The other two came later, because of problems the town hadn't had yet.",
    predictPrompt: "Which reason came first?",
    predictOptions: [
      { id: "security", label: "Security and laws", hint: "They wanted to feel safe" },
      { id: "religious", label: "Religious freedom", hint: "They wanted to believe their own way" },
      { id: "material", label: "Material well-being", hint: "They needed food, work and a home" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ isn't telling you yet — you'll find out by watching the town get built. Keep your guess.",
  },

  storyTeach: {
    ledgerTitle: "Why people stay",
    ledgerEmpty: "Nothing yet — you'll fill this in as the town grows.",
    namePrompt: "So — why did those families stay? Name it, and it goes in the ledger.",
    reasons: [
      { id: "security", label: "Security and laws" },
      { id: "religious", label: "Religious freedom" },
      { id: "material", label: "Material well-being" },
    ],
    firstReasonId: "security",
    predictionRight:
      "You called it. You said **security and laws**, and that's what stopped those first four families here.",
    predictionWrong:
      "You guessed **{GUESS}**. It was **security and laws** — four families stopped for a place where they knew what was fair.",
    finalLabel: "So — which one came first?",
    beats: [
      {
        id: "b1",
        title: "Four families at a river crossing",
        tag: "Winter one",
        imageKey: "beatSecurity",
        situation:
          "The land is good. But nobody has said whose field ends where — and at night, nobody is watching the road.",
        ask: "What should they do?",
        bestLead: "That's what they chose too. Here's why it worked.",
        choices: [
          { text: "Let the oldest family settle every argument.", whatIf: "That holds while there are four families. What happens at forty, when half have never met her?" },
          { text: "Write down rules everyone agrees to, and take turns watching the road.", best: true },
          { text: "Every family looks after its own land and stays out of everyone else's.", whatIf: "Then the strongest family wins every argument. Two families are gone by spring." },
        ],
        did: "They wrote the rules down and took turns on the night watch. People stay where they know what's fair and somebody is watching the road.",
        ledgerLine: "Security and laws — they knew what was fair.",
        vocabTerm: "laws",
        vocabMeaning: "the rules a town agrees to, written down so everyone knows them",
        realWorld: "Plenty of early Texas towns grew up right beside a fort. Families settled where somebody was already keeping watch.",
        stretch: {
          q: "Would this count as security and laws too?",
          options: [
            { text: "A town paints a slow-down zone outside the school.", ok: true, why: "Yes — same idea as the night watch. A rule the town agreed to, so people stay safe." },
            { text: "A town plants shade trees along the main street.", ok: false, why: "Lovely, but it isn't keeping anyone safe or settling what's fair. Not this reason." },
          ],
        },
        bridge: "Word travels. A safe place is worth walking to — and that's what brings the next problem.",
        nextLabel: "Next winter →",
      },
      {
        id: "b2",
        title: "Eleven more families arrive",
        tag: "Winter two",
        imageKey: "beatReligious",
        situation:
          "Three of them left their last town because they were told when and how they could pray. They're watching to see whether it will be the same here.",
        ask: "What should they do?",
        bestLead: "That's what they chose too. Here's why it worked.",
        choices: [
          { text: "Ask those three families to worship quietly at home.", whatIf: "That's the same rule they walked away from. They won't stay — and word travels about that too." },
          { text: "Set aside land where anyone who wants to can build a place to meet.", best: true },
          { text: "Build one meeting house that everybody shares and everybody uses.", whatIf: "Closer. But everybody *must* is still somebody else deciding for them." },
        ],
        did: "They set the land aside and let people build what they wanted on it. Nobody here tells you how to believe.",
        ledgerLine: "Religious freedom — nobody told them how to believe.",
        vocabTerm: "religious freedom",
        vocabMeaning: "being able to believe and worship your own way, without anyone stopping you",
        realWorld: "Families once sailed all the way across an ocean to start towns where nobody could tell them how to worship.",
        stretch: {
          q: "Would this count as religious freedom too?",
          options: [
            { text: "A family keeps their holy days without anyone telling them to stop.", ok: true, why: "Yes — nobody is deciding it for them. That's the whole idea." },
            { text: "A family joins in the town's biggest holiday parade.", ok: false, why: "Joining in is lovely, but nobody was stopping them either way. This reason is about the choice being theirs." },
          ],
        },
        bridge: "Fifteen families now, where there were four. That's a lot more mouths than the gardens were planted for.",
        nextLabel: "Next winter →",
      },
      {
        id: "b3",
        title: "The third winter",
        tag: "Winter three",
        imageKey: "beatMaterial",
        situation:
          "The gardens that fed four don't feed fifteen. Everything they can't grow has to come upriver, and it costs more than most of them have.",
        ask: "What should they do?",
        bestLead: "That's what they chose too. Here's why it worked.",
        choices: [
          { text: "Ask every family to eat a little less until spring.", whatIf: "You can ration one winter. You can't ration a town — and next winter there will be more people, not fewer." },
          { text: "Build a mill and a market, and cut a road down to the river dock.", best: true },
          { text: "Send the newest families back where they came from.", whatIf: "Then you've fixed it by shrinking. A town that solves problems by losing people isn't growing one." },
        ],
        did: "They built the mill, opened the market, and cut the road to the dock. Food, work, and a way to trade for the rest.",
        ledgerLine: "Material well-being — there was food, work and a way to trade.",
        vocabTerm: "material well-being",
        vocabMeaning: "having what your family needs to live — food, a home, work, goods",
        realWorld: "When gold was found in California, whole towns appeared inside a year. People came for the work.",
        stretch: {
          q: "Would this count as material well-being too?",
          options: [
            { text: "A town builds a grain mill so families can turn wheat into flour.", ok: true, why: "Yes — it's work, and it's food. That's what this reason means." },
            { text: "A town builds a giant toy shop with a slide out the front.", ok: false, why: "This is the one everybody trips on. Material well-being means what a family **needs** — food, a home, work, goods. Not the extras." },
          ],
        },
      },
    ],
  },

  synthesis: {
    title: "Put Maple Crossing back together",
    orderTag: "Part 1 · What happened when",
    orderPrompt: "Three problems, out of order. Tap them in the order the town hit them.",
    orderCards: [
      { id: "food", text: "Not enough food for fifteen families" },
      { id: "worship", text: "Three families with nowhere to worship" },
      { id: "watch", text: "Nobody watching the road at night" },
    ],
    causeTag: "Part 2 · What caused what",
    // The wrong options are events from LATER in the story. Reaching for
    // something from the wrong end of the timeline is the characteristic
    // causal-reasoning error at this age, so that's what they're for.
    causes: [
      {
        id: "c1",
        q: "Why did eleven more families arrive in the second winter?",
        options: [
          { text: "Because word spread that it was a safe place to settle.", ok: true, why: "Yes. The first problem's fix is what caused the second problem." },
          { text: "Because the market had opened.", ok: false, why: "The market didn't exist yet — that's the third winter." },
          { text: "Because the meeting house was built.", ok: false, why: "That came after they arrived. It's what the town did *because* they came." },
        ],
      },
      {
        id: "c2",
        q: "Why did the gardens run short in the third winter?",
        options: [
          { text: "Because there were fifteen families where there had been four.", ok: true, why: "Yes. The gardens never changed. The number of people did." },
          { text: "Because that winter was colder than the ones before.", ok: false, why: "Maybe it was. But nothing says so, and the gardens hadn't changed — look at what did." },
          { text: "Because people had stopped farming.", ok: false, why: "Nothing says that either. Compare winter one to winter three: what's the one thing that's different?" },
        ],
      },
    ],
    removeTag: "Part 3 · Take one away",
    removePrompt: "The town has all three now. Pull one out and see what happens to the rest.",
    removals: [
      {
        id: "security",
        label: "Take away the rules and the night watch",
        q: "The rules and the night watch are gone. What breaks first?",
        options: [
          { text: "Trade stops — when an argument has no answer, nobody wants to deal." },
          { text: "Nothing — the market runs itself." },
          { text: "The river freezes over." },
        ],
      },
      {
        id: "religious",
        label: "Take away the land for the meeting house",
        q: "The land set aside for the meeting house is gone. What breaks first?",
        options: [
          { text: "The families who came for it start leaving, and the town gets smaller." },
          { text: "Nothing — they can worship somewhere else." },
          { text: "The mill stops grinding." },
        ],
      },
      {
        id: "material",
        label: "Take away the mill and the market",
        q: "The mill and the market are gone. What breaks first?",
        options: [
          { text: "Families leave to find food — and an empty town doesn't need rules or a meeting house." },
          { text: "The night watch has more work to do." },
          { text: "Nothing much — they can grow their own food." },
        ],
      },
    ],
    bigIdea:
      "Pull any one out and the other two start to wobble. That's why the town needed all three — not three good things side by side, but three things holding each other up.",
  },

  reasonSort: {
    title: "Six clues",
    kidPrompt: "Tap a clue, then tap the reason. None of them say the answer out loud.",
    helpWrong: "Not that one — read it again.",
    helpPass: "All six filed. Not one told you the answer.",
    bins: [
      { id: "security", label: "Security & laws", emoji: "🛡️", color: "#00C2C7" },
      { id: "religious", label: "Religious freedom", emoji: "🕊️", color: "#7B5DFF" },
      { id: "material", label: "Material well-being", emoji: "🛒", color: "#FFC44D" },
    ],
    // Every clue was checked against auditThinkingQuality's no-giveaway
    // rule: none contains a word from its own bin's label or from that
    // bin's vocabulary definition. The first one points the wrong way on
    // purpose — a good harvest reads as material well-being until you get
    // to why they left.
    items: [
      { id: "left_good_harvest", text: "A family leaves a good harvest behind, because they were told they couldn't gather to pray." },
      { id: "wrote_boundary", text: "Two families stopped arguing the day somebody wrote where one field ends." },
      { id: "froze_nothing_trade", text: "The river froze, and by February there was nothing left to barter for." },
      { id: "old_songs", text: "A grandmother teaches the old songs out loud, windows open." },
      { id: "nothing_missing", text: "Strangers ride through weekly and nothing has gone missing." },
      { id: "wagon_road", text: "A new wagon track gets a farmer's grain to the buyers before it spoils." },
    ],
  },

  opsChoice: {
    title: "Founders' Council — Maple Crossing",
    pickHeader: "Pick exactly 2 projects to build this year",
    constraint: "The council can only build **two** things this year. All three are real needs.",
    scenario: "One wagon of tools. One crew. One year before winter. Three people have come to tell you what they think — and all three of them are right.",
    // Three voices with three different needs is what turns this from a
    // resource puzzle into a civic decision. The v2 version had a joke
    // fourth option instead, which meant any two of three passed and there
    // was nothing to defend.
    voices: [
      { id: "material", who: "Sela, the miller", emoji: "🌾", said: "Nothing else matters if we can't eat. Build the market and the road." },
      { id: "religious", who: "The Ward family, arrived last spring", emoji: "🚶", said: "We left a town that told us how to worship. Don't make us wait another year to find out if this one will too." },
      { id: "security", who: "Amos, on the night watch", emoji: "🔦", said: "I've walked that road alone for two years. We need rules everyone agreed to." },
    ],
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
        label: "A market and a road so farmers can sell what they grow",
        reason: "Material well-being",
        shortReasonLabel: "Food & jobs",
        reasonId: "material",
        sceneId: "market",
        emoji: "🛒",
        teks: true,
        improves: "Food, goods, and jobs stay close to home.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "We need to stay safe",
      "People should be free to believe",
      "People need food, homes, and jobs",
      "We can build the third next year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "security", label: "Security and laws is still waiting" },
      { id: "religious", label: "Religious freedom is still waiting" },
      { id: "material", label: "Material well-being is still waiting" },
    ],
    deferredPrompt: "Which real community reason is still waiting?",
    fundMeterLabel: "Build meter — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets built vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two built. One real reason waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real needs here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three of them were telling the truth about what they needed. You could only build two, so somebody was always going to be right and still have to wait. That's the hard part of deciding for a whole town.",
    whoseWrong: "Read what each of them said again. Somebody stood in front of you and described exactly this.",
    // NOTE: the legacy `debrief` paragraph other packs carry is deliberately
    // omitted — the player has never rendered it, and shipping content a
    // student can't see is the thing this rebuild is trying to stop.
  },

  transfer: {
    title: "Cedar Landing",
    kidPrompt: "A town you've never seen. New families keep arriving. Tap the **two things** that show why.",
    // ART NEEDED: no drawing of Cedar Landing exists yet, so imageKey is
    // deliberately left out and this renders as word chips. It works, but
    // the mechanic is much stronger with a picture — the spot x/y values
    // below are already positioned for a 600x300-ish scene so they'll work
    // the moment art lands.
    imageAlt: "A small river town with posted rules, a meeting house, a market stall, a river dock and a playground",
    spots: [
      { id: "sign", label: "Posted rules", x: 12, y: 62 },
      { id: "meeting", label: "Meeting house", x: 33, y: 56 },
      { id: "market", label: "Market stall", x: 54, y: 58 },
      { id: "dock", label: "River dock", x: 76, y: 74 },
      { id: "play", label: "Playground", x: 92, y: 52 },
    ],
    tapCount: 2,
    claimFrame: "New families are coming to Cedar Landing for…",
    claimOptions: [
      { id: "security", label: "security and laws" },
      { id: "religious", label: "religious freedom" },
      { id: "material", label: "material well-being" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you're cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three winters" },
      { id: "together", label: "Put back together" },
      { id: "sort", label: "Six clues filed" },
      { id: "newtown", label: "Cedar Landing" },
    ],
    // Every distractor is a mistake a third grader actually makes. The v2
    // version offered "sports; shopping; vacations", which a student who
    // learned nothing could eliminate — meaning the item couldn't tell you
    // who understood and who didn't, which is the only thing it's for.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which three reasons bring people together to start a community?",
        choices: [
          { id: "a", text: "security and laws · religious freedom · material well-being" },
          { id: "b", text: "security and laws · religious freedom · being bigger than the next town" },
          { id: "c", text: "good weather · religious freedom · material well-being" },
          { id: "d", text: "security and laws · everyone believing the same · material well-being" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Which one of these shows security and laws?",
        choices: [
          { id: "a", text: "A town agrees on rules, so arguments have an answer." },
          { id: "b", text: "A town has more soldiers than any town near it." },
          { id: "c", text: "A town is so far away that nobody ever bothers it." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Three towns. Which one has religious freedom?",
        choices: [
          { id: "a", text: "In Bell Hollow, families worship different ways and nobody stops them." },
          { id: "b", text: "In Ash Ford, every family goes to the same meeting house every week." },
          { id: "c", text: "In Rye Creek, a rule says nobody may talk about what they believe." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Cedar Landing builds a grain mill and a fancy hat shop. Which is material well-being?",
        choices: [
          { id: "a", text: "The mill — families need food, and it gives people work." },
          { id: "b", text: "The hat shop — it makes the town a nicer place to be." },
          { id: "c", text: "Both — anything new a town builds is material well-being." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        prompt: "If Maple Crossing could keep only one of its three reasons, which would you keep?",
        // No answer key. The OPINION is the student's and goes to the
        // teacher; the LOGIC is checked — "I'd keep security and laws
        // because without it families wouldn't have enough to eat" comes
        // back, and so does the ending that argues with itself.
        keepFrame: "I'd keep ______, because without it ______.",
        keepOptions: [
          { id: "security", label: "security and laws" },
          { id: "religious", label: "religious freedom" },
          { id: "material", label: "material well-being" },
        ],
        becauseOptions: [
          { id: "security", label: "families wouldn't feel safe enough to stay" },
          { id: "religious", label: "families would be told how to believe again" },
          { id: "material", label: "families wouldn't have enough to eat" },
          { id: "none", label: "the town would be fine anyway — it's the one it needs least" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Why Communities Form. Take your card with you.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher: "For the wall. Twenty of these go up and no two classes agree — that's tomorrow's discussion, already written by the students.",
    },
  },
};
