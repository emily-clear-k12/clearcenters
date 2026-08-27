// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.13A covers analyzing the
// structures and functions of different species to determine how
// organisms survive in the same environment. Freshly framed for Signal
// Check with a pond setting — deliberately NOT the desert scenario used
// by the Group Chat trap line for this standard (see COVERAGE_MAP.md
// rule 8: same underlying misconception is fine, same scenario is not).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.13A-SC",
  teksLabel: "5.13A",
  grade: 5,
  subject: "Science",
  title: "Do All the Pond Animals Survive the Same Way?",
  tagline: "Every animal living in that same pond must be surviving winter the exact same way — they're all in the same water, after all.",
  transmission: {
    claimHeadline: "Every animal living in that same pond must be surviving winter the exact same way — they're all in the same water, after all.",
    source: "Pond Winter Survey",
    loggedAt: "Winter Season",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Pond turtles bury themselves in mud and slow their breathing dramatically for winter, while pond fish keep swimming and feeding slowly under the ice the same season.",
      correctVerdict: "True",
      reasonText: "Two very different strategies, in the very same pond, at the very same time, are already evidence against one shared method.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Pond frogs let much of their body freeze nearly solid and thaw out again in spring — a third, completely different strategy in that same pond.",
      correctVerdict: "True",
      reasonText: "A third distinct strategy in the same shared habitat makes the pattern even clearer.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Every animal in the pond survives winter the exact same way.",
      correctVerdict: "False",
      reasonText: "Different species have different body structures and functions that let them survive the very same environment in their own distinct ways.",
    },
  ],

  evidenceReadings: [
    { id: "turtle_behavior", label: "Turtle winter behavior", reading: "Pond turtles bury themselves in the mud at the bottom and slow their breathing dramatically for winter.", kind: "data" },
    { id: "fish_behavior", label: "Fish winter behavior", reading: "Pond fish keep swimming and feeding slowly under the ice throughout the same winter.", kind: "data" },
    { id: "frog_behavior", label: "Frog winter behavior", reading: "Pond frogs allow much of their body to freeze nearly solid, then thaw out again in spring.", kind: "data" },
    { id: "same_pond_note", label: "Habitat check", reading: "All three species live in the exact same pond, in the same water, during the same winter.", kind: "data" },
    { id: "structure_function_note", label: "Science note", reading: "Different species have different body structures and functions that let them survive the same environment in different ways.", kind: "data" },
    { id: "survival_strategy_note", label: "Science note", reading: "A shared habitat doesn't mean every species uses the same survival strategy — each one is suited to its own structures.", kind: "data" },
    { id: "pond_size_note", label: "Pond note", reading: "The pond covers about two acres.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["turtle_behavior", "fish_behavior"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["frog_behavior", "same_pond_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["structure_function_note", "survival_strategy_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pond_size_note"] },
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
    "Did I compare how the turtles and fish each survive winter?",
    "Did I mention the frogs' completely different strategy?",
    "Did I explain why species in the same habitat can still survive differently?",
    "Did I avoid saying every pond animal survives winter the exact same way?",
  ],
};
