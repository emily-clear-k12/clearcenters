// Signal Check Weigh-In — companion to SS.5.14B-SC.
// Reuses classic evidence world. G5 open.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: 'SS.5.14B-SC-WI',
  teksLabel: '5.14B',
  grade: 5,
  subject: "Social Studies",
  title: 'Preamble Jobs Weigh-In',
  tagline: 'Just one job?',
  stemMode: 'open',

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: 'The Preamble lists six purposes. One Cadet says it\'s just lawmaking. The other says unity, justice, defense, welfare, and liberty are listed too.',
  },

  sides: [
    { id: "A", label: "SIDE A", claim: 'The Preamble describes just one main job: making laws.' },
    { id: "B", label: "SIDE B", claim: 'The Preamble lists six purposes — including union, justice, defense, welfare, and liberty — not only lawmaking.' },
  ],

  evidence: [
    { id: 'justice_clause', text: '\'Establish justice\' is one purpose among six listed.', supports: 'B' },
    { id: 'union_clause', text: '\'Form a more perfect union\' focuses on uniting the states, not lawmaking.', supports: 'B' },
    { id: 'defense_clause', text: '\'Provide for the common defense\' focuses on protecting the country.', supports: 'B' },
    { id: 'welfare_liberty_clause', text: '\'General welfare\' and \'blessings of liberty\' focus on wellbeing and freedom.', supports: 'B' },
    { id: 'unrelated_amendment', text: 'A later amendment about voting age — unrelated to the Preamble.', supports: 'neither' },
  ],

  echo: {
    main: 'Transmission split, Cadet. Two sides. One stronger signal.',
    sort: 'Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.',
    pick: 'Pick the side the evidence backs. Tap your proof from the readings.',
    reflect: 'Ruling locked in draft. One more self-check before you send it.',
  },

  selfCheckQuestions: [
    'Did I pick a side?',
    'Did I name more than one purpose?',
    'Did I say it\'s not only lawmaking?',
    'Did I skip the voting-age amendment as proof?',
    'Would my ruling still make sense on a re-read?',
  ],
};
