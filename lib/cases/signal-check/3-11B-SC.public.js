// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.11B covers renewable
// resources including water. Freshly framed for Signal Check — NOT a
// reworded version of the Group Chat "3.11B" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.11B-SC",
  teksLabel: "3.11B",
  grade: 3,
  subject: "Science",
  title: "Does Water Ever Run Low?",
  tagline: "Water is unlimited, so it doesn't matter how much you use.",
  transmission: {
    claimHeadline: "Water is unlimited, so it doesn't matter how much you use.",
    source: "Town Water Tank Log",
    loggedAt: "June–August",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The town's water tank level dropped during the dry summer months.",
      correctVerdict: "True",
      reasonText: "The tank level fell from 90% in June to 55% in August.",
      stemEvidenceIds: ["june_level", "august_level"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The tank always refills right back up no matter how much is used.",
      correctVerdict: "False",
      reasonText: "The tank only rises after a real rainstorm, and stayed flat during a three-week dry spell.",
      stemEvidenceIds: ["refill_log", "dry_spell"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since water is renewable, it can never run low in any one place.",
      correctVerdict: "Misleading",
      reasonText: "Water overall is renewable, but this town's tank still ran low during the drought — renewable doesn't mean unlimited everywhere, all the time.",
      stemEvidenceIds: ["renewable_note", "local_shortage"],
    },
  ],

  evidenceReadings: [
    { id: "june_level", label: "June tank level", reading: "90% full.", kind: "data" },
    { id: "august_level", label: "August tank level", reading: "55% full, after a dry summer with little rain.", kind: "data" },
    { id: "refill_log", label: "Refill log", reading: "The tank only rises after a real rainstorm — not automatically.", kind: "data" },
    { id: "dry_spell", label: "Dry spell log", reading: "During a three-week dry spell, the tank level did not rise at all.", kind: "data" },
    { id: "renewable_note", label: "Water cycle note", reading: "Water is renewable because it's part of a natural cycle that keeps refilling it over time.", kind: "data" },
    { id: "local_shortage", label: "Local shortage note", reading: "Even though water overall is renewable, this town's tank still ran low during the drought.", kind: "data" },
    { id: "tank_paint", label: "Maintenance note", reading: "The water tank got a fresh coat of paint this spring.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["june_level", "august_level"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["refill_log", "dry_spell"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["renewable_note", "local_shortage"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["tank_paint"] },
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
    "Did I mention that the tank level dropped over a dry summer?",
    "Did I explain that the tank only refills after real rain, not automatically?",
    "Did I explain what \"renewable\" actually means, using both pieces of evidence for Signal C?",
    "Did I avoid saying water can never run low anywhere?",
  ],
};
