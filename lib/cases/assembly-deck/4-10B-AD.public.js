// Safe to import from client components.
// Assembly Deck — 4.10B-AD. TEKS 4.10B — weathering, erosion, and deposition
// (verified code, already in use by 4.10B-SC; see lib/cases/TEKS_STANDARDS.md).
// Grades 4-5: three paragraph rounds of four slots, then the assembly round.
// Per 4.11B(i) the sentences themselves carry the transitions — the engine
// never grades a connector word, it just models them. Runs about 22 minutes.

export const PUBLIC_CASE = {
  standard: "4.10B-AD",
  mode: "paragraph",
  grade: 4,
  subject: "Science",
  title: "The Bend in Sandy Creek",
  estimatedMinutes: 20,
  brief: [
    "A survey drone flew Sandy Creek twice — once in March and once in September — and the creek is not where it used to be.",
    "The station needs a three-paragraph survey report: what the outside bank did, what the inside of the bend did, and what it all means for the footbridge.",
    "Build each paragraph, sort out the sentences left in the tray, then put the three paragraphs in the order the report needs.",
  ],
  source: {
    title: "SURVEY NOTES — SANDY CREEK",
    lines: [
      "Outside of the bend: bank has moved back about two meters since March. Tree roots exposed.",
      "Inside of the bend: a new sandbar, knee-high, made of sand and small pebbles.",
      "Water runs fastest on the outside of the bend and slowest on the inside.",
      "Rainfall was above average all summer.",
      "The footbridge's west post sits three meters from the outside bank. In March it sat five meters away.",
    ],
  },
  rounds: [
    {
      id: "r1",
      label: "What happened to the outside bank",
      goal: "Build the paragraph about the side of the bend that lost material.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "evidence", label: "Evidence from the notes", hint: "Two measurements the survey recorded", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why the water did that here", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What to call this process", accepts: 1 },
      ],
      pieces: [
        { id: "r1p1", text: "The outside of the bend has lost ground since the March survey." },
        { id: "r1p2", text: "The bank there has moved back about two meters, and tree roots that used to be buried are now exposed." },
        { id: "r1p3", text: "Rainfall was above average all summer, which kept the creek running high." },
        { id: "r1p4", text: "Because water runs fastest on the outside of a bend, it had enough energy there to pick up soil and carry it downstream." },
        { id: "r1p5", text: "This wearing away and carrying off of the bank is erosion." },
        { id: "r1p6", text: "Sandy Creek is the prettiest place on the whole station map." },
        { id: "r1p7", text: "The survey shows the outside bank grew outward by two meters." },
      ],
      rejectPrompt: "Two sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r2",
      label: "What happened on the inside of the bend",
      goal: "Build the paragraph about the side of the bend that gained material.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "evidence", label: "Evidence from the notes", hint: "Two things the survey recorded", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "Why the water did that here", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What to call this process", accepts: 1 },
      ],
      pieces: [
        { id: "r2p1", text: "While the outside bank shrank, the inside of the bend gained new ground." },
        { id: "r2p2", text: "A knee-high sandbar of sand and small pebbles now sits where open water used to run." },
        { id: "r2p3", text: "The sandbar is made of the same kind of material the outside bank is missing." },
        { id: "r2p4", text: "Because the water runs slowest on the inside of a bend, it no longer had the energy to carry that material, so it dropped it." },
        { id: "r2p5", text: "Material settling out of slow water like this is deposition." },
        { id: "r2p6", text: "Volcanoes are another force that changes Earth's surface quickly." },
        { id: "r2p7", text: "The sandbar formed because the creek carried the sand uphill from downstream." },
      ],
      rejectPrompt: "Two more sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
    {
      id: "r3",
      label: "What this means for the footbridge",
      goal: "Build the paragraph that turns the survey into a recommendation.",
      slots: [
        { id: "topic", label: "Topic sentence", hint: "What is this paragraph about?", accepts: 1 },
        { id: "evidence", label: "Evidence from the notes", hint: "Two facts about the bridge and the pace of change", accepts: 2 },
        { id: "reasoning", label: "Reasoning", hint: "What the pattern predicts", accepts: 1 },
        { id: "conclusion", label: "Conclusion", hint: "What the station should do", accepts: 1 },
      ],
      pieces: [
        { id: "r3p1", text: "The changes at the bend matter because the footbridge sits right beside the outside bank." },
        { id: "r3p2", text: "In March the bridge's west post stood five meters from the bank; today it stands three." },
        { id: "r3p3", text: "That is about two meters of bank lost in a single season." },
        { id: "r3p4", text: "If the creek keeps eroding the outside bank at that pace, the post will be standing at the water's edge within a few seasons." },
        { id: "r3p5", text: "The station should either move the west post back or armor the bank before next spring's high water." },
        { id: "r3p6", text: "Whoever built the bridge there did a careless job." },
        { id: "r3p7", text: "The survey proves the bridge will collapse next year." },
      ],
      rejectPrompt: "Two last sentences are still in the tray. For each one, say what is wrong with it.",
      reasonOptions: ["opinion", "contradicts", "unsupported", "offtopic"],
    },
  ],
  assembly: {
    prompt: "Three paragraphs, one report. Put them in the order the station should read them.",
    hint: "A survey report describes what was measured before it recommends what to do about it.",
    slots: [
      { id: "first", label: "Opens the report" },
      { id: "second", label: "Middle paragraph" },
      { id: "third", label: "Closes the report" },
    ],
  },
  explain: {
    prompt: "Write two or three sentences for the survey log: why did those six sentences stay in the tray?",
    criteria: [
      "Names at least two rejected sentences.",
      "Gives a real reason for each — an opinion, a claim the notes contradict, something the survey never showed, or something off topic.",
      "Uses erosion or deposition correctly.",
    ],
  },
  board: null,
};
