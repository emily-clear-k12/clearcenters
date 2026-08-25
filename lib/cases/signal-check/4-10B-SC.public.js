// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.10B covers slow changes
// to Earth's surface caused by weathering, erosion, and deposition from
// water, wind, and ice. (Real TEKS 4.7 has no sub-letters and covers
// forces/gravity/friction/magnetism — it is not about erosion.)

export const PUBLIC_CASE = {
  standard: "4.10B-SC",
  teksLabel: "4.10B",
  grade: 4,
  subject: "Science",
  title: "The Erosion Photo Caption",
  tagline: "The river made new rocks appear on the bank.",
  transmission: {
    claimHeadline: "The river made new rocks appear on the bank.",
    source: "Riverbank Trail Cam",
    loggedAt: "Day 14, 6:15 AM",
  },

  // Grade 4: verdict is a tap-to-pick chip, but the reasoning is typed —
  // the first step into written justification.
  stemMode: "dropdown-open",

  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The rocks on the bank are brand-new rocks the river created.",
      correctVerdict: "False",
      reasonText: "The before photo shows no rocks there at all, and the bank rocks match the upstream rock type — nothing new was made.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The river moved sediment from upstream down to the bank.",
      correctVerdict: "True",
      reasonText: "The upstream site is missing sediment that now matches what piled up at the bank.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Moving water can drop the sediment it's carrying when it slows down.",
      correctVerdict: "True",
      reasonText: "The current slows at the inside curve, which is exactly where the sediment piled up.",
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT a
  // pre-sorted label (no "baseline/result/source") so Screen 2 doesn't
  // spoil the Sensor Sort game or the Verdict reveal. Sort correctness is
  // driven entirely by sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "before", label: "Before photo", reading: "No rocks or sediment visible on the bank at all.", kind: "photo" },
    { id: "after", label: "After photo", reading: "A pile of sediment now sits right at the inside curve of the bank.", kind: "photo" },
    { id: "upstream", label: "Upstream site", reading: "The sediment that used to be here is gone.", kind: "photo" },
    { id: "current", label: "Current speed check", reading: "The water visibly slows down at the inside curve.", kind: "data" },
    { id: "rocktype", label: "Rock comparison", reading: "The rock type at the bank matches the rock type upstream exactly.", kind: "data" },
    { id: "shiny", label: "Close-up photo", reading: "The rocks catch the light and look shiny and new.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", sublabel: "disprove", correctItemIds: ["before", "rocktype"] },
    { id: "B", label: "SIGNAL B", sublabel: "prove", correctItemIds: ["upstream", "after"] },
    { id: "C", label: "SIGNAL C", sublabel: "prove", correctItemIds: ["current", "after"] },
    { id: "none", label: "DOESN'T BELONG", sublabel: "", correctItemIds: ["shiny"] },
  ],

  echo: {
    main: "Trail cam picked up a claim about the riverbank, Cadet. Let's see if it holds up.",
    scan: "Three signals, six raw readings — nothing's sorted yet, and one reading proves more than one signal this time. Read carefully.",
    sort: "Nice work — notice how the after photo backs up two different signals. That's how real evidence works.",
    verdict: "Three signals, three verdicts, all locked to your sort. Time to write it up.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
  },
};
