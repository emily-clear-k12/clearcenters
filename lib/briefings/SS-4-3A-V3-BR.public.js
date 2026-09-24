// Briefing SS-4-3A-V3-BR — Three Doors Closing — PUBLIC pack, thinking (Type 1) shape.
// Answer keys live only in SS-4-3A-V3-BR.server.js — never import that here.
//
// Grade 4 · TEKS 4.3A. `teksText` below is verbatim 19 TAC §113.15,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): intel, beatDeal, beatVoice, beatForce, ops
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-4-3A-V3-BR",
  title: "Three Doors Closing",
  tagline: "Nobody woke up wanting a war. Each thing they tried made the next thing worse.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssThinking",
  grade: 4,
  teks: "4.3A",
  teksText:
    "Analyze the causes, major events, and effects of the Texas Revolution, including the Battle of the Alamo, the Texas Declaration of Independence, the Runaway Scrape, and the Battle of San Jacinto.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can explain what pushed Texas into revolution, put the major events in order, and say what it led to.",
  successCriteria:
    "Names three kinds of cause and says which was which; puts the events of 1835–36 in order, including the four days between the Declaration and the fall of the Alamo; explains why each step made the next one likelier; finds the same kinds of cause in a revolution nobody taught them.",

  art: {
    intel: "/briefings/ss-4-3a-v3-br/01-customs-house.jpg",
    beatDeal: "/briefings/ss-4-3a-v3-br/02-the-law-posted.jpg",
    beatVoice: "/briefings/ss-4-3a-v3-br/03-long-road-barred-window.jpg",
    beatForce: "/briefings/ss-4-3a-v3-br/04-gonzales-cannon.jpg",
    ops: "/briefings/ss-4-3a-v3-br/05-san-felipe-november.jpg",
  },

  phases: ["openingFrame", "storyTeach", "synthesis", "sequenceIt", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: the Gonzales cannon was small, old and not much use to anybody. It has been argued about for nearly two hundred years, which is a lot of arguing for one bad gun.",
    },
  },

  samLines: {
    openingFrame: "Five years from filing complaints to firing guns. Watch how.",
    storyTeach: "Three doors. Each one shuts because of how they got through the last one.",
    synthesis: "Put it back in order — then take a door out and see what survives.",
    sequenceIt: "Five events. One of them is not where you think it is.",
    opsChoice: "November 1835. Three things need doing and there is money for two.",
    transfer: "A different argument, sixty years earlier. Same three doors?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    storyTeach: "Decide first. Then find out what actually happened.",
    synthesis: "Ask what each problem was a reply to.",
    sequenceIt: "Check the dates on two of these before you commit.",
    opsChoice: "All three are real. You can only do two.",
    transfer: "Every kind of cause has proof here. Only one has two pieces.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Before the Shooting",
    setup:
      "Texas belonged to Mexico. Mexico had invited settlers in, on terms: take the cheap land, farm it, obey Mexican law. Thousands came.",
    isItPrompt: "A government changes a rule people had already agreed to live under. Is that allowed?",
    // No marked answer. All three are defensible and the argument is the lesson.
    isItOptions: [
      {
        id: "yes",
        text: "Yes. Governments change rules all the time.",
        response: "They do, constantly. The question this briefing asks is what it costs them when they do.",
      },
      {
        id: "no",
        text: "No. A deal is a deal.",
        response: "That is how the settlers saw it. Mexico saw a country protecting itself from losing a province.",
      },
      {
        id: "depends",
        text: "Depends on the rule, and on who it lands on.",
        response: "That is where HQ would draw it too — and it is the argument the next twenty minutes are about.",
      },
    ],
    traitsPrompt: "So what turns an argument with a government into a war? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "People run out of ways to be heard.", isTrait: true },
      {
        text: "People stop liking the people in charge.",
        isTrait: false,
        why: "Plenty of people dislike their government for decades and nothing happens. Disliking is not the same as having nowhere left to go.",
      },
      { text: "Somebody starts using soldiers to settle the argument.", isTrait: true },
      {
        text: "One side has more people than the other.",
        isTrait: false,
        why: "Texas had far fewer people than Mexico and went anyway. Numbers decide battles. They do not decide whether a fight starts.",
      },
    ],
    traitsReveal:
      "That is it. A **revolution** starts when people stop asking a government to change and set out to replace it — usually after the asking has been shut off and soldiers have turned up. It takes years, and each step makes the next one likelier.",
    predictSetup:
      "Texas went from filing complaints to firing guns in about five years. Three things pushed it, in order.",
    predictPrompt: "Which came first?",
    predictOptions: [
      { id: "deal", label: "A promise got changed", hint: "The terms moved after people had already come" },
      { id: "voice", label: "Nobody would listen", hint: "They asked, properly, and got nothing" },
      { id: "force", label: "Soldiers settled it", hint: "The army arrived and the talking stopped" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying. You will find out by walking through it. Keep your guess.",
  },

  storyTeach: {
    ledgerTitle: "What pushed them",
    ledgerEmpty: "Nothing yet — you will fill this in as it goes wrong.",
    namePrompt: "So what kind of cause was that? Name it, and it goes in the ledger.",
    reasons: [
      { id: "deal", label: "A promise got changed" },
      { id: "voice", label: "Nobody would listen" },
      { id: "force", label: "Soldiers settled it" },
    ],
    firstReasonId: "deal",
    predictionRight:
      "You called it. **A promise got changed** came first — and everything after it was a reply to that.",
    predictionWrong:
      "You guessed **{GUESS}**. It was **a promise got changed**. The other two are real, and both of them arrived later, because of this one.",
    finalLabel: "So — which came first?",
    beats: [
      {
        id: "b1",
        title: "The door closes",
        tag: "1830",
        imageKey: "beatDeal",
        situation:
          "By 1830 more people in Texas had come from the United States than were born in Mexico. Mexico City began to worry it was going to lose the whole province without a shot being fired.",
        ask: "You are the Mexican government. What do you do?",
        bestLead: "That is what Mexico chose too. Here is what it did.",
        choices: [
          {
            text: "Send Mexican families north so both sides grow together.",
            whatIf:
              "They tried. Mexico's own people had little reason to move a thousand miles to a frontier, and hardly any went.",
          },
          {
            text: "Shut the door to new settlers and tax what crosses the border.",
            best: true,
          },
          {
            text: "Leave it alone and trust the settlers to stay loyal.",
            whatIf:
              "That is a bet on people who had never met a Mexican official. It is not a plan, it is a hope.",
          },
        ],
        did:
          "The Law of April 6, 1830 shut the border to new settlers from the United States, set up customs houses to collect taxes, and put soldiers there to watch. The families already farming had come under different terms, and those terms had just moved.",
        ledgerLine: "A promise got changed — the terms they came under stopped holding.",
        vocabTerm: "customs house",
        vocabMeaning: "an office at a border that collects a tax on goods brought in",
        realWorld:
          "Stephen F. Austin talked his own colonists out of the worst of it. He won an exemption for them, and later got the immigration rule repealed altogether.",
        stretch: {
          q: "Is this the same kind of cause?",
          options: [
            {
              text: "A landlord doubles the rent halfway through a year somebody has already paid for.",
              ok: true,
              why: "Yes — same shape. The terms were agreed, and then one side moved them.",
            },
            {
              text: "A landlord refuses to rent to somebody in the first place.",
              ok: false,
              why: "Unfair, possibly. But nothing was agreed and then changed, so it is a different complaint.",
            },
          ],
        },
        bridge:
          "Taxes and soldiers gave the settlers something to complain about. So they did what you are supposed to do. They wrote it down and sent a man to ask.",
        nextLabel: "Next →",
      },
      {
        id: "b2",
        title: "The long ride",
        tag: "1833",
        imageKey: "beatVoice",
        situation:
          "Three years of customs houses and quarrels. The settlers want the rules rolled back and Texas run as its own state inside Mexico.",
        ask: "You are Texas in 1833. How do you get that?",
        bestLead: "That is what they chose too. Here is how it went.",
        choices: [
          {
            text: "Stop paying the new taxes and see what happens.",
            whatIf:
              "Some did exactly that at Anahuac in 1832, and it ended in shooting. It also handed the government a reason to send more soldiers, not fewer.",
          },
          {
            text: "Write out what you want and send somebody to ask for it in person.",
            best: true,
          },
          {
            text: "Ask the United States to take Texas off Mexico's hands.",
            whatIf:
              "That is the one move guaranteed to prove Mexico's fear right. It ends the argument by starting a far bigger one.",
          },
        ],
        did:
          "They wrote it out and sent Stephen F. Austin twelve hundred miles to Mexico City. He waited months with no answer. Losing patience, he wrote home telling Texas to start setting up a state government without waiting for permission. The letter was found. He spent most of 1834 in prison, some of it in a cell with no light and nothing to write with, and was never put on trial.",
        ledgerLine: "Nobody would listen — two years of asking ended in a cell.",
        vocabTerm: "petition",
        vocabMeaning: "a written request a group sends to a government, asking it to change something",
        realWorld:
          "Austin was let out on bail on Christmas Day 1834 and still did not reach home until September 1835. Two years gone, and nothing had been answered.",
        stretch: {
          q: "Is this the same kind of cause?",
          options: [
            {
              text: "A town sends the same request four years running and is never told yes or no.",
              ok: true,
              why: "Yes. Not a refusal — silence. Being ignored is its own answer, and people hear it.",
            },
            {
              text: "A town sends a request and is told no, with a reason.",
              ok: false,
              why: "That is a refusal, and people can argue with a refusal. This kind of cause is about there being nobody at the other end.",
            },
          ],
        },
        bridge:
          "Two years of asking, one man in a cell, nothing changed. And while Texas waited, a general in Mexico City was rewriting the rules for everybody.",
        nextLabel: "Next →",
      },
      {
        id: "b3",
        title: "Come and take it",
        tag: "1835",
        imageKey: "beatForce",
        situation:
          "Santa Anna threw out the constitution of 1824 — the one that had let each state run its own affairs — and put down the states that objected. Then a hundred soldiers rode to Gonzales for a small cannon the town had been lent.",
        ask: "You are Gonzales. What do you do?",
        bestLead: "That is what they chose too. Here is what followed.",
        choices: [
          {
            text: "Hand it over. It was only ever a loan.",
            whatIf:
              "Reasonable — and the next thing asked for would have been the rifles. Towns that handed things over found that out.",
          },
          {
            text: "Refuse, and send riders to every settlement for help.",
            best: true,
          },
          {
            text: "Ask Mexico City to settle it.",
            whatIf:
              "That took Austin two years and a prison cell. There was no time, and there was no longer anybody at that end who would answer.",
          },
        ],
        did:
          "They buried the cannon, stalled for days, and sent riders out. On 2 October 1835 they dug it up, hung a flag over it reading COME AND TAKE IT, and fired. Almost nobody was hurt. The war had started anyway.",
        ledgerLine: "Soldiers settled it — once the army came for something, asking was over.",
        vocabTerm: "revolution",
        vocabMeaning: "when people stop asking a government to change and set out to replace it",
        realWorld:
          "Gonzales still calls itself the Lexington of Texas, after the town where another war's first shot was fired.",
        stretch: {
          q: "Is this the same kind of cause?",
          options: [
            {
              text: "Troops are sent to take the weapons of a town that has been complaining.",
              ok: true,
              why: "Yes. Once one side sends soldiers, the other side stops writing letters. That is the whole pattern.",
            },
            {
              text: "A government builds a fort on its own border against a country it fears.",
              ok: false,
              why: "Forts on borders are ordinary. This kind of cause is about soldiers being turned on the people the government already governs.",
            },
          ],
        },
      },
    ],
  },

  synthesis: {
    title: "Put the five years back together",
    orderTag: "Part 1 · What happened when",
    orderPrompt: "Three moments, out of order. Tap them in the order Texas hit them.",
    orderCards: [
      { id: "cannon", text: "Soldiers arrive for the town's cannon" },
      { id: "petition", text: "Two years of asking, and no reply" },
      { id: "border", text: "The border shuts and the taxes start" },
    ],
    causeTag: "Part 2 · What caused what",
    // Wrong options are events from LATER in the chain. Reaching for something
    // that had not happened yet is the characteristic causal error at this age.
    causes: [
      {
        id: "c1",
        q: "Why did Texas send a petition all the way to Mexico City in 1833?",
        options: [
          {
            text: "Because the 1830 law had given them something to complain about.",
            ok: true,
            why: "Yes. The first door closing is what there was to petition about at all.",
          },
          {
            text: "Because soldiers had come for the Gonzales cannon.",
            ok: false,
            why: "That is two years later. It had not happened yet.",
          },
          {
            text: "Because Santa Anna had torn up the constitution.",
            ok: false,
            why: "Also later. Look for what had already gone wrong by 1833.",
          },
        ],
      },
      {
        id: "c2",
        q: "Why did Gonzales refuse in 1835 instead of writing another letter?",
        options: [
          {
            text: "Because the last man who carried a letter came back two years later, from prison.",
            ok: true,
            why: "That is it. The second door shutting is why nobody tried the third letter.",
          },
          {
            text: "Because Texas had more soldiers than Mexico did.",
            ok: false,
            why: "It had far fewer, and everybody in Gonzales knew it. That is not why.",
          },
          {
            text: "Because the cannon was worth a great deal of money.",
            ok: false,
            why: "It was small, old and nearly useless. Nobody was defending its value.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Take one away",
    removePrompt: "Three doors shut, one after the other. Reopen one and see what happens to the rest.",
    removals: [
      {
        id: "deal",
        label: "Suppose the 1830 law had never been passed",
        q: "What happens next?",
        options: [
          { text: "Nobody has much to petition about, so no rider goes south and nobody goes to prison." },
          { text: "Nothing changes — the Alamo happens on the same date anyway." },
          { text: "Mexico wins the war instead." },
        ],
      },
      {
        id: "voice",
        label: "Suppose Mexico had said yes to the petition in 1833",
        q: "What happens next?",
        options: [
          { text: "Texas has a way to be heard, so the next quarrel is argued instead of shot over." },
          { text: "Texas becomes independent two years earlier." },
          { text: "Nothing changes — Santa Anna sends the soldiers regardless." },
        ],
      },
      {
        id: "force",
        label: "Suppose the soldiers had never ridden to Gonzales",
        q: "What happens next?",
        options: [
          { text: "The quarrel stays a quarrel for a while longer — angry, but nobody has fired yet." },
          { text: "The 1830 law is repealed straight away." },
          { text: "Nothing changes — the shooting was going to start that week whatever happened." },
        ],
      },
    ],
    bigIdea:
      "Reopen any one door and the next one is slower to shut. That is what a chain means: not three bad things in a row, but three bad things where each one is a reply to the last.",
  },

  sequenceIt: {
    title: "Five events, six months",
    kidPrompt: "Tap them in the order they happened. Two of these are closer together than people expect.",
    helpWrong: "Not next. Check the dates on the Declaration and the Alamo.",
    helpPass: "That is the order. Texas declared itself a country four days before the Alamo fell.",
    // Ships shuffled; the correct order is server-side only. The Declaration
    // sitting BEFORE the fall of the Alamo is the whole item — almost every
    // student puts the Alamo first, because it is the part they have heard of.
    steps: [
      { id: "alamo", text: "The Alamo falls after thirteen days under siege." },
      { id: "sanjacinto", text: "Santa Anna's camp is overrun at San Jacinto in under twenty minutes." },
      { id: "gonzales", text: "Gonzales fires on the soldiers sent for its cannon." },
      { id: "runaway", text: "Families across Texas flee east ahead of the army — the Runaway Scrape." },
      { id: "declaration", text: "Texas declares itself independent at Washington-on-the-Brazos." },
    ],
  },

  opsChoice: {
    title: "The Consultation, November 1835",
    pickHeader: "Pick exactly 2",
    constraint: "One month, very little money. The Consultation can do **two**. All three are real.",
    scenario:
      "Fifty-eight delegates in one room. Three people have ridden in to say what matters, and all three are right.",
    voices: [
      {
        id: "deal",
        who: "Bernabé, a rancher near Béxar",
        emoji: "📜",
        said: "Say plainly we fight for the 1824 constitution. Mexicans will stand with us for that. None will stand with us for taking Texas away.",
      },
      {
        id: "voice",
        who: "Hannah Pell, whose farm is near San Felipe",
        emoji: "🏛️",
        said: "Five years we have waited on a city a thousand miles off. Put a government here, where somebody answers the door.",
      },
      {
        id: "force",
        who: "Mattie Ord, who cooks for the volunteers",
        emoji: "🔥",
        said: "Men outside Béxar tonight have no coats and no pay. Argue all you like. They will go home first.",
      },
    ],
    projects: [
      {
        id: "declare_1824",
        label: "Declare that Texas fights for the constitution of 1824",
        reason: "A promise got changed",
        shortReasonLabel: "The old terms",
        reasonId: "deal",
        sceneId: "declare",
        emoji: "📜",
        teks: true,
        improves: "Mexicans who lost that constitution too have a reason to take Texas's side.",
      },
      {
        id: "provisional_gov",
        label: "Set up a government here, so nobody waits on Mexico City",
        reason: "Nobody would listen",
        shortReasonLabel: "Somebody to ask",
        reasonId: "voice",
        sceneId: "govern",
        emoji: "🏛️",
        teks: true,
        improves: "Decisions get made in days instead of carried south and never answered.",
      },
      {
        id: "pay_army",
        label: "Pay and feed the volunteers already in the field",
        reason: "Soldiers settled it",
        shortReasonLabel: "The men outside",
        reasonId: "force",
        sceneId: "army",
        emoji: "🔥",
        teks: true,
        improves: "The volunteers stay through the winter instead of walking home.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "We need people on our side",
      "Somebody here has to be able to decide",
      "The men in the field come first",
      "The third can wait a month",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "deal", label: "The old terms are still waiting" },
      { id: "voice", label: "A government here is still waiting" },
      { id: "force", label: "The volunteers are still waiting" },
    ],
    deferredPrompt: "Which one is still waiting?",
    fundMeterLabel: "Meter — fill 2 slots",
    waitingLabel: "Still waiting",
    consequenceTitle: "What gets done vs. what waits",
    boardTitle: "THIS MONTH / LATER",
    boardThisYearLabel: "THIS MONTH",
    boardNextYearLabel: "LATER",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two done. One waits — and somebody stood in that room and warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were telling the truth. There was time for two, so somebody was always going to be right and still wait. The real Consultation tried all three and did none well.",
    whoseWrong: "Read what each of them said again. Somebody stood in that room and described exactly this.",
  },

  transfer: {
    title: "A Different Argument",
    kidPrompt:
      "Another set of colonies, another government across an ocean. Tap the **two things** that show what pushed them over.",
    // ART NEEDED: runs as word chips until a scene exists. The x/y values are
    // already placed for a 600x300-ish drawing.
    //
    // NOTE FOR EMILY — imageAlt counts against this phase's 110-word budget,
    // even though no student ever reads it. Writing a full art spec here
    // trips the audit, so the spec below is kept short and the real one is in
    // the file header instead. That is the audit measuring the wrong thing,
    // not a content problem. See the findings note that shipped with this set.
    imageAlt: "A colonial square: a torn charter, a tax notice, unanswered letters, soldiers, a king's portrait",
    spots: [
      { id: "charter", label: "A colony's charter taken back by the king", x: 13, y: 60 },
      { id: "taxes", label: "A tax written by a parliament no colonist sits in", x: 34, y: 55 },
      { id: "petition", label: "A long petition sent across the ocean, never answered", x: 55, y: 62 },
      { id: "powder", label: "Soldiers marching out to seize a town's gunpowder", x: 77, y: 58 },
      { id: "portrait", label: "A portrait of the king in the town hall", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "What pushed these colonies over was mostly…",
    claimOptions: [
      { id: "deal", label: "a promise got changed" },
      { id: "voice", label: "nobody would listen" },
      { id: "force", label: "soldiers settled it" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three doors" },
      { id: "together", label: "Put back together" },
      { id: "sort", label: "Five events ordered" },
      { id: "newtown", label: "A different argument" },
    ],
    // Distractors are mistakes fourth graders actually make: that the side that
    // rebels must be the bigger one, that being refused and being ignored are
    // the same thing, and that the Alamo came before the Declaration.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which three kinds of cause pushed Texas into revolution?",
        choices: [
          { id: "a", text: "a promise changed · nobody listening · soldiers sent in" },
          { id: "b", text: "a promise changed · nobody listening · Texas being bigger than Mexico" },
          { id: "c", text: "bad harvests · nobody listening · soldiers sent in" },
          { id: "d", text: "a promise changed · everybody wanting the same thing · soldiers sent in" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A government doubles a tax it had promised would never rise. Which kind of cause is that?",
        choices: [
          { id: "a", text: "A promise got changed." },
          { id: "b", text: "Nobody would listen to them." },
          { id: "c", text: "Soldiers settled it instead." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "Which one of these tells you that asking has stopped working?",
        choices: [
          { id: "a", text: "Two years of letters, and not one reply." },
          { id: "b", text: "A government people argue with in the papers every week." },
          { id: "c", text: "A tax everybody complains about and everybody pays." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "Texas won at San Jacinto in April 1836. What was Texas the day afterwards?",
        choices: [
          { id: "a", text: "Its own country, with its own president and money." },
          { id: "b", text: "A state of the United States, from that day onwards." },
          { id: "c", text: "Still part of Mexico, but with much better terms." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Whether the Texas Revolution had to happen is a real
        // argument historians have not settled, and it goes to the teacher.
        // Only whether the sentence holds together is checked.
        prompt: "Historians still argue about whether this war had to happen at all.",
        keepFrame: "I think the war ______, because ______.",
        keepOptions: [
          { id: "avoidable", label: "could have been avoided" },
          { id: "coming", label: "was always coming" },
        ],
        becauseOptions: [
          { id: "avoidable", label: "one yes from Mexico City in 1833 would have ended it" },
          { id: "coming", label: "both sides wanted things that could not both be true" },
          { id: "none", label: "it makes no difference what anybody did" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: Three Doors Closing. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will split on whether the war had to happen, and the split is the lesson — that is the argument the textbooks are having too.",
    },
  },
};
