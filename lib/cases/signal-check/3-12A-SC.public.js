// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12A covers how organisms
// survive seasonal changes. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "3.12A" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.12A-SC",
  teksLabel: "3.12A",
  grade: 3,
  subject: "Science",
  title: "Where Do They Go in November?",
  tagline: "When it gets cold, most animals just die off until spring.",
  transmission: {
    claimHeadline: "When it gets cold, most animals just die off until spring.",
    source: "Field Wildlife Log",
    loggedAt: "Oct–Nov",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Several animals are gone from the field by November.",
      correctVerdict: "True",
      reasonText: "The October count shows geese, butterflies, and a groundhog present; the November count shows them all gone.",
      stemEvidenceIds: ["october_count", "november_count"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Every animal that disappeared from the field actually died.",
      correctVerdict: "False",
      reasonText: "Tagged geese were tracked alive far south, and the groundhog's burrow shows it's asleep, not dead.",
      stemEvidenceIds: ["goose_tag", "groundhog_burrow"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Different animals handle cold weather in different ways.",
      correctVerdict: "True",
      reasonText: "Geese and butterflies migrate south, while groundhogs hibernate underground.",
      stemEvidenceIds: ["migration_note", "hibernation_note"],
    },
  ],

  evidenceReadings: [
    { id: "october_count", label: "October field count", reading: "Geese, butterflies, and a groundhog all present.", kind: "data" },
    { id: "november_count", label: "November field count", reading: "No geese, no butterflies, groundhog burrow sealed.", kind: "data" },
    { id: "goose_tag", label: "Goose tracking tag", reading: "Tagged geese were spotted 800 miles south the same week they left the field.", kind: "data" },
    { id: "groundhog_burrow", label: "Burrow check", reading: "The groundhog's burrow shows steady, slow breathing signs — it's asleep, not dead.", kind: "data" },
    { id: "migration_note", label: "Migration note", reading: "Geese and butterflies migrate south for the winter.", kind: "data" },
    { id: "hibernation_note", label: "Hibernation note", reading: "Groundhogs hibernate underground through the cold months.", kind: "data" },
    { id: "fence_repair", label: "Field maintenance note", reading: "The field fence was repaired in early November.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["october_count", "november_count"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["goose_tag", "groundhog_burrow"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["migration_note", "hibernation_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["fence_repair"] },
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
    "Did I mention which animals were missing from the November count?",
    "Did I explain what actually happened to the geese and the groundhog?",
    "Did I name at least two different ways animals handle cold weather?",
    "Did I avoid saying the missing animals all died?",
  ],
};
