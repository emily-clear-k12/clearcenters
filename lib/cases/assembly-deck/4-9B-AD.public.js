// Safe to import from client components.
// Assembly Deck — 4.9B-AD. TEKS 4.9B — patterns in the observable appearance of the Moon.

export const PUBLIC_CASE = {
  standard: "4.9B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Science",
  title: "Twenty-Eight Nights",
  estimatedMinutes: 20,
  brief: [
    "A cadet sketched the Moon every night for four weeks. The shape changed, then it came back.",
    "Chief Okafor wants the pattern, not a story about luck.",
    "Build the log from the sketches. Then say what the next week should look like.",
  ],
  source: {
    title: "MOON SKETCH LOG",
    lines: [
      "Night 1: a thin crescent.",
      "Night 7: about half of the Moon was lit.",
      "Night 14: the Moon was full.",
      "Night 21: about half was lit again, on the other side.",
      "Night 28: a thin crescent, like night 1. The change took about 28 days.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What was recorded",
      goal: "Build the paragraph that reports the sketches.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two sketches from the log", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the set of sketches is", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The cadet recorded how the Moon looked from Earth." },
        { id: "r1p2", text: "Night 1 was a thin crescent, and night 7 was about half lit." },
        { id: "r1p3", text: "Night 14 was full, and night 28 was a thin crescent again." },
        { id: "r1p4", text: "The log is a sequence of observations, not a guess." },
        { id: "r1p5", text: "A full Moon means the week will be lucky." },
        { id: "r1p6", text: "The Moon stayed full for all 28 nights." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "The pattern",
      goal: "Build the paragraph that names the repeating pattern.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "How the shape changed, and how long it took", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Name the pattern", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The sketches are not a random set of shapes." },
        { id: "r2p2", text: "The lit part grew from a crescent to half to full, then shrank." },
        { id: "r2p3", text: "The same thin crescent was back after about 28 days." },
        { id: "r2p4", text: "The Moon's appearance follows a pattern that repeats about every 28 days." },
        { id: "r2p5", text: "An eclipse happens every night, and that is this pattern." },
        { id: "r2p6", text: "The Moon got smaller in the sky, so the pattern is about size, not light." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What it predicts",
      goal: "Build the paragraph that uses the pattern to predict the next week.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Where the cycle is now, and what came next last time", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "The prediction", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "A repeating pattern can predict the next look." },
        { id: "r3p2", text: "Night 28 matched night 1, so a new cycle has started." },
        { id: "r3p3", text: "Last time, the week after a thin crescent moved toward half lit." },
        { id: "r3p4", text: "Next week the Moon should look more lit than the thin crescent, not suddenly full forever." },
        { id: "r3p5", text: "The Moon will disappear if someone makes a wish." },
        { id: "r3p6", text: "The pattern says the Moon will stay a thin crescent for the rest of the year." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should Chief Okafor read them in?",
    hint: "A reader needs the sketches, then the pattern, before a prediction makes sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says the Moon's look repeats. Tap that sentence.",
      hint: "Look in the paragraph about the pattern.",
    },
    quickCheck: {
      prompt: "About how long did this Moon pattern take to repeat?",
      choices: [
        { id: "a", text: "About 28 days" },
        { id: "b", text: "One night" },
        { id: "c", text: "A whole year of thin crescents" },
        { id: "d", text: "It does not repeat. Each full Moon is luck." },
      ],
    },
  },
  explain: {
    prompt: "Chief Okafor has one more question. What pattern did the sketches show, and what should the Moon look like next week?",
    starters: ["The sketches show", "The lit part", "The pattern took", "Next week"],
    checks: [
      "I answered both parts of the question.",
      "I described the pattern.",
      "I made a prediction for next week.",
      "I used the sketch log.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say the lit part grew and then shrank, or name crescent, half, and full.",
      "Say the pattern took about 28 days.",
      "Say next week should be more lit than the thin crescent, moving toward half.",
    ],
  },
  chain: {
    title: "Moon line",
    sourceId: "crescent",
    cutId: "full",
    cutDark: ["later"],
    stayOn: ["crescent", "half"],
    cutting: "Covering the full Moon…",
    cutDone: "Full Moon covered. The later prediction goes dark.",
    liveLine: "The line is live. Mark what loses its evidence if the full Moon is covered.",
    fillLine: "The Moon line fills in as each paragraph locks.",
    links: [
      { id: "crescent", label: "Crescent", mark: "🌙", on: "r1" },
      { id: "half", label: "Half", mark: "🌓", on: "r1" },
      { id: "full", label: "Full", mark: "🌕", on: "r2" },
      { id: "later", label: "Later", mark: "🌗", on: "r3" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Cover the full Moon. Which part loses its evidence?",
    hint: "Mark the part you think goes dark. Then cover the full Moon.",
    switch: "Cover the full Moon",
    choices: [
      { id: "a", text: "The later shape in the pattern", marks: ["later"] },
      { id: "b", text: "The first crescent", marks: ["crescent"] },
      { id: "c", text: "Nobody. One full Moon means it stays full.", nobody: true },
      { id: "d", text: "The half-lit Moon", marks: ["half"] },
    ],
  },
  look: {
    prompt: "Look at the Moon line. Which sentence matches the picture?",
    image: "/student/moon_line.jpg",
    choices: [
      { id: "pattern", text: "The lit part grows from a crescent to half to full, then changes again." },
      { id: "luck", text: "A full Moon means the week will be lucky." },
      { id: "stuck", text: "The Moon stays full in every sketch." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p5", prompt: "Look at the Moon line. Which sentence matches the picture?" },
  board: null,
};
