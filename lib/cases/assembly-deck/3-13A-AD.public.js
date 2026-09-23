// Safe to import from client components.
// Assembly Deck — 3.13A-AD. TEKS 3.13A — structures that help an animal survive.

export const PUBLIC_CASE = {
  standard: "3.13A-AD",
  mode: "paragraph",
  grade: 3,
  subject: "Science",
  title: "Built for This",
  estimatedMinutes: 20,
  brief: [
    "A desert fox has ears that look too big. The crew thinks the ears are not for show.",
    "Chief Okafor wants a log: where the fox lives, what the ears are, and what they do.",
    "Build each paragraph from the notes. A cute guess does not count.",
  ],
  source: {
    title: "FIELD NOTES",
    lines: [
      "The fox lives in a hot desert with little shade.",
      "Its ears are very large compared with its head.",
      "Heat leaves the body through those big ears.",
      "That helps the fox stay cool where the sun is strong.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "Where the fox lives",
      goal: "Build the paragraph that says what the habitat is like.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two facts about the place", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What problem that place gives the fox", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "This fox lives where the sun is hard to escape." },
        { id: "r1p2", text: "The habitat is a hot desert." },
        { id: "r1p3", text: "There is little shade to sit in." },
        { id: "r1p4", text: "The fox needs a way to lose heat." },
        { id: "r1p5", text: "Deserts are the prettiest places on the station." },
        { id: "r1p6", text: "The fox lives in a cool forest full of shade." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "The structure",
      goal: "Build the paragraph that names the body part and what is special about it.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The body part, and what it is like", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Name the structure in one line", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "One body part stands out on this fox." },
        { id: "r2p2", text: "The ears are very large." },
        { id: "r2p3", text: "They are large compared with the fox's head." },
        { id: "r2p4", text: "Those big ears are the structure this log is about." },
        { id: "r2p5", text: "The fox stays cool by drinking cactus milk all day." },
        { id: "r2p6", text: "Big ears are cuter than small ears, so the fox wins." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What the ears are for",
      goal: "Build the paragraph that says how the structure helps the fox survive.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "What the ears do", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Why that matters in this habitat", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The big ears do a job. They are not just for looks." },
        { id: "r3p2", text: "Heat leaves the body through the ears." },
        { id: "r3p3", text: "Losing heat helps the fox stay cool." },
        { id: "r3p4", text: "That structure fits a hot place with little shade." },
        { id: "r3p5", text: "The ears are huge so other foxes will think it is brave." },
        { id: "r3p6", text: "The ears trap heat and make the fox warmer." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should Chief Okafor read them in?",
    hint: "A reader needs the place, then the body part, before the job makes sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says how the ears help the fox survive. Tap that sentence.",
      hint: "Look in the paragraph about what the ears are for.",
    },
    quickCheck: {
      prompt: "What do the fox's big ears do?",
      choices: [
        { id: "a", text: "They let heat leave so the fox can stay cool" },
        { id: "b", text: "They make the fox look brave" },
        { id: "c", text: "They trap heat and warm the fox up" },
        { id: "d", text: "They help the fox drink cactus milk" },
      ],
    },
  },
  explain: {
    prompt: "Chief Okafor has one more question. Where does this fox live, and how do its ears help it survive there?",
    starters: [
      "This fox lives",
      "Its ears",
      "Heat",
      "That helps because",
    ],
    checks: [
      "I answered both parts of the question.",
      "I said where the fox lives.",
      "I said what the ears do.",
      "I used details from the notes.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say the fox lives in a hot desert.",
      "Say the ears are large.",
      "Say heat leaves through the ears so the fox stays cool.",
    ],
  },
  chain: {
    title: "Desert fox",
    sourceId: "desert",
    cutId: "ears",
    stayOn: ["desert"],
    cutting: "Taking the big ears out of the line…",
    cutDone: "Ears gone. The heat path and the cool fox go dark.",
    liveLine: "The line is live. Mark what fails if the big ears are gone.",
    fillLine: "The fox line fills in as each paragraph locks.",
    links: [
      { id: "desert", label: "Desert", mark: "🏜️", on: "r1" },
      { id: "ears", label: "Big ears", mark: "👂", on: "r2" },
      { id: "heat", label: "Heat out", mark: "♨️", on: "r2" },
      { id: "fox", label: "Stays cool", mark: "🦊", on: "r3" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Take away the big ears. What fails?",
    hint: "Mark the parts you think go dark. Then cut the ears.",
    switch: "Cut the big ears",
    choices: [
      { id: "a", text: "The heat path and staying cool", marks: ["heat", "fox"] },
      { id: "b", text: "Only the desert", marks: ["desert"] },
      { id: "c", text: "Nobody. Cute ears are not a real structure.", nobody: true },
      { id: "d", text: "Only the heat path", marks: ["heat"] },
    ],
  },
  look: {
    prompt: "Look at the fox line. Which sentence matches the picture?",
    image: "/student/fox_line.jpg",
    choices: [
      { id: "ears", text: "Big ears let heat leave, so the fox can stay cool." },
      { id: "cute", text: "The fox stays cool because it is the cutest." },
      { id: "milk", text: "The fox drinks cactus milk all day." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p5", prompt: "Look at the fox line. Which sentence matches the picture?" },
  board: null,
};
