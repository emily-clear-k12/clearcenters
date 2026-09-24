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
    notes: "Mission San Antonio de Valero (the Alamo) was built by the San Antonio River. The river gave it water to drink, to farm, and to live. Missions were also built near American Indian settlements. That way, the priests could teach the people there and try to convert them. Some missions were spaced out along roads. Then soldiers and supplies could move safely from one to the next. Texas had lots of open land back then. But the builders did not just pick random spots.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Mission San Antonio de Valero was built by the San Antonio River for a steady water supply.",
      correctVerdict: "True",
      reasonText: "The site record says the mission was put by the river on purpose. It needed water each day to drink and to farm.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Missions were often built near American Indian settlements so priests could teach and try to convert people.",
      correctVerdict: "True",
      reasonText: "Mission records and priests' reports both show this was a planned goal. It did not just happen by chance.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Texas had lots of open land, so mission sites were picked at random. Water, nearby people, and roads did not matter.",
      correctVerdict: "False",
      reasonText: "Open land was easy to find. But the site record shows each mission was put where it was for a reason. It had water, nearby settlements, or safe roads.",
    },
  ],

  evidenceReadings: [
    { id: "mission_river", label: "Mission San Antonio de Valero site record", reading: "Built by the San Antonio River for a steady water supply.", kind: "document" },
    { id: "water_need", label: "Mission water use record", reading: "Water was needed each day to drink, to farm, and to live.", kind: "document" },
    { id: "mission_settlement", label: "Mission placement record", reading: "Built near American Indian settlements to reach the people who lived there.", kind: "document" },
    { id: "conversion_goal", label: "Missionary reports", reading: "The priests wanted to teach and convert the people near each mission.", kind: "document" },
    { id: "open_land_note", label: "Texas land record", reading: "Texas had lots of open land that no one had claimed.", kind: "document" },
    { id: "site_planning", label: "Site selection record", reading: "Each mission site was picked for a reason, like water, nearby settlements, or safe roads.", kind: "document" },
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
