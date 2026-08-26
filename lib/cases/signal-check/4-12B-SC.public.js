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
  tagline: "Decomposers are just tidying up dead stuff — they're not really part of the food web at all.",
  transmission: {
    claimHeadline: "Decomposers are just tidying up dead stuff — they're not really part of the food web at all.",
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
      reasonText: "This shows decomposers move nutrients out of dead material and back into a form other living things can use.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "New plants grown in that decomposed soil grow taller and greener than plants grown without it.",
      correctVerdict: "True",
      reasonText: "That's a direct link — the material the decomposers processed made its way into new producers, the base of the food web.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Decomposers aren't really part of the food web.",
      correctVerdict: "False",
      reasonText: "Decomposers return nutrients to the soil that producers need to grow, which means every consumer up the food web depends on them too.",
    },
  ],

  evidenceReadings: [
    { id: "log_before", label: "Log check, month 1", reading: "A fallen log sits mostly whole, covered in mushrooms, at the start of the study.", kind: "data" },
    { id: "log_after", label: "Log check, month 5", reading: "The same spot, five months later, shows the log mostly broken down into dark soil.", kind: "data" },
    { id: "soil_test_decomposed", label: "Growth test, decomposed soil", reading: "Plants grown in the decomposer-enriched soil grew taller and greener after one month.", kind: "data" },
    { id: "soil_test_plain", label: "Growth test, plain soil", reading: "Plants grown in soil without the added decomposed material grew shorter and paler in the same month.", kind: "data" },
    { id: "decomposer_role_note", label: "Science note", reading: "Decomposers break down dead plants and animals and return their nutrients to the soil.", kind: "data" },
    { id: "producer_dependency_note", label: "Science note", reading: "Producers need those nutrients to grow, and every consumer in the food web depends on producers.", kind: "data" },
    { id: "mushroom_shape_note", label: "Mushroom note", reading: "The mushrooms on the log were shaped like small umbrellas.", kind: "distractor" },
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
