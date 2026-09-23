// Safe to import from client components.
// Assembly Deck — 3.10C-AD. TEKS 3.10C — rapid changes to Earth's surface.

export const PUBLIC_CASE = {
  standard: "3.10C-AD",
  mode: "paragraph",
  grade: 3,
  subject: "Science",
  title: "The Road That Moved",
  estimatedMinutes: 20,
  brief: [
    "On Monday the hill sat above the road. On Wednesday the hillside was on the road.",
    "A heavy rain fell Tuesday night. The hill had also been crumbling slowly for years.",
    "Build the log. Say what changed, how fast, and which change did not move the road by itself.",
  ],
  source: {
    title: "ROAD CREW NOTES",
    lines: [
      "Monday: the hill was still above the road.",
      "Tuesday night: a heavy rain fell for hours.",
      "Wednesday morning: a landslide covered part of the road. It happened in one night.",
      "The same hill had been slowly crumbling for years. That slow change did not move the road by itself.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What changed",
      goal: "Build the paragraph that says how the land looked before and after.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Before, and after", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Name the change", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The land by the road did not look the same on Wednesday." },
        { id: "r1p2", text: "On Monday the hill was still above the road." },
        { id: "r1p3", text: "On Wednesday part of the hillside covered the road." },
        { id: "r1p4", text: "A landslide moved the hillside onto the road." },
        { id: "r1p5", text: "Landslides are the scariest thing that can happen." },
        { id: "r1p6", text: "The hill never moved, and the road stayed clear." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "How fast it happened",
      goal: "Build the paragraph that says this was a rapid change.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The rain, and the time", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Was this fast or slow?", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "This change did not take years." },
        { id: "r2p2", text: "A heavy rain fell on Tuesday night." },
        { id: "r2p3", text: "By Wednesday morning the dirt was on the road." },
        { id: "r2p4", text: "The landslide was a rapid change. It happened in one night." },
        { id: "r2p5", text: "A volcano under the road caused the slide." },
        { id: "r2p6", text: "The slide took one hundred years to cross the road." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "The slow change too",
      goal: "Build the paragraph that says which change was slow, and what it did not do alone.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The slow change, and its limit", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Put the fast change and the slow change together", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "A slower change was happening on the same hill." },
        { id: "r3p2", text: "The hill had been crumbling a little for years." },
        { id: "r3p3", text: "That slow crumbling did not move the road by itself." },
        { id: "r3p4", text: "The rapid slide, after the heavy rain, is what covered the road." },
        { id: "r3p5", text: "People should be afraid to drive anywhere now." },
        { id: "r3p6", text: "The slow crumbling is what dumped the hillside in one night." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should the road crew read them in?",
    hint: "A reader needs to know what changed before how fast, and the slow change last.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says the landslide was fast. Tap that sentence.",
      hint: "Look in the paragraph about how long it took.",
    },
    quickCheck: {
      prompt: "Which change covered the road in one night?",
      choices: [
        { id: "a", text: "The landslide after the heavy rain" },
        { id: "b", text: "The slow crumbling by itself" },
        { id: "c", text: "A volcano under the road" },
        { id: "d", text: "Nothing. The hill never moved." },
      ],
    },
  },
  explain: {
    prompt: "The road crew has one more question. What changed the land so fast, and what slow change was happening too?",
    starters: [
      "The land changed when",
      "It happened",
      "The heavy rain",
      "The slow change",
    ],
    checks: [
      "I answered both parts of the question.",
      "I said what moved onto the road.",
      "I said the slide was fast.",
      "I used details from the notes.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say a landslide covered part of the road.",
      "Say it happened in one night, after heavy rain.",
      "Say the hill had also been crumbling slowly, and that alone did not move the road.",
    ],
  },
  chain: {
    title: "The hillside",
    sourceId: "rain",
    cutId: "rain",
    cutDark: ["soil", "road"],
    stayOn: ["hill"],
    cutting: "Taking the heavy rain out…",
    cutDone: "No heavy rain. The sliding soil and the covered road go dark.",
    liveLine: "The line is live. Mark what stays put without that rain.",
    fillLine: "The hillside line fills in as each paragraph locks.",
    links: [
      { id: "rain", label: "Heavy rain", mark: "🌧️", on: "r2" },
      { id: "hill", label: "Hill", mark: "⛰️", on: "r1" },
      { id: "soil", label: "Sliding soil", mark: "🟫", on: "r2" },
      { id: "road", label: "Road", mark: "🛣️", on: "r3" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Take away the heavy rain. What does not happen?",
    hint: "Mark the parts you think go dark. Then cut the rain.",
    switch: "Cut the heavy rain",
    choices: [
      { id: "a", text: "The sliding soil and the covered road", marks: ["soil", "road"] },
      { id: "b", text: "The hill disappears", marks: ["hill"] },
      { id: "c", text: "Nobody. The slow crumbling still dumps the road overnight.", nobody: true },
      { id: "d", text: "Only the road", marks: ["road"] },
    ],
  },
  look: {
    prompt: "Look at the hillside line. Which sentence matches the picture?",
    image: "/student/slide_line.jpg",
    choices: [
      { id: "slide", text: "Heavy rain sent soil from the hill onto the road." },
      { id: "scare", text: "The road moved because people were scared." },
      { id: "years", text: "The slide took one hundred years." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p5", prompt: "Look at the hillside line. Which sentence matches the picture?" },
  board: null,
};
