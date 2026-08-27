// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12B covers predicting
// how changes in an ecosystem affect the cycling of matter and the flow
// of energy through a food web. Freshly framed for Signal Check — NOT a
// reworded version of any Group Chat trap line (see COVERAGE_MAP.md
// rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.12B-SC",
  teksLabel: "5.12B",
  grade: 5,
  subject: "Science",
  title: "Does Feeding the Birds Only Help the Birds?",
  tagline: "Filling the backyard bird feeder every day only affects the birds that eat from it — nothing else in the yard is affected.",
  transmission: {
    claimHeadline: "Filling the backyard bird feeder every day only affects the birds that eat from it — nothing else in the yard is affected.",
    source: "Backyard Ecosystem Log",
    loggedAt: "One Season",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Since the feeder went up, the population of ground beetles the birds used to eat dropped by half.",
      correctVerdict: "True",
      reasonText: "A drop in the beetle population shows the feeder changed more than just the birds' habits.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The wildflowers those same beetles used to pollinate produced noticeably fewer seeds this season.",
      correctVerdict: "True",
      reasonText: "The effect reached a plant species that never touches the feeder at all — that's a ripple beyond the birds.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Feeding the birds only affects the birds that eat from the feeder.",
      correctVerdict: "False",
      reasonText: "A change to one part of a food web can shift the cycling of matter and flow of energy well beyond that one species.",
    },
  ],

  evidenceReadings: [
    { id: "bird_count_change", label: "Bird count change", reading: "The number of birds visiting the yard roughly doubled after the feeder went up.", kind: "data" },
    { id: "insect_count_change", label: "Beetle count change", reading: "The population of ground beetles the birds used to eat dropped by half over the same time.", kind: "data" },
    { id: "plant_seed_change", label: "Wildflower seed count", reading: "The wildflowers those beetles used to pollinate produced noticeably fewer seeds this season.", kind: "data" },
    { id: "pollinator_visit_change", label: "Pollinator visit count", reading: "The number of beetle visits to those wildflowers, counted before and after, also dropped.", kind: "data" },
    { id: "cycling_note", label: "Science note", reading: "A change to one part of a food web can shift the cycling of matter and flow of energy well beyond that one species.", kind: "data" },
    { id: "ripple_note", label: "Science note", reading: "Even indirectly connected organisms, like a plant pollinated by an affected insect, can be impacted by a single ecosystem change.", kind: "data" },
    { id: "feeder_color_note", label: "Feeder note", reading: "The bird feeder is painted red.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["bird_count_change", "insect_count_change"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["plant_seed_change", "pollinator_visit_change"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["cycling_note", "ripple_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["feeder_color_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all three signals?",
    "Did I mention what happened to the beetle population after the feeder went up?",
    "Did I mention what happened to the wildflowers that depended on those beetles?",
    "Did I explain how a change to one part of a food web can spread beyond it?",
    "Did I avoid saying feeding the birds only affects the birds?",
  ],
};
