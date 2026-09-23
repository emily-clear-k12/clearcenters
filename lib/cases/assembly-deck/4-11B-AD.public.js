// Safe to import from client components.
// Assembly Deck — 4.11B-AD. TEKS 4.11B — energy resources and environmental impact.

export const PUBLIC_CASE = {
  standard: "4.11B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Science",
  title: "Two Ways to Power the School",
  estimatedMinutes: 20,
  brief: [
    "The school needs electricity all day. The crew is comparing the gas-plant line with rooftop solar panels.",
    "One works at night. One uses a resource that does not run out. Both still leave waste to deal with.",
    "Build an honest log. A slogan is not a reason.",
  ],
  source: {
    title: "POWER NOTES",
    lines: [
      "Lights and computers need electricity every school day.",
      "The current line comes from a plant that burns natural gas. Natural gas is nonrenewable.",
      "Burning it adds pollution to the air. The line does work at night.",
      "Solar panels use sunlight, which is renewable. They cost more at the start and make less power on cloudy days.",
      "Turning lights off conserves energy either way. Old fixtures should be recycled, not dumped, but recycling them does not power the building.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "Why the school needs power",
      goal: "Build the paragraph that says what the energy is for.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "What uses the power, and where it comes from now", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Why the choice matters", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The school cannot run a day without an energy resource." },
        { id: "r1p2", text: "Lights and computers use electricity every school day." },
        { id: "r1p3", text: "Right now that electricity comes from a plant that burns natural gas." },
        { id: "r1p4", text: "The resource is critical, so the next choice is about how to supply it." },
        { id: "r1p5", text: "Electricity is free if you believe in the school." },
        { id: "r1p6", text: "The school uses no electricity at all." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "The two options",
      goal: "Build the paragraph that compares the gas line and the panels.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "One fact about each option", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "The real difference in the resource", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The two options do not use the same kind of resource." },
        { id: "r2p2", text: "Natural gas is nonrenewable, and burning it adds air pollution." },
        { id: "r2p3", text: "Sunlight is renewable, but the panels make less power on cloudy days." },
        { id: "r2p4", text: "The gas line is steady at night. The panels depend on the Sun." },
        { id: "r2p5", text: "Solar is perfect and has no disadvantage." },
        { id: "r2p6", text: "The panels will create 40 new jobs. The table shows that." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "The rest of the impact",
      goal: "Build the paragraph about conservation, disposal, and recycling.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Conservation, and what to do with old fixtures", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What those actions do not do", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "How the school uses and throws things away still matters." },
        { id: "r3p2", text: "Turning lights off conserves energy no matter which source is chosen." },
        { id: "r3p3", text: "Old fixtures should be recycled instead of dumped." },
        { id: "r3p4", text: "Recycling cuts waste, but it does not power the lights by itself." },
        { id: "r3p5", text: "Go solar is a good slogan, so the choice is already made." },
        { id: "r3p6", text: "Dumping the old fixtures helps the environment more than recycling them." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should the crew read them in?",
    hint: "A reader needs the need, then the two options, before conservation and waste make sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says natural gas is nonrenewable. Tap that sentence.",
      hint: "Look in the paragraph that compares the two options.",
    },
    quickCheck: {
      prompt: "Which action conserves energy but does not, by itself, power the school?",
      choices: [
        { id: "a", text: "Turning lights off, and recycling old fixtures" },
        { id: "b", text: "Burning more natural gas" },
        { id: "c", text: "A slogan that says go solar" },
        { id: "d", text: "Dumping the old fixtures in a field" },
      ],
    },
  },
  explain: {
    prompt: "The crew has one more question. Why does the school need an energy resource, and what is one environmental impact of each choice?",
    starters: ["The school needs electricity because", "Natural gas", "Solar panels", "Either way"],
    checks: [
      "I answered both parts of the question.",
      "I said why the school needs power.",
      "I named an impact of the gas plant or the panels.",
      "I used the notes.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say the school needs electricity for lights or computers.",
      "Say natural gas is nonrenewable or that burning it adds pollution.",
      "Say sunlight is renewable, or that panels make less power on cloudy days, or that conservation and recycling still matter.",
    ],
  },
  chain: {
    title: "School power",
    sourceId: "plant",
    cutId: "plant",
    cutDark: ["wires", "lights"],
    stayOn: ["panels"],
    cutting: "Shutting the gas plant…",
    cutDone: "Plant shut. The wires and the school lights go dark. The panels are a different path.",
    liveLine: "The line is live. Mark what goes dark if the plant shuts and no panels are added.",
    fillLine: "The power line fills in as each paragraph locks.",
    links: [
      { id: "plant", label: "Gas plant", mark: "🏭", on: "r1" },
      { id: "wires", label: "Wires", mark: "⚡", on: "r2" },
      { id: "lights", label: "Lights", mark: "🏫", on: "r2" },
      { id: "panels", label: "Panels", mark: "🔆", on: "r3" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Shut the gas plant and do not add panels. What goes dark?",
    hint: "Mark the parts you think go dark. Then shut the plant.",
    switch: "Shut the gas plant",
    choices: [
      { id: "a", text: "The wires and the school lights", marks: ["wires", "lights"] },
      { id: "b", text: "Only the solar panels", marks: ["panels"] },
      { id: "c", text: "Nobody. Sunlight powers the lights by itself.", nobody: true },
      { id: "d", text: "Only the school lights", marks: ["lights"] },
    ],
  },
  look: {
    prompt: "Look at the power line. Which sentence matches the picture?",
    image: "/student/school_power_line.jpg",
    choices: [
      { id: "line", text: "The gas plant sends power along the wires to the school. Panels are a different path." },
      { id: "slogan", text: "A slogan is enough to power the lights." },
      { id: "jobs", text: "The panels already created 40 jobs." },
    ],
  },
  repair: { roundId: "r2", pieceId: "r2p6", prompt: "Look at the power line. Which sentence matches the picture?" },
  board: null,
};
