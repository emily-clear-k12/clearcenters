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
    "Ms. Alvarez asked your class for a short article about the new lunchroom recycling bins for the school newsletter.",
    "Informational writing tells readers what is true, clearly. It is not a story about you, and it is not your opinion.",
    "You will build three paragraphs, deal with the sentences left in the tray, and then decide what order they go in.",
  ],
  source: {
    title: "CLASS NOTES",
    lines: [
      "Three bins went in on September 8: paper, cans and bottles, and trash.",
      "Each bin has a picture label, so students can sort without reading.",
      "Two fifth graders stand by the bins at lunch to help younger students.",
      "In the first month the school sent out 40 fewer bags of trash than in August.",
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
        { id: "r1p1", text: "On September 8, our lunchroom got three new bins: one for paper, one for cans and bottles, and one for trash." },
        { id: "r1p2", text: "Every bin has a picture label, so students can sort without reading a single word." },
        { id: "r1p3", text: "Two fifth graders stand by the bins at lunch to help younger students choose the right one." },
        { id: "r1p4", text: "Between the pictures and the helpers, anyone in the school can use the bins correctly." },
        { id: "r1p5", text: "One time my little brother put a banana peel in the paper bin and everyone laughed." },
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
        { id: "r2p1", text: "The bins have already changed how much trash leaves our school." },
        { id: "r2p2", text: "In the first month, the school sent out 40 fewer bags of trash than it did in August." },
        { id: "r2p3", text: "Ms. Alvarez says the custodians were the ones who asked for the bins." },
        { id: "r2p4", text: "After one month, the new bins have become a normal part of lunch at our school." },
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
        { id: "r3p1", text: "Students can keep the bins working by doing two simple things at lunch." },
        { id: "r3p2", text: "Match your item to the picture on the bin before you drop it in." },
        { id: "r3p3", text: "Ask one of the fifth-grade helpers when you are not sure which bin is right." },
        { id: "r3p4", text: "When everyone sorts carefully, the bins stay clean enough for the custodians to empty quickly." },
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
