// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.1B covers ways of
// life among American Indian groups in Texas (Lipan Apache, Karankawa,
// Caddo, Jumano). Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a lifeways comparison record) — not a
// reworded version of Group Chat's SS.4.1B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.1B-SC",
  teksLabel: "4.1B",
  grade: 4,
  subject: "Social Studies",
  title: "Same State, Different Ways of Life",
  tagline: "The Karankawa, Caddo, and Lipan Apache all lived in Texas, so their ways of life were basically the same.",
  transmission: {
    claimHeadline: "The Karankawa, Caddo, and Lipan Apache all lived in Texas, so their ways of life were basically the same.",
    source: "Texas American Indian Groups Archive",
    loggedAt: "Regional Lifeways Comparison",
  },

  // Grade 4: verdict is still a button, but the reasoning is typed.
  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-1b-sc-field-report.jpg",
    imageCaption: "Texas American Indian Groups Archive — Regional Lifeways Comparison",
    notes: "The Karankawa lived along the Gulf Coast, moving seasonally by canoe and relying on fishing and shellfish gathering. The Caddo lived in East Texas in permanent villages, farming corn, beans, and squash, and building earthen mounds. The Lipan Apache lived on the western plains, following bison herds and living in portable tipis that could be packed up quickly. An old worksheet summed it up simply: \"All Texas American Indian groups lived pretty much the same way.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The Karankawa relied on fishing and shellfish gathering along the Gulf Coast, moving seasonally by canoe.",
      correctVerdict: "True",
      reasonText: "The Karankawa lived near the coast, so their food and travel depended on the water in ways inland groups' didn't.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Caddo lived in permanent villages and farmed crops like corn, beans, and squash.",
      correctVerdict: "True",
      reasonText: "Caddo villages stayed in one place long enough across seasons to plant, tend, and harvest crops.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since the Karankawa, Caddo, and Lipan Apache all lived in Texas, they must have found food, built shelter, and traveled in about the same way.",
      correctVerdict: "False",
      reasonText: "The three groups lived in very different environments — coast, forest, and plains — so their food sources, homes, and ways of traveling were shaped by those differences, not by all being \"in Texas.\"",
    },
  ],

  evidenceReadings: [
    { id: "karankawa_food", label: "Karankawa food record", reading: "Relied on fishing and gathering shellfish along the Gulf Coast.", kind: "document" },
    { id: "karankawa_travel", label: "Karankawa travel record", reading: "Moved seasonally along the coast by canoe.", kind: "document" },
    { id: "caddo_farming", label: "Caddo farming record", reading: "Grew corn, beans, and squash in permanent villages.", kind: "document" },
    { id: "caddo_villages", label: "Caddo village record", reading: "Built earthen mounds and stayed in one village for many years.", kind: "document" },
    { id: "apache_shelter", label: "Lipan Apache shelter record", reading: "Lived in portable tipis that could be packed up quickly.", kind: "document" },
    { id: "apache_travel", label: "Lipan Apache travel record", reading: "Followed bison herds across the western plains.", kind: "document" },
    { id: "worksheet_line", label: "Old worksheet line", reading: "\"All Texas American Indian groups lived pretty much the same way.\"", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["karankawa_food", "karankawa_travel"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["caddo_farming", "caddo_villages"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["apache_shelter", "apache_travel"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["worksheet_line"] },
  ],

  echo: {
    main: "Regional lifeways archive incoming, Cadet. Let's see if this claim holds up.",
    scan: "Three groups, three very different environments — read every record carefully.",
    sort: "Notice how each group's food, shelter, and travel all connect to where they lived.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how the Karankawa's coastal life shaped their food and travel?",
    "Did I mention that the Caddo farmed in permanent villages?",
    "Did I mention how the Lipan Apache's plains life was different from the other two groups?",
    "Did I avoid saying all three groups lived about the same way just because they were all in Texas?",
  ],
};
