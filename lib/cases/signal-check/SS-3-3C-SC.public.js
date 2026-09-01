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
    notes: "This year, surveyors compared photos of Miller's Creek. A flood in the spring widened the creek's bank on the east side. Later, construction crews cut a new road through the hillside above the creek for a housing development. In the fall, workers bulldozed a nearby field to build a parking lot. The survey's change log counted three changes total this year: one caused by weather, and two caused by construction.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A flood is what widened Miller's Creek's bank.",
      correctVerdict: "True",
      reasonText: "The spring flood photo shows the east bank widened right after heavy rain, matching how narrow it was the year before.",
      stemEvidenceIds: ["flood_photo", "creek_before"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The new road through the hillside was carved out by a landslide.",
      correctVerdict: "False",
      reasonText: "The road photo shows construction equipment tracks, and the company's own log records the crew grading the road over three weeks — no landslide involved.",
      stemEvidenceIds: ["road_photo", "construction_log"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since the flood was natural, everything that changed at Miller's Creek this year was caused by nature.",
      correctVerdict: "Misleading",
      reasonText: "The flood really was natural, but the change log shows two of the year's three changes — the road and the parking lot — were caused by construction, not nature.",
      stemEvidenceIds: ["parking_photo", "change_tally"],
    },
  ],

  evidenceReadings: [
    { id: "flood_photo", label: "Spring flood photo", reading: "Creek bank on the east side widened after heavy spring rain.", kind: "data" },
    { id: "creek_before", label: "Creek survey, last year", reading: "Before the flood, the east bank was narrow and steady.", kind: "data" },
    { id: "road_photo", label: "New hillside road photo", reading: "A road was cut through the hillside; construction equipment tracks are visible.", kind: "data" },
    { id: "construction_log", label: "Construction company log", reading: "Crew graded the hillside road over three weeks in June.", kind: "data" },
    { id: "parking_photo", label: "New parking lot photo", reading: "A field was bulldozed and paved for a housing development's parking lot.", kind: "data" },
    { id: "change_tally", label: "This year's change log", reading: "3 changes recorded at Miller's Creek this year: 1 caused by weather, 2 caused by construction.", kind: "data" },
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
