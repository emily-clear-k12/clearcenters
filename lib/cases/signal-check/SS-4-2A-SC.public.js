// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.2A covers the
// motivations of European explorers in Texas. Stored with an "SS." prefix
// so this code can never collide with a Science case using the same bare
// TEKS number.
//
// Freshly scripted scenario (an exploration-records comparison) — not a
// reworded version of Group Chat's SS.4.2A case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.2A-SC",
  teksLabel: "4.2A",
  grade: 4,
  subject: "Social Studies",
  title: "Why Texas?",
  tagline: "Explorers like Coronado and La Salle came to Texas mainly because they were curious about new lands.",
  transmission: {
    claimHeadline: "Explorers like Coronado and La Salle came to Texas mainly because they were curious about new lands.",
    source: "Spanish and French Exploration Records",
    loggedAt: "Explorer Motives File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-2a-sc-field-report.jpg",
    imageCaption: "Exploration Records — Explorer Motives File",
    notes: "Coronado led a large expedition in 1540 searching for the legendary Cities of Gold, hoping to find riches for Spain. He brought soldiers, priests, and supplies built for a long search, not just a quick look around. Decades later, France's La Salle sailed to find the mouth of the Mississippi River and claim the surrounding land for France — he missed his target and landed in Texas by mistake. Spain and France were competing at the time to claim land and wealth across the Americas. Neither explorer's own written records mention curiosity as their reason for the journey.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Since both explorers ended up in Texas, curiosity about new lands must have been their main reason for coming.",
      correctVerdict: "False",
      reasonText: "Neither explorer's own records mention curiosity — Coronado was after gold for Spain and La Salle was pursuing a specific French land claim, both part of a larger rivalry between the two countries.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "La Salle was trying to claim land for France and find the mouth of the Mississippi River.",
      correctVerdict: "True",
      reasonText: "His mission record shows he was sent to establish a French claim near the Mississippi, and he ended up in Texas only because he missed that target.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Coronado's expedition was searching for the legendary Cities of Gold, hoping to find riches for Spain.",
      correctVerdict: "True",
      reasonText: "His own expedition record describes a search specifically for gold and treasure, backed by an expedition built for exactly that purpose.",
    },
  ],

  evidenceReadings: [
    { id: "coronado_goal", label: "Coronado's expedition record", reading: "Organized specifically to search for the legendary Cities of Gold.", kind: "document" },
    { id: "coronado_supplies", label: "Coronado's supply list", reading: "Carried soldiers, priests, and supplies built for a long search for treasure.", kind: "document" },
    { id: "lasalle_goal", label: "La Salle's mission record", reading: "Sent by France to find the mouth of the Mississippi River and claim nearby land.", kind: "document" },
    { id: "lasalle_mistake", label: "La Salle's landing record", reading: "Missed the Mississippi's mouth and landed on the Texas coast by mistake.", kind: "document" },
    { id: "motive_summary", label: "Explorer motives comparison", reading: "Neither Coronado's nor La Salle's own written records mention curiosity as their reason for traveling.", kind: "document" },
    { id: "spain_france_rivalry", label: "European rivalry record", reading: "Spain and France were competing to claim land and wealth in the Americas.", kind: "document" },
    { id: "mapmaking_note", label: "Ship's mapmaking note", reading: "The ship's crew sketched the coastline as they sailed.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["motive_summary", "spain_france_rivalry"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["lasalle_goal", "lasalle_mistake"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["coronado_goal", "coronado_supplies"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["mapmaking_note"] },
  ],

  echo: {
    main: "Exploration records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Two explorers, two very different goals — read every record carefully.",
    sort: "Notice how each explorer's supplies and orders match their real goal.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that Coronado was searching for gold?",
    "Did I mention that La Salle was trying to claim land for France?",
    "Did I mention that neither explorer's own records mention curiosity?",
    "Did I avoid saying curiosity was the explorers' main reason for coming to Texas?",
  ],
};
