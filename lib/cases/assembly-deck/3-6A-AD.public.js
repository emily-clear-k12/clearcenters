// Safe to import from client components. The pieces are meant to be seen —
// the student has to sort them. Which piece belongs in which slot, which are
// decoys, and why, live ONLY in the .server.js file.
// Assembly Deck — 3.6A-AD. TEKS 3.6A — classify matter by physical properties
// including magnetism (verified code, see lib/cases/TEKS_STANDARDS.md).
// Grade 3: two paragraph rounds of three slots each (3.11B(i) names an
// introduction and a conclusion; transitions arrive in grade 4), then the
// assembly round. Runs about 18 minutes.

export const PUBLIC_CASE = {
  standard: "3.6A-AD",
  mode: "paragraph",
  grade: 3,
  subject: "Science",
  title: "The Sorting Bin Report",
  estimatedMinutes: 20,
  brief: [
    "The supply bay is a mess. A crate of parts spilled. Cadet Rios sorted the pile with one test: she held a magnet over every piece.",
    "Chief Okafor wants a three-paragraph log: what the test showed, what it missed, and what to do with the pile.",
    "Build each paragraph from the tray. Then deal with the leftovers and put the paragraphs in order.",
  ],
  source: {
    title: "CADET RIOS'S NOTES",
    lines: [
      "Pulled by the magnet: two steel bolts, one iron washer.",
      "Not pulled: a copper wire, a can, a clip, a rubber band.",
      "Every piece stayed the same temperature. Nothing changed shape.",
      "Rios did not test floating, bending, or heat.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What the magnet test showed",
      goal: "Build the paragraph that reports what actually happened during the test.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two things Rios wrote down", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the test did to the pile", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "Cadet Rios tested every spilled part with a magnet." },
        { id: "r1p2", text: "The two steel bolts and the iron washer jumped to the magnet." },
        { id: "r1p3", text: "The copper wire, the can, the clip, and the rubber band did not move." },
        { id: "r1p4", text: "The magnet sorted the pile into two groups." },
        { id: "r1p5", text: "Steel bolts are the best part in the bay." },
        { id: "r1p6", text: "Every part in the crate was pulled toward the magnet." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What the magnet test could not show",
      goal: "Build the paragraph that explains the limits of the test.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two sentences that explain the limits", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "What the crew would have to do next", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The magnet test tells us only one thing about a part." },
        { id: "r2p2", text: "Being pulled by a magnet is one property, like color or size." },
        { id: "r2p3", text: "Rios did not test which parts bend, float, or hold heat." },
        { id: "r2p4", text: "Each of those properties needs its own test." },
        { id: "r2p5", text: "The magnet test also showed which parts hold heat best." },
        { id: "r2p6", text: "Magnet tests are the easiest science anyone can do." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What the crew should do next",
      goal: "Build the paragraph that tells the crew what to do with the sorted pile.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details", hint: "Two steps that follow from the test", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "Why this helps the next crew", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The sorted pile helps only if we store it right." },
        { id: "r3p2", text: "Parts the magnet pulled go in the metal bin." },
        { id: "r3p3", text: "The rest can be sorted later by a bend test or a float test." },
        { id: "r3p4", text: "Sorting by property means the next cadet can find a part fast." },
        { id: "r3p5", text: "The crew should throw away every part the magnet did not pull." },
        { id: "r3p6", text: "Cadet Rios has been on the station for two years." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one log entry. What order should Chief Okafor read them in?",
    hint: "A reader needs to know what happened before they can understand what it missed — and what to do about it.",
    slots: [
      { id: "first", label: "Opens the log" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the log" },
    ],
  },
  debrief: {
    pinpoint: {
      prompt: "One sentence in your log says the magnet test checks just one thing. Tap that sentence.",
      hint: "Look in the paragraph about what the test could not show.",
    },
    quickCheck: {
      prompt: "Rios held a magnet over every part. What did that test tell her?",
      choices: [
        { id: "a", text: "Which parts a magnet pulls" },
        { id: "b", text: "Which parts are the heaviest" },
        { id: "c", text: "Which parts float in water" },
        { id: "d", text: "Which parts hold heat the best" },
      ],
    },
  },
  explain: {
    prompt: "Chief Okafor has one more question. Why is the magnet test a good way to start sorting, and what will it not tell the crew?",
    criteria: [
      "Say what the magnet test sorts the parts by.",
      "Name one thing the test cannot tell the crew.",
      "Use the word property.",
    ],
  },
  board: null,
};
