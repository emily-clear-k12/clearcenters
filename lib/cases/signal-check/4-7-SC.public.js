// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.7 covers how forces,
// including gravity, cause changes in the motion of an object. Freshly
// framed for Signal Check — NOT a reworded version of the Group Chat
// "4.7" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.7-SC",
  teksLabel: "4.7",
  grade: 4,
  subject: "Science",
  title: "Moving on Its Own?",
  tagline: "The shopping cart rolled away by itself, even though the parking lot looks totally flat.",
  transmission: {
    claimHeadline: "The shopping cart rolled away by itself, even though the parking lot looks totally flat. It must have moved with no push or pull at all.",
    source: "Parking Lot Slope Investigation",
    loggedAt: "Trial 5",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A marble placed on that same spot always rolls the same direction.",
      correctVerdict: "True",
      reasonText: "The marble test and the repeat marble test both show it rolling the same way every time.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A level tool shows the parking lot is a little higher on one side, even though it looks flat.",
      correctVerdict: "True",
      reasonText: "The level check and the height check both confirm one end sits higher than the other.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The cart moved with no force pushing or pulling it at all.",
      correctVerdict: "False",
      reasonText: "Gravity was pulling the cart down a slope too small to see — that's still a force acting on it.",
    },
  ],

  evidenceReadings: [
    { id: "marble_test_1", label: "Marble test", reading: "A marble placed at that spot rolled toward the same corner every time.", kind: "data" },
    { id: "marble_test_2", label: "Marble test, again", reading: "Trying it four more times, the marble always rolled the same way.", kind: "data" },
    { id: "level_reading", label: "Level tool check", reading: "A bubble level shows this spot is not perfectly flat.", kind: "data" },
    { id: "height_measure", label: "Height check", reading: "One end of the lot is 8 cm higher than the other end.", kind: "data" },
    { id: "gravity_note", label: "Science note", reading: "Gravity pulls things downhill, even on a slope so small you can't see it.", kind: "data" },
    { id: "slope_definition", label: "Slope note", reading: "A slope can be too small to see but still be enough to make something roll.", kind: "data" },
    { id: "cart_color", label: "Cart note", reading: "The shopping cart that rolled away was red.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["marble_test_1", "marble_test_2"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["level_reading", "height_measure"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["gravity_note", "slope_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["cart_color"] },
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
    "Did I mention that the marble always rolls the same direction?",
    "Did I mention what the level tool showed about the parking lot?",
    "Did I name the force that was actually acting on the cart?",
    "Did I avoid saying no force was acting on the cart?",
  ],
};
