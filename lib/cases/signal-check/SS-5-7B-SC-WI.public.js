// Signal Check Weigh-In — companion to SS.5.7B-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.7B-SC-WI',
  teksLabel: '5.7B',
  grade: 5,
  subject: "Social Studies",
  title: 'Anywhere City Weigh-In',
  tagline: 'People alone grow a city?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Gault Hollow had settlers but little growth; Rowan\'s Ford had river and farmland and grew. One Cadet says people alone are enough. The other says location resources matter.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'A town can grow into a major city almost anywhere if enough people move there.' },
    { id: "B", label: "SIDE B", claim: 'Location matters — water, trade crossings, and farmland help a town grow; dry rocky sites stall.' },
  ],

  evidence: [
    { id: 'gault_survey', text: 'Gault Hollow: dry, rocky soil with no nearby water source.', supports: 'B' },
    { id: 'rowan_river', text: 'Rowan\'s Ford: natural shallow river crossing used by traders.', supports: 'B' },
    { id: 'gault_founders', text: 'Forty families arrived hoping to build at Gault Hollow.', supports: 'A' },
    { id: 'rowan_farmland', text: 'Flat, fertile farmland surrounds Rowan\'s Ford.', supports: 'B' },
    { id: 'gault_census', text: 'Later census: Gault Hollow\'s population barely changed decades later.', supports: 'B' },
    { id: 'unrelated_weather', text: 'Weather log from a different, unconnected town.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I contrast water/farmland sites?',
    'Did I say people alone aren\'t enough?',
    'Did I skip unrelated weather as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
