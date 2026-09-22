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
    "The supply bay is a mess. A crate of parts spilled, and Cadet Rios sorted the whole pile using one test: she held a magnet over every piece.",
    "Chief Okafor wants a three-paragraph report for the station log: what the magnet test showed, what it could not show, and what to do with the pile now.",
    "You will build each paragraph from a tray of sentences, decide what to do with the leftovers, and then put the three paragraphs in order.",
  ],
  source: {
    title: "CADET RIOS'S NOTES",
    lines: [
      "Pulled toward the magnet: two steel bolts, one iron washer.",
      "Not pulled: a copper wire, an aluminum can, a plastic clip, a rubber band.",
      "Every piece stayed room temperature. Nothing changed shape.",
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
        { id: "r1p2", text: "The two steel bolts and the iron washer were pulled toward the magnet." },
        { id: "r1p3", text: "The copper wire, the aluminum can, the plastic clip, and the rubber band were not pulled at all." },
        { id: "r1p4", text: "The magnet split the pile into parts it attracts and parts it does not." },
        { id: "r1p5", text: "Steel bolts are the most useful part in the whole supply bay." },
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
        { id: "r2p1", text: "The magnet test tells the crew only one thing about each part." },
        { id: "r2p2", text: "Being pulled by a magnet is one physical property of a material, just like color or texture." },
        { id: "r2p3", text: "Rios never tested which parts bend, which float, or which hold heat." },
        { id: "r2p4", text: "To learn those properties, the crew would have to run a different test for each one." },
        { id: "r2p5", text: "The magnet test also proved which pieces are the best at holding heat." },
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
        { id: "r3p1", text: "The sorted pile is only useful if the crew stores it the right way." },
        { id: "r3p2", text: "The parts the magnet pulled should go in the bin marked for magnetic metals." },
        { id: "r3p3", text: "The parts the magnet ignored should be sorted again later by a test for bending or floating." },
        { id: "r3p4", text: "Storing the parts by property means the next cadet can find what she needs without dumping the crate again." },
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
  explain: {
    prompt: "Chief Okafor has one more question: why did you leave those six sentences out of the log?",
    criteria: [
      "Name at least two sentences you left out.",
      "Say what is wrong with each one — an opinion, the opposite of the notes, or something Rios never tested.",
      "Use the word property.",
    ],
  },
  board: null,
};
