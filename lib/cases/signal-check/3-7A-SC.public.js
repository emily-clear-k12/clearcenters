// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 3.7A covers how forces,
// including gravity, affect the motion of an object. Freshly framed for
// Signal Check — NOT a reworded version of the Group Chat "3.7A" trap line
// (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "3.7A-SC",
  teksLabel: "3.7A",
  grade: 3,
  subject: "Science",
  title: "Does Something Skip Gravity?",
  tagline: "A coffee filter drifting slowly to the floor proves gravity doesn't pull on light things.",
  transmission: {
    claimHeadline: "A coffee filter drifting slowly to the floor proves gravity doesn't pull on light things.",
    source: "Classroom Drop Test",
    loggedAt: "Trial #20",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The filter touched the floor every single time it was dropped.",
      correctVerdict: "True",
      reasonText: "The drop test log and floor check both show all 20 drops ended with the filter on the floor.",
      stemEvidenceIds: ["drop_log", "floor_check"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The same filter falls much faster when it's crumpled into a ball instead of left flat.",
      correctVerdict: "True",
      reasonText: "The flat filter took 4.1 seconds to fall, but the same filter crumpled into a ball took only 0.6 seconds.",
      stemEvidenceIds: ["flat_time", "crumpled_time"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Gravity skips over light objects like the filter.",
      correctVerdict: "False",
      reasonText: "Changing only the filter's shape changed its fall time, not gravity — air resistance is a separate force slowing the flat filter down.",
      stemEvidenceIds: ["shape_note", "gravity_definition"],
    },
  ],

  evidenceReadings: [
    { id: "drop_log", label: "Drop test log", reading: "The filter was dropped 20 times and touched the floor every single time.", kind: "data" },
    { id: "floor_check", label: "Floor check", reading: "No trial ended with the filter staying in the air — it always landed eventually.", kind: "data" },
    { id: "flat_time", label: "Flat filter timing", reading: "Flat filter: took 4.1 seconds to reach the floor.", kind: "data" },
    { id: "crumpled_time", label: "Crumpled filter timing", reading: "Same filter crumpled into a ball: took 0.6 seconds to reach the floor.", kind: "data" },
    { id: "shape_note", label: "Shape note", reading: "Changing only the filter's shape changed its fall time, not its weight.", kind: "data" },
    { id: "gravity_definition", label: "Science definition note", reading: "Gravity pulls on every object with mass; air resistance is a separate force that can slow a fall down.", kind: "data" },
    { id: "filter_brand", label: "Filter brand note", reading: "This box of filters is a different brand than the one used last month.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["drop_log", "floor_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["flat_time", "crumpled_time"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["shape_note", "gravity_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["filter_brand"] },
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
    "Did I mention that the filter landed every single time it was dropped?",
    "Did I compare the flat filter's fall time to the crumpled filter's fall time?",
    "Did I explain what's really slowing the flat filter down?",
    "Did I avoid saying gravity skips light objects?",
  ],
};
