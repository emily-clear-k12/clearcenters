// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6D covers illustrating
// how matter is made of particles that are too small to see, such as air
// inside a balloon. Freshly framed for Signal Check — NOT a reworded
// version of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.6D-SC",
  teksLabel: "5.6D",
  grade: 5,
  subject: "Science",
  title: "Is an Empty Balloon Really Empty?",
  tagline: "A balloon before it's blown up is completely empty — there's nothing inside it at all.",
  transmission: {
    claimHeadline: "A balloon before it's blown up is completely empty — there's nothing inside it at all.",
    source: "Balloon Weight Test",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "An inflated balloon weighs a tiny bit more on a sensitive scale than the same balloon deflated.",
      correctVerdict: "True",
      reasonText: "If the balloon truly had nothing extra inside it, inflating it shouldn't add any weight at all.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A deflated balloon can be flattened almost completely, but a fully inflated one pushes back and holds its shape.",
      correctVerdict: "True",
      reasonText: "Something inside the inflated balloon is pushing outward — that's evidence it isn't empty.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "An uninflated balloon has nothing inside it at all.",
      correctVerdict: "False",
      reasonText: "Air is made of particles too small to see, but those particles still take up space and have a tiny bit of mass, even when the balloon looks flat and empty.",
    },
  ],

  evidenceReadings: [
    { id: "weight_deflated", label: "Weight, deflated", reading: "A deflated balloon weighs a certain amount on a sensitive scale.", kind: "data" },
    { id: "weight_inflated", label: "Weight, inflated", reading: "The same balloon, fully inflated, weighs slightly more on that same scale.", kind: "data" },
    { id: "push_back_test", label: "Push-back test", reading: "A fully inflated balloon pushes back firmly when squeezed.", kind: "data" },
    { id: "flatten_test", label: "Flatten test", reading: "The same balloon, deflated, can be flattened almost completely flat.", kind: "data" },
    { id: "particle_note", label: "Science note", reading: "Air is made of particles too small to see, but those particles still take up space and have a tiny bit of mass.", kind: "data" },
    { id: "air_matter_note", label: "Science note", reading: "Even 'empty'-looking air around us is actually matter, made of countless tiny particles.", kind: "data" },
    { id: "balloon_color_note", label: "Balloon note", reading: "The balloon used for the test was bright red.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["weight_deflated", "weight_inflated"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["push_back_test", "flatten_test"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["particle_note", "air_matter_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["balloon_color_note"] },
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
    "Did I compare the balloon's weight deflated and inflated?",
    "Did I mention what happens when the inflated balloon is squeezed?",
    "Did I explain what air actually is, in my own words?",
    "Did I avoid saying the uninflated balloon has nothing inside it?",
  ],
};
