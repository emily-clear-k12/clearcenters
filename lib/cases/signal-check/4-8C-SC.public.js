// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.8C covers how electrical
// energy needs a complete circuit to flow. Freshly framed for Signal
// Check — NOT a reworded version of the Group Chat "4.8C" trap line (see
// COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.8C-SC",
  teksLabel: "4.8C",
  grade: 4,
  subject: "Science",
  title: "Used Up by the First Bulb?",
  tagline: "The first bulb in the string uses up the electricity, so the bulbs at the end must get no power.",
  transmission: {
    claimHeadline: "The first bulb in the string uses up the electricity, so the bulbs at the end must get no power.",
    source: "Holiday Light String Test",
    loggedAt: "Trial 1",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Every bulb in the string glows the exact same brightness, from first to last.",
      correctVerdict: "True",
      reasonText: "Both the first bulb check and the last bulb check show the exact same brightness.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Taking out only the very last bulb makes every bulb in the string go dark, including the first one.",
      correctVerdict: "True",
      reasonText: "Removing the last bulb, and separately removing the first bulb, both make the whole string go dark.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The first bulb uses up the electricity, so bulbs at the end get no power.",
      correctVerdict: "False",
      reasonText: "Electricity has to travel all the way around the full loop — it isn't used up by the first bulb.",
    },
  ],

  evidenceReadings: [
    { id: "brightness_first", label: "First bulb check", reading: "The first bulb glows the same brightness as the others.", kind: "data" },
    { id: "brightness_last", label: "Last bulb check", reading: "The last bulb glows the exact same brightness as the first.", kind: "data" },
    { id: "unscrew_last", label: "Remove the last bulb", reading: "Taking out only the last bulb makes every bulb in the string go dark.", kind: "data" },
    { id: "unscrew_first", label: "Remove the first bulb", reading: "Taking out only the first bulb also makes every other bulb go dark.", kind: "data" },
    { id: "circuit_note", label: "Science note", reading: "Electricity has to travel all the way around a full loop to keep every bulb lit.", kind: "data" },
    { id: "science_definition", label: "Science note", reading: "The whole loop has to stay connected. No single bulb uses up all the electricity.", kind: "data" },
    { id: "bulb_shape", label: "Bulb note", reading: "The bulbs in this string are shaped like tiny icicles.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["brightness_first", "brightness_last"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["unscrew_last", "unscrew_first"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["circuit_note", "science_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["bulb_shape"] },
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
    "Did I compare the brightness of the first and last bulbs?",
    "Did I mention what happens when the last bulb is removed?",
    "Did I explain what electricity actually needs to keep every bulb lit?",
    "Did I avoid saying the first bulb uses up all the electricity?",
  ],
};
