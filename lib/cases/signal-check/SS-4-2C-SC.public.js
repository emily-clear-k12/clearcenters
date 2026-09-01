// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.2C covers Spanish
// missions in Texas. Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a mission site-selection record) — not a
// reworded version of Group Chat's SS.4.2C case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.2C-SC",
  teksLabel: "4.2C",
  grade: 4,
  subject: "Social Studies",
  title: "Why Build a Mission Here?",
  tagline: "Spanish missions were built mainly wherever there happened to be empty land.",
  transmission: {
    claimHeadline: "Spanish missions were built mainly wherever there happened to be empty land.",
    source: "Spanish Mission Records",
    loggedAt: "Mission Site Selection File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-2c-sc-field-report.jpg",
    imageCaption: "Spanish Mission Records — Site Selection File",
    notes: "Mission San Antonio de Valero (the Alamo) was built along the San Antonio River, giving it a steady water source for drinking, farming, and daily mission life. Missions were also placed near existing American Indian settlements so missionaries could teach and try to convert nearby communities. Some missions were spaced along travel routes so soldiers and supplies could move safely between them. Texas had plenty of open, unclaimed land at the time, but mission builders didn't just pick random spots.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Mission San Antonio de Valero was built along the San Antonio River for a reliable water source.",
      correctVerdict: "True",
      reasonText: "The site record confirms the mission was placed along the river specifically for a steady water supply needed daily for drinking and farming.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Missions were often placed near existing American Indian settlements so missionaries could teach and try to convert nearby communities.",
      correctVerdict: "True",
      reasonText: "Mission placement records and missionary reports both show this was a deliberate goal, not a coincidence of geography.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since there was plenty of open land across Texas, mission sites were picked at random rather than for reasons like water, nearby communities, or travel routes.",
      correctVerdict: "False",
      reasonText: "Even though open land was plentiful, the site selection record shows each mission's location was chosen for specific reasons — water, nearby communities, and safe travel — not picked at random.",
    },
  ],

  evidenceReadings: [
    { id: "mission_river", label: "Mission San Antonio de Valero site record", reading: "Built along the San Antonio River for a steady water supply.", kind: "document" },
    { id: "water_need", label: "Mission water use record", reading: "Water was needed daily for drinking, farming, and mission life.", kind: "document" },
    { id: "mission_settlement", label: "Mission placement record", reading: "Placed near existing American Indian settlements to reach nearby communities.", kind: "document" },
    { id: "conversion_goal", label: "Missionary reports", reading: "Missionaries aimed to teach and convert people living near each mission.", kind: "document" },
    { id: "open_land_note", label: "Texas land record", reading: "Texas had large amounts of open, unclaimed land at the time.", kind: "document" },
    { id: "site_planning", label: "Site selection record", reading: "Each mission site was chosen for specific reasons like water, nearby communities, or safe travel routes.", kind: "document" },
    { id: "bell_note", label: "Mission bell record", reading: "The mission bell was cast in Mexico and shipped to Texas.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["mission_river", "water_need"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["mission_settlement", "conversion_goal"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["open_land_note", "site_planning"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["bell_note"] },
  ],

  echo: {
    main: "Mission site records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Water, community, and travel routes — read every record carefully.",
    sort: "Notice how each mission's placement matches a real, specific reason.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that Mission San Antonio de Valero was built for its water source?",
    "Did I mention that missions were placed near existing communities?",
    "Did I mention that mission sites were chosen for specific reasons, not at random?",
    "Did I avoid saying missions were just built wherever land happened to be open?",
  ],
};
