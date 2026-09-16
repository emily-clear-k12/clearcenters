// Briefing SS-4-6A-V3-BR — The Wrong Call — PUBLIC pack, category (Type 4) shape.
// Answer keys live only in SS-4-6A-V3-BR.server.js — never import that here.
//
// Grade 4 · TEKS 4.6A. `teksText` below is verbatim 19 TAC §113.15,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): fourRegions, beatRice, beatRoad, beatTimbers
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-4-6A-V3-BR",
  title: "The Wrong Call",
  tagline: "Three plans that were fine everywhere except where somebody used them.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssCategory",
  grade: 4,
  teks: "4.6A",
  teksText:
    "Identify, locate, and describe the physical regions of Texas (Mountains and Basins, Great Plains, North Central Plains, Coastal Plains), including their characteristics such as landforms, climate, vegetation, and economic activities.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can tell the four regions of Texas apart, and explain the rule that decides which is which.",
  successCriteria:
    "Names the four regions and something true of each; uses a rule about rainfall, landform or vegetation to place a region nobody taught them; explains why a canyon in a plain is still a plain.",

  levels: [
    { id: "coastal", label: "Coastal Plains", blurb: "The wet, flat south and east." },
    { id: "northcentral", label: "North Central Plains", blurb: "Rolling ground, and belts of scrub oak." },
    { id: "greatplains", label: "Great Plains", blurb: "The high, flat, dry top of the state." },
    { id: "west", label: "Mountains and Basins", blurb: "The far west — ranges, and dry flats between them." },
  ],

  // The lesson's actual content. The student names one of these, not a region.
  // Naming the region would be the sort again with a story on top.
  rules: [
    { id: "water", label: "How much water arrives without anybody carrying it." },
    { id: "ground", label: "Whether the land climbs, drops, or just keeps going." },
    { id: "grows", label: "What is already growing there before anybody plants." },
  ],

  art: {
    fourRegions: "/briefings/ss-4-6a-v3-br/01-four-regions.png",
    beatRice: "/briefings/ss-4-6a-v3-br/02-dry-rice-field.png",
    beatRoad: "/briefings/ss-4-6a-v3-br/03-truck-at-dusk.png",
    beatTimbers: "/briefings/ss-4-6a-v3-br/04-wall-of-oak.png",
  },

  phases: ["openingFrame", "wrongDesk", "boundarySynthesis", "trueFalseReason", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: HQ once sent an agent to survey the whole state in one day. She got from El Paso to Fort Stockton and filed a report saying the assignment was impossible. It was.",
    },
  },

  samLines: {
    openingFrame: "Four regions. One question tells you which is which.",
    wrongDesk: "Three plans. Each one was fine somewhere else.",
    boundarySynthesis: "Now the tricky ones — the places that sit on a line.",
    trueFalseReason: "Five claims. Some are true. Say why either way.",
    opsChoice: "Three regions asking. Money for two.",
    transfer: "A driver crossed the state this week. Where did she spend it?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    wrongDesk: "Ask what the land is doing. That is the whole trick.",
    boundarySynthesis: "Some places really do sit on a line. That is allowed.",
    trueFalseReason: "The reason matters more than the answer.",
    opsChoice: "All three are real. You can only fund two.",
    transfer: "Every region has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Four Regions",
    setup:
      "Texas is taught as four regions: Coastal Plains, North Central Plains, Great Plains, and Mountains and Basins. Nobody drew those lines on purpose. The land drew them.",
    isItPrompt: "What actually makes two places belong to different regions?",
    // No marked answer. All three are defensible and the traits step settles it.
    isItOptions: [
      {
        id: "far",
        text: "Being a long way apart.",
        response: "Often true, and not the rule. Two places four hundred miles apart can be nearly identical, and two an hour apart can be nothing alike.",
      },
      {
        id: "look",
        text: "Looking different from each other.",
        response: "Warm. Looking different is the clue, not the cause. HQ wants to know what makes them look different.",
      },
      {
        id: "line",
        text: "Somebody drawing a line between them.",
        response: "That is how counties work. Regions are not like that, and the difference matters more than it sounds.",
      },
    ],
    traitsPrompt: "So what actually decides which region a place is in? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "How much rain reaches it before the clouds run out.", isTrait: true },
      {
        text: "How many people live there.",
        isTrait: false,
        why: "Houston and a two-hundred-person town on the coast are in the same region. Population tells you about people, not about land.",
      },
      { text: "What the ground does — climbs, drops, or keeps going.", isTrait: true },
      {
        text: "Which county it is in.",
        isTrait: false,
        why: "Counties were drawn by people and some of them straddle two regions. A line on a map does not change what is under your feet.",
      },
    ],
    traitsReveal:
      "That is it. A **physical region** is a stretch where the land keeps doing the same thing — same rain, same shape, same things growing — so the answer to *what works here* stays the same all the way across it.",
    predictSetup:
      "Coming up: three plans that were perfectly sensible, used in the wrong region, with somebody paying for it each time.",
    predictPrompt: "What usually happens when a plan meets the wrong region?",
    predictOptions: [
      { id: "adapt", label: "It gets adjusted and works out fine", hint: "People are good at making do" },
      { id: "fails", label: "It fails, and costs whoever tried it", hint: "The land does not negotiate" },
      { id: "nothing", label: "Nothing — Texas is Texas", hint: "One state, one set of answers" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. You will find out three times over. Keep your guess.",
  },

  wrongDesk: {
    // Which openingFrame.predictOption the teach settles the locked guess to.
    // Checked against openingFrame.predictOptions by crossCheckLesson.
    resolvesPredictionTo: "fails",
    ledgerTitle: "Which region, and why",
    ledgerEmpty: "Nothing yet — you will fill this in one plan at a time.",
    rulePrompt: "So which rule decided that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it. **It fails, and somebody pays.** The land does not adjust to a plan. The plan adjusts or it stops.",
    predictionWrong:
      "You guessed **{GUESS}**. What happens is that **it fails, and somebody pays.** Three times, coming up.",
    finalLabel: "So — what happens to a plan in the wrong region?",
    rounds: [
      {
        id: "w1",
        levelId: "coastal",
        tag: "Plan one",
        imageKey: "beatRice",
        situation:
          "A company that grows rice on the Gulf coast buys land near Amarillo and copies its farm plan across, field for field.",
        wrongDeskLine: "Same crop, same schedule, eight hundred miles north-west.",
        whatWentWrong:
          "Rice wants a flooded field. Up there about twenty inches fall in a year, and the rest has to be lifted from a long way down. They pumped until the bill was larger than the crop and gave up in the second season.",
        routePrompt: "Where does that plan actually belong?",
        routeOptions: [
          { text: "The Coastal Plains — fifty-five inches falls there without being asked.", best: true, levelId: "coastal" },
          {
            text: "The Great Plains — more flat land up there than anywhere.",
            levelId: "greatplains",
            whatIf: "There is, and it is the wrong kind of help. Flat does not fill a paddy.",
          },
          {
            text: "The Mountains and Basins — all that empty space out west.",
            levelId: "west",
            whatIf: "Under nine inches a year out there. If the Panhandle was too dry for rice, that corner is not a serious suggestion.",
          },
        ],
        ruleOptions: [
          { id: "water", label: "How much water arrives without anybody carrying it." },
          { id: "ground", label: "Whether the land climbs, drops, or just keeps going." },
          { id: "grows", label: "What is already growing there before anybody plants." },
        ],
        ledgerLine: "Coastal Plains — because the sky does the work there.",
        vocabTerm: "rainfall",
        vocabMeaning: "how much rain and snow lands on a place in a year, counted in inches",
        realWorld:
          "Houston averages about fifty-five inches a year. Amarillo averages under twenty. El Paso, under nine.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A town that has never needed a reservoir suddenly builds one.",
              ok: true,
              why: "Yes — that is a place noticing how much shows up on its own, and deciding it is not enough.",
            },
            {
              text: "A town builds a bridge over its river.",
              ok: false,
              why: "The river is there either way. That is a decision about crossing, not about how much arrives.",
            },
          ],
        },
        nextLabel: "Next plan →",
      },
      {
        id: "w2",
        levelId: "west",
        tag: "Plan two",
        imageKey: "beatRoad",
        situation:
          "A courier promises next-day delivery across Texas. Somebody in the office sets the timings with a ruler on a map and sixty miles an hour.",
        wrongDeskLine: "The far west leg is booked as a four-hour run.",
        whatWentWrong:
          "The road out there lifts over passes, bends round ranges, and runs eighty miles between towns with nowhere to stop. The driver ran out of hours before he ran out of road, and the parcels spent the night in a truck.",
        routePrompt: "Which corner did the ruler get wrong?",
        routeOptions: [
          { text: "The Mountains and Basins — a ruler cannot measure a mountain.", best: true, levelId: "west" },
          {
            text: "The Coastal Plains — all that traffic around Houston.",
            levelId: "coastal",
            whatIf: "Traffic is slow, and it is slow on every route in and out. This was one corner, for one reason.",
          },
          {
            text: "The North Central Plains — the roads wander through the timber.",
            levelId: "northcentral",
            whatIf: "They wander a little. Nothing there adds four hours to a day.",
          },
        ],
        ruleOptions: [
          { id: "water", label: "How much water arrives without anybody carrying it." },
          { id: "ground", label: "Whether the land climbs, drops, or just keeps going." },
          { id: "grows", label: "What is already growing there before anybody plants." },
        ],
        ledgerLine: "Mountains and Basins — because the land will not lie flat under a ruler.",
        vocabTerm: "elevation",
        vocabMeaning: "how high above sea level a place sits",
        realWorld:
          "Guadalupe Peak, at 8,751 feet the highest point in Texas, is out in that corner, and the towns sit in the flats between the ranges.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A railway takes a long curve instead of the straight line somebody drew.",
              ok: true,
              why: "Yes — the same thing, on rails. What is under the route decided the route.",
            },
            {
              text: "A railway takes a long curve to reach a bigger town.",
              ok: false,
              why: "That is a decision about people and money. The land would have allowed the straight line.",
            },
          ],
        },
        nextLabel: "Next plan →",
      },
      {
        id: "w3",
        levelId: "northcentral",
        tag: "Plan three",
        imageKey: "beatTimbers",
        situation:
          "In the 1840s a family heading west is told the country past Fort Worth is open prairie and they will be through it in two days.",
        wrongDeskLine: "They pack for two days.",
        whatWentWrong:
          "They met two narrow belts of oak so dense that wagons had to be cut through rather than driven through. Travellers of the time called it a wall. Two days became a great deal more than two days.",
        routePrompt: "What were they walking into?",
        routeOptions: [
          { text: "The North Central Plains — the Cross Timbers run right across it.", best: true, levelId: "northcentral" },
          {
            text: "The Great Plains — nothing grows up there but grass.",
            levelId: "greatplains",
            whatIf: "True, and that is why it is the easy part. The trouble is the belt you cross before you get there.",
          },
          {
            text: "The Coastal Plains — the Piney Woods are the thick bit.",
            levelId: "coastal",
            whatIf: "The Piney Woods really are thick, and they are behind this family. They were heading west.",
          },
        ],
        ruleOptions: [
          { id: "water", label: "How much water arrives without anybody carrying it." },
          { id: "ground", label: "Whether the land climbs, drops, or just keeps going." },
          { id: "grows", label: "What is already growing there before anybody plants." },
        ],
        ledgerLine: "North Central Plains — because of what was standing there already.",
        vocabTerm: "the Cross Timbers",
        vocabMeaning: "two narrow belts of dense oak running north to south across Texas",
        realWorld:
          "The Cross Timbers were a famous landmark and a famous obstacle. People wrote about the density of the growth for a hundred years.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A road crew budgets twice as long for the stretch through the woods.",
              ok: true,
              why: "Yes — they are reading what is standing there and pricing it in. That is the same call, made right.",
            },
            {
              text: "A road crew budgets twice as long because it is hurricane season.",
              ok: false,
              why: "That is weather, and weather passes. This rule is about what is rooted in the ground.",
            },
          ],
        },
      },
    ],
  },

  boundarySynthesis: {
    title: "The ones that sit on a line",
    sortTag: "Part 1 · Which region?",
    sortPrompt: "Tap a thing, then tap the region. None of them say it out loud.",
    columns: [
      { id: "coastal", label: "Coastal Plains" },
      { id: "northcentral", label: "North Central Plains" },
      { id: "greatplains", label: "Great Plains" },
      { id: "west", label: "Mountains and Basins" },
    ],
    sortItems: [
      { id: "paddy", text: "A field kept under two inches of standing water all summer." },
      { id: "turbines", text: "A hundred turbines in a line, with nothing in their way." },
      { id: "gap", text: "A town squeezed into the flat between two ranges." },
      { id: "dwarfoak", text: "A belt of knee-high oak a wagon had to be cut through." },
      { id: "shrimp", text: "Boats going out before dawn and coming back with shrimp." },
      { id: "pivot", text: "A circle of green inside a brown square, seen from the air." },
      { id: "highest", text: "The highest ground anywhere in the state." },
    ],
    boundaryTag: "Part 2 · The ones that do not sit still",
    // Real land does not sort cleanly, and the edge is where a category's
    // definition actually lives. Both of these are genuine — Palo Duro is the
    // one nearly every class gets wrong.
    boundaries: [
      {
        id: "b1",
        q: "Palo Duro Canyon is eight hundred feet deep. Which region?",
        options: [
          {
            text: "The Great Plains — it is cut down into the flat, not built up out of it.",
            ok: true,
            why: "Right, and this is the one most people miss. The region is named for what the land mostly is. The Panhandle is a high flat plain with a crack in it.",
          },
          {
            text: "Mountains and Basins — anything that deep must be mountain country.",
            ok: false,
            why: "You would think so. But nothing is standing up there; the ground has been cut away. Up and down are not the same thing.",
          },
          {
            text: "North Central Plains — the floor is low, so it goes with the low region.",
            ok: false,
            why: "The floor is low. The rim is not, and the rim is the region. Stand at the top and you are on the plains.",
          },
        ],
      },
      {
        id: "b2",
        q: "The Caprock Escarpment is the long step down off the High Plains. Which region is the step itself in?",
        options: [
          {
            text: "Neither — it is the line where one stops and the next starts.",
            ok: true,
            why: "Exactly. Some places are not in a region; they are the edge. That is where a definition actually lives.",
          },
          {
            text: "The Great Plains, because it is made of the same rock.",
            ok: false,
            why: "The rock is a good clue and it is not the rule. Ask what the land is doing — and here it is doing one thing on top and another below.",
          },
          {
            text: "It is too small to be in any region at all.",
            ok: false,
            why: "It runs about two hundred miles. Nothing that long is small. Being a boundary is different from being small.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Rub out the lines",
    removePrompt: "Suppose Texas were taught as one single region instead of four.",
    removeOne: {
      q: "What goes wrong first?",
      options: [
        { text: "You could no longer say why a rice farm works near Houston and fails near Amarillo." },
        { text: "Nobody could find Texas on a map any more." },
        { text: "Nothing much. It is all one state anyway.", isNoChange: true },
      ],
    },
    bigIdea:
      "Four regions, three questions: how much arrives on its own, what the ground does, and what is already growing. And some places are not in a region at all — they are the edge, which is exactly where the four stop being obvious.",
  },

  trueFalseReason: {
    title: "Five claims",
    kidPrompt: "True or false. The reason underneath matters more than the answer.",
    statements: [
      { id: "t_sixtimes", text: "The wettest corner of Texas gets more than five times the rain of the driest." },
      { id: "t_peak", text: "The highest point in Texas is in the Great Plains." },
      { id: "t_highflat", text: "The Great Plains is high ground even though it is flat." },
      { id: "t_cotton", text: "Cotton only grows in the wet part of Texas." },
      { id: "t_edge", text: "A region ends where the land stops doing the same thing." },
    ],
  },

  opsChoice: {
    title: "State Works Hearing",
    pickHeader: "Pick exactly 2 to fund",
    constraint: "One year of money, three regions asking. **Two** get funded. All three are real.",
    scenario: "Three people came from three regions, and every one of them is right about their own.",
    voices: [
      { id: "coastal", who: "Yusef, harbour pilot", emoji: "🌊", said: "One more storm surge over the channel and the port shuts for a month. It has nearly happened twice." },
      { id: "greatplains", who: "Ruthie, who farms near Dimmitt", emoji: "🌾", said: "Our well has dropped every year I have farmed here. When it quits, so does every circle of green for a hundred miles." },
      { id: "west", who: "Cleto, who drives the pass", emoji: "⛰️", said: "One lane each way through the gap. One breakdown and the whole west corner waits six hours." },
    ],
    projects: [
      {
        id: "storm_gates",
        label: "Build storm gates across the ship channel",
        reason: "Coastal Plains",
        shortReasonLabel: "The coast",
        reasonId: "coastal",
        sceneId: "gates",
        emoji: "🌊",
        teks: true,
        improves: "The port keeps working through a surge instead of shutting for weeks.",
      },
      {
        id: "plains_water",
        label: "Pipe water to the High Plains as the wells drop",
        reason: "Great Plains",
        shortReasonLabel: "The high flat",
        reasonId: "greatplains",
        sceneId: "wells",
        emoji: "🌾",
        teks: true,
        improves: "The irrigated fields keep going after the ground water runs thin.",
      },
      {
        id: "pass_lane",
        label: "Cut a second lane through the mountain pass",
        reason: "Mountains and Basins",
        shortReasonLabel: "The gap",
        reasonId: "west",
        sceneId: "pass",
        emoji: "⛰️",
        teks: true,
        improves: "One breakdown stops one lane instead of stopping the whole corner.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "The port cannot be allowed to shut",
      "Nothing grows up there without it",
      "Everything has to get through that gap",
      "The third can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "coastal", label: "The coast is still waiting" },
      { id: "greatplains", label: "The high plains are still waiting" },
      { id: "west", label: "The pass is still waiting" },
    ],
    deferredPrompt: "Which region is still waiting?",
    fundMeterLabel: "Budget — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets funded vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two funded. One region waits — and somebody warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right about their own region. One budget, three regions — somebody was always going to be right and still wait.",
    whoseWrong: "Read what each of them said again. Somebody described exactly this.",
  },

  transfer: {
    title: "The Driver's Cab",
    kidPrompt: "A driver crossed Texas this week. Tap the **two** that show where she spent most of it.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "A truck cab: two window photos, a café receipt, a postcard and a dashboard sticker",
    spots: [
      { id: "elevator", label: "A photo of a grain elevator, tallest thing for forty miles", x: 13, y: 58 },
      { id: "pivot", label: "A photo out the window: a green circle in a brown square", x: 34, y: 63 },
      { id: "receipt", label: "A receipt from a dock café down on the coast", x: 55, y: 54 },
      { id: "postcard", label: "A postcard of a ridge eight thousand feet up", x: 77, y: 60 },
      { id: "sticker", label: "A Texas flag sticker on the dashboard", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "She spent most of the week in…",
    claimOptions: [
      { id: "coastal", label: "the Coastal Plains" },
      { id: "greatplains", label: "the Great Plains" },
      { id: "west", label: "the Mountains and Basins" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three wrong calls" },
      { id: "together", label: "The tricky ones" },
      { id: "sort", label: "Five claims" },
      { id: "newtown", label: "The driver's cab" },
    ],
    // Distractors are mistakes fourth graders actually make: that high must mean
    // mountainous, that a region is a line somebody drew, and that a dry region
    // therefore grows nothing.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which one pairs a region with something actually true of it?",
        choices: [
          { id: "a", text: "Mountains and Basins — driest corner, highest ground" },
          { id: "b", text: "Coastal Plains — the driest corner and the highest ground" },
          { id: "c", text: "Great Plains — the wettest part, where the rice is grown" },
          { id: "d", text: "North Central Plains — the corner that touches the Gulf of Mexico" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A road out west costs three times as much per mile as one near Houston. Which rule explains that?",
        choices: [
          { id: "a", text: "Whether the land climbs or just keeps going." },
          { id: "b", text: "How much water arrives without anybody carrying it." },
          { id: "c", text: "What is already growing there before anybody plants." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Why does a physical region have an edge at all?",
        choices: [
          { id: "a", text: "Because the land stops doing one thing and starts another." },
          { id: "b", text: "Because a government drew that line there on purpose, long ago." },
          { id: "c", text: "Because a river or a road always marks where a region stops." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Why does it matter which region a plan was written for?",
        choices: [
          { id: "a", text: "A plan that works in one can fail in another." },
          { id: "b", text: "Because each region has its own separate laws to follow." },
          { id: "c", text: "It does not matter much — Texas is one state throughout." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. How many regions Texas "really" has is a real argument
        // among real geographers — some maps show seven, some twelve — and it
        // goes to the teacher. Only whether the sentence holds together is
        // checked. This is also the item that teaches what a category IS.
        prompt: "Texas is taught as four regions. Some maps show seven. Some show twelve.",
        keepFrame: "I think four is ______, because ______.",
        keepOptions: [
          { id: "enough", label: "enough" },
          { id: "toofew", label: "too few" },
        ],
        becauseOptions: [
          { id: "enough", label: "four already explains most of what people can do where" },
          { id: "toofew", label: "places inside one of them are not all alike" },
          { id: "none", label: "it makes no difference how anybody divides anything" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: The Wrong Call. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. Ask the class how many regions Texas really has, then show them a seven-region map. The argument about where to draw a line is the whole idea of a category.",
    },
  },
};
