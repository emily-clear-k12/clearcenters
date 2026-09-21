// Signal Check — safe to import from client components.
//
// Math Signal Check — MA.3.8B-SC. TEKS 3.8B — solve one- and two-step problems using categorical data represented with a frequency table, dot plot, pictograph, or bar graph with scaled intervals.
// Standard checked against Emily's official Texas TEKS PDF before writing.
// Freshly framed for Signal Check — not a reworded version of the
// Group Chat case on this standard (see SIGNAL_CHECK_CHECKLIST.md rule 8).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "MA.3.8B-SC",
  teksLabel: "3.8B",
  grade: 3,
  subject: "Math",
  title: "The Lunch Vote",
  tagline: "More kids picked pizza than all the other lunches put together.",
  transmission: {
    claimHeadline: "More kids picked pizza than all the other lunches put together.",
    source: "Cafeteria Lunch Vote",
    loggedAt: "Friday, Room 12",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Pizza got more votes than any other single lunch.",
      correctVerdict: "True",
      reasonText: "The pizza bar reaches 14, which is higher than tacos at 8, salad at 6, and soup at 4.",
      stemEvidenceIds: ["pizza_bar", "other_bars"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Pizza got more votes than tacos, salad, and soup added together.",
      correctVerdict: "False",
      reasonText: "Tacos, salad, and soup add up to 8 + 6 + 4 = 18 votes, which is more than pizza's 14.",
      stemEvidenceIds: ["others_total", "scale_note"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Most of the class picked pizza.",
      correctVerdict: "Misleading",
      reasonText: "Pizza was the top pick, but 14 is less than half of the 32 students who voted.",
      stemEvidenceIds: ["class_total", "half_note"],
    },
  ],

  evidenceReadings: [
    { id: "pizza_bar", label: "Pizza bar", reading: "The pizza bar reaches the line marked 14.", kind: "data" },
    { id: "other_bars", label: "Other bars", reading: "The taco bar reaches 8, the salad bar reaches 6, and the soup bar reaches 4.", kind: "data" },
    { id: "others_total", label: "Adding the others", reading: "Tacos, salad, and soup together: 8 + 6 + 4 = 18 votes.", kind: "data" },
    { id: "scale_note", label: "Graph scale", reading: "Each line on this graph counts by 2s, not by 1s.", kind: "data" },
    { id: "class_total", label: "Class count", reading: "32 students voted in all.", kind: "data" },
    { id: "half_note", label: "Half the class", reading: "Half of 32 students is 16.", kind: "data" },
    { id: "paper", label: "Paper color", reading: "The graph was printed on blue paper.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["pizza_bar", "other_bars"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["others_total", "scale_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["class_total", "half_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["paper"] },
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
    "Did I read the graph's scale, which counts by 2s?",
    "Did I add up tacos, salad, and soup?",
    "Did I compare pizza's votes to half the class?",
    "Did I avoid saying pizza got more votes than all the others?",
  ],
};
