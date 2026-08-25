// Signal Check — safe to import from client components. Contains the
// claim, statements, evidence readings, sort bins, sentence-stem word
// bank, and ECHO flavor lines. Does NOT contain the open-response grading
// rubric — that lives in the separate .server.js file.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.6A covers magnetism
// directly: "Measure, test, and record physical properties of matter,
// including... magnetism."

export const PUBLIC_CASE = {
  standard: "3.6A-SC",
  teksLabel: "3.6A",
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

  // The Scan screen leads with this — one photo plus a short field-note
  // paragraph — instead of a list of separate evidence cards. The discrete
  // evidenceReadings below still exist and still drive Sensor Sort and the
  // "Review the Evidence Again" panel on the Verdict screen; this is just
  // what the student reads first, written as a single field report.
  fieldReport: {
    image: "/signal-check/3-6a-sc-field-report.jpg",
    imageCaption: "Field Lab 3 — magnet test, four objects",
    notes: "The photo shows four objects tested against the bar magnet, laid out exactly where they landed. The paper clip and the iron nail are both still stuck right to the magnet — they snapped over the instant they got close. Sitting apart from the magnet, completely untouched, are the crumpled aluminum foil and the copper penny — neither one moved at all during the test. The plastic bottle cap sits off to the side by itself, since it isn't metal and was never part of the magnet test to begin with.",
  },

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

  // `reading` is a raw, un-categorized observation — deliberately NOT a
  // pre-sorted label (no "attracted/not attracted") so Screen 2 doesn't
  // spoil the Sensor Sort game or the Verdict reveal. Sort correctness is
  // driven entirely by sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "paperclip", label: "Paper clip", reading: "Snapped straight to the magnet from about 2 cm away.", kind: "metal" },
    { id: "nail", label: "Iron nail", reading: "Pulled toward the magnet the instant it got close.", kind: "metal" },
    { id: "foil", label: "Aluminum foil", reading: "Held flat against the magnet — didn't move at all.", kind: "metal" },
    { id: "penny", label: "Copper penny", reading: "Held flat against the magnet — didn't move at all.", kind: "metal" },
    { id: "cap", label: "Plastic cap", reading: "Not metal, so the magnet test wasn't run on this one.", kind: "distractor" },
  ],

  // Sensor Sort (Screen 3) bins — a self-check practice game, not graded.
  // sublabel used to say "prove"/"disprove" here — that told the student
  // the correct True/False verdict before they ever reached the Verdict
  // step, so the Sensor Sort game was quietly handing out the answer.
  // Bins are now labeled by signal only.
  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["foil", "penny"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["paperclip", "nail"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["cap"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Two signals, five raw readings. Nothing's sorted yet — that part's on you.",
    sort: "All five readings sorted. Every one lands in exactly one bay — check your work before you lock it in.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Two verdicts filed. Give them one more look before you send the report in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict (True, Misleading, or False) for every signal?",
    "Did I pick evidence that actually matches my verdict, not just any evidence?",
    "Did I think about the aluminum foil and copper penny for Signal A?",
    "Did I think about the paper clip and nail for Signal B?",
    "Did I check that my verdicts match how I sorted the readings?",
  ],
};
