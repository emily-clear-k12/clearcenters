// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.4A: causes and
// effects of the War of 1812.
//
// This case deals only in documented causes (impressment, trade
// restrictions, War Hawk ambitions) — no dramatized scenes, no invented
// dialogue, no depiction of historical figures themselves.

export const PUBLIC_CASE = {
  standard: "SS.5.4A-SC",
  teksLabel: "5.4A",
  grade: 5,
  subject: "Social Studies",
  title: "Blame It on the Land",
  tagline: "The War of 1812 was fought only over land disputes with Britain.",
  transmission: {
    claimHeadline: "The War of 1812 was fought only over land disputes with Britain.",
    source: "War of 1812 Congressional Archive",
    loggedAt: "1807–1812",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-4a-sc-field-report.jpg",
    imageCaption: "War of 1812 Congressional Archive, 1807–1812",
    notes: "Naval records from the archive list American sailors taken off U.S. ships and forced into British Navy service between 1803 and 1812 — a practice called impressment. Separately, British 'Orders in Council' blocked American ships from trading with France and its allies during Britain's war with Napoleon, hurting American merchants and shippers. A congressional summary from the time lists impressment and trade restrictions as the top reasons given for declaring war in 1812. The archive also includes a speech from a War Hawk congressman arguing that a war with Britain could let the United States gain Canadian territory — a hope that came up after impressment and trade tensions were already running high.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Land disputes were the only reason the United States went to war with Britain in 1812.",
      correctVerdict: "False",
      reasonText: "British impressment of sailors and trade restrictions were bigger, earlier sparks than any land dispute.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "British ships stopped American sailors at sea and forced them into British Navy service.",
      correctVerdict: "True",
      reasonText: "This practice, called impressment, was a direct, documented cause with nothing to do with land.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Some War Hawks in Congress wanted a war so the U.S. could gain Canadian land, so land was the war's real cause.",
      correctVerdict: "Misleading",
      reasonText: "That hope existed, but it came after years of anger over impressment and trade restrictions had already built up.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Britain's trade restrictions during its war with France hurt American merchants and shippers.",
      correctVerdict: "True",
      reasonText: "These restrictions blocked American ships from trading freely and added to the reasons for war.",
    },
  ],

  evidenceReadings: [
    { id: "causes_summary", label: "Congressional causes summary", reading: "A congressional summary lists impressment and trade restrictions as the top reasons given for declaring war in 1812.", kind: "document" },
    { id: "impressment_log", label: "Impressment record", reading: "Naval records list American sailors taken from U.S. ships and forced into British Navy service between 1803 and 1812.", kind: "document" },
    { id: "warhawk_speech", label: "War Hawk speech", reading: "A speech from a War Hawk congressman argues that a war with Britain could let the U.S. gain Canadian territory.", kind: "document" },
    { id: "trade_restriction", label: "Orders in Council record", reading: "British 'Orders in Council' blocked American ships from trading with France and its allies.", kind: "document" },
    { id: "later_land_map", label: "1818 land treaty map", reading: "A land treaty map from 1818, drawn up after the War of 1812 had already ended.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["causes_summary"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["impressment_log"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["warhawk_speech"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["trade_restriction"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["later_land_map"] },
  ],

  echo: {
    main: "An old wartime claim surfaced in the archive, Cadet. Let's see if it holds up.",
    scan: "Four signals, five raw records — nothing's sorted yet. A one-cause claim about a war deserves a close read.",
    sort: "Sorted. Notice how the War Hawk speech looks like it backs the claim, but the timing tells a different story.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I explain why land disputes weren't the war's only cause?",
    "Did I mention impressment as a documented cause?",
    "Did I mention Britain's trade restrictions as a documented cause?",
    "Did I explain why the War Hawks' land hopes don't make land the war's real cause?",
  ],
};
