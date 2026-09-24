// Briefing SS-3-2B-V3-BR — Two Towns, Five Needs — PUBLIC pack, comparison shape.
// Answer keys live only in SS-3-2B-V3-BR.server.js — never import that here.
//
// This is the first lesson built on Type 2 (comparison). Shape contract and
// the reasoning behind it: lib/briefings/schema/ssComparisonLesson.schema.js.
//
// SEPARATE ID from SS-3-2B-BR on purpose, same as the 3.2A rebuild — the old
// one stays live and untouched so the two can be assigned side by side.
//
// WHAT THE OLD 3.2B DID WRONG, since this pack exists to fix it:
//   - It ASSERTED the standard instead of teaching it. Four consecutive Field
//     Brief pages say "same need, different way," and then a check question
//     asks whether it's the same need.
//   - Clearance c2 ("Kids walk to school in Maple Crossing. Kids ride a bus in
//     Cloudreach. Same need?") is answered word-for-word by the worked-example
//     page three screens earlier.
//   - Match Pairs paired "Education" with "Walk to a small school vs. ride a
//     bus" — solvable by matching the word "school" to the word "Education."
//   - The Ops Choice distractor was a giant welcome statue, and a clearance
//     distractor was "toys, snacks, fame, naps, cartoons." A student who
//     learned nothing could eliminate their way through both.
//   - Nothing anywhere asked WHY the two towns differ, which is the only part
//     of a comparison that carries a thought.
//
// Maple Crossing is deliberately the same town as SS-3-2A-V3-BR — a student
// who has done that briefing arrives already knowing the road to the dock and
// the meeting house, and gets to use them.
//
// ART NEEDED before this ships (none of these exist yet):
//   twoTowns      — the two towns across the river, Maple Crossing low by the
//                   creek, Cloudreach up on the bluff. Used on the opener.
//   beatGovernment— the Maple Crossing meeting house with everyone inside.
//   beatTransport — the wagon road down to the dock, and the ferry landing.
//   beatRecreation— kids in the creek; the Cloudreach pool.
//   ridgeway      — the transfer town (see `transfer` below). Until it exists
//                   that phase runs as word chips, exactly like 3.2A's does.

export const PUBLIC_BRIEFING = {
  id: "SS-3-2B-V3-BR",
  title: "Two Towns, Five Needs",
  tagline: "Three hundred people on one side of the river. Two thousand on the other.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssComparison",
  grade: 3,
  teks: "3.2B",
  teksText:
    "Compare how the local community and other communities meet needs for government, education, communication, transportation, and recreation.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can show how two communities meet the same needs in different ways, and say what makes the ways different.",
  successCriteria:
    "Names the five needs; predicts how a second town meets a need and says why it differs; sorts what the two towns share from what they don't; finds a need being met in a town they've never seen.",

  // Declared so auditComparisonQuality can check that a student actually meets
  // all five somewhere in the lesson — the standard names all five, so a
  // lesson that quietly teaches three is a coverage gap.
  needs: [
    { id: "government", label: "Government" },
    { id: "education", label: "Education" },
    { id: "communication", label: "Communication" },
    { id: "transportation", label: "Transportation" },
    { id: "recreation", label: "Recreation" },
  ],

  art: {
    twoTowns: "/briefings/ss-3-2b-v3-br/01-two-towns.jpg",
    beatGovernment: "/briefings/ss-3-2b-v3-br/02-meeting-house.jpg",
    beatTransport: "/briefings/ss-3-2b-v3-br/03-road-and-ferry.jpg",
    beatRecreation: "/briefings/ss-3-2b-v3-br/04-creek-and-pool.jpg",
  },

  phases: ["openingFrame", "sideBySide", "contrastSynthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: Cloudreach's pool was nearly a duck pond. The vote was close. The ducks moved to the lake anyway and, by all accounts, are happier away from the noise.",
    },
  },

  samLines: {
    openingFrame: "Two towns, one river between them. Same needs or different ones?",
    sideBySide: "You'll see Maple Crossing first. Then guess what Cloudreach does.",
    contrastSynthesis: "What do they share, what don't they — and why.",
    reasonSort: "Seven clues. None of them say which need out loud.",
    opsChoice: "One crew, two builds, three people who each need something.",
    transfer: "A third town. Nobody's been. Find the need and prove it twice.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    sideBySide: "Guess before you find out. Guessing wrong is how this one works.",
    contrastSynthesis: "Watch for the ones that belong to both towns.",
    reasonSort: "Read past the first few words.",
    opsChoice: "All three are real needs. You can only build two.",
    transfer: "Every need has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Two Towns",
    setup:
      "Maple Crossing sits low by the creek. Cloudreach sits up on the bluff across the river. About three hundred people live in one. About two thousand live in the other.",
    isItPrompt: "Is a place to play something a town has to take care of — or something extra?",
    // No marked answer. All three are defensible and it opens the argument the
    // reveal settles. Deliberately NOT written so one response reads as praise.
    isItOptions: [
      {
        id: "extra",
        text: "Extra. Towns take care of serious things.",
        response: "A lot of grown-ups would say the same. Hold onto it — HQ is going to argue with you in a minute.",
      },
      {
        id: "need",
        text: "Something the town takes care of.",
        response: "HQ has it on the list. You'll find out why shortly.",
      },
      {
        id: "depends",
        text: "Depends how many people use it.",
        response: "That's a real line to draw. One swing in one backyard isn't the town's business. A field the whole town uses might be.",
      },
    ],
    traitsPrompt: "So what puts something on a town's list? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "Lots of people depend on it, not just one family.", isTrait: true },
      {
        text: "It cost a lot of money to build.",
        isTrait: false,
        why: "Plenty of expensive things are nobody's business but the owner's. Price isn't what puts something on the town's list.",
      },
      { text: "If it were gone, people here would have a real problem.", isTrait: true },
      {
        text: "It is the newest thing in town.",
        isTrait: false,
        why: "New doesn't make it the town's job. An old road the whole town drives on is still the town's job.",
      },
    ],
    traitsReveal:
      "That's it. A **need** is something lots of people depend on, that would cause a real problem if it were gone. Communities take care of five: **government**, **education**, **communication**, **transportation**, and **recreation**. A place to play is on the list.",
    predictSetup:
      "So: three hundred people on one side of the river, two thousand on the other. Both towns take care of people.",
    predictPrompt: "How do their five needs compare?",
    predictOptions: [
      { id: "sameDifferent", label: "Same needs — different ways of taking care of them", hint: "Both towns, all five, done their own way" },
      { id: "differentNeeds", label: "Different needs — a small town doesn't need all five", hint: "Some needs only turn up once a town is big" },
      { id: "moreNeeds", label: "The bigger town takes care of more of them", hint: "More people, more on the list" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ isn't saying yet — you'll work it out by visiting both towns. Keep your guess.",
  },

  sideBySide: {
    // Which openingFrame.predictOption the teach settles the locked guess to.
    // Checked against openingFrame.predictOptions by crossCheckLesson.
    resolvesPredictionTo: "sameDifferent",
    homeName: "Maple Crossing",
    awayName: "Cloudreach",
    ledgerTitle: "Same need, different way",
    ledgerEmpty: "Nothing yet — you'll fill this in one need at a time.",
    predictionRight:
      "You had it. **Same needs, different ways** — every one of the five, in both towns, done to fit the place.",
    predictionWrong:
      "You guessed **{GUESS}**. It turned out to be **same needs, different ways** — both towns take care of all five. What changes is how.",
    finalLabel: "So — how did the five compare?",
    rounds: [
      {
        id: "r1",
        needId: "government",
        needLabel: "Government",
        tag: "Need one",
        imageKey: "beatGovernment",
        homeLead: "Start at home.",
        homeWay:
          "In Maple Crossing, anybody with something to say walks to the meeting house on the first Monday. Whoever shows up votes, and that settles it.",
        awaySetup: "Cloudreach has two thousand people.",
        predictPrompt: "How do you think Cloudreach decides things?",
        predictOptions: [
          {
            text: "The same way — everyone who wants a say turns up.",
            whatIf: "Picture two thousand people in one room, each wanting a turn to speak. The meeting would still be going at Christmas.",
          },
          { text: "They choose a few people to decide for everybody.", best: true },
          {
            text: "The oldest family in town settles it.",
            whatIf: "That works while everyone knows the oldest family. At two thousand, most people have never met them — and wouldn't accept it.",
          },
        ],
        awayWay:
          "Cloudreach elects a mayor and six council members. Those seven decide, and everyone else votes for who the seven are.",
        whyPrompt: "Why isn't Cloudreach doing it Maple Crossing's way?",
        whyOptions: [
          { id: "people", text: "Too many people to all fit and still get anything decided." },
          { id: "land", text: "The river gets in the way." },
          { id: "already", text: "Cloudreach hasn't been around long enough yet." },
        ],
        ledgerLine: "Government — everyone decides, or a few decide for everyone.",
        vocabTerm: "government",
        vocabMeaning: "the way a community decides things and keeps them fair for everybody",
        realWorld:
          "Small towns in New England still hold town meetings where every voter shows up. Cities elect councils instead.",
        stretch: {
          q: "Would this count as government too?",
          options: [
            { text: "A town votes on whether to build a new road.", ok: true, why: "Yes — the town deciding something together, for everybody. That's the idea." },
            { text: "A family decides what to have for dinner.", ok: false, why: "Deciding isn't the same as government. This one stops at the front door — nobody else in town is affected." },
          ],
        },
        nextLabel: "Next need →",
      },
      {
        id: "r2",
        needId: "transportation",
        needLabel: "Transportation",
        tag: "Need two",
        imageKey: "beatTransport",
        homeLead: "Home first, again.",
        homeWay:
          "Maple Crossing cut a wagon road down to the dock years ago. Grain goes down it, and everything the town can't grow comes back up it.",
        awaySetup: "Cloudreach sits on the bluff on the far side of the river.",
        predictPrompt: "How do you think Cloudreach moves things in and out?",
        predictOptions: [
          {
            text: "They use Maple Crossing's road.",
            whatIf: "They'd have to get across the river to reach it. That's the whole problem, not the answer to it.",
          },
          { text: "A ferry that crosses the water.", best: true },
          {
            text: "They cut a road around the river.",
            whatIf: "Somebody measured once. You'd be driving forty miles upriver to get to a spot you can see from your own porch.",
          },
        ],
        awayWay:
          "A flat-bottomed ferry crosses six times a day, carrying wagons, people, and whatever the wagons are carrying.",
        whyPrompt: "Why isn't Cloudreach doing it Maple Crossing's way?",
        whyOptions: [
          { id: "people", text: "There are more people in Cloudreach." },
          { id: "land", text: "A road can't cross water, and the water is in the way." },
          { id: "already", text: "Cloudreach hasn't been around long enough yet." },
        ],
        ledgerLine: "Transportation — a road on one side, a ferry on the other.",
        vocabTerm: "transportation",
        vocabMeaning: "how people and the things they need move from one place to another",
        realWorld:
          "River towns ran ferries for generations. Plenty kept running them long after the first bridges went up.",
        stretch: {
          q: "Would this count as transportation too?",
          options: [
            { text: "A town builds a bridge so wagons can cross the creek.", ok: true, why: "Yes — it's how people and goods get where they're going. Same need, another way to meet it." },
            { text: "A town builds a tall fence along the road.", ok: false, why: "A fence keeps things off the road. It isn't moving anybody anywhere." },
          ],
        },
        nextLabel: "Next need →",
      },
      {
        id: "r3",
        needId: "recreation",
        needLabel: "Recreation",
        tag: "Need three",
        imageKey: "beatRecreation",
        homeLead: "Last one. Home first.",
        homeWay:
          "Maple Crossing kids swim in the creek all summer. It runs right past the houses.",
        awaySetup:
          "Up on the bluff there's no creek, and the river below runs fast and deep.",
        predictPrompt: "So what do Cloudreach kids do?",
        predictOptions: [
          {
            text: "Swim in the river.",
            whatIf: "Fast and deep is exactly the water you don't swim in. Cloudreach parents were united on this one.",
          },
          { text: "They built somewhere to swim.", best: true },
          {
            text: "Nothing — Cloudreach hasn't got anywhere to play.",
            whatIf: "That's the guess a lot of agents make. But a town of two thousand with nowhere to go on a Saturday doesn't stay a town of two thousand for long.",
          },
        ],
        awayWay:
          "Cloudreach put up a pool, and a building around it for when it rains. It took two years and everybody's money.",
        whyPrompt: "Why isn't Cloudreach doing it Maple Crossing's way?",
        whyOptions: [
          { id: "people", text: "There are more people in Cloudreach." },
          { id: "land", text: "The river gets in the way." },
          { id: "already", text: "Maple Crossing already had a creek. Cloudreach had to build what it didn't have." },
        ],
        ledgerLine: "Recreation — a creek that was already there, or a pool somebody built.",
        vocabTerm: "recreation",
        vocabMeaning: "how people rest and enjoy themselves when the work is done",
        realWorld:
          "Towns with no lake or river nearby often build a public pool. It's usually the most expensive thing they build.",
        stretch: {
          q: "Would this count as recreation too?",
          options: [
            { text: "A town opens a park with a ball field in it.", ok: true, why: "Yes — somewhere for the whole town to go when the work is done." },
            { text: "A town opens a bigger grocery store.", ok: false, why: "That's a town taking care of what families need to live. Useful, but it isn't rest and it isn't play." },
          ],
        },
      },
    ],
  },

  contrastSynthesis: {
    title: "Put the two towns side by side",
    sortTag: "Part 1 · What they share",
    sortPrompt: "Tap each one, then tap where it belongs. Some belong to both.",
    columns: [
      { id: "home", label: "Only Maple Crossing" },
      { id: "both", label: "Both towns" },
      { id: "away", label: "Only Cloudreach" },
    ],
    sortItems: [
      { id: "school", text: "Children spend the morning learning" },
      { id: "ferry", text: "A ferry runs six times a day" },
      { id: "oneRoom", text: "Everyone who wants a say fits in one room" },
      { id: "swim", text: "There is somewhere to swim" },
      { id: "mayor", text: "A mayor and six others decide" },
      { id: "decide", text: "Somebody has the job of settling arguments" },
      { id: "creekSwim", text: "Summer afternoons are spent in a creek" },
    ],
    causeTag: "Part 2 · Why they're different",
    causes: [
      {
        id: "cs1",
        q: "Cloudreach elects seven people. Maple Crossing lets whoever turns up vote. What made the difference?",
        options: [
          { text: "How many people there are.", ok: true, why: "Yes. Three hundred can argue it out. Two thousand can't, so they pick somebody to do it for them." },
          { text: "The river between them.", ok: false, why: "The river is real, but it's got nothing to do with who votes. Look at the numbers instead." },
          { text: "One town is older than the other.", ok: false, why: "Nothing here says either one is older. What do we actually know is different about them?" },
        ],
      },
      {
        id: "cs2",
        q: "One town swims in a creek. The other built a pool. What made the difference?",
        options: [
          { text: "What was already there before the town was.", ok: true, why: "That's it. You don't build what you've already got — and you do build what you haven't." },
          { text: "How many people there are.", ok: false, why: "That was the answer last time, not this one. Two thousand people could still swim in a creek if they had one." },
          { text: "The river between them.", ok: false, why: "The river's there for both of them. It's what's on each side that differs." },
        ],
      },
    ],
    changeTag: "Part 3 · Change one thing",
    changePrompt: "Suppose somebody builds a bridge across the river, wide enough for wagons.",
    changeOne: {
      q: "Which difference between the two towns goes away?",
      options: [
        { text: "The ferry — wagons could just drive across." },
        { text: "The way they decide things — they could all meet together now." },
        { text: "Nothing changes. The towns would still do everything exactly as they do now.", isNoChange: true },
      ],
    },
    bigIdea:
      "Both towns take care of all five needs. The ways look different because the places are different — how many people, what the land does, what was already sitting there. Change the place and the way changes with it.",
  },

  reasonSort: {
    title: "Seven clues",
    kidPrompt: "Tap a clue, then tap the need it serves. None say it out loud.",
    helpWrong: "Not that one — read it again.",
    helpPass: "All seven filed. Not one told you the answer.",
    bins: [
      { id: "government", label: "Government", emoji: "🏛️", color: "#00C2C7" },
      { id: "education", label: "Education", emoji: "📚", color: "#7B5DFF" },
      { id: "communication", label: "Communication", emoji: "🔔", color: "#FF7AB6" },
      { id: "transportation", label: "Transportation", emoji: "🛶", color: "#FFC44D" },
      { id: "recreation", label: "Recreation", emoji: "⚾", color: "#4DD97F" },
    ],
    // Checked against the no-giveaway rule: no clue contains a word from its
    // own bin's label or from that need's definition in sideBySide. Counts are
    // deliberately uneven (2/2/1/1/1) so the last few can't be got by
    // elimination.
    items: [
      { id: "ferryman", text: "The ferryman waits for the seven o'clock crowd." },
      { id: "bellTower", text: "The bell rings twice, and the whole bluff knows the water is rising." },
      { id: "longTable", text: "Six children at one long table, the eldest reading out loud." },
      { id: "creekClosed", text: "The creek is shut to fishing until May, and nobody argues." },
      { id: "saturdayField", text: "On Saturday the field fills up and somebody keeps score." },
      { id: "flourWagon", text: "A wagon of flour leaves before dawn for the far town." },
      { id: "storeBoard", text: "Every Friday a fresh sheet goes up outside the store." },
    ],
  },

  opsChoice: {
    title: "Joint Council — Maple Crossing & Cloudreach",
    pickHeader: "Pick exactly 2 to build this year",
    constraint: "The two towns share one crew. They can build **two** things this year. All three are real needs.",
    scenario:
      "One crew, one year, two towns paying together. Three people came to the joint council — and all three of them are right.",
    voices: [
      { id: "transportation", who: "Bez, who runs the ferry", emoji: "🛶", said: "Six crossings a day and people still stand in the rain. One boat isn't enough for two thousand." },
      { id: "communication", who: "Miss Ardle, the Cloudreach teacher", emoji: "🔔", said: "I had to send a boy on the ferry to tell eleven families school was shut. There has to be a better way than that." },
      { id: "recreation", who: "Tam, age nine", emoji: "⚾", said: "There's nowhere both towns can go. We play on our side, they play on theirs. We don't even know them." },
    ],
    projects: [
      {
        id: "second_ferry",
        label: "A second ferry boat, so nobody waits in the rain",
        reason: "Transportation",
        shortReasonLabel: "Getting across",
        reasonId: "transportation",
        sceneId: "ferry",
        emoji: "🛶",
        teks: true,
        improves: "Crossings double, and the wagons stop queueing on the bank.",
      },
      {
        id: "print_shop",
        label: "A print shop, so both towns get the same weekly sheet",
        reason: "Communication",
        shortReasonLabel: "Getting word out",
        reasonId: "communication",
        sceneId: "print",
        emoji: "🔔",
        teks: true,
        improves: "Word reaches both sides of the river on the same day.",
      },
      {
        id: "shared_field",
        label: "A ball field halfway between, for both towns",
        reason: "Recreation",
        shortReasonLabel: "Somewhere to go",
        reasonId: "recreation",
        sceneId: "field",
        emoji: "⚾",
        teks: true,
        improves: "One place both towns go on a Saturday.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "People have to be able to get across",
      "Word has to reach both towns",
      "Both towns need somewhere to go together",
      "The third one can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "transportation", label: "Transportation is still waiting" },
      { id: "communication", label: "Communication is still waiting" },
      { id: "recreation", label: "Recreation is still waiting" },
    ],
    deferredPrompt: "Which real need is still waiting?",
    fundMeterLabel: "Build meter — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets built vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two built. One real need waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real needs here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were telling the truth about what their town needs. Two towns, one crew, two builds — somebody was always going to be right and still have to wait.",
    whoseWrong: "Read what each of them said again. Somebody stood there and described exactly this.",
  },

  transfer: {
    title: "Ridgeway",
    kidPrompt: "A third town. Nobody from HQ has been. Tap the **two things** that show which need Ridgeway takes care of hardest.",
    // ART NEEDED: no drawing of Ridgeway exists, so imageKey is left out and
    // this renders as word chips — same as 3.2A's transfer phase. The x/y
    // values are already positioned for a 600x300-ish scene.
    imageAlt: "A hill town with a loading ramp, a wagon yard, a bell post, a schoolroom window and a stone horse",
    spots: [
      { id: "ramp", label: "A long ramp down to the water", x: 14, y: 68 },
      { id: "wagonYard", label: "A yard with six wagons in it", x: 36, y: 60 },
      { id: "bellPost", label: "A bell on a post", x: 57, y: 44 },
      { id: "benches", label: "A room of benches and a chalkboard", x: 78, y: 58 },
      { id: "statue", label: "A stone horse on a plinth", x: 93, y: 46 },
    ],
    tapCount: 2,
    claimFrame: "Ridgeway works hardest at…",
    claimOptions: [
      { id: "transportation", label: "transportation" },
      { id: "communication", label: "communication" },
      { id: "education", label: "education" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you're cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three needs" },
      { id: "together", label: "Side by side" },
      { id: "sort", label: "Seven clues filed" },
      { id: "newtown", label: "Ridgeway" },
    ],
    // Every distractor is a mistake a third grader actually makes: that a
    // small town simply lacks some needs, that whoever is strongest is the
    // government, that agreeing and governing are the same thing, and that
    // the river explains every difference between the towns.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which five needs do communities take care of?",
        choices: [
          { id: "a", text: "government · education · communication · transportation · recreation" },
          { id: "b", text: "government · education · communication · transportation · being the biggest town around" },
          { id: "c", text: "good weather · education · communication · transportation · recreation" },
          { id: "d", text: "government · education · everybody believing the same · transportation · recreation" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Which one of these shows a town's government?",
        choices: [
          { id: "a", text: "The town agrees a rule, and everybody follows it afterwards." },
          { id: "b", text: "The biggest family in town gets its way most of the time." },
          { id: "c", text: "Everybody in town happens to want the very same thing." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Maple Crossing's kids swim in the creek. Cloudreach's kids swim in the pool they built. What does that show?",
        choices: [
          { id: "a", text: "Both towns take care of the same need, in different ways." },
          { id: "b", text: "Only Cloudreach takes proper care of that need for its kids." },
          { id: "c", text: "Cloudreach needs more things than Maple Crossing does." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Cloudreach elects a mayor. Maple Crossing lets whoever turns up vote. Why?",
        choices: [
          { id: "a", text: "There are too many people in Cloudreach to all decide together." },
          { id: "b", text: "Cloudreach is on the far side of the river from Maple Crossing." },
          { id: "c", text: "Maple Crossing has not got round to electing anybody yet." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. WHICH town their own is more like is the student's
        // call and goes to the teacher; only whether the sentence holds
        // together is checked. This is also where the standard's "the LOCAL
        // community" half finally lands — up to now both towns have been
        // somebody else's.
        prompt: "Think about your own town. Which of these two is it more like?",
        keepFrame: "Our town is more like ______, because ______.",
        keepOptions: [
          { id: "maple", label: "Maple Crossing" },
          { id: "cloud", label: "Cloudreach" },
        ],
        becauseOptions: [
          { id: "maple", label: "there are few enough of us that we could all fit in one room" },
          { id: "cloud", label: "there are too many of us to all decide together" },
          { id: "none", label: "our town is nothing like either one of them" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Two Towns, Five Needs. Take your card with you.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. Every card names which town ours is more like and why — and the class will not agree. That disagreement is tomorrow's lesson, already written by the students.",
    },
  },
};
