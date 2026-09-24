// Signal Check — safe to import from client components.
//
// ELAR Signal Check — ELA.3.9D-SC. TEKS 3.9D(i) — recognize characteristics and structures of informational text, including the central idea with supporting evidence.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "ELA.3.9D-SC",
  teksLabel: "3.9D",
  grade: 3,
  subject: "ELAR",
  title: "The Title Says Honey",
  tagline: "This article is mostly about how bees make honey.",
  transmission: {
    claimHeadline: "This article is mostly about how bees make honey.",
    source: "Article: \"Busy Bees: Honey Makers\"",
    loggedAt: "Science magazine",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The title tells you what the text is mostly about.",
      correctVerdict: "Misleading",
      reasonText: "The title says honey. But just one sentence in the text is about honey.",
      stemEvidenceIds: ["title", "honey_line"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Most of the paragraphs tell how bees help plants grow fruit.",
      correctVerdict: "True",
      reasonText: "The paragraphs tell how bees carry pollen and help apple trees make apples.",
      stemEvidenceIds: ["p1", "p2"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The article is mostly about how bees make honey.",
      correctVerdict: "False",
      reasonText: "Most of the text is about bees helping plants grow food. The central idea is what most details are about.",
      stemEvidenceIds: ["p3", "central"],
    },
  ],

  evidenceReadings: [
    { id: "title", label: "Title", reading: "The title is \"Busy Bees: Honey Makers.\"", kind: "data" },
    { id: "honey_line", label: "Honey sentence", reading: "Just one sentence in the text talks about honey.", kind: "data" },
    { id: "p1", label: "Paragraph 1", reading: "\"Bees carry pollen from one flower to the next.\"", kind: "data" },
    { id: "p2", label: "Paragraph 2", reading: "\"Without bees, many apple trees would not make apples.\"", kind: "data" },
    { id: "p3", label: "Paragraph 3", reading: "\"Berries and pumpkins need bees, too.\"", kind: "data" },
    { id: "central", label: "Central idea tip", reading: "The central idea is what most of the details are about.", kind: "data" },
    { id: "flower_pic", label: "Picture", reading: "There is a picture of a flower next to the text.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["title", "honey_line"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["p1", "p2"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["p3", "central"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["flower_pic"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I check the title against the paragraphs?",
    "Did I read what each paragraph is about?",
    "Did I find the real central idea?",
    "Did I avoid picking the central idea from the title alone?",
  ],
};
