// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4C: "Identify
// significant events and concepts related to U.S. expansion, including the
// Louisiana Purchase, Lewis and Clark expedition, and Manifest Destiny."
//
// This case deliberately deals only in documented facts (the expedition's
// own journals, trade and guide records) — no dramatized scenes, no
// invented dialogue, no depiction of the historical figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.4C-SC",
  teksLabel: "5.4C",
  grade: 5,
  subject: "Social Studies",
  title: "First to See It?",
  tagline: "Lewis and Clark were the first people to ever see the land they explored.",
  transmission: {
    claimHeadline: "Lewis and Clark were the first people to ever see the land they explored.",
    source: "Corps of Discovery Expedition Log",
    loggedAt: "1804–1806",
  },

  // Grade 5: no scaffolding left — verdict and reasoning are both typed.
  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-4c-sc-field-report.jpg",
    imageCaption: "Corps of Discovery Expedition Log, 1804–1806",
    notes: "The group's own journals describe the land, plants, and animals Lewis and Clark came across. But the same journals show the group meeting, trading with, and depending on Native nations again and again. These nations already lived along the route. Maps from the time mark dozens of their villages and lands along the way. Those places were there long before Lewis and Clark came.\n\nThe journals tell about Sacagawea's work many times. She translated for the group and helped guide it through land it did not know. She also helped the group trade for food in a hard winter. Some later summaries shrink the story down to \"the first people to see the West.\" But the group's own records tell a fuller story. The land was full of people, and some of them helped the group stay alive.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Lewis and Clark explored land that no person had ever set foot on before.",
      correctVerdict: "False",
      reasonText: "Dozens of Native nations had lived on that land for a long time before Lewis and Clark came.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Sacagawea helped the expedition talk with the Native nations they met and find their way.",
      correctVerdict: "True",
      reasonText: "Sacagawea served as an interpreter and guide. Having her with them helped the group deal safely with nations along the route.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The trip's success depended only on what Lewis and Clark knew, with no outside help.",
      correctVerdict: "False",
      reasonText: "The group leaned hard on Sacagawea, other Native guides, and what local people knew about the land. That is how it stayed alive and found its way.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "The expedition kept detailed written journals about what they saw along the way.",
      correctVerdict: "True",
      reasonText: "Lewis and Clark's journals are a primary source. Historians still use them to study the trip.",
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT
  // pre-sorted so Screen 2 doesn't spoil the Sensor Sort game or the
  // Verdict reveal. Sort correctness is driven entirely by
  // sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "journal_entry", label: "Expedition journal entry", reading: "Describes the land, plants, and animals the group came across on the route.", kind: "document" },
    { id: "village_map", label: "Native village records", reading: "Marks dozens of Native villages and lands that were already along the route.", kind: "document" },
    { id: "sacagawea_role", label: "Sacagawea's role", reading: "Notes that Sacagawea translated conversations and helped guide the group through land they did not know.", kind: "document" },
    { id: "food_trade", label: "Trade record", reading: "Records the group trading with Native nations for food and supplies to get through the winter.", kind: "document" },
    { id: "first_claim", label: "\"First to see it\" summary", reading: "An old summary that calls the expedition the first people to ever see the western land.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["village_map"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["sacagawea_role"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["sacagawea_role", "food_trade"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["journal_entry"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["first_claim"] },
  ],

  echo: {
    main: "An old expedition claim surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. \"First to see it\" claims deserve a close read.",
    sort: "Sorted. Notice how Sacagawea's role backs up more than one signal — that's how real evidence works.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I mention that Native nations already lived on the land the expedition explored?",
    "Did I explain Sacagawea's role in the expedition's success?",
    "Did I use the expedition's own journals as evidence?",
    "Did I avoid saying Lewis and Clark succeeded with no outside help?",
  ],
};
