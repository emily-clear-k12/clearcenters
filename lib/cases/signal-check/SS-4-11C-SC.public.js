// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.11C covers factors
// in Texas's economic growth. Stored with an "SS." prefix so this code can
// never collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (an economic growth records file) — not a
// reworded version of Group Chat's SS.4.11C case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.11C-SC",
  teksLabel: "4.11C",
  grade: 4,
  subject: "Social Studies",
  title: "What Made Texas Grow?",
  tagline: "Texas's economy grew mainly because more people moved there. Population growth tells the whole story.",
  transmission: {
    claimHeadline: "Texas's economy grew mainly because more people moved there. Population growth tells the whole story.",
    source: "Texas Economic Growth Records",
    loggedAt: "Growth Factors File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-11c-sc-field-report.jpg",
    imageCaption: "Texas Economic Growth Records — Growth Factors File",
    notes: "In the late 1800s, new railroads linked Texas towns to bigger markets. Farmers and ranchers could now sell goods far from home. Cheap farmland also drew settlers. They grew cotton and other crops to sell. Lots of people moved to Texas at this time. But look at the dates. Trains and farms were already helping the economy grow. That was before the biggest waves of new people came.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "New railroads linked Texas towns to bigger markets, which helped trade grow.",
      correctVerdict: "True",
      reasonText: "The railroad record and the trade record show that new rail lines opened up markets far from home.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Cheap farmland drew settlers who grew cotton and other crops to sell.",
      correctVerdict: "True",
      reasonText: "The land price record and the cotton record show settlers moving in to farm and sell crops.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "More people moved to Texas, so that alone explains why the economy grew. Railroads and farmland had nothing to do with it.",
      correctVerdict: "False",
      reasonText: "The timeline shows trains and farms were already growing the economy. That was before the biggest waves of new people. More people was not the whole story.",
    },
  ],

  evidenceReadings: [
    { id: "railroad_expansion", label: "Railroad expansion record", reading: "New rail lines linked Texas towns to markets across the country.", kind: "document" },
    { id: "trade_growth", label: "Trade volume record", reading: "Farmers and ranchers began to ship goods far from home.", kind: "document" },
    { id: "farmland_price", label: "Farmland price record", reading: "Land was cheap and easy for new settlers to get.", kind: "document" },
    { id: "cotton_growth", label: "Cotton production record", reading: "Cotton farming grew fast as settlers raised crops to sell.", kind: "document" },
    { id: "population_data", label: "Population growth chart", reading: "Lots of people moved to Texas during this time.", kind: "document" },
    { id: "growth_timeline", label: "Growth factors timeline", reading: "Trains and farms were helping the economy before the biggest waves of new people.", kind: "document" },
    { id: "capital_note", label: "State capital record", reading: "Austin was named the permanent state capital in this period.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["railroad_expansion", "trade_growth"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["farmland_price", "cotton_growth"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["population_data", "growth_timeline"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["capital_note"] },
  ],

  echo: {
    main: "Economic growth records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Railroads, farmland, and population — read every record carefully.",
    sort: "Notice how the timeline shows what came first.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how railroads helped Texas trade grow?",
    "Did I mention how cheap farmland drew in new settlers?",
    "Did I mention that railroads and farmland were already boosting the economy before the biggest population growth?",
    "Did I avoid saying population growth alone explains why the economy grew?",
  ],
};
