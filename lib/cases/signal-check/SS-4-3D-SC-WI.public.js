// Signal Check Weigh-In — companion to SS.4.3D-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.3D-SC-WI',
  teksLabel: '4.3D',
  grade: 4,
  subject: "Social Studies",
  title: 'Republic Problems Weigh-In',
  tagline: 'Independence fixed everything?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Texas won independence in 1836. One Cadet says major problems were then solved. The other says debt, Mexico\'s refusal, and border raids continued.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'After 1836 independence, most major problems were solved.' },
    { id: "B", label: "SIDE B", claim: 'Debt, Mexico\'s non-recognition, and border raids kept going for years.' },
  ],

  evidence: [
    { id: 'debt_record', text: 'New government owed large debts and struggled to pay soldiers and workers.', supports: 'B' },
    { id: 'unpaid_soldiers', text: 'Many Texas soldiers went unpaid for months after the war.', supports: 'B' },
    { id: 'mexico_recognition', text: 'Mexico refused to officially recognize Texas as independent.', supports: 'B' },
    { id: 'border_raids', text: 'Mexican forces continued raids across the disputed border after 1836.', supports: 'B' },
    { id: 'problems_summary', text: 'Debt, no recognition, and border conflict continued well after independence.', supports: 'B' },
    { id: 'republic_struggle', text: 'These challenges lasted most of the Republic\'s ten years.', supports: 'B' },
    { id: 'flag_note', text: 'The Republic adopted a new flag design in 1839.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name debt or Mexico issues?',
    'Did I say problems continued?',
    'Did I skip the flag as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
