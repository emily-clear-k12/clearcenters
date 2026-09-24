// Briefing SS-3-1B-V3-BR — Three Ways to Build a Town — PUBLIC pack, people shape.
// Answer keys live only in SS-3-1B-V3-BR.server.js — never import that here.
//
// First lesson on Type 3 (people). Shape contract and the reasoning behind it:
// lib/briefings/schema/ssPeopleLesson.schema.js.
//
// WHY THIS LESSON EXISTS IN THIS SHAPE. TEKS 3.1B says "identify individuals
// who helped shape communities, including Pierre-Charles L'Enfant, Benjamin
// Banneker, and Benjamin Franklin." Taken literally that is a recall task, and
// a recall task is a trivia deck. So the lesson does three things instead:
//
//   1. It puts the student in each person's position BEFORE saying what they
//      did. No option is marked correct — real people made real mistakes, and
//      one of these three was fired within a year for the choice he made.
//   2. It gives each contribution a KIND — planned it, measured it, organized
//      it — and makes the student name the kind. That naming step is what's
//      graded, and it's what turns three biographies into one idea.
//   3. It then removes a kind and asks what breaks, so the three kinds are
//      shown to do different work rather than being three words in a row.
//
// HISTORICAL ACCURACY — every claim below was checked against a source on
// Sept 14, 2026, because this pack states things about real people to
// eight-year-olds. What was verified:
//   - L'Enfant was dismissed on 28 Feb 1792 after demolishing the house of
//     landowner Daniel Carroll, which stood in the way of a planned road;
//     Carroll was compensated; L'Enfant had been in continual conflict with
//     the commissioners. His design was nonetheless the one the city was
//     built from. (mallhistory.org, Histories of the National Mall)
//   - Banneker was born 9 Nov 1731, so was 59 during the 1791 survey. He
//     assisted Andrew Ellicott from February 1791, maintaining the regulator
//     clock in the observatory tent and recording the night astronomical
//     observations from which the survey's starting point was determined. He
//     was paid $2 a day and returned to his farm in April 1791, then finished
//     the almanac. (whitehousehistory.org)
//   - Franklin's Union Fire Company: articles signed 7 Dec 1736 by thirty men
//     who agreed to attend all members' fires with leather buckets and stout
//     bags, and to meet monthly. When more men wanted to join, Franklin had
//     them found separate companies instead — producing Heart-in-Hand,
//     Britannia, Fellowship and others. (ushistory.org, Franklin's Philadelphia)
//
// DELIBERATELY EXCLUDED: the popular story that Banneker reproduced L'Enfant's
// plan from memory after L'Enfant left. It is disputed and probably a myth —
// Ellicott's team held copies, and one theory is a mix-up with Andrew
// Ellicott's brother Benjamin. It appears in a lot of classroom material. It
// is not in this lesson, and it should not be added to any Grade 4/5 lesson
// that reuses these figures.
//
// FOR EMILY — ONE CONTENT CALL. Round 2's `realWorld` line mentions Banneker's
// 1791 letter to Thomas Jefferson arguing that a country calling all men equal
// could not keep people enslaved, and that Jefferson replied politely and
// changed nothing. It is true, it is the most significant public act of his
// life, and it is handled in one sentence. It is also a heavier line than
// anything else in the Briefings library. Keep it, soften it, or cut it —
// that call is yours, not the generator's.
//
// ART NEEDED (none of these exist yet):
//   cityFromNothing — an empty river plain with survey stakes in it
//   beatPlanned     — a drawing board with a city plan half-drawn
//   beatMeasured    — a tent at night, a clock, a telescope, stars
//   beatOrganized   — neighbours with leather buckets outside a burning house
//   halloway        — the transfer town (runs as word chips until it exists)

export const PUBLIC_BRIEFING = {
  id: "SS-3-1B-V3-BR",
  title: "Three Ways to Build a Town",
  tagline: "One drew a city that wasn't there. One found out exactly where it was. One got thirty neighbours to sign a paper.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssPeople",
  grade: 3,
  teks: "3.1B",
  teksText:
    "Identify individuals who helped shape communities, including Pierre-Charles L'Enfant, Benjamin Banneker, and Benjamin Franklin.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can name people who helped shape communities and say what kind of work each one did.",
  successCriteria:
    "Names L'Enfant, Banneker and Franklin and what each did; sorts contributions into planned, measured and organized; explains what would be missing from a town without one of the three.",

  // The spine of the lesson. Naming these is the graded step; removing one is
  // what the synthesis does.
  kinds: [
    { id: "planned", label: "Planned it", blurb: "Decided how a whole place would fit together, before any of it existed." },
    { id: "measured", label: "Measured it", blurb: "Found out exactly where things were, so the work could be trusted." },
    { id: "organized", label: "Organized it", blurb: "Got people to do together what none of them could do alone." },
  ],

  art: {
    cityFromNothing: "/briefings/ss-3-1b-v3-br/01-empty-plain.jpg",
    beatPlanned: "/briefings/ss-3-1b-v3-br/02-drawing-board.jpg",
    beatMeasured: "/briefings/ss-3-1b-v3-br/03-night-tent.jpg",
    beatOrganized: "/briefings/ss-3-1b-v3-br/04-bucket-line.jpg",
  },

  phases: ["openingFrame", "theDecision", "contributionSynthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: when more men asked to join Franklin's fire company, he told them to go and start their own instead. Within a few years Philadelphia had so many fire companies they had to give them names to tell them apart.",
    },
  },

  samLines: {
    openingFrame: "Three people. Three completely different jobs. One idea.",
    theDecision: "You decide first. Then you find out what they actually did.",
    contributionSynthesis: "Three kinds of work — and what happens when one is missing.",
    reasonSort: "Seven jobs. Which kind of work is each one?",
    opsChoice: "Three people want the job. You can hire two.",
    transfer: "Somebody you've never heard of. Work out what she did.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    theDecision: "There's no right answer when you choose. Real people got these wrong too.",
    contributionSynthesis: "Take one kind of work away and see what falls over.",
    reasonSort: "Read the whole clue. None of them say which kind out loud.",
    opsChoice: "All three are real jobs. You can only hire two.",
    transfer: "Every kind has one piece of proof. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Who Shapes a Town?",
    setup:
      "Every town you have ever been in was made by somebody. Roads, schools, the rules about where you can park — none of it grew there.",
    isItPrompt: "Somebody has lived in the same town for sixty years. Have they shaped it?",
    // No marked answer. All three are defensible; the traits step settles it.
    isItOptions: [
      {
        id: "yes",
        text: "Yes — sixty years is a lot of life in one place.",
        response: "Sixty years is a long time to be part of somewhere. Whether time on its own changes a place is the question HQ is about to open up.",
      },
      {
        id: "depends",
        text: "Not on its own — it depends what they did.",
        response: "That's the line HQ draws too. Being there and changing it aren't automatically the same thing.",
      },
      {
        id: "known",
        text: "Only if people know their name.",
        response: "Worth testing. Two of the three people in this briefing were barely known when they died, and you are about to walk through what they built.",
      },
    ],
    traitsPrompt: "So what makes somebody a person who shaped a community? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "They made something that was still there after they left.", isTrait: true },
      {
        text: "They were well known while they were alive.",
        isTrait: false,
        why: "Plenty of famous people left nothing behind. Plenty of people you have never heard of left roads, schools and fire companies you use.",
      },
      { text: "Other people's lives worked differently because of what they did.", isTrait: true },
      {
        text: "They were in charge of something.",
        isTrait: false,
        why: "Being in charge is not the same as changing anything. One of the three people in this briefing was in charge of nothing at all.",
      },
    ],
    traitsReveal:
      "That's it. Somebody **shapes a community** when they make something that outlasts them and changes how other people live. It happens in three kinds of work: somebody **plans** it, somebody **measures** it, and somebody **organizes** it.",
    predictSetup:
      "Three people are coming up. Pierre-Charles L'Enfant, who drew a whole capital city on paper while the ground was still farmland. Benjamin Banneker, a Maryland farmer who taught himself the stars. Benjamin Franklin, a printer in Philadelphia.",
    predictPrompt: "Very different jobs. What do you think all three had in common?",
    predictOptions: [
      { id: "incharge", label: "They were all in charge of something", hint: "Somebody has to be running things" },
      { id: "outlasted", label: "They each made something that outlasted them", hint: "Still there after they'd gone" },
      { id: "samecity", label: "They all lived in the same city", hint: "Working on the same place at the same time" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ isn't saying yet — you'll know by the end. Keep your guess.",
  },

  theDecision: {
    // Which openingFrame.predictOption the teach settles the locked guess to.
    // Checked against openingFrame.predictOptions by crossCheckLesson.
    resolvesPredictionTo: "outlasted",
    ledgerTitle: "Three kinds of work",
    ledgerEmpty: "Nothing yet — you'll fill this in one person at a time.",
    namePrompt: "So what kind of work was that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it. **Each one made something that outlasted them** — a city still built to one man's drawing, corners still where another man's stars put them, and fire companies that outlived the third.",
    predictionWrong:
      "You guessed **{GUESS}**. What they shared: **each one made something that outlasted them.** Two were in charge of nothing, and they never all lived in one city.",
    finalLabel: "So — what did all three have in common?",
    rounds: [
      {
        id: "d1",
        personName: "Pierre-Charles L'Enfant",
        personBlurb: "A French engineer hired in 1791 to design a capital city from nothing.",
        tag: "Person one",
        imageKey: "beatPlanned",
        situation:
          "Nothing is there yet — farmland, a river, trees. L'Enfant draws the whole city on paper: wide avenues out from circles, a hill for the Capitol, a long green. Then a landowner called Daniel Carroll finishes a house, standing exactly where an avenue must run.",
        decisionPrompt: "You are L'Enfant. What do you do?",
        // NO option is marked best. This phase has no right answer by design —
        // see ssPeopleLesson.schema.js rule 1.
        decisionOptions: [
          {
            text: "Bend the avenue around the house.",
            response: "You could. But every avenue meets the others at circles. Bend one and you start bending the rest.",
          },
          {
            text: "Take the house down.",
            actual: true,
            response: "This is what he did. Carroll was paid. It also ended his job.",
          },
          {
            text: "Go to George Washington and let him decide.",
            response: "The sensible move, and the one most agents pick. It would have cost him months he did not have.",
          },
        ],
        whatHappened:
          "He had it pulled down. Carroll was paid. But he had been arguing with the commissioners for months, and this ended it — Washington dismissed him on 28 February 1792.",
        consequence:
          "Here is the strange part: the city was built from his drawing anyway. Not for a hundred years — but the Washington that exists today is his.",
        cost: "Dismissed a year in, never paid what he was owed, died with nothing.",
        kindOptions: [
          { id: "planned", label: "He planned it" },
          { id: "measured", label: "He measured it" },
          { id: "organized", label: "He organized it" },
        ],
        ledgerLine: "L'Enfant — drew the whole city before any of it existed.",
        vocabTerm: "a plan",
        vocabMeaning: "how a whole place will fit together, decided before any of it exists",
        realWorld:
          "Most towns were never drawn first. They grew out from a crossroads — which is why their streets wander.",
        stretch: {
          q: "Would this count as the same kind of work?",
          options: [
            { text: "Someone decides where the park, school and shops go before anything is built.", ok: true, why: "Yes — how the whole thing fits together, before anything is there." },
            { text: "Someone paints a mural on a school that is already open.", ok: false, why: "It changes how the place feels. But nothing about how it fits together was decided." },
          ],
        },
        nextLabel: "Next person →",
      },
      {
        id: "d2",
        personName: "Benjamin Banneker",
        personBlurb: "A free Black farmer from Maryland, 59, who taught himself the stars and built a wooden clock that ran forty years.",
        tag: "Person two",
        imageKey: "beatMeasured",
        situation:
          "Somebody has to say exactly where the new district sits, to the foot. In 1791 the only way is by the stars: night after night in a tent, with a clock that must not drift. Andrew Ellicott asks Banneker — 59, unwell, with a farm that does not run itself.",
        decisionPrompt: "You are Banneker. What do you do?",
        decisionOptions: [
          {
            text: "Go. Spend the winter awake in a tent watching the sky.",
            actual: true,
            response: "This is what he did, at 59, in February.",
          },
          {
            text: "Stay home. The farm needs you and the nights are for younger men.",
            response: "Nobody would have blamed him. The farm really did suffer for it.",
          },
          {
            text: "Say yes, but do the arithmetic from home and post it in.",
            response: "You can't post the sky. The sightings must be made from that spot at that moment.",
          },
        ],
        whatHappened:
          "He went. He kept the clock in the tent and wrote down the star sightings every night, and from those numbers the survey's starting point was fixed. He went home in April.",
        consequence:
          "The corners of the district were set from his sightings — the boundary everything else was built inside. He took the arithmetic home and finished the almanac that made him famous.",
        cost: "Two months of winter nights at 59, with the farm left to itself.",
        kindOptions: [
          { id: "planned", label: "He planned it" },
          { id: "measured", label: "He measured it" },
          { id: "organized", label: "He organized it" },
        ],
        ledgerLine: "Banneker — fixed exactly where the city was, by the stars.",
        vocabTerm: "a survey",
        vocabMeaning: "finding out exactly where a place's edges are, so what gets built after can be trusted",
        realWorld:
          "Later that year he sent the almanac to Thomas Jefferson with a letter, arguing a country calling all men equal could not keep people enslaved. Jefferson replied politely and changed nothing.",
        stretch: {
          q: "Would this count as the same kind of work?",
          options: [
            { text: "Someone counts the children on each street before the school gets built.", ok: true, why: "Yes — finding out what is true, so the decision after can be trusted." },
            { text: "Someone argues at a meeting that the school should be bigger.", ok: false, why: "That's making a case, not finding out. Different job." },
          ],
        },
        nextLabel: "Next person →",
      },
      {
        id: "d3",
        personName: "Benjamin Franklin",
        personBlurb: "A printer in Philadelphia who held no office at all in 1736.",
        tag: "Person three",
        imageKey: "beatOrganized",
        situation:
          "Philadelphia is built of timber and the houses touch. When one catches, neighbours run out with their own buckets, get in each other's way, and the fire takes the street. Franklin has written about it. The fires carried on.",
        decisionPrompt: "You are Franklin. What do you do?",
        decisionOptions: [
          {
            text: "Write a stronger piece in the newspaper.",
            response: "He had done that already. Everyone agreed with him and the houses kept burning.",
          },
          {
            text: "Ask the governor to pay for men whose job is fires.",
            response: "The obvious answer, and most agents pick it. Cities did do that — about a hundred years later.",
          },
          {
            text: "Get thirty neighbours to sign a paper promising to come to each other's fires.",
            actual: true,
            response: "This is what he did, on 7 December 1736.",
          },
        ],
        whatHappened:
          "Thirty men signed. Each kept leather buckets by his door, each promised to come to any of the others' fires, and they met monthly. They called it the Union Fire Company.",
        consequence:
          "It worked. When more men asked to join, Franklin told them to start their own instead — so Philadelphia ended up with Heart-in-Hand, Britannia, Fellowship and more.",
        cost: "Thirty men gave up an evening a month and ran towards other people's fires.",
        kindOptions: [
          { id: "planned", label: "He planned it" },
          { id: "measured", label: "He measured it" },
          { id: "organized", label: "He organized it" },
        ],
        ledgerLine: "Franklin — got neighbours to do together what none could do alone.",
        vocabTerm: "a company",
        vocabMeaning: "a group who agree to do together what none could manage alone",
        realWorld:
          "Franklin did it again and again — the lending library, the paved streets, the post. Each was people sharing what none could afford alone.",
        stretch: {
          q: "Would this count as the same kind of work?",
          options: [
            { text: "Six families take turns driving all their children to school.", ok: true, why: "Yes — alone it's every morning; together it's one. That's the trick." },
            { text: "One family buys a bigger car for their own children.", ok: false, why: "Useful for them. Nothing is shared and nobody else's morning changes." },
          ],
        },
      },
    ],
  },

  contributionSynthesis: {
    title: "Three kinds of work",
    sortTag: "Part 1 · Which kind is this?",
    sortPrompt: "Tap a job, then tap the kind of work it is. None of them say it out loud.",
    columns: [
      { id: "planned", label: "Planned it" },
      { id: "measured", label: "Measured it" },
      { id: "organized", label: "Organized it" },
    ],
    sortItems: [
      { id: "drewStreets", text: "She drew every street of the new neighbourhood while it was still a field." },
      { id: "chainFence", text: "He walked the fence line with a chain and wrote the distance down to the inch." },
      { id: "nightWatch", text: "Twelve families signed a paper promising to take turns watching the road at night." },
      { id: "emptyMap", text: "Somebody sat down with an empty map and marked out where the square and the roads should go." },
      { id: "sameStar", text: "She checked the same star three nights running to be sure of the corner." },
      { id: "thirtyNeighbours", text: "Thirty neighbours agreed in writing to come to each other's trouble." },
      { id: "countedFamilies", text: "He counted every family on the street so the school would be the right size." },
    ],
    attributionTag: "Part 2 · What would be missing",
    attributions: [
      {
        id: "a1",
        q: "Suppose L'Enfant had never been hired. What would Washington be missing?",
        options: [
          { text: "The shape of it — the wide avenues, the circles, the green down the middle.", ok: true, why: "Yes. The buildings would have come anyway. The shape they sit in is the part that was one man's drawing." },
          { text: "Its exact corners and edges.", ok: false, why: "Those came from somebody else in this briefing — the man who spent his nights with a clock and a telescope." },
          { text: "Nothing at all. Cities build themselves.", ok: false, why: "Some do grow that way, and you can tell — their streets wander. Washington's don't, and that's not an accident." },
        ],
      },
      {
        id: "a2",
        q: "Suppose nobody had done Banneker's job. What goes wrong?",
        options: [
          { text: "Nobody can be sure where the district actually ends, so everything built inside it is built on a guess.", ok: true, why: "Exactly. A drawing is only worth something once somebody knows where on the earth to put it." },
          { text: "There would be no fire company.", ok: false, why: "Different person, different job — and a different city, too." },
          { text: "The avenues would not be straight.", ok: false, why: "Straight came from the drawing. Knowing where the whole thing sits is the other job." },
        ],
      },
    ],
    removeTag: "Part 3 · Take one kind away",
    removePrompt:
      "A brand-new town has somebody who planned it and somebody who measured it. Nobody does the third kind of work at all.",
    removeOne: {
      q: "What happens to that town?",
      options: [
        { text: "It gets built in the right place and the right shape — and then nobody runs anything together. No fire company, no library, no taking turns." },
        { text: "The streets end up crooked and nobody knows where the edges are." },
        { text: "Nothing much. Two out of three is plenty for a town.", isNoChange: true },
      ],
    },
    bigIdea:
      "Three people, three completely different jobs, none of them doing the others' work. A town needs somebody to decide its shape, somebody to find out exactly where it is, and somebody to get everyone else moving. Take any one out and what is left doesn't stand up.",
  },

  reasonSort: {
    title: "Seven jobs",
    kidPrompt: "Tap a job, then the kind of work it is.",
    helpWrong: "Not that one — read it again.",
    helpPass: "All seven filed. Not one told you the answer.",
    bins: [
      { id: "planned", label: "Planned it", emoji: "📐", color: "#7B5DFF" },
      { id: "measured", label: "Measured it", emoji: "🔭", color: "#00C2C7" },
      { id: "organized", label: "Organized it", emoji: "🤝", color: "#FFC44D" },
    ],
    // Counts are uneven (2/3/2) so the last few can't be got by elimination.
    // Checked against the no-giveaway rule: no clue contains a word from its
    // own bin's label or from that kind's definition.
    items: [
      { id: "s_drew", text: "A woman hands over a picture of a town nobody has built." },
      { id: "s_chain", text: "A man walks the county edge with a chain, noting every distance." },
      { id: "s_signed", text: "Eleven families put their names to a promise about the night watch." },
      { id: "s_stakes", text: "Somebody hammers stakes at the corners, then checks them twice." },
      { id: "s_library", text: "Fifty people each put in a little to share the same books." },
      { id: "s_sketch", text: "Somebody works out where the square sits and how wide the roads go." },
      { id: "s_counted", text: "A clerk writes down how many children live on each street." },
    ],
  },

  opsChoice: {
    title: "Founders' Council — a brand-new town",
    pickHeader: "Pick exactly 2 to hire this year",
    constraint: "The town can pay **two** people this year. All three are real jobs.",
    scenario:
      "A new town on a new river. Three people have come looking for work, and all three are needed.",
    voices: [
      { id: "planned", who: "Iva, who draws", emoji: "📐", said: "Hire the others first and you'll have exact corners around a mess. Somebody has to decide the shape while it's still cheap to change." },
      { id: "measured", who: "Otho, who surveys", emoji: "🔭", said: "Build before you know where the edges are and you'll be arguing about whose land is whose for fifty years." },
      { id: "organized", who: "Ruby, who gets people moving", emoji: "🤝", said: "You can have the prettiest shape on the prettiest map. Nobody's coming when your house catches." },
    ],
    projects: [
      {
        id: "hire_planner",
        label: "Hire Iva to lay out the town before anything is built",
        reason: "Planned it",
        shortReasonLabel: "The shape",
        reasonId: "planned",
        sceneId: "plan",
        emoji: "📐",
        teks: true,
        improves: "The streets meet properly and the square ends up where people can reach it.",
      },
      {
        id: "hire_surveyor",
        label: "Hire Otho to fix the corners and edges exactly",
        reason: "Measured it",
        shortReasonLabel: "The edges",
        reasonId: "measured",
        sceneId: "survey",
        emoji: "🔭",
        teks: true,
        improves: "Everyone knows whose land is whose, and nobody argues about it later.",
      },
      {
        id: "hire_organizer",
        label: "Hire Ruby to get the fire company and the library going",
        reason: "Organized it",
        shortReasonLabel: "The people",
        reasonId: "organized",
        sceneId: "organize",
        emoji: "🤝",
        teks: true,
        improves: "Neighbours turn up for each other before anybody has to ask.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Somebody has to decide the shape first",
      "You have to know where the edges are",
      "People need to be able to count on each other",
      "The third one can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "planned", label: "Planning it is still waiting" },
      { id: "measured", label: "Measuring it is still waiting" },
      { id: "organized", label: "Organizing it is still waiting" },
    ],
    deferredPrompt: "Which kind of work is still waiting?",
    fundMeterLabel: "Hire meter — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "Who gets hired vs. who waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two hired. One kind of work waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real jobs here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were telling the truth about what a town needs. You could pay two, so somebody was always going to be right and still wait a year.",
    whoseWrong: "Read what each of them said again. Somebody stood in front of you and described exactly this.",
  },

  transfer: {
    title: "Halloway",
    kidPrompt: "A town nobody at HQ has been to, and a woman called Ada Pike. Tap the **two things** that show what kind of work she did.",
    // ART NEEDED: no drawing of Halloway exists, so this renders as word chips,
    // same as the other two v3 lessons' transfer phases.
    imageAlt: "A small museum case holding a notebook, a surveyor's chain, a rolled drawing, a signed list and a medal",
    spots: [
      { id: "notebook", label: "Her notebook of distances, corner by corner", x: 14, y: 60 },
      { id: "chain", label: "A surveyor's chain and a set of brass markers", x: 35, y: 66 },
      { id: "drawing", label: "A rolled-up drawing of streets that didn't exist yet", x: 56, y: 52 },
      { id: "list", label: "A signed list of families who'd take turns on the watch", x: 77, y: 62 },
      { id: "medal", label: "A medal she was given at a dinner", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "Ada Pike's work was…",
    claimOptions: [
      { id: "planned", label: "planning it" },
      { id: "measured", label: "measuring it" },
      { id: "organized", label: "organizing it" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you're cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three people" },
      { id: "together", label: "Three kinds of work" },
      { id: "sort", label: "Seven jobs filed" },
      { id: "newtown", label: "Halloway" },
    ],
    // Distractors are mistakes students actually make: that famous means
    // president, that being rich or long-resident counts as shaping a place,
    // and that a person whose job ended badly left nothing behind.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What did L'Enfant, Banneker and Franklin have in common?",
        choices: [
          { id: "a", text: "Each one helped build a community in a different way." },
          { id: "b", text: "Each one was a famous president of the United States." },
          { id: "c", text: "Each one lived in the same city at the same time as the others." },
          { id: "d", text: "Each one was put in charge of a large city by the government." },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A woman walks the boundary of a new county with a chain, writing down every distance. What kind of work is that?",
        choices: [
          { id: "a", text: "She measured it — the work can be trusted now." },
          { id: "b", text: "She planned it — she decided where things would go." },
          { id: "c", text: "She organized it — she got people working together." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Which one of these is helping to shape a community?",
        choices: [
          { id: "a", text: "Starting a club that repairs neighbours' roofs after a storm." },
          { id: "b", text: "Being the richest person who happens to live on the street." },
          { id: "c", text: "Living in the same town your whole life without ever moving." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "L'Enfant was dismissed about a year after he started. What happened to his drawing?",
        choices: [
          { id: "a", text: "The city was built from it anyway, long afterwards." },
          { id: "b", text: "It was thrown away and somebody drew a new one." },
          { id: "c", text: "It was never used, so Washington looks nothing like it." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Whether tearing down the house was defensible is a
        // real historical judgment with no settled answer, and it goes to the
        // teacher. Only whether the sentence holds together is checked.
        prompt: "L'Enfant had a man's new house pulled down to keep an avenue straight. It cost him his job — and the city was built from his drawing anyway, a hundred years later.",
        keepFrame: "I think he was ______, because ______.",
        keepOptions: [
          { id: "right", label: "right to do it" },
          { id: "wrong", label: "wrong to do it" },
        ],
        becauseOptions: [
          { id: "right", label: "the city we have today is the one he drew" },
          { id: "wrong", label: "a person's home matters more than a straight road" },
          { id: "none", label: "it doesn't matter what anybody does" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Three Ways to Build a Town. Take your card with you.",
    challengeCta: "Ask your teacher when you're ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will not agree about L'Enfant, and they shouldn't — it's a real argument historians still have. That disagreement is tomorrow's lesson, already written by the students.",
    },
  },
};
