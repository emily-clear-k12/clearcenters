// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.3A covers physical
// environments. Stored with an "SS." prefix so this code can never collide
// with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a same-day weather comparison between a
// desert and a mountain valley) — not a reworded version of Group Chat's
// SS.3.3A case, per the Signal Check checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.3A-SC",
  teksLabel: "3.3A",
  grade: 3,
  subject: "Social Studies",
  title: "Same Weather, Same Place?",
  tagline: "If two places have the same weather today, their land is basically the same too.",
  transmission: {
    claimHeadline: "If two places have the same weather today, their land is basically the same too.",
    source: "State Weather & Land Survey",
    loggedAt: "Today's Field Report",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-3a-sc-field-report.jpg",
    imageCaption: "State Weather & Land Survey — Today's Field Report",
    notes: "Today, both Desert Flats and Green Valley reported 75°F and sunny skies at noon. But surveyors found Desert Flats has sandy soil with cactus and very little plant cover, while Green Valley has tall pine trees and soil that stays damp from a mountain river. Desert Flats sits low and gets less than 5 inches of rain a year; Green Valley sits high in the mountains and gets about 40 inches. A visitor said, \"Since the weather's the same today, the land must look about the same too.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Desert Flats has sandy soil and cactus, with very little plant cover.",
      correctVerdict: "True",
      reasonText: "The soil sample shows dry, sandy ground, and the plant survey found mostly cactus and low shrubs.",
      stemEvidenceIds: ["desert_soil", "desert_plants"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Green Valley has tall pine trees and soil that stays damp from a nearby river.",
      correctVerdict: "True",
      reasonText: "The soil sample shows damp ground near a flowing river, and the plant survey found tall pines and thick ground cover.",
      stemEvidenceIds: ["valley_soil", "valley_plants"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since both places hit 75°F and sunny today, their land and plants must be nearly identical.",
      correctVerdict: "False",
      reasonText: "Desert Flats sits much lower and gets far less rain each year than Green Valley, which sits high in the mountains — today's matching weather doesn't erase that difference.",
      stemEvidenceIds: ["elevation_data", "rainfall_data"],
    },
  ],

  evidenceReadings: [
    { id: "desert_soil", label: "Desert Flats soil sample", reading: "Sandy soil, very dry, holds almost no water.", kind: "data" },
    { id: "desert_plants", label: "Desert Flats plant survey", reading: "Mostly cactus and low shrubs; very little ground cover.", kind: "data" },
    { id: "valley_soil", label: "Green Valley soil sample", reading: "Soil is damp to the touch, near a flowing river.", kind: "data" },
    { id: "valley_plants", label: "Green Valley plant survey", reading: "Tall pine trees and thick green ground cover.", kind: "data" },
    { id: "elevation_data", label: "Elevation records", reading: "Desert Flats sits at 200 feet; Green Valley sits at 3,500 feet in the mountains.", kind: "data" },
    { id: "rainfall_data", label: "Yearly rainfall records", reading: "Desert Flats gets under 5 inches of rain a year; Green Valley gets about 40 inches.", kind: "data" },
    { id: "visitor_count", label: "Green Valley park sign", reading: "About 40 visitors hiked the trail today.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["desert_soil", "desert_plants"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["valley_soil", "valley_plants"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["elevation_data", "rainfall_data"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["visitor_count"] },
  ],

  echo: {
    main: "Weather Survey transmission incoming, Cadet. Let's see if this claim holds up.",
    scan: "Same temperature, two very different places — read every reading carefully.",
    sort: "Notice how each place's soil and plants pair up, and how elevation tells its own story.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention Desert Flats' soil and plants?",
    "Did I mention Green Valley's soil and plants?",
    "Did I mention that elevation and rainfall are different between the two places?",
    "Did I avoid saying today's matching weather makes the two places' land the same?",
  ],
};
