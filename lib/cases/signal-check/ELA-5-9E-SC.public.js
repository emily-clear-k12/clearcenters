// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.5.9E-SC. TEKS 5.9E(ii) — recognize characteristics and structures of argumentative text by explaining how the author has used facts for or against an argument. (Cedar Hill is fictional.)
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.5.9E-SC",
  teksLabel: "5.9E",
  grade: 5,
  subject: "ELAR",
  title: "Facts That Cut Both Ways",
  tagline: "Every fact the author uses supports the argument.",
  transmission: {
    claimHeadline: "Every fact the author uses supports the argument.",
    source: "Cedar Hill Town Newsletter",
    loggedAt: "Letters page",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The fact that kids have no place to skate supports building the park.",
      correctVerdict: "True",
      reasonText: "The author's claim is that the town should build a skate park, and having no place to skate is a reason for it.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The fact about the $250,000 cost supports building the park.",
      correctVerdict: "False",
      reasonText: "A high cost is a reason some people would vote against the park, so this fact works against the argument.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Because one fact works against the author, the argument falls apart.",
      correctVerdict: "Misleading",
      reasonText: "The author names the cost and then answers it with a state grant, which can make the argument stronger.",
    },
  ],

  evidenceReadings: [
    { id: "claim", label: "The claim", reading: "\"Cedar Hill should build a skate park.\"", kind: "data" },
    { id: "no_place", label: "Fact 1", reading: "\"Right now, there is no outdoor place in Cedar Hill where kids are allowed to skate.\"", kind: "data" },
    { id: "cost", label: "Fact 2", reading: "\"A skate park would cost $250,000, more than the town spent on all its parks last year.\"", kind: "data" },
    { id: "against", label: "Which way it points", reading: "A high cost is a reason some people would vote against the park.", kind: "data" },
    { id: "answer", label: "Author's next sentence", reading: "\"A state grant could pay for half of that cost.\"", kind: "data" },
    { id: "counter_tip", label: "Counterargument", reading: "Naming a fact on the other side and then answering it can make an argument stronger.", kind: "data" },
    { id: "monthly", label: "Newsletter schedule", reading: "The newsletter comes out on the first of every month.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["claim", "no_place"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["cost", "against"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["answer", "counter_tip"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["monthly"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict and reasoning for all three signals?",
    "Did I name the author's claim?",
    "Did I explain which fact supports the claim and which works against it?",
    "Did I explain what the author does after the cost fact?",
    "Did I use quotes from the essay?",
  ],
};
