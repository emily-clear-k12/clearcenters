// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.13B covers
// differentiating between inherited physical traits and acquired physical
// traits. Freshly framed for Signal Check — NOT a reworded version of any
// Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.13B-SC",
  teksLabel: "4.13B",
  grade: 4,
  subject: "Science",
  title: "Will the Puppies Get the Same Scar?",
  tagline: "The mother dog has a notch in her ear from an old fence accident. So her puppies will be born with the same notch.",
  transmission: {
    claimHeadline: "The mother dog has a notch in her ear from an old fence accident. So her puppies will be born with the same notch.",
    source: "Litter Comparison Log",
    loggedAt: "Birth Week",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "All six puppies were born with smooth ears. Their mother's ears looked like that too before the accident.",
      correctVerdict: "True",
      reasonText: "None of the puppies have the ear notch, even though the notch is now a lasting part of the mother's ear.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The mother was born with her fur color and floppy ear shape. Those traits show up in every puppy.",
      correctVerdict: "True",
      reasonText: "The traits the mother was born with are the ones that get passed on to her puppies.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The puppies will be born with the same ear notch their mother got in the fence accident.",
      correctVerdict: "False",
      reasonText: "A scar from an accident is an acquired trait. The mother picked it up during her life. It is not passed down to her puppies.",
    },
  ],

  evidenceReadings: [
    { id: "puppy_ear_check", label: "Puppy ear check", reading: "All six puppies were born with smooth, unmarked ears.", kind: "data" },
    { id: "mother_ear_before_note", label: "Mother's ears, before accident", reading: "Photos from before the accident show the mother's ears were smooth too.", kind: "data" },
    { id: "fur_color_match", label: "Fur color check", reading: "Every puppy has the same fur color as its mother.", kind: "data" },
    { id: "ear_shape_match", label: "Ear shape check", reading: "Every puppy also has the same floppy ear shape its mother was born with.", kind: "data" },
    { id: "inherited_trait_note", label: "Science note", reading: "Inherited traits, like fur color and ear shape, pass from parent to young through genes.", kind: "data" },
    { id: "acquired_trait_note", label: "Science note", reading: "Acquired traits, like a scar or a haircut, happen during an animal's life. They are not passed on to its babies.", kind: "data" },
    { id: "puppy_count_note", label: "Litter note", reading: "The litter had six puppies total.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["puppy_ear_check", "mother_ear_before_note"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["fur_color_match", "ear_shape_match"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["inherited_trait_note", "acquired_trait_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["puppy_count_note"] },
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
    "Did I mention what the puppies' ears actually looked like?",
    "Did I mention which traits DID show up the same in every puppy?",
    "Did I explain the difference between an inherited trait and an acquired trait?",
    "Did I avoid saying the puppies will be born with their mother's scar?",
  ],
};
