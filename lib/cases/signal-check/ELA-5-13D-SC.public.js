// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.5.13D-SC. TEKS 5.13D — understand credibility of primary and secondary sources.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.5.13D-SC",
  teksLabel: "5.13D",
  grade: 5,
  subject: "ELAR",
  title: "Two Sources Disagree",
  tagline: "The blog post is the more credible source because it's newer.",
  transmission: {
    claimHeadline: "The blog post is the more credible source because it's newer.",
    source: "Two Accounts: Library Opening Day",
    loggedAt: "1946 and 2026",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The newspaper article was written the day the library opened.",
      correctVerdict: "True",
      reasonText: "The newspaper was printed the day the library opened in 1946, and it reports about 200 people.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The blog post gives no source for its number.",
      correctVerdict: "True",
      reasonText: "The blog says 'thousands' but never says where that number came from, and a credible source tells you.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A newer source is always more credible.",
      correctVerdict: "False",
      reasonText: "The blog was written 80 years later, and being newer doesn't help when it gives no evidence.",
    },
  ],

  evidenceReadings: [
    { id: "paper_date", label: "Newspaper date", reading: "The newspaper article was printed the day the library opened in 1946.", kind: "data" },
    { id: "paper_count", label: "Newspaper count", reading: "\"About 200 people lined up for the ribbon cutting.\"", kind: "data" },
    { id: "blog_claim", label: "Blog claim", reading: "\"Thousands of people came that day.\" No source is listed.", kind: "data" },
    { id: "cred_tip", label: "Credibility check", reading: "A source is more credible when the writer was there or tells you where the information came from.", kind: "data" },
    { id: "blog_date", label: "Blog date", reading: "The blog post was written in 2026, 80 years later.", kind: "data" },
    { id: "newer_note", label: "Newer isn't enough", reading: "A newer source can be more credible only if it uses better evidence.", kind: "data" },
    { id: "brick", label: "Building", reading: "The library had a red-brick front.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["paper_date", "paper_count"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["blog_claim", "cred_tip"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["blog_date", "newer_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["brick"] },
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
    "Did I say when each source was written?",
    "Did I check where each number came from?",
    "Did I explain which source is more credible and why?",
    "Did I avoid saying newer is always better?",
  ],
};
