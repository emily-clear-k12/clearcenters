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
    notes: "The expedition's own journals describe in detail the land, plants, and animals Lewis and Clark encountered — but those same records also show the group repeatedly meeting, trading with, and relying on Native nations who were already living along the route. Records from the time mark dozens of established villages and territories the expedition passed through, long before they ever arrived.\n\nSacagawea's role is documented throughout the journals: she translated conversations, helped guide the group through unfamiliar territory, and helped the expedition trade for food during a harsh winter. Some later summaries of the expedition shorten the story to \"the first people to see the West\" — but the expedition's own records tell a more complete story of a well-populated land and the people who helped them survive it.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Lewis and Clark explored land that no human being had ever set foot on before.",
      correctVerdict: "False",
      reasonText: "Dozens of American Indian nations had already been living on that land for generations before the expedition arrived.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Sacagawea helped the expedition communicate with and navigate through the Native nations they met.",
      correctVerdict: "True",
      reasonText: "Sacagawea served as an interpreter and guide, and her presence helped the group negotiate safely with nations along the route.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The expedition's success depended only on Lewis and Clark's own knowledge, with no outside help.",
      correctVerdict: "False",
      reasonText: "The expedition relied heavily on Sacagawea, other Native guides, and local knowledge of the land to survive and navigate.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "The expedition kept detailed written journals describing what they encountered along the way.",
      correctVerdict: "True",
      reasonText: "Lewis and Clark's journals are a primary source historians still use to study the expedition today.",
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT
  // pre-sorted so Screen 2 doesn't spoil the Sensor Sort game or the
  // Verdict reveal. Sort correctness is driven entirely by
  // sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "journal_entry", label: "Expedition journal entry", reading: "Describes the land, plants, and animals the group encountered along the route.", kind: "document" },
    { id: "village_map", label: "Native village records", reading: "Marks dozens of established Native villages and territories along the expedition's route.", kind: "document" },
    { id: "sacagawea_role", label: "Sacagawea's role", reading: "Notes that Sacagawea translated conversations and helped guide the group through unfamiliar territory.", kind: "document" },
    { id: "food_trade", label: "Trade record", reading: "Records the expedition trading with Native nations for food and supplies to survive the winter.", kind: "document" },
    { id: "first_claim", label: "\"First to see it\" summary", reading: "An old summary describing the expedition as the first people to ever see the western land.", kind: "distractor" },
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
