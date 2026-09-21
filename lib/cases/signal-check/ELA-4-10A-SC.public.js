// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.4.10A-SC. TEKS 4.10A — explain the author's purpose and message within a text.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.4.10A-SC",
  teksLabel: "4.10A",
  grade: 4,
  subject: "ELAR",
  title: "All That Excitement",
  tagline: "The author wrote this flyer to persuade you.",
  transmission: {
    claimHeadline: "The author wrote this flyer to persuade you.",
    source: "Nature Center Flyer",
    loggedAt: "Front desk",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The flyer uses lots of exclamation points and bold words.",
      correctVerdict: "True",
      reasonText: "The flyer is printed in bold letters and uses exclamation points, like \"WOW!\"",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The exclamation points show the author is trying to convince you of something.",
      correctVerdict: "Misleading",
      reasonText: "The exclamation points show excitement, but the flyer never asks you to buy, do, or believe anything.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The author's main purpose is to inform readers about monarch migration.",
      correctVerdict: "True",
      reasonText: "The flyer gives facts about the monarchs' route and ends with a map of it.",
    },
  ],

  evidenceReadings: [
    { id: "bold", label: "Big letters", reading: "The flyer is printed in bold letters with six exclamation points.", kind: "data" },
    { id: "wow", label: "Opening", reading: "\"WOW! Monarch butterflies can travel up to 3,000 MILES!\"", kind: "data" },
    { id: "no_ask", label: "Ask check", reading: "The flyer never asks the reader to buy, do, or believe anything.", kind: "data" },
    { id: "excite", label: "Exclamation points", reading: "Exclamation points show strong feeling, like excitement or surprise.", kind: "data" },
    { id: "route", label: "Route facts", reading: "\"Every fall, they fly from the United States and Canada all the way to the mountains of Mexico!\"", kind: "data" },
    { id: "map", label: "Map", reading: "The flyer ends with a map of the monarchs' route.", kind: "data" },
    { id: "weekends", label: "Hours", reading: "The nature center is open on weekends.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["bold", "wow"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["no_ask", "excite"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["route", "map"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["weekends"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — the stem gets you started.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I describe how the flyer sounds?",
    "Did I check whether the flyer asks me to do anything?",
    "Did I name the author's real purpose?",
    "Did I avoid deciding the purpose from the exclamation points alone?",
  ],
};
