// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.12B covers food-web
// interdependence. Freshly framed for Signal Check — NOT a reworded
// version of the Group Chat "3.12B" trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.12B-SC",
  teksLabel: "3.12B",
  grade: 3,
  subject: "Science",
  title: "What Happens If the Frogs Disappear?",
  tagline: "If you remove one kind of animal from a pond, everything else stays exactly the same.",
  transmission: {
    claimHeadline: "If you remove one kind of animal from a pond, everything else stays exactly the same.",
    source: "Pond Food Web Log",
    loggedAt: "Spring Survey",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Frogs are a food source for herons at the pond.",
      correctVerdict: "True",
      reasonText: "The diet log and feeding watch both show frogs are a large part of what herons eat here.",
      stemEvidenceIds: ["heron_diet", "feeding_watch"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "If frogs disappeared, herons would switch food with zero real change.",
      correctVerdict: "Misleading",
      reasonText: "Herons can eat other food, but the heron count still dropped when the frog population dropped — so it's not \"zero\" change.",
      stemEvidenceIds: ["other_food", "heron_count"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Removing one species from a pond has zero effect on the rest of the pond.",
      correctVerdict: "False",
      reasonText: "The pond survey shows a real ripple effect through the food web when frogs dropped.",
      stemEvidenceIds: ["pond_survey", "ripple_note"],
    },
  ],

  evidenceReadings: [
    { id: "heron_diet", label: "Heron diet log", reading: "Frogs make up a large share of what herons eat at this pond.", kind: "data" },
    { id: "feeding_watch", label: "Feeding watch", reading: "Herons were seen catching frogs on 6 out of 10 visits.", kind: "data" },
    { id: "other_food", label: "Alternate food note", reading: "Herons can also eat small fish and insects at the pond.", kind: "data" },
    { id: "heron_count", label: "Heron count log", reading: "After a frog population drop last spring, the number of herons at the pond also dropped.", kind: "data" },
    { id: "pond_survey", label: "Pond survey", reading: "Fewer frogs this spring lined up with fewer herons and more of the insects herons used to eat frogs instead of.", kind: "data" },
    { id: "ripple_note", label: "Food web note", reading: "Scientists call this kind of chain reaction a ripple effect through the food web.", kind: "data" },
    { id: "pond_color", label: "Water color note", reading: "The pond water looked a bit greener than usual this spring.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["heron_diet", "feeding_watch"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["other_food", "heron_count"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["pond_survey", "ripple_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pond_color"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet, and one signal is trickier than it looks. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that frogs are a real food source for herons?",
    "Did I explain why \"herons would just switch food with no change\" isn't the full picture?",
    "Did I explain how the pond survey shows a ripple effect?",
    "Did I avoid saying removing one species has zero effect on the rest of the pond?",
  ],
};
