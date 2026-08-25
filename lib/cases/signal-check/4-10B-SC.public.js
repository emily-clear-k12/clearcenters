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

  // The Scan screen leads with this — one photo plus a short field-note
  // paragraph — instead of a list of separate evidence cards. The discrete
  // evidenceReadings below still exist and still drive Sensor Sort and the
  // "Review the Evidence Again" panel on the Verdict screen; this is just
  // what the student reads first, written as a single field report.
  fieldReport: {
    image: "/signal-check/4-10b-sc-field-report.jpg",
    imageCaption: "Riverbank Trail Cam — Day 1 vs. Day 14, same bend",
    notes: "Two weeks of trail-cam photos from the same bend tell a clear story. On Day 1, the inside curve was bare — no rocks, no gravel, just packed mud along the bank. By Day 14, a wide bar of gravel and small stones has built up right at that same curve, exactly where the current visibly slows down. Upstream, the spot where that gravel used to sit is now empty. A lab comparison confirms the rock type in the new bar matches the rock type from upstream exactly — same stone, just moved. Under bright light, the rocks even catch a shine that makes them look brand new, but shine alone doesn't prove that.",
  },

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

  // sublabel used to say "prove"/"disprove" here — that told the student
  // the correct True/False verdict before they ever reached the Verdict
  // step, so the Sensor Sort game was quietly handing out the answer.
  // Bins are now labeled by signal only.
  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["before", "rocktype"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["upstream", "after"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["current", "after"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["shiny"] },
  ],

  echo: {
    main: "Trail cam picked up a claim about the riverbank, Cadet. Let's see if it holds up.",
    scan: "Three signals, six raw readings — nothing's sorted yet, and one reading proves more than one signal this time. Read carefully.",
    sort: "Nice work — notice how the after photo backs up two different signals. That's how real evidence works.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I use the before-and-after photos in my reasoning?",
    "Did I mention that the upstream site is now missing sediment?",
    "Did I explain why the current slowing down at the curve matters?",
    "Did I avoid saying the rocks on the bank are actually brand-new?",
  ],
};
