// Briefing SS-3-7C-V3-BR — The Wrong Desk — PUBLIC pack, category shape.
// Answer keys live only in SS-3-7C-V3-BR.server.js — never import that here.
//
// First lesson on Type 4 (categories). Shape contract and the reasoning:
// lib/briefings/schema/ssCategoryLesson.schema.js.
//
// WHY THIS LESSON LOOKS THE WAY IT DOES. TEKS 3.7C says "identify services
// commonly provided by local, state, and national governments." Read plainly
// that is a three-bin sort — which is exactly the shallow lesson the whole v3
// rebuild exists to replace. So two things are different here:
//
//   1. Every round is a problem arriving at the WRONG DESK, with a real cost
//      for getting it wrong. A neighbour writes to the governor about a
//      pothole; four months later the letter reaches the city and the hole is
//      bigger. Sorting matters because misfiling costs something.
//   2. The graded step names the RULE, not the level. "It only reaches the
//      people right here" / "it has to work everywhere in Texas" / "it has to
//      work the same in every state." Naming the level would be the sort again
//      with extra steps. Naming the rule is what lets a child place a service
//      nobody taught them.
//
// A NOTE ON ACCURACY. Real government overlaps, and pretending it doesn't
// would be teaching a tidy falsehood. Schools are the clearest case: the
// district runs them and the state sets much of what they must do and pays a
// large share. That overlap is not hidden here — it is `boundarySynthesis`'s
// first boundary case, and the correct answer to it is "both, and that's
// normal." Clean examples were chosen for the teach (bin collection, driver's
// licences, the mail) and the genuinely shared ones held back for the edge.
//
// ART NEEDED (none of these exist yet):
//   deskRow      — three service counters side by side, each with a queue
//   beatPothole  — a street with a hole in it and a letter on a desk
//   beatLicence  — a counter with a long line and a clock
//   beatMail     — a blue mailbox and a map with a long line across it
//   orrin        — the transfer town (runs as word chips until it exists)

export const PUBLIC_BRIEFING = {
  id: "SS-3-7C-V3-BR",
  title: "The Wrong Desk",
  tagline: "Four months to fix a pothole, because the letter went to the wrong building.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssCategory",
  grade: 3,
  teks: "3.7C",
  teksText: "Identify services commonly provided by local, state, and national governments.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can say which government takes care of which services, and explain the rule that decides.",
  successCriteria:
    "Names services run by local, state and national government; uses the reach rule to place a service nobody taught them; explains why two levels sometimes share one job.",

  levels: [
    { id: "local", label: "Local", blurb: "Your town or county." },
    { id: "state", label: "State", blurb: "All of Texas." },
    { id: "national", label: "National", blurb: "The whole country." },
  ],

  // The lesson's actual content. The student names one of these, not a level.
  rules: [
    { id: "here", label: "It only reaches the folks right here." },
    { id: "statewide", label: "It has to work anywhere in Texas." },
    { id: "everywhere", label: "It has to work the same in all fifty." },
  ],

  art: {
    deskRow: "/briefings/ss-3-7c-v3-br/01-three-desks.jpg",
    beatPothole: "/briefings/ss-3-7c-v3-br/02-pothole-letter.jpg",
    beatLicence: "/briefings/ss-3-7c-v3-br/03-licence-queue.jpg",
    beatMail: "/briefings/ss-3-7c-v3-br/04-mailbox-map.jpg",
  },

  phases: ["openingFrame", "wrongDesk", "boundarySynthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: HQ once sent a complaint about a broken vending machine to three different governments. All three wrote back. None of them owned the machine.",
    },
  },

  samLines: {
    openingFrame: "Three desks. Everything the government does sits at one of them.",
    wrongDesk: "Somebody takes a problem to the wrong desk. Watch what it costs.",
    boundarySynthesis: "Now the tricky ones — and what happens if a desk closes.",
    reasonSort: "Seven jobs. None of them say which desk out loud.",
    opsChoice: "Three things the town wants. You can push for two.",
    transfer: "A town you've never seen. Which desk is busiest here?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    wrongDesk: "Ask how far it reaches. That's the whole trick.",
    boundarySynthesis: "Some jobs really do belong to two desks. That's allowed.",
    reasonSort: "Read the whole clue before you tap.",
    opsChoice: "All three are real. You can only push two.",
    transfer: "Every desk has one piece of proof. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Three Desks",
    setup:
      "Governments come in three sizes: your town, the state of Texas, and the whole country. Each one takes care of different things.",
    isItPrompt: "Who do you think fixes the road right outside your school?",
    // No marked answer — it is genuinely arguable until you know whether that
    // road is a town street or a state highway, which is the point.
    isItOptions: [
      { id: "town", text: "The town.", response: "Usually right. Most of the roads you walk on belong to the town." },
      { id: "texas", text: "The state of Texas.", response: "Sometimes right. If that road carries traffic between towns, Texas owns it — even the bit outside your school." },
      { id: "depends", text: "Depends which road it is.", response: "That's the answer HQ would give. It depends on how far the road goes." },
    ],
    traitsPrompt: "So what decides which government takes care of a thing? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "How many people it reaches.", isTrait: true },
      {
        text: "How much it costs to do.",
        isTrait: false,
        why: "A cheap thing can be the whole country's job and an expensive thing can be one town's. Price doesn't decide the desk.",
      },
      { text: "Whether it has to be the same in other places.", isTrait: true },
      {
        text: "How old the service is.",
        isTrait: false,
        why: "The mail is older than the state of Texas, and your town's bin collection is newer than both. Age doesn't decide anything.",
      },
    ],
    traitsReveal:
      "That's the trick. Ask **how far a thing reaches.** One street or one town — that's **local**. Across Texas — that's **state**. Has to work the same in all fifty — that's **national**.",
    predictSetup:
      "Coming up: a hole in a road, a sixteen-year-old who wants to drive, and a parcel going to Maine.",
    predictPrompt: "What do you think happens when somebody takes a problem to the wrong desk?",
    predictOptions: [
      { id: "fixed", label: "They fix it anyway — a government is a government", hint: "Somebody will sort it out" },
      { id: "waits", label: "It waits, and gets passed along, and takes months", hint: "Nobody at that desk can act" },
      { id: "lost", label: "Nothing happens at all and nobody ever replies", hint: "Straight in the bin" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. You'll find out at all three desks. Keep your guess.",
  },

  wrongDesk: {
    // Which openingFrame.predictOption the teach settles the locked guess to.
    // Checked against openingFrame.predictOptions by crossCheckLesson.
    resolvesPredictionTo: "waits",
    ledgerTitle: "Which desk, and why",
    ledgerEmpty: "Nothing yet — you'll fill this in one problem at a time.",
    rulePrompt: "So which rule decided that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it. **It waits, and gets passed along.** Nobody at the wrong desk can act, and nobody at the wrong desk tells you that quickly.",
    predictionWrong:
      "You guessed **{GUESS}**. What actually happens: **it waits, and gets passed along, and takes months.** The wrong desk can't act — it can only forward.",
    finalLabel: "So — what happens at the wrong desk?",
    rounds: [
      {
        id: "w1",
        levelId: "local",
        tag: "Problem one",
        imageKey: "beatPothole",
        situation:
          "A hole in Mabel Street has been growing since spring. A neighbour finally writes a letter about it — to the Governor of Texas.",
        wrongDeskLine: "The letter goes to Austin.",
        whatWentWrong:
          "It was read, filed, and forwarded to the city. That took four months, and the hole got bigger the whole time.",
        routePrompt: "Where should that letter have gone?",
        routeOptions: [
          { text: "The city — Mabel Street belongs to the town.", best: true, levelId: "local" },
          { text: "The state — roads are roads.", levelId: "state", whatIf: "Texas owns the highways between towns. It doesn't own Mabel Street, and it can't send a crew to one." },
          { text: "The national government — it's a road in America.", levelId: "national", whatIf: "Then Washington would be fixing four million streets. It has never fixed one." },
        ],
        ruleOptions: [
          { id: "here", label: "It only reaches the folks right here." },
          { id: "statewide", label: "It has to work anywhere in Texas." },
          { id: "everywhere", label: "It has to work the same in all fifty." },
        ],
        ledgerLine: "Local — one street, one town.",
        vocabTerm: "local government",
        vocabMeaning: "the government of one town or county, which runs what only that town uses",
        realWorld: "Almost everything people actually phone a government about is local: bins, water, streets, the library.",
        stretch: {
          q: "Would this be the same desk?",
          options: [
            { text: "Deciding what time the town pool opens.", ok: true, why: "Yes — one pool, one town, nobody else affected." },
            { text: "Deciding the rules for getting a driver's licence.", ok: false, why: "That can't be one town's call. You'd need a different licence in every town you drove through." },
          ],
        },
        nextLabel: "Next problem →",
      },
      {
        id: "w2",
        levelId: "state",
        tag: "Problem two",
        imageKey: "beatLicence",
        situation:
          "Nadia turns sixteen and wants to drive. She takes her one day off work and queues at city hall.",
        wrongDeskLine: "She queues for an hour at the wrong counter.",
        whatWentWrong:
          "City hall sent her to a licence office forty miles away. Her day off was gone and she still couldn't drive.",
        routePrompt: "Where should Nadia have gone?",
        routeOptions: [
          { text: "The city — she lives in the city.", levelId: "local", whatIf: "Then her licence would only be good in her own town. Drive to the next one and you'd need another." },
          { text: "The state — Texas gives out the licences.", best: true, levelId: "state" },
          { text: "The national government — driving happens in every state.", levelId: "national", whatIf: "It does. But each state still sets its own driving rules and its own test — which is why moving states means a new licence." },
        ],
        ruleOptions: [
          { id: "here", label: "It only reaches the folks right here." },
          { id: "statewide", label: "It has to work anywhere in Texas." },
          { id: "everywhere", label: "It has to work the same in all fifty." },
        ],
        ledgerLine: "State — one licence, good in every Texas town.",
        vocabTerm: "state government",
        vocabMeaning: "the government of all Texas, which runs what has to be the same in every town here",
        realWorld: "It's why a licence from Amarillo works in Brownsville — and why moving to Oklahoma means getting a new one.",
        stretch: {
          q: "Would this be the same desk?",
          options: [
            { text: "The highway that runs between two cities.", ok: true, why: "Yes — it belongs to neither town, and both need it. That's the state's job." },
            { text: "The opening hours of your town library.", ok: false, why: "One library, one town. Nobody in Dallas needs a say in it." },
          ],
        },
        nextLabel: "Next problem →",
      },
      {
        id: "w3",
        levelId: "national",
        tag: "Problem three",
        imageKey: "beatMail",
        situation:
          "A grandmother in Texas posts a parcel to her grandson in Maine. It has to cross eight states to get there.",
        wrongDeskLine: "Suppose Texas ran the post instead.",
        whatWentWrong:
          "The parcel would be handed over at every state line, to a service with its own stamps and its own prices. One parcel, eight sets of stamps.",
        routePrompt: "Who has to be in charge of that?",
        routeOptions: [
          { text: "The city — it was posted here.", levelId: "local", whatIf: "Your town can't tell Maine what to do with a parcel, and Maine can't tell your town." },
          { text: "The state — Texas should handle Texas post.", levelId: "state", whatIf: "It starts in Texas and ends somewhere Texas has no say at all. Somebody has to cover both ends." },
          { text: "The national government — it crosses state lines.", best: true, levelId: "national" },
        ],
        ruleOptions: [
          { id: "here", label: "It only reaches the folks right here." },
          { id: "statewide", label: "It has to work anywhere in Texas." },
          { id: "everywhere", label: "It has to work the same in all fifty." },
        ],
        ledgerLine: "National — it has to cross state lines.",
        vocabTerm: "national government",
        vocabMeaning: "the government of the whole country, which runs what has to be the same in all fifty",
        realWorld: "One stamp costs the same whether the letter goes next door or two thousand miles. That only works if one service covers all of it.",
        stretch: {
          q: "Would this be the same desk?",
          options: [
            { text: "Printing the money everybody spends.", ok: true, why: "Yes — money from Texas has to be worth the same in Maine, or it isn't money." },
            { text: "Choosing where the new town park goes.", ok: false, why: "Nobody outside your town has any stake in that at all." },
          ],
        },
      },
    ],
  },

  boundarySynthesis: {
    title: "The tricky ones",
    sortTag: "Part 1 · Which desk?",
    sortPrompt: "Tap a job, then tap the desk. None of them say it out loud.",
    columns: [
      { id: "local", label: "Local" },
      { id: "state", label: "State" },
      { id: "national", label: "National" },
    ],
    sortItems: [
      { id: "binTruck", text: "The truck that empties your bin on Thursdays." },
      { id: "sixteen", text: "The counter you visit when you turn sixteen and want to drive." },
      { id: "parkDusk", text: "Whoever decides the park gates shut at dusk." },
      { id: "letterMaine", text: "The folks who make sure a letter reaches Maine." },
      { id: "cityHighway", text: "Who repairs the highway running between two cities." },
      { id: "printMoney", text: "The ones who print the money in your pocket." },
      { id: "kitchenFire", text: "Who comes when your kitchen catches fire." },
    ],
    boundaryTag: "Part 2 · The ones that don't sit still",
    // Real government overlaps. Pretending it doesn't would be teaching a tidy
    // falsehood, and the edge is where a category's definition actually lives.
    boundaries: [
      {
        id: "b1",
        q: "Your school. Which desk?",
        options: [
          { text: "Both — the district runs it, and Texas decides a lot of what it must do.", ok: true, why: "Right, and that's normal. Plenty of jobs are shared. The trick is knowing which part belongs to whom." },
          { text: "Only the town, because it's your town's school.", ok: false, why: "Your district does run it. But Texas sets much of what gets taught and pays a big share — so it isn't only the town." },
          { text: "Only the national government, because every child goes to school.", ok: false, why: "Every child does. But nobody in Washington decides your school day — that's settled much closer to home." },
        ],
      },
      {
        id: "b2",
        q: "The road out of town towards Dallas. Which desk?",
        options: [
          { text: "The state — it runs between towns, so it can't belong to either one.", ok: true, why: "Exactly. Use the reach rule: it starts in one town and ends in another, so it's neither town's." },
          { text: "The town it starts in.", ok: false, why: "Then the far end would belong to somebody else, and they'd have to agree about every pothole." },
          { text: "The national government, because roads connect everybody.", ok: false, why: "Not unless it crosses a state line. This one never leaves Texas." },
        ],
      },
    ],
    removeTag: "Part 3 · Close a desk",
    removePrompt: "Suppose Texas had no state government at all, and every town decided everything for itself.",
    removeOne: {
      q: "What goes wrong first?",
      options: [
        { text: "A licence from your town wouldn't work in the next town along." },
        { text: "The post would stop being delivered." },
        { text: "Nothing much. Towns can handle their own business.", isNoChange: true },
      ],
    },
    bigIdea:
      "Three desks, one question: how far does it reach? One street, one state, or all fifty. And some jobs sit at two desks at once — which is not a mistake, it's how it actually works.",
  },

  reasonSort: {
    title: "Seven jobs",
    kidPrompt: "Tap a job, then the desk it belongs to.",
    helpWrong: "Not that one — how far does it reach?",
    helpPass: "All seven filed. Not one said its desk out loud.",
    bins: [
      { id: "local", label: "Local", emoji: "🏘️", color: "#00C2C7" },
      { id: "state", label: "State", emoji: "🤠", color: "#7B5DFF" },
      { id: "national", label: "National", emoji: "🦅", color: "#FFC44D" },
    ],
    // Counts are uneven (3/2/2) so the last few can't be got by elimination.
    items: [
      { id: "r_bins", text: "Emptying the bins every Thursday morning." },
      { id: "r_sixteen", text: "The counter you visit at sixteen to learn to drive." },
      { id: "r_dusk", text: "Deciding the park gates shut at dusk." },
      { id: "r_maine", text: "Getting a letter all the way to Maine." },
      { id: "r_between", text: "Repairing the road that links two cities." },
      { id: "r_money", text: "Printing the money in your pocket." },
      { id: "r_fire", text: "Coming out when a kitchen catches fire." },
    ],
  },

  opsChoice: {
    title: "Town Meeting — Kettle Bend",
    pickHeader: "Pick exactly 2 to push for this year",
    constraint: "Kettle Bend can chase **two** of these this year. All three are real.",
    scenario:
      "Kettle Bend wants three things, and each one has to be asked of a different desk. The meeting can only chase two.",
    voices: [
      { id: "local", who: "Del, who drives the bin truck", emoji: "🏘️", said: "Half the lanes on the east side still aren't on my route. That's ours to fix and we keep not fixing it." },
      { id: "state", who: "Ms. Oyelaran, who commutes", emoji: "🤠", said: "There's no exit off the highway for eleven miles. Ask Austin, or nobody ever stops here." },
      { id: "national", who: "Bern, who is eighty-one", emoji: "🦅", said: "Nearest post office is a forty-minute round trip. I'd like to post a birthday card without making a day of it." },
    ],
    projects: [
      {
        id: "bin_routes",
        label: "Get the east-side lanes onto the town's bin route",
        reason: "Local",
        shortReasonLabel: "Our desk",
        reasonId: "local",
        sceneId: "bins",
        emoji: "🏘️",
        teks: true,
        improves: "Every street gets collected, not just the ones near the middle.",
      },
      {
        id: "highway_exit",
        label: "Ask Texas for a highway exit at Kettle Bend",
        reason: "State",
        shortReasonLabel: "Austin's desk",
        reasonId: "state",
        sceneId: "exit",
        emoji: "🤠",
        teks: true,
        improves: "Traffic can stop here, so the shops on Main Street get customers.",
      },
      {
        id: "post_office",
        label: "Ask for a post office in town",
        reason: "National",
        shortReasonLabel: "Washington's desk",
        reasonId: "national",
        sceneId: "post",
        emoji: "🦅",
        teks: true,
        improves: "Nobody has to drive forty minutes to post a letter.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "It only affects people right here",
      "It has to come from Austin",
      "Only the whole country can do that one",
      "The third one can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "local", label: "The local one is still waiting" },
      { id: "state", label: "The state one is still waiting" },
      { id: "national", label: "The national one is still waiting" },
    ],
    deferredPrompt: "Which desk is still waiting?",
    fundMeterLabel: "Push meter — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets chased vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two chased. One desk waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right about their own desk. A town only has so many letters and so many meetings in it, so somebody was always going to be right and still have to wait.",
    whoseWrong: "Read what each of them said again. Somebody stood up and described exactly this.",
  },

  transfer: {
    title: "Orrin",
    kidPrompt: "A town nobody at HQ has visited. Tap the **two things** that show which desk is busiest here.",
    // ART NEEDED: no drawing of Orrin exists, so this runs as word chips, same
    // as the other v3 transfer phases.
    imageAlt: "A small main street with a highway sign, a road crew, a mailbox, a pool notice and a car-lot billboard",
    spots: [
      { id: "tdotSign", label: "A sign reading TEXAS DEPARTMENT OF TRANSPORTATION", x: 13, y: 58 },
      { id: "highwayShield", label: "A highway shield on the road out of town", x: 34, y: 64 },
      { id: "mailbox", label: "A blue mailbox on the corner", x: 55, y: 55 },
      { id: "poolNotice", label: "A notice about the town pool's summer hours", x: 76, y: 62 },
      { id: "carLot", label: "A billboard for a used car lot", x: 93, y: 45 },
    ],
    tapCount: 2,
    claimFrame: "The busiest desk in Orrin is…",
    claimOptions: [
      { id: "local", label: "local" },
      { id: "state", label: "state" },
      { id: "national", label: "national" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you're cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three wrong desks" },
      { id: "together", label: "The tricky ones" },
      { id: "sort", label: "Seven jobs filed" },
      { id: "newtown", label: "Orrin" },
    ],
    // Distractors are mistakes students actually make: that all services come
    // from one level, that anything official-looking is government, that a
    // bigger government handles bigger-sounding things, and that the wrong
    // desk will simply sort it out anyway.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which list has one job from each desk — local, state and national?",
        choices: [
          { id: "a", text: "emptying the bins · the driving licence counter · delivering the post" },
          { id: "b", text: "emptying the bins · the town library · the town swimming pool" },
          { id: "c", text: "delivering the post · printing the money · the armed forces" },
          { id: "d", text: "the driving licence counter · the school crossing guard · your neighbour's fence" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Why does Texas hand out driving licences instead of each town doing its own?",
        choices: [
          { id: "a", text: "A licence has to work in every town in Texas." },
          { id: "b", text: "Towns are too small to have offices of their own." },
          { id: "c", text: "Driving is more dangerous than the other things." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Who runs your school?",
        choices: [
          { id: "a", text: "The district runs it, and the state has a say too." },
          { id: "b", text: "Only the national government, since all children attend." },
          { id: "c", text: "Only the town, and nobody else is involved in it at all." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "A neighbour writes to the Governor about a hole in your street. What happens?",
        choices: [
          { id: "a", text: "It gets forwarded to the city, months later." },
          { id: "b", text: "The Governor sends a road crew out that week." },
          { id: "c", text: "Nothing at all — the Governor fixes streets constantly." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Which desk *should* run a shared service is a real
        // argument adults have, and it goes to the teacher. Only whether the
        // sentence holds together is checked.
        prompt: "Some jobs really could sit at more than one desk. Parks are one of them.",
        keepFrame: "I think ______ should run the parks, because ______.",
        keepOptions: [
          { id: "town", label: "the town" },
          { id: "texas", label: "the state" },
        ],
        becauseOptions: [
          { id: "town", label: "the people who use them live right here" },
          { id: "texas", label: "then every park in Texas would be just as good as every other" },
          { id: "none", label: "it makes no difference who runs anything" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: The Wrong Desk. Take your card with you.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. Ask the class which desk they think should run the park — then ask who actually does. The gap between those two answers is the lesson.",
    },
  },
};
