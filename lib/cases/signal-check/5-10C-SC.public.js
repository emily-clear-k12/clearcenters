// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.10C covers modeling and
// identifying how changes to Earth's surface caused by wind, water, and
// ice result in the formation of landforms, including deltas, canyons,
// and sand dunes. Freshly framed for Signal Check — NOT a reworded
// version of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.10C-SC",
  teksLabel: "5.10C",
  grade: 5,
  subject: "Science",
  title: "Did the Canyon Really Form Overnight?",
  tagline: "That whole canyon must have cracked open in one single earthquake overnight — canyons that size don't take long to form.",
  transmission: {
    claimHeadline: "That whole canyon must have cracked open in one single earthquake overnight — canyons that size don't take long to form.",
    source: "Canyon Field Survey",
    loggedAt: "Site Visit 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The canyon's rock layers show matching bands on both sides, lining up across the gap, and a river still runs along the bottom today.",
      correctVerdict: "True",
      reasonText: "Matching layers on both sides is a strong sign the rock used to be one continuous piece before something slowly carved it apart.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "In a classroom model, repeated water flow over a clay tray carves a visible groove over several days, but shaking the same tray hard once does nothing.",
      correctVerdict: "True",
      reasonText: "The model shows repeated water flow, not a single sudden event, is what actually carves a groove like a canyon.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The canyon formed in one single overnight event.",
      correctVerdict: "False",
      reasonText: "Canyons typically form over a very long time as flowing water slowly erodes rock layers away, not in one sudden event.",
    },
  ],

  evidenceReadings: [
    { id: "matching_layers", label: "Rock layer check", reading: "The canyon's rock layers show matching bands on both sides, lining up across the gap.", kind: "data" },
    { id: "river_still_flowing", label: "River check", reading: "A river still runs along the bottom of the canyon today.", kind: "data" },
    { id: "model_water_result", label: "Classroom model, water", reading: "In the classroom model, repeated water flow over the clay tray carves a visible groove over several days.", kind: "data" },
    { id: "model_shake_result", label: "Classroom model, shake", reading: "The same clay tray, shaken hard once, shows no new groove or crack at all.", kind: "data" },
    { id: "erosion_note", label: "Science note", reading: "Canyons typically form over a very long time as flowing water slowly erodes rock layers away.", kind: "data" },
    { id: "landform_note", label: "Science note", reading: "Wind, water, and ice can all reshape Earth's surface over time, forming landforms like canyons, deltas, and sand dunes.", kind: "data" },
    { id: "canyon_temp_note", label: "Canyon note", reading: "The canyon floor was noticeably cooler than the rim.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["matching_layers", "river_still_flowing"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["model_water_result", "model_shake_result"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["erosion_note", "landform_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["canyon_temp_note"] },
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
    "Did I mention the matching rock layers on both sides of the canyon?",
    "Did I mention what happened in the model with repeated water versus a single shake?",
    "Did I explain what process actually forms a canyon?",
    "Did I avoid saying the canyon formed in one overnight event?",
  ],
};
