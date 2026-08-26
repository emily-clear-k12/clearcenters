// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.9 has no sub-letter in
// the real TEKS (same trouble spot as 5.11). It covers demonstrating that
// Earth rotates on its axis approximately once every 24 hours and
// explaining how that rotation causes the day/night cycle, the apparent
// movement of the Sun, and changes in the position and shape of shadows.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.9-SC",
  teksLabel: "5.9",
  grade: 5,
  subject: "Science",
  title: "Does the Shadow Move Randomly?",
  tagline: "The flagpole's shadow just moves around randomly throughout the day — there's no real pattern to where it points.",
  transmission: {
    claimHeadline: "The flagpole's shadow just moves around randomly throughout the day — there's no real pattern to where it points.",
    source: "Flagpole Shadow Log",
    loggedAt: "Day 1 & Day 2",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The shadow points west in the morning and east in the afternoon, in that same order every day.",
      correctVerdict: "True",
      reasonText: "A direction change that happens the same way every single day is a real pattern, not randomness.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The shadow is shortest at midday, and repeating the measurements the next day produces the exact same pattern.",
      correctVerdict: "True",
      reasonText: "A pattern that repeats exactly on a second day is strong evidence it isn't random.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The shadow moves around with no real pattern.",
      correctVerdict: "False",
      reasonText: "Earth's rotation causes a predictable, repeating daily pattern in the sun's apparent position and the shadows it casts.",
    },
  ],

  evidenceReadings: [
    { id: "shadow_9am", label: "9 AM reading", reading: "At 9 AM, the shadow points to the west and is fairly long.", kind: "data" },
    { id: "shadow_3pm", label: "3 PM reading", reading: "At 3 PM, the shadow points to the east and is fairly long again.", kind: "data" },
    { id: "shadow_noon", label: "Noon reading", reading: "At noon, the shadow points almost straight north and is at its shortest.", kind: "data" },
    { id: "repeat_day_check", label: "Day 2 repeat check", reading: "Measuring the same three times the next day produces the exact same pattern.", kind: "data" },
    { id: "rotation_note", label: "Science note", reading: "Earth rotates once approximately every 24 hours, which causes the sun's apparent position in the sky to change throughout the day.", kind: "data" },
    { id: "shadow_length_note", label: "Science note", reading: "A shadow's length and direction change in a predictable pattern that repeats every day, tied to how high the sun appears in the sky.", kind: "data" },
    { id: "flagpole_material_note", label: "Flagpole note", reading: "The flagpole is made of aluminum.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["shadow_9am", "shadow_3pm"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["shadow_noon", "repeat_day_check"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["rotation_note", "shadow_length_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["flagpole_material_note"] },
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
    "Did I mention how the shadow's direction changed from morning to afternoon?",
    "Did I mention what happened when the measurements were repeated the next day?",
    "Did I explain what actually causes the shadow's pattern?",
    "Did I avoid saying the shadow moves with no real pattern?",
  ],
};
