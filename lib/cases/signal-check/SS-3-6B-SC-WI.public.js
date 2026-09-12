// Signal Check Weigh-In — companion to SS.3.6B-SC.
// Reuses classic evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.3.6B-SC-WI',
  teksLabel: '3.6B',
  grade: 3,
  subject: "Social Studies",
  title: 'Scarce Now Weigh-In',
  tagline: 'Scarce only at zero?',
  stemMode: 'dropdown',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'Only 3 glittery notebooks left, but many kids want one. One Cadet says it\'s not scarce until zero. The other says scarce means not enough for everyone who wants it.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'Something is only scarce when there\'s none left at all.' },
    { id: "B", label: "SIDE B", claim: 'It\'s scarce when there isn\'t enough for everyone who wants it — even if a few are left.' },
  ],

  evidence: [
    { id: 'glitter_count', text: 'Only 3 glittery notebooks left on the shelf.', supports: 'B' },
    { id: 'class_survey', text: '20 out of 25 kids in Ms. Ruiz\'s class want a glittery notebook.', supports: 'B' },
    { id: 'plain_count', text: '30 plain notebooks still stacked on the shelf.', supports: 'neither' },
    { id: 'waitlist_note', text: '5 more kids joined the glittery waitlist this morning.', supports: 'B' },
    { id: 'restock_delay', text: 'Next glittery restock won\'t arrive for two weeks.', supports: 'B' },
    { id: 'store_hours', text: 'School store is open 8:00–8:15 every morning.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I notice wants vs leftover count?',
    'Did I say scarce ≠ empty?',
    'Did I skip store hours as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
