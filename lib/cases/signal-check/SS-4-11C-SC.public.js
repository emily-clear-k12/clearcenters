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
  tagline: "Texas's economy grew mainly because more people moved there — population growth explains the whole story.",
  transmission: {
    claimHeadline: "Texas's economy grew mainly because more people moved there — population growth explains the whole story.",
    source: "Texas Economic Growth Records",
    loggedAt: "Growth Factors File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-11c-sc-field-report.jpg",
    imageCaption: "Texas Economic Growth Records — Growth Factors File",
    notes: "New railroads connected Texas towns to bigger markets in the late 1800s, letting farmers and ranchers sell goods far beyond their own county. Cheap, available farmland drew settlers who grew cotton and other crops to sell for profit. Texas's population did grow a lot during this period, but the growth timeline shows railroad and farmland activity were already boosting the economy before the biggest population increases happened.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "New railroads connected Texas towns to bigger markets, helping trade and industry grow.",
      correctVerdict: "True",
      reasonText: "The railroad expansion record and trade volume record together show new rail lines opened up markets far beyond any single county.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Cheap, available farmland drew settlers who grew cotton and other crops to sell.",
      correctVerdict: "True",
      reasonText: "The farmland price record and cotton production record show settlers moving in specifically to farm and sell crops.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since Texas's population did grow a lot, population growth alone explains why the economy grew — railroads and farmland had nothing to do with it.",
      correctVerdict: "False",
      reasonText: "The growth timeline shows railroads and farmland activity were already driving economic growth before the biggest population increases happened — population growth wasn't the whole story.",
    },
  ],

  evidenceReadings: [
    { id: "railroad_expansion", label: "Railroad expansion record", reading: "New rail lines connected Texas towns to markets across the country.", kind: "document" },
    { id: "trade_growth", label: "Trade volume record", reading: "Farmers and ranchers began shipping goods far beyond their own county.", kind: "document" },
    { id: "farmland_price", label: "Farmland price record", reading: "Land was cheap and widely available for new settlers.", kind: "document" },
    { id: "cotton_growth", label: "Cotton production record", reading: "Cotton farming expanded rapidly as settlers grew crops to sell.", kind: "document" },
    { id: "population_data", label: "Population growth chart", reading: "Texas's population grew significantly during this period.", kind: "document" },
    { id: "growth_timeline", label: "Growth factors timeline", reading: "Railroad and farmland activity were already increasing the economy before the biggest population jumps happened.", kind: "document" },
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
