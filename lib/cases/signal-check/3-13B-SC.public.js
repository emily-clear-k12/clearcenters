// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.13B covers life cycles
// and how some organisms change form as they grow. Freshly framed for
// Signal Check — NOT a reworded version of the Group Chat "3.13B" trap
// line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.13B-SC",
  teksLabel: "3.13B",
  grade: 3,
  subject: "Science",
  title: "Same Bug, or Two?",
  tagline: "The bug in the pond and the dragonfly flying above it must be two totally different bugs.",
  transmission: {
    claimHeadline: "The bug in the pond and the dragonfly flying above it must be two totally different bugs.",
    source: "Pond Tagging Study",
    loggedAt: "June-July",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A bug living underwater in June had the same mark as a dragonfly seen in July.",
      correctVerdict: "True",
      reasonText: "The June tag check and the July tag check both show the exact same red dot.",
      stemEvidenceIds: ["tag_june", "tag_july"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The pond bug and the dragonfly look completely different from each other.",
      correctVerdict: "True",
      reasonText: "The pond bug has no wings and breathes through gills. The dragonfly has wings and breathes air.",
      stemEvidenceIds: ["nymph_photo", "adult_photo"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since they look so different, they must be two different bugs.",
      correctVerdict: "False",
      reasonText: "They're not two different bugs — every marked pond bug grew into a dragonfly with that same mark, so it's one bug that changes a lot as it grows.",
      stemEvidenceIds: ["metamorphosis_note", "tag_match_summary"],
    },
  ],

  evidenceReadings: [
    { id: "tag_june", label: "Tag check — June", reading: "A bug living underwater had a small red dot painted on its back.", kind: "data" },
    { id: "tag_july", label: "Tag check — July", reading: "A dragonfly flying near the pond in July had that same red dot.", kind: "data" },
    { id: "nymph_photo", label: "Underwater bug photo", reading: "This bug has no wings. It breathes through gills, like a fish.", kind: "data" },
    { id: "adult_photo", label: "Dragonfly photo", reading: "This dragonfly has four wings. It breathes air, not water.", kind: "data" },
    { id: "metamorphosis_note", label: "Science note", reading: "Many bugs change shape a lot as they grow up. This is called metamorphosis.", kind: "data" },
    { id: "tag_match_summary", label: "Tag results", reading: "Every marked pond bug grew into a dragonfly with the same mark. None of them just disappeared.", kind: "data" },
    { id: "pond_depth", label: "Pond note", reading: "The pond was about 3 feet deep this summer.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["tag_june", "tag_july"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["nymph_photo", "adult_photo"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["metamorphosis_note", "tag_match_summary"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pond_depth"] },
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
    "Did I mention that the pond bug and the dragonfly had the same mark?",
    "Did I describe how the pond bug and the dragonfly look different?",
    "Did I explain why they look so different even though they're the same bug?",
    "Did I avoid saying they are two different bugs?",
  ],
};
