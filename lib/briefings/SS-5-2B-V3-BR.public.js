// Briefing SS-5-2B-V3-BR — Three Ways to Start a Country — PUBLIC pack, people (Type 3) shape.
// Answer keys live only in SS-5-2B-V3-BR.server.js — never import that here.
//
// Grade 5 · TEKS 5.2B. `teksText` below is verbatim 19 TAC §113.16,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): thirteen, beatLine, beatHands, beatWords
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-5-2B-V3-BR",
  title: "Three Ways to Start a Country",
  tagline: "One defended the soldiers everybody hated. One threw the cargo in the sea. One wrote a sentence that outran him.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssPeople",
  grade: 5,
  teks: "5.2B",
  teksText:
    "Identify the Founding Fathers and Patriot heroes, including John Adams, Benjamin Franklin, Thomas Jefferson, the Sons of Liberty, and George Washington, and their motivations and contributions during the revolutionary period.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can name what the Founding Fathers and Patriot heroes actually did, say what kind of contribution each one was, and explain what it cost.",
  successCriteria:
    "Names Adams, Franklin, Jefferson, the Sons of Liberty and Washington and what each contributed; sorts contributions into making the argument, holding to a principle, and acting in a crowd; explains what would be missing without one of them; reads a sixth person's work from what she left behind.",

  // The spine. Naming these is the graded step; removing one is the synthesis.
  kinds: [
    { id: "words", label: "Made the argument", blurb: "Put the case into language other people could pick up and use." },
    { id: "line", label: "Held to a principle", blurb: "Stood on a rule at a moment when standing on it cost something." },
    { id: "hands", label: "Acted in a crowd", blurb: "Did together what none of them could have done alone." },
  ],

  art: {
    thirteen: "/briefings/ss-5-2b-v3-br/01-thirteen-desks.png",
    beatLine: "/briefings/ss-5-2b-v3-br/02-courtroom-1770.png",
    beatHands: "/briefings/ss-5-2b-v3-br/03-meeting-house-night.png",
    beatWords: "/briefings/ss-5-2b-v3-br/04-blank-sheet.png",
  },

  phases: ["openingFrame", "theDecision", "contributionSynthesis", "trueFalseReason", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: Adams kept a diary for most of his life and complained in it constantly about not being appreciated. He was right, and it did not make him any easier to be around.",
    },
  },

  samLines: {
    openingFrame: "Five people. Three completely different jobs. One country.",
    theDecision: "You decide first. Then you find out what they actually did.",
    contributionSynthesis: "Three kinds of contribution — and what is missing without one.",
    trueFalseReason: "Five claims. The reason matters more than the answer.",
    opsChoice: "A committee in 1775. Three jobs, money for two.",
    transfer: "A woman you have never heard of, and a box of what she left.",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    theDecision: "Nothing is marked right when you choose. Decide anyway.",
    contributionSynthesis: "Take one kind away and see what falls over.",
    trueFalseReason: "Two of these five are false. Read carefully.",
    opsChoice: "All three are real jobs. You can only fund two.",
    transfer: "Every kind has one proof. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Thirteen Desks",
    setup:
      "Starting a country is not one job. Somebody has to say why, somebody has to hold the line while it is being said, and somebody has to actually do something in the street.",
    isItPrompt: "Which of those three do you think history remembers best?",
    // No marked answer. All three are defensible; the traits step settles it.
    isItOptions: [
      {
        id: "sayers",
        text: "The people who said why.",
        response: "Usually, yes — words survive and get quoted. Whether surviving is the same as mattering is what this briefing is about.",
      },
      {
        id: "doers",
        text: "The people who did something.",
        response: "They get the paintings. They also tend to get remembered as a crowd rather than as anybody in particular.",
      },
      {
        id: "neither",
        text: "Neither — history remembers whoever won.",
        response: "A cold answer and not a stupid one. Hold onto it; one of these three lost badly at the time.",
      },
    ],
    traitsPrompt: "So what makes somebody count as having helped start a country? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "What they did was still working after they had gone.", isTrait: true },
      {
        text: "They were famous while it was happening.",
        isTrait: false,
        why: "Two of the five people in this briefing were barely known outside their own colony in 1770, and one of them is not a person at all.",
      },
      { text: "Other people could use what they did.", isTrait: true },
      {
        text: "They were on the winning side.",
        isTrait: false,
        why: "Everybody in this briefing was, which makes it useless for telling them apart. Plenty of people on the winning side contributed nothing.",
      },
    ],
    traitsReveal:
      "That is it. A **contribution** is something that outlasts the person and that other people can pick up and use. It comes in three kinds here: somebody **makes the argument**, somebody **holds to a principle**, and somebody **acts in a crowd**.",
    predictSetup:
      "Coming up: a lawyer nobody wanted to be, a night in a harbour, and a blank sheet of paper in June.",
    predictPrompt: "Which of the three do you think turned out to matter most?",
    predictOptions: [
      { id: "words", label: "Making the argument", hint: "Somebody has to say what it is for" },
      { id: "line", label: "Holding to a principle", hint: "Especially when it costs" },
      { id: "hands", label: "Acting in a crowd", hint: "At some point somebody has to move" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying — and HQ does not think there is a right answer. Keep your guess.",
  },

  theDecision: {
    ledgerTitle: "Three kinds of contribution",
    ledgerEmpty: "Nothing yet — you will fill this in one decision at a time.",
    namePrompt: "So what kind of contribution was that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it — or rather, you picked one, and so does everybody. **Making the argument** is the one usually quoted, and the other two are the reason there was anything to quote.",
    predictionWrong:
      "You guessed **{GUESS}**. HQ's honest answer is that there is no answer: the words needed somebody holding the line behind them, and both needed somebody who would actually move.",
    finalLabel: "So — which mattered most?",
    rounds: [
      {
        id: "d1",
        personName: "John Adams",
        personBlurb: "Thirty-four, a lawyer, with a practice built entirely on being liked in Boston.",
        tag: "Decision one",
        imageKey: "beatLine",
        situation:
          "Five men are dead outside the Custom House. Eight British soldiers and their captain are in jail, and every lawyer in Boston has said no. The day after, a loyalist merchant knocks on Adams's door.",
        decisionPrompt: "You are Adams. What do you do?",
        // NO option is marked best. This phase has no right answer by design.
        decisionOptions: [
          {
            text: "Take the case. Nobody in a free country should be tried without a lawyer.",
            actual: true,
            response: "This is what he did, the same day he was asked.",
          },
          {
            text: "Turn it down. Somebody else will take it eventually.",
            response: "Every other lawyer in Boston had already said exactly that. That is why the merchant was at his door.",
          },
          {
            text: "Take it, but make sure everyone knows you were pushed into it.",
            response: "It might have saved his practice. A defence nobody believes in is not much of a defence.",
          },
        ],
        whatHappened:
          "He took it. Captain Preston was tried in October 1770 and acquitted. In November six soldiers were acquitted and two convicted of manslaughter — branded on the thumb instead of hanged.",
        consequence:
          "He argued that a furious town is not evidence, and that law does not bend to what people want this week. He won, in the town that wanted him to lose.",
        cost: "He took the most hated case in Boston at thirty-four, expecting it to end the practice he had spent ten years building.",
        kindOptions: [
          { id: "words", label: "He made the argument" },
          { id: "line", label: "He held to a principle" },
          { id: "hands", label: "He acted in a crowd" },
        ],
        ledgerLine: "Adams — defended the men the whole town wanted convicted.",
        vocabTerm: "the right to counsel",
        vocabMeaning: "the rule that anybody accused gets a lawyer, however certain everybody is that they did it",
        realWorld:
          "Sixteen years later Adams wrote that the Massacre laid the foundation of American independence. He meant the trial as much as the shooting.",
        stretch: {
          q: "Is this the same kind of contribution?",
          options: [
            {
              text: "A referee gives a decision against her own town's team because it was the correct one.",
              ok: true,
              why: "Yes — small, and the same shape. A rule does not bend because of who is watching.",
            },
            {
              text: "A referee gives a decision that turns out to be correct.",
              ok: false,
              why: "Being right is not the same as holding to something. This kind only counts when it costs.",
            },
          ],
        },
        nextLabel: "Next decision →",
      },
      {
        id: "d2",
        personName: "the Sons of Liberty",
        personBlurb: "Not a person. A few hundred tradesmen, printers, sailors and shopkeepers with a name.",
        tag: "Decision two",
        imageKey: "beatHands",
        situation:
          "Three ships of tea sit in Boston harbour. If the tea lands, the tax is paid. If the ships sail unloaded, the law is broken. The governor will not let them sail, and the deadline is midnight.",
        decisionPrompt: "You are in the Old South Meeting House as it runs out. What do you do?",
        decisionOptions: [
          {
            text: "Let it land and refuse to buy a leaf of it.",
            response: "It worked in other ports, which turned the ships around. Boston's governor had sons in the tea business.",
          },
          {
            text: "Destroy the tea, and nothing else.",
            actual: true,
            response: "This is what they did. Three hundred and forty-two chests, and by most accounts nothing else touched.",
          },
          {
            text: "Seize the ships and sell the tea to pay for what comes next.",
            response: "Then it is robbery, and every newspaper in London gets to say so. The whole point was that it was not.",
          },
        ],
        whatHappened:
          "Three hundred and forty-two chests of East India Company tea went into the harbour, on 16 December 1773.",
        consequence:
          "Parliament closed the port of Boston. Colonies that had spent a decade arguing started sending food instead.",
        cost: "The port closed, and it was Boston's dockworkers and their families who went without — not the men who had voted for it.",
        kindOptions: [
          { id: "words", label: "They made the argument" },
          { id: "line", label: "They held to a principle" },
          { id: "hands", label: "They acted in a crowd" },
        ],
        ledgerLine: "The Sons of Liberty — did in one night what no one of them could have done.",
        vocabTerm: "collective action",
        vocabMeaning: "something a group can do that no single member of it could manage alone",
        realWorld:
          "Nobody was ever convicted. Several hundred people knew who was there and not one said so under oath.",
        stretch: {
          q: "Is this the same kind of contribution?",
          options: [
            {
              text: "Every shop on a street agrees on the same day to stop selling one company's goods.",
              ok: true,
              why: "Yes. One shop doing it is a gesture. Every shop at once is something else.",
            },
            {
              text: "One shopkeeper refuses to stock something he disapproves of.",
              ok: false,
              why: "Admirable — but that is a principle being held, not a crowd acting.",
            },
          ],
        },
        nextLabel: "Next decision →",
      },
      {
        id: "d3",
        personName: "Thomas Jefferson",
        personBlurb: "Thirty-three, from Virginia, picked because he wrote well and said little.",
        tag: "Decision three",
        imageKey: "beatWords",
        situation:
          "Congress has asked him to write down why thirteen colonies are leaving. Everybody expects a complaint about a king — a list of what he did wrong, for people who already agree.",
        decisionPrompt: "You are Jefferson, with a blank sheet and a fortnight. What do you write?",
        decisionOptions: [
          {
            text: "The list. It is what Congress asked for and it is what will hold up in London.",
            response: "It would have done the job, and been unquotable four years later, let alone eighty.",
          },
          {
            text: "An appeal to the King's better nature.",
            response: "They sent one the year before. It was never answered, which is why everyone is in this room.",
          },
          {
            text: "Start with a claim about all people everywhere, then put the list underneath it.",
            actual: true,
            response: "This is what he did — and it is why the thing is still being read.",
          },
        ],
        whatHappened:
          "He opened with a claim about everybody, not a complaint about one king, and hung the list of offences beneath it.",
        consequence:
          "It was read aloud in town squares that summer, and quoted ever since by people it was plainly not written for.",
        cost: "Jefferson enslaved people his whole life, including while he wrote it. The sentence was used against him and against the country he helped make, and it worked.",
        kindOptions: [
          { id: "words", label: "He made the argument" },
          { id: "line", label: "He held to a principle" },
          { id: "hands", label: "He acted in a crowd" },
        ],
        ledgerLine: "Jefferson — wrote a sentence that turned out to be bigger than he was.",
        vocabTerm: "a principle",
        vocabMeaning: "a rule stated so generally that it covers cases its author never thought about",
        realWorld:
          "In 1852 Frederick Douglass stood up in Rochester and asked what the Fourth of July meant to a slave. He quoted the Declaration back at the room.",
        stretch: {
          q: "Is this the same kind of contribution?",
          options: [
            {
              text: "Somebody writes a club's rule as 'everyone gets a turn' instead of naming the six members.",
              ok: true,
              why: "Yes — and the seventh member who joins next year can use it. That is what general wording buys.",
            },
            {
              text: "Somebody writes down the club's six members in alphabetical order.",
              ok: false,
              why: "Useful and accurate. Nobody outside that list can ever use it, which is the difference.",
            },
          ],
        },
      },
    ],
  },

  contributionSynthesis: {
    title: "Three kinds of contribution",
    sortTag: "Part 1 · Which kind is this?",
    sortPrompt: "Tap a contribution, then tap the kind it is.",
    columns: [
      { id: "words", label: "Made the argument" },
      { id: "line", label: "Held to a principle" },
      { id: "hands", label: "Acted in a crowd" },
    ],
    sortItems: [
      { id: "si_blank", text: "Turned a list of complaints into a claim about everybody." },
      { id: "si_hated", text: "Defended in court the men his own town wanted hanged." },
      { id: "si_night", text: "Several hundred people did one thing in one night and none of them talked." },
      { id: "si_paris", text: "Spent the war in another country persuading it to pay for ours." },
      { id: "si_spectacles", text: "Talked his own officers out of marching on the government they had just won." },
      { id: "si_pamphlet", text: "Put the case into forty-seven pages any farmer could read." },
      { id: "si_nonimport", text: "Every shop in a town stopped selling the same goods on the same day." },
    ],
    attributionTag: "Part 2 · What would be missing",
    // This is where Franklin and Washington live. See the coverage note in the
    // header — they are not decision rounds, and this is a real thinking task
    // rather than a consolation slot.
    attributions: [
      {
        id: "a1",
        q: "Benjamin Franklin spent the war in Paris rather than America. Suppose he had stayed home. What is missing?",
        options: [
          {
            text: "France — its money, its fleet and its troops, which is most of how Yorktown was won.",
            ok: true,
            why: "Yes. The most useful thing anybody did for the war was done three thousand miles from it, at dinner parties.",
          },
          {
            text: "The Declaration would never have been written.",
            ok: false,
            why: "Somebody else wrote that, and you met him a moment ago. Franklin's contribution was made in another language.",
          },
          {
            text: "Nothing much — France would have joined in anyway.",
            ok: false,
            why: "France had its own reasons to want Britain weakened, and it still took two years of one man's work to turn that into ships.",
          },
        ],
      },
      {
        id: "a2",
        q: "In 1783 Washington's officers were owed years of pay and were talking about marching on Congress. Suppose he had agreed with them. What is missing?",
        options: [
          {
            text: "The habit of an army answering to the government instead of the other way round.",
            ok: true,
            why: "Exactly. It is the least visible contribution in this briefing and quite possibly the largest — it is the thing that did not happen.",
          },
          {
            text: "The army would have lost the war.",
            ok: false,
            why: "The fighting was effectively over by 1783. That is precisely what made the moment dangerous.",
          },
          {
            text: "Nothing — Congress would have paid them in the end regardless.",
            ok: false,
            why: "Perhaps. The question is not whether they got paid, it is what a country learns the first time its army marches on its own government.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Take one kind away",
    removePrompt:
      "A new country has people who made the argument and people who acted in a crowd. Nobody holds to a principle when it costs them.",
    removeOne: {
      q: "What happens to that country?",
      options: [
        { text: "It gets the words and the crowd, and the first time the words are inconvenient nobody defends them." },
        { text: "Nobody ever writes anything down and there is no case to make." },
        { text: "Nothing much. Two out of three is plenty.", isNoChange: true },
      ],
    },
    bigIdea:
      "Five people, three kinds of contribution, and none of them doing another's job. Words nobody will defend are decoration. A crowd with nothing to say is a riot. And a principle nobody ever stated is just one person being stubborn.",
  },

  trueFalseReason: {
    title: "Five claims",
    kidPrompt: "True or false. The reason underneath matters more than the answer.",
    statements: [
      { id: "t_adams", text: "John Adams defended the British soldiers because he believed they were innocent." },
      { id: "t_tea", text: "The Sons of Liberty took the tea and sold it to pay for what came next." },
      { id: "t_franklin", text: "Benjamin Franklin spent most of the war in America." },
      { id: "t_washington", text: "In 1783 Washington's own officers talked about marching on Congress." },
      { id: "t_jefferson", text: "Jefferson wrote that all men are created equal and enslaved people at the same time." },
    ],
  },

  opsChoice: {
    title: "Committee of Correspondence, 1775",
    pickHeader: "Pick exactly 2",
    constraint: "One committee, very little money. It can fund **two**. All three are real.",
    scenario: "Three people come to the committee with three different jobs, and all three are right.",
    voices: [
      { id: "words", who: "Rhoda, who owns a press", emoji: "🖋️", said: "Nobody outside this room knows why we are doing any of it. Give me paper and I will put it in every colony." },
      { id: "line", who: "Mr Teale, an attorney", emoji: "⚖️", said: "We have men in gaol and no counsel for them. Hang people without lawyers and we are the thing we oppose." },
      { id: "hands", who: "Bett, who keeps a shop", emoji: "🤝", said: "Talk is free. Get every shop on this coast to stop selling the same goods on the same day and London will feel it by Christmas." },
    ],
    projects: [
      {
        id: "the_press",
        label: "Pay a printer to put the case into every colony's hands",
        reason: "Making the argument",
        shortReasonLabel: "The press",
        reasonId: "words",
        sceneId: "press",
        emoji: "🖋️",
        teks: true,
        improves: "People five hundred miles away find out why any of this is happening.",
      },
      {
        id: "the_counsel",
        label: "Pay for counsel for anyone arrested, loyalist or not",
        reason: "Holding to a principle",
        shortReasonLabel: "The counsel",
        reasonId: "line",
        sceneId: "counsel",
        emoji: "⚖️",
        teks: true,
        improves: "Nobody is tried without a lawyer, including people we cannot stand.",
      },
      {
        id: "the_boycott",
        label: "Organise every town on the coast to stop buying the same goods",
        reason: "Acting in a crowd",
        shortReasonLabel: "The boycott",
        reasonId: "hands",
        sceneId: "boycott",
        emoji: "🤝",
        teks: true,
        improves: "London feels it in its accounts rather than reading about it in a letter.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "Nobody knows why we are doing this",
      "We cannot be the thing we oppose",
      "They will only notice if it costs them",
      "The third can wait a season",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "words", label: "The press is still waiting" },
      { id: "line", label: "The counsel is still waiting" },
      { id: "hands", label: "The boycott is still waiting" },
    ],
    deferredPrompt: "Which job is still waiting?",
    fundMeterLabel: "Committee — fill 2 slots",
    waitingLabel: "Still waiting",
    consequenceTitle: "What gets funded vs. what waits",
    boardTitle: "THIS SEASON / NEXT",
    boardThisYearLabel: "THIS SEASON",
    boardNextYearLabel: "NEXT",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two funded. One waits — and somebody warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right. Real committees funded the press and the boycott far more often than the counsel, which is worth noticing about what is easy to fund and what is not.",
    whoseWrong: "Read what each of them said again. Somebody stood there and described exactly this.",
  },

  transfer: {
    title: "Mercy Otis Warren's Box",
    kidPrompt: "A sixth person nobody taught you. Tap the **two** that show what kind hers was.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "A box: an anonymous play, a three-volume history, a signed book, a shop list, a portrait",
    spots: [
      { id: "play", label: "A play from 1772 mocking the governor, unsigned", x: 13, y: 60 },
      { id: "history", label: "A three-volume history of the whole war, published 1805", x: 34, y: 54 },
      { id: "signed", label: "A book of poems from 1790, the first she put her own name on", x: 55, y: 62 },
      { id: "shoplist", label: "A list of families agreeing to stop buying British cloth", x: 77, y: 56 },
      { id: "portrait", label: "A portrait of her painted in her sixties", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "Mercy Otis Warren's contribution was mostly…",
    claimOptions: [
      { id: "words", label: "making the argument" },
      { id: "line", label: "holding to a principle" },
      { id: "hands", label: "acting in a crowd" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three decisions" },
      { id: "together", label: "Three kinds" },
      { id: "sort", label: "Five claims" },
      { id: "newtown", label: "Warren's box" },
    ],
    // Distractors are mistakes fifth graders actually make: that defending
    // somebody means believing them, that a Founding Father must have held
    // office, and that Franklin's years in Paris were a diplomatic sideshow.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "What did Adams, the Sons of Liberty and Jefferson have in common?",
        choices: [
          { id: "a", text: "Each made a different kind of contribution." },
          { id: "b", text: "Each held high office during the revolutionary period." },
          { id: "c", text: "Each of them fought as a soldier in the war itself." },
          { id: "d", text: "Each of them was present at the writing of the Declaration." },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Why did John Adams defend the British soldiers?",
        choices: [
          { id: "a", text: "He thought anybody accused deserves a lawyer." },
          { id: "b", text: "He was certain the soldiers had done nothing wrong at all." },
          { id: "c", text: "He was ordered to take the case by the royal governor." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "What did Benjamin Franklin contribute during the war?",
        choices: [
          { id: "a", text: "He got France to send money, ships and troops." },
          { id: "b", text: "He commanded the northern army for most of the fighting." },
          { id: "c", text: "He wrote the Declaration of Independence in Philadelphia." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "In 1783 Washington talked his officers out of marching on Congress. Why does that matter?",
        choices: [
          { id: "a", text: "It set the habit of the army answering to the government." },
          { id: "b", text: "It meant the officers were finally paid what they were owed in full." },
          { id: "c", text: "It won the last battle of the Revolutionary War for the Americans." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Which kind of contribution mattered most is a real
        // argument, and the lesson has deliberately refused to settle it.
        prompt: "Three kinds of contribution, five people, one country. Nobody agrees about which kind mattered most.",
        keepFrame: "I think the one that mattered most was ______, because ______.",
        keepOptions: [
          { id: "words", label: "making the argument" },
          { id: "line", label: "holding to a principle" },
          { id: "hands", label: "acting in a crowd" },
        ],
        becauseOptions: [
          { id: "words", label: "people are still picking those words up and using them" },
          { id: "line", label: "rules that nobody defends when it costs are not rules" },
          { id: "hands", label: "nothing changes until somebody actually moves" },
          { id: "none", label: "none of them made any real difference to anything" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Three Ways to Start a Country. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will split three ways on which kind of contribution mattered most, which is the correct number of ways to split on it.",
    },
  },
};
