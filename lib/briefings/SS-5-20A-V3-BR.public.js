// Briefing SS-5-20A-V3-BR — When It Was Made — PUBLIC pack, category (Type 4) shape.
// Answer keys live only in SS-5-20A-V3-BR.server.js — never import that here.
//
// Grade 5 · TEKS 5.20A. `teksText` below is verbatim 19 TAC §113.16,
// taken from lib/briefings/teks/ss-teks-3-5.js — not a paraphrase.
//
// REVIEW NOTES, SOURCES AND FLAGS for this lesson are in
// docs/briefings/BRIEFING-REVIEW-NOTES.md, deliberately kept out of the code.
// Read them before this goes in front of a class: they list every "this really
// happened" claim and its source, and every judgment call that is Emily's
// rather than a generator's.
//
// ART NEEDED (none of these exist yet): threeWorks, beatMade, beatFor, beatWhose
// `transfer` runs as word chips until art lands, like every other v3 lesson.

export const PUBLIC_BRIEFING = {
  id: "SS-5-20A-V3-BR",
  title: "When It Was Made",
  tagline: "A poem about 1775, written in 1860. Read it as an eyewitness and you learn the wrong century.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssCategory",
  grade: 5,
  teks: "5.20A",
  teksText:
    "Identify significant examples of art, music, and literature from various periods in U.S. history such as the painting American Progress, \"Yankee Doodle,\" and \"Paul Revere's Ride\".",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can work out which period a painting, a song or a poem belongs to, and explain the rule that decides.",
  successCriteria:
    "Places works of art, music and literature in the right period; uses when a thing was made rather than what it is about; explains who paid for a work and why that matters; places a work nobody taught them.",

  levels: [
    { id: "revolution", label: "The Revolution", blurb: "The 1760s and 1770s." },
    { id: "expansion", label: "Moving west", blurb: "The 1800s." },
    { id: "civilwar", label: "The Civil War years", blurb: "The 1850s and 1860s." },
    { id: "depression", label: "The Depression", blurb: "The 1930s." },
  ],

  // The lesson's actual content. The student names one of these, not a period.
  rules: [
    { id: "made", label: "When it was made, not when it is about." },
    { id: "for", label: "Who paid, and what they were selling." },
    { id: "whose", label: "Whose side is doing the telling." },
  ],

  art: {
    threeWorks: "/briefings/ss-5-20a-v3-br/01-three-works.jpg",
    beatMade: "/briefings/ss-5-20a-v3-br/02-film-crew.jpg",
    beatFor: "/briefings/ss-5-20a-v3-br/03-textbook-page.jpg",
    beatWhose: "/briefings/ss-5-20a-v3-br/04-classroom-drummers.jpg",
  },

  phases: ["openingFrame", "wrongDesk", "boundarySynthesis", "sequenceIt", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: Longfellow put the lanterns in the wrong hands, rowed Revere across a river somebody else rowed him over, and sent him to a town he never reached. It is still the most quoted thing anybody ever wrote about that night.",
    },
  },

  samLines: {
    openingFrame: "Three works, three periods. One question sorts them.",
    wrongDesk: "Three people use a work as evidence for the wrong century.",
    boundarySynthesis: "Now the ones that belong to two periods at once.",
    sequenceIt: "Five works. Put them in the order they were MADE.",
    opsChoice: "A museum with three fixes and room for two.",
    transfer: "A film's source list. Which period is it really showing you?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    wrongDesk: "Ask when it was made. That is almost the whole trick.",
    boundarySynthesis: "Some works really do belong to two periods. That is allowed.",
    sequenceIt: "Made, not about. One of these will catch you.",
    opsChoice: "All three fixes are real. You can only do two.",
    transfer: "Every period has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "Three Works",
    setup:
      "A song, a painting and a poem. Every one of them is about something that happened before it existed, and every one of them gets used as though it were there.",
    isItPrompt: "A poem describes a night in 1775. Which period does it belong to?",
    // No marked answer — it is genuinely arguable until you decide what "belong
    // to" is for, which is the whole lesson.
    isItOptions: [
      {
        id: "about",
        text: "1775. That is what it describes.",
        response: "It is where most people put it, and it is where a great many museum labels put it. Hold on to that for ten minutes.",
      },
      {
        id: "made",
        text: "Whenever it was written.",
        response: "That is the answer HQ is going to argue for, and you will have to say why.",
      },
      {
        id: "both",
        text: "Both, and you have to say which you mean.",
        response: "The sharpest answer of the three, and the one the boundary cases at the end are built on.",
      },
    ],
    traitsPrompt: "So what does a work of art actually tell you about? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "What the people who made it wanted others to feel.", isTrait: true },
      {
        text: "Exactly what happened in the events it shows.",
        isTrait: false,
        why: "Almost never. Every work in this briefing gets the events at least partly wrong, and two of them on purpose.",
      },
      { text: "What was worth arguing about at the time it was made.", isTrait: true },
      {
        text: "Whether the person who made it was famous.",
        isTrait: false,
        why: "One of the three works here has no known author at all, and it may be the most useful of them.",
      },
    ],
    traitsReveal:
      "That is it. A work of art is **evidence of the moment it was made**, and only a story about the moment it describes. A painting of 1840 made in 1872 tells you about 1872 — reliably — and about 1840 only if somebody checks.",
    predictSetup:
      "Coming up: a film, a textbook and a classroom, each using one of these three works as if it came from the period it depicts.",
    predictPrompt: "What goes wrong when somebody does that?",
    predictOptions: [
      { id: "nothing", label: "Nothing much — it is close enough", hint: "It is still about the right thing" },
      { id: "false", label: "People end up believing something untrue", hint: "And nobody tells them" },
      { id: "boring", label: "It is less interesting than the real thing", hint: "A missed opportunity" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. You will find out three times over. Keep your guess.",
  },

  wrongDesk: {
    // Which openingFrame.predictOption the teach settles the locked guess to.
    // Checked against openingFrame.predictOptions by crossCheckLesson.
    resolvesPredictionTo: "false",
    ledgerTitle: "Which period, and why",
    ledgerEmpty: "Nothing yet — you will fill this in one work at a time.",
    rulePrompt: "So which rule decided that? Name it, and it goes in the ledger.",
    predictionRight:
      "You had it. **People end up believing something untrue**, and the work is not lying — it is being asked the wrong question.",
    predictionWrong:
      "You guessed **{GUESS}**. What happens is that **people believe something untrue.** Three times, coming up, and nobody in any of them is being dishonest.",
    finalLabel: "So — what goes wrong?",
    rounds: [
      {
        id: "w1",
        levelId: "civilwar",
        tag: "Work one",
        imageKey: "beatMade",
        situation:
          "A documentary about the night of 18 April 1775 opens with an actor reading Longfellow's \"Paul Revere's Ride\" over the pictures, as if it were somebody's account of being there.",
        wrongDeskLine: "The poem is used as evidence of 1775.",
        whatWentWrong:
          "Viewers come away certain that one man rode alone and reached Concord. He did neither. William Dawes rode too, by another road; Samuel Prescott joined them; and only Prescott got to Concord. The poem was written in April 1860 and printed that December.",
        routePrompt: "So when does that poem actually come from?",
        routeOptions: [
          { text: "The Civil War years — 1860, eighty-five years after the ride.", best: true, levelId: "civilwar" },
          {
            text: "The Revolution — it is about the Revolution.",
            levelId: "revolution",
            whatIf: "That is the trap the whole briefing is built around. What a work is about and when it was made are two different facts, and only one of them is about the work.",
          },
          {
            text: "Moving west — it is an old-fashioned adventure story.",
            levelId: "expansion",
            whatIf: "It has the feel of one. Feel is not a date, and there is a real date on the magazine it appeared in.",
          },
        ],
        ruleOptions: [
          { id: "made", label: "When it was made, not when it is about." },
          { id: "for", label: "Who paid, and what they were selling." },
          { id: "whose", label: "Whose side is doing the telling." },
        ],
        ledgerLine: "The Civil War years — because that is when somebody sat down and wrote it.",
        vocabTerm: "a primary source",
        vocabMeaning: "something made at the time by somebody who was there, which a poem written eighty-five years later is not",
        realWorld:
          "Longfellow was an abolitionist, and he wrote it as the country came apart. He wanted Northerners to feel that one person acting could matter.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A film made in 1998 about a battle in 1863.",
              ok: true,
              why: "Yes. It tells you a great deal about 1998 and only what somebody in 1998 believed about 1863.",
            },
            {
              text: "A soldier's letter home, written the week of the battle.",
              ok: false,
              why: "Made at the time by somebody there. That is the one case where about and made are the same answer.",
            },
          ],
        },
        nextLabel: "Next work →",
      },
      {
        id: "w2",
        levelId: "expansion",
        tag: "Work two",
        imageKey: "beatFor",
        situation:
          "A textbook page about settlers heading west is illustrated with John Gast's painting American Progress, captioned \"the open country the pioneers found\".",
        wrongDeskLine: "The painting is used as a picture of what was there.",
        whatWentWrong:
          "In the painting a giant figure floats westward with a school book and a telegraph wire, and ahead of her bison and Native people are running into the dark. Students read it as a record of empty land. George Crofutt, who published western travel guides, commissioned it, and it went out by the thousand as cheap colour prints.",
        routePrompt: "What is that painting actually evidence of?",
        routeOptions: [
          { text: "Moving west — 1872, and it was made to sell the idea.", best: true, levelId: "expansion" },
          {
            text: "The Civil War years — it is from roughly that era.",
            levelId: "civilwar",
            whatIf: "Close in time and wrong in subject. This is not a war picture; it is an advertisement for a journey.",
          },
          {
            text: "The Depression — people are travelling to find something better.",
            levelId: "depression",
            whatIf: "They are, sixty years later and in the other direction, and nobody was selling that trip in a painting.",
          },
        ],
        ruleOptions: [
          { id: "made", label: "When it was made, not when it is about." },
          { id: "for", label: "Who paid, and what they were selling." },
          { id: "whose", label: "Whose side is doing the telling." },
        ],
        ledgerLine: "Moving west — and somebody paid for it to look that way.",
        vocabTerm: "a commission",
        vocabMeaning: "work somebody paid to have made, usually because they wanted a particular thing said",
        realWorld:
          "It is one of the most reproduced images in American history, and almost nobody who sees it is told that a travel-guide publisher ordered it.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A poster of a seaside town, printed by the railway that ran trains there.",
              ok: true,
              why: "Yes — and the sky is always blue in those. Somebody paid, and what they were selling is why the sky is blue.",
            },
            {
              text: "A photograph of a seaside town taken by somebody on holiday.",
              ok: false,
              why: "Nobody paid for it and nobody was selling anything. You would ask a different question of it.",
            },
          ],
        },
        nextLabel: "Next work →",
      },
      {
        id: "w3",
        levelId: "revolution",
        tag: "Work three",
        imageKey: "beatWhose",
        situation:
          "A class studying 1775 sings \"Yankee Doodle\" as a proud American marching song, the way it is sung at parades.",
        wrongDeskLine: "It is sung as if the colonists had written it about themselves.",
        whatWentWrong:
          "British soldiers used it to make fun of the colonial troops fighting alongside them, and British regiments played it marching toward Lexington and Concord. \"Doodle\" meant a fool. Sing it without knowing that and you miss the best part of the story — which is that the colonists took the insult and sang it back.",
        routePrompt: "Which period does it belong to, and what is it really?",
        routeOptions: [
          { text: "The Revolution — an insult the other side picked up and kept.", best: true, levelId: "revolution" },
          {
            text: "Moving west — it sounds like a frontier tune.",
            levelId: "expansion",
            whatIf: "It has been sung on every frontier since. It was being played at Lexington before any of that.",
          },
          {
            text: "The Depression — old songs get revived in hard times.",
            levelId: "depression",
            whatIf: "They do, and this one was revived then too. When a song is sung again is not when it was made.",
          },
        ],
        ruleOptions: [
          { id: "made", label: "When it was made, not when it is about." },
          { id: "for", label: "Who paid, and what they were selling." },
          { id: "whose", label: "Whose side is doing the telling." },
        ],
        ledgerLine: "The Revolution — and it started out on the other side.",
        vocabTerm: "satire",
        vocabMeaning: "making fun of something on purpose, so that the joke carries the point",
        realWorld:
          "Nobody is certain who wrote it or exactly when — the origin is genuinely murky. What is documented is who was mocking whom, and who ended up singing it.",
        stretch: {
          q: "Would the same rule decide this one?",
          options: [
            {
              text: "A team nickname that started as an insult from the other side's fans.",
              ok: true,
              why: "Yes, and it happens constantly. Who said it first changes what it means, even after everyone forgets.",
            },
            {
              text: "A team nickname taken from the name of the town.",
              ok: false,
              why: "Nobody was mocking anybody. There is no side doing the telling here — it is just a place name.",
            },
          ],
        },
      },
    ],
  },

  boundarySynthesis: {
    title: "The ones that sit in two periods",
    sortTag: "Part 1 · Which period?",
    sortPrompt: "Tap a work, then tap the period it was made in.",
    columns: [
      { id: "revolution", label: "The Revolution" },
      { id: "expansion", label: "Moving west" },
      { id: "civilwar", label: "The Civil War years" },
      { id: "depression", label: "The Depression" },
    ],
    sortItems: [
      { id: "gast", text: "A painting of a figure floating west with a school book" },
      { id: "longfellow", text: "A poem about a midnight ride, printed in 1861" },
      { id: "doodle", text: "A song about a feather in a cap" },
      { id: "migrant", text: "A photograph of a mother in a tent, 1936" },
      { id: "uncletom", text: "A novel about slavery that sold three hundred thousand in a year" },
      { id: "grapes", text: "A novel about a family driven off its farm by dust" },
      { id: "common", text: "A pamphlet arguing that a king is a bad idea" },
    ],
    boundaryTag: "Part 2 · The ones that do not sit still",
    boundaries: [
      {
        id: "b1",
        q: "\"Paul Revere's Ride\" is about 1775 and was written in 1860. Which period does it belong to?",
        options: [
          {
            text: "Both — and the rule tells you which one it is evidence FOR.",
            ok: true,
            why: "Right. It is a story about 1775 and evidence of 1860. Both are true and only one of them is reliable.",
          },
          {
            text: "1775, because that is the night it describes.",
            ok: false,
            why: "That is where most labels put it, and it is why people believe Revere rode alone. Ask which century the poem can actually testify about.",
          },
          {
            text: "Neither — a poem is not evidence of anything.",
            ok: false,
            why: "It is excellent evidence. Just of the year it was written, and of what somebody in that year wanted people to feel.",
          },
        ],
      },
      {
        id: "b2",
        q: "A photograph of a farm family in 1936, taken by a government photographer whose job was to build support for government programmes. Which period?",
        options: [
          {
            text: "The 1930s — and it is evidence of two things at once.",
            ok: true,
            why: "Yes. What the family looked like, and what the government wanted the country to see. Both, in one picture, and the second one is easy to miss.",
          },
          {
            text: "The 1930s, and nothing more — a photograph shows what was there.",
            ok: false,
            why: "A photograph shows what was in front of the camera, which somebody chose, and which frame of many somebody kept.",
          },
          {
            text: "No period at all — photographs are neutral.",
            ok: false,
            why: "Somebody decided to be in that county, on that day, pointing that way, for a reason they were being paid for.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Take the dates away",
    removePrompt: "Suppose every label said only what a work is about, and never when it was made.",
    removeOne: {
      q: "What goes wrong first?",
      options: [
        { text: "A poem written in 1860 gets read as somebody's eyewitness account of 1775." },
        { text: "Nobody could tell what any of the works were about." },
        { text: "Nothing much. The subject is the part that matters.", isNoChange: true },
      ],
    },
    bigIdea:
      "Every work of art is a reliable witness to one thing: the moment somebody made it. What it is about is a story that moment was telling, and stories are worth exactly as much as whoever checks them.",
  },

  sequenceIt: {
    title: "Five works",
    kidPrompt: "Put them in the order they were MADE — not the order of what they are about.",
    helpWrong: "Not next. One of these is about the earliest thing and was made nearly last.",
    helpPass: "That is the order they were made. The poem about 1775 sits fourth, because it was written eighty-five years afterwards.",
    // Ships shuffled; the correct order is server-side only. The poem about the
    // earliest event sitting FOURTH is the entire item.
    steps: [
      { id: "uncletom", text: "A novel about slavery that sold three hundred thousand copies" },
      { id: "doodle", text: "A song British soldiers sang to mock colonial troops" },
      { id: "gast", text: "A painting of a figure floating west with a school book" },
      { id: "common", text: "A pamphlet arguing that a king is a bad idea" },
      { id: "longfellow", text: "A poem about a midnight ride in 1775" },
    ],
  },

  opsChoice: {
    title: "The Museum Labels",
    pickHeader: "Pick exactly 2",
    constraint: "One budget, three fixes, two of them get done. All three are real.",
    scenario: "A museum is rewriting every label in its American galleries. Three people want three things, and all three are right.",
    voices: [
      { id: "made", who: "Ines, who runs the galleries", emoji: "📅", said: "Half our labels give the year of the event, not the year the thing was made. Visitors read 1872 paintings as though somebody stood there in 1840." },
      { id: "for", who: "Mr Oyede, a teacher who brings classes", emoji: "💵", said: "My students think a painting is just what somebody saw. Tell them who paid for it and they start asking their own questions." },
      { id: "whose", who: "Sal, a visitor who writes a lot of letters", emoji: "🔄", said: "Every room tells one side. The people in the corner of that painting, running into the dark — where is their label?" },
    ],
    projects: [
      {
        id: "add_dates",
        label: "Put the date it was MADE on every label, beside the date it is about",
        reason: "When it was made",
        shortReasonLabel: "The date",
        reasonId: "made",
        sceneId: "dates",
        emoji: "📅",
        teks: true,
        improves: "Nobody reads a painting from 1872 as a window onto 1840 again.",
      },
      {
        id: "add_payers",
        label: "Say who paid for each work, on the label",
        reason: "Who paid",
        shortReasonLabel: "The payer",
        reasonId: "for",
        sceneId: "payers",
        emoji: "💵",
        teks: true,
        improves: "Visitors start asking what each piece was trying to sell them.",
      },
      {
        id: "add_sides",
        label: "Add the other side's account next to each work",
        reason: "Whose side",
        shortReasonLabel: "The other side",
        reasonId: "whose",
        sceneId: "sides",
        emoji: "🔄",
        teks: true,
        improves: "The people in the corner of the picture get a label of their own.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "People are reading the wrong century",
      "Nobody asks who ordered it",
      "Only one side is on the wall",
      "The third can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "made", label: "The dates are still waiting" },
      { id: "for", label: "The payers are still waiting" },
      { id: "whose", label: "The other side is still waiting" },
    ],
    deferredPrompt: "Which fix is still waiting?",
    fundMeterLabel: "Budget — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets fixed vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two fixed. One waits — and somebody warned you about it.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right. Museums argue about exactly these three, in this order of expense, and the third is the one that usually waits.",
    whoseWrong: "Read what each of them said again. Somebody standing in that gallery described exactly this.",
  },

  transfer: {
    title: "The Film's Sources",
    kidPrompt: "A film about the West lists five sources. Tap the **two** that show which period it is really showing you.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "Five source cards: a painting, a travel guide, a poem, a photograph, an undated map",
    spots: [
      { id: "painting", label: "A painting of the West, made in 1872", x: 13, y: 60 },
      { id: "guidebook", label: "A travel guide selling tickets west, printed 1873", x: 34, y: 54 },
      { id: "poem", label: "A poem about 1775, written in 1860", x: 55, y: 62 },
      { id: "photo", label: "A photograph of a dust-blown farm, 1936", x: 77, y: 56 },
      { id: "map", label: "A map of the United States with no date on it", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "This film is really showing you…",
    claimOptions: [
      { id: "expansion", label: "the 1800s, moving west" },
      { id: "civilwar", label: "the Civil War years" },
      { id: "depression", label: "the 1930s" },
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
      { id: "sort", label: "Five ordered" },
      { id: "newtown", label: "The film's sources" },
    ],
    // Distractors are mistakes fifth graders actually make: dating a work by
    // its subject, treating a photograph as neutral, and assuming a famous
    // painting must be a record rather than an argument.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "Which question tells you most reliably which period a work belongs to?",
        choices: [
          { id: "a", text: "When was it made?" },
          { id: "b", text: "What event does the work show?" },
          { id: "c", text: "How old does the work look to us now?" },
          { id: "d", text: "Which period do most people say it comes from?" },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "A song written in 1955 about the Great Depression. Which period is it evidence of?",
        choices: [
          { id: "a", text: "1955 — that is when somebody made it." },
          { id: "b", text: "The 1930s, because that is what it is about." },
          { id: "c", text: "Neither — a song cannot be evidence of anything." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "A travel-guide publisher paid for a painting of settlers moving west. What should that make you ask?",
        choices: [
          { id: "a", text: "What did he hope people would do after seeing it?" },
          { id: "b", text: "Whether the painter had ever been out west himself at all." },
          { id: "c", text: "How much money the painting eventually sold for." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "British soldiers first sang \"Yankee Doodle\" to mock the colonists. Why does knowing that change the song?",
        choices: [
          { id: "a", text: "Because the colonists took an insult and made it theirs." },
          { id: "b", text: "Because it means Americans should not really sing it now." },
          { id: "c", text: "Because it proves the song was written much later on." },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Whether a museum should label what a work is about or
        // when it was made is a live argument among real curators.
        prompt: "Museums argue about this. Some labels lead with what a work shows. Some lead with when it was made.",
        keepFrame: "A label should lead with ______, because ______.",
        keepOptions: [
          { id: "made", label: "when it was made" },
          { id: "about", label: "what it shows" },
        ],
        becauseOptions: [
          { id: "made", label: "that is the one thing the work can actually prove" },
          { id: "about", label: "that is what brings somebody across the room to look" },
          { id: "none", label: "labels make no difference to what anybody thinks" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: When It Was Made. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. Then take the class to any museum label, or any textbook page, and ask them which date it leads with. They will not stop doing it.",
    },
  },
};
