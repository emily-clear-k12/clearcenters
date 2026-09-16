// Briefing SS-5-13A-V3-BR — Who Sends Who Home — PUBLIC pack, comparison (Type 2) shape.
// Answer keys live only in SS-5-13A-V3-BR.server.js — never import that here.
//
// Grade 5 · TEKS 5.13A. `teksText` below is verbatim 19 TAC §113.16,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): twoTables, beatRules, beatMoney, beatSendHome
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-5-13A-V3-BR",
  title: "Who Sends Who Home",
  tagline: "Two systems of government, in one colony, in one room, for a hundred and fifty years.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssComparison",
  grade: 5,
  teks: "5.13A",
  teksText:
    "Compare the systems of government of early European colonists, including representative government and monarchy.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can compare a government chosen by the people with one appointed by a king, and say what actually made them different.",
  successCriteria:
    "Predicts what an appointed governor does that an elected assembly does not, and names why; sorts what the two shared from what only one had; explains what a yearly vote on somebody's salary is worth; reads a colony nobody taught them from its records.",

  art: {
    twoTables: "/briefings/ss-5-13a-v3-br/01-two-tables.png",
    beatRules: "/briefings/ss-5-13a-v3-br/02-jamestown-1619.png",
    beatMoney: "/briefings/ss-5-13a-v3-br/03-the-salary-line.png",
    beatSendHome: "/briefings/ss-5-13a-v3-br/04-raleigh-tavern.png",
  },

  phases: ["openingFrame", "sideBySide", "contrastSynthesis", "reasonSort", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: when Dunmore sent the burgesses home in 1774 they walked about a hundred yards up the street and kept meeting. HQ has never found a record of anyone trying to stop them.",
    },
  },

  samLines: {
    openingFrame: "Two systems of government. One colony. Same room.",
    sideBySide: "You will meet the assembly first. Then guess what the governor does.",
    contrastSynthesis: "What they shared, what they did not, and what made the difference.",
    reasonSort: "Seven records. None of them say their answer out loud.",
    opsChoice: "An assembly in 1750. Three fights, and strength for two.",
    transfer: "A third colony's records. Nobody has read them.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    sideBySide: "Guess before you find out. Guessing wrong is how this one works.",
    contrastSynthesis: "Watch for the ones that belong to both.",
    reasonSort: "Read the whole record before you tap.",
    opsChoice: "All three are real fights. You can only win two.",
    transfer: "Every answer has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Two Tables",
    setup:
      "In 1619 a colony on a river in Virginia did something no English colony had done: it let the colonists elect men to make law. It also had a governor sent from across an ocean. Both were still there in 1774.",
    isItPrompt: "If a place has an elected assembly, is it governed by its people?",
    // No marked answer. All three are defensible and the traits step settles it.
    isItOptions: [
      {
        id: "yes",
        text: "Yes — that is what an assembly is for.",
        response: "It is what it is for. Whether it is what it does depends on what the assembly is allowed to finish.",
      },
      {
        id: "depends",
        text: "Only if the assembly can actually decide things.",
        response: "That is the line HQ draws too, and the next twenty minutes are about exactly where it sits.",
      },
      {
        id: "who",
        text: "Depends who gets to be one of 'its people'.",
        response: "The sharpest answer of the three, and the one this briefing comes back to at the end.",
      },
    ],
    traitsPrompt: "So what tells you who is really in charge of a place? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "Who can end the meeting and send everybody home.", isTrait: true },
      {
        text: "Who has the grandest title.",
        isTrait: false,
        why: "Titles are cheap and they were handed out by the dozen. Plenty of grand-sounding colonial offices could not decide anything.",
      },
      { text: "Who decides what the person in charge gets paid.", isTrait: true },
      {
        text: "Who has been there longest.",
        isTrait: false,
        why: "Governors came and went every few years. The assemblies outlasted all of them and still could not always win.",
      },
    ],
    traitsReveal:
      "That is it. **Representative government** means people choosing some of their own to decide for everybody. A **monarchy** means authority coming down from a ruler instead of up from the ruled. A colony could have both at once, and Virginia did.",
    predictSetup:
      "Coming up: three jobs that both of them had a claim on, in the same colony, at the same time.",
    predictPrompt: "How do you think those two got along?",
    predictOptions: [
      { id: "twoSystems", label: "Two systems arguing in one room for a century and a half", hint: "Neither one ever quite won" },
      { id: "oneWins", label: "One of them replaced the other early on", hint: "These things usually settle" },
      { id: "sameThing", label: "Two names for what was really one government", hint: "It all came from the same place in the end" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying. You will work it out by the third round. Keep your guess.",
  },

  sideBySide: {
    homeName: "the House of Burgesses",
    awayName: "the King's governor",
    resolvesPredictionTo: "twoSystems",
    ledgerTitle: "Same job, two claims on it",
    ledgerEmpty: "Nothing yet — you will fill this in one job at a time.",
    predictionRight:
      "You had it. **Two systems arguing in one room**, for a hundred and fifty years, with neither one ever finishing the argument.",
    predictionWrong:
      "You guessed **{GUESS}**. It was **two systems arguing in one room** — both real, both there the whole time, neither able to get rid of the other.",
    finalLabel: "So — how did those two get along?",
    rounds: [
      {
        id: "r1",
        needId: "rules",
        needLabel: "Making the law",
        tag: "Job one",
        imageKey: "beatRules",
        homeLead: "Start at home.",
        homeWay:
          "From 1619 the men of Virginia elected burgesses, who met at Jamestown and made law for the colony. The Virginia Company offered them a say because it needed settlers badly, and a say was cheaper than wages.",
        awaySetup: "A royal colony's governor is picked in London.",
        predictPrompt: "So who makes the law there?",
        predictOptions: [
          {
            text: "The same — men elected by the colonists.",
            whatIf:
              "Most royal colonies did have an elected assembly. What they did not have was an assembly that could finish anything without the man London sent.",
          },
          { text: "The governor, with a council he did not elect.", best: true },
          {
            text: "The King, writing them himself.",
            whatIf:
              "He had an empire to run and never saw most of it. Kings appoint people. They do not draft local road rules.",
          },
        ],
        awayWay:
          "He arrives with instructions from London and a council he did not choose. An assembly may meet, propose and argue — and he may refuse all of it.",
        whyPrompt: "Why did Virginia get burgesses at all?",
        whyOptions: [
          { id: "founder", text: "Who set it up, and what they were short of." },
          { id: "purse", text: "Who controls the money." },
          { id: "source", text: "Whose authority the man in charge holds." },
        ],
        ledgerLine: "Making the law — elected men, or a man sent three thousand miles.",
        vocabTerm: "representative government",
        vocabMeaning: "a system where people choose some of their own to decide for everybody",
        realWorld:
          "The House of Burgesses first met in the summer of 1619 — twenty-two men at Jamestown, the first elected assembly in English America.",
        stretch: {
          q: "Would this count as the same thing?",
          options: [
            {
              text: "A company town lets the workers elect a council so people will come and stay.",
              ok: true,
              why: "Yes — and for the same reason. A say is what you offer when you need people more than they need you.",
            },
            {
              text: "A company town appoints a manager who is very fair.",
              ok: false,
              why: "Fairness is lovely and it is not the same thing. Nobody chose him, and nobody can unchoose him.",
            },
          ],
        },
        nextLabel: "Next job →",
      },
      {
        id: "r2",
        needId: "money",
        needLabel: "Paying for it",
        tag: "Job two",
        imageKey: "beatMoney",
        homeLead: "Home first, again.",
        homeWay:
          "The burgesses had been setting the tax rate since the 1600s, and they approved every claim against the colony. Including what the man in charge took home each year.",
        awaySetup: "London would far rather its governors were paid from London.",
        predictPrompt: "Why would that change anything?",
        predictOptions: [
          {
            text: "It would not. A wage is a wage.",
            whatIf:
              "Ask who can stop it. That is the whole difference, and colonists fought about it for a century.",
          },
          { text: "A governor paid from overseas stops needing the assembly to agree with him.", best: true },
          {
            text: "The colony would keep more of its taxes.",
            whatIf: "A little, perhaps. That is arithmetic, and the argument was never about the arithmetic.",
          },
        ],
        awayWay:
          "Where an assembly voted the salary every year, a governor negotiated. Where London paid it, he did not have to.",
        whyPrompt: "Why did that one difference matter so much?",
        whyOptions: [
          { id: "founder", text: "Who set it up, and what they were short of." },
          { id: "purse", text: "Who controls the money." },
          { id: "source", text: "Whose authority the man in charge holds." },
        ],
        ledgerLine: "Paying for it — a vote every year, or a cheque from overseas.",
        vocabTerm: "a salary",
        vocabMeaning: "regular pay for a job, and whoever decides it has a hold on whoever receives it",
        realWorld:
          "Colonial assemblies fought the Crown over fixed salaries for their governors for the better part of a century, and mostly won.",
        stretch: {
          q: "Would this count as the same thing?",
          options: [
            {
              text: "A club where the members vote every year on what to pay the secretary.",
              ok: true,
              why: "Yes. Small, and exactly the same lever — the secretary listens in a way she would not if somebody else paid her.",
            },
            {
              text: "A club that votes every year on what colour to paint the door.",
              ok: false,
              why: "A real vote about nothing much. The lever here is not voting; it is voting on somebody's living.",
            },
          ],
        },
        nextLabel: "Next job →",
      },
      {
        id: "r3",
        needId: "disagree",
        needLabel: "When they fall out",
        tag: "Job three",
        imageKey: "beatSendHome",
        homeLead: "Last one. Home first.",
        homeWay:
          "When the burgesses fell out with the governor they argued, delayed, and voted. Sometimes for years.",
        awaySetup: "His commission came from the King, not from Virginia.",
        predictPrompt: "So what could he do about an assembly he disliked?",
        predictOptions: [
          {
            text: "Nothing. They were elected.",
            whatIf:
              "Elected by Virginians — who had not appointed him and could not remove him either. Being elected protects you from voters, not from him.",
          },
          { text: "End the session and send them all home.", best: true },
          {
            text: "Have them arrested.",
            whatIf:
              "That needs an army he did not have, and it would have turned every one of them into a hero by Thursday.",
          },
        ],
        awayWay:
          "In 1774 Lord Dunmore dissolved the House of Burgesses for taking Boston's side. The burgesses walked up the street to the Raleigh Tavern and carried on meeting.",
        whyPrompt: "Why could he do that and they could not do it back?",
        whyOptions: [
          { id: "founder", text: "Who set it up, and what they were short of." },
          { id: "purse", text: "Who controls the money." },
          { id: "source", text: "Whose authority the man in charge holds." },
        ],
        ledgerLine: "When they fall out — one of them can send the other home.",
        vocabTerm: "dissolve",
        vocabMeaning: "to end a meeting of lawmakers and send them away",
        realWorld:
          "They reassembled on their own and called it a Convention. Within two years it was writing a state constitution.",
        stretch: {
          q: "Would this count as the same thing?",
          options: [
            {
              text: "A head teacher can close a student council, and the council cannot close the head teacher.",
              ok: true,
              why: "Yes, and it is the clearest small version of it. Whatever the council votes, one person holds the door.",
            },
            {
              text: "A student council votes down a proposal the head teacher liked.",
              ok: false,
              why: "That is the council using power it has. This round is about which of them can end the other.",
            },
          ],
        },
      },
    ],
  },

  contrastSynthesis: {
    title: "Put the two side by side",
    sortTag: "Part 1 · What they shared",
    sortPrompt: "Tap each one, then tap where it belongs. Some belong to both.",
    columns: [
      { id: "home", label: "Only the burgesses" },
      { id: "both", label: "Both" },
      { id: "away", label: "Only the governor" },
    ],
    sortItems: [
      { id: "chosen", text: "Chosen by the people it governed" },
      { id: "london", text: "Picked three thousand miles away" },
      { id: "tax", text: "Could decide what people had to hand over" },
      { id: "law", text: "Could make rules everybody had to follow" },
      { id: "endit", text: "Could end the other one's meeting" },
      { id: "claims", text: "Said it was acting for the colony's good" },
      { id: "ownpay", text: "Voted on what the other one was paid" },
    ],
    causeTag: "Part 2 · What made the difference",
    causes: [
      {
        id: "cs1",
        q: "Virginia's colonists got to elect lawmakers in 1619. Why did a company hand that over?",
        options: [
          { text: "It needed people to come, and a say was cheaper than paying them.", ok: true, why: "Yes. It was not generosity, it was recruitment — and it worked." },
          { text: "The King ordered it.", ok: false, why: "The King had very little to do with it in 1619. A trading company did, and it was solving its own problem." },
          { text: "The colonists rebelled and took it.", ok: false, why: "That comes much later, and it is a different century. In 1619 it was offered." },
        ],
      },
      {
        id: "cs2",
        q: "Two governors, same powers on paper. One does what his assembly asks and one ignores it. What is different?",
        options: [
          { text: "One of them has to go back to that assembly for his pay.", ok: true, why: "That is it. The powers on paper were the same. What differed was who he needed next spring." },
          { text: "One colony is older than the other.", ok: false, why: "Nothing here says so, and age does not put a lever in anybody's hand." },
          { text: "One governor is simply a nicer man.", ok: false, why: "Maybe he is. A system that only works when the man is nice is not much of a system." },
        ],
      },
    ],
    changeTag: "Part 3 · Change one thing",
    changePrompt: "Suppose every royal governor had been paid out of the King's own treasury from the day he landed.",
    changeOne: {
      q: "Which difference between the two goes away?",
      options: [
        { text: "The assembly's hold over him — he would never need their vote again." },
        { text: "His power to end their session — he would have no reason to use it." },
        { text: "Nothing changes. Both would carry on exactly as they did.", isNoChange: true },
      ],
    },
    bigIdea:
      "Both of them made law, both taxed, and both said they were acting for the colony. What separated them was where each one's authority came from — and the only real lever the elected side ever had was that it voted on his living once a year.",
  },

  reasonSort: {
    title: "Seven records",
    kidPrompt: "Tap a record, then what explains it.",
    helpWrong: "Not that one — read it again.",
    helpPass: "All seven filed. Not one said its answer out loud.",
    bins: [
      { id: "founder", label: "Who set it up", emoji: "🪶", color: "#00C2C7" },
      { id: "purse", label: "Who controls the money", emoji: "💰", color: "#7B5DFF" },
      { id: "source", label: "Whose authority he holds", emoji: "👑", color: "#FFC44D" },
    ],
    // Counts are uneven (2/3/2) so the last few cannot be got by elimination.
    items: [
      { id: "s_recruit", text: "A pamphlet promising a vote to anybody who sails." },
      { id: "s_yearly", text: "A ledger line voted again every spring, never once made permanent." },
      { id: "s_seal", text: "A commission with a royal seal, naming a man nobody here has met." },
      { id: "s_charter", text: "A trading company's charter, written when nobody would sail." },
      { id: "s_withhold", text: "A refusal to approve the usual sum until the road bill passes." },
      { id: "s_proclaim", text: "A notice ending the session, signed by one man." },
      { id: "s_arrears", text: "Three years of unpaid claims, and a very cooperative official." },
    ],
  },

  opsChoice: {
    title: "The Assembly, 1750",
    pickHeader: "Pick exactly 2",
    constraint: "One session, only so much fight in it. The assembly can win **two**.",
    scenario: "Three members stand up with three different fights, and every one of them is right.",
    voices: [
      { id: "founder", who: "Mr Pell, who reads the old papers", emoji: "🪶", said: "Our terms were written down once and nobody has seen the paper in forty years. Get it copied before somebody decides what it said." },
      { id: "purse", who: "Mrs Dace, who keeps the accounts", emoji: "💰", said: "Vote his pay one year at a time and he will listen. Vote it for life and we may as well go home." },
      { id: "source", who: "Judge Anwyl", emoji: "👑", said: "A judge who can be dismissed the week he rules the wrong way is not a judge. He is an opinion with a wig on." },
    ],
    projects: [
      {
        id: "charter_copy",
        label: "Get the colony's terms filed where London cannot revise them",
        reason: "Who set it up",
        shortReasonLabel: "The terms",
        reasonId: "founder",
        sceneId: "charter",
        emoji: "🪶",
        teks: true,
        improves: "What was promised at the start stops depending on who remembers it.",
      },
      {
        id: "yearly_pay",
        label: "Keep voting the governor's pay one year at a time",
        reason: "Who controls the money",
        shortReasonLabel: "The purse",
        reasonId: "purse",
        sceneId: "pay",
        emoji: "💰",
        teks: true,
        improves: "He has a reason to answer the assembly every single spring.",
      },
      {
        id: "judges_tenure",
        label: "Demand judges hold office on good behaviour, not at the governor's pleasure",
        reason: "Whose authority",
        shortReasonLabel: "The courts",
        reasonId: "source",
        sceneId: "courts",
        emoji: "👑",
        teks: true,
        improves: "A ruling stops depending on whether the governor liked it.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Somebody has to hold the paper",
      "The yearly vote is the only lever we have",
      "A court that can be dismissed is not a court",
      "The third can wait a session",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "founder", label: "The terms are still waiting" },
      { id: "purse", label: "The yearly vote is still waiting" },
      { id: "source", label: "The courts are still waiting" },
    ],
    deferredPrompt: "Which fight is still waiting?",
    fundMeterLabel: "Session — fill 2 slots",
    waitingLabel: "Still waiting",
    consequenceTitle: "What gets fought vs. what waits",
    boardTitle: "THIS SESSION / NEXT",
    boardThisYearLabel: "THIS SESSION",
    boardNextYearLabel: "NEXT",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two won. One waits — and somebody stood up and warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right. Real assemblies fought all three of these, for decades, and did not win them all at once. Somebody was always going to be right and still wait.",
    whoseWrong: "Read what each of them said again. Somebody stood up and described exactly this.",
  },

  transfer: {
    title: "A Third Colony",
    kidPrompt: "Records nobody at HQ has read. Tap the **two** that show what shaped this government.",
    // ART NEEDED: runs as word chips until a scene exists. Note the colony is
    // deliberately unnamed — see flag 3 in the header.
    imageAlt: "A charter, a handbill, a salary ledger, a sealed commission, a cargo list",
    spots: [
      { id: "charter", label: "A charter from a company that badly needed people", x: 13, y: 60 },
      { id: "handbill", label: "A handbill offering land and a vote to anyone who sails", x: 34, y: 54 },
      { id: "ledger", label: "The assembly voting the governor's pay each spring", x: 55, y: 62 },
      { id: "seal", label: "A governor's commission under the royal seal", x: 77, y: 56 },
      { id: "cargo", label: "A list of barrels landed in 1698", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "What shaped this colony's government most was…",
    claimOptions: [
      { id: "founder", label: "who set it up, and what they were short of" },
      { id: "purse", label: "who controls the money" },
      { id: "source", label: "whose authority the man in charge holds" },
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
      { id: "sort", label: "Seven records filed" },
      { id: "newtown", label: "A third colony" },
    ],
    // Distractors are mistakes fifth graders actually make: that an elected
    // assembly means the people are in charge, that a king personally ran the
    // colonies, and that "representative government" in 1619 meant everybody.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "How did representative government and monarchy sit together in colonial Virginia?",
        choices: [
          { id: "a", text: "Both existed at once and argued for a century and a half." },
          { id: "b", text: "The assembly replaced the governor within a few years of 1619." },
          { id: "c", text: "The governor abolished the assembly and it never met again." },
          { id: "d", text: "They were two different names for exactly the same body of men." },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "An assembly votes its governor's pay every year. Why does that matter more than it sounds?",
        choices: [
          { id: "a", text: "He has to come back and ask next year." },
          { id: "b", text: "It keeps his wages lower than they would otherwise be." },
          { id: "c", text: "It means the assembly, not the King, appointed him." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "A governor ends the session and sends the lawmakers home. Where did the power to do that come from?",
        choices: [
          { id: "a", text: "From the King, who appointed him and could remove him." },
          { id: "b", text: "From the voters, who had elected him to the post." },
          { id: "c", text: "From the assembly, which had agreed he could do it." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Virginia's burgesses were elected. Who actually got to vote for them by 1670?",
        choices: [
          { id: "a", text: "Adult men who owned land." },
          { id: "b", text: "Every adult living in the colony." },
          { id: "c", text: "Only men appointed by the governor." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Which of the two systems the colonists were more loyal
        // to is a real argument and it goes to the teacher. Only whether the
        // sentence holds together is checked.
        prompt: "For a hundred and fifty years Virginians elected burgesses AND called themselves the King's loyal subjects. They did not think that was a contradiction.",
        keepFrame: "I think they were mostly ______, because ______.",
        keepOptions: [
          { id: "loyal", label: "loyal to the King" },
          { id: "ownrule", label: "used to running themselves" },
        ],
        becauseOptions: [
          { id: "loyal", label: "they kept saying so for a hundred and fifty years and meant it" },
          { id: "ownrule", label: "they had been making their own law since before their grandparents were born" },
          { id: "none", label: "it makes no difference what anybody thought they were" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Who Sends Who Home. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will split on whether the colonists were loyal subjects or already governing themselves, and both sides can point at a hundred and fifty years of evidence. That is the argument, not a failure to decide it.",
    },
  },
};
