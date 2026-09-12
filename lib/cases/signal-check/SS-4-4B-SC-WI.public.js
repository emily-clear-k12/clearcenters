// Signal Check Weigh-In — companion to SS.4.4B-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.4B-SC-WI',
  teksLabel: '4.4B',
  grade: 4,
  subject: "Social Studies",
  title: 'Cattle Boom Weigh-In',
  tagline: 'Just lots of cows?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Texas had herds for years, but the boom came later. One Cadet says lots of cows caused growth. The other says trails, railroads, and price gaps did.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The cattle industry grew mostly because Texas simply had a lot of cows.' },
    { id: "B", label: "SIDE B", claim: 'Herds existed earlier — growth exploded after trails and railroads opened big price gaps.' },
  ],

  evidence: [
    { id: 'price_gap', text: 'Cattle worth $2–4 in Texas sold for $20–40 at northern railroad towns.', supports: 'B' },
    { id: 'market_demand', text: 'Northern and eastern cities had high demand for beef after the Civil War.', supports: 'B' },
    { id: 'trail_map', text: 'New trail connected Texas ranches to the railroad at Abilene, Kansas.', supports: 'B' },
    { id: 'railroad_link', text: 'Railroads reaching Kansas made shipping cattle east possible.', supports: 'B' },
    { id: 'herd_history', text: 'Texas already had large herds for years before the boom.', supports: 'B' },
    { id: 'boom_timing', text: 'Rapid growth started only after new trails and railroad links opened.', supports: 'B' },
    { id: 'brand_note', text: 'Ranchers branded cattle with a unique hot-iron mark.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I mention trails or railroads?',
    'Did I say herds alone weren\'t enough?',
    'Did I skip branding as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
