// Signal Check — safe to import from client components.

export const PUBLIC_CASE = {
  standard: "4.7B-SC",
  teksLabel: "4.7B",
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

  evidenceReadings: [
    { id: "before", label: "Before photo — no rocks visible", attribute: "BASELINE", kind: "photo" },
    { id: "after", label: "After photo — sediment piled at bank", attribute: "RESULT", kind: "photo" },
    { id: "upstream", label: "Upstream site — sediment missing from original spot", attribute: "SOURCE", kind: "photo" },
    { id: "current", label: "Current slows at the inside curve", attribute: "PROCESS", kind: "data" },
    { id: "rocktype", label: "Bank rocks match upstream rock type", attribute: "MATCH", kind: "data" },
    { id: "shiny", label: "The rocks look shiny and new", attribute: "APPEARANCE ONLY", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", sublabel: "disprove", correctItemIds: ["before", "rocktype"] },
    { id: "B", label: "SIGNAL B", sublabel: "prove", correctItemIds: ["upstream", "after"] },
    { id: "C", label: "SIGNAL C", sublabel: "prove", correctItemIds: ["current", "after"] },
    { id: "none", label: "DOESN'T BELONG", sublabel: "", correctItemIds: ["shiny"] },
  ],

  echo: {
    main: "Trail cam picked up a claim about the riverbank, Cadet. Let's see if it holds up.",
    scan: "Three signals, six readings — and one reading proves more than one signal this time. Read carefully.",
    sort: "Nice work — notice how the after photo backs up two different signals. That's how real evidence works.",
    verdict: "Three signals, three verdicts, all locked to your sort. Time to write it up.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
  },
};
