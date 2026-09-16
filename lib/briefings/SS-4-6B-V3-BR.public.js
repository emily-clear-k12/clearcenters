// Briefing SS-4-6B-V3-BR — Fifty-Five Inches and Nine — PUBLIC pack, comparison (Type 2) shape.
// Answer keys live only in SS-4-6B-V3-BR.server.js — never import that here.
//
// Grade 4 · TEKS 4.6B. `teksText` below is verbatim 19 TAC §113.15,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): twoRegions, beatWater, beatGoods, beatTowns
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-4-6B-V3-BR",
  title: "Fifty-Five Inches and Nine",
  tagline: "Same state, same jobs to do. One corner does them with rain. The other carries every drop.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssComparison",
  grade: 4,
  teks: "4.6B",
  teksText:
    "Compare the physical regions of Texas (Mountains and Basins, Great Plains, North Central Plains, Coastal Plains).",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can show how two parts of Texas do the same jobs in different ways, and say what about the land makes the difference.",
  successCriteria:
    "Predicts how a second region handles the same job and names why it differs; sorts what the two regions share from what they do not; picks out which of three things about the land caused a difference; reads a region nobody taught them from the evidence.",

  art: {
    twoRegions: "/briefings/ss-4-6b-v3-br/01-two-regions.png",
    beatWater: "/briefings/ss-4-6b-v3-br/02-rain-and-pipe.png",
    beatGoods: "/briefings/ss-4-6b-v3-br/03-ship-and-truck.png",
    beatTowns: "/briefings/ss-4-6b-v3-br/04-sprawl-and-pass.png",
  },

  phases: ["openingFrame", "sideBySide", "contrastSynthesis", "matchPairs", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: it is farther from El Paso to Beaumont than it is from El Paso to Los Angeles. Agents who drive it once do not volunteer to drive it twice.",
    },
  },

  samLines: {
    openingFrame: "One state, two corners, and about forty-seven inches of rain between them.",
    sideBySide: "You will see the wet corner first. Then guess what the dry one does.",
    contrastSynthesis: "What they share, what they do not — and what made the difference.",
    matchPairs: "Four things people do. Four reasons the land lets them.",
    opsChoice: "One budget, three regions, two builds.",
    transfer: "A box of things a surveyor mailed home. Where was she?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    sideBySide: "Guess before you find out. Guessing wrong is how this one works.",
    contrastSynthesis: "Watch for the ones that belong to both.",
    matchPairs: "Read the whole line. One of the right-hand cards matches nothing.",
    opsChoice: "All three are real needs. You can only build two.",
    transfer: "Every answer has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "One State, Four Corners",
    setup:
      "Texas is taught as four regions: the Coastal Plains, the North Central Plains, the Great Plains, and the Mountains and Basins. You could drive from one end to the other and never leave the state.",
    isItPrompt: "Does where you live decide what you do for a living?",
    // No marked answer. All three are defensible and the reveal argues with the
    // first one rather than praising it.
    isItOptions: [
      {
        id: "no",
        text: "No. People do whatever work they choose.",
        response: "Mostly true now — you can do a great many jobs anywhere. Hold onto it; HQ is about to push back.",
      },
      {
        id: "yes",
        text: "Yes. The land decides and people fit around it.",
        response: "Strong claim. Watch for the moment in this briefing where it stops being true.",
      },
      {
        id: "some",
        text: "Some jobs, not all of them.",
        response: "That is the line HQ draws too. A teacher can teach anywhere. A shrimper cannot shrimp in a desert.",
      },
    ],
    traitsPrompt: "So what about a place actually changes how people live there? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "How much water arrives on its own.", isTrait: true },
      {
        text: "How long people have lived there.",
        isTrait: false,
        why: "Some of the oldest towns in Texas are tiny and some of the newest are huge. Age does not decide what a place can do.",
      },
      { text: "What the ground does — climbs, drops, or keeps going.", isTrait: true },
      {
        text: "How far it is from the capital.",
        isTrait: false,
        why: "Austin is nowhere near the biggest city in Texas, and plenty of far corners are busy. Distance from the capital decides very little.",
      },
    ],
    traitsReveal:
      "That is it. A **physical region** is a stretch of land where those things stay roughly the same all the way across — so the people in it end up solving the same problems the same way.",
    predictSetup:
      "Coming up: the wettest corner of Texas and the driest one, and three jobs both of them have to do.",
    predictPrompt: "How do you think the two compare?",
    predictOptions: [
      { id: "sameJob", label: "Same jobs, done differently because the land is different", hint: "Both have to do it; the how changes" },
      { id: "betterOff", label: "One of them is simply better off than the other", hint: "Wetter must mean easier" },
      { id: "noReason", label: "They differ for no particular reason — places are just different", hint: "It is just how it turned out" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying. You will work it out by visiting both. Keep your guess.",
  },

  sideBySide: {
    homeName: "the Coastal Plains",
    awayName: "the Mountains and Basins",
    resolvesPredictionTo: "sameJob",
    ledgerTitle: "Same job, different way",
    ledgerEmpty: "Nothing yet — you will fill this in one job at a time.",
    predictionRight:
      "You had it. **Same jobs, done differently.** Both corners water crops, move goods and put towns somewhere. What changes is how, and why.",
    predictionWrong:
      "You guessed **{GUESS}**. It turned out to be **same jobs, done differently**. Neither corner is better off. Both do all three — the how is what changes.",
    finalLabel: "So — how did the two compare?",
    rounds: [
      {
        id: "r1",
        needId: "water",
        needLabel: "Getting water to a crop",
        tag: "Job one",
        imageKey: "beatWater",
        homeLead: "Start at home.",
        homeWay:
          "A rice farmer near Houston mostly leaves the sky to do the job. Fifty-five inches fall there in a year, and the bayous run all summer.",
        awaySetup: "El Paso sits in the far west corner, tucked between mountains.",
        predictPrompt: "So how does a farmer near El Paso grow anything?",
        predictOptions: [
          {
            text: "The same way — wait for the weather.",
            whatIf: "Under nine inches arrives there in a whole year. A rice field would be dust by June.",
          },
          { text: "Pipes and pumps, from the river and from deep down.", best: true },
          {
            text: "They do not farm out there at all.",
            whatIf: "They do — cotton, pecans, chilies. It just takes carrying every drop to them.",
          },
        ],
        awayWay:
          "Everything green out there is watered on purpose, from the Rio Grande and from wells sunk far down.",
        whyPrompt: "Why is El Paso not doing it the Houston way?",
        whyOptions: [
          { id: "rain", text: "How much water arrives without anybody carrying it." },
          { id: "shape", text: "Whether the ground climbs or just keeps going." },
          { id: "edge", text: "What the place runs into at its far side." },
        ],
        ledgerLine: "Water — it falls on one corner and is carried to the other.",
        vocabTerm: "irrigation",
        vocabMeaning: "bringing water to a field on purpose, by ditch, pipe or pump",
        realWorld:
          "Houston averages about fifty-five inches a year. El Paso averages under nine. Same state.",
        stretch: {
          q: "Would this count as the same job?",
          options: [
            {
              text: "A town digs a reservoir so there is something to drink in a dry year.",
              ok: true,
              why: "Yes — same job, another way of doing it. Storing what falls is still solving for water.",
            },
            {
              text: "A town builds a swimming pool.",
              ok: false,
              why: "It holds water, but nothing is being grown or drunk. That is somewhere to play, not a way to live.",
            },
          ],
        },
        nextLabel: "Next job →",
      },
      {
        id: "r2",
        needId: "goods",
        needLabel: "Getting goods out",
        tag: "Job two",
        imageKey: "beatGoods",
        homeLead: "Home first, again.",
        homeWay:
          "Cotton and grain leave the Coastal Plains by ship. Houston dug a channel fifty miles inland so ocean vessels could tie up at a city that is not on the coast.",
        awaySetup: "In the far west there is nothing deep enough to float a loaded boat.",
        predictPrompt: "So how do goods leave out there?",
        predictOptions: [
          {
            text: "Down the Rio Grande by barge.",
            whatIf: "In places out there you can walk across the Rio Grande without getting your knees wet. Nothing is floating cargo down it.",
          },
          { text: "By road and rail, and straight across the border.", best: true },
          {
            text: "Hardly anything leaves at all.",
            whatIf: "El Paso has one of the busiest crossings on the whole border. Plenty leaves. It leaves on wheels.",
          },
        ],
        awayWay:
          "Trucks and trains, and one of the busiest border crossings in the country about a mile from downtown.",
        whyPrompt: "Why is El Paso not doing it the Houston way?",
        whyOptions: [
          { id: "rain", text: "How much water arrives without anybody carrying it." },
          { id: "shape", text: "Whether the ground climbs or just keeps going." },
          { id: "edge", text: "What the place runs into at its far side." },
        ],
        ledgerLine: "Goods — one corner runs into the sea, the other runs into Mexico.",
        vocabTerm: "port",
        vocabMeaning: "a place where goods are loaded on and off ships",
        realWorld:
          "The Houston Ship Channel runs about fifty miles inland, which is how a city that far from the sea became one of the busiest ports in the country.",
        stretch: {
          q: "Would this count as the same job?",
          options: [
            {
              text: "A town builds a rail yard so grain can be loaded onto trains.",
              ok: true,
              why: "Yes — getting what you grew to somebody who wants it. Same job, another way.",
            },
            {
              text: "A town builds a bigger grocery store.",
              ok: false,
              why: "That is bringing things in for the people here. This job is about sending things out to everybody else.",
            },
          ],
        },
        nextLabel: "Next job →",
      },
      {
        id: "r3",
        needId: "towns",
        needLabel: "Deciding where a town goes",
        tag: "Job three",
        imageKey: "beatTowns",
        homeLead: "Last one. Home first.",
        homeWay:
          "On the Coastal Plains a town can sit almost anywhere. It is flat for two hundred miles, so towns spread out in every direction until they run into each other.",
        awaySetup: "Out west the land goes up and down hard.",
        predictPrompt: "So where do towns end up out there?",
        predictOptions: [
          {
            text: "Anywhere there is space, same as here.",
            whatIf: "There is space in every direction. Most of it is halfway up a mountain or has nothing to drink.",
          },
          { text: "Down in the flat bottoms, and at the gaps between ranges.", best: true },
          {
            text: "Up on the mountain tops, for the view.",
            whatIf: "Nothing you need is up there. No water, no road, and a long way down for everything.",
          },
        ],
        awayWay:
          "Towns sit in the basins between the ranges, and at the passes. El Paso is named for one — el paso del norte, the pass of the north.",
        whyPrompt: "Why is El Paso not doing it the Houston way?",
        whyOptions: [
          { id: "rain", text: "How much water arrives without anybody carrying it." },
          { id: "shape", text: "Whether the ground climbs or just keeps going." },
          { id: "edge", text: "What the place runs into at its far side." },
        ],
        ledgerLine: "Towns — one corner spreads, the other squeezes into the gaps.",
        vocabTerm: "basin",
        vocabMeaning: "a low flat place with higher ground all the way around it",
        realWorld:
          "Guadalupe Peak, at 8,751 feet the highest point in Texas, is out in that corner. So is the lowest rainfall in the state.",
        stretch: {
          q: "Would this count as the same job?",
          options: [
            {
              text: "A town grows along a river because that is the only flat strip for miles.",
              ok: true,
              why: "Yes — the land is deciding where people can put things. Same job, different answer.",
            },
            {
              text: "A town names its streets after trees.",
              ok: false,
              why: "Charming, and it tells you nothing about where the town could be built.",
            },
          ],
        },
      },
    ],
  },

  contrastSynthesis: {
    title: "Put the two corners side by side",
    sortTag: "Part 1 · What they share",
    sortPrompt: "Tap each one, then tap where it belongs. Some belong to both.",
    columns: [
      { id: "home", label: "Only the Coastal Plains" },
      { id: "both", label: "Both" },
      { id: "away", label: "Only Mountains and Basins" },
    ],
    sortItems: [
      { id: "cattle", text: "Cattle are raised here" },
      { id: "shipChannel", text: "Ocean ships tie up fifty miles from the sea" },
      { id: "pumped", text: "Fields are fed through a pipe" },
      { id: "hot", text: "August is punishing" },
      { id: "storms", text: "Storms arrive off the water and flatten things" },
      { id: "peak", text: "You can climb to eight thousand feet" },
      { id: "cotton", text: "Cotton is grown here" },
    ],
    causeTag: "Part 2 · What made the difference",
    causes: [
      {
        id: "cs1",
        q: "One corner lets the sky water its crops. The other pipes every drop. What made that difference?",
        options: [
          { text: "How much arrives on its own.", ok: true, why: "Yes. Fifty-five inches against under nine. Nobody builds a pipe they do not need." },
          { text: "How high up the land sits.", ok: false, why: "The far corner is higher, and that is real — but it is not what empties a field. Look at the number." },
          { text: "How close each one is to another country.", ok: false, why: "True of one of them, and it has nothing to do with crops. That answer belongs to a different job." },
        ],
      },
      {
        id: "cs2",
        q: "One corner's towns sprawl in every direction. The other's sit in gaps. What made that difference?",
        options: [
          { text: "What the ground does underneath them.", ok: true, why: "That is it. You can build anywhere on flat. On a mountainside you build where the mountain lets you." },
          { text: "How much arrives on its own.", ok: false, why: "That was the answer to the last one, not this one. Dry places can still sprawl — plenty do." },
          { text: "How close each one is to another country.", ok: false, why: "El Paso is on a border and so is Brownsville, and their towns are laid out nothing alike." },
        ],
      },
    ],
    changeTag: "Part 3 · Change one thing",
    changePrompt: "Suppose fifty-five inches of rain started falling on the far west corner every year.",
    changeOne: {
      q: "Which difference between the two corners goes away?",
      options: [
        { text: "The pipes and pumps — nobody carries water to a field that is already wet." },
        { text: "The mountains — towns could spread out in any direction." },
        { text: "Nothing changes. Both corners would carry on exactly as they do now.", isNoChange: true },
      ],
    },
    bigIdea:
      "Both corners do all three jobs. The ways look different because the land is different — how much falls on it, what the ground does, and what it runs into at the far side. Change the land and the way changes with it.",
  },

  matchPairs: {
    title: "Why here?",
    kidPrompt: "Tap something people do, then what lets them. One right card matches nothing.",
    helpWrong: "Not that one. What must the land be like?",
    helpPass: "All four. None said its answer out loud.",
    // These four deliberately cover the Coastal Plains, the Great Plains, the
    // Mountains and Basins and the North Central Plains — the last two regions
    // are met HERE and nowhere else in the teach. See the header.
    //
    // Checked against the extended no-giveaway rule: no left item shares a
    // content word with its own right item.
    leftItems: [
      { id: "mp_ships", text: "Ships from thirty countries tie up fifty miles from the sea." },
      { id: "mp_wind", text: "Turbines turn day and night across the Panhandle." },
      { id: "mp_ranch", text: "Out west a ranch is measured in sections, not acres." },
      { id: "mp_clear", text: "Settlers heading west had to cut through dwarf oaks." },
    ],
    rightItems: [
      { id: "r_channel", text: "Somebody dug a channel deep enough for ocean vessels." },
      { id: "r_flat", text: "Nothing tall stands between here and Canada." },
      { id: "r_dry", text: "One animal needs a great deal of bare ground." },
      { id: "r_timbers", text: "Two strips of thick woodland run north to south." },
      { id: "r_bayou", text: "The land lies so level that rainfall sits on it." },
    ],
  },

  opsChoice: {
    title: "State Budget Hearing",
    pickHeader: "Pick exactly 2 to fund",
    constraint: "One year of money, three regions asking. **Two** get funded. All three are real.",
    scenario: "Three people came to the hearing from three corners of the state, and all three are right.",
    voices: [
      { id: "rain", who: "Alma, who farms near Pecos", emoji: "💧", said: "Our well is dropping a foot a year. When it stops, so does everything green out here." },
      { id: "shape", who: "Dub, who drives a rig", emoji: "⛰️", said: "That pass is one lane each way. One breakdown and the whole west stops for six hours." },
      { id: "edge", who: "Renata, on the docks", emoji: "🚢", said: "The new ships draw too much water for our channel. They are going to Louisiana instead." },
    ],
    projects: [
      {
        id: "water_line",
        label: "Run a water line to the farms in the far west",
        reason: "Water that arrives on its own",
        shortReasonLabel: "Water",
        reasonId: "rain",
        sceneId: "water",
        emoji: "💧",
        teks: true,
        improves: "Fields out west keep going when the wells run low.",
      },
      {
        id: "pass_road",
        label: "Widen the road through the mountain pass",
        reason: "What the ground does",
        shortReasonLabel: "The ground",
        reasonId: "shape",
        sceneId: "pass",
        emoji: "⛰️",
        teks: true,
        improves: "Trucks stop queueing at the one gap through the ranges.",
      },
      {
        id: "deeper_channel",
        label: "Dig the ship channel deeper for bigger vessels",
        reason: "What the far side runs into",
        shortReasonLabel: "The far side",
        reasonId: "edge",
        sceneId: "channel",
        emoji: "🚢",
        teks: true,
        improves: "The largest ships come here instead of going somewhere else.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Nothing grows without it",
      "Everything has to get through that gap",
      "The trade goes elsewhere otherwise",
      "The third can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "rain", label: "Water is still waiting" },
      { id: "shape", label: "The pass is still waiting" },
      { id: "edge", label: "The channel is still waiting" },
    ],
    deferredPrompt: "Which one is still waiting?",
    fundMeterLabel: "Budget — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets funded vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two funded. One waits — and somebody warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right about their own corner. One budget, three regions — somebody was always going to be right and still wait.",
    whoseWrong: "Read what each of them said again. Somebody described exactly this.",
  },

  transfer: {
    title: "The Surveyor's Box",
    kidPrompt: "A surveyor mailed these home after one week. Tap the **two** that show what the land is like.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "A crate: an aerial photo, a pump blade, a timetable, a long-view photo, a pennant",
    spots: [
      { id: "circle", label: "A photo: a green circle in a brown square", x: 13, y: 58 },
      { id: "blade", label: "A cracked windmill blade off a pump", x: 34, y: 64 },
      { id: "rails", label: "A timetable for the railway heading out of state", x: 55, y: 52 },
      { id: "horizon", label: "The next town's water tower, eleven miles off", x: 77, y: 60 },
      { id: "pennant", label: "A football pennant from the town she stayed in", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "What is shaping life where she was?",
    claimOptions: [
      { id: "rain", label: "how much water arrives on its own" },
      { id: "shape", label: "what the ground does" },
      { id: "edge", label: "what it runs into at the far side" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three jobs" },
      { id: "together", label: "Side by side" },
      { id: "sort", label: "Four matched" },
      { id: "newtown", label: "The surveyor's box" },
    ],
    // Distractors are mistakes fourth graders actually make: that a wetter
    // place must be a better place, that a dry region simply has no farming,
    // and that every difference in Texas comes down to rain.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which list names the four physical regions of Texas?",
        choices: [
          { id: "a", text: "Coastal Plains · North Central Plains · Great Plains · Mountains and Basins" },
          { id: "b", text: "Coastal Plains · North Central Plains · Great Plains · the Panhandle Desert" },
          { id: "c", text: "East Texas · West Texas · North Texas · South Texas" },
          { id: "d", text: "Coastal Plains · Hill Country · Piney Woods · Mountains and Basins" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Both corners grow cotton. One waits for rain and one runs a pipe. What does that show?",
        choices: [
          { id: "a", text: "Same job, different way, because the land differs." },
          { id: "b", text: "Only the wetter corner really grows it properly." },
          { id: "c", text: "The drier corner needs more things than the wet one does." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "A town out west sits in a gap between two ranges. Why there and not ten miles north?",
        choices: [
          { id: "a", text: "Ten miles north is mountainside. The gap is the way through." },
          { id: "b", text: "More rain falls in the gap than on the slopes around it." },
          { id: "c", text: "The gap is nearer to the ocean than anywhere else out there." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "A farmer on the High Plains waters a field from a well instead of waiting for the sky. Which corner of Texas is he most like?",
        choices: [
          { id: "a", text: "The far west — both carry the water in." },
          { id: "b", text: "Near Houston — both of them are growing a crop." },
          { id: "c", text: "Neither — the High Plains is not a farming region." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Which region a student's own home is most like is
        // theirs and goes to the teacher. This is also where the standard's
        // "compare" finally lands on somewhere the student has actually been.
        prompt: "Think about where you live. Which of the two corners in this briefing is it more like?",
        keepFrame: "Where I live is more like ______, because ______.",
        keepOptions: [
          { id: "coastal", label: "the Coastal Plains" },
          { id: "west", label: "the Mountains and Basins" },
        ],
        becauseOptions: [
          { id: "coastal", label: "enough falls out of the sky here that nobody carries it" },
          { id: "west", label: "here somebody has to bring the water to whatever is growing" },
          { id: "none", label: "where you live makes no difference to anything" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Fifty-Five Inches and Nine. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. Every card names which corner ours is more like, and in most of the state the class will disagree — which is the argument worth having tomorrow.",
    },
  },
};
