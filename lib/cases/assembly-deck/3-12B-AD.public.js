// Safe to import from client components. Answer keys live only in the server file.
// Assembly Deck — 3.12B-AD. TEKS 3.12B — food chains.
// Grade 3: three short paragraph rounds, then the assembly round.

export const PUBLIC_CASE = {
  standard: "3.12B-AD",
  mode: "paragraph",
  grade: 3,
  subject: "Science",
  title: "The Pond That Went Quiet",
  estimatedMinutes: 20,
  brief: [
    "The minnows in Station Pond are gone. The algae is thick, and the herons have left the shore.",
    "Chief Okafor wants a three-paragraph log: where the energy starts, what eats what, and what a broken link does.",
    "Build each paragraph from the tray. Then name the leftovers and put the paragraphs in order.",
  ],
  source: {
    title: "POND CREW NOTES",
    lines: [
      "Sunlight hits the pond all day.",
      "Algae and pond plants make food from that light.",
      "Last month, minnows ate the algae.",
      "Herons stood in the shallows and ate the minnows.",
      "This week the crew counted zero minnows.",
      "The herons are gone. The algae is thicker than before.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "Where the energy starts",
      goal: "Build the paragraph that says where this pond's food comes from.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two things the crew wrote down", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the rest of the chain needs", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The energy in this pond starts with the plants." },
        { id: "r1p2", text: "Sunlight hits the pond all day." },
        { id: "r1p3", text: "Algae and pond plants make food from that light." },
        { id: "r1p4", text: "Without those plants, the animals have nothing to eat." },
        { id: "r1p5", text: "Herons are the best animal at the pond." },
        { id: "r1p6", text: "The sun does not help anything that lives here." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What eats what",
      goal: "Build the paragraph that shows how food moves through this pond.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two links the crew observed", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "The path the energy takes", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "Each animal eats the living thing before it in the chain." },
        { id: "r2p2", text: "Minnows eat the algae." },
        { id: "r2p3", text: "Herons eat the minnows." },
        { id: "r2p4", text: "Energy moves from plants to minnows to herons." },
        { id: "r2p5", text: "A bear comes every night and eats the herons." },
        { id: "r2p6", text: "Owls, mice, and snakes share one big food web here." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What a missing link does",
      goal: "Build the paragraph that explains what happened when the minnows vanished.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two changes the crew counted", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the crew should figure out", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "When the minnows vanish, the chain breaks in both directions." },
        { id: "r3p2", text: "The herons lose the food they were eating, so they leave." },
        { id: "r3p3", text: "Nothing is eating the algae, so it grows thicker." },
        { id: "r3p4", text: "The crew needs to learn why the minnows left." },
        { id: "r3p5", text: "The heron is the villain because herons are mean." },
        { id: "r3p6", text: "One missing animal never matters if a food web has many paths." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log. What order should Chief Okafor read them in?",
    hint: "A reader has to understand one part before the next part makes sense.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence says where this pond's energy starts. Tap that sentence.",
      hint: "Look in the paragraph about the plants.",
    },
    quickCheck: {
      prompt: "Where does the energy in this food chain start?",
      choices: [
        { id: "a", text: "With plants that use sunlight" },
        { id: "b", text: "With the heron" },
        { id: "c", text: "With the minnows" },
        { id: "d", text: "With the mud on the bottom" },
      ],
    },
  },
  explain: {
    prompt: "Chief Okafor has one more question. Where does the energy in this pond start, and what happened when the minnows disappeared?",
    starters: [
      "The energy in this pond starts with",
      "The plants",
      "When the minnows disappeared,",
      "That meant",
    ],
    checks: [
      "I answered both parts of the question.",
      "I said where the energy starts.",
      "I said what changed when the minnows were gone.",
      "I used details from the pond.",
      "I wrote more than one sentence.",
    ],
    criteria: [
      "Say that the plants make food from sunlight.",
      "Name one animal that eats another in this pond.",
      "Say what changed when the minnows were gone.",
    ],
  },
  chain: {
    title: "Station Pond",
    breakOn: "r3",
    breakLine: "The minnow link is open. The algae spread. The herons have no power.",
    links: [
      { id: "sun", label: "Sunlight", mark: "☀", on: "r1" },
      { id: "plants", label: "Plants", mark: "🌿", on: "r1", breakLabel: "Algae spread" },
      { id: "minnows", label: "Minnows", mark: "🐟", on: "r2", breakLabel: "Gone" },
      { id: "herons", label: "Herons", mark: "🪶", on: "r2", breakLabel: "Left" },
    ],
  },
  whatIf: {
    prompt: "The line is live. Cut the plants. Who loses power?",
    hint: "Mark the parts you think go dark. Then throw the switch.",
    choices: [
      { id: "a", text: "The minnows and the herons" },
      { id: "b", text: "Only the herons" },
      { id: "c", text: "Nobody. The sun still feeds them." },
      { id: "d", text: "Only the plants" },
    ],
  },
  look: {
    prompt: "Look at the chain in the picture. Which sentence matches it?",
    image: "/student/pond_chain.jpg",
    choices: [
      { id: "chain", text: "Minnows eat the algae. Herons eat the minnows." },
      { id: "bear", text: "A bear comes every night and eats the herons." },
      { id: "best", text: "Herons are the best animal at the pond." },
    ],
  },
  repair: {
    roundId: "r2",
    pieceId: "r2p5",
    prompt: "Look at the chain in the picture. Which sentence matches it?",
  },
  board: null,
};
