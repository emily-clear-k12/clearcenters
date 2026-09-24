// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.3C covers human
// impact on landscapes. Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a year of changes at a fictional creek) — not
// a reworded version of Group Chat's SS.3.3C case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.3C-SC",
  teksLabel: "3.3C",
  grade: 3,
  subject: "Social Studies",
  title: "Who Changed Miller's Creek?",
  tagline: "Every change to this landscape happened because of nature, not people.",
  transmission: {
    claimHeadline: "Every change to this landscape happened because of nature, not people.",
    source: "Miller's Creek Conservation Photos",
    loggedAt: "This Year's Site Survey",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-3c-sc-field-report.jpg",
    imageCaption: "Miller's Creek Conservation — This Year's Site Survey",
    notes: "This year, workers compared photos of Miller's Creek. In the spring, a flood made the east bank of the creek wider. Later, a crew cut a new road into the hill above the creek. The road was for new houses. In the fall, workers cleared a field to build a parking lot. The change log counted three changes this year. Weather caused one. Building work caused two.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A flood is what widened Miller's Creek's bank.",
      correctVerdict: "True",
      reasonText: "The spring flood photo shows the east bank got wider right after heavy rain. The year before, it was narrow.",
      stemEvidenceIds: ["flood_photo", "creek_before"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A landslide carved out the new road on the hill.",
      correctVerdict: "False",
      reasonText: "The road photo shows tracks from building machines. The crew's own log says they spent three weeks making the road. No landslide happened.",
      stemEvidenceIds: ["road_photo", "construction_log"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The flood was natural, so nature caused everything that changed at Miller's Creek this year.",
      correctVerdict: "Misleading",
      reasonText: "The flood really was natural. But the change log shows people caused two of the three changes. Building work made the road and the parking lot.",
      stemEvidenceIds: ["parking_photo", "change_tally"],
    },
  ],

  evidenceReadings: [
    { id: "flood_photo", label: "Spring flood photo", reading: "The east bank of the creek got wider after heavy spring rain.", kind: "data" },
    { id: "creek_before", label: "Creek survey, last year", reading: "Before the flood, the east bank was narrow and steady.", kind: "data" },
    { id: "road_photo", label: "New hillside road photo", reading: "A road was cut into the hill. Tracks from building machines can be seen.", kind: "data" },
    { id: "construction_log", label: "Construction company log", reading: "A crew worked on the hill road for three weeks in June.", kind: "data" },
    { id: "parking_photo", label: "New parking lot photo", reading: "A field was cleared and paved for a parking lot for new houses.", kind: "data" },
    { id: "change_tally", label: "This year's change log", reading: "3 changes at Miller's Creek this year: 1 caused by weather, 2 caused by building work.", kind: "data" },
    { id: "creek_wildlife", label: "Creek wildlife log", reading: "Volunteers counted 12 ducks near the creek this spring.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["flood_photo", "creek_before"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["road_photo", "construction_log"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["parking_photo", "change_tally"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["creek_wildlife"] },
  ],

  echo: {
    main: "Conservation photos incoming, Cadet. Let's see if this claim holds up.",
    scan: "One flood, one road, one parking lot — read every photo and log carefully.",
    sort: "Notice how the change log sums up the whole year in one place.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the flood caused the creek bank to widen?",
    "Did I mention that construction crews, not a landslide, made the new road?",
    "Did I mention that the change log shows more construction changes than natural ones?",
    "Did I avoid saying every change this year was caused by nature?",
  ],
};
