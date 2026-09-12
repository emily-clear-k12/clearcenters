// Signal Check Weigh-In — companion to SS.4.1B-SC.
// Reuses classic evidence world. G4 dropdown-open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.4.1B-SC-WI',
  teksLabel: '4.1B',
  grade: 4,
  subject: "Social Studies",
  title: 'Same Ways Weigh-In',
  tagline: 'Same state = same life?',
  stemMode: 'dropdown-open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Three American Indian groups lived in Texas. One Cadet says same state means same way of life. The other says coast, East Texas, and plains shaped different lives.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'They all lived in Texas, so their ways of life were basically the same.' },
    { id: "B", label: "SIDE B", claim: 'Same state, different lives — coast fishing, East Texas farming villages, plains bison hunting.' },
  ],

  evidence: [
    { id: 'karankawa_food', text: 'Karankawa relied on fishing and shellfish on the Gulf Coast.', supports: 'B' },
    { id: 'karankawa_travel', text: 'Moved seasonally along the coast by canoe.', supports: 'B' },
    { id: 'caddo_farming', text: 'Caddo grew corn, beans, and squash in permanent villages.', supports: 'B' },
    { id: 'caddo_villages', text: 'Built earthen mounds and stayed in one village for years.', supports: 'B' },
    { id: 'apache_shelter', text: 'Lipan Apache lived in portable tipis that packed up fast.', supports: 'B' },
    { id: 'apache_travel', text: 'Followed bison herds across the western plains.', supports: 'B' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name different foods/shelters?',
    'Did I say same state ≠ same life?',
    'Did I use group-specific readings?',
    'Would my ruling still make sense on a re-read?',
  ],
};
