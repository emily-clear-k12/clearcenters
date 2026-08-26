// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.6C covers how matter is
// conserved when combined, even when a mixture's total volume looks
// smaller than expected. Freshly framed for Signal Check — NOT a reworded
// version of the Group Chat "4.6C" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.6C-SC",
  teksLabel: "4.6C",
  grade: 4,
  subject: "Science",
  title: "Where Did the Volume Go?",
  tagline: "50 mL of rice plus 50 mL of beans should make exactly 100 mL. If it doesn't, some must have spilled.",
  transmission: {
    claimHeadline: "50 mL of rice plus 50 mL of beans should make exactly 100 mL. If it doesn't, some must have spilled.",
    source: "Kitchen Measuring Cup Test",
    loggedAt: "Trial 4",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Mixed together, the rice and beans only measured 92 mL, with nothing spilled.",
      correctVerdict: "True",
      reasonText: "The measuring cup check shows 92 mL, and the spill check found no rice or beans anywhere else.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The rice and beans weighed the same before and after mixing.",
      correctVerdict: "True",
      reasonText: "Both weight checks show 340 grams, before mixing and after.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since the mix measured less than 100 mL, something must have spilled or disappeared.",
      correctVerdict: "False",
      reasonText: "Nothing disappeared — the small beans slide into the tiny gaps between the bigger rice grains, so the mix takes up less space than the two amounts added together.",
    },
  ],

  evidenceReadings: [
    { id: "measured_volume", label: "Measuring cup check", reading: "50 mL of rice plus 50 mL of beans, mixed together, measured only 92 mL.", kind: "data" },
    { id: "spill_check", label: "Spill check", reading: "No rice or beans were found on the counter or floor.", kind: "data" },
    { id: "mass_before", label: "Weight before mixing", reading: "The rice and beans weighed 340 grams total before mixing.", kind: "data" },
    { id: "mass_after", label: "Weight after mixing", reading: "The same rice and beans weighed 340 grams after mixing.", kind: "data" },
    { id: "gap_note", label: "Science note", reading: "Small beans slide into the tiny gaps between the bigger rice grains. That's why the mix takes up less space than the two amounts added together.", kind: "data" },
    { id: "repeat_measure", label: "Try it again", reading: "Mixing the same amounts three more times always measured close to 92 mL.", kind: "data" },
    { id: "container_note", label: "Cup note", reading: "The measuring cup used today has blue lines instead of black.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["measured_volume", "spill_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["mass_before", "mass_after"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["gap_note", "repeat_measure"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["container_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the mix measured 92 mL with nothing spilled?",
    "Did I mention that the weight stayed exactly the same before and after?",
    "Did I explain why the mixed volume came out smaller than 100 mL?",
    "Did I avoid saying something must have spilled or disappeared?",
  ],
};
