// Signal Check Weigh-In — companion to SS.4.2A-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.2A-SC-WI',
  teksLabel: '4.2A',
  grade: 4,
  subject: "Social Studies",
  title: 'Explorer Why Weigh-In',
  tagline: 'Just curious?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Coronado and La Salle reached Texas for big goals. One Cadet says they came from curiosity. The other says records show gold, land claims, and rivalry.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'They mainly came because they were curious about new lands.' },
    { id: "B", label: "SIDE B", claim: 'Records show gold-seeking and land claims — not curiosity — as the main motives.' },
  ],

  evidence: [
    { id: 'coronado_goal', text: 'Coronado\'s trip was organized to search for the Cities of Gold.', supports: 'B' },
    { id: 'coronado_supplies', text: 'Brought soldiers, priests, and supplies for a long treasure search.', supports: 'B' },
    { id: 'lasalle_goal', text: 'France sent La Salle to find the Mississippi mouth and claim land.', supports: 'B' },
    { id: 'lasalle_mistake', text: 'He missed the Mississippi and landed on the Texas coast by mistake.', supports: 'B' },
    { id: 'motive_summary', text: 'Neither Coronado\'s nor La Salle\'s records list curiosity as the reason.', supports: 'B' },
    { id: 'spain_france_rivalry', text: 'Spain and France competed to claim land and wealth in the Americas.', supports: 'B' },
    { id: 'mapmaking_note', text: 'The ship\'s crew sketched the coastline as they sailed.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name gold or land claims?',
    'Did I say curiosity wasn\'t the main motive?',
    'Did I skip map sketches as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
