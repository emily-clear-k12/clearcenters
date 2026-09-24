// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.6B covers comparing
// Texas's four physical regions. Stored with an "SS." prefix so this code
// can never collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a same-day regional weather comparison) — not
// a reworded version of Group Chat's SS.4.6B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.6B-SC",
  teksLabel: "4.6B",
  grade: 4,
  subject: "Social Studies",
  title: "Which Texas Region Fits?",
  tagline: "If two regions have the same weather today, they are the same region.",
  transmission: {
    claimHeadline: "If two regions have the same weather today, they are the same region.",
    source: "Texas Regions Field Survey",
    loggedAt: "Today's Regional Comparison",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-6b-sc-field-report.jpg",
    imageCaption: "Texas Regions Field Survey — Today's Regional Comparison",
    notes: "Today at noon, it was warm and humid in both the Piney Woods and the Coastal Plains. But the land is not the same. The Piney Woods is far inland in East Texas. It has thick pine forests and red clay soil. The Coastal Plains sits right on the Gulf of Mexico. It has flat grasslands, marshes, and sandy soil. A student said, \"They both felt hot and sticky today. So they must be the same region.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The Piney Woods region has thick pine forests and red clay soil.",
      correctVerdict: "True",
      reasonText: "The land survey and the soil sample both show thick pine forest and red clay soil across the region.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Coastal Plains region has flat grasslands and marshes near the Gulf of Mexico.",
      correctVerdict: "True",
      reasonText: "The land survey and the soil sample both show flat grasslands, marshes, and sandy soil along the coast.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Both regions felt warm and humid today, so they must be the same region.",
      correctVerdict: "False",
      reasonText: "A region is set by its landforms, soil, and vegetation. One day's weather does not change that. A forest and a coast are still different.",
    },
  ],

  evidenceReadings: [
    { id: "pineywoods_forest", label: "Piney Woods land survey", reading: "Thick pine forest across most of the region.", kind: "document" },
    { id: "pineywoods_soil", label: "Piney Woods soil sample", reading: "Red clay soil, common across East Texas.", kind: "document" },
    { id: "coastal_grassland", label: "Coastal Plains land survey", reading: "Flat grasslands and marshes that stretch to the Gulf.", kind: "document" },
    { id: "coastal_soil", label: "Coastal Plains soil sample", reading: "Sandy soil near the coastline.", kind: "document" },
    { id: "weather_reading", label: "Today's weather report", reading: "Both regions were warm and humid at noon.", kind: "document" },
    { id: "region_definition", label: "Regions reference guide", reading: "A Texas region is set by its landforms, soil, and vegetation, not by one day's weather.", kind: "document" },
    { id: "county_map", label: "County boundary map", reading: "Shows the county lines drawn across both regions.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["pineywoods_forest", "pineywoods_soil"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["coastal_grassland", "coastal_soil"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["weather_reading", "region_definition"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["county_map"] },
  ],

  echo: {
    main: "Regional survey incoming, Cadet. Let's see if this claim holds up.",
    scan: "Same weather, two very different landscapes — read every record carefully.",
    sort: "Notice how landforms and soil, not weather, define each region.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention the Piney Woods' forests and soil?",
    "Did I mention the Coastal Plains' grasslands, marshes, and soil?",
    "Did I mention that regions are defined by landforms and soil, not a single day's weather?",
    "Did I avoid saying matching weather makes two regions basically the same?",
  ],
};
