// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.4.13D-SC. TEKS 4.13D — identify primary and secondary sources. (Rio Pino and its 1932 flood are fictional.)
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.4.13D-SC",
  teksLabel: "4.13D",
  grade: 4,
  subject: "ELAR",
  title: "The Storm Diary",
  tagline: "This diary entry is a secondary source.",
  transmission: {
    claimHeadline: "This diary entry is a secondary source.",
    source: "History Book: \"Rio Pino Remembers\"",
    loggedAt: "Page 48",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The diary was written by someone who was there.",
      correctVerdict: "True",
      reasonText: "A 12-year-old girl who lived in Rio Pino wrote it the night the flood happened.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The diary appears in a history book, so it's a secondary source.",
      correctVerdict: "Misleading",
      reasonText: "The history book is a secondary source, but the diary printed inside it is still a primary source.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The diary entry is a primary source.",
      correctVerdict: "True",
      reasonText: "A primary source is made by someone who was there. A secondary source is made later by someone who studied the event.",
    },
  ],

  evidenceReadings: [
    { id: "writer", label: "Diary writer", reading: "The diary was written by a 12-year-old girl who lived in Rio Pino.", kind: "data" },
    { id: "night", label: "When", reading: "\"Tonight the water came up to our front step.\" — written the night of the flood.", kind: "data" },
    { id: "book", label: "The book", reading: "The history book was written in 1998 by a historian.", kind: "data" },
    { id: "inside", label: "Inside the book", reading: "The diary page is printed inside the history book as an example.", kind: "data" },
    { id: "primary_def", label: "Primary source", reading: "A primary source is made by someone who was there when it happened.", kind: "data" },
    { id: "secondary_def", label: "Secondary source", reading: "A secondary source is made later by someone who studied the event.", kind: "data" },
    { id: "pages", label: "Book length", reading: "The history book has 212 pages.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["writer", "night"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["book", "inside"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["primary_def", "secondary_def"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pages"] },
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
    "Did I say who wrote the diary and when?",
    "Did I explain the difference between the book and the diary inside it?",
    "Did I name the kind of source the diary is?",
    "Did I use the definitions?",
  ],
};
