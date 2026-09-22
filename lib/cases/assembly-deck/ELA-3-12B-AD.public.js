// Safe to import from client components.
// Assembly Deck — ELA.3.12B-AD. TEKS 3.12B — "compose informational texts,
// including brief compositions that convey information about a topic, using a
// clear central idea and genre characteristics and craft" — with 3.11B(i),
// "organizing with purposeful structure, including an introduction and a
// conclusion." Quoted from Emily's official ELAR TEKS PDF (Grades 3-5,
// verified Sept 20, 2026). Grade 3: two rounds of three slots, then assembly.

export const PUBLIC_CASE = {
  standard: "ELA.3.12B-AD",
  mode: "paragraph",
  grade: 3,
  subject: "ELAR",
  title: "The Lunchroom Recycling Report",
  estimatedMinutes: 20,
  brief: [
    "Ms. Alvarez asked your class to write about the new recycling bins for the school newsletter.",
    "Informational writing tells readers what is true. It is not a story about you. It is not your opinion.",
    "Build three paragraphs. Then deal with the leftovers and put them in order.",
  ],
  source: {
    title: "CLASS NOTES",
    lines: [
      "Three bins went in on September 8: paper, cans, and trash.",
      "Each bin has a picture label.",
      "Two fifth graders help at lunch.",
      "In the first month: 40 fewer bags of trash than in August.",
      "Ms. Alvarez says the custodians asked for the bins.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "How the bins work",
      goal: "Build the paragraph that tells readers what the bins are and how to use them.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two true details", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "A sentence that wraps up this part", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "On September 8, our lunchroom got three new bins for sorting trash." },
        { id: "r1p2", text: "Each bin has a picture label. Students can sort without reading." },
        { id: "r1p3", text: "Two fifth graders help younger students at lunch." },
        { id: "r1p4", text: "With labels and helpers, anyone can use the bins." },
        { id: "r1p5", text: "One time my brother put a banana peel in the paper bin." },
        { id: "r1p6", text: "The bins have no labels on them at all." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "story", "contradicts", "offtopic"],
    },
    {
      id: "r2",
      label: "What has changed since the bins arrived",
      goal: "Build the paragraph that tells readers what the bins have done so far.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two true details", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "A sentence that ends the article", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "The bins have already changed how much trash we throw away." },
        { id: "r2p2", text: "In the first month, the school sent out 40 fewer bags of trash." },
        { id: "r2p3", text: "Ms. Alvarez says the custodians asked for the bins." },
        { id: "r2p4", text: "After one month, the bins are just part of lunch." },
        { id: "r2p5", text: "Recycling is the most important thing our school has ever done." },
        { id: "r2p6", text: "Our school also has a garden by the front door." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "story", "contradicts", "offtopic"],
    },
    {
      id: "r3",
      label: "How students can help",
      goal: "Build the paragraph that tells readers what to do at lunch.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "details", label: "Details from the notes", hint: "Two things a reader can actually do", accepts: 2 },
        { id: "conclusion", label: "Conclusion", hint: "A sentence that ends the article", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "Students can help in two easy ways at lunch." },
        { id: "r3p2", text: "Match your trash to the picture on the bin." },
        { id: "r3p3", text: "Ask a fifth-grade helper if you are not sure." },
        { id: "r3p4", text: "When we sort carefully, the custodians can empty the bins fast." },
        { id: "r3p5", text: "Students who sort wrong should lose their recess." },
        { id: "r3p6", text: "The helpers only work on Fridays." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "story", "contradicts", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one article. What order should the newsletter print them in?",
    hint: "Readers need to know what the bins are before they can care what changed — and they can only help once they know both.",
    slots: [
      { id: "first", label: "Opens the article" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the article" },
    ],
  },
  explain: {
    prompt: "Tell Ms. Alvarez why those six sentences stayed in the tray.",
    criteria: [
      "Name at least two sentences you left out.",
      "Say what kind of sentence each one is — an opinion, a story about you, something untrue, or something about a different topic.",
      "Say what an informational article is supposed to do for readers.",
    ],
  },
  board: null,
};
