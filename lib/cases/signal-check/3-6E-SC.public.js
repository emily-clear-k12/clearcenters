// Signal Check — safe to import from client components. Contains the
// claim, statements, evidence readings, sort bins, sentence-stem word
// bank, and ECHO flavor lines. Does NOT contain the open-response grading
// rubric — that lives in the separate .server.js file.

export const PUBLIC_CASE = {
  standard: "3.6E-SC",
  teksLabel: "3.6E",
  grade: 3,
  subject: "Science",
  title: "The Magnet Mystery Headline",
  tagline: "The object got taller because its shadow got taller.",
  transmission: {
    claimHeadline: "Magnets stick to every metal object.",
    source: "Field Lab 3",
    loggedAt: "07:42:19",
  },

  // stemMode controls how Screen 5 (Submit for Grading) is built:
  // "dropdown"      — every blank is a tap-to-pick chip (grade 3)
  // "dropdown-open" — verdict is a chip, reasoning is typed (grade 4)
  // "open"          — verdict and reasoning are both typed (grade 5)
  stemMode: "dropdown",

  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Magnets stick to every metal object.",
      correctVerdict: "False",
      reasonText: "Aluminum foil and the copper penny did NOT react to the magnet — so it doesn't stick to every metal.",
      // Dropdown mode only: the sentence stem template and the correct chip picks.
      stemEvidenceIds: ["foil", "penny"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Some metals are not magnetic.",
      correctVerdict: "True",
      reasonText: "The foil and penny stayed still while the paper clip and nail jumped to the magnet — proof metals react differently.",
      stemEvidenceIds: ["paperclip", "nail"],
    },
  ],

  evidenceReadings: [
    { id: "paperclip", label: "Paper clip", attribute: "ATTRACTED", kind: "metal" },
    { id: "nail", label: "Iron nail", attribute: "ATTRACTED", kind: "metal" },
    { id: "foil", label: "Aluminum foil", attribute: "NOT ATTRACTED", kind: "metal" },
    { id: "penny", label: "Copper penny", attribute: "NOT ATTRACTED", kind: "metal" },
    { id: "cap", label: "Plastic cap", attribute: "NOT METAL", kind: "distractor" },
  ],

  // Sensor Sort (Screen 3) bins — a self-check practice game, not graded.
  sortBins: [
    { id: "A", label: "SIGNAL A", sublabel: "disprove", correctItemIds: ["foil", "penny"] },
    { id: "B", label: "SIGNAL B", sublabel: "prove", correctItemIds: ["paperclip", "nail"] },
    { id: "none", label: "DOESN'T BELONG", sublabel: "", correctItemIds: ["cap"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Two signals, five readings. Read the data before you sort it.",
    sort: "All five readings sorted. Every one lands in exactly one bay — check your work before you lock it in.",
    verdict: "Two signals, two verdicts, both locked to your sort. Now let's set the record straight.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
  },
};
