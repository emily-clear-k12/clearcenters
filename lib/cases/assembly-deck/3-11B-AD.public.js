// Safe to import from client components.
// Assembly Deck — 3.11B-AD. TEKS 3.11B — conservation of natural resources.

export const PUBLIC_CASE = {
  standard: "3.11B-AD",
  mode: "paragraph",
  grade: 3,
  subject: "Science",
  title: "The Water Bill",
  estimatedMinutes: 20,
  brief: [
    "The school water bill jumped. The custodian wants the facts before the principal starts guessing.",
    "A hose by the garden was left running. The fountain was already off.",
    "Build each paragraph from the notes. Then say what to shut off first.",
  ],
  source: {
    title: "THE CUSTODIAN'S NOTES",
    lines: [
      "Last month the meter read 40 units. This month it reads 90.",
      "The garden hose was left running all week.",
      "The fountain switch was off. The bathrooms looked the same as always.",
      "Shutting the hose would stop the biggest waste right now.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What the meter shows",
      goal: "Build the paragraph that says what the meter actually did.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two facts the custodian wrote", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the numbers add up to", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The school used much more water this month." },
        { id: "r1p2", text: "The meter went from 40 units to 90 units." },
        { id: "r1p3", text: "That is more than twice as much water." },
        { id: "r1p4", text: "The bill jumped because the school used more, not because the meter is broken." },
        { id: "r1p5", text: "The kids are careless and do not care about the school." },
        { id: "r1p6", text: "The meter went down, so the school saved water." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "Where the water went",
      goal: "Build the paragraph that says which use matches the notes.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "What was on, and what was off", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "So where did the extra water go?", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The extra water has a place the notes can point to." },
        { id: "r2p2", text: "The garden hose ran all week." },
        { id: "r2p3", text: "The fountain was off, and the bathrooms looked normal." },
        { id: "r2p4", text: "The running hose is the use that matches the bigger bill." },
        { id: "r2p5", text: "A secret pool under the gym used the water." },
        { id: "r2p6", text: "The class also recycled thirty cans last Friday." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What to change first",
      goal: "Build the paragraph that says which fix saves the most water now.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "The fix, and why it is first", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the crew should do", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The first fix is the one that stops the biggest waste." },
        { id: "r3p2", text: "Shut the hose that was left running." },
        { id: "r3p3", text: "The fountain is already off, so it is not the first problem." },
        { id: "r3p4", text: "Check the meter again after the hose is off." },
        { id: "r3p5", text: "The principal should yell at every class." },
        { id: "r3p6", text: "The bathrooms used more water than the hose." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should the custodian read them in?",
    hint: "A reader has to know one part before the next part makes sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says the school used more water. Tap that sentence.",
      hint: "Look in the paragraph about the meter.",
    },
    quickCheck: {
      prompt: "What should the school shut off first?",
      choices: [
        { id: "a", text: "The hose that was left running" },
        { id: "b", text: "The fountain that is already off" },
        { id: "c", text: "The bathrooms, which looked normal" },
        { id: "d", text: "Nothing. The meter went down." },
      ],
    },
  },
  explain: {
    prompt: "The custodian has one more question. Why did the water bill jump, and what should the school change first?",
    starters: [
      "The water bill jumped because",
      "The meter",
      "The hose",
      "The first change is",
    ],
    checks: [
      "I answered both parts of the question.",
      "I said what the meter showed.",
      "I said what to change first.",
      "I used details from the notes.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say the meter went up, from 40 to 90.",
      "Say the hose was left running.",
      "Say to shut the hose first.",
    ],
  },
  chain: {
    title: "School water",
    sourceId: "meter",
    cutId: "hose",
    breakOn: "r3",
    stayOn: ["meter"],
    breakLine: "The hose is shut. The garden stops flooding. The puddle is gone.",
    cutting: "Shutting the hose…",
    cutDone: "Hose shut. The garden and the puddle go dark.",
    liveLine: "The line is live. Mark what loses the extra water.",
    fillLine: "The water line fills in as each paragraph locks.",
    links: [
      { id: "meter", label: "Meter", mark: "⏱️", on: "r1" },
      { id: "hose", label: "Hose", mark: "💧", on: "r1", breakLabel: "Shut" },
      { id: "garden", label: "Garden", mark: "🌱", on: "r2", breakLabel: "Not flooded" },
      { id: "puddle", label: "Puddle", mark: "🫧", on: "r2", breakLabel: "Gone" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Shut the hose. What loses the extra water?",
    hint: "Mark the parts you think go dark. Then shut the hose.",
    switch: "Shut the hose",
    choices: [
      { id: "a", text: "The garden and the puddle", marks: ["garden", "puddle"] },
      { id: "b", text: "Only the puddle", marks: ["puddle"] },
      { id: "c", text: "Nobody. The meter still pours it out.", nobody: true },
      { id: "d", text: "Only the garden", marks: ["garden"] },
    ],
  },
  look: {
    prompt: "Look at the water line. Which sentence matches the picture?",
    image: "/student/water_line.jpg",
    choices: [
      { id: "hose", text: "A running hose soaks the garden and leaves a puddle." },
      { id: "fountain", text: "A fountain used most of the extra water." },
      { id: "guilt", text: "The school is bad because kids do not care." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p5", prompt: "Look at the water line. Which sentence matches the picture?" },
  board: null,
};
