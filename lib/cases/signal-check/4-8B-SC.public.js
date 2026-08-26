// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8B covers how thermal
// energy moves and how insulation affects that movement. Freshly framed
// for Signal Check — NOT a reworded version of the Group Chat "4.8B" trap
// line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.8B-SC",
  teksLabel: "4.8B",
  grade: 4,
  subject: "Science",
  title: "Does the Towel Make Cold?",
  tagline: "Wrapping the ice cream in a thick towel is what keeps it cold. The towel must be making cold.",
  transmission: {
    claimHeadline: "Wrapping the ice cream in a thick towel is what keeps it cold. The towel must be making cold.",
    source: "Melting Race Experiment",
    loggedAt: "Trial 2",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The wrapped ice cream took over twice as long to melt as the same ice cream with no towel.",
      correctVerdict: "True",
      reasonText: "The wrapped cup timer shows 42 minutes, and the unwrapped cup timer shows only 19 minutes.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The towel itself measures room temperature, not cold, both before and after.",
      correctVerdict: "True",
      reasonText: "Both towel checks show it stayed at room temperature the whole time.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The towel is making cold to stop the ice cream from melting.",
      correctVerdict: "False",
      reasonText: "The towel isn't making cold — it's just slowing down how fast heat gets in from outside.",
    },
  ],

  evidenceReadings: [
    { id: "melt_time_wrapped", label: "Wrapped cup timer", reading: "The wrapped ice cream took 42 minutes to melt.", kind: "data" },
    { id: "melt_time_unwrapped", label: "Unwrapped cup timer", reading: "The same ice cream with no towel took only 19 minutes to melt.", kind: "data" },
    { id: "towel_temp", label: "Towel check", reading: "The towel measured room temperature after wrapping the cup.", kind: "data" },
    { id: "towel_before", label: "Towel check, before", reading: "The towel measured room temperature before it ever touched the ice cream.", kind: "data" },
    { id: "insulation_note", label: "Science note", reading: "A towel slows down how fast heat moves in or out. It doesn't make cold or heat on its own.", kind: "data" },
    { id: "science_definition", label: "Science note", reading: "Slowing down heat is different from making cold.", kind: "data" },
    { id: "towel_color", label: "Towel note", reading: "The towel used in the test is light blue.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["melt_time_wrapped", "melt_time_unwrapped"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["towel_temp", "towel_before"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["insulation_note", "science_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["towel_color"] },
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
    "Did I compare the wrapped and unwrapped melt times?",
    "Did I mention what temperature the towel itself measured?",
    "Did I explain what the towel is actually doing instead of making cold?",
    "Did I avoid saying the towel is making cold?",
  ],
};
