// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12B covers describing
// the cycling of matter and the flow of energy through food webs,
// including the roles of the Sun, producers, consumers, and decomposers.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.12B-SC",
  teksLabel: "4.12B",
  grade: 4,
  subject: "Science",
  title: "Do Decomposers Even Matter?",
  tagline: "Decomposers just clean up dead stuff. They are not really part of the food web.",
  transmission: {
    claimHeadline: "Decomposers just clean up dead stuff. They are not really part of the food web.",
    source: "Forest Floor Food Web Study",
    loggedAt: "5-Month Study",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Mushrooms break a fallen log down into soil over five months.",
      correctVerdict: "True",
      reasonText: "This shows decomposers take nutrients out of dead things. They put them back in a form other living things can use.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "New plants grown in that broken-down soil grow taller and greener than plants grown without it.",
      correctVerdict: "True",
      reasonText: "That is a direct link. What the decomposers broke down ended up in new producers, the base of the food web.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Decomposers are not really part of the food web.",
      correctVerdict: "False",
      reasonText: "Decomposers put nutrients back in the soil, and producers need them to grow. So every consumer up the food web depends on decomposers too.",
    },
  ],

  evidenceReadings: [
    { id: "log_before", label: "Log check, month 1", reading: "At the start, a fallen log is mostly whole and covered in mushrooms.", kind: "data" },
    { id: "log_after", label: "Log check, month 5", reading: "Five months later, the log is mostly broken down into dark soil.", kind: "data" },
    { id: "soil_test_decomposed", label: "Growth test, decomposed soil", reading: "Plants grown in soil with the broken-down log grew taller and greener in one month.", kind: "data" },
    { id: "soil_test_plain", label: "Growth test, plain soil", reading: "Plants grown in soil without it grew shorter and paler in the same month.", kind: "data" },
    { id: "decomposer_role_note", label: "Science note", reading: "Decomposers break down dead plants and animals. They put the nutrients back in the soil.", kind: "data" },
    { id: "producer_dependency_note", label: "Science note", reading: "Producers need those nutrients to grow. Every consumer in the food web depends on producers.", kind: "data" },
    { id: "mushroom_shape_note", label: "Mushroom note", reading: "The mushrooms on the log looked like small umbrellas.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["log_before", "log_after"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["soil_test_decomposed", "soil_test_plain"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["decomposer_role_note", "producer_dependency_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["mushroom_shape_note"] },
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
    "Did I mention what happened to the log over the five months?",
    "Did I compare the plants grown with and without the decomposed soil?",
    "Did I explain how decomposers connect to producers and consumers?",
    "Did I avoid saying decomposers aren't part of the food web?",
  ],
};
