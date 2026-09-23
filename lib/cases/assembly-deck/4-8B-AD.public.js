// Safe to import from client components.
// Assembly Deck — 4.8B-AD. TEKS 4.8B — conductors and insulators of thermal and electrical energy.

export const PUBLIC_CASE = {
  standard: "4.8B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Science",
  title: "The Cold Lunchbox Job",
  estimatedMinutes: 20,
  brief: [
    "The crew needs a lunch box that keeps food cold. They tested four materials for two hours with the same ice pack.",
    "Metal let the heat in fastest. Foam slowed the heat the most.",
    "Build the log from the data. A favorite brand is not evidence.",
  ],
  source: {
    title: "LUNCH TEST NOTES",
    lines: [
      "Each box started with the same ice pack. The test lasted two hours.",
      "Metal box: ice melted. Lunch measured 18°C.",
      "Foam box: ice was still mostly solid. Lunch measured 6°C.",
      "Cloth wrap: 14°C. Plain plastic box: 10°C.",
      "Metal also carries electrical energy. Foam and plastic do not.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What was tested",
      goal: "Build the paragraph that says how the test was set up.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "What was the same, and how long it ran", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the test was trying to find", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The crew tested which material slows heat the best." },
        { id: "r1p2", text: "Every box started with the same ice pack." },
        { id: "r1p3", text: "Each test ran for two hours." },
        { id: "r1p4", text: "A fair test can be compared, because only the material changed." },
        { id: "r1p5", text: "The shiny brand is the best because it looks expensive." },
        { id: "r1p6", text: "The test measured magnetism, not temperature." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What the temperatures show",
      goal: "Build the paragraph that reports the results.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The warmest result and the coldest result", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Which material let heat through, and which blocked it", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The temperatures did not all end in the same place." },
        { id: "r2p2", text: "The metal box ended at 18°C, and the ice had melted." },
        { id: "r2p3", text: "The foam box ended at 6°C, and the ice was still mostly solid." },
        { id: "r2p4", text: "Metal conducted the heat. Foam insulated against it." },
        { id: "r2p5", text: "Foam ended warmer than metal." },
        { id: "r2p6", text: "A magnet stuck to the foam, so foam is a conductor." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "Which material to buy",
      goal: "Build the paragraph that chooses a material and says what it does with electricity too.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The lunch choice, and the electrical fact", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Why one word fits heat and the other fits the wire", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The buy decision should follow the coldest lunch, not a slogan." },
        { id: "r3p2", text: "Foam kept the lunch coldest, so foam is the insulator to buy." },
        { id: "r3p3", text: "Metal would be a poor lunch box, but it does conduct electrical energy." },
        { id: "r3p4", text: "Use the insulator where you want heat or electricity stopped, and the conductor where you want electricity to travel." },
        { id: "r3p5", text: "Buy the metal box because metal is popular." },
        { id: "r3p6", text: "Foam is the best choice for an electrical wire." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should the crew read them in?",
    hint: "A reader needs the test, then the numbers, before a buying choice makes sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says which material insulated against the heat. Tap that sentence.",
      hint: "Look in the paragraph about the temperatures.",
    },
    quickCheck: {
      prompt: "Which material was the thermal insulator in this test?",
      choices: [
        { id: "a", text: "Foam, because the lunch stayed coldest" },
        { id: "b", text: "Metal, because the ice melted" },
        { id: "c", text: "The shiny brand, because it looks expensive" },
        { id: "d", text: "Cloth, because 14°C is colder than 6°C" },
      ],
    },
  },
  explain: {
    prompt: "The crew has one more question. Which material kept the heat out, and why would you not use that same material for an electrical wire?",
    starters: ["The test showed", "Foam", "Metal", "I would not use foam for a wire because"],
    checks: [
      "I answered both parts of the question.",
      "I said which material slowed the heat.",
      "I said something about electrical energy.",
      "I used the temperatures.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say foam kept the lunch coldest, or insulated against heat.",
      "Say metal let the heat in, or conducted heat.",
      "Say metal conducts electrical energy, so foam is the wrong choice for a wire.",
    ],
  },
  chain: {
    title: "Lunch line",
    sourceId: "heat",
    cutId: "foam",
    cutDark: ["lunch"],
    stayOn: ["heat", "metal"],
    cutting: "Taking the foam out of the line…",
    cutDone: "Foam gone. The cold lunch goes dark.",
    liveLine: "The line is live. Mark what fails if the foam is gone.",
    fillLine: "The lunch line fills in as each paragraph locks.",
    links: [
      { id: "heat", label: "Heat", mark: "🔆", on: "r1" },
      { id: "metal", label: "Metal", mark: "🔩", on: "r1" },
      { id: "foam", label: "Foam", mark: "🧊", on: "r2" },
      { id: "lunch", label: "Cold lunch", mark: "🥪", on: "r3" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Remove the foam. What fails?",
    hint: "Mark the part you think goes dark. Then remove the foam.",
    switch: "Remove the foam",
    choices: [
      { id: "a", text: "The cold lunch", marks: ["lunch"] },
      { id: "b", text: "The heat outside", marks: ["heat"] },
      { id: "c", text: "Nobody. Metal and foam act the same.", nobody: true },
      { id: "d", text: "The metal box", marks: ["metal"] },
    ],
  },
  look: {
    prompt: "Look at the lunch line. Which sentence matches the picture?",
    image: "/student/lunch_line.jpg",
    choices: [
      { id: "foam", text: "Foam stands between the heat and a lunch that stays cold." },
      { id: "brand", text: "The expensive-looking box is coldest because it is shiny." },
      { id: "magnet", text: "The foam is a magnet, so it conducts heat." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p6", prompt: "Look at the lunch line. Which sentence matches the picture?" },
  board: null,
};
