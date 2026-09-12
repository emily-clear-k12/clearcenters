// Signal Check Weigh-In — companion to SS.4.11C-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.11C-SC-WI',
  teksLabel: '4.11C',
  grade: 4,
  subject: "Social Studies",
  title: 'Texas Grow Weigh-In',
  tagline: 'Just more people?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Population grew, but rails and farmland were already boosting the economy. One Cadet says people alone explain it. The other says railroads and cheap farmland matter too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Population growth explains the whole Texas economy story.' },
    { id: "B", label: "SIDE B", claim: 'Railroads and cheap farmland boosted the economy — including before the biggest population jumps.' },
  ],

  evidence: [
    { id: 'railroad_expansion', text: 'New rail lines connected Texas towns to markets across the country.', supports: 'B' },
    { id: 'trade_growth', text: 'Farmers and ranchers shipped goods far beyond their own county.', supports: 'B' },
    { id: 'farmland_price', text: 'Land was cheap and widely available for new settlers.', supports: 'B' },
    { id: 'cotton_growth', text: 'Cotton farming expanded as settlers grew crops to sell.', supports: 'B' },
    { id: 'population_data', text: 'Texas\'s population grew significantly during this period.', supports: 'A' },
    { id: 'growth_timeline', text: 'Railroad and farmland activity rose before the biggest population jumps.', supports: 'B' },
    { id: 'capital_note', text: 'Austin was named the permanent state capital in this period.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I mention railroads or farmland?',
    'Did I say population isn\'t the whole story?',
    'Did I skip the capital note as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
