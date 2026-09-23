// Safe to import from client components.
// Assembly Deck — 4.12B-AD. TEKS 4.12B — matter and energy in food webs.

export const PUBLIC_CASE = {
  standard: "4.12B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Science",
  title: "When the Owls Left",
  estimatedMinutes: 20,
  brief: [
    "A meadow web was steady. Then the owls left.",
    "The Sun feeds the grass. Mice eat the grass. Owls eat the mice. Mushrooms break down what dies.",
    "Build the log. Show the web before, what shifted, and what the counts do next.",
  ],
  source: {
    title: "MEADOW COUNTS",
    lines: [
      "Grass is the producer. It makes food using sunlight.",
      "Mice eat the grass. Owls eat the mice. Both are consumers.",
      "Mushrooms break down dead plants and animals. They are the decomposers.",
      "After the owls left, the mouse count rose and the grass was eaten shorter.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "The web before",
      goal: "Build the paragraph that names each role in the web.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Who makes food, and who eats", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Who returns matter when things die", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "Before the owls left, the meadow had a full web." },
        { id: "r1p2", text: "Grass makes food from sunlight, so the grass is the producer." },
        { id: "r1p3", text: "Mice eat the grass, and owls eat the mice. They are consumers." },
        { id: "r1p4", text: "Mushrooms break down the dead material, so matter can be used again." },
        { id: "r1p5", text: "Owls are the best animal because they look serious." },
        { id: "r1p6", text: "The mice make the food from sunlight." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What shifted",
      goal: "Build the paragraph that says what changed when the owls left.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Which animal left, and which count rose", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What that did to the energy path", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "One consumer leaving changed the rest of the web." },
        { id: "r2p2", text: "The owls left the meadow." },
        { id: "r2p3", text: "With nothing eating them, the mouse count rose." },
        { id: "r2p4", text: "Energy that used to move on to the owls now stayed with the mice." },
        { id: "r2p5", text: "Owls are useless, so the web is better without them." },
        { id: "r2p6", text: "The arrows run from the owls to the grass to the Sun." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What the numbers do next",
      goal: "Build the paragraph that says what the counts show after the shift.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The mice, and the grass", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the web still depends on", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The counts after the owls left tell the next part of the story." },
        { id: "r3p2", text: "More mice are eating the grass." },
        { id: "r3p3", text: "The grass is shorter because it is being eaten faster." },
        { id: "r3p4", text: "The web still depends on the producer. If the grass fails, the mice lose their food too." },
        { id: "r3p5", text: "The Sun stopped shining because the owls left." },
        { id: "r3p6", text: "A forest on another planet lost its wolves, so this meadow will too." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should the crew read them in?",
    hint: "A reader needs the web, then the change, before the new counts make sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says what the producer does. Tap that sentence.",
      hint: "Look in the paragraph about the web before the owls left.",
    },
    quickCheck: {
      prompt: "In this meadow, which organism is the producer?",
      choices: [
        { id: "a", text: "The grass, because it makes food from sunlight" },
        { id: "b", text: "The owl, because it is at the end" },
        { id: "c", text: "The mouse, because there are more of them now" },
        { id: "d", text: "The mushroom, because it breaks things down" },
      ],
    },
  },
  explain: {
    prompt: "Chief Okafor has one more question. How does energy move through this web, and what changed when the owls left?",
    starters: ["Energy in this meadow starts with", "The grass", "When the owls left,", "That meant"],
    checks: [
      "I answered both parts of the question.",
      "I said where the energy starts.",
      "I said what changed after the owls left.",
      "I named a producer or a consumer.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say the grass makes food from sunlight, or that energy starts with the Sun and the producer.",
      "Say mice eat grass and owls eat mice.",
      "Say that after the owls left, mice increased and the grass was eaten down.",
    ],
  },
  chain: {
    title: "Meadow web",
    sourceId: "sun",
    cutId: "grass",
    cutDark: ["mice", "owls"],
    breakOn: "r3",
    stayOn: ["sun", "grass"],
    breakLine: "The owl link is open. The mice rise. The grass is eaten down.",
    cutting: "Cutting the grass…",
    cutDone: "Grass gone. Mice dark. Owls dark.",
    liveLine: "The line is live. Mark who loses food if the grass is gone.",
    fillLine: "The web fills in as each paragraph locks.",
    links: [
      { id: "sun", label: "Sun", mark: "☀️", on: "r1" },
      { id: "grass", label: "Grass", mark: "🌿", on: "r1", breakLabel: "Eaten down" },
      { id: "mice", label: "Mice", mark: "🐭", on: "r2", breakLabel: "More" },
      { id: "owls", label: "Owls", mark: "🦉", on: "r2", breakLabel: "Left" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Cut the grass. Who loses the food?",
    hint: "Mark the parts you think go dark. Then cut the grass.",
    switch: "Cut the grass",
    choices: [
      { id: "a", text: "The mice and the owls", marks: ["mice", "owls"] },
      { id: "b", text: "Only the owls", marks: ["owls"] },
      { id: "c", text: "Nobody. The Sun feeds the animals directly.", nobody: true },
      { id: "d", text: "Only the mice", marks: ["mice"] },
    ],
  },
  look: {
    prompt: "Look at the meadow line. Which sentence matches the picture?",
    image: "/student/web_line.jpg",
    choices: [
      { id: "web", text: "Energy moves from the Sun to the grass, then to the mouse, then to the owl." },
      { id: "back", text: "Energy moves from the owl back to the Sun." },
      { id: "best", text: "Owls are the best animal, so they start the web." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p6", prompt: "Look at the meadow line. Which sentence matches the picture?" },
  board: null,
};
