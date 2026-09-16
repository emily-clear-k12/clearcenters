// Briefing SS-5-5A-V3-BR — One Machine, Three Changes — PUBLIC pack, v3 thinking shape.
// Answer keys live only in SS-5-5A-V3-BR.server.js — never import that here.
//
// GRADE 5 · TYPE 1 · TEKS 5.5A · THE HUB VARIANT — THE FIRST ONE EVER BUILT.
//
// ============================================================================
// WHAT THIS IS TESTING, AND THE ONE THING IT FOUND
// ============================================================================
// The assignment table marks ten standards `T1-hub` and says plainly that no
// hub lesson exists and the first one needs a human read before the rest
// follow. This is that lesson.
//
//   CHAIN  A caused B caused C. The beats cannot be shuffled because each
//          problem is created by the previous beat's solution.
//   HUB    One thing changed many things at once. The beats fan out from a
//          single cause instead of running forward.
//
// THE FINDING, AND IT IS STRUCTURAL: **a hub lesson silently disables Type 1's
// main safety check.** `validateSsThinkingShape` requires a `bridge` on every
// beat but the last, and the schema says why in as many words — "without it the
// beats are shufflable, which is the v2 problem." In a chain the bridge carries
// real causation. In a hub there is no causation between beats to carry, because
// they are siblings, not a line. The field still has to be filled, so it gets
// filled, and the check passes while protecting nothing.
//
// WHAT THIS LESSON DOES ABOUT IT — and it is a partial fix, not a full one.
// The beats are ordered by TIME and the bridges carry the clock rather than
// the cause: 1900–1920, then 1929–1933, then 1941–1945. You cannot shuffle
// them, because the dates forbid it. That is a real constraint and a student
// can feel it. It is NOT the same constraint as a chain, and nothing in the
// checker can tell the difference.
//
// FOR EMILY — MY RECOMMENDATION, WHICH IS YOURS TO REJECT: add one rule to §9
// for hubs — **a hub's beats must be in a fixed real-world order (time, or
// scale) and each bridge must state what fixes it.** That is checkable by a
// human in ten seconds and it stops a generator producing three interchangeable
// paragraphs with connective tissue pasted between them. I have not changed the
// schema, because "bridge must contain a date" is the kind of rule that is
// easy to satisfy and hard to satisfy honestly.
//
// ============================================================================
// teksText — verbatim 19 TAC §113.16(c)(5)(A), from teks/ss-teks-3-5.js.
// ============================================================================
// This one says **such as**, not "including" — so the six examples it lists
// (industrialization, urbanization, the Great Depression, the world wars, the
// civil rights movement, military actions) are ILLUSTRATIVE and a lesson may
// select among them. This lesson uses industrialization as the hub and
// urbanization, the Depression and the world wars as its three effects, with
// the civil rights movement arriving through the third. That selection is legal
// precisely because the standard says "such as" — on an "including" standard it
// would not be.
//
// ============================================================================
// HISTORICAL ACCURACY — verified Sept 16 2026
// ============================================================================
//  - The Great Migration: about six million Black Americans left the rural
//    South between 1916 and 1970 for cities in the North and West — Chicago,
//    Detroit, New York, Philadelphia, Los Angeles, Oakland. (Britannica)
//  - The 1920 census was the first in which more Americans lived in urban
//    places than outside them.
//  - Unemployment reached roughly one in four American workers at the depth of
//    the Depression in 1933.
//  - A. Philip Randolph threatened a march of tens of thousands on Washington
//    over exclusion from defence jobs; Franklin Roosevelt issued Executive
//    Order 8802 on 25 June 1941, banning discrimination in the defence
//    industries, and the march was called off. The march had been set for
//    1 July — six days later.
//
// FLAGGED FOR HUMAN REVIEW — five things a checker cannot see:
//  1. THE HUB ITSELF. Is "industrialization" genuinely the single cause of all
//     three beats, or am I tying three big things to one word because the shape
//     wanted one? I believe beats 1 and 2 hold tightly and beat 3 holds through
//     one more link (factories → wartime production → labour shortage → the
//     doors open). That third chain is longer and you should read it hardest.
//  2. BEAT 1 marks "go north" as the `best` choice. It is what about six
//     million people did, and the file says so — but marking a family's
//     migration decision "best" is not the same kind of statement as marking a
//     town's road-building decision "best" in 3.2A. If that reads wrong, the
//     honest alternative is to make beat 1 have no marked answer, which would
//     mean Type 1 borrowing Type 3's rule.
//  3. BEAT 3 IS THE HEAVY ONE. It says plainly that the jobs opened because the
//     men were gone and not because anybody's mind changed, and that many of
//     those workers were pushed back out afterwards. That is accurate and it is
//     the link to the civil rights movement the standard names. Read it.
//  4. THE OPS CHOICE puts "keep the wartime hires on the line" on the table as
//     one of three real options in 1946. It is a real decision real firms made
//     and mostly made the other way. A student can choose not to keep them.
//     That is uncomfortable and I think it is right; it is your call.
//  5. THE TRANSFER uses the automobile as a second hub. The "forty thousand
//     deaths a year" figure is a modern round number, not a 1950s one. Fine
//     as written ("a year") but do not let it drift into a historical claim.
//
// ART NEEDED (none exist):
//   intel      — a factory gate at shift change, a queue of new arrivals
//   beatWhere  — a train platform, cases, a city skyline behind
//   beatRisk   — a silent factory, a locked gate, a queue at a soup kitchen
//   beatWho    — a 1943 assembly line, women and Black workers on it
//   ops        — a 1946 town meeting, three people standing to speak
//   (transfer runs as word chips, same as every other v3 lesson)

export const PUBLIC_BRIEFING = {
  id: "SS-5-5A-V3-BR",
  title: "One Machine, Three Changes",
  tagline: "Nobody voted to move half the country into cities. The factories did it anyway.",
  subject: "social_studies",
  subjectLabel: "Social Studies",
  shape: "ssThinking",
  grade: 5,
  teks: "5.5A",
  teksText:
    "Explain the significance of issues and events of the 20th century such as industrialization, urbanization, the Great Depression, the world wars, the civil rights movement, and military actions.",
  minutes: 20,
  engine: "briefing",
  relatedChallengeIds: [],
  objective:
    "I can explain how one change — moving the country's work into factories — reached three completely different parts of American life.",
  successCriteria:
    "Names three kinds of effect and says which was which; puts them in time order and explains why all three came from one cause; reasons about what would have been different without each; finds the same three kinds of effect coming out of an invention nobody taught them.",

  art: {
    intel: "/briefings/ss-5-5a-v3-br/01-factory-gate.png",
    beatWhere: "/briefings/ss-5-5a-v3-br/02-train-platform.png",
    beatRisk: "/briefings/ss-5-5a-v3-br/03-locked-gate.png",
    beatWho: "/briefings/ss-5-5a-v3-br/04-1943-line.png",
    ops: "/briefings/ss-5-5a-v3-br/05-town-meeting-1946.png",
  },

  phases: ["openingFrame", "storyTeach", "synthesis", "matchPairs", "opsChoice", "transfer", "clearance"],

  engagement: {
    progressTrail: { enabled: true, steps: 7 },
    hiddenBonus: {
      enabled: true,
      samLine:
        "Off the record: the 1920 census was the first to find more Americans in cities than out of them. It was also the census people argued about hardest, because a lot of small towns did not want to be told what had happened to them.",
    },
  },

  samLines: {
    openingFrame: "One change. Three completely different consequences.",
    storyTeach: "Same cause every time. Watch where it comes out.",
    synthesis: "Put the three in order, then take one away.",
    matchPairs: "Four things that happened. Four reasons they did.",
    opsChoice: "A factory town in 1946. Three things to do, money for two.",
    transfer: "A different machine. Same three kinds of change?",
    clearance: "HQ check-in. Five questions.",
    cleared: "Briefing cleared! Ask your teacher for a Challenge.",
  },
  samTips: {
    openingFrame: "No marked answer on the first one — say what you think.",
    storyTeach: "These three are not a chain. Ask what they all came out of.",
    synthesis: "Order them by date, then ask what they share.",
    matchPairs: "One card on the right matches nothing.",
    opsChoice: "All three are real. You can only do two.",
    transfer: "Every kind of change has one proof here. Only one has two.",
    clearance: "Four are marked. The last one your teacher reads.",
  },

  openingFrame: {
    title: "One Machine",
    setup:
      "In 1900 most Americans worked on land — their own, or somebody's. A hundred years later almost nobody did. One thing moved in between, and it was not a law and nobody voted on it.",
    isItPrompt: "When a new machine arrives somewhere, who does it change?",
    // No marked answer. All three are defensible; the traits step settles it.
    isItOptions: [
      {
        id: "users",
        text: "The people who use it.",
        response: "Obviously them. HQ is about to argue that they are the smallest group affected.",
      },
      {
        id: "makers",
        text: "Them, and the people who make it.",
        response: "Wider, and still too narrow. Keep going outward.",
      },
      {
        id: "everyone",
        text: "People who never go near it.",
        response: "That is the answer this briefing is built on. Three of the people you are about to meet never set foot in a factory.",
      },
    ],
    traitsPrompt: "So what makes a change big enough to change a whole country? Pick the two that matter.",
    traitsNeeded: 2,
    traits: [
      { text: "It changes where you have to be to earn a living.", isTrait: true },
      {
        text: "It is expensive.",
        isTrait: false,
        why: "Expensive things change the lives of whoever can afford them. Price is not reach.",
      },
      { text: "It changes what happens to you when things go wrong.", isTrait: true },
      {
        text: "It is invented in America.",
        isTrait: false,
        why: "Half the machines in this briefing were not. Where an idea starts says nothing about how far it travels.",
      },
    ],
    traitsReveal:
      "That is it. Some changes are a **hub** — one thing that reaches many separate parts of life at once, rather than one thing leading to the next in a line. Moving a country's work into factories is the biggest one the 20th century had.",
    predictSetup:
      "Three things are coming: the cities filling up, the Depression, and the war plants. All three came out of the factories.",
    predictPrompt: "Which of the three showed up first?",
    predictOptions: [
      { id: "where", label: "It changed where people lived", hint: "The country moves house" },
      { id: "risk", label: "It changed what could go wrong", hint: "A new way to be in trouble" },
      { id: "who", label: "It changed who got to do the work", hint: "Doors that had been shut" },
    ],
    lockLabel: "Lock in my guess",
    lockedNote: "Locked in. HQ is not saying. You will have it by the third one. Keep your guess.",
  },

  storyTeach: {
    ledgerTitle: "What the factories changed",
    ledgerEmpty: "Nothing yet — you will fill this in one change at a time.",
    namePrompt: "So what kind of change was that? Name it, and it goes in the ledger.",
    reasons: [
      { id: "where", label: "It changed where people lived" },
      { id: "risk", label: "It changed what could go wrong" },
      { id: "who", label: "It changed who got to do the work" },
    ],
    firstReasonId: "where",
    predictionRight:
      "You had it. **Where people lived** went first, and it went for fifty years before either of the others turned up.",
    predictionWrong:
      "You guessed **{GUESS}**. It was **where people lived** — the moving started decades before the crash and two wars before the war plants.",
    finalLabel: "So — which came first?",
    beats: [
      {
        id: "b1",
        title: "The country moves house",
        tag: "1900–1920",
        imageKey: "beatWhere",
        situation:
          "A family farms in Alabama. The crop pays once a year, if it comes in. Two hundred miles north a steel mill is hiring, and it pays cash on a Friday whatever the weather does.",
        ask: "You are that family. What do you do?",
        bestLead: "That is what about six million people decided over the next fifty years.",
        choices: [
          {
            text: "Stay. The land is yours and a wage belongs to somebody else.",
            whatIf:
              "A real answer, and millions gave it. It also means one bad season is still the whole year, and in the South of 1916 it meant living under laws written to keep you there.",
          },
          {
            text: "Go north to where the wage is.",
            best: true,
          },
          {
            text: "Send one child north and keep the farm going.",
            whatIf:
              "Enormously common, and usually the first step rather than the last. The child sends money, then a sister follows, then the parents.",
          },
        ],
        did:
          "Between 1916 and 1970 about six million Black Americans left the rural South for Chicago, Detroit, New York, Philadelphia, Los Angeles and Oakland. Millions of white farming families moved too. At the 1920 census, for the first time, more Americans lived in cities than outside them.",
        ledgerLine: "It changed where people lived — a country of farms became a country of cities.",
        vocabTerm: "urbanization",
        vocabMeaning: "a country's people moving out of the countryside and into cities",
        realWorld:
          "Some northern cities saw their Black population more than quadruple inside twenty years, and had built nothing to house anybody.",
        stretch: {
          q: "Is this the same kind of change?",
          options: [
            {
              text: "A new port opens and a fishing village becomes a city of ninety thousand.",
              ok: true,
              why: "Yes — the work moved, so the people moved to it. Same shape at a smaller size.",
            },
            {
              text: "A town builds a bigger school because it already has more children.",
              ok: false,
              why: "The people arrived first and the building followed. Here the work pulls the people.",
            },
          ],
        },
        bridge:
          "Hold that date — 1920. Nine years later the same factories did something else entirely, and this time it was what happened when they stopped.",
        nextLabel: "1929 →",
      },
      {
        id: "b2",
        title: "When the machines stop",
        tag: "1929–1933",
        imageKey: "beatRisk",
        situation:
          "A country of farmers can eat badly through a bad year. A country of wage-earners cannot: no wage means no food, and by 1932 a quarter of workers had no field to go back to. The orders had stopped coming in 1929.",
        ask: "You are the government in 1932. What do you do?",
        bestLead: "That is roughly what was chosen, starting in 1933.",
        choices: [
          {
            text: "Wait. It has always righted itself before.",
            whatIf:
              "It always had — while most people could retreat to a farm. That escape route was the thing the last thirty years had removed.",
          },
          {
            text: "Pay people to build things the country will still have afterwards.",
            best: true,
          },
          {
            text: "Send people back to the countryside.",
            whatIf:
              "Back to what? The same years brought the Dust Bowl. The farms were losing people, not taking them.",
          },
        ],
        did:
          "The government hired people directly — roads, dams, schools, post offices, bridges — and built the first national safety net underneath the wage, because the wage had turned out to be the only thing most families stood on.",
        ledgerLine: "It changed what could go wrong — and how far you fall when it does.",
        vocabTerm: "a depression",
        vocabMeaning: "a long stretch when work, spending and prices all fall together and keep falling",
        realWorld:
          "At the worst of it, roughly one American worker in four had no job at all.",
        stretch: {
          q: "Is this the same kind of change?",
          options: [
            {
              text: "A town where everyone works at one plant, and the plant closes.",
              ok: true,
              why: "Yes — the same trade, in miniature. Depending on one wage is efficient right up until it is not.",
            },
            {
              text: "A town hit by a flood.",
              ok: false,
              why: "Terrible, and it would have been just as terrible in 1850. This kind of change is about a new way to be in trouble.",
            },
          ],
        },
        bridge:
          "Then, eight years later, the orders came back all at once — and from the government, because the country was at war.",
        nextLabel: "1941 →",
      },
      {
        id: "b3",
        title: "Who the shortage let in",
        tag: "1941–1945",
        imageKey: "beatWho",
        situation:
          "The plants have to build more in four years than anyone built in the previous twenty. Sixteen million men are in uniform. The only people left to do the work are the people those plants had been turning away for forty years.",
        ask: "You run a war plant in 1942 and your line is half empty. What do you do?",
        bestLead: "That is what happened, and it is worth being exact about why.",
        choices: [
          {
            text: "Run fewer shifts until the men come home.",
            whatIf:
              "There is a war on and a delivery date attached to it. Nobody was going to be allowed to build half as much.",
          },
          {
            text: "Hire the women and the Black workers who have been applying for years.",
            best: true,
          },
          {
            text: "Raise the pay and see who turns up.",
            whatIf:
              "Pay does not conjure people out of nowhere. Every plant in the country was short at once, so raising pay mostly moved the same workers around.",
          },
        ],
        did:
          "They hired them. Not because anybody's mind had changed, but because the work had to be done and there was nobody else. A. Philip Randolph had threatened to march tens of thousands on Washington over exactly this; the President signed an order banning the exclusion six days before the march was due.",
        ledgerLine: "It changed who got to do the work — and who knew they could.",
        vocabTerm: "a labour shortage",
        vocabMeaning: "more work needing doing than there are people willing, or allowed, to do it",
        realWorld:
          "When the war ended, a great many of those workers were pushed straight back out again. They had four years of knowing they could do the job, and they did not forget it.",
        stretch: {
          q: "Is this the same kind of change?",
          options: [
            {
              text: "A hospital short of nurses starts training people it never used to consider.",
              ok: true,
              why: "Yes. A door opens because the work will not wait, which is not the same as the door being opened on purpose.",
            },
            {
              text: "A hospital decides its hiring rules were unfair and changes them.",
              ok: false,
              why: "Better, and a different story. That one starts with somebody deciding. This one starts with somebody having no choice.",
            },
          ],
        },
      },
    ],
  },

  synthesis: {
    title: "Three changes, one cause",
    orderTag: "Part 1 · What happened when",
    orderPrompt: "Three changes, out of order. Tap them in the order they arrived.",
    orderCards: [
      { id: "collapse", text: "A quarter of workers with no wage and nowhere to go back to" },
      { id: "shortage", text: "Plants hiring people they had turned away for forty years" },
      { id: "cities", text: "More Americans living in cities than outside them" },
    ],
    causeTag: "Part 2 · Why all three",
    // This is the phase that carries the HUB. A chain lesson asks "what caused
    // what"; a hub lesson has to ask "what did all of these come out of", which
    // is a different question and the only one that makes a hub make sense.
    causes: [
      {
        id: "c1",
        q: "Why did the Depression reach so many more people than earlier hard times had?",
        options: [
          {
            text: "Because by then most people lived on a wage instead of on land.",
            ok: true,
            why: "Yes. Earlier slumps were survived by retreating to a farm. By 1930 most families had no farm to retreat to.",
          },
          {
            text: "Because it lasted longer than earlier ones.",
            ok: false,
            why: "It did last longer. But length is what happened, not why it reached so far. Ask what people had underneath them.",
          },
          {
            text: "Because the population was bigger.",
            ok: false,
            why: "A bigger country means more people in any event. It does not explain why a larger share of them had nothing to fall back on.",
          },
        ],
      },
      {
        id: "c2",
        q: "What did the crowded cities, the crash and the wartime hiring all come out of?",
        options: [
          {
            text: "One thing: the country had moved its work into factories.",
            ok: true,
            why: "That is the whole idea of a hub. Not three things in a row — three things out of one.",
          },
          {
            text: "Each one caused the next one.",
            ok: false,
            why: "That is a chain, and it is the wrong shape here. The cities did not cause the crash, and the crash did not cause the war.",
          },
          {
            text: "Nothing in common — they are three separate stories.",
            ok: false,
            why: "They are usually taught that way. Look at what each beat's problem actually came out of, and the same answer turns up three times.",
          },
        ],
      },
    ],
    removeTag: "Part 3 · Take one away",
    removePrompt: "Three changes came out of one cause. Pull one out and see what is left.",
    removals: [
      {
        id: "where",
        label: "Suppose the factory jobs had stayed where the people already were",
        q: "What happens?",
        options: [
          { text: "The cities stay small, and most families still have land under them when the crash comes." },
          { text: "The Depression happens on schedule and hits just as hard." },
          { text: "The war is lost." },
        ],
      },
      {
        id: "risk",
        label: "Suppose most families still fed themselves off their own land in 1929",
        q: "What happens?",
        options: [
          { text: "It is a bad decade rather than a catastrophe — a lost wage is not a lost dinner." },
          { text: "Nothing changes. The banks fail either way." },
          { text: "The cities empty out completely and never refill." },
        ],
      },
      {
        id: "who",
        label: "Suppose the war had needed no more workers than peacetime did",
        q: "What happens?",
        options: [
          { text: "The doors stay shut longer, and a generation never finds out what it could have done." },
          { text: "The Depression never ends." },
          { text: "Nothing changes — those jobs were opening anyway." },
        ],
      },
    ],
    bigIdea:
      "These are not three chapters in a row. They are three doors out of one room. Ask of any big change in the last century what it did to where people live, to what can go wrong, and to who gets to work — and you will usually get three answers, not one.",
  },

  matchPairs: {
    title: "Why that happened",
    kidPrompt: "Tap something that happened, then what it came out of. One right card matches nothing.",
    helpWrong: "Not that one. Ask what had changed underneath.",
    helpPass: "All four. None of them said their answer out loud.",
    // Checked against the extended no-giveaway rule: no left item shares a
    // content word with its own right item.
    leftItems: [
      { id: "mp_cities", text: "Half the country living in towns it was not born in." },
      { id: "mp_bread", text: "Queues for free bread in cities that had none in 1925." },
      { id: "mp_women", text: "Women on assembly lines in 1943, turned away in 1938." },
      { id: "mp_south", text: "Trains north out of Mississippi, full, week after week." },
    ],
    rightItems: [
      { id: "r_moved", text: "Work had gone somewhere you had to travel to reach." },
      { id: "r_nofield", text: "When a wage stops there is nothing underneath it." },
      { id: "r_gone", text: "Sixteen million men were somewhere else." },
      { id: "r_friday", text: "Somewhere else was paying cash every Friday." },
      { id: "r_cheap", text: "A machine could make the same object for less." },
    ],
  },

  opsChoice: {
    title: "Mill Town Council, 1946",
    pickHeader: "Pick exactly 2",
    constraint: "One year, one budget. The council can do **two**. All three are real.",
    scenario: "The war work has stopped. Three people came to say what the town does now, and all three are right.",
    voices: [
      { id: "where", who: "Onnie, who came up in 1943", emoji: "🏘️", said: "Four families are in my sister's house. We came for the work and stayed. Nobody built anywhere for us." },
      { id: "risk", who: "Mr Kell, who ran the store through 1932", emoji: "🔒", said: "I watched this town starve once when one gate closed. Put something aside while there is something to put." },
      { id: "who", who: "Dorothy, on the line since 1942", emoji: "🔧", said: "I built bomber wings for three years. On Monday my bench goes to a man who has never seen one." },
    ],
    projects: [
      {
        id: "build_houses",
        label: "Build houses for the people who came for the war work",
        reason: "Where people live",
        shortReasonLabel: "Somewhere to live",
        reasonId: "where",
        sceneId: "houses",
        emoji: "🏘️",
        teks: true,
        improves: "Families stop living four to a house, and the town keeps its workers.",
      },
      {
        id: "town_fund",
        label: "Start a fund so the next shutdown does not empty the town",
        reason: "What can go wrong",
        shortReasonLabel: "A cushion",
        reasonId: "risk",
        sceneId: "fund",
        emoji: "🔒",
        teks: true,
        improves: "The next bad year is survivable instead of final.",
      },
      {
        id: "keep_hires",
        label: "Keep the wartime hires on the line instead of laying them off",
        reason: "Who does the work",
        shortReasonLabel: "Who stays",
        reasonId: "who",
        sceneId: "line",
        emoji: "🔧",
        teks: true,
        improves: "The people who learned the job in the war get to keep doing it.",
      },
    ],
    pickCount: 2,
    justificationChips: [
      "People have to live somewhere",
      "We have been caught out before",
      "They already know how to do the work",
      "The third can wait a year",
    ],
    justificationMode: "chipsOnly",
    deferredReasonChips: [
      { id: "where", label: "Housing is still waiting" },
      { id: "risk", label: "The fund is still waiting" },
      { id: "who", label: "The hires are still waiting" },
    ],
    deferredPrompt: "Which one is still waiting?",
    fundMeterLabel: "Budget — fill 2 slots",
    waitingLabel: "Still waiting this year",
    consequenceTitle: "What gets done vs. what waits",
    boardTitle: "THIS YEAR / NEXT YEAR",
    boardThisYearLabel: "THIS YEAR",
    boardNextYearLabel: "NEXT YEAR",
    nowSlotLabel: "NOW",
    nextSlotLabel: "WAITING",
    debriefSamLine: "Two done. One waits — and somebody in that room warned you.",
    distractorFailMessage: "All three are real here. Pick the two you can defend.",
    continueLabel: "Continue →",
    whosePrompt: "Whose warning came true?",
    whoseRight:
      "All three were right. Most real councils in 1946 chose the first two, and Dorothy's bench went to somebody else. That is not a trick — it is what happened almost everywhere.",
    whoseWrong: "Read what each of them said again. Somebody stood up and described exactly this.",
  },

  transfer: {
    title: "A Different Machine",
    kidPrompt: "One invention, forty years later. Tap the **two things** that show what it changed most.",
    // ART NEEDED: runs as word chips until a scene exists.
    imageAlt: "New houses, an emptied shopping street, a road sign, a girl with keys, a hood ornament",
    spots: [
      { id: "suburb", label: "A street of new houses ten miles from any job", x: 13, y: 60 },
      { id: "mainst", label: "A shopping street that emptied when the highway opened", x: 34, y: 54 },
      { id: "deaths", label: "Tens of thousands of deaths a year nobody used to plan for", x: 55, y: 62 },
      { id: "teen", label: "A sixteen-year-old who can be somewhere her parents are not", x: 77, y: 56 },
      { id: "ornament", label: "A chrome hood ornament in a museum case", x: 93, y: 44 },
    ],
    tapCount: 2,
    claimFrame: "What the car changed most was…",
    claimOptions: [
      { id: "where", label: "where people lived" },
      { id: "risk", label: "what could go wrong" },
      { id: "who", label: "who got to do things" },
    ],
    submitLabel: "Send my proof to HQ",
  },

  clearance: {
    hqTitle: "HQ Clearance Check",
    hqIntro: "Your gates are ticked from work you already did. Five questions and you are cleared.",
    progressGates: [
      { id: "opening", label: "Guess locked" },
      { id: "teach", label: "Three changes" },
      { id: "together", label: "One cause" },
      { id: "sort", label: "Four matched" },
      { id: "newtown", label: "A different machine" },
    ],
    // Distractors are mistakes fifth graders actually make: that three big
    // events in a row must have caused each other, that the Depression was
    // simply a bigger version of earlier slumps, and that the wartime hiring
    // happened because attitudes changed.
    items: [
      {
        id: "c1",
        type: "multi",
        prompt: "How were the crowded cities, the Depression and the wartime hiring related?",
        choices: [
          { id: "a", text: "All three came out of the same change." },
          { id: "b", text: "Each one directly caused the next one in order." },
          { id: "c", text: "They were three separate things with nothing in common." },
          { id: "d", text: "The Depression caused both of the other two things." },
        ],
      },
      {
        id: "c2",
        type: "single",
        prompt: "Why did losing a job in 1932 hurt more than losing one in 1892?",
        choices: [
          { id: "a", text: "Far fewer families still had land to fall back on." },
          { id: "b", text: "Wages in 1932 were much lower than wages in 1892." },
          { id: "c", text: "There were more people living in America by then." },
        ],
      },
      {
        id: "c3",
        type: "single",
        prompt: "War plants in 1942 hired women and Black workers they had turned away before. Why then?",
        choices: [
          { id: "a", text: "The work had to be done and there was nobody else." },
          { id: "b", text: "The owners had changed their minds about who could do it." },
          { id: "c", text: "A law had been passed making the old rules illegal everywhere." },
        ],
      },
      {
        id: "c4",
        type: "single",
        prompt: "A new invention arrives. Which question would tell you most about how far it will reach?",
        choices: [
          { id: "a", text: "Does it change where people have to be?" },
          { id: "b", text: "How much does one of them cost to buy?" },
          { id: "c", text: "Which country was it first invented in?" },
        ],
      },
      {
        id: "c5",
        type: "keepClaim",
        // No answer key. Which of the three changes mattered most is a real
        // historical argument and it goes to the teacher. Only whether the
        // sentence holds together is checked.
        prompt: "Three changes came out of one cause. Historians do not agree about which one mattered most.",
        keepFrame: "I think the biggest was ______, because ______.",
        keepOptions: [
          { id: "where", label: "where people lived" },
          { id: "risk", label: "what could go wrong" },
          { id: "who", label: "who got to do the work" },
        ],
        becauseOptions: [
          { id: "where", label: "it decided what the whole country looked like afterwards" },
          { id: "risk", label: "it changed what happens to a family on its worst day" },
          { id: "who", label: "it changed who was allowed to try in the first place" },
          { id: "none", label: "none of them really changed anything much" },
        ],
      },
    ],
    selfCheck: [],
    selfCheckRequired: 0,
    requireProgressGates: true,
    requireAllAnswers: true,
    clearedMessage: "Briefing cleared: One Machine, Three Changes. Take your card with you.",
    challengeCta: "Ask your teacher when you are ready for a Challenge",
    postcardReceivedLabel: "HQ received · your claim card",
    exitCard: {
      enabled: true,
      tag: "Take this with you",
      forTeacher:
        "For the wall. The class will not agree on which change was biggest, and the disagreement is the point — it is the same argument historians have about the whole century.",
    },
  },
};
