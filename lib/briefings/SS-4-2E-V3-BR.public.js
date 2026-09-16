// Briefing SS-4-2E-V3-BR — The Year He Waited — PUBLIC pack, people (Type 3) shape.
// Answer keys live only in SS-4-2E-V3-BR.server.js — never import that here.
//
// Grade 4 · TEKS 4.2E. `teksText` below is verbatim 19 TAC §113.15,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): grantPaper, beatTerms, beatRules, beatPeople
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-4-2E-V3-BR",
  title: "The Year He Waited",
  tagline: "One man spent a year in a waiting room. Another decided his colony would be Mexican. Both were right, and both paid.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssPeople",
  grade: 4,
  teks: "4.2E",
  teksText:
    "Identify the accomplishments and explain the economic motivations and impact of significant empresarios, including Stephen F. Austin and Martín de León, on the settlement of Texas.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can say what empresarios actually did, what kind of work each job was, and what it cost them.",
  successCriteria:
    "Names what Austin and De León each did; sorts empresario work into winning permission, choosing who came, and setting how it ran; explains what a colony would be missing without one of those; reads a third empresario's work from what he left behind.",

  // The spine. Naming these is the graded step; removing one is the synthesis.
  // Deliberately worded in words the history does not naturally use — see the
  // second finding in the header.
  kinds: [
    { id: "terms", label: "Won the permission", blurb: "Got a government to agree anyone could be there at all." },
    { id: "people", label: "Chose the settlers", blurb: "Decided which families the place would be made of." },
    { id: "order", label: "Set how it ran", blurb: "Wrote down how things would be settled once people arrived." },
  ],

  art: {
    grantPaper: "/briefings/ss-4-2e-v3-br/01-the-grant.png",
    beatTerms: "/briefings/ss-4-2e-v3-br/02-waiting-room.png",
    beatRules: "/briefings/ss-4-2e-v3-br/03-porch-court.png",
    beatPeople: "/briefings/ss-4-2e-v3-br/04-road-south.png",
  },

  phases: ["openingFrame", "theDecision", "contributionSynthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: Austin went to Mexico City expecting to be there a few weeks. He was there long enough to learn Spanish well enough to argue in it. HQ has had shorter postings.",
    },
  },

  samLines: {
    openingFrame: "Three decisions. You make them first, then find out what really happened.",
    theDecision: "No right answer when you choose. These people got things wrong too.",
    contributionSynthesis: "Three kinds of work — and what a colony is missing without one.",
    reasonSort: "Seven jobs. None of them say which kind out loud.",
    opsChoice: "A brand-new colony. Three people needed. You can pay two.",
    transfer: "A box belonging to somebody you have never heard of.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    theDecision: "Nothing is marked right when you choose. Decide anyway.",
    contributionSynthesis: "Take one kind of work away and see what falls over.",
    reasonSort: "Read the whole clue before you tap.",
    opsChoice: "All three are real jobs. You can only pay two.",
    transfer: "Every kind has one proof. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Empty Land, On Paper",
    setup:
      "In 1820 the land between the Sabine and the Nueces was, on Mexican maps, almost empty. It was not empty. But Mexico wanted farms on it, and had no one to send.",
    isItPrompt: "A government offers you cheap land if you will bring three hundred families to it. Is that a gift?",
    // No marked answer. All three are defensible; the traits step settles it.
    isItOptions: [
      {
        id: "gift",
        text: "Yes. Free land is free land.",
        response: "It looks that way on the paper. Nobody hands out land for nothing — watch what the government wanted back.",
      },
      {
        id: "job",
        text: "No. It is a job, and a hard one.",
        response: "That is closer to what it turned out to be. Three of them are coming up, and one of them took a year.",
      },
      {
        id: "trade",
        text: "It is a trade — they want something for it.",
        response: "That is the sharp answer. Mexico wanted a frontier full of people who would defend it.",
      },
    ],
    traitsPrompt: "So what does somebody actually have to do to turn empty land into a colony? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "Get a government to agree to it, in writing.", isTrait: true },
      {
        text: "Be rich enough to pay for it yourself.",
        isTrait: false,
        why: "One of the two men in this briefing died with almost nothing and the other with a fortune. Money did not decide who managed it.",
      },
      { text: "Find the families and persuade them to come.", isTrait: true },
      {
        text: "Be the first person to see the place.",
        isTrait: false,
        why: "People had been living on all of this land for thousands of years. Being first to arrive was never the job.",
      },
    ],
    traitsReveal:
      "That is it. An **empresario** was somebody given the right to bring settler families onto land a government granted — and the job broke into three kinds of work: **winning the permission**, **choosing the settlers**, and **setting how it ran**.",
    predictSetup:
      "Two men are coming up. Stephen F. Austin, twenty-seven, whose father died three weeks after winning the grant. Martín De León, a rancher from Tamaulipas, nearly sixty.",
    predictPrompt: "What do you think the hardest part of the job turned out to be?",
    predictOptions: [
      { id: "terms", label: "Getting a government to sign", hint: "Paper, and the people who hold the pen" },
      { id: "people", label: "Finding families willing to come", hint: "Persuading anyone to move that far" },
      { id: "order", label: "Keeping order once they arrived", hint: "Three hundred families and no judge" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying. Keep your guess — you will find out at the end.",
  },

  theDecision: {
    ledgerTitle: "Three kinds of work",
    ledgerEmpty: "Nothing yet — you will fill this in one decision at a time.",
    namePrompt: "So what kind of work was that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it. **Getting a government to sign** was the one that swallowed a whole year, and without it the other two were worth nothing.",
    predictionWrong:
      "You guessed **{GUESS}**. It was **getting a government to sign**. Austin lost a year to it, and until it was done nobody's land was really theirs.",
    finalLabel: "So — which part turned out hardest?",
    rounds: [
      {
        id: "d1",
        personName: "Stephen F. Austin",
        personBlurb: "Twenty-seven, in Texas because his father died three weeks after winning a grant from Spain.",
        tag: "Decision one",
        imageKey: "beatTerms",
        situation:
          "Moses Austin won the right from Spain to bring three hundred families to Texas, then died. Stephen took it over. Before the first crop is in, Mexico wins independence — and owes nothing to anything Spain signed.",
        decisionPrompt: "You are Austin. What do you do?",
        // NO option is marked best. This phase has no right answer by design.
        decisionOptions: [
          {
            text: "Ride to Mexico City and stay until the new government signs it.",
            actual: true,
            response: "This is what he did. He arrived in April 1822 and did not get home until August 1823.",
          },
          {
            text: "Settle the families anyway and hope nobody comes asking.",
            response: "Tempting — it is a long way from anywhere. It also means every family's title is worth nothing the day somebody does ask.",
          },
          {
            text: "Take everyone back across the Sabine and wait for better news.",
            response: "Safe. And these families have sold everything to be here. Most would not come a second time.",
          },
        ],
        whatHappened:
          "He rode south and stayed. The government fell and re-formed while he sat there. He learned Spanish well enough to argue in it, and came home with a grant signed by a government that existed.",
        consequence:
          "He came back holding the first confirmed grant in Texas. Every empresario after him worked under laws passed while he was down there waiting.",
        cost: "A year gone. Some of the three hundred families gave up and went home before he got back.",
        kindOptions: [
          { id: "terms", label: "Won the permission" },
          { id: "people", label: "Chose the settlers" },
          { id: "order", label: "Set how it ran" },
        ],
        ledgerLine: "Austin — a year in a waiting room, so everyone else had a floor to stand on.",
        vocabTerm: "empresario",
        vocabMeaning: "somebody given the right to bring settler families in, in return for land",
        realWorld:
          "He did it again in 1830, talking his colonists out of the worst of a new law that shut the border.",
        stretch: {
          q: "Is this the same kind of work?",
          options: [
            {
              text: "Somebody spends a year getting a paper signed before one brick is laid.",
              ok: true,
              why: "Yes. Nothing is built and nobody is picked. Somebody is making it legal to start at all.",
            },
            {
              text: "Somebody draws where the streets will go.",
              ok: false,
              why: "That is deciding what the place will be. This job is about being allowed to have a place.",
            },
          ],
        },
        nextLabel: "Next decision →",
      },
      {
        id: "d2",
        personName: "Stephen F. Austin",
        personBlurb: "The same man, three years on, with three hundred families on the ground.",
        tag: "Decision two",
        imageKey: "beatRules",
        situation:
          "The families are on the land. The nearest court is a week's ride away, and its paperwork is in a language most of them cannot read. Two men claim the same bend of the Brazos, and one has already built on it.",
        decisionPrompt: "You are Austin again. What do you do?",
        decisionOptions: [
          {
            text: "Send every quarrel to the Mexican courts and let them settle it.",
            response: "Béxar is a week each way. Most quarrels would be settled with fists long before an answer rode back.",
          },
          {
            text: "Let each settlement work out its own way of doing things.",
            response: "That gives you three different answers to the same question inside one colony, and a fight at every boundary.",
          },
          {
            text: "Write a code yourself, and be the judge until somebody better turns up.",
            actual: true,
            response: "This is what he did — which made him the court, the land office and the law, in one man.",
          },
        ],
        whatHappened:
          "He wrote a civil and criminal code and ran it himself: holding court, registering who owned what, deciding who could stay.",
        consequence:
          "It worked, and it is much of why his colony grew when others failed. It also meant one man decided who got land, who was believed, and who was told to leave.",
        cost: "He made enemies who never forgave him, and the colony's law was whatever he thought it should be.",
        kindOptions: [
          { id: "terms", label: "Won the permission" },
          { id: "people", label: "Chose the settlers" },
          { id: "order", label: "Set how it ran" },
        ],
        ledgerLine: "Austin — wrote the colony's law, then was the colony's law.",
        vocabTerm: "a code",
        vocabMeaning: "a written set of decisions about how things will be settled, agreed before the arguing starts",
        realWorld:
          "He asked anybody wanting in for a letter about their character, and turned people away. Who a colony keeps out shapes it too.",
        stretch: {
          q: "Is this the same kind of work?",
          options: [
            {
              text: "Somebody writes down what happens when two neighbours claim one fence.",
              ok: true,
              why: "Yes — deciding in advance how a disagreement ends, so it does not have to be fought each time.",
            },
            {
              text: "Somebody rides to the capital to get a contract stamped.",
              ok: false,
              why: "That is getting permission from outside. This job is about what happens inside, afterwards.",
            },
          ],
        },
        nextLabel: "Next decision →",
      },
      {
        id: "d3",
        personName: "Martín De León",
        personBlurb: "Born 1765 in what is now Tamaulipas. A rancher who had been driving cattle in Texas for years.",
        tag: "Decision three",
        imageKey: "beatPeople",
        situation:
          "Nearly every empresario is bringing families out of the United States, because that is where the people wanting cheap land are. In April 1824 De León petitions for a colony of forty-one families on the lower Guadalupe.",
        decisionPrompt: "You are De León. Where do those forty-one families come from?",
        decisionOptions: [
          {
            text: "The United States, like everybody else. That is where the demand is.",
            response: "The easy route, and every other empresario took it. It also fills a Mexican frontier with people who have never been Mexican.",
          },
          {
            text: "Mexico. Bring families up from Tamaulipas and the towns you know.",
            actual: true,
            response: "This is what he did. His was the only colony in Texas that ended up mostly Mexican.",
          },
          {
            text: "Take anybody who turns up and sort it out later.",
            response: "That gives you a colony agreeing on nothing, and an empresario who cannot answer for a single one of them.",
          },
        ],
        whatHappened:
          "He brought families north from Tamaulipas and laid out a town — Nuestra Señora de Guadalupe de Jesús Victoria. It was the only empresario colony in Texas that was mostly Mexican.",
        consequence:
          "He died of cholera in 1833, leaving one of the largest estates in Texas — over half a million dollars.",
        cost: "It protected nobody. After independence his sons were arrested, the family was driven off its land, and years later came back to find most of it gone for good.",
        kindOptions: [
          { id: "terms", label: "Won the permission" },
          { id: "people", label: "Chose the settlers" },
          { id: "order", label: "Set how it ran" },
        ],
        ledgerLine: "De León — decided who the colony would be made of.",
        vocabTerm: "a colony",
        vocabMeaning: "a settlement started under somebody's contract, on land a government granted",
        realWorld:
          "The De León family backed Texas independence. It made no difference at all to what happened to them afterwards.",
        stretch: {
          q: "Is this the same kind of work?",
          options: [
            {
              text: "Somebody goes back to the towns they grew up in and asks who will come.",
              ok: true,
              why: "Yes. Nothing is being signed and nothing is being written down. Somebody is deciding who the place will be made of.",
            },
            {
              text: "Somebody counts how many families a valley could feed.",
              ok: false,
              why: "Useful, and it is finding something out rather than deciding anything. Different job again.",
            },
          ],
        },
      },
    ],
  },

  contributionSynthesis: {
    title: "Three kinds of work",
    sortTag: "Part 1 · Which kind is this?",
    sortPrompt: "Tap a job, then tap the kind of work it is.",
    columns: [
      { id: "terms", label: "Won the permission" },
      { id: "people", label: "Chose the settlers" },
      { id: "order", label: "Set how it ran" },
    ],
    sortItems: [
      { id: "waited", text: "He sat in a capital for a year until somebody signed." },
      { id: "fenceLaw", text: "She wrote down how a quarrel over a boundary would end." },
      { id: "wentHome", text: "He went back to the towns he knew and asked who would come." },
      { id: "stamped", text: "She got a contract stamped by a government that was new that year." },
      { id: "character", text: "He asked every applicant for a letter about their character." },
      { id: "porch", text: "He held court on his own porch, and his word was final." },
      { id: "turnedAway", text: "She turned away three families she thought would not last." },
    ],
    attributionTag: "Part 2 · What would be missing",
    attributions: [
      {
        id: "a1",
        q: "Suppose Austin had never gone south in 1822. What would the colony be missing?",
        options: [
          {
            text: "Any legal right to be there — every family farming on a paper the government need not honour.",
            ok: true,
            why: "Yes. The families would still have come. What they would not have is a title anybody has to respect.",
          },
          {
            text: "Anybody to settle quarrels between the families.",
            ok: false,
            why: "That came later, and from the same man. Two different jobs, three years apart.",
          },
          {
            text: "Nothing. Mexico wanted the farms, so it would all have happened anyway.",
            ok: false,
            why: "Mexico did want the farms. Wanting something is not the same as having agreed to it in writing, which is exactly what the year was for.",
          },
        ],
      },
      {
        id: "a2",
        q: "Suppose De León had brought families from the United States like everybody else. What would Texas be missing?",
        options: [
          {
            text: "The one colony that was mostly Mexican — and the people who founded Victoria.",
            ok: true,
            why: "Yes. Who a colony is made of is not a detail. It is the whole character of the place afterwards.",
          },
          {
            text: "Its southernmost town.",
            ok: false,
            why: "Somebody would very likely have founded a town on that river anyway. It is who lived in it that would differ.",
          },
          {
            text: "Nothing at all — families are families.",
            ok: false,
            why: "Think about what happened to the De León family after independence. It mattered a great deal who they were.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Take one kind away",
    removePrompt:
      "A new colony has somebody who won the permission and somebody who chose the families. Nobody does the third kind of work at all.",
    removeOne: {
      q: "What happens to that colony?",
      options: [
        { text: "Two families claim one bend of the river, and there is nobody whose answer counts." },
        { text: "Nobody is allowed to be there, and the whole thing is illegal from the start." },
        { text: "Nothing much. People sort themselves out.", isNoChange: true },
      ],
    },
    bigIdea:
      "Three kinds of work, and none of them does another's job. Permission without families is an empty grant. Families without permission are squatters. Both without a way to settle an argument is a colony that tears itself up inside five years.",
  },

  reasonSort: {
    title: "Seven jobs",
    kidPrompt: "Tap a job, then the kind of work it is.",
    helpWrong: "Not that one — read it again.",
    helpPass: "All seven filed. Not one said its answer out loud.",
    bins: [
      { id: "terms", label: "Won the permission", emoji: "📜", color: "#00C2C7" },
      { id: "people", label: "Chose the settlers", emoji: "🧭", color: "#7B5DFF" },
      { id: "order", label: "Set how it ran", emoji: "⚖️", color: "#FFC44D" },
    ],
    // Counts are uneven (2/3/2) so the last few cannot be got by elimination.
    items: [
      { id: "s_capital", text: "A year in a capital, waiting on one signature." },
      { id: "s_boundary", text: "Somebody writes down how a boundary quarrel ends." },
      { id: "s_notice", text: "A notice goes up two hundred miles off, asking families to come." },
      { id: "s_stamp", text: "A contract is stamped by a government that is new this year." },
      { id: "s_porch", text: "Court is held on a porch, and its word is final." },
      { id: "s_letter", text: "Every applicant must send a letter about their character." },
      { id: "s_south", text: "A man rides south to the towns he grew up in." },
    ],
  },

  opsChoice: {
    title: "A New Grant, 1826",
    pickHeader: "Pick exactly 2 to pay",
    constraint: "One grant, very little money. You can pay **two** people. All three are real jobs.",
    scenario: "A new valley, a new contract, and three people wanting the work. All three are right.",
    voices: [
      { id: "terms", who: "Inés, who knows the capital", emoji: "📜", said: "Skip me and you will build a town on a paper nobody has to honour. Ask Austin how long that takes to fix." },
      { id: "people", who: "Tobias, who has ridden it twice", emoji: "🧭", said: "Anybody can promise land. Getting a family to sell up and move four hundred miles takes someone they trust." },
      { id: "order", who: "Dolores, who has seen one fail", emoji: "⚖️", said: "I watched a colony come apart over one river bend. Nobody had said whose it was, and nobody could say." },
    ],
    projects: [
      {
        id: "send_capital",
        label: "Send Inés to get the contract confirmed",
        reason: "Won the permission",
        shortReasonLabel: "The paper",
        reasonId: "terms",
        sceneId: "capital",
        emoji: "📜",
        teks: true,
        improves: "Every family's title holds up the day somebody asks to see it.",
      },
      {
        id: "send_recruit",
        label: "Send Tobias to find the families",
        reason: "Chose the settlers",
        shortReasonLabel: "The families",
        reasonId: "people",
        sceneId: "recruit",
        emoji: "🧭",
        teks: true,
        improves: "The valley fills with people who came on purpose, not whoever drifted in.",
      },
      {
        id: "hire_order",
        label: "Pay Dolores to write the code before anyone arrives",
        reason: "Set how it ran",
        shortReasonLabel: "The code",
        reasonId: "order",
        sceneId: "order",
        emoji: "⚖️",
        teks: true,
        improves: "The first quarrel has an answer instead of a fight.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Without the paper none of it is ours",
      "Somebody has to bring the families",
      "The first argument will decide everything",
      "The third can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "terms", label: "The permission is still waiting" },
      { id: "people", label: "The families are still waiting" },
      { id: "order", label: "The code is still waiting" },
    ],
    deferredPrompt: "Which kind of work is still waiting?",
    fundMeterLabel: "Pay meter — fill 2 slots",
    waitingLabel: "Still waiting",
    consequenceTitle: "Who gets paid vs. who waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two paid. One waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real jobs here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right about what a colony needs. You could pay two, so somebody was always going to be right and still wait.",
    whoseWrong: "Read what each of them said again. Somebody described exactly this.",
  },

  transfer: {
    title: "Robertson's Box",
    kidPrompt: "A third empresario nobody taught you. Tap the **two** that show what most of his work was.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "A box holding two contracts, a recruiting handbill, a land register and a portrait",
    spots: [
      { id: "subcontract", label: "A subcontract, 1830, for two hundred families", x: 13, y: 60 },
      { id: "ownName", label: "A contract in his own name, won four years later", x: 34, y: 54 },
      { id: "handbill", label: "A handbill he carried through Tennessee and Kentucky", x: 55, y: 62 },
      { id: "register", label: "A register of which family got which piece of land", x: 77, y: 56 },
      { id: "portrait", label: "A portrait painted of him long afterwards", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "Most of Robertson's work was…",
    claimOptions: [
      { id: "terms", label: "winning the permission" },
      { id: "people", label: "choosing the settlers" },
      { id: "order", label: "setting how it ran" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three decisions" },
      { id: "together", label: "Three kinds of work" },
      { id: "sort", label: "Seven jobs filed" },
      { id: "newtown", label: "Robertson's box" },
    ],
    // Distractors are mistakes fourth graders actually make: that an empresario
    // must have been rich or in charge, that "colony" means the same thing as
    // "town", and that a family who backed the winning side ended up fine.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What did Austin and De León both do?",
        choices: [
          { id: "a", text: "Brought families onto land a government granted." },
          { id: "b", text: "Fought as generals in the Texas Revolution." },
          { id: "c", text: "Were elected to run the government of Texas." },
          { id: "d", text: "Founded a colony of families brought from Tennessee." },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A woman spends two years getting one contract stamped. Which kind of work is that?",
        choices: [
          { id: "a", text: "Winning the permission." },
          { id: "b", text: "Choosing who the settlers would be." },
          { id: "c", text: "Setting how the place would run." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "What made De León's colony different from every other colony in Texas?",
        choices: [
          { id: "a", text: "It was made up mostly of Mexican families." },
          { id: "b", text: "It was the only one that was ever granted land." },
          { id: "c", text: "It was the only one with a town in it at all." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "The De León family backed Texas independence and won. What happened to them afterwards?",
        choices: [
          { id: "a", text: "They were driven off their land anyway." },
          { id: "b", text: "They were rewarded with more land than before." },
          { id: "c", text: "Nothing changed for them at all, either way." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Whether Austin should have been the colony's law as
        // well as its lawmaker is a live argument and it goes to the teacher.
        prompt: "Austin wrote the colony's code, held its court, and decided who could stay — all three at once.",
        keepFrame: "I think that was ______, because ______.",
        keepOptions: [
          { id: "necessary", label: "necessary" },
          { id: "toomuch", label: "too much for one man" },
        ],
        becauseOptions: [
          { id: "necessary", label: "there was nobody else within a week's ride to do it" },
          { id: "toomuch", label: "the person who writes the law should not also be the judge" },
          { id: "none", label: "it makes no difference who decides anything" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: The Year He Waited. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will split on Austin holding all three jobs at once, and the split is the lesson — it is the same argument that produced three branches of government.",
    },
  },
};
